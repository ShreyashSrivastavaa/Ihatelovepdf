import { OperationContent } from "../operation-types";
import { OperationKey } from "../../../types/operations";

const operationsEsContent: Record<OperationKey, OperationContent> = {
  compress: {
    key: "compress",
    slug: "comprimir",
    mode: "compress",
    meta: {
      title: "Comprimir PDF Online Gratis | Reducir TamaÃ±o | ihatelovepdf",
      description:
        "Reduce el tamaÃ±o de tus PDF eficientemente sin perder calidad. CompresiÃ³n privada y gratuita directamente en tu navegador.",
      keywords: [
        "comprimir pdf",
        "reducir tamaÃ±o pdf",
        "optimizar pdf",
        "compresor pdf online",
        "pdf ligero",
      ],
      ogTitle: "Comprime PDFs sin perder calidad | ihatelovepdf",
      ogDescription:
        "Arrastra tu archivo, selecciona el nivel de compresiÃ³n ideal y descarga un PDF optimizado en segundos. Todo seguro y sin subir documentos a servidores.",
      ogImageAlt: "Herramienta para comprimir PDF con ihatelovepdf",
    },
    hero: {
      title: "Comprimir PDF online sin perder calidad",
      description:
        "Optimiza el tamaÃ±o de tus documentos para enviarlos por correo, plataformas educativas o trÃ¡mites oficiales sin sacrificar legibilidad.",
      bulletPoints: [
        "Procesamiento 100% local, tus archivos nunca salen del navegador",
        "Elige entre compresiÃ³n bÃ¡sica, media o agresiva segÃºn tu prioridad",
        "Preserva metadatos y estructura del documento si lo necesitas",
      ],
      imageAlt: "CompresiÃ³n de un documento PDF con ihatelovepdf",
    },
    benefitsTitle: "Por quÃ© comprimir PDFs con ihatelovepdf",
    benefits: [
      {
        title: "Calidad equilibrada",
        description:
          "Nuestro motor de compresiÃ³n analiza cada recurso para ofrecer la mayor reducciÃ³n sin perder nitidez en textos ni grÃ¡ficos.",
      },
      {
        title: "Preparado para trÃ¡mites",
        description:
          "ObtÃ©n archivos listos para subir a plataformas de administraciÃ³n pÃºblica, universidades o portales de empleo que imponen lÃ­mites estrictos de peso.",
      },
      {
        title: "Seguridad por diseÃ±o",
        description:
          "Al no subir tus PDFs a servidores externos, evitas fugas de informaciÃ³n y cumples con polÃ­ticas de privacidad corporativas.",
      },
    ],
    howTo: {
      title: "CÃ³mo comprimir un PDF con ihatelovepdf",
      steps: [
        "Haz clic en \"Sube tus archivos\" y elige el PDF que quieres optimizar.",
        "Selecciona el nivel de compresiÃ³n y las opciones avanzadas, como preservar metadatos.",
        "Pulsa \"Procesar\" y descarga el archivo comprimido en segundos.",
      ],
      note:
        "Si trabajas con varios informes, puedes comprimirlos uno a uno sin lÃ­mites de uso diarios ni marcas de agua.",
    },
    useCasesTitle: "CuÃ¡ndo conviene comprimir un PDF",
    useCases: [
      "Enviar contratos, facturas o manuales por correo electrÃ³nico sin rebotar en el lÃ­mite de adjuntos.",
      "Subir archivos a aulas virtuales, Moodle o Canvas que exigen un mÃ¡ximo por documento.",
      "Reducir el peso de memorias, tesis o catÃ¡logos para mejorar la velocidad de descarga.",
      "Archivar documentaciÃ³n en la nube ahorrando espacio sin perder informaciÃ³n relevante.",
    ],
  },
  merge: {
    key: "merge",
    slug: "unir",
    mode: "merge",
    meta: {
      title: "Unir PDF Online | Combinar Varios PDFs Gratis | ihatelovepdf",
      description:
        "Combina mÃºltiples PDF en un Ãºnico documento sin lÃ­mites. Arrastra, ordena y descarga tu archivo fusionado al instante con total privacidad.",
      keywords: [
        "unir pdf",
        "combinar pdf",
        "juntar archivos pdf",
        "fusionar pdf online",
        "merge pdf",
      ],
      ogTitle: "Une varios PDFs en segundos | ihatelovepdf",
      ogDescription:
        "Organiza tus documentos en el orden perfecto, ajusta las opciones y descarga un PDF unificado sin subir nada a la nube.",
      ogImageAlt: "UniÃ³n de mÃºltiples PDFs en la plataforma ihatelovepdf",
    },
    hero: {
      title: "Unir PDF online rÃ¡pido y seguro",
      description:
        "Combina contratos, notas de clase o pÃ³lizas en un Ãºnico archivo listo para enviar, firmar o archivar.",
      bulletPoints: [
        "Ordena los PDFs con arrastrar y soltar para controlar el resultado",
        "Sin lÃ­mites ocultos: une documentos extensos sin coste",
        "Preserva marcadores y metadatos si asÃ­ lo prefieres",
      ],
      imageAlt: "FusiÃ³n de archivos PDF en ihatelovepdf",
    },
    benefitsTitle: "Ventajas de unir PDFs con ihatelovepdf",
    benefits: [
      {
        title: "Consistencia en la presentaciÃ³n",
        description:
          "Garantiza que todo el material se entregue en un documento Ãºnico, con numeraciÃ³n continua y formato homogÃ©neo.",
      },
      {
        title: "Ahorro de tiempo",
        description:
          "Evita reabrir editores pesados. Arrastra los archivos, ordÃ©nalos y descÃ¡rgalos listos para compartir.",
      },
      {
        title: "Privado y sin registros",
        description:
          "No almacenamos copias ni solicitamos datos personales. Ideal para informaciÃ³n sensible o confidencial.",
      },
    ],
    howTo: {
      title: "CÃ³mo unir PDFs con ihatelovepdf",
      steps: [
        "Clica en \"Sube tus archivos\" y selecciona al menos dos PDFs.",
        "Utiliza las flechas o arrastra cada archivo para definir el orden definitivo.",
        "Elige las opciones de marcadores y pulsa \"Procesar\" para descargar el documento combinado.",
      ],
      note:
        "Puedes aÃ±adir mÃ¡s archivos incluso despuÃ©s de haber cargado los primeros sin reiniciar el proceso.",
    },
    useCasesTitle: "CuÃ¡ndo necesitas unir PDFs",
    useCases: [
      "Preparar un Ãºnico dossier con anexos, presupuestos y condiciones comerciales.",
      "Enviar varias facturas mensuales en un solo archivo a contabilidad.",
      "Reunir apuntes escaneados y presentaciones en un PDF para los estudiantes.",
      "Crear un paquete de documentos legales para firma electrÃ³nica.",
    ],
  },
  split: {
    key: "split",
    slug: "dividir",
    mode: "split",
    meta: {
      title: "Dividir PDF por PÃ¡ginas o CapÃ­tulos | Gratis | ihatelovepdf",
      description:
        "Separa tu PDF en varios archivos por rangos o capÃ­tulos. Control total sobre la estructura de tu documento sin subir nada al servidor.",
      keywords: [
        "dividir pdf",
        "separar pdf",
        "dividir pdf por paginas",
        "split pdf",
        "partir pdf",
      ],
      ogTitle: "Divide tus PDFs con precisiÃ³n | ihatelovepdf",
      ogDescription:
        "Elige exactamente cÃ³mo dividir tu documento, genera tantos archivos individuales como necesites y descÃ¡rgalos al instante en tu dispositivo.",
      ogImageAlt: "Proceso de divisiÃ³n de un PDF en ihatelovepdf",
    },
    hero: {
      title: "Dividir PDF por pÃ¡ginas o segmentos",
      description:
        "Extrae capÃ­tulos, anexos o secciones concretas en archivos independientes listos para compartir.",
      bulletPoints: [
        "Configura divisiones por nÃºmero de pÃ¡ginas o tamaÃ±o",
        "ObtÃ©n varios PDFs listos en un Ãºnico procesamiento",
        "Trabaja sin lÃ­mites de pÃ¡ginas ni marcas de agua",
      ],
      imageAlt: "SeparaciÃ³n de capÃ­tulos de un documento PDF",
    },
    benefitsTitle: "QuÃ© aporta dividir PDFs con ihatelovepdf",
    benefits: [
      {
        title: "Mayor control sobre la informaciÃ³n",
        description:
          "Entrega Ãºnicamente la parte relevante del documento para cada destinatario sin revelar datos sensibles del resto.",
      },
      {
        title: "Entrega escalable",
        description:
          "Genera mÃºltiples archivos en un solo paso y descÃ¡rgalos automÃ¡ticamente listos para archivar o enviar.",
      },
      {
        title: "Ajustes avanzados",
        description:
          "Selecciona pÃ¡ginas por lotes, aÃ±ade separadores o decide el formato de salida segÃºn tus flujos de trabajo.",
      },
    ],
    howTo: {
      title: "CÃ³mo dividir un PDF con ihatelovepdf",
      steps: [
        "Carga el PDF que quieres segmentar desde tu equipo.",
        "Elige si prefieres dividir por nÃºmero fijo de pÃ¡ginas o segÃºn el tamaÃ±o del archivo.",
        "Pulsa \"Procesar\" y descarga los documentos generados automÃ¡ticamente.",
      ],
      note:
        "ihatelovepdf descargarÃ¡ el primer archivo de inmediato y guardarÃ¡ los siguientes en tu dispositivo sin pasos extra.",
    },
    useCasesTitle: "Escenarios habituales para dividir PDFs",
    useCases: [
      "Publicar cada capÃ­tulo de un libro digital en una plataforma educativa.",
      "Separar anexos que deben enviarse por canales distintos.",
      "Extraer resÃºmenes trimestrales de reportes financieros extensos.",
      "Crear paquetes compactos para clientes sin incluir toda la documentaciÃ³n interna.",
    ],
  },
  extract: {
    key: "extract",
    slug: "extraer",
    mode: "extract",
    meta: {
      title: "Extraer PÃ¡ginas de un PDF | Guardar Sueltas | ihatelovepdf",
      description:
        "Selecciona pÃ¡ginas de cualquier PDF y crea un nuevo documento al instante. Procesamiento privado y sin lÃ­mites en tu navegador.",
      keywords: [
        "extraer paginas pdf",
        "guardar paginas pdf",
        "seleccionar paginas pdf",
        "extract pdf pages",
        "crear nuevo pdf",
      ],
      ogTitle: "Extrae solo las pÃ¡ginas que necesitas | ihatelovepdf",
      ogDescription:
        "Marca las pÃ¡ginas relevantes que quieres conservar, genera un nuevo archivo PDF en segundos y mantÃ©n tus datos seguros en tu propio dispositivo.",
      ogImageAlt: "SelecciÃ³n de pÃ¡ginas dentro de un PDF",
    },
    hero: {
      title: "Extraer pÃ¡ginas especÃ­ficas de un PDF",
      description:
        "Construye documentos a medida seleccionando Ãºnicamente las pÃ¡ginas que necesitas compartir o archivar.",
      bulletPoints: [
        "Visualiza miniaturas y marca pÃ¡ginas individuales",
        "MantÃ©n la numeraciÃ³n original o crea nuevas secciones",
        "Descarga el PDF resultante al instante sin esperas",
      ],
      imageAlt: "SelecciÃ³n de pÃ¡ginas en ihatelovepdf",
    },
    benefitsTitle: "Ventajas de extraer pÃ¡ginas con ihatelovepdf",
    benefits: [
      {
        title: "Documentos mÃ¡s relevantes",
        description:
          "Comparte solo la informaciÃ³n Ãºtil para tu equipo o clientes evitando datos redundantes.",
      },
      {
        title: "Control total desde tu navegador",
        description:
          "Selecciona, visualiza y verifica cada pÃ¡gina sin depender de software pesado ni conexiÃ³n estable.",
      },
      {
        title: "Resultados limpios",
        description:
          "El nuevo PDF conserva la calidad y los metadatos que definas en las opciones avanzadas.",
      },
    ],
    howTo: {
      title: "CÃ³mo extraer pÃ¡ginas con ihatelovepdf",
      steps: [
        "Sube el PDF y elige el archivo con el que quieres trabajar.",
        "Marca las pÃ¡ginas que necesitas desde el panel de miniaturas.",
        "Haz clic en \"Procesar\" para descargar un PDF con las pÃ¡ginas seleccionadas.",
      ],
      note:
        "Puedes combinar la extracciÃ³n con otras operaciones como unir o comprimir en diferentes sesiones.",
    },
    useCasesTitle: "Ideas para extraer pÃ¡ginas de un PDF",
    useCases: [
      "Compartir solo el capÃ­tulo asignado de un manual con tu equipo.",
      "Enviar pÃ¡ginas concretas de una hipoteca o contrato para revisiÃ³n legal.",
      "Crear dossiers personalizados para clientes con informaciÃ³n relevante.",
      "Guardar solo las pÃ¡ginas con formularios o comprobantes que necesitas archivar.",
    ],
  },
  crop: {
    key: "crop",
    slug: "recortar",
    mode: "crop",
    meta: {
      title: "Recortar pÃ¡ginas PDF online | Ajustar mÃ¡rgenes | ihatelovepdf",
      description:
        "Recorta pÃ¡ginas PDF y elimina mÃ¡rgenes sobrantes directamente en tu navegador. Todo el proceso ocurre en local y sin subidas al servidor.",
      keywords: [
        "recortar pdf",
        "recortar pdf online",
        "quitar margenes pdf",
        "recortador de pdf",
        "recortar bordes pdf",
      ],
      ogTitle: "Recorta pÃ¡ginas PDF de forma privada | ihatelovepdf",
      ogDescription:
        "Selecciona las pÃ¡ginas, define los mÃ¡rgenes y descarga un PDF mÃ¡s limpio sin compartir tus archivos con nadie.",
      ogImageAlt: "Recortando pÃ¡ginas PDF en ihatelovepdf",
    },
    hero: {
      title: "Recorta pÃ¡ginas PDF y limpia los mÃ¡rgenes",
      description:
        "Elimina espacio en blanco innecesario de pÃ¡ginas concretas y descarga un documento mÃ¡s ajustado en segundos.",
      bulletPoints: [
        "Selecciona solo las pÃ¡ginas que quieres recortar",
        "Ajusta mÃ¡rgenes superior, derecho, inferior e izquierdo con precisiÃ³n",
        "Procesamiento 100% local y sin servidores",
      ],
      imageAlt: "Flujo de recorte de PDF",
    },
    benefitsTitle: "Por quÃ© recortar PDFs con ihatelovepdf",
    benefits: [
      {
        title: "PÃ¡ginas mÃ¡s limpias",
        description:
          "Reduce bordes vacÃ­os y centra la atenciÃ³n en el contenido importante.",
      },
      {
        title: "EdiciÃ³n selectiva",
        description:
          "Aplica el recorte solo donde hace falta sin rehacer todo el documento.",
      },
      {
        title: "Privacidad real",
        description:
          "Tus archivos siguen en tu dispositivo durante todo el proceso.",
      },
    ],
    howTo: {
      title: "CÃ³mo recortar pÃ¡ginas PDF con ihatelovepdf",
      steps: [
        "Sube el PDF y elige el archivo que quieres ajustar.",
        "Marca las pÃ¡ginas a recortar y define los mÃ¡rgenes superior, derecho, inferior e izquierdo.",
        "Pulsa â€œProcesarâ€ para descargar un nuevo PDF con el recorte aplicado.",
      ],
      note:
        "Si distintos grupos de pÃ¡ginas necesitan recortes diferentes, repite el proceso por separado.",
    },
    useCasesTitle: "CuÃ¡ndo conviene recortar un PDF",
    useCases: [
      "Eliminar bordes del escÃ¡ner en formularios, facturas o documentos firmados.",
      "Quitar mÃ¡rgenes sobrantes antes de imprimir o unir archivos.",
      "Uniformar pÃ¡ginas exportadas desde herramientas distintas.",
      "Preparar manuales, reportes o apuntes con un encuadre mÃ¡s compacto.",
    ],
  },
  rotate: {
    key: "rotate",
    slug: "girar",
    mode: "rotate",
    meta: {
      title: "Girar pÃ¡ginas PDF online | Girar hojas seleccionadas | ihatelovepdf",
      description:
        "Rota pÃ¡ginas concretas de un PDF en 90 o 180 grados directamente en tu navegador. Gratis, privado y sin subir archivos.",
      keywords: [
        "girar pdf",
        "girar paginas pdf",
        "cambiar orientacion pdf",
        "corregir pdf torcido",
        "giracion de paginas pdf",
      ],
      ogTitle: "Gira pÃ¡ginas PDF en segundos | ihatelovepdf",
      ogDescription:
        "Selecciona las pÃ¡ginas que necesitan otra orientaciÃ³n, elige 90 o 180 grados y descarga el PDF corregido sin subir nada.",
      ogImageAlt: "Girar pÃ¡ginas PDF en ihatelovepdf",
    },
    hero: {
      title: "Gira pÃ¡ginas PDF sin perder calidad",
      description:
        "Corrige escaneos girados, exportaciones boca abajo o documentos con orientaciones mezcladas en pocos clics.",
      bulletPoints: [
        "Rota solo las pÃ¡ginas que selecciones, no todo el documento",
        "Elige girar 90 grados a la derecha, 180 grados o 90 grados a la izquierda",
        "Todo sucede en tu navegador, sin subidas ni esperas",
      ],
      imageAlt: "Flujo de rotaciÃ³n de pÃ¡ginas PDF",
    },
    benefitsTitle: "Por quÃ© girar pÃ¡ginas con ihatelovepdf",
    benefits: [
      {
        title: "Correcciones precisas",
        description:
          "Ajusta solo las hojas que lo necesitan, ideal para lotes escaneados o informes largos con orientaciones mixtas.",
      },
      {
        title: "Arreglo rÃ¡pido",
        description:
          "Corrige la orientaciÃ³n en segundos sin reabrir el archivo en un editor pesado de escritorio.",
      },
      {
        title: "Privacidad total",
        description:
          "Los documentos sensibles permanecen en tu dispositivo porque la rotaciÃ³n se ejecuta localmente.",
      },
    ],
    howTo: {
      title: "CÃ³mo girar pÃ¡ginas PDF",
      steps: [
        "Sube el PDF y elige el archivo con las pÃ¡ginas que quieres corregir.",
        "Marca las pÃ¡ginas y selecciona 90 grados a la derecha, 180 grados o 90 grados a la izquierda.",
        "Pulsa \"Procesar\" para descargar un nuevo PDF con la orientaciÃ³n ya corregida.",
      ],
      note:
        "Si luego necesitas mÃ¡s ajustes, puedes reordenar, extraer o comprimir el PDF resultante en otro paso.",
    },
    useCasesTitle: "CuÃ¡ndo conviene girar pÃ¡ginas",
    useCases: [
      "Enderezar contratos, formularios o recibos escaneados de lado.",
      "Corregir pÃ¡ginas boca abajo dentro de informes montados desde varias fuentes.",
      "Preparar apuntes o manuales antes de compartirlos con alumnado o clientes.",
      "Limpiar archivos histÃ³ricos para que todas las pÃ¡ginas se lean con comodidad.",
    ],
  },
  reorder: {
    key: "reorder",
    slug: "reordenar",
    mode: "reorder",
    meta: {
      title: "Reordenar PÃ¡ginas PDF | Cambiar Orden RÃ¡pido | ihatelovepdf",
      description:
        "Reorganiza fÃ¡cilmente las pÃ¡ginas de tu PDF arrastrando y soltando. Corrige el orden y guarda el resultado al instante, todo localmente.",
      keywords: [
        "reordenar pdf",
        "cambiar orden paginas pdf",
        "organizar pdf",
        "rearrange pdf",
        "ordenar paginas documento",
      ],
      ogTitle: "Organiza tus PDFs sin reinstalar software | ihatelovepdf",
      ogDescription:
        "Mueve las pÃ¡ginas a su posiciÃ³n correcta, corrige errores de orden y descarga tu documento PDF perfectamente organizado en solo unos momentos.",
      ogImageAlt: "ReordenaciÃ³n de pÃ¡ginas dentro de la interfaz ihatelovepdf",
    },
    hero: {
      title: "Reordenar pÃ¡ginas de un PDF con arrastrar y soltar",
      description:
        "Corrige el orden de facturas escaneadas, presentaciones o informes extensos en cuestiÃ³n de segundos.",
      bulletPoints: [
        "Visualiza miniaturas grandes para evitar errores",
        "Arrastra pÃ¡ginas y confirma el nuevo orden al instante",
        "Genera un PDF reorganizado sin perder marcadores ni enlaces internos",
      ],
      imageAlt: "ReordenaciÃ³n visual de pÃ¡ginas PDF",
    },
    benefitsTitle: "Beneficios de reorganizar PDFs con ihatelovepdf",
    benefits: [
      {
        title: "Flujos de trabajo mÃ¡s Ã¡giles",
        description:
          "Corrige escaneos desordenados sin volver a digitalizar ni instalar editores complejos.",
      },
      {
        title: "PrecisiÃ³n visual",
        description:
          "Las miniaturas permiten validar cada pÃ¡gina antes de exportar el nuevo orden.",
      },
      {
        title: "Sin dejar rastro",
        description:
          "Todo el proceso sucede en tu dispositivo, ideal para documentaciÃ³n sensible o confidencial.",
      },
    ],
    howTo: {
      title: "CÃ³mo reordenar pÃ¡ginas con ihatelovepdf",
      steps: [
        "Sube el PDF y selecciona el archivo que quieres editar.",
        "Arrastra cada miniatura hasta lograr el orden correcto.",
        "Haz clic en \"Procesar\" para descargar el documento con la nueva secuencia.",
      ],
      note:
        "Puedes seguir ajustando el orden incluso despuÃ©s de una exportaciÃ³n sin tener que cargar el archivo de nuevo.",
    },
    useCasesTitle: "CuÃ¡ndo reorganizar un PDF",
    useCases: [
      "Alinear presupuestos, anexos y firmas en un orden lÃ³gico antes de enviar.",
      "Preparar presentaciones impresas con la secuencia correcta.",
      "Resolver errores de pÃ¡ginas duplicadas o invertidas tras un escaneo masivo.",
      "Actualizar manuales o catÃ¡logos reutilizando contenido existente sin maquetar desde cero.",
    ],
  },
  pdfToImages: {
    key: "pdfToImages",
    slug: "convertir-pdf-a-imagenes",
    mode: "pdfToImages",
    meta: {
      title: "Convertir PDF a ImÃ¡genes | Exportar a PNG/JPEG | ihatelovepdf",
      description:
        "Convierte cada pÃ¡gina de tu PDF en imÃ¡genes PNG o JPEG de alta calidad. Elige tu resoluciÃ³n y descarga todo como un archivo ZIP â€” 100% privado y seguro.",
      keywords: [
        "pdf a imagenes",
        "pdf a png",
        "pdf a jpeg",
        "exportar paginas pdf",
        "descargar pdf como imagen",
      ],
      ogTitle: "Exporta pÃ¡ginas PDF como imÃ¡genes nÃ­tidas | ihatelovepdf",
      ogDescription:
        "Renderiza cada pÃ¡gina como una imagen nÃ­tida directamente en tu navegador. Ajusta la calidad, define nombres y obtÃ©n un archivo ZIP ordenado al instante.",
      ogImageAlt: "ihatelovepdf exportando un PDF a imÃ¡genes",
    },
    hero: {
      title: "Convierte pÃ¡ginas PDF en PNG o JPEG",
      description:
        "Genera imÃ¡genes listas para presentaciones, revisiones o entregables sin depender de editores pesados.",
      bulletPoints: [
        "Elige PNG o JPEG y controla el DPI de salida",
        "Descarga un ZIP Ãºnico o cada imagen por separado",
        "Procesamiento 100% local en tu navegador, sin subidas",
      ],
      imageAlt: "ExportaciÃ³n de PDF a imÃ¡genes",
    },
    benefitsTitle: "Por quÃ© exportar PDFs con ihatelovepdf",
    benefits: [
      {
        title: "Calidad lista para presentaciones",
        description:
          "Selecciona la resoluciÃ³n ideal para diapositivas, intranets o flujos de diseÃ±o sin perder nitidez.",
      },
      {
        title: "Descargas flexibles",
        description:
          "MantÃ©n un ZIP ordenado para documentos extensos o descarga solo las pÃ¡ginas que necesitas.",
      },
      {
        title: "Privacidad garantizada",
        description:
          "El render se ejecuta en tu navegador, perfecto para documentos confidenciales o bajo NDA.",
      },
    ],
    howTo: {
      title: "CÃ³mo convertir un PDF a imÃ¡genes",
      steps: [
        "Sube el PDF que quieres convertir. Trabajamos un archivo a la vez para asegurar la calidad.",
        "Elige PNG o JPEG, ajusta el DPI y decide si quieres agrupar los resultados en un ZIP.",
        "Haz clic en \"Exportar imÃ¡genes\" para descargar el archivo comprimido o las pÃ¡ginas individuales.",
      ],
      note:
        "Â¿Solo necesitas algunas pÃ¡ginas? Usa primero la extracciÃ³n o divisiÃ³n y luego conviÃ©rtelas a imÃ¡genes.",
    },
    useCasesTitle: "CuÃ¡ndo ayuda convertir PDF a imÃ¡genes",
    useCases: [
      "Compartir avances de diseÃ±o sin enviar el PDF completo.",
      "Insertar pÃ¡ginas en CMS, presentaciones o herramientas que solo aceptan imÃ¡genes.",
      "Crear material para tabletas o e-readers que manejan mejor PNG/JPEG que PDFs.",
      "Documentar revisiones internas con capturas de cada pÃ¡gina.",
    ],
  },
  imagesToPdf: {
    key: "imagesToPdf",
    slug: "crear-pdf-desde-imagenes",
    mode: "imagesToPdf",
    meta: {
      title: "Crear PDF desde ImÃ¡genes | JPG, PNG a PDF | ihatelovepdf",
      description:
        "Crea un PDF profesional a partir de tus imÃ¡genes. Organiza fotos, personaliza el diseÃ±o y los mÃ¡rgenes, y genera tu documento localmente en tu navegador.",
      keywords: [
        "imagenes a pdf",
        "jpg a pdf",
        "png a pdf",
        "webp a pdf",
        "crear pdf con fotos",
      ],
      ogTitle: "Crea un PDF impecable a partir de tus imÃ¡genes | ihatelovepdf",
      ogDescription:
        "Arrastra tus imÃ¡genes, define la configuraciÃ³n de diseÃ±o y exporta un archivo PDF listo para imprimir, sin subidas ni marcas de agua.",
      ogImageAlt: "CreaciÃ³n de PDF a partir de imÃ¡genes en ihatelovepdf",
    },
    hero: {
      title: "ReÃºne JPG o PNG en un PDF profesional",
      description:
        "Compila escaneos, fotos o grÃ¡ficos en un Ãºnico documento listo para tu equipo, alumnado o clientes.",
      bulletPoints: [
        "Reordena las imÃ¡genes con arrastrar y soltar",
        "Configura tamaÃ±o de pÃ¡gina, orientaciÃ³n y mÃ¡rgenes",
        "Define un color de fondo sÃ³lido para evitar transparencias",
      ],
      imageAlt: "Flujo de imÃ¡genes a PDF",
    },
    benefitsTitle: "Ventajas de crear PDFs desde imÃ¡genes",
    benefits: [
      {
        title: "DiseÃ±o consistente",
        description:
          "Alinea formatos distintos en un PDF uniforme sin estiramientos ni recortes inesperados.",
      },
      {
        title: "Listo para imprimir o revisar",
        description:
          "Controla mÃ¡rgenes, orientaciÃ³n y fondo para que el PDF luzca bien en papel y en pantalla.",
      },
      {
        title: "Procesamiento seguro",
        description:
          "La conversiÃ³n sucede Ã­ntegramente en tu navegador, ideal para recibos, identificaciones o material educativo.",
      },
    ],
    howTo: {
      title: "CÃ³mo convertir imÃ¡genes a PDF",
      steps: [
        "AÃ±ade las imÃ¡genes que quieres incluir y ordÃ©nalas segÃºn el documento final.",
        "Ajusta el modo de ajuste, el tamaÃ±o de pÃ¡gina, la orientaciÃ³n y los mÃ¡rgenes.",
        "Pulsa \"Crear PDF\" para descargar el archivo listo para compartir o archivar.",
      ],
      note:
        "Â¿El PDF final pesa mucho? Puedes comprimirlo o dividirlo sin volver a subir las imÃ¡genes.",
    },
    useCasesTitle: "Ideas para convertir imÃ¡genes a PDF",
    useCases: [
      "Agrupar tareas escaneadas o exÃ¡menes para devolverlos al alumnado.",
      "Juntar recibos y comprobantes en un Ãºnico PDF de gastos.",
      "Crear catÃ¡logos, portfolios o lookbooks a partir de exportaciones de diseÃ±o.",
      "Enviar reportes fotogrÃ¡ficos o inspecciones sin adjuntar decenas de archivos.",
    ],
  },
};

export const operationsEs: Record<OperationKey, OperationContent> = {
  merge: operationsEsContent.merge,
  compress: operationsEsContent.compress,
  split: operationsEsContent.split,
  extract: operationsEsContent.extract,
  crop: operationsEsContent.crop,
  rotate: operationsEsContent.rotate,
  reorder: operationsEsContent.reorder,
  pdfToImages: operationsEsContent.pdfToImages,
  imagesToPdf: operationsEsContent.imagesToPdf,
};
