import { Link } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useIsMobile'

const links = ['Nosotros', 'Servicios', 'Portafolio', 'Contacto']
const socials = ['F', 'IG', 'X']

export default function FooterV2() {
  const isMobile = useIsMobile()

  return (
    <footer style={{ background: '#101010', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
      {/* Nav + socials row */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '28px 24px' : '32px 48px',
        gap: isMobile ? 24 : 0,
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 16 : 32 }}>
          {links.map(l => (
            <Link key={l} to={`/${l.toLowerCase()}`} style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#626262', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#626262')}
            >{l}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {socials.map(s => (
            <button key={s} style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'none', color: '#626262',
              fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
              cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#964B00'; e.currentTarget.style.color = '#964B00' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#626262' }}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Huge wordmark */}
      <div style={{ textAlign: 'center', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? 48 : 'clamp(80px, 12vw, 160px)', color: '#1a1a1a', letterSpacing: '0.02em' }}>
          TROPICAL LAB
        </span>
      </div>

      {/* Copyright row */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'center' : undefined,
        gap: isMobile ? 8 : 0,
        padding: isMobile ? '16px 24px' : '16px 48px',
        textAlign: 'center',
      }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#626262' }}>Política de privacidad</span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#626262' }}>© Tropical Lab {new Date().getFullYear()}. Todos los derechos reservados.</span>
      </div>

      {/* Accent bottom strip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: '#964B00' }} />
    </footer>
  )
}
