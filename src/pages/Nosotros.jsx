import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function Nosotros() {
    const navigate = useNavigate()

    return (
        <div className="bg-textPrimary min-h-screen flex items-center justify-center p-[4%] relative overflow-hidden pt-20">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, #12645F, transparent 60%)' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 80%, #7B7B7B, transparent 60%)' }} />

            <div className="max-w-3xl w-full text-center relative z-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[0.65rem] font-display font-bold tracking-[0.2em] uppercase text-primary">
                        Próximamente
                    </span>
                </div>

                {/* Icon */}
                <div className="mx-auto w-20 h-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-[0_8px_32px_rgba(18,100,95,0.1)] transition-transform duration-500 hover:scale-110 hover:rotate-3">
                    <Sparkles size={32} className="text-primary drop-shadow-[0_0_15px_rgba(18,100,95,0.5)]" />
                </div>

                {/* Texts */}
                <h1 className="font-display font-black text-white text-[2.5rem] md:text-[4rem] leading-[1.1] mb-6">
                    Nuestra Historia<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        está en construcción
                    </span>
                </h1>
                
                <p className="text-white/60 text-[1rem] md:text-[1.1rem] leading-relaxed mb-12 max-w-[500px] mx-auto">
                    Estamos preparando una experiencia única para que conozcas 
                    quiénes somos, nuestros valores y el equipo de profesionales 
                    detrás de <span className="text-white font-bold">Caramello Propiedades</span>.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => navigate('/propiedades')}
                        className="w-full sm:w-auto inline-flex justify-center items-center gap-2 font-display font-bold text-[0.8rem] tracking-wider uppercase bg-primary text-white shadow-[0_0_20px_rgba(18,100,95,0.2)] rounded-full px-8 py-4 cursor-pointer transition-all duration-300 hover:bg-primaryDark hover:shadow-[0_0_30px_rgba(18,100,95,0.4)] hover:-translate-y-0.5"
                    >
                        Explorar propiedades
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto inline-flex justify-center items-center gap-2 font-display font-bold text-[0.8rem] tracking-wider uppercase bg-transparent text-white border border-white/20 rounded-full px-8 py-4 cursor-pointer transition-all duration-300 hover:border-white hover:bg-white/10"
                    >
                        <ArrowLeft size={16} /> Volver al inicio
                    </button>
                </div>
            </div>
            
            {/* Dot grid subtle overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 z-10 pointer-events-none" />
        </div>
    )
}
