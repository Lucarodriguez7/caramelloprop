import { useNavigate } from 'react-router-dom'
import CountUpStats from '../components/CountUpStats'
import { ArrowRight, Star, Home as HomeIcon, Key, BarChart2, Building2, Trees, FileText, MapPin, ChevronRight, Search, Shield, TrendingUp, Phone, Users, ArrowUpRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { supabase } from '../lib/supabaseClient'

const Instagram = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-instagram ${className}`}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const STATS = [
    { value: '+ 1200', label: 'Propiedades vendidas' },
    { value: '1998', label: 'Desde' },
    { value: '98%', label: 'Clientes satisfechos' },
    { value: '350+', label: 'Propiedades activas' },
]

const CATEGORIES = [
    {
        id: 'departamentos',
        name: 'Departamentos',
        tagline: 'Confort y modernidad',
        desc: 'Unidades premium en las mejores torres de la ciudad. Vistas exclusivas y amenities de primer nivel.',
        filter: 'departamento',
        img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85',
        count: 'Explorar unidades',
        tag: 'RESIDENCIAL',
    },
    {
        id: 'casas',
        name: 'Casas',
        tagline: 'Tu refugio privado',
        desc: 'Residencias de lujo con amplios jardines y espacios diseñados para la vida familiar en entornos tranquilos.',
        filter: 'casa',
        img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=85',
        count: 'Explorar casas',
        tag: 'EXCLUSIVO',
    },
    {
        id: 'oficinas',
        name: 'Oficinas',
        tagline: 'Espacios de negocios',
        desc: 'Ambientes corporativos diseñados para la productividad y el networking en puntos estratégicos.',
        filter: 'oficina',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85',
        count: 'Ver oficinas',
        tag: 'CORPORATIVO',
    },
    {
        id: 'locales',
        name: 'Locales',
        tagline: 'Potenciá tu marca',
        desc: 'Puntos comerciales de alto tráfico y gran visibilidad para llevar tu proyecto al siguiente nivel.',
        filter: 'local',
        img: 'https://imgur.com/i28MbEP.jpg',
        count: 'Ver locales',
        tag: 'COMERCIAL',
    },
];
const SERVICES = [
    {
        Icon: HomeIcon,
        title: 'Compra y Venta',
        desc: 'Asesoramiento integral para comprar o vender. Tasaciones, documentación y gestión completa.',
        detail: 'Análisis de mercado · Negociación · Documentación',
        color: 'from-primary/20 to-primary/5',
        iconBg: 'bg-primary/15',
        num: '01',
    },
    {
        Icon: Key,
        title: 'Alquileres',
        desc: 'Gestionamos tu propiedad para alquiler permanente o temporario. Cobranza y mantenimiento.',
        detail: 'Contratos · Cobranza · Gestión de inquilinos',
        color: 'from-secondary/10 to-secondary/5',
        iconBg: 'bg-secondary/10',
        num: '02',
    },
    {
        Icon: BarChart2,
        title: 'Tasaciones',
        desc: 'Valuaciones profesionales con análisis comparativo de zona y tendencias del mercado actual.',
        detail: 'Informe detallado · Benchmarking · Asesoramiento',
        color: 'from-primary/15 to-transparent',
        iconBg: 'bg-primary/10',
        num: '03',
    },
    {
        Icon: Building2,
        title: 'Comerciales',
        desc: 'Locales, oficinas e industria. Asesoramiento especializado para inversiones y negocios.',
        detail: 'Locales · Oficinas · Industria · Inversiones',
        color: 'from-secondary/15 to-secondary/5',
        iconBg: 'bg-secondary/10',
        num: '04',
    },
    {
        Icon: Trees,
        title: 'Countries y Barrios',
        desc: 'Especialistas en barrios cerrados, countries y chacras. Financiamiento incluido.',
        detail: 'Countries · Barrios cerrados · Chacras',
        color: 'from-primary/20 to-transparent',
        iconBg: 'bg-primary/15',
        num: '05',
    },
    {
        Icon: FileText,
        title: 'Asesoramiento Legal',
        desc: 'Respaldo jurídico en cada operación. Escrituras, boletos, contratos y documentación.',
        detail: 'Escrituras · Boletos · Contratos',
        color: 'from-secondary/10 to-transparent',
        iconBg: 'bg-secondary/10',
        num: '06',
    },
]

const INSTAGRAM_REELS = [
    {
        url: 'https://www.instagram.com/p/DT5uyOLDlHn/',
        img: 'https://imgur.com/Xb8Bdqh.jpg',
        caption: '✨ Nueva propiedad disponible — Consultá sin compromiso',
    },
    {
        url: 'https://www.instagram.com/p/DRsXNd8CS0N/',
        img: 'https://imgur.com/lhzP2oq.jpg',
        caption: '🏡 Recorrido exclusivo por esta joya inmobiliaria',
    },
    {
        url: 'https://www.instagram.com/p/DW2htX1DDQp/',
        img: 'https://imgur.com/An7Z0xn.jpg',
        caption: '📍 Nuevos ingresos de la semana — No te los pierdas',
    },
    {
        url: 'https://www.instagram.com/p/DWysR3PE7An/',
        img: 'https://imgur.com/Yz7U3Mb.jpg',
        caption: '🔑 Oportunidad única en zona premium',
    },
    {
        url: 'https://www.instagram.com/p/DWcVz0eExvr/',
        img: 'https://imgur.com/XPvqVak.jpg',
        caption: '🚀 El mercado crece y nosotros también',
    },
]

/* ── Property Card ─────────────────────────────────────────── */
function PropertyCard({ prop }) {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => navigate(`/propiedades/${prop.id}`)}
            className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(18,39,58,0.08)] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(18,39,58,0.15)] flex-shrink-0 w-[300px] md:w-auto"
        >
            <div className="relative h-[210px] overflow-hidden">
                <img src={prop.img} alt={prop.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className={`absolute top-3 left-3 text-[0.6rem] font-body font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full ${prop.tag === 'Venta' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                    {prop.tag}
                </span>
                {prop.featured && (
                    <span className="absolute top-3 right-3 bg-white/95 text-textPrimary text-[0.6rem] font-body font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Star size={9} fill="#00FBFA" stroke="#00FBFA" /> Destacado
                    </span>
                )}
                {prop.new && (
                    <span className="absolute bottom-3 left-3 bg-amber-100 text-amber-700 text-[0.6rem] font-body font-bold uppercase px-2.5 py-1 rounded-full border border-amber-200">
                        Nuevo ingreso
                    </span>
                )}
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[0.65rem] font-body font-bold tracking-widest uppercase text-primary">{prop.type}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[0.65rem] font-body font-medium tracking-wide text-textSecondary">{prop.zone}</span>
                </div>
                <h3 className="font-body font-bold text-primary text-[0.95rem] leading-snug mb-2">{prop.title}</h3>
                <div className="flex items-center gap-1.5 text-[0.79rem] text-textSecondary mb-4">
                    <MapPin size={11} className="shrink-0" />{prop.address}
                </div>
                <div className="flex gap-4 py-3 border-t border-b border-secondaryLight mb-4 text-[0.79rem] text-textSecondary">
                    {prop.beds && <span>{prop.beds} dorm.</span>}
                    {prop.baths && <span>{prop.baths} baños</span>}
                    <span>{prop.sqm} m²</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="font-body font-black text-textPrimary text-[1.18rem]">{prop.price}</div>
                    <span className="text-primary font-body font-bold text-[0.68rem] tracking-widest uppercase flex items-center gap-1 group-hover:gap-2.5 transition-all duration-200">
                        Ver más <ArrowRight size={11} />
                    </span>
                </div>
            </div>
        </div>
    )
}

