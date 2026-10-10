<template>
  <div class="dot-grid" aria-hidden="true">
    <canvas ref="canvas" class="dot-grid-canvas" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createDotGrid } from '@/lib/dotGrid'

export default defineComponent({
  name: 'DotGridBackground',
  data() {
    return {
      stopDotGrid: undefined as (() => void) | undefined,
    }
  },
  mounted() {
    const section = (this.$el as HTMLElement).parentElement ?? (this.$el as HTMLElement)
    this.stopDotGrid = createDotGrid(this.$refs.canvas as HTMLCanvasElement, section)
  },
  beforeUnmount() {
    this.stopDotGrid?.()
  },
})
</script>

<style scoped lang="scss">
.dot-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 85% 90% at 50% 50%, #000 45%, transparent 100%);
  .dot-grid-canvas {
    display: block;
  }
}
</style>
