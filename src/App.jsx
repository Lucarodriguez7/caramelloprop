import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Properties from './pages/Properties'
import Property from './pages/Property'
import Nosotros from './pages/Nosotros'
import Contact from './pages/Contact'
import Tasacion from './pages/Tasacion'
import Preloader from './components/Preloader'
import AdminPanel from './pages/AdminPanel'

import AOS from 'aos'
import 'aos/dist/aos.css'

import FichaColega from './pages/FichaColega'
import NeutralPortal from './pages/NeutralPortal'

function AppContent() {
  const location = useLocation()
  
  const isWhitelabel = import.meta.env.VITE_IS_WHITELABEL === 'true' || 
                       window.location.hostname.includes('anonimas') || 
                       window.location.hostname.includes('listado-inmuebles') || 
                       (window.location.hostname === 'localhost' && new URLSearchParams(window.location.search).get('whitelabel') === 'true');

  const isNoLayout = location.pathname.startsWith('/admin') || location.pathname.startsWith('/ficha')

  useEffect(() => {
    if (!isNoLayout && !isWhitelabel) {
      AOS.init({
        once: true,
        duration: 800,
        offset: 100,
        easing: 'ease-in-out-cubic',
      })
    }
  }, [isNoLayout, isWhitelabel])

  if (isWhitelabel) {
    return (
      <Routes>
        <Route path="/" element={<NeutralPortal />} />
        <Route path="/ficha/:id" element={<FichaColega />} />
        <Route path="*" element={<NeutralPortal />} />
      </Routes>
    )
  }

  return (
    <>
      {!isNoLayout && <Preloader key={location.pathname} />}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/propiedades" element={<Properties />} />
          <Route path="/propiedades/:id" element={<Property />} />
          <Route path="/tasacion" element={<Tasacion />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contact />} />
        </Route>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/ficha/:id" element={<FichaColega />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}