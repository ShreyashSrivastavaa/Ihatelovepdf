import { localeLabels } from "../../config";
import { getRoutePath, getOperationPath } from "../../routing";
import { operationsPt } from "./operations";
import { faqsPt } from "./faqs";
import type { Dictionary } from "../dictionary-types";
import { OperationKey } from "../../../types/operations";

const locale = "pt" as const;
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

export const ptDictionary: Dictionary = {
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
      title: "ihatelovepdf â€“ Juntar, comprimir e converter PDFs grÃ¡tis | Sem upload",
      description:
        "ihatelovepdf Ã© um kit de ferramentas focado em privacidade para juntar, comprimir, dividir, extrair, reorganizar e converter PDFs em imagens ou imagens em PDF direto no navegador. Todo o processamento acontece no seu dispositivo, sem uploads.",
      keywords: [
        "juntar pdf",
        "comprimir pdf",
        "dividir pdf",
        "extrair pÃ¡ginas pdf",
        "reorganizar pdf",
        "pdf para imagens",
        "imagens para pdf",
        "converter pdf",
        "converter pdf online",
        "converter pdf para png",
        "converter jpg para pdf",
        "editar pdf offline",
        "ferramentas pdf",
        "pdf privativo",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "ihatelovepdf â€“ Juntar, Comprimir, Dividir, PDF para Imagem e Imagem para PDF",
        description:
          "Juntar, comprimir, dividir, extrair, reorganizar e converter PDFs sem enviar arquivos. Gratuito, privado e com processamento 100% local.",
        url: `${siteUrl}${homePath}`,
        locale: "pt_BR",
        type: "website",
        imageUrl: "https://ihatelovepdf.com/og-images/og-image-pt.png",
        imageAlt: "ihatelovepdf - Processamento de PDFs privado e gratuito",
      },
    },
    faq: {
      title: "Perguntas Frequentes | ihatelovepdf â€“ Ferramenta para PDFs",
      description:
        "Perguntas e respostas sobre o ihatelovepdf. Aprenda a juntar, comprimir, dividir, extrair e reorganizar PDFs sem enviar seus arquivos.",
      keywords: [
        "ihatelovepdf faq",
        "dÃºvidas pdf",
        "ajuda pdf",
        "juntar pdf dÃºvidas",
        "comprimir pdf dÃºvidas",
        "ajuda dividir pdf",
        "reorganizar pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "Apoie o ihatelovepdf | Mantenha a ferramenta privada e gratuita",
      description:
        "Sua doaÃ§Ã£o mantÃ©m o ihatelovepdf pequeno, independente e focado em privacidade. Ajude a cobrir hospedagem e evoluÃ§Ãµes contÃ­nuas.",
      keywords: [
        "doar para ihatelovepdf",
        "apoiar ferramenta pdf",
        "financiar projetos de privacidade",
        "doaÃ§Ãµes ihatelovepdf",
        "manter ihatelovepdf gratuito",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    operations: operationsPt,
  },
  brand: {
    name: "ihatelovepdf",
    tagline: "Processamento local â€¢ 100% privado",
  },
  components: {
    nav: {
      home: "InÃ­cio",
      faq: "Perguntas frequentes",
      support: "Apoiar",
      photo: "FotoLince",
      languageLabel: "Idioma",
      menuLabel: "Abrir menu de navegaÃ§Ã£o",
    },
    footer: {
      privacy: "Processamento local â€¢ 100% privado â€¢ LicenÃ§as abertas",
      rights: `Â© ${new Date().getFullYear()} ihatelovepdf â€” Ferramentas para manipular PDFs sem comprometer a privacidade`,
      links: {
        home: "InÃ­cio",
        faq: "Perguntas frequentes",
        support: "Apoiar",
        photo: "FotoLince",
        contact: "Contato",
      },
      capabilitiesLabel: "OperaÃ§Ãµes populares",
      operations: {
        merge: "Juntar PDFs",
        compress: "Comprimir PDF",
        split: "Dividir PDF",
        extract: "Extrair pÃ¡ginas",
        crop: "Recortar paginas",
        rotate: "Girar pÃ¡ginas",
        reorder: "Reordenar pÃ¡ginas",
        pdfToImages: "PDF para imagens",
        imagesToPdf: "Imagens para PDF",
      },
      license: "Processamento de PDF: PDF-lib (MIT), PDF.js (Apache 2.0) â€¢ Fonte: Geist (MIT)",
      disclaimer: "O serviÃ§o Ã© fornecido 'como estÃ¡', sem garantia de qualquer tipo. O usuÃ¡rio Ã© responsÃ¡vel pelo uso dos arquivos gerados.",
    },
    notifications: {
      labels: {
        success: "Sucesso",
        error: "Erro",
        info: "Aviso",
        warning: "AtenÃ§Ã£o",
      },
      closeLabel: "Fechar",
    },
    fotolinceBanner: {
      eyebrow: "Precisa otimizar imagens?",
      title: "Comprimir, redimensionar ou converter fotos com o FotoLince",
      description:
        "Nossa ferramenta irmÃ£ trata JPG, PNG e WEBP direto no navegador â€” perfeita para ajustar imagens antes de gerar um PDF.",
      ctaLabel: "Abrir FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "Logotipo do FotoLince",
    },
    feedback: {
      question: "Isso foi Ãºtil?",
      thanks: "Obrigado pelo seu feedback!",
      whatWrong: "Conte-nos o que deu errado",
      emailSubject: "Feedback sobre o ihatelovepdf",
    },
    pdfProcessor: {
      title: "Escolha uma operaÃ§Ã£o",
      modes: {
        merge: {
          label: "Juntar PDFs",
          helper: "Organize os PDFs para juntÃ¡-los em um Ãºnico documento.",
        },
        compress: {
          label: "Comprimir PDF",
          helper: "Reduza o tamanho de um PDF. Processe um arquivo por vez para preservar a qualidade.",
        },
        split: {
          label: "Dividir PDF",
          helper: "Selecione PDFs para separÃ¡-los em vÃ¡rios documentos.",
        },
        extract: {
          label: "Extrair pÃ¡ginas",
          helper: "Escolha pÃ¡ginas especÃ­ficas para criar um novo documento.",
        },
        crop: {
          label: "Recortar paginas",
          helper: "Remova margens visiveis das paginas selecionadas sem sair do navegador.",
        },
        rotate: {
          label: "Girar pÃ¡ginas",
          helper: "Selecione as pÃ¡ginas que precisam de nova orientaÃ§Ã£o e gire apenas essas pÃ¡ginas.",
        },
        reorder: {
          label: "Reordenar pÃ¡ginas",
          helper: "Mude a ordem das pÃ¡ginas dentro de um PDF.",
        },
        pdfToImages: {
          label: "PDF para imagens",
          helper: "Exporte cada pÃ¡gina do PDF como PNG ou JPEG sem enviar arquivos.",
        },
        imagesToPdf: {
          label: "Imagens para PDF",
          helper: "Agrupe JPG, PNG ou WEBP em um Ãºnico PDF com o layout que preferir.",
        },
      },
      upload: {
        title: "Selecione seus arquivos",
        clearAll: "Limpar tudo",
        listHeadings: {
          merge: "Arquivos para juntar (reordene para definir a sequÃªncia final):",
          extract: "Selecione um arquivo para trabalhar com as pÃ¡ginas:",
          crop: "Selecione um arquivo para trabalhar com as paginas:",
          rotate: "Selecione um arquivo para trabalhar com as pÃ¡ginas:",
          reorder: "Selecione um arquivo para trabalhar com as pÃ¡ginas:",
          pdfToImages: "PDFs para converter (processados um a um):",
          imagesToPdf: "Imagens para combinar (reordene para definir a sequÃªncia final):",
          default: "Arquivos selecionados (reordene ou remova):",
        },
        hints: {
          compress: "Cada arquivo serÃ¡ comprimido individualmente com equilÃ­brio entre qualidade e tamanho.",
          split: "Cada PDF serÃ¡ dividido conforme as opÃ§Ãµes escolhidas no prÃ³ximo passo.",
          crop: "Selecione as paginas a recortar e defina quantos pontos remover de cada lado no painel de opcoes.",
          pdfToImages: "Renderizamos um PDF de cada vez. Ajuste formato e DPI no painel de opÃ§Ãµes antes de exportar.",
          imagesToPdf: "Solte JPG, PNG, WEBP ou TIFF. Use as opÃ§Ãµes para definir tamanho de pÃ¡gina, orientaÃ§Ã£o e margens.",
        },
      },
      downloadNames: {
        compress: "comprimido_ihatelovepdf",
        merge: "unido_ihatelovepdf",
        split: "parte_ihatelovepdf",
        extract: "extraido_ihatelovepdf",
        crop: "recortado_ihatelovepdf",
        rotate: "girado_ihatelovepdf",
        reorder: "reordenado_ihatelovepdf",
        pdfToImages: "imagens_ihatelovepdf",
        imagesToPdf: "imagens_para_pdf_ihatelovepdf",
      },
      processButton: {
        idleSingle: "Processar 1 arquivo",
        idleMultiple: (count: number) => `Processar ${count} arquivos`,
        processing: "Processando...",
        extract: (count: number) =>
          `Extrair ${count} ${count === 1 ? "pÃ¡gina" : "pÃ¡ginas"}`,
        crop: (count: number) =>
          count > 0 ? `Recortar ${count} ${count === 1 ? "pagina" : "paginas"}` : "Recortar PDF",
        rotate: (count: number) =>
          count > 0 ? `Girar ${count} ${count === 1 ? "pÃ¡gina" : "pÃ¡ginas"}` : "Girar PDF",
        reorder: "Salvar nova ordem",
        pdfToImages: {
          single: "Exportar imagens",
          multiple: (count: number) => `Exportar ${count} PDFs`,
        },
        imagesToPdf: {
          single: "Criar PDF",
          multiple: (count: number) => `Criar PDF com ${count} imagens`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Processando (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Comprimido. ReduÃ§Ã£o: ${reduction}% (${original} â†’ ${next}) em ${seconds}s`,
        merged: "JunÃ§Ã£o concluÃ­da",
        split: (count: number) =>
          count > 1
            ? `Gerados ${count} arquivos. Baixando o primeiro...`
            : "DivisÃ£o concluÃ­da",
        extracted: (count: number) =>
          `Extraidas ${count} ${count === 1 ? "pagina" : "paginas"}`,
        cropped: (count: number) => `Recortadas ${count} ${count === 1 ? "pagina" : "paginas"}`,
        rotated: (count: number) => `Giradas ${count} ${count === 1 ? "pÃ¡gina" : "pÃ¡ginas"}`,
        reordered: "ReordenaÃ§Ã£o concluÃ­da",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `Exportadas ${count} ${label} ${count === 1 ? "imagem" : "imagens"} em um arquivo ZIP`
            : `Baixadas ${count} ${label} ${count === 1 ? "imagem" : "imagens"}`;
        },
        imagesToPdf: (count: number) =>
          `Criado um PDF a partir de ${count} ${count === 1 ? "imagem" : "imagens"}`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "Nenhum resultado gerado",
        mergeRequiresTwo: "Selecione pelo menos dois arquivos para juntar",
        noPagesSelected: "Escolha pelo menos uma pÃ¡gina",
        invalidFile: "Selecione um arquivo vÃ¡lido",
        reorderEmpty: "Nenhuma nova ordem detectada",
        unknown: "Erro desconhecido",
        modeNotSupported: "Modo nÃ£o suportado",
      },
      labels: {
        pagesToExtract: "Selecione as pÃ¡ginas para extrair:",
        pagesToCrop: "Selecione as paginas para recortar:",
        pagesToRotate: "Selecione as pÃ¡ginas para girar:",
        reorderPages: "Arraste as pÃ¡ginas para reordenÃ¡-las:",
      },
      compressionPreview: {
        title: "PrÃ©-visualizaÃ§Ã£o da compressÃ£o",
        description:
          "Ajuste as opÃ§Ãµes para estimar o tamanho final antes de executar a compressÃ£o.",
        running: "Calculando prÃ©viaâ€¦",
        readyLabel: "Resultado estimado",
        ratio: (percent: string) => `${percent}% menor`,
        saved: (size: string) => `${size} economizados`,
        time: (seconds: string) => `â‰ˆ ${seconds}s`,
        original: "Original",
        result: "Estimado",
        notice:
          "A prÃ©via roda localmente. Ao clicar em Processar reutilizamos esse resultado sem enviar arquivos.",
        error: "NÃ£o foi possÃ­vel gerar a prÃ©via.",
        retry: "Tentar novamente",
        universalBadge: "OtimizaÃ§Ã£o universal",
      },
      compressionSummary: {
        title: "Ãšltima compressÃ£o",
        ratio: (percent: string) => `${percent}% menor`,
        saved: (size: string) => `${size} economizados`,
        original: "Original",
        result: "Comprimido",
        duration: (seconds: string) => `ConcluÃ­do em ${seconds}s`,
        download: "Baixar novamente",
        clear: "Limpar resumo",
      },
      donationReminder: {
        message: "O ihatelovepdf te salvou tempo hoje? Seu apoio mantÃ©m o projeto privado e gratuito.",
        actionLabel: "Apoiar o ihatelovepdf",
        withSavings: (percent: string, saved: string) =>
          `Economizou ${saved} (${percent}% menor)? Ajude a manter o ihatelovepdf privado e gratuito.`,
      },
      statusDialog: {
        processingTitle: "Processando localmente",
        successTitle: "Seus arquivos estÃ£o prontos",
        successDescription:
          "Os downloads comeÃ§am automaticamente. Aqui vocÃª pode baixÃ¡-los novamente.",
        resultsLabel: "Resultado recente",
        filesProcessedLabel: (count: number) =>
          `${count} ${count === 1 ? "arquivo processado" : "arquivos processados"}`,
        downloadAgainLabel: "Baixar novamente",
        errorTitle: "Falha no processamento",
        errorDescription: "NÃ£o foi possÃ­vel concluir a operaÃ§Ã£o. Verifique os arquivos e tente outra vez.",
        retryLabel: "Tentar novamente",
        closeLabel: "Fechar",
        sharePrompt: {
          dialogMessage: "O ihatelovepdf Ã© totalmente gratuito e respeita a sua privacidade. Ajude-nos a mantÃª-lo assim compartilhando-o com um colega.",
          shareText: "Acabei de usar o ihatelovepdf para gerenciar meus PDFs. Ã‰ uma ferramenta gratuita, rÃ¡pida e totalmente privada para dividir, comprimir, juntar e converter PDFs direto no navegador. Perfeita para documentos sensÃ­veis!",
          actionLabel: "Compartilhar",
          copiedLabel: "Copiado!",
        },
      },
      compressionTotal: {
        title: "Economia total (todos os arquivos)",
        savings: (size: string) => `${size} economizados no total`,
        count: (count: number) => `${count} arquivos otimizados`,
      },
    },
    fileUploader: {
      clickToSelect: "Clique para selecionar",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "ou arraste e solte imagens" : "ou arraste e solte arquivos PDF",
      accepted: {
        pdf: "Arquivos PDF",
        images: "Formatos aceitos: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Tamanho recomendado: < ${sizeMb}MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Tipo de arquivo nÃ£o suportado: ${fileName}. Apenas ${label} sÃ£o permitidos.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Arquivo muito grande: ${fileName}. O tamanho mÃ¡ximo Ã© ${sizeMb}MB.`,
      },
      dropImagesAlt: "Imagem ilustrativa de documento PDF",
    },
    fileList: {
      moveUp: "Mover para cima",
      moveDown: "Mover para baixo",
      remove: "Remover",
      removeAll: "Remover tudo",
      imageLabel: "Imagem",
      fileLabel: "Arquivo",
      selected: "Selecionado",
      pdfLabel: "PDF",
      deselect: "Desmarcar",
      pagesLabel: (count: number) => `${count} ${count === 1 ? "pÃ¡gina" : "pÃ¡ginas"}`,
      previewLoading: "Carregando prÃ©viaâ€¦",
    },
    pageSelector: {
      loading: "Carregando pÃ¡ginas do PDF...",
      error: "NÃ£o foi possÃ­vel carregar as informaÃ§Ãµes do PDF",
      summary: (total: number, selected: number) =>
        `${total} pÃ¡ginas detectadas â€” ${selected} selecionadas`,
      selectAll: "Selecionar todas",
      deselectAll: "Desmarcar todas",
      pageLabel: (pageNumber: number) => `PÃ¡g. ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Mostrando ${shown} de ${total} pÃ¡ginas. Para extrair outras, digite os nÃºmeros abaixo.`,
      manualLabel: "Digite pÃ¡ginas extras (ex.: 21, 25-30, 42)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Carregando pÃ¡ginas do PDF...",
      error: "NÃ£o foi possÃ­vel carregar as informaÃ§Ãµes do PDF",
      limitReached: (count: number) =>
        `Este PDF tem ${count} pÃ¡ginas. Por desempenho, Ã© possÃ­vel reordenar atÃ© 120 pÃ¡ginas por vez.`,
      limitHint:
        "Divida o PDF em partes menores e reordene cada uma.",
      summary: (count: number) => `${count} pÃ¡ginas prontas para reordenar`,
      reset: "Restaurar ordem original",
      dragHint: "Arraste para mudar a ordem",
      pageLabel: (pageNumber: number) => `PÃ¡gina ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: PÃ¡g. ${pageNumber}`,
      instructions:
        'Arraste as pÃ¡ginas ou use as setas para movÃª-las. Quando finalizar, clique em "Salvar nova ordem" para aplicar as mudanÃ§as.',
    },
    processingOptions: {
      compress: {
        title: "CompressÃ£o",
        level: "NÃ­vel",
        levels: {
          low: "Baixo",
          medium: "MÃ©dio",
          high: "Alto",
        },
        removeMetadata: "Remover metadados",
        removeMetadataHint: "Remove detalhes ocultos como autor, assunto e histÃ³rico de ediÃ§Ã£o.",
        stripAnnotations: "Remover anotaÃ§Ãµes e comentÃ¡rios",
        stripAnnotationsHint: "Exclui notas, formulÃ¡rios, assinaturas e aÃ§Ãµes do documento.",
        downscaleImages: "Reduzir imagens incorporadas",
        downscaleHint: "Ideal para documentos digitalizados ou PDFs com muitas fotos. MantÃ©m o texto nÃ­tido enquanto reduz as fotos.",
        advancedTitle: "Limpeza avanÃ§ada",
        advancedDescription: "Mantenha o bÃ¡sico ou ative apenas os extras necessÃ¡rios.",
        activeLabel: "Ativos:",
      },
      merge: {
        title: "JunÃ§Ã£o",
        pageDivider: "PÃ¡gina em branco entre documentos",
        metadataTitle: "TÃ­tulo final (opcional)",
        metadataAuthor: "Autor final (opcional)",
        metadataHint: "Defina metadados personalizados para o PDF unido. Deixe em branco para manter os padrÃµes.",
      },
      split: {
        title: "DivisÃ£o",
        pagesPerFile: "PÃ¡ginas por arquivo",
        pagesPerFileHint: "Um novo PDF serÃ¡ criado a cada N pÃ¡ginas.",
      },
      extract: {
        title: "ExtraÃ§Ã£o",
        preserveMetadata: "Preservar metadados originais",
        preserveMetadataHint: "MantÃ©m tÃ­tulo, autor e outros detalhes no PDF gerado.",
      },
      crop: {
        title: "Recorte",
        hint: "Selecione as paginas e defina quantos pontos remover de cada lado.",
        inputModeLabel: "Metodo de recorte",
        inputModes: {
          margins: "Definir margens",
          manual: "Selecao manual",
        },
        marginsTitle: "Margens",
        marginLabels: {
          top: "Margem superior (pt)",
          right: "Margem direita (pt)",
          bottom: "Margem inferior (pt)",
          left: "Margem esquerda (pt)",
        },
        marginHint: "72 pt equivalem a cerca de 1 polegada. Comece com valores pequenos para nao cortar conteudo.",
        preserveMetadata: "Preservar metadados originais",
        preserveMetadataHint: "Mantem titulo, autor e outros detalhes no PDF recortado.",
        manual: {
          title: "Selecao manual de recorte",
          hint: "Arraste sobre a visualizacao para definir a area visivel. Convertimos a selecao nos mesmos valores de margem usados pelo recorte atual.",
          loading: "Carregando visualizacao de recorte...",
          error: "Nao foi possivel carregar a visualizacao de recorte.",
          reset: "Redefinir selecao",
          pagePreview: (pageNumber: number) => `Pagina de visualizacao ${pageNumber}`,
        },
      },
      rotate: {
        title: "Girar",
        hint: "Escolha a direÃ§Ã£o e depois marque as pÃ¡ginas que deseja girar.",
        rotateRight90: "Girar 90 graus para a direita",
        rotate180: "Girar 180 graus",
        rotateLeft90: "Girar 90 graus para a esquerda",
      },
      reorder: {
        title: "Reordenar",
        hint: "Arraste as miniaturas para alterar a ordem.",
      },
      pdfToImages: {
        title: "ExportaÃ§Ã£o de imagens",
        formatLabel: "Formato da imagem",
        formatHint: "Escolha PNG para qualidade sem perdas ou JPEG para arquivos menores.",
        pngLabel: "PNG (sem perdas)",
        jpegLabel: "JPEG (arquivo menor)",
        qualityLabel: "Qualidade JPEG",
        qualityHint: "Qualidade maior preserva mais detalhes, mas gera imagens maiores.",
        dpiLabel: "DPI de renderizaÃ§Ã£o",
        dpiHint: "DPI mais altos aumentam a nitidez e o tamanho final. 144 DPI Ã© ideal para telas e slides.",
        dpiPresets: {
          screen: "72 DPI Â· Tela",
          balanced: "144 DPI Â· Equilibrado",
          print: "300 DPI Â· ImpressÃ£o",
        },
        zipLabel: "Agrupar em um ZIP",
        zipHint: "FaÃ§a um Ãºnico download em vez de baixar uma imagem por pÃ¡gina.",
        baseNameLabel: "Nome base do arquivo",
        baseNamePlaceholder: "ihatelovepdf_paginas",
        baseNameHint: "Usamos esse texto como prefixo dos arquivos exportados. Deixe vazio para usar o nome do PDF.",
      },
      imagesToPdf: {
        title: "Layout",
        layoutTitle: "ConfiguraÃ§Ã£o da pÃ¡gina",
        fitLabel: "Ajuste da imagem",
        fitOptions: {
          contain: "Conter (mostrar imagem inteira)",
          cover: "Cobrir (preencher pÃ¡gina)",
        },
        sizeLabel: "Tamanho da pÃ¡gina",
        sizeOptions: {
          auto: "AutomÃ¡tico (acompanha a imagem)",
          a4: "A4",
          letter: "Carta",
        },
        orientationLabel: "OrientaÃ§Ã£o",
        orientationOptions: {
          auto: "AutomÃ¡tico",
          portrait: "Retrato",
          landscape: "Paisagem",
        },
        marginLabel: "Margens (pts)",
        marginHint: "Adiciona espaÃ§o em branco ao redor da imagem. 72 pts â‰ˆ 1 polegada.",
        backgroundLabel: "Cor de fundo",
        backgroundHint: "Aplicada atrÃ¡s das imagens e nas Ã¡reas que permanecerem em branco.",
      },
    },
    cookieBanner: {
      message: "Usamos cookies para analisar o trÃ¡fego e melhorar sua experiÃªncia. NÃ£o compartilhamos seus dados pessoais.",
      accept: "Aceitar",
      decline: "Recusar",
    },
  },
  pages: {
    home: {
      hero: {
        title: "ihatelovepdf: comprimir, juntar e converter PDF online grÃ¡tis",
        subtitle:
          "Comprimir PDF, juntar PDF, dividir documentos, extrair pÃ¡ginas e converter PDF em imagens ou imagens em PDF direto no navegador. Sem uploads, 100% privado e gratuito.",
        badges: [
          "Comprimir PDF rÃ¡pido",
          "Juntar PDF sem limites",
          "Processamento local",
          "Apoie o ihatelovepdf",
        ],
        imageAlt: "IlustraÃ§Ã£o de documento PDF",
        ctaLinks: [
          {
            label: "PDF para imagens",
            href: operationRoutes.pdfToImages,
            description: "Exporte pÃ¡ginas como PNG ou JPEG",
          },
          {
            label: "Imagens para PDF",
            href: operationRoutes.imagesToPdf,
            description: "Combine JPG, PNG ou WEBP",
          },
        ],
      },
      why: {
        title: "Por que usar o ihatelovepdf?",
        cards: [
          {
            title: "Privacidade por padrÃ£o",
            description:
              "Seus PDFs nunca saem do dispositivo. Tudo acontece no navegador.",
            icon: "ðŸ”’",
          },
          {
            title: "RÃ¡pido e eficiente",
            description:
              "Nosso motor local entrega velocidade sem uploads para a nuvem.",
            icon: "âš¡",
          },
          {
            title: "Funciona em qualquer tela",
            description:
              "Desktop, tablet ou celular â€” basta um navegador moderno.",
            icon: "ðŸ“±",
          },
        ],
      },
      callout: {
        title: "Ajude a manter o ihatelovepdf gratuito",
        description:
          "Cada doaÃ§Ã£o paga a hospedagem, o tempo de desenvolvimento e garante uma experiÃªncia 100% privada sem anÃºncios ou rastreadores.",
        ctaLabel: "Apoiar o projeto",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "Veja como usamos as doaÃ§Ãµes",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Perguntas Frequentes",
      intro: "Respostas para as dÃºvidas mais comuns sobre o ihatelovepdf",
      cta: {
        title: "Experimente o ihatelovepdf agora",
        description:
          "Junte, comprima, divida, extraia e reordene seus PDFs com total privacidade. Sem cadastro, sem upload de arquivos.",
        ctaLabel: "Ir para a ferramenta",
      },
    },
    support: {
      hero: {
        eyebrow: "ðŸŒ± Projeto independente",
        title: "Ajude a manter o ihatelovepdf gratuito e privado",
        subtitle:
          "O ihatelovepdf Ã© um projetinho feito com carinho. Seu apoio paga os servidores e nos dÃ¡ tempo para continuar melhorando.",
        highlight: "Uma ferramenta pequena que respeita a sua privacidade.",
      },
      reasons: {
        title: "Por que doar?",
        cards: [
          {
            title: "Continuar gratuito",
            description:
              "As doaÃ§Ãµes nos permitem manter o ihatelovepdf 100% gratuito, sem planos premium nem recursos bloqueados.",
            icon: "ðŸ’š",
          },
          {
            title: "Melhorias constantes",
            description:
              "Seu apoio financia correÃ§Ãµes, novas ferramentas e o capricho que deixa tudo rÃ¡pido.",
            icon: "âœ¨",
          },
          {
            title: "Privacidade sempre",
            description:
              "Processamos tudo localmente para que seus PDFs nunca saiam do dispositivo. As doaÃ§Ãµes nos ajudam a manter essa arquitetura.",
            icon: "ðŸ”’",
          },
        ],
      },
      tiers: {
        title: "Doe o que puder",
        description: "Qualquer valor ajuda. Pagamento seguro via Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Um cafÃ©",
            amount: "â‚¬3",
            description: "Paga a hospedagem por algumas semanas.",
            ctaLabel: "Doar â‚¬3",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Apoio mensal",
            amount: "â‚¬10/mÃªs",
            description: "Garante horas semanais para evoluir o ihatelovepdf.",
            ctaLabel: "Doar â‚¬10/mÃªs",
            ctaHref: "#stripe-checkout-monthly",
            badge: "ðŸ’™ Obrigado",
          },
          {
            id: "custom",
            title: "Outro valor",
            amount: "Qualquer quantia",
            description: "Cada euro conta. Escolha o valor que fizer sentido para vocÃª.",
            ctaLabel: "Escolher valor",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Pagamentos seguros com Stripe. VocÃª pode cancelar as doaÃ§Ãµes recorrentes quando quiser.",
      },
      transparency: {
        title: "Como usamos o dinheiro",
        items: [
          "Hospedagem e CDN para manter o site rÃ¡pido em qualquer lugar",
          "Tempo de desenvolvimento para correÃ§Ãµes e novos recursos",
          "Ajustes de design e experiÃªncia para deixar tudo fÃ¡cil",
          "TraduÃ§Ãµes e guias para todos os idiomas suportados",
        ],
      },
      faq: {
        title: "Perguntas",
        entries: [
          {
            question: "E se eu nÃ£o puder doar?",
            answer:
              "Tudo bem. O ihatelovepdf continuarÃ¡ gratuito. Compartilhar a ferramenta ou contar como ela ajudou jÃ¡ nos incentiva bastante.",
          },
          {
            question: "Recebo um comprovante?",
            answer:
              "Sim. A Stripe envia automaticamente um recibo por e-mail com os detalhes do pagamento.",
          },
          {
            question: "Como cancelo uma doaÃ§Ã£o mensal?",
            answer:
              "Basta usar o portal da Stripe ou nos mandar um e-mail que cancelamos por aqui, sem burocracia.",
          },
        ],
      },
      closing: {
        title: "Obrigado por estar aqui",
        description:
          "Cada pessoa que apoia o ihatelovepdf ajuda a manter uma ferramenta Ãºtil, privada e acessÃ­vel para todo mundo.",
        ctaLabel: "Falar com o time",
        ctaHref: "mailto:info@ihatelovepdf.com?subject=Oi%20time%20do%20ihatelovepdf",
      },
      legalNotice: {
        title: "Aviso legal e transparÃªncia",
        points: [
          "ihatelovepdf Ã© um projeto pessoal independente mantido por uma pequena equipe voluntÃ¡ria.",
          "As contribuiÃ§Ãµes sÃ£o voluntÃ¡rias e ajudam a pagar hospedagem, ferramentas e tempo de desenvolvimento.",
          "Os pagamentos nÃ£o sÃ£o doaÃ§Ãµes filantrÃ³picas nem geram benefÃ­cios fiscais; a Stripe enviarÃ¡ um recibo automÃ¡tico.",
          "O serviÃ§o Ã© fornecido no estado em que se encontra, sem garantias. DÃºvidas? Escreva para info@ihatelovepdf.com.",
        ],
      },
    },
  },
  faqs: faqsPt,
  operations: operationsPt,
};
