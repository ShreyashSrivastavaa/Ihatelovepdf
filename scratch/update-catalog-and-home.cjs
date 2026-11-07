const fs = require('fs');
const path = require('path');

// 1. Update src/components/HomePageContent.tsx
const homePageContentPath = path.join(__dirname, '..', 'src', 'components', 'HomePageContent.tsx');
let homeContent = fs.readFileSync(homePageContentPath, 'utf-8');

const KEYWORD_PILLS_STR = `const KEYWORD_PILLS_MAP: Record<string, string[]> = {
  en: ['No Watermark', 'No Sign-Up', 'Zero Uploads', 'Works Offline', 'Unlimited'],
  es: ['Sin Marcas de Agua', 'Sin Registro', 'Sin Subir Archivos', 'Funciona Sin Conexión', 'Ilimitado'],
  pt: ['Sem Marca d\\'Água', 'Sem Cadastro', 'Zero Uploads', 'Funciona Offline', 'Ilimitado'],
  de: ['Ohne Wasserzeichen', 'Ohne Registrierung', 'Kein Server-Upload', 'Offline nutzbar', 'Unbegrenzt'],
  fr: ['Sans Filigrane', 'Sans Inscription', 'Zéro Téléversement', 'Fonctionne Hors Ligne', 'Illimité'],
  it: ['Senza Filigrana', 'Senza Registrazione', 'Zero Upload', 'Funziona Offline', 'Illimitato'],
  ro: ['Fără Filigran', 'Fără Înregistrare', 'Fără Încărcare', 'Funcționează Offline', 'Nelimitat'],
  ru: ['Без водяных знаков', 'Без регистрации', 'Без загрузки', 'Работает офлайн', 'Без ограничений'],
  hu: ['Vízjel nélkül', 'Regisztráció nélkül', 'Feltöltés nélkül', 'Offline is működik', 'Korlátlan'],
};`;

if (!homeContent.includes('KEYWORD_PILLS_MAP')) {
  // Insert before component definition
  homeContent = homeContent.replace(
    'export function HomePageContent(',
    `${KEYWORD_PILLS_STR}\n\nexport function HomePageContent(`
  );
}

// In the hero section, replace the static subtitle/badges
const oldHeroP = `<p className="text-secondary text-base md:text-lg max-w-xl mx-auto">
            Free PDF tools that run entirely in your browser.
          </p>

          <p className="text-xs text-secondary/70 mt-2">
            100% Client-Side · Zero Server Uploads · No Paywalls
          </p>`;

const newHeroP = `<p className="text-secondary text-base md:text-lg max-w-xl mx-auto">
            {dictionary.pages.home.hero.subtitle || "Free PDF tools that run entirely in your browser."}
          </p>

          <p className="text-xs text-secondary/80 mt-2 font-medium tracking-wide">
            {(KEYWORD_PILLS_MAP[dictionary.locale] || KEYWORD_PILLS_MAP['en']).join(' · ')}
          </p>`;

if (homeContent.includes(oldHeroP)) {
  homeContent = homeContent.replace(oldHeroP, newHeroP);
  fs.writeFileSync(homePageContentPath, homeContent, 'utf-8');
  console.log('[OK] Updated HomePageContent.tsx with localized keyword badges and subtitle');
} else {
  console.log('[WARN] oldHeroP not found in HomePageContent.tsx, checking if already updated');
}

