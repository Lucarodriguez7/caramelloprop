import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    Award, Star, Shield, Users, Phone, ArrowRight,
    Briefcase, CheckCircle, MapPin
} from 'lucide-react'

const Instagram = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
)

gsap.registerPlugin(ScrollTrigger)

/* ── Datos ─────────────────────────────────────────────── */
const VALUES = [
    {
        Icon: Shield,
        title: 'Transparencia',
        desc: 'Cada operación se gestiona con absoluta claridad. Sin letra chica, sin sorpresas.',
        num: '01',
    },
    {
        Icon: Award,
        title: 'Profesionalismo',
        desc: 'Martillera y corredora pública matriculada. Respaldo legal y ético en cada transacción.',
        num: '02',
    },
    {
        Icon: Users,
        title: 'Compromiso',
        desc: 'Tu propiedad es única. La tratamos con la misma dedicación que si fuera nuestra.',
        num: '03',
    },
    {
        Icon: Star,
        title: 'Excelencia',
        desc: 'Más de 25 años de experiencia en el mercado inmobiliario de Mar del Plata.',
        num: '04',
    },
]

const SERVICES = [
    { label: 'Compraventa de propiedades' },
    { label: 'Alquileres residenciales y comerciales' },
    { label: 'Tasaciones profesionales' },
    { label: 'Subasta y remate público' },
    { label: 'Asesoramiento legal integral' },
    { label: 'Countries y barrios privados' },
    { label: 'Propiedades comerciales' },
    { label: 'Gestión documental completa' },
]

const TIMELINE = [
    { year: '1998', text: 'Inicio de actividad como martillera pública en Mar del Plata.' },
    { year: '2005', text: 'Incorporación de la unidad de alquileres y administración.' },
    { year: '2012', text: 'Expansión al segmento de propiedades comerciales y countries.' },
    { year: '2020', text: 'Digitalización total del servicio con plataforma online.' },
    { year: 'Hoy', text: 'Consolidación plena en el mercado marplatense, con presencia activa en todos los segmentos inmobiliarios.' },
]

/* ── Componente principal ──────────────────────────────── */
export default function Nosotros() {
    const navigate = useNavigate()

    /* refs para animaciones */
    const heroRef = useRef(null)
    const heroBgRef = useRef(null)
    const heroOverlayRef = useRef(null)
    const heroTextRef = useRef(null)
    const heroBadgeRef = useRef(null)
    const heroCtaRef = useRef(null)

    const storyRef = useRef(null)
    const storyImgRef = useRef(null)
    const storyContentRef = useRef(null)

    const valuesRef = useRef(null)
    const valueCardsRef = useRef([])

    const timelineRef = useRef(null)
    const timelineItemsRef = useRef([])

    const servicesRef = useRef(null)
    const serviceItemsRef = useRef([])

    const ctaBannerRef = useRef(null)

    useEffect(() => {
        /* ── HERO ── */
        const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        heroTl
            .fromTo(heroBgRef.current,
                { scale: 1.12 },
                { scale: 1.03, duration: 2.6, ease: 'power3.out' }, 0)
            .fromTo(heroOverlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.2 }, 0)
            .fromTo(heroBadgeRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7 }, 0.6)
            .fromTo(heroTextRef.current.querySelectorAll('.hero-anim'),
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, 0.75)
            .fromTo(heroCtaRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7 }, 1.4)

        /* ── STORY ── */
        gsap.fromTo(storyImgRef.current,
            { opacity: 0, x: -50 },
            {
                opacity: 1, x: 0, duration: 1,
                scrollTrigger: { trigger: storyRef.current, start: 'top 80%' }
            })
        gsap.fromTo(storyContentRef.current.querySelectorAll('.story-anim'),
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
                scrollTrigger: { trigger: storyRef.current, start: 'top 75%' }
            })

        /* ── VALUES ── */
        valueCardsRef.current.forEach((el, i) => {
            if (!el) return
            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.7, delay: i * 0.1,
                    scrollTrigger: { trigger: valuesRef.current, start: 'top 78%' }
                })
        })

        /* ── TIMELINE ── */
        timelineItemsRef.current.forEach((el, i) => {
            if (!el) return
            gsap.fromTo(el,
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, duration: 0.65, delay: i * 0.12,
                    scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' }
                })
        })

        /* ── SERVICES ── */
        serviceItemsRef.current.forEach((el, i) => {
            if (!el) return
            gsap.fromTo(el,
                { opacity: 0, x: 20 },
                {
                    opacity: 1, x: 0, duration: 0.5, delay: i * 0.07,
                    scrollTrigger: { trigger: servicesRef.current, start: 'top 80%' }
                })
        })

        /* ── CTA BANNER ── */
        gsap.fromTo(ctaBannerRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 0.9,
                scrollTrigger: { trigger: ctaBannerRef.current, start: 'top 85%' }
            })

        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    return (
        <div className="bg-white overflow-x-hidden">

            {/* ═══════════════════════════════════════════
                HERO
            ═══════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative flex items-center overflow-hidden"
                style={{ minHeight: 'calc(100vh - 70px)' }}
            >
                {/* Fondo */}
                <div
                    ref={heroBgRef}
                    className="absolute inset-0 bg-cover bg-center will-change-transform"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1560185127-6a6a3b73f1b9?w=2000&q=80)',
                        backgroundPosition: '55% center',
                    }}
                />

                {/* Overlay */}
                <div ref={heroOverlayRef} className="absolute inset-0 opacity-0">
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(112deg, rgba(8,16,28,0.95) 0%, rgba(8,16,28,0.75) 40%, rgba(8,16,28,0.30) 70%, transparent 100%)',
                        }}
                    />
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[45%]"
                        style={{
                            background: 'linear-gradient(to top, rgba(8,16,28,0.9) 0%, transparent 100%)',
                        }}
                    />
                </div>

                {/* Línea decorativa */}
                <div
                    className="absolute top-0 bottom-0 hidden md:block"
                    style={{
                        left: 'calc(8% - 1px)',
                        width: '1px',
                        background: 'linear-gradient(to bottom, transparent, rgba(18,100,95,0.4) 50%, transparent)',
                    }}
                />

                {/* Contenido */}
                <div className="relative z-10 px-[8%] py-28 md:py-40 w-full">
                    {/* Badge */}
                    <div
                        ref={heroBadgeRef}
                        className="inline-flex items-center gap-2 mb-8 opacity-0"
                        style={{
                            background: 'rgba(18,100,95,0.15)',
                            border: '1px solid rgba(18,100,95,0.35)',
                            borderRadius: '9999px',
                            padding: '6px 16px',
                        }}
                    >
                        <span className="block w-1.5 h-1.5 rounded-full bg-[#12645F]" />
                        <span className="text-[0.6rem] font-body font-bold tracking-[0.22em] uppercase text-[#12645F]">
                            Martillera · Corredora Pública · Independiente
                        </span>
                    </div>

                    <div ref={heroTextRef} className="max-w-[640px]">
                        <h1 className="hero-anim mb-4 opacity-0">
                            <span
                                className="block font-display text-white"
                                style={{
                                    fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                                    lineHeight: 1.12,
                                    letterSpacing: '0.04em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Mariana
                            </span>
                            <span
                                className="block font-display mt-1"
                                style={{
                                    fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                                    lineHeight: 1.12,
                                    letterSpacing: '0.04em',
                                    textTransform: 'uppercase',
                                    WebkitTextStroke: '1.5px rgba(255,255,255,0.7)',
                                    color: 'transparent',
                                }}
                            >
                                Caramello
                            </span>
                        </h1>

                        <div
                            className="hero-anim w-16 h-[2px] mb-6 rounded-full opacity-0"
                            style={{ background: 'linear-gradient(90deg, #12645F, rgba(18,100,95,0.1))' }}
                        />

                        <p
                            className="hero-anim font-body font-light text-white/65 max-w-[460px] opacity-0"
                            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.85 }}
                        >
                            Más de 25 años acompañando operaciones inmobiliarias en Mar del Plata con
                            confianza, ética profesional y resultados concretos.
                        </p>
                    </div>

                    <div ref={heroCtaRef} className="flex flex-col sm:flex-row gap-3 mt-10 opacity-0">
                        <button
                            onClick={() => navigate('/propiedades')}
                            className="group flex items-center justify-center gap-2.5 px-9 py-[1.1rem] rounded-full font-body font-semibold text-[0.75rem] tracking-[0.14em] uppercase text-white transition-all duration-300"
                            style={{ background: '#12645F', boxShadow: '0 8px 32px rgba(18,100,95,0.28)' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#0A4441'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#12645F'; e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            Ver propiedades <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                        <button
                            onClick={() => navigate('/contacto')}
                            className="group flex items-center justify-center gap-2.5 px-9 py-[1.1rem] rounded-full font-body font-semibold text-[0.75rem] tracking-[0.14em] uppercase text-white transition-all duration-300"
                            style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                        >
                            Contactar <ArrowRight size={14} className="opacity-50 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                    </div>
                </div>

                {/* Stats flotantes */}
                <div className="absolute bottom-10 right-[8%] hidden lg:flex gap-8">
                    <div className="text-right">
                        <div className="font-display text-white text-[1.5rem] leading-none">Desde 1998</div>
                        <div className="text-[0.6rem] font-body tracking-[0.18em] uppercase text-white/40 mt-1">En el mercado</div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                STORY — Quién es Mariana
            ═══════════════════════════════════════════ */}
            <section ref={storyRef} className="py-24 md:py-32 px-[8%] bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                    {/* Imagen */}
                    <div ref={storyImgRef} className="relative opacity-0">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-[440px]">
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                                alt="Caramello Propiedades - Mar del Plata"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay brand */}
                            <div
                                className="absolute inset-0"
                                style={{ background: 'linear-gradient(to top, rgba(18,100,95,0.5) 0%, transparent 60%)' }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="inline-flex items-center gap-2 bg-white/95 rounded-full px-4 py-2 shadow-lg">
                                    <Briefcase size={14} className="text-primary" />
                                    <span className="text-[0.7rem] font-body font-bold text-textPrimary tracking-wide uppercase">
                                        Martillera · Reg. 3288
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Decoración */}
                        <div
                            className="absolute -top-6 -left-6 w-40 h-40 rounded-2xl -z-10"
                            style={{ background: 'rgba(18,100,95,0.08)' }}
                        />
                        <div
                            className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full -z-10"
                            style={{ background: 'rgba(18,100,95,0.06)' }}
                        />
                    </div>

                    {/* Texto */}
                    <div ref={storyContentRef}>
                        <div className="story-anim opacity-0 inline-flex items-center gap-3 mb-6">
                            <span className="block w-8 h-[1px] bg-primary" />
                            <span className="text-[0.6rem] font-body font-bold tracking-[0.25em] uppercase text-secondary">
                                Nuestra historia
                            </span>
                        </div>

                        <h2
                            className="story-anim opacity-0 font-display text-textPrimary mb-6"
                            style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)', lineHeight: 1.2, letterSpacing: '0.03em' }}
                        >
                            IMPULSADA POR<br />
                            <span className="text-primary">LA CONFIANZA</span>
                        </h2>

                        <p className="story-anim opacity-0 text-textSecondary leading-relaxed mb-5" style={{ fontSize: '1rem' }}>
                            Mariana Caramello es martillera y corredora pública matriculada, con más de
                            25 años de trayectoria en el mercado inmobiliario de Mar del Plata.
                            Trabaja de manera <strong className="text-textPrimary font-semibold">independiente</strong>, lo
                            que le permite dedicar atención personalizada y exclusiva a cada cliente.
                        </p>

                        <p className="story-anim opacity-0 text-textSecondary leading-relaxed mb-8" style={{ fontSize: '1rem' }}>
                            Su enfoque combina el rigor legal de la corredura pública con la calidez
                            humana que cada operación merece. Desde viviendas familiares hasta
                            subasta y remate público, Mariana ofrece una gestión completa, transparente
                            y orientada al mejor resultado para sus clientes.
                        </p>

                        <div className="story-anim opacity-0 flex flex-col gap-3">
                            {[
                                'Martillera Pública matriculada',
                                'Corredora Inmobiliaria matriculada',
                                'Operadora independiente — sin franquicias',
                                'Mar del Plata · Desde 1998',
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle size={16} className="text-primary shrink-0" />
                                    <span className="text-[0.9rem] text-textSecondary">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                VALORES
            ═══════════════════════════════════════════ */}
            <section
                ref={valuesRef}
                className="py-24 md:py-32 px-[8%]"
                style={{ background: '#F9FAFB' }}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-5">
                            <span className="block w-8 h-[1px] bg-primary" />
                            <span className="text-[0.6rem] font-body font-bold tracking-[0.25em] uppercase text-secondary">
                                Nuestros valores
                            </span>
                            <span className="block w-8 h-[1px] bg-primary" />
                        </div>
                        <h2
                            className="font-display text-textPrimary"
                            style={{ fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', letterSpacing: '0.04em' }}
                        >
                            LO QUE NOS <span className="text-primary">DEFINE</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map((v, i) => (
                            <div
                                key={i}
                                ref={el => valueCardsRef.current[i] = el}
                                className="group relative bg-white rounded-2xl p-7 border border-secondaryLight cursor-default opacity-0 transition-all duration-300 hover:-translate-y-1"
                                style={{ boxShadow: '0 2px 20px rgba(18,39,58,0.05)' }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 48px rgba(18,39,58,0.12)'}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 20px rgba(18,39,58,0.05)'}
                            >
                                {/* Top bar animado */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                                    style={{ background: 'linear-gradient(90deg, #12645F, rgba(18,100,95,0.1))' }}
                                />
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <v.Icon size={20} />
                                    </div>
                                    <span className="font-display text-[2rem] leading-none text-textPrimary/5 group-hover:text-primary/15 transition-colors duration-300">
                                        {v.num}
                                    </span>
                                </div>
                                <h3 className="font-body font-bold text-primary text-[0.95rem] mb-2">{v.title}</h3>
                                <p className="text-[0.83rem] text-textSecondary leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                TIMELINE — Trayectoria
            ═══════════════════════════════════════════ */}
            <section ref={timelineRef} className="py-24 md:py-32 px-[8%] bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-5">
                            <span className="block w-8 h-[1px] bg-primary" />
                            <span className="text-[0.6rem] font-body font-bold tracking-[0.25em] uppercase text-secondary">
                                Trayectoria
                            </span>
                            <span className="block w-8 h-[1px] bg-primary" />
                        </div>
                        <h2
                            className="font-display text-textPrimary"
                            style={{ fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', letterSpacing: '0.04em' }}
                        >
                            MÁS DE 25 AÑOS<br />
                            <span className="text-primary">EN EL MERCADO</span>
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Línea vertical */}
                        <div
                            className="absolute left-[72px] top-0 bottom-0 w-[1px] hidden sm:block"
                            style={{ background: 'linear-gradient(to bottom, transparent, rgba(18,100,95,0.3) 15%, rgba(18,100,95,0.3) 85%, transparent)' }}
                        />

                        <div className="flex flex-col gap-8">
                            {TIMELINE.map((item, i) => (
                                <div
                                    key={i}
                                    ref={el => timelineItemsRef.current[i] = el}
                                    className="flex gap-8 items-start opacity-0"
                                >
                                    {/* Año */}
                                    <div className="shrink-0 w-[72px] text-right hidden sm:block">
                                        <span className="font-display text-primary text-[0.85rem] tracking-wider">
                                            {item.year}
                                        </span>
                                    </div>
                                    {/* Dot */}
                                    <div className="shrink-0 hidden sm:flex items-center justify-center w-6">
                                        <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/15" />
                                    </div>
                                    {/* Contenido */}
                                    <div
                                        className="flex-1 bg-white rounded-xl p-5 border border-secondaryLight"
                                        style={{ boxShadow: '0 2px 16px rgba(18,39,58,0.05)' }}
                                    >
                                        <div className="sm:hidden text-[0.75rem] font-display text-primary mb-1">{item.year}</div>
                                        <p className="text-textSecondary text-[0.9rem] leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                SERVICIOS
            ═══════════════════════════════════════════ */}
            <section
                ref={servicesRef}
                className="py-24 md:py-32 px-[8%]"
                style={{ background: '#F9FAFB' }}
            >
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-3 mb-5">
                            <span className="block w-8 h-[1px] bg-primary" />
                            <span className="text-[0.6rem] font-body font-bold tracking-[0.25em] uppercase text-secondary">
                                Servicios
                            </span>
                        </div>
                        <h2
                            className="font-display text-textPrimary mb-6"
                            style={{ fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', letterSpacing: '0.04em' }}
                        >
                            TODO LO QUE<br />
                            <span className="text-primary">NECESITÁS</span>
                        </h2>
                        <p className="text-textSecondary leading-relaxed mb-10" style={{ fontSize: '1rem' }}>
                            Ofrezco un servicio integral que cubre todas las etapas del proceso
                            inmobiliario, con respaldo legal y asesoría personalizada en cada paso.
                        </p>

                        <div className="flex flex-col gap-3">
                            {SERVICES.map((s, i) => (
                                <div
                                    key={i}
                                    ref={el => serviceItemsRef.current[i] = el}
                                    className="flex items-center gap-3 opacity-0"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <CheckCircle size={13} className="text-primary" />
                                    </div>
                                    <span className="text-[0.9rem] text-textSecondary">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                                alt="Servicios inmobiliarios Caramello Propiedades"
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: 'linear-gradient(135deg, rgba(18,100,95,0.4) 0%, transparent 60%)' }}
                            />
                        </div>
                        {/* Badge sobre imagen */}
                        <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-5 shadow-xl border border-secondaryLight">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <Award size={20} className="text-primary" />
                                </div>
                                <div>
                                    <div className="font-display text-textPrimary text-[1.1rem]">+25 años</div>
                                    <div className="text-[0.7rem] text-textSecondary tracking-wide uppercase">de experiencia</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                CTA BANNER FINAL
            ═══════════════════════════════════════════ */}
            <section
                ref={ctaBannerRef}
                className="py-24 md:py-32 px-[8%] relative overflow-hidden opacity-0"
            >
                {/* Fondo */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, #0A3330 0%, #12645F 50%, #1A8A84 100%)',
                    }}
                />
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                        backgroundSize: '38px 38px',
                    }}
                />
                {/* Círculo decorativo */}
                <div
                    className="absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
                />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <span className="text-[0.6rem] font-body font-bold tracking-[0.3em] uppercase text-white/50 block mb-5">
                        Caramello Propiedades · Mar del Plata
                    </span>
                    <h2
                        className="font-display text-white mb-6"
                        style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.04em', lineHeight: 1.2 }}
                    >
                        ¿LISTO PARA DAR<br />EL PRÓXIMO PASO?
                    </h2>
                    <p className="text-white/65 text-[1rem] leading-relaxed mb-10 max-w-[440px] mx-auto">
                        Consultá sin compromiso. Te acompañamos desde la primera visita
                        hasta la firma de la escritura.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/contacto')}
                            className="flex items-center justify-center gap-2.5 px-9 py-[1.05rem] rounded-full font-body font-semibold text-[0.75rem] tracking-[0.14em] uppercase bg-white text-primary transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5"
                            style={{ boxShadow: '0 8px 28px rgba(0,0,0,0.2)' }}
                        >
                            Contactar ahora <ArrowRight size={14} />
                        </button>
                        <button
                            onClick={() => navigate('/propiedades')}
                            className="flex items-center justify-center gap-2.5 px-9 py-[1.05rem] rounded-full font-body font-semibold text-[0.75rem] tracking-[0.14em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
                            style={{
                                border: '1px solid rgba(255,255,255,0.3)',
                                background: 'rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(8px)',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                        >
                            Ver propiedades <ArrowRight size={14} />
                        </button>
                    </div>

                    {/* Info de contacto */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 pt-12 border-t border-white/15">
                        <a
                            href="https://wa.me/5492234487206"
                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 text-[0.83rem]"
                        >
                            <Phone size={14} /> +54 9 223 448-7206
                        </a>
                        <a
                            href="https://instagram.com/Caramellopropiedades3288"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 text-[0.83rem]"
                        >
                            <Instagram size={14} /> @caramellopropiedades3288
                        </a>
                        <div className="flex items-center gap-2 text-white/60 text-[0.83rem]">
                            <MapPin size={14} /> Mar del Plata, Buenos Aires
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
