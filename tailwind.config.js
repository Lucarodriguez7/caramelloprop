// tailwind.config.js
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#12645F',       // Verde Teal exacto del logo "CARAMELLO"
                primaryDark: '#0A4441',   // Verde oscuro gradiente inferior (Hover/Contraste)
                secondary: '#7B7B7B',     // Gris principal exacto de "PROPIEDADES"
                secondaryLight: '#E5E7EB',// Gris claro (Fondos, hovers sutiles, overrides)
                textPrimary: '#1F2937',   // Slate oscuro para alto contraste (titles/body)
                textSecondary: '#6B7280', // Slate medio para párrafos
            },
            fontFamily: {
                display: ['"Julius Sans One"', 'sans-serif'],  // SOLO para H1 principales
                body: ['Inter', 'sans-serif'],                  // Todo el resto del contenido
            },
            clipPath: {
                notch: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
            },
        },
    },
    plugins: [],
}
