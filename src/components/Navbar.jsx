import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'


const Instagram = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const Facebook = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const NAV_LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/propiedades', label: 'Propiedades' },
    { to: '/tasacion', label: 'Tasación' },
    { to: '/Nosotros', label: 'Nosotros' },
    { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll() // check immediately
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Cierra el menú móvil cuando cambia de ruta
    useEffect(() => {
        setMobileOpen(false)
    }, [location.pathname])

    // Bloquea el scroll cuando el menú móvil está abierto
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [mobileOpen])

    // Estilos dinámicos estilo "Premium"
    const navContainerStyles = scrolled
        ? 'bg-white/85 backdrop-blur-2xl border-b border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-2'
        : 'bg-white/60 backdrop-blur-md border-b border-transparent py-4'

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-out ${navContainerStyles}`}>
                <div className="max-w-[1440px] mx-auto px-[5%] flex items-center justify-between">
                    
                    {/* ── Brand / Logo ── */}
                    <Link to="/" className="flex items-center group relative z-[1001]" aria-label="Inicio">
                        <div className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105">
                            <img src="/logo.png" alt="Caramello Propiedades" className="h-[50px] w-auto object-contain" />
                        </div>
                    </Link>

                    {/* ── Desktop Links ── */}
                    <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
                        <ul className="flex items-center gap-1.5 list-none bg-white/70 backdrop-blur-xl border border-white/80 px-2 py-1.5 rounded-full shadow-[0_2px_20px_rgb(0,0,0,0.03)]">
                            {NAV_LINKS.map(({ to, label }) => (
                                <li key={to}>
                                    <NavLink 
                                        to={to} 
                                        end={to === '/'} 
                                        className={({ isActive }) => `
                                            relative font-body font-bold text-[0.72rem] uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors duration-300 overflow-hidden group flex items-center justify-center
                                            ${isActive ? 'text-white' : 'text-textPrimary/70 hover:text-textPrimary'}
                                        `}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {isActive && (
                                                    <span className="absolute inset-0 bg-primary rounded-full shadow-[0_2px_8px_rgba(18,100,95,0.25)] -z-10" />
                                                )}
                                                {!isActive && (
                                                    <span className="absolute inset-0 bg-black/5 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out -z-10" />
                                                )}
                                                {label}
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Right CTA ── */}
                    <div className="hidden lg:flex items-center gap-4">
                        <button
                            onClick={() => navigate('/contacto')}
                            className="group relative font-body font-bold text-[0.7rem] tracking-widest uppercase px-6 py-[13px] rounded-full overflow-hidden flex items-center gap-2 bg-textPrimary text-white shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(18,100,95,0.25)] hover:-translate-y-0.5"
                        >
                            <span className="absolute inset-0 w-full h-full bg-primary origin-bottom translate-y-[100%] group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" />
                            <span className="relative z-10 flex items-center gap-2">Consultar <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                        </button>
                    </div>

                    {/* ── Mobile Hamburger ── */}
                    <button
                        className={`lg:hidden relative z-[1001] w-12 h-12 flex flex-col items-center justify-center gap-[5px] rounded-full transition-all duration-400 ${mobileOpen ? 'bg-black/5 text-textPrimary' : 'bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-textPrimary'}`}
                        onClick={() => setMobileOpen(v => !v)}
                        aria-label="Menú"
                    >
                        <span className={`w-5 h-[2px] bg-current rounded-full transition-all duration-400 ease-[cubic-bezier(0.87,0,0.13,1)] ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                        <span className={`w-5 h-[2px] bg-current rounded-full transition-all duration-400 ease-out ${mobileOpen ? 'w-0 opacity-0' : ''}`} />
                        <span className={`w-5 h-[2px] bg-current rounded-full transition-all duration-400 ease-[cubic-bezier(0.87,0,0.13,1)] ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* ── Mobile Premium Menu ── */}
            <div 
                className={`fixed inset-0 z-[1000] bg-white/95 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="flex-1 overflow-y-auto flex flex-col pt-32 pb-10 px-8">
                    <ul className="flex flex-col gap-2 list-none m-0 p-0 flex-1">
                        {NAV_LINKS.map(({ to, label }, i) => (
                            <li 
                                key={to} 
                                className={`transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                                style={{ transitionDelay: mobileOpen ? `${(i + 1) * 0.08}s` : '0s' }}
                            >
                                <NavLink
                                    to={to}
                                    end={to === '/'}
                                    className={({ isActive }) => `
                                        flex items-center justify-between py-4 border-b border-black/[0.04] text-[2rem] font-body font-black tracking-tight transition-colors
                                        ${isActive ? 'text-primary' : 'text-textPrimary hover:text-primary'}
                                    `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            {label}
                                            {isActive && <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_12px_rgba(212,175,55,0.6)]" />}
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Footer Mobile Menu */}
                    <div 
                        className={`mt-10 transform transition-all duration-500 ease-out ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: mobileOpen ? `${(NAV_LINKS.length + 1) * 0.08 + 0.1}s` : '0s' }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <a href="#" className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-textPrimary hover:bg-primary hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-textPrimary hover:bg-primary hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                        </div>
                        <button
                            onClick={() => navigate('/contacto')}
                            className="w-full h-14 rounded-2xl bg-textPrimary text-white font-body font-bold uppercase tracking-widest text-[0.8rem] flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.12)] active:scale-95 transition-transform"
                        >
                            Comenzar consulta <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}