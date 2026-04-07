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

/* ─── SAME DATA as Properties.jsx ───────────────────────────── */
const ALL_PROPERTIES = [
    {
        id: 1, type: 'Casa', operation: 'Venta', zone: 'Playa Grande', zona: 'playa-grande',
        title: 'Residencia frente al mar con vista panorámica',
        address: 'Av. Constitución 2450, Playa Grande, Mar del Plata',
        beds: 4, baths: 3, sqm: 420, garages: 2, price: 580000, currency: 'USD',
        tag: 'Venta', featured: true, new: false, reduced: false,
        imgs: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=90',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90',
            'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=90',
        ],
        desc: 'Excepcional residencia de categoría ubicada en el corazón de Playa Grande. Amplios ambientes con terminaciones de primera calidad, vista al mar desde todos los niveles y acceso directo a la playa privada.\n\nLa planta baja cuenta con living-comedor de doble altura, cocina gourmet equipada, estudio independiente y galería cubierta con quincho. En planta alta, suite principal con vestidor y baño en suite con bañera hidromasaje, más tres dormitorios con baño compartido.\n\nJardín profesionalmente diseñado, pileta de natación climatizada y garage para dos vehículos. Sistema de domótica integral y seguridad 24 horas.',
        amenities: ['Pileta climatizada', 'Jardín profesional', 'Quincho', 'Seguridad 24h', 'Domótica', 'Doble altura'],
        features: {
            'Antigüedad': '5 años',
            'Estado': 'Excelente',
            'Expensas': 'Sin expensas',
            'Orientación': 'Norte / Este',
            'Frente': '18 metros',
            'Lote total': '720 m²',
        },
        age: 5, sqmBuilt: 420, sqmTotal: 720,
        lat: -38.0054, lng: -57.5426,
    },
    {
        id: 2, type: 'Departamento', operation: 'Venta', zone: 'Centro', zona: 'centro',
        title: 'Moderno departamento a metros del mar',
        address: 'Bvd. Marítimo 1180, 8°B, Centro, Mar del Plata',
        beds: 2, baths: 1, sqm: 68, garages: 1, price: 145000, currency: 'USD',
        tag: 'Venta', featured: false, new: true, reduced: false,
        imgs: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=90',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=90',
            'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1200&q=90',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=90',
        ],
        desc: 'Departamento a estrenar en edificio premium frente al mar. Cocina integrada al living con isla central, balcón con vista al océano y terminaciones de alta gama en cada detalle.\n\nDos dormitorios amplios, baño completo con ducha de lluvia y toilette separado. El edificio cuenta con gimnasio equipado, SUM, cochera en subsuelo y baulera individual.\n\nUbicación inmejorable: a metros del mar, centros comerciales y gastronomía de primer nivel.',
        amenities: ['Balcón vista al mar', 'Cochera', 'Baulera', 'Gimnasio', 'SUM', 'Portería'],
        features: {
            'Antigüedad': 'A estrenar',
            'Estado': 'Nuevo',
            'Expensas': '$85.000/mes',
            'Orientación': 'Sur / Oeste',
            'Piso': '8°',
            'Unidades totales': '48',
        },
        age: 0, sqmBuilt: 68, sqmTotal: 68,
        lat: -37.9966, lng: -57.5509,
    },
    {
        id: 3, type: 'Local', operation: 'Alquiler', zone: 'Güemes', zona: 'guemes',
        title: 'Local en esquina en zona comercial premium',
        address: 'Güemes 3450 esq. Castelli, Güemes, Mar del Plata',
        beds: null, baths: 1, sqm: 180, garages: 0, price: 980000, currency: 'ARS',
        tag: 'Alquiler', featured: true, new: false, reduced: true,
        imgs: [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=90',
            'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=1200&q=90',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=90',
        ],
        desc: 'Local estratégico en la esquina más transitada del barrio Güemes, el polo gastronómico y cultural de Mar del Plata en plena expansión.\n\nPlanta libre de 180 m² con vidrieras en ambas calles, depósito trasero de 40 m², baño y oficina. Altura de 4,5 metros. Ideal para gastronomía, indumentaria, servicios o showroom.\n\nEdificio de categoría con fachada de vidrio. Contrato mínimo 3 años. Precio reducido por firma inmediata.',
        amenities: ['Vidrieras dobles', 'Depósito 40m²', 'Oficina privada', 'Baño', 'Planta libre', 'Alta circulación'],
        features: {
            'Antigüedad': '15 años',
            'Estado': 'Muy bueno',
            'Contrato mínimo': '3 años',
            'Altura interna': '4,5 metros',
            'Frente': '12 metros',
            'Esquina': 'Sí',
        },
        age: 15, sqmBuilt: 180, sqmTotal: 220,
        lat: -37.9998, lng: -57.5533,
    },
    {
        id: 4, type: 'Casa', operation: 'Venta', zone: 'Los Troncos', zona: 'los-troncos',
        title: 'Casa familiar en barrio arbolado con jardín',
        address: 'Jujuy 2890, Los Troncos, Mar del Plata',
        beds: 3, baths: 2, sqm: 220, garages: 1, price: 185000, currency: 'USD',
        tag: 'Venta', featured: false, new: false, reduced: false,
        imgs: [
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=90',
            'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=90',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90',
        ],
        desc: 'Hermosa casa familiar en el mejor sector de Los Troncos, barrio residencial con calles arboladas y ambiente tranquilo.\n\nAmplio jardín con árboles maduros, living-comedor con chimenea a leña, cocina equipada con granito. Tres dormitorios en planta alta, dos baños completos y escritorio. Garage para un vehículo y quincho con parrilla.\n\nBarrio con vigilancia privada y excelente vecindario. A 10 minutos del centro.',
        amenities: ['Jardín amplio', 'Quincho con parrilla', 'Chimenea', 'Garage', 'Vigilancia', 'Barrio tranquilo'],
        features: {
            'Antigüedad': '12 años',
            'Estado': 'Muy bueno',
            'Expensas': 'Sin expensas',
            'Orientación': 'Norte',
            'Frente': '14 metros',
            'Lote total': '500 m²',
        },
        age: 12, sqmBuilt: 220, sqmTotal: 500,
        lat: -38.0102, lng: -57.5388,
    },
    {
        id: 6, type: 'Casa', operation: 'Venta', zone: 'Playa Grande', zona: 'playa-grande',
        title: 'Villa moderna con pileta climatizada',
        address: 'H. Yrigoyen 4500, Playa Grande, Mar del Plata',
        beds: 5, baths: 4, sqm: 580, garages: 3, price: 980000, currency: 'USD',
        tag: 'Venta', featured: true, new: false, reduced: false,
        imgs: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90',
            'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=90',
        ],
        desc: 'Villa de lujo en el sector más exclusivo de Playa Grande. Diseño arquitectónico único de estudio reconocido, pileta climatizada con deck de madera, jardín paisajístico profesional.\n\nHome cinema, sala de juegos, gym privado y domótica integral Lutron. Suite principal con terraza privada y jacuzzi exterior. Cuatro suites adicionales. Garage triple con cargador eléctrico.\n\nLa propiedad más exclusiva disponible en el mercado de Mar del Plata.',
        amenities: ['Pileta climatizada', 'Home cinema', 'Gym privado', 'Domótica Lutron', 'Jardín paisajístico', 'Jacuzzi exterior'],
        features: {
            'Antigüedad': '3 años',
            'Estado': 'Impecable',
            'Expensas': 'Sin expensas',
            'Lote total': '1.200 m²',
            'Frente': '24 metros',
            'Garage': 'Triple + eléctrico',
        },
        age: 3, sqmBuilt: 580, sqmTotal: 1200,
        lat: -38.0071, lng: -57.5401,
    },
    {
        id: 7, type: 'Departamento', operation: 'Venta', zone: 'Güemes', zona: 'guemes',
        title: 'Duplex con terraza y parrilla propia',
        address: 'San Luis 1780, PB, Güemes, Mar del Plata',
        beds: 3, baths: 2, sqm: 130, garages: 1, price: 245000, currency: 'USD',
        tag: 'Venta', featured: false, new: true, reduced: false,
        imgs: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90',
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=90',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=90',
        ],
        desc: 'Duplex a estrenar en Güemes con terraza privada exclusiva de 60 m² y parrilla propia. Living de doble altura con ventanales de piso a techo, cocina abierta con isla de diseño.\n\nSuite principal con vestidor y baño en suite, dos dormitorios adicionales con placard y baño compartido. Cochera cubierta incluida.\n\nEl barrio de moda de Mar del Plata: rodeado de los mejores restoranes, bares y espacios culturales.',
        amenities: ['Terraza 60m²', 'Parrilla propia', 'Doble altura', 'Vestidor', 'Cochera', 'Barrio gastronómico'],
        features: {
            'Antigüedad': 'A estrenar',
            'Estado': 'Nuevo',
            'Expensas': '$62.000/mes',
            'Terraza': '60 m²',
            'Orientación': 'Norte',
            'Piso': 'PB + 1°',
        },
        age: 0, sqmBuilt: 130, sqmTotal: 190,
        lat: -37.9988, lng: -57.5521,
    },
]

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
                <span className={`absolute top-2.5 left-2.5 text-[0.55rem] font-display font-black tracking-[0.14em] uppercase px-2.5 py-1.5 rounded-full ${prop.operation === 'Venta' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                    {prop.operation}
                </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[0.58rem] font-display font-bold tracking-widest uppercase text-primary">{prop.type}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                    <span className="text-[0.58rem] font-display text-textSecondary">{prop.zone}</span>
                </div>
                <h4 className="font-display font-bold text-textPrimary text-[0.82rem] leading-snug mb-2 line-clamp-2 flex-1 group-hover:text-secondary transition-colors">{prop.title}</h4>
                <div className="flex items-center justify-between mt-2">
                    <span className="font-display font-black text-textPrimary text-[0.95rem]">{formatPrice(prop.price, prop.currency)}</span>
                    <span className="flex items-center gap-1 text-primary text-[0.62rem] font-display font-bold uppercase group-hover:gap-2 transition-all">
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
                    <p className="text-white/50 text-[0.65rem] font-display font-bold tracking-[0.18em] uppercase mb-1">Asesor disponible</p>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="font-display font-black text-primary text-[0.85rem]">FP</span>
                        </div>
                        <div>
                            <p className="font-display font-bold text-white text-[0.88rem]">Mariana Caramello</p>
                            <p className="text-white/45 text-[0.72rem] font-display">Asesor principal</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 text-[0.65rem] font-display font-bold">En línea</span>
                        </div>
                    </div>

                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-display font-bold text-[0.8rem] tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                        style={{ background: '#25D366', color: 'white', boxShadow: '0 6px 20px rgba(37,211,102,0.35)' }}
                    >
                        <MessageCircle size={16} fill="white" stroke="none" />
                        Consultar por WhatsApp
                    </a>

                    <a
                        href="tel:+5492234487206"
                        className="flex items-center justify-center gap-2 w-full py-3 mt-2.5 rounded-xl font-display font-semibold text-[0.78rem] text-white/70 border border-white/15 hover:border-white/40 hover:text-white transition-all duration-200"
                    >
                        <Phone size={13} />
                        +54 9 223 448-7206
                    </a>
                </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-2xl p-5 border border-secondaryLight" style={{ boxShadow: '0 2px 20px rgba(18,39,58,0.06)' }}>
                <p className="font-display font-black text-secondary text-[0.9rem] mb-4 flex items-center gap-2">
                    <Mail size={14} className="text-primary" /> Consulta específica
                </p>

                {sent ? (
                    <div className="text-center py-6">
                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <CheckCircle2 size={22} className="text-emerald-500" />
                        </div>
                        <p className="font-display font-bold text-secondary text-[0.9rem] mb-1">¡Consulta enviada!</p>
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
                                className="w-full px-4 py-2.5 bg-secondaryLight rounded-xl text-[0.82rem] font-display text-textPrimary placeholder:text-textSecondary border border-gray-200 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Tu email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 bg-secondaryLight rounded-xl text-[0.82rem] font-display text-textPrimary placeholder:text-textSecondary border border-gray-200 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            />
                        </div>
                        <div>
                            <textarea
                                rows={4}
                                value={msg}
                                onChange={e => setMsg(e.target.value)}
                                className="w-full px-4 py-2.5 bg-secondaryLight rounded-xl text-[0.82rem] font-display text-textPrimary placeholder:text-textSecondary border border-gray-200 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none leading-relaxed"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3 bg-textPrimary text-white rounded-xl font-display font-bold text-[0.8rem] tracking-wide transition-all duration-300 hover:bg-secondary hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(123,123,123,0.3)]"
                        >
                            <Send size={14} /> Enviar consulta
                        </button>
                        <p className="text-[0.67rem] text-textSecondary text-center font-display">
                            Respondemos en menos de 2 horas hábiles
                        </p>
                    </form>
                )}
            </div>

            {/* Price card */}
            <div className="bg-secondaryLight rounded-2xl p-5 border border-secondaryLight">
                <p className="text-[0.65rem] font-display font-bold tracking-[0.18em] uppercase text-textSecondary mb-1">Precio</p>
                <p className="font-display font-black text-secondary text-[1.6rem] leading-tight mb-1">
                    {formatPrice(property.price, property.currency)}
                </p>
                {property.currency === 'USD' && (
                    <p className="text-[0.72rem] text-textSecondary font-display">
                        USD {Math.round(property.price / property.sqm).toLocaleString('es-AR')}/m² · {property.sqm} m² cubiertos
                    </p>
                )}
                <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-[0.72rem] text-textSecondary font-display flex items-center gap-1.5">
                        <Shield size={11} className="text-primary shrink-0" />
                        Tasación gratuita sin compromiso
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

            <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 text-white/50 text-[0.8rem] font-display font-bold tracking-widest z-50">
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
    const property = ALL_PROPERTIES.find(p => p.id === Number(id))
    const [activeImg, setActiveImg] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalStart, setModalStart] = useState(0)
    const [copied, setCopied] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => { window.scrollTo(0, 0) }, [id])

    if (!property) return (
        <div className="min-h-screen bg-secondaryLight flex flex-col items-center justify-center gap-4">
            <p className="font-display font-bold text-secondary text-xl">Propiedad no encontrada</p>
            <button onClick={() => navigate('/propiedades')} className="inline-flex items-center gap-2 font-display font-bold text-[0.78rem] uppercase bg-primary text-white rounded-full px-6 py-3">
                <ArrowLeft size={14} /> Volver al catálogo
            </button>
        </div>
    )

    const similar = ALL_PROPERTIES.filter(p => p.id !== property.id && (p.zone === property.zone || p.type === property.type)).slice(0, 3)

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
                        className="flex items-center gap-2 font-display font-bold text-[0.78rem] uppercase tracking-wide text-textPrimary/60 hover:text-textPrimary transition-colors group"
                    >
                        <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
                        Volver al catálogo
                    </button>

                    <div className="hidden sm:flex items-center gap-1.5 text-[0.72rem] font-display text-textSecondary">
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
                                <span className={`text-[0.6rem] font-display font-black tracking-[0.16em] uppercase px-3 py-1.5 rounded-full ${property.operation === 'Venta' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                                    {property.operation}
                                </span>
                                <span className="text-[0.6rem] font-display font-bold tracking-widest uppercase text-primary">{property.type}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="text-[0.6rem] font-display text-textSecondary">{property.zone}</span>
                                {property.featured && (
                                    <span className="flex items-center gap-1 bg-white text-textPrimary text-[0.58rem] font-display font-bold uppercase px-2.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
                                        <Star size={9} fill="#12645F" stroke="none" /> Destacada
                                    </span>
                                )}
                                {property.new && (
                                    <span className="text-[0.58rem] font-display font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-emerald-100 text-emerald-700">Nuevo ingreso</span>
                                )}
                            </div>
                            <h1 className="font-display font-black text-primary leading-tight mb-2" style={{ fontSize: 'clamp(1.4rem,2.5vw,2.1rem)' }}>
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
                                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-2 font-display font-bold text-textPrimary text-[0.78rem]">
                                        <ZoomIn size={15} /> Ver en pantalla completa
                                    </div>
                                </div>
                                {/* Photo count badge */}
                                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[0.7rem] font-display font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
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
                                        <span className="text-[0.6rem] font-display font-bold">Ver todas</span>
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
                                        <div className="font-display font-black text-textPrimary text-[1.05rem] leading-none">{val}</div>
                                        <div className="text-[0.68rem] text-textSecondary font-display mt-0.5">{label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ── DESCRIPTION ── */}
                        <div className="bg-white rounded-2xl p-6 border border-secondaryLight mb-6" style={{ boxShadow: '0 2px 16px rgba(18,39,58,0.05)' }}>
                            <h2 className="font-display font-black text-primary text-[1rem] mb-4 flex items-center gap-2">
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
                        <div className="bg-white rounded-2xl p-6 border border-secondaryLight mb-6" style={{ boxShadow: '0 2px 16px rgba(18,39,58,0.05)' }}>
                            <h2 className="font-display font-black text-primary text-[1rem] mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                                Comodidades y extras
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {property.amenities.map((a) => {
                                    const Icon = AMENITY_ICONS[a] || CheckCircle2
                                    return (
                                        <div key={a} className="flex items-center gap-3 p-3 bg-secondaryLight rounded-xl border border-secondaryLight">
                                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                                <Icon size={14} className="text-secondary" />
                                            </div>
                                            <span className="font-display font-medium text-textPrimary text-[0.84rem]">{a}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* ── FEATURES TABLE ── */}
                        <div className="bg-white rounded-2xl p-6 border border-secondaryLight mb-6" style={{ boxShadow: '0 2px 16px rgba(18,39,58,0.05)' }}>
                            <h2 className="font-display font-black text-primary text-[1rem] mb-5 flex items-center gap-2">
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
                                        <span className="text-[0.8rem] text-textSecondary font-display">{key}</span>
                                        <span className="text-[0.8rem] font-display font-bold text-textPrimary">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── LOCATION ── */}
                        <div className="bg-white rounded-2xl p-6 border border-secondaryLight mb-6" style={{ boxShadow: '0 2px 16px rgba(18,39,58,0.05)' }}>
                            <h2 className="font-display font-black text-primary text-[1rem] mb-2 flex items-center gap-2">
                                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                                Ubicación
                            </h2>
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin size={13} className="text-primary" />
                                <span className="text-[0.84rem] text-textSecondary font-display">{property.address}</span>
                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto flex items-center gap-1 text-primary text-[0.72rem] font-display font-bold hover:underline"
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
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&z=15&output=embed`}
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
                                        <p className="font-display text-[0.62rem] font-bold tracking-[0.22em] uppercase text-secondary mb-1">Te puede interesar</p>
                                        <h2 className="font-display font-black text-primary text-[1.1rem]">Propiedades similares</h2>
                                    </div>
                                    <button
                                        onClick={() => navigate('/propiedades')}
                                        className="text-[0.72rem] font-display font-bold text-textPrimary/50 hover:text-textPrimary flex items-center gap-1 transition-colors"
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
                                <p className="text-primary text-[0.62rem] font-display font-bold tracking-[0.2em] uppercase mb-2">Tasaciones gratuitas</p>
                                <p className="font-display font-black text-white text-[1.15rem] leading-tight">
                                    ¿Querés tasar<br />tu propiedad?
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/contacto')}
                                className="relative z-10 inline-flex items-center gap-2 font-display font-bold text-[0.78rem] tracking-wider uppercase bg-primary text-white rounded-full px-7 py-3.5 hover:bg-primaryDark hover:shadow-[0_6px_20px_rgba(18,100,95,0.3)] hover:-translate-y-0.5 transition-all duration-300"
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