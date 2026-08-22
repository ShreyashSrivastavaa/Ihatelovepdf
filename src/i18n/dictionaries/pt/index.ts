import { localeLabels } from "../../config";
import { getRoutePath } from "../../routing";
import { operationsPt } from "./operations";
import { faqsPt } from "./faqs";
import type { Dictionary } from "../dictionary-types";
import { getOperationsRoutes, getOperationsFooterLabels, getOperationsModeLabels, getOperationsDownloadNames } from "../../operations-catalog";

const locale = "pt" as const;
const { label, nativeName, htmlLang, hrefLang } = localeLabels[locale];
const siteUrl = "https://ihatelovepdf.com";
const homePath = getRoutePath(locale, "home");

const operationRoutes = getOperationsRoutes(locale);

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
      title: "ihatelovepdf – Juntar, comprimir e converter PDFs grátis | Sem upload",
      description:
        "ihatelovepdf é um kit de ferramentas focado em privacidade para juntar, comprimir, dividir, extrair, reorganizar e converter PDFs em imagens ou imagens em PDF direto no navegador. Todo o processamento acontece no seu dispositivo, sem uploads.",
      keywords: [
        "juntar pdf",
        "comprimir pdf",
        "dividir pdf",
        "extrair páginas pdf",
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
        title: "ihatelovepdf – Juntar, Comprimir, Dividir, PDF para Imagem e Imagem para PDF",
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
      title: "Perguntas Frequentes | ihatelovepdf – Ferramenta para PDFs",
      description:
        "Perguntas e respostas sobre o ihatelovepdf. Aprenda a juntar, comprimir, dividir, extrair e reorganizar PDFs sem enviar seus arquivos.",
      keywords: [
        "ihatelovepdf faq",
        "dúvidas pdf",
        "ajuda pdf",
        "juntar pdf dúvidas",
        "comprimir pdf dúvidas",
        "ajuda dividir pdf",
        "reorganizar pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "Apoie o ihatelovepdf | Mantenha a ferramenta privada e gratuita",
      description:
        "Sua doação mantém o ihatelovepdf pequeno, independente e focado em privacidade. Ajude a cobrir hospedagem e evoluções contínuas.",
      keywords: [
        "doar para ihatelovepdf",
        "apoiar ferramenta pdf",
        "financiar projetos de privacidade",
        "doações ihatelovepdf",
        "manter ihatelovepdf gratuito",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    operations: operationsPt,
  },
  brand: {
    name: "ihatelovepdf",
    tagline: "Processamento local • 100% privado",
  },
  components: {
    nav: {
      home: "Início",
      faq: "Perguntas frequentes",
      support: "Apoiar",
      photo: "FotoLince",
      languageLabel: "Idioma",
      menuLabel: "Abrir menu de navegação",
    },
    footer: {
      privacy: "Processamento local • 100% privado • Licenças abertas",
      rights: `© ${new Date().getFullYear()} ihatelovepdf — Ferramentas para manipular PDFs sem comprometer a privacidade`,
      links: {
        home: "Início",
        faq: "Perguntas frequentes",
        support: "Apoiar",
        photo: "FotoLince",
        contact: "Contato",
      },
      capabilitiesLabel: "Operações populares",
      operations: getOperationsFooterLabels(locale),
      license: "Processamento de PDF: PDF-lib (MIT), PDF.js (Apache 2.0) • Fonte: Geist (MIT)",
      disclaimer: "O serviço é fornecido 'como está', sem garantia de qualquer tipo. O usuário é responsável pelo uso dos arquivos gerados.",
    },
    notifications: {
      labels: {
        success: "Sucesso",
        error: "Erro",
        info: "Aviso",
        warning: "Atenção",
      },
      closeLabel: "Fechar",
    },
    fotolinceBanner: {
      eyebrow: "Precisa otimizar imagens?",
      title: "Comprimir, redimensionar ou converter fotos com o FotoLince",
      description:
        "Nossa ferramenta irmã trata JPG, PNG e WEBP direto no navegador — perfeita para ajustar imagens antes de gerar um PDF.",
      ctaLabel: "Abrir FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "Logotipo do FotoLince",
    },
    feedback: {
      question: "Isso foi útil?",
      thanks: "Obrigado pelo seu feedback!",
      whatWrong: "Conte-nos o que deu errado",
      emailSubject: "Feedback sobre o ihatelovepdf",
    },
    pdfProcessor: {
      title: "Escolha uma operação",
      modes: getOperationsModeLabels(locale),
      upload: {
        title: "Selecione seus arquivos",
        clearAll: "Limpar tudo",
        listHeadings: {
          merge: "Arquivos para juntar (reordene para definir a sequência final):",
          extract: "Selecione um arquivo para trabalhar com as páginas:",
          crop: "Selecione um arquivo para trabalhar com as paginas:",
          rotate: "Selecione um arquivo para trabalhar com as páginas:",
          reorder: "Selecione um arquivo para trabalhar com as páginas:",
          pdfToImages: "PDFs para converter (processados um a um):",
          imagesToPdf: "Imagens para combinar (reordene para definir a sequência final):",
          default: "Arquivos selecionados (reordene ou remova):",
        },
        hints: {
          compress: "Cada arquivo será comprimido individualmente com equilíbrio entre qualidade e tamanho.",
          split: "Cada PDF será dividido conforme as opções escolhidas no próximo passo.",
          crop: "Selecione as paginas a recortar e defina quantos pontos remover de cada lado no painel de opcoes.",
          pdfToImages: "Renderizamos um PDF de cada vez. Ajuste formato e DPI no painel de opções antes de exportar.",
          imagesToPdf: "Solte JPG, PNG, WEBP ou TIFF. Use as opções para definir tamanho de página, orientação e margens.",
        },
      },
      downloadNames: getOperationsDownloadNames(locale),
      processButton: {
        idleSingle: "Processar 1 arquivo",
        idleMultiple: (count: number) => `Processar ${count} arquivos`,
        processing: "Processando...",
        extract: (count: number) =>
          `Extrair ${count} ${count === 1 ? "página" : "páginas"}`,
        crop: (count: number) =>
          count > 0 ? `Recortar ${count} ${count === 1 ? "pagina" : "paginas"}` : "Recortar PDF",
        rotate: (count: number) =>
          count > 0 ? `Girar ${count} ${count === 1 ? "página" : "páginas"}` : "Girar PDF",
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
          `Comprimido. Redução: ${reduction}% (${original} → ${next}) em ${seconds}s`,
        merged: "Junção concluída",
        split: (count: number) =>
          count > 1
            ? `Gerados ${count} arquivos. Baixando o primeiro...`
            : "Divisão concluída",
        extracted: (count: number) =>
          `Extraidas ${count} ${count === 1 ? "pagina" : "paginas"}`,
        cropped: (count: number) => `Recortadas ${count} ${count === 1 ? "pagina" : "paginas"}`,
        rotated: (count: number) => `Giradas ${count} ${count === 1 ? "página" : "páginas"}`,
        reordered: "Reordenação concluída",
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
        noPagesSelected: "Escolha pelo menos uma página",
        invalidFile: "Selecione um arquivo válido",
        reorderEmpty: "Nenhuma nova ordem detectada",
        unknown: "Erro desconhecido",
        modeNotSupported: "Modo não suportado",
      },
      labels: {
        pagesToExtract: "Selecione as páginas para extrair:",
        pagesToCrop: "Selecione as paginas para recortar:",
        pagesToRotate: "Selecione as páginas para girar:",
        reorderPages: "Arraste as páginas para reordená-las:",
      },
      compressionPreview: {
        title: "Pré-visualização da compressão",
        description:
          "Ajuste as opções para estimar o tamanho final antes de executar a compressão.",
        running: "Calculando prévia…",
        readyLabel: "Resultado estimado",
        ratio: (percent: string) => `${percent}% menor`,
        saved: (size: string) => `${size} economizados`,
        time: (seconds: string) => `≈ ${seconds}s`,
        original: "Original",
        result: "Estimado",
        notice:
          "A prévia roda localmente. Ao clicar em Processar reutilizamos esse resultado sem enviar arquivos.",
        error: "Não foi possível gerar a prévia.",
        retry: "Tentar novamente",
        universalBadge: "Otimização universal",
      },
      compressionSummary: {
        title: "Última compressão",
        ratio: (percent: string) => `${percent}% menor`,
        saved: (size: string) => `${size} economizados`,
        original: "Original",
        result: "Comprimido",
        duration: (seconds: string) => `Concluído em ${seconds}s`,
        download: "Baixar novamente",
        clear: "Limpar resumo",
      },
      donationReminder: {
        message: "O ihatelovepdf te salvou tempo hoje? Seu apoio mantém o projeto privado e gratuito.",
        actionLabel: "Apoiar o ihatelovepdf",
        withSavings: (percent: string, saved: string) =>
          `Economizou ${saved} (${percent}% menor)? Ajude a manter o ihatelovepdf privado e gratuito.`,
      },
      statusDialog: {
        processingTitle: "Processando localmente",
        successTitle: "Seus arquivos estão prontos",
        successDescription:
          "Os downloads começam automaticamente. Aqui você pode baixá-los novamente.",
        resultsLabel: "Resultado recente",
        filesProcessedLabel: (count: number) =>
          `${count} ${count === 1 ? "arquivo processado" : "arquivos processados"}`,
        downloadAgainLabel: "Baixar novamente",
        errorTitle: "Falha no processamento",
        errorDescription: "Não foi possível concluir a operação. Verifique os arquivos e tente outra vez.",
        retryLabel: "Tentar novamente",
        closeLabel: "Fechar",
        sharePrompt: {
          dialogMessage: "O ihatelovepdf é totalmente gratuito e respeita a sua privacidade. Ajude-nos a mantê-lo assim compartilhando-o com um colega.",
          shareText: "Acabei de usar o ihatelovepdf para gerenciar meus PDFs. É uma ferramenta gratuita, rápida e totalmente privada para dividir, comprimir, juntar e converter PDFs direto no navegador. Perfeita para documentos sensíveis!",
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
          `Tipo de arquivo não suportado: ${fileName}. Apenas ${label} são permitidos.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Arquivo muito grande: ${fileName}. O tamanho máximo é ${sizeMb}MB.`,
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
      pagesLabel: (count: number) => `${count} ${count === 1 ? "página" : "páginas"}`,
      previewLoading: "Carregando prévia…",
    },
    pageSelector: {
      loading: "Carregando páginas do PDF...",
      error: "Não foi possível carregar as informações do PDF",
      summary: (total: number, selected: number) =>
        `${total} páginas detectadas — ${selected} selecionadas`,
      selectAll: "Selecionar todas",
      deselectAll: "Desmarcar todas",
      pageLabel: (pageNumber: number) => `Pág. ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Mostrando ${shown} de ${total} páginas. Para extrair outras, digite os números abaixo.`,
      manualLabel: "Digite páginas extras (ex.: 21, 25-30, 42)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Carregando páginas do PDF...",
      error: "Não foi possível carregar as informações do PDF",
      limitReached: (count: number) =>
        `Este PDF tem ${count} páginas. Por desempenho, é possível reordenar até 120 páginas por vez.`,
      limitHint:
        "Divida o PDF em partes menores e reordene cada uma.",
      summary: (count: number) => `${count} páginas prontas para reordenar`,
      reset: "Restaurar ordem original",
      dragHint: "Arraste para mudar a ordem",
      pageLabel: (pageNumber: number) => `Página ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: Pág. ${pageNumber}`,
      instructions:
        'Arraste as páginas ou use as setas para movê-las. Quando finalizar, clique em "Salvar nova ordem" para aplicar as mudanças.',
    },
    processingOptions: {
      compress: {
        title: "Compressão",
        level: "Nível",
        levels: {
          low: "Baixo",
          medium: "Médio",
          high: "Alto",
        },
        removeMetadata: "Remover metadados",
        removeMetadataHint: "Remove detalhes ocultos como autor, assunto e histórico de edição.",
        stripAnnotations: "Remover anotações e comentários",
        stripAnnotationsHint: "Exclui notas, formulários, assinaturas e ações do documento.",
        downscaleImages: "Reduzir imagens incorporadas",
        downscaleHint: "Ideal para documentos digitalizados ou PDFs com muitas fotos. Mantém o texto nítido enquanto reduz as fotos.",
        advancedTitle: "Limpeza avançada",
        advancedDescription: "Mantenha o básico ou ative apenas os extras necessários.",
        activeLabel: "Ativos:",
      },
      merge: {
        title: "Junção",
        pageDivider: "Página em branco entre documentos",
        metadataTitle: "Título final (opcional)",
        metadataAuthor: "Autor final (opcional)",
        metadataHint: "Defina metadados personalizados para o PDF unido. Deixe em branco para manter os padrões.",
      },
      split: {
        title: "Divisão",
        pagesPerFile: "Páginas por arquivo",
        pagesPerFileHint: "Um novo PDF será criado a cada N páginas.",
      },
      extract: {
        title: "Extração",
        preserveMetadata: "Preservar metadados originais",
        preserveMetadataHint: "Mantém título, autor e outros detalhes no PDF gerado.",
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
        hint: "Escolha a direção e depois marque as páginas que deseja girar.",
        rotateRight90: "Girar 90 graus para a direita",
        rotate180: "Girar 180 graus",
        rotateLeft90: "Girar 90 graus para a esquerda",
      },
      reorder: {
        title: "Reordenar",
        hint: "Arraste as miniaturas para alterar a ordem.",
      },
      pdfToImages: {
        title: "Exportação de imagens",
        formatLabel: "Formato da imagem",
        formatHint: "Escolha PNG para qualidade sem perdas ou JPEG para arquivos menores.",
        pngLabel: "PNG (sem perdas)",
        jpegLabel: "JPEG (arquivo menor)",
        qualityLabel: "Qualidade JPEG",
        qualityHint: "Qualidade maior preserva mais detalhes, mas gera imagens maiores.",
        dpiLabel: "DPI de renderização",
        dpiHint: "DPI mais altos aumentam a nitidez e o tamanho final. 144 DPI é ideal para telas e slides.",
        dpiPresets: {
          screen: "72 DPI · Tela",
          balanced: "144 DPI · Equilibrado",
          print: "300 DPI · Impressão",
        },
        zipLabel: "Agrupar em um ZIP",
        zipHint: "Faça um único download em vez de baixar uma imagem por página.",
        baseNameLabel: "Nome base do arquivo",
        baseNamePlaceholder: "ihatelovepdf_paginas",
        baseNameHint: "Usamos esse texto como prefixo dos arquivos exportados. Deixe vazio para usar o nome do PDF.",
      },
      imagesToPdf: {
        title: "Layout",
        layoutTitle: "Configuração da página",
        fitLabel: "Ajuste da imagem",
        fitOptions: {
          contain: "Conter (mostrar imagem inteira)",
          cover: "Cobrir (preencher página)",
        },
        sizeLabel: "Tamanho da página",
        sizeOptions: {
          auto: "Automático (acompanha a imagem)",
          a4: "A4",
          letter: "Carta",
        },
        orientationLabel: "Orientação",
        orientationOptions: {
          auto: "Automático",
          portrait: "Retrato",
          landscape: "Paisagem",
        },
        marginLabel: "Margens (pts)",
        marginHint: "Adiciona espaço em branco ao redor da imagem. 72 pts ≈ 1 polegada.",
        backgroundLabel: "Cor de fundo",
        backgroundHint: "Aplicada atrás das imagens e nas áreas que permanecerem em branco.",
      },
    },
    cookieBanner: {
      message: "Usamos cookies para analisar o tráfego e melhorar sua experiência. Não compartilhamos seus dados pessoais.",
      accept: "Aceitar",
      decline: "Recusar",
    },
  },
  pages: {
    home: {
      hero: {
        title: "ihatelovepdf: comprimir, juntar e converter PDF online grátis",
        subtitle:
          "Comprimir PDF, juntar PDF, dividir documentos, extrair páginas e converter PDF em imagens ou imagens em PDF direto no navegador. Sem uploads, 100% privado e gratuito.",
        badges: [
          "Comprimir PDF rápido",
          "Juntar PDF sem limites",
          "Processamento local",
          "Apoie o ihatelovepdf",
        ],
        imageAlt: "Ilustração de documento PDF",
        ctaLinks: [
          {
            label: "PDF para imagens",
            href: operationRoutes.pdfToImages,
            description: "Exporte páginas como PNG ou JPEG",
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
            title: "Privacidade por padrão",
            description:
              "Seus PDFs nunca saem do dispositivo. Tudo acontece no navegador.",
            icon: "ðŸ”’",
          },
          {
            title: "Rápido e eficiente",
            description:
              "Nosso motor local entrega velocidade sem uploads para a nuvem.",
            icon: "⚡",
          },
          {
            title: "Funciona em qualquer tela",
            description:
              "Desktop, tablet ou celular — basta um navegador moderno.",
            icon: "ðŸ“±",
          },
        ],
      },
      callout: {
        title: "Ajude a manter o ihatelovepdf gratuito",
        description:
          "Cada doação paga a hospedagem, o tempo de desenvolvimento e garante uma experiência 100% privada sem anúncios ou rastreadores.",
        ctaLabel: "Apoiar o projeto",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "Veja como usamos as doações",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Perguntas Frequentes",
      intro: "Respostas para as dúvidas mais comuns sobre o ihatelovepdf",
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
          "O ihatelovepdf é um projetinho feito com carinho. Seu apoio paga os servidores e nos dá tempo para continuar melhorando.",
        highlight: "Uma ferramenta pequena que respeita a sua privacidade.",
      },
      reasons: {
        title: "Por que doar?",
        cards: [
          {
            title: "Continuar gratuito",
            description:
              "As doações nos permitem manter o ihatelovepdf 100% gratuito, sem planos premium nem recursos bloqueados.",
            icon: "ðŸ’š",
          },
          {
            title: "Melhorias constantes",
            description:
              "Seu apoio financia correções, novas ferramentas e o capricho que deixa tudo rápido.",
            icon: "✨",
          },
          {
            title: "Privacidade sempre",
            description:
              "Processamos tudo localmente para que seus PDFs nunca saiam do dispositivo. As doações nos ajudam a manter essa arquitetura.",
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
            title: "Um café",
            amount: "€3",
            description: "Paga a hospedagem por algumas semanas.",
            ctaLabel: "Doar €3",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Apoio mensal",
            amount: "€10/mês",
            description: "Garante horas semanais para evoluir o ihatelovepdf.",
            ctaLabel: "Doar €10/mês",
            ctaHref: "#stripe-checkout-monthly",
            badge: "ðŸ’™ Obrigado",
          },
          {
            id: "custom",
            title: "Outro valor",
            amount: "Qualquer quantia",
            description: "Cada euro conta. Escolha o valor que fizer sentido para você.",
            ctaLabel: "Escolher valor",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Pagamentos seguros com Stripe. Você pode cancelar as doações recorrentes quando quiser.",
      },
      transparency: {
        title: "Como usamos o dinheiro",
        items: [
          "Hospedagem e CDN para manter o site rápido em qualquer lugar",
          "Tempo de desenvolvimento para correções e novos recursos",
          "Ajustes de design e experiência para deixar tudo fácil",
          "Traduções e guias para todos os idiomas suportados",
        ],
      },
      faq: {
        title: "Perguntas",
        entries: [
          {
            question: "E se eu não puder doar?",
            answer:
              "Tudo bem. O ihatelovepdf continuará gratuito. Compartilhar a ferramenta ou contar como ela ajudou já nos incentiva bastante.",
          },
          {
            question: "Recebo um comprovante?",
            answer:
              "Sim. A Stripe envia automaticamente um recibo por e-mail com os detalhes do pagamento.",
          },
          {
            question: "Como cancelo uma doação mensal?",
            answer:
              "Basta usar o portal da Stripe ou nos mandar um e-mail que cancelamos por aqui, sem burocracia.",
          },
        ],
      },
      closing: {
        title: "Obrigado por estar aqui",
        description:
          "Cada pessoa que apoia o ihatelovepdf ajuda a manter uma ferramenta útil, privada e acessível para todo mundo.",
        ctaLabel: "Falar com o time",
        ctaHref: "mailto:info@ihatelovepdf.com?subject=Oi%20time%20do%20ihatelovepdf",
      },
      legalNotice: {
        title: "Aviso legal e transparência",
        points: [
          "ihatelovepdf é um projeto pessoal independente mantido por uma pequena equipe voluntária.",
          "As contribuições são voluntárias e ajudam a pagar hospedagem, ferramentas e tempo de desenvolvimento.",
          "Os pagamentos não são doações filantrópicas nem geram benefícios fiscais; a Stripe enviará um recibo automático.",
          "O serviço é fornecido no estado em que se encontra, sem garantias. Dúvidas? Escreva para info@ihatelovepdf.com.",
        ],
      },
    },
  },
  faqs: faqsPt,
  operations: operationsPt,
};
