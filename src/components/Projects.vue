<template>
  <section id="projecten" class="projects section-padding">
    <div class="container">
      <h2 class="section-title section-title-lead">Projecten</h2>
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
.projects {
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
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
