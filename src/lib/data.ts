import type { Project, Experience } from '@/types'

export const PROJECTS: Project[] = [
  {
    id: '1', featured: true, active: true, order_index: 1, category: 'team',
    title_tr: 'Cargo Pilot', title_en: 'Cargo Pilot',
    desc_tr: 'Yük planlama süreçlerini dijitalleştiren lojistik platform. Three.js 3D görselleştirme ve çok takımlı mimari.',
    desc_en: 'Logistics platform digitizing load planning with Three.js 3D visualization and multi-squad architecture.',
    tech_tags: ['Next.js', 'Three.js', 'Docker', 'GitHub Actions'],
    live_url: 'https://cargopilot.divizyon.org', created_at: '2025-03-01',
  },
  {
    id: '2', featured: true, active: true, order_index: 2, category: 'personal',
    title_tr: 'Visa Platform', title_en: 'Visa Platform',
    desc_tr: 'Türk vatandaşları için akıllı Schengen vize eşleştirme platformu.',
    desc_en: 'Smart Schengen visa matching platform for Turkish citizens.',
    tech_tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Supabase'],
    created_at: '2026-04-01',
  },
  {
    id: '3', featured: true, active: true, order_index: 3, category: 'freelance',
    title_tr: 'Psikoloji Platformu', title_en: 'Psychology Platform',
    desc_tr: 'Uzman listeleme, randevu sistemi ve admin panel içeren online danışmanlık platformu.',
    desc_en: 'Online counseling platform with expert listing, appointments, and admin panel.',
    tech_tags: ['Next.js', 'NestJS', 'Supabase', 'AWS S3'],
    live_url: 'https://psiko-landing-page.vercel.app', created_at: '2025-06-01',
  },
  {
    id: '4', featured: false, active: true, order_index: 4, category: 'freelance',
    title_tr: 'Beyond Vize', title_en: 'Beyond Vize',
    desc_tr: 'Vize danışmanlık firması için SEO odaklı kurumsal web uygulaması.',
    desc_en: 'SEO-optimized corporate web application for a visa consultancy firm.',
    tech_tags: ['Next.js', 'Tailwind CSS', 'GA4'],
    live_url: 'https://beyondvize.com', created_at: '2025-02-01',
  },
  {
    id: '5', featured: false, active: true, order_index: 5, category: 'freelance',
    title_tr: 'Liklidi Collective House', title_en: 'Liklidi Collective House',
    desc_tr: 'Magnetic butonlar, bento grid ve word-by-word animasyonlu interaktif landing page.',
    desc_en: 'Highly interactive landing page with magnetic buttons and bento grid.',
    tech_tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    live_url: 'https://liklidi-nine.vercel.app', created_at: '2026-04-01',
  },
  {
    id: '6', featured: false, active: true, order_index: 6, category: 'freelance',
    title_tr: 'CodeBar POS', title_en: 'CodeBar POS',
    desc_tr: 'Offline çalışabilen Electron masaüstü POS uygulaması.',
    desc_en: 'Offline-capable Electron desktop POS application.',
    tech_tags: ['Electron', 'Node.js', 'SQLite'],
    created_at: '2025-12-01',
  },
  {
    id: '7', featured: false, active: true, order_index: 7, category: 'team',
    title_tr: 'Konsense', title_en: 'Konsense',
    desc_tr: 'Divizyon Jam\'da 1. olan hibrit Wiki+Sözlük platformu.',
    desc_en: '1st place at Divizyon Jam — hybrid Wiki+Dictionary platform.',
    tech_tags: ['Next.js', 'Three.js', 'PostgreSQL'],
    live_url: 'https://kon-sens.vercel.app', created_at: '2024-12-01',
  },
  {
    id: '8', featured: false, active: true, order_index: 8, category: 'freelance',
    title_tr: 'Altınöz Bobinaj', title_en: 'Altınöz Bobinaj',
    desc_tr: '1976\'dan bu yana endüstriyel motor sarım firması için kurumsal site.',
    desc_en: 'Corporate website for an industrial motor rewinding company est. 1976.',
    tech_tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    live_url: 'https://altinozbobinaj.com', created_at: '2026-02-01',
  },
]

export const EXPERIENCES = [
  {
    company_tr: 'Divizyon — Cargo Pilot', company_en: 'Divizyon — Cargo Pilot',
    role_tr: 'Frontend Chapter Lead', role_en: 'Frontend Chapter Lead',
    start: '03/2026', end: '05/2026',
    bullets_tr: ['Three.js 3D görselleştirme ve çok takımlı mimari', 'Docker + GitHub Actions CI/CD', 'Sprint ve PR yönetimi'],
    bullets_en: ['Three.js 3D visualization and multi-squad architecture', 'Docker + GitHub Actions CI/CD', 'Sprint and PR management'],
  },
  {
    company_tr: 'Serbest Yazılım Geliştirici', company_en: 'Freelance Developer',
    role_tr: 'Freelance', role_en: 'Freelance',
    start: '02/2025', end: null,
    bullets_tr: ['Web, masaüstü ve platform yazılımları', 'Brief\'ten deployment\'a tam süreç'],
    bullets_en: ['Web, desktop, and platform software', 'Full process from brief to deployment'],
  },
  {
    company_tr: 'Divizyon — SportLink', company_en: 'Divizyon — SportLink',
    role_tr: 'Web Backend Developer', role_en: 'Web Backend Developer',
    start: '03/2025', end: '06/2025',
    bullets_tr: ['PostgreSQL, Supabase, JWT auth', 'Swagger UI API dokümantasyonu'],
    bullets_en: ['PostgreSQL, Supabase, JWT auth', 'Swagger UI API documentation'],
  },
  {
    company_tr: 'Toyota TMMT', company_en: 'Toyota TMMT',
    role_tr: 'Maliyet & Muhasebe Stajyeri', role_en: 'Cost & Accounting Intern',
    start: '07/2025', end: '08/2025',
    bullets_tr: ['Global kurumsal yapıda staj', 'Kurumlar arası ekip çalışması'],
    bullets_en: ['Internship in global corporate structure', 'Cross-functional teamwork'],
  },
  {
    company_tr: 'SelçukChain', company_en: 'SelçukChain',
    role_tr: 'Başkan Yardımcısı', role_en: 'Vice President',
    start: '10/2024', end: '11/2025',
    bullets_tr: ['Teknik ve stratejik operasyonlar', 'Mentörlük ve dokümantasyon'],
    bullets_en: ['Technical and strategic operations', 'Mentorship and documentation'],
  },
]

export const SKILLS = {
  frontend: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'shadcn/ui'],
  backend:  ['Node.js', 'NestJS', 'Express.js', '.NET Core 8', 'Golang'],
  database: ['PostgreSQL', 'MongoDB', 'Supabase', 'Prisma ORM'],
  devops:   ['Docker', 'GitHub Actions', 'Vercel', 'Render'],
  ai:       ['YOLO', 'Roboflow', 'Google Colab'],
  tools:    ['Figma', 'Postman', 'Electron', 'AWS S3'],
}
