<template>
  <component :is="tag" ref="text" class="letter-reveal" :class="{ 'is-waiting': isWaiting }">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { gsap, prefersReducedMotion, SplitText } from '@/lib/motion'

export default defineComponent({
  name: 'LetterReveal',
  props: {
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'p',
    },
    letterDelay: {
      type: Number,
      default: 50,
    },
    duration: {
      type: Number,
      default: 1.25,
    },
  },
  data() {
    return {
      isWaiting: !prefersReducedMotion,
      animation: undefined as gsap.Context | undefined,
    }
  },
  async mounted() {
    if (prefersReducedMotion) return

    const text = this.$refs.text as HTMLElement
    await document.fonts.ready

    this.animation = gsap.context(() => {
      const letters = SplitText.create(text, { type: 'chars', charsClass: 'letter-reveal-letter' })
      gsap.set(letters.chars, { opacity: 0, y: 40 })
      this.isWaiting = false
      gsap.to(letters.chars, {
        opacity: 1,
        y: 0,
        duration: this.duration,
        ease: 'power3.out',
        stagger: this.letterDelay / 1000,
        onComplete: () => letters.revert(),
      })
    }, text)
  },
  beforeUnmount() {
    this.animation?.revert()
  },
})
</script>

<style scoped lang="scss">
.letter-reveal.is-waiting {
  visibility: hidden;
}
.letter-reveal {
  :deep(.letter-reveal-letter) {
    display: inline-block;
    will-change: transform, opacity;
  }
}
</style>
