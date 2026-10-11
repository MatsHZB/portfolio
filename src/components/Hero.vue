<template>
  <section id="home" class="hero">
    <DotGridBackground />
    <div class="container hero-toolbar">
      <ThemeToggle />
    </div>
    <div class="container hero-content">
      <div class="hero-grid">
        <div class="hero-name">
          <LetterReveal tag="h1" :letter-delay="40" :duration="1">Mats<br />Hazebroek</LetterReveal>
        </div>
        <div class="hero-details">
          <p class="hero-role">
            <span>Junior softwareontwikkelaar</span>
            <span class="hero-role-separator" aria-hidden="true">·</span>
            <span>Terraindex · HBO ICT</span>
          </p>
          <p class="hero-introduction">
            Ik bouw software: op mijn werk webapplicaties met Vue en TypeScript, op school in een
            team met C# en .NET en in mijn eigen tijd met wat ik wil uitproberen.
          </p>
          <div class="hero-buttons">
            <Magnet>
              <a href="#projecten" class="button button-primary">Bekijk projecten</a>
            </Magnet>
            <Magnet>
              <a href="#contact" class="button button-secondary">Contact</a>
            </Magnet>
          </div>
          <div class="hero-highlights" aria-label="Kernpunten">
            <template v-for="(highlight, highlightIndex) in highlights" :key="highlight">
              <span v-if="highlightIndex > 0" class="hero-highlight-separator" aria-hidden="true"
                >·</span
              >
              <span class="hero-highlight">{{ highlight }}</span>
            </template>
          </div>
          <a href="#about" class="scroll-down-link" aria-label="Scroll naar volgende sectie">
            Scroll voor meer
            <ArrowDown class="scroll-down-arrow" :size="16" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ArrowDown } from 'lucide-vue-next'
import { defineComponent } from 'vue'
import DotGridBackground from '@/components/DotGridBackground.vue'
import LetterReveal from '@/components/LetterReveal.vue'
import Magnet from '@/components/Magnet.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

export default defineComponent({
  name: 'Hero',
  components: {
    ArrowDown,
    DotGridBackground,
    LetterReveal,
    Magnet,
    ThemeToggle,
  },
  data() {
    return {
      highlights: ['Terraindex', 'Front-end en back-end', 'Scrum', 'Oog voor gebruiksgemak'],
    }
  },
})
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  overflow: hidden;
  min-height: calc(60vh - 5rem);
  display: flex;
  align-items: center;
  background: var(--color-background);
  padding: clamp(2rem, 4vw, 3rem) 0;
  border-bottom: 1px solid var(--color-border);
  @media (max-width: 900px) {
    padding: 2rem 0;
  }
  h1 {
    font-size: clamp(3rem, 7vw, 5.5rem);
    line-height: 1;
    letter-spacing: -0.03em;
    margin: 0;
    color: var(--color-text);
    @media (max-width: 768px) {
      font-size: clamp(2.6rem, 11vw, 3.5rem);
    }
  }
  .hero-toolbar {
    position: absolute;
    top: 1rem;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
  }
  .hero-content {
    position: relative;
    z-index: 1;
    width: 100%;
  }
  .hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
    width: 100%;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
  .hero-role {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem 0.75rem;
    font-size: 0.95rem;
    color: var(--color-accent);
    font-weight: 600;
    margin: 0 0 1.1rem;
    .hero-role-separator {
      color: var(--color-text-muted);
      font-weight: 400;
    }
  }
  .hero-introduction {
    margin: 0 0 1.25rem;
    color: var(--color-text-muted);
    font-size: clamp(1rem, 1.4vw, 1.08rem);
    line-height: 1.7;
  }
  .hero-buttons {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    width: fit-content;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    @media (max-width: 768px) {
      grid-auto-flow: row;
      width: 100%;
    }
    .button {
      width: 100%;
      @media (max-width: 768px) {
        max-width: none;
      }
    }
  }
  .hero-highlights {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem 0.65rem;
    margin: 0 0 1.1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
    .hero-highlight {
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--color-text);
    }
    .hero-highlight-separator {
      color: var(--color-text-muted);
      font-weight: 700;
      line-height: 1;
      user-select: none;
    }
  }
  .scroll-down-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--color-text-muted);
    font-size: 0.88rem;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition:
      color 0.2s,
      border-color 0.2s;
    @media (max-width: 768px) {
      display: flex;
      justify-content: center;
    }
  }
  .scroll-down-link:hover {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }
  .scroll-down-arrow {
    display: inline-block;
    animation: gentle-bounce 1.4s ease-in-out infinite;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
}
@keyframes gentle-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}
</style>
