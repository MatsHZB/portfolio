import type { SkillCategory } from '@/interfaces/skillCategory'

export const skills: SkillCategory[] = [
  {
    id: 'talen',
    title: 'Programmeertalen',
    items: ['C#', 'Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks en tools',
    items: [
      '.NET',
      'Spring Boot',
      'Vue 3',
      'Sass / SCSS',
      'Git / GitHub',
      'Jest / Vitest',
      'MySQL',
    ],
  },
  {
    id: 'methodieken',
    title: 'Methodieken',
    items: [
      'Scrum',
      'DevOps',
      'CI/CD',
      'Objectgeoriënteerd programmeren',
      'Ontwerppatronen',
      'SOLID-principes',
    ],
  },
]
