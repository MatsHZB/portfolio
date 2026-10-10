<template>
  <nav class="section-indicator" aria-label="Secties">
    <ol class="indicator-list">
      <li
        v-for="(section, sectionIndex) in sections"
        :key="section.id"
        class="indicator-item"
        :class="{ 'is-active': sectionIndex === activeIndex }"
      >
        <button
          type="button"
          class="indicator-dot"
          :aria-label="section.label"
          :aria-current="sectionIndex === activeIndex ? 'true' : undefined"
          @click="scrollToSection(section.id)"
        >
          <span
            class="indicator-fill"
            :style="{ transform: `scaleY(${fillAmount(sectionIndex)})` }"
            aria-hidden="true"
          />
        </button>
        <span class="indicator-label" aria-hidden="true">{{ section.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { activeSection, scrollToSection, sections } from '@/lib/activeSection'

export default defineComponent({
  name: 'SectionIndicator',
  data() {
    return {
      sections,
    }
  },
  computed: {
    activeIndex(): number {
      return activeSection.activeIndex
    },
  },
  methods: {
    scrollToSection,
    fillAmount(sectionIndex: number): number {
      if (sectionIndex < this.activeIndex) return 1
      if (sectionIndex > this.activeIndex) return 0
      return activeSection.progress
    },
  },
})
</script>

<style scoped lang="scss">
.section-indicator {
  position: fixed;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 120;
  padding: 10px 7px;
  border: 1px solid var(--color-border);
  border-radius: 0;
  background: var(--color-surface);
  box-shadow: 0 6px 20px rgba(22, 32, 42, 0.1);
  @media (max-width: 900px) {
    display: none;
  }
  .indicator-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .indicator-item {
    position: relative;
    display: flex;
    align-items: center;
  }
  .indicator-dot {
    position: relative;
    display: block;
    width: 10px;
    height: 10px;
    padding: 0;
    border: 1px solid var(--color-text-muted);
    border-radius: 999px;
    background: var(--color-bg-muted);
    overflow: hidden;
    cursor: pointer;
    transition:
      height 0.45s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.2s;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
  .indicator-dot::before {
    content: '';
    position: absolute;
    inset: -3px -8px;
  }
  .indicator-dot:hover {
    border-color: var(--color-accent);
  }
  .indicator-dot:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }
  .indicator-item.is-active .indicator-dot {
    height: 72px;
    border-color: var(--color-accent);
  }
  .indicator-fill {
    position: absolute;
    inset: 0;
    background: var(--color-accent);
    transform-origin: top;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
  .indicator-label {
    position: absolute;
    right: calc(100% + 18px);
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
    color: var(--color-text);
    opacity: 0;
    transform: translateX(4px);
    transition:
      opacity 0.2s,
      transform 0.2s;
    pointer-events: none;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
  .indicator-item:hover .indicator-label,
  .indicator-dot:focus-visible + .indicator-label {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
