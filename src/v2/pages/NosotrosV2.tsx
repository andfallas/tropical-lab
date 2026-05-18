import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import NavbarV2 from '@/v2/components/NavbarV2'
import FooterV2 from '@/v2/components/FooterV2'
import aboutImg from '@/assets/images/hero-nosotros.webp'
import amanecerImg from '@/assets/images/port-cover-amanecer.webp'

const bg = '#101010'
const accent = '#964B00'
const grayLight = '#999999'
const gray = '#626262'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const slideRight = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})

const vp = { once: true, margin: '-80px' }

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const dur = 1400
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(Math.round(ease * to))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])

  return <span ref={ref}>{val}{suffix}</span>
}

const values = [
  { title: 'Calidad', desc: 'Cada detalle pasa por un control riguroso. Seleccionamos materiales, supervisamos procesos y entregamos resultados que perduran décadas.' },
  { title: 'Sostenibilidad', desc: 'Diseñamos con consciencia ambiental. Ventilación cruzada, materiales locales y sistemas pasivos que reducen el impacto energético.' },
  { title: 'Innovación', desc: 'Adoptamos las últimas técnicas constructivas y herramientas de diseño para garantizar soluciones modernas y eficientes.' },
]

const team = [
  { name: 'Andrés Vargas', role: 'Director de Arquitectura' },
  { name: 'Sofía Mora', role: 'Jefa de Proyectos' },
  { name: 'Diego Chaves', role: 'Ingeniero Estructural' },
]

export default function NosotrosV2() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <div style={{ background: bg, color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <NavbarV2 />

      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', height: '50vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.img
          src={aboutImg} alt="Nosotros"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '110%', objectFit: 'cover', y: heroY }}
        />
        <div style={{ position: 'absolute', inset: 0, background: bg, opacity: 0.70 }} />
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: 16 }}
          >
            Quiénes somos
          </motion.p>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: '0.05em', color: '#fff' }}>
            SOBRE TROPICAL LAB
          </h1>
        </motion.div>
      </section>

      {/* Historia */}
      <section style={{ padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={vp}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>/ NUESTRA HISTORIA</motion.p>
            <motion.p variants={slideLeft} style={{ fontSize: 15, color: grayLight, lineHeight: 1.85, marginBottom: 20 }}>
              Tropical Lab nació de una convicción: que es posible construir con la misma precisión de los mejores estudios del mundo, en el entorno más exigente del planeta — la naturaleza tropical de Costa Rica.
            </motion.p>
            <motion.p variants={slideLeft} style={{ fontSize: 15, color: grayLight, lineHeight: 1.85, marginBottom: 20 }}>
              Fundado por un equipo de arquitectos e ingenieros costarricenses, llevamos más de ocho años perfeccionando el arte de integrar arquitectura contemporánea con selva, clima y topografía.
            </motion.p>
            <motion.p variants={slideLeft} style={{ fontSize: 15, color: grayLight, lineHeight: 1.85 }}>
              Cada proyecto es único. Cada espacio nace del terreno, del cliente y del clima. No existe la fórmula repetida en nuestro trabajo.
            </motion.p>
          </motion.div>

          <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={vp} whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
            <img src={amanecerImg} alt="Historia" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 16, display: 'block' }} />
          </motion.div>
        </div>
      </section>

      {/* Valores */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 40 }}>
            / NUESTROS VALORES
          </motion.p>
          <motion.div
            variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={vp}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}
          >
            {values.map(v => (
              <motion.div key={v.title} variants={fadeUp} whileHover={{ y: -6, transition: { duration: 0.25 } }}>
                <motion.svg
                  width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: 16 }}
                  initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} viewport={vp}
                >
                  <circle cx="16" cy="16" r="15" stroke={accent} strokeWidth="1.5" />
                  <path d="M10 16l4 4 8-8" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: '0.03em', color: '#fff', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: grayLight, lineHeight: 1.75 }}>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '60px 48px' }}>
        <motion.div
          variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={vp}
          style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}
        >
          {[{ n: 80, s: '+', l: 'Proyectos' }, { n: 8, s: '+', l: 'Años' }, { n: 95, s: '%', l: 'Sostenible' }, { n: 30, s: '+', l: 'En desarrollo' }].map(({ n, s, l }) => (
            <motion.div key={l} variants={fadeUp} style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 56, color: accent, lineHeight: 1, display: 'block' }}>
                <Counter to={n} suffix={s} />
              </span>
              <span style={{ fontSize: 14, color: '#fff' }}>{l}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Equipo */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '80px 48px 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={vp} style={{ marginBottom: 40 }}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent }}>/ NUESTRO EQUIPO</motion.p>
          </motion.div>
          <motion.div
            variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={vp}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}
          >
            {team.map(m => (
              <motion.div key={m.name} variants={scaleIn} whileHover={{ y: -8, transition: { duration: 0.3 } }} style={{ textAlign: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}
                  style={{ width: '100%', aspectRatio: '1', background: '#2a2a2a', borderRadius: 16, marginBottom: 16, overflow: 'hidden' }}
                />
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{m.name}</h4>
                <p style={{ fontSize: 13, color: grayLight }}>{m.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#141414', padding: '100px 48px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.div variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={vp}>
          <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>/ TRABAJEMOS JUNTOS</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(32px, 5vw, 64px)', color: '#fff', letterSpacing: '0.02em', lineHeight: 1.1, maxWidth: '20ch', margin: '0 auto 40px' }}>
            ¿QUERÉS CONSTRUIR CON NOSOTROS?
          </motion.h2>
          <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <a href="/contacto" style={{ display: 'inline-block', background: '#fff', color: '#000', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', padding: '16px 40px', borderRadius: 999, textDecoration: 'none' }}>
              CONTACTAR
            </a>
          </motion.div>
        </motion.div>
      </section>

      <FooterV2 />
    </div>
  )
}
