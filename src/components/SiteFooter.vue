<template>
  <footer class="footer">
    <div class="container footer-content">
      <p class="copyright">@ {{ year }} Mats Hazebroek</p>
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
  padding: 3rem 0;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-muted);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-size: 0.875rem;
  opacity: 0.6;
  color: var(--color-text-muted);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-links a {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  text-decoration: none;
}

.footer-links a:hover {
  color: var(--color-accent);
}

@media (max-width: 900px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
