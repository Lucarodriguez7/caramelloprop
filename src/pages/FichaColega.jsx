import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { 
  ArrowLeft, Copy, Printer, Maximize2, Layers, BedDouble, 
  Bath, Grid, Car, MapPin, Calendar, Compass, Layers3, Sparkles 
} from 'lucide-react';

const AMENITY_ICONS = {
  'Pileta': '🏊', 'Pileta climatizada': '🏊', 'Jardín': '🌿', 'Quincho': '🔥', 'Parrilla': '🔥',
  'Terraza': '🏗️', 'Balcón': '🌇', 'Cochera': '🚗', 'Baulera': '📦', 'Seguridad 24h': '🛡️',
  'Gimnasio': '💪', 'SUM': '🏠', 'Portería': '🛡️', 'Domótica': '📱', 'Ascensor': '🛗',
  'Laundry': '👕', 'Vista al mar': '🌊', 'Chimenea': '🔥', 'Vestidor': '👔', 'Home cinema': '🎬',
  'Aire acondicionado': '❄️', 'Calefacción': '🌡️', 'Piso radiante': '🌡️',
};

const PALETTES = {
  charcoal: {
    name: 'Charcoal Matte',
    accent: '#18181b', // Zinc 900
    accentHover: '#27272a',
    bgLight: '#f4f4f5',
    borderLight: '#e4e4e7',
    textAccent: '#09090b',
  },
  petroleum: {
    name: 'Azul Petróleo',
    accent: '#0f2d4a',
    accentHover: '#173f66',
    bgLight: '#f0f5fa',
    borderLight: '#dbe7f2',
    textAccent: '#0e263d',
  },
  beige: {
    name: 'Beige Cálido',
    accent: '#5c4f43',
    accentHover: '#736354',
    bgLight: '#faf6f0',
    borderLight: '#ebe3d5',
    textAccent: '#4c4137',
  },
  slate: {
    name: 'Gris Slate',
    accent: '#475569', // Slate 600
    accentHover: '#334155',
    bgLight: '#f8fafc',
    borderLight: '#e2e8f0',
    textAccent: '#1e293b',
  },
  olive: {
    name: 'Verde Oliva',
    accent: '#2e3a2f',
    accentHover: '#3c4d3e',
    bgLight: '#f3f6f3',
    borderLight: '#e1e7e2',
    textAccent: '#1e261f',
  }
};

