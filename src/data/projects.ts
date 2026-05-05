import type { ProjectItem } from '@/interfaces/projectItem'

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'Dots Development',
    technologies: ['Lua', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    description: 'FiveM scripts voor de community',
    details:
      'Dots Development bouwt FiveM scripts. Wat begon als private tools voor eigen servers, wordt nu publiek gedeeld: gratis op GitHub en premium via een eigen store. Focus op performance, stabiliteit en features die server eigenaren echt gebruiken. Elke release is getest en gedocumenteerd.',
    imageUrl: '/images/dots-development-logo.png',
    imageFit: 'contain',
    githubUrl: 'https://github.com/DotsDevelopment',
    demoUrl: null,
  },
  {
    id: 2,
    title: 'Portfolio Website',
    technologies: ['Vue 3', 'Vite', 'CSS'],
    description: 'Persoonlijke portfolio met modern design',
    imageUrl: 'https://placehold.co/800x450/png?text=Portfolio',
    githubUrl: null,
    demoUrl: null,
  },
]
