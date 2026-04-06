const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/info@facundoparis\.com\.ar/gi, 'caramellopropiedades@gmail.com');
    content = content.replace(/info@facundoparis\.com/gi, 'caramellopropiedades@gmail.com');
    content = content.replace(/\+54 9 2494 65-6667/gi, '+54 9 223 448-7206');
    content = content.replace(/\+5492494656667/gi, '+5492234487206');
    content = content.replace(/2494 65-6667/gi, '223 448-7206');
    content = content.replace(/San Martín 2654, Mar del Plata/gi, 'Sarmiento 3288 (2A), Mar del Plata');
    
    content = content.replace(/Tandil/g, 'Mar del Plata');

    content = content.replace(/Facundo París Propiedades/gi, 'Caramello Propiedades');
    content = content.replace(/Facundo París/gi, 'Mariana Caramello');
    content = content.replace(/facundoparisproipedades/gi, 'Caramellopropiedades3288');

    content = content.replace(/20\+\s*años/gi, 'Desde 1998');
    content = content.replace(/más de 20 años/gi, 'trayectoria desde 1998');
    content = content.replace(/'20\+'/g, "'1998'");
    content = content.replace(/Años de experiencia/gi, 'Desde');

    content = content.replace(/\bcyan\b/g, 'primary');
    content = content.replace(/\bnavy\b/g, 'dark');
    content = content.replace(/\bblue\b/g, 'secondary');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    }
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (/\.(jsx|js|html)$/.test(fullPath)) {
            replaceInFile(fullPath);
        }
    });
}

walk(path.join(process.cwd(), 'src'));
replaceInFile(path.join(process.cwd(), 'index.html'));
