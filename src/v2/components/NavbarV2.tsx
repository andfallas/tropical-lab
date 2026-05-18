import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoSvg from '@/assets/logo.svg'
import { useIsMobile } from '@/hooks/useIsMobile'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/servicios', label: 'Servicios', end: false },
  { to: '/portafolio', label: 'Portafolio', end: false },
  { to: '/nosotros', label: 'Nosotros', end: false },
  { to: '/contacto', label: 'Contacto', end: false },
]

const accent = '#964B00'

const S = {
  nav: {
    position: 'fixed' as const,
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: 48,
    background: 'transparent',
  },
  navMobile: {
    position: 'fixed' as const,
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: 20,
    background: 'transparent',
  },
  pill: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.60)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: 999,
    padding: 4,
    gap: 0,
  },
  linkBase: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontWeight: 400,
    padding: '8px 20px',
    borderRadius: 0,
    textDecoration: 'none',
    transition: 'color 0.2s',
    color: '#555',
    background: 'transparent',
  },
  linkActive: {
    background: '#111',
    borderRadius: 999,
    color: '#fff',
    fontWeight: 500,
  },
  cta: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    padding: '10px 22px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.3)',
    background: 'rgba(0,0,0,0.82)',
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
  },
}

export default function NavbarV2() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [ctaHover, setCtaHover] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('navmenuchange', { detail: menuOpen }))
  }, [menuOpen])

  return (
    <>
      <nav style={isMobile ? S.navMobile : S.nav}>
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src={logoSvg} alt="Tropical Lab" style={{ height: 32, width: 'auto', filter: 'brightness(0) invert(1)' }} />
        </Link>

        {isMobile ? (
          /* Hamburger */
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
            aria-label="Menú"
          >
            {[0, 1, 2].map(i => (
              <motion.span key={i}
                animate={menuOpen
                  ? i === 0 ? { rotate: 45, y: 7 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -7 }
                  : { rotate: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2, transformOrigin: 'center' }}
              />
            ))}
          </button>
        ) : (
          <>
            {/* Nav pill — absolutamente centrado */}
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <div style={S.pill}>
                {links.map(l => (
                  <NavLink key={l.to} to={l.to} end={l.end}
                    style={({ isActive }) => ({ ...S.linkBase, ...(isActive ? S.linkActive : {}) })}
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </div>
            {/* CTA */}
            <Link to="/contacto"
              style={{ ...S.cta, ...(ctaHover ? { background: '#fff', color: '#000' } : {}) }}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
            >
              Contáctenos
            </Link>
          </>
        )}
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: '#101010',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {links.map((l, i) => (
              <motion.div key={l.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <NavLink to={l.to} end={l.end} onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: 48,
                    letterSpacing: '0.05em',
                    color: isActive ? accent : '#fff',
                    textDecoration: 'none',
                    display: 'block',
                    textAlign: 'center',
                    padding: '8px 0',
                  })}
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ marginTop: 32 }}
            >
              <Link to="/contacto" onClick={() => setMenuOpen(false)}
                style={{ display: 'inline-block', background: accent, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', padding: '14px 36px', borderRadius: 999, textDecoration: 'none' }}
              >
                CONTÁCTENOS
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
