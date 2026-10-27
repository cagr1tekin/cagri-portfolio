'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

interface ContactProps {
  msg: {
    title: string; subtitle: string
    name: string; email: string
    project_type: string; project_types: Record<string, string>
    budget: string; budgets: Record<string, string>
    message: string; message_placeholder: string
    submit: string; submitting: string
    success_title: string; success_desc: string
    error: string; required: string; invalid_email: string
  }
  locale: Locale
}

export default function ContactSection({ msg, locale }: ContactProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const schema = z.object({
    name: z.string().min(1, msg.required),
    email: z.string().min(1, msg.required).email(msg.invalid_email),
    project_type: z.string().min(1, msg.required),
    budget_range: z.string().min(1, msg.required),
    message: z.string().min(1, msg.required),
    _honey: z.string().max(0),
  })

  type FormData = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setServerError('')
    try {
      const { supabase } = await import('@/lib/supabase')
      const { error } = await supabase.from('contact_submissions').insert({
        name: data.name,
        email: data.email,
        project_type: data.project_type,
        budget_range: data.budget_range,
        message: data.message,
        is_read: false,
        is_archived: false,
      })
      if (error) throw error
      setSuccess(true)
    } catch {
      setServerError(msg.error)
    }
  }

  const inputClass = cn(
    'w-full px-4 py-3 rounded-[var(--radius)] text-sm font-mono',
    'bg-[var(--bg-surface)] border border-[var(--border)]',
    'text-[var(--text-primary)] placeholder-[var(--text-muted)]',
    'focus:outline-none focus:border-[var(--accent)] transition-colors duration-200'
  )

  return (
    <section id="contact" ref={ref} className="py-24 px-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <p className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase mb-3">05 / Contact</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">{msg.title}</h2>
        <p className="text-[var(--text-secondary)]">{msg.subtitle}</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <CheckCircle size={48} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{msg.success_title}</h3>
            <p className="text-[var(--text-secondary)]">{msg.success_desc}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Honeypot */}
            <input type="text" {...register('_honey')} className="hidden" tabIndex={-1} aria-hidden />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5" htmlFor="name">
                  {msg.name}
                </label>
                <input id="name" {...register('name')} className={inputClass} placeholder="Çağrı Tekin" />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5" htmlFor="email">
                  {msg.email}
                </label>
                <input id="email" type="email" {...register('email')} className={inputClass} placeholder="ornek@mail.com" />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5" htmlFor="project_type">
                  {msg.project_type}
                </label>
                <select id="project_type" {...register('project_type')} className={inputClass}>
                  <option value="">—</option>
                  {Object.entries(msg.project_types).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
                {errors.project_type && <p className="text-xs text-red-400 mt-1">{errors.project_type.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5" htmlFor="budget_range">
                  {msg.budget}
                </label>
                <select id="budget_range" {...register('budget_range')} className={inputClass}>
                  <option value="">—</option>
                  {Object.entries(msg.budgets).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
                {errors.budget_range && <p className="text-xs text-red-400 mt-1">{errors.budget_range.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5" htmlFor="message">
                {msg.message}
              </label>
              <textarea
                id="message"
                {...register('message')}
                rows={5}
                className={cn(inputClass, 'resize-none')}
                placeholder={msg.message_placeholder}
              />
              {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
            </div>

            {serverError && <p className="text-sm text-red-400 text-center">{serverError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-3.5 rounded-[var(--radius)]',
                'bg-[var(--accent)] text-white font-medium text-sm cursor-pointer',
                'hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-200 shadow-[0_0_20px_var(--accent-glow)]'
              )}
            >
              <Send size={15} />
              {isSubmitting ? msg.submitting : msg.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  )
}
