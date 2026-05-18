import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const accent = '#964B00'

export default function VersionSwitch() {
  const [hovered, setHovered] = useState(false)
  const { pathname } = useLocation()

  if (pathname === '/contacto') return null

  return (
    <Link
      to="/contacto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: 28,
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
