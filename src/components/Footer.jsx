import { useEffect, useRef } from 'react'
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

// Canvas component for stardust trails
function StardustCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let width = (canvas.width = canvas.offsetWidth);
        let height = (canvas.height = canvas.offsetHeight);

        const handleResize = () => {
            if (canvas) {
                width = canvas.width = canvas.offsetWidth;
                height = canvas.height = canvas.offsetHeight;
            }
        };
        window.addEventListener('resize', handleResize);

        // Define 3 main trails (Cubic Bezier curves)
        const trails = [
            {
                p0: { x: -0.1, y: 0.25 },
                p1: { x: 0.35, y: 0.8 },
                p2: { x: 0.65, y: 0.15 },
                p3: { x: 1.1, y: 0.7 },
                colorGold: 'rgba(212, 175, 55, 0.25)', // antique brass-gold
                colorTeal: 'rgba(142, 189, 189, 0.2)',  // cool teal-silver
                lineWidth: 1.0
            },
            {
                p0: { x: -0.05, y: 0.6 },
                p1: { x: 0.3, y: 0.15 },
                p2: { x: 0.7, y: 0.85 },
                p3: { x: 1.05, y: 0.35 },
                colorGold: 'rgba(212, 175, 55, 0.2)', // antique brass-gold
                colorTeal: 'rgba(142, 189, 189, 0.25)', // cool teal-silver
                lineWidth: 0.8
            },
            {
                p0: { x: 0.05, y: 0.85 },
                p1: { x: 0.45, y: 0.35 },
                p2: { x: 0.75, y: 0.75 },
                p3: { x: 1.15, y: 0.25 },
                colorGold: 'rgba(212, 175, 55, 0.22)', // antique brass-gold
                colorTeal: 'rgba(142, 189, 189, 0.18)', // cool teal-silver
                lineWidth: 1.2
            }
        ];

        // Cubic Bezier interpolation
        const getBezierPoint = (p0, p1, p2, p3, t) => {
            const mt = 1 - t;
            const mt2 = mt * mt;
            const mt3 = mt2 * mt;
            const t2 = t * t;
            const t3 = t2 * t;

            const x = mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x;
            const y = mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y;
            return { x, y };
        };

        // Get wave-offset position along the trail path
        const getPos = (trail, t, time) => {
            const pt = getBezierPoint(trail.p0, trail.p1, trail.p2, trail.p3, t);
            // Spiral propagation wave
            const angle = t * Math.PI * 2.5 + time * 1.8;
            const waveX = Math.sin(angle) * 25 * Math.sin(t * Math.PI); // wave fades to 0 at ends
            const waveY = Math.cos(angle) * 18 * Math.sin(t * Math.PI);
            return {
                x: pt.x * width + waveX,
                y: pt.y * height + waveY
            };
        };

        // Initialize particles
        const particles = [];
        const particleCount = 45; // balanced for aesthetic/performance

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                trailIndex: Math.floor(Math.random() * trails.length),
                t: Math.random(),
                speed: 0.0003 + Math.random() * 0.0006,
                size: 0.6 + Math.random() * 1.4,
                alpha: Math.random(),
                fadeSpeed: 0.006 + Math.random() * 0.012,
                fadeDir: Math.random() > 0.5 ? 1 : -1,
                orbitRadius: 3 + Math.random() * 8,
                orbitSpeed: (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 3.0),
                orbitPhase: Math.random() * Math.PI * 2
            });
        }

        // Optimization: only animate when footer is visible
        let isVisible = true;
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0.01 }
        );
        observer.observe(canvas);

        let time = 0;
        const draw = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(draw);
                return;
            }

            ctx.clearRect(0, 0, width, height);
            time += 0.005;

            // 1. Draw trails (fine, graceful lines)
            trails.forEach((trail, idx) => {
                ctx.beginPath();
                const grad = ctx.createLinearGradient(0, 0, width, 0);
                grad.addColorStop(0, 'rgba(0,0,0,0)');
                grad.addColorStop(0.25, trail.colorGold);
                grad.addColorStop(0.75, trail.colorTeal);
                grad.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.strokeStyle = grad;
                ctx.lineWidth = trail.lineWidth;
                ctx.shadowBlur = 8;
                ctx.shadowColor = idx % 2 === 0 ? 'rgba(212, 175, 55, 0.15)' : 'rgba(142, 189, 189, 0.15)';

                let first = true;
                for (let t = 0; t <= 1; t += 0.015) {
                    const pt = getPos(trail, t, time);
                    if (first) {
                        ctx.moveTo(pt.x, pt.y);
                        first = false;
                    } else {
                        ctx.lineTo(pt.x, pt.y);
                    }
                }
                ctx.stroke();
            });

            // 2. Draw twinkling particles swirling around paths
            particles.forEach((p) => {
                // Update position progress
                p.t += p.speed;
                if (p.t > 1) {
                    p.t = 0;
                    p.orbitPhase = Math.random() * Math.PI * 2;
                }

                // Update twinkle
                p.alpha += p.fadeSpeed * p.fadeDir;
                if (p.alpha > 0.85) {
                    p.alpha = 0.85;
                    p.fadeDir = -1;
                } else if (p.alpha < 0.1) {
                    p.alpha = 0.1;
                    p.fadeDir = 1;
                }

                // Update orbit
                p.orbitPhase += p.orbitSpeed * 0.01;
                const offsetX = Math.cos(p.orbitPhase) * p.orbitRadius;
                const offsetY = Math.sin(p.orbitPhase) * p.orbitRadius;

                const trail = trails[p.trailIndex];
                const basePt = getPos(trail, p.t, time);
                const x = basePt.x + offsetX;
                const y = basePt.y + offsetY;

                // Determine if gold or teal-silver particle
                const isGold = p.trailIndex % 2 === 0;
                ctx.fillStyle = isGold 
                    ? `rgba(212, 175, 55, ${p.alpha})` 
                    : `rgba(142, 189, 189, ${p.alpha})`;

                ctx.shadowBlur = p.size * 3.5;
                ctx.shadowColor = isGold ? 'rgba(212, 175, 55, 0.45)' : 'rgba(142, 189, 189, 0.55)';

                ctx.beginPath();
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}

export default function Footer() {
    return (
        <footer 
            className="relative border-t border-primary/20 pt-16 pb-7 px-[8%] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #051a19 0%, #081114 60%, #050608 100%)' }}
        >
            {/* Very faint, ghosted aerial photograph of Mar del Plata coastline */}
            <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.035] mix-blend-luminosity filter grayscale brightness-75 contrast-125 z-0"
                style={{ backgroundImage: 'url("/mdp-aerial.png")' }}
            />

            {/* Swirling stardust trails */}
            <StardustCanvas />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] gap-8 mb-11">
                {/* Brand column */}
                <div>
                    <div className="flex items-center mb-5">
                        <img src="/logo.png" alt="Caramello Propiedades" className="h-[50px] w-auto object-contain drop-shadow-xl" />
                    </div>
                    <p className="text-white/80 font-light text-[0.83rem] leading-[1.8] mb-6 max-w-[260px]">
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
                                className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white/70 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:border-primary hover:text-white hover:shadow-[0_4px_12px_rgba(0,251,250,0.25)]"
                            >
                                <Icon size={14} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Propiedades */}
                <div>
                    <h4 className="font-body font-medium text-[0.65rem] tracking-[0.25em] uppercase text-[#4fb1ab] mb-5">
                        Propiedades
                    </h4>
                    <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                        {PROPERTY_LINKS.map(item => (
                            <li key={item.label}>
                                <Link
                                    to={item.to}
                                    className="text-[0.83rem] text-white/80 font-light transition-all duration-200 hover:text-[#4fb1ab] hover:pl-1.5 no-underline"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Zonas Exclusivas */}
                <div>
                    <h4 className="font-body font-medium text-[0.65rem] tracking-[0.25em] uppercase text-[#4fb1ab] mb-5">
                        Zonas VIP
                    </h4>
                    <ul className="flex flex-col gap-3 list-none m-0 p-0">
                        {ZONE_LINKS.map(item => (
                            <li key={item.label}>
                                <Link
                                    to={item.to}
                                    className="text-[0.83rem] text-white/80 font-light transition-all duration-200 hover:text-[#4fb1ab] hover:pl-1.5 no-underline flex items-center gap-1.5"
                                >
                                    <MapPin size={10} className="text-[#4fb1ab] opacity-50" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Enlaces Útiles */}
                <div>
                    <h4 className="font-body font-medium text-[0.65rem] tracking-[0.25em] uppercase text-[#4fb1ab] mb-5">
                        Enlaces
                    </h4>
                    <ul className="flex flex-col gap-3 list-none m-0 p-0">
                        {USEFUL_LINKS.map(item => (
                            <li key={item.label}>
                                <Link
                                    to={item.to}
                                    className="text-[0.83rem] text-white/80 font-light transition-all duration-200 hover:text-[#4fb1ab] hover:pl-1.5 no-underline"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contacto */}
                <div>
                    <h4 className="font-body font-medium text-[0.65rem] tracking-[0.25em] uppercase text-[#4fb1ab] mb-5">
                        Contacto
                    </h4>
                    <ul className="flex flex-col gap-3 list-none m-0 p-0">
                        {CONTACT_ITEMS.map(({ Icon, text }) => (
                            <li key={text} className="flex items-start gap-3 text-[0.83rem] text-white/80 font-light">
                                <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <Icon size={11} className="text-[#4fb1ab]" />
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
                    <p className="text-[0.76rem] text-white/60 font-light">
                        © 2025 <span className="text-white font-medium">Caramello Propiedades</span>. Todos los derechos reservados.
                    </p>
                    <p className="text-[0.72rem] text-white/45 font-light tracking-wider">Matrícula CUCICBA Reg 3288</p>
                </div>

                {/* Powered by EnterCompany */}
                <a
                    href="https://www.entercompany.ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 group no-underline"
                >
                    <span className="text-[0.7rem] text-white/40 font-body font-light uppercase tracking-widest transition-colors group-hover:text-white/60">
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