import React from 'react';
import { Sparkles } from 'lucide-react';

interface QuickAnswerBoxProps {
  operationKey: string;
  toolName: string;
  locale: string;
}

const QUICK_ANSWERS_EN: Record<string, string> = {
  merge:
    "To merge PDF files for free with no watermark, no sign-up, and zero server uploads, select or drag your PDFs into the tool above, reorder the pages or files to your desired sequence, and click 'Merge PDF'. Your files are combined instantly inside your browser RAM using client-side WebAssembly—it works offline and nothing is ever uploaded to a remote server.",
  compress:
    "To compress a PDF without losing quality, with no watermark and zero server uploads, upload your document, choose your preferred compression level (Recommended, Extreme, or Low), and download your reduced file. ihatelovepdf optimizes embedded images and stream structures entirely in your local browser memory with unlimited tasks and complete privacy.",
  split:
    "To split a PDF online for free with no watermark and no registration, load your document, specify the page ranges or select individual pages you wish to extract, and click 'Split PDF'. The new documents are generated directly on your device with no daily task limits, offline capability, and zero cloud uploads.",
  redact:
    "To permanently redact confidential information in a PDF for free with no watermark, draw black-out rectangles over sensitive text, numbers, or images, then click 'Apply Redaction'. Unlike simple highlight overlays, ihatelovepdf permanently flattens the pixels and erases the underlying vector text in your local browser with no sign-up required.",
  signPdf:
    "To sign a PDF online for free with no watermark and no account, open your document, draw or type your signature, place it on the agreement or contract, and download the signed file. Everything runs locally in your browser with zero server uploads, keeping sensitive legal documents 100% confidential.",
  pdfToWord:
    "To convert a PDF to an editable Microsoft Word document (.docx) for free with no watermark, upload your PDF and click 'Convert to Word'. ihatelovepdf extracts text formatting, headings, and tables directly inside your browser with no sign-up and without uploading your private files to third-party cloud servers.",
  pdfToExcel:
    "To convert a PDF to an editable Microsoft Excel sheet (.xlsx) with no watermark, drop your document into the tool, allow the local parser to detect table boundaries, and export. The tabular data is converted entirely on your local machine with unlimited tasks and no cloud transmissions.",
  pdfToImages:
    "To convert PDF pages to high-resolution PNG or JPG images with no watermark and no sign-up, load your file, select your preferred image format and DPI, and click 'Convert'. Each page is rendered directly onto an HTML5 canvas in your browser and downloaded as a zip or individual images.",
  imagesToPdf:
    "To convert images (JPG, PNG, WebP) to a single PDF for free with no watermark, drag and drop your pictures, adjust margins and page orientation, and click 'Create PDF'. Your images are assembled into a clean PDF document directly inside your browser memory with zero server uploads.",
  fillPdfForm:
    "To fill PDF forms online for free with no watermark and no account, upload your interactive AcroForm PDF, click on each text box, checkbox, or radio button to enter your information, and click 'Save PDF'. All form processing and flattening happens locally on your computer with complete privacy.",
};

const DEFAULT_ANSWER_TEMPLATE: Record<string, (tool: string) => string> = {
  en: (tool: string) =>
    `To use ${tool} for free with no watermark, no sign-up, and zero server uploads, load your document above and follow the step-by-step instructions. ihatelovepdf executes all processing locally in your browser memory using WebAssembly, meaning it works offline, provides unlimited tasks, and keeps your files 100% private.`,
  es: (tool: string) =>
    `Para usar ${tool} gratis sin marcas de agua, sin registro y sin subir archivos a servidores, carga tu documento arriba y sigue las instrucciones paso a paso. ihatelovepdf procesa todo localmente en la memoria de tu navegador con WebAssembly: funciona sin conexión, ofrece tareas ilimitadas y garantiza privacidad total.`,
  pt: (tool: string) =>
    `Para usar ${tool} gratuitamente sem marca d'água, sem cadastro e sem enviar arquivos para servidores, carregue seu documento acima e siga as instruções. O ihatelovepdf processa tudo na memória do seu navegador com WebAssembly: funciona offline, oferece tarefas ilimitadas e garante privacidade absoluta.`,
  de: (tool: string) =>
    `Um ${tool} kostenlos ohne Wasserzeichen, ohne Registrierung und ohne Server-Upload zu nutzen, laden Sie Ihr Dokument oben hoch und folgen Sie der Anleitung. ihatelovepdf verarbeitet alles lokal im Browserspeicher mit WebAssembly – funktioniert offline, bietet unbegrenzte Aufgaben und schützt Ihre Daten zu 100%.`,
  fr: (tool: string) =>
    `Pour utiliser ${tool} gratuitement, sans filigrane, sans inscription et sans téléversement sur un serveur, déposez votre document ci-dessus et suivez les étapes. ihatelovepdf exécute tout le traitement localement dans la mémoire de votre navigateur via WebAssembly : fonctionne hors ligne, avec des tâches illimitées et une confidentialité absolue.`,
  it: (tool: string) =>
    `Per utilizzare ${tool} gratuitamente senza filigrana, senza registrazione e senza caricare file su server esterni, carica il tuo documento qui sopra e segui le istruzioni. ihatelovepdf elabora tutto localmente nella memoria del browser con WebAssembly: funziona offline, include conversioni illimitate e garantisce privacy al 100%.`,
  ro: (tool: string) =>
    `Pentru a utiliza ${tool} gratuit, fără filigran, fără înregistrare și fără încărcare pe server, adaugă documentul mai sus și urmează pașii. ihatelovepdf procesează totul local în memoria browserului prin WebAssembly: funcționează offline, oferă utilizare nelimitată și confidențialitate deplină.`,
  ru: (tool: string) =>
    `Чтобы бесплатно использовать ${tool} без водяных знаков, без регистрации и без отправки файлов на сервер, добавьте документ выше и следуйте инструкциям. ihatelovepdf выполняет обработку локально в оперативной памяти браузера через WebAssembly: работает офлайн, обеспечивает неограниченное число задач и полную приватность.`,
  hu: (tool: string) =>
    `A ${tool} ingyenes használatához vízjel nélkül, regisztráció nélkül és fájlfeltöltés nélkül, töltsd fel a dokumentumot fent és kövesd az utasításokat. Az ihatelovepdf a böngésző memóriájában dolgozza fel a fájlokat WebAssembly-vel: offline is működik, korlátlan feladatot és teljes adatvédelmet nyújt.`,
};

