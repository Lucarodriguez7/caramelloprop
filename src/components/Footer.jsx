import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react'


// Íconos sociales
const IconIG = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
)
const PROPERTY_LINKS = [
    { label: 'Departamentos', to: '/propiedades?tipo=departamento' },
    { label: 'Casas', to: '/propiedades?tipo=casa' },
    { label: 'Locales Comerciales', to: '/propiedades?tipo=local' },
    { label: 'Oficinas Premium', to: '/propiedades?tipo=oficina' },
    { label: 'Lotes y Terrenos', to: '/propiedades?tipo=terreno' },
]

const ZONE_LINKS = [
    { label: 'Güemes', to: '/propiedades?zona=Guemes' },
    { label: 'Playa Grande', to: '/propiedades?zona=Playa Grande' },
    { label: 'Stella Maris', to: '/propiedades?zona=Stella Maris' },
    { label: 'Chauvin', to: '/propiedades?zona=Chauvin' },
    { label: 'La Perla', to: '/propiedades?zona=La perla' },
]

const USEFUL_LINKS = [
    { label: 'Sobre mí', to: '/nosotros' },
    { label: 'Solicitar Tasación', to: '/tasacion' },
    { label: 'Contacto Directo', to: '/contacto' },
    { label: 'Ver Catálogo', to: '/propiedades' },
]

const SOCIALS = [
    { Icon: IconIG, label: 'Instagram', href: 'https://instagram.com/caramellopropiedades3288' },
    { Icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/5492234487206' },
]

const CONTACT_ITEMS = [
    { Icon: MapPin, text: 'Sarmiento 3288 (2A), Mar del Plata' },
    { Icon: Phone, text: '2234487206' },
    { Icon: Mail, text: 'caramellopropiedades@gmail.com' },
    { Icon: Clock, text: 'Lun–Vie 9 a 18 hs · Sáb 9 a 13 hs' },
]

export default function Footer() {
    return (
        <footer className="relative bg-[#0b1622] border-t border-primary/20 pt-16 pb-7 px-[8%] overflow-hidden">
            {/* Textura premium de fondo */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 0%, rgba(18, 100, 95, 0.15), transparent 40%), radial-gradient(circle at 20% 100%, rgba(0, 251, 250, 0.05), transparent 40%)' }}></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] gap-8 mb-11">
                {/* Brand column */}
                <div>
                    <div className="flex items-center mb-5">
                        <img src="/logo.png" alt="Caramello Propiedades" className="h-[50px] w-auto object-contain drop-shadow-xl" />
                    </div>
                    <p className="text-white/70 text-[0.83rem] leading-[1.72] mb-6 max-w-[260px]">
                        Especialista en bienes raíces en Mar del Plata. Brindando un servicio inmobiliario personalizado, profesional y de confianza desde 1998.
                    </p>
                    <div className="flex gap-2">
                        {SOCIALS.map(({ Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white/70 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:border-primary hover:text-textPrimary hover:shadow-[0_4px_12px_rgba(0,251,250,0.2)]"
                            >
                                <Icon size={14} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Propiedades */}
                <div>
                    <h4 className="font-body font-bold text-[0.62rem] tracking-[0.2em] uppercase text-primary mb-4">
                        Propiedades
                    </h4>
                    <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                        {PROPERTY_LINKS.map(item => (
                            <li key={item.label}>
                                <Link
                                    to={item.to}
                                    className="text-[0.83rem] text-white/70 transition-all duration-200 hover:text-primary hover:pl-1.5 no-underline"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Zonas Exclusivas */}
                <div>
                    <h4 className="font-body font-bold text-[0.62rem] tracking-[0.2em] uppercase text-primary mb-4">
                        Zonas VIP
                    </h4>
                    <ul className="flex flex-col gap-3 list-none m-0 p-0">
                        {ZONE_LINKS.map(item => (
                            <li key={item.label}>
                                <Link
                                    to={item.to}
                                    className="text-[0.83rem] text-white/70 transition-all duration-200 hover:text-primary hover:pl-1.5 no-underline flex items-center gap-1.5"
                                >
                                    <MapPin size={10} className="text-primary opacity-50" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Enlaces Útiles */}
                <div>
                    <h4 className="font-body font-bold text-[0.62rem] tracking-[0.2em] uppercase text-primary mb-4">
                        Enlaces
                    </h4>
                    <ul className="flex flex-col gap-3 list-none m-0 p-0">
                        {USEFUL_LINKS.map(item => (
                            <li key={item.label}>
                                <Link
                                    to={item.to}
                                    className="text-[0.83rem] text-white/70 transition-all duration-200 hover:text-primary hover:pl-1.5 no-underline"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contacto */}
                <div>
                    <h4 className="font-body font-bold text-[0.62rem] tracking-[0.2em] uppercase text-primary mb-4">
                        Contacto
                    </h4>
                    <ul className="flex flex-col gap-3 list-none m-0 p-0">
                        {CONTACT_ITEMS.map(({ Icon, text }) => (
                            <li key={text} className="flex items-start gap-3 text-[0.83rem] text-white/80">
                                <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <Icon size={11} className="text-primary" />
                                </div>
                                <span className="mt-0.5 leading-relaxed">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="relative z-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-col gap-1">
                    <p className="text-[0.76rem] text-white/50">
                        © 2025 <span className="text-white font-medium">Caramello Propiedades</span>. Todos los derechos reservados.
                    </p>
                    <p className="text-[0.72rem] text-white/40 tracking-wider">Matrícula CUCICBA Reg 3288</p>
                </div>

                {/* Powered by EnterCompany - Estilo Tech Green */}
                <a
                    href="https://www.entercompany.ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 group no-underline"
                >
                    <span className="text-[0.7rem] text-white/40 font-body uppercase tracking-widest transition-colors group-hover:text-white/60">
                        Powered by
                    </span>
                    <span className="text-[0.75rem] font-black tracking-tighter text-[#00ff41] flex items-center gap-1 group-hover:brightness-110 transition-all">
                        ENTERCOMPANY
                        <ExternalLink size={10} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </span>
                </a>
            </div>
        </footer>
    )
}