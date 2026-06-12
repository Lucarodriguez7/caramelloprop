import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, getOptimizedImageUrl } from '../lib/supabaseClient';
import { Search, MapPin, Maximize2, BedDouble, Bath, SlidersHorizontal, Home, ArrowUpRight } from 'lucide-react';

export default function NeutralPortal() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOp, setFilterOp] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterZone, setFilterZone] = useState('all');
  const [zones, setZones] = useState([]);

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('publicado', true)
        .order('created_at', { ascending: false });

      if (data) {
        setProperties(data);
        // Extract unique zones
        const uniqueZones = [...new Set(data.map(p => p.zona).filter(Boolean))];
        setZones(uniqueZones);
      }
      setLoading(false);
    }
    loadProperties();
  }, []);

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.direccion && p.direccion.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesOp = filterOp === 'all' || p.operacion === filterOp;
    const matchesType = filterType === 'all' || p.tipo === filterType;
    const matchesZone = filterZone === 'all' || p.zona === filterZone;
    return matchesSearch && matchesOp && matchesType && matchesZone;
  });

  const formatPrice = (p) => {
    return p.moneda === 'USD'
      ? `USD ${Number(p.precio).toLocaleString('es-AR')}`
      : `$${Number(p.precio).toLocaleString('es-AR')}/mes`;
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans selection:bg-neutral-800 selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-bold text-sm">
              H
            </div>
            <span className="font-semibold text-[0.85rem] tracking-[0.2em] uppercase text-neutral-900">
              Catálogo Inmobiliario
            </span>
          </div>
          <div className="text-xs text-neutral-400 font-medium">
            Uso exclusivo para colegas
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-3">
            Buscador de Propiedades
          </h1>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Consulte la lista completa de inmuebles disponibles. Comparta fichas whitelabel directamente con sus clientes sin marcas ni datos comerciales de origen.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative md:col-span-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <input
                type="text"
                placeholder="Buscar por título o calle..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
              />
            </div>

            {/* Operation Filter */}
            <div>
              <select
                value={filterOp}
                onChange={e => setFilterOp(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-900 transition-colors cursor-pointer"
              >
                <option value="all">Todas las operaciones</option>
                <option value="Venta">Venta</option>
                <option value="Alquiler">Alquiler</option>
                <option value="Alquiler Temporal">Alquiler Temporal</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-900 transition-colors cursor-pointer"
              >
                <option value="all">Todos los tipos</option>
                <option value="Casa">Casa</option>
                <option value="Departamento">Departamento</option>
                <option value="PH">PH</option>
                <option value="Terreno">Terreno</option>
                <option value="Local">Local</option>
                <option value="Oficina">Oficina</option>
              </select>
            </div>

            {/* Zone Filter */}
            <div>
              <select
                value={filterZone}
                onChange={e => setFilterZone(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-900 transition-colors cursor-pointer"
              >
                <option value="all">Todas las zonas</option>
                {zones.map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results grid */}
        {loading ? (
          <div className="py-20 text-center text-sm text-neutral-400 font-medium">
            Cargando catálogo...
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-neutral-300 rounded-2xl bg-white">
            <p className="text-sm text-neutral-400 font-medium mb-1">No se encontraron propiedades</p>
            <p className="text-xs text-neutral-400">Pruebe modificando los filtros de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(p => (
              <div
                key={p.id}
                onClick={() => navigate(`/ficha/${p.id}`)}
                className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-neutral-100">
                  {p.imagenes?.[0] ? (
                    <img
                      src={getOptimizedImageUrl(p.imagenes[0], 800)}
                      alt={p.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Home size={32} strokeWidth={1.2} />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 text-[0.62rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-neutral-900 text-white">
                    {p.operacion}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-widest uppercase text-neutral-400 mb-2">
                    <span>{p.tipo}</span>
                    {p.zona && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-neutral-300" />
                        <span>{p.zona}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-bold text-neutral-900 text-[0.95rem] leading-snug mb-2 group-hover:text-neutral-700 transition-colors">
                    {p.titulo}
                  </h3>

                  {p.direccion && (
                    <div className="flex items-center gap-1 text-[0.78rem] text-neutral-400 mb-4">
                      <MapPin size={12} className="shrink-0" />
                      <span className="truncate">{p.direccion}</span>
                    </div>
                  )}

                  {/* Specs */}
                  <div className="flex gap-4 py-3 border-t border-b border-neutral-100 mb-4 text-[0.78rem] text-neutral-500 mt-auto">
                    {p.dormitorios > 0 && (
                      <span className="flex items-center gap-1">
                        <BedDouble size={13} className="opacity-70" /> {p.dormitorios} dorm.
                      </span>
                    )}
                    {p.banos > 0 && (
                      <span className="flex items-center gap-1">
                        <Bath size={13} className="opacity-70" /> {p.banos} {p.banos === 1 ? 'baño' : 'baños'}
                      </span>
                    )}
                    {p.m2_cubiertos > 0 && (
                      <span className="flex items-center gap-1">
                        <Maximize2 size={12} className="opacity-70" /> {p.m2_cubiertos} m²
                      </span>
                    )}
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-black text-neutral-900 text-[1.1rem]">
                      {formatPrice(p)}
                    </span>
                    <span className="text-neutral-900 font-bold text-[0.68rem] tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Ver ficha <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-8 mt-20 text-center">
        <p className="text-[0.7rem] text-neutral-400 font-medium tracking-wider uppercase">
          Catálogo anónimo exclusivo para profesionales inmobiliarios
        </p>
      </footer>
    </div>
  );
}
