<template>
  <nav class="nav">
    <div class="container nav-content">
      <div class="logo">
        <span class="logo-full">Mats Hazebroek</span>
        <span class="logo-short">Mats H.</span>
      </div>
      <div class="nav-menu-scroll">
        <ul class="nav-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#projecten">Projecten</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navigation',
})
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-surface);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  height: 5rem;
}

.logo {
  font-size: clamp(0.95rem, 2.8vw, 1.25rem);
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.2;
  min-width: 0;
  white-space: nowrap;
}

.logo-short {
  display: none;
}

.nav-menu {
  display: flex;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.45rem 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  transition:
    color 0.2s,
    background-color 0.2s,
    border-color 0.2s;
}

.nav-menu a:hover {
  color: var(--color-accent);
  background: var(--color-accent-soft);
  border-color: color-mix(in srgb, var(--color-accent) 40%, var(--color-border));
}

@media (max-width: 768px) {
  .nav-content {
    gap: 0.6rem;
    height: 4rem;
  }

  .nav-menu {
    gap: 0.4rem;
  }

  .nav-menu a {
    font-size: 0.875rem;
    padding: 0.4rem 0.7rem;
  }
}

@media (max-width: 580px) {
  .logo-full {
    display: none;
  }

  .logo-short {
    display: inline;
  }
}

@media (max-width: 480px) {
  .nav-content {
    gap: 0.5rem;
  }

  .nav-menu {
    gap: 0.3rem;
  }

  .nav-menu a {
    font-size: 0.78rem;
    padding: 0.4rem 0.55rem;
  }
}
</style>
