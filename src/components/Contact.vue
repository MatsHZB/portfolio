<template>
  <section id="contact" class="contact section-padding">
    <div class="container contact-content">
      <h2 class="section-title section-title-center section-title-lead">Contact</h2>
      <p class="contact-tagline">Heb je een vraag, idee of wil je samenwerken?</p>
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

.contact-tagline {
  font-size: clamp(0.94rem, 1.25vw, 1.06rem);
  font-weight: 500;
  color: var(--color-text-muted);
  margin: 0 0 2.5rem;
  line-height: 1.55;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1.4rem;
  border: 1px solid var(--color-border);
  border-radius: 0;
  text-decoration: none;
  color: var(--color-text);
  font-size: 0.875rem;
  letter-spacing: 0.02em;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.social-link:hover {
  background: var(--color-text);
  border-color: var(--color-text);
  color: var(--color-bg);
}

.icon {
  font-weight: bold;
  color: var(--color-accent);
  transition: color 0.2s;
}

.social-link:hover .icon {
  color: var(--color-bg);
}

@media (max-width: 768px) {
  .social-links {
    flex-direction: column;
    align-items: center;
  }

  .social-link {
    width: min(100%, 22rem);
  }
}
</style>
