import { localeLabels } from "../../config";
import { getRoutePath } from "../../routing";
import type { Dictionary } from "../dictionary-types";
import { operationsDe } from "./operations";
import { faqsDe } from "./faqs";
import { getOperationsRoutes, getOperationsFooterLabels, getOperationsModeLabels, getOperationsDownloadNames } from "../../operations-catalog";

const locale = "de" as const;
const { label, nativeName, htmlLang, hrefLang } = localeLabels[locale];
const siteUrl = "https://ihatelovepdf.com";
const homePath = getRoutePath(locale, "home");

const operationRoutes = getOperationsRoutes(locale);

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
      title: "ihatelovepdf - PDFs zusammenführen, komprimieren und konvertieren | Keine Uploads",
      description:
        "ihatelovepdf ist ein datenschutzfreundliches PDF-Toolkit zum Zusammenführen, Komprimieren, Teilen, Extrahieren, Neuordnen und Konvertieren von PDFs in Bilder oder wieder zurück - alles direkt im Browser auf deinem Gerät, ganz ohne Uploads.",
      keywords: [
        "pdf zusammenführen",
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
        title: "ihatelovepdf - Zusammenführen, Komprimieren, Teilen, PDF zu Bild & Bild zu PDF",
        description:
          "Zusammenführen, komprimieren, teilen, extrahieren, neu ordnen und in Bilder konvertieren - alles ohne Upload. Kostenlos, privat und mit vollständig lokaler Verarbeitung.",
        url: `${siteUrl}${homePath}`,
        locale: "de_DE",
        type: "website",
        imageUrl: "https://ihatelovepdf.com/og-images/og-image-de.png",
        imageAlt: "ihatelovepdf - Private und kostenlose PDF-Bearbeitung",
      },
    },
    faq: {
      title: "Häufige Fragen | ihatelovepdf - Kostenloses PDF-Toolkit",
      description:
        "Antworten auf die wichtigsten Fragen zu ihatelovepdf. Erfahre, wie du PDFs zusammenführst, komprimierst, teilst, Seiten extrahierst, neu ordnest und in Bilder oder PDFs umwandelst - ganz ohne Upload.",
      keywords: [
        "ihatelovepdf faq",
        "pdf fragen",
        "pdf hilfe",
        "pdf zusammenführen tipps",
        "pdf komprimieren tipps",
        "pdf teilen hilfe",
        "seiten neu ordnen",
        "pdf zu bildern",
        "bilder zu pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "ihatelovepdf unterstützen | Halte das Tool privat und kostenlos",
      description:
        "Deine Spende hält ihatelovepdf klein, unabhängig und datenschutzfreundlich. Hilf mit, Hosting und Weiterentwicklung zu finanzieren.",
      keywords: [
        "ihatelovepdf spende",
        "pdf toolkit unterstützen",
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
    tagline: "Lokale Verarbeitung • 100 % privat",
  },
  components: {
    nav: {
      home: "Startseite",
      faq: "FAQ",
      support: "Unterstützen",
      photo: "FotoLince",
      languageLabel: "Sprache",
      menuLabel: "Navigationsmenü öffnen",
    },
    footer: {
      privacy: "Lokale Verarbeitung • 100 % privat • Offene Lizenzen",
      rights: `© ${new Date().getFullYear()} ihatelovepdf, Werkzeuge zur PDF-Bearbeitung ohne Datenschutzkompromisse`,
      links: {
        home: "Startseite",
        faq: "FAQ",
        support: "Unterstützen",
        photo: "FotoLince",
        contact: "Kontakt",
      },
      capabilitiesLabel: "Beliebte Aktionen",
      operations: getOperationsFooterLabels(locale),
      license: "PDF-Verarbeitung: PDF-lib (MIT), PDF.js (Apache 2.0) • Schriftart: Geist (MIT)",
      disclaimer: "Der Dienst wird 'wie besehen' ohne jegliche Gewährleistung bereitgestellt. Der Benutzer ist für die Verwendung der generierten Dateien verantwortlich.",
    },
    notifications: {
      labels: {
        success: "Erfolg",
        error: "Fehler",
        info: "Hinweis",
        warning: "Warnung",
      },
      closeLabel: "Schließen",
    },
    fotolinceBanner: {
      eyebrow: "Bilder schnell optimieren?",
      title: "Komprimiere, skaliere oder konvertiere Fotos mit FotoLince",
      description:
        "Unser Schwester-Tool verarbeitet JPG, PNG und WEBP direkt im Browser - ideal, bevor du sie in ein PDF einfügst.",
      ctaLabel: "Zu FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "FotoLince Logo",
    },
    feedback: {
      question: "War das hilfreich?",
      thanks: "Danke für dein Feedback!",
      whatWrong: "Sag uns, was schiefgelaufen ist",
      emailSubject: "Feedback zu ihatelovepdf",
    },
    pdfProcessor: {
      title: "Wähle eine Operation",
      modes: getOperationsModeLabels(locale),
      upload: {
        title: "Dateien auswählen",
        clearAll: "Alles löschen",
        listHeadings: {
          merge: "Dateien zum Zusammenführen (Reihenfolge festlegen):",
          extract: "Datei auswählen, um mit den Seiten zu arbeiten:",
          crop: "Datei auswahlen, um mit den Seiten zu arbeiten:",
          rotate: "Datei auswählen, um mit den Seiten zu arbeiten:",
          reorder: "Datei auswählen, um mit den Seiten zu arbeiten:",
          pdfToImages: "PDFs zum Konvertieren (werden nacheinander verarbeitet):",
          imagesToPdf: "Bilder zum Kombinieren (Reihenfolge festlegen):",
          default: "Ausgewählte Dateien (neu anordnen oder entfernen):",
        },
        hints: {
          compress: "Jede Datei wird einzeln komprimiert und balanciert Qualität und Größe.",
          split: "Jedes PDF wird entsprechend der Optionen im nächsten Schritt geteilt.",
          crop: "Wahle die zuzuschneidenden Seiten und lege im Optionsbereich fest, wie viele Punkte pro Seite entfernt werden.",
          pdfToImages: "Wir rendern ein PDF nach dem einen. Stelle Format und DPI im Optionsbereich vor dem Export ein.",
          imagesToPdf: "Ziehe JPG, PNG, WEBP oder TIFF hinein. Wähle Seitenformat, Ausrichtung und Ränder im Optionspanel.",
        },
      },
      downloadNames: getOperationsDownloadNames(locale),
      processButton: {
        idleSingle: "1 Datei verarbeiten",
        idleMultiple: (count: number) => `${count} Dateien verarbeiten`,
        processing: "Verarbeitung läuft...",
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
          `Komprimiert. Reduktion: ${reduction}% (${original} → ${next}) in ${seconds}s`,
        merged: "Zusammenführen abgeschlossen",
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
        mergeRequiresTwo: "Mindestens zwei Dateien zum Zusammenführen auswählen",
        noPagesSelected: "Wähle mindestens eine Seite",
        invalidFile: "Gültige Datei auswählen",
        reorderEmpty: "Keine neue Reihenfolge erkannt",
        unknown: "Unbekannter Fehler",
        modeNotSupported: "Modus nicht unterstützt",
      },
      labels: {
        pagesToExtract: "Seiten zum Extrahieren auswählen:",
        pagesToCrop: "Wahle die zuzuschneidenden Seiten:",
        pagesToRotate: "Seiten zum Drehen auswählen:",
        reorderPages: "Seiten ziehen, um sie neu zu ordnen:",
      },
      compressionPreview: {
        title: "Komprimierungs-Vorschau",
        description:
          "Passe die Optionen an, um die Zielgröße zu schätzen, bevor du die Komprimierung startest.",
        running: "Vorschau wird berechnet…",
        readyLabel: "Geschätztes Ergebnis",
        ratio: (percent: string) => `${percent}% kleiner`,
        saved: (size: string) => `${size} eingespart`,
        time: (seconds: string) => `≈ ${seconds}s`,
        original: "Original",
        result: "Geschätzt",
        notice:
          "Die Vorschau läuft lokal. Beim Klick auf Verarbeiten nutzen wir dieses Ergebnis erneut - kein Upload nötig.",
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
        clear: "Zusammenfassung löschen",
      },
      donationReminder: {
        message: "ihatelovepdf hat dir heute Zeit gespart? Deine Unterstützung hält das Projekt privat und kostenlos.",
        actionLabel: "ihatelovepdf unterstützen",
        withSavings: (percent: string, saved: string) =>
          `Gerade ${saved} gespart (${percent}% kleiner)? Hilf mit, ihatelovepdf privat und kostenlos zu halten.`,
      },
      statusDialog: {
        processingTitle: "Verarbeitung läuft lokal",
        successTitle: "Deine Dateien sind bereit",
        successDescription:
          "Die Downloads starten automatisch. Hier kannst du sie erneut herunterladen.",
        resultsLabel: "Aktuelles Ergebnis",
        filesProcessedLabel: (count: number) =>
          `${count} ${count === 1 ? "Datei verarbeitet" : "Dateien verarbeitet"}`,
        downloadAgainLabel: "Erneut herunterladen",
        errorTitle: "Verarbeitung fehlgeschlagen",
        errorDescription: "Die Operation konnte nicht abgeschlossen werden. Prüfe die Dateien und versuche es erneut.",
        retryLabel: "Erneut versuchen",
        closeLabel: "Schließen",
        sharePrompt: {
          dialogMessage: "ihatelovepdf ist völlig kostenlos und respektiert Ihre Privatsphäre. Helfen Sie uns, dass es so bleibt, indem Sie es mit einem Kollegen teilen.",
          shareText: "Ich habe gerade ihatelovepdf genutzt, um meine PDFs zu bearbeiten. Es ist ein kostenloses, schnelles und 100% privates Toolkit, um PDFs direkt im Browser zu teilen, zu komprimieren, zusammenzuführen und zu konvertieren. Perfekt für sensible Dokumente!",
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
      clickToSelect: "Zum Auswählen klicken",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "oder Bilder ziehen und ablegen" : "oder PDF-Dateien ziehen und ablegen",
      accepted: {
        pdf: "PDF-Dateien",
        images: "Unterstützte Formate: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Empfohlene Größe: < ${sizeMb}MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Dateityp nicht unterstützt: ${fileName}. Zugelassen sind nur ${label}.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Datei zu groß: ${fileName}. Maximal sind ${sizeMb} MB erlaubt.`,
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
      selected: "Ausgewählt",
      pdfLabel: "PDF",
      deselect: "Abwählen",
      pagesLabel: (count: number) => `${count} ${count === 1 ? "Seite" : "Seiten"}`,
      previewLoading: "Vorschau wird geladen…",
    },
    pageSelector: {
      loading: "Lade Seiten...",
      error: "Fehler beim Laden",
      summary: (total: number, selected: number) => `${selected} von ${total} ${total === 1 ? "Seite" : "Seiten"} ausgewählt`,
      selectAll: "Alle auswählen",
      deselectAll: "Alle abwählen",
      pageLabel: (pageNumber: number) => `Seite ${pageNumber}`,
      extraPages: (shown: number, total: number) => `${shown} von ${total} Seiten sichtbar`,
      manualLabel: "Seiten manuell wählen",
      manualPlaceholder: "z. B. 1-3, 6, 9",
    },
    pageOrderer: {
      loading: "Seiten werden geladen...",
      error: "Seiten konnten nicht geladen werden",
      limitReached: (count: number) => `Limit von ${count} Seiten erreicht. Aus Performance-Gründen lassen sich bis zu 120 Seiten gleichzeitig neu anordnen.`,
      limitHint: "Für größere Dateien bitte am Desktop öffnen.",
      summary: (count: number) => `${count} Seiten bereit`,
      reset: "Zurücksetzen",
      dragHint: "Seiten ziehen, um die Reihenfolge zu ändern",
      pageLabel: (pageNumber: number) => `Seite ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: Seite ${pageNumber}`,
      instructions:
        'Ziehe die Seiten oder nutze die Pfeiltasten. Klicke anschließend auf "Neue Reihenfolge speichern", um die Änderungen zu übernehmen.',
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
        stripAnnotationsHint: "Löscht Notizen, Formularfelder, Signaturen und Dokumentaktionen.",
        downscaleImages: "Eingebettete Bilder verkleinern",
        downscaleHint: "Ideal für gescannte Dokumente oder fotolastige PDFs. Hält Text scharf und reduziert Fotos.",
        advancedTitle: "Erweiterte Bereinigung",
        advancedDescription: "Belasse es einfach oder aktiviere nur die Extras, die du brauchst.",
        activeLabel: "Aktiv:",
      },
      merge: {
        title: "Zusammenführen",
        pageDivider: "Leerseite zwischen Dokumenten",
        metadataTitle: "Titel für das Ergebnis (optional)",
        metadataAuthor: "Autor für das Ergebnis (optional)",
        metadataHint: "Lege eigene Metadaten für das zusammengeführte PDF fest. Leer lassen, um Standardwerte zu verwenden.",
      },
      split: {
        title: "Teilen",
        pagesPerFile: "Seiten pro Datei",
        pagesPerFileHint: "Wir erstellen nach jeweils N Seiten eine neue PDF-Datei.",
      },
      extract: {
        title: "Extrahieren",
        preserveMetadata: "Metadaten beibehalten",
        preserveMetadataHint: "Behält Titel, Autor und weitere Details in der extrahierten Datei.",
      },
      crop: {
        title: "Zuschneiden",
        hint: "Wahle die Seiten aus und lege fest, wie viele Punkte oben, rechts, unten und links entfernt werden.",
        inputModeLabel: "Zuschneidemethode",
        inputModes: {
          margins: "Ränder festlegen",
          manual: "Manuelle Auswahl",
        },
        marginsTitle: "Ränder",
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
        hint: "Wähle zuerst die Richtung und markiere dann die Seiten, die gedreht werden sollen.",
        rotateRight90: "90 Grad nach rechts drehen",
        rotate180: "180 Grad drehen",
        rotateLeft90: "90 Grad nach links drehen",
      },
      reorder: {
        title: "Neu ordnen",
        hint: "Seiten ziehen, um die gewünschte Reihenfolge zu erhalten",
      },
      pdfToImages: {
        title: "Bildexport",
        formatLabel: "Bildformat",
        formatHint: "PNG liefert verlustfreie Qualität, JPEG erzeugt kleinere Dateien.",
        pngLabel: "PNG (verlustfrei)",
        jpegLabel: "JPEG (kleinere Datei)",
        qualityLabel: "JPEG-Qualität",
        qualityHint: "Höhere Werte bewahren mehr Details, vergrößern aber die Ausgabedateien.",
        dpiLabel: "Render-DPI",
        dpiHint: "Mehr DPI bedeuten mehr Schärfe und größere Dateien. 144 DPI eignen sich gut für Präsentationen.",
        dpiPresets: {
          screen: "72 DPI · Bildschirm",
          balanced: "144 DPI · Ausgewogen",
          print: "300 DPI · Druck",
        },
        zipLabel: "Als ZIP bündeln",
        zipHint: "Ein Archiv herunterladen statt einer Datei pro Seite.",
        baseNameLabel: "Basisdateiname",
        baseNamePlaceholder: "ihatelovepdf_seiten",
        baseNameHint: "Wir verwenden diesen Text als Präfix. Leer lassen, um den PDF-Namen zu übernehmen.",
      },
      imagesToPdf: {
        title: "Layout",
        layoutTitle: "Seitenlayout",
        fitLabel: "Bildanpassung",
        fitOptions: {
          contain: "Einpassen (gesamtes Bild anzeigen)",
          cover: "Ausfüllen (Seite vollständig füllen)",
        },
        sizeLabel: "Seitengröße",
        sizeOptions: {
          auto: "Auto (Bildgröße verwenden)",
          a4: "A4",
          letter: "Letter",
        },
        orientationLabel: "Ausrichtung",
        orientationOptions: {
          auto: "Auto",
          portrait: "Hochformat",
          landscape: "Querformat",
        },
        marginLabel: "Ränder (pt)",
        marginHint: "Fügt weißen Rand um das Bild hinzu. 72 pt ≈ 1 Zoll.",
        backgroundLabel: "Hintergrundfarbe",
        backgroundHint: "Wird hinter Bildern sowie an freien Stellen der Seite angezeigt.",
      },
    },
    cookieBanner: {
      message: "Wir verwenden Cookies, um den Verkehr zu analysieren und Ihre Erfahrung zu verbessern. Wir geben Ihre persönlichen Daten nicht weiter.",
      accept: "Akzeptieren",
      decline: "Ablehnen",
    },
  },
  pages: {
    home: {
      hero: {
        title: "ihatelovepdf: PDF zusammenführen, komprimieren und konvertieren online",
        subtitle:
          "PDF komprimieren, PDFs zusammenführen, Dokumente teilen, Seiten extrahieren und PDF in Bilder oder Bilder in PDF umwandeln - direkt im Browser ohne Uploads.",
        badges: [
          "PDF schnell komprimieren",
          "PDFs ohne Limit zusammenführen",
          "Lokale Verarbeitung",
          "ihatelovepdf unterstützen",
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
            description: "Deine PDFs verlassen dein Gerät nicht. Alles passiert lokal im Browser.",
            icon: "🔒",
          },
          {
            title: "Schnell & effizient",
            description: "Die lokale Engine verarbeitet PDFs ohne Upload-Wartezeiten.",
            icon: "⚡",
          },
          {
            title: "Auf jedem Gerät",
            description: "Funktioniert auf Desktop, Tablet und Smartphone mit modernen Browsern.",
            icon: "📱",
          },
        ],
      },
      callout: {
        title: "Hilf, ihatelovepdf kostenlos zu halten",
        description:
          "Jede Spende deckt Hosting, Entwicklungszeit und sorgt für ein 100 % privates Erlebnis ohne Werbung oder Tracker.",
        ctaLabel: "Projekt unterstützen",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "So setzen wir die Mittel ein",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Häufig gestellte Fragen",
      intro: "Antworten auf die häufigsten Fragen zu ihatelovepdf",
      cta: {
        title: "ihatelovepdf jetzt ausprobieren",
        description:
          "PDFs zusammenfügen, komprimieren, teilen, extrahieren und neu ordnen - mit voller Privatsphäre. Keine Anmeldung, kein Hochladen.",
        ctaLabel: "Zum Toolkit",
      },
    },
    support: {
      hero: {
        eyebrow: "Kleines Indie-Projekt",
        title: "Hilf, ihatelovepdf kostenlos und privat zu halten",
        subtitle:
          "ihatelovepdf ist ein kleines Herzensprojekt. Deine Unterstützung finanziert die Server und schafft Zeit für neue Funktionen.",
        highlight: "Ein kleines Tool, das deine Privatsphäre respektiert.",
      },
      reasons: {
        title: "Warum spenden?",
        cards: [
          {
            title: "Kostenlos erhalten",
            description:
              "Spenden ermöglichen es, ihatelovepdf für alle kostenlos zu lassen - ohne Premium-Stufen oder gesperrte Funktionen.",
            icon: "💚",
          },
          {
            title: "Weiterentwickeln",
            description:
              "Deine Hilfe bezahlt Fehlerbehebungen, neue Werkzeuge und den Feinschliff für schnelle Abläufe.",
            icon: "✨",
          },
          {
            title: "Privatsphäre schützen",
            description:
              "Wir verarbeiten alles lokal, damit deine PDFs auf deinem Gerät bleiben. Spenden sichern dieses Konzept.",
            icon: "🔒",
          },
        ],
      },
      tiers: {
        title: "Gib, was möglich ist",
        description: "Jeder Betrag hilft. Sichere Zahlung über Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Ein Kaffee",
            amount: "€3",
            description: "Deckt das Hosting für ein paar Wochen.",
            ctaLabel: "€3 spenden",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Monatliche Unterstützung",
            amount: "€10/Monat",
            description: "Schenkt uns jede Woche Zeit, um ihatelovepdf besser zu machen.",
            ctaLabel: "€10/Monat spenden",
            ctaHref: "#stripe-checkout-monthly",
            badge: "Danke",
          },
          {
            id: "custom",
            title: "Eigener Betrag",
            amount: "Beliebig",
            description: "Jeder Euro zählt. Wähle den Betrag, der für dich passt.",
            ctaLabel: "Betrag wählen",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Stripe-Zahlungen sind sicher. Wiederkehrende Spenden kannst du jederzeit stoppen.",
      },
      transparency: {
        title: "Wofür wir es ausgeben",
        items: [
          "Hosting und CDN, damit die Seite überall schnell bleibt",
          "Entwicklungszeit für Fehlerbehebungen und neue Features",
          "Design- und UX-Verbesserungen, damit alles leicht zu bedienen ist",
          "Übersetzungen und Dokumentation für alle unterstützten Sprachen",
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
            question: "Bekomme ich eine Bestätigung?",
            answer:
              "Ja. Stripe sendet dir automatisch eine E-Mail mit der Zahlungsbestätigung.",
          },
          {
            question: "Wie kündige ich eine wiederkehrende Spende?",
            answer:
              "Du kannst das im Stripe-Portal erledigen oder uns schreiben - wir beenden sie sofort und ohne Nachfragen.",
          },
        ],
      },
      closing: {
        title: "Danke, dass du da bist",
        description:
          "Jede Person, die ihatelovepdf unterstützt, hilft dabei, ein nützliches, datenschutzfreundliches PDF-Toolkit für alle zu erhalten.",
        ctaLabel: "Team kontaktieren",
        ctaHref: "mailto:info@ihatelovepdf.com?subject=Hallo%20ihatelovepdf-Team",
      },
      legalNotice: {
        title: "Rechtlicher Hinweis & Transparenz",
        points: [
          "ihatelovepdf ist ein unabhängiges persönliches Projekt eines kleinen ehrenamtlichen Teams.",
          "Beiträge sind freiwillig und finanzieren Hosting, Werkzeuge sowie Entwicklungszeit.",
          "Zahlungen sind keine Spenden im steuerlichen Sinne und berechtigen nicht zu Abzügen; Stripe verschickt automatisch eine Quittung.",
          "Der Dienst wird ohne Gewähr bereitgestellt. Fragen? Schreib an info@ihatelovepdf.com.",
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
