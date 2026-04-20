import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react'

const Instagram = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-instagram ${className}`}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

export default function Contact() {
    const [sent, setSent] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Aquí conectas tu backend o EmailJS
        setSent(true)
        setTimeout(() => setSent(false), 5000)
    }

    return (
        <div className="bg-secondaryLight min-h-screen pt-28 pb-16 flex items-center">
            <div className="max-w-[1200px] w-full mx-auto px-[5%] lg:px-[8%]">

                {/* Header text */}
                <div className="text-center mb-12">
                    <p className="font-body text-[0.65rem] font-bold tracking-[0.25em] uppercase text-secondary mb-3">Atención personalizada</p>
                    <h1 className="font-body font-black text-primary leading-tight mb-4" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
                        Hablemos sobre tu<br />
                        <span className="text-secondary">próximo paso</span>
                    </h1>
                    <p className="text-[0.95rem] text-textSecondary font-body max-w-[500px] mx-auto">
                        Ya sea para tasar, vender o encontrar el lugar de tus sueños, nuestro equipo de asesores está listo para acompañarte.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-[0_8px_40px_rgba(18,39,58,0.06)] border border-secondaryLight">

                    {/* Left: Info (Dark) */}
                    <div className="lg:w-2/5 bg-textPrimary text-white p-10 lg:p-12 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, #00FBFA, transparent 60%)' }} />
                        <div className="absolute bottom-0 left-[-100px] w-[300px] h-[300px] opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 80%, #1C4066, transparent 60%)' }} />

                        <div className="relative z-10">
                            <h3 className="font-body font-black text-[1.5rem] mb-10">Información de<br /><span className="text-primary">contacto</span></h3>

                            <div className="space-y-7">
                                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors">
                                        <MapPin size={18} className="text-primary group-hover:text-textPrimary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-body font-bold text-[0.88rem] mb-1">Nuestra Oficina</p>
                                        <p className="text-white/60 text-[0.8rem] font-body leading-relaxed">Sarmiento 2888 2A, Mar del Plata<br />Buenos Aires, Argentina</p>
                                    </div>
                                </a>

                                <a href="tel:+5492234487206" className="flex items-start gap-4 group">
                                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors">
                                        <Phone size={18} className="text-primary group-hover:text-textPrimary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-body font-bold text-[0.88rem] mb-1">WhatsApp / Llamadas</p>
                                        <p className="text-white/60 text-[0.8rem] font-body leading-relaxed">+54 9 223 448-7206</p>
                                    </div>
                                </a>

                                <a href="mailto:caramellopropiedades@gmail.com" className="flex items-start gap-4 group">
                                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors">
                                        <Mail size={18} className="text-primary group-hover:text-textPrimary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-body font-bold text-[0.88rem] mb-1">Email</p>
                                        <p className="text-white/60 text-[0.8rem] font-body leading-relaxed">caramellopropiedades@gmail.com</p>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Clock size={18} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-body font-bold text-[0.88rem] mb-1">Horarios</p>
                                        <p className="text-white/60 text-[0.8rem] font-body leading-relaxed">Lunes a Viernes de 10:00 a 16:00 hs</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Right: Form */}
                    <div className="lg:w-3/5 p-10 lg:p-12">
                        {sent ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-fade-in">
                                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} className="text-emerald-500" />
                                </div>
                                <h3 className="font-body font-black text-primary text-[1.8rem] mb-2">¡Consulta enviada!</h3>
                                <p className="text-textSecondary text-[0.95rem] font-body leading-relaxed">
                                    Recibimos tus datos correctamente.<br />Nos pondremos en contacto contigo en breve.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[0.7rem] font-body font-bold tracking-[0.1em] uppercase text-textPrimary/70 mb-2">Nombre completo</label>
                                        <input required type="text" className="w-full px-5 py-3.5 bg-secondaryLight rounded-xl text-[0.85rem] font-body outline-none border border-gray-200 focus:border-primary focus:bg-white transition-all" placeholder="Ingresa tu nombre" />
                                    </div>
                                    <div>
                                        <label className="block text-[0.7rem] font-body font-bold tracking-[0.1em] uppercase text-textPrimary/70 mb-2">Teléfono / Celular</label>
                                        <input required type="tel" className="w-full px-5 py-3.5 bg-secondaryLight rounded-xl text-[0.85rem] font-body outline-none border border-gray-200 focus:border-primary focus:bg-white transition-all" placeholder="Ej: 223 123 4567" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[0.7rem] font-body font-bold tracking-[0.1em] uppercase text-textPrimary/70 mb-2">Correo Electrónico</label>
                                    <input required type="email" className="w-full px-5 py-3.5 bg-secondaryLight rounded-xl text-[0.85rem] font-body outline-none border border-gray-200 focus:border-primary focus:bg-white transition-all" placeholder="tu@correo.com" />
                                </div>

                                <div>
                                    <label className="block text-[0.7rem] font-body font-bold tracking-[0.1em] uppercase text-textPrimary/70 mb-2">Asunto de consulta</label>
                                    <div className="relative">
                                        <select className="w-full px-5 py-3.5 bg-secondaryLight rounded-xl text-[0.85rem] font-body outline-none border border-gray-200 focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer">
                                            <option value="">Selecciona una opción...</option>
                                            <option value="comprar">Quiero comprar una propiedad</option>
                                            <option value="vender">Quiero tasar/vender mi propiedad</option>
                                            <option value="alquilar">Quiero alquilar</option>
                                            <option value="inversiones">Desarrollos e Inversiones</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8898a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[0.7rem] font-body font-bold tracking-[0.1em] uppercase text-textPrimary/70 mb-2">Mensaje</label>
                                    <textarea required rows={4} className="w-full px-5 py-3.5 bg-secondaryLight rounded-xl text-[0.85rem] font-body outline-none border border-gray-200 focus:border-primary focus:bg-white transition-all resize-none leading-relaxed" placeholder="Contanos qué estás buscando..."></textarea>
                                </div>

                                <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-textPrimary text-white rounded-xl font-body font-bold text-[0.8rem] tracking-widest uppercase transition-all duration-300 hover:bg-secondary hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(18,39,58,0.2)]">
                                    <Send size={15} /> Enviar Mensaje
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-12 w-full h-[400px] rounded-[2rem] overflow-hidden shadow-[0_8px_40px_rgba(18,39,58,0.06)] border border-secondaryLight relative z-10 bg-[#e8edf2]" data-aos="fade-up">
                    <iframe
                        title="Ubicación Caramello Propiedades"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src="https://maps.google.com/maps?q=Sarmiento%202888,%20Mar%20del%20Plata&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        allowFullScreen
                    ></iframe>
                </div>

            </div>
        </div>
    )
}
