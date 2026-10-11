<template>
  <div ref="card" class="spotlight-card">
    <span class="spotlight-glow" aria-hidden="true" />
    <slot />
    <span class="spotlight-border-glow" aria-hidden="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createSpotlight } from '@/utilities/spotlight'

export default defineComponent({
  name: 'SpotlightCard',
  data() {
    return {
      stopSpotlight: undefined as (() => void) | undefined,
    }
  },
  mounted() {
    this.stopSpotlight = createSpotlight(this.$refs.card as HTMLElement)
  },
  beforeUnmount() {
    this.stopSpotlight?.()
  },
})
</script>

<style scoped lang="scss">
.spotlight-card {
  --spotlight-color: var(--color-accent);
  --spotlight-size: 260px;
  --spotlight-glow-intensity: 0.22;
  --spotlight-border-intensity: 0.75;
  position: relative;
  isolation: isolate;
  .spotlight-glow,
  .spotlight-border-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      circle calc(var(--spotlight-size) * (1 + 0.2 * var(--spotlight-press-strength, 0))) at
        var(--spotlight-x, 50%) var(--spotlight-y, 50%),
      var(--spotlight-color) 0%,
      color-mix(in srgb, var(--spotlight-color) 35%, transparent) 40%,
      transparent 100%
    );
  }
  .spotlight-glow {
    z-index: -1;
    opacity: calc(
      var(--spotlight-strength, 0) * var(--spotlight-glow-intensity) *
        (1 + 0.7 * var(--spotlight-press-strength, 0))
    );
  }
  .spotlight-border-glow {
    z-index: 2;
    padding: 1px;
    mask:
      linear-gradient(#000 0 0) content-box exclude,
      linear-gradient(#000 0 0);
    opacity: calc(var(--spotlight-strength, 0) * var(--spotlight-border-intensity));
  }
}
</style>
