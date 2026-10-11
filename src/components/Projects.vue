<template>
  <section id="projecten" class="projects section-padding">
    <div class="container">
      <h2 v-reveal class="section-title section-title-with-subtitle">Projecten</h2>
      <p class="section-subtitle">Mijn beste werk</p>
      <div class="projects-grid">
        <ProjectCard
          v-for="(project, projectIndex) in projects"
          :key="project.id"
          v-reveal="projectIndex * 90"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects'

export default defineComponent({
  name: 'Projects',
  components: {
    ProjectCard,
  },
  data() {
    return {
      projects,
    }
  },
})
</script>

<style scoped lang="scss">
.projects {
  background: var(--color-background);
  border-top: 1px solid var(--color-border);
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }
  }
}
</style>
