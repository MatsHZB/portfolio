<template>
  <footer class="footer">
    <div class="container footer-content">
      <p class="copyright">© {{ year }} Mats Hazebroek</p>
      <div class="footer-links">
        <a
          v-for="link in contactLinks"
          :key="link.id"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contactLinks } from '@/data/contactLinks'

export default defineComponent({
  name: 'SiteFooter',
  data() {
    return {
      contactLinks,
      year: new Date().getFullYear(),
    }
  },
})
</script>

<style scoped>
.footer {
  padding: 2rem 0;
  border-top: 3px solid var(--color-accent);
  background: var(--color-bg-muted);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.copyright {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 1.75rem;
  flex-wrap: wrap;
}

.footer-links a {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  text-decoration: none;
  padding-bottom: 1px;
  border-bottom: 1px solid transparent;
  transition:
    color 0.2s,
    border-color 0.2s;
}

.footer-links a:hover {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

@media (max-width: 640px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