// 2. Update homepage site metadata in each locale dictionary
const siteMetaUpdates = {
  en: {
    title: 'I Hate Love PDF: Free PDF Tools - No Watermark, No Sign-Up',
    description: 'Free, private PDF tools that run 100% locally in your browser. Merge, compress, split, and convert PDFs with no watermarks, no registration, and zero server uploads. Works offline with unlimited tasks.',
  },
  es: {
    title: 'ihatelovepdf: Herramientas PDF Gratis - Sin Marca de Agua, Sin Registro',
    description: 'Herramientas PDF gratuitas y 100% privadas en tu navegador. Une, comprime, divide y convierte archivos PDF sin marcas de agua, sin registros y sin subir archivos a servidores. Funciona sin conexión con tareas ilimitadas.',
  },
  pt: {
    title: 'ihatelovepdf: Ferramentas PDF Grátis - Sem Marca d\'Água, Sem Cadastro',
    description: 'Ferramentas de PDF gratuitas e 100% privadas no seu navegador. Junte, comprima, divida e converta PDFs sem marca d\'água, sem cadastro e com zero uploads para servidores. Funciona offline com tarefas ilimitadas.',
  },
  de: {
    title: 'ihatelovepdf: Kostenlose PDF-Tools – Ohne Wasserzeichen, Ohne Registrierung',
    description: 'Kostenlose, private PDF-Tools direkt im Browser. PDF zusammenfügen, komprimieren, trennen und konvertieren ohne Wasserzeichen, ohne Registrierung und ohne Server-Upload. Funktioniert offline mit unbegrenzten Aufgaben.',
  },
  fr: {
    title: 'ihatelovepdf: Outils PDF Gratuits – Sans Filigrane, Sans Inscription',
    description: 'Boîte à outils PDF gratuite et confidentielle dans votre navigateur. Fusionnez, compressez, divisez et convertissez des PDF sans filigrane, sans inscription et sans téléversement de fichier. Fonctionne hors ligne et en illimité.',
  },
  it: {
    title: 'ihatelovepdf: Strumenti PDF Gratuiti – Senza Filigrana, Senza Registrazione',
    description: 'Strumenti PDF gratuiti e riservati direttamente nel browser. Unisci, comprimi, dividi e converti PDF senza filigrana, senza registrazione e con zero upload su server esterni. Funziona offline e senza limiti.',
  },
  ro: {
    title: 'ihatelovepdf: Instrumente PDF Gratuite – Fără Filigran, Fără Înregistrare',
    description: 'Instrumente PDF gratuite și private direct în browser. Unește, comprimă, împarte și convertește fișiere PDF fără filigran, fără înregistrare și fără încărcare pe server. Funcționează offline cu utilizare nelimitată.',
  },
  ru: {
    title: 'ihatelovepdf: Бесплатные PDF инструменты – Без водяных знаков, Без регистрации',
    description: 'Бесплатные инструменты для работы с PDF прямо в браузере. Объединяйте, сжимайте, разделяйте и конвертируйте PDF без водяных знаков, без регистрации и без отправки файлов на сервер. Работает офлайн без ограничений.',
  },
  hu: {
    title: 'ihatelovepdf: Ingyenes PDF-eszközök – Vízjel nélkül, Regisztráció nélkül',
    description: 'Ingyenes, privát PDF-eszközök közvetlenül a böngésződben. PDF egyesítés, tömörítés, felosztás és konvertálás vízjel nélkül, regisztráció nélkül és fájlfeltöltés nélkül. Offline is működik korlátlan használattal.',
  },
};

for (const [lang, meta] of Object.entries(siteMetaUpdates)) {
  const dictPath = path.join(__dirname, '..', 'src', 'i18n', 'dictionaries', lang, 'index.ts');
  if (fs.existsSync(dictPath)) {
    let content = fs.readFileSync(dictPath, 'utf-8');
    
    // Replace site title & description
    content = content.replace(
      /site:\s*\{[\s\S]*?title:\s*["'][^"']+["'],[\s\S]*?description:\s*["'][^"']+["']/,
      (match) => {
        return match
          .replace(/title:\s*["'][^"']+["']/, `title: "${meta.title}"`)
          .replace(/description:\s*["'][^"']+["']/, `description:\n        "${meta.description}"`);
      }
    );

    fs.writeFileSync(dictPath, content, 'utf-8');
    console.log(`[OK] Updated site metadata for ${lang}`);
  }
}
