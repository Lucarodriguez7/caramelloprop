import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react'
import LogoIcon from './LogoIcon'

// Íconos sociales
const IconIG = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
)
const IconFB = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
)

const PROPERTY_LINKS = ['En venta', 'En alquiler', 'Alquiler temporario', 'Comerciales', 'Countries']
const SERVICE_LINKS = ['Compra y venta', 'Administración', 'Tasaciones', 'Asesoramiento legal', 'Inversiones']

const SOCIALS = [
    { Icon: IconIG, label: 'Instagram', href: '#' },
    { Icon: IconFB, label: 'Facebook', href: '#' },
    { Icon: MessageCircle, label: 'WhatsApp', href: '#' },
]

const CONTACT_ITEMS = [
    { Icon: MapPin, text: 'Sarmiento 3288 (2A), Mar del Plata' },
    { Icon: Phone, text: '2234487206' },
    { Icon: Mail, text: 'caramellopropiedades@gmail.com' },
    { Icon: Clock, text: 'Lun–Vie 9 a 18 hs · Sáb 9 a 13 hs' },
]

export default function Footer() {
    return (
        <footer className="bg-textPrimary border-t border-primary/10 pt-14 pb-7 px-[8%]">
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-9 mb-11">
                {/* Brand column */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <LogoIcon size={34} />
                        <div className="flex flex-col leading-none">
                            <span className="font-display font-bold text-[0.9rem] text-white">Caramello</span>
                            <span className="font-display font-normal text-[0.58rem] text-primary tracking-[0.22em] uppercase mt-0.5">Propiedades</span>
                        </div>
                    </div>
                    {/* MEJORA: Subimos opacidad de white/45 a white/70 para legibilidad */}
                    <p className="text-white/70 text-[0.83rem] leading-[1.72] mb-5 max-w-[250px]">
                        La llave para la felicidad empieza con la elección correcta de un hogar. Nuestra trayectoria desde 1998 acompaña a familias y empresas.
                    </p>
                    <div className="flex gap-2">
                        {SOCIALS.map(({ Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 text-white/70 transition-all duration-300 hover:bg-primary hover:border-primary hover:text-textPrimary"
                            >
                                <Icon size={14} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Propiedades */}
                <div>
                    <h4 className="font-display font-bold text-[0.62rem] tracking-[0.2em] uppercase text-primary mb-4">
                        Propiedades
                    </h4>
                    <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                        {PROPERTY_LINKS.map(item => (
                            <li key={item}>
                                <Link
                                    to="/propiedades"
                                    className="text-[0.83rem] text-white/70 transition-all duration-200 hover:text-primary hover:pl-1.5 no-underline"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Servicios */}
                <div>
                    <h4 className="font-display font-bold text-[0.62rem] tracking-[0.2em] uppercase text-primary mb-4">
                        Servicios
                    </h4>
                    <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                        {SERVICE_LINKS.map(item => (
                            <li key={item}>
                                <span className="text-[0.83rem] text-white/70 cursor-pointer transition-all duration-200 hover:text-primary hover:pl-1.5">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contacto */}
                <div>
                    <h4 className="font-display font-bold text-[0.62rem] tracking-[0.2em] uppercase text-primary mb-4">
                        Contacto
                    </h4>
                    <ul className="flex flex-col gap-3 list-none m-0 p-0">
                        {CONTACT_ITEMS.map(({ Icon, text }) => (
                            <li key={text} className="flex items-start gap-2.5 text-[0.83rem] text-white/80">
                                <Icon size={13} className="text-primary shrink-0 mt-0.5" />
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-col gap-1">
                    <p className="text-[0.76rem] text-white/50">
                        © 2025 <span className="text-white font-medium">Caramello Propiedades</span>. Todos los derechos reservados.
                    </p>
                    <p className="text-[0.72rem] text-white/40 tracking-wider">Matrícula CUCICBA N° XXXXX</p>
                </div>

                {/* Powered by EnterCompany - Estilo Tech Green */}
                <a
                    href="https://www.entercompany.ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 group no-underline"
                >
                    <span className="text-[0.7rem] text-white/40 font-display uppercase tracking-widest transition-colors group-hover:text-white/60">
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