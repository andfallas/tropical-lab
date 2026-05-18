import { useState, FormEvent, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import NavbarV2 from '@/v2/components/NavbarV2'
import FooterV2 from '@/v2/components/FooterV2'
import raizImg from '@/assets/images/port-cover-raiz.webp'

const bg = '#101010'
const bg2 = '#181818'
const accent = '#964B00'
const grayLight = '#999999'

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
const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})

const vp = { once: true, margin: '-80px' }

const inputStyle = (focused: boolean): React.CSSProperties => ({
  width: '100%',
  background: bg2,
  border: `1px solid ${focused ? accent : 'rgba(255,255,255,0.15)'}`,
  borderRadius: 8,
  padding: '14px 16px',
  color: '#fff',
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
})

export default function ContactoV2() {
  const [focused, setFocused] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', telefono: '', mensaje: '' })

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const field = (key: keyof typeof form, label: string, type = 'text', textarea = false) => (
    <motion.div key={key} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', color: grayLight, textTransform: 'uppercase' }}>{label}</label>
      {textarea
        ? <textarea rows={5} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            onFocus={() => setFocused(key)} onBlur={() => setFocused(null)}
            style={{ ...inputStyle(focused === key), resize: 'vertical' }} />
        : <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            onFocus={() => setFocused(key)} onBlur={() => setFocused(null)}
            style={inputStyle(focused === key)} />
      }
    </motion.div>
  )

  return (
    <div style={{ background: bg, color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <NavbarV2 />

      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', height: '50vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.img
          src={raizImg} alt="Contacto"
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
            Hablemos
          </motion.p>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: '0.05em', color: '#fff' }}>
            CONTÁCTENOS
          </h1>
        </motion.div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 48px 120px', maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80 }}>
        {/* Info */}
        <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={vp}>
          <motion.p variants={slideLeft} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 32 }}>/ DATOS DE CONTACTO</motion.p>
          {[
            { icon: '📞', label: 'Teléfono', value: '+506 0000-0000' },
            { icon: '✉', label: 'Email', value: 'hola@tropicallab.cr' },
            { icon: '📍', label: 'Dirección', value: 'San José, Costa Rica' },
          ].map((d, i) => (
            <motion.div key={d.label} variants={fadeUp}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              style={{ display: 'flex', gap: 16, marginBottom: 28, alignItems: 'flex-start' }}
            >
              <motion.div
                whileHover={{ scale: 1.1, borderColor: accent }}
                style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid rgba(255,255,255,0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}
              >
                {d.icon}
              </motion.div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: grayLight, marginBottom: 4 }}>{d.label}</p>
                <p style={{ fontSize: 15, color: '#fff' }}>{d.value}</p>
              </div>
            </motion.div>
          ))}

          <motion.div variants={fadeUp} style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: grayLight, marginBottom: 16 }}>Redes sociales</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['F', 'IG', 'X'].map(s => (
                <motion.button key={s}
                  whileHover={{ scale: 1.1, borderColor: accent, color: accent }}
                  whileTap={{ scale: 0.94 }}
                  style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'none', color: grayLight, fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
                >{s}</motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Formulario */}
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={vp}>
          <motion.p variants={slideRight} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 32 }}>/ ESCRIBINOS</motion.p>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', padding: '60px 0' }}
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                style={{ width: 64, height: 64, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}
              >✓</motion.div>
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: '0.03em', color: '#fff', marginBottom: 12 }}>MENSAJE ENVIADO</h3>
              <p style={{ fontSize: 14, color: grayLight }}>Nos pondremos en contacto contigo en las próximas 24 horas.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {field('nombre', 'Nombre completo')}
              {field('empresa', 'Empresa')}
              {field('email', 'Email', 'email')}
              {field('telefono', 'Teléfono', 'tel')}
              {field('mensaje', 'Mensaje', 'text', true)}
              <motion.div variants={fadeUp}>
                <motion.button type="submit"
                  whileHover={{ scale: 1.02, background: '#B85C00' }}
                  whileTap={{ scale: 0.97 }}
                  style={{ width: '100%', padding: '16px', background: accent, color: '#fff', border: 'none', borderRadius: 999, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', marginTop: 8 }}
                >
                  ENVIAR CONSULTA
                </motion.button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </section>

      <FooterV2 />
    </div>
  )
}
