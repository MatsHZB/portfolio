<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <p class="hero-eyebrow">
          <span>Junior Software Developer</span>
          <span class="hero-eyebrow-sep" aria-hidden="true">—</span>
          <span>Terraindex · HBO ICT</span>
        </p>
        <h1>Mats<br />Hazebroek</h1>
        <p class="tagline">
          Ik bouw full stack webapps op werk met Vue en TypeScript, in het teamproject op school met
          Lit en Spring Boot en in eigen tijd met wat ik wil uitproberen.
        </p>
        <div class="hero-buttons">
          <a href="#projecten" class="btn btn-primary">Bekijk projecten</a>
          <a href="#contact" class="btn btn-secondary">Contact</a>
        </div>
        <div class="hero-meta" aria-label="Kernpunten">
          <span class="hero-meta-item">Terraindex</span>
          <span class="hero-meta-sep" aria-hidden="true">/</span>
          <span class="hero-meta-item">Full stack basis</span>
          <span class="hero-meta-sep" aria-hidden="true">/</span>
          <span class="hero-meta-item">Scrum</span>
          <span class="hero-meta-sep" aria-hidden="true">/</span>
          <span class="hero-meta-item">UX focus</span>
        </div>
        <a href="#about" class="scroll-hint" aria-label="Scroll naar volgende sectie">
          Scroll voor meer
          <span class="scroll-hint-arrow" aria-hidden="true">↓</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Hero',
})
</script>

<style scoped>
.hero {
  min-height: calc(90vh - 5rem);
  display: flex;
  align-items: center;
  background: var(--color-bg);
  padding: clamp(3rem, 6vw, 5rem) 0 clamp(2.5rem, 5vw, 4rem);
  border-bottom: 1px solid var(--color-border);
}

.hero-content {
  max-width: 680px;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem 0.85rem;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
  font-weight: 600;
  margin: 0 0 1.75rem;
}

.hero-eyebrow-sep {
  color: var(--color-border);
  font-weight: 400;
  letter-spacing: 0;
}

.hero h1 {
  font-size: clamp(3.2rem, 9vw, 6rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0 0 1.75rem;
  color: var(--color-text);
}

.tagline {
  max-width: 520px;
  margin: 0 0 2.25rem;
  color: var(--color-text-muted);
  font-size: clamp(0.9rem, 1.4vw, 1rem);
  line-height: 1.75;
}

.hero-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2.75rem;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.75rem;
  margin: 0 0 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.hero-meta-item {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text);
}

.hero-meta-sep {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 1rem;
  line-height: 1;
  user-select: none;
}

.scroll-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-text-muted);
  font-size: 0.72rem;
  text-decoration: none;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-bottom: 1px solid transparent;
  transition:
    color 0.2s,
    border-color 0.2s;
}

.scroll-hint:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.scroll-hint-arrow {
  display: inline-block;
  animation: hint-bounce 1.4s ease-in-out infinite;
}

@keyframes hint-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-hint-arrow {
    animation: none;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding-top: 2.5rem;
    padding-bottom: 2rem;
  }

  .hero h1 {
    font-size: clamp(2.6rem, 11vw, 3.5rem);
  }

  .hero-buttons {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn {
    max-width: 300px;
  }
}
</style>
