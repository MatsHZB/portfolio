<template>
  <section id="about" class="about section-padding">
    <div class="container">
      <ScrollReveal>
        <h2 class="section-title">Over Mij</h2>
      </ScrollReveal>
      <div class="about-grid">
        <ScrollReveal>
          <div class="about-image">
            <svg class="about-clip-defs" width="0" height="0" aria-hidden="true" focusable="false">
              <defs>
                <clipPath id="aboutPortraitBlob" clipPathUnits="objectBoundingBox">
                  <path
                    d="M 0.16 0.18 C 0.02 0.38 0.08 0.62 0.14 0.78 C 0.06 0.88 0.22 0.98 0.42 0.96 C 0.58 0.99 0.82 0.94 0.92 0.76 C 0.99 0.58 0.98 0.34 0.88 0.16 C 0.82 0.02 0.52 0.02 0.32 0.06 C 0.14 0.02 0.22 0.08 0.16 0.18 Z"
                  />
                </clipPath>
              </defs>
            </svg>
            <div class="about-portrait-frame">
              <img
                class="about-portrait-img"
                src="/images/mats-portrait.png"
                alt="Mats Hazebroek"
                width="480"
                height="640"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal :delay="100">
          <div class="about-text">
            <p>
              Ik zit in mijn tweede jaar HBO ICT, richting Software Development. In mijn huidige
              schoolproject werk ik in een Scrum-team aan een webapplicatie met Lit en plain CSS aan
              de frontend en Java met Spring Boot aan de backend. Per sprint pak ik op wat het
              project op dat moment nodig heeft (frontend, backend of allebei).
            </p>
            <p>
              Naast school werk ik als Junior Software Developer bij Terraindex BV met Vue 3 en
              TypeScript, waar ik leer wat het is om in een echte codebase te werken: code reviews,
              pull requests en code die anderen straks moeten onderhouden. Daarnaast bouw ik aan
              eigen projecten zoals Dots Development om te experimenteren met technologieën die ik
              niet tegenkom op school en om werk te bieden wat anderen kunnen gebruiken.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ScrollReveal from '@/components/ScrollReveal.vue'

export default defineComponent({
  name: 'About',
  components: {
    ScrollReveal,
  },
})
</script>

<style scoped>
.about {
  background: var(--color-bg-muted);
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--color-text);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  align-items: center;
}

.about-image {
  display: flex;
  justify-content: center;
}

.about-clip-defs {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.about-portrait-frame {
  width: 100%;
  max-width: min(100%, 380px);
  margin: 0 auto;
  transform: rotate(-5deg);
  filter: drop-shadow(0 12px 28px rgba(31, 26, 23, 0.14));
}

.about-portrait-img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  object-position: center 18%;
  clip-path: url(#aboutPortraitBlob);
}

.about-text p {
  margin-bottom: 1rem;
  color: var(--color-text);
}

@media (prefers-reduced-motion: reduce) {
  .about-portrait-frame {
    transform: none;
  }
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 1.8rem;
    text-align: center;
  }

  .about-portrait-frame {
    transform: rotate(-3deg);
  }
}
</style>
