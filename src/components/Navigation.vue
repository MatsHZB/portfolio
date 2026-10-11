<template>
  <nav class="navigation">
    <div class="container navigation-content">
      <a
        href="#home"
        class="logo"
        :class="{ 'is-active': activeSectionId === 'home' }"
        :aria-current="activeSectionId === 'home' ? 'location' : undefined"
        aria-label="Mats Hazebroek, naar boven"
      >
        <span class="logo-full-name">Mats Hazebroek</span>
        <span class="logo-initials">MH</span>
        <span class="logo-dot" aria-hidden="true">.</span>
      </a>
      <div class="navigation-scroll-area">
        <ul ref="menu" class="navigation-menu">
          <li v-for="section in menuSections" :key="section.id">
            <a
              ref="links"
              :href="`#${section.id}`"
              class="navigation-link"
              :class="{ 'is-active': section.id === activeSectionId }"
              :aria-current="section.id === activeSectionId ? 'location' : undefined"
              >{{ section.label }}</a
            >
          </li>
          <li
            class="navigation-underline"
            :class="{ 'is-placed': isUnderlinePlaced }"
            :style="underlineStyle"
            aria-hidden="true"
          />
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { activeSection, sections } from '@/utilities/activeSection'

export default defineComponent({
  name: 'Navigation',
  data() {
    return {
      menuSections: sections.filter((section) => section.id !== 'home'),
      underlineLeft: 0,
      underlineWidth: 0,
      isUnderlinePlaced: false,
      menuResizeObserver: undefined as ResizeObserver | undefined,
    }
  },
  computed: {
    activeSectionId(): string {
      return sections[activeSection.activeIndex]?.id ?? 'home'
    },
    underlineStyle(): Record<string, string> {
      return {
        width: `${this.underlineWidth}px`,
        transform: `translateX(${this.underlineLeft}px)`,
      }
    },
  },
  watch: {
    activeSectionId() {
      this.placeUnderline()
    },
  },
  mounted() {
    this.menuResizeObserver = new ResizeObserver(() => this.placeUnderline())
    this.menuResizeObserver.observe(this.$refs.menu as HTMLElement)
    this.placeUnderline()
    requestAnimationFrame(() => (this.isUnderlinePlaced = true))
  },
  beforeUnmount() {
    this.menuResizeObserver?.disconnect()
  },
  methods: {
    placeUnderline() {
      const links = (this.$refs.links as HTMLElement[] | undefined) ?? []
      const activeLink = links[this.menuSections.findIndex(({ id }) => id === this.activeSectionId)]
      const link = activeLink ?? links[0]
      if (!link) return

      this.underlineLeft = link.offsetLeft
      this.underlineWidth = activeLink ? link.offsetWidth : 0
    },
  },
})
</script>

<style scoped lang="scss">
.navigation {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  .navigation-content {
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
    transition: color 0.2s;
  }
  .logo:hover,
  .logo.is-active {
    color: var(--color-accent);
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
  .navigation-scroll-area {
    min-width: 0;
    overflow-x: auto;
    padding-block: 4px;
    scrollbar-width: none;
  }
  .navigation-scroll-area::-webkit-scrollbar {
    display: none;
  }
  .navigation-menu {
    position: relative;
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
  .navigation-link {
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
  .navigation-link:hover,
  .navigation-link.is-active {
    color: var(--color-accent);
  }
  .navigation-underline {
    position: absolute;
    bottom: -2px;
    left: 0;
    height: 2px;
    border-radius: 2px;
    background: var(--color-accent);
    pointer-events: none;
  }
  .navigation-underline.is-placed {
    transition:
      transform 0.45s cubic-bezier(0.65, 0, 0.35, 1),
      width 0.45s cubic-bezier(0.65, 0, 0.35, 1);
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
}
</style>
