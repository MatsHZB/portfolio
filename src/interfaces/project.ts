export interface Project {
  id: number
  title: string
  technologies: string[]
  description: string
  details?: string
  imageUrl: string
  imageSourceSet?: string
  imageFit?: 'cover' | 'contain'
  githubUrl: string | null
  demoUrl: string | null
}
