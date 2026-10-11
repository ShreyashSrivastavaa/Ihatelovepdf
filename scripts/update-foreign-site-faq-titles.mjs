import fs from 'node:fs';

const updates = {
  de: {
    site: 'ihatelovepdf: Kostenlose PDF-Tools im Browser', // 48 chars
    faq: 'Häufige Fragen zu den PDF-Tools' // 32 chars
  },
  es: {
    site: 'ihatelovepdf: Herramientas PDF en tu Navegador', // 46 chars
    faq: 'Preguntas Frecuentes sobre PDF' // 30 chars
  },
  fr: {
    site: 'ihatelovepdf: Outils PDF Gratuits sur Navigateur', // 48 chars
    faq: 'Foire Aux Questions sur les Outils PDF' // 38 chars
  },
  hu: {
    site: 'ihatelovepdf: Ingyenes PDF-eszközök a böngészőben', // 49 chars
    faq: 'Gyakori kérdések a PDF-eszközökről' // 34 chars
  },
  it: {
    site: 'ihatelovepdf: Strumenti PDF Gratuiti nel Browser', // 48 chars
    faq: 'Domande Frequenti sugli Strumenti PDF' // 37 chars
  },
  pt: {
    site: 'ihatelovepdf: Ferramentas PDF Grátis no Navegador', // 49 chars
    faq: 'Perguntas Frequentes sobre Ferramentas PDF' // 42 chars
  },
  ro: {
    site: 'ihatelovepdf: Instrumente PDF Gratuite în Browser', // 49 chars
    faq: 'Întrebări Frecvente despre Instrumente PDF' // 42 chars
  },
  ru: {
    site: 'ihatelovepdf: Бесплатные PDF-инструменты в браузере', // 51 chars -> let's make it <= 50:
    // 'ihatelovepdf: Онлайн PDF инструменты' -> 36 chars
    siteFixed: 'ihatelovepdf: Бесплатные PDF инструменты онлайн', // 47 chars
    faq: 'Часто Задаваемые Вопросы о PDF' // 30 chars
  }
};

for (const [loc, data] of Object.entries(updates)) {
  const filePath = `src/i18n/dictionaries/${loc}/index.ts`;
  let content = fs.readFileSync(filePath, 'utf8');
  
  const siteVal = loc === 'ru' ? data.siteFixed : data.site;
  content = content.replace(/(site:\s*\{[\s\S]*?title:\s*")[^"]+(")/, `$1${siteVal}$2`);
  content = content.replace(/(faq:\s*\{[\s\S]*?title:\s*")[^"]+(")/, `$1${data.faq}$2`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated dictionary for ${loc}`);
}
