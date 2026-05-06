export interface ProjectItem {
  id: number
  title: string
  technologies: string[]
  description: string
  details?: string
  imageUrl: string
  imageSrcset?: string
  imageFit?: 'cover' | 'contain'
  githubUrl: string | null
  demoUrl: string | null
}
