import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const WA = 'https://wa.me/5492234487206';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}

:root{--teal:#0d9488;--teal-light:#14b8a6;--teal-dark:#0f766e;--teal-50:#f0fdfa;--teal-100:#ccfbf1;--gray-50:#f9fafb;--gray-100:#f3f4f6;--gray-200:#e5e7eb;--gray-300:#d1d5db;--gray-400:#9ca3af;--gray-500:#6b7280;--gray-600:#4b5563;--gray-700:#374151;--gray-800:#1f2937;--gray-900:#111827;--white:#fff;--danger:#ef4444;--success:#22c55e;--blue:#3b82f6;}

.cp{min-height:100vh;background:var(--gray-50);font-family:'Inter',sans-serif;color:var(--gray-800);display:flex;}

/* LOGIN */
.cp-login{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f766e 0%,#0d9488 50%,#14b8a6 100%);padding:20px;}
.cp-login-box{width:100%;max-width:400px;background:var(--white);border-radius:20px;padding:40px 32px;box-shadow:0 20px 60px rgba(0,0,0,0.15);}
.cp-login-logo{text-align:center;margin-bottom:28px;}
.cp-login-logo img{height:56px;}
.cp-login-title{font-size:20px;font-weight:700;text-align:center;color:var(--gray-800);margin-bottom:4px;}
.cp-login-sub{font-size:13px;font-weight:400;color:var(--gray-400);text-align:center;margin-bottom:28px;}
.cp-ig{margin-bottom:16px;}
.cp-ig label{font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;color:var(--gray-500);margin-bottom:6px;display:block;}
.cp-input{width:100%;padding:12px 16px;background:var(--gray-50);border:1px solid var(--gray-200);border-radius:10px;color:var(--gray-800);font-family:'Inter',sans-serif;font-size:14px;outline:none;transition:border-color .2s;}
.cp-input:focus{border-color:var(--teal);box-shadow:0 0 0 3px rgba(13,148,136,0.1);}
.cp-input::placeholder{color:var(--gray-400);}
.cp-btn{width:100%;padding:13px;background:var(--teal);border:none;border-radius:10px;color:var(--white);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;margin-top:8px;}
.cp-btn:hover{background:var(--teal-dark);transform:translateY(-1px);box-shadow:0 6px 20px rgba(13,148,136,0.3);}
.cp-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
.cp-error{background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px 14px;font-size:12px;color:var(--danger);margin-bottom:16px;}

/* SIDEBAR */
.cp-sidebar{width:260px;background:var(--white);border-right:1px solid var(--gray-200);display:flex;flex-direction:column;flex-shrink:0;height:100vh;position:sticky;top:0;}
.cp-sidebar-logo{padding:24px;border-bottom:1px solid var(--gray-100);display:flex;align-items:center;gap:12px;}
.cp-sidebar-logo img{height:36px;}
.cp-sidebar-logo span{font-size:14px;font-weight:700;color:var(--gray-800);}
.cp-sidebar-nav{flex:1;padding:16px 12px;display:flex;flex-direction:column;gap:2px;}
.cp-nav{display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:10px;font-size:13px;font-weight:500;color:var(--gray-500);cursor:pointer;transition:all .15s;border:none;background:none;width:100%;text-align:left;}
.cp-nav:hover{color:var(--gray-700);background:var(--gray-50);}
.cp-nav.active{color:var(--teal);background:var(--teal-50);font-weight:600;}
.cp-nav svg{width:18px;height:18px;flex-shrink:0;}
.cp-sidebar-footer{padding:16px;border-top:1px solid var(--gray-100);}
.cp-user{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.cp-avatar{width:32px;height:32px;border-radius:50%;background:var(--teal-100);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--teal-dark);flex-shrink:0;}
.cp-user-name{font-size:12px;font-weight:600;color:var(--gray-700);}
.cp-user-role{font-size:10px;color:var(--gray-400);}
.cp-logout{width:100%;padding:9px;background:var(--gray-50);border:1px solid var(--gray-200);border-radius:8px;color:var(--gray-500);font-family:'Inter',sans-serif;font-size:11px;font-weight:500;cursor:pointer;transition:all .2s;}
.cp-logout:hover{border-color:var(--danger);color:var(--danger);background:#fef2f2;}

/* MAIN */
.cp-main{flex:1;padding:32px;overflow-y:auto;height:100vh;}
.cp-page-title{font-size:22px;font-weight:800;color:var(--gray-900);margin-bottom:4px;}
.cp-page-sub{font-size:13px;color:var(--gray-400);margin-bottom:28px;}

/* STATS */
.cp-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px;}
.cp-stat{padding:22px;background:var(--white);border:1px solid var(--gray-200);border-radius:12px;}
.cp-stat-num{font-size:28px;font-weight:800;color:var(--teal);margin-bottom:2px;}
.cp-stat-label{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gray-400);}

/* TABLE */
.cp-table-wrap{background:var(--white);border:1px solid var(--gray-200);border-radius:12px;overflow:hidden;}
.cp-table-header{display:flex;justify-content:space-between;align-items:center;padding:18px 22px;border-bottom:1px solid var(--gray-100);}
.cp-table-title{font-size:15px;font-weight:700;color:var(--gray-800);}
.cp-btn-new{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;background:var(--teal);border:none;border-radius:8px;color:var(--white);font-family:'Inter',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;}
.cp-btn-new:hover{background:var(--teal-dark);transform:translateY(-1px);}
table.cp-table{width:100%;border-collapse:collapse;}
.cp-table th{padding:10px 18px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gray-400);text-align:left;border-bottom:1px solid var(--gray-100);background:var(--gray-50);}
.cp-table td{padding:12px 18px;font-size:13px;color:var(--gray-600);border-bottom:1px solid var(--gray-50);vertical-align:middle;}
.cp-table tr:hover td{background:var(--gray-50);}
.cp-table-img{width:48px;height:36px;border-radius:6px;object-fit:cover;}
.cp-badge{padding:3px 10px;border-radius:20px;font-size:9px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;}
.cp-badge-pub{background:#dcfce7;color:#16a34a;border:1px solid #bbf7d0;}
.cp-badge-draft{background:var(--gray-100);color:var(--gray-400);border:1px solid var(--gray-200);}
.cp-badge-new{background:#dbeafe;color:#2563eb;border:1px solid #bfdbfe;}
.cp-badge-contacted{background:var(--teal-100);color:var(--teal-dark);border:1px solid #99f6e4;}
.cp-badge-closed{background:#dcfce7;color:#16a34a;border:1px solid #bbf7d0;}
.cp-badge-nuevo{background:#fef3c7;color:#d97706;border:1px solid #fde68a;}
.cp-actions{display:flex;gap:4px;}
.cp-btn-sm{padding:5px 10px;border-radius:6px;font-size:10px;font-weight:600;cursor:pointer;transition:all .15s;border:1px solid var(--gray-200);background:var(--white);color:var(--gray-500);}
.cp-btn-sm:hover{border-color:var(--teal);color:var(--teal);}
.cp-btn-sm-danger:hover{border-color:var(--danger);color:var(--danger);background:#fef2f2;}
.cp-btn-sm-wa{color:#25D366;border-color:#bbf7d0;}
.cp-btn-sm-wa:hover{background:#f0fdf4;border-color:#25D366;}
.cp-btn-sm-ficha{color:var(--blue);border-color:#bfdbfe;}
.cp-btn-sm-ficha:hover{background:#eff6ff;border-color:var(--blue);}
.cp-views{display:inline-flex;align-items:center;gap:4px;font-size:11px;color:var(--gray-400);}

/* EDITOR */
.cp-editor{background:var(--white);border:1px solid var(--gray-200);border-radius:12px;padding:28px;margin-bottom:20px;}
.cp-editor-title{font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid var(--gray-100);}
.cp-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.cp-form-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
.cp-form-full{grid-column:1/-1;}
.cp-select{width:100%;padding:12px 16px;background:var(--gray-50);border:1px solid var(--gray-200);border-radius:10px;color:var(--gray-800);font-family:'Inter',sans-serif;font-size:14px;outline:none;transition:border-color .2s;appearance:none;cursor:pointer;}
.cp-select:focus{border-color:var(--teal);}
.cp-textarea{min-height:100px;resize:vertical;}
.cp-check{display:flex;align-items:center;gap:8px;cursor:pointer;padding:6px 0;user-select:none;}
.cp-check-box{width:20px;height:20px;border:2px solid var(--gray-300);border-radius:5px;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;}
.cp-check-box.on{background:var(--teal);border-color:var(--teal);}
.cp-check-label{font-size:13px;color:var(--gray-600);}

/* Images */
.cp-images{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px;}
.cp-img-item{position:relative;width:110px;height:82px;border-radius:8px;overflow:hidden;border:1px solid var(--gray-200);cursor:grab;}
.cp-img-item:active{cursor:grabbing;}
.cp-img-item img{width:100%;height:100%;object-fit:cover;}
.cp-img-del{position:absolute;top:4px;right:4px;width:20px;height:20px;background:var(--danger);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;}
.cp-img-del:hover{transform:scale(1.1);}
.cp-img-num{position:absolute;bottom:3px;left:3px;width:18px;height:18px;background:rgba(0,0,0,0.6);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;}
.cp-img-upload{width:110px;height:82px;border:2px dashed var(--gray-300);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;transition:all .15s;color:var(--gray-400);font-size:9px;font-weight:600;}
.cp-img-upload:hover{border-color:var(--teal);color:var(--teal);}

/* Map */
.cp-map-wrap{height:320px;border-radius:10px;overflow:hidden;border:1px solid var(--gray-200);margin-top:10px;}
.cp-map-search{position:relative;margin-bottom:8px;}
.cp-map-search input{width:100%;padding:11px 14px 11px 38px;background:var(--gray-50);border:1px solid var(--gray-200);border-radius:10px;color:var(--gray-800);font-family:'Inter',sans-serif;font-size:13px;outline:none;}
.cp-map-search input:focus{border-color:var(--teal);}
.cp-map-search input::placeholder{color:var(--gray-400);}
.cp-map-search svg{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--gray-400);}
.cp-map-suggestions{position:absolute;top:100%;left:0;right:0;background:var(--white);border:1px solid var(--gray-200);border-radius:8px;margin-top:4px;z-index:1000;max-height:200px;overflow-y:auto;box-shadow:0 8px 24px rgba(0,0,0,0.1);}
.cp-map-suggestion{padding:10px 14px;font-size:12px;color:var(--gray-600);cursor:pointer;transition:all .15s;border-bottom:1px solid var(--gray-50);}
.cp-map-suggestion:hover{background:var(--teal-50);color:var(--teal-dark);}
.cp-map-suggestion:last-child{border-bottom:none;}
.cp-map-coords{display:flex;gap:10px;margin-top:6px;font-size:11px;color:var(--gray-400);}
.cp-map-coords span{background:var(--gray-100);padding:3px 8px;border-radius:4px;font-family:monospace;}

.cp-form-actions{display:flex;gap:10px;margin-top:20px;}
.cp-btn-save{padding:12px 32px;background:var(--teal);border:none;border-radius:8px;color:var(--white);font-family:'Inter',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;}
.cp-btn-save:hover{background:var(--teal-dark);transform:translateY(-1px);}
.cp-btn-save:disabled{opacity:.5;cursor:not-allowed;}
.cp-btn-cancel{padding:12px 24px;background:var(--white);border:1px solid var(--gray-200);border-radius:8px;color:var(--gray-500);font-family:'Inter',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;}
.cp-btn-cancel:hover{border-color:var(--gray-300);color:var(--gray-700);}

/* FICHA COLEGA */
.ficha{min-height:100vh;background:#fff;font-family:'Inter',sans-serif;color:#1f2937;padding:40px 20px;}
.ficha-inner{max-width:800px;margin:0 auto;}
.ficha-title{font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#9ca3af;margin-bottom:8px;}
.ficha h1{font-size:24px;font-weight:800;margin-bottom:16px;}
.ficha-gallery{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:24px;border-radius:10px;overflow:hidden;}
.ficha-gallery img{width:100%;height:200px;object-fit:cover;}
.ficha-gallery img:first-child{grid-row:1/3;height:100%;}
.ficha-chars{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin-bottom:24px;}
.ficha-char{padding:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;text-align:center;}
.ficha-char-val{font-size:18px;font-weight:800;color:#0d9488;}
.ficha-char-label{font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;margin-top:2px;}
.ficha-desc{font-size:14px;line-height:1.8;color:#4b5563;margin-bottom:24px;}
.ficha-details{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:24px;}
.ficha-detail{display:flex;justify-content:space-between;padding:8px 12px;background:#f9fafb;border-radius:6px;font-size:12px;}
.ficha-detail-label{color:#9ca3af;}
.ficha-detail-val{font-weight:600;color:#374151;}
.ficha-map{height:250px;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;margin-bottom:24px;}
.ficha-map iframe{width:100%;height:100%;border:none;}
.ficha-footer{text-align:center;padding:20px;border-top:1px solid #e5e7eb;font-size:11px;color:#d1d5db;}
.ficha-price{font-size:28px;font-weight:800;color:#0d9488;margin-bottom:4px;}
.ficha-badge-nuevo{display:inline-block;padding:4px 12px;background:#fef3c7;color:#d97706;border:1px solid #fde68a;border-radius:20px;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px;}

.cp-loading{text-align:center;padding:60px;color:var(--gray-400);font-size:13px;}
.cp-empty{text-align:center;padding:60px;color:var(--gray-400);font-size:13px;}

@media(max-width:900px){
  .cp{flex-direction:column;}
  .cp-sidebar{width:100%;height:auto;position:static;flex-direction:row;align-items:center;padding:12px;border-right:none;border-bottom:1px solid var(--gray-200);}
  .cp-sidebar-nav{flex-direction:row;padding:0;overflow-x:auto;flex:1;}
  .cp-nav{white-space:nowrap;padding:8px 12px;font-size:11px;}
  .cp-sidebar-footer{display:none;}
  .cp-sidebar-logo span{display:none;}
  .cp-main{height:auto;padding:20px;}
  .cp-stats{grid-template-columns:1fr 1fr;}
  .cp-form-grid,.cp-form-grid-3{grid-template-columns:1fr;}
  .ficha-gallery{grid-template-columns:1fr;}
  .ficha-gallery img:first-child{grid-row:auto;}
  .ficha-details{grid-template-columns:1fr;}
}
`;

/* ── MAP ── */
function MapClickHandler({ onMapClick }) { useMapEvents({ click(e) { onMapClick(e.latlng); } }); return null; }
function MapFlyTo({ center }) { const map = useMap(); useEffect(() => { if (center) map.flyTo(center, 16, { duration: 1 }); }, [center, map]); return null; }

function LocationPicker({ lat, lng, onLocationChange, onAddressFound }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [flyCenter, setFlyCenter] = useState(null);
    const [clickAddr, setClickAddr] = useState('');
    const [searching, setSearching] = useState(false);
    const debRef = useRef(null);
    const pos = lat && lng ? [parseFloat(lat), parseFloat(lng)] : null;
    const defCenter = [-38.0055, -57.5426];

    const searchAddr = useCallback(async (q) => {
        if (q.length < 3) { setSuggestions([]); return; }
        setSearching(true);
        const results = [];
        try {
            // Intentar con Photon (mejor para alturas en Argentina)
            const photonQ = q.includes('Mar del Plata') ? q : q + ', Mar del Plata';
            const r1 = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(photonQ)}&lat=-38.0055&lon=-57.5426&limit=5&lang=es`);
            const d1 = await r1.json();
            if (d1?.features?.length) {
                d1.features.forEach(f => {
                    const p = f.properties;
                    const parts = [];
                    if (p.street) parts.push(p.street);
                    if (p.housenumber) parts[0] = (parts[0] || '') + ' ' + p.housenumber;
                    if (p.city) parts.push(p.city);
                    else if (p.state) parts.push(p.state);
                    const display = parts.join(', ') || p.name || '';
                    if (display && f.geometry?.coordinates) {
                        results.push({ display, lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0], source: 'photon' });
                    }
                });
            }
        } catch { }
        try {
            // Fallback: Nominatim con structured query
            const isIntersection = /\s+(y|e|&)\s+/i.test(q);
            let nominatimUrl;
            if (isIntersection) {
                const streets = q.split(/\s+(y|e|&)\s+/i).filter(s => s.length > 1);
                nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&street=${encodeURIComponent(streets[0])}&city=Mar+del+Plata&country=Argentina&limit=4&addressdetails=1`;
            } else {
                nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + ', Mar del Plata, Argentina')}&limit=4&addressdetails=1&viewbox=-57.70,-38.10,-57.40,-37.90&bounded=0`;
            }
            const r2 = await fetch(nominatimUrl);
            const d2 = await r2.json();
            d2.forEach(x => {
                const parts = [];
                if (x.address?.road) parts.push(x.address.road);
                if (x.address?.house_number) parts[0] = (parts[0] || '') + ' ' + x.address.house_number;
                if (x.address?.city || x.address?.town) parts.push(x.address.city || x.address.town);
                const display = parts.join(', ') || x.display_name?.split(',').slice(0, 3).join(',');
                const existing = results.find(r => Math.abs(r.lat - parseFloat(x.lat)) < 0.001 && Math.abs(r.lng - parseFloat(x.lon)) < 0.001);
                if (!existing && display) {
                    results.push({ display, lat: parseFloat(x.lat), lng: parseFloat(x.lon), source: 'nominatim' });
                }
            });
        } catch { }
        setSuggestions(results.slice(0, 6));
        setSearching(false);
    }, []);

    const reverse = useCallback(async (lat, lng) => {
        try {
            const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`);
            const d = await r.json();
            if (d?.address) {
                const parts = [];
                if (d.address.road) parts.push(d.address.road);
                if (d.address.house_number) parts[0] = (parts[0] || '') + ' ' + d.address.house_number;
                if (d.address.suburb || d.address.neighbourhood) parts.push(d.address.suburb || d.address.neighbourhood);
                if (d.address.city || d.address.town) parts.push(d.address.city || d.address.town);
                const a = parts.join(', ') || d.display_name?.split(',').slice(0, 3).join(',');
                setClickAddr(a);
                return a;
            }
        } catch { } setClickAddr(''); return '';
    }, []);

    const handleInput = (val) => {
        setQuery(val);
        setClickAddr('');
        clearTimeout(debRef.current);
        debRef.current = setTimeout(() => searchAddr(val), 350);
    };

    const selectSuggestion = (s) => {
        onLocationChange(s.lat, s.lng);
        setFlyCenter([s.lat, s.lng]);
        setQuery(s.display);
        setSuggestions([]);
        setClickAddr('');
    };

    const handleMapClick = async (latlng) => {
        onLocationChange(latlng.lat, latlng.lng);
        setFlyCenter(null);
        setSuggestions([]);
        const addr = await reverse(latlng.lat, latlng.lng);
        if (addr) setQuery(addr);
    };

    return (
        <>
            <div className="cp-map-search">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                <input placeholder="Ej: Colón 3400 o Güemes y Castelli" value={query} onChange={e => handleInput(e.target.value)} />
                {searching && <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: 'var(--gray-400)' }}>Buscando...</div>}
                {suggestions.length > 0 && (
                    <div className="cp-map-suggestions">
                        {suggestions.map((s, i) => (
                            <div key={i} className="cp-map-suggestion" onClick={() => selectSuggestion(s)}>
                                <span style={{ marginRight: 6, opacity: .5 }}>{s.source === 'photon' ? '📍' : '🗺️'}</span>
                                {s.display.length > 75 ? s.display.slice(0, 75) + '...' : s.display}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {clickAddr && <div style={{ fontSize: 11, color: 'var(--teal)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>📍 {clickAddr} <span style={{ fontSize: 9, color: 'var(--gray-400)', marginLeft: 4 }}>(escribí la dirección exacta en el campo de arriba)</span></div>}
            <div className="cp-map-wrap">
                <MapContainer center={pos || defCenter} zoom={pos ? 16 : 12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
                    <MapClickHandler onMapClick={handleMapClick} />
                    {flyCenter && <MapFlyTo center={flyCenter} />}
                    {pos && <Marker position={pos} />}
                </MapContainer>
            </div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 16 }}>
                {pos && <><span>Lat: <span style={{ background: 'var(--gray-100)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace' }}>{parseFloat(lat).toFixed(6)}</span></span><span>Lng: <span style={{ background: 'var(--gray-100)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace' }}>{parseFloat(lng).toFixed(6)}</span></span></>}
                <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--gray-300)' }}>Click en el mapa = ubicación exacta</span>
            </div>
        </>
    );
}

/* ── MAIN EXPORT ── */
export default function AdminPanel() {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('dashboard');
    const [editId, setEditId] = useState(null);

    useEffect(() => { if (!document.getElementById('cp-css')) { const s = document.createElement('style'); s.id = 'cp-css'; s.textContent = CSS; document.head.appendChild(s); } return () => { const e = document.getElementById('cp-css'); if (e) e.remove(); }; }, []);
    useEffect(() => { supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false); }); const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s)); return () => subscription.unsubscribe(); }, []);
    useEffect(() => { if (!session) { setProfile(null); return; } supabase.from('profiles').select('*').eq('id', session.user.id).single().then(({ data }) => setProfile(data)); }, [session]);

    if (loading) return <div className="cp-login"><div className="cp-loading">Cargando...</div></div>;
    if (!session) return <Login />;

    return (
        <div className="cp">
            <aside className="cp-sidebar">
                <div className="cp-sidebar-logo"><img src="/logo.png" alt="CP" style={{ height: 36 }} /></div>
                <nav className="cp-sidebar-nav">
                    {[{ id: 'dashboard', label: 'Dashboard', icon: <svg viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.3" /><rect x="11" y="2" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.3" /><rect x="2" y="11" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.3" /><rect x="11" y="11" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.3" /></svg> }, { id: 'properties', label: 'Propiedades', icon: <svg viewBox="0 0 20 20" fill="none"><path d="M3 8l7-5 7 5v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.3" /></svg> }, { id: 'leads', label: 'Consultas', icon: <svg viewBox="0 0 20 20" fill="none"><path d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3" /><path d="M2 5l8 5 8-5" stroke="currentColor" strokeWidth="1.3" /></svg> }, { id: 'settings', label: 'Ajustes', icon: <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.3" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> }].map(n => <button key={n.id} className={`cp-nav${view === n.id || (view === 'property-edit' && n.id === 'properties') ? ' active' : ''}`} onClick={() => { setView(n.id); setEditId(null); }}>{n.icon}{n.label}</button>)}
                </nav>
                <div className="cp-sidebar-footer">
                    <div className="cp-user"><div className="cp-avatar">{profile?.nombre?.[0]?.toUpperCase() || 'U'}</div><div><div className="cp-user-name">{profile?.nombre || 'Usuario'}</div><div className="cp-user-role">{profile?.rol || 'admin'}</div></div></div>
                    <button className="cp-logout" onClick={() => supabase.auth.signOut()}>Cerrar sesión</button>
                </div>
            </aside>
            <main className="cp-main">
                {view === 'dashboard' && <Dash setView={setView} />}
                {view === 'properties' && <PropList setView={setView} setEditId={setEditId} />}
                {view === 'property-edit' && <PropEditor id={editId} setView={setView} />}
                {view === 'leads' && <Leads />}
                {view === 'settings' && <Settings profile={profile} setProfile={setProfile} />}
            </main>
        </div>
    );
}

/* ── LOGIN ── */
function Login() {
    const [email, setEmail] = useState(''); const [pass, setPass] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false); const [isReg, setIsReg] = useState(false); const [nombre, setNombre] = useState('');
    const auth = async () => { setError(''); setLoading(true); try { if (isReg) { const { error } = await supabase.auth.signUp({ email, password: pass, options: { data: { nombre } } }); if (error) throw error; } else { const { error } = await supabase.auth.signInWithPassword({ email, password: pass }); if (error) throw error; } } catch (e) { setError(e.message); } setLoading(false); };
    return (<div className="cp-login"><div className="cp-login-box"><div className="cp-login-logo"><img src="/logo.png" alt="Caramello" /></div><div className="cp-login-title">{isReg ? 'Crear cuenta' : 'Panel de Administración'}</div><div className="cp-login-sub">{isReg ? 'Registrate para acceder' : 'Ingresá con tus credenciales'}</div>{error && <div className="cp-error">{error}</div>}{isReg && <div className="cp-ig"><label>Nombre</label><input className="cp-input" value={nombre} onChange={e => setNombre(e.target.value)} /></div>}<div className="cp-ig"><label>Email</label><input className="cp-input" type="email" placeholder="admin@caramello.com" value={email} onChange={e => setEmail(e.target.value)} /></div><div className="cp-ig"><label>Contraseña</label><input className="cp-input" type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && auth()} /></div><button className="cp-btn" onClick={auth} disabled={loading || !email || !pass}>{loading ? 'Cargando...' : isReg ? 'Registrarme' : 'Ingresar'}</button><div style={{ textAlign: 'center', marginTop: 14 }}><button onClick={() => setIsReg(!isReg)} style={{ background: 'none', border: 'none', color: 'var(--teal)', fontSize: 12, cursor: 'pointer' }}>{isReg ? 'Ya tengo cuenta' : '¿No tenés cuenta?'}</button></div></div></div>);
}

/* ── DASHBOARD ── */
function Dash({ setView }) {
    const [s, setS] = useState({ props: 0, pub: 0, leads: 0, newL: 0, views: 0 }); const [recent, setRecent] = useState([]);
    useEffect(() => { (async () => { const { count: p } = await supabase.from('properties').select('*', { count: 'exact', head: true }); const { count: pb } = await supabase.from('properties').select('*', { count: 'exact', head: true }).eq('publicado', true); const { count: l } = await supabase.from('leads').select('*', { count: 'exact', head: true }); const { count: nl } = await supabase.from('leads').select('*', { count: 'exact', head: true }).eq('estado', 'nuevo'); const { data: vd } = await supabase.from('properties').select('views'); const tv = (vd || []).reduce((a, x) => a + (x.views || 0), 0); setS({ props: p || 0, pub: pb || 0, leads: l || 0, newL: nl || 0, views: tv }); const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5); setRecent(data || []); })(); }, []);
    return (<><div className="cp-page-title">Dashboard</div><div className="cp-page-sub">Resumen de tu inmobiliaria</div><div className="cp-stats"><div className="cp-stat"><div className="cp-stat-num">{s.props}</div><div className="cp-stat-label">Propiedades</div></div><div className="cp-stat"><div className="cp-stat-num">{s.pub}</div><div className="cp-stat-label">Publicadas</div></div><div className="cp-stat"><div className="cp-stat-num">{s.views}</div><div className="cp-stat-label">Visitas</div></div><div className="cp-stat"><div className="cp-stat-num">{s.newL}</div><div className="cp-stat-label">Consultas nuevas</div></div></div><div className="cp-table-wrap"><div className="cp-table-header"><span className="cp-table-title">Últimas consultas</span><button className="cp-btn-sm" onClick={() => setView('leads')}>Ver todas →</button></div><table className="cp-table"><thead><tr><th>Nombre</th><th>Teléfono</th><th>Tipo</th><th>Estado</th><th>Fecha</th></tr></thead><tbody>{recent.map(l => <tr key={l.id}><td style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{l.nombre}</td><td>{l.telefono}</td><td><span className="cp-badge cp-badge-pub">{l.tipo}</span></td><td><span className={`cp-badge cp-badge-${l.estado === 'nuevo' ? 'new' : l.estado === 'contactado' ? 'contacted' : 'closed'}`}>{l.estado}</span></td><td>{new Date(l.created_at).toLocaleDateString('es-AR')}</td></tr>)}{recent.length === 0 && <tr><td colSpan={5} className="cp-empty">Sin consultas</td></tr>}</tbody></table></div></>);
}

/* ── PROPERTIES LIST ── */
function PropList({ setView, setEditId }) {
    const [props, setProps] = useState([]); const [loading, setLoading] = useState(true);
    const load = async () => { setLoading(true); const { data } = await supabase.from('properties').select('*').order('created_at', { ascending: false }); setProps(data || []); setLoading(false); };
    useEffect(() => { load(); }, []);
    const del = async (id) => { if (!confirm('¿Eliminar?')) return; await supabase.from('properties').delete().eq('id', id); load(); };
    const togPub = async (id, c) => { await supabase.from('properties').update({ publicado: !c }).eq('id', id); load(); };
    const fmt = (p) => p.moneda === 'USD' ? `USD ${Number(p.precio).toLocaleString('es-AR')}` : `$${Number(p.precio).toLocaleString('es-AR')}`;
    return (<><div className="cp-page-title">Propiedades</div><div className="cp-page-sub">Gestión del catálogo</div><div className="cp-table-wrap"><div className="cp-table-header"><span className="cp-table-title">{props.length} propiedad{props.length !== 1 ? 'es' : ''}</span><button className="cp-btn-new" onClick={() => { setEditId(null); setView('property-edit'); }}>+ Nueva</button></div>{loading ? <div className="cp-loading">Cargando...</div> : <table className="cp-table"><thead><tr><th></th><th>Título</th><th>Precio</th><th>Tipo</th><th>m² Cub.</th><th>m² Lote</th><th>Views</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{props.map(p => <tr key={p.id}><td>{p.imagenes?.[0] ? <img className="cp-table-img" src={p.imagenes[0]} alt="" /> : <div style={{ width: 48, height: 36, background: 'var(--gray-100)', borderRadius: 6 }} />}</td><td style={{ fontWeight: 600, color: 'var(--gray-800)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.titulo}{p.nuevo_ingreso && <span className="cp-badge cp-badge-nuevo" style={{ marginLeft: 6 }}>Nuevo</span>}</td><td>{fmt(p)}</td><td>{p.tipo}</td><td>{p.m2_cubiertos || '-'}</td><td>{p.m2_lote || '-'}</td><td><span className="cp-views"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2" /><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" /></svg>{p.views || 0}</span></td><td><span className={`cp-badge ${p.publicado ? 'cp-badge-pub' : 'cp-badge-draft'}`}>{p.publicado ? 'Publicada' : 'Borrador'}</span></td><td><div className="cp-actions"><button className="cp-btn-sm" onClick={() => { setEditId(p.id); setView('property-edit'); }}>Editar</button><button className="cp-btn-sm cp-btn-sm-ficha" onClick={() => window.open('/ficha/' + p.id, '_blank')}>Ficha</button><button className="cp-btn-sm" onClick={() => togPub(p.id, p.publicado)}>{p.publicado ? 'Ocultar' : 'Publicar'}</button><button className="cp-btn-sm cp-btn-sm-danger" onClick={() => del(p.id)}>Eliminar</button></div></td></tr>)}{props.length === 0 && <tr><td colSpan={9} className="cp-empty">No hay propiedades</td></tr>}</tbody></table>}</div></>);
}

/* ── PROPERTY EDITOR ── */
function PropEditor({ id, setView }) {
    const empty = { titulo: '', descripcion: '', operacion: 'Venta', tipo: 'Casa', precio: '', moneda: 'USD', direccion: '', zona: '', lat: '', lng: '', m2_cubiertos: '', m2_lote: '', ambientes: '', dormitorios: '', banos: '', cochera: false, pisos: '', antiguedad: '', estado: '', orientacion: '', imagenes: [], amenities: [], publicado: true, destacado: false, nuevo_ingreso: false };
    const [f, setF] = useState(empty); const [saving, setSaving] = useState(false); const [uploading, setUploading] = useState(false); const fileRef = useRef(null); const [dragIdx, setDragIdx] = useState(null);
    useEffect(() => { if (!id) { setF(empty); return; } supabase.from('properties').select('*').eq('id', id).single().then(({ data }) => { if (data) setF({ ...empty, ...data, precio: String(data.precio), lat: String(data.lat || ''), lng: String(data.lng || ''), m2_cubiertos: String(data.m2_cubiertos || ''), m2_lote: String(data.m2_lote || ''), ambientes: String(data.ambientes || ''), dormitorios: String(data.dormitorios || ''), banos: String(data.banos || ''), pisos: String(data.pisos || '') }); }); }, [id]);
    const s = (k, v) => setF(p => ({ ...p, [k]: v }));
    const upload = async (files) => { setUploading(true); const urls = [...f.imagenes]; for (const file of files) { const ext = file.name.split('.').pop(); const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`; const { error } = await supabase.storage.from('property-images').upload(path, file); if (!error) { const { data } = supabase.storage.from('property-images').getPublicUrl(path); urls.push(data.publicUrl); } } s('imagenes', urls); setUploading(false); };
    const save = async () => { setSaving(true); const p = { ...f, precio: Number(f.precio) || 0, lat: Number(f.lat) || null, lng: Number(f.lng) || null, m2_cubiertos: Number(f.m2_cubiertos) || 0, m2_lote: Number(f.m2_lote) || 0, ambientes: Number(f.ambientes) || 0, dormitorios: Number(f.dormitorios) || 0, banos: Number(f.banos) || 0, pisos: Number(f.pisos) || 0 }; delete p.id; delete p.created_at; delete p.updated_at; delete p.slug; delete p.created_by; delete p.views; if (id) await supabase.from('properties').update(p).eq('id', id); else await supabase.from('properties').insert(p); setSaving(false); setView('properties'); };
    const Check = ({ k, label }) => <div className="cp-check" onClick={() => s(k, !f[k])}><div className={`cp-check-box${f[k] ? ' on' : ''}`}>{f[k] && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>}</div><span className="cp-check-label">{label}</span></div>;

    return (<>
        <div className="cp-page-title">{id ? 'Editar' : 'Nueva'} propiedad</div><div className="cp-page-sub">{id ? 'Modificá y guardá' : 'Completá la información'}</div>
        <div className="cp-editor"><div className="cp-editor-title">Información principal</div><div className="cp-form-grid">
            <div className="cp-ig cp-form-full"><label>Título *</label><input className="cp-input" placeholder="Ej: Casa con pileta en Playa Grande" value={f.titulo} onChange={e => s('titulo', e.target.value)} /></div>
            <div className="cp-ig"><label>Operación *</label><select className="cp-select" value={f.operacion} onChange={e => s('operacion', e.target.value)}><option>Venta</option><option>Alquiler</option><option>Alquiler Temporal</option></select></div>
            <div className="cp-ig"><label>Tipo *</label><select className="cp-select" value={f.tipo} onChange={e => s('tipo', e.target.value)}><option>Casa</option><option>Departamento</option><option>PH</option><option>Terreno</option><option>Local</option><option>Oficina</option><option>Cochera</option><option>Depósito</option></select></div>
            <div className="cp-ig"><label>Precio *</label><input className="cp-input" type="number" placeholder="150000" value={f.precio} onChange={e => s('precio', e.target.value)} /></div>
            <div className="cp-ig"><label>Moneda</label><select className="cp-select" value={f.moneda} onChange={e => s('moneda', e.target.value)}><option>USD</option><option>ARS</option></select></div>
            <div className="cp-ig cp-form-full"><label>Descripción</label><textarea className="cp-input cp-textarea" placeholder="Descripción detallada..." value={f.descripcion} onChange={e => s('descripcion', e.target.value)} /></div>
        </div></div>

        <div className="cp-editor"><div className="cp-editor-title">Ubicación</div><div className="cp-form-grid" style={{ marginBottom: 14 }}>
            <div className="cp-ig"><label>Dirección</label><input className="cp-input" placeholder="Av. Colón 1234" value={f.direccion} onChange={e => s('direccion', e.target.value)} /></div>
            <div className="cp-ig"><label>Zona / Barrio</label><select className="cp-select" value={f.zona} onChange={e => s('zona', e.target.value)}><option value="">Seleccionar zona</option><option>Güemes</option><option>Aldrey</option><option>Plaza Mitre</option><option>Stella Maris</option><option>Playa Grande</option><option>Chauvin</option><option>Macro centro</option><option>Varese</option><option>Playa chica</option><option>Alem</option><option>Divino Rostro</option><option>La perla</option><option>Rumenco</option><option>Rumenco Joven</option></select></div>
        </div><div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 8 }}>Click en el mapa o buscá una dirección</div>
            <LocationPicker lat={f.lat} lng={f.lng} onLocationChange={(lat, lng) => { s('lat', String(lat)); s('lng', String(lng)); }} onAddressFound={a => { if (!f.direccion) s('direccion', a); }} /></div>

        <div className="cp-editor"><div className="cp-editor-title">Características</div><div className="cp-form-grid-3">
            <div className="cp-ig"><label>m² Cubiertos</label><input className="cp-input" type="number" value={f.m2_cubiertos} onChange={e => s('m2_cubiertos', e.target.value)} /></div>
            <div className="cp-ig"><label>m² Lote</label><input className="cp-input" type="number" value={f.m2_lote} onChange={e => s('m2_lote', e.target.value)} /></div>
            <div className="cp-ig"><label>Ambientes</label><input className="cp-input" type="number" value={f.ambientes} onChange={e => s('ambientes', e.target.value)} /></div>
            <div className="cp-ig"><label>Dormitorios</label><input className="cp-input" type="number" value={f.dormitorios} onChange={e => s('dormitorios', e.target.value)} /></div>
            <div className="cp-ig"><label>Baños</label><input className="cp-input" type="number" value={f.banos} onChange={e => s('banos', e.target.value)} /></div>
            <div className="cp-ig"><label>Pisos</label><input className="cp-input" type="number" value={f.pisos} onChange={e => s('pisos', e.target.value)} /></div>
            <div className="cp-ig"><label>Antigüedad</label><input className="cp-input" placeholder="5 años" value={f.antiguedad} onChange={e => s('antiguedad', e.target.value)} /></div>
            <div className="cp-ig"><label>Estado</label><input className="cp-input" placeholder="Excelente" value={f.estado} onChange={e => s('estado', e.target.value)} /></div>
            <div className="cp-ig"><label>Orientación</label><input className="cp-input" placeholder="Norte" value={f.orientacion} onChange={e => s('orientacion', e.target.value)} /></div>
        </div><div style={{ display: 'flex', gap: 20, marginTop: 14, flexWrap: 'wrap' }}>
                <Check k="cochera" label="Cochera" /><Check k="destacado" label="Destacada" /><Check k="publicado" label="Publicada" /><Check k="nuevo_ingreso" label="⭐ Nuevo ingreso" />
            </div>

            <div style={{ marginTop: 20, borderTop: '1px solid var(--gray-200)', paddingTop: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.5px', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 10, display: 'block' }}>Amenities</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['Pileta', 'Pileta climatizada', 'Jardín', 'Quincho', 'Parrilla', 'Terraza', 'Balcón', 'Cochera', 'Baulera', 'Seguridad 24h', 'Gimnasio', 'SUM', 'Portería', 'Domótica', 'Ascensor', 'Laundry', 'Vista al mar', 'Chimenea', 'Vestidor', 'Home cinema', 'Aire acondicionado', 'Calefacción', 'Piso radiante'].map(a => (
                        <button key={a} type="button" onClick={() => s('amenities', f.amenities?.includes(a) ? f.amenities.filter(x => x !== a) : [...(f.amenities || []), a])}
                            style={{
                                padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all .15s',
                                border: f.amenities?.includes(a) ? '1px solid var(--teal)' : '1px solid var(--gray-200)',
                                background: f.amenities?.includes(a) ? 'var(--teal-50)' : 'var(--white)',
                                color: f.amenities?.includes(a) ? 'var(--teal-dark)' : 'var(--gray-500)',
                            }}>
                            {f.amenities?.includes(a) ? '✓ ' : ''}{a}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="cp-editor"><div className="cp-editor-title">Imágenes {uploading && <span style={{ fontSize: 11, color: 'var(--teal)', fontWeight: 400 }}>(subiendo...)</span>}</div><div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 10 }}>Arrastrá para reordenar. La primera es la principal.</div>
            <div className="cp-images">{f.imagenes.map((url, i) => <div key={i} className="cp-img-item" draggable onDragStart={() => setDragIdx(i)} onDragOver={e => { e.preventDefault(); if (dragIdx === null || dragIdx === i) return; const imgs = [...f.imagenes]; const [m] = imgs.splice(dragIdx, 1); imgs.splice(i, 0, m); s('imagenes', imgs); setDragIdx(i); }} onDragEnd={() => setDragIdx(null)} style={{ opacity: dragIdx === i ? .5 : 1 }}><img src={url} alt="" /><div className="cp-img-num">{i + 1}</div><button className="cp-img-del" onClick={() => s('imagenes', f.imagenes.filter((_, j) => j !== i))}><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1l-6 6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" /></svg></button></div>)}
                <div className="cp-img-upload" onClick={() => fileRef.current?.click()}><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>Subir</div>
                <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={e => { if (e.target.files.length) upload(Array.from(e.target.files)); e.target.value = ''; }} /></div></div>

        <div className="cp-form-actions"><button className="cp-btn-save" onClick={save} disabled={saving || !f.titulo || !f.precio}>{saving ? 'Guardando...' : id ? 'Guardar' : 'Crear propiedad'}</button><button className="cp-btn-cancel" onClick={() => setView('properties')}>Cancelar</button></div>
    </>);
}

/* ── LEADS ── */
function Leads() {
    const [leads, setLeads] = useState([]); const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);
    const load = async () => { setLoading(true); const { data } = await supabase.from('leads').select('*,properties(titulo)').order('created_at', { ascending: false }); setLeads(data || []); setLoading(false); };
    useEffect(() => { load(); }, []);
    const upd = async (id, est) => { await supabase.from('leads').update({ estado: est }).eq('id', id); load(); };
    const wa = (l) => { const m = encodeURIComponent(`Hola ${l.nombre}, te contactamos desde Caramello Propiedades por tu consulta${l.properties?.titulo ? ` sobre "${l.properties.titulo}"` : ''}.`); return `https://wa.me/${l.telefono.replace(/[^0-9]/g, '')}?text=${m}`; };
    return (<>
        <div className="cp-page-title">Consultas</div>
        <div className="cp-page-sub">Todas las consultas recibidas</div>
        <div className="cp-table-wrap">
            <div className="cp-table-header"><span className="cp-table-title">{leads.length} consulta{leads.length !== 1 ? 's' : ''}</span></div>
            {loading ? <div className="cp-loading">Cargando...</div> : <table className="cp-table">
                <thead><tr><th>Nombre</th><th>Teléfono</th><th>Tipo</th><th>Propiedad</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead>
                <tbody>{leads.map(l => <tr key={l.id} style={{ cursor: 'pointer' }} onClick={() => setDetail(l)}>
                    <td style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{l.nombre}</td>
                    <td>{l.telefono}</td>
                    <td><span className="cp-badge cp-badge-pub">{l.tipo}</span></td>
                    <td style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.properties?.titulo || '-'}</td>
                    <td onClick={e => e.stopPropagation()}><select className="cp-select" style={{ padding: '5px 8px', fontSize: 10, minWidth: 110 }} value={l.estado} onChange={e => upd(l.id, e.target.value)}><option value="nuevo">Nuevo</option><option value="contactado">Contactado</option><option value="en_proceso">En proceso</option><option value="cerrado">Cerrado</option></select></td>
                    <td>{new Date(l.created_at).toLocaleDateString('es-AR')}</td>
                    <td onClick={e => e.stopPropagation()}><a href={wa(l)} target="_blank" rel="noreferrer" className="cp-btn-sm cp-btn-sm-wa" style={{ textDecoration: 'none' }}>WhatsApp</a></td>
                </tr>)}{leads.length === 0 && <tr><td colSpan={7} className="cp-empty">Sin consultas</td></tr>}</tbody>
            </table>}
        </div>

        {/* Modal de detalle */}
        {detail && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setDetail(null)}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
                <div onClick={e => e.stopPropagation()} style={{ position: 'relative', background: '#fff', borderRadius: 16, padding: 32, maxWidth: 520, width: '90%', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.15)' }}>
                    <button onClick={() => setDetail(null)} style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--gray-200)', background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, color: 'var(--gray-400)' }}>✕</button>

                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>Detalle de consulta</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 4 }}>{detail.nombre}</div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                        <span className="cp-badge cp-badge-pub">{detail.tipo}</span>
                        <span className={`cp-badge cp-badge-${detail.estado === 'nuevo' ? 'new' : detail.estado === 'contactado' ? 'contacted' : 'closed'}`}>{detail.estado}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                        <div style={{ padding: '12px 14px', background: 'var(--gray-50)', borderRadius: 10, border: '1px solid var(--gray-200)' }}>
                            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>Teléfono</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>{detail.telefono}</div>
                        </div>
                        <div style={{ padding: '12px 14px', background: 'var(--gray-50)', borderRadius: 10, border: '1px solid var(--gray-200)' }}>
                            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>Email</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>{detail.email || '-'}</div>
                        </div>
                        <div style={{ padding: '12px 14px', background: 'var(--gray-50)', borderRadius: 10, border: '1px solid var(--gray-200)' }}>
                            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>Fecha</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>{new Date(detail.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                        </div>
                        <div style={{ padding: '12px 14px', background: 'var(--gray-50)', borderRadius: 10, border: '1px solid var(--gray-200)' }}>
                            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>Propiedad</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>{detail.properties?.titulo || 'No especificada'}</div>
                        </div>
                    </div>

                    {detail.mensaje && (
                        <div style={{ marginBottom: 20 }}>
                            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 6 }}>Mensaje</div>
                            <div style={{ padding: '14px 16px', background: 'var(--gray-50)', borderRadius: 10, border: '1px solid var(--gray-200)', fontSize: 13, lineHeight: 1.7, color: 'var(--gray-600)', whiteSpace: 'pre-line' }}>{detail.mensaje}</div>
                        </div>
                    )}

                    {detail.tasacion_data && (
                        <div style={{ marginBottom: 20 }}>
                            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 10 }}>Datos de tasación</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                {detail.tasacion_data.motivo && <div style={{ padding: '10px 12px', background: 'var(--teal-50)', borderRadius: 8, border: '1px solid #ccfbf1' }}><div style={{ fontSize: 9, fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>Motivo</div><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{detail.tasacion_data.motivo}</div></div>}
                                {detail.tasacion_data.tipo_propiedad && <div style={{ padding: '10px 12px', background: 'var(--teal-50)', borderRadius: 8, border: '1px solid #ccfbf1' }}><div style={{ fontSize: 9, fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>Tipo</div><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{detail.tasacion_data.tipo_propiedad}</div></div>}
                                {detail.tasacion_data.m2 && <div style={{ padding: '10px 12px', background: 'var(--teal-50)', borderRadius: 8, border: '1px solid #ccfbf1' }}><div style={{ fontSize: 9, fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>Superficie</div><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{detail.tasacion_data.m2} m²</div></div>}
                                {detail.tasacion_data.m2_lote && <div style={{ padding: '10px 12px', background: 'var(--teal-50)', borderRadius: 8, border: '1px solid #ccfbf1' }}><div style={{ fontSize: 9, fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>Lote</div><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{detail.tasacion_data.m2_lote} m²</div></div>}
                                {detail.tasacion_data.dormitorios && <div style={{ padding: '10px 12px', background: 'var(--teal-50)', borderRadius: 8, border: '1px solid #ccfbf1' }}><div style={{ fontSize: 9, fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>Dormitorios</div><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{detail.tasacion_data.dormitorios}</div></div>}
                                {detail.tasacion_data.banos && <div style={{ padding: '10px 12px', background: 'var(--teal-50)', borderRadius: 8, border: '1px solid #ccfbf1' }}><div style={{ fontSize: 9, fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>Baños</div><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{detail.tasacion_data.banos}</div></div>}
                                {detail.tasacion_data.antiguedad && <div style={{ padding: '10px 12px', background: 'var(--teal-50)', borderRadius: 8, border: '1px solid #ccfbf1' }}><div style={{ fontSize: 9, fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>Antigüedad</div><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{detail.tasacion_data.antiguedad}</div></div>}
                                {detail.tasacion_data.direccion && <div style={{ padding: '10px 12px', background: 'var(--teal-50)', borderRadius: 8, border: '1px solid #ccfbf1', gridColumn: '1/-1' }}><div style={{ fontSize: 9, fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>Dirección</div><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{detail.tasacion_data.direccion}</div></div>}
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: 8 }}>
                        <a href={wa(detail)} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '12px', background: '#25D366', color: '#fff', borderRadius: 10, textAlign: 'center', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'all .2s' }}>WhatsApp</a>
                        {detail.telefono && <a href={`tel:${detail.telefono}`} style={{ flex: 1, padding: '12px', background: 'var(--gray-50)', color: 'var(--gray-700)', border: '1px solid var(--gray-200)', borderRadius: 10, textAlign: 'center', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Llamar</a>}
                    </div>
                </div>
            </div>
        )}
    </>);
}

/* ── SETTINGS ── */
function Settings({ profile, setProfile }) {
    const [n, setN] = useState(profile?.nombre || ''); const [saving, setSaving] = useState(false); const [msg, setMsg] = useState('');
    const save = async () => { setSaving(true); await supabase.from('profiles').update({ nombre: n }).eq('id', profile.id); setProfile({ ...profile, nombre: n }); setMsg('Guardado'); setSaving(false); setTimeout(() => setMsg(''), 2000); };
    return (<><div className="cp-page-title">Ajustes</div><div className="cp-page-sub">Configuración de tu cuenta</div><div className="cp-editor" style={{ maxWidth: 460 }}><div className="cp-editor-title">Perfil</div><div className="cp-ig"><label>Nombre</label><input className="cp-input" value={n} onChange={e => setN(e.target.value)} /></div><div className="cp-ig"><label>Email</label><input className="cp-input" value={profile?.email || ''} disabled style={{ opacity: .5 }} /></div><div className="cp-form-actions"><button className="cp-btn-save" onClick={save} disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>{msg && <span style={{ color: 'var(--success)', fontSize: 12, alignSelf: 'center' }}>{msg}</span>}</div></div></>);
}