import { localeLabels } from "../../config";
import { getRoutePath } from "../../routing";
import { operationsRu } from "./operations";
import { faqsRu } from "./faqs";
import type { Dictionary } from "../dictionary-types";
import { getOperationsRoutes, getOperationsFooterLabels, getOperationsModeLabels, getOperationsDownloadNames } from "../../operations-catalog";

const locale = "ru" as const;
const { label, nativeName, htmlLang, hrefLang } = localeLabels[locale];
const siteUrl = "https://ihatelovepdf.com";
const homePath = getRoutePath(locale, "home");

const operationsRoutes = getOperationsRoutes(locale);

export const ruDictionary: Dictionary = {
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
      title: "ihatelovepdf – Сжать, объединить и конвертировать PDF бесплатно",
      description:
        "ihatelovepdf — набор инструментов для работы с PDF с упором на конфиденциальность. Объединяйте, сжимайте, делите, извлекайте, поворачивайте и конвертируйте PDF прямо в браузере. Вся обработка остаётся на вашем устройстве.",
      keywords: [
        "сжать pdf",
        "объединить pdf",
        "разделить pdf",
        "извлечь страницы pdf",
        "повернуть страницы pdf",
        "переупорядочить pdf",
        "pdf в изображения",
        "изображения в pdf",
        "конвертировать pdf",
        "конвертировать pdf онлайн",
        "pdf в png",
        "jpg в pdf",
        "редактировать pdf офлайн",
        "набор инструментов pdf",
        "конфиденциальность pdf",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "ihatelovepdf – Сжать, Объединить, Разделить, PDF в Изображение",
        description:
          "Объединяйте, сжимайте, делите, извлекайте, переупорядочивайте и конвертируйте PDF без загрузки файлов на сервер. Бесплатно, конфиденциально, с локальной обработкой.",
        url: `${siteUrl}${homePath}`,
        locale: "ru_RU",
        type: "website",
        imageUrl: "https://ihatelovepdf.com/og-images/og-image-ru.png",
        imageAlt: "ihatelovepdf - Конфиденциальная и бесплатная обработка PDF",
      },
    },
    faq: {
      title: "FAQ | ihatelovepdf – Бесплатный набор инструментов для PDF",
      description:
        "Ответы на часто задаваемые вопросы о ihatelovepdf. Узнайте, как объединять, сжимать, делить, извлекать и переупорядочивать PDF без загрузки файлов.",
      keywords: [
        "ihatelovepdf faq",
        "вопросы pdf",
        "помощь pdf",
        "помощь объединение pdf",
        "помощь сжатие pdf",
        "помощь разделение pdf",
        "поворот страниц pdf",
        "переупорядочивание pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "Поддержать ihatelovepdf | Сохраните инструменты бесплатными и конфиденциальными",
      description:
        "Ваша поддержка позволяет ihatelovepdf оставаться небольшим, независимым проектом с упором на конфиденциальность. Помогите покрыть расходы на хостинг и развитие.",
      keywords: [
        "поддержать ihatelovepdf",
        "помочь pdf инструменту",
        "поддержка конфиденциальных проектов",
        "донат ihatelovepdf stripe",
        "сохранить ihatelovepdf бесплатным",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    operations: operationsRu,
  },
  brand: {
    name: "ihatelovepdf",
    tagline: "Локальная обработка • 100% конфиденциально",
  },
  components: {
    nav: {
      home: "Главная",
      faq: "Вопросы и ответы",
      support: "Поддержать",
      photo: "FotoLince",
      languageLabel: "Язык",
      menuLabel: "Открыть меню навигации",
    },
    footer: {
      privacy: "Локальная обработка • 100% конфиденциально • Открытые лицензии",
      rights: `© ${new Date().getFullYear()} ihatelovepdf — Инструменты для работы с PDF без компромиссов с конфиденциальностью`,
      links: {
        home: "Главная",
        faq: "Вопросы и ответы",
        support: "Поддержать",
        photo: "FotoLince",
        contact: "Контакт",
      },
      capabilitiesLabel: "Популярные действия",
      operations: getOperationsFooterLabels(locale),
      license: "Обработка PDF: PDF-lib (MIT), PDF.js (Apache 2.0) • Шрифт: Geist (MIT)",
      disclaimer:
        "Сервис предоставляется «как есть», без каких-либо гарантий. Пользователь несёт полную ответственность за использование файлов.",
    },
    notifications: {
      labels: {
        success: "Успешно",
        error: "Ошибка",
        info: "Информация",
        warning: "Предупреждение",
      },
      closeLabel: "Закрыть",
    },
    fotolinceBanner: {
      eyebrow: "Нужно оптимизировать изображения?",
      title: "Сжимайте, изменяйте размер или конвертируйте с FotoLince",
      description:
        "Наш инструментарий обрабатывает файлы JPG, PNG и WEBP локально — идеально для уменьшения размера изображений перед конвертацией в PDF.",
      ctaLabel: "Открыть FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "Логотип FotoLince",
    },
    feedback: {
      question: "Было полезно?",
      thanks: "Спасибо за отзыв!",
      whatWrong: "Расскажите, что пошло не так",
      emailSubject: "Отзыв для ihatelovepdf",
    },
    pdfProcessor: {
      title: "Выберите операцию",
      modes: getOperationsModeLabels(locale),
      upload: {
        title: "Выберите файлы",
        clearAll: "Очистить всё",
        listHeadings: {
          merge: "Файлы для объединения (перетащите для изменения порядка):",
          extract: "Выберите файл для работы со страницами:",
          crop: "Выберите файл для работы со страницами:",
          rotate: "Выберите файл для работы со страницами:",
          reorder: "Выберите файл для работы со страницами:",
          pdfToImages: "PDF для конвертации (обрабатываются по очереди):",
          imagesToPdf: "Изображения для объединения (перетащите для выбора порядка):",
          default: "Выбранные файлы (перетащите или удалите):",
        },
        hints: {
          compress: "Каждый файл сжимается отдельно с оптимальным соотношением качества и размера.",
          split: "Каждый PDF будет разделён согласно параметрам, заданным на следующем шаге.",
          crop: "Выберите страницы для обрезки, затем задайте количество пунктов для каждого края.",
          pdfToImages: "Обрабатываем по одному PDF. Настройте формат и DPI перед экспортом.",
          imagesToPdf: "Добавьте изображения JPG, PNG, WEBP или TIFF. Настройте размер, поля и цвет на панели параметров.",
        },
      },
      downloadNames: getOperationsDownloadNames(locale),
      processButton: {
        idleSingle: "Обработать 1 файл",
        idleMultiple: (count: number) => `Обработать ${count} файла`,
        processing: "Обработка...",
        extract: (count: number) => `Извлечь ${count} страниц${count === 1 ? "у" : count < 5 ? "ы" : ""}`,
        crop: (count: number) =>
          count > 0 ? `Обрезать ${count} страниц${count === 1 ? "у" : count < 5 ? "ы" : ""}` : "Обрезать PDF",
        rotate: (count: number) =>
          count > 0 ? `Повернуть ${count} страниц${count === 1 ? "у" : count < 5 ? "ы" : ""}` : "Повернуть PDF",
        reorder: "Сохранить порядок",
        pdfToImages: {
          single: "Экспортировать изображения",
          multiple: (count: number) => `Экспортировать ${count} PDF`,
        },
        imagesToPdf: {
          single: "Создать PDF",
          multiple: (count: number) => `Создать PDF из ${count} изображений`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Обработка (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Сжато. Уменьшение: ${reduction}% (${original} → ${next}) за ${seconds}с`,
        merged: "Объединение завершено",
        split: (count: number) =>
          count > 1
            ? `Создано ${count} файла. Скачивается первый...`
            : "Разделение завершено",
        extracted: (count: number) => `Извлечено ${count} страниц${count === 1 ? "а" : count < 5 ? "ы" : ""}`,
        cropped: (count: number) => `Обрезано ${count} страниц${count === 1 ? "а" : count < 5 ? "ы" : ""}`,
        rotated: (count: number) => `Повёрнуто ${count} страниц${count === 1 ? "а" : count < 5 ? "ы" : ""}`,
        reordered: "Переупорядочивание завершено",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `Экспортировано ${count} изображений ${label} в ZIP-архив`
            : `Скачано ${count} изображений ${label}`;
        },
        imagesToPdf: (count: number) =>
          `PDF создан из ${count} изображений${count === 1 ? "а" : ""}`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "Результатов нет",
        mergeRequiresTwo: "Выберите не менее двух файлов",
        noPagesSelected: "Выберите хотя бы одну страницу",
        invalidFile: "Выберите допустимый файл",
        reorderEmpty: "Новый порядок не обнаружен",
        unknown: "Неизвестная ошибка",
        modeNotSupported: "Режим не поддерживается",
      },
      labels: {
        pagesToExtract: "Выберите страницы для извлечения:",
        pagesToCrop: "Выберите страницы для обрезки:",
        pagesToRotate: "Выберите страницы для поворота:",
        reorderPages: "Перетащите страницы для изменения порядка:",
      },
      compressionPreview: {
        title: "Предпросмотр сжатия",
        description:
          "Настройте параметры, чтобы оценить размер результата перед началом сжатия.",
        running: "Рассчитывается предпросмотр…",
        readyLabel: "Расчётный размер",
        ratio: (percent: string) => `на ${percent}% меньше`,
        saved: (size: string) => `экономия ${size}`,
        time: (seconds: string) => `≈ ${seconds}с`,
        original: "Исходный",
        result: "Расчётный",
        notice:
          "Предпросмотр выполняется локально. Ничего не загружается на наши серверы.",
        error: "Не удалось создать предпросмотр.",
        retry: "Повторить предпросмотр",
        universalBadge: "Универсальная оптимизация",
      },
      compressionSummary: {
        title: "Последнее сжатие",
        ratio: (percent: string) => `на ${percent}% меньше`,
        saved: (size: string) => `сэкономлено ${size}`,
        original: "Исходный",
        result: "Сжатый",
        duration: (seconds: string) => `Завершено за ${seconds}с`,
        download: "Скачать снова",
        clear: "Очистить итоги",
      },
      donationReminder: {
        message: "ihatelovepdf помог вам сэкономить время? Ваша поддержка сохраняет его бесплатным.",
        actionLabel: "Поддержать ihatelovepdf",
        withSavings: (percent: string, saved: string) =>
          `Сэкономили ${saved} (${percent}%)? Помогите сохранить ihatelovepdf без рекламы.`,
      },
      statusDialog: {
        processingTitle: "Локальная обработка",
        successTitle: "Ваши файлы готовы",
        successDescription:
          "Загрузка начнётся автоматически.",
        resultsLabel: "Последний результат",
        filesProcessedLabel: (count: number) =>
          `${count} файл${count === 1 ? "" : count < 5 ? "а" : "ов"} обработан${count === 1 ? "" : count < 5 ? "о" : "о"}`,
        downloadAgainLabel: "Скачать",
        errorTitle: "Ошибка обработки",
        errorDescription: "Не удалось выполнить операцию. Проверьте файлы.",
        retryLabel: "Повторить",
        closeLabel: "Закрыть",
        sharePrompt: {
          dialogMessage: "ihatelovepdf полностью бесплатен и уважает вашу конфиденциальность. Помогите нам сохранить его таким, порекомендовав коллеге.",
          shareText: "Только что использовал ihatelovepdf для работы с PDF. Это бесплатный, быстрый и полностью конфиденциальный инструментарий для разделения, сжатия, объединения и конвертации PDF прямо в браузере. Отлично подходит для чувствительных документов!",
          actionLabel: "Поделиться",
          copiedLabel: "Скопировано!",
        },
      },
      compressionTotal: {
        title: "Итого сэкономлено",
        savings: (size: string) => `всего ${size} сэкономлено`,
        count: (count: number) => `${count} файлов оптимизировано`,
      },
    },
    fileUploader: {
      clickToSelect: "Нажмите, чтобы выбрать",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "или перетащите изображения сюда" : "или перетащите PDF-файлы сюда",
      accepted: {
        pdf: "PDF-файлы",
        images: "Поддерживаемые форматы: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Рекомендуемый размер: < ${sizeMb}МБ`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Неподдерживаемый формат: ${fileName}. Разрешены только ${label}.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Файл слишком большой: ${fileName}. Максимальный размер — ${sizeMb}МБ.`,
      },
      dropImagesAlt: "Фоновое изображение",
    },
    fileList: {
      moveUp: "Переместить вверх",
      moveDown: "Переместить вниз",
      remove: "Удалить",
      removeAll: "Удалить все",
      imageLabel: "Изображение",
      fileLabel: "Файл",
      selected: "Выбрано",
      pdfLabel: "PDF",
      deselect: "Снять выбор",
      pagesLabel: (count: number) => `${count} страниц${count === 1 ? "а" : count < 5 ? "ы" : ""}`,
      previewLoading: "Загрузка предпросмотра…",
    },
    pageSelector: {
      loading: "Загрузка страниц...",
      error: "Не удалось загрузить информацию о PDF",
      summary: (total: number, selected: number) =>
        `Обнаружено ${total} страниц — выбрано ${selected}`,
      selectAll: "Выбрать все",
      deselectAll: "Снять все",
      pageLabel: (pageNumber: number) => `Страница ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Показано ${shown} из ${total} страниц. Введите номера дополнительных страниц.`,
      manualLabel: "Введите номера (например, 21, 25-30)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Загрузка страниц...",
      error: "Не удалось загрузить информацию о PDF",
      limitReached: (count: number) =>
        `Этот PDF содержит ${count} страниц. Из соображений производительности можно переупорядочить не более 120 страниц.`,
      limitHint:
        "Сначала разбейте PDF на меньшие части.",
      summary: (count: number) => `${count} страниц готово к переупорядочиванию`,
      reset: "Сбросить порядок",
      dragHint: "Перетащите страницы для изменения порядка",
      pageLabel: (pageNumber: number) => `Страница ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Оригинал: страница ${pageNumber}`,
      instructions:
        "Перетащите страницы в нужном порядке. Когда закончите, нажмите «Сохранить порядок».",
    },
    processingOptions: {
      compress: {
        title: "Сжатие",
        level: "Уровень",
        levels: {
          low: "Низкий",
          medium: "Средний",
          high: "Высокий",
        },
        removeMetadata: "Удалить метаданные",
        removeMetadataHint: "Удаляет скрытые данные, такие как автор и история.",
        stripAnnotations: "Удалить аннотации",
        stripAnnotationsHint: "Удаляет заметки, формы и подписи.",
        downscaleImages: "Уменьшить изображения",
        downscaleHint: "Идеально для отсканированных документов.",
        advancedTitle: "Расширенная очистка",
        advancedDescription: "Оставьте простые настройки или активируйте нужные дополнения.",
        activeLabel: "Активно:",
      },
      merge: {
        title: "Объединение",
        pageDivider: "Пустая страница между документами",
        metadataTitle: "Заголовок объединённого документа (необязательно)",
        metadataAuthor: "Автор документа (необязательно)",
        metadataHint: "Задайте пользовательские метаданные.",
      },
      split: {
        title: "Разделение",
        pagesPerFile: "Страниц на файл",
        pagesPerFileHint: "Будет создан новый PDF каждые N страниц.",
      },
      extract: {
        title: "Извлечение",
        preserveMetadata: "Сохранить метаданные",
        preserveMetadataHint: "Сохраняет заголовок, автора и другие сведения.",
      },
      crop: {
        title: "Обрезка",
        hint: "Выберите страницы для обрезки и задайте поля.",
        inputModeLabel: "Метод",
        inputModes: {
          margins: "Настройка полей",
          manual: "Ручной выбор",
        },
        marginsTitle: "Поля",
        marginLabels: {
          top: "Верхнее поле (пункты)",
          right: "Правое поле (пункты)",
          bottom: "Нижнее поле (пункты)",
          left: "Левое поле (пункты)",
        },
        marginHint: "72 пункта ≈ 1 дюйм.",
        preserveMetadata: "Сохранить метаданные",
        preserveMetadataHint: "Сохраняет заголовок, автора и другие сведения.",
        manual: {
          title: "Ручной выбор",
          hint: "Перетащите рамку на предпросмотре, чтобы задать видимую область.",
          loading: "Загрузка...",
          error: "Не удалось загрузить предпросмотр.",
          reset: "Сбросить",
          pagePreview: (pageNumber: number) => `Предпросмотр страницы ${pageNumber}`,
        },
      },
      rotate: {
        title: "Поворот",
        hint: "Выберите направление и отметьте страницы.",
        rotateRight90: "Повернуть вправо (90°)",
        rotate180: "Повернуть (180°)",
        rotateLeft90: "Повернуть влево (90°)",
      },
      reorder: {
        title: "Переупорядочивание",
        hint: "Перетащите миниатюры для изменения порядка.",
      },
      pdfToImages: {
        title: "Экспорт",
        formatLabel: "Формат",
        formatHint: "Выберите PNG для качества без потерь или JPEG для меньшего размера.",
        pngLabel: "PNG (без потерь)",
        jpegLabel: "JPEG (меньше весит)",
        qualityLabel: "Качество JPEG",
        qualityHint: "Более высокое качество сохраняет больше деталей.",
        dpiLabel: "Разрешение DPI",
        dpiHint: "Более высокий DPI улучшает чёткость, но увеличивает размер файла.",
        dpiPresets: {
          screen: "72 DPI · Экран",
          balanced: "144 DPI · Баланс",
          print: "300 DPI · Печать",
        },
        zipLabel: "Упаковать изображения в ZIP",
        zipHint: "Скачать в одном архиве.",
        baseNameLabel: "Базовое имя файла",
        baseNamePlaceholder: "ihatelovepdf_stranitsy",
        baseNameHint: "Оставьте пустым, чтобы использовать имя оригинального PDF.",
      },
      imagesToPdf: {
        title: "Макет страницы",
        layoutTitle: "Макет страницы",
        fitLabel: "Подгонка изображения",
        fitOptions: {
          contain: "Вписать (показать изображение полностью)",
          cover: "Заполнить (покрыть страницу)",
        },
        sizeLabel: "Размер страницы",
        sizeOptions: {
          auto: "Авто (по размеру изображения)",
          a4: "A4",
          letter: "Letter",
        },
        orientationLabel: "Ориентация",
        orientationOptions: {
          auto: "Авто",
          portrait: "Книжная",
          landscape: "Альбомная",
        },
        marginLabel: "Поля (пункты)",
        marginHint: "Добавить отступы. 72 пункта ≈ 1 дюйм.",
        backgroundLabel: "Цвет фона",
        backgroundHint: "Применяется под изображениями.",
      },
    },
    cookieBanner: {
      message: "Мы используем файлы cookie для анализа трафика. Ваши данные не передаются третьим лицам.",
      accept: "Принять",
      decline: "Отказаться",
    },
  },
  pages: {
    home: {
      hero: {
        title: "ihatelovepdf: Сжимайте, объединяйте и конвертируйте PDF бесплатно",
        subtitle:
          "Сжимайте, объединяйте, делите, извлекайте, поворачивайте и конвертируйте PDF прямо в браузере. Без загрузки на сервер, полностью конфиденциально.",
        badges: [
          "Сжать PDF",
          "Объединить PDF",
          "Локальная обработка",
          "Поддержать ihatelovepdf",
        ],
        imageAlt: "Иллюстрация PDF-документа",
        ctaLinks: [
          {
            label: "PDF в изображения",
            href: operationsRoutes.pdfToImages,
            description: "Экспортировать в PNG или JPEG",
          },
          {
            label: "Изображения в PDF",
            href: operationsRoutes.imagesToPdf,
            description: "Объединить JPG, PNG или WEBP",
          },
        ],
      },
      why: {
        title: "Почему стоит выбрать ihatelovepdf?",
        cards: [
          {
            title: "Конфиденциально по умолчанию",
            description:
              "Ваши PDF-файлы никогда не покидают устройство. Всё происходит в браузере.",
            icon: "🔒",
          },
          {
            title: "Быстро и эффективно",
            description:
              "Локальный движок обеспечивает максимальную скорость без зависимости от облачного хранилища.",
            icon: "⚡",
          },
          {
            title: "Работает везде",
            description:
              "На компьютере, планшете или смартфоне — достаточно современного браузера.",
            icon: "📱",
          },
        ],
      },
      callout: {
        title: "Помогите сохранить ihatelovepdf бесплатным",
        description:
          "Каждое пожертвование покрывает расходы на хостинг и позволяет нам поддерживать 100% приватную работу без рекламы и слежки.",
        ctaLabel: "Поддержать проект",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "Узнайте, как мы используем средства",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Вопросы и ответы",
      intro: "Ответы на самые частые вопросы о ihatelovepdf",
      cta: {
        title: "Попробуйте ihatelovepdf прямо сейчас",
        description:
          "Объединяйте, сжимайте, делите, извлекайте, поворачивайте и переупорядочивайте PDF в полной конфиденциальности.",
        ctaLabel: "Перейти к инструментам",
      },
    },
    support: {
      hero: {
        eyebrow: "Независимый проект",
        title: "Помогите сохранить ihatelovepdf бесплатным и конфиденциальным",
        subtitle:
          "ihatelovepdf — небольшой проект, созданный с душой. Ваша поддержка покрывает расходы на серверы.",
        highlight: "Просто инструмент, который уважает вашу конфиденциальность.",
      },
      reasons: {
        title: "Зачем поддерживать?",
        cards: [
          {
            title: "Сохранить бесплатным",
            description:
              "Пожертвования позволяют нам поддерживать ihatelovepdf 100% бесплатным для всех.",
            icon: "💚",
          },
          {
            title: "Постоянное улучшение",
            description:
              "Ваша поддержка финансирует исправление ошибок и разработку новых инструментов.",
            icon: "✨",
          },
          {
            title: "Защита конфиденциальности",
            description:
              "Мы обрабатываем всё локально. Пожертвования помогают нам продолжать в этом направлении.",
            icon: "🔒",
          },
        ],
      },
      tiers: {
        title: "Пожертвуйте столько, сколько можете",
        description: "Любая сумма помогает. Безопасная оплата через Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Купите кофе",
            amount: "3 €",
            description: "Покрывает хостинг на несколько недель.",
            ctaLabel: "Пожертвовать 3 €",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Ежемесячная поддержка",
            amount: "10 €/месяц",
            description: "Даёт нам время каждую неделю улучшать ihatelovepdf.",
            ctaLabel: "Пожертвовать 10 €/месяц",
            ctaHref: "#stripe-checkout-monthly",
            badge: "Спасибо",
          },
          {
            id: "custom",
            title: "Произвольная сумма",
            amount: "Любая сумма",
            description: "Каждый евро имеет значение. Выберите удобную для вас сумму.",
            ctaLabel: "Выбрать сумму",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Безопасные платежи через Stripe. Повторяющееся пожертвование можно отменить в любой момент.",
      },
      transparency: {
        title: "На что идут средства",
        items: [
          "Хостинг и сеть доставки контента (CDN) для быстрой работы по всему миру",
          "Время разработчиков на исправление ошибок и добавление новых функций",
          "Улучшения дизайна и UX для максимально удобного использования",
          "Переводы и документация для каждого поддерживаемого языка",
        ],
      },
      faq: {
        title: "Вопросы",
        entries: [
          {
            question: "Что будет, если я не смогу пожертвовать?",
            answer:
              "Всё в порядке. ihatelovepdf останется бесплатным. Просто рассказать о нём другим — уже огромная помощь.",
          },
          {
            question: "Получу ли я квитанцию?",
            answer:
              "Да. Stripe автоматически отправит вам квитанцию по электронной почте со всеми деталями платежа.",
          },
          {
            question: "Как отменить повторяющееся пожертвование?",
            answer:
              "Это можно сделать через ваш портал Stripe или написав нам — мы отменим его сами.",
          },
        ],
      },
      closing: {
        title: "Спасибо, что вы с нами",
        description:
          "Каждый, кто поддерживает ihatelovepdf, помогает сохранить жизнь полезному набору PDF-инструментов.",
        ctaLabel: "Написать команде",
        ctaHref: "mailto:info@ihatelovepdf.com?subject=Привет%20команда%20ihatelovepdf",
      },
      legalNotice: {
        title: "Правовая информация и прозрачность",
        points: [
          "ihatelovepdf — независимый личный проект, управляемый небольшой командой добровольцев.",
          "Взносы добровольны и направляются исключительно на покрытие расходов на хостинг и разработку.",
          "Платежи не являются налогово вычитаемыми пожертвованиями; Stripe автоматически выдаст квитанцию.",
          "Сервис предоставляется «как есть», без гарантий. Вопросы? info@ihatelovepdf.com.",
        ],
      },
    },
  },
  faqs: faqsRu,
  operations: operationsRu,
};
