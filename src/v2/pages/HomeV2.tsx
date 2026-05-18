import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useLoaderDone } from '@/context/LoaderContext'
import { LOADER_TOTAL_S } from '@/components/ui/PageLoader'
import { useIsMobile } from '@/hooks/useIsMobile'
import NavbarV2 from '@/v2/components/NavbarV2'
import FooterV2 from '@/v2/components/FooterV2'
import heroImg from '@/assets/images/hero-home.webp'
import aboutImg from '@/assets/images/hero-nosotros.webp'
import amanecerImg from '@/assets/images/port-cover-amanecer.webp'
import naceImg from '@/assets/images/port-cover-nace.webp'
import raizImg from '@/assets/images/port-cover-raiz.webp'
import galNace2 from '@/assets/images/gallery-nace-2.webp'
import galRaiz2 from '@/assets/images/gallery-raiz-2.webp'

const bg = '#101010'
const accent = '#964B00'
const gray = '#626262'
const grayLight = '#999999'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}
const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})
const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
}
const slideRight = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
}

const vp = { once: true, margin: '-80px' }

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
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
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

const portfolioProjects = [
  { img: amanecerImg, name: 'Amanecer', cat: 'Residencial', year: '2024' },
  { img: naceImg, name: 'Nace', cat: 'Residencial', year: '2023' },
  { img: raizImg, name: 'Raíz', cat: 'Residencial', year: '2023' },
]

const serviceItems = [
  { label: 'Desarrollo de proyectos a medida', img: amanecerImg },
  { label: 'Selección de materiales sostenibles', img: naceImg },
  { label: 'Construcción llave en mano', img: raizImg },
  { label: 'Diseño de paisaje y planificación', img: galNace2 },
  { label: 'Acompañamiento en cada etapa', img: galRaiz2 },
]

const processSteps = [
  {
    title: 'Consulta',
    desc: 'Escuchamos tu visión, analizamos el terreno y definimos el programa de necesidades.',
  },
  {
    title: 'Diseño',
    desc: 'Desarrollamos renders fotorrealistas y planos constructivos hasta que cada detalle refleje tu visión.',
  },
  {
    title: 'Aprobación',
    desc: 'Gestionamos todos los permisos ante el CFIA y la municipalidad mientras planificamos la logística.',
  },
  {
    title: 'Construcción',
    desc: 'Nuestro equipo técnico está en obra todos los días con reportes semanales de avance.',
  },
  {
    title: 'Entrega',
    desc: 'Entregamos llave en mano y te acompañamos con visitas de seguimiento los primeros años.',
  },
]

