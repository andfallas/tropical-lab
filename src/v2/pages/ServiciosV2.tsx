import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavbarV2 from '@/v2/components/NavbarV2'
import FooterV2 from '@/v2/components/FooterV2'
import amanecerImg from '@/assets/images/port-cover-amanecer.webp'
import naceImg from '@/assets/images/port-cover-nace.webp'
import raizImg from '@/assets/images/port-cover-raiz.webp'
import galNace2 from '@/assets/images/gallery-nace-2.webp'
import galRaiz2 from '@/assets/images/gallery-raiz-2.webp'

const bg = '#101010'
const bg2 = '#181818'
const accent = '#964B00'
const grayLight = '#999999'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const vp = { once: true, margin: '-80px' }

type Service = {
  title: string
  label: string
  desc: string
  fullDesc: string
  features: string[]
  img: string
}

const services: Service[] = [
  {
    title: 'Desarrollo a medida',
    label: 'DISEÑO',
    desc: 'Diseñamos cada proyecto desde cero según tus necesidades, terreno y visión. Sin plantillas, sin atajos.',
    fullDesc: 'Trabajamos desde la primera línea de diseño hasta el último detalle constructivo. Cada proyecto nace de un análisis profundo del terreno, el cliente y el entorno natural. No existe el proyecto repetido en Tropical Lab — cada espacio es un reflejo único de quien lo habita.',
    features: ['Análisis de terreno y contexto', 'Renders fotorrealistas 3D', 'Planos constructivos completos', 'Coordinación con ingeniería estructural', 'Revisión de diseño en tiempo real con el cliente'],
    img: amanecerImg,
  },
  {
    title: 'Materiales sostenibles',
    label: 'MATERIALES',
    desc: 'Seleccionamos materiales que responden al clima tropical, duran décadas y reducen el impacto ambiental.',
    fullDesc: 'La selección de materiales es una decisión que impacta décadas. Priorizamos materiales locales, de bajo mantenimiento y que respondan con inteligencia al clima tropical de Costa Rica. Concreto aparente, madera teka, travertino y vidrio estructural — sin concesiones estéticas ni ambientales.',
    features: ['Madera certificada FSC y teca tropical', 'Concreto aparente de alta resistencia', 'Vidrio estructural con control solar', 'Piedra travertino de origen local', 'Sistemas de ventilación natural integrada'],
    img: naceImg,
  },
  {
    title: 'Construcción llave en mano',
    label: 'CONSTRUCCIÓN',
    desc: 'Nos encargamos de todo: permisos, compras, ejecución y entrega. Sin intermediarios ni sorpresas.',
    fullDesc: 'Somos tu único interlocutor durante todo el proceso constructivo. Sin subcontratistas intermediarios, con presencia técnica en obra todos los días y reportes semanales con fotografías y avances reales. Entregamos lo que prometemos, cuando lo prometemos.',
    features: ['Dirección técnica en sitio cada día', 'Reportes fotográficos semanales', 'Gestión de compras y proveedores', 'Control de calidad en cada etapa', 'Garantía de entrega en el plazo pactado'],
    img: raizImg,
  },
  {
    title: 'Paisajismo y planificación',
    label: 'PAISAJISMO',
    desc: 'Integramos vegetación tropical, agua y topografía natural en el diseño desde el primer día.',
    fullDesc: 'La naturaleza no es un accesorio — es parte integral del diseño desde el primer trazo. Integramos vegetación tropical, espejos de agua, iluminación y topografía como elementos arquitectónicos, no como afterthoughts. El exterior de tu hogar merece el mismo rigor que el interior.',
    features: ['Diseño de jardines con especies nativas', 'Piscinas infinity y espejos de agua', 'Iluminación exterior arquitectónica', 'Sistemas de riego automatizados', 'Planificación de accesos y zonas exteriores'],
    img: galNace2,
  },
  {
    title: 'Acompañamiento integral',
    label: 'SOPORTE',
    desc: 'Estamos con vos desde la primera reunión hasta las visitas de seguimiento dos años después de la entrega.',
    fullDesc: 'La relación con nuestros clientes no termina con la entrega de llaves. Te acompañamos con visitas de seguimiento, asesoría en mantenimiento y soporte técnico directo. Un hogar de esta categoría merece cuidado y atención continua — eso es lo que ofrecemos.',
    features: ['Visitas de seguimiento post-entrega', 'Manual de mantenimiento personalizado', 'Soporte técnico directo', 'Red de proveedores de mantenimiento', 'Garantía estructural de 10 años'],
    img: galRaiz2,
  },
]

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
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
      key="overlay"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <motion.div
        key="card"
        initial={{ opacity: 0, scale: 0.88, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, overflow: 'hidden', maxWidth: 900, width: '100%', height: 'min(580px, 90vh)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}
      >
        {/* Imagen — posición absoluta para no afectar el tamaño del modal */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={service.img} alt={service.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', top: 20, left: 20 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#fff', background: accent, borderRadius: 999, padding: '6px 14px' }}>{service.label}</span>
          </div>
        </div>

        {/* Contenido */}
        <div style={{ padding: '40px 36px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: 12 }}>/ {service.label}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '0.03em', color: '#fff', lineHeight: 1.1 }}>{service.title}</h2>
            <motion.button
              whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.94 }}
              onClick={onClose}
              style={{ flexShrink: 0, marginLeft: 16, width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
            >✕</motion.button>
          </div>
          <p style={{ fontSize: 14, color: grayLight, lineHeight: 1.8, marginBottom: 32 }}>{service.fullDesc}</p>

          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>Incluye</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {service.features.map((f, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                >
                  <span style={{ width: 20, height: 20, borderRadius: '50%', border: `1.5px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span style={{ fontSize: 13, color: grayLight }}>{f}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contacto"
                onClick={onClose}
                style={{ display: 'block', textAlign: 'center', background: accent, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: 999, textDecoration: 'none' }}
              >
                SOLICITAR ESTE SERVICIO
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ServiciosV2() {
  const [selected, setSelected] = useState<Service | null>(null)

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <div style={{ background: bg, color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <NavbarV2 />

      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', height: '50vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.img
          src={raizImg} alt="Servicios"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '110%', objectFit: 'cover', y: heroY }}
        />
        <div style={{ position: 'absolute', inset: 0, background: bg, opacity: 0.70 }} />
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 1, fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: '0.05em', color: '#fff', textAlign: 'center' }}
        >
          NUESTROS SERVICIOS
        </motion.h1>
      </section>

      {/* Intro */}
      <motion.section
        variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={vp}
        style={{ padding: '80px 48px 40px', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end' }}
      >
        <div>
          <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 16 }}>/ LO QUE HACEMOS</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.02em', color: '#fff', lineHeight: 1.1 }}>
            CICLO COMPLETO DE CONSTRUCCIÓN, DEL CONCEPTO A LA ENTREGA
          </motion.h2>
        </div>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: grayLight, lineHeight: 1.8 }}>
          Cada proyecto es un proceso vivo. Acompañamos cada decisión con experiencia técnica y visión artística para que el resultado supere tus expectativas.
        </motion.p>
      </motion.section>

      {/* Grid de cards */}
      <section style={{ padding: '40px 48px 120px' }}>
        <motion.div
          variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={vp}
          style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {services.map(s => (
            <motion.div
              key={s.title} variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => setSelected(s)}
              style={{ background: bg2, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
            >
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 24, position: 'relative' }}>
                <img src={s.img} alt={s.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#fff', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', borderRadius: 999, padding: '5px 10px' }}>{s.label}</span>
                </div>
              </motion.div>
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, letterSpacing: '0.03em', color: '#fff', marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: grayLight, lineHeight: 1.75, flex: 1 }}>{s.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: accent }}>Ver detalle</span>
                <motion.span whileHover={{ x: 4 }} style={{ fontSize: 13, color: accent, display: 'inline-block' }}>→</motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section style={{ background: '#181818', padding: '100px 48px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.div variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={vp}>
          <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>/ EMPECEMOS</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(32px, 5vw, 64px)', color: '#fff', letterSpacing: '0.02em', lineHeight: 1.1, maxWidth: '20ch', margin: '0 auto 40px' }}>
            ¿LISTO PARA DAR EL PRIMER PASO?
          </motion.h2>
          <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contacto" style={{ display: 'inline-block', background: '#fff', color: '#000', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', padding: '16px 40px', borderRadius: 999, textDecoration: 'none' }}>
              CONTACTAR AHORA
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <FooterV2 />

      {/* Modal */}
      <AnimatePresence>
        {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}