/* ── Zone Card (desktop) ────────────────────────────────────── */
function ZoneCard({ zone, onClick }) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer h-[420px]"
            style={{
                boxShadow: hovered
                    ? '0 24px 60px rgba(18,39,58,0.22)'
                    : '0 4px 24px rgba(18,39,58,0.10)',
                transition: 'box-shadow 0.4s ease, transform 0.4s ease',
                transform: hovered ? 'translateY(-6px)' : 'none',
            }}
        >
            <img
                src={zone.img}
                alt={zone.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    transform: hovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background: hovered
                        ? 'linear-gradient(to top, rgba(12,26,45,0.97) 0%, rgba(12,26,45,0.55) 55%, rgba(12,26,45,0.15) 100%)'
                        : 'linear-gradient(to top, rgba(12,26,45,0.88) 0%, rgba(12,26,45,0.30) 55%, rgba(12,26,45,0.0) 100%)',
                    transition: 'background 0.4s ease',
                }}
            />
            <div className="absolute top-4 left-4">
                <span className="text-[0.55rem] font-body font-black tracking-[0.18em] uppercase bg-primary text-white px-3 py-1.5 rounded-full">
                    {zone.tag}
                </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-metallic text-[0.65rem] font-body font-bold tracking-[0.2em] uppercase mb-1.5">{zone.tagline}</p>
                <h3 className="font-body font-black text-white text-[1.5rem] leading-tight mb-3">{zone.name}</h3>
                <div
                    style={{
                        maxHeight: hovered ? '80px' : '0px',
                        opacity: hovered ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.4s ease, opacity 0.35s ease',
                    }}
                >
                    <p className="text-white/75 text-[0.82rem] leading-[1.7] mb-4">{zone.desc}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-white/50 text-[0.73rem] font-body">{zone.count}</span>
                    <span
                        className="flex items-center gap-1.5 text-primary font-body font-bold text-[0.7rem] tracking-[0.12em] uppercase"
                        style={{
                            opacity: hovered ? 1 : 0.6,
                            transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
                            transition: 'opacity 0.3s, transform 0.3s',
                        }}
                    >
                        Explorar <ArrowRight size={12} />
                    </span>
                </div>
            </div>
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    boxShadow: hovered ? 'inset 0 0 0 2px rgba(0,251,250,0.35)' : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                    transition: 'box-shadow 0.4s ease',
                }}
            />
        </div>
    )
}

/* ── Zone Swiper Card (mobile) ──────────────────────────────── */
function ZoneSwiperCard({ zone, onClick }) {
    return (
        <div
            onClick={onClick}
            className="relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 w-[260px] h-[320px]"
            style={{ boxShadow: '0 4px 24px rgba(18,39,58,0.14)' }}
        >
            <img src={zone.img} alt={zone.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,26,45,0.92) 0%, rgba(12,26,45,0.2) 60%, transparent 100%)' }} />
            <div className="absolute top-3 left-3">
                <span className="text-[0.5rem] font-body font-black tracking-[0.18em] uppercase bg-primary text-white px-2.5 py-1.5 rounded-full">{zone.tag}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-metallic text-[0.6rem] font-body font-bold tracking-[0.18em] uppercase mb-1">{zone.tagline}</p>
                <h3 className="font-body font-black text-white text-[1.2rem] leading-tight mb-2">{zone.name}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-white/50 text-[0.7rem] font-body">{zone.count}</span>
                    <span className="flex items-center gap-1 text-primary font-body font-bold text-[0.65rem] tracking-widest uppercase">Ver <ArrowRight size={11} /></span>
                </div>
            </div>
        </div>
    )
}

