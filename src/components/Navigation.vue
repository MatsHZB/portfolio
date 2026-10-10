<template>
  <nav class="nav">
    <div class="container nav-content">
      <a href="#home" class="logo" aria-label="Mats Hazebroek, naar home">
        <span class="logo-full-name">Mats Hazebroek</span>
        <span class="logo-initials">MH</span>
        <span class="logo-dot" aria-hidden="true">.</span>
      </a>
      <div class="nav-scroll-area">
        <ul class="nav-menu">
          <li
            v-for="(section, sectionIndex) in sections"
            :key="section.id"
            :class="{ 'hidden-on-phone': section.id === 'home' }"
          >
            <a
              :href="`#${section.id}`"
              class="nav-link"
              :class="{ 'is-active': sectionIndex === activeIndex }"
              :aria-current="sectionIndex === activeIndex ? 'location' : undefined"
              >{{ section.label }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { activeSection, sections } from '@/lib/activeSection'

export default defineComponent({
  name: 'Navigation',
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
})
</script>

<style scoped lang="scss">
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    height: 5rem;
    @media (max-width: 768px) {
      height: 4.5rem;
      gap: 0.75rem;
    }
  }
  .logo {
    font-size: clamp(1rem, 2.5vw, 1.15rem);
    font-weight: 700;
    color: var(--color-text);
    line-height: 1.2;
    min-width: 0;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    letter-spacing: -0.02em;
    text-decoration: none;
  }
  .logo:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
  }
  .logo-full-name {
    @media (max-width: 580px) {
      display: none;
    }
  }
  .logo-initials {
    display: none;
    @media (max-width: 580px) {
      display: inline;
    }
  }
  .logo-dot {
    margin-left: -0.45rem;
    color: var(--color-accent);
  }
  .nav-scroll-area {
    min-width: 0;
    overflow-x: auto;
    padding-block: 4px;
    scrollbar-width: none;
  }
  .nav-scroll-area::-webkit-scrollbar {
    display: none;
  }
  .nav-menu {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
    @media (max-width: 768px) {
      gap: 1.25rem;
    }
    @media (max-width: 420px) {
      gap: 0.75rem;
    }
    @media (max-width: 360px) {
      gap: 0.5rem;
    }
  }
  .hidden-on-phone {
    @media (max-width: 580px) {
      display: none;
    }
  }
  .nav-link {
    display: inline-block;
    white-space: nowrap;
    color: var(--color-text-muted);
    text-decoration: none;
    font-size: 0.92rem;
    font-weight: 500;
    padding: 0.25rem 0;
    position: relative;
    transition: color 0.2s;
    @media (max-width: 768px) {
      font-size: 0.86rem;
    }
    @media (max-width: 420px) {
      font-size: 0.82rem;
    }
    @media (max-width: 360px) {
      font-size: 0.73rem;
    }
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-accent);
    transition: width 0.25s ease;
  }
  .nav-link:hover,
  .nav-link.is-active {
    color: var(--color-accent);
  }
  .nav-link:hover::after,
  .nav-link.is-active::after {
    width: 100%;
  }
}
</style>
