import { localeLabels } from "../../config";
import { getRoutePath, getOperationPath } from "../../routing";
import { operationsRo } from "./operations";
import { faqsRo } from "./faqs";
import type { Dictionary } from "../dictionary-types";
import { OperationKey } from "../../../types/operations";

const locale = "ro" as const;
const { label, nativeName, htmlLang, hrefLang } = localeLabels[locale];
const siteUrl = "https://ihatelovepdf.com";
const homePath = getRoutePath(locale, "home");

const operationsRoutes: Record<OperationKey, string> = {
  merge: getOperationPath(locale, "merge"),
  compress: getOperationPath(locale, "compress"),
  split: getOperationPath(locale, "split"),
  extract: getOperationPath(locale, "extract"),
  crop: getOperationPath(locale, "crop"),
  rotate: getOperationPath(locale, "rotate"),
  reorder: getOperationPath(locale, "reorder"),
  pdfToImages: getOperationPath(locale, "pdfToImages"),
  imagesToPdf: getOperationPath(locale, "imagesToPdf"),
};

export const roDictionary: Dictionary = {
  locale,
  localeLabel: label,
  nativeName,
  htmlLang,
  hrefLang,
  routes: {
    home: homePath,
    faq: getRoutePath(locale, "faq"),
    support: getRoutePath(locale, "support"),
    operations: operationsRoutes,
  },
  metadata: {
    site: {
      title: "ihatelovepdf â€“ UneÈ™te, comprimÄƒ È™i converteÈ™te PDF-uri gratuit",
      description:
        "ihatelovepdf este un set de instrumente axat pe confidenÈ›ialitate care uneÈ™te, comprimÄƒ, divide, extrage, roteÈ™te È™i converteÈ™te PDF-uri direct Ã®n browser. ToatÄƒ procesarea rÄƒmÃ¢ne pe dispozitivul tÄƒu.",
      keywords: [
        "uneste pdf",
        "merge pdf",
        "comprima pdf",
        "compress pdf",
        "divide pdf",
        "split pdf",
        "extrage pagini pdf",
        "extract pdf pages",
        "roteste pagini pdf",
        "rotate pdf",
        "reordoneaza pdf",
        "reorder pdf",
        "pdf in imagini",
        "pdf to images",
        "imagini in pdf",
        "images to pdf",
        "converteste pdf",
        "converteste pdf online",
        "converteste pdf in png",
        "jpg in pdf",
        "modifica pdf offline",
        "set de instrumente pdf",
        "confidentialitate pdf",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "ihatelovepdf â€“ UneÈ™te, ComprimÄƒ, Divide, PDF Ã®n Imagine",
        description:
          "UneÈ™te, comprimÄƒ, divide, extrage, reordoneazÄƒ È™i converteÈ™te PDF-uri fÄƒrÄƒ a Ã®ncÄƒrca fiÈ™ierele pe server. Gratuit, privat È™i susÈ›inut de o procesare localÄƒ.",
        url: `${siteUrl}${homePath}`,
        locale: "ro_RO",
        type: "website",
        imageUrl: "https://ihatelovepdf.com/og-images/og-image-ro.png",
        imageAlt: "ihatelovepdf - Procesare PDF privatÄƒ È™i gratuitÄƒ",
      },
    },
    faq: {
      title: "FAQ | ihatelovepdf â€“ Set de instrumente gratuit pentru procesare PDF",
      description:
        "RÄƒspunsuri la Ã®ntrebÄƒri frecvente despre ihatelovepdf. AflÄƒ cum sÄƒ uneÈ™ti, comprimi, divizezi, extragi È™i reordonezi PDF-uri fÄƒrÄƒ a-È›i Ã®ncÄƒrca fiÈ™ierele.",
      keywords: [
        "ihatelovepdf faq",
        "intrebari pdf",
        "ajutor pdf",
        "ajutor unire pdf",
        "ajutor compresie pdf",
        "ajutor divizare pdf",
        "rotire pagini pdf",
        "reordonare pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "SusÈ›ine ihatelovepdf | MenÈ›ine instrumentele gratuite È™i private",
      description:
        "DonaÈ›ia ta permite ca ihatelovepdf sÄƒ rÄƒmÃ¢nÄƒ un proiect mic, independent È™i axat pe confidenÈ›ialitate. AjutÄƒ la acoperirea costurilor de gÄƒzduire È™i a Ã®mbunÄƒtÄƒÈ›irilor.",
      keywords: [
        "doneaza ihatelovepdf",
        "sustine set instrumente pdf",
        "sustine proiecte confidentialitate",
        "donatii stripe ihatelovepdf",
        "pastreaza ihatelovepdf gratuit",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    operations: operationsRo,
  },
  brand: {
    name: "ihatelovepdf",
    tagline: "Procesare localÄƒ â€¢ 100% privatÄƒ",
  },
  components: {
    nav: {
      home: "AcasÄƒ",
      faq: "ÃŽntrebÄƒri frecvente",
      support: "SusÈ›ine",
      photo: "FotoLince",
      languageLabel: "LimbÄƒ",
      menuLabel: "ComutÄƒ meniul de navigare",
    },
    footer: {
      privacy: "Procesare localÄƒ â€¢ 100% privatÄƒ â€¢ LicenÈ›e deschise",
      rights: `Â© ${new Date().getFullYear()} ihatelovepdf â€” Instrumente pentru manipularea PDF-urilor fÄƒrÄƒ a compromite confidenÈ›ialitatea`,
      links: {
        home: "AcasÄƒ",
        faq: "ÃŽntrebÄƒri frecvente",
        support: "SusÈ›ine",
        photo: "FotoLince",
        contact: "Contact",
      },
      capabilitiesLabel: "AcÈ›iuni populare",
      operations: {
        merge: "UneÈ™te PDF-uri",
        compress: "ComprimÄƒ un PDF",
        split: "Divide un PDF",
        extract: "Extrage pagini",
        crop: "DecupeazÄƒ pagini",
        rotate: "RoteÈ™te",
        reorder: "ReordoneazÄƒ",
        pdfToImages: "PDF Ã®n Imagini",
        imagesToPdf: "Imagini Ã®n PDF",
      },
      license: "Procesare PDF: PDF-lib (MIT), PDF.js (Apache 2.0) â€¢ Font: Geist (MIT)",
      disclaimer: "Serviciul este furnizat â€žca atareâ€, fÄƒrÄƒ garanÈ›ii de niciun fel. Utilizatorul este singurul responsabil pentru utilizarea fiÈ™ierelor.",
    },
    notifications: {
      labels: {
        success: "Succes",
        error: "Eroare",
        info: "Notificare",
        warning: "Avertisment",
      },
      closeLabel: "ÃŽnchide",
    },
    fotolinceBanner: {
      eyebrow: "Ai nevoie sÄƒ optimizezi imagini?",
      title: "ComprimÄƒ, redimensioneazÄƒ sau converteÈ™te cu FotoLince",
      description:
        "Setul nostru de instrumente proceseazÄƒ fiÈ™iere JPG, PNG È™i WEBP la nivel local â€” ideal pentru a reduce dimensiunea imaginilor Ã®nainte de a le transforma Ã®n PDF.",
      ctaLabel: "Deschide FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "Logo FotoLince",
    },
    feedback: {
      question: "A fost util?",
      thanks: "ÃŽÈ›i mulÈ›umim pentru feedback!",
      whatWrong: "Spune-ne ce nu a funcÈ›ionat bine",
      emailSubject: "Feedback pentru ihatelovepdf",
    },
    pdfProcessor: {
      title: "Alege o operaÈ›iune",
      modes: {
        merge: {
          label: "UneÈ™te PDF",
          helper: "OrganizeazÄƒ fiÈ™ierele PDF pentru a le uni Ã®ntr-un singur document.",
        },
        compress: {
          label: "ComprimÄƒ PDF",
          helper: "Redu dimensiunea unui PDF. ProceseazÄƒ cÃ¢te un singur fiÈ™ier pentru cel mai bun echilibru Ã®ntre calitate È™i vitezÄƒ.",
        },
        split: {
          label: "Divide PDF",
          helper: "SelecteazÄƒ fiÈ™ierele PDF pentru a le diviza Ã®n documente separate.",
        },
        extract: {
          label: "Extrage Pagini",
          helper: "Alege pagini specifice pentru a crea un document nou.",
        },
        crop: {
          label: "DecupeazÄƒ Pagini",
          helper: "EliminÄƒ marginile vizibile ale paginilor selectate fÄƒrÄƒ a pÄƒrÄƒsi browserul.",
        },
        rotate: {
          label: "RoteÈ™te Pagini",
          helper: "SelecteazÄƒ paginile care necesitÄƒ o orientare nouÄƒ È™i roteÈ™te-le.",
        },
        reorder: {
          label: "ReordoneazÄƒ",
          helper: "ModificÄƒ ordinea paginilor din interiorul unui PDF.",
        },
        pdfToImages: {
          label: "PDF Ã®n Imagini",
          helper: "ExportÄƒ fiecare paginÄƒ PDF ca PNG sau JPEG fÄƒrÄƒ Ã®ncÄƒrcare pe server.",
        },
        imagesToPdf: {
          label: "Imagini Ã®n PDF",
          helper: "CombinÄƒ imagini JPG, PNG sau WEBP Ã®ntr-un PDF cu un aspect personalizat.",
        },
      },
      upload: {
        title: "SelecteazÄƒ fiÈ™ierele",
        clearAll: "È˜terge tot",
        listHeadings: {
          merge: "FiÈ™iere de unit (reordoneazÄƒ pentru a stabili secvenÈ›a):",
          extract: "SelecteazÄƒ un fiÈ™ier pentru a lucra cu paginile sale:",
          crop: "SelecteazÄƒ un fiÈ™ier pentru a lucra cu paginile sale:",
          rotate: "SelecteazÄƒ un fiÈ™ier pentru a lucra cu paginile sale:",
          reorder: "SelecteazÄƒ un fiÈ™ier pentru a lucra cu paginile sale:",
          pdfToImages: "PDF de convertit (procesate pe rÃ¢nd):",
          imagesToPdf: "Imagini de combinat (reordoneazÄƒ pentru secvenÈ›a finalÄƒ):",
          default: "FiÈ™iere selectate (reordoneazÄƒ sau eliminÄƒ):",
        },
        hints: {
          compress: "Fiecare fiÈ™ier este comprimat individual utilizÃ¢nd cel mai bun raport Ã®ntre calitate È™i dimensiune.",
          split: "Fiecare PDF va fi divizat pe baza opÈ›iunilor selectate la pasul urmÄƒtor.",
          crop: "Alege paginile de decupat, apoi defineÈ™te cÃ¢te puncte sÄƒ elimini de pe fiecare parte.",
          pdfToImages: "ProcesÄƒm cÃ¢te un PDF pe rÃ¢nd. AjusteazÄƒ formatul È™i DPI-ul Ã®nainte de export.",
          imagesToPdf: "AdaugÄƒ imagini JPG, PNG, WEBP sau TIFF. FoloseÈ™te panoul de opÈ›iuni pentru a alege dimensiunea, marginile È™i culoarea.",
        },
      },
      downloadNames: {
        compress: "comprimat_ihatelovepdf",
        merge: "unit_ihatelovepdf",
        split: "parte_ihatelovepdf",
        extract: "extras_ihatelovepdf",
        crop: "decupat_ihatelovepdf",
        rotate: "rotit_ihatelovepdf",
        reorder: "reordonat_ihatelovepdf",
        pdfToImages: "imagini_ihatelovepdf",
        imagesToPdf: "imagini_in_pdf_ihatelovepdf",
      },
      processButton: {
        idleSingle: "ProceseazÄƒ 1 fiÈ™ier",
        idleMultiple: (count: number) => `ProceseazÄƒ ${count} fiÈ™iere`,
        processing: "Se proceseazÄƒ...",
        extract: (count: number) => `Extrage ${count} pagin${count > 1 ? "i" : "Äƒ"}`,
        crop: (count: number) =>
          count > 0 ? `DecupeazÄƒ ${count} pagin${count > 1 ? "i" : "Äƒ"}` : "DecupeazÄƒ PDF",
        rotate: (count: number) =>
          count > 0 ? `RoteÈ™te ${count} pagin${count > 1 ? "i" : "Äƒ"}` : "RoteÈ™te PDF",
        reorder: "SalveazÄƒ ordinea",
        pdfToImages: {
          single: "ExportÄƒ imagini",
          multiple: (count: number) => `ExportÄƒ ${count} PDF-uri`,
        },
        imagesToPdf: {
          single: "CreeazÄƒ PDF",
          multiple: (count: number) => `CreeazÄƒ PDF din ${count} imagini`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Se proceseazÄƒ (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Comprimat. Reducere: ${reduction}% (${original} â†’ ${next}) Ã®n ${seconds}s`,
        merged: "Unirea s-a finalizat",
        split: (count: number) =>
          count > 1
            ? `S-au generat ${count} fiÈ™iere. Se descarcÄƒ primul...`
            : "Divizarea s-a finalizat",
        extracted: (count: number) => `S-a extras ${count} pagin${count > 1 ? "i" : "Äƒ"}`,
        cropped: (count: number) => `S-a decupat ${count} pagin${count > 1 ? "i" : "Äƒ"}`,
        rotated: (count: number) => `S-a rotit ${count} pagin${count > 1 ? "i" : "Äƒ"}`,
        reordered: "Reordonarea s-a finalizat",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `S-au exportat ${count} imagini ${label} Ã®ntr-o arhivÄƒ ZIP`
            : `S-au descÄƒrcat ${count} imagini ${label}`;
        },
        imagesToPdf: (count: number) =>
          `PDF creat din ${count} imagin${count > 1 ? "i" : "Äƒ"}`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "Niciun rezultat generat",
        mergeRequiresTwo: "SelecteazÄƒ cel puÈ›in douÄƒ fiÈ™iere",
        noPagesSelected: "Alege cel puÈ›in o paginÄƒ",
        invalidFile: "Alege un fiÈ™ier valid",
        reorderEmpty: "Nu s-a detectat o nouÄƒ ordine",
        unknown: "Eroare necunoscutÄƒ",
        modeNotSupported: "Mod neacceptat",
      },
      labels: {
        pagesToExtract: "SelecteazÄƒ paginile de extras:",
        pagesToCrop: "SelecteazÄƒ paginile de decupat:",
        pagesToRotate: "SelecteazÄƒ paginile de rotit:",
        reorderPages: "Trage paginile pentru a le reordona:",
      },
      compressionPreview: {
        title: "Previzualizare compresie",
        description:
          "AjusteazÄƒ setÄƒrile pentru a estima dimensiunea de ieÈ™ire Ã®nainte de a Ã®ncepe compresia.",
        running: "Se calculeazÄƒ previzualizareaâ€¦",
        readyLabel: "Dimensiune estimatÄƒ",
        ratio: (percent: string) => `cu ${percent}% mai mic`,
        saved: (size: string) => `economiseÈ™ti ${size}`,
        time: (seconds: string) => `â‰ˆ ${seconds}s`,
        original: "Original",
        result: "Estimat",
        notice:
          "Previzualizarea ruleazÄƒ local. Nimic nu se Ã®ncarcÄƒ pe serverele noastre.",
        error: "Previzualizarea nu a putut fi generatÄƒ.",
        retry: "ReÃ®ncearcÄƒ previzualizarea",
        universalBadge: "Optimizare universalÄƒ",
      },
      compressionSummary: {
        title: "Ultima compresie",
        ratio: (percent: string) => `cu ${percent}% mai mic`,
        saved: (size: string) => `economisit ${size}`,
        original: "Original",
        result: "Comprimat",
        duration: (seconds: string) => `Finalizat Ã®n ${seconds}s`,
        download: "DescarcÄƒ din nou",
        clear: "È˜terge rezumatul",
      },
      donationReminder: {
        message: "Te-a ajutat ihatelovepdf sÄƒ economiseÈ™ti timp? SusÈ›inerea ta Ã®l menÈ›ine gratuit.",
        actionLabel: "SusÈ›ine ihatelovepdf",
        withSavings: (percent: string, saved: string) =>
          `Ai economisit ${saved} (${percent}%)? AjutÄƒ-ne sÄƒ menÈ›inem ihatelovepdf fÄƒrÄƒ reclame.`,
      },
      statusDialog: {
        processingTitle: "Procesare localÄƒ",
        successTitle: "FiÈ™ierele tale sunt gata",
        successDescription:
          "DescÄƒrcarea va Ã®ncepe Ã®n mod automat.",
        resultsLabel: "Ultimul rezultat",
        filesProcessedLabel: (count: number) =>
          `${count} fiÈ™ier${count > 1 ? "e" : ""} procesat${count > 1 ? "e" : ""}`,
        downloadAgainLabel: "DescarcÄƒ",
        errorTitle: "Procesarea a eÈ™uat",
        errorDescription: "Nu am putut finaliza aceastÄƒ operaÈ›iune. VerificÄƒ fiÈ™ierele.",
        retryLabel: "ReÃ®ncearcÄƒ",
        closeLabel: "ÃŽnchide",
        sharePrompt: {
          dialogMessage: "ihatelovepdf este complet gratuit È™i Ã®È›i respectÄƒ confidenÈ›ialitatea. AjutÄƒ-ne sÄƒ-l pÄƒstrÄƒm aÈ™a recomandÃ¢ndu-l unui coleg.",
          shareText: "Tocmai am folosit ihatelovepdf pentru a-mi gestiona PDF-urile. Este un set de instrumente gratuit, rapid È™i complet privat pentru a diviza, comprima, uni È™i converti PDF-uri direct Ã®n browser. Excelent pentru documente sensibile!",
          actionLabel: "PartajeazÄƒ",
          copiedLabel: "Copiat!",
        },
      },
      compressionTotal: {
        title: "Total economisit",
        savings: (size: string) => `Ã®n total ${size} economisiÈ›i`,
        count: (count: number) => `${count} fiÈ™iere optimizate`,
      },
    },
    fileUploader: {
      clickToSelect: "FÄƒ clic pentru a selecta",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "sau trage È™i plaseazÄƒ imagini aici" : "sau trage È™i plaseazÄƒ fiÈ™iere PDF aici",
      accepted: {
        pdf: "FiÈ™iere PDF",
        images: "Formate acceptate: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Dimensiune recomandatÄƒ: < ${sizeMb}MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Format neacceptat: ${fileName}. Sunt permise doar ${label}.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `FiÈ™ier prea mare: ${fileName}. Dimensiunea maximÄƒ este de ${sizeMb}MB.`,
      },
      dropImagesAlt: "Imagine de fundal",
    },
    fileList: {
      moveUp: "MutÄƒ mai sus",
      moveDown: "MutÄƒ mai jos",
      remove: "EliminÄƒ",
      removeAll: "EliminÄƒ tot",
      imageLabel: "Imagine",
      fileLabel: "FiÈ™ier",
      selected: "Selectat",
      pdfLabel: "PDF",
      deselect: "DeselecteazÄƒ",
      pagesLabel: (count: number) => `${count} pagin${count > 1 ? "i" : "Äƒ"}`,
      previewLoading: "Se Ã®ncarcÄƒ previzualizareaâ€¦",
    },
    pageSelector: {
      loading: "Se Ã®ncarcÄƒ paginile...",
      error: "Nu s-au putut Ã®ncÄƒrca informaÈ›iile PDF-ului",
      summary: (total: number, selected: number) =>
        `${total} pagini detectate â€” ${selected} selectate`,
      selectAll: "SelecteazÄƒ tot",
      deselectAll: "DeselecteazÄƒ tot",
      pageLabel: (pageNumber: number) => `Pagina ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Se afiÈ™eazÄƒ ${shown} din ${total} pagini. Introdu numerele paginilor suplimentare.`,
      manualLabel: "Introdu numerele (ex. 21, 25-30)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Se Ã®ncarcÄƒ paginile...",
      error: "Nu s-au putut Ã®ncÄƒrca informaÈ›iile PDF-ului",
      limitReached: (count: number) =>
        `Acest PDF are ${count} pagini. Din motive de performanÈ›Äƒ, poÈ›i reordona maximum 120 de pagini.`,
      limitHint:
        "ÃŽmparte mai Ã®ntÃ¢i PDF-ul Ã®n fragmente mai mici.",
      summary: (count: number) => `${count} pagini pregÄƒtite pentru reordonare`,
      reset: "RestabileÈ™te ordinea",
      dragHint: "Trage de pagini pentru a le modifica ordinea",
      pageLabel: (pageNumber: number) => `Pagina ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: Pagina ${pageNumber}`,
      instructions:
        "Trage de pagini Ã®n ordinea doritÄƒ. CÃ¢nd ai terminat, fÄƒ clic pe â€žSalveazÄƒ ordineaâ€.",
    },
    processingOptions: {
      compress: {
        title: "Compresie",
        level: "Nivel",
        levels: {
          low: "Redus",
          medium: "Mediu",
          high: "Ridicat",
        },
        removeMetadata: "EliminÄƒ metadatele",
        removeMetadataHint: "È˜terge detaliile ascunse, precum autorul È™i istoricul.",
        stripAnnotations: "EliminÄƒ adnotÄƒrile",
        stripAnnotationsHint: "È˜terge notele, formularele È™i semnÄƒturile.",
        downscaleImages: "RedimensioneazÄƒ imaginile",
        downscaleHint: "Ideal pentru documentele scanate.",
        advancedTitle: "CurÄƒÈ›are avansatÄƒ",
        advancedDescription: "PÄƒstreazÄƒ opÈ›iunile simple sau activeazÄƒ suplimentele de care ai nevoie.",
        activeLabel: "Activat:",
      },
      merge: {
        title: "Unire",
        pageDivider: "PaginÄƒ goalÄƒ Ã®ntre documente",
        metadataTitle: "Titlul documentului unit (opÈ›ional)",
        metadataAuthor: "Autorul documentului (opÈ›ional)",
        metadataHint: "SeteazÄƒ metadate personalizate.",
      },
      split: {
        title: "Divizare",
        pagesPerFile: "Pagini per fiÈ™ier",
        pagesPerFileHint: "Vom crea un nou PDF la fiecare N pagini.",
      },
      extract: {
        title: "Extragere",
        preserveMetadata: "PÄƒstreazÄƒ metadatele",
        preserveMetadataHint: "PÄƒstreazÄƒ titlul, autorul È™i alte detalii.",
      },
      crop: {
        title: "Decupare",
        hint: "SelecteazÄƒ paginile de decupat È™i defineÈ™te marginile.",
        inputModeLabel: "MetodÄƒ",
        inputModes: {
          margins: "Setare margini",
          manual: "SelecÈ›ie manualÄƒ",
        },
        marginsTitle: "Margini",
        marginLabels: {
          top: "Margine superioarÄƒ (pts)",
          right: "Margine dreaptÄƒ (pts)",
          bottom: "Margine inferioarÄƒ (pts)",
          left: "Margine stÃ¢ngÄƒ (pts)",
        },
        marginHint: "72 de puncte echivaleazÄƒ cu aproximativ 1 inch.",
        preserveMetadata: "PÄƒstreazÄƒ metadatele",
        preserveMetadataHint: "PÄƒstreazÄƒ titlul, autorul È™i alte detalii.",
        manual: {
          title: "SelecÈ›ie manualÄƒ",
          hint: "Trage de chenar pe previzualizare pentru a defini zona vizibilÄƒ.",
          loading: "Se Ã®ncarcÄƒ...",
          error: "Previzualizarea nu a putut fi Ã®ncÄƒrcatÄƒ.",
          reset: "ReseteazÄƒ",
          pagePreview: (pageNumber: number) => `Previzualizare pagina ${pageNumber}`,
        },
      },
      rotate: {
        title: "Rotire",
        hint: "Alege direcÈ›ia È™i selecteazÄƒ paginile.",
        rotateRight90: "RoteÈ™te la dreapta (90Â°)",
        rotate180: "RoteÈ™te (180Â°)",
        rotateLeft90: "RoteÈ™te la stÃ¢nga (90Â°)",
      },
      reorder: {
        title: "Reordonare",
        hint: "Trage de miniaturi pentru a schimba ordinea.",
      },
      pdfToImages: {
        title: "Exportare",
        formatLabel: "Format",
        formatHint: "Alege PNG pentru calitate fÄƒrÄƒ pierderi sau JPEG pentru dimensiuni mai mici.",
        pngLabel: "PNG (fÄƒrÄƒ pierderi)",
        jpegLabel: "JPEG (mai mic)",
        qualityLabel: "Calitate JPEG",
        qualityHint: "O calitate mai mare pÄƒstreazÄƒ mai multe detalii.",
        dpiLabel: "RezoluÈ›ie DPI",
        dpiHint: "Un DPI mai mare creÈ™te claritatea, dar È™i dimensiunea fiÈ™ierului.",
        dpiPresets: {
          screen: "72 DPI Â· Ecran",
          balanced: "144 DPI Â· Echilibrat",
          print: "300 DPI Â· Imprimare",
        },
        zipLabel: "GrupeazÄƒ imaginile Ã®ntr-un ZIP",
        zipHint: "DescarcÄƒ o singurÄƒ arhivÄƒ.",
        baseNameLabel: "Nume de bazÄƒ al fiÈ™ierului",
        baseNamePlaceholder: "ihatelovepdf_pagini",
        baseNameHint: "LasÄƒ gol pentru a reutiliza numele PDF-ului original.",
      },
      imagesToPdf: {
        title: "AÈ™ezare Ã®n paginÄƒ",
        layoutTitle: "AÈ™ezare Ã®n paginÄƒ",
        fitLabel: "Potrivire image",
        fitOptions: {
          contain: "ÃŽncadrare (aratÄƒ imaginea completÄƒ)",
          cover: "Umplere (acoperÄƒ pagina)",
        },
        sizeLabel: "Dimensiune paginÄƒ",
        sizeOptions: {
          auto: "Auto (se potriveÈ™te cu imaginea)",
          a4: "A4",
          letter: "Letter",
        },
        orientationLabel: "Orientare",
        orientationOptions: {
          auto: "Auto",
          portrait: "Portret",
          landscape: "Pe lat",
        },
        marginLabel: "Margini (pts)",
        marginHint: "AdaugÄƒ spaÈ›iu alb. 72 pts â‰ˆ 1 inch.",
        backgroundLabel: "Culoare fundal",
        backgroundHint: "AplicatÄƒ Ã®n spatele imaginilor.",
      },
    },
    cookieBanner: {
      message: "Folosim cookie-uri pentru a analiza traficul. Nu partajÄƒm datele tale.",
      accept: "AcceptÄƒ",
      decline: "RefuzÄƒ",
    },
  },
  pages: {
    home: {
      hero: {
        title: "ihatelovepdf: ComprimÄƒ, uneÈ™te È™i converteÈ™te PDF gratuit",
        subtitle:
          "ComprimÄƒ, uneÈ™te, divide, extrage, roteÈ™te È™i converteÈ™te PDF-uri direct Ã®n browser. FÄƒrÄƒ Ã®ncÄƒrcare pe server, complet privat.",
        badges: [
          "ComprimÄƒ PDF",
          "UneÈ™te PDF",
          "Procesare localÄƒ",
          "SusÈ›ine ihatelovepdf",
        ],
        imageAlt: "IlustraÈ›ie a unui document PDF",
        ctaLinks: [
          {
            label: "PDF Ã®n Imagini",
            href: operationsRoutes.pdfToImages,
            description: "ExportÄƒ Ã®n format PNG sau JPEG",
          },
          {
            label: "Images Ã®n PDF",
            href: operationsRoutes.imagesToPdf,
            description: "CombinÄƒ JPG, PNG sau WEBP",
          },
        ],
      },
      why: {
        title: "De ce sÄƒ foloseÈ™ti ihatelovepdf?",
        cards: [
          {
            title: "Privat implicit",
            description:
              "PDF-urile tale nu pÄƒrÄƒsesc niciodatÄƒ dispozitivul. Totul se Ã®ntÃ¢mplÄƒ Ã®n browser.",
            icon: "ðŸ”’",
          },
          {
            title: "Rapid È™i eficient",
            description:
              "Motorul nostru local oferÄƒ o vitezÄƒ optimÄƒ, fÄƒrÄƒ a depinde de stocarea Ã®n cloud.",
            icon: "âš¡",
          },
          {
            title: "FuncÈ›ioneazÄƒ oriunde",
            description:
              "Pe computer, tabletÄƒ sau telefon â€” este suficient un browser modern.",
            icon: "ðŸ“±",
          },
        ],
      },
      callout: {
        title: "AjutÄƒ-ne sÄƒ menÈ›inem ihatelovepdf gratuit",
        description:
          "Fiecare donaÈ›ie acoperÄƒ costurile de gÄƒzduire È™i ne permite sÄƒ menÈ›inem experienÈ›a 100% privatÄƒ, fÄƒrÄƒ reclame È™i fÄƒrÄƒ urmÄƒrire.",
        ctaLabel: "SusÈ›ine proiectul",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "Vezi cum utilizÄƒm fondurile",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "ÃŽntrebÄƒri Frecvente",
      intro: "RÄƒspunsuri la cele mai comune Ã®ntrebÄƒri despre ihatelovepdf",
      cta: {
        title: "ÃŽncearcÄƒ ihatelovepdf acum",
        description:
          "UneÈ™te, comprimÄƒ, divide, extrage, roteÈ™te È™i reordoneazÄƒ PDF-uri Ã®n deplinÄƒ confidenÈ›ialitate.",
        ctaLabel: "Mergi la instrumente",
      },
    },
    support: {
      hero: {
        eyebrow: "ðŸŒ± Proiect independent",
        title: "AjutÄƒ-ne sÄƒ pÄƒstrÄƒm ihatelovepdf gratuit È™i privat",
        subtitle:
          "ihatelovepdf este un proiect mic, dezvoltat din pasiune. SusÈ›inerea ta acoperÄƒ costurile serverelor.",
        highlight: "Doar un instrument simplu care Ã®È›i respectÄƒ confidenÈ›ialitatea.",
      },
      reasons: {
        title: "De ce sÄƒ donezi ?",
        cards: [
          {
            title: "PÄƒstreazÄƒ-l gratuit",
            description:
              "DonaÈ›iile ne permit sÄƒ menÈ›inem ihatelovepdf 100% gratuit pentru toatÄƒ lumea.",
            icon: "ðŸ’š",
          },
          {
            title: "ÃŽmbunÄƒtÄƒÈ›iri continue",
            description:
              "SusÈ›inerea ta finanÈ›eazÄƒ corectarea erorilor È™i dezvoltarea de noi instrumente.",
            icon: "âœ¨",
          },
          {
            title: "Protejarea confidenÈ›ialitÄƒÈ›ii",
            description:
              "ProcesÄƒm totul local. DonaÈ›iile ne permit sÄƒ continuÄƒm Ã®n acest mod.",
            icon: "ðŸ”’",
          },
        ],
      },
      tiers: {
        title: "DoneazÄƒ cÃ¢t poÈ›i",
        description: "Orice sumÄƒ ne ajutÄƒ. PlatÄƒ securizatÄƒ prin Stripe.",
        cards: [
          {
            id: "coffee",
            title: "CumpÄƒrÄƒ o cafea",
            amount: "3 â‚¬",
            description: "AcoperÄƒ gÄƒzduirea pentru cÃ¢teva sÄƒptÄƒmÃ¢ni.",
            ctaLabel: "DoneazÄƒ 3 â‚¬",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "SusÈ›inere lunarÄƒ",
            amount: "10 â‚¬/lunÄƒ",
            description: "Ne oferÄƒ timp dedicat Ã®n fiecare sÄƒptÄƒmÃ¢nÄƒ pentru a Ã®mbunÄƒtÄƒÈ›i ihatelovepdf.",
            ctaLabel: "DoneazÄƒ 10 â‚¬/lunÄƒ",
            ctaHref: "#stripe-checkout-monthly",
            badge: "ðŸ’™ MulÈ›umim",
          },
          {
            id: "custom",
            title: "SumÄƒ personalizatÄƒ",
            amount: "Orice sumÄƒ",
            description: "Fiecare euro conteazÄƒ. Alege suma care È›i se potriveÈ™te.",
            ctaLabel: "Alege suma",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "PlÄƒÈ›i securizate prin Stripe. PoÈ›i anula donaÈ›ia recurentÄƒ Ã®n orice moment.",
      },
      transparency: {
        title: "Unde merg banii",
        items: [
          "GÄƒzduire È™i reÈ›ea de livrare de conÈ›inut (CDN) pentru ca site-ul sÄƒ fie rapid la nivel global",
          "Timp de dezvoltare pentru rezolvarea erorilor È™i adÄƒugarea de noi funcÈ›ionalitÄƒÈ›i",
          "AjustÄƒri de design È™i UX pentru o experienÈ›Äƒ de utilizare cÃ¢t mai fluidÄƒ",
          "Traduceri È™i documentaÈ›ie pentru fiecare limbÄƒ acceptatÄƒ",
        ],
      },
      faq: {
        title: "ÃŽntrebÄƒri",
        entries: [
          {
            question: "Ce se Ã®ntÃ¢mplÄƒ dacÄƒ nu pot dona ?",
            answer:
              "Nicio problemÄƒ. ihatelovepdf va rÄƒmÃ¢ne gratuit. Partajarea site-ului cu alÈ›ii este deja un ajutor extraordinar.",
          },
          {
            question: "Voi primi o chitanÈ›Äƒ ?",
            answer:
              "Da. Stripe Ã®È›i trimite automat pe e-mail o chitanÈ›Äƒ cu toate detaliile plÄƒÈ›ii.",
          },
          {
            question: "Cum pot anula o donaÈ›ie recurentÄƒ ?",
            answer:
              "O poÈ›i gestiona din portalul tÄƒu Stripe sau trimite-ne un e-mail È™i o vom anula noi pentru tine.",
          },
        ],
      },
      closing: {
        title: "ÃŽÈ›i mulÈ›umim cÄƒ eÈ™ti aici",
        description:
          "Fiecare persoanÄƒ care susÈ›ine ihatelovepdf ajutÄƒ la menÈ›inerea Ã®n viaÈ›Äƒ a unui set util de instrumente PDF.",
        ctaLabel: "Trimite un e-mail echipei",
        ctaHref: "mailto:info@ihatelovepdf.com?subject=Salut%20echipa%20ihatelovepdf",
      },
      legalNotice: {
        title: "InformaÈ›ii legale È™i transparenÈ›Äƒ",
        points: [
          "ihatelovepdf este un proiect personal independent gestionat de o echipÄƒ micÄƒ de voluntari.",
          "ContribuÈ›iile sunt voluntare È™i ajutÄƒ exclusiv la acoperirea gÄƒzduirii È™i a timpului de dezvoltare.",
          "PlÄƒÈ›ile nu sunt donaÈ›ii deductibile fiscal; Stripe va emite o chitanÈ›Äƒ automatÄƒ.",
          "Serviciul este furnizat ca atare, fÄƒrÄƒ garanÈ›ii. ÃŽntrebÄƒri? info@ihatelovepdf.com.",
        ],
      },
    },
  },
  faqs: faqsRo,
  operations: operationsRo,
};
