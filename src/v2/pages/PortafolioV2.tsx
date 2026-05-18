import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import NavbarV2 from '@/v2/components/NavbarV2'
import FooterV2 from '@/v2/components/FooterV2'
import { Link } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useIsMobile'
import amanecerImg from '@/assets/images/port-cover-amanecer.webp'
import amanecer2 from '@/assets/images/gallery-amanecer-2.webp'
import amanecer3 from '@/assets/images/gallery-amanecer-3.webp'
import naceImg from '@/assets/images/port-cover-nace.webp'
import nace2 from '@/assets/images/gallery-nace-2.webp'
import nace3 from '@/assets/images/gallery-nace-3.webp'
import raizImg from '@/assets/images/port-cover-raiz.webp'
import raiz2 from '@/assets/images/gallery-raiz-2.webp'
import raiz3 from '@/assets/images/gallery-raiz-3.webp'

const bg = '#101010'
const accent = '#964B00'
const grayLight = '#999999'
const gray = '#626262'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}
const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
}
const vp = { once: true, margin: '-80px' }

type Project = {
  name: string
  location: string
  year: string
  area: string
  desc: string
  tags: string[]
  images: string[]
}

const projects: Project[] = [
  {
    name: 'Amanecer',
    location: 'Quepos, Puntarenas',
    year: '2024',
    area: '420 m²',
    desc: 'Una residencia diseñada para capturar los primeros rayos del sol sobre el Pacífico. La orientación este del volumen principal y los grandes ventanales de piso a techo crean un espectáculo lumínico único cada mañana. La piscina infinity prolonga el horizonte visual hacia el océano.',
    tags: ['Residencial', 'Concreto aparente', 'Piscina infinity', 'Madera teka'],
    images: [amanecerImg, amanecer2, amanecer3],
  },
  {
    name: 'Nace',
    location: 'Santa Teresa, Puntarenas',
    year: '2023',
    area: '310 m²',
    desc: 'Un proyecto que nació de la tierra: enterrado parcialmente en la colina, Nace convive con la topografía en lugar de imponerse sobre ella. La cubierta verde y los muros de piedra local lo anclan al paisaje. La ventilación cruzada elimina la necesidad de climatización artificial.',
    tags: ['Residencial', 'Piedra local', 'Cubierta verde', 'Bioclimático'],
    images: [naceImg, nace2, nace3],
  },
  {
    name: 'Raíz',
    location: 'Ojochal, Puntarenas',
    year: '2023',
    area: '280 m²',
    desc: 'La arquitectura más honesta es la que expone sus materiales sin disimulo. Raíz celebra el concreto aparente, la madera sin tratar y el acero oxidado como paleta principal. Una residencia que envejece con elegancia y carácter, integrada en la selva sin perturbarla.',
    tags: ['Residencial', 'Concreto aparente', 'Acero oxidado', 'Madera natural'],
    images: [raizImg, raiz2, raiz3],
  },
]

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center', padding: isMobile ? 0 : 24 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#161616',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: isMobile ? '24px 24px 0 0' : 24,
          overflow: 'hidden',
          maxWidth: isMobile ? '100%' : 960,
          width: '100%',
          height: isMobile ? '93vh' : 'min(620px, 90vh)',
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : undefined,
          ...(isMobile ? {} : { gridTemplateColumns: '1.1fr 1fr' }),
        }}
      >
        {/* Galería */}
        <div style={{ display: 'flex', flexDirection: 'column', height: isMobile ? 'auto' : '100%', overflow: 'hidden', flexShrink: isMobile ? 0 : undefined }}>
          {/* Imagen principal */}
          <div style={{ position: 'relative', flex: isMobile ? undefined : 1, height: isMobile ? 220 : undefined, minHeight: 0, overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={project.images[activeImg]}
                alt={project.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </AnimatePresence>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)' }} />
          </div>
          {/* Miniaturas */}
          <div style={{ flexShrink: 0, display: 'flex', gap: 8, padding: '10px 12px', background: '#0f0f0f' }}>
            {project.images.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveImg(i)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                style={{ flex: 1, height: 58, borderRadius: 8, overflow: 'hidden', border: `2px solid ${i === activeImg ? accent : 'rgba(255,255,255,0.15)'}`, padding: 0, cursor: 'pointer', transition: 'border-color 0.2s', flexShrink: 0 }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: i === activeImg ? 'none' : 'brightness(0.45)' }} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Información */}
        <div style={{ padding: isMobile ? '20px 20px 28px' : '36px 32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: 10 }}>/ PROYECTO RESIDENCIAL</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? 16 : 24 }}>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? 32 : 'clamp(36px, 4vw, 52px)', letterSpacing: '0.03em', color: '#fff', lineHeight: 1 }}>{project.name.toUpperCase()}</h2>
            <motion.button
              whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.94 }}
              onClick={onClose}
              style={{ flexShrink: 0, marginLeft: 16, width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
            >✕</motion.button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: isMobile ? 16 : 28, paddingBottom: isMobile ? 16 : 28, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { label: 'Ubicación', value: project.location },
              { label: 'Año', value: project.year },
              { label: 'Área', value: project.area },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: gray, marginBottom: 6 }}>{s.label}</p>
                <p style={{ fontSize: 13, color: '#fff', lineHeight: 1.4 }}>{s.value}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 14, color: grayLight, lineHeight: 1.85, marginBottom: isMobile ? 16 : 28 }}>{project.desc}</p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'auto' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: grayLight, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '5px 14px' }}>{tag}</span>
            ))}
          </div>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} style={{ marginTop: 24 }}>
            <Link
              to="/contacto"
              onClick={onClose}
              style={{ display: 'block', textAlign: 'center', background: accent, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: 999, textDecoration: 'none' }}
            >
              CONSULTAR PROYECTO SIMILAR
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PortafolioV2() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <div style={{ background: bg, color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <NavbarV2 />

      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', height: '50vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.img
          src={amanecerImg} alt="Portafolio"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '110%', objectFit: 'cover', y: heroY }}
        />
        <div style={{ position: 'absolute', inset: 0, background: bg, opacity: 0.70 }} />
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: 16 }}
          >
            Nuestro trabajo
          </motion.p>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? 48 : 'clamp(48px, 8vw, 80px)', letterSpacing: '0.05em', color: '#fff' }}>
            NUESTROS PROYECTOS
          </h1>
        </motion.div>
      </section>

      {/* Intro */}
      <motion.div
        variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={vp}
        style={{ padding: isMobile ? '48px 24px 32px' : '72px 48px 48px', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 20 : 60, alignItems: 'end' }}
      >
        <div>
          <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 16 }}>/ RESIDENCIAL</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? 28 : 'clamp(28px, 3.5vw, 44px)', color: '#fff', letterSpacing: '0.02em', lineHeight: 1.1 }}>
            TRES PROYECTOS. TRES FILOSOFÍAS. UN MISMO COMPROMISO.
          </motion.h2>
        </div>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: grayLight, lineHeight: 1.8 }}>
          Cada residencia es una respuesta singular al terreno, al cliente y al entorno. Hacé clic en cada proyecto para conocer su historia completa.
        </motion.p>
      </motion.div>

      {/* Grid */}
      <section style={{ padding: isMobile ? '0 24px 80px' : '0 48px 120px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={vp}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}
        >
          {projects.map((p) => (
            <motion.div
              key={p.name}
              variants={scaleIn}
              whileHover={!isMobile ? { y: -6 } : {}}
              onClick={() => setSelected(p)}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(null)}
              style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            >
              {/* Imagen */}
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: isMobile ? '16/10' : '3/4' }}>
                <motion.img
                  src={p.images[0]} alt={p.name}
                  animate={{ scale: hovered === p.name ? 1.07 : 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Hover overlay — desktop only */}
                {!isMobile && (
                  <motion.div
                    animate={{ opacity: hovered === p.name ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: hovered === p.name ? 1 : 0.8, opacity: hovered === p.name ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ background: '#fff', borderRadius: 999, padding: '10px 24px', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', color: '#000' }}
                    >
                      VER PROYECTO →
                    </motion.div>
                  </motion.div>
                )}

                {/* Info overlay at bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 20px 20px', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: 4 }}>{p.location}</p>
                      <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: '0.04em', color: '#fff', lineHeight: 1 }}>{p.name.toUpperCase()}</h3>
                    </div>
                    <span style={{ fontSize: 13, color: grayLight }}>{p.year}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ background: '#181818', border: '1px solid rgba(255,255,255,0.07)', borderTop: 'none', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: '16px 20px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {p.tags.slice(1).map(tag => (
                  <span key={tag} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: grayLight, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: '4px 10px' }}>{tag}</span>
                ))}
                <span style={{ fontSize: 10, fontWeight: 600, color: grayLight, marginLeft: 'auto' }}>{p.area}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section style={{ background: '#141414', padding: isMobile ? '60px 24px' : '100px 48px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.div variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={vp}>
          <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>/ TU PROYECTO</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? 32 : 'clamp(32px, 5vw, 64px)', color: '#fff', letterSpacing: '0.02em', lineHeight: 1.1, maxWidth: '20ch', margin: '0 auto 40px' }}>
            ¿QUERÉS QUE EL PRÓXIMO SEA EL TUYO?
          </motion.h2>
          <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contacto" style={{ display: isMobile ? 'block' : 'inline-block', textAlign: 'center', background: '#fff', color: '#000', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', padding: '16px 40px', borderRadius: 999, textDecoration: 'none' }}>
              INICIAR MI PROYECTO
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <FooterV2 />

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}