const KEYWORD_PILLS: Record<string, string[]> = {
  en: ['No Watermark', 'No Sign-Up', 'Zero Uploads', 'Works Offline', 'Unlimited'],
  es: ['Sin Marcas de Agua', 'Sin Registro', 'Sin Subir Archivos', 'Funciona Sin Conexión', 'Ilimitado'],
  pt: ['Sem Marca d\'Água', 'Sem Cadastro', 'Zero Uploads', 'Funciona Offline', 'Ilimitado'],
  de: ['Ohne Wasserzeichen', 'Ohne Registrierung', 'Kein Server-Upload', 'Offline nutzbar', 'Unbegrenzt'],
  fr: ['Sans Filigrane', 'Sans Inscription', 'Zéro Téléversement', 'Fonctionne Hors Ligne', 'Illimité'],
  it: ['Senza Filigrana', 'Senza Registrazione', 'Zero Upload', 'Funziona Offline', 'Illimitato'],
  ro: ['Fără Filigran', 'Fără Înregistrare', 'Fără Încărcare', 'Funcționează Offline', 'Nelimitat'],
  ru: ['Без водяных знаков', 'Без регистрации', 'Без загрузки', 'Работает офлайн', 'Без ограничений'],
  hu: ['Vízjel nélkül', 'Regisztráció nélkül', 'Feltöltés nélkül', 'Offline is működik', 'Korlátlan'],
};

export function QuickAnswerBox({ operationKey, toolName, locale }: QuickAnswerBoxProps) {
  let answer: string;

  if (locale === 'en' && QUICK_ANSWERS_EN[operationKey]) {
    answer = QUICK_ANSWERS_EN[operationKey];
  } else {
    const generator = DEFAULT_ANSWER_TEMPLATE[locale] || DEFAULT_ANSWER_TEMPLATE['en'];
    answer = generator(toolName);
  }

  const labelByLocale: Record<string, string> = {
    en: `Quick Answer: How does ${toolName} work?`,
    es: `Respuesta rápida: ¿Cómo funciona ${toolName}?`,
    pt: `Resposta rápida: Como funciona o ${toolName}?`,
    de: `Schnellantwort: Wie funktioniert ${toolName}?`,
    fr: `Réponse rapide : Comment fonctionne ${toolName} ?`,
    it: `Risposta rapida: Come funziona ${toolName}?`,
    ro: `Răspuns rapid: Cum funcționează ${toolName}?`,
    ru: `Краткий ответ: Как работает ${toolName}?`,
    hu: `Gyors válasz: Hogyan működik a ${toolName}?`,
  };

  const headerLabel = labelByLocale[locale] || labelByLocale['en'];
  const pills = KEYWORD_PILLS[locale] || KEYWORD_PILLS.en;

  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-soft)] space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-xs sm:text-sm">
          <Sparkles className="h-4 w-4 shrink-0" />
          <h3>{headerLabel}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {pills.map((pill, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--card)] text-[var(--text-muted)] border border-[var(--border)]"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed font-normal">
        {answer}
      </p>
    </div>
  );
}
