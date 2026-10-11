export interface ContactLink {
  id: 'email' | 'linkedin' | 'github'
  name: string
  url: string
  opensInNewTab: boolean
}
