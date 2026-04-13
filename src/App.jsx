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

function AppContent() {
  const location = useLocation()
  const isNoLayout = location.pathname.startsWith('/admin') || location.pathname.startsWith('/ficha')

  useEffect(() => {
    if (!isNoLayout) {
      AOS.init({
        once: true,
        duration: 800,
        offset: 100,
        easing: 'ease-in-out-cubic',
      })
    }
  }, [isNoLayout])

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