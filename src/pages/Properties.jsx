import { useState, useMemo, useEffect, useRef, memo, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import PriceRangeFilter from '../components/PriceRangeFilter'
import {
    Search, SlidersHorizontal, X, MapPin, Star, ArrowRight,
    Bed, Bath, Maximize2, ChevronDown, Grid3X3, List,
    Share2, Eye, Filter, ChevronUp, ArrowUpDown,
    Home, Building2, Store, Trees, CheckCircle2
} from 'lucide-react'

/* ─── DATA ──────────────────────────────────────────────────── */
const ALL_PROPERTIES = [] // se carga dinámicamente desde Supabase

const TYPES = ['Casa', 'Departamento', 'PH', 'Local', 'Oficina', 'Terreno', 'Cochera', 'Depósito']
const OPERATIONS = ['Venta', 'Alquiler', 'Alquiler Temporal']
const ZONES = ['Güemes', 'Aldrey', 'Plaza Mitre', 'Stella Maris', 'Playa Grande', 'Chauvin', 'Macro centro', 'Varese', 'Playa chica', 'Alem', 'Divino Rostro', 'La perla', 'Rumenco', 'Rumenco Joven']
const SORT_OPTIONS = [
    { value: 'relevance', label: 'Relevancia' },
    { value: 'price-asc', label: 'Menor precio' },
    { value: 'price-desc', label: 'Mayor precio' },
    { value: 'sqm-desc', label: 'Mayor superficie' },
    { value: 'newest', label: 'Más nuevas' },
]

const TYPE_ICONS = { Casa: Home, Departamento: Building2, PH: Building2, Local: Store, Oficina: Building2, Terreno: Trees, Cochera: Home, 'Depósito': Store }

function formatPrice(price, currency) {
    if (currency === 'USD') return `USD ${price.toLocaleString('es-AR')}`
    return `$${price.toLocaleString('es-AR')}/mes`
}

/* ─── BADGE ─────────────────────────────────────────────────── */
function Badge({ children, variant = 'primary' }) {
    const styles = {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        red: 'bg-red-500 text-white',
        green: 'bg-emerald-500 text-white',
        outline: 'border border-textPrimary/20 text-textPrimary/60',
    }
    return (
        <span className={`text-[0.54rem] font-body font-black tracking-[0.16em] uppercase px-2.5 py-1.5 rounded-full ${styles[variant]}`}>
            {children}
        </span>
    )
}

/* ─── PROPERTY CARD — GRID VIEW (memoized) ─────────────────── */
const PropertyCardGrid = memo(function PropertyCardGrid({ prop }) {
    const navigate = useNavigate()

    return (
        <div
            className="group bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col property-card-grid"
            onClick={() => navigate(`/propiedades/${prop.id}`)}
        >
            {/* Image */}
            <div
                className="relative overflow-hidden"
                style={{ height: '220px' }}
            >
                <img
                    src={prop.img}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.07]"
                    loading="lazy"
                    decoding="async"
                />
                {/* Gradient */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(12,26,45,0.45) 0%, transparent 50%)' }} />

                {/* Badges top-left */}
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    <Badge variant={prop.operation === 'Venta' ? 'primary' : 'secondary'}>{prop.operation}</Badge>
                    {prop.new && <Badge variant="green">Nuevo</Badge>}
                    {prop.reduced && <Badge variant="red">Precio reducido</Badge>}
                </div>

                {/* Actions top-right */}
                <div className="absolute top-3 right-3 flex gap-2" onClick={e => e.stopPropagation()}>
                    <button 
                        onClick={() => {
                            const url = `${window.location.origin}/propiedades/${prop.id}`;
                            if (navigator.share) {
                                navigator.share({
                                    title: prop.title,
                                    text: `Mirá esta propiedad en Caramello Propiedades: ${prop.title}`,
                                    url: url
                                }).catch(err => console.log('Error sharing', err));
                            } else {
                                navigator.clipboard.writeText(url);
                                alert('Enlace copiado al portapapeles');
                            }
                        }}
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-200 hover:bg-white hover:scale-110"
                    >
                        <Share2 size={13} stroke="#12273a" />
                    </button>
                </div>

                {/* Featured badge bottom-left */}
                {prop.featured && (
                    <div className="absolute bottom-3 left-3">
                        <span className="flex items-center gap-1 bg-white/95 text-textPrimary text-[0.58rem] font-body font-bold uppercase px-2.5 py-1.5 rounded-full shadow-sm">
                            <Star size={9} fill="#12645F" stroke="none" /> Destacada
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Type + Zone */}
                <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[0.62rem] font-body font-bold tracking-widest uppercase text-primary">{prop.type}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                    <span className="text-[0.62rem] font-body font-medium tracking-wide text-textSecondary">{prop.zone}</span>
                </div>

                {/* Title */}
                <h3 className="font-body font-bold text-primary text-[0.92rem] leading-snug mb-2 group-hover:text-secondary transition-colors duration-200 line-clamp-2 flex-1">
                    {prop.title}
                </h3>

                {/* Address */}
                <div className="flex items-center gap-1.5 text-[0.76rem] text-textSecondary mb-4">
                    <MapPin size={10} className="shrink-0 text-primary" />
                    <span className="truncate">{prop.address}</span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 py-3.5 border-t border-b border-secondaryLight mb-4">
                    {prop.beds !== null && (
                        <div className="flex flex-col items-center gap-1">
                            <Bed size={14} className="text-textSecondary" />
                            <span className="text-[0.72rem] font-body font-bold text-textPrimary">{prop.beds}</span>
                            <span className="text-[0.62rem] text-textSecondary">dorm.</span>
                        </div>
                    )}
                    <div className="flex flex-col items-center gap-1">
                        <Bath size={14} className="text-textSecondary" />
                        <span className="text-[0.72rem] font-body font-bold text-textPrimary">{prop.baths}</span>
                        <span className="text-[0.62rem] text-textSecondary">baños</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Maximize2 size={14} className="text-textSecondary" />
                        <span className="text-[0.72rem] font-body font-bold text-textPrimary">{prop.sqm}</span>
                        <span className="text-[0.62rem] text-textSecondary">m²</span>
                    </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-body font-black text-textPrimary text-[1.15rem]">{formatPrice(prop.price, prop.currency)}</div>
                        {prop.sqm && prop.currency === 'USD' && (
                            <div className="text-[0.65rem] text-textSecondary font-body">
                                USD {Math.round(prop.price / prop.sqm).toLocaleString()}/m²
                            </div>
                        )}
                    </div>
                    <span className="flex items-center gap-1 text-primary font-body font-bold text-[0.65rem] tracking-widest uppercase group-hover:gap-2 transition-all duration-200">
                        Ver más <ArrowRight size={11} />
                    </span>
                </div>
            </div>
        </div>
    )
})

/* ─── PROPERTY CARD — LIST VIEW (memoized) ─────────────────── */
const PropertyCardList = memo(function PropertyCardList({ prop }) {
    const navigate = useNavigate()
    return (
        <div
            className="group bg-white rounded-2xl overflow-hidden cursor-pointer flex gap-0 property-card-list"
            onClick={() => navigate(`/propiedades/${prop.id}`)}
        >
            {/* Accent bar */}
            <div className="w-1 bg-primary shrink-0 rounded-l-2xl" />

            {/* Image */}
            <div className="relative w-[200px] sm:w-[240px] shrink-0 overflow-hidden">
                <img
                    src={prop.img}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
                    <Badge variant={prop.operation === 'Venta' ? 'primary' : 'secondary'}>{prop.operation}</Badge>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[0.6rem] font-body font-bold tracking-widest uppercase text-primary">{prop.type}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-200" />
                            <span className="text-[0.6rem] font-body font-medium text-textSecondary">{prop.zone}</span>
                        </div>
                        <div className="flex gap-1.5" onClick={e => e.stopPropagation()}>
                            {prop.new && <Badge variant="green">Nuevo</Badge>}
                            {prop.featured && <Badge variant="outline">Destacada</Badge>}
                        </div>
                    </div>
                    <h3 className="font-body font-bold text-primary text-[0.95rem] leading-snug mb-1.5 group-hover:text-secondary transition-colors line-clamp-2">{prop.title}</h3>
                    <div className="flex items-center gap-1.5 text-[0.75rem] text-textSecondary mb-3">
                        <MapPin size={10} className="shrink-0 text-primary" />{prop.address}
                    </div>
                    <p className="text-[0.79rem] text-textSecondary leading-[1.7] line-clamp-2 hidden sm:block">{prop.desc}</p>
                </div>

                <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                    <div className="flex gap-4 text-[0.78rem] text-textSecondary">
                        {prop.beds !== null && (
                            <span className="flex items-center gap-1.5"><Bed size={13} className="text-primary" />{prop.beds} dorm.</span>
                        )}
                        <span className="flex items-center gap-1.5"><Bath size={13} className="text-primary" />{prop.baths} baños</span>
                        <span className="flex items-center gap-1.5"><Maximize2 size={13} className="text-primary" />{prop.sqm} m²</span>
                    </div>
                    <div className="font-body font-black text-textPrimary text-[1.1rem]">{formatPrice(prop.price, prop.currency)}</div>
                </div>
            </div>
        </div>
    )
})

/* ─── FILTER CHIP ────────────────────────────────────────────── */
const FilterChip = memo(function FilterChip({ label, active, onClick, icon: Icon }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.72rem] font-body font-bold tracking-wide transition-all duration-200 border whitespace-nowrap ${active
                ? 'bg-textPrimary text-white border-textPrimary shadow-[0_4px_12px_rgba(18,39,58,0.25)]'
                : 'bg-white text-textPrimary border-gray-200 hover:border-textPrimary/40 hover:bg-gray-50'
                }`}
        >
            {Icon && <Icon size={12} />}
            {label}
        </button>
    )
})

/* ─── RANGE SLIDER (legacy — kept for non-price uses) ────────── */
function RangeInput({ label, min, max, value, onChange, format }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="text-[0.72rem] font-body font-bold text-textPrimary uppercase tracking-wide">{label}</label>
                <span className="text-[0.72rem] text-primary font-body font-bold">{format(value)}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={(max - min) / 20}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
                className="w-full accent-primary h-1.5 rounded-full appearance-none bg-gray-200"
                style={{
                    background: `linear-gradient(to right, #12645F 0%, #12645F ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
                }}
            />
            <div className="flex justify-between mt-1">
                <span className="text-[0.64rem] text-textSecondary font-body">{format(min)}</span>
                <span className="text-[0.64rem] text-textSecondary font-body">{format(max)}</span>
            </div>
        </div>
    )
}

/* ─── FILTER PANEL (extracted outside render) ────────────────── */
const FilterPanel = memo(function FilterPanel({
    selectedOps, setSelectedOps,
    selectedTypes, setSelectedTypes,
    selectedZones, setSelectedZones,
    minPriceUSD, setMinPriceUSD,
    maxPriceUSD, setMaxPriceUSD,
    minPriceARS, setMinPriceARS,
    maxPriceARS, setMaxPriceARS,
    minBeds, setMinBeds,
    minSqm, setMinSqm,
    onlyFeatured, setOnlyFeatured,
    onlyNew, setOnlyNew,
    activeFiltersCount, clearAllFilters,
    toggleFilter,
}) {
    return (
        <div className="space-y-7">
            {/* Operation */}
            <div>
                <p className="text-[0.65rem] font-body font-black tracking-[0.2em] uppercase text-textPrimary/40 mb-3">Operación</p>
                <div className="flex flex-col gap-2">
                    {OPERATIONS.map(op => (
                        <label key={op} className="flex items-center gap-3 cursor-pointer group">
                            <div
                                onClick={() => toggleFilter(selectedOps, setSelectedOps, op)}
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${selectedOps.includes(op) ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-textPrimary/40'
                                    }`}
                            >
                                {selectedOps.includes(op) && <CheckCircle2 size={12} className="text-textPrimary" />}
                            </div>
                            <span className="text-[0.84rem] font-body font-medium text-textPrimary">{op}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="border-t border-secondaryLight" />

            {/* Type */}
            <div>
                <p className="text-[0.65rem] font-body font-black tracking-[0.2em] uppercase text-textPrimary/40 mb-3">Tipo de propiedad</p>
                <div className="flex flex-col gap-2">
                    {TYPES.map(t => {
                        const Icon = TYPE_ICONS[t]
                        return (
                            <label key={t} className="flex items-center gap-3 cursor-pointer group">
                                <div
                                    onClick={() => toggleFilter(selectedTypes, setSelectedTypes, t)}
                                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${selectedTypes.includes(t) ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-textPrimary/40'
                                        }`}
                                >
                                    {selectedTypes.includes(t) && <CheckCircle2 size={12} className="text-textPrimary" />}
                                </div>
                                <Icon size={14} className="text-textSecondary" />
                                <span className="text-[0.84rem] font-body font-medium text-textPrimary">{t}</span>
                            </label>
                        )
                    })}
                </div>
            </div>

            <div className="border-t border-secondaryLight" />

            {/* Zone */}
            <div>
                <p className="text-[0.65rem] font-body font-black tracking-[0.2em] uppercase text-textPrimary/40 mb-3">Zona</p>
                <div className="flex flex-col gap-2">
                    {ZONES.map(z => (
                        <label key={z} className="flex items-center gap-3 cursor-pointer group">
                            <div
                                onClick={() => toggleFilter(selectedZones, setSelectedZones, z)}
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${selectedZones.includes(z) ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-textPrimary/40'
                                    }`}
                            >
                                {selectedZones.includes(z) && <CheckCircle2 size={12} className="text-textPrimary" />}
                            </div>
                            <span className="text-[0.84rem] font-body font-medium text-textPrimary">{z}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="border-t border-secondaryLight" />

            {/* Price USD — Venta */}
            <PriceRangeFilter
                currency="USD"
                min={0}
                max={2000000}
                valueMin={minPriceUSD}
                valueMax={maxPriceUSD}
                onChangeMin={setMinPriceUSD}
                onChangeMax={setMaxPriceUSD}
                step={1000}
            />

            <div className="border-t border-secondaryLight" />

            {/* Price ARS — Alquiler */}
            <PriceRangeFilter
                currency="ARS"
                min={0}
                max={8000000}
                valueMin={minPriceARS}
                valueMax={maxPriceARS}
                onChangeMin={setMinPriceARS}
                onChangeMax={setMaxPriceARS}
                step={25000}
            />

            <div className="border-t border-secondaryLight" />

            {/* Bedrooms */}
            <div>
                <p className="text-[0.65rem] font-body font-black tracking-[0.2em] uppercase text-textPrimary/40 mb-3">Dormitorios mínimos</p>
                <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map(n => (
                        <button
                            key={n}
                            onClick={() => setMinBeds(n)}
                            className={`w-9 h-9 rounded-xl text-[0.8rem] font-body font-bold transition-all duration-200 border ${minBeds === n ? 'bg-textPrimary text-white border-textPrimary' : 'bg-white text-textPrimary border-gray-200 hover:border-textPrimary/40'
                                }`}
                        >
                            {n === 0 ? 'T' : n}
                        </button>
                    ))}
                </div>
            </div>

            {/* Min sqm */}
            <RangeInput
                label="Superficie mínima"
                min={0} max={600}
                value={minSqm}
                onChange={setMinSqm}
                format={v => `${v} m²`}
            />

            <div className="border-t border-secondaryLight" />

            {/* Quick filters */}
            <div>
                <p className="text-[0.65rem] font-body font-black tracking-[0.2em] uppercase text-textPrimary/40 mb-3">Filtros rápidos</p>
                <div className="flex flex-col gap-2">
                    {[
                        { label: 'Solo destacadas', val: onlyFeatured, set: setOnlyFeatured },
                        { label: 'Nuevo ingreso', val: onlyNew, set: setOnlyNew },
                    ].map(({ label, val, set }) => (
                        <label key={label} className="flex items-center gap-3 cursor-pointer">
                            <div
                                onClick={() => set(v => !v)}
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${val ? 'bg-primary border-primary' : 'border-gray-300'
                                    }`}
                            >
                                {val && <CheckCircle2 size={12} className="text-textPrimary" />}
                            </div>
                            <span className="text-[0.84rem] font-body font-medium text-textPrimary">{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Clear */}
            {activeFiltersCount > 0 && (
                <button
                    onClick={clearAllFilters}
                    className="w-full py-2.5 rounded-xl border-2 border-red-400 text-red-500 text-[0.75rem] font-body font-bold tracking-wide uppercase transition-all duration-200 hover:bg-red-50"
                >
                    Limpiar filtros ({activeFiltersCount})
                </button>
            )}
        </div>
    )
})

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function Properties() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    /* View */
    const [viewMode, setViewMode] = useState('grid')

    /* Properties from Supabase */
    const [allProps, setAllProps] = useState([])

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase
                .from('properties')
                .select('*')
                .eq('publicado', true)
                .order('created_at', { ascending: false })
            setAllProps((data || []).map(p => ({
                id: p.id,
                type: p.tipo,
                operation: p.operacion,
                zone: p.zona || '',
                title: p.titulo,
                address: p.direccion || '',
                beds: p.dormitorios || null,
                baths: p.banos || 0,
                sqm: p.m2_cubiertos || 0,
                sqmLote: p.m2_lote || 0,
                garages: p.cochera ? 1 : 0,
                price: Number(p.precio),
                currency: p.moneda,
                tag: p.operacion,
                featured: p.destacado,
                new: p.nuevo_ingreso,
                reduced: false,
                img: p.imagenes?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
                imgs: p.imagenes || [],
                desc: p.descripcion || '',
                amenities: [],
                age: 0,
            })))
        }
        load()
    }, [])

    /* Search */
    const [search, setSearch] = useState('')

    /* Filters */
    const [selectedOps, setSelectedOps] = useState([])
    const [selectedTypes, setSelectedTypes] = useState(
        searchParams.get('tipo')
            ? [searchParams.get('tipo').charAt(0).toUpperCase() + searchParams.get('tipo').slice(1)]
            : []
    );
    const [selectedZones, setSelectedZones] = useState(
        searchParams.get('zona') ? [searchParams.get('zona').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())] : []
    )
    const [minPriceUSD, setMinPriceUSD] = useState(0)
    const [maxPriceUSD, setMaxPriceUSD] = useState(2000000)
    const [minPriceARS, setMinPriceARS] = useState(0)
    const [maxPriceARS, setMaxPriceARS] = useState(8000000)
    const [minBeds, setMinBeds] = useState(0)
    const [minSqm, setMinSqm] = useState(0)
    const [onlyFeatured, setOnlyFeatured] = useState(false)
    const [onlyNew, setOnlyNew] = useState(false)

    /* Sort */
    const [sortBy, setSortBy] = useState('relevance')
    const [sortOpen, setSortOpen] = useState(false)

    /* Sidebar on mobile */
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleFilter = useCallback((arr, setArr, val) => setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]), [])

    /* Apply zone from URL param on load */
    useEffect(() => {
        const tipo = searchParams.get('tipo');
        if (tipo) {
            // Busca 'Departamento' en el array TYPES si el parámetro es 'departamento'
            const label = TYPES.find(t => t.toLowerCase() === tipo.toLowerCase());
            if (label) setSelectedTypes([label]);
        }
    }, [searchParams]); // Se ejecuta si cambia la URL

    /* Filtered + sorted */
    const filtered = useMemo(() => {
        let list = allProps.filter(p => {
            if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
                !p.address.toLowerCase().includes(search.toLowerCase()) &&
                !p.zone.toLowerCase().includes(search.toLowerCase())) return false
            if (selectedOps.length && !selectedOps.includes(p.operation)) return false
            if (selectedTypes.length && !selectedTypes.includes(p.type)) return false
            if (selectedZones.length && !selectedZones.includes(p.zone)) return false
            if (p.currency === 'USD' && (p.price < minPriceUSD || p.price > maxPriceUSD)) return false
            if (p.currency === 'ARS' && (p.price < minPriceARS || p.price > maxPriceARS)) return false
            if (minBeds > 0 && (p.beds === null || p.beds < minBeds)) return false
            if (minSqm > 0 && p.sqm < minSqm) return false
            if (onlyFeatured && !p.featured) return false
            if (onlyNew && !p.new) return false
            return true
        })

        switch (sortBy) {
            case 'price-asc': return [...list].sort((a, b) => (a.currency === b.currency ? a.price - b.price : a.currency === 'USD' ? -1 : 1))
            case 'price-desc': return [...list].sort((a, b) => (a.currency === b.currency ? b.price - a.price : b.currency === 'USD' ? -1 : 1))
            case 'sqm-desc': return [...list].sort((a, b) => b.sqm - a.sqm)
            case 'newest': return [...list].sort((a, b) => a.age - b.age)
            default: return [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        }
    }, [search, selectedOps, selectedTypes, selectedZones, minPriceUSD, maxPriceUSD, minPriceARS, maxPriceARS, minBeds, minSqm, onlyFeatured, onlyNew, sortBy, allProps])

    const activeFiltersCount = selectedOps.length + selectedTypes.length + selectedZones.length +
        (onlyFeatured ? 1 : 0) + (onlyNew ? 1 : 0) +
        (minPriceUSD > 0 || maxPriceUSD < 2000000 ? 1 : 0) +
        (minPriceARS > 0 || maxPriceARS < 8000000 ? 1 : 0) +
        (minBeds > 0 ? 1 : 0) + (minSqm > 0 ? 1 : 0)

    const clearAllFilters = useCallback(() => {
        setSelectedOps([]); setSelectedTypes([]); setSelectedZones([])
        setMinPriceUSD(0); setMaxPriceUSD(2000000)
        setMinPriceARS(0); setMaxPriceARS(8000000)
        setMinBeds(0); setMinSqm(0)
        setOnlyFeatured(false); setOnlyNew(false); setSearch('')
    }, [])

    return (
        <div className="bg-secondaryLight min-h-screen">



            {/* ── SEARCH BAR ── */}
            <div className="bg-white border-b border-secondaryLight sticky top-[70px] z-30 shadow-[0_4px_20px_rgba(18,39,58,0.06)]">
                <div className="px-[4%] lg:px-[6%] py-3 flex items-center gap-3">
                    {/* Search input */}
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textSecondary" />
                        <input
                            type="text"
                            placeholder="Buscar por barrio, dirección o título..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-secondaryLight rounded-xl text-[0.85rem] font-body text-textPrimary placeholder:text-textSecondary border border-gray-200 focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary transition-colors">
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Mobile filter toggle */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-textPrimary text-white rounded-xl text-[0.78rem] font-body font-bold shrink-0 relative"
                    >
                        <SlidersHorizontal size={14} />
                        Filtros
                        {activeFiltersCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white rounded-full text-[0.6rem] font-black flex items-center justify-center">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>

                    {/* View mode + Sort — desktop */}
                    <div className="hidden lg:flex items-center gap-2 shrink-0">
                        {/* Sort dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setSortOpen(v => !v)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-secondaryLight border border-gray-200 rounded-xl text-[0.8rem] font-body font-bold text-textPrimary hover:border-textPrimary/40 transition-all"
                            >
                                <ArrowUpDown size={13} />
                                {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                                <ChevronDown size={12} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {sortOpen && (
                                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-[0_8px_32px_rgba(18,39,58,0.14)] border border-secondaryLight overflow-hidden z-50 min-w-[180px]">
                                    {SORT_OPTIONS.map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                                            className={`w-full text-left px-4 py-2.5 text-[0.82rem] font-body font-medium transition-colors hover:bg-secondaryLight ${sortBy === opt.value ? 'text-primary font-bold' : 'text-textPrimary'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* View toggle */}
                        <div className="flex bg-secondaryLight border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 transition-all ${viewMode === 'grid' ? 'bg-textPrimary text-white' : 'text-textSecondary hover:text-textPrimary'}`}
                            >
                                <Grid3X3 size={15} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 transition-all ${viewMode === 'list' ? 'bg-textPrimary text-white' : 'text-textSecondary hover:text-textPrimary'}`}
                            >
                                <List size={15} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick filter chips — horizontal scroll */}
                <div className="px-[4%] lg:px-[6%] pb-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    {OPERATIONS.map(op => (
                        <FilterChip key={op} label={op} active={selectedOps.includes(op)} onClick={() => toggleFilter(selectedOps, setSelectedOps, op)} />
                    ))}
                    <div className="w-px bg-gray-200 shrink-0 my-1" />
                    {ZONES.map(z => (
                        <FilterChip key={z} label={z} active={selectedZones.includes(z)} onClick={() => toggleFilter(selectedZones, setSelectedZones, z)} icon={MapPin} />
                    ))}
                    <div className="w-px bg-gray-200 shrink-0 my-1" />
                    {TYPES.map(t => (
                        <FilterChip key={t} label={t} active={selectedTypes.includes(t)} onClick={() => toggleFilter(selectedTypes, setSelectedTypes, t)} icon={TYPE_ICONS[t]} />
                    ))}
                </div>
            </div>

            {/* ── MAIN LAYOUT ── */}
            <div className="px-[4%] lg:px-[6%] py-8 flex gap-8">

                {/* ── DESKTOP SIDEBAR ── */}
                <aside className="hidden lg:block w-[260px] shrink-0">
                    <div className="bg-white rounded-2xl p-6 sticky top-[170px] shadow-[0_2px_20px_rgba(18,39,58,0.06)] border border-secondaryLight">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-body font-black text-textPrimary text-[0.9rem] flex items-center gap-2">
                                <Filter size={14} className="text-primary" /> Filtros
                            </span>
                            {activeFiltersCount > 0 && (
                                <button onClick={clearAllFilters} className="text-[0.7rem] text-red-400 font-body font-bold hover:text-red-500 transition-colors">
                                    Limpiar ({activeFiltersCount})
                                </button>
                            )}
                        </div>
                        <FilterPanel
                            selectedOps={selectedOps} setSelectedOps={setSelectedOps}
                            selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}
                            selectedZones={selectedZones} setSelectedZones={setSelectedZones}
                            minPriceUSD={minPriceUSD} setMinPriceUSD={setMinPriceUSD}
                            maxPriceUSD={maxPriceUSD} setMaxPriceUSD={setMaxPriceUSD}
                            minPriceARS={minPriceARS} setMinPriceARS={setMinPriceARS}
                            maxPriceARS={maxPriceARS} setMaxPriceARS={setMaxPriceARS}
                            minBeds={minBeds} setMinBeds={setMinBeds}
                            minSqm={minSqm} setMinSqm={setMinSqm}
                            onlyFeatured={onlyFeatured} setOnlyFeatured={setOnlyFeatured}
                            onlyNew={onlyNew} setOnlyNew={setOnlyNew}
                            activeFiltersCount={activeFiltersCount}
                            clearAllFilters={clearAllFilters}
                            toggleFilter={toggleFilter}
                        />
                    </div>
                </aside>

                {/* ── RESULTS ── */}
                <div className="flex-1 min-w-0">
                    {/* Results header */}
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                        <div>
                            <span className="font-body font-black text-textPrimary text-[1.1rem]">{filtered.length}</span>
                            <span className="font-body text-textSecondary text-[0.88rem] ml-1.5">
                                {filtered.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                            </span>
                        </div>
                        {/* Mobile sort */}
                        <div className="flex items-center gap-2 lg:hidden">
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="text-[0.78rem] font-body font-bold text-textPrimary bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary"
                            >
                                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Active filter tags */}
                    {activeFiltersCount > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                            {selectedOps.map(f => (
                                <span key={f} className="flex items-center gap-1.5 bg-textPrimary/10 text-textPrimary text-[0.7rem] font-body font-bold px-3 py-1.5 rounded-full">
                                    {f} <button onClick={() => toggleFilter(selectedOps, setSelectedOps, f)}><X size={10} /></button>
                                </span>
                            ))}
                            {selectedTypes.map(f => (
                                <span key={f} className="flex items-center gap-1.5 bg-textPrimary/10 text-textPrimary text-[0.7rem] font-body font-bold px-3 py-1.5 rounded-full">
                                    {f} <button onClick={() => toggleFilter(selectedTypes, setSelectedTypes, f)}><X size={10} /></button>
                                </span>
                            ))}
                            {selectedZones.map(f => (
                                <span key={f} className="flex items-center gap-1.5 bg-primary/20 text-textPrimary text-[0.7rem] font-body font-bold px-3 py-1.5 rounded-full">
                                    <MapPin size={9} /> {f} <button onClick={() => toggleFilter(selectedZones, setSelectedZones, f)}><X size={10} /></button>
                                </span>
                            ))}
                            {onlyFeatured && (
                                <span className="flex items-center gap-1.5 bg-textPrimary/10 text-textPrimary text-[0.7rem] font-body font-bold px-3 py-1.5 rounded-full">
                                    Destacadas <button onClick={() => setOnlyFeatured(false)}><X size={10} /></button>
                                </span>
                            )}
                            {onlyNew && (
                                <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-[0.7rem] font-body font-bold px-3 py-1.5 rounded-full">
                                    Nuevas <button onClick={() => setOnlyNew(false)}><X size={10} /></button>
                                </span>
                            )}
                        </div>
                    )}

                    {/* Results grid/list */}
                    {filtered.length === 0 ? (
                        <div className="bg-white rounded-2xl p-16 text-center border border-secondaryLight">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Search size={24} className="text-gray-400" />
                            </div>
                            <h3 className="font-body font-bold text-primary text-[1.1rem] mb-2">Sin resultados</h3>
                            <p className="text-[0.88rem] text-textSecondary mb-6">No encontramos propiedades con esos filtros. Probá con otras opciones.</p>
                            <button
                                onClick={clearAllFilters}
                                className="inline-flex items-center gap-2 font-body font-bold text-[0.78rem] tracking-wide uppercase bg-primary text-white rounded-full px-6 py-3 hover:bg-primaryDark transition-all"
                            >
                                Limpiar filtros <X size={13} />
                            </button>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filtered.map(p => (
                                <PropertyCardGrid key={p.id} prop={p} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filtered.map(p => (
                                <PropertyCardList key={p.id} prop={p} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── MOBILE SIDEBAR DRAWER ── */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-textPrimary/50 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    {/* Drawer */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white px-6 pt-5 pb-4 border-b border-secondaryLight flex items-center justify-between z-10">
                            <span className="font-body font-black text-textPrimary text-[1rem] flex items-center gap-2">
                                <Filter size={15} className="text-primary" /> Filtros avanzados
                            </span>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="px-6 py-6">
                            <FilterPanel
                                selectedOps={selectedOps} setSelectedOps={setSelectedOps}
                                selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}
                                selectedZones={selectedZones} setSelectedZones={setSelectedZones}
                                minPriceUSD={minPriceUSD} setMinPriceUSD={setMinPriceUSD}
                                maxPriceUSD={maxPriceUSD} setMaxPriceUSD={setMaxPriceUSD}
                                minPriceARS={minPriceARS} setMinPriceARS={setMinPriceARS}
                                maxPriceARS={maxPriceARS} setMaxPriceARS={setMaxPriceARS}
                                minBeds={minBeds} setMinBeds={setMinBeds}
                                minSqm={minSqm} setMinSqm={setMinSqm}
                                onlyFeatured={onlyFeatured} setOnlyFeatured={setOnlyFeatured}
                                onlyNew={onlyNew} setOnlyNew={setOnlyNew}
                                activeFiltersCount={activeFiltersCount}
                                clearAllFilters={clearAllFilters}
                                toggleFilter={toggleFilter}
                            />
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="w-full mt-6 py-4 bg-textPrimary text-white rounded-2xl font-body font-bold text-[0.85rem] tracking-wide"
                            >
                                Ver {filtered.length} {filtered.length === 1 ? 'propiedad' : 'propiedades'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}