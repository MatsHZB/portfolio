import type { Project } from '@/interfaces/project'

const portfolioPlaceholder =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450' role='img' aria-label='Portfolio'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23f5f7f8'/%3E%3Cstop offset='1' stop-color='%23eaeef0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='450' fill='url(%23g)'/%3E%3Cg fill='none' stroke='%23dce3e7' stroke-width='2'%3E%3Crect x='60' y='60' width='680' height='330' rx='14'/%3E%3Cline x1='60' y1='110' x2='740' y2='110'/%3E%3Ccircle cx='90' cy='85' r='6' fill='%232f6f6a' stroke='none'/%3E%3Ccircle cx='112' cy='85' r='6' fill='%23dce3e7' stroke='none'/%3E%3Ccircle cx='134' cy='85' r='6' fill='%23dce3e7' stroke='none'/%3E%3C/g%3E%3Ctext x='400' y='245' font-family='Inter, system-ui, sans-serif' font-size='52' font-weight='700' text-anchor='middle' fill='%2316202a'%3EPortfolio%3C/text%3E%3Ctext x='400' y='285' font-family='Inter, system-ui, sans-serif' font-size='18' text-anchor='middle' fill='%234a5865'%3Ematshazebroek.nl%3C/text%3E%3C/svg%3E"

export const projects: Project[] = [
  {
    id: 1,
    title: 'Dots Development',
    technologies: ['Lua', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    description: 'FiveM-scripts voor de community',
    details:
      'Dots Development bouwt FiveM-scripts. Wat begon als eigen hulpmiddelen voor onze servers, wordt nu openbaar gedeeld: gratis op GitHub en betaald via een eigen webwinkel. De nadruk ligt op prestaties, stabiliteit en functies die servereigenaren echt gebruiken. Elke versie is getest en gedocumenteerd.',
    imageUrl: '/images/dots-development-logo.webp',
    imageSrcset: '/images/dots-development-logo.webp 1x, /images/dots-development-logo@2x.webp 2x',
    imageFit: 'contain',
    githubUrl: 'https://github.com/DotsDevelopment',
    demoUrl: null,
  },
  {
    id: 2,
    title: 'Portfoliowebsite',
    technologies: ['Vue 3', 'Vite', 'CSS'],
    description: 'Persoonlijk portfolio met een modern ontwerp',
    imageUrl: portfolioPlaceholder,
    githubUrl: 'https://github.com/MatsHZB/portfolio',
    demoUrl: null,
  },
]
