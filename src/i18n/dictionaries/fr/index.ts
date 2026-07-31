import { localeLabels } from "../../config";
import { getRoutePath, getOperationPath } from "../../routing";
import { operationsFr } from "./operations";
import { faqsFr } from "./faqs";
import type { Dictionary } from "../dictionary-types";
import { OperationKey } from "../../../types/operations";

const locale = "fr" as const;
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

export const frDictionary: Dictionary = {
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
      title: "ihatelovepdf â€“ Fusionner, compresser et convertir des PDF gratuitement",
      description:
        "ihatelovepdf est une boÃ®te Ã  outils axÃ©e sur la confidentialitÃ© qui fusionne, compresse, divise, extrait, pivote et convertit des PDF directement dans votre navigateur. Tout le traitement reste sur l'appareil.",
      keywords: [
        "fusionner pdf",
        "compresser pdf",
        "diviser pdf",
        "extraire pages pdf",
        "pivoter pages pdf",
        "rÃ©organiser pdf",
        "pdf en images",
        "images en pdf",
        "convertir pdf",
        "convertir pdf en ligne",
        "convertir pdf en png",
        "jpg en pdf",
        "modifier pdf hors ligne",
        "boÃ®te Ã  outils pdf",
        "confidentialitÃ© pdf",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "ihatelovepdf â€“ Fusionner, Compresser, Diviser, PDF en Image",
        description:
          "Fusionnez, compressez, divisez, extrayez, rÃ©organisez et convertissez des PDF sans tÃ©lÃ©charger de fichiers. Gratuit, privÃ© et soutenu par un traitement entiÃ¨rement local.",
        url: `${siteUrl}${homePath}`,
        locale: "fr_FR",
        type: "website",
        imageUrl: "https://ihatelovepdf.com/og-images/og-image-fr.png",
        imageAlt: "ihatelovepdf - Traitement PDF privÃ© et gratuit",
      },
    },
    faq: {
      title: "FAQ | ihatelovepdf â€“ BoÃ®te Ã  outils de traitement PDF gratuite",
      description:
        "RÃ©ponses aux questions frÃ©quentes sur ihatelovepdf. Apprenez comment fusionner, compresser, diviser, extraire et rÃ©organiser des PDF sans tÃ©lÃ©charger vos fichiers.",
      keywords: [
        "ihatelovepdf faq",
        "questions pdf",
        "aide pdf",
        "aide fusion pdf",
        "aide compression pdf",
        "aide division pdf",
        "rotation pages pdf",
        "rÃ©organiser pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "Soutenir ihatelovepdf | Gardez la boÃ®te Ã  outils gratuite et privÃ©e",
      description:
        "Votre don permet Ã  ihatelovepdf de rester petit, indÃ©pendant et axÃ© sur la confidentialitÃ©. Aidez Ã  couvrir l'hÃ©bergement et les amÃ©liorations.",
      keywords: [
        "faire un don ihatelovepdf",
        "soutenir boÃ®te outils pdf",
        "financer projets confidentialitÃ©",
        "dons stripe ihatelovepdf",
        "garder ihatelovepdf gratuit",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    operations: operationsFr,
  },
  brand: {
    name: "ihatelovepdf",
    tagline: "Traitement local â€¢ 100% privÃ©",
  },
  components: {
    nav: {
      home: "Accueil",
      faq: "FAQ",
      support: "Soutenir",
      photo: "FotoLince",
      languageLabel: "Langue",
      menuLabel: "Basculer le menu de navigation",
    },
    footer: {
      privacy: "Traitement local â€¢ 100% privÃ© â€¢ Licences ouvertes",
      rights: `Â© ${new Date().getFullYear()} ihatelovepdf â€” Outils pour manipuler des PDF sans compromettre la confidentialitÃ©`,
      links: {
        home: "Accueil",
        faq: "FAQ",
        support: "Soutenir",
        photo: "FotoLince",
        contact: "Contact",
      },
      capabilitiesLabel: "Actions populaires",
      operations: {
        merge: "Fusionner des PDF",
        compress: "Compresser un PDF",
        split: "Diviser un PDF",
        extract: "Extraire des pages",
        crop: "Recadrer des pages",
        rotate: "Faire pivoter",
        reorder: "RÃ©organiser",
        pdfToImages: "PDF en images",
        imagesToPdf: "Images en PDF",
      },
      license: "Traitement PDF: PDF-lib (MIT), PDF.js (Apache 2.0) â€¢ Police: Geist (MIT)",
      disclaimer: "Le service est fourni Â« tel quel Â» sans garantie d'aucune sorte. L'utilisateur est responsable de l'utilisation des fichiers.",
    },
    notifications: {
      labels: {
        success: "SuccÃ¨s",
        error: "Erreur",
        info: "Avis",
        warning: "Avertissement",
      },
      closeLabel: "Fermer",
    },
    fotolinceBanner: {
      eyebrow: "Besoin d'optimiser des images ?",
      title: "Compressez, redimensionnez ou convertissez avec FotoLince",
      description:
        "Notre boÃ®te Ã  outils gÃ¨re les JPG, PNG et WEBP localement â€” parfait pour rÃ©duire les visuels avant de crÃ©er un PDF.",
      ctaLabel: "Ouvrir FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "Logo FotoLince",
    },
    feedback: {
      question: "Cela a-t-il Ã©tÃ© utile ?",
      thanks: "Merci pour vos commentaires !",
      whatWrong: "Dites-nous ce qui s'est mal passÃ©",
      emailSubject: "Commentaires pour ihatelovepdf",
    },
    pdfProcessor: {
      title: "Choisissez une opÃ©ration",
      modes: {
        merge: {
          label: "Fusionner PDF",
          helper: "Organisez les PDF pour les fusionner en un seul document.",
        },
        compress: {
          label: "Compresser PDF",
          helper: "RÃ©duisez la taille d'un PDF. Traitez un fichier Ã  la fois pour le meilleur Ã©quilibre entre qualitÃ© et vitesse.",
        },
        split: {
          label: "Diviser PDF",
          helper: "Choisissez des PDF pour les diviser en documents sÃ©parÃ©s.",
        },
        extract: {
          label: "Extraire Pages",
          helper: "Choisissez des pages spÃ©cifiques pour crÃ©er un nouveau document.",
        },
        crop: {
          label: "Recadrer Pages",
          helper: "Coupez les marges visibles des pages sÃ©lectionnÃ©es sans quitter le navigateur.",
        },
        rotate: {
          label: "Faire Pivoter",
          helper: "SÃ©lectionnez les pages qui nÃ©cessitent une nouvelle orientation et faites-les pivoter.",
        },
        reorder: {
          label: "RÃ©organiser",
          helper: "Modifiez l'ordre des pages Ã  l'intÃ©rieur d'un PDF.",
        },
        pdfToImages: {
          label: "PDF en images",
          helper: "Exportez chaque page PDF au format PNG ou JPEG sans tÃ©lÃ©chargement.",
        },
        imagesToPdf: {
          label: "Images en PDF",
          helper: "Combinez des images JPG, PNG ou WEBP dans un PDF avec une mise en page personnalisÃ©e.",
        },
      },
      upload: {
        title: "SÃ©lectionnez vos fichiers",
        clearAll: "Tout effacer",
        listHeadings: {
          merge: "Fichiers Ã  fusionner (rÃ©organiser pour dÃ©finir la sÃ©quence) :",
          extract: "SÃ©lectionnez un fichier pour travailler avec ses pages :",
          crop: "SÃ©lectionnez un fichier pour travailler avec ses pages :",
          rotate: "SÃ©lectionnez un fichier pour travailler avec ses pages :",
          reorder: "SÃ©lectionnez un fichier pour travailler avec ses pages :",
          pdfToImages: "PDF Ã  convertir (traitÃ©s un par un) :",
          imagesToPdf: "Images Ã  combiner (rÃ©organiser pour la sÃ©quence finale) :",
          default: "Fichiers sÃ©lectionnÃ©s (rÃ©organiser ou supprimer) :",
        },
        hints: {
          compress: "Chaque fichier est compressÃ© individuellement en utilisant le meilleur Ã©quilibre qualitÃ©-taille.",
          split: "Chaque PDF sera divisÃ© en fonction des options que vous sÃ©lectionnez Ã  l'Ã©tape suivante.",
          crop: "Choisissez les pages Ã  recadrer, puis dÃ©finissez combien de points couper de chaque cÃ´tÃ©.",
          pdfToImages: "Nous traitons un PDF Ã  la fois. Ajustez le format et le DPI avant d'exporter.",
          imagesToPdf: "DÃ©posez des images JPG, PNG, WEBP ou TIFF. Utilisez le panneau d'options pour choisir la taille, les marges et la couleur.",
        },
      },
      downloadNames: {
        compress: "compresse_ihatelovepdf",
        merge: "fusionne_ihatelovepdf",
        split: "partie_ihatelovepdf",
        extract: "extrait_ihatelovepdf",
        crop: "recadre_ihatelovepdf",
        rotate: "pivote_ihatelovepdf",
        reorder: "reorganise_ihatelovepdf",
        pdfToImages: "images_ihatelovepdf",
        imagesToPdf: "images_vers_pdf_ihatelovepdf",
      },
      processButton: {
        idleSingle: "Traiter 1 fichier",
        idleMultiple: (count: number) => `Traiter ${count} fichiers`,
        processing: "Traitement en cours...",
        extract: (count: number) => `Extraire ${count} page${count > 1 ? "s" : ""}`,
        crop: (count: number) =>
          count > 0 ? `Recadrer ${count} page${count > 1 ? "s" : ""}` : "Recadrer PDF",
        rotate: (count: number) =>
          count > 0 ? `Pivoter ${count} page${count > 1 ? "s" : ""}` : "Pivoter PDF",
        reorder: "Enregistrer l'ordre",
        pdfToImages: {
          single: "Exporter images",
          multiple: (count: number) => `Exporter ${count} PDF`,
        },
        imagesToPdf: {
          single: "CrÃ©er PDF",
          multiple: (count: number) => `CrÃ©er un PDF Ã  partir de ${count} images`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Traitement en cours (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `CompressÃ©. RÃ©duction : ${reduction}% (${original} â†’ ${next}) en ${seconds}s`,
        merged: "Fusion terminÃ©e",
        split: (count: number) =>
          count > 1
            ? `GÃ©nÃ©rÃ© ${count} fichiers. TÃ©lÃ©chargement du premier...`
            : "Division terminÃ©e",
        extracted: (count: number) => `Extrait ${count} page${count > 1 ? "s" : ""}`,
        cropped: (count: number) => `RecadrÃ© ${count} page${count > 1 ? "s" : ""}`,
        rotated: (count: number) => `PivotÃ© ${count} page${count > 1 ? "s" : ""}`,
        reordered: "RÃ©organisation terminÃ©e",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `ExportÃ© ${count} image${count > 1 ? "s" : ""} ${label} dans une archive ZIP`
            : `TÃ©lÃ©chargÃ© ${count} image${count > 1 ? "s" : ""} ${label}`;
        },
        imagesToPdf: (count: number) =>
          `PDF crÃ©Ã© Ã  partir de ${count} image${count > 1 ? "s" : ""}`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "Aucun rÃ©sultat produit",
        mergeRequiresTwo: "SÃ©lectionnez au moins deux fichiers",
        noPagesSelected: "Choisissez au moins une page",
        invalidFile: "Choisissez un fichier valide",
        reorderEmpty: "Aucun nouvel ordre dÃ©tectÃ©",
        unknown: "Erreur inconnue",
        modeNotSupported: "Mode non pris en charge",
      },
      labels: {
        pagesToExtract: "SÃ©lectionnez les pages Ã  extraire :",
        pagesToCrop: "SÃ©lectionnez les pages Ã  recadrer :",
        pagesToRotate: "SÃ©lectionnez les pages Ã  pivoter :",
        reorderPages: "Faites glisser les pages pour les rÃ©organiser :",
      },
      compressionPreview: {
        title: "AperÃ§u de la compression",
        description:
          "Ajustez les paramÃ¨tres pour estimer la taille de sortie avant de lancer la compression.",
        running: "Calcul de l'aperÃ§uâ€¦",
        readyLabel: "Sortie estimÃ©e",
        ratio: (percent: string) => `${percent}% plus petit`,
        saved: (size: string) => `${size} Ã©conomisÃ©s`,
        time: (seconds: string) => `â‰ˆ ${seconds}s`,
        original: "Original",
        result: "EstimÃ©",
        notice:
          "L'aperÃ§u s'exÃ©cute localement. Rien n'est tÃ©lÃ©chargÃ© sur nos serveurs.",
        error: "L'aperÃ§u n'a pas pu Ãªtre gÃ©nÃ©rÃ©.",
        retry: "RÃ©essayer l'aperÃ§u",
        universalBadge: "Optimisation Universelle",
      },
      compressionSummary: {
        title: "DerniÃ¨re compression",
        ratio: (percent: string) => `${percent}% plus petit`,
        saved: (size: string) => `${size} Ã©conomisÃ©s`,
        original: "Original",
        result: "CompressÃ©",
        duration: (seconds: string) => `TerminÃ© en ${seconds}s`,
        download: "TÃ©lÃ©charger Ã  nouveau",
        clear: "Effacer le rÃ©sumÃ©",
      },
      donationReminder: {
        message: "ihatelovepdf vous a-t-il fait gagner du temps ? Votre soutien le garde gratuit.",
        actionLabel: "Soutenir ihatelovepdf",
        withSavings: (percent: string, saved: string) =>
          `Ã‰conomisÃ© ${saved} (${percent}%) ? Aidez Ã  garder ihatelovepdf sans publicitÃ©.`,
      },
      statusDialog: {
        processingTitle: "Traitement local",
        successTitle: "Vos fichiers sont prÃªts",
        successDescription:
          "Les tÃ©lÃ©chargements dÃ©marrent automatiquement.",
        resultsLabel: "Dernier rÃ©sultat",
        filesProcessedLabel: (count: number) =>
          `${count} fichier${count > 1 ? "s" : ""} traitÃ©${count > 1 ? "s" : ""}`,
        downloadAgainLabel: "TÃ©lÃ©charger",
        errorTitle: "Ã‰chec du traitement",
        errorDescription: "Nous n'avons pas pu terminer cette opÃ©ration. VÃ©rifiez les fichiers.",
        retryLabel: "RÃ©essayer",
        closeLabel: "Fermer",
        sharePrompt: {
          dialogMessage: "ihatelovepdf est entiÃ¨rement gratuit et respecte votre vie privÃ©e. Aidez-nous Ã  le garder ainsi en le partageant avec un collÃ¨gue.",
          shareText: "Je viens d'utiliser ihatelovepdf pour gÃ©rer mes PDF. C'est une boÃ®te Ã  outils gratuite, rapide et totalement privÃ©e pour diviser, compresser, fusionner et convertir des PDF directement dans le navigateur. IdÃ©al pour les documents sensibles !",
          actionLabel: "Partager",
          copiedLabel: "CopiÃ© !",
        },
      },
      compressionTotal: {
        title: "Ã‰conomies totales",
        savings: (size: string) => `${size} Ã©conomisÃ©s au total`,
        count: (count: number) => `${count} fichiers optimisÃ©s`,
      },
    },
    fileUploader: {
      clickToSelect: "Cliquez pour sÃ©lectionner",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "ou glissez-dÃ©posez des images" : "ou glissez-dÃ©posez des fichiers PDF",
      accepted: {
        pdf: "Fichiers PDF",
        images: "Formats acceptÃ©s: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Taille recommandÃ©e : < ${sizeMb}Mo`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Type non pris en charge: ${fileName}. Seuls ${label} sont autorisÃ©s.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Fichier trop volumineux: ${fileName}. La taille maximale est de ${sizeMb}Mo.`,
      },
      dropImagesAlt: "Image d'espace rÃ©servÃ©",
    },
    fileList: {
      moveUp: "Monter",
      moveDown: "Descendre",
      remove: "Retirer",
      removeAll: "Tout retirer",
      imageLabel: "Image",
      fileLabel: "Fichier",
      selected: "SÃ©lectionnÃ©",
      pdfLabel: "PDF",
      deselect: "DÃ©sÃ©lectionner",
      pagesLabel: (count: number) => `${count} page${count > 1 ? "s" : ""}`,
      previewLoading: "Chargement de l'aperÃ§uâ€¦",
    },
    pageSelector: {
      loading: "Chargement des pages...",
      error: "Les informations du PDF n'ont pas pu Ãªtre chargÃ©es",
      summary: (total: number, selected: number) =>
        `${total} pages dÃ©tectÃ©es â€” ${selected} sÃ©lectionnÃ©es`,
      selectAll: "Tout sÃ©lectionner",
      deselectAll: "Tout dÃ©sÃ©lectionner",
      pageLabel: (pageNumber: number) => `Page ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Affichage de ${shown} sur ${total} pages. Saisissez les numÃ©ros des pages supplÃ©mentaires.`,
      manualLabel: "Saisir numÃ©ros (ex. 21, 25-30)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Chargement des pages...",
      error: "Les informations du PDF n'ont pas pu Ãªtre chargÃ©es",
      limitReached: (count: number) =>
        `Ce PDF compte ${count} pages. Pour des raisons de performances, vous pouvez rÃ©organiser jusqu'Ã  120 pages.`,
      limitHint:
        "Divisez d'abord le PDF en morceaux plus petits.",
      summary: (count: number) => `${count} pages prÃªtes Ã  Ãªtre rÃ©organisÃ©es`,
      reset: "Restaurer l'ordre",
      dragHint: "Faites glisser pour modifier l'ordre",
      pageLabel: (pageNumber: number) => `Page ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: Page ${pageNumber}`,
      instructions:
        'Faites glisser les pages. Une fois terminÃ©, cliquez sur "Enregistrer l\'ordre".',
    },
    processingOptions: {
      compress: {
        title: "Compression",
        level: "Niveau",
        levels: {
          low: "Faible",
          medium: "Moyen",
          high: "Ã‰levÃ©",
        },
        removeMetadata: "Supprimer mÃ©tadonnÃ©es",
        removeMetadataHint: "Supprime les dÃ©tails cachÃ©s comme l'auteur et l'historique.",
        stripAnnotations: "Supprimer les annotations",
        stripAnnotationsHint: "Supprime les notes, les formulaires et les signatures.",
        downscaleImages: "RÃ©duire les images",
        downscaleHint: "IdÃ©al pour les documents numÃ©risÃ©s.",
        advancedTitle: "Nettoyage avancÃ©",
        advancedDescription: "Gardez-le simple ou activez les extras dont vous avez besoin.",
        activeLabel: "ActivÃ© :",
      },
      merge: {
        title: "Fusionner",
        pageDivider: "Page vierge entre les documents",
        metadataTitle: "Titre du document fusionnÃ© (facultatif)",
        metadataAuthor: "Auteur du document (facultatif)",
        metadataHint: "DÃ©finissez des mÃ©tadonnÃ©es personnalisÃ©es.",
      },
      split: {
        title: "Diviser",
        pagesPerFile: "Pages par fichier",
        pagesPerFileHint: "Nous crÃ©erons un nouveau PDF toutes les N pages.",
      },
      extract: {
        title: "Extraire",
        preserveMetadata: "PrÃ©server les mÃ©tadonnÃ©es",
        preserveMetadataHint: "Conserve le titre, l'auteur et les dÃ©tails.",
      },
      crop: {
        title: "Recadrer",
        hint: "SÃ©lectionnez les pages Ã  recadrer et dÃ©finissez les marges.",
        inputModeLabel: "MÃ©thode",
        inputModes: {
          margins: "DÃ©finir les marges",
          manual: "SÃ©lection manuelle",
        },
        marginsTitle: "Marges",
        marginLabels: {
          top: "Marge supÃ©rieure (pts)",
          right: "Marge droite (pts)",
          bottom: "Marge infÃ©rieure (pts)",
          left: "Marge gauche (pts)",
        },
        marginHint: "72 pts Ã©quivaut Ã  environ 1 pouce.",
        preserveMetadata: "PrÃ©server les mÃ©tadonnÃ©es",
        preserveMetadataHint: "Conserve le titre, l'auteur et les dÃ©tails.",
        manual: {
          title: "SÃ©lection manuelle",
          hint: "Faites glisser sur l'aperÃ§u pour dÃ©finir la zone visible.",
          loading: "Chargement...",
          error: "L'aperÃ§u n'a pas pu Ãªtre chargÃ©.",
          reset: "RÃ©initialiser",
          pagePreview: (pageNumber: number) => `AperÃ§u page ${pageNumber}`,
        },
      },
      rotate: {
        title: "Pivoter",
        hint: "Choisissez la direction et marquez les pages.",
        rotateRight90: "Pivoter Ã  droite (90Â°)",
        rotate180: "Pivoter (180Â°)",
        rotateLeft90: "Pivoter Ã  gauche (90Â°)",
      },
      reorder: {
        title: "RÃ©organiser",
        hint: "Faites glisser les vignettes pour modifier l'ordre.",
      },
      pdfToImages: {
        title: "Exportation",
        formatLabel: "Format",
        formatHint: "Choisissez PNG pour une qualitÃ© sans perte ou JPEG pour des fichiers plus petits.",
        pngLabel: "PNG (sans perte)",
        jpegLabel: "JPEG (plus petit)",
        qualityLabel: "QualitÃ© JPEG",
        qualityHint: "Une qualitÃ© supÃ©rieure prÃ©serve plus de dÃ©tails.",
        dpiLabel: "Rendu DPI",
        dpiHint: "Un DPI plus Ã©levÃ© augmente la nettetÃ© et la taille du fichier.",
        dpiPresets: {
          screen: "72 DPI Â· Ã‰cran",
          balanced: "144 DPI Â· Ã‰quilibrÃ©",
          print: "300 DPI Â· Impression",
        },
        zipLabel: "Regrouper les images dans un ZIP",
        zipHint: "TÃ©lÃ©chargez une seule archive.",
        baseNameLabel: "Nom de fichier de base",
        baseNamePlaceholder: "ihatelovepdf_pages",
        baseNameHint: "Laissez vide pour rÃ©utiliser le nom du PDF.",
      },
      imagesToPdf: {
        title: "Mise en page",
        layoutTitle: "Mise en page",
        fitLabel: "Ajustement de l'image",
        fitOptions: {
          contain: "Contenir (afficher l'image entiÃ¨re)",
          cover: "Couvrir (remplir la page)",
        },
        sizeLabel: "Taille de page",
        sizeOptions: {
          auto: "Auto (correspond Ã  l'image)",
          a4: "A4",
          letter: "Lettre",
        },
        orientationLabel: "Orientation",
        orientationOptions: {
          auto: "Auto",
          portrait: "Portrait",
          landscape: "Paysage",
        },
        marginLabel: "Marges (pts)",
        marginHint: "Ajoute un espace blanc. 72 pts â‰ˆ 1 pouce.",
        backgroundLabel: "Couleur d'arriÃ¨re-plan",
        backgroundHint: "AppliquÃ© derriÃ¨re les images.",
      },
    },
    cookieBanner: {
      message: "Nous utilisons des cookies pour analyser le trafic. Nous ne partageons pas vos donnÃ©es.",
      accept: "Accepter",
      decline: "Refuser",
    },
  },
  pages: {
    home: {
      hero: {
        title: "ihatelovepdf: Compresser, fusionner et convertir PDF gratuitement",
        subtitle:
          "Compressez, fusionnez, divisez, extrayez, pivotez et convertissez des PDF directement dans votre navigateur. Aucun tÃ©lÃ©chargement, entiÃ¨rement privÃ©.",
        badges: [
          "Compresser PDF",
          "Fusionner PDF",
          "Traitement local",
          "Soutenir ihatelovepdf",
        ],
        imageAlt: "Illustration d'un document PDF",
        ctaLinks: [
          {
            label: "PDF en images",
            href: operationsRoutes.pdfToImages,
            description: "Exportez au format PNG ou JPEG",
          },
          {
            label: "Images en PDF",
            href: operationsRoutes.imagesToPdf,
            description: "Combinez JPG, PNG ou WEBP",
          },
        ],
      },
      why: {
        title: "Pourquoi utiliser ihatelovepdf ?",
        cards: [
          {
            title: "PrivÃ© par dÃ©faut",
            description:
              "Vos PDF ne quittent jamais votre appareil. Tout se passe dans votre navigateur.",
            icon: "ðŸ”’",
          },
          {
            title: "Rapide & efficace",
            description:
              "Notre moteur local offre une vitesse optimale sans tÃ©lÃ©chargement cloud.",
            icon: "âš¡",
          },
          {
            title: "Fonctionne partout",
            description:
              "Ordinateur, tablette ou tÃ©lÃ©phone â€” un navigateur moderne suffit.",
            icon: "ðŸ“±",
          },
        ],
      },
      callout: {
        title: "Aidez Ã  garder ihatelovepdf gratuit",
        description:
          "Chaque don couvre l'hÃ©bergement et nous permet de garder l'expÃ©rience 100% privÃ©e, sans publicitÃ© ni suivi.",
        ctaLabel: "Soutenir le projet",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "Voir comment nous utilisons les fonds",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Questions FrÃ©quentes",
      intro: "RÃ©ponses aux questions les plus courantes sur ihatelovepdf",
      cta: {
        title: "Essayez ihatelovepdf maintenant",
        description:
          "Fusionnez, compressez, divisez, extrayez, pivotez et rÃ©organisez des PDF en toute confidentialitÃ©.",
        ctaLabel: "Aller Ã  la boÃ®te Ã  outils",
      },
    },
    support: {
      hero: {
        eyebrow: "ðŸŒ± Projet indÃ©pendant",
        title: "Aidez Ã  garder ihatelovepdf gratuit et privÃ©",
        subtitle:
          "ihatelovepdf est un petit projet de passionnÃ©s. Votre soutien couvre les serveurs.",
        highlight: "Juste un petit outil qui respecte votre vie privÃ©e.",
      },
      reasons: {
        title: "Pourquoi faire un don ?",
        cards: [
          {
            title: "Garder la gratuitÃ©",
            description:
              "Les dons nous permettent de garder ihatelovepdf 100% gratuit pour tout le monde.",
            icon: "ðŸ’š",
          },
          {
            title: "AmÃ©liorations",
            description:
              "Votre soutien finance les corrections de bugs et les nouveaux outils.",
            icon: "âœ¨",
          },
          {
            title: "ProtÃ©ger la confidentialitÃ©",
            description:
              "Nous traitons tout localement. Les dons nous permettent de continuer.",
            icon: "ðŸ”’",
          },
        ],
      },
      tiers: {
        title: "Donnez ce que vous pouvez",
        description: "Chaque montant aide. Paiement sÃ©curisÃ© via Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Acheter un cafÃ©",
            amount: "3 â‚¬",
            description: "Couvre l'hÃ©bergement pendant quelques semaines.",
            ctaLabel: "Donner 3 â‚¬",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Soutien mensuel",
            amount: "10 â‚¬/mois",
            description: "Nous donne du temps chaque semaine pour amÃ©liorer ihatelovepdf.",
            ctaLabel: "Donner 10 â‚¬/mois",
            ctaHref: "#stripe-checkout-monthly",
            badge: "ðŸ’™ Merci",
          },
          {
            id: "custom",
            title: "Montant personnalisÃ©",
            amount: "Tout montant",
            description: "Chaque euro compte. Choisissez le montant qui vous convient.",
            ctaLabel: "Choisir le montant",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Paiements Stripe sÃ©curisÃ©s. Annulez les dons rÃ©currents quand vous le souhaitez.",
      },
      transparency: {
        title: "OÃ¹ va l'argent",
        items: [
          "HÃ©bergement et CDN pour que le site reste rapide dans le monde entier",
          "Temps de dÃ©veloppement pour les corrections et les nouvelles fonctionnalitÃ©s",
          "Ajustements de conception et d'UX pour garder les choses fluides",
          "Traductions et documents pour chaque langue prise en charge",
        ],
      },
      faq: {
        title: "Questions",
        entries: [
          {
            question: "Et si je ne peux pas faire de don ?",
            answer:
              "Pas de soucis. ihatelovepdf restera gratuit. Partager l'outil est dÃ©jÃ  un soutien incroyable.",
          },
          {
            question: "Aurai-je un reÃ§u ?",
            answer:
              "Oui. Stripe vous envoie automatiquement un reÃ§u avec tous les dÃ©tails.",
          },
          {
            question: "Comment annuler un don rÃ©current ?",
            answer:
              "GÃ©rez-le via votre portail Stripe ou envoyez-nous un e-mail et nous l'annulerons pour vous.",
          },
        ],
      },
      closing: {
        title: "Merci d'Ãªtre ici",
        description:
          "Chaque personne qui soutient ihatelovepdf aide Ã  maintenir en vie une boÃ®te Ã  outils PDF utile.",
        ctaLabel: "Envoyer un e-mail Ã  l'Ã©quipe",
        ctaHref: "mailto:info@ihatelovepdf.com?subject=Hello%20ihatelovepdf%20team",
      },
      legalNotice: {
        title: "Notes lÃ©gales et transparence",
        points: [
          "ihatelovepdf est un projet personnel indÃ©pendant gÃ©rÃ© par une petite Ã©quipe bÃ©nÃ©vole.",
          "Les contributions sont volontaires et aident Ã  couvrir l'hÃ©bergement et le temps de dÃ©veloppement.",
          "Les paiements ne sont pas des dons de bienfaisance; Stripe enverra un reÃ§u automatique.",
          "Le service est fourni tel quel sans garantie. Des questions ? info@ihatelovepdf.com.",
        ],
      },
    },
  },
  faqs: faqsFr,
  operations: operationsFr,
};
