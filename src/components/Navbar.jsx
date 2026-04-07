import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import LogoIcon from './LogoIcon'

const NAV_LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/propiedades', label: 'Propiedades' },
    { to: '/Nosotros', label: 'Nosotros' },
    { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Colores según scroll (Ahora permanentemente blanco)
    const navBg = `bg-white/95 backdrop-blur-md border-b border-secondaryLight transition-all duration-300 ${scrolled ? 'shadow-md py-0' : 'shadow-none py-1'}`
    const logoName = 'text-textPrimary'
    const logoSub = 'text-secondary'
    const linkBase = 'text-textPrimary/70 hover:text-primary after:bg-secondary'
    const linkActive = 'text-primary'
    const ctaBg = 'bg-textPrimary text-white hover:bg-secondary'

    const linkClass = ({ isActive }) =>
        [
            'relative font-display font-semibold text-[0.72rem] tracking-[0.1em] uppercase pb-0.5 transition-colors duration-300',
            'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300',
            isActive
                ? `${linkActive} after:w-full`
                : `${linkBase} after:w-0 hover:after:w-full`,
        ].join(' ')

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[1000] h-[70px] flex items-center justify-between px-[5%] transition-all duration-400 ${navBg}`}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 no-underline" aria-label="Inicio">
                    <LogoIcon size={34} />
                    <div className="flex flex-col leading-none">
                        <span className={`font-display font-bold text-[0.9rem] tracking-[0.02em] transition-colors duration-300 ${logoName}`}>
                            Caramello
                        </span>
                        <span className={`font-display font-normal text-[0.58rem] tracking-[0.22em] uppercase mt-0.5 transition-colors duration-300 ${logoSub}`}>
                            Propiedades
                        </span>
                    </div>
                </Link>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
                    {NAV_LINKS.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink to={to} end={to === '/'} className={linkClass}>
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <button
                    onClick={() => navigate('/contacto')}
                    className={`hidden md:block font-display font-bold text-[0.72rem] tracking-[0.1em] uppercase px-5 py-2.5 border-none cursor-pointer transition-all duration-300 hover:-translate-y-px rounded-full ${ctaBg}`}
                >
                    Consultar ahora
                </button>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden p-1 transition-colors duration-300 text-textPrimary hover:text-primary"
                    onClick={() => setMobileOpen(v => !v)}
                    aria-label="Abrir menú"
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[999] bg-textPrimary flex flex-col pt-[70px]">
                    <ul className="flex flex-col list-none m-0 p-0 px-8 gap-0">
                        {NAV_LINKS.map(({ to, label }) => (
                            <li key={to} className="border-b border-white/10">
                                <NavLink
                                    to={to}
                                    end={to === '/'}
                                    onClick={() => setMobileOpen(false)}
                                    className={({ isActive }) =>
                                        `block font-display font-semibold text-sm tracking-widest uppercase py-5 transition-colors ${isActive ? 'text-primary' : 'text-white/70'}`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="px-8 mt-8">
                        <button
                            onClick={() => { navigate('/contacto'); setMobileOpen(false) }}
                            className="w-full font-display font-bold text-sm tracking-widest uppercase text-textPrimary bg-primary py-4 rounded-full cursor-pointer"
                        >
                            Consultar ahora
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}