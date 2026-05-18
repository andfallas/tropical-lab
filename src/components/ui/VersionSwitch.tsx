import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const accent = '#964B00'

export default function VersionSwitch() {
  const [hovered, setHovered] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = (e: Event) => setNavOpen((e as CustomEvent<boolean>).detail)
    window.addEventListener('navmenuchange', handler)
    return () => window.removeEventListener('navmenuchange', handler)
  }, [])

  if (pathname === '/contacto' || navOpen) return null

  return (
    <Link
      to="/contacto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: 'calc(28px + env(safe-area-inset-bottom, 0px))',
        right: 28,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: hovered ? '#B85C00' : accent,
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.12em',
        padding: '13px 22px',
        borderRadius: 999,
        textDecoration: 'none',
        boxShadow: hovered
          ? '0 8px 32px rgba(150,75,0,0.55)'
          : '0 4px 20px rgba(150,75,0,0.35)',
        transition: 'background 0.2s, box-shadow 0.2s',
      }}
    >
      CONTACTAR →
    </Link>
  )
}
