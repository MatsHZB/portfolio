<template>
  <section id="about" class="about section-padding">
    <div class="container">
      <ScrollReveal>
        <h2 class="section-title">Over Mij</h2>
      </ScrollReveal>
      <div class="about-grid">
        <ScrollReveal>
          <div class="about-image">
            <div class="about-portrait-frame">
              <img
                class="about-portrait-img"
                src="/images/mats-portrait.webp"
                srcset="/images/mats-portrait.webp 1x, /images/mats-portrait@2x.webp 2x"
                alt="Mats Hazebroek"
                width="380"
                height="570"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal :delay="100">
          <div class="about-text">
            <p>
              Ik leer het snelst waar theorie naast echte code staat. In mijn huidige schoolproject
              werk ik in een Scrum-team aan een webapplicatie met Lit en plain CSS aan de frontend
              en Java met Spring Boot aan de backend. Per sprint pak ik op wat het project op dat
              moment nodig heeft.
            </p>
            <p>
              Bij Terraindex BV werk ik als Junior Software Developer met Vue 3 en TypeScript, waar
              ik leer wat het is om in een echte codebase te werken: code reviews, pull requests en
              code die anderen straks moeten onderhouden. Daarnaast bouw ik aan eigen projecten
              zoals Dots Development om te experimenteren met technologieën die ik niet tegenkom op
              school en om waardevolle software te bouwen voor anderen.
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
  border-top: 1px solid var(--color-border);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 4rem;
  align-items: center;
}

.about-image {
  display: flex;
  justify-content: center;
}

.about-portrait-frame {
  width: 100%;
  max-width: min(100%, 320px);
  margin: 0 auto;
  padding-right: 10px;
  padding-bottom: 10px;
}

.about-portrait-img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  object-position: center 18%;
  box-shadow: 10px 10px 0 var(--color-accent);
}

.about-text p {
  margin-bottom: 1.25rem;
  color: var(--color-text);
}

.about-text p:last-child {
  margin-bottom: 0;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .about-portrait-frame {
    max-width: min(100%, 260px);
  }
}
</style>
