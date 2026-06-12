import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, getOptimizedImageUrl } from '../lib/supabaseClient';
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
    bgPage: '#fbfbfb',
    borderLight: '#e4e4e7',
    textAccent: '#09090b',
  },
  petroleum: {
    name: 'Azul Petróleo',
    accent: '#0f2d4a',
    accentHover: '#173f66',
    bgLight: '#f0f5fa',
    bgPage: '#f5f8fa',
    borderLight: '#e2eaf3',
    textAccent: '#0a1c2e',
  },
  beige: {
    name: 'Beige Cálido',
    accent: '#5c4f43',
    accentHover: '#736354',
    bgLight: '#faf6f0',
    bgPage: '#fdfbf9',
    borderLight: '#ebe3d5',
    textAccent: '#3d342c',
  },
  slate: {
    name: 'Gris Slate',
    accent: '#334155', // Slate 700
    accentHover: '#475569',
    bgLight: '#f1f5f9',
    bgPage: '#f8fafc',
    borderLight: '#e2e8f0',
    textAccent: '#0f172a',
  },
  olive: {
    name: 'Verde Oliva',
    accent: '#2e3a2f',
    accentHover: '#3c4d3e',
    bgLight: '#f1f4f1',
    bgPage: '#f7f9f7',
    borderLight: '#e1e7e2',
    textAccent: '#1c241d',
  }
};

const ANIMATION_CSS = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .animate-fade-in-up-delay-1 {
    animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
  }
  .animate-fade-in-up-delay-2 {
    animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
  }
  .animate-fade-in-up-delay-3 {
    animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both;
  }
