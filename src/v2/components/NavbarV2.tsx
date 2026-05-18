import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import logoSvg from '@/assets/logo.svg'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/servicios', label: 'Servicios', end: false },
  { to: '/portafolio', label: 'Portafolio', end: false },
  { to: '/nosotros', label: 'Nosotros', end: false },
  { to: '/contacto', label: 'Contacto', end: false },
]

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

  return (
    <>
      <nav style={S.nav}>
        {/* Logo */}
        <Link to="/">
          <img src={logoSvg} alt="Tropical Lab" style={{ height: 32, width: 'auto', filter: 'brightness(0) invert(1)' }} />
        </Link>

        {/* Nav pill — absolutely centered */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <div style={S.pill}>
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              style={({ isActive }) => ({
                ...S.linkBase,
                ...(isActive ? S.linkActive : {}),
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        </div>

        {/* CTA */}
        <Link
          to="/contacto"
          style={{ ...S.cta, ...(ctaHover ? { background: '#fff', color: '#000' } : {}) }}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
        >
          Contáctenos
        </Link>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: '#101010',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 32,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }}>✕</button>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 48, color: '#fff', textDecoration: 'none', letterSpacing: '0.05em' }}>{l.label}</NavLink>
          ))}
        </div>
      )}
    </>
  )
}