export default function HomeV2() {
  const loaderDone = useLoaderDone()
  const d = (base: number) => (loaderDone ? base : LOADER_TOTAL_S + base)
  const isMobile = useIsMobile()

  const [activeService, setActiveService] = useState(2)
  const [activeStep, setActiveStep] = useState(1)
  const [carouselIdx, setCarouselIdx] = useState(1)

  const touchStartX = useRef(0)

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleCarouselTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > 50) setCarouselIdx((i) => (i + 1) % portfolioProjects.length)
    else if (delta < -50)
      setCarouselIdx((i) => (i - 1 + portfolioProjects.length) % portfolioProjects.length)
  }

  return (
    <div style={{ background: bg, color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <NavbarV2 />

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <motion.img
          src={heroImg}
          alt="Hero"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '110%',
            objectFit: 'cover',
            y: heroY,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: bg, opacity: 0.55 }} />

        <motion.div
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'center',
            textAlign: isMobile ? 'left' : 'center',
            padding: isMobile ? '0 24px' : '0 48px',
            opacity: heroOpacity,
          }}
        >
          {/* Mission card — inline above title on mobile */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: d(0.05) }}
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: 20,
                alignSelf: 'stretch',
              }}
            >
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: 4,
                }}
              >
                NUESTRA MISIÓN
              </p>
              <p style={{ fontSize: 12, color: '#fff', lineHeight: 1.6 }}>
                Construir espacios que respetan la naturaleza sin sacrificar el lujo y la precisión.
              </p>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: d(0.1) }}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: accent,
              marginBottom: 20,
            }}
          >
            Arquitectura Premium · Costa Rica
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: d(0.2), ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: isMobile ? 40 : 'clamp(56px, 8vw, 96px)',
              lineHeight: 1.05,
              letterSpacing: '0.02em',
              color: '#fff',
              maxWidth: '14ch',
              margin: '0 0 20px',
            }}
          >
            CONSTRUIMOS TU HOGAR SOÑADO EN ARMONÍA CON LA NATURALEZA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: d(0.4) }}
            style={{ fontSize: isMobile ? 14 : 16, color: grayLight, marginBottom: 40 }}
          >
            Creamos proyectos únicos en entornos naturales y sostenibles
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: d(0.55) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            <Link
              to="/portafolio"
              style={{
                display: isMobile ? 'block' : 'inline-block',
                textAlign: 'center',
                background: '#fff',
                color: '#000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: '0.1em',
                padding: '16px 40px',
                borderRadius: 999,
                textDecoration: 'none',
              }}
            >
              EXPLORAR →
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating cards — desktop only */}
        {!isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: d(0.8) }}
              style={{
                position: 'absolute',
                top: 96,
                right: 48,
                zIndex: 2,
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 16,
                padding: 20,
                maxWidth: 280,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: 8,
                }}
              >
                NUESTRA MISIÓN
              </p>
              <p style={{ fontSize: 13, color: '#fff', lineHeight: 1.7 }}>
                Construir espacios que respetan la naturaleza sin sacrificar el lujo y la precisión
                que cada cliente merece.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: d(1.0) }}
              style={{
                position: 'absolute',
                bottom: 64,
                left: 48,
                zIndex: 2,
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 16,
                padding: 20,
                maxWidth: 260,
              }}
            >
              <p style={{ fontSize: 13, color: '#fff', lineHeight: 1.7 }}>
                Más de 47 familias disfrutan su hogar ideal gracias a nuestro compromiso con la
                calidad y la sostenibilidad.
              </p>
            </motion.div>
          </>
        )}

        {/* Social links — desktop only */}
        {!isMobile && (
          <div
            style={{
              position: 'fixed',
              right: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 500,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {['F', 'IG', 'X'].map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: d(1.2) + i * 0.1 }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: gray,
                  cursor: 'pointer',
                  writingMode: 'vertical-rl',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = gray)}
              >
                {s}
              </motion.span>
            ))}
          </div>
        )}
      </section>

      {/* ── NOSOTROS / ABOUT ── */}
      <section style={{ background: bg, padding: isMobile ? '60px 24px' : '120px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {isMobile ? (
            <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={vp}>
              <motion.div variants={scaleIn}>
                <img
                  src={aboutImg}
                  alt="Sobre nosotros"
                  style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    borderRadius: 16,
                    display: 'block',
                    marginBottom: 32,
                  }}
                />
              </motion.div>
              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: 20,
                }}
              >
                / SOBRE NOSOTROS
              </motion.p>
              <motion.p
                variants={fadeUp}
                style={{ fontSize: 15, color: grayLight, lineHeight: 1.75, marginBottom: 40 }}
              >
                Somos un equipo de arquitectos, ingenieros y artesanos costarricenses que diseñamos
                espacios vivos en armonía con la naturaleza tropical.
              </motion.p>
              <motion.div
                variants={stagger(0.1)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 32,
                  marginBottom: 40,
                }}
              >
                {[
                  { n: 80, s: '+', l: 'Proyectos' },
                  { n: 8, s: '+', l: 'Años' },
                  { n: 95, s: '%', l: 'Sostenible' },
                  { n: 30, s: '+', l: 'En desarrollo' },
                ].map(({ n, s, l }) => (
                  <motion.div key={l} variants={fadeUp}>
                    <span
                      style={{
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: 48,
                        color: accent,
                        lineHeight: 1,
                        display: 'block',
                      }}
                    >
                      <Counter to={n} suffix={s} />
                    </span>
                    <span style={{ fontSize: 13, color: '#fff' }}>{l}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  to="/nosotros"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#fff',
                    textDecoration: 'none',
                    borderBottom: `2px solid ${accent}`,
                    paddingBottom: 2,
                  }}
                >
                  Conócenos →
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 80,
                alignItems: 'center',
              }}
            >
              <motion.div
                variants={stagger(0.12)}
                initial="hidden"
                whileInView="show"
                viewport={vp}
              >
                <motion.p
                  variants={fadeUp}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: accent,
                    marginBottom: 20,
                  }}
                >
                  / SOBRE NOSOTROS
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  style={{ fontSize: 15, color: grayLight, lineHeight: 1.75, marginBottom: 40 }}
                >
                  Somos un equipo de arquitectos, ingenieros y artesanos costarricenses que
                  diseñamos espacios vivos en armonía con la naturaleza tropical.
                </motion.p>
                <motion.div
                  variants={stagger(0.1)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 32,
                    marginBottom: 40,
                  }}
                >
                  {[
                    { n: 80, s: '+', l: 'Proyectos' },
                    { n: 8, s: '+', l: 'Años' },
                    { n: 95, s: '%', l: 'Sostenible' },
                    { n: 30, s: '+', l: 'En desarrollo' },
                  ].map(({ n, s, l }) => (
                    <motion.div key={l} variants={fadeUp}>
                      <span
                        style={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontSize: 48,
                          color: accent,
                          lineHeight: 1,
                          display: 'block',
                        }}
                      >
                        <Counter to={n} suffix={s} />
                      </span>
                      <span style={{ fontSize: 13, color: '#fff' }}>{l}</span>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Link
                    to="/nosotros"
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#fff',
                      textDecoration: 'none',
                      borderBottom: `2px solid ${accent}`,
                      paddingBottom: 2,
                    }}
                  >
                    Conócenos →
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                variants={stagger(0.15)}
                initial="hidden"
                whileInView="show"
                viewport={vp}
              >
                <motion.h2
                  variants={slideRight}
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    letterSpacing: '0.02em',
                    color: '#fff',
                    marginBottom: 28,
                    lineHeight: 1.1,
                  }}
                >
                  ¿POR QUÉ ELEGIR TROPICAL LAB?
                </motion.h2>
                <motion.div
                  variants={scaleIn}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={aboutImg}
                    alt="Sobre nosotros"
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      objectFit: 'cover',
                      borderRadius: 16,
                      display: 'block',
                    }}
                  />
                </motion.div>
                <motion.p
                  variants={fadeUp}
                  style={{ fontSize: 13, color: accent, marginTop: 14, fontStyle: 'italic' }}
                >
                  Comenzá un nuevo capítulo en un lugar cómodo y natural.
                </motion.p>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section
        style={{
          background: bg,
          padding: isMobile ? '60px 24px 80px' : '80px 48px 120px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 40,
              alignItems: 'end',
              marginBottom: 60,
            }}
          >
            <div>
              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: 8,
                }}
              >
                / NUESTROS SERVICIOS
              </motion.p>
            </div>
            <motion.h2
              variants={slideRight}
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                color: '#fff',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
              }}
            >
              CICLO COMPLETO DE CONSTRUCCIÓN, DEL CONCEPTO A LA ENTREGA
            </motion.h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
              gap: 64,
              alignItems: 'start',
            }}
          >
            <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={vp}>
              {serviceItems.map((item, i) => (
                <div key={i}>
                  <motion.div
                    variants={fadeUp}
                    onClick={() => setActiveService(i)}
                    onTouchStart={() => setActiveService(i)}
                    whileHover={{ x: 6 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      padding: '20px 0',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          activeService === i ? 'Bebas Neue, sans-serif' : 'Inter, sans-serif',
                        fontSize: activeService === i ? 28 : 16,
                        color: activeService === i ? '#fff' : gray,
                        letterSpacing: activeService === i ? '0.03em' : 0,
                        transition: 'all 0.25s',
                      }}
                    >
                      {item.label}
                    </span>
                    {activeService === i && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: accent,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginLeft: 20,
                        }}
                      >
                        <span style={{ color: '#fff', fontSize: 16 }}>→</span>
                      </motion.div>
                    )}
                  </motion.div>
                  {/* Mobile: inline image below active item */}
                  {isMobile && (
                    <AnimatePresence>
                      {activeService === i && (
                        <motion.div
                          key={`simg-${i}`}
                          initial={{ opacity: 0, maxHeight: 0 }}
                          animate={{ opacity: 1, maxHeight: 200 }}
                          exit={{ opacity: 0, maxHeight: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <img
                            src={item.img}
                            alt={item.label}
                            style={{
                              width: '100%',
                              height: 180,
                              objectFit: 'cover',
                              borderRadius: 12,
                              display: 'block',
                              marginTop: 10,
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </motion.div>

            {!isMobile && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={vp}
                variants={scaleIn}
                style={{ width: 280, position: 'sticky', top: 100 }}
              >
                <motion.img
                  key={activeService}
                  src={serviceItems[activeService].img}
                  alt={serviceItems[activeService].label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    borderRadius: 16,
                    display: 'block',
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS ── */}
      <section style={{ position: 'relative', minHeight: '70vh', overflow: 'hidden' }}>
        <img
          src={raizImg}
          alt="Beneficios"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: bg, opacity: 0.6 }} />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: isMobile ? '60px 24px' : '80px 48px',
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            style={{ marginBottom: 40 }}
          >
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: isMobile ? 28 : 'clamp(36px, 5vw, 56px)',
                color: '#fff',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
                maxWidth: '18ch',
              }}
            >
              TRABAJAMOS EN MÁS DE 30 PROYECTOS NUEVOS PARA HACER REALIDAD CADA SUEÑO.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, color: grayLight, marginTop: 16 }}>
              Más de 80 familias ya disfrutan su hogar ideal.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: 16,
            }}
          >
            {[
              {
                title: 'UBICACIONES PREMIUM',
                desc: 'Trabajamos en los mejores entornos naturales de Costa Rica.',
              },
              {
                title: 'CALIDAD GARANTIZADA',
                desc: 'Supervisión directa en cada etapa del proceso constructivo.',
              },
              {
                title: 'SOSTENIBILIDAD',
                desc: 'El 95% de nuestros proyectos integran criterios bioclimáticos.',
              },
            ].map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: accent,
                    marginBottom: 10,
                  }}
                >
                  {c.title} ↗
                </p>
                <p style={{ fontSize: 13, color: grayLight, lineHeight: 1.7 }}>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section
        style={{
          background: bg,
          padding: isMobile ? '60px 24px 80px' : '120px 48px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            style={{ marginBottom: 48 }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: accent,
                marginBottom: 8,
              }}
            >
              / PROCESO
            </motion.p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 40,
                alignItems: 'end',
              }}
            >
              <div>
                <motion.h2
                  variants={fadeUp}
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: 'clamp(28px, 3.5vw, 44px)',
                    color: '#fff',
                    letterSpacing: '0.02em',
                    lineHeight: 1.1,
                    marginTop: 8,
                  }}
                >
                  UN CAMINO SIMPLE HACIA TU HOGAR IDEAL
                </motion.h2>
              </div>
              {!isMobile && (
                <motion.p variants={fadeUp} style={{ fontSize: 14, color: grayLight }}>
                  La mayoría de nuestros clientes nos recomiendan.
                </motion.p>
              )}
            </div>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? 32 : 64,
              alignItems: 'start',
            }}
          >
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={naceImg}
                alt="Proceso"
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  borderRadius: 24,
                  display: 'block',
                }}
              />
            </motion.div>
            <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={vp}>
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  onClick={() => setActiveStep(i)}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    padding: '20px 0',
                    cursor: 'pointer',
                  }}
                >
                  {activeStep === i ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3
                        style={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontSize: 32,
                          color: '#fff',
                          letterSpacing: '0.03em',
                          marginBottom: 8,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: grayLight,
                          lineHeight: 1.75,
                          marginBottom: 12,
                        }}
                      >
                        {step.desc}
                      </p>
                      <a
                        href="#"
                        style={{
                          fontSize: 13,
                          color: accent,
                          fontWeight: 500,
                          textDecoration: 'none',
                        }}
                      >
                        Saber más →
                      </a>
                    </motion.div>
                  ) : (
                    <motion.span
                      whileHover={{ color: '#fff', x: 4 }}
                      style={{
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: 20,
                        color: gray,
                        letterSpacing: '0.03em',
                        display: 'block',
                      }}
                    >
                      {step.title}
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PORTAFOLIO ── */}
      <section
        style={{
          background: bg,
          padding: isMobile ? '60px 0 80px' : '80px 0 120px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          style={{ paddingInline: isMobile ? 24 : 48, maxWidth: 1200, margin: '0 auto 48px' }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: accent,
              marginBottom: 8,
            }}
          >
            / PORTAFOLIO
          </motion.p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 40,
              alignItems: 'end',
            }}
          >
            <motion.h2
              variants={slideLeft}
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                color: '#fff',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
              }}
            >
              NUESTRO TRABAJO — UNA MEZCLA DE CONFORT Y ESTILO
            </motion.h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                alignItems: isMobile ? 'flex-start' : 'flex-end',
                textAlign: isMobile ? 'left' : 'right',
              }}
            >
              <motion.p variants={fadeUp} style={{ fontSize: 14, color: grayLight }}>
                Nos enorgullece cada proyecto que construimos.
              </motion.p>
              <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/portafolio"
                  style={{
                    display: 'inline-block',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    padding: '12px 28px',
                    borderRadius: 999,
                    textDecoration: 'none',
                  }}
                >
                  VER PORTAFOLIO →
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Mobile: strip with peek */}
        {isMobile ? (
          <div
            onTouchStart={handleCarouselTouchStart}
            onTouchEnd={handleCarouselTouchEnd}
            style={{ overflow: 'hidden', userSelect: 'none' }}
          >
            <motion.div
              style={{ display: 'flex', gap: 12, paddingLeft: '8vw' }}
              animate={{ x: `calc(${carouselIdx} * (-84vw - 12px))` }}
              transition={{ type: 'tween', duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              {portfolioProjects.map((p, i) => (
                <motion.div
                  key={p.name}
                  animate={{ opacity: i === carouselIdx ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    flexShrink: 0,
                    width: '84vw',
                    borderRadius: 20,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: '100%',
                      aspectRatio: '5/4',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -1,
                      left: -1,
                      right: -1,
                      padding: '56px 20px 20px',
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: accent,
                        marginBottom: 4,
                      }}
                    >
                      {p.cat} · {p.year}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: 28,
                        letterSpacing: '0.04em',
                        color: '#fff',
                        lineHeight: 1,
                      }}
                    >
                      {p.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          /* Desktop: 3-card carousel */
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              padding: '0 80px',
            }}
          >
            <button
              onClick={() =>
                setCarouselIdx((i) => (i - 1 + portfolioProjects.length) % portfolioProjects.length)
              }
              style={{
                position: 'absolute',
                left: 16,
                zIndex: 2,
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 40,
                cursor: 'pointer',
                lineHeight: 1,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
            >
              ‹
            </button>

            {portfolioProjects.map((p, i) => {
              const isCenter = i === carouselIdx
              return (
                <motion.div
                  key={p.name}
                  animate={{
                    scale: isCenter ? 1 : 0.8,
                    filter: isCenter ? 'brightness(1)' : 'brightness(0.35)',
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setCarouselIdx(i)}
                  whileHover={!isCenter ? { filter: 'brightness(0.55)' } : {}}
                  style={{
                    flexShrink: 0,
                    width: isCenter ? '36%' : '24%',
                    cursor: 'pointer',
                    borderRadius: 20,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: '100%',
                      aspectRatio: '5/4',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  {isCenter && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: -1,
                        left: -1,
                        right: -1,
                        padding: '56px 20px 20px',
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        maskImage: 'linear-gradient(to top, black 0%, black 55%, transparent 100%)',
                        WebkitMaskImage:
                          'linear-gradient(to top, black 0%, black 55%, transparent 100%)',
                      }}
                    >
                      <p
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: accent,
                          marginBottom: 4,
                        }}
                      >
                        {p.cat} · {p.year}
                      </p>
                      <h3
                        style={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontSize: 28,
                          letterSpacing: '0.04em',
                          color: '#fff',
                          lineHeight: 1,
                        }}
                      >
                        {p.name}
                      </h3>
                    </div>
                  )}
                </motion.div>
              )
            })}

            <button
              onClick={() => setCarouselIdx((i) => (i + 1) % portfolioProjects.length)}
              style={{
                position: 'absolute',
                right: 16,
                zIndex: 2,
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 40,
                cursor: 'pointer',
                lineHeight: 1,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
            >
              ›
            </button>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
          {portfolioProjects.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCarouselIdx(i)}
              animate={{
                width: i === carouselIdx ? 24 : 8,
                background: i === carouselIdx ? accent : 'rgba(255,255,255,0.25)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                height: 8,
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        style={{
          background: bg,
          padding: isMobile ? '60px 24px' : '120px 48px',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <motion.div variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={vp}>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: isMobile ? 36 : 'clamp(36px, 6vw, 80px)',
              color: '#fff',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              maxWidth: '16ch',
              margin: '0 auto 48px',
            }}
          >
            ¿LISTO PARA CONSTRUIR TU HOGAR SOÑADO? DEJANOS TU CONSULTA.
          </motion.h2>
          <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contacto"
              style={{
                display: isMobile ? 'block' : 'inline-block',
                textAlign: 'center',
                background: '#fff',
                color: '#000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: '0.1em',
                padding: '18px 48px',
                borderRadius: 999,
                textDecoration: 'none',
              }}
            >
              DEJAR UNA CONSULTA
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <FooterV2 />
    </div>
  )
}
