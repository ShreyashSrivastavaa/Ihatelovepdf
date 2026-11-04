import React from 'react';
import { Sparkles } from 'lucide-react';

interface QuickAnswerBoxProps {
  operationKey: string;
  toolName: string;
  locale: string;
}

const QUICK_ANSWERS_EN: Record<string, string> = {
  merge:
    "To merge PDF files for free, select or drag your PDFs into the tool above, reorder the pages or files to your desired sequence, and click 'Merge PDF'. Your files are combined instantly inside your browser RAM using client-side JavaScript—nothing is ever uploaded to a remote server.",
  compress:
    "To compress a PDF without losing quality, upload your document, choose your preferred compression level (Recommended, Extreme, or Low), and download your reduced file. ihatelovepdf optimizes embedded images and stream structures entirely in your local browser memory with zero server uploads.",
  split:
    "To split a PDF online for free, load your document, specify the page ranges or select individual pages you wish to extract, and click 'Split PDF'. The new documents are generated directly on your device with no daily task limits and zero cloud uploads.",
  redact:
    "To permanently redact confidential information in a PDF, draw black-out rectangles over sensitive text, numbers, or images, then click 'Apply Redaction'. Unlike simple highlight overlays, ihatelovepdf permanently flattens the pixels and erases the underlying vector text in your local browser.",
  signPdf:
    "To sign a PDF online for free, open your document, draw or type your signature, place it on the agreement or contract, and download the signed file. Everything runs locally in your browser with zero server uploads, keeping sensitive legal documents 100% confidential.",
  pdfToWord:
    "To convert a PDF to an editable Microsoft Word document (.docx) for free, upload your PDF and click 'Convert to Word'. ihatelovepdf extracts text formatting, headings, and tables directly inside your browser without uploading your private files to third-party cloud servers.",
  pdfToExcel:
    "To convert a PDF to an editable Microsoft Excel sheet (.xlsx), drop your document into the tool, allow the local parser to detect table boundaries, and export. The tabular data is converted entirely on your local machine with no cloud transmissions.",
  pdfToImages:
    "To convert PDF pages to high-resolution PNG or JPG images, load your file, select your preferred image format and DPI, and click 'Convert'. Each page is rendered directly onto an HTML5 canvas in your browser and downloaded as a zip or individual images.",
  imagesToPdf:
    "To convert images (JPG, PNG, WebP) to a single PDF, drag and drop your pictures, adjust margins and page orientation, and click 'Create PDF'. Your images are assembled into a clean PDF document directly inside your browser memory.",
  fillPdfForm:
    "To fill PDF forms online for free, upload your interactive AcroForm PDF, click on each text box, checkbox, or radio button to enter your information, and click 'Save PDF'. All form processing and flattening happens locally on your computer.",
};

const DEFAULT_ANSWER_TEMPLATE: Record<string, (tool: string) => string> = {
  en: (tool: string) =>
    `To use ${tool} for free without uploading files, load your document above and follow the step-by-step instructions. ihatelovepdf executes all processing locally in your browser memory using WebAssembly, ensuring unlimited tasks, complete privacy, and zero server uploads.`,
  es: (tool: string) =>
    `Para usar ${tool} gratis sin subir archivos a servidores, carga tu documento arriba y sigue las instrucciones paso a paso. ihatelovepdf procesa todo en la memoria de tu navegador mediante JavaScript y WebAssembly, garantizando privacidad total y tareas ilimitadas.`,
  pt: (tool: string) =>
    `Para usar ${tool} gratuitamente sem enviar arquivos para servidores, carregue seu documento acima e siga as instruções passo a passo. O ihatelovepdf processa tudo na memória do seu navegador, garantindo tarefas ilimitadas e privacidade absoluta.`,
  de: (tool: string) =>
    `Um ${tool} kostenlos und ohne Server-Uploads zu nutzen, laden Sie Ihr Dokument oben hoch und folgen Sie der Anleitung. ihatelovepdf verarbeitet alles lokal im Browserspeicher mit WebAssembly – garantiert privat, ohne Limits und ohne Registrierung.`,
  fr: (tool: string) =>
    `Pour utiliser ${tool} gratuitement sans téléverser vos fichiers sur un serveur, déposez votre document ci-dessus et suivez les étapes. ihatelovepdf exécute tout le traitement localement dans la mémoire de votre navigateur en toute confidentialité.`,
  it: (tool: string) =>
    `Per utilizzare ${tool} gratuitamente senza caricare file su server esterni, carica il tuo documento qui sopra e segui le istruzioni. ihatelovepdf elabora tutto localmente nella memoria del browser con privacy garantita al 100%.`,
  ro: (tool: string) =>
    `Pentru a utiliza ${tool} gratuit fără a încărca fișiere pe servere, adaugă documentul mai sus și urmează pașii. ihatelovepdf procesează totul local în memoria browserului tău, oferind confidențialitate totală și conversii nelimitate.`,
  ru: (tool: string) =>
    `Чтобы бесплатно использовать ${tool} без загрузки файлов на сервер, добавьте документ выше и следуйте инструкциям. ihatelovepdf выполняет обработку локально в оперативной памяти вашего браузера с полной конфиденциальностью и без ограничений.`,
  hu: (tool: string) =>
    `A ${tool} ingyenes használatához fájlfeltöltés nélkül, töltsd fel a dokumentumot fent, és kövesd az utasításokat. Az ihatelovepdf a böngésző memóriájában dolgozza fel a fájlokat, teljes adatvédelmet és korlátlan használatot biztosítva.`,
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

  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-soft)] space-y-1.5">
      <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-xs sm:text-sm">
        <Sparkles className="h-4 w-4 shrink-0" />
        <h3>{headerLabel}</h3>
      </div>
      <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed font-normal">
        {answer}
      </p>
    </div>
  );
}

