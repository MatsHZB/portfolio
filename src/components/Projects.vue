<template>
  <section id="projecten" class="projects section-padding">
    <div class="container">
      <h2 class="section-title">Projecten</h2>
      <p class="section-subtitle">Mijn beste werk</p>
      <div class="projects-grid">
        <ScrollReveal
          v-for="(projectItem, projectIndex) in projects"
          :key="projectItem.id"
          :delay="projectIndex * 90"
        >
          <ProjectCard :project-item="projectItem" />
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ProjectCard from '@/components/ProjectCard.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'

import { projects } from '@/data/projects'

export default defineComponent({
  name: 'Projects',
  components: {
    ProjectCard,
    ScrollReveal,
  },
  data() {
    return {
      projects,
    }
  },
})
</script>

<style scoped>
.section-title {
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.section-subtitle {
  text-align: center;
  color: var(--color-text-muted);
  opacity: 0.7;
  margin-bottom: 3rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.projects-grid > * {
  height: 100%;
}

@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}
</style>
