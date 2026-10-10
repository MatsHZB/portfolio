export interface ContactLink {
  id: 'email' | 'linkedin' | 'github'
  name: string
  href: string
  opensInNewTab: boolean
}
