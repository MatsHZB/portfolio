<template>
  <section id="about" class="about section-padding">
    <div class="container">
      <h2 v-reveal class="section-title">Over mij</h2>
      <div class="about-grid">
        <div v-reveal class="about-image">
          <div class="portrait-frame">
            <div v-parallax:y="-14" class="portrait-color-block" aria-hidden="true" />
            <div class="portrait-crop">
              <img
                v-parallax="6"
                class="portrait-image"
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
        </div>
        <div v-reveal="100" class="about-text">
          <p>
            Ik leer het snelst waar theorie naast echte code staat. In mijn huidige schoolproject
            werk ik in een team aan een project in C# met .NET.
          </p>
          <p>
            Bij Terraindex BV werk ik als junior softwareontwikkelaar met Vue 3 en TypeScript, waar
            ik leer wat het is om in een echte codebase te werken: codereviews, pull requests en
            code die anderen straks moeten onderhouden. Daarnaast bouw ik aan eigen projecten zoals
            Dots Development om te experimenteren met technologieën die ik niet tegenkom op school
            en om waardevolle software te bouwen voor anderen.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About',
})
</script>

<style scoped lang="scss">
.about {
  background: var(--color-bg-muted);
  border-top: 1px solid var(--color-border);
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 4rem;
    align-items: center;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }
  .about-image {
    display: flex;
    justify-content: center;
  }
  .portrait-frame {
    position: relative;
    width: 100%;
    max-width: min(100%, 320px);
    margin: 0 auto;
    padding-right: 10px;
    padding-bottom: 10px;
    @media (max-width: 900px) {
      max-width: min(100%, 260px);
    }
  }
  .portrait-color-block {
    position: absolute;
    inset: 10px 0 0 10px;
    background: var(--color-accent);
  }
  .portrait-crop {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
  }
  .portrait-image {
    position: absolute;
    top: -8%;
    left: 0;
    display: block;
    width: 100%;
    height: 116%;
    object-fit: cover;
    object-position: center 18%;
  }
  .about-text p {
    margin-bottom: 1.25rem;
    color: var(--color-text);
  }
  .about-text p:last-child {
    margin-bottom: 0;
  }
}
</style>
