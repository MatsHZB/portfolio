<template>
  <section id="vaardigheden" class="skills section-padding">
    <div class="container skills-layout">
      <div class="skills-introduction">
        <h2 v-reveal class="section-title">Vaardigheden</h2>
        <p class="skills-introduction-text">
          Waar ik mee werk: op school, bij Terraindex en in eigen projecten.
        </p>
      </div>

      <ul class="skill-categories">
        <li
          v-for="(category, categoryIndex) in skills"
          :key="category.id"
          v-reveal="categoryIndex * 85"
          class="skill-category"
        >
          <h3>{{ category.title }}</h3>
          <ul class="skill-list">
            <li v-for="skill in category.items" :key="skill" class="skill">{{ skill }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { skills } from '@/data/skills'

export default defineComponent({
  name: 'Skills',
  data() {
    return {
      skills,
    }
  },
})
</script>

<style scoped lang="scss">
.skills {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  .skills-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.7fr);
    gap: clamp(2rem, 6vw, 5rem);
    align-items: center;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
  .skills-introduction-text {
    margin: 0;
    padding-left: 1.35rem;
    color: var(--color-text-muted);
    font-size: clamp(0.94rem, 1.25vw, 1.06rem);
    line-height: 1.6;
  }
  .skill-categories {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--color-border);
  }
  .skill-category {
    padding: clamp(1.5rem, 3vw, 2.25rem) 0;
    border-bottom: 1px solid var(--color-border);
    h3 {
      margin: 0 0 0.9rem;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--color-text);
    }
  }
  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .skill {
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    color: var(--color-text);
    font-size: 0.88rem;
    line-height: 1.3;
    transition:
      border-color 0.2s,
      color 0.2s;
  }
  .skill:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
}
</style>
