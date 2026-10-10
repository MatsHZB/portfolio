import type { ContactLink } from '@/interfaces/contactLink'

export const emailAddress = 'matshazebroek@gmail.com'

export const contactLinks: ContactLink[] = [
  {
    id: 'email',
    name: 'E-mail',
    href: `mailto:${emailAddress}`,
    opensInNewTab: false,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/matshazebroek/',
    opensInNewTab: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    href: 'https://github.com/MatsHZB',
    opensInNewTab: true,
  },
]

export const socialLinks = contactLinks.filter((link) => link.opensInNewTab)

export function newTabAttributes(link: ContactLink) {
  return link.opensInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
