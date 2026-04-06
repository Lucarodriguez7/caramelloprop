import { useNavigate } from 'react-router-dom'
import CountUpStats from '../components/CountUpStats'
import { ArrowRight, Star, Home as HomeIcon, Key, BarChart2, Building2, Trees, FileText, MapPin, ChevronRight, Search, Shield, TrendingUp, Phone, Users, ArrowUpRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

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
        img: 'https://images.unsplash.com/photo-1555529771-755830009df4?w=900&q=85',
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
            {/* Background image */}
            <img
                src={zone.img}
                alt={zone.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    transform: hovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
            />

            {/* Gradient overlay — bottom heavy */}
            <div
                className="absolute inset-0"
                style={{
                    background: hovered
                        ? 'linear-gradient(to top, rgba(12,26,45,0.97) 0%, rgba(12,26,45,0.55) 55%, rgba(12,26,45,0.15) 100%)'
                        : 'linear-gradient(to top, rgba(12,26,45,0.88) 0%, rgba(12,26,45,0.30) 55%, rgba(12,26,45,0.0) 100%)',
                    transition: 'background 0.4s ease',
                }}
            />

            {/* Tag */}
            <div className="absolute top-4 left-4">
                <span className="text-[0.55rem] font-display font-black tracking-[0.18em] uppercase bg-primary text-white px-3 py-1.5 rounded-full">
                    {zone.tag}
                </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-primary text-[0.65rem] font-display font-bold tracking-[0.2em] uppercase mb-1.5">{zone.tagline}</p>
                <h3 className="font-display font-black text-white text-[1.5rem] leading-tight mb-3">{zone.name}</h3>

                {/* Description — slides in on hover */}
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

            {/* Cyan border glow on hover */}
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
                <p className="text-primary text-[0.6rem] font-display font-bold tracking-[0.18em] uppercase mb-1">{zone.tagline}</p>
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
            {/* Accent line top */}
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
                {/* Number + Icon row */}
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

                {/* Detail chips */}
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

                {/* CTA arrow */}
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
            {/* Hover overlay */}
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

            {/* Instagram gradient on bottom — always visible */}
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

/* ── Main Home ──────────────────────────────────────────────── */
export default function Home() {
    const navigate = useNavigate()

    const handleZoneClick = (filterValue) => {
        // filterValue recibirá 'departamento', 'casa', etc., desde la constante CATEGORIES
        navigate(`/propiedades?tipo=${filterValue}`);
    };

    return (
        <div className="bg-white">

            {/* ════ HERO ════════════════════════════════════════════ */}
            <section className="min-h-[calc(100vh-70px)] grid grid-cols-1 lg:grid-cols-2">
                <div className="relative flex flex-col justify-center px-[8%] py-24 lg:py-0 bg-white">
                    <div
                        className="absolute inset-0 bg-cover bg-center lg:hidden"
                        style={{ backgroundImage: 'url(https://imgur.com/9eiqGps.jpg)' }}
                    />
                    <div className="absolute inset-0 bg-textPrimary/72 lg:hidden" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-primary/20 lg:bg-primary/10 rounded-full px-4 py-1.5 mb-7 w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="font-display text-[0.6rem] font-bold tracking-[0.2em] uppercase text-primary lg:text-secondary">
                                Mar del Plata · Argentina
                            </span>
                        </div>
                        <h1
                            className="font-display font-black text-white lg:text-primary leading-[1.08] mb-5"
                            style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.9rem)' }}
                        >
                            La llave para<br />
                            la <span className="text-primary">felicidad</span><br />
                            empieza acá.
                        </h1>
                        <p className="text-white/75 lg:text-textSecondary text-[0.93rem] leading-[1.8] mb-8 max-w-[380px]">
                            Encontrá tu propiedad ideal con el respaldo de nuestra trayectoria desde 1998 en compra, venta y alquiler en Mar del Plata.
                        </p>
                        <div className="flex gap-3 flex-wrap mb-10">
                            <button
                                onClick={() => navigate('/propiedades')}
                                className="btn-primary cursor-pointer"
                            >
                                Ver propiedades <ArrowRight size={14} />
                            </button>
                            <button
                                onClick={() => navigate('/contacto')}
                                className="btn-secondary"
                            >
                                Tasar mi propiedad
                            </button>
                        </div>
                        <div className="border-t border-white/20 lg:border-secondaryLight pt-0">
                            <CountUpStats stats={STATS.slice(0, 3)} mobile={true} />
                        </div>
                    </div>
                </div>
                <div className="relative hidden lg:block">
                    <img
                        src="https://imgur.com/cPQNYoz.jpg"
                        alt="Caramello Propiedades"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent" />
                </div>
            </section>

            {/* ════ BIENVENIDO / ABOUT US SECTION ════════════════════════ */}
            <section data-aos="fade-up" className="py-24 px-[8%] bg-white flex flex-col lg:flex-row gap-16 lg:gap-24 items-center overflow-hidden">
                {/* Left Column (Images) */}
                <div className="lg:w-[48%] relative w-full flex justify-center mt-8 lg:mt-0">
                    <div className="relative w-[90%] md:w-[85%] lg:w-full">
                        {/* Main Background Image */}
                        <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative shadow-[0_20px_50px_rgba(18,39,58,0.15)]">
                            <img src="/about-main.png" className="w-full h-full object-cover" alt="Property view" />
                            <div className="absolute inset-0 bg-gradient-to-t from-textPrimary/40 to-transparent"></div>
                        </div>

                        {/* Small Overlapping Image */}
                        <div className="absolute -top-10 -right-4 lg:-right-10 w-[45%] aspect-square rounded-[1.5rem] overflow-hidden shadow-[0_24px_50px_rgba(18,39,58,0.2)] border-[8px] border-white">
                            <img src="/about-sub.png" className="w-full h-full object-cover" alt="Detail view" />
                        </div>

                        {/* Satisfaction Bubble */}
                        <div className="absolute -bottom-8 -left-4 lg:-left-10 bg-textPrimary text-white rounded-[2rem] px-7 py-4 flex items-center justify-center gap-5 shadow-[0_20px_40px_rgba(18,39,58,0.25)] border-[4px] border-white">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-textPrimary/50 text-white/70 relative z-10">
                                        <Users size={14} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="font-display font-black text-[1.2rem] leading-none mb-0.5">+800</p>
                                <p className="text-[0.6rem] text-white/50 uppercase tracking-widest font-bold">Clientes satisfechos</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Content) */}
                <div className="lg:w-[52%]">
                    <h2 className="font-display font-black text-primary leading-tight mb-5" style={{ fontSize: 'clamp(2rem,3.2vw,2.8rem)' }}>
                        Bienvenido a tu próxima<br />
                        <span className="font-serif italic font-normal text-textSecondary" style={{ fontFamily: 'Georgia, serif' }}>inversión en Mar del Plata.</span>
                    </h2>
                    <p className="text-[0.92rem] text-textSecondary leading-[1.8] mb-12 max-w-[90%]">
                        Nos especializamos en propiedades de alto valor con foco en inversión. Cada oportunidad que ofrecemos viene con análisis de rentabilidad, proyección de revalorización y acompañamiento integral.
                    </p>

                    {/* Grid Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mb-12">
                        {/* Feature 1 */}
                        <div>
                            <div className="w-11 h-11 rounded-xl bg-secondaryLight flex items-center justify-center mb-4">
                                <Search size={18} className="text-secondary" />
                            </div>
                            <h4 className="font-display font-bold text-primary mb-2 text-[0.95rem]">Búsqueda a medida</h4>
                            <p className="text-textSecondary text-[0.8rem] leading-[1.7]">
                                Analizamos tu perfil y te acercamos opciones que se ajustan a lo que buscás.
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div>
                            <div className="w-11 h-11 rounded-xl bg-secondaryLight flex items-center justify-center mb-4">
                                <BarChart2 size={18} className="text-secondary" />
                            </div>
                            <h4 className="font-display font-bold text-primary mb-2 text-[0.95rem]">Tasación gratuita</h4>
                            <p className="text-textSecondary text-[0.8rem] leading-[1.7]">
                                Valuación profesional basada en datos reales del mercado local.
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div>
                            <div className="w-11 h-11 rounded-xl bg-secondaryLight flex items-center justify-center mb-4">
                                <Shield size={18} className="text-secondary" />
                            </div>
                            <h4 className="font-display font-bold text-primary mb-2 text-[0.95rem]">Respaldo legal</h4>
                            <p className="text-textSecondary text-[0.8rem] leading-[1.7]">
                                Documentación verificada y acompañamiento jurídico en cada operación.
                            </p>
                        </div>
                        {/* Feature 4 */}
                        <div>
                            <div className="w-11 h-11 rounded-xl bg-secondaryLight flex items-center justify-center mb-4">
                                <TrendingUp size={18} className="text-secondary" />
                            </div>
                            <h4 className="font-display font-bold text-primary mb-2 text-[0.95rem]">Inversión inteligente</h4>
                            <p className="text-textSecondary text-[0.8rem] leading-[1.7]">
                                Te asesoramos sobre ROI, renta proyectada y revalorización.
                            </p>
                        </div>
                    </div>

                    {/* Action Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-2">
                        <button onClick={() => navigate('/propiedades')} className="bg-textPrimary text-white px-8 py-4 rounded-full font-display font-bold text-[0.75rem] uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-textPrimary/20">
                            Explorar Propiedades <ArrowUpRight size={15} />
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-secondaryLight flex items-center justify-center">
                                <Phone size={18} className="text-secondary" />
                            </div>
                            <div>
                                <p className="text-[0.65rem] font-bold text-secondary uppercase tracking-widest mb-1">Llamanos</p>
                                <p className="font-display font-bold text-[0.95rem] text-primary">+54 9 223 448-7206</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════ SECCIÓN CATEGORÍAS CORREGIDA ════════════════════════ */}
            <section data-aos="fade-up" className="py-20 px-[8%] bg-white">
                <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
                    <div>
                        <p className="font-display text-[0.63rem] font-bold tracking-[0.25em] uppercase text-secondary mb-2">
                            ¿Qué estás buscando?
                        </p>
                        <h2 className="font-display font-black text-primary leading-tight" style={{ fontSize: 'clamp(1.7rem,3vw,2.5rem)' }}>
                            Encontrá el espacio <span className="text-metallic">ideal.</span>
                        </h2>
                        <p className="mt-2 text-[0.9rem] text-textSecondary max-w-[400px] leading-relaxed">
                            Desde el hogar de tus sueños hasta el próximo paso para tu negocio.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/propiedades')}
                        className="btn-secondary"
                    >
                        Ver todo el catálogo <ArrowRight size={13} />
                    </button>
                </div>

                {/* Desktop grid — Usamos ZoneCard que es el que ya tenés definido */}
                <div className="hidden lg:grid grid-cols-4 gap-4">
                    {CATEGORIES.map(item => (
                        <ZoneCard
                            key={item.id}
                            zone={item}
                            onClick={() => handleZoneClick(item.filter)}
                        />
                    ))}
                </div>

                {/* Mobile swiper — Usamos ZoneSwiperCard */}
                <div className="lg:hidden">
                    <HorizontalSwiper>
                        {CATEGORIES.map(item => (
                            <ZoneSwiperCard
                                key={item.id}
                                zone={item}
                                onClick={() => handleZoneClick(item.filter)}
                            />
                        ))}
                    </HorizontalSwiper>
                    <p className="text-center text-[0.72rem] text-textSecondary mt-4 font-display tracking-wide">
                        Deslizá para explorar categorías →
                    </p>
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
                    <button
                        onClick={() => navigate('/propiedades')}
                        className="btn-secondary"
                    >
                        Ver todas <ArrowRight size={13} />
                    </button>
                </div>

                {/* Desktop grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROPERTIES.map(p => <PropertyCard key={p.id} prop={p} />)}
                </div>

                {/* Mobile swiper */}
                <div className="md:hidden">
                    <HorizontalSwiper>
                        {PROPERTIES.map(p => (
                            <PropertyCard key={p.id} prop={p} />
                        ))}
                    </HorizontalSwiper>
                    <p className="text-center text-[0.72rem] text-textSecondary mt-4 font-display tracking-wide">
                        Deslizá para ver más →
                    </p>
                </div>
            </section>

            {/* ════ SERVICIOS — PREMIUM ════════════════════════════ */}
            <section data-aos="fade-up" className="py-24 px-[8%] bg-white relative overflow-hidden">
                {/* Background decorative element */}
                <div
                    className="absolute right-0 top-0 w-[600px] h-[600px] pointer-events-none opacity-30"
                    style={{ background: 'radial-gradient(circle at 80% 20%, rgba(0,251,250,0.12), transparent 60%)' }}
                />
                <div
                    className="absolute left-0 bottom-0 w-[500px] h-[500px] pointer-events-none opacity-20"
                    style={{ background: 'radial-gradient(circle at 20% 80%, rgba(20,96,170,0.12), transparent 60%)' }}
                />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
                        <div>
                            <p className="font-display text-[0.63rem] font-bold tracking-[0.25em] uppercase text-secondary mb-2">Lo que hacemos</p>
                            <h2 className="font-display font-black text-primary leading-tight" style={{ fontSize: 'clamp(1.7rem,3vw,2.5rem)' }}>
                                Un equipo completo<br />para <span className="text-metallic">cada operación</span>
                            </h2>
                        </div>
                        <p className="text-[0.93rem] text-textSecondary leading-[1.8] max-w-[340px] lg:text-right">
                            Desde la tasación hasta la escritura, te acompañamos en cada paso con profesionalismo y transparencia.
                        </p>
                    </div>

                    {/* Stats banner */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                        {STATS.map(({ value, label }) => (
                            <div
                                key={label}
                                className="bg-secondaryLight rounded-2xl px-6 py-5 border border-secondaryLight"
                            >
                                <div className="font-display font-black text-textPrimary text-[1.8rem] leading-none mb-1">{value}</div>
                                <div className="text-[0.78rem] text-textSecondary font-display">{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Service grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {SERVICES.map(s => (
                            <ServiceCard key={s.title} {...s} />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => navigate('/contacto')}
                            className="btn-primary"
                        >
                            Consultar con un asesor <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ════ SEGUINOS EN INSTAGRAM ══════════════════════════ */}
            <section data-aos="fade-up" className="py-20 px-[8%] bg-secondaryLight">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                            }}
                        >
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

                {/* Post grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
                    {INSTAGRAM_POSTS.map((post, i) => (
                        <InstagramCard key={i} post={post} />
                    ))}
                </div>

                {/* Follow button */}
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

                {/* Background Image */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('https://i.imgur.com/ZJd2QMZ.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />

                {/* Dark Overlay (clave para look premium) */}
                <div className="absolute inset-0 bg-textPrimary/85" />

                {/* Glow Effect */}
                <div
                    className="absolute right-0 top-0 w-[400px] h-full opacity-20 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 80% 50%, #00FBFA, transparent 60%)' }}
                />

                {/* Content */}
                <div className="relative z-10">
                    <p className="font-display text-[0.62rem] font-bold tracking-[0.2em] uppercase text-secondary mb-3">
                        Tasaciones gratuitas
                    </p>

                    <h2
                        className="font-display font-black text-white leading-tight mb-2"
                        style={{ fontSize: 'clamp(1.5rem,2.5vw,2.1rem)' }}
                    >
                        ¿Querés saber cuánto vale<br />
                        tu <span className="text-primary">propiedad</span>?
                    </h2>

                    <p className="text-white/70 text-[0.93rem]">
                        Sin compromiso. Resultados en 48 horas hábiles.
                    </p>
                </div>

                {/* Button */}
                <button
                    onClick={() => navigate('/contacto')}
                    className="relative z-10 btn-primary cursor-pointer"
                >
                    Solicitar tasación gratuita <ArrowRight size={14} />
                </button>
            </section>
        </div>
    )
}