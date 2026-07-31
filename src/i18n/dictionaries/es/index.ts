import { DEFAULT_LOCALE, localeLabels } from "../../config";
import { operationsEs } from "./operations";
import { faqsEs } from "./faqs";
import { getRoutePath, getOperationPath } from "../../routing";
import type { Dictionary } from "../dictionary-types";

const { label, nativeName, htmlLang, hrefLang } = localeLabels[DEFAULT_LOCALE];

const siteUrl = "https://ihatelovepdf.com";

export const esDictionary: Dictionary = {
  locale: DEFAULT_LOCALE,
  localeLabel: label,
  nativeName,
  htmlLang,
  hrefLang,
  routes: {
    home: getRoutePath(DEFAULT_LOCALE, "home"),
    faq: getRoutePath(DEFAULT_LOCALE, "faq"),
    support: getRoutePath(DEFAULT_LOCALE, "support"),
    operations: {
      merge: getOperationPath(DEFAULT_LOCALE, "merge"),
      compress: getOperationPath(DEFAULT_LOCALE, "compress"),
      split: getOperationPath(DEFAULT_LOCALE, "split"),
      extract: getOperationPath(DEFAULT_LOCALE, "extract"),
      crop: getOperationPath(DEFAULT_LOCALE, "crop"),
      rotate: getOperationPath(DEFAULT_LOCALE, "rotate"),
      reorder: getOperationPath(DEFAULT_LOCALE, "reorder"),
      pdfToImages: getOperationPath(DEFAULT_LOCALE, "pdfToImages"),
      imagesToPdf: getOperationPath(DEFAULT_LOCALE, "imagesToPdf"),
    },
  },
  metadata: {
    site: {
      title: "ihatelovepdf - Unir, comprimir y convertir PDFs sin subir archivos",
      description:
        "ihatelovepdf es un kit gratuito para unir, comprimir, dividir, extraer, reordenar y convertir PDFs a imÃ¡genes o viceversa directamente en tu navegador. Todo el procesamiento sucede de forma local, sin registros ni cargas.",
      keywords: [
        "unir pdf",
        "comprimir pdf",
        "dividir pdf",
        "extraer paginas pdf",
        "reordenar pdf",
        "pdf a imagenes",
        "imagenes a pdf",
        "convertir pdf",
        "convertir pdf online",
        "convertir pdf a png",
        "convertir jpg a pdf",
        "editar pdf sin subir archivos",
        "herramienta pdf privada",
        "procesar pdf en el navegador",
      ],
      canonical: `${siteUrl}`,
      openGraph: {
        title: "ihatelovepdf â€“ Unir, Comprimir, Dividir, PDF a Imagen e Imagen a PDF",
        description:
          "Une, comprime, divide, extrae, reordena y convierte PDFs sin subir archivos. Kit gratuito, privado y en espaÃ±ol con procesamiento 100% local.",
        url: siteUrl,
        locale: "es_ES",
        type: "website",
        imageUrl: "https://ihatelovepdf.com/og-images/og-image-es.png",
        imageAlt: "ihatelovepdf - Procesamiento de PDFs privado y gratuito",
      },
    },
    faq: {
      title: "Preguntas frecuentes | ihatelovepdf - Herramienta para procesar PDFs",
      description:
        "Respuestas sobre cÃ³mo unir, comprimir, dividir, extraer y reordenar PDFs con ihatelovepdf sin subir tus archivos a servidores.",
      keywords: [
        "ihatelovepdf FAQ",
        "preguntas frecuentes PDFs",
        "ayuda optimizaciÃ³n PDF",
        "unir PDF dudas",
        "comprimir PDF dudas",
        "dividir PDF ayuda",
        "reordenar PDF",
      ],
      canonical: `${siteUrl}${getRoutePath(DEFAULT_LOCALE, "faq")}`,
    },
    support: {
      title: "Apoya ihatelovepdf | MantÃ©n la herramienta privada y gratuita",
      description:
        "Tus donaciones financian el desarrollo de ihatelovepdf, cubren la infraestructura y garantizan que siga siendo 100% privado y sin anuncios.",
      keywords: [
        "donar a ihatelovepdf",
        "apoyar herramienta pdf",
        "financiar proyecto open web",
        "donaciÃ³n privacidad",
        "mantener ihatelovepdf gratis",
      ],
      canonical: `${siteUrl}${getRoutePath(DEFAULT_LOCALE, "support")}`,
    },
    operations: operationsEs,
  },
  brand: {
    name: "ihatelovepdf",
    tagline: "Procesamiento local â€¢ 100% privado",
  },
  components: {
    nav: {
      home: "Inicio",
      faq: "Preguntas Frecuentes",
      support: "Apoyar",
      photo: "FotoLince",
      languageLabel: "Idioma",
      menuLabel: "Abrir menÃº de navegaciÃ³n",
    },
    footer: {
      privacy: "Procesamiento local â€¢ 100% privado â€¢ Licencias abiertas",
      rights: `Â© ${new Date().getFullYear()} ihatelovepdf - Herramientas para manipular PDFs sin comprometer tu privacidad`,
      links: {
        home: "Inicio",
        faq: "Preguntas Frecuentes",
        support: "Apoyar",
        photo: "FotoLince",
        contact: "Contacto",
      },
      capabilitiesLabel: "Operaciones populares",
      operations: {
        merge: "Unir PDFs",
        compress: "Comprimir PDF",
        split: "Dividir PDF",
        extract: "Extraer PÃ¡ginas",
        crop: "Recortar paginas",
        rotate: "Girar pÃ¡ginas",
        reorder: "Reordenar PÃ¡ginas",
        pdfToImages: "PDF a imÃ¡genes",
        imagesToPdf: "ImÃ¡genes a PDF",
      },
      license: "Procesamiento de PDF: PDF-lib (MIT), PDF.js (Apache 2.0) â€¢ Fuente: Geist (MIT)",
      disclaimer: "El servicio se proporciona 'tal cual' sin garantÃ­a de ningÃºn tipo. El usuario es responsable del uso de los archivos generados.",
    },
    notifications: {
      labels: {
        success: "Â¡Ã‰xito!",
        error: "Error",
        info: "Aviso",
        warning: "PrecauciÃ³n",
      },
      closeLabel: "Cerrar",
    },
    fotolinceBanner: {
      eyebrow: "Â¿Necesitas optimizar imÃ¡genes?",
      title: "Comprime, redimensiona o convierte tus fotos con FotoLince",
      description:
        "Nuestra herramienta hermana procesa JPG, PNG y WEBP directamente en tu navegador: ideal antes de crear un PDF.",
      ctaLabel: "Visitar FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "Logotipo de FotoLince",
    },
    feedback: {
      question: "Â¿Te ha sido Ãºtil?",
      thanks: "Â¡Gracias por tu opiniÃ³n!",
      whatWrong: "CuÃ©ntanos quÃ© saliÃ³ mal",
      emailSubject: "Feedback sobre ihatelovepdf",
    },
    pdfProcessor: {
      title: "Selecciona una operaciÃ³n",
      modes: {
        merge: {
          label: "Unir PDFs",
          helper: "Selecciona el orden de los PDFs para unirlos en un solo documento.",
        },
        compress: {
          label: "Comprimir PDF",
          helper: "Comprime un PDF para reducir su tamaÃ±o. Procesa un archivo por vez para priorizar la calidad.",
        },
        split: {
          label: "Dividir PDF",
          helper: "Selecciona PDFs para dividirlos en documentos separados.",
        },
        extract: {
          label: "Extraer PÃ¡ginas",
          helper: "Selecciona pÃ¡ginas especÃ­ficas de un PDF para crear un nuevo documento.",
        },
        crop: {
          label: "Recortar paginas",
          helper: "Recorta los margenes visibles de las paginas seleccionadas sin salir del navegador.",
        },
        rotate: {
          label: "Girar pÃ¡ginas",
          helper: "Selecciona las pÃ¡ginas que necesitan otra orientaciÃ³n y rota solo esas hojas.",
        },
        reorder: {
          label: "Reordenar PÃ¡ginas",
          helper: "Cambia el orden de las pÃ¡ginas dentro de un documento PDF.",
        },
        pdfToImages: {
          label: "PDF a imÃ¡genes",
          helper: "Exporta cada pÃ¡gina del PDF como PNG o JPEG sin subir tus archivos.",
        },
        imagesToPdf: {
          label: "ImÃ¡genes a PDF",
          helper: "Combina JPG, PNG o WEBP en un Ãºnico PDF con el diseÃ±o que prefieras.",
        },
      },
      upload: {
        title: "Selecciona tus archivos",
        clearAll: "Limpiar todo",
        listHeadings: {
          merge: "Archivos a unir (ordena para establecer el orden final):",
          extract: "Selecciona un archivo para trabajar con sus pÃ¡ginas:",
          crop: "Selecciona un archivo para trabajar con sus paginas:",
          rotate: "Selecciona un archivo para trabajar con sus pÃ¡ginas:",
          reorder: "Selecciona un archivo para trabajar con sus pÃ¡ginas:",
          pdfToImages: "PDFs a convertir (se procesarÃ¡n uno a uno):",
          imagesToPdf: "ImÃ¡genes a combinar (ordÃ©nalas para definir la secuencia final):",
          default: "Archivos seleccionados (puedes ordenarlos o eliminarlos):",
        },
        hints: {
          compress: "Los archivos se comprimirÃ¡n individualmente manteniendo el mejor balance entre calidad y tamaÃ±o.",
          split: "Cada archivo PDF serÃ¡ dividido segÃºn las opciones que elijas en el siguiente paso.",
          crop: "Selecciona las paginas a recortar y define cuantos puntos quitar de cada lado desde el panel de opciones.",
          pdfToImages: "Renderizamos un PDF por turno. Ajusta formato y DPI en el panel de opciones antes de exportar.",
          imagesToPdf: "Arrastra JPG, PNG, WEBP o TIFF. Usa las opciones para definir tamaÃ±o de pÃ¡gina, orientaciÃ³n y mÃ¡rgenes.",
        },
      },
      downloadNames: {
        compress: "comprimido_ihatelovepdf",
        merge: "unido_ihatelovepdf",
        split: "parte_ihatelovepdf",
        extract: "extraido_ihatelovepdf",
        crop: "recortado_ihatelovepdf",
        rotate: "rotado_ihatelovepdf",
        reorder: "reordenado_ihatelovepdf",
        pdfToImages: "imagenes_ihatelovepdf",
        imagesToPdf: "imagenes_a_pdf_ihatelovepdf",
      },
      processButton: {
        idleSingle: "Procesar 1 archivo",
        idleMultiple: (count: number) => `Procesar ${count} archivos`,
        processing: "Procesando...",
        extract: (count: number) => `Extraer ${count} ${count === 1 ? "pÃ¡gina" : "pÃ¡ginas"}`,
        crop: (count: number) =>
          count > 0 ? `Recortar ${count} ${count === 1 ? "pagina" : "paginas"}` : "Recortar PDF",
        rotate: (count: number) =>
          count > 0 ? `Girar ${count} ${count === 1 ? "pÃ¡gina" : "pÃ¡ginas"}` : "Girar PDF",
        reorder: "Guardar nueva ordenaciÃ³n",
        pdfToImages: {
          single: "Exportar imÃ¡genes",
          multiple: (count: number) => `Exportar ${count} PDFs`,
        },
        imagesToPdf: {
          single: "Crear PDF",
          multiple: (count: number) => `Crear PDF con ${count} imÃ¡genes`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Procesando (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Comprimido. ReducciÃ³n: ${reduction}% (${original} â†’ ${next}) en ${seconds}s`,
        merged: "UniÃ³n completada",
        split: (count: number) =>
          count > 1
            ? `Generados ${count} archivos. Descargando el primero...`
            : "DivisiÃ³n completada",
        extracted: (count: number) => `ExtraÃ­das ${count} pÃ¡ginas`,
        cropped: (count: number) => `Recortadas ${count} ${count === 1 ? "pagina" : "paginas"}`,
        rotated: (count: number) => `Rotadas ${count} ${count === 1 ? "pÃ¡gina" : "pÃ¡ginas"}`,
        reordered: "ReordenaciÃ³n completada",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const etiqueta = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `Se exportaron ${count} ${etiqueta} ${count === 1 ? "imagen" : "imÃ¡genes"} en un archivo ZIP`
            : `Se descargaron ${count} ${etiqueta} ${count === 1 ? "imagen" : "imÃ¡genes"}`;
        },
        imagesToPdf: (count: number) =>
          `Se creÃ³ un PDF a partir de ${count} ${count === 1 ? "imagen" : "imÃ¡genes"}`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "No se generÃ³ resultado",
        mergeRequiresTwo: "Se necesitan al menos dos archivos para unir",
        noPagesSelected: "Selecciona al menos una pÃ¡gina",
        invalidFile: "Selecciona un archivo vÃ¡lido",
        reorderEmpty: "No hay nuevo orden de pÃ¡ginas",
        unknown: "Error desconocido",
        modeNotSupported: "Modo no soportado",
      },
      labels: {
        pagesToExtract: "Selecciona las pÃ¡ginas a extraer:",
        pagesToCrop: "Selecciona las paginas a recortar:",
        pagesToRotate: "Selecciona las pÃ¡ginas a girar:",
        reorderPages: "Arrastra las pÃ¡ginas para reordenarlas:",
      },
      compressionPreview: {
        title: "Vista previa de compresiÃ³n",
        description:
          "Ajusta las opciones para estimar el tamaÃ±o del archivo antes de ejecutar la compresiÃ³n.",
        running: "Calculando vista previaâ€¦",
        readyLabel: "Resultado estimado",
        ratio: (percent: string) => `${percent}% mÃ¡s pequeÃ±o`,
        saved: (size: string) => `${size} ahorrados`,
        time: (seconds: string) => `â‰ˆ ${seconds}s`,
        original: "Original",
        result: "Estimado",
        notice:
          "La vista previa se ejecuta de forma local. Cuando presiones Procesar reutilizaremos este resultado sin subir archivos.",
        error: "No se pudo generar la vista previa.",
        retry: "Reintentar vista previa",
        universalBadge: "OptimizaciÃ³n universal",
      },
      compressionSummary: {
        title: "Ãšltima compresiÃ³n",
        ratio: (percent: string) => `${percent}% mÃ¡s pequeÃ±o`,
        saved: (size: string) => `${size} ahorrados`,
        original: "Original",
        result: "Comprimido",
        duration: (seconds: string) => `Completado en ${seconds}s`,
        download: "Descargar de nuevo",
        clear: "Borrar resumen",
      },
      donationReminder: {
        message: "Â¿ihatelovepdf te ahorrÃ³ tiempo hoy? Tu aporte mantiene el proyecto privado y gratuito.",
        actionLabel: "Apoyar ihatelovepdf",
        withSavings: (percent: string, saved: string) =>
          `Â¿Acabas de ahorrar ${saved} (${percent}% menos)? Tu apoyo mantiene ihatelovepdf privado y gratuito.`,
      },
      statusDialog: {
        processingTitle: "Procesando de forma local",
        successTitle: "Tus archivos estÃ¡n listos",
        successDescription:
          "Las descargas se inician automÃ¡ticamente. AquÃ­ puedes volver a descargarlas.",
        resultsLabel: "Ãšltimo resultado",
        filesProcessedLabel: (count: number) =>
          `${count} ${count === 1 ? "archivo procesado" : "archivos procesados"}`,
        downloadAgainLabel: "Descargar de nuevo",
        errorTitle: "El procesamiento fallÃ³",
        errorDescription: "No pudimos completar la operaciÃ³n. Revisa los archivos e intÃ©ntalo otra vez.",
        retryLabel: "Intentar nuevamente",
        closeLabel: "Cerrar",
        sharePrompt: {
          dialogMessage: "ihatelovepdf es completamente gratis y respeta tu privacidad. AyÃºdanos a mantenerlo asÃ­ compartiÃ©ndolo con un colega.",
          shareText: "Acabo de usar ihatelovepdf para gestionar mis PDFs. Es una herramienta gratuita, rÃ¡pida y totalmente privada para dividir, comprimir, unir y convertir PDFs directamente en el navegador. Â¡Perfecta para documentos sensibles!",
          actionLabel: "Compartir",
          copiedLabel: "Â¡Copiado!",
        },
      },
      compressionTotal: {
        title: "Ahorro total (todos los archivos)",
        savings: (size: string) => `${size} ahorrados en total`,
        count: (count: number) => `${count} archivos optimizados`,
      },
    },
    fileUploader: {
      clickToSelect: "Haz clic para seleccionar",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "o arrastra y suelta imÃ¡genes" : "o arrastra y suelta archivos PDF",
      accepted: {
        pdf: "Archivos PDF",
        images: "Formatos aceptados: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `TamaÃ±o recomendado: < ${sizeMb}MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Tipo de archivo no vÃ¡lido: ${fileName}. Solo se permiten archivos ${label}.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Archivo demasiado grande: ${fileName}. El tamaÃ±o mÃ¡ximo es ${sizeMb}MB.`,
      },
      dropImagesAlt: "Imagen del documento PDF",
    },
    fileList: {
      moveUp: "Mover hacia arriba",
      moveDown: "Mover hacia abajo",
      remove: "Eliminar",
      removeAll: "Eliminar todo",
      imageLabel: "Imagen",
      fileLabel: "Archivo",
      selected: "Seleccionado",
      pdfLabel: "PDF",
      deselect: "Deseleccionar",
      pagesLabel: (count: number) => `${count} ${count === 1 ? "pÃ¡gina" : "pÃ¡ginas"}`,
      previewLoading: "Cargando vista previaâ€¦",
    },
    pageSelector: {
      loading: "Cargando pÃ¡ginas del PDF...",
      error: "No se pudo cargar la informaciÃ³n del PDF",
      summary: (total: number, selected: number) =>
        `${total} pÃ¡ginas detectadas - ${selected} seleccionadas`,
      selectAll: "Seleccionar todas",
      deselectAll: "Deseleccionar todas",
      pageLabel: (pageNumber: number) => `PÃ¡g. ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Mostrando ${shown} de ${total} pÃ¡ginas. Para extraer pÃ¡ginas adicionales, ingresa los nÃºmeros de pÃ¡gina en el campo a continuaciÃ³n.`,
      manualLabel: "Ingresa nÃºmeros de pÃ¡gina adicionales (ej. 21, 25-30, 42)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Cargando pÃ¡ginas del PDF...",
      error: "No se pudo cargar la informaciÃ³n del PDF",
      limitReached: (count: number) =>
        `Este PDF tiene ${count} pÃ¡ginas. Por rendimiento, puedes reordenar hasta 120 pÃ¡ginas a la vez.`,
      limitHint:
        "Te recomendamos dividir primero el PDF en partes mÃ¡s pequeÃ±as y luego reordenar cada parte.",
      summary: (count: number) => `${count} pÃ¡ginas disponibles para reordenar`,
      reset: "Restaurar orden original",
      dragHint: "Arrastra para cambiar el orden",
      pageLabel: (pageNumber: number) => `PÃ¡gina ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: PÃ¡g. ${pageNumber}`,
      instructions:
        'Arrastra las pÃ¡ginas o usa las flechas para moverlas. Cuando termines, haz clic en "Guardar nueva ordenaciÃ³n" para aplicar los cambios.',
    },
    processingOptions: {
      compress: {
        title: "CompresiÃ³n",
        level: "Nivel",
        levels: {
          low: "Baja",
          medium: "Media",
          high: "Alta",
        },
        removeMetadata: "Eliminar metadatos",
        removeMetadataHint: "Borra detalles ocultos como autor, asunto e historial de ediciÃ³n.",
        stripAnnotations: "Quitar anotaciones y comentarios",
        stripAnnotationsHint: "Elimina notas, formularios, firmas y acciones del documento.",
        downscaleImages: "Reducir imÃ¡genes incrustadas",
        downscaleHint: "Ideal para documentos escaneados o PDFs con muchas fotos. Mantiene el texto nÃ­tido mientras reduce las fotos.",
        advancedTitle: "Limpieza avanzada",
        advancedDescription: "MantÃ©n la simplicidad o activa solo los extras que necesites.",
        activeLabel: "Activado:",
      },
      merge: {
        title: "UniÃ³n",
        pageDivider: "PÃ¡gina en blanco entre documentos",
        metadataTitle: "TÃ­tulo final (opcional)",
        metadataAuthor: "Autor final (opcional)",
        metadataHint: "Define metadatos personalizados para el PDF unido. DÃ©jalo en blanco para usar los valores por defecto.",
      },
      split: {
        title: "DivisiÃ³n",
        pagesPerFile: "PÃ¡ginas por archivo",
        pagesPerFileHint: "Crearemos un nuevo PDF cada N pÃ¡ginas.",
      },
      extract: {
        title: "ExtracciÃ³n",
        preserveMetadata: "Conservar metadatos originales",
        preserveMetadataHint: "Mantiene tÃ­tulo, autor y otros detalles en el PDF resultante.",
      },
      crop: {
        title: "Recorte",
        hint: "Selecciona las paginas a recortar y define cuantos puntos quitar de cada lado.",
        inputModeLabel: "Metodo de recorte",
        inputModes: {
          margins: "Establecer mÃ¡rgenes",
          manual: "Seleccion manual",
        },
        marginsTitle: "MÃ¡rgenes",
        marginLabels: {
          top: "Margen superior (pt)",
          right: "Margen derecho (pt)",
          bottom: "Margen inferior (pt)",
          left: "Margen izquierdo (pt)",
        },
        marginHint: "72 pt equivalen aproximadamente a 1 pulgada. Empieza con valores pequenos para no cortar contenido.",
        preserveMetadata: "Conservar metadatos originales",
        preserveMetadataHint: "Mantiene titulo, autor y otros detalles en el PDF recortado.",
        manual: {
          title: "Seleccion manual de recorte",
          hint: "Arrastra sobre la vista previa para definir el area visible. Convertimos esa seleccion en los mismos margenes que usa el recorte actual.",
          loading: "Cargando vista previa del recorte...",
          error: "No se pudo cargar la vista previa del recorte.",
          reset: "Restablecer seleccion",
          pagePreview: (pageNumber: number) => `Vista previa de la pagina ${pageNumber}`,
        },
      },
      rotate: {
        title: "Girar",
        hint: "Elige la direcciÃ³n y luego marca las pÃ¡ginas que quieres girar.",
        rotateRight90: "Girar 90 grados a la derecha",
        rotate180: "Girar 180 grados",
        rotateLeft90: "Girar 90 grados a la izquierda",
      },
      reorder: {
        title: "Reordenar",
        hint: "Arrastra las miniaturas para cambiar el orden.",
      },
      pdfToImages: {
        title: "ExportaciÃ³n de imÃ¡genes",
        formatLabel: "Formato de imagen",
        formatHint: "Elige PNG para calidad sin pÃ©rdidas o JPEG para archivos mÃ¡s ligeros.",
        pngLabel: "PNG (sin pÃ©rdidas)",
        jpegLabel: "JPEG (mÃ¡s ligero)",
        qualityLabel: "Calidad JPEG",
        qualityHint: "Con valores altos conservas mÃ¡s detalle a costa de un mayor tamaÃ±o.",
        dpiLabel: "DPI de renderizado",
        dpiHint: "Un DPI superior mejora la nitidez y el peso. 144 DPI es ideal para pantalla.",
        dpiPresets: {
          screen: "72 DPI Â· Pantalla",
          balanced: "144 DPI Â· Equilibrado",
          print: "300 DPI Â· ImpresiÃ³n",
        },
        zipLabel: "Agrupar imÃ¡genes en un ZIP",
        zipHint: "Descarga un archivo Ãºnico en lugar de una imagen por pÃ¡gina.",
        baseNameLabel: "Nombre base",
        baseNamePlaceholder: "ihatelovepdf_paginas",
        baseNameHint: "Usamos este prefijo para las imÃ¡genes exportadas. DÃ©jalo vacÃ­o para reutilizar el nombre del PDF.",
      },
      imagesToPdf: {
        title: "DiseÃ±o",
        layoutTitle: "DiseÃ±o de pÃ¡gina",
        fitLabel: "Ajuste de la imagen",
        fitOptions: {
          contain: "Ajustar (mostrar imagen completa)",
          cover: "Cubrir (llenar la pÃ¡gina)",
        },
        sizeLabel: "TamaÃ±o de pÃ¡gina",
        sizeOptions: {
          auto: "Auto (igual que la imagen)",
          a4: "A4",
          letter: "Carta",
        },
        orientationLabel: "OrientaciÃ³n",
        orientationOptions: {
          auto: "Auto",
          portrait: "Vertical",
          landscape: "Horizontal",
        },
        marginLabel: "MÃ¡rgenes (pt)",
        marginHint: "AÃ±ade espacio en blanco alrededor de la imagen. 72 pt â‰ˆ 1 pulgada.",
        backgroundLabel: "Color de fondo",
        backgroundHint: "Se aplica detrÃ¡s de la imagen y donde quede espacio libre en la pÃ¡gina.",
      },
    },
    cookieBanner: {
      message: "Utilizamos cookies para analizar el trÃ¡fico y mejorar tu experiencia. No compartimos tus datos personales.",
      accept: "Aceptar",
      decline: "Rechazar",
    },
  },
  pages: {
    home: {
      hero: {
        title: "ihatelovepdf: comprimir, unir y convertir PDF online gratis",
        subtitle:
          "Comprime PDF, une PDF, divide documentos, extrae pÃ¡ginas y convierte PDF a imÃ¡genes o imÃ¡genes a PDF directamente en tu navegador. Sin subidas, 100% privado y gratuito.",
        badges: [
          "Comprimir PDF rÃ¡pido",
          "Unir PDF sin lÃ­mites",
          "Procesamiento local",
          "Apoya ihatelovepdf",
        ],
        imageAlt: "IlustraciÃ³n de documento PDF",
        ctaLinks: [
          {
            label: "PDF a imÃ¡genes",
            href: getOperationPath(DEFAULT_LOCALE, "pdfToImages"),
            description: "Exporta pÃ¡ginas como PNG o JPEG",
          },
          {
            label: "ImÃ¡genes a PDF",
            href: getOperationPath(DEFAULT_LOCALE, "imagesToPdf"),
            description: "Combina JPG, PNG o WEBP",
          },
        ],
      },
      why: {
        title: "Â¿Por quÃ© usar ihatelovepdf?",
        cards: [
          {
            title: "100% Privado",
            description:
              "Tus PDFs nunca salen de tu dispositivo. Todo el procesamiento ocurre en tu navegador.",
            icon: "ðŸ”’",
          },
          {
            title: "RÃ¡pido y Eficiente",
            description:
              "Nuestro motor optimizado procesa tus PDFs a mÃ¡xima velocidad sin necesidad de subirlos a servidores.",
            icon: "âš¡",
          },
          {
            title: "Funciona en cualquier dispositivo",
            description:
              "Compatible con ordenadores, tablets y telÃ©fonos mÃ³viles. Solo necesitas un navegador moderno.",
            icon: "ðŸ“±",
          },
        ],
      },
      callout: {
        title: "Haz que ihatelovepdf siga siendo gratuito",
        description:
          "Cada donaciÃ³n cubre servidores, tiempo de desarrollo y nos permite mantener una experiencia 100% privada sin anuncios ni rastreadores.",
        ctaLabel: "Apoyar el proyecto",
        ctaUrl: getRoutePath(DEFAULT_LOCALE, "support"),
        secondaryLabel: "Conoce cÃ³mo usamos los fondos",
        secondaryUrl: getRoutePath(DEFAULT_LOCALE, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Preguntas Frecuentes",
      intro:
        "Respuestas a las dudas mÃ¡s comunes sobre ihatelovepdf y el procesamiento de documentos PDF",
      cta: {
        title: "Prueba ihatelovepdf ahora",
        description:
          "Une, comprime, divide, extrae y reordena tus PDFs con total privacidad. Sin registros, sin subir archivos a servidores.",
        ctaLabel: "Ir a la herramienta",
      },
    },
    support: {
      hero: {
        eyebrow: "ðŸŒ± Proyecto independiente",
        title: "Ayuda a mantener ihatelovepdf gratuito y privado",
        subtitle:
          "ihatelovepdf es un proyecto pequeÃ±o hecho con cariÃ±o. Tu apoyo cubre los servidores y nos da tiempo para seguir mejorÃ¡ndolo.",
        highlight: "Solo una herramienta que respeta tu privacidad.",
      },
      reasons: {
        title: "Â¿Por quÃ© donar?",
        cards: [
          {
            title: "Seguir siendo gratuito",
            description:
              "Cada donaciÃ³n nos ayuda a mantener ihatelovepdf 100% gratis para todos, sin planes premium ni funciones bloqueadas.",
            icon: "â¤ï¸",
          },
          {
            title: "Mejoras constantes",
            description:
              "Con tu apoyo podemos dedicar tiempo a nuevas funciones, arreglar bugs y mantener la herramienta rÃ¡pida.",
            icon: "âœ¨",
          },
          {
            title: "Privacidad siempre",
            description:
              "Tu dinero nos permite seguir procesando todo localmente, sin necesidad de subir tus archivos a ningÃºn servidor.",
            icon: "ðŸ”’",
          },
        ],
      },
      tiers: {
        title: "Aporta lo que puedas",
        description: "Cualquier cantidad nos ayuda. Pago seguro con Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Un cafÃ©",
            amount: "â‚¬3",
            description: "Cubre el coste de hosting por unas semanas.",
            ctaLabel: "Donar â‚¬3",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Apoyo mensual",
            amount: "â‚¬10/mes",
            description: "Nos permite dedicar tiempo cada semana a mejorar ihatelovepdf.",
            ctaLabel: "Donar â‚¬10/mes",
            ctaHref: "#stripe-checkout-monthly",
            badge: "ðŸ’™ Gracias",
          },
          {
            id: "custom",
            title: "Otra cantidad",
            amount: "Lo que quieras",
            description: "Cada euro cuenta. Elige el importe que prefieras.",
            ctaLabel: "Donar otra cantidad",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Pagos seguros con Stripe. Puedes cancelar las donaciones recurrentes cuando quieras.",
      },
      transparency: {
        title: "Â¿En quÃ© se gasta?",
        items: [
          "Hosting y CDN para que la web sea rÃ¡pida en todo el mundo",
          "Tiempo de desarrollo para nuevas funciones y mantenimiento",
          "Mejoras de diseÃ±o y experiencia de usuario",
          "Traducciones a mÃ¡s idiomas",
        ],
      },
      faq: {
        title: "Preguntas",
        entries: [
          {
            question: "Â¿QuÃ© pasa si no puedo donar?",
            answer:
              "Â¡No pasa nada! ihatelovepdf seguirÃ¡ siendo gratuito siempre. Si nos recomiendas a alguien o nos escribes contando cÃ³mo te ayudamos, eso tambiÃ©n nos hace muy felices.",
          },
          {
            question: "Â¿RecibirÃ© un comprobante de pago?",
            answer:
              "SÃ­. Stripe te enviarÃ¡ automÃ¡ticamente un recibo por correo con todos los detalles de tu donaciÃ³n.",
          },
          {
            question: "Â¿CÃ³mo cancelo una donaciÃ³n recurrente?",
            answer:
              "Puedes cancelar desde tu portal de Stripe o escribirnos y lo hacemos nosotros. Sin preguntas, sin problemas.",
          },
        ],
      },
      closing: {
        title: "Gracias por estar aquÃ­",
        description:
          "Cada persona que apoya ihatelovepdf hace posible que sigamos construyendo herramientas Ãºtiles, privadas y accesibles para todos.",
        ctaLabel: "Escribirnos",
        ctaHref: "mailto:info@ihatelovepdf.com?subject=Hola%20equipo%20de%20ihatelovepdf",
      },
      legalNotice: {
        title: "Aviso legal y transparencia",
        points: [
          "ihatelovepdf es un proyecto personal independiente gestionado por un pequeÃ±o equipo.",
          "Las donaciones son voluntarias y se destinan a cubrir gastos de infraestructura y tiempo de desarrollo.",
          "Las aportaciones no son donaciones benÃ©ficas ni generan ventajas fiscales; Stripe emitirÃ¡ un recibo automÃ¡tico.",
          "El servicio se ofrece tal cual, sin garantÃ­as explÃ­citas; para cualquier duda escrÃ­benos a info@ihatelovepdf.com.",
        ],
      },
    },
  },
  faqs: faqsEs,
  operations: operationsEs,
};