/* ── Swiper wrapper ─────────────────────────────────────────── */
function HorizontalSwiper({ children, className = '' }) {
    const ref = useRef(null)
    return (
        <div className={`relative ${className}`}>
            <div
                ref={ref}
                className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
                {children}
            </div>
        </div>
    )
}

/* ── Service Card ───────────────────────────────────────────── */
function ServiceCard({ Icon, title, desc, detail, num, iconBg }) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative bg-white rounded-2xl overflow-hidden border border-secondaryLight cursor-default"
            style={{
                boxShadow: hovered ? '0 16px 48px rgba(18,39,58,0.13)' : '0 2px_16px rgba(18,39,58,0.05)',
                transition: 'box-shadow 0.35s ease, transform 0.35s ease',
                transform: hovered ? 'translateY(-4px)' : 'none',
            }}
        >
            <div
                className="h-[3px] w-full"
                style={{
                    background: hovered
                        ? 'linear-gradient(90deg, #00FBFA, #1460AA)'
                        : 'transparent',
                    transition: 'background 0.4s ease',
                }}
            />
            <div className="p-7">
                <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center text-secondary transition-all duration-300 group-hover:bg-primary group-hover:text-textPrimary`}>
                        <Icon size={21} />
                    </div>
                    <span
                        className="font-body font-black text-[2rem] leading-none select-none"
                        style={{
                            color: hovered ? 'rgba(0,251,250,0.25)' : 'rgba(18,39,58,0.06)',
                            transition: 'color 0.4s ease',
                        }}
                    >
                        {num}
                    </span>
                </div>
                <h3 className="font-body font-bold text-primary text-[0.95rem] mb-2">{title}</h3>
                <p className="text-[0.83rem] text-textSecondary leading-[1.7] mb-5">{desc}</p>
                <div
                    style={{
                        maxHeight: hovered ? '40px' : '0px',
                        opacity: hovered ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.35s ease, opacity 0.3s ease',
                    }}
                >
                    <p className="text-[0.72rem] font-body font-medium tracking-wide text-primary uppercase">{detail}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-4 text-[0.72rem] font-body font-bold tracking-widest uppercase text-textPrimary/30 group-hover:text-primary transition-colors duration-300">
                    <span>Saber más</span>
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
            </div>
        </div>
    )
}

/* ── Instagram Reel Card (Premium) ────────────────────────── */
function InstagramReelCard({ reel }) {
    const [hovered, setHovered] = useState(false)
    return (
        <a
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="ig-reel-card group relative block rounded-2xl overflow-hidden"
            style={{ aspectRatio: '9/16' }}
        >
            {/* Thumbnail */}
            <img
                src={reel.img}
                alt={reel.caption}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    transform: hovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
            />

            {/* Dark overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: hovered
                        ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.12) 100%)'
                        : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
                    transition: 'background 0.5s ease',
                }}
            />

            {/* Reel icon indicator */}
            <div className="absolute top-3 right-3 z-10">
                <div
                    className="flex items-center gap-1 px-2 py-1 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
                        <path d="m22 8-6 4 6 4V8Z" />
                        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                    </svg>
                    <span className="text-white/80 text-[0.5rem] font-body font-semibold tracking-wider uppercase">Reel</span>
                </div>
            </div>

            {/* Play button center – appears on hover */}
            <div
                className="absolute inset-0 flex items-center justify-center z-10"
                style={{
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? 'scale(1)' : 'scale(0.6)',
                    transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                        background: 'rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1.5px solid rgba(255,255,255,0.25)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            {/* Instagram glow border on hover */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none z-20"
                style={{
                    opacity: hovered ? 1 : 0,
                    boxShadow: 'inset 0 0 0 2px rgba(225,48,108,0.55), 0 0 28px rgba(225,48,108,0.12)',
                    transition: 'opacity 0.4s ease',
                }}
            />

            {/* Bottom caption area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <p
                    className="text-white text-[0.76rem] font-body font-medium leading-snug line-clamp-2"
                    style={{
                        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                        transition: 'transform 0.4s ease',
                    }}
                >{reel.caption}</p>
                <div
                    className="flex items-center gap-1.5 mt-2.5"
                    style={{
                        opacity: hovered ? 1 : 0,
                        transform: hovered ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s',
                    }}
                >
                    <Instagram size={12} className="text-white/70" />
                    <span className="text-white/70 text-[0.6rem] font-body font-semibold tracking-[0.12em] uppercase">Ver en Instagram</span>
                </div>
            </div>
        </a>
    )
}

/* ── Premium Instagram Section ─────────────────────────────── */
function PremiumInstagramSection() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const cardsWrapRef = useRef(null)
    const ctaRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading stagger
            const headingEls = headingRef.current?.children
            if (headingEls) {
                gsap.fromTo(
                    headingEls,
                    { opacity: 0, y: 45 },
                    {
                        opacity: 1, y: 0, duration: 0.85, stagger: 0.13,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
                    }
                )
            }

            // Cards stagger
            const cards = cardsWrapRef.current?.querySelectorAll('.ig-reel-card')
            if (cards?.length) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 70, scale: 0.92 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: cardsWrapRef.current, start: 'top 85%', toggleActions: 'play none none none' },
                    }
                )
            }

            // CTA
            if (ctaRef.current) {
                gsap.fromTo(
                    ctaRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
                        scrollTrigger: { trigger: ctaRef.current, start: 'top 92%', toggleActions: 'play none none none' },
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden bg-secondaryLight"
        >
            {/* Decorative ambient lights integrated with branding */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-[15%] w-[800px] h-[800px] rounded-full opacity-[0.4]"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.7), transparent 70%)' }} />
                <div className="absolute -bottom-32 left-[5%] w-[600px] h-[600px] rounded-full opacity-[0.06]"
                    style={{ background: 'radial-gradient(circle, #12645F, transparent 70%)' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] opacity-[0.05]"
                    style={{ background: 'radial-gradient(ellipse, #12645F, transparent 70%)' }} />
            </div>

            <div className="relative z-10 px-[6%] md:px-[8%]">

                {/* ── Heading ───────────────────────────── */}
                <div ref={headingRef} className="text-center mb-14 md:mb-20">
                    {/* Instagram badge */}
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, #12645F 0%, #0A4441 100%)',
                                boxShadow: '0 8px 24px rgba(18,100,95,0.2)',
                            }}
                        >
                            <Instagram size={20} className="text-white" />
                        </div>
                        <span className="font-body text-[0.63rem] font-semibold tracking-[0.2em] uppercase text-secondary">
                            @caramellopropiedades3288
                        </span>
                    </div>

                    {/* Title */}
                    <h2
                        className="font-body font-black text-primary leading-tight mb-5"
                        style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
                    >
                        Seguinos en{' '}
                        <span
                            className="inline-block relative text-metallic"
                        >Instagram</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-textSecondary text-[0.92rem] font-body leading-[1.8] max-w-[420px] mx-auto">
                        Recorridos exclusivos, nuevas propiedades y el día a día de Caramello Propiedades.
                    </p>
                </div>

                {/* ── Cards ────────────────────────────── */}
                <div ref={cardsWrapRef}>
                    {/* Desktop: 5-col grid */}
                    <div className="hidden md:grid grid-cols-5 gap-4 mb-14">
                        {INSTAGRAM_REELS.map((reel, i) => (
                            <InstagramReelCard key={i} reel={reel} />
                        ))}
                    </div>

                    {/* Mobile: horizontal scroll */}
                    <div className="md:hidden mb-14">
                        <div
                            className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                        >
                            {INSTAGRAM_REELS.map((reel, i) => (
                                <div key={i} className="snap-center flex-shrink-0" style={{ width: '52%', maxWidth: '220px' }}>
                                    <InstagramReelCard reel={reel} />
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-textSecondary text-[0.72rem] font-body tracking-wide mt-3">
                            Deslizá para ver más →
                        </p>
                    </div>
                </div>

                {/* ── CTA ──────────────────────────────── */}
                <div ref={ctaRef} className="flex justify-center">
                    <a
                        href="https://instagram.com/caramellopropiedades3288"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-9 py-[1.1rem] rounded-full font-body font-bold text-[0.75rem] tracking-[0.15em] uppercase text-white transition-all duration-300"
                        style={{
                            background: '#12645F',
                            boxShadow: '0 8px 32px rgba(18,100,95,0.25)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-3px)'
                            e.currentTarget.style.boxShadow = '0 14px 44px rgba(18,100,95,0.35)'
                            e.currentTarget.style.background = '#0A4441'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(18,100,95,0.25)'
                            e.currentTarget.style.background = '#12645F'
                        }}
                    >
                        <Instagram size={17} className="opacity-90" />
                        Seguir en Instagram
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 opacity-80" />
                    </a>
                </div>
            </div>
        </section>
    )
}

/* ══════════════════════════════════════════════════════════════
   HERO SECTION — Rediseño Premium Emocional
══════════════════════════════════════════════════════════════ */
function HeroSection({ navigate }) {
    const sectionRef = useRef(null)
    const bgDesktopRef = useRef(null)
    const bgMobileRef = useRef(null)
    const overlayRef = useRef(null)
    const lineRef = useRef(null)
    const eyebrowRef = useRef(null)
    const titleRef = useRef(null)
    const titleLine2Ref = useRef(null)
    const subtitleRef = useRef(null)
    const separatorRef = useRef(null)
    const ctaRef = useRef(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        // Zoom-out suave del fondo
        tl.fromTo(
            [bgDesktopRef.current, bgMobileRef.current],
            { scale: 1.15 },
            { scale: 1.04, duration: 2.8, ease: 'power3.out' },
            0
        )

        // Overlay fade-in
        tl.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.4 },
            0
        )

        // Línea decorativa vertical crece desde arriba
        tl.fromTo(
            lineRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            { scaleY: 1, duration: 0.9, ease: 'power3.inOut' },
            0.4
        )

        // Eyebrow
        tl.fromTo(
            eyebrowRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7 },
            0.55
        )

        // Título H1 — primera parte
        tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
            0.7
        )

        // Título H1 — segunda parte
        tl.fromTo(
            titleLine2Ref.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
            0.9
        )

        // Separador
        tl.fromTo(
            separatorRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.7, ease: 'power3.inOut' },
            1.15
        )

        // Subtítulo H2
        tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.75 },
            1.25
        )

        // CTAs
        tl.fromTo(
            ctaRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7 },
            1.5
        )

        // Indicador scroll
        tl.fromTo(
            scrollRef.current,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.6 },
            1.9
        )

        // Dot del scroll — animación continua
        const dot = scrollRef.current?.querySelector('.scroll-dot')
        if (dot) {
            gsap.to(dot, {
                y: 8,
                repeat: -1,
                yoyo: true,
                duration: 0.9,
                ease: 'sine.inOut',
                delay: 2.4,
            })
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative flex flex-col overflow-hidden"
            style={{ minHeight: 'calc(100vh - 70px)' }}
        >
            {/* ── Fondo Desktop ─────────────────────────── */}
            <div
                ref={bgDesktopRef}
                className="absolute inset-0 bg-cover bg-center hidden md:block will-change-transform"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=80)',
                    backgroundPosition: '60% center',
                }}
            />

            {/* ── Fondo Mobile ──────────────────────────── */}
            <div
                ref={bgMobileRef}
                className="absolute inset-0 bg-cover bg-center block md:hidden will-change-transform"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80)',
                    backgroundPosition: 'center 30%',
                }}
            />

            {/* ── Overlay multicapa ─────────────────────── */}
            <div ref={overlayRef} className="absolute inset-0">
                {/* Capa base mobile */}
                <div className="absolute inset-0 bg-[#0b1622]/60 md:bg-transparent" />

                {/* Desktop — degradado lateral principal */}
                <div
                    className="absolute inset-0 hidden md:block"
                    style={{
                        background:
                            'linear-gradient(108deg, rgba(8,16,28,0.94) 0%, rgba(8,16,28,0.78) 35%, rgba(8,16,28,0.35) 60%, rgba(8,16,28,0.12) 80%, transparent 100%)',
                    }}
                />

                {/* Degradado inferior sutil */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[40%]"
                    style={{
                        background:
                            'linear-gradient(to top, rgba(8,16,28,0.85) 0%, rgba(8,16,28,0.40) 50%, transparent 100%)',
                    }}
                />

                {/* Toque cálido — vignette en esquina inferior derecha */}
                <div
                    className="absolute bottom-0 right-0 w-[55%] h-[55%] hidden md:block"
                    style={{
                        background:
                            'radial-gradient(ellipse at bottom right, rgba(18,100,95,0.08) 0%, transparent 70%)',
                    }}
                />
            </div>

            {/* ── Línea decorativa vertical ─────────────── */}
            <div
                ref={lineRef}
                className="absolute top-0 bottom-0 hidden md:block"
                style={{
                    left: 'calc(8% - 1px)',
                    width: '1px',
                    background:
                        'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.10) 20%, rgba(18,100,95,0.35) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)',
                }}
            />

            {/* ════════════════════════════════════════════
                CONTENIDO PRINCIPAL — Texto alineado a la izquierda
                Decisión: alineación izquierda genera lectura natural,
                jerarquía clara y sensación editorial premium.
            ════════════════════════════════════════════ */}
            <div className="relative z-10 flex flex-col flex-1 px-[8%]">

                <div className="flex-1 flex items-center">
                    <div className="w-full max-w-[680px] pt-16 md:pt-24 pb-28 md:pb-40">

                        {/* Eyebrow */}
                        <div
                            ref={eyebrowRef}
                            className="inline-flex items-center gap-3 mb-8 md:mb-10 opacity-0"
                        >
                            <span
                                className="block w-8 h-[1px]"
                                style={{ background: 'rgba(18,100,95,0.8)' }}
                            />
                            <span
                                className="font-body text-[0.6rem] md:text-[0.65rem] font-semibold tracking-[0.3em] uppercase"
                                style={{ color: 'rgba(255,255,255,0.55)' }}
                            >
                                Mar del Plata · Desde 1998
                            </span>
                        </div>

                        {/* ── H1 — Julius Sans One ──
                            Estructura emocional en dos bloques:
                            Bloque 1: "Cada propiedad es un hogar."
                            Bloque 2: "Y cada hogar, una nueva historia."
                        */}
                        <h1 className="mb-6 md:mb-8">
                            {/* Línea 1 */}
                            <span
                                ref={titleRef}
                                className="block font-display text-white opacity-0"
                                style={{
                                    fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
                                    lineHeight: 1.15,
                                    letterSpacing: '0.04em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Cada propiedad es un hogar.
                            </span>

                            {/* Línea 2 — estilo outline para contraste visual */}
                            <span
                                ref={titleLine2Ref}
                                className="block font-display opacity-0 mt-1 md:mt-2"
                                style={{
                                    fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
                                    lineHeight: 1.15,
                                    letterSpacing: '0.04em',
                                    textTransform: 'uppercase',
                                    WebkitTextStroke: '1.5px rgba(255,255,255,0.75)',
                                    color: 'transparent',
                                }}
                            >
                                Y cada hogar, una nueva historia.
                            </span>
                        </h1>

                        {/* Separador — línea de acento brand */}
                        <div
                            ref={separatorRef}
                            className="w-16 h-[2px] mb-6 md:mb-8 rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, #12645F, rgba(18,100,95,0.15))',
                            }}
                        />

                        {/* ── H2 — Inter, liviano y legible ── */}
                        <h2
                            ref={subtitleRef}
                            className="font-body font-light text-white/65 mb-10 md:mb-12 max-w-[480px] opacity-0"
                            style={{
                                fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                                lineHeight: 1.85,
                                letterSpacing: '0.01em',
                            }}
                        >
                            Te acompañamos en cada paso con confianza y cercanía.
                        </h2>

                        {/* CTAs */}
                        <div
                            ref={ctaRef}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0"
                        >
                            {/* CTA principal */}
                            <button
                                onClick={() => navigate('/propiedades')}
                                className="group flex items-center justify-center gap-2.5 px-9 py-[1.1rem] rounded-full font-body font-semibold text-[0.75rem] tracking-[0.14em] uppercase transition-all duration-300"
                                style={{
                                    background: '#12645F',
                                    color: '#FFFFFF',
                                    boxShadow: '0 8px 32px rgba(18, 100, 95, 0.28)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-2px)'
                                    e.currentTarget.style.boxShadow = '0 14px 40px rgba(18, 100, 95, 0.40)'
                                    e.currentTarget.style.background = '#0A4441'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(18, 100, 95, 0.28)'
                                    e.currentTarget.style.background = '#12645F'
                                }}
                            >
                                Ver propiedades
                                <ArrowRight
                                    size={14}
                                    className="group-hover:translate-x-1 transition-transform duration-200"
                                />
                            </button>

                            {/* CTA secundario — glass */}
                            <button
                                onClick={() => navigate('/contacto')}
                                className="group flex items-center justify-center gap-2.5 px-9 py-[1.1rem] rounded-full font-body font-semibold text-[0.75rem] tracking-[0.14em] uppercase text-white transition-all duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.18)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.14)'
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                                }}
                            >
                                Contactar
                                <ArrowRight
                                    size={14}
                                    className="opacity-50 group-hover:translate-x-1 transition-transform duration-200"
                                />
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            {/* ── Indicador scroll (desktop) ────────────── */}
            <div
                ref={scrollRef}
                className="absolute right-[8%] bottom-14 hidden lg:flex flex-col items-center gap-2 opacity-0"
            >
                <div
                    className="w-[1px] h-14 relative overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.10)' }}
                >
                    <div
                        className="scroll-dot absolute top-0 left-0 w-full rounded-full"
                        style={{
                            height: '45%',
                            background: 'linear-gradient(to bottom, #12645F, rgba(18,100,95,0))',
                        }}
                    />
                </div>
                <span
                    className="font-body text-[0.5rem] tracking-[0.28em] uppercase"
                    style={{
                        color: 'rgba(255,255,255,0.3)',
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                    }}
                >
                    Scroll
                </span>
            </div>

        </section>
    )
}

/* ══════════════════════════════════════════════════════════════
   MAIN HOME
══════════════════════════════════════════════════════════════ */
export default function Home() {
    const navigate = useNavigate()
    const [PROPERTIES, setProperties] = useState([])

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase
                .from('properties')
                .select('*')
                .eq('publicado', true)
                .eq('destacado', true)
                .order('created_at', { ascending: false })
                .limit(6)
            setProperties((data || []).map(p => ({
                id: p.id,
                type: p.tipo,
                zone: p.zona || '',
                title: p.titulo,
                address: p.direccion || '',
                beds: p.dormitorios || null,
                baths: p.banos || null,
                sqm: p.m2_cubiertos || 0,
                price: p.moneda === 'USD'
                    ? `USD ${Number(p.precio).toLocaleString('es-AR')}`
                    : `$${Number(p.precio).toLocaleString('es-AR')}/mes`,
                tag: p.operacion,
                featured: p.destacado,
                new: p.nuevo_ingreso,
                img: p.imagenes?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80',
            })))
        }
        load()
    }, [])

    const handleZoneClick = (filterValue) => {
        navigate(`/propiedades?tipo=${filterValue}`);
    };

    return (
        <div className="bg-white">

            {/* ════ HERO ════════════════════════════════════════════ */}
            <HeroSection navigate={navigate} />

            {/* ════ BIENVENIDO / ABOUT US SECTION ════════════════════════ */}
            <section data-aos="fade-up" className="py-28 px-[8%] bg-white flex flex-col lg:flex-row gap-16 lg:gap-24 items-center overflow-hidden">

                {/* Left Column (Images) */}
                <div className="lg:w-[48%] relative w-full flex justify-center mt-8 lg:mt-0">
                    <div className="relative w-[90%] md:w-[85%] lg:w-full">
                        <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative shadow-[0_20px_50px_rgba(18,39,58,0.12)]">
                            <img src="https://i.pinimg.com/originals/d5/56/aa/d556aae57af00949662ac9d1f62d8ea4.png" className="w-full h-full object-cover" alt="Propiedad destacada" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>
                        <div className="absolute -top-10 -right-4 lg:-right-10 w-[45%] aspect-square rounded-[1.5rem] overflow-hidden shadow-[0_20px_40px_rgba(18,39,58,0.15)] border-[6px] border-white">
                            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/309881372.jpg?k=9386697f93507aeba29d78f53f4aaa029e71ff09305be3ac97e094a135d466eb&o=&hp=1" className="w-full h-full object-cover" alt="Detalle propiedad" />
                        </div>
                    </div>
                </div>

                {/* Right Column (Content) */}
                <div className="lg:w-[52%]">
                    <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-secondary mb-3">
                        Trayectoria y confianza
                    </p>
                    <h2 className="font-body font-black text-primary leading-tight mb-6"
                        style={{ fontSize: 'clamp(2rem,3.2vw,2.6rem)' }}>
                        Acompañando decisiones
                        <br />
                        <span className="text-metallic">importantes en cada proceso</span>
                    </h2>
                    <p className="text-[0.95rem] text-textSecondary leading-[1.9] mb-14 max-w-[520px]">
                        Entendemos que no se trata solo de comprar, vender o alquilar una propiedad, sino de decisiones importantes.
                        Por eso en Caramello Propiedades acompañamos cada proceso con experiencia, honestidad y
                        atención personalizada.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 mb-14">
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-secondaryLight flex items-center justify-center mb-4">
                                <Search size={17} className="text-secondary" />
                            </div>
                            <h4 className="font-body font-bold text-primary mb-2 text-[0.95rem]">Búsqueda precisa</h4>
                            <p className="text-textSecondary text-[0.82rem] leading-[1.8]">Selección cuidada de oportunidades según cada necesidad.</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-secondaryLight flex items-center justify-center mb-4">
                                <BarChart2 size={17} className="text-secondary" />
                            </div>
                            <h4 className="font-body font-bold text-primary mb-2 text-[0.95rem]">Tasación profesional</h4>
                            <p className="text-textSecondary text-[0.82rem] leading-[1.8]">Análisis basado en datos reales del mercado local.</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-secondaryLight flex items-center justify-center mb-4">
                                <Shield size={17} className="text-secondary" />
                            </div>
                            <h4 className="font-body font-bold text-primary mb-2 text-[0.95rem]">Seguridad jurídica</h4>
                            <p className="text-textSecondary text-[0.82rem] leading-[1.8]">Procesos claros y respaldo en cada operación.</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-secondaryLight flex items-center justify-center mb-4">
                                <TrendingUp size={17} className="text-secondary" />
                            </div>
                            <h4 className="font-body font-bold text-primary mb-2 text-[0.95rem]">Visión estratégica</h4>
                            <p className="text-textSecondary text-[0.82rem] leading-[1.8]">Enfoque en decisiones sostenibles y bien fundamentadas.</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                        <button
                            onClick={() => navigate('/contacto')}
                            className="bg-textPrimary text-white px-8 py-4 rounded-full font-body font-bold text-[0.75rem] uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-textPrimary/20">
                            Hablar con un asesor <ArrowUpRight size={15} />
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full border border-secondaryLight flex items-center justify-center">
                                <Phone size={17} className="text-secondary" />
                            </div>
                            <div>
                                <p className="text-[0.65rem] font-bold text-secondary uppercase tracking-widest mb-1">Contacto directo</p>
                                <p className="font-body font-bold text-[0.95rem] text-primary">+54 9 223 448-7206</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════ SECCIÓN CATEGORÍAS ════════════════════════ */}
            <section data-aos="fade-up" className="py-20 px-[8%] bg-white">
                <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
                    <div>
                        <p className="font-body text-[0.63rem] font-bold tracking-[0.25em] uppercase text-secondary mb-2">¿Qué estás buscando?</p>
                        <h2 className="font-body font-black text-primary leading-tight" style={{ fontSize: 'clamp(1.7rem,3vw,2.5rem)' }}>
                            Encontrá el espacio <span className="text-metallic">ideal.</span>
                        </h2>
                        <p className="mt-2 text-[0.9rem] text-textSecondary max-w-[400px] leading-relaxed">
                            Desde tu próximo hogar hasta el espacio ideal para tu desarrollo profesional y laboral.
                        </p>
                    </div>
                    <button onClick={() => navigate('/propiedades')} className="btn-secondary">
                        Ver todo el catálogo <ArrowRight size={13} />
                    </button>
                </div>
                <div className="hidden lg:grid grid-cols-4 gap-4">
                    {CATEGORIES.map(item => (
                        <ZoneCard key={item.id} zone={item} onClick={() => handleZoneClick(item.filter)} />
                    ))}
                </div>
                <div className="lg:hidden">
                    <HorizontalSwiper>
                        {CATEGORIES.map(item => (
                            <ZoneSwiperCard key={item.id} zone={item} onClick={() => handleZoneClick(item.filter)} />
                        ))}
                    </HorizontalSwiper>
                    <p className="text-center text-[0.72rem] text-textSecondary mt-4 font-body tracking-wide">Deslizá para explorar categorías →</p>
                </div>
            </section>

            {/* ════ PROPIEDADES DESTACADAS ══════════════════════════ */}
            <section data-aos="fade-up" className="py-20 px-[8%] bg-secondaryLight">
                <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
                    <div>
                        <p className="font-body text-[0.63rem] font-bold tracking-[0.25em] uppercase text-secondary mb-2">Destacadas</p>
                        <h2 className="font-body font-black text-primary leading-tight" style={{ fontSize: 'clamp(1.7rem,3vw,2.5rem)' }}>
                            Propiedades <span className="text-metallic">seleccionadas</span>
                        </h2>
                    </div>
                    <button onClick={() => navigate('/propiedades')} className="btn-secondary">Ver todas <ArrowRight size={13} /></button>
                </div>
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROPERTIES.map(p => <PropertyCard key={p.id} prop={p} />)}
                </div>
                <div className="md:hidden">
                    <HorizontalSwiper>
                        {PROPERTIES.map(p => <PropertyCard key={p.id} prop={p} />)}
                    </HorizontalSwiper>
                    <p className="text-center text-[0.72rem] text-textSecondary mt-4 font-body tracking-wide">Deslizá para ver más →</p>
                </div>
            </section>

            {/* ════ EXPERIENCIA & PROFESIONALISMO ═══════════════════════════ */}
            <section className="py-28 px-[8%] bg-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{ background: 'radial-gradient(circle at 70% 30%, #1460AA, transparent 60%)' }}
                />
                <div className="relative z-10 max-w-[1200px] mx-auto">
                    <div className="max-w-[720px] mb-16" data-aos="fade-up">
                        <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-secondary mb-3">Desde 1998</p>
                        <h2 className="font-body font-black text-primary leading-tight" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}>
                            Más de dos décadas construyendo<span className="text-metallic"> confianza</span>
                        </h2>
                        <p className="mt-5 text-textSecondary text-[0.95rem] leading-[1.9] max-w-[520px]">
                            Cada cliente y cada operación son únicos. Te brindamos experiencia real, procesos claros y acompañamiento cercano para avanzar con seguridad en cada paso.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <div className="flex flex-col gap-6">
                            <div data-aos="fade-up" data-aos-delay="100" className="border border-neutral-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 bg-white">
                                <h3 className="font-body text-[1rem] text-primary font-bold mb-2">Trayectoria comprobada</h3>
                                <p className="text-textSecondary text-[0.9rem] leading-[1.8]">Desde 1998 acompañando operaciones inmobiliarias, con conocimiento real de cada zona y sus oportunidades.</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="200" className="border border-neutral-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 bg-white">
                                <h3 className="font-body text-[1rem] text-primary font-bold mb-2">Asesoramiento personalizado</h3>
                                <p className="text-textSecondary text-[0.9rem] leading-[1.8]">Cada cliente y cada operación son únicos. Por eso diseñamos estrategias según cada necesidad y objetivo.</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="300" className="border border-neutral-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 bg-white">
                                <h3 className="font-body text-[1rem] text-primary font-bold mb-2">Transparencia en cada paso</h3>
                                <p className="text-textSecondary text-[0.9rem] leading-[1.8]">Información clara, procesos ordenados y seguimiento constante para avanzar con tranquilidad.</p>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-delay="200" className="relative">
                            <div className="rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
                                <img src="https://imgur.com/rHEibg0.jpg" alt="Profesional inmobiliaria" className="w-full h-[420px] object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-xl shadow-xl border border-neutral-200" data-aos="fade-up" data-aos-delay="400">
                                <p className="font-body text-[1.4rem] font-black text-primary leading-none">+25 años</p>
                                <p className="text-[0.75rem] text-textSecondary">de experiencia en el mercado</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex justify-center" data-aos="fade-up" data-aos-delay="200">
                        <button onClick={() => navigate('/contacto')} className="btn-primary">
                            Hablar con un profesional <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ════ SEGUINOS EN INSTAGRAM ══════════════════════════ */}
            <PremiumInstagramSection />

            {/* ════ CTA BANNER ══════════════════════════════════════ */}
            <section data-aos="zoom-in" className="mx-[4%] my-20 rounded-[2.5rem] px-[6%] py-16 lg:py-20 flex items-center justify-between gap-10 flex-wrap relative overflow-hidden shadow-2xl">
                {/* Background image & gradient overlay */}
                <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,16,28,0.96) 0%, rgba(18,100,95,0.88) 100%)' }} />
                <div className="absolute inset-0" style={{ backdropFilter: 'blur(6px)' }} />

                {/* Decorative radial gradients */}
                <div className="absolute right-0 top-0 w-[500px] h-full opacity-40 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.12), transparent 60%)' }} />
                <div className="absolute left-[-10%] bottom-[-20%] w-[400px] h-[400px] opacity-30 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at center, rgba(18,100,95,0.6), transparent 70%)' }} />

                {/* Subtle grid texture */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                <div className="relative z-10 max-w-[650px]">
                    <div className="inline-flex items-center gap-3 mb-5">
                        <span className="w-8 h-[1px] bg-white/60"></span>
                        <p className="font-body text-[0.68rem] font-bold tracking-[0.25em] uppercase text-white/80">Servicio de tasación</p>
                    </div>
                    <h2 className="font-body font-black text-white leading-[1.1] mb-5" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)' }}>
                        ¿Querés saber cuánto vale<br />tu <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #ffffff, rgba(255,255,255,0.5))' }}>propiedad</span>?
                    </h2>
                    <p className="text-white/70 text-[1rem] font-light leading-relaxed max-w-[500px]">
                        Análisis profesional basado en el mercado actual. <br className="hidden sm:block" />Sin compromiso y con resultados en 48 horas hábiles.
                    </p>
                </div>

                <div className="relative z-10">
                    <button
                        onClick={() => navigate('/tasacion')}
                        className="group flex items-center justify-center gap-3 px-9 py-[1.1rem] rounded-full font-body font-bold text-[0.75rem] tracking-[0.15em] uppercase transition-all duration-300"
                        style={{
                            background: '#ffffff',
                            color: '#12645F',
                            boxShadow: '0 10px 32px rgba(8,16,28,0.4)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-3px)'
                            e.currentTarget.style.boxShadow = '0 16px 40px rgba(8,16,28,0.5)'
                            e.currentTarget.style.background = '#f8fafa'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 10px 32px rgba(8,16,28,0.4)'
                            e.currentTarget.style.background = '#ffffff'
                        }}
                    >
                        Solicitar tasación <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                </div>
            </section>

        </div>
    )
}