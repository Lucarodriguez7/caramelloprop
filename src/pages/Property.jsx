import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ArrowLeft, Star, MapPin, Bed, Bath, Maximize2, Car,
    Heart, Share2, ChevronLeft, ChevronRight, X, ZoomIn,
    Phone, MessageCircle, Mail, Send, CheckCircle2,
    Home, Building2, Store, Calendar, Layers,
    Shield, Wifi, Dumbbell, Trees, Flame, Camera,
    ArrowRight, Copy, Check, ExternalLink
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
const AMENITY_ICONS = {
    'Pileta climatizada': Layers,
    'Pileta': Layers,
    'Jardín': Trees,
    'Jardín profesional': Trees,
    'Jardín amplio': Trees,
    'Quincho': Flame,
    'Quincho con parrilla': Flame,
    'Seguridad 24h': Shield,
    'Domótica': Wifi,
    'Doble altura': Building2,
    'Balcón vista al mar': MapPin,
    'Cochera': Car,
    'Baulera': Home,
    'Gimnasio': Dumbbell,
    'Gym privado': Dumbbell,
    'SUM': Home,
    'Portería': Shield,
    'Vidrieras dobles': Store,
    'Planta libre': Layers,
    'Home cinema': Camera,
    'Domótica Lutron': Wifi,
    'Jardín paisajístico': Trees,
    'Jacuzzi exterior': Layers,
    'Terraza 60m²': MapPin,
    'Parrilla propia': Flame,
    'Terraza': MapPin,
    'Chimenea': Flame,
    'Garage': Car,
    'Vigilancia': Shield,
    'Vestidor': Home,
}

function formatPrice(price, currency) {
    if (currency === 'USD') return `USD ${price.toLocaleString('es-AR')}`
    return `$${price.toLocaleString('es-AR')}/mes`
}

/* ─── SIMILAR CARD (mini) ────────────────────────────────────── */
function SimilarCard({ prop }) {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => navigate(`/propiedades/${prop.id}`)}
            className="group bg-white rounded-2xl overflow-hidden cursor-pointer border border-secondaryLight flex flex-col"
            style={{ boxShadow: '0 2px 16px rgba(18,39,58,0.07)', transition: 'box-shadow 0.3s, transform 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(18,39,58,0.14)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(18,39,58,0.07)'; e.currentTarget.style.transform = 'none' }}
        >
            <div className="relative h-[160px] overflow-hidden">
                <img src={prop.imgs[0]} alt={prop.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className={`absolute top-2.5 left-2.5 text-[0.55rem] font-body font-black tracking-[0.14em] uppercase px-2.5 py-1.5 rounded-full ${prop.operation === 'Venta' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                    {prop.operation}
                </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[0.58rem] font-body font-bold tracking-widest uppercase text-primary">{prop.type}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                    <span className="text-[0.58rem] font-body text-textSecondary">{prop.zone}</span>
                </div>
                <h4 className="font-body font-bold text-textPrimary text-[0.82rem] leading-snug mb-2 line-clamp-2 flex-1 group-hover:text-secondary transition-colors">{prop.title}</h4>
                <div className="flex items-center justify-between mt-2">
                    <span className="font-body font-black text-textPrimary text-[0.95rem]">{formatPrice(prop.price, prop.currency)}</span>
                    <span className="flex items-center gap-1 text-primary text-[0.62rem] font-body font-bold uppercase group-hover:gap-2 transition-all">
                        Ver <ArrowRight size={10} />
                    </span>
                </div>
            </div>
        </div>
    )
}

/* ─── CONTACT SIDEBAR ────────────────────────────────────────── */
function ContactSidebar({ property }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState(`Hola, me interesa la propiedad "${property.title}" (ID #${property.id}). ¿Podrían darme más información?`)
    const [sent, setSent] = useState(false)

    const waMsg = encodeURIComponent(`Hola! Me interesa la propiedad: *${property.title}*\nDirección: ${property.address}\nPrecio: ${formatPrice(property.price, property.currency)}\n\n¿Podrían darme más información?`)
    const waLink = `https://wa.me/5492234487206?text=${waMsg}`

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email) return
        setSent(true)
    }

    return (
        <div className="space-y-4">
            {/* Whatsapp card */}
            <div className="bg-textPrimary rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-40 h-40 opacity-10 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 80% 20%, #12645F, transparent 60%)' }} />
                <div className="relative z-10">
                    <p className="text-white/50 text-[0.65rem] font-body font-bold tracking-[0.18em] uppercase mb-1">Martillera y corredora pública</p>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="font-body font-black text-primary text-[0.85rem]">FP</span>
                        </div>
                        <div>
                            <p className="font-body font-bold text-white text-[0.88rem]">Mariana Caramello</p>
                            <p className="text-white/45 text-[0.72rem] font-body">Asesor principal</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 text-[0.65rem] font-body font-bold">En línea</span>
                        </div>
                    </div>

                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-body font-bold text-[0.8rem] tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                        style={{ background: '#25D366', color: 'white', boxShadow: '0 6px 20px rgba(37,211,102,0.35)' }}
                    >
                        <MessageCircle size={16} fill="white" stroke="none" />
                        Consultar por WhatsApp
                    </a>

                    <a
                        href="tel:+5492234487206"
                        className="flex items-center justify-center gap-2 w-full py-3 mt-2.5 rounded-xl font-body font-semibold text-[0.78rem] text-white/70 border border-white/15 hover:border-white/40 hover:text-white transition-all duration-200"
                    >
                        <Phone size={13} />
                        +54 9 223 448-7206
                    </a>
                </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-2xl p-5 border border-secondaryLight" style={{ boxShadow: '0 2px 20px rgba(18,39,58,0.06)' }}>
                <p className="font-body font-black text-secondary text-[0.9rem] mb-4 flex items-center gap-2">
                    <Mail size={14} className="text-primary" /> Consulta específica
                </p>

                {sent ? (
                    <div className="text-center py-6">
                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <CheckCircle2 size={22} className="text-emerald-500" />
                        </div>
                        <p className="font-body font-bold text-secondary text-[0.9rem] mb-1">¡Consulta enviada!</p>
                        <p className="text-[0.78rem] text-textSecondary">Te contactamos en menos de 2 horas hábiles.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <input
                                type="text"
                                placeholder="Tu nombre completo"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 bg-secondaryLight rounded-xl text-[0.82rem] font-body text-textPrimary placeholder:text-textSecondary border border-gray-200 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Tu email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 bg-secondaryLight rounded-xl text-[0.82rem] font-body text-textPrimary placeholder:text-textSecondary border border-gray-200 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            />
                        </div>
                        <div>
                            <textarea
                                rows={4}
                                value={msg}
                                onChange={e => setMsg(e.target.value)}
                                className="w-full px-4 py-2.5 bg-secondaryLight rounded-xl text-[0.82rem] font-body text-textPrimary placeholder:text-textSecondary border border-gray-200 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none leading-relaxed"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3 bg-textPrimary text-white rounded-xl font-body font-bold text-[0.8rem] tracking-wide transition-all duration-300 hover:bg-secondary hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(123,123,123,0.3)]"
                        >
                            <Send size={14} /> Enviar consulta
                        </button>
                        <p className="text-[0.67rem] text-textSecondary text-center font-body">
                            Respondemos en menos de 2 horas hábiles
                        </p>
                    </form>
                )}
            </div>

            {/* Price card */}
            <div className="bg-secondaryLight rounded-2xl p-5 border border-secondaryLight">
                <p className="text-[0.65rem] font-body font-bold tracking-[0.18em] uppercase text-textSecondary mb-1">Precio</p>
                <p className="font-body font-black text-secondary text-[1.6rem] leading-tight mb-1">
                    {formatPrice(property.price, property.currency)}
                </p>
                {property.currency === 'USD' && (
                    <p className="text-[0.72rem] text-textSecondary font-body">
                        USD {Math.round(property.price / property.sqm).toLocaleString('es-AR')}/m² · {property.sqm} m² cubiertos
                    </p>
                )}
                <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-[0.72rem] text-textSecondary font-body flex items-center gap-1.5">
                        <Shield size={11} className="text-primary shrink-0" />
                        Consultá sobre tu tasación
                    </p>
                </div>
            </div>
        </div>
    )
}

/* ─── GALLERY MODAL ──────────────────────────────────────────── */
function GalleryModal({ imgs, startIndex, onClose }) {
    const [current, setCurrent] = useState(startIndex)

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % imgs.length)
            if (e.key === 'ArrowLeft') setCurrent(c => (c - 1 + imgs.length) % imgs.length)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4" onClick={onClose}>
            {/* Nav bars / Top Elements */}
            <button onClick={onClose} className="absolute top-5 right-5 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all z-50">
                <X size={24} className="text-white" />
            </button>

            <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 text-white/50 text-[0.8rem] font-body font-bold tracking-widest z-50">
                {current + 1} / {imgs.length}
            </div>

            {/* Main image */}
            <div className="relative w-full h-full flex items-center justify-center py-20 px-4 md:px-16" onClick={onClose}>
                <img
                    src={imgs[current]}
                    alt=""
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    onClick={e => e.stopPropagation()}
                />
            </div>

            {/* Nav arrows */}
            <button
                onClick={e => { e.stopPropagation(); setCurrent(c => (c - 1 + imgs.length) % imgs.length) }}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 flex items-center justify-center transition-all z-50"
            >
                <ChevronLeft size={28} className="text-white" />
            </button>
            <button
                onClick={e => { e.stopPropagation(); setCurrent(c => (c + 1) % imgs.length) }}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 flex items-center justify-center transition-all z-50"
            >
                <ChevronRight size={28} className="text-white" />
            </button>

            {/* Thumbnails */}
            <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-2 px-4 z-50" onClick={e => e.stopPropagation()}>
                <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                    {imgs.map((img, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                            className="rounded-lg overflow-hidden transition-all duration-200 shrink-0"
                            style={{
                                width: 72, height: 54,
                                border: i === current ? '2px solid #12645F' : '2px solid transparent',
                                opacity: i === current ? 1 : 0.5,
                            }}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function Property() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [property, setProperty] = useState(null)
    const [similar, setSimilar] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeImg, setActiveImg] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalStart, setModalStart] = useState(0)
    const [copied, setCopied] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => { window.scrollTo(0, 0) }, [id])

    useEffect(() => {
        const load = async () => {
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error;

                if (data) {
                    const p = {
                        id: data.id,
                        type: data.tipo,
                        operation: data.operacion,
                        zone: data.zona || '',
                        title: data.titulo,
                        address: data.direccion || '',
                        beds: data.dormitorios || null,
                        baths: data.banos || 0,
                        sqm: data.m2_cubiertos || 0,
                        sqmBuilt: data.m2_cubiertos || 0,
                        sqmTotal: data.m2_lote || 0,
                        garages: data.cochera ? 1 : 0,
                        price: Number(data.precio),
                        currency: data.moneda,
                        tag: data.operacion,
                        featured: data.destacado,
                        new: data.nuevo_ingreso,
                        reduced: false,
                        imgs: data.imagenes?.length ? data.imagenes : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90'],
                        desc: data.descripcion || '',
                        amenities: data.amenities || [],
                        features: {},
                        age: 0,
                        lat: data.lat,
                        lng: data.lng,
                    }
                    if (data.antiguedad) p.features['Antigüedad'] = data.antiguedad
                    if (data.estado) p.features['Estado'] = data.estado
                    if (data.orientacion) p.features['Orientación'] = data.orientacion
                    if (data.m2_lote > 0) p.features['Lote total'] = `${data.m2_lote} m²`
                    if (data.m2_cubiertos > 0) p.features['Sup. cubierta'] = `${data.m2_cubiertos} m²`
                    if (data.pisos > 0) p.features['Pisos'] = String(data.pisos)
                    if (data.cochera) p.features['Cochera'] = 'Sí'

                    setProperty(p)

                    try {
                        await supabase.rpc('increment_views', { prop_id: data.id })
                    } catch (e) { }

                    let simQuery = supabase.from('properties').select('*').eq('publicado', true).neq('id', data.id).limit(3);
                    const conditions = [];
                    if (data.tipo) conditions.push(`tipo.eq."${data.tipo}"`);
                    if (data.zona) conditions.push(`zona.eq."${data.zona}"`);
                    if (conditions.length > 0) {
                        simQuery = simQuery.or(conditions.join(','));
                    }
                    const { data: sim } = await simQuery;

                    setSimilar((sim || []).map(s => ({
                        id: s.id, type: s.tipo, operation: s.operacion, zone: s.zona || '',
                        title: s.titulo, address: s.direccion || '',
                        beds: s.dormitorios, baths: s.banos, sqm: s.m2_cubiertos,
                        price: Number(s.precio), currency: s.moneda,
                        imgs: s.imagenes?.length ? s.imagenes : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
                        featured: s.destacado, new: s.nuevo_ingreso,
                    })))
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    // Sin pantalla de carga, si no hay property renderiza fondo instantáneo y cuando carga muestra la data
    if (loading || !property) return <div className="min-h-screen bg-secondaryLight" />

    const openModal = (i) => { setModalStart(i); setModalOpen(true) }

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="bg-secondaryLight min-h-screen">

            {/* ── BREADCRUMB BAR ── */}
            <div className="bg-white border-b border-secondaryLight sticky top-[70px] z-20" style={{ boxShadow: '0 2px 12px rgba(18,39,58,0.05)' }}>
                <div className="px-[4%] lg:px-[6%] py-3 flex items-center justify-between gap-4">
                    <button
                        onClick={() => navigate('/propiedades')}
                        className="flex items-center gap-2 font-body font-bold text-[0.78rem] uppercase tracking-wide text-textPrimary/60 hover:text-textPrimary transition-colors group"
                    >
                        <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
                        Volver al catálogo
                    </button>

                    <div className="hidden sm:flex items-center gap-1.5 text-[0.72rem] font-body text-textSecondary">
                        <span className="hover:text-textPrimary cursor-pointer transition-colors" onClick={() => navigate('/')}>Inicio</span>
                        <ChevronRight size={10} />
                        <span className="hover:text-textPrimary cursor-pointer transition-colors" onClick={() => navigate('/propiedades')}>Propiedades</span>
                        <ChevronRight size={10} />
                        <span className="text-textPrimary font-medium truncate max-w-[200px]">{property.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsFavorite(v => !v)}
                            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-all hover:border-red-300 hover:bg-red-50"
                        >
                            <Heart size={14} fill={isFavorite ? '#ef4444' : 'none'} stroke={isFavorite ? '#ef4444' : '#8898a8'} />
                        </button>
                        <button
                            onClick={handleCopy}
                            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-all hover:border-primary hover:bg-primary/5"
                        >
                            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-textSecondary" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-[4%] lg:px-[6%] py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* ── LEFT / MAIN ── */}
                    <div className="flex-1 min-w-0">

                        {/* Title block */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                                <span className={`text-[0.6rem] font-body font-black tracking-[0.16em] uppercase px-3 py-1.5 rounded-full ${property.operation === 'Venta' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                                    {property.operation}
                                </span>
                                <span className="text-[0.6rem] font-body font-bold tracking-widest uppercase text-primary">{property.type}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="text-[0.6rem] font-body text-textSecondary">{property.zone}</span>
                                {property.featured && (
                                    <span className="flex items-center gap-1 bg-white text-textPrimary text-[0.58rem] font-body font-bold uppercase px-2.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
                                        <Star size={9} fill="#12645F" stroke="none" /> Destacada
                                    </span>
                                )}
                                {property.new && (
                                    <span className="text-[0.58rem] font-body font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-emerald-100 text-emerald-700">Nuevo ingreso</span>
                                )}
                            </div>
                            <h1 className="font-body font-black text-primary leading-tight mb-2" style={{ fontSize: 'clamp(1.4rem,2.5vw,2.1rem)' }}>
                                {property.title}
                            </h1>
                            <div className="flex items-center gap-1.5 text-[0.85rem] text-textSecondary">
                                <MapPin size={13} className="text-primary shrink-0" />
                                {property.address}
                            </div>
                        </div>

                        {/* ── GALLERY ── */}
                        <div className="mb-8">
                            {/* Main image */}
                            <div
                                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                                style={{ height: '420px' }}
                                onClick={() => openModal(activeImg)}
                            >
                                <img
                                    src={property.imgs[activeImg]}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                                <div className="absolute inset-0 bg-textPrimary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-2 font-body font-bold text-textPrimary text-[0.78rem]">
                                        <ZoomIn size={15} /> Ver en pantalla completa
                                    </div>
                                </div>
                                {/* Photo count badge */}
                                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[0.7rem] font-body font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                    <Camera size={12} /> {property.imgs.length} fotos
                                </div>
                            </div>

                            {/* Thumbnails */}
                            {property.imgs.length > 1 && (
                                <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                                    {property.imgs.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImg(i)}
                                            className="rounded-xl overflow-hidden shrink-0 transition-all duration-200"
                                            style={{
                                                width: 90, height: 62,
                                                border: i === activeImg ? '2.5px solid #12645F' : '2.5px solid transparent',
                                                opacity: i === activeImg ? 1 : 0.65,
                                                boxShadow: i === activeImg ? '0 4px 12px rgba(18,100,95,0.25)' : 'none',
                                            }}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => openModal(0)}
                                        className="rounded-xl shrink-0 bg-textPrimary/80 text-white flex flex-col items-center justify-center gap-1 transition-all hover:bg-textPrimary"
                                        style={{ width: 90, height: 62 }}
                                    >
                                        <ZoomIn size={14} />
                                        <span className="text-[0.6rem] font-body font-bold">Ver todas</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* ── STATS ── */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                            {[
                                { icon: Maximize2, label: 'Sup. cubierta', val: `${property.sqmBuilt} m²` },
                                property.sqmTotal !== property.sqmBuilt && { icon: Layers, label: 'Sup. total', val: `${property.sqmTotal} m²` },
                                property.beds !== null && { icon: Bed, label: 'Dormitorios', val: property.beds },
                                { icon: Bath, label: 'Baños', val: property.baths },
                                property.garages > 0 && { icon: Car, label: 'Cochera', val: property.garages > 1 ? `${property.garages} autos` : '1 auto' },
                                { icon: Calendar, label: 'Antigüedad', val: property.age === 0 ? 'A estrenar' : `${property.age} años` },
                            ].filter(Boolean).slice(0, 4).map(({ icon: Icon, label, val }) => (
                                <div key={label} className="bg-white rounded-2xl p-4 border border-secondaryLight flex flex-col items-center text-center gap-2" style={{ boxShadow: '0 2px 12px rgba(18,39,58,0.05)' }}>
                                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <Icon size={16} className="text-secondary" />
                                    </div>
                                    <div>
                                        <div className="font-body font-black text-textPrimary text-[1.05rem] leading-none">{val}</div>
                                        <div className="text-[0.68rem] text-textSecondary font-body mt-0.5">{label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ── DESCRIPTION ── */}
                        <div className="bg-white rounded-2xl p-6 border border-secondaryLight mb-6" style={{ boxShadow: '0 2px 16px rgba(18,39,58,0.05)' }}>
                            <h2 className="font-body font-black text-primary text-[1rem] mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                                Descripción
                            </h2>
                            <div className="space-y-3">
                                {property.desc.split('\n\n').map((para, i) => (
                                    <p key={i} className="text-[0.88rem] text-[#4a5a6a] leading-[1.85]">{para}</p>
                                ))}
                            </div>
                        </div>

                        {/* ── AMENITIES ── */}
                        {property.amenities && property.amenities.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 border border-secondaryLight mb-6" style={{ boxShadow: '0 2px 16px rgba(18,39,58,0.05)' }}>
                                <h2 className="font-body font-black text-primary text-[1rem] mb-5 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                                    Comodidades y extras
                                </h2>
                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                    {property.amenities.map((a) => {
                                        const Icon = AMENITY_ICONS[a] || CheckCircle2
                                        return (
                                            <div key={a} className="flex items-center gap-2.5 p-2 sm:p-3 bg-secondaryLight rounded-xl border border-secondaryLight">
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                                    <Icon size={13} className="text-secondary sm:w-3.5 sm:h-3.5" />
                                                </div>
                                                <span className="font-body font-medium text-textPrimary text-[0.72rem] sm:text-[0.84rem] leading-tight">{a}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ── FEATURES TABLE ── */}
                        <div className="bg-white rounded-2xl p-6 border border-secondaryLight mb-6" style={{ boxShadow: '0 2px 16px rgba(18,39,58,0.05)' }}>
                            <h2 className="font-body font-black text-primary text-[1rem] mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                                Ficha técnica
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0">
                                {Object.entries(property.features).map(([key, val], i) => (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between py-3 sm:px-4"
                                        style={{ borderBottom: '1px solid #f0f2f5' }}
                                    >
                                        <span className="text-[0.8rem] text-textSecondary font-body">{key}</span>
                                        <span className="text-[0.8rem] font-body font-bold text-textPrimary">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── LOCATION ── */}
                        <div className="bg-white rounded-2xl p-6 border border-secondaryLight mb-6" style={{ boxShadow: '0 2px 16px rgba(18,39,58,0.05)' }}>
                            <h2 className="font-body font-black text-primary text-[1rem] mb-2 flex items-center gap-2">
                                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                                Ubicación
                            </h2>
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin size={13} className="text-primary" />
                                <span className="text-[0.84rem] text-textSecondary font-body">{property.address}</span>
                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto flex items-center gap-1 text-primary text-[0.72rem] font-body font-bold hover:underline"
                                >
                                    Ver en Google Maps <ExternalLink size={10} />
                                </a>
                            </div>
                            {/* Map placeholder */}
                            <div
                                className="w-full rounded-xl overflow-hidden bg-[#e8edf2] relative"
                                style={{ height: '240px' }}
                            >
                                <iframe
                                    title="Mapa de ubicación"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{ border: 0, filter: 'grayscale(30%) contrast(1.05)' }}
                                    src={property.lat && property.lng
                                        ? `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${property.lng}!3d${property.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1`
                                        : `https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&z=15&output=embed`
                                    }
                                    allowFullScreen
                                />
                            </div>
                        </div>

                        {/* ── MOBILE CONTACT (only on small screens) ── */}
                        <div className="lg:hidden mb-8">
                            <ContactSidebar property={property} />
                        </div>

                        {/* ── SIMILAR PROPERTIES ── */}
                        {similar.length > 0 && (
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <p className="font-body text-[0.62rem] font-bold tracking-[0.22em] uppercase text-secondary mb-1">Te puede interesar</p>
                                        <h2 className="font-body font-black text-primary text-[1.1rem]">Propiedades similares</h2>
                                    </div>
                                    <button
                                        onClick={() => navigate('/propiedades')}
                                        className="text-[0.72rem] font-body font-bold text-textPrimary/50 hover:text-textPrimary flex items-center gap-1 transition-colors"
                                    >
                                        Ver todas <ArrowRight size={11} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {similar.map(p => <SimilarCard key={p.id} prop={p} />)}
                                </div>
                            </div>
                        )}

                        {/* ── CTA BANNER ── */}
                        <div className="rounded-2xl bg-textPrimary px-7 py-8 flex items-center justify-between gap-6 flex-wrap relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-64 h-full opacity-10 pointer-events-none"
                                style={{ background: 'radial-gradient(circle at 80% 50%, #12645F, transparent 60%)' }} />
                            <div className="relative z-10">
                                <p className="text-primary text-[0.62rem] font-body font-bold tracking-[0.2em] uppercase mb-2">Servicio de tasación</p>
                                <p className="font-body font-black text-white text-[1.15rem] leading-tight">
                                    ¿Querés tasar<br />tu propiedad?
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/tasacion')}
                                className="relative z-10 inline-flex items-center gap-2 font-body font-bold text-[0.78rem] tracking-wider uppercase bg-primary text-white rounded-full px-7 py-3.5 hover:bg-primaryDark hover:shadow-[0_6px_20px_rgba(18,100,95,0.3)] hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Solicitar tasación <ArrowRight size={13} />
                            </button>
                        </div>
                    </div>

                    {/* ── RIGHT SIDEBAR (desktop only) ── */}
                    <div className="hidden lg:block w-[300px] xl:w-[320px] shrink-0">
                        <div className="sticky top-[130px]">
                            <ContactSidebar property={property} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── GALLERY MODAL ── */}
            {modalOpen && (
                <GalleryModal
                    imgs={property.imgs}
                    startIndex={modalStart}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    )
}