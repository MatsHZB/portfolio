<template>
  <div class="project-card" :class="{ 'is-flipped': isShowingDetails }">
    <div class="project-card-flipper">
      <SpotlightCard class="project-card-side project-card-front" :inert="isShowingDetails">
        <div
          class="project-image"
          :class="{ 'project-image-logo': project.imageFit === 'contain' }"
        >
          <div v-parallax="6" class="project-image-parallax">
            <img
              :src="project.imageUrl"
              :srcset="project.imageSrcset"
              :alt="project.title"
              width="800"
              height="450"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div class="project-content">
          <h3>{{ project.title }}</h3>
          <div class="technology-list">
            <span v-for="technology in project.technologies" :key="technology" class="technology">
              {{ technology }}
            </span>
          </div>
          <p>{{ project.description }}</p>
          <div class="project-links">
            <button
              v-if="project.details"
              type="button"
              class="project-link project-link-button"
              :aria-expanded="isShowingDetails"
              @click="toggleDetails"
            >
              Meer info
              <ArrowRight class="project-link-icon icon-forward" :size="16" aria-hidden="true" />
            </button>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
            >
              <Github class="project-link-icon" :size="16" aria-hidden="true" />
              GitHub
              <ArrowUpRight class="project-link-icon icon-external" :size="16" aria-hidden="true" />
            </a>
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
            >
              Bekijk demo
              <ArrowUpRight class="project-link-icon icon-external" :size="16" aria-hidden="true" />
            </a>
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard class="project-card-side project-card-back" :inert="!isShowingDetails">
        <h3>{{ project.title }}</h3>
        <p class="project-details">{{ project.details }}</p>
        <div class="project-links project-back-links">
          <button type="button" class="project-link project-link-button" @click="toggleDetails">
            <ArrowLeft class="project-link-icon icon-back" :size="16" aria-hidden="true" />
            Terug
          </button>
        </div>
      </SpotlightCard>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-vue-next'
import { defineComponent, type PropType } from 'vue'
import SpotlightCard from '@/components/SpotlightCard.vue'
import type { Project } from '@/interfaces/project'

export default defineComponent({
  name: 'ProjectCard',
  components: {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Github,
    SpotlightCard,
  },
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  data() {
    return {
      isShowingDetails: false,
    }
  },
  methods: {
    toggleDetails() {
      this.isShowingDetails = !this.isShowingDetails
    },
  },
})
</script>

<style scoped lang="scss">
.project-card {
  position: relative;
  height: 100%;
  perspective: 1200px;
  .project-card-flipper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
  .project-card-side {
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
    @media (max-width: 768px) {
      padding: 1.4rem;
    }
    h3 {
      margin: 0 0 1rem;
      color: var(--color-text);
      font-size: 1.1rem;
      letter-spacing: -0.01em;
    }
  }
  .project-image {
    position: relative;
    aspect-ratio: 16/9;
    overflow: hidden;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
  }
  .project-image-parallax {
    position: absolute;
    inset: -8% 0;
  }
  .project-image-logo {
    background: #000;
    img {
      background-color: #000;
      object-fit: contain;
      padding: clamp(1rem, 4vw, 2rem);
    }
    .project-image-parallax {
      inset: 0;
    }
  }
  .project-content {
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    @media (max-width: 768px) {
      padding: 1.1rem;
    }
    h3 {
      margin: 0 0 0.6rem;
      color: var(--color-text);
      font-size: 1.1rem;
      letter-spacing: -0.01em;
    }
    p {
      font-size: 0.9rem;
      line-height: 1.65;
      color: var(--color-text-muted);
      margin-bottom: 1rem;
    }
  }
  .technology-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0.6rem 0 0.9rem;
  }
  .technology {
    background: var(--color-accent-soft);
    color: var(--color-accent);
    padding: 0.2rem 0.5rem;
    border-radius: 0;
    font-size: 0.8rem;
    font-weight: 500;
  }
  .project-links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: auto;
  }
  .project-back-links {
    margin-top: 0;
  }
  .project-details {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    line-height: 1.7;
    flex: 1;
    margin: 0 0 1rem;
    overflow: auto;
  }
  .project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.88rem;
  }
  .project-link:hover {
    color: var(--color-accent-hover);
  }
  .project-link-icon {
    flex-shrink: 0;
    transition: transform 0.2s ease;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
  .project-link:hover .icon-forward {
    transform: translateX(3px);
  }
  .project-link:hover .icon-back {
    transform: translateX(-3px);
  }
  .project-link:hover .icon-external {
    transform: translate(2px, -2px);
  }
  .project-link-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
  }
}
.project-card.is-flipped .project-card-flipper {
  transform: rotateY(180deg);
}
.project-card:hover .project-card-flipper:not(.is-flipped) {
  transform: translateY(-4px);
  @media (prefers-reduced-motion: reduce) {
    transform: none;
  }
}
.project-card.is-flipped:hover .project-card-flipper {
  transform: rotateY(180deg) translateY(-4px);
  @media (prefers-reduced-motion: reduce) {
    transform: rotateY(180deg);
  }
}
.project-card:hover .project-image img {
  transform: scale(1.03);
  @media (prefers-reduced-motion: reduce) {
    transform: none;
  }
}
</style>
