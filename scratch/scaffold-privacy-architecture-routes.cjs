const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'];
const OG_LOCALES = {
  en: 'en_US',
  es: 'es_ES',
  pt: 'pt_BR',
  de: 'de_DE',
  fr: 'fr_FR',
  hu: 'hu_HU',
  it: 'it_IT',
  ro: 'ro_RO',
  ru: 'ru_RU',
};

const TITLES = {
  en: 'Privacy Architecture: How Our Zero-Upload Model Works | ihatelovepdf',
  es: 'Arquitectura de Privacidad: Cómo Funciona el Modelo Sin Subidas | ihatelovepdf',
  de: 'Datenschutz-Architektur: Wie unser Zero-Upload-Modell funktioniert | ihatelovepdf',
  fr: 'Architecture de Confidentialité : Comment Fonctionne le Zéro Téléversement | ihatelovepdf',
  it: 'Architettura di Privacy: Come Funziona il Modello Senza Upload | ihatelovepdf',
  pt: 'Arquitetura de Privacidade: Como Funciona o Modelo Sem Upload | ihatelovepdf',
  ro: 'Arhitectură de Confidențialitate: Cum Funcționează Modelul Fără Server | ihatelovepdf',
  ru: 'Архитектура безопасности: Как работает модель без загрузки на сервер | ihatelovepdf',
  hu: 'Adatvédelmi Architektúra: Hogyan Működik a Feltöltés Nélküli Modell | ihatelovepdf',
};

const DESCS = {
  en: "Technical breakdown of in-browser WebAssembly PDF processing and step-by-step instructions to verify zero outbound network transmission in browser DevTools.",
  es: "Análisis técnico del procesamiento local de PDF con WebAssembly y guía paso a paso para verificar cero subidas en la pestaña Red de las herramientas de desarrollo.",
  de: "Technische Erklärung der lokalen WebAssembly-PDF-Verarbeitung im Browser und Schritt-für-Schritt-Anleitung zur Prüfung von 0 Bytes Netzwerkaktivität.",
  fr: "Explications techniques du traitement local WebAssembly et guide pas à pas pour vérifier l'absence de téléversement dans l'onglet Réseau.",
  it: "Analisi tecnica dell'elaborazione PDF locale con WebAssembly e guida per verificare zero byte inviati nella scheda Rete degli strumenti di sviluppo.",
  pt: "Análise técnica do processamento local de PDF com WebAssembly e instruções passo a passo para verificar zero uploads na aba Rede do navegador.",
  ro: "Analiză tehnică a procesării PDF locale prin WebAssembly și instrucțiuni pas cu pas pentru verificarea traficului de rețea zero în DevTools.",
  ru: "Технический анализ локальной обработки PDF через WebAssembly и пошаговая инструкция по проверке нулевой сетевой активности в DevTools браузера.",
  hu: "A helyi WebAssembly PDF-feldolgozás technikai bemutatása és útmutató a 0 bájtos hálózati forgalom független ellenőrzéséhez a böngészőben.",
};

function getLanguagesMap() {
  const map = {};
  for (const loc of LOCALES) {
    map[loc] = loc === 'en' ? `\${SITE_URL}/privacy-architecture` : `\${SITE_URL}/${loc}/privacy-architecture`;
  }
  map['x-default'] = `\${SITE_URL}/privacy-architecture`;
  return map;
}

for (const locale of LOCALES) {
  const isEn = locale === 'en';
  const routeDir = isEn
    ? path.join(__dirname, '..', 'src', 'app', '(en)', 'privacy-architecture')
    : path.join(__dirname, '..', 'src', 'app', locale, 'privacy-architecture');

  fs.mkdirSync(routeDir, { recursive: true });

  const relativeComponents = '../../../components';
  const relativeLib = '../../../lib';

  const langMap = getLanguagesMap();
  const langEntriesStr = Object.entries(langMap)
    .map(([k, v]) => `      '${k}': \`${v}\`,`)
    .join('\n');

  const canonicalPath = isEn ? '/privacy-architecture' : `/${locale}/privacy-architecture`;

  const content = `import type { Metadata } from 'next';
import { PrivacyArchitecturePageContent } from '${relativeComponents}/privacy-architecture/PrivacyArchitecturePageContent';
import { METADATA_BASE } from '${relativeLib}/metadata-shared';
import { SITE_URL } from '${relativeLib}/site';

const LOCALE = '${locale}' as const;

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "${TITLES[locale]}",
  description: "${DESCS[locale]}",
  alternates: {
    canonical: \`\${SITE_URL}${canonicalPath}\`,
    languages: {
${langEntriesStr}
    },
  },
  openGraph: {
    siteName: 'ihatelovepdf',
    title: "${TITLES[locale]}",
    description: "${DESCS[locale]}",
    url: \`\${SITE_URL}${canonicalPath}\`,
    type: 'website',
    locale: '${OG_LOCALES[locale]}',
    images: [{ url: \`\${SITE_URL}/og-images/og-image-${locale}.png\`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "${TITLES[locale]}",
    description: "${DESCS[locale]}",
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [\`\${SITE_URL}/og-images/og-image-${locale}.png\`],
  },
};

export default function Page() {
  return <PrivacyArchitecturePageContent locale={LOCALE} />;
}
`;

  const filePath = path.join(routeDir, 'page.tsx');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`[OK] Created ${filePath}`);
}
