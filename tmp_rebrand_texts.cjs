const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Colores base (fijo los que estaban mal seteados o ambiguos)
    // text-textPrimary was applied but maybe we need titles -> text-primary
    content = content.replace(/<h1(.*?)text-textPrimary(.*?)>/g, '<h1$1text-primary$2>');
    content = content.replace(/<h2(.*?)text-textPrimary(.*?)>/g, '<h2$1text-primary$2>');
    content = content.replace(/<h3(.*?)text-textPrimary(.*?)>/g, '<h3$1text-primary$2>');
    
    // Títulos que puedan no tener el text- ya que no eran text-textPrimary
    content = content.replace(/<h1(.*?)text-navy(.*?)>/g, '<h1$1text-primary$2>');
    content = content.replace(/<h2(.*?)text-navy(.*?)>/g, '<h2$1text-primary$2>');
    content = content.replace(/<h3(.*?)text-navy(.*?)>/g, '<h3$1text-primary$2>');

    // Subtítulos
    content = content.replace(/<p className=\"font-display(.*?)text-textPrimary(.*?)>/g, '<p className=\"font-display$1text-secondary$2>');
    content = content.replace(/<p className=\"font-display(.*?)text-primary(.*?)>/g, '<p className=\"font-display$1text-secondary$2>');

    // Limpieza de botones (Home, Nosotros, Contact)
    // Botón principal
    content = content.replace(/className=\"(?:[^"]*)bg-primary\s+text-white[^"]*rounded-full[^"]*\"/g, 'className="btn-primary"');
    content = content.replace(/className=\"(?:[^"]*)bg-textPrimary\s+text-white[^"]*rounded-full[^"]*\"/g, 'className="btn-primary"');
    
    // Botón secundario
    content = content.replace(/className=\"(?:[^"]*)border-2\s+border-textPrimary\s+text-textPrimary[^"]*rounded-full[^"]*\"/g, 'className="btn-secondary"');
    content = content.replace(/className=\"(?:[^"]*)bg-transparent\s+border-2\s+border-primary[^"]*rounded-full[^"]*\"/g, 'className="btn-secondary"');

    // Botones CTA específicos que puedan no haber matcheado (por estar en varias líneas en react)
    // Home.jsx Button Ver Propiedades
    content = content.replace(/className=\"inline-flex items-center gap-2 font-display font-bold text-\[0.75rem\] tracking-\[0.08em\] uppercase bg-primary text-textPrimary rounded-full px-7 py-3 cursor-pointer transition-all duration-300 hover:bg-primaryDark hover:shadow-\[0_6px_24px_rgba\(0,251,250,0.35\)\] hover:-translate-y-0.5\"/g, 'className="btn-primary"');
    
    content = content.replace(/className=\"inline-flex items-center gap-2 font-display font-semibold text-\[0.75rem\] tracking-\[0.08em\] uppercase text-white lg:text-textPrimary border-2 border-white lg:border-textPrimary rounded-full px-7 py-3 cursor-pointer transition-all duration-300 hover:bg-white hover:text-textPrimary lg:hover:bg-textPrimary lg:hover:text-white bg-transparent\"/g, 'className="btn-secondary"');

    // Hero: Si fondo es claro -> texto oscuro. Si fondo es oscuro -> texto blanco.
    // Esto es muy específico al Hero de Home.jsx donde está " text-white lg:text-textPrimary "
    content = content.replace(/text-white lg:text-textPrimary/g, 'text-white lg:text-primary');

    // Gradientes viejos (ej instagram follow btn)
    content = content.replace(/className=\"inline-flex items-center gap-3 font-display font-bold text-\[0.78rem\] tracking-\[0.1em\] uppercase text-white rounded-full px-9 py-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5\"([\s\S]*?)style=\{\{[\s\S]*?background:\s*'linear-gradient[^}]*\}\}/g, 'className="btn-primary bg-gradient-brand border-none"');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated texts in: ' + filePath);
    }
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (/\.(jsx|js)$/.test(fullPath)) {
            replaceInFile(fullPath);
        }
    });
}
walk(path.join(process.cwd(), 'src'));