export default function FichaColega() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('charcoal');

  // Load theme from URL or pick a random one
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get('theme');
    if (urlTheme && PALETTES[urlTheme]) {
      setSelectedTheme(urlTheme);
    } else {
      const keys = Object.keys(PALETTES);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      setSelectedTheme(randomKey);
      
      // Update URL with selected random theme silently
      params.set('theme', randomKey);
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
  }, []);

  useEffect(() => {
    supabase.from('properties').select('*').eq('id', id).single()
      .then(({ data }) => { setP(data); setLoading(false); });
  }, [id]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!modal || !p) return;
    const h = e => {
      if (e.key === 'Escape') setModal(false);
      if (e.key === 'ArrowRight') setModalIdx(i => (i + 1) % p.imagenes.length);
      if (e.key === 'ArrowLeft') setModalIdx(i => (i - 1 + p.imagenes.length) % p.imagenes.length);
    };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [modal, p]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-neutral-400 text-sm font-medium tracking-wide">Cargando ficha de propiedad...</div>
      </div>
    );
  }
  
  if (!p) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center flex-col gap-4">
        <div className="text-neutral-400 text-sm font-medium tracking-wide">Propiedad no encontrada</div>
        <button onClick={() => navigate('/')} className="px-5 py-2 border rounded-full text-xs font-semibold hover:bg-neutral-50">
          Volver al catálogo
        </button>
      </div>
    );
  }

  const fmt = () => p.moneda === 'USD' ? `USD ${Number(p.precio).toLocaleString('es-AR')}` : `$${Number(p.precio).toLocaleString('es-AR')}/mes`;
  const mapUrl = p.lat && p.lng ? `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${p.lng}!3d${p.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1` : null;
  const imgs = p.imagenes?.length ? p.imagenes : [];
  const palette = PALETTES[selectedTheme] || PALETTES.charcoal;

  const handleThemeChange = (key) => {
    setSelectedTheme(key);
    const params = new URLSearchParams(window.location.search);
    params.set('theme', key);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openModal = (i) => { setModalIdx(i); setModal(true); };

  return (
    <div 
      className="min-h-screen bg-white text-neutral-800 font-sans antialiased selection:bg-neutral-900 selection:text-white"
      style={{
        '--fc-accent': palette.accent,
        '--fc-accent-hover': palette.accentHover,
        '--fc-bg-light': palette.bgLight,
        '--fc-border-light': palette.borderLight,
        '--fc-text-accent': palette.textAccent,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-10 print:py-2 print:px-0">
        
        {/* Actions Header (hidden in print) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-neutral-100 print:hidden">
          <button 
            onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')} 
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Volver</span>
          </button>
          
          <div className="flex flex-wrap items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            {/* Palette Switcher */}
            <div className="flex items-center gap-2.5">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-400">Diseño:</span>
              <div className="flex gap-1.5">
                {Object.entries(PALETTES).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => handleThemeChange(key)}
                    title={item.name}
                    className={`w-5 h-5 rounded-full border transition-all duration-200 ${
                      selectedTheme === key 
                        ? 'scale-115 ring-2 ring-neutral-400 ring-offset-2' 
                        : 'hover:scale-105'
                    }`}
                    style={{ 
                      backgroundColor: item.accent, 
                      borderColor: item.borderLight 
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Share / Print Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={copyLink} 
                className="flex items-center gap-1.5 px-4.5 py-2 border rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95"
                style={{ 
                  backgroundColor: 'var(--fc-bg-light)', 
                  borderColor: 'var(--fc-border-light)', 
                  color: 'var(--fc-text-accent)' 
                }}
              >
                <Copy size={13} />
                <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
              </button>
              <button 
                onClick={() => window.print()} 
                className="flex items-center gap-1.5 px-4.5 py-2 border border-neutral-200 bg-white hover:bg-neutral-50 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-600 transition-all duration-200 shadow-sm active:scale-95"
              >
                <Printer size={13} />
                <span>Imprimir / PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Title, operation status and price */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[0.62rem] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-neutral-900 text-white">
              {p.operacion}
            </span>
            {p.nuevo_ingreso && (
              <span className="text-[0.62rem] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Nuevo Ingreso
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight mb-3">
            {p.titulo}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <div className="text-[1.85rem] font-black tracking-tight" style={{ color: 'var(--fc-accent)' }}>
              {fmt()}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
              <MapPin size={14} className="opacity-60" />
              <span>{p.tipo} · {p.zona || 'Mar del Plata'}{p.direccion ? `, ${p.direccion}` : ''}</span>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {imgs.length > 0 && (
          <div className="mb-10 print:mb-6">
            {imgs.length === 1 && (
              <div className="rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-neutral-100" onClick={() => openModal(0)}>
                <img src={imgs[0]} alt="Propiedad" className="w-full h-96 object-cover hover:scale-[1.01] transition-transform duration-500" />
              </div>
            )}
            {imgs.length === 2 && (
              <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
                <img src={imgs[0]} alt="Propiedad 1" className="w-full h-80 object-cover cursor-pointer hover:scale-[1.01] transition-transform duration-500" onClick={() => openModal(0)} />
                <img src={imgs[1]} alt="Propiedad 2" className="w-full h-80 object-cover cursor-pointer hover:scale-[1.01] transition-transform duration-500" onClick={() => openModal(1)} />
              </div>
            )}
            {imgs.length >= 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
                <div className="md:col-span-2 cursor-pointer overflow-hidden" onClick={() => openModal(0)}>
                  <img src={imgs[0]} className="w-full h-[400px] object-cover hover:scale-[1.01] transition-transform duration-500" alt="Propiedad Principal" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
                  <img src={imgs[1]} className="w-full h-48 md:h-[195px] object-cover cursor-pointer hover:scale-[1.01] transition-transform duration-500" alt="Propiedad 2" onClick={() => openModal(1)} />
                  {imgs.length === 3 ? (
                    <img src={imgs[2]} className="w-full h-48 md:h-[195px] object-cover cursor-pointer hover:scale-[1.01] transition-transform duration-500" alt="Propiedad 3" onClick={() => openModal(2)} />
                  ) : (
                    <div className="relative cursor-pointer overflow-hidden h-48 md:h-[195px]" onClick={() => openModal(2)}>
                      <img src={imgs[2]} className="w-full h-full object-cover" alt="Propiedad 3" />
                      <div className="absolute inset-0 bg-neutral-950/65 backdrop-blur-[1px] flex items-center justify-center text-white text-lg font-bold">
                        +{imgs.length - 2} fotos
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Characteristics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10 print:mb-6">
          {p.m2_cubiertos > 0 && (
            <div className="bg-neutral-50 border border-neutral-150 rounded-xl p-4 text-center flex flex-col items-center justify-center">
              <Maximize2 size={16} className="text-neutral-400 mb-2" />
              <div className="text-lg font-extrabold text-neutral-900 leading-tight">{p.m2_cubiertos}</div>
              <div className="text-[0.62rem] font-bold uppercase tracking-wider text-neutral-400 mt-1">m² Cubiertos</div>
            </div>
          )}
          {p.m2_lote > 0 && (
            <div className="bg-neutral-50 border border-neutral-150 rounded-xl p-4 text-center flex flex-col items-center justify-center">
              <Layers size={16} className="text-neutral-400 mb-2" />
              <div className="text-lg font-extrabold text-neutral-900 leading-tight">{p.m2_lote}</div>
              <div className="text-[0.62rem] font-bold uppercase tracking-wider text-neutral-400 mt-1">m² Lote</div>
            </div>
          )}
          {p.dormitorios > 0 && (
            <div className="bg-neutral-50 border border-neutral-150 rounded-xl p-4 text-center flex flex-col items-center justify-center">
              <BedDouble size={18} className="text-neutral-400 mb-1.5" />
              <div className="text-lg font-extrabold text-neutral-900 leading-tight">{p.dormitorios}</div>
              <div className="text-[0.62rem] font-bold uppercase tracking-wider text-neutral-400 mt-1">Dormitorios</div>
            </div>
          )}
          {p.banos > 0 && (
            <div className="bg-neutral-50 border border-neutral-150 rounded-xl p-4 text-center flex flex-col items-center justify-center">
              <Bath size={16} className="text-neutral-400 mb-2" />
              <div className="text-lg font-extrabold text-neutral-900 leading-tight">{p.banos}</div>
              <div className="text-[0.62rem] font-bold uppercase tracking-wider text-neutral-400 mt-1">Baños</div>
            </div>
          )}
          {p.ambientes > 0 && (
            <div className="bg-neutral-50 border border-neutral-150 rounded-xl p-4 text-center flex flex-col items-center justify-center">
              <Grid size={16} className="text-neutral-400 mb-2" />
              <div className="text-lg font-extrabold text-neutral-900 leading-tight">{p.ambientes}</div>
              <div className="text-[0.62rem] font-bold uppercase tracking-wider text-neutral-400 mt-1">Ambientes</div>
            </div>
          )}
          {p.cochera && (
            <div className="bg-neutral-50 border border-neutral-150 rounded-xl p-4 text-center flex flex-col items-center justify-center">
              <Car size={16} className="text-neutral-400 mb-2" />
              <div className="text-lg font-extrabold text-neutral-900 leading-tight">Sí</div>
              <div className="text-[0.62rem] font-bold uppercase tracking-wider text-neutral-400 mt-1">Cochera</div>
            </div>
          )}
        </div>

        {/* Two Columns Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 print:gap-4 print:mb-6">
          {/* Main Description */}
          <div className="md:col-span-2">
            <h2 className="text-sm font-black uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
              <span>Descripción</span>
              <span className="flex-1 h-px bg-neutral-100" />
            </h2>
            {p.descripcion ? (
              <div className="text-[0.92rem] leading-relaxed text-neutral-600 space-y-4 whitespace-pre-line font-medium">
                {p.descripcion}
              </div>
            ) : (
              <p className="text-xs text-neutral-400 italic">No hay descripción disponible.</p>
            )}
          </div>

          {/* Technical Info & Amenities */}
          <div className="flex flex-col gap-8">
            {/* Technical Sheet */}
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                <span>Ficha Técnica</span>
                <span className="flex-1 h-px bg-neutral-100" />
              </h2>
              <div className="space-y-2.5">
                {p.antiguedad && (
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100 text-[0.82rem]">
                    <span className="text-neutral-400 font-medium flex items-center gap-1.5"><Calendar size={13} /> Antigüedad</span>
                    <span className="text-neutral-800 font-bold">{p.antiguedad}</span>
                  </div>
                )}
                {p.estado && (
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100 text-[0.82rem]">
                    <span className="text-neutral-400 font-medium flex items-center gap-1.5"><Sparkles size={13} /> Estado</span>
                    <span className="text-neutral-800 font-bold">{p.estado}</span>
                  </div>
                )}
                {p.orientacion && (
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100 text-[0.82rem]">
                    <span className="text-neutral-400 font-medium flex items-center gap-1.5"><Compass size={13} /> Orientación</span>
                    <span className="text-neutral-800 font-bold">{p.orientacion}</span>
                  </div>
                )}
                {p.pisos > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100 text-[0.82rem]">
                    <span className="text-neutral-400 font-medium flex items-center gap-1.5"><Layers3 size={13} /> Pisos</span>
                    <span className="text-neutral-800 font-bold">{p.pisos}</span>
                  </div>
                )}
                {p.m2_cubiertos > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100 text-[0.82rem]">
                    <span className="text-neutral-400 font-medium">Sup. cubierta</span>
                    <span className="text-neutral-800 font-bold">{p.m2_cubiertos} m²</span>
                  </div>
                )}
                {p.m2_lote > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100 text-[0.82rem]">
                    <span className="text-neutral-400 font-medium">Sup. lote</span>
                    <span className="text-neutral-800 font-bold">{p.m2_lote} m²</span>
                  </div>
                )}
              </div>
            </div>

            {/* Amenities Badges */}
            {p.amenities?.length > 0 && (
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                  <span>Comodidades</span>
                  <span className="flex-1 h-px bg-neutral-100" />
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {p.amenities.map(a => (
                    <span 
                      key={a} 
                      className="inline-flex items-center gap-1 px-3 py-1.5 border rounded-full text-xs font-semibold shadow-xs"
                      style={{
                        backgroundColor: 'var(--fc-bg-light)',
                        borderColor: 'var(--fc-border-light)',
                        color: 'var(--fc-text-accent)',
                      }}
                    >
                      <span className="text-xs">{AMENITY_ICONS[a] || '✓'}</span>
                      <span>{a}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Location Map */}
        {mapUrl && (
          <div className="mb-10 print:hidden">
            <h2 className="text-sm font-black uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
              <span>Ubicación</span>
              <span className="flex-1 h-px bg-neutral-100" />
            </h2>
            <div className="h-72 rounded-2xl overflow-hidden border border-neutral-200 shadow-inner">
              <iframe 
                src={mapUrl} 
                allowFullScreen 
                loading="lazy" 
                title="Ubicación de la propiedad"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        )}

        {/* Footer (Sin marcas) */}
        <footer className="mt-16 pt-8 border-t border-neutral-100 text-center flex flex-col items-center justify-center gap-2 print:mt-8 print:pt-4">
          <p className="text-[0.68rem] font-bold tracking-widest uppercase text-neutral-400">
            Ficha de Inmueble para Intercambio Inmobiliario
          </p>
          <p className="text-[0.62rem] text-neutral-400">
            Generada para uso exclusivo entre colegas. Sin datos comerciales ni información de contacto de origen.
          </p>
        </footer>

      </div>

      {/* Gallery Modal / Lightbox */}
      {modal && imgs.length > 0 && (
        <div 
          className="fixed inset-0 z-[10000] bg-neutral-950/96 backdrop-blur-md flex flex-col items-center justify-center select-none"
          onClick={() => setModal(false)}
        >
          {/* Top Bar */}
          <div className="absolute top-0 inset-x-0 h-16 px-6 flex items-center justify-between text-white bg-gradient-to-b from-neutral-950/80 to-transparent">
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">
              {modalIdx + 1} / {imgs.length}
            </span>
            <button 
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white font-bold"
              onClick={() => setModal(false)}
            >
              ✕
            </button>
          </div>

          {/* Main Image */}
          <div className="relative w-full max-w-5xl px-4 flex items-center justify-center">
            <img 
              src={imgs[modalIdx]} 
              alt={`Foto ${modalIdx + 1}`} 
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl animate-fade-in"
              onClick={e => e.stopPropagation()} 
            />
            
            {/* Arrows */}
            <button 
              className="absolute left-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 active:scale-90 transition-all flex items-center justify-center text-white text-xl font-bold"
              onClick={e => { e.stopPropagation(); setModalIdx(i => (i - 1 + imgs.length) % imgs.length); }}
            >
              ‹
            </button>
            <button 
              className="absolute right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 active:scale-90 transition-all flex items-center justify-center text-white text-xl font-bold"
              onClick={e => { e.stopPropagation(); setModalIdx(i => (i + 1) % imgs.length); }}
            >
              ›
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 flex gap-1.5 max-w-[90vw] overflow-x-auto py-2 px-4 scrollbar-none" onClick={e => e.stopPropagation()}>
            {imgs.map((_, i) => (
              <button 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 border-none shrink-0 ${
                  i === modalIdx ? 'bg-white scale-125' : 'bg-white/30'
                }`}
                onClick={() => setModalIdx(i)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}