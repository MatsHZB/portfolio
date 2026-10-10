<template>
  <div ref="area" class="magnet-area">
    <div ref="content" class="magnet-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { gsap, hasFinePointer, prefersReducedMotion } from '@/lib/motion'

type MoveTo = (position: number) => void

export default defineComponent({
  name: 'Magnet',
  props: {
    reach: {
      type: Number,
      default: 40,
    },
    pullRatio: {
      type: Number,
      default: 0.125,
    },
  },
  data() {
    return {
      moveContentX: undefined as MoveTo | undefined,
      moveContentY: undefined as MoveTo | undefined,
      isPulling: false,
    }
  },
  mounted() {
    if (!hasFinePointer || prefersReducedMotion) return

    const content = this.$refs.content as HTMLElement
    this.moveContentX = gsap.quickTo(content, 'x', { duration: 0.4, ease: 'power3.out' })
    this.moveContentY = gsap.quickTo(content, 'y', { duration: 0.4, ease: 'power3.out' })
    window.addEventListener('pointermove', this.onPointerMove, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('pointermove', this.onPointerMove)
    gsap.killTweensOf(this.$refs.content as HTMLElement)
  },
  methods: {
    onPointerMove(event: PointerEvent) {
      const { left, top, width, height } = (this.$refs.area as HTMLElement).getBoundingClientRect()
      const distanceX = event.clientX - (left + width / 2)
      const distanceY = event.clientY - (top + height / 2)
      const isWithinReach =
        Math.abs(distanceX) < width / 2 + this.reach &&
        Math.abs(distanceY) < height / 2 + this.reach

      if (isWithinReach) {
        this.isPulling = true
        this.moveContentX?.(distanceX * this.pullRatio)
        this.moveContentY?.(distanceY * this.pullRatio)
        return
      }

      if (!this.isPulling) return
      this.isPulling = false
      this.moveContentX?.(0)
      this.moveContentY?.(0)
    },
  },
})
</script>

<style scoped lang="scss">
.magnet-area {
  display: inline-block;
  .magnet-content {
    will-change: transform;
  }
}
</style>
