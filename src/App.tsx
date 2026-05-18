import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageLoader from '@/components/ui/PageLoader'
import ScrollToTop from '@/components/ui/ScrollToTop'
import VersionSwitch from '@/components/ui/VersionSwitch'
import { LoaderContext } from '@/context/LoaderContext'

const HomeV2 = lazy(() => import('@/v2/pages/HomeV2'))
const ServiciosV2 = lazy(() => import('@/v2/pages/ServiciosV2'))
const PortafolioV2 = lazy(() => import('@/v2/pages/PortafolioV2'))
const NosotrosV2 = lazy(() => import('@/v2/pages/NosotrosV2'))
const ContactoV2 = lazy(() => import('@/v2/pages/ContactoV2'))

const fallback = <div style={{ minHeight: '100vh', background: '#101010' }} />

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <BrowserRouter>
      <LoaderContext.Provider value={loaded}>
        <ScrollToTop />
        <Suspense fallback={fallback}>
          <Routes>
            <Route path="/" element={<HomeV2 />} />
            <Route path="/servicios" element={<ServiciosV2 />} />
            <Route path="/portafolio" element={<PortafolioV2 />} />
            <Route path="/nosotros" element={<NosotrosV2 />} />
            <Route path="/contacto" element={<ContactoV2 />} />
          </Routes>
        </Suspense>
        <VersionSwitch />
        {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      </LoaderContext.Provider>
    </BrowserRouter>
  )
}