`;

export default function FichaColega() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('charcoal');
  const [showVolver, setShowVolver] = useState(false);

  // Load animation styles and selected theme
  useEffect(() => {
    if (!document.getElementById('fc-animation-style')) {
      const s = document.createElement('style');
      s.id = 'fc-animation-style';
      s.textContent = ANIMATION_CSS;
      document.head.appendChild(s);
    }

    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get('theme');
    if (urlTheme && PALETTES[urlTheme]) {
      setSelectedTheme(urlTheme);
    } else {
      const keys = Object.keys(PALETTES);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      setSelectedTheme(randomKey);
      params.set('theme', randomKey);
      window.history.replaceState(window.history.state, '', `${window.location.pathname}?${params.toString()}`);
    }

    // Determine if user is navigating in whitelabel mode (checking hostname or ?whitelabel=true)
    const isWhitelabelMode = 
      import.meta.env.VITE_IS_WHITELABEL === 'true' || 
      window.location.hostname.includes('anonimas') || 
      window.location.hostname.includes('listado-inmuebles') || 
      params.get('whitelabel') === 'true';
    
    // In React Router v6, window.history.state has an 'idx' field indicating position in history stack.
    // If idx > 0, the user has internal navigation history (meaning they came from another page in the app, i.e., NeutralPortal).
    const hasHistory = window.history.state && typeof window.history.state.idx === 'number' && window.history.state.idx > 0;
    
    setShowVolver(isWhitelabelMode && hasHistory);

    return () => {
      const el = document.getElementById('fc-animation-style');
      if (el) el.remove();
    };
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
      <div className="min-h-screen bg-[#fbfbfd] flex items-center justify-center">
        <div className="text-neutral-400 text-xs font-semibold tracking-[0.2em] uppercase animate-pulse">Cargando ficha...</div>
      </div>
    );
  }
  
  if (!p) {
    return (
      <div className="min-h-screen bg-[#fbfbfd] flex items-center justify-center flex-col gap-4">
        <div className="text-neutral-400 text-xs font-semibold tracking-[0.2em] uppercase">Propiedad no encontrada</div>
        <button onClick={() => navigate('/')} className="px-6 py-2.5 border border-neutral-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-50 transition-colors">
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
    window.history.replaceState(window.history.state, '', `${window.location.pathname}?${params.toString()}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openModal = (i) => { setModalIdx(i); setModal(true); };

  return (
    <div 
      className="min-h-screen transition-colors duration-[1000ms] text-neutral-800 font-sans antialiased selection:bg-neutral-900 selection:text-white"
      style={{
        backgroundColor: palette.bgPage,
        '--fc-accent': palette.accent,
        '--fc-accent-hover': palette.accentHover,
        '--fc-bg-light': palette.bgLight,
        '--fc-border-light': palette.borderLight,
        '--fc-text-accent': palette.textAccent,
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-10 print:py-2 print:px-0">
        
        {/* Editorial-style Top Bar (hidden in print) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-14 pb-8 border-b border-neutral-200/50 print:hidden animate-fade-in-up">
          {showVolver ? (
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.25em] text-neutral-400 hover:text-neutral-900 transition-colors duration-300"
            >
              <ArrowLeft size={13} strokeWidth={2} />
              <span>Volver</span>
            </button>
          ) : (
            <div />
          )}
          
          <div className="flex flex-wrap items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            {/* Palette Switcher */}
            <div className="flex items-center gap-3">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-neutral-400">Paleta:</span>
              <div className="flex gap-1.5">
                {Object.entries(PALETTES).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => handleThemeChange(key)}
                    title={item.name}
                    className={`w-4 h-4 rounded-full border transition-all duration-300 ${
                      selectedTheme === key 
                        ? 'scale-125 ring-2 ring-neutral-450 ring-offset-2' 
                        : 'hover:scale-110 opacity-70 hover:opacity-100'
                    }`}
                    style={{ 
                      backgroundColor: item.accent, 
                      borderColor: item.borderLight 
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={copyLink} 
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-95"
                style={{ 
                  backgroundColor: 'var(--fc-accent)', 
                  color: '#fff'
                }}
              >
                <Copy size={12} strokeWidth={2} />
                <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
              </button>
              <button 
                onClick={() => window.print()} 
                className="flex items-center gap-2 px-5 py-2.5 border border-neutral-250 bg-white hover:bg-neutral-50 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.2em] text-neutral-500 transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-95"
              >
                <Printer size={12} strokeWidth={2} />
                <span>Imprimir / PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Property Magazine Header Block */}
        <div className="mb-12 animate-fade-in-up-delay-1">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-[0.62rem] font-black tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full bg-neutral-900 text-white">
              {p.operacion}
            </span>
            {p.nuevo_ingreso && (
              <span className="text-[0.62rem] font-black tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-250/40">
                Nuevo Ingreso
              </span>
            )}
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tighter leading-[1.1] mb-6">
            {p.titulo}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 py-6 border-t border-b border-neutral-200/50">
            <div className="text-4xl font-extrabold tracking-tighter" style={{ color: 'var(--fc-accent)' }}>
              {fmt()}
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
              <MapPin size={15} strokeWidth={1.5} className="opacity-80" />
              <span>{p.tipo} · {p.zona || 'Mar del Plata'}{p.direccion ? ` · ${p.direccion}` : ''}</span>
            </div>
          </div>
        </div>

        {/* Asymmetric Mosaic Gallery */}
        {imgs.length > 0 && (
          <div className="mb-12 animate-fade-in-up-delay-2 print:mb-8">
            {imgs.length === 1 && (
              <div className="rounded-3xl overflow-hidden cursor-pointer shadow-md border border-neutral-100/50 bg-neutral-150" onClick={() => openModal(0)}>
                <img src={getOptimizedImageUrl(imgs[0], 1920)} alt="Propiedad" className="w-full h-[460px] object-cover hover:scale-[1.02] transition-transform duration-[1200ms]" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} loading="lazy" />
              </div>
            )}
            {imgs.length === 2 && (
              <div className="grid grid-cols-2 gap-3 rounded-3xl overflow-hidden shadow-md border border-neutral-100/50">
                <img src={getOptimizedImageUrl(imgs[0], 800)} alt="Propiedad 1" className="w-full h-[400px] object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-[1200ms]" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} onClick={() => openModal(0)} loading="lazy" />
                <img src={getOptimizedImageUrl(imgs[1], 800)} alt="Propiedad 2" className="w-full h-[400px] object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-[1200ms]" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} onClick={() => openModal(1)} loading="lazy" />
              </div>
            )}
            {imgs.length >= 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden shadow-sm border border-neutral-100/50 bg-neutral-100/30 p-2">
                <div className="md:col-span-2 h-[320px] md:h-[520px] overflow-hidden rounded-2xl cursor-pointer" onClick={() => openModal(0)}>
                  <img src={getOptimizedImageUrl(imgs[0], 1920)} className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} alt="Propiedad Principal" loading="lazy" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5 h-44 md:h-[520px]">
                  <div className="overflow-hidden rounded-2xl cursor-pointer">
                    <img src={getOptimizedImageUrl(imgs[1], 800)} className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} alt="Propiedad 2" onClick={() => openModal(1)} loading="lazy" />
                  </div>
                  {imgs.length === 3 ? (
                    <div className="overflow-hidden rounded-2xl cursor-pointer">
                      <img src={getOptimizedImageUrl(imgs[2], 800)} className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} alt="Propiedad 3" onClick={() => openModal(2)} loading="lazy" />
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl cursor-pointer group h-full" onClick={() => openModal(2)}>
                      <img src={getOptimizedImageUrl(imgs[2], 800)} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} alt="Propiedad 3" loading="lazy" />
                      <div className="absolute inset-0 bg-neutral-950/45 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-all duration-[600ms] group-hover:bg-neutral-950/55">
                        <span className="text-xl md:text-2xl font-light tracking-wider">+{imgs.length - 2}</span>
                        <span className="text-[0.58rem] md:text-[0.62rem] font-bold uppercase tracking-[0.2em] mt-1 text-white/80">Fotos</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Specifications Editorial Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14 animate-fade-in-up-delay-3 print:mb-8">
          {p.m2_cubiertos > 0 && (
            <div className="bg-white/40 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs">
              <Maximize2 size={16} strokeWidth={1.2} className="text-neutral-400 mb-2.5" />
              <div className="text-xl font-bold tracking-tighter text-neutral-900 leading-none">{p.m2_cubiertos}</div>
              <div className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-neutral-400 mt-2">m² Cubiertos</div>
            </div>
          )}
          {p.m2_lote > 0 && (
            <div className="bg-white/40 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs">
              <Layers size={16} strokeWidth={1.2} className="text-neutral-400 mb-2.5" />
              <div className="text-xl font-bold tracking-tighter text-neutral-900 leading-none">{p.m2_lote}</div>
              <div className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-neutral-400 mt-2">m² Lote</div>
            </div>
          )}
          {p.dormitorios > 0 && (
            <div className="bg-white/40 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs">
              <BedDouble size={18} strokeWidth={1.2} className="text-neutral-400 mb-2" />
              <div className="text-xl font-bold tracking-tighter text-neutral-900 leading-none">{p.dormitorios}</div>
              <div className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-neutral-400 mt-2">Dormitorios</div>
            </div>
          )}
          {p.banos > 0 && (
            <div className="bg-white/40 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs">
              <Bath size={16} strokeWidth={1.2} className="text-neutral-400 mb-2.5" />
              <div className="text-xl font-bold tracking-tighter text-neutral-900 leading-none">{p.banos}</div>
              <div className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-neutral-400 mt-2">Baños</div>
            </div>
          )}
          {p.ambientes > 0 && (
            <div className="bg-white/40 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs">
              <Grid size={16} strokeWidth={1.2} className="text-neutral-400 mb-2.5" />
              <div className="text-xl font-bold tracking-tighter text-neutral-900 leading-none">{p.ambientes}</div>
              <div className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-neutral-400 mt-2">Ambientes</div>
            </div>
          )}
          {p.cochera && (
            <div className="bg-white/40 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs">
              <Car size={16} strokeWidth={1.2} className="text-neutral-400 mb-2.5" />
              <div className="text-xl font-bold tracking-tighter text-neutral-900 leading-none">Sí</div>
              <div className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-neutral-400 mt-2">Cochera</div>
            </div>
          )}
        </div>

        {/* Detailed Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14 print:gap-4 print:mb-8">
          
          {/* Main Description */}
          <div className="md:col-span-2">
            <h2 className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 flex items-center gap-3">
              <span>Descripción del inmueble</span>
              <span className="flex-1 h-px bg-neutral-200/60" />
            </h2>
            {p.descripcion ? (
              <div className="text-[0.95rem] leading-relaxed text-neutral-600 space-y-4 whitespace-pre-line font-normal">
                {p.descripcion}
              </div>
            ) : (
              <p className="text-xs text-neutral-400 italic">No hay descripción disponible.</p>
            )}
          </div>

          {/* Technical Info & Amenities Side Block */}
          <div className="flex flex-col gap-10">
            {/* Technical Sheet */}
            <div>
              <h2 className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 flex items-center gap-3">
                <span>Ficha Técnica</span>
                <span className="flex-1 h-px bg-neutral-200/60" />
              </h2>
              <div className="space-y-3">
                {p.antiguedad && (
                  <div className="flex justify-between items-center py-2.5 border-b border-neutral-200/40 text-[0.8rem]">
                    <span className="text-neutral-400 font-medium flex items-center gap-2"><Calendar size={13} strokeWidth={1.5} /> Antigüedad</span>
                    <span className="text-neutral-900 font-bold">{p.antiguedad}</span>
                  </div>
                )}
                {p.estado && (
                  <div className="flex justify-between items-center py-2.5 border-b border-neutral-200/40 text-[0.8rem]">
                    <span className="text-neutral-400 font-medium flex items-center gap-2"><Sparkles size={13} strokeWidth={1.5} /> Estado</span>
                    <span className="text-neutral-900 font-bold">{p.estado}</span>
                  </div>
                )}
                {p.orientacion && (
                  <div className="flex justify-between items-center py-2.5 border-b border-neutral-200/40 text-[0.8rem]">
                    <span className="text-neutral-400 font-medium flex items-center gap-2"><Compass size={13} strokeWidth={1.5} /> Orientación</span>
                    <span className="text-neutral-900 font-bold">{p.orientacion}</span>
                  </div>
                )}
                {p.pisos > 0 && (
                  <div className="flex justify-between items-center py-2.5 border-b border-neutral-200/40 text-[0.8rem]">
                    <span className="text-neutral-400 font-medium flex items-center gap-2"><Layers3 size={13} strokeWidth={1.5} /> Pisos</span>
                    <span className="text-neutral-900 font-bold">{p.pisos}</span>
                  </div>
                )}
                {p.m2_cubiertos > 0 && (
                  <div className="flex justify-between items-center py-2.5 border-b border-neutral-200/40 text-[0.8rem]">
                    <span className="text-neutral-400 font-medium">Sup. cubierta</span>
                    <span className="text-neutral-900 font-bold">{p.m2_cubiertos} m²</span>
                  </div>
                )}
                {p.m2_lote > 0 && (
                  <div className="flex justify-between items-center py-2.5 border-b border-neutral-200/40 text-[0.8rem]">
                    <span className="text-neutral-400 font-medium">Sup. lote</span>
                    <span className="text-neutral-900 font-bold">{p.m2_lote} m²</span>
                  </div>
                )}
              </div>
            </div>

            {/* Amenities Badges */}
            {p.amenities?.length > 0 && (
              <div>
                <h2 className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 flex items-center gap-3">
                  <span>Comodidades</span>
                  <span className="flex-1 h-px bg-neutral-200/60" />
                </h2>
                <div className="flex flex-wrap gap-2">
                  {p.amenities.map(a => (
                    <span 
                      key={a} 
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 border rounded-full text-xs font-bold tracking-wide shadow-2xs transition-transform duration-200 hover:scale-[1.01]"
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

        {/* Location Map Section */}
        {mapUrl && (
          <div className="mb-14 print:hidden">
            <h2 className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 flex items-center gap-3">
              <span>Ubicación</span>
              <span className="flex-1 h-px bg-neutral-200/60" />
            </h2>
            <div className="h-80 rounded-3xl overflow-hidden border border-neutral-200/50 shadow-inner">
              <iframe 
                src={mapUrl} 
                allowFullScreen 
                loading="lazy" 
                title="Ubicación de la propiedad"
                className="w-full h-full border-none filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        )}

        {/* Elegant Footer (Sin marcas comerciales) */}
        <footer className="mt-20 pt-10 border-t border-neutral-200/50 text-center flex flex-col items-center justify-center gap-2 print:mt-10 print:pt-4">
          <p className="text-[0.68rem] font-bold tracking-[0.25em] uppercase text-neutral-450">
            Ficha de Intercambio Profesional Inmobiliario
          </p>
          <p className="text-[0.62rem] text-neutral-400 tracking-wider">
            Exclusivo para uso entre colegas y profesionales del sector · Documento no comercial y sin datos de contacto del origen.
          </p>
        </footer>

      </div>

      {/* Gallery Lightbox / Fullscreen Modal */}
      {modal && imgs.length > 0 && (
        <div 
          className="fixed inset-0 z-[10000] bg-neutral-950/98 backdrop-blur-lg flex flex-col items-center justify-center select-none"
          onClick={() => setModal(false)}
        >
          {/* Top Bar */}
          <div className="absolute top-0 inset-x-0 h-20 px-8 flex items-center justify-between text-white bg-gradient-to-b from-neutral-950/90 to-transparent">
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-white/50">
              {modalIdx + 1} / {imgs.length}
            </span>
            <button 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/15 hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center text-white"
              onClick={() => setModal(false)}
            >
              ✕
            </button>
          </div>

          {/* Main Image View */}
          <div className="relative w-full max-w-5xl px-6 flex items-center justify-center">
            <img 
              src={getOptimizedImageUrl(imgs[modalIdx], 1920)} 
              alt={`Foto ${modalIdx + 1}`} 
              className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-[600ms] ease-out"
              onClick={e => e.stopPropagation()} 
            />
            
            {/* Nav Arrows */}
            <button 
              className="absolute left-6 w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 active:scale-90 transition-all flex items-center justify-center text-white text-2xl"
              onClick={e => { e.stopPropagation(); setModalIdx(i => (i - 1 + imgs.length) % imgs.length); }}
            >
              ‹
            </button>
            <button 
              className="absolute right-6 w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 active:scale-90 transition-all flex items-center justify-center text-white text-2xl"
              onClick={e => { e.stopPropagation(); setModalIdx(i => (i + 1) % imgs.length); }}
            >
              ›
            </button>
          </div>

          {/* Slide Dots Indicator */}
          <div className="absolute bottom-8 flex gap-1.5 max-w-[90vw] overflow-x-auto py-2 px-4 scrollbar-none" onClick={e => e.stopPropagation()}>
            {imgs.map((_, i) => (
              <button 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 border-none shrink-0 ${
                  i === modalIdx ? 'bg-white scale-150' : 'bg-white/20 hover:bg-white/40'
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