export interface ContactLink {
  id: 'email' | 'linkedin' | 'github'
  label: string
  text: string
  href: string
  icon: string
  external: boolean
}
