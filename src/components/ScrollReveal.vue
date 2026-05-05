<template>
  <component
    :is="as"
    ref="root"
    class="scroll-reveal"
    :class="{ 'scroll-reveal-visible': visible }"
    :style="delayStyle"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'ScrollReveal',
  props: {
    as: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'div',
    },
    delay: {
      type: Number,
      default: 0,
    },
    once: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
      observer: undefined as IntersectionObserver | undefined,
    }
  },
  computed: {
    delayStyle(): Record<string, string> {
      return {
        transitionDelay: `${this.delay}ms`,
      }
    },
  },
  mounted() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.visible = true
      return
    }

    const rootElement = this.$refs.root as Element | undefined
    if (!rootElement) return

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || !entry.isIntersecting) {
          if (!this.once) this.visible = false
          return
        }

        this.visible = true
        if (this.once) this.observer?.unobserve(entry.target)
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )

    this.observer.observe(rootElement)
  },
  beforeUnmount() {
    this.observer?.disconnect()
  },
})
</script>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: translate3d(0, 1.75rem, 0);
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.scroll-reveal-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    opacity: 1;
    transform: none;
    transition: none;
    will-change: auto;
  }
}
</style>
