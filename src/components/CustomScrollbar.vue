<template>
  <div
    ref="scrollbarTrack"
    class="scrollbar"
    role="scrollbar"
    aria-orientation="vertical"
    aria-controls="app"
    aria-label="Pagina scrollbalk"
    :aria-valuenow="ariaValueNow"
    aria-valuemin="0"
    aria-valuemax="100"
    tabindex="0"
    @click="onTrackClick"
    @keydown="onKeyDown"
  >
    <div
      class="scrollbar-thumb"
      :style="{ height: `${thumbHeight}px`, transform: `translateY(${thumbTop}px)` }"
      @pointerdown="onPointerDown"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const trackHeight = 220
const minThumbHeight = 46
const arrowKeyStep = 60

export default defineComponent({
  name: 'CustomScrollbar',
  data() {
    return {
      scrollOffsetY: 0,
      viewportHeight: 0,
      documentHeight: 1,
      isDragging: false,
      rafId: 0,
    }
  },
  computed: {
    maxScroll(): number {
      return Math.max(this.documentHeight - this.viewportHeight, 1)
    },
    scrollProgress(): number {
      return Math.min(Math.max(this.scrollOffsetY / this.maxScroll, 0), 1)
    },
    thumbHeight(): number {
      const viewportRatio = this.viewportHeight / this.documentHeight
      return Math.max(Math.round(trackHeight * viewportRatio), minThumbHeight)
    },
    maxThumbTop(): number {
      return Math.max(trackHeight - this.thumbHeight, 1)
    },
    thumbTop(): number {
      return Math.round(this.scrollProgress * this.maxThumbTop)
    },
    ariaValueNow(): number {
      return Math.round(this.scrollProgress * 100)
    },
  },
  mounted() {
    this.updateMetrics()
    window.addEventListener('scroll', this.scheduleUpdate, { passive: true })
    window.addEventListener('resize', this.scheduleUpdate)
    window.addEventListener('pointermove', this.onPointerMove)
    window.addEventListener('pointerup', this.onPointerUp)
  },
  beforeUnmount() {
    if (this.rafId) cancelAnimationFrame(this.rafId)
    window.removeEventListener('scroll', this.scheduleUpdate)
    window.removeEventListener('resize', this.scheduleUpdate)
    window.removeEventListener('pointermove', this.onPointerMove)
    window.removeEventListener('pointerup', this.onPointerUp)
  },
  methods: {
    scheduleUpdate() {
      if (this.rafId) return
      this.rafId = requestAnimationFrame(() => {
        this.rafId = 0
        this.updateMetrics()
      })
    },
    updateMetrics() {
      this.viewportHeight = window.innerHeight
      this.documentHeight = document.documentElement.scrollHeight
      this.scrollOffsetY = window.scrollY
    },
    prefersReducedMotion(): boolean {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    },
    smoothScrollTo(targetScrollY: number) {
      const behavior: ScrollBehavior = this.prefersReducedMotion() ? 'auto' : 'smooth'
      window.scrollTo({ top: targetScrollY, behavior })
    },
    scrollByPixels(deltaY: number) {
      const target = Math.min(Math.max(this.scrollOffsetY + deltaY, 0), this.maxScroll)
      this.smoothScrollTo(target)
    },
    onTrackClick(event: MouseEvent) {
      const trackElement = event.currentTarget as HTMLDivElement | null
      if (!trackElement) return
      const trackBounds = trackElement.getBoundingClientRect()
      const clickOffsetY = event.clientY - trackBounds.top
      const progressRatio = Math.min(Math.max(clickOffsetY / trackBounds.height, 0), 1)
      this.smoothScrollTo(progressRatio * this.maxScroll)
    },
    onPointerMove(event: PointerEvent) {
      if (!this.isDragging) return
      const trackElement = this.$refs.scrollbarTrack as HTMLDivElement | undefined
      if (!trackElement) return
      const trackBounds = trackElement.getBoundingClientRect()
      const pointerOffsetY = event.clientY - trackBounds.top
      const progressRatio = Math.min(Math.max(pointerOffsetY / trackBounds.height, 0), 1)
      const targetScrollY = progressRatio * this.maxScroll
      window.scrollTo({ top: targetScrollY, behavior: 'auto' })
    },
    onPointerUp() {
      this.isDragging = false
    },
    onPointerDown(event: PointerEvent) {
      this.isDragging = true
      const thumbElement = event.currentTarget as HTMLDivElement | null
      thumbElement?.setPointerCapture(event.pointerId)
    },
    onKeyDown(event: KeyboardEvent) {
      const pageStep = Math.max(this.viewportHeight - 40, 100)

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          this.scrollByPixels(arrowKeyStep)
          break
        case 'ArrowUp':
          event.preventDefault()
          this.scrollByPixels(-arrowKeyStep)
          break
        case 'PageDown':
          event.preventDefault()
          this.scrollByPixels(pageStep)
          break
        case 'PageUp':
          event.preventDefault()
          this.scrollByPixels(-pageStep)
          break
        case 'Home':
          event.preventDefault()
          this.smoothScrollTo(0)
          break
        case 'End':
          event.preventDefault()
          this.smoothScrollTo(this.maxScroll)
          break
        case ' ':
          event.preventDefault()
          this.scrollByPixels(event.shiftKey ? -pageStep : pageStep)
          break
      }
    },
  },
})
</script>

<style scoped>
.scrollbar {
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 220px;
  border-radius: 999px;
  background: var(--color-bg-muted);
  border: 1px solid var(--color-border);
  z-index: 120;
  cursor: pointer;
}

.scrollbar:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.scrollbar-thumb {
  width: calc(100% - 3px);
  margin-left: 1.5px;
  border-radius: 999px;
  background: var(--color-accent);
  transition: background-color 0.2s;
}

.scrollbar:hover .scrollbar-thumb {
  background: var(--color-accent-hover);
}

@media (max-width: 900px) {
  .scrollbar {
    display: none;
  }
}
</style>
