import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Properties from './pages/Properties'
import Property from './pages/Property'
import Nosotros from './pages/Nosotros'
import Contact from './pages/Contact'
import Preloader from './components/Preloader'

import AOS from 'aos'
import 'aos/dist/aos.css'

export default function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      offset: 100,
      easing: 'ease-in-out-cubic',
    })
  }, [])

  return (
    <>
      <Preloader />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/propiedades" element={<Properties />} />
            <Route path="/propiedades/:id" element={<Property />} />
            <Route path="/Nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}