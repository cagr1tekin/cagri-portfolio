'use client'

import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.1 })
  const y = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.1 })

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left - rect.width / 2) * strength)
    rawY.set((e.clientY - rect.top - rect.height / 2) * strength)
  }, [rawX, rawY, strength])

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return { ref, style: { x, y }, onMouseMove, onMouseLeave }
}
