export default function LogoIcon({ size = 36, className = '' }) {
    // IMPORTANTE: Asegúrate de guardar la imagen que adjuntaste en la carpeta "public" con el nombre exacto "logo.jpg"
    return (
        <img 
            src="/logo.jpg" 
            alt="Caramello Propiedades" 
            style={{ width: size, height: size }}
            className={`object-contain rounded-full shadow-sm bg-white ${className}`} 
        />
    )
}