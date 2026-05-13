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
            <div class="skill-category-header">
              <span class="cat-number" aria-hidden="true">{{
                String(categoryIndex + 1).padStart(2, '0')
              }}</span>
              <h3>{{ category.title }}</h3>
            </div>
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
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
}

.skill-cell {
  display: flex;
  flex-direction: column;
}

.skill-category {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.skill-category-header {
  margin-bottom: 1.5rem;
}

.cat-number {
  display: block;
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
  letter-spacing: -0.04em;
  margin-bottom: 0.5rem;
}

.skill-category h3 {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.skill-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1 1 auto;
}

.skill-category li {
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.5;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.skill-category li:first-child {
  border-top: 1px solid var(--color-border);
}

@media (max-width: 900px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
}

@media (max-width: 580px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
