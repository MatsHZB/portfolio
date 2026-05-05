import type { ContactLink } from '@/interfaces/contactLink'

export const contactLinks: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    text: 'matshazebroek@gmail.com',
    href: 'mailto:matshazebroek@gmail.com',
    icon: '✉',
    external: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    text: 'LinkedIn',
    href: 'https://www.linkedin.com/in/matshazebroek/',
    icon: 'in',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    text: 'GitHub',
    href: 'https://github.com/MatsHZB',
    icon: '⌘',
    external: true,
  },
]
