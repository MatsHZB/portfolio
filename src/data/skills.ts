import type { SkillCategory } from '@/interfaces/skillCategory'

export const skills: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    items: ['Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    id: 'tools',
    title: 'Tools & Frameworks',
    items: ['Spring Boot', 'Vue 3', 'Sass / SCSS', 'Git / GitHub', 'Jest / Vitest', 'MySQL'],
  },
  {
    id: 'methods',
    title: 'Methodieken',
    items: ['Scrum', 'DevOps', 'CI/CD', 'OOP', 'Design Patterns', 'SOLID principes'],
  },
]
