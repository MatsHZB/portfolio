<template>
  <section id="contact" class="contact section-padding">
    <div class="container contact-content">
      <h2 class="section-title section-title-lead">Contact</h2>
      <p class="section-subtitle">Laten we connecten!</p>
      <div class="social-links">
        <a
          v-for="link in contactLinks"
          :key="link.id"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="social-link"
        >
          <span class="icon">{{ link.icon }}</span>
          <span>{{ link.text }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contactLinks } from '@/data/contactLinks'

export default defineComponent({
  name: 'Contact',
  data() {
    return {
      contactLinks,
    }
  },
})
</script>

<style scoped>
.contact {
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
}

.contact-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--color-text);
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.social-link:hover {
  background: var(--color-surface);
  border-color: var(--color-accent);
}

.icon {
  font-weight: bold;
  color: var(--color-accent);
}

@media (max-width: 900px) {
  .social-links {
    gap: 0.85rem;
  }

  .social-link {
    width: min(100%, 22rem);
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .social-links {
    flex-direction: column;
    align-items: center;
  }

  .social-link {
    width: min(100%, 22rem);
    max-width: 22rem;
  }
}
</style>
