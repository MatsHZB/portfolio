<template>
  <section id="skills" class="skills section-padding">
    <div class="container">
      <h2 class="section-title">Skills & Vaardigheden</h2>
      <div class="skills-grid">
        <ScrollReveal
          v-for="(category, categoryIndex) in skills"
          :key="category.id"
          :delay="categoryIndex * 85"
          class="skill-cell"
        >
          <div class="skill-category">
            <h3>{{ category.title }}</h3>
            <ul>
              <li v-for="item in category.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { skills } from '@/data/skills'

export default defineComponent({
  name: 'Skills',
  components: {
    ScrollReveal,
  },
  data() {
    return {
      skills,
    }
  },
})
</script>

<style scoped>
.skills {
  background: var(--color-bg-muted);
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--color-text);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  align-items: stretch;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.skill-cell {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.skill-cell:not(:last-child) {
  border-right: 1px solid var(--color-border);
}

.skill-category {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem clamp(1.25rem, 2.5vw, 2rem);
  box-sizing: border-box;
}

.skill-category h3 {
  margin: 0 0 1.25rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.skill-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.skill-category li {
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    border-top: 1px solid var(--color-border);
  }

  .skill-cell:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }

  .skill-category {
    padding: 1.5rem 0;
  }
}
</style>
