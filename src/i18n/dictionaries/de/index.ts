import { localeLabels } from "../../config";
import { getRoutePath, getOperationPath } from "../../routing";
import type { Dictionary } from "../dictionary-types";
import { OperationKey } from "../../../types/operations";
import { operationsDe } from "./operations";
import { faqsDe } from "./faqs";

const locale = "de" as const;
const { label, nativeName, htmlLang, hrefLang } = localeLabels[locale];
const siteUrl = "https://ihatelovepdf.com";
const homePath = getRoutePath(locale, "home");

const operationRoutes: Record<OperationKey, string> = {
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

export const deDictionary: Dictionary = {
  locale,
  localeLabel: label,
  nativeName,
  htmlLang,
  hrefLang,
  routes: {
    home: homePath,
    faq: getRoutePath(locale, "faq"),
    support: getRoutePath(locale, "support"),
    operations: operationRoutes,
  },
  metadata: {
    site: {
      title: "ihatelovepdf â€“ PDFs zusammenfÃ¼hren, komprimieren und konvertieren | Keine Uploads",
      description:
        "ihatelovepdf ist ein datenschutzfreundliches PDF-Toolkit zum ZusammenfÃ¼hren, Komprimieren, Teilen, Extrahieren, Neuordnen und Konvertieren von PDFs in Bilder oder wieder zurÃ¼ck â€“ alles direkt im Browser auf deinem GerÃ¤t, ganz ohne Uploads.",
      keywords: [
        "pdf zusammenfÃ¼hren",
        "pdf komprimieren",
        "pdf teilen",
        "pdf seiten extrahieren",
        "pdf seiten neu ordnen",
        "pdf zu bildern",
        "bilder zu pdf",
        "pdf konvertieren",
        "pdf online konvertieren",
        "pdf zu png",
        "jpg zu pdf",
        "pdf offline bearbeiten",
        "pdf toolkit",
        "pdf datenschutz",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "ihatelovepdf â€“ ZusammenfÃ¼hren, Komprimieren, Teilen, PDF zu Bild & Bild zu PDF",
        description:
          "ZusammenfÃ¼hren, komprimieren, teilen, extrahieren, neu ordnen und in Bilder konvertieren â€“ alles ohne Upload. Kostenlos, privat und mit vollstÃ¤ndig lokaler Verarbeitung.",
        url: `${siteUrl}${homePath}`,
        locale: "de_DE",
        type: "website",
        imageUrl: "https://ihatelovepdf.com/og-images/og-image-de.png",
        imageAlt: "ihatelovepdf â€“ Private und kostenlose PDF-Bearbeitung",
      },
    },
    faq: {
      title: "HÃ¤ufige Fragen | ihatelovepdf â€“ Kostenloses PDF-Toolkit",
      description:
        "Antworten auf die wichtigsten Fragen zu ihatelovepdf. Erfahre, wie du PDFs zusammenfÃ¼hrst, komprimierst, teilst, Seiten extrahierst, neu ordnest und in Bilder oder PDFs umwandelst â€“ ganz ohne Upload.",
      keywords: [
        "ihatelovepdf faq",
        "pdf fragen",
        "pdf hilfe",
        "pdf zusammenfÃ¼hren tipps",
        "pdf komprimieren tipps",
        "pdf teilen hilfe",
        "seiten neu ordnen",
        "pdf zu bildern",
        "bilder zu pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "ihatelovepdf unterstÃ¼tzen | Halte das Tool privat und kostenlos",
      description:
        "Deine Spende hÃ¤lt ihatelovepdf klein, unabhÃ¤ngig und datenschutzfreundlich. Hilf mit, Hosting und Weiterentwicklung zu finanzieren.",
      keywords: [
        "ihatelovepdf spende",
        "pdf toolkit unterstÃ¼tzen",
        "projekt datenschutz finanzieren",
        "ihatelovepdf stripe",
        "ihatelovepdf kostenlos halten",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    operations: operationsDe,
  },
  brand: {
    name: "ihatelovepdf",
    tagline: "Lokale Verarbeitung â€¢ 100Â % privat",
  },
  components: {
    nav: {
      home: "Startseite",
      faq: "FAQ",
      support: "UnterstÃ¼tzen",
      photo: "FotoLince",
      languageLabel: "Sprache",
      menuLabel: "NavigationsmenÃ¼ Ã¶ffnen",
    },
    footer: {
      privacy: "Lokale Verarbeitung â€¢ 100Â % privat â€¢ Offene Lizenzen",
      rights: `Â© ${new Date().getFullYear()} ihatelovepdf â€” Werkzeuge zur PDF-Bearbeitung ohne Datenschutzkompromisse`,
      links: {
        home: "Startseite",
        faq: "FAQ",
        support: "UnterstÃ¼tzen",
        photo: "FotoLince",
        contact: "Kontakt",
      },
      capabilitiesLabel: "Beliebte Aktionen",
      operations: {
        merge: "PDFs zusammenfÃ¼hren",
        compress: "PDF komprimieren",
        split: "PDF teilen",
        extract: "Seiten extrahieren",
        crop: "Seiten zuschneiden",
        rotate: "Seiten drehen",
        reorder: "Seiten neu ordnen",
        pdfToImages: "PDF in Bilder",
        imagesToPdf: "Bilder zu PDF",
      },
      license: "PDF-Verarbeitung: PDF-lib (MIT), PDF.js (Apache 2.0) â€¢ Schriftart: Geist (MIT)",
      disclaimer: "Der Dienst wird 'wie besehen' ohne jegliche GewÃ¤hrleistung bereitgestellt. Der Benutzer ist fÃ¼r die Verwendung der generierten Dateien verantwortlich.",
    },
    notifications: {
      labels: {
        success: "Erfolg",
        error: "Fehler",
        info: "Hinweis",
        warning: "Warnung",
      },
      closeLabel: "SchlieÃŸen",
    },
    fotolinceBanner: {
      eyebrow: "Bilder schnell optimieren?",
      title: "Komprimiere, skaliere oder konvertiere Fotos mit FotoLince",
      description:
        "Unser Schwester-Tool verarbeitet JPG, PNG und WEBP direkt im Browser â€“ ideal, bevor du sie in ein PDF einfÃ¼gst.",
      ctaLabel: "Zu FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "FotoLince Logo",
    },
    feedback: {
      question: "War das hilfreich?",
      thanks: "Danke fÃ¼r dein Feedback!",
      whatWrong: "Sag uns, was schiefgelaufen ist",
      emailSubject: "Feedback zu ihatelovepdf",
    },
    pdfProcessor: {
      title: "WÃ¤hle eine Operation",
      modes: {
        merge: {
          label: "PDFs zusammenfÃ¼hren",
          helper: "Ordne PDFs, um sie zu einem Dokument zu kombinieren.",
        },
        compress: {
          label: "PDF komprimieren",
          helper: "Reduziere die DateigrÃ¶ÃŸe eines PDFs. Verarbeite pro Durchlauf eine Datei, um die QualitÃ¤t zu sichern.",
        },
        split: {
          label: "PDF teilen",
          helper: "WÃ¤hle PDFs aus und trenne sie in mehrere Dateien.",
        },
        extract: {
          label: "Seiten extrahieren",
          helper: "Markiere spezifische Seiten fÃ¼r ein neues Dokument.",
        },
        crop: {
          label: "Seiten zuschneiden",
          helper: "Schneide sichtbare Rander ausgewahlter Seiten direkt im Browser weg.",
        },
        rotate: {
          label: "Seiten drehen",
          helper: "WÃ¤hle die Seiten mit falscher Ausrichtung und drehe nur diese Seiten.",
        },
        reorder: {
          label: "Seiten neu ordnen",
          helper: "Ã„ndere die Reihenfolge der Seiten innerhalb eines PDFs.",
        },
        pdfToImages: {
          label: "PDF in Bilder",
          helper: "Exportiere jede PDF-Seite als PNG oder JPEG â€“ komplett ohne Upload.",
        },
        imagesToPdf: {
          label: "Bilder zu PDF",
          helper: "Kombiniere JPG, PNG oder WEBP zu einem einzigen PDF mit passendem Layout.",
        },
      },
      upload: {
        title: "Dateien auswÃ¤hlen",
        clearAll: "Alles lÃ¶schen",
        listHeadings: {
          merge: "Dateien zum ZusammenfÃ¼hren (Reihenfolge festlegen):",
          extract: "Datei auswÃ¤hlen, um mit den Seiten zu arbeiten:",
          crop: "Datei auswahlen, um mit den Seiten zu arbeiten:",
          rotate: "Datei auswÃ¤hlen, um mit den Seiten zu arbeiten:",
          reorder: "Datei auswÃ¤hlen, um mit den Seiten zu arbeiten:",
          pdfToImages: "PDFs zum Konvertieren (werden nacheinander verarbeitet):",
          imagesToPdf: "Bilder zum Kombinieren (Reihenfolge festlegen):",
          default: "AusgewÃ¤hlte Dateien (neu anordnen oder entfernen):",
        },
        hints: {
          compress: "Jede Datei wird einzeln komprimiert und balanciert QualitÃ¤t und GrÃ¶ÃŸe.",
          split: "Jedes PDF wird entsprechend der Optionen im nÃ¤chsten Schritt geteilt.",
          crop: "Wahle die zuzuschneidenden Seiten und lege im Optionsbereich fest, wie viele Punkte pro Seite entfernt werden.",
          pdfToImages: "Wir rendern ein PDF nach dem einen. Stelle Format und DPI im Optionsbereich vor dem Export ein.",
          imagesToPdf: "Ziehe JPG, PNG, WEBP oder TIFF hinein. WÃ¤hle Seitenformat, Ausrichtung und RÃ¤nder im Optionspanel.",
        },
      },
      downloadNames: {
        compress: "komprimiert_ihatelovepdf",
        merge: "zusammengefuegt_ihatelovepdf",
        split: "teil_ihatelovepdf",
        extract: "extrahiert_ihatelovepdf",
        crop: "zugeschnitten_ihatelovepdf",
        rotate: "gedreht_ihatelovepdf",
        reorder: "neu_geordnet_ihatelovepdf",
        pdfToImages: "bilder_ihatelovepdf",
        imagesToPdf: "bilder_zu_pdf_ihatelovepdf",
      },
      processButton: {
        idleSingle: "1 Datei verarbeiten",
        idleMultiple: (count: number) => `${count} Dateien verarbeiten`,
        processing: "Verarbeitung lÃ¤uft...",
        extract: (count: number) =>
          `${count} ${count === 1 ? "Seite" : "Seiten"} extrahieren`,
        crop: (count: number) =>
          count > 0 ? `Schneide ${count} ${count === 1 ? "Seite" : "Seiten"} zu` : "PDF zuschneiden",
        rotate: (count: number) =>
          count > 0 ? `${count} ${count === 1 ? "Seite" : "Seiten"} drehen` : "PDF drehen",
        reorder: "Neue Reihenfolge speichern",
        pdfToImages: {
          single: "Bilder exportieren",
          multiple: (count: number) => `${count} PDFs exportieren`,
        },
        imagesToPdf: {
          single: "PDF erstellen",
          multiple: (count: number) => `PDF aus ${count} Bildern erstellen`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Verarbeite (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Komprimiert. Reduktion: ${reduction}% (${original} â†’ ${next}) in ${seconds}s`,
        merged: "ZusammenfÃ¼hren abgeschlossen",
        split: (count: number) =>
          count > 1
            ? `${count} Dateien erzeugt. Erste Datei wird heruntergeladen...`
            : "Teilung abgeschlossen",
        extracted: (count: number) => `${count} ${count === 1 ? "Seite" : "Seiten"} extrahiert`,
        cropped: (count: number) => `Es wurden ${count} ${count === 1 ? "Seite" : "Seiten"} zugeschnitten`,
        rotated: (count: number) => `${count} ${count === 1 ? "Seite" : "Seiten"} gedreht`,
        reordered: "Neuordnung abgeschlossen",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `${count} ${label}-${count === 1 ? "Bild" : "Bilder"} im ZIP gespeichert`
            : `${count} ${label}-${count === 1 ? "Bild" : "Bilder"} heruntergeladen`;
        },
        imagesToPdf: (count: number) =>
          `PDF aus ${count} ${count === 1 ? "Bild" : "Bildern"} erstellt`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "Kein Ergebnis erzeugt",
        mergeRequiresTwo: "Mindestens zwei Dateien zum ZusammenfÃ¼hren auswÃ¤hlen",
        noPagesSelected: "WÃ¤hle mindestens eine Seite",
        invalidFile: "GÃ¼ltige Datei auswÃ¤hlen",
        reorderEmpty: "Keine neue Reihenfolge erkannt",
        unknown: "Unbekannter Fehler",
        modeNotSupported: "Modus nicht unterstÃ¼tzt",
      },
      labels: {
        pagesToExtract: "Seiten zum Extrahieren auswÃ¤hlen:",
        pagesToCrop: "Wahle die zuzuschneidenden Seiten:",
        pagesToRotate: "Seiten zum Drehen auswÃ¤hlen:",
        reorderPages: "Seiten ziehen, um sie neu zu ordnen:",
      },
      compressionPreview: {
        title: "Komprimierungs-Vorschau",
        description:
          "Passe die Optionen an, um die ZielgrÃ¶ÃŸe zu schÃ¤tzen, bevor du die Komprimierung startest.",
        running: "Vorschau wird berechnetâ€¦",
        readyLabel: "GeschÃ¤tztes Ergebnis",
        ratio: (percent: string) => `${percent}% kleiner`,
        saved: (size: string) => `${size} eingespart`,
        time: (seconds: string) => `â‰ˆ ${seconds}s`,
        original: "Original",
        result: "GeschÃ¤tzt",
        notice:
          "Die Vorschau lÃ¤uft lokal. Beim Klick auf Verarbeiten nutzen wir dieses Ergebnis erneut â€“ kein Upload nÃ¶tig.",
        error: "Die Vorschau konnte nicht erstellt werden.",
        retry: "Vorschau erneut versuchen",
        universalBadge: "Universelle Optimierung",
      },
      compressionSummary: {
        title: "Letzte Komprimierung",
        ratio: (percent: string) => `${percent}% kleiner`,
        saved: (size: string) => `${size} eingespart`,
        original: "Original",
        result: "Komprimiert",
        duration: (seconds: string) => `Abgeschlossen in ${seconds}s`,
        download: "Erneut herunterladen",
        clear: "Zusammenfassung lÃ¶schen",
      },
      donationReminder: {
        message: "ihatelovepdf hat dir heute Zeit gespart? Deine UnterstÃ¼tzung hÃ¤lt das Projekt privat und kostenlos.",
        actionLabel: "ihatelovepdf unterstÃ¼tzen",
        withSavings: (percent: string, saved: string) =>
          `Gerade ${saved} gespart (${percent}% kleiner)? Hilf mit, ihatelovepdf privat und kostenlos zu halten.`,
      },
      statusDialog: {
        processingTitle: "Verarbeitung lÃ¤uft lokal",
        successTitle: "Deine Dateien sind bereit",
        successDescription:
          "Die Downloads starten automatisch. Hier kannst du sie erneut herunterladen.",
        resultsLabel: "Aktuelles Ergebnis",
        filesProcessedLabel: (count: number) =>
          `${count} ${count === 1 ? "Datei verarbeitet" : "Dateien verarbeitet"}`,
        downloadAgainLabel: "Erneut herunterladen",
        errorTitle: "Verarbeitung fehlgeschlagen",
        errorDescription: "Die Operation konnte nicht abgeschlossen werden. PrÃ¼fe die Dateien und versuche es erneut.",
        retryLabel: "Erneut versuchen",
        closeLabel: "SchlieÃŸen",
        sharePrompt: {
          dialogMessage: "ihatelovepdf ist vÃ¶llig kostenlos und respektiert Ihre PrivatsphÃ¤re. Helfen Sie uns, dass es so bleibt, indem Sie es mit einem Kollegen teilen.",
          shareText: "Ich habe gerade ihatelovepdf genutzt, um meine PDFs zu bearbeiten. Es ist ein kostenloses, schnelles und 100% privates Toolkit, um PDFs direkt im Browser zu teilen, zu komprimieren, zusammenzufÃ¼hren und zu konvertieren. Perfekt fÃ¼r sensible Dokumente!",
          actionLabel: "Teilen",
          copiedLabel: "Kopiert!",
        },
      },
      compressionTotal: {
        title: "Gesamteinsparung (alle Dateien)",
        savings: (size: string) => `Insgesamt ${size} eingespart`,
        count: (count: number) => `${count} Dateien optimiert`,
      },
    },
    fileUploader: {
      clickToSelect: "Zum AuswÃ¤hlen klicken",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "oder Bilder ziehen und ablegen" : "oder PDF-Dateien ziehen und ablegen",
      accepted: {
        pdf: "PDF-Dateien",
        images: "UnterstÃ¼tzte Formate: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Empfohlene GrÃ¶ÃŸe: < ${sizeMb}MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Dateityp nicht unterstÃ¼tzt: ${fileName}. Zugelassen sind nur ${label}.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Datei zu groÃŸ: ${fileName}. Maximal sind ${sizeMb}Â MB erlaubt.`,
      },
      dropImagesAlt: "PDF Platzhaltergrafik",
    },
    fileList: {
      moveUp: "Nach oben",
      moveDown: "Nach unten",
      remove: "Entfernen",
      removeAll: "Alle entfernen",
      imageLabel: "Bild",
      fileLabel: "Datei",
      selected: "AusgewÃ¤hlt",
      pdfLabel: "PDF",
      deselect: "AbwÃ¤hlen",
      pagesLabel: (count: number) => `${count} ${count === 1 ? "Seite" : "Seiten"}`,
      previewLoading: "Vorschau wird geladenâ€¦",
    },
    pageSelector: {
      loading: "Lade Seiten...",
      error: "Fehler beim Laden",
      summary: (total: number, selected: number) => `${selected} von ${total} ${total === 1 ? "Seite" : "Seiten"} ausgewÃ¤hlt`,
      selectAll: "Alle auswÃ¤hlen",
      deselectAll: "Alle abwÃ¤hlen",
      pageLabel: (pageNumber: number) => `Seite ${pageNumber}`,
      extraPages: (shown: number, total: number) => `${shown} von ${total} Seiten sichtbar`,
      manualLabel: "Seiten manuell wÃ¤hlen",
      manualPlaceholder: "z.Â B. 1-3, 6, 9",
    },
    pageOrderer: {
      loading: "Seiten werden geladen...",
      error: "Seiten konnten nicht geladen werden",
      limitReached: (count: number) => `Limit von ${count} Seiten erreicht. Aus Performance-GrÃ¼nden lassen sich bis zu 120 Seiten gleichzeitig neu anordnen.`,
      limitHint: "FÃ¼r grÃ¶ÃŸere Dateien bitte am Desktop Ã¶ffnen.",
      summary: (count: number) => `${count} Seiten bereit`,
      reset: "ZurÃ¼cksetzen",
      dragHint: "Seiten ziehen, um die Reihenfolge zu Ã¤ndern",
      pageLabel: (pageNumber: number) => `Seite ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: Seite ${pageNumber}`,
      instructions:
        'Ziehe die Seiten oder nutze die Pfeiltasten. Klicke anschlieÃŸend auf "Neue Reihenfolge speichern", um die Ã„nderungen zu Ã¼bernehmen.',
    },
    processingOptions: {
      compress: {
        title: "Komprimierung",
        level: "Stufe",
        levels: {
          low: "Leicht",
          medium: "Ausgewogen",
          high: "Stark",
        },
        removeMetadata: "Metadaten entfernen",
        removeMetadataHint: "Entfernt versteckte Angaben wie Autor, Betreff und Bearbeitungshistorie.",
        stripAnnotations: "Annotationen und Kommentare entfernen",
        stripAnnotationsHint: "LÃ¶scht Notizen, Formularfelder, Signaturen und Dokumentaktionen.",
        downscaleImages: "Eingebettete Bilder verkleinern",
        downscaleHint: "Ideal fÃ¼r gescannte Dokumente oder fotolastige PDFs. HÃ¤lt Text scharf und reduziert Fotos.",
        advancedTitle: "Erweiterte Bereinigung",
        advancedDescription: "Belasse es einfach oder aktiviere nur die Extras, die du brauchst.",
        activeLabel: "Aktiv:",
      },
      merge: {
        title: "ZusammenfÃ¼hren",
        pageDivider: "Leerseite zwischen Dokumenten",
        metadataTitle: "Titel fÃ¼r das Ergebnis (optional)",
        metadataAuthor: "Autor fÃ¼r das Ergebnis (optional)",
        metadataHint: "Lege eigene Metadaten fÃ¼r das zusammengefÃ¼hrte PDF fest. Leer lassen, um Standardwerte zu verwenden.",
      },
      split: {
        title: "Teilen",
        pagesPerFile: "Seiten pro Datei",
        pagesPerFileHint: "Wir erstellen nach jeweils N Seiten eine neue PDF-Datei.",
      },
      extract: {
        title: "Extrahieren",
        preserveMetadata: "Metadaten beibehalten",
        preserveMetadataHint: "BehÃ¤lt Titel, Autor und weitere Details in der extrahierten Datei.",
      },
      crop: {
        title: "Zuschneiden",
        hint: "Wahle die Seiten aus und lege fest, wie viele Punkte oben, rechts, unten und links entfernt werden.",
        inputModeLabel: "Zuschneidemethode",
        inputModes: {
          margins: "RÃ¤nder festlegen",
          manual: "Manuelle Auswahl",
        },
        marginsTitle: "RÃ¤nder",
        marginLabels: {
          top: "Oberer Rand (pt)",
          right: "Rechter Rand (pt)",
          bottom: "Unterer Rand (pt)",
          left: "Linker Rand (pt)",
        },
        marginHint: "72 pt entsprechen ungefahr 1 Zoll. Starte mit kleinen Werten, damit kein Inhalt verloren geht.",
        preserveMetadata: "Metadaten beibehalten",
        preserveMetadataHint: "Behalt Titel, Autor und weitere Details in der zugeschnittenen Datei.",
        manual: {
          title: "Manuelle Zuschnittauswahl",
          hint: "Ziehe auf der Vorschau, um den sichtbaren Bereich festzulegen. Wir ubertragen die Auswahl in dieselben Randwerte, die der bisherige Zuschnitt nutzt.",
          loading: "Zuschnittvorschau wird geladen...",
          error: "Die Zuschnittvorschau konnte nicht geladen werden.",
          reset: "Auswahl zurucksetzen",
          pagePreview: (pageNumber: number) => `Vorschauseite ${pageNumber}`,
        },
      },
      rotate: {
        title: "Drehen",
        hint: "WÃ¤hle zuerst die Richtung und markiere dann die Seiten, die gedreht werden sollen.",
        rotateRight90: "90 Grad nach rechts drehen",
        rotate180: "180 Grad drehen",
        rotateLeft90: "90 Grad nach links drehen",
      },
      reorder: {
        title: "Neu ordnen",
        hint: "Seiten ziehen, um die gewÃ¼nschte Reihenfolge zu erhalten",
      },
      pdfToImages: {
        title: "Bildexport",
        formatLabel: "Bildformat",
        formatHint: "PNG liefert verlustfreie QualitÃ¤t, JPEG erzeugt kleinere Dateien.",
        pngLabel: "PNG (verlustfrei)",
        jpegLabel: "JPEG (kleinere Datei)",
        qualityLabel: "JPEG-QualitÃ¤t",
        qualityHint: "HÃ¶here Werte bewahren mehr Details, vergrÃ¶ÃŸern aber die Ausgabedateien.",
        dpiLabel: "Render-DPI",
        dpiHint: "Mehr DPI bedeuten mehr SchÃ¤rfe und grÃ¶ÃŸere Dateien. 144 DPI eignen sich gut fÃ¼r PrÃ¤sentationen.",
        dpiPresets: {
          screen: "72 DPI Â· Bildschirm",
          balanced: "144 DPI Â· Ausgewogen",
          print: "300 DPI Â· Druck",
        },
        zipLabel: "Als ZIP bÃ¼ndeln",
        zipHint: "Ein Archiv herunterladen statt einer Datei pro Seite.",
        baseNameLabel: "Basisdateiname",
        baseNamePlaceholder: "ihatelovepdf_seiten",
        baseNameHint: "Wir verwenden diesen Text als PrÃ¤fix. Leer lassen, um den PDF-Namen zu Ã¼bernehmen.",
      },
      imagesToPdf: {
        title: "Layout",
        layoutTitle: "Seitenlayout",
        fitLabel: "Bildanpassung",
        fitOptions: {
          contain: "Einpassen (gesamtes Bild anzeigen)",
          cover: "AusfÃ¼llen (Seite vollstÃ¤ndig fÃ¼llen)",
        },
        sizeLabel: "SeitengrÃ¶ÃŸe",
        sizeOptions: {
          auto: "Auto (BildgrÃ¶ÃŸe verwenden)",
          a4: "A4",
          letter: "Letter",
        },
        orientationLabel: "Ausrichtung",
        orientationOptions: {
          auto: "Auto",
          portrait: "Hochformat",
          landscape: "Querformat",
        },
        marginLabel: "RÃ¤nder (pt)",
        marginHint: "FÃ¼gt weiÃŸen Rand um das Bild hinzu. 72 pt â‰ˆ 1 Zoll.",
        backgroundLabel: "Hintergrundfarbe",
        backgroundHint: "Wird hinter Bildern sowie an freien Stellen der Seite angezeigt.",
      },
    },
    cookieBanner: {
      message: "Wir verwenden Cookies, um den Verkehr zu analysieren und Ihre Erfahrung zu verbessern. Wir geben Ihre persÃ¶nlichen Daten nicht weiter.",
      accept: "Akzeptieren",
      decline: "Ablehnen",
    },
  },
  pages: {
    home: {
      hero: {
        title: "ihatelovepdf: PDF zusammenfÃ¼hren, komprimieren und konvertieren online",
        subtitle:
          "PDF komprimieren, PDFs zusammenfÃ¼hren, Dokumente teilen, Seiten extrahieren und PDF in Bilder oder Bilder in PDF umwandeln â€“ direkt im Browser ohne Uploads.",
        badges: [
          "PDF schnell komprimieren",
          "PDFs ohne Limit zusammenfÃ¼hren",
          "Lokale Verarbeitung",
          "ihatelovepdf unterstÃ¼tzen",
        ],
        imageAlt: "ihatelovepdf Illustration",
        ctaLinks: [
          {
            label: "PDF in Bilder",
            href: operationRoutes.pdfToImages,
            description: "Seiten als PNG oder JPEG exportieren",
          },
          {
            label: "Bilder zu PDF",
            href: operationRoutes.imagesToPdf,
            description: "JPG, PNG oder WEBP kombinieren",
          },
        ],
      },
      why: {
        title: "Warum ihatelovepdf?",
        cards: [
          {
            title: "Datenschutz garantiert",
            description: "Deine PDFs verlassen dein GerÃ¤t nicht. Alles passiert lokal im Browser.",
            icon: "ðŸ”’",
          },
          {
            title: "Schnell & effizient",
            description: "Die lokale Engine verarbeitet PDFs ohne Upload-Wartezeiten.",
            icon: "âš¡",
          },
          {
            title: "Auf jedem GerÃ¤t",
            description: "Funktioniert auf Desktop, Tablet und Smartphone mit modernen Browsern.",
            icon: "ðŸ“±",
          },
        ],
      },
      callout: {
        title: "Hilf, ihatelovepdf kostenlos zu halten",
        description:
          "Jede Spende deckt Hosting, Entwicklungszeit und sorgt fÃ¼r ein 100Â % privates Erlebnis ohne Werbung oder Tracker.",
        ctaLabel: "Projekt unterstÃ¼tzen",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "So setzen wir die Mittel ein",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "HÃ¤ufig gestellte Fragen",
      intro: "Antworten auf die hÃ¤ufigsten Fragen zu ihatelovepdf",
      cta: {
        title: "ihatelovepdf jetzt ausprobieren",
        description:
          "PDFs zusammenfÃ¼gen, komprimieren, teilen, extrahieren und neu ordnen â€“ mit voller PrivatsphÃ¤re. Keine Anmeldung, kein Hochladen.",
        ctaLabel: "Zum Toolkit",
      },
    },
    support: {
      hero: {
        eyebrow: "ðŸŒ± Kleines Indie-Projekt",
        title: "Hilf, ihatelovepdf kostenlos und privat zu halten",
        subtitle:
          "ihatelovepdf ist ein kleines Herzensprojekt. Deine UnterstÃ¼tzung finanziert die Server und schafft Zeit fÃ¼r neue Funktionen.",
        highlight: "Ein kleines Tool, das deine PrivatsphÃ¤re respektiert.",
      },
      reasons: {
        title: "Warum spenden?",
        cards: [
          {
            title: "Kostenlos erhalten",
            description:
              "Spenden ermÃ¶glichen es, ihatelovepdf fÃ¼r alle kostenlos zu lassen â€“ ohne Premium-Stufen oder gesperrte Funktionen.",
            icon: "ðŸ’š",
          },
          {
            title: "Weiterentwickeln",
            description:
              "Deine Hilfe bezahlt Fehlerbehebungen, neue Werkzeuge und den Feinschliff fÃ¼r schnelle AblÃ¤ufe.",
            icon: "âœ¨",
          },
          {
            title: "PrivatsphÃ¤re schÃ¼tzen",
            description:
              "Wir verarbeiten alles lokal, damit deine PDFs auf deinem GerÃ¤t bleiben. Spenden sichern dieses Konzept.",
            icon: "ðŸ”’",
          },
        ],
      },
      tiers: {
        title: "Gib, was mÃ¶glich ist",
        description: "Jeder Betrag hilft. Sichere Zahlung Ã¼ber Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Ein Kaffee",
            amount: "â‚¬3",
            description: "Deckt das Hosting fÃ¼r ein paar Wochen.",
            ctaLabel: "â‚¬3 spenden",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Monatliche UnterstÃ¼tzung",
            amount: "â‚¬10/Monat",
            description: "Schenkt uns jede Woche Zeit, um ihatelovepdf besser zu machen.",
            ctaLabel: "â‚¬10/Monat spenden",
            ctaHref: "#stripe-checkout-monthly",
            badge: "ðŸ’™ Danke",
          },
          {
            id: "custom",
            title: "Eigener Betrag",
            amount: "Beliebig",
            description: "Jeder Euro zÃ¤hlt. WÃ¤hle den Betrag, der fÃ¼r dich passt.",
            ctaLabel: "Betrag wÃ¤hlen",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Stripe-Zahlungen sind sicher. Wiederkehrende Spenden kannst du jederzeit stoppen.",
      },
      transparency: {
        title: "WofÃ¼r wir es ausgeben",
        items: [
          "Hosting und CDN, damit die Seite Ã¼berall schnell bleibt",
          "Entwicklungszeit fÃ¼r Fehlerbehebungen und neue Features",
          "Design- und UX-Verbesserungen, damit alles leicht zu bedienen ist",
          "Ãœbersetzungen und Dokumentation fÃ¼r alle unterstÃ¼tzten Sprachen",
        ],
      },
      faq: {
        title: "Fragen",
        entries: [
          {
            question: "Was ist, wenn ich nicht spenden kann?",
            answer:
              "Kein Problem. ihatelovepdf bleibt kostenlos. Wenn du das Tool teilst oder uns Feedback schickst, hilfst du uns genauso.",
          },
          {
            question: "Bekomme ich eine BestÃ¤tigung?",
            answer:
              "Ja. Stripe sendet dir automatisch eine E-Mail mit der ZahlungsbestÃ¤tigung.",
          },
          {
            question: "Wie kÃ¼ndige ich eine wiederkehrende Spende?",
            answer:
              "Du kannst das im Stripe-Portal erledigen oder uns schreiben â€“ wir beenden sie sofort und ohne Nachfragen.",
          },
        ],
      },
      closing: {
        title: "Danke, dass du da bist",
        description:
          "Jede Person, die ihatelovepdf unterstÃ¼tzt, hilft dabei, ein nÃ¼tzliches, datenschutzfreundliches PDF-Toolkit fÃ¼r alle zu erhalten.",
        ctaLabel: "Team kontaktieren",
        ctaHref: "mailto:info@ihatelovepdf.com?subject=Hallo%20ihatelovepdf-Team",
      },
      legalNotice: {
        title: "Rechtlicher Hinweis & Transparenz",
        points: [
          "ihatelovepdf ist ein unabhÃ¤ngiges persÃ¶nliches Projekt eines kleinen ehrenamtlichen Teams.",
          "BeitrÃ¤ge sind freiwillig und finanzieren Hosting, Werkzeuge sowie Entwicklungszeit.",
          "Zahlungen sind keine Spenden im steuerlichen Sinne und berechtigen nicht zu AbzÃ¼gen; Stripe verschickt automatisch eine Quittung.",
          "Der Dienst wird ohne GewÃ¤hr bereitgestellt. Fragen? Schreib an info@ihatelovepdf.com.",
        ],
      },
    },
  },
  faqs: {
    common: faqsDe.common,
    regional: faqsDe.regional,
    tech: faqsDe.tech,
  },
  operations: operationsDe,
};
