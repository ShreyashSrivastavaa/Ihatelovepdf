import { localeLabels } from "../../config";
import { getRoutePath, getOperationPath } from "../../routing";
import { operationsHu } from "./operations";
import { faqsHu } from "./faqs";
import type { Dictionary } from "../dictionary-types";
import { OperationKey } from "../../../types/operations";

const locale = "hu" as const;
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

export const huDictionary: Dictionary = {
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
      title: "ihatelovepdf â€“ PDF tÃ¶mÃ¶rÃ­tÃ©se, Ã¶sszefÅ±zÃ©se Ã©s konvertÃ¡lÃ¡sa ingyen",
      description:
        "A ihatelovepdf egy adatvÃ©delemre Ã¶sszpontosÃ­tÃ³ PDF-eszkÃ¶zkÃ©szlet, amely kÃ¶zvetlenÃ¼l a bÃ¶ngÃ©szÅ‘dben Ã¶sszefÅ±zi, tÃ¶mÃ¶rÃ­ti, szÃ©tbontja, kinyeri, elforgatja Ã©s konvertÃ¡lja a PDF-eket. Minden feldolgozÃ¡s az eszkÃ¶zÃ¶dÃ¶n marad.",
      keywords: [
        "pdf tÃ¶mÃ¶rÃ­tÃ©s",
        "pdf compress",
        "pdf Ã¶sszefÅ±zÃ©s",
        "pdf merge",
        "pdf split",
        "pdf szÃ©tbontÃ¡sa",
        "pdf oldalak kivÃ¡lasztÃ¡sa",
        "extract pdf",
        "pdf forgatÃ¡sa",
        "pdf rotate",
        "pdf kÃ¶rÃ¼lvÃ¡gÃ¡s",
        "pdf Ã¡trendezÃ©s",
        "pdf kÃ©pekbe",
        "kÃ©pek pdf-be",
        "pdf konvertÃ¡lÃ¡s",
        "pdf konvertÃ¡lÃ¡s online",
        "pdf png-be",
        "jpg pdf-be",
        "pdf szerkesztÃ©s offline",
        "pdf eszkÃ¶zkÃ©szlet",
        "pdf adatvÃ©delem",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "ihatelovepdf â€“ PDF tÃ¶mÃ¶rÃ­tÃ©se, Ã¶sszefÅ±zÃ©se, szÃ©tbontÃ¡sa, kÃ©pekbe konvertÃ¡lÃ¡sa",
        description:
          "FÅ±zd Ã¶ssze, tÃ¶mÃ¶rÃ­tsd, oszd fel, nyerd ki, rendezd Ã¡t Ã©s konvertÃ¡ld a PDF-eket szerverre valÃ³ feltÃ¶ltÃ©s nÃ©lkÃ¼l. Ingyenes, privÃ¡t, helyi feldolgozÃ¡ssal.",
        url: `${siteUrl}${homePath}`,
        locale: "hu_HU",
        type: "website",
        imageUrl: "https://ihatelovepdf.com/og-images/og-image-hu.png",
        imageAlt: "ihatelovepdf - PrivÃ¡t Ã©s ingyenes PDF-feldolgozÃ¡s",
      },
    },
    faq: {
      title: "Gyakori kÃ©rdÃ©sek | ihatelovepdf â€“ Ingyenes PDF-eszkÃ¶zkÃ©szlet",
      description:
        "VÃ¡laszok a ihatelovepdf-re vonatkozÃ³ leggyakoribb kÃ©rdÃ©sekre. Tudd meg, hogyan fÅ±zheted Ã¶ssze, tÃ¶mÃ¶rÃ­theted, bonthatod szÃ©t, kinyerheted Ã©s rendezheted Ã¡t a PDF-eket fÃ¡jlok feltÃ¶ltÃ©se nÃ©lkÃ¼l.",
      keywords: [
        "ihatelovepdf gyakori kerdesek",
        "pdf kÃ©rdÃ©sek",
        "pdf segÃ­tsÃ©g",
        "pdf Ã¶sszefÅ±zÃ©s segÃ­tsÃ©g",
        "pdf tÃ¶mÃ¶rÃ­tÃ©s segÃ­tsÃ©g",
        "pdf szÃ©tbontÃ¡s segÃ­tsÃ©g",
        "pdf elforgatÃ¡sa",
        "pdf Ã¡trendezÃ©s",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "TÃ¡mogasd a ihatelovepdf-t | Tartsd fenn ingyenesen Ã©s privÃ¡t mÃ³don",
      description:
        "A tÃ¡mogatÃ¡sod lehetÅ‘vÃ© teszi, hogy a ihatelovepdf kis, fÃ¼ggetlen Ã©s adatvÃ©delemre Ã¶sszpontosÃ­tÃ³ projekt maradjon. SegÃ­ts fedezni a tÃ¡rhellyel Ã©s fejlesztÃ©ssel kapcsolatos kÃ¶ltsÃ©geket.",
      keywords: [
        "ihatelovepdf tÃ¡mogatÃ¡sa",
        "pdf eszkÃ¶z segÃ­tÃ©se",
        "adatvÃ©delmi projektek tÃ¡mogatÃ¡sa",
        "ihatelovepdf stripe adomÃ¡ny",
        "ihatelovepdf ingyenesen megtartÃ¡sa",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    operations: operationsHu,
  },
  brand: {
    name: "ihatelovepdf",
    tagline: "Helyi feldolgozÃ¡s â€¢ 100% privÃ¡t",
  },
  components: {
    nav: {
      home: "FÅ‘oldal",
      faq: "Gyakori kÃ©rdÃ©sek",
      support: "TÃ¡mogatÃ¡s",
      photo: "FotoLince",
      languageLabel: "Nyelv",
      menuLabel: "NavigÃ¡ciÃ³s menÃ¼ megnyitÃ¡sa",
    },
    footer: {
      privacy: "Helyi feldolgozÃ¡s â€¢ 100% privÃ¡t â€¢ NyÃ­lt licencek",
      rights: `Â© ${new Date().getFullYear()} ihatelovepdf â€” PDF-eszkÃ¶zÃ¶k az adatvÃ©delem kompromisszuma nÃ©lkÃ¼l`,
      links: {
        home: "FÅ‘oldal",
        faq: "Gyakori kÃ©rdÃ©sek",
        support: "TÃ¡mogatÃ¡s",
        photo: "FotoLince",
        contact: "Kapcsolat",
      },
      capabilitiesLabel: "NÃ©pszerÅ± mÅ±veletek",
      operations: {
        merge: "PDF Ã¶sszefÅ±zÃ©se",
        compress: "PDF tÃ¶mÃ¶rÃ­tÃ©se",
        split: "PDF szÃ©tbontÃ¡sa",
        extract: "Oldalak kinyerÃ©se",
        crop: "Oldalak vÃ¡gÃ¡sa",
        rotate: "ForgatÃ¡s",
        reorder: "ÃtrendezÃ©s",
        pdfToImages: "PDF kÃ©pekbe",
        imagesToPdf: "KÃ©pek PDF-be",
      },
      license: "PDF-feldolgozÃ¡s: PDF-lib (MIT), PDF.js (Apache 2.0) â€¢ BetÅ±kÃ©szlet: Geist (MIT)",
      disclaimer:
        "A szolgÃ¡ltatÃ¡s \"jelenlegi Ã¡llapotÃ¡ban\" kerÃ¼l Ã¡tadÃ¡sra, mindenfÃ©le garancia nÃ©lkÃ¼l. A fÃ¡jlok felhasznÃ¡lÃ¡sÃ¡Ã©rt kizÃ¡rÃ³lag a felhasznÃ¡lÃ³ felel.",
    },
    notifications: {
      labels: {
        success: "Sikeres",
        error: "Hiba",
        info: "Ã‰rtesÃ­tÃ©s",
        warning: "FigyelmeztetÃ©s",
      },
      closeLabel: "BezÃ¡rÃ¡s",
    },
    fotolinceBanner: {
      eyebrow: "KÃ©peket kell optimalizÃ¡lnod?",
      title: "TÃ¶mÃ¶rÃ­tsd, mÃ©retezd Ã¡t vagy konvertÃ¡ld a FotoLince-szel",
      description:
        "EszkÃ¶zkÃ©szletÃ¼nk helyben dolgozza fel a JPG, PNG Ã©s WEBP fÃ¡jlokat â€“ tÃ¶kÃ©letes a kÃ©pek mÃ©retÃ©nek csÃ¶kkentÃ©sÃ©hez, mielÅ‘tt PDF-be konvertÃ¡lnÃ¡d Å‘ket.",
      ctaLabel: "FotoLince megnyitÃ¡sa",
      ctaHref: "https://fotolince.com",
      imageAlt: "FotoLince logÃ³",
    },
    feedback: {
      question: "Hasznos volt?",
      thanks: "KÃ¶szÃ¶njÃ¼k a visszajelzÃ©st!",
      whatWrong: "Mondd el, mi nem mÅ±kÃ¶dÃ¶tt jÃ³l",
      emailSubject: "VisszajelzÃ©s a ihatelovepdf-nek",
    },
    pdfProcessor: {
      title: "VÃ¡lassz mÅ±veletet",
      modes: {
        merge: {
          label: "PDF Ã¶sszefÅ±zÃ©se",
          helper: "Rendezd a PDF-fÃ¡jlokat egyetlen dokumentumba valÃ³ Ã¶sszefÅ±zÃ©shez.",
        },
        compress: {
          label: "PDF tÃ¶mÃ¶rÃ­tÃ©se",
          helper: "CsÃ¶kkentsd a PDF mÃ©retÃ©t. A legjobb minÅ‘sÃ©g-sebessÃ©g egyensÃºly Ã©rdekÃ©ben egyszerre egy fÃ¡jlt dolgozz fel.",
        },
        split: {
          label: "PDF szÃ©tbontÃ¡sa",
          helper: "VÃ¡lassz PDF-fÃ¡jlokat kÃ¼lÃ¶nÃ¡llÃ³ dokumentumokra valÃ³ szÃ©tbontÃ¡shoz.",
        },
        extract: {
          label: "Oldalak kinyerÃ©se",
          helper: "VÃ¡lassz ki egyes oldalakat Ãºj dokumentum lÃ©trehozÃ¡sÃ¡hoz.",
        },
        crop: {
          label: "Oldalak vÃ¡gÃ¡sa",
          helper: "TÃ¡volÃ­tsd el a kivÃ¡lasztott oldalak lÃ¡thatÃ³ margÃ³it a bÃ¶ngÃ©szÅ‘ elhagyÃ¡sa nÃ©lkÃ¼l.",
        },
        rotate: {
          label: "Oldalak forgatÃ¡sa",
          helper: "VÃ¡lassz ki helytelen tÃ¡jolÃ¡sÃº oldalakat, Ã©s forgasd el Å‘ket.",
        },
        reorder: {
          label: "ÃtrendezÃ©s",
          helper: "MÃ³dosÃ­tsd az oldalak sorrendjÃ©t a PDF-ben.",
        },
        pdfToImages: {
          label: "PDF kÃ©pekbe",
          helper: "ExportÃ¡ld az egyes PDF-oldalakat PNG vagy JPEG formÃ¡tumban szerverre feltÃ¶ltÃ©s nÃ©lkÃ¼l.",
        },
        imagesToPdf: {
          label: "KÃ©pek PDF-be",
          helper: "KombinÃ¡lj JPG, PNG vagy WEBP kÃ©peket PDF-be testre szabhatÃ³ elrendezÃ©ssel.",
        },
      },
      upload: {
        title: "FÃ¡jlok kivÃ¡lasztÃ¡sa",
        clearAll: "Ã–sszes tÃ¶rlÃ©se",
        listHeadings: {
          merge: "Ã–sszefÅ±zendÅ‘ fÃ¡jlok (hÃºzd Ã¡t a sorrend beÃ¡llÃ­tÃ¡sÃ¡hoz):",
          extract: "VÃ¡lassz fÃ¡jlt az oldalak feldolgozÃ¡sÃ¡hoz:",
          crop: "VÃ¡lassz fÃ¡jlt az oldalak feldolgozÃ¡sÃ¡hoz:",
          rotate: "VÃ¡lassz fÃ¡jlt az oldalak feldolgozÃ¡sÃ¡hoz:",
          reorder: "VÃ¡lassz fÃ¡jlt az oldalak feldolgozÃ¡sÃ¡hoz:",
          pdfToImages: "KonvertÃ¡landÃ³ PDF (egymÃ¡s utÃ¡n dolgozva fel):",
          imagesToPdf: "KombinÃ¡landÃ³ kÃ©pek (hÃºzd Ã¡t a vÃ©gsÅ‘ sorrend megadÃ¡sÃ¡hoz):",
          default: "KivÃ¡lasztott fÃ¡jlok (hÃºzd Ã¡t vagy tÃ¶rÃ¶ld):",
        },
        hints: {
          compress: "Minden fÃ¡jl kÃ¼lÃ¶n-kÃ¼lÃ¶n kerÃ¼l tÃ¶mÃ¶rÃ­tÃ©sre az optimÃ¡lis minÅ‘sÃ©g-mÃ©ret arÃ¡ny szerint.",
          split: "Minden PDF a kÃ¶vetkezÅ‘ lÃ©pÃ©sben megadott beÃ¡llÃ­tÃ¡sok alapjÃ¡n kerÃ¼l szÃ©tbontÃ¡sra.",
          crop: "VÃ¡laszd ki a vÃ¡gandÃ³ oldalakat, majd hatÃ¡rozd meg, hÃ¡ny pontot kell eltÃ¡volÃ­tani minden oldalrÃ³l.",
          pdfToImages: "Egyszerre egy PDF-et dolgozunk fel. Az exportÃ¡lÃ¡s elÅ‘tt Ã¡llÃ­tsd be a formÃ¡tumot Ã©s a DPI-t.",
          imagesToPdf: "Adj hozzÃ¡ JPG, PNG, WEBP vagy TIFF kÃ©peket. A mÃ©ret, a margÃ³k Ã©s a szÃ­n a beÃ¡llÃ­tÃ¡sok panelen mÃ³dosÃ­thatÃ³.",
        },
      },
      downloadNames: {
        compress: "tomoritett_ihatelovepdf",
        merge: "osszefuzott_ihatelovepdf",
        split: "resz_ihatelovepdf",
        extract: "kinyert_ihatelovepdf",
        crop: "vagott_ihatelovepdf",
        rotate: "forgatott_ihatelovepdf",
        reorder: "atrendezett_ihatelovepdf",
        pdfToImages: "kepek_ihatelovepdf",
        imagesToPdf: "kepek_pdf_ihatelovepdf",
      },
      processButton: {
        idleSingle: "1 fÃ¡jl feldolgozÃ¡sa",
        idleMultiple: (count: number) => `${count} fÃ¡jl feldolgozÃ¡sa`,
        processing: "FeldolgozÃ¡s...",
        extract: (count: number) => `${count} oldal kinyerÃ©se`,
        crop: (count: number) =>
          count > 0 ? `${count} oldal vÃ¡gÃ¡sa` : "PDF vÃ¡gÃ¡sa",
        rotate: (count: number) =>
          count > 0 ? `${count} oldal forgatÃ¡sa` : "PDF forgatÃ¡sa",
        reorder: "Sorrend mentÃ©se",
        pdfToImages: {
          single: "KÃ©pek exportÃ¡lÃ¡sa",
          multiple: (count: number) => `${count} PDF exportÃ¡lÃ¡sa`,
        },
        imagesToPdf: {
          single: "PDF lÃ©trehozÃ¡sa",
          multiple: (count: number) => `PDF lÃ©trehozÃ¡sa ${count} kÃ©pbÅ‘l`,
        },
      },
      statusMessages: {
        info: (mode: string) => `FeldolgozÃ¡s (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `TÃ¶mÃ¶rÃ­tve. CsÃ¶kkentÃ©s: ${reduction}% (${original} â†’ ${next}) ${seconds} mp alatt`,
        merged: "Ã–sszefÅ±zÃ©s kÃ©sz",
        split: (count: number) =>
          count > 1
            ? `${count} fÃ¡jl lÃ©trehozva. Az elsÅ‘ letÃ¶ltÃ©se folyamatban...`
            : "SzÃ©tbontÃ¡s kÃ©sz",
        extracted: (count: number) => `${count} oldal kinyerve`,
        cropped: (count: number) => `${count} oldal levÃ¡gva`,
        rotated: (count: number) => `${count} oldal elforgatva`,
        reordered: "ÃtrendezÃ©s kÃ©sz",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `${count} ${label} kÃ©p exportÃ¡lva ZIP-archÃ­vumba`
            : `${count} ${label} kÃ©p letÃ¶ltve`;
        },
        imagesToPdf: (count: number) =>
          `PDF lÃ©trehozva ${count} kÃ©pbÅ‘l`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "Nincs generÃ¡lt eredmÃ©ny",
        mergeRequiresTwo: "VÃ¡lassz legalÃ¡bb kÃ©t fÃ¡jlt",
        noPagesSelected: "VÃ¡lassz legalÃ¡bb egy oldalt",
        invalidFile: "VÃ¡lassz Ã©rvÃ©nyes fÃ¡jlt",
        reorderEmpty: "Nem Ã©szlelhetÅ‘ Ãºj sorrend",
        unknown: "Ismeretlen hiba",
        modeNotSupported: "Nem tÃ¡mogatott mÃ³d",
      },
      labels: {
        pagesToExtract: "Kinyerni kÃ­vÃ¡nt oldalak kivÃ¡lasztÃ¡sa:",
        pagesToCrop: "VÃ¡gni kÃ­vÃ¡nt oldalak kivÃ¡lasztÃ¡sa:",
        pagesToRotate: "Forgatni kÃ­vÃ¡nt oldalak kivÃ¡lasztÃ¡sa:",
        reorderPages: "HÃºzd az oldalakat az Ã¡trendezÃ©shez:",
      },
      compressionPreview: {
        title: "TÃ¶mÃ¶rÃ­tÃ©si elÅ‘nÃ©zet",
        description:
          "ÃllÃ­tsd be a paramÃ©tereket a kimeneti mÃ©ret becslÃ©sÃ©nek megtekintÃ©sÃ©hez a tÃ¶mÃ¶rÃ­tÃ©s megkezdÃ©se elÅ‘tt.",
        running: "ElÅ‘nÃ©zet kiszÃ¡mÃ­tÃ¡saâ€¦",
        readyLabel: "BecsÃ¼lt mÃ©ret",
        ratio: (percent: string) => `${percent}%-kal kisebb`,
        saved: (size: string) => `${size} megtakarÃ­tÃ¡s`,
        time: (seconds: string) => `â‰ˆ ${seconds} mp`,
        original: "Eredeti",
        result: "BecsÃ¼lt",
        notice:
          "Az elÅ‘nÃ©zet helyben fut. Semmi nem kerÃ¼l fel a szervereinkre.",
        error: "Nem sikerÃ¼lt elÅ‘nÃ©zetet lÃ©trehozni.",
        retry: "ElÅ‘nÃ©zet ÃºjraprÃ³bÃ¡lÃ¡sa",
        universalBadge: "UniverzÃ¡lis optimalizÃ¡lÃ¡s",
      },
      compressionSummary: {
        title: "UtolsÃ³ tÃ¶mÃ¶rÃ­tÃ©s",
        ratio: (percent: string) => `${percent}%-kal kisebb`,
        saved: (size: string) => `${size} megtakarÃ­tva`,
        original: "Eredeti",
        result: "TÃ¶mÃ¶rÃ­tett",
        duration: (seconds: string) => `Befejezve ${seconds} mp alatt`,
        download: "Ãšjra letÃ¶ltÃ©s",
        clear: "Ã–sszesÃ­tÃ©s tÃ¶rlÃ©se",
      },
      donationReminder: {
        message: "A ihatelovepdf segÃ­tett idÅ‘t megtakarÃ­tani? TÃ¡mogatÃ¡soddal ingyenes marad.",
        actionLabel: "ihatelovepdf tÃ¡mogatÃ¡sa",
        withSavings: (percent: string, saved: string) =>
          `MegtakarÃ­tottÃ¡l ${saved}-t (${percent}%)? SegÃ­ts megÅ‘rizni a ihatelovepdf-t reklÃ¡mmentesen.`,
      },
      statusDialog: {
        processingTitle: "Helyi feldolgozÃ¡s",
        successTitle: "A fÃ¡jlaid kÃ©szen Ã¡llnak",
        successDescription:
          "A letÃ¶ltÃ©s automatikusan elindul.",
        resultsLabel: "UtolsÃ³ eredmÃ©ny",
        filesProcessedLabel: (count: number) =>
          `${count} fÃ¡jl feldolgozva`,
        downloadAgainLabel: "LetÃ¶ltÃ©s",
        errorTitle: "FeldolgozÃ¡si hiba",
        errorDescription: "Nem sikerÃ¼lt vÃ©grehajtani a mÅ±veletet. EllenÅ‘rizd a fÃ¡jlokat.",
        retryLabel: "ÃšjraprÃ³bÃ¡lÃ¡s",
        closeLabel: "BezÃ¡rÃ¡s",
        sharePrompt: {
          dialogMessage: "A ihatelovepdf teljesen ingyenes, Ã©s tiszteletben tartja az adatvÃ©delmedet. SegÃ­ts megÅ‘rizni ezt azzal, hogy ajÃ¡nlod egy kollÃ©gÃ¡dnak.",
          shareText: "ImÃ©nt hasznÃ¡ltam a ihatelovepdf-t PDF-fÃ¡jlok kezelÃ©sÃ©re. Egy ingyenes, gyors Ã©s teljesen privÃ¡t eszkÃ¶zkÃ©szlet PDF-ek szÃ©tbontÃ¡sÃ¡hoz, tÃ¶mÃ¶rÃ­tÃ©sÃ©hez, Ã¶sszefÅ±zÃ©sÃ©hez Ã©s konvertÃ¡lÃ¡sÃ¡hoz kÃ¶zvetlenÃ¼l a bÃ¶ngÃ©szÅ‘ben. KivÃ¡lÃ³ Ã©rzÃ©keny dokumentumokhoz!",
          actionLabel: "MegosztÃ¡s",
          copiedLabel: "MÃ¡solva!",
        },
      },
      compressionTotal: {
        title: "Ã–sszes megtakarÃ­tÃ¡s",
        savings: (size: string) => `Ã¶sszesen ${size} megtakarÃ­tva`,
        count: (count: number) => `${count} fÃ¡jl optimalizÃ¡lva`,
      },
    },
    fileUploader: {
      clickToSelect: "Kattints a kivÃ¡lasztÃ¡shoz",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "vagy hÃºzd ide a kÃ©peket" : "vagy hÃºzd ide a PDF-fÃ¡jlokat",
      accepted: {
        pdf: "PDF-fÃ¡jlok",
        images: "Elfogadott formÃ¡tumok: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `AjÃ¡nlott mÃ©ret: < ${sizeMb} MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Nem tÃ¡mogatott formÃ¡tum: ${fileName}. Csak ${label} engedÃ©lyezett.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `TÃºl nagy fÃ¡jl: ${fileName}. A maximÃ¡lis mÃ©ret ${sizeMb} MB.`,
      },
      dropImagesAlt: "HÃ¡ttÃ©rkÃ©p",
    },
    fileList: {
      moveUp: "MozgatÃ¡s fel",
      moveDown: "MozgatÃ¡s le",
      remove: "EltÃ¡volÃ­tÃ¡s",
      removeAll: "Ã–sszes eltÃ¡volÃ­tÃ¡sa",
      imageLabel: "KÃ©p",
      fileLabel: "FÃ¡jl",
      selected: "KivÃ¡lasztva",
      pdfLabel: "PDF",
      deselect: "KijelÃ¶lÃ©s tÃ¶rlÃ©se",
      pagesLabel: (count: number) => `${count} oldal`,
      previewLoading: "ElÅ‘nÃ©zet betÃ¶ltÃ©seâ€¦",
    },
    pageSelector: {
      loading: "Oldalak betÃ¶ltÃ©se...",
      error: "Nem sikerÃ¼lt betÃ¶lteni a PDF adatait",
      summary: (total: number, selected: number) =>
        `${total} oldal Ã©szlelve â€“ ${selected} kivÃ¡lasztva`,
      selectAll: "Ã–sszes kijelÃ¶lÃ©se",
      deselectAll: "Ã–sszes kijelÃ¶lÃ©s tÃ¶rlÃ©se",
      pageLabel: (pageNumber: number) => `${pageNumber}. oldal`,
      extraPages: (shown: number, total: number) =>
        `${total} oldalbÃ³l ${shown} jelenik meg. Add meg a tovÃ¡bbi oldalak szÃ¡mÃ¡t.`,
      manualLabel: "OldalszÃ¡mok megadÃ¡sa (pl. 21, 25-30)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Oldalak betÃ¶ltÃ©se...",
      error: "Nem sikerÃ¼lt betÃ¶lteni a PDF adatait",
      limitReached: (count: number) =>
        `Ez a PDF ${count} oldalt tartalmaz. TeljesÃ­tmÃ©nyi okokbÃ³l legfeljebb 120 oldal rendezhetÅ‘ Ã¡t.`,
      limitHint:
        "ElÅ‘szÃ¶r oszd fel a PDF-et kisebb rÃ©szekre.",
      summary: (count: number) => `${count} oldal kÃ©szen Ã¡ll az Ã¡trendezÃ©sre`,
      reset: "Sorrend visszaÃ¡llÃ­tÃ¡sa",
      dragHint: "HÃºzd az oldalakat a sorrend mÃ³dosÃ­tÃ¡sÃ¡hoz",
      pageLabel: (pageNumber: number) => `${pageNumber}. oldal`,
      originalLabel: (pageNumber: number) => `Eredeti: ${pageNumber}. oldal`,
      instructions:
        "HÃºzd az oldalakat a kÃ­vÃ¡nt sorrendbe. Ha kÃ©sz, kattints a \"Sorrend mentÃ©se\" gombra.",
    },
    processingOptions: {
      compress: {
        title: "TÃ¶mÃ¶rÃ­tÃ©s",
        level: "Szint",
        levels: {
          low: "Alacsony",
          medium: "KÃ¶zepes",
          high: "Magas",
        },
        removeMetadata: "Metaadatok eltÃ¡volÃ­tÃ¡sa",
        removeMetadataHint: "TÃ¶rli a rejtett adatokat, mint a szerzÅ‘ Ã©s az elÅ‘zmÃ©nyek.",
        stripAnnotations: "MegjegyzÃ©sek eltÃ¡volÃ­tÃ¡sa",
        stripAnnotationsHint: "TÃ¶rli a megjegyzÃ©seket, az Å±rlapokat Ã©s az alÃ¡Ã­rÃ¡sokat.",
        downscaleImages: "KÃ©pek Ã¡tmÃ©retezÃ©se",
        downscaleHint: "IdeÃ¡lis beszkennelt dokumentumokhoz.",
        advancedTitle: "SpeciÃ¡lis tisztÃ­tÃ¡s",
        advancedDescription: "Maradj az egyszerÅ± beÃ¡llÃ­tÃ¡soknÃ¡l, vagy aktivÃ¡ld a szÃ¼ksÃ©ges bÅ‘vÃ­tmÃ©nyeket.",
        activeLabel: "AktÃ­v:",
      },
      merge: {
        title: "Ã–sszefÅ±zÃ©s",
        pageDivider: "Ãœres oldal a dokumentumok kÃ¶zÃ¶tt",
        metadataTitle: "Az Ã¶sszefÅ±zÃ¶tt dokumentum neve (nem kÃ¶telezÅ‘)",
        metadataAuthor: "A dokumentum szerzÅ‘je (nem kÃ¶telezÅ‘)",
        metadataHint: "EgyÃ©ni metaadatok beÃ¡llÃ­tÃ¡sa.",
      },
      split: {
        title: "SzÃ©tbontÃ¡s",
        pagesPerFile: "Oldalak fÃ¡jlonkÃ©nt",
        pagesPerFileHint: "Minden N oldalnÃ¡l Ãºj PDF jÃ¶n lÃ©tre.",
      },
      extract: {
        title: "KinyerÃ©s",
        preserveMetadata: "Metaadatok megÅ‘rzÃ©se",
        preserveMetadataHint: "Megtartja a cÃ­met, a szerzÅ‘t Ã©s mÃ¡s adatokat.",
      },
      crop: {
        title: "VÃ¡gÃ¡s",
        hint: "VÃ¡laszd ki a vÃ¡gandÃ³ oldalakat, Ã©s hatÃ¡rozd meg a margÃ³kat.",
        inputModeLabel: "MÃ³dszer",
        inputModes: {
          margins: "MargÃ³k beÃ¡llÃ­tÃ¡sa",
          manual: "ManuÃ¡lis kijelÃ¶lÃ©s",
        },
        marginsTitle: "MargÃ³k",
        marginLabels: {
          top: "FelsÅ‘ margÃ³ (pont)",
          right: "Jobb margÃ³ (pont)",
          bottom: "AlsÃ³ margÃ³ (pont)",
          left: "Bal margÃ³ (pont)",
        },
        marginHint: "72 pont â‰ˆ 1 hÃ¼velyk.",
        preserveMetadata: "Metaadatok megÅ‘rzÃ©se",
        preserveMetadataHint: "Megtartja a cÃ­met, a szerzÅ‘t Ã©s mÃ¡s adatokat.",
        manual: {
          title: "ManuÃ¡lis kijelÃ¶lÃ©s",
          hint: "HÃºzd a keretet az elÅ‘nÃ©zeten a lÃ¡thatÃ³ terÃ¼let meghatÃ¡rozÃ¡sÃ¡hoz.",
          loading: "BetÃ¶ltÃ©s...",
          error: "Nem sikerÃ¼lt betÃ¶lteni az elÅ‘nÃ©zetet.",
          reset: "VisszaÃ¡llÃ­tÃ¡s",
          pagePreview: (pageNumber: number) => `${pageNumber}. oldal elÅ‘nÃ©zete`,
        },
      },
      rotate: {
        title: "ForgatÃ¡s",
        hint: "VÃ¡lassz irÃ¡nyt, Ã©s jelÃ¶ld meg az oldalakat.",
        rotateRight90: "ForgatÃ¡s jobbra (90Â°)",
        rotate180: "ForgatÃ¡s (180Â°)",
        rotateLeft90: "ForgatÃ¡s balra (90Â°)",
      },
      reorder: {
        title: "ÃtrendezÃ©s",
        hint: "HÃºzd az elÅ‘nÃ©zeti kÃ©peket a sorrend mÃ³dosÃ­tÃ¡sÃ¡hoz.",
      },
      pdfToImages: {
        title: "ExportÃ¡lÃ¡s",
        formatLabel: "FormÃ¡tum",
        formatHint: "VÃ¡lassz PNG-t vesztesÃ©gmentes minÅ‘sÃ©gÃ©rt, vagy JPEG-et kisebb mÃ©retÃ©rt.",
        pngLabel: "PNG (vesztesÃ©gmentes)",
        jpegLabel: "JPEG (kisebb)",
        qualityLabel: "JPEG minÅ‘sÃ©g",
        qualityHint: "A magasabb minÅ‘sÃ©g tÃ¶bb rÃ©szletet Å‘riz meg.",
        dpiLabel: "DPI felbontÃ¡s",
        dpiHint: "A magasabb DPI javÃ­tja az Ã©lessÃ©get, de nÃ¶veli a fÃ¡jlmÃ©retet.",
        dpiPresets: {
          screen: "72 DPI Â· KÃ©pernyÅ‘",
          balanced: "144 DPI Â· KiegyensÃºlyozott",
          print: "300 DPI Â· NyomtatÃ¡s",
        },
        zipLabel: "KÃ©pek csomagolÃ¡sa ZIP-be",
        zipHint: "LetÃ¶ltÃ©s egyetlen archÃ­vumban.",
        baseNameLabel: "FÃ¡jlnÃ©v alap",
        baseNamePlaceholder: "ihatelovepdf_oldalak",
        baseNameHint: "Hagyd Ã¼resen az eredeti PDF neve hasznÃ¡latÃ¡hoz.",
      },
      imagesToPdf: {
        title: "Oldal elrendezÃ©se",
        layoutTitle: "Oldal elrendezÃ©se",
        fitLabel: "KÃ©p illesztÃ©se",
        fitOptions: {
          contain: "BelefÃ©rve (teljes kÃ©p megjelenÃ­tÃ©se)",
          cover: "KitÃ¶ltve (oldal lefedÃ©se)",
        },
        sizeLabel: "OldalmÃ©ret",
        sizeOptions: {
          auto: "Automatikus (kÃ©phez igazÃ­tva)",
          a4: "A4",
          letter: "Letter",
        },
        orientationLabel: "TÃ¡jolÃ¡s",
        orientationOptions: {
          auto: "Automatikus",
          portrait: "ÃllÃ³",
          landscape: "FekvÅ‘",
        },
        marginLabel: "MargÃ³k (pont)",
        marginHint: "Adj hozzÃ¡ fehÃ©r margÃ³t. 72 pont â‰ˆ 1 hÃ¼velyk.",
        backgroundLabel: "HÃ¡ttÃ©rszÃ­n",
        backgroundHint: "A kÃ©pek mÃ¶gÃ© alkalmazva.",
      },
    },
    cookieBanner: {
      message: "SÃ¼tiket hasznÃ¡lunk a forgalom elemzÃ©sÃ©hez. Az adataidat nem osztjuk meg harmadik felekkel.",
      accept: "ElfogadÃ¡s",
      decline: "ElutasÃ­tÃ¡s",
    },
  },
  pages: {
    home: {
      hero: {
        title: "ihatelovepdf: PDF tÃ¶mÃ¶rÃ­tÃ©se, Ã¶sszefÅ±zÃ©se Ã©s konvertÃ¡lÃ¡sa ingyen",
        subtitle:
          "TÃ¶mÃ¶rÃ­tsd, fÅ±zd Ã¶ssze, bontsd szÃ©t, nyerd ki, forgasd el Ã©s konvertÃ¡ld a PDF-eket kÃ¶zvetlenÃ¼l a bÃ¶ngÃ©szÅ‘dben. Szerverre feltÃ¶ltÃ©s nÃ©lkÃ¼l, teljesen privÃ¡t mÃ³don.",
        badges: [
          "PDF tÃ¶mÃ¶rÃ­tÃ©se",
          "PDF Ã¶sszefÅ±zÃ©se",
          "Helyi feldolgozÃ¡s",
          "ihatelovepdf tÃ¡mogatÃ¡sa",
        ],
        imageAlt: "PDF dokumentum illusztrÃ¡ciÃ³ja",
        ctaLinks: [
          {
            label: "PDF kÃ©pekbe",
            href: operationsRoutes.pdfToImages,
            description: "ExportÃ¡lÃ¡s PNG vagy JPEG formÃ¡tumban",
          },
          {
            label: "KÃ©pek PDF-be",
            href: operationsRoutes.imagesToPdf,
            description: "JPG, PNG vagy WEBP kombinÃ¡lÃ¡sa",
          },
        ],
      },
      why: {
        title: "MiÃ©rt vÃ¡laszd a ihatelovepdf-t?",
        cards: [
          {
            title: "AlapbÃ³l privÃ¡t",
            description:
              "A PDF-jeid soha nem hagyjÃ¡k el az eszkÃ¶zÃ¶det. Minden a bÃ¶ngÃ©szÅ‘dben zajlik.",
            icon: "ðŸ”’",
          },
          {
            title: "Gyors Ã©s hatÃ©kony",
            description:
              "A helyi motor maximÃ¡lis sebessÃ©get biztosÃ­t felhÅ‘alapÃº tÃ¡rhelytÅ‘l valÃ³ fÃ¼ggÃ©s nÃ©lkÃ¼l.",
            icon: "âš¡",
          },
          {
            title: "BÃ¡rhol mÅ±kÃ¶dik",
            description:
              "SzÃ¡mÃ­tÃ³gÃ©pen, tableten vagy okostelefonon â€“ elegendÅ‘ egy modern bÃ¶ngÃ©szÅ‘.",
            icon: "ðŸ“±",
          },
        ],
      },
      callout: {
        title: "SegÃ­ts megÅ‘rizni a ihatelovepdf-t ingyenesen",
        description:
          "Minden adomÃ¡nyod fedezi a tÃ¡rhelykÃ¶ltsÃ©geket, Ã©s lehetÅ‘vÃ© teszi a 100%-ban privÃ¡t, reklÃ¡m- Ã©s nyomkÃ¶vetÃ©s-mentes mÅ±kÃ¶dÃ©s fenntartÃ¡sÃ¡t.",
        ctaLabel: "Projekt tÃ¡mogatÃ¡sa",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "Tudd meg, hogyan hasznÃ¡ljuk fel az Ã¶sszeget",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Gyakori kÃ©rdÃ©sek",
      intro: "VÃ¡laszok a ihatelovepdf-re vonatkozÃ³ leggyakoribb kÃ©rdÃ©sekre",
      cta: {
        title: "PrÃ³bÃ¡ld ki a ihatelovepdf-t most",
        description:
          "FÅ±zd Ã¶ssze, tÃ¶mÃ¶rÃ­tsd, bontsd szÃ©t, nyerd ki, forgasd el Ã©s rendezd Ã¡t a PDF-eket teljes bizalmassÃ¡ggal.",
        ctaLabel: "UgrÃ¡s az eszkÃ¶zÃ¶khÃ¶z",
      },
    },
    support: {
      hero: {
        eyebrow: "ðŸŒ± FÃ¼ggetlen projekt",
        title: "SegÃ­ts megÅ‘rizni a ihatelovepdf-t ingyenesen Ã©s privÃ¡t mÃ³don",
        subtitle:
          "A ihatelovepdf egy kis, szenvedÃ©llyel fejlesztett projekt. A tÃ¡mogatÃ¡sod fedezi a szerverkÃ¶ltsÃ©geket.",
        highlight: "CsupÃ¡n egy egyszerÅ± eszkÃ¶z, amely tiszteletben tartja az adatvÃ©delmedet.",
      },
      reasons: {
        title: "MiÃ©rt tÃ¡mogasd?",
        cards: [
          {
            title: "Maradjon ingyenes",
            description:
              "Az adomÃ¡nyok lehetÅ‘vÃ© teszik, hogy a ihatelovepdf 100%-ban ingyenes maradjon mindenki szÃ¡mÃ¡ra.",
            icon: "ðŸ’š",
          },
          {
            title: "Folyamatos fejlesztÃ©s",
            description:
              "A tÃ¡mogatÃ¡sod finanszÃ­rozza a hibajavÃ­tÃ¡sokat Ã©s az Ãºj eszkÃ¶zÃ¶k fejlesztÃ©sÃ©t.",
            icon: "âœ¨",
          },
          {
            title: "AdatvÃ©delem megÅ‘rzÃ©se",
            description:
              "Mindent helyben dolgozunk fel. Az adomÃ¡nyok lehetÅ‘vÃ© teszik, hogy Ã­gy folytassuk.",
            icon: "ðŸ”’",
          },
        ],
      },
      tiers: {
        title: "Adj annyit, amennyit tudsz",
        description: "BÃ¡rmilyen Ã¶sszeg segÃ­t. BiztonsÃ¡gos fizetÃ©s Stripe-on keresztÃ¼l.",
        cards: [
          {
            id: "coffee",
            title: "VegyÃ©l egy kÃ¡vÃ©t",
            amount: "3 â‚¬",
            description: "NÃ©hÃ¡ny hÃ©tre fedezi a tÃ¡rhelykÃ¶ltsÃ©geket.",
            ctaLabel: "3 â‚¬ adomÃ¡nyozÃ¡sa",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Havi tÃ¡mogatÃ¡s",
            amount: "10 â‚¬/hÃ³",
            description: "Heti dedikÃ¡lt fejlesztÃ©si idÅ‘t biztosÃ­t a ihatelovepdf javÃ­tÃ¡sÃ¡ra.",
            ctaLabel: "10 â‚¬/hÃ³ adomÃ¡nyozÃ¡sa",
            ctaHref: "#stripe-checkout-monthly",
            badge: "ðŸ’™ KÃ¶szÃ¶njÃ¼k",
          },
          {
            id: "custom",
            title: "EgyÃ©ni Ã¶sszeg",
            amount: "BÃ¡rmilyen Ã¶sszeg",
            description: "Minden eurÃ³ szÃ¡mÃ­t. VÃ¡laszd a szÃ¡modra megfelelÅ‘ Ã¶sszeget.",
            ctaLabel: "Ã–sszeg kivÃ¡lasztÃ¡sa",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "BiztonsÃ¡gos fizetÃ©s Stripe-on keresztÃ¼l. Az ismÃ©tlÅ‘dÅ‘ adomÃ¡ny bÃ¡rmikor lemondhatÃ³.",
      },
      transparency: {
        title: "Mire megy a pÃ©nz",
        items: [
          "TÃ¡rhelyszolgÃ¡ltatÃ¡s Ã©s tartalomszolgÃ¡ltatÃ³ hÃ¡lÃ³zat (CDN) a webhely globÃ¡lisan gyors mÅ±kÃ¶dÃ©sÃ©hez",
          "FejlesztÅ‘i idÅ‘ a hibÃ¡k javÃ­tÃ¡sÃ¡ra Ã©s Ãºj funkciÃ³k hozzÃ¡adÃ¡sÃ¡ra",
          "DizÃ¡jn Ã©s UX fejlesztÃ©sek a lehetÅ‘ legjobb felhasznÃ¡lÃ³i Ã©lmÃ©ny Ã©rdekÃ©ben",
          "FordÃ­tÃ¡sok Ã©s dokumentÃ¡ciÃ³ minden tÃ¡mogatott nyelvhez",
        ],
      },
      faq: {
        title: "KÃ©rdÃ©sek",
        entries: [
          {
            question: "Mi tÃ¶rtÃ©nik, ha nem tudok adomÃ¡nyozni?",
            answer:
              "Semmi gond. A ihatelovepdf ingyenes marad. MÃ¡r az is Ã³riÃ¡si segÃ­tsÃ©g, ha megosztod mÃ¡sokkal.",
          },
          {
            question: "Kapok nyugtÃ¡t?",
            answer:
              "Igen. A Stripe automatikusan e-mailen kÃ¼ldi el a nyugtÃ¡t a fizetÃ©s Ã¶sszes adatÃ¡val.",
          },
          {
            question: "Hogyan mondhatom le az ismÃ©tlÅ‘dÅ‘ adomÃ¡nyt?",
            answer:
              "A Stripe portÃ¡lodon keresztÃ¼l kezelheted, vagy Ã­rj nekÃ¼nk e-mailt, Ã©s mi leÃ¡llÃ­tjuk.",
          },
        ],
      },
      closing: {
        title: "KÃ¶szÃ¶njÃ¼k, hogy itt vagy",
        description:
          "Mindenki, aki tÃ¡mogatja a ihatelovepdf-t, hozzÃ¡jÃ¡rul egy hasznos PDF-eszkÃ¶zkÃ©szlet Ã©letben tartÃ¡sÃ¡hoz.",
        ctaLabel: "E-mail kÃ¼ldÃ©se a csapatnak",
        ctaHref: "mailto:info@ihatelovepdf.com?subject=HellÃ³%20ihatelovepdf%20csapat",
      },
      legalNotice: {
        title: "Jogi tÃ¡jÃ©koztatÃ³ Ã©s Ã¡tlÃ¡thatÃ³sÃ¡g",
        points: [
          "A ihatelovepdf egy fÃ¼ggetlen szemÃ©lyes projekt, amelyet egy kis Ã¶nkÃ©ntes csapat kezel.",
          "A hozzÃ¡jÃ¡rulÃ¡sok Ã¶nkÃ©ntesek, Ã©s kizÃ¡rÃ³lag a tÃ¡rhellyel Ã©s fejlesztÃ©ssel kapcsolatos kÃ¶ltsÃ©gek fedezÃ©sÃ©re szolgÃ¡lnak.",
          "A befizetÃ©sek nem adÃ³kedvezmÃ©nyes adomÃ¡nyok; a Stripe automatikus nyugtÃ¡t Ã¡llÃ­t ki.",
          "A szolgÃ¡ltatÃ¡s \"jelenlegi Ã¡llapotÃ¡ban\" kerÃ¼l nyÃºjtÃ¡sra, garancia nÃ©lkÃ¼l. KÃ©rdÃ©sek? info@ihatelovepdf.com.",
        ],
      },
    },
  },
  faqs: faqsHu,
  operations: operationsHu,
};
