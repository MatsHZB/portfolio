<template>
  <nav class="nav">
    <div class="container nav-content">
      <div class="logo">
        <span class="logo-slash" aria-hidden="true">//</span>
        <span class="logo-full">Mats Hazebroek</span>
        <span class="logo-short">MH</span>
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
  font-size: clamp(0.9rem, 2.5vw, 1.05rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
  min-width: 0;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  letter-spacing: -0.01em;
}

.logo-slash {
  color: var(--color-accent);
  font-weight: 700;
  letter-spacing: -0.04em;
}

.logo-short {
  display: none;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.25rem 0;
  position: relative;
  transition: color 0.2s;
}

.nav-menu a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width 0.25s ease;
}

.nav-menu a:hover {
  color: var(--color-accent);
}

.nav-menu a:hover::after {
  width: 100%;
}

@media (max-width: 768px) {
  .nav-content {
    height: 4.5rem;
    gap: 0.75rem;
  }

  .nav-menu {
    gap: 1.25rem;
  }

  .nav-menu a {
    font-size: 0.75rem;
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

@media (max-width: 420px) {
  .nav-menu {
    gap: 0.9rem;
  }

  .nav-menu a {
    font-size: 0.7rem;
    letter-spacing: 0.04em;
  }
}
</style>
