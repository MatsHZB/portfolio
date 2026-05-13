<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-name">
          <h1>Mats<br />Hazebroek</h1>
        </div>
        <div class="hero-details">
          <p class="hero-eyebrow">
            <span>Junior Software Developer</span>
            <span class="hero-eyebrow-sep" aria-hidden="true">—</span>
            <span>Terraindex · HBO ICT</span>
          </p>
          <p class="tagline">
            Ik bouw full stack webapps op werk met Vue en TypeScript, in het teamproject op school
            met Lit en Spring Boot en in eigen tijd met wat ik wil uitproberen.
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
  min-height: calc(60vh - 5rem);
  display: flex;
  align-items: center;
  background: var(--color-bg);
  padding: clamp(2rem, 4vw, 3rem) 0;
  border-bottom: 1px solid var(--color-border);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  width: 100%;
}

.hero h1 {
  font-size: clamp(3rem, 7vw, 5.5rem);
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--color-text);
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
  font-weight: 600;
  margin: 0 0 1.1rem;
}

.hero-eyebrow-sep {
  color: var(--color-border);
  font-weight: 400;
  letter-spacing: 0;
}

.tagline {
  margin: 0 0 1.25rem;
  color: var(--color-text-muted);
  font-size: clamp(0.85rem, 1.3vw, 0.95rem);
  line-height: 1.75;
}

.hero-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 0.65rem;
  margin: 0 0 1.1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.hero-meta-item {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text);
}

.hero-meta-sep {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1;
  user-select: none;
}

.scroll-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-text-muted);
  font-size: 0.68rem;
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

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .hero {
    padding: 2rem 0;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: clamp(2.6rem, 11vw, 3.5rem);
  }

  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-buttons .btn {
    width: 100%;
    max-width: none;
  }

  .scroll-hint {
    display: flex;
    justify-content: center;
  }
}
</style>
