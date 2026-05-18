import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoSvg from '@/assets/logo.svg'

const accent = '#964B00'

// Duración total del overlay en segundos (progreso + fade)
// Usá esta constante en páginas que necesiten retrasar animaciones del hero
export const LOADER_TOTAL_S = 0.8 + 0.5

const PROGRESS_MS = LOADER_TOTAL_S * 1000 * (0.8 / 1.3) // = 800ms
const FADE_MS     = LOADER_TOTAL_S * 1000 * (0.5 / 1.3) // = 500ms

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = PROGRESS_MS

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 2)
      setProgress(Math.round(ease * 100))
      if (p < 1) {
        requestAnimationFrame(tick)
      } else {
        setLeaving(true)
        setTimeout(onComplete, FADE_MS)
      }
    }

    requestAnimationFrame(tick)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: 'easeOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#101010',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Logo */}
          <motion.img
            src={logoSvg}
            alt="Tropical Lab"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              height: 56,
              width: 'auto',
              filter: 'brightness(0) invert(1)',
              marginBottom: 48,
            }}
          />

          {/* Progress bar */}
          <div style={{ width: 200, height: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
            <motion.div
              style={{
                position: 'absolute', top: 0, left: 0, height: '100%',
                background: accent, borderRadius: 999,
                width: `${progress}%`,
              }}
              transition={{ duration: 0.05 }}
            />
          </div>

          {/* Percentage */}
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11,
              fontWeight: 600, letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.3)',
              marginTop: 16,
            }}
          >
            {progress}%
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
