<template>
  <button
    type="button"
    class="theme-toggle"
    :class="{ 'is-dark': isDark }"
    role="switch"
    :aria-checked="isDark"
    aria-label="Donkere modus"
    @click="toggleTheme"
  >
    <span class="theme-toggle-knob" aria-hidden="true">
      <Moon v-if="isDark" :size="14" />
      <Sun v-else :size="14" />
    </span>
  </button>
</template>

<script lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { defineComponent } from 'vue'
import { themeState, toggleTheme } from '@/utilities/theme'

export default defineComponent({
  name: 'ThemeToggle',
  components: {
    Moon,
    Sun,
  },
  computed: {
    isDark(): boolean {
      return themeState.theme === 'dark'
    },
  },
  methods: {
    toggleTheme,
  },
})
</script>

<style scoped lang="scss">
.theme-toggle {
  position: relative;
  width: 3.25rem;
  height: 1.75rem;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  .theme-toggle-knob {
    position: absolute;
    top: 50%;
    left: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    background: var(--color-accent);
    color: var(--color-on-accent);
    transform: translateY(-50%);
    transition: transform 0.25s ease;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
}
.theme-toggle:hover {
  border-color: var(--color-accent);
}
.theme-toggle:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
.theme-toggle.is-dark .theme-toggle-knob {
  transform: translate(1.45rem, -50%);
}
</style>
