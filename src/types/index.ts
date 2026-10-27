export type Theme = 'mono' | 'glassmorphism' | 'bold'
export type Locale = 'tr' | 'en'

export interface Project {
  id: string
  title_tr: string
  title_en: string
  desc_tr: string
  desc_en: string
  tech_tags: string[]
  live_url?: string
  github_url?: string
  cover_url?: string
  category: 'freelance' | 'team' | 'personal'
  featured: boolean
  order_index: number
  active: boolean
  created_at: string
}

export interface Experience {
  id: string
  company_tr: string
  company_en: string
  role_tr: string
  role_en: string
  start_date: string
  end_date?: string
  bullets_tr: string[]
  bullets_en: string[]
  order_index: number
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  project_type: string
  budget_range: string
  message: string
  is_read: boolean
  is_archived: boolean
  created_at: string
}
