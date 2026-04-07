import { useNavigate } from 'react-router-dom'
import CountUpStats from '../components/CountUpStats'
import { ArrowRight, Star, Home as HomeIcon, Key, BarChart2, Building2, Trees, FileText, MapPin, ChevronRight, Search, Shield, TrendingUp, Phone, Users, ArrowUpRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import gsap from "gsap";


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

const PROPERTIES = [
    { id: 1, type: 'Casa', zone: 'Playa Grande', title: 'Residencia frente al mar con vista panorámica', address: 'Av. Constitución 2450', beds: 4, baths: 3, sqm: 420, price: 'USD 580.000', tag: 'Venta', featured: true, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80' },
    { id: 2, type: 'Departamento', zone: 'Centro', title: 'Moderno departamento a metros del mar', address: 'Bvd. Marítimo 1180, 8°', beds: 2, baths: 1, sqm: 68, price: 'USD 145.000', tag: 'Venta', featured: false, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80' },
    { id: 3, type: 'Local', zone: 'Güemes', title: 'Local en esquina en zona comercial premium', address: 'Güemes 3450 esq. Castelli', beds: null, baths: null, sqm: 180, price: '$980.000/mes', tag: 'Alquiler', featured: true, img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80' },
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
        detail: 'Informe detallado · Benchmarking · Sin cargo',
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

const INSTAGRAM_POSTS = [
    {
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
        likes: '234',
        caption: 'Nueva propiedad exclusiva en Playa Grande 🌊',
    },
    {
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
        likes: '187',
        caption: 'Departamento con vista al mar disponible ✨',
    },
    {
        img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80',
        likes: '312',
        caption: 'Tasación gratuita — consultá sin compromiso 📊',
    },
    {
        img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
        likes: '156',
        caption: 'Casa en Los Troncos, tranquilidad garantizada 🌿',
    },
    {
        img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80',
        likes: '278',
        caption: 'El barrio Güemes crece y nosotros también 🚀',
    },
    {
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        likes: '421',
        caption: 'Tu próximo hogar te está esperando 🏡',
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
                <span className={`absolute top-3 left-3 text-[0.6rem] font-display font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full ${prop.tag === 'Venta' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                    {prop.tag}
                </span>
                {prop.featured && (
                    <span className="absolute top-3 right-3 bg-white/95 text-textPrimary text-[0.6rem] font-display font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Star size={9} fill="#00FBFA" stroke="#00FBFA" /> Destacado
                    </span>
                )}
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[0.65rem] font-display font-bold tracking-widest uppercase text-primary">{prop.type}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[0.65rem] font-display font-medium tracking-wide text-textSecondary">{prop.zone}</span>
                </div>
                <h3 className="font-display font-bold text-primary text-[0.95rem] leading-snug mb-2">{prop.title}</h3>
                <div className="flex items-center gap-1.5 text-[0.79rem] text-textSecondary mb-4">
                    <MapPin size={11} className="shrink-0" />{prop.address}
                </div>
                <div className="flex gap-4 py-3 border-t border-b border-secondaryLight mb-4 text-[0.79rem] text-textSecondary">
                    {prop.beds && <span>{prop.beds} dorm.</span>}
                    {prop.baths && <span>{prop.baths} baños</span>}
                    <span>{prop.sqm} m²</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="font-display font-black text-textPrimary text-[1.18rem]">{prop.price}</div>
                    <span className="text-primary font-display font-bold text-[0.68rem] tracking-widest uppercase flex items-center gap-1 group-hover:gap-2.5 transition-all duration-200">
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
                <span className="text-[0.55rem] font-display font-black tracking-[0.18em] uppercase bg-primary text-white px-3 py-1.5 rounded-full">
                    {zone.tag}
                </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-metallic text-[0.65rem] font-display font-bold tracking-[0.2em] uppercase mb-1.5">{zone.tagline}</p>
                <h3 className="font-display font-black text-white text-[1.5rem] leading-tight mb-3">{zone.name}</h3>
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
                    <span className="text-white/50 text-[0.73rem] font-display">{zone.count}</span>
                    <span
                        className="flex items-center gap-1.5 text-primary font-display font-bold text-[0.7rem] tracking-[0.12em] uppercase"
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
                <span className="text-[0.5rem] font-display font-black tracking-[0.18em] uppercase bg-primary text-white px-2.5 py-1.5 rounded-full">{zone.tag}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-metallic text-[0.6rem] font-display font-bold tracking-[0.18em] uppercase mb-1">{zone.tagline}</p>
                <h3 className="font-display font-black text-white text-[1.2rem] leading-tight mb-2">{zone.name}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-white/50 text-[0.7rem] font-display">{zone.count}</span>
                    <span className="flex items-center gap-1 text-primary font-display font-bold text-[0.65rem] tracking-widest uppercase">Ver <ArrowRight size={11} /></span>
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
                        className="font-display font-black text-[2rem] leading-none select-none"
                        style={{
                            color: hovered ? 'rgba(0,251,250,0.25)' : 'rgba(18,39,58,0.06)',
                            transition: 'color 0.4s ease',
                        }}
                    >
                        {num}
                    </span>
                </div>
                <h3 className="font-display font-bold text-primary text-[0.95rem] mb-2">{title}</h3>
                <p className="text-[0.83rem] text-textSecondary leading-[1.7] mb-5">{desc}</p>
                <div
                    style={{
                        maxHeight: hovered ? '40px' : '0px',
                        opacity: hovered ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.35s ease, opacity 0.3s ease',
                    }}
                >
                    <p className="text-[0.72rem] font-display font-medium tracking-wide text-primary uppercase">{detail}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-4 text-[0.72rem] font-display font-bold tracking-widest uppercase text-textPrimary/30 group-hover:text-primary transition-colors duration-300">
                    <span>Saber más</span>
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
            </div>
        </div>
    )
}

/* ── Instagram Post Card ────────────────────────────────────── */
function InstagramCard({ post }) {
    const [hovered, setHovered] = useState(false)
    return (
        <a
            href="https://instagram.com/Caramellopropiedades3288"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative rounded-2xl overflow-hidden block"
            style={{
                aspectRatio: '1/1',
                boxShadow: hovered ? '0 12px_40px rgba(18,39,58,0.18)' : '0 2px_12px rgba(18,39,58,0.07)',
                transition: 'box-shadow 0.35s, transform 0.35s',
                transform: hovered ? 'scale(1.02)' : 'none',
            }}
        >
            <img
                src={post.img}
                alt={post.caption}
                className="w-full h-full object-cover"
                style={{
                    transform: hovered ? 'scale(1.07)' : 'scale(1)',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
            />
            <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                style={{
                    background: 'rgba(12,26,45,0.72)',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                }}
            >
                <Instagram size={26} className="text-white" />
                <span className="text-white font-display font-bold text-[0.78rem] tracking-wider">Ver en Instagram</span>
                <span className="text-white/60 text-[0.72rem] flex items-center gap-1">
                    <Star size={10} fill="white" stroke="none" /> {post.likes}
                </span>
            </div>
            <div
                className="absolute bottom-0 left-0 right-0 px-3 py-2.5"
                style={{
                    background: 'linear-gradient(to top, rgba(12,26,45,0.75), transparent)',
                    opacity: hovered ? 0 : 1,
                    transition: 'opacity 0.3s',
                }}
            >
                <p className="text-white text-[0.68rem] leading-snug line-clamp-2">{post.caption}</p>
            </div>
        </a>
    )
}

/* ══════════════════════════════════════════════════════════════
   HERO SECTION — Rediseñado
══════════════════════════════════════════════════════════════ */
function HeroSection({ navigate }) {
    const sectionRef = useRef(null)
    const bgDesktopRef = useRef(null)
    const bgMobileRef = useRef(null)
    const overlayRef = useRef(null)
    const lineRef = useRef(null)
    const eyebrowRef = useRef(null)
    const titleLine1Ref = useRef(null)
    const titleLine2Ref = useRef(null)
    const titleLine3Ref = useRef(null)
    const bodyRef = useRef(null)
    const ctaRef = useRef(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        // Zoom-out suave del fondo
        tl.fromTo(
            [bgDesktopRef.current, bgMobileRef.current],
            { scale: 1.12 },
            { scale: 1.04, duration: 2.2, ease: 'power3.out' },
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

        // Título — cada línea en cascada con clip-path
        tl.fromTo(
            [titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current],
            { opacity: 0, y: 42 },
            {
                opacity: 1, y: 0,
                duration: 0.85,
                stagger: 0.13,
            },
            0.7
        )

        // Body
        tl.fromTo(
            bodyRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.75 },
            1.15
        )

        // CTAs
        tl.fromTo(
            ctaRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7 },
            1.35
        )

        // Indicador scroll
        tl.fromTo(
            scrollRef.current,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.6 },
            1.7
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
                delay: 2,
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
                <div className="absolute inset-0 bg-[#0b1622]/55 md:bg-transparent" />

                {/* Desktop — degradado lateral principal */}
                <div
                    className="absolute inset-0 hidden md:block"
                    style={{
                        background:
                            'linear-gradient(105deg, rgba(10,20,34,0.93) 0%, rgba(10,20,34,0.74) 38%, rgba(10,20,34,0.28) 65%, transparent 100%)',
                    }}
                />

                {/* Degradado inferior — zona de stats */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[48%]"
                    style={{
                        background:
                            'linear-gradient(to top, rgba(8,16,28,0.90) 0%, rgba(8,16,28,0.52) 50%, transparent 100%)',
                    }}
                />

                {/* Toque cálido — vignette amber en esquina inferior derecha */}
                <div
                    className="absolute bottom-0 right-0 w-[55%] h-[55%] hidden md:block"
                    style={{
                        background:
                            'radial-gradient(ellipse at bottom right, rgba(180,120,40,0.10) 0%, transparent 70%)',
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
                        'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.12) 20%, rgba(0,251,250,0.28) 50%, rgba(255,255,255,0.08) 80%, transparent 100%)',
                }}
            />

            {/* ════════════════════════════════════════════
                CONTENIDO PRINCIPAL
            ════════════════════════════════════════════ */}
            <div className="relative z-10 flex flex-col flex-1 px-[8%]">

                <div className="flex-1 flex items-center">
                    <div className="w-full max-w-[640px] pt-16 md:pt-24 pb-32 md:pb-48">

                        {/* Eyebrow */}
                        <div
                            ref={eyebrowRef}
                            className="inline-flex items-center gap-2.5 mb-7 opacity-0"
                        >
                            <span
                                className="block w-6 h-[1px]"
                                style={{ background: 'rgba(0,251,250,0.7)' }}
                            />
                            <span
                                className="font-display text-[0.58rem] tracking-[0.32em] uppercase"
                                style={{ color: 'rgba(0,251,250,0.85)' }}
                            >
                                Mar del Plata · Desde 1998
                            </span>
                        </div>

                        {/* Título en 3 líneas con animación escalonada */}
                        <h1
                            className="font-sans font-black text-white leading-[1.05] tracking-[-0.02em] mb-8"
                            style={{ fontSize: 'clamp(2.7rem, 5.4vw, 4.4rem)' }}
                        >
                            {/* Línea 1 — texto sólido */}
                            <span
                                ref={titleLine1Ref}
                                className="block opacity-0"
                            >
                                Tu próxima
                            </span>

                            {/* Línea 2 — outline / stroke: comunica distinción sin frialdad */}
                            <span
                                ref={titleLine2Ref}
                                className="block opacity-0 select-none"
                                style={{
                                    WebkitTextStroke: '1.8px rgba(255,255,255,0.88)',
                                    color: 'transparent',
                                    fontStyle: 'italic',
                                    letterSpacing: '-0.03em',
                                }}
                            >
                                propiedad
                            </span>

                            {/* Línea 3 — text fill normal */}
                            <span
                                ref={titleLine3Ref}
                                className="block opacity-0"
                            >
                                empieza acá.
                            </span>
                        </h1>

                        {/* Separador cyan */}
                        <div
                            className="w-12 h-[2px] mb-7 rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, #00FBFA, rgba(0,251,250,0.15))',
                            }}
                        />

                        {/* Descripción */}
                        <p
                            ref={bodyRef}
                            className="text-[1rem] leading-[1.95] mb-10 max-w-[460px] opacity-0"
                            style={{ color: 'rgba(255,255,255,0.76)' }}
                        >
                            Más de dos décadas acompañando cada etapa: compra,
                            venta y alquiler en Mar del Plata con criterio,
                            calidez y total transparencia.
                        </p>

                        {/* CTAs */}
                        <div
                            ref={ctaRef}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0"
                        >
                            {/* CTA principal — adaptado al branding general */}
                            <button
                                onClick={() => navigate('/contacto')}
                                className="group flex items-center justify-center gap-2.5 px-8 py-[1.05rem] rounded-full font-display font-bold text-[0.72rem] tracking-[0.18em] uppercase transition-all duration-300"
                                style={{
                                    background: '#12645F',
                                    color: '#FFFFFF',
                                    boxShadow: '0 8px 32px rgba(18, 100, 95, 0.26)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-2px)'
                                    e.currentTarget.style.boxShadow = '0 14px 40px rgba(18, 100, 95, 0.38)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(18, 100, 95, 0.26)'
                                }}
                            >
                                Hablar con un asesor
                                <ArrowRight
                                    size={14}
                                    className="group-hover:translate-x-1 transition-transform duration-200"
                                />
                            </button>

                            {/* CTA secundario — glass */}
                            <button
                                onClick={() => navigate('/propiedades')}
                                className="group flex items-center justify-center gap-2.5 px-8 py-[1.05rem] rounded-full font-display font-bold text-[0.72rem] tracking-[0.18em] uppercase text-white transition-all duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.22)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
                                }}
                            >
                                Ver propiedades
                                <ArrowRight
                                    size={14}
                                    className="opacity-55 group-hover:translate-x-1 transition-transform duration-200"
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
                            background: 'linear-gradient(to bottom, #00FBFA, rgba(0,251,250,0))',
                        }}
                    />
                </div>
                <span
                    className="font-display text-[0.5rem] tracking-[0.28em] uppercase"
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
                            <img src="/about-main.png" className="w-full h-full object-cover" alt="Propiedad destacada" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>
                        <div className="absolute -top-10 -right-4 lg:-right-10 w-[45%] aspect-square rounded-[1.5rem] overflow-hidden shadow-[0_20px_40px_rgba(18,39,58,0.15)] border-[6px] border-white">
                            <img src="/about-sub.png" className="w-full h-full object-cover" alt="Detalle propiedad" />
                        </div>
                    </div>
                </div>

                {/* Right Column (Content) */}
                <div className="lg:w-[52%]">
                    <p className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-secondary mb-3">
                        Trayectoria y confianza
                    </p>
                    <h2 className="font-display font-black text-primary leading-tight mb-6"
                        style={{ fontSize: 'clamp(2rem,3.2vw,2.6rem)' }}>
                        Acompañando decisiones
                        <br />
                        <span className="text-metallic">importantes en cada proceso</span>
                    </h2>
                    <p className="text-[0.95rem] text-textSecondary leading-[1.9] mb-14 max-w-[520px]">
                        Entendemos que cada operación inmobiliaria implica mucho más que una propiedad.
                        Por eso trabajamos con un enfoque cercano, profesional y transparente, acompañando
                        cada etapa del proceso con criterio y experiencia real en el mercado.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 mb-14">
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-secondaryLight flex items-center justify-center mb-4">
                                <Search size={17} className="text-secondary" />
                            </div>
                            <h4 className="font-display font-bold text-primary mb-2 text-[0.95rem]">Búsqueda precisa</h4>
                            <p className="text-textSecondary text-[0.82rem] leading-[1.8]">Selección cuidada de oportunidades según cada necesidad.</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-secondaryLight flex items-center justify-center mb-4">
                                <BarChart2 size={17} className="text-secondary" />
                            </div>
                            <h4 className="font-display font-bold text-primary mb-2 text-[0.95rem]">Tasación profesional</h4>
                            <p className="text-textSecondary text-[0.82rem] leading-[1.8]">Análisis basado en datos reales del mercado local.</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-secondaryLight flex items-center justify-center mb-4">
                                <Shield size={17} className="text-secondary" />
                            </div>
                            <h4 className="font-display font-bold text-primary mb-2 text-[0.95rem]">Seguridad jurídica</h4>
                            <p className="text-textSecondary text-[0.82rem] leading-[1.8]">Procesos claros y respaldo en cada operación.</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-secondaryLight flex items-center justify-center mb-4">
                                <TrendingUp size={17} className="text-secondary" />
                            </div>
                            <h4 className="font-display font-bold text-primary mb-2 text-[0.95rem]">Visión estratégica</h4>
                            <p className="text-textSecondary text-[0.82rem] leading-[1.8]">Enfoque en decisiones sostenibles y bien fundamentadas.</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                        <button
                            onClick={() => navigate('/contacto')}
                            className="bg-textPrimary text-white px-8 py-4 rounded-full font-display font-bold text-[0.75rem] uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-textPrimary/20">
                            Hablar con un asesor <ArrowUpRight size={15} />
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full border border-secondaryLight flex items-center justify-center">
                                <Phone size={17} className="text-secondary" />
                            </div>
                            <div>
                                <p className="text-[0.65rem] font-bold text-secondary uppercase tracking-widest mb-1">Contacto directo</p>
                                <p className="font-display font-bold text-[0.95rem] text-primary">+54 9 223 448-7206</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════ SECCIÓN CATEGORÍAS ════════════════════════ */}
            <section data-aos="fade-up" className="py-20 px-[8%] bg-white">
                <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
                    <div>
                        <p className="font-display text-[0.63rem] font-bold tracking-[0.25em] uppercase text-secondary mb-2">¿Qué estás buscando?</p>
                        <h2 className="font-display font-black text-primary leading-tight" style={{ fontSize: 'clamp(1.7rem,3vw,2.5rem)' }}>
                            Encontrá el espacio <span className="text-metallic">ideal.</span>
                        </h2>
                        <p className="mt-2 text-[0.9rem] text-textSecondary max-w-[400px] leading-relaxed">
                            Desde el hogar de tus sueños hasta el próximo paso para tu negocio.
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
                    <p className="text-center text-[0.72rem] text-textSecondary mt-4 font-display tracking-wide">Deslizá para explorar categorías →</p>
                </div>
            </section>

            {/* ════ PROPIEDADES DESTACADAS ══════════════════════════ */}
            <section data-aos="fade-up" className="py-20 px-[8%] bg-secondaryLight">
                <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
                    <div>
                        <p className="font-display text-[0.63rem] font-bold tracking-[0.25em] uppercase text-secondary mb-2">Destacadas</p>
                        <h2 className="font-display font-black text-primary leading-tight" style={{ fontSize: 'clamp(1.7rem,3vw,2.5rem)' }}>
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
                    <p className="text-center text-[0.72rem] text-textSecondary mt-4 font-display tracking-wide">Deslizá para ver más →</p>
                </div>
            </section>

            {/* ════ EXPERIENCIA & PROFESIONALISMO ═══════════════════════════ */}
            <section className="py-28 px-[8%] bg-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{ background: 'radial-gradient(circle at 70% 30%, #1460AA, transparent 60%)' }}
                />
                <div className="relative z-10 max-w-[1200px] mx-auto">
                    <div className="max-w-[720px] mb-16" data-aos="fade-up">
                        <p className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-secondary mb-3">Desde 1998</p>
                        <h2 className="font-display font-black text-primary leading-tight" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}>
                            Más de dos décadas construyendo<span className="text-metallic"> confianza</span>
                        </h2>
                        <p className="mt-5 text-textSecondary text-[0.95rem] leading-[1.9] max-w-[520px]">
                            Cada operación es única. Por eso, acompañamos de manera personalizada, con criterio profesional, experiencia en el mercado y un enfoque humano que prioriza decisiones seguras.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <div className="flex flex-col gap-6">
                            <div data-aos="fade-up" data-aos-delay="100" className="border border-neutral-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 bg-white">
                                <h3 className="font-display text-[1rem] text-primary font-bold mb-2">Trayectoria comprobada</h3>
                                <p className="text-textSecondary text-[0.9rem] leading-[1.8]">Desde 1998 operando en el mercado inmobiliario, con un conocimiento profundo de cada zona y sus oportunidades reales.</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="200" className="border border-neutral-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 bg-white">
                                <h3 className="font-display text-[1rem] text-primary font-bold mb-2">Asesoramiento personalizado</h3>
                                <p className="text-textSecondary text-[0.9rem] leading-[1.8]">No trabajamos con soluciones genéricas. Cada cliente recibe una estrategia pensada según su situación y objetivos.</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="300" className="border border-neutral-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 bg-white">
                                <h3 className="font-display text-[1rem] text-primary font-bold mb-2">Transparencia en cada paso</h3>
                                <p className="text-textSecondary text-[0.9rem] leading-[1.8]">Información clara, procesos ordenados y acompañamiento constante para tomar decisiones con seguridad.</p>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-delay="200" className="relative">
                            <div className="rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
                                <img src="https://imgur.com/A2QclK2.jpg" alt="Profesional inmobiliaria" className="w-full h-[420px] object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-xl shadow-xl border border-neutral-200" data-aos="fade-up" data-aos-delay="400">
                                <p className="font-display text-[1.4rem] font-black text-primary leading-none">+25 años</p>
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
            <section data-aos="fade-up" className="py-20 px-[8%] bg-secondaryLight">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                            <Instagram size={16} className="text-white" />
                        </div>
                        <span className="font-display text-[0.63rem] font-bold tracking-[0.25em] uppercase text-textSecondary">@Caramellopropiedades3288</span>
                    </div>
                    <h2 className="font-display font-black text-primary leading-tight mb-3" style={{ fontSize: 'clamp(1.7rem,3vw,2.5rem)' }}>
                        Seguinos en <span className="text-metallic">Instagram</span>
                    </h2>
                    <p className="text-[0.93rem] text-textSecondary max-w-[380px] mx-auto leading-[1.8]">
                        Novedades, propiedades exclusivas y tips del mercado inmobiliario directo en tu feed.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
                    {INSTAGRAM_POSTS.map((post, i) => <InstagramCard key={i} post={post} />)}
                </div>
                <div className="flex justify-center">
                    <a
                        href="https://instagram.com/Caramellopropiedades3288"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gradient bg-gradient-brand text-white shadow-lg shadow-secondary/30"
                        style={{
                            background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                            boxShadow: '0 6px 24px rgba(220,39,67,0.28)',
                        }}
                    >
                        <Instagram size={16} />
                        Seguir en Instagram
                    </a>
                </div>
            </section>

            {/* ════ CTA BANNER ══════════════════════════════════════ */}
            <section data-aos="zoom-in" className="mx-[4%] my-16 rounded-3xl px-[6%] py-16 flex items-center justify-between gap-8 flex-wrap relative overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundImage: "url('https://i.imgur.com/ZJd2QMZ.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="absolute inset-0 bg-textPrimary/85" />
                <div className="absolute right-0 top-0 w-[400px] h-full opacity-20 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 80% 50%, #00FBFA, transparent 60%)' }} />
                <div className="relative z-10">
                    <p className="font-display text-[0.62rem] font-bold tracking-[0.2em] uppercase text-secondary mb-3">Tasaciones gratuitas</p>
                    <h2 className="font-display font-black text-white leading-tight mb-2" style={{ fontSize: 'clamp(1.5rem,2.5vw,2.1rem)' }}>
                        ¿Querés saber cuánto vale<br />tu <span className="text-primary">propiedad</span>?
                    </h2>
                    <p className="text-white/70 text-[0.93rem]">Sin compromiso. Resultados en 48 horas hábiles.</p>
                </div>
                <button onClick={() => navigate('/contacto')} className="relative z-10 btn-primary cursor-pointer">
                    Solicitar tasación gratuita <ArrowRight size={14} />
                </button>
            </section>

        </div>
    )
}