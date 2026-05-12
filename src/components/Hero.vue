<template>
  <section id="home" class="hero">
    <div class="container hero-content">
      <h1>Mats Hazebroek</h1>
      <h2>
        <span>Junior Software Developer bij Terraindex</span>
        <span class="hero-subtitle-sep" aria-hidden="true">/</span>
        <span>Tweedejaars HBO ICT · Software Development</span>
      </h2>
      <p class="tagline">
        Ik bouw full stack webapps op werk met Vue en TypeScript, in het teamproject op school met
        Lit en Spring Boot en in eigen tijd met wat ik wil uitproberen.
      </p>
      <div class="hero-buttons">
        <a href="#projecten" class="btn btn-primary">Bekijk projecten</a>
        <a href="#contact" class="btn btn-secondary">Contact</a>
      </div>
      <p class="hero-meta" aria-label="Kernpunten">
        <span class="hero-meta-item">Terraindex</span>
        <span class="hero-meta-sep" aria-hidden="true">/</span>
        <span class="hero-meta-item">Full stack basis</span>
        <span class="hero-meta-sep" aria-hidden="true">/</span>
        <span class="hero-meta-item">Scrum</span>
        <span class="hero-meta-sep" aria-hidden="true">/</span>
        <span class="hero-meta-item">UX focus</span>
      </p>
      <a href="#about" class="scroll-hint" aria-label="Scroll naar volgende sectie">
        Scroll voor meer
        <span class="scroll-hint-arrow" aria-hidden="true">↓</span>
      </a>
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
  min-height: calc(58vh - 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-muted) 100%);
  padding: clamp(1.75rem, 4vw, 2.75rem) 0;
}

.hero-content {
  max-width: 800px;
}

.hero h1 {
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.hero h2 {
  font-size: clamp(1.1rem, 2.6vw, 1.5rem);
  font-weight: 500;
  margin-bottom: 1.1rem;
  color: var(--color-text-muted);
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5em;
}

.hero-subtitle-sep {
  color: var(--color-accent);
  font-weight: 700;
}

.tagline {
  max-width: 600px;
  margin: 0 auto 1.35rem;
  color: var(--color-text-muted);
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.35rem;
}

.hero-meta {
  margin: 0 auto 1rem;
  max-width: 720px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.55rem 1rem;
}

.hero-meta-item {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text);
}

.hero-meta-sep {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1;
  user-select: none;
}

.scroll-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--color-text-muted);
  font-size: 0.82rem;
  text-decoration: none;
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
    padding-top: 1.75rem;
    padding-bottom: clamp(1.5rem, 4vw, 2rem);
  }

  .hero h2 {
    font-size: 1.25rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }

  .hero-meta {
    gap: 0.4rem 0.7rem;
  }

  .hero-meta-item {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
  }

  .hero-meta-sep {
    font-size: 0.95rem;
  }
}
</style>
