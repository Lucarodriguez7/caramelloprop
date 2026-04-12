import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AMENITY_ICONS = {
  'Pileta': '🏊', 'Pileta climatizada': '🏊', 'Jardín': '🌿', 'Quincho': '🔥', 'Parrilla': '🔥',
  'Terraza': '🏗️', 'Balcón': '🌇', 'Cochera': '🚗', 'Baulera': '📦', 'Seguridad 24h': '🛡️',
  'Gimnasio': '💪', 'SUM': '🏠', 'Portería': '🛡️', 'Domótica': '📱', 'Ascensor': '🛗',
  'Laundry': '👕', 'Vista al mar': '🌊', 'Chimenea': '🔥', 'Vestidor': '👔', 'Home cinema': '🎬',
  'Aire acondicionado': '❄️', 'Calefacción': '🌡️', 'Piso radiante': '🌡️',
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
.fc{min-height:100vh;background:#fff;font-family:'Inter',sans-serif;color:#1f2937;}
.fc-inner{max-width:860px;margin:0 auto;padding:40px 24px 60px;}
.fc-header{display:flex;justify-content:flex-end;gap:8px;margin-bottom:32px;padding-bottom:16px;border-bottom:1px solid #f3f4f6;}
.fc-btn{padding:8px 18px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;font-family:'Inter',sans-serif;}
.fc-btn-copy{border:1px solid #bfdbfe;background:#eff6ff;color:#2563eb;}
.fc-btn-copy:hover{background:#dbeafe;}
.fc-btn-print{border:1px solid #e5e7eb;background:#fff;color:#6b7280;}
.fc-btn-print:hover{background:#f9fafb;}
.fc-label{font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#9ca3af;margin-bottom:8px;}
.fc-badge-nuevo{display:inline-block;padding:4px 14px;background:#fef3c7;color:#d97706;border:1px solid #fde68a;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px;}
.fc h1{font-size:clamp(20px,3vw,28px);font-weight:800;margin-bottom:8px;color:#111827;}
.fc-price{font-size:clamp(24px,4vw,32px);font-weight:800;color:#0d9488;margin-bottom:4px;}
.fc-meta{font-size:13px;color:#6b7280;margin-bottom:28px;}

/* Gallery */
.fc-gallery{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:28px;border-radius:12px;overflow:hidden;}
.fc-gallery-img{width:100%;height:220px;object-fit:cover;cursor:pointer;transition:transform .3s;}
.fc-gallery-img:hover{transform:scale(1.02);}
.fc-gallery-img:first-child{grid-row:1/3;height:100%;}
.fc-gallery-more{position:relative;cursor:pointer;}
.fc-gallery-more::after{content:attr(data-count);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);color:#fff;font-size:16px;font-weight:700;font-family:'Inter',sans-serif;}

/* Chars */
.fc-chars{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:10px;margin-bottom:28px;}
.fc-char{padding:16px 12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;text-align:center;}
.fc-char-val{font-size:20px;font-weight:800;color:#0d9488;}
.fc-char-label{font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;margin-top:2px;}

/* Amenities */
.fc-amenities{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;}
.fc-amenity{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:#f0fdfa;border:1px solid #ccfbf1;border-radius:20px;font-size:12px;font-weight:500;color:#0f766e;}

/* Description */
.fc-desc{font-size:14px;line-height:1.85;color:#4b5563;margin-bottom:28px;white-space:pre-line;}

/* Details */
.fc-details{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:28px;}
.fc-detail{display:flex;justify-content:space-between;padding:10px 14px;background:#f9fafb;border-radius:8px;font-size:12px;}
.fc-detail-l{color:#9ca3af;}
.fc-detail-v{font-weight:600;color:#374151;}

/* Map */
.fc-map{height:260px;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;margin-bottom:28px;}
.fc-map iframe{width:100%;height:100%;border:none;}

/* Footer */
.fc-footer{text-align:center;padding:24px;border-top:1px solid #f3f4f6;font-size:11px;color:#d1d5db;margin-top:20px;}

/* Modal */
.fc-modal{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.93);display:flex;align-items:center;justify-content:center;}
.fc-modal img{max-width:90vw;max-height:80vh;object-fit:contain;border-radius:8px;}
.fc-modal-close{position:absolute;top:20px;right:20px;width:44px;height:44px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;color:#fff;font-size:18px;}
.fc-modal-close:hover{background:rgba(255,255,255,0.2);}
.fc-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;color:#fff;font-size:18px;}
.fc-modal-nav:hover{background:rgba(255,255,255,0.15);}
.fc-modal-prev{left:20px;}
.fc-modal-next{right:20px;}
.fc-modal-dots{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);display:flex;gap:8px;}
.fc-modal-dot{width:8px;height:8px;border-radius:50%;border:none;cursor:pointer;padding:0;transition:all .2s;}
.fc-modal-counter{position:absolute;top:24px;left:50%;transform:translateX(-50%);font-size:13px;color:rgba(255,255,255,0.5);font-weight:500;}

@media(max-width:640px){
  .fc-gallery{grid-template-columns:1fr;}.fc-gallery-img:first-child{grid-row:auto;height:220px;}
  .fc-details{grid-template-columns:1fr;}
  .fc-header{justify-content:center;}
}
@media print{
  .fc-header{display:none !important;}
  .fc-modal{display:none !important;}
}
`;

export default function FichaColega() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!document.getElementById('fc-css')) {
      const s = document.createElement('style'); s.id = 'fc-css'; s.textContent = CSS;
      document.head.appendChild(s);
    }
    return () => { const el = document.getElementById('fc-css'); if (el) el.remove(); };
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

  if (loading) return <div className="fc"><div style={{ textAlign: 'center', padding: 80, color: '#9ca3af' }}>Cargando ficha...</div></div>;
  if (!p) return <div className="fc"><div style={{ textAlign: 'center', padding: 80, color: '#9ca3af' }}>Propiedad no encontrada</div></div>;

  const fmt = () => p.moneda === 'USD' ? `USD ${Number(p.precio).toLocaleString('es-AR')}` : `$${Number(p.precio).toLocaleString('es-AR')}/mes`;
  const mapUrl = p.lat && p.lng ? `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${p.lng}!3d${p.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1` : null;
  const imgs = p.imagenes?.length ? p.imagenes : [];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openModal = (i) => { setModalIdx(i); setModal(true); };

  return (
    <div className="fc">
      <div className="fc-inner">
        {/* Header — no logo, just actions */}
        <div className="fc-header">
          <button className={`fc-btn ${copied ? 'fc-btn-copy' : 'fc-btn-copy'}`} onClick={copyLink}>
            {copied ? '✓ Copiado' : 'Copiar link'}
          </button>
          <button className="fc-btn fc-btn-print" onClick={() => window.print()}>Imprimir</button>
        </div>

        {/* Content */}
        <div className="fc-label">Ficha de propiedad</div>
        {p.nuevo_ingreso && <div className="fc-badge-nuevo">Nuevo ingreso</div>}
        <h1>{p.titulo}</h1>
        <div className="fc-price">{fmt()}</div>
        <div className="fc-meta">{p.tipo} en {p.operacion} · {p.zona || 'Mar del Plata'}</div>

        {/* Gallery */}
        {imgs.length > 0 && (
          <div className="fc-gallery">
            {imgs.slice(0, 3).map((img, i) => (
              i === 2 && imgs.length > 3 ? (
                <div key={i} className="fc-gallery-more" data-count={`+${imgs.length - 2}`} onClick={() => openModal(i)}>
                  <img className="fc-gallery-img" src={img} alt="" />
                </div>
              ) : (
                <img key={i} className="fc-gallery-img" src={img} alt="" onClick={() => openModal(i)} />
              )
            ))}
          </div>
        )}

        {/* Characteristics */}
        <div className="fc-chars">
          {p.m2_cubiertos > 0 && <div className="fc-char"><div className="fc-char-val">{p.m2_cubiertos}</div><div className="fc-char-label">m² cubiertos</div></div>}
          {p.m2_lote > 0 && <div className="fc-char"><div className="fc-char-val">{p.m2_lote}</div><div className="fc-char-label">m² lote</div></div>}
          {p.dormitorios > 0 && <div className="fc-char"><div className="fc-char-val">{p.dormitorios}</div><div className="fc-char-label">Dormitorios</div></div>}
          {p.banos > 0 && <div className="fc-char"><div className="fc-char-val">{p.banos}</div><div className="fc-char-label">Baños</div></div>}
          {p.ambientes > 0 && <div className="fc-char"><div className="fc-char-val">{p.ambientes}</div><div className="fc-char-label">Ambientes</div></div>}
          {p.cochera && <div className="fc-char"><div className="fc-char-val">Sí</div><div className="fc-char-label">Cochera</div></div>}
        </div>

        {/* Amenities */}
        {p.amenities?.length > 0 && (
          <div className="fc-amenities">
            {p.amenities.map(a => (
              <span key={a} className="fc-amenity">
                <span>{AMENITY_ICONS[a] || '✓'}</span>
                {a}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {p.descripcion && <div className="fc-desc">{p.descripcion}</div>}

        {/* Details */}
        <div className="fc-details">
          {p.antiguedad && <div className="fc-detail"><span className="fc-detail-l">Antigüedad</span><span className="fc-detail-v">{p.antiguedad}</span></div>}
          {p.estado && <div className="fc-detail"><span className="fc-detail-l">Estado</span><span className="fc-detail-v">{p.estado}</span></div>}
          {p.orientacion && <div className="fc-detail"><span className="fc-detail-l">Orientación</span><span className="fc-detail-v">{p.orientacion}</span></div>}
          {p.pisos > 0 && <div className="fc-detail"><span className="fc-detail-l">Pisos</span><span className="fc-detail-v">{p.pisos}</span></div>}
          {p.m2_cubiertos > 0 && <div className="fc-detail"><span className="fc-detail-l">Sup. cubierta</span><span className="fc-detail-v">{p.m2_cubiertos} m²</span></div>}
          {p.m2_lote > 0 && <div className="fc-detail"><span className="fc-detail-l">Sup. lote</span><span className="fc-detail-v">{p.m2_lote} m²</span></div>}
        </div>

        {/* Map */}
        {mapUrl && <div className="fc-map"><iframe src={mapUrl} allowFullScreen loading="lazy" title="Ubicación" /></div>}

        {/* Footer */}
        <div className="fc-footer">Ficha generada para uso entre colegas · Sin datos comerciales</div>
      </div>

      {/* Gallery Modal */}
      {modal && imgs.length > 0 && (
        <div className="fc-modal" onClick={() => setModal(false)}>
          <div className="fc-modal-counter">{modalIdx + 1} / {imgs.length}</div>
          <img src={imgs[modalIdx]} alt="" onClick={e => e.stopPropagation()} />
          <button className="fc-modal-close" onClick={() => setModal(false)}>✕</button>
          <button className="fc-modal-nav fc-modal-prev" onClick={e => { e.stopPropagation(); setModalIdx(i => (i - 1 + imgs.length) % imgs.length); }}>‹</button>
          <button className="fc-modal-nav fc-modal-next" onClick={e => { e.stopPropagation(); setModalIdx(i => (i + 1) % imgs.length); }}>›</button>
          <div className="fc-modal-dots">
            {imgs.map((_, i) => <button key={i} className="fc-modal-dot" style={{ background: i === modalIdx ? '#0d9488' : 'rgba(255,255,255,0.2)' }} onClick={e => { e.stopPropagation(); setModalIdx(i); }} />)}
          </div>
        </div>
      )}
    </div>
  );
}