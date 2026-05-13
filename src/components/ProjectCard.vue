<template>
  <div class="project-card" :class="{ 'is-flipped': flipped }">
    <div class="project-card-inner">
      <div class="project-card-face project-card-front" :inert="flipped">
        <div
          class="project-image"
          :class="{ 'project-image-logo': projectItem.imageFit === 'contain' }"
        >
          <img
            :src="projectItem.imageUrl"
            :srcset="projectItem.imageSrcset"
            :alt="projectItem.title"
            width="800"
            height="450"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="project-content">
          <h3>{{ projectItem.title }}</h3>
          <div class="tech-badges">
            <span v-for="technology in projectItem.technologies" :key="technology" class="badge">
              {{ technology }}
            </span>
          </div>
          <p>{{ projectItem.description }}</p>
          <div class="project-links">
            <button
              v-if="projectItem.details"
              type="button"
              class="link link-button"
              :aria-expanded="flipped"
              @click="flip"
            >
              Meer info →
            </button>
            <a v-if="projectItem.githubUrl" :href="projectItem.githubUrl" class="link">
              GitHub →
            </a>
            <a v-if="projectItem.demoUrl" :href="projectItem.demoUrl" class="link"> Live Demo → </a>
          </div>
        </div>
      </div>

      <div class="project-card-face project-card-back" :inert="!flipped">
        <h3>{{ projectItem.title }}</h3>
        <p class="project-details">{{ projectItem.details }}</p>
        <div class="project-links project-back-actions">
          <button type="button" class="link link-button" @click="flip">← Terug</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ProjectItem } from '@/interfaces/projectItem'

export default defineComponent({
  name: 'ProjectCard',
  props: {
    projectItem: {
      type: Object as PropType<ProjectItem>,
      required: true,
    },
  },
  data() {
    return {
      flipped: false,
    }
  },
  methods: {
    flip() {
      this.flipped = !this.flipped
    },
  },
})
</script>

<style scoped>
.project-card {
  position: relative;
  height: 100%;
  perspective: 1200px;
}

.project-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.project-card.is-flipped .project-card-inner {
  transform: rotateY(180deg);
}

.project-card-face {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);
  border-radius: 0;
  overflow: hidden;
  backface-visibility: hidden;
  transition: border-left-color 0.2s;
}

.project-card-front {
  height: 100%;
}

.project-card-back {
  position: absolute;
  inset: 0;
  padding: 1.75rem;
  transform: rotateY(180deg);
}

.project-card:hover .project-card-inner:not(.is-flipped) {
  transform: translateY(-4px);
}

.project-card.is-flipped:hover .project-card-inner {
  transform: rotateY(180deg) translateY(-4px);
}

.project-image {
  aspect-ratio: 16/9;
  overflow: hidden;
  flex-shrink: 0;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.03);
}

.project-image-logo {
  background: #000;
}

.project-image-logo img {
  background-color: #000;
  object-fit: contain;
  padding: clamp(1rem, 4vw, 2rem);
}

.project-image-logo:hover img {
  transform: none;
}

.project-content {
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-content h3 {
  margin: 0 0 0.6rem;
  color: var(--color-text);
  font-size: 1.1rem;
  letter-spacing: -0.01em;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.6rem 0 0.9rem;
}

.badge {
  background: var(--color-accent-soft);
  color: var(--color-accent);
  padding: 0.2rem 0.5rem;
  border-radius: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.project-content p {
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.project-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: auto;
}

.link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
}

.link:hover {
  color: var(--color-accent-hover);
}

.link-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
}

.project-card-back h3 {
  margin: 0 0 1rem;
  color: var(--color-text);
  font-size: 1.1rem;
  letter-spacing: -0.01em;
}

.project-details {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
  flex: 1;
  margin: 0 0 1rem;
  overflow: auto;
}

.project-back-actions {
  margin-top: 0;
}

@media (prefers-reduced-motion: reduce) {
  .project-card-inner {
    transition: none;
  }

  .project-card:hover .project-card-inner:not(.is-flipped),
  .project-card.is-flipped:hover .project-card-inner {
    transform: none;
  }

  .project-card.is-flipped:hover .project-card-inner,
  .project-card.is-flipped .project-card-inner {
    transform: rotateY(180deg);
  }

  .project-card:hover .project-image img {
    transform: none;
  }
}

@media (max-width: 768px) {
  .project-content {
    padding: 1.1rem;
  }

  .project-card-back {
    padding: 1.4rem;
  }
}
</style>
