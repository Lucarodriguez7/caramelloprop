import { useState, useEffect } from 'react';
import LogoIcon from './LogoIcon';

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setLoading(false), 700);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-all duration-700 ${fadeOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
            style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
        >
            <div className="flex flex-col items-center gap-6">
                {/* Logo with entrance animation */}
                <div className="animate-[logoEntrance_0.8s_ease-out_forwards]">
                    <LogoIcon size={90} />
                </div>

                {/* Brand text */}
                <div className="flex flex-col items-center gap-1 animate-[fadeUp_0.8s_ease-out_0.3s_both]">
                    <span className="font-display font-bold text-[1.1rem] tracking-[0.02em] text-textPrimary">
                        Mariana Caramello
                    </span>
                    <span className="font-display font-medium text-[0.62rem] tracking-[0.28em] uppercase"
                        style={{
                            background: 'linear-gradient(135deg, #9A9A9A 0%, #C0C0C0 40%, #7B7B7B 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Propiedades
                    </span>
                </div>

                {/* Premium progress bar */}
                <div className="w-20 h-[2px] bg-secondaryLight rounded-full overflow-hidden mt-2">
                    <div className="h-full rounded-full animate-[progressSlide_1.4s_ease-in-out_infinite]"
                        style={{
                            background: 'linear-gradient(90deg, #12645F, #1ABFB5)',
                        }}
                    />
                </div>
            </div>

            <style>{`
                @keyframes logoEntrance {
                    0% { opacity: 0; transform: scale(0.85) translateY(10px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes fadeUp {
                    0% { opacity: 0; transform: translateY(8px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes progressSlide {
                    0% { width: 0%; transform: translateX(0); }
                    50% { width: 100%; }
                    100% { width: 0%; transform: translateX(80px); }
                }
            `}</style>
        </div>
    );
}
