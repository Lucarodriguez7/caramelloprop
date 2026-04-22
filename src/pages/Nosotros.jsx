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
        desc: 'Cada operación se gestiona con claridad, información precisa y sin sorpresas.',
        num: '01',
    },
    {
        Icon: Award,
        title: 'Profesionalismo',
        desc: 'Respaldo marticulado, criterio legal y experiencia real en cada gestión.',
        num: '02',
    },
    {
        Icon: Users,
        title: 'Compromiso',
        desc: 'Cada propiedad merece dedicación, seguimiento, y atención personalizada.',
        num: '03',
    },
    {
        Icon: Star,
        title: 'Trayectoria',
        desc: 'Más de 25 años de experiencia y confianza en el mercado inmobiliario de Mar del Plata.',
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
    { year: '1998', text: 'Aldo Pedro Caramello inicia la actividad inmobiliaria en Güemes, con el Estudio Inmobiliario ubicado en Güemes casi Roca.' },
    { year: '2001', text: 'Con el acompañamiento constante de la familia y el valioso aporte de su esposa, la firma crece y se consolida como Caramello Propiedades en Güemes 3231.' },
    { year: '2008', text: 'Nueva etapa para la firma: traslado a la oficina de Alvarado 1218 e incorporación de Mariana Caramello como profesional matriculada, impulsando crecimiento y renovación.' },
    { year: '2019', text: 'Traslado a la actual oficina de calle Sarmiento, un espacio pensado para brindar mayor comodidad, calidez, confianza y atención personalizada.' },
    { year: 'Hoy', text: 'Atención personalizada por compromiso con cada cliente.' },
]

/* ── Componente principal ──────────────────────────────── */
export default function Nosotros() {
    const navigate = useNavigate()

    /* refs para animaciones */
    const headerRef = useRef(null)

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
        const ctx = gsap.context(() => {
            /* ── HEADER ── */
            if (headerRef.current) {
                gsap.set(headerRef.current, { opacity: 1 })
                gsap.fromTo(headerRef.current.querySelector('h1'),
                    { opacity: 0, scale: 0.9, y: 30 },
                    { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: 'power4.out', delay: 1.0 })
                gsap.fromTo(headerRef.current.querySelectorAll('.header-line'),
                    { width: 0, opacity: 0 },
                    { width: '4rem', opacity: 1, duration: 1.5, ease: 'power3.out', delay: 1.4, stagger: 0.2 })
            }

            /* ── STORY ── */
            if (storyImgRef.current) {
                gsap.fromTo(storyImgRef.current,
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1, x: 0, duration: 1,
                        scrollTrigger: { trigger: storyRef.current, start: 'top 80%', toggleActions: 'play none none none' }
                    })
            }
            if (storyContentRef.current) {
                gsap.fromTo(storyContentRef.current.querySelectorAll('.story-anim'),
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
                        scrollTrigger: { trigger: storyRef.current, start: 'top 75%', toggleActions: 'play none none none' }
                    })
            }

            /* ── VALUES ── */
            const filteredValues = valueCardsRef.current.filter(Boolean)
            if (filteredValues.length && valuesRef.current) {
                filteredValues.forEach((el, i) => {
                    gsap.fromTo(el,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1, y: 0, duration: 0.7, delay: i * 0.1,
                            scrollTrigger: { trigger: valuesRef.current, start: 'top 78%', toggleActions: 'play none none none' }
                        })
                })
            }

            /* ── TIMELINE ── */
            const filteredTimeline = timelineItemsRef.current.filter(Boolean)
            if (filteredTimeline.length && timelineRef.current) {
                filteredTimeline.forEach((el, i) => {
                    gsap.fromTo(el,
                        { opacity: 0, x: -30 },
                        {
                            opacity: 1, x: 0, duration: 0.65, delay: i * 0.12,
                            scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', toggleActions: 'play none none none' }
                        })
                })
            }

            /* ── SERVICES ── */
            const filteredServices = serviceItemsRef.current.filter(Boolean)
            if (filteredServices.length && servicesRef.current) {
                filteredServices.forEach((el, i) => {
                    gsap.fromTo(el,
                        { opacity: 0, x: 20 },
                        {
                            opacity: 1, x: 0, duration: 0.5, delay: i * 0.07,
                            scrollTrigger: { trigger: servicesRef.current, start: 'top 80%', toggleActions: 'play none none none' }
                        })
                })
            }

            /* ── CTA BANNER ── */
            if (ctaBannerRef.current) {
                gsap.fromTo(ctaBannerRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0, duration: 0.9,
                        scrollTrigger: { trigger: ctaBannerRef.current, start: 'top 85%', toggleActions: 'play none none none' }
                    })
            }
        }) // End Context

        return () => ctx.revert()
    }, [])

    return (
        <div className="bg-white overflow-clip">

            {/* ═══════════════════════════════════════════
                HEADER SECUNDARIO
            ═══════════════════════════════════════════ */}
            <div ref={headerRef} className="pt-[160px] pb-[80px] bg-gradient-to-b from-secondaryLight/80 to-white flex flex-col justify-center items-center opacity-0 border-b border-secondaryLight/60 overflow-hidden relative">
                {/* Decoración de fondo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[80px] rounded-full -z-10" />

                <div className="flex items-center gap-4 mb-3">
                    <span className="header-line w-16 h-[2px] block" style={{ background: 'linear-gradient(90deg, transparent, #12645F)' }}></span>
                    <h1 className="font-display text-primary uppercase" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '0.05em' }}>
                        Quiénes Somos
                    </h1>
                    <span className="header-line w-16 h-[2px] block" style={{ background: 'linear-gradient(270deg, transparent, #12645F)' }}></span>
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                PROFILE — Mariana Caramello Avatar
            ═══════════════════════════════════════════ */}
            <section ref={storyRef} className="py-20 md:py-28 px-[8%] bg-white flex justify-center">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-14 md:gap-20">

                    {/* Avatar Image */}
                    <div ref={storyImgRef} className="relative opacity-0 shrink-0">
                        <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden border-[8px] border-white bg-secondaryLight/20 z-10 flex items-center justify-center"
                            style={{ boxShadow: '0 30px 60px -15px rgba(18,100,95,0.4), inset 0 10px 30px rgba(18,100,95,0.08)' }}>
                            <img
                                src="https://imgur.com/jKwGLvd.jpg"
                                alt="Mariana Caramello - Corredora Pública"
                                className="w-[85%] h-[85%] object-cover rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                                style={{
                                    boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.1)'
                                }}
                            />
                        </div>
                        {/* Decorative background elements */}
                        <div className="absolute -inset-6 rounded-full border border-secondaryLight -z-10" />
                        <div className="absolute top-2 -right-6 w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center -z-10">
                            <div className="w-8 h-8 rounded-full bg-primary/10" />
                        </div>
                        <div className="absolute bottom-8 -left-8 w-20 h-20 rounded-full bg-secondaryLight/50 -z-10" />

                        {/* Registration Badge */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border border-secondaryLight z-20 flex items-center gap-2 whitespace-nowrap">
                            <Briefcase size={15} className="text-primary" />
                            <span className="text-[0.65rem] font-bold text-textPrimary tracking-[0.1em] uppercase">Reg. 3288</span>
                        </div>
                    </div>

                    {/* Content & CTA */}
                    <div ref={storyContentRef} className="text-center md:text-left flex-1 max-w-[500px]">
                        <div className="story-anim opacity-0 inline-flex items-center justify-center md:justify-start gap-3 mb-5 mx-auto md:mx-0 w-full md:w-auto">
                            <span className="block w-6 h-[1px] bg-primary" />
                            <span className="text-[0.65rem] font-body font-bold tracking-[0.25em] uppercase text-secondary">
                                Atención personalizada
                            </span>
                        </div>

                        <h2
                            className="story-anim opacity-0 font-display text-textPrimary mb-6"
                            style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '0.02em' }}
                        >

                            <span className="text-primary">MARIANA CARAMELLO</span>
                        </h2>

                        <p className="story-anim opacity-0 text-textSecondary leading-relaxed mb-8" style={{ fontSize: '1rem' }}>
                            Detrás de cada propiedad hay una historia, una familia y un gran proyecto de vida. Mi objetivo
                            como profesional matriculada es escucharte, comprender lo que buscás y acompañar tus decisiones con absoluta
                            transparencia, calidez y dedicación constante.
                        </p>

                        <div className="story-anim opacity-0 flex justify-center md:justify-start">
                            <button
                                onClick={() => window.open('https://wa.me/5492234487206', '_blank')}
                                className="group flex items-center justify-center gap-3 px-8 py-[1.1rem] rounded-full font-body font-bold text-[0.75rem] tracking-[0.15em] uppercase text-white transition-all duration-300"
                                style={{
                                    background: '#12645F',
                                    boxShadow: '0 8px 24px rgba(18,100,95,0.25)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-3px)'
                                    e.currentTarget.style.boxShadow = '0 14px 32px rgba(18,100,95,0.35)'
                                    e.currentTarget.style.background = '#0A4441'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(18,100,95,0.25)'
                                    e.currentTarget.style.background = '#12645F'
                                }}
                            >
                                Comunicate conmigo <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
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
                            Soluciones concretas para cada etapa del proceso inmobiliario,
                            desde la búsqueda inicial hasta la firma final, con gestión ágil y atención dedicada.
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
                                src="https://imgur.com/rHEibg0.jpg"
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
                        Consultá sin compromiso. Te acompañamos
                        desde el primer contacto hasta la firma final.
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
