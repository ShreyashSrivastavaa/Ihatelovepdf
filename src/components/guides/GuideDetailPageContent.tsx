import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Clock,
  Calendar,
  HelpCircle,
  ExternalLink,
  AlertCircle,
  BookOpen,
  User,
  Wrench,
  ChevronDown,
} from 'lucide-react';
import {
  LocalizedGuideItem,
} from '../../app/_data/localized-guides-data';
import { SITE_URL } from '../../lib/site';

interface GuideDetailPageContentProps {
  guide: LocalizedGuideItem;
}

const UI_TEXT: Record<string, Record<string, string>> = {
  en: {
    home: 'Home',
    guides: 'Guides',
    back: 'Back to All Guides',
    quickAnswer: 'Quick Answer (Featured Summary for AI & Search)',
    keyTakeaways: 'Key Takeaways',
    readyToTry: 'Ready to process this PDF in your browser?',
    noUploadsTag: '100% private in-browser tool with zero server uploads and no watermarks.',
    launchTool: 'Launch Tool',
    stepsHeading: 'Step-by-Step Instructions',
    problemsHeading: 'Common Problems & Solutions',
    faqHeading: 'Frequently Asked Questions (FAQ)',
    privacyHeading: 'Zero-Upload Privacy Architecture',
    relatedTools: 'Related PDF Tools',
    authorBy: 'Written by',
    verified: 'Verified In-Browser Engine (No Uploads)',
  },
  es: {
    home: 'Inicio',
    guides: 'Guías',
    back: 'Volver a todas las guías',
    quickAnswer: 'Respuesta Rápida (Resumen directo para motores de búsqueda e IA)',
    keyTakeaways: 'Puntos Clave a Recordar',
    readyToTry: '¿Listo para procesar este PDF en tu navegador?',
    noUploadsTag: 'Herramienta 100% privada en tu navegador: sin subir archivos y sin marcas de agua.',
    launchTool: 'Abrir Herramienta',
    stepsHeading: 'Instrucciones Paso a Paso',
    problemsHeading: 'Problemas Frecuentes y Soluciones',
    faqHeading: 'Preguntas Frecuentes (FAQ)',
    privacyHeading: 'Arquitectura de Privacidad Sin Subidas',
    relatedTools: 'Herramientas PDF Relacionadas',
    authorBy: 'Escrito por',
    verified: 'Verificado con motor en navegador (Sin subidas)',
  },
  pt: {
    home: 'Início',
    guides: 'Guias',
    back: 'Voltar a todos os guias',
    quickAnswer: 'Resposta Rápida (Resumo direto para IA e Buscadores)',
    keyTakeaways: 'Principais Destaques',
    readyToTry: 'Pronto para processar este PDF no seu navegador?',
    noUploadsTag: 'Ferramenta 100% privada no navegador: sem upload para a nuvem e sem marca d\'água.',
    launchTool: 'Abrir Ferramenta',
    stepsHeading: 'Instruções Passo a Passo',
    problemsHeading: 'Problemas Comuns e Soluções',
    faqHeading: 'Perguntas Frequentes (FAQ)',
    privacyHeading: 'Arquitetura de Privacidade Sem Upload',
    relatedTools: 'Ferramentas PDF Relacionadas',
    authorBy: 'Escrito por',
    verified: 'Verificado em motor local no navegador (Zero Uploads)',
  },
  de: {
    home: 'Startseite',
    guides: 'Anleitungen',
    back: 'Zurück zu allen Anleitungen',
    quickAnswer: 'Schnelle Antwort (Direkte Zusammenfassung für Suchmaschinen & KI)',
    keyTakeaways: 'Wichtigste Erkenntnisse',
    readyToTry: 'Bereit, dieses PDF im Browser zu verarbeiten?',
    noUploadsTag: '100% privates Browser-Tool ohne Server-Upload und ohne Wasserzeichen.',
    launchTool: 'Tool starten',
    stepsHeading: 'Schritt-für-Schritt-Anleitung',
    problemsHeading: 'Häufige Probleme & Lösungen',
    faqHeading: 'Häufig gestellte Fragen (FAQ)',
    privacyHeading: 'Datenschutz-Architektur ohne Server-Upload',
    relatedTools: 'Verwandte PDF-Tools',
    authorBy: 'Verfasst von',
    verified: 'Geprüft mit lokaler Browser-Engine (Keine Server-Uploads)',
  },
  fr: {
    home: 'Accueil',
    guides: 'Guides',
    back: 'Retour à tous les guides',
    quickAnswer: 'Réponse Rapide (Résumé direct pour moteurs de recherche et IA)',
    keyTakeaways: 'Points Clés à Retenir',
    readyToTry: 'Prêt à traiter ce PDF dans votre navigateur ?',
    noUploadsTag: 'Outil 100% privé dans votre navigateur : zéro téléversement et aucun filigrane.',
    launchTool: 'Lancer l\'Outil',
    stepsHeading: 'Instructions Étape par Étape',
    problemsHeading: 'Problèmes Courants et Solutions',
    faqHeading: 'Foire Aux Questions (FAQ)',
    privacyHeading: 'Architecture de Confidentialité Sans Téléversement',
    relatedTools: 'Outils PDF Associés',
    authorBy: 'Rédigé par',
    verified: 'Vérifié sur moteur client local (Aucun envoi serveur)',
  },
  it: {
    home: 'Home',
    guides: 'Guide',
    back: 'Torna a tutte le guide',
    quickAnswer: 'Risposta Rapida (Riepilogo diretto per Motori di Ricerca e IA)',
    keyTakeaways: 'Punti Chiave da Ricordare',
    readyToTry: 'Pronto a elaborare questo PDF nel tuo browser?',
    noUploadsTag: 'Strumento 100% privato nel browser con zero caricamento su server e senza watermark.',
    launchTool: 'Avvia Strumento',
    stepsHeading: 'Istruzioni Passo dopo Passo',
    problemsHeading: 'Problemi Comuni e Soluzioni',
    faqHeading: 'Domande Frequenti (FAQ)',
    privacyHeading: 'Architettura di Privacy a Zero Upload',
    relatedTools: 'Strumenti PDF Correlati',
    authorBy: 'Scritto da',
    verified: 'Verificato con motore locale nel browser (Nessun upload)',
  },
  ro: {
    home: 'Acasă',
    guides: 'Ghiduri',
    back: 'Înapoi la toate ghidurile',
    quickAnswer: 'Răspuns Rapid (Rezumat direct pentru Motoare de Căutare și IA)',
    keyTakeaways: 'Concluzii Cheie de Reținut',
    readyToTry: 'Ești gata să procesezi acest PDF în browser?',
    noUploadsTag: 'Instrument 100% privat în browser fără încărcare pe server și fără filigran.',
    launchTool: 'Deschide Instrumentul',
    stepsHeading: 'Instrucțiuni Pas cu Pas',
    problemsHeading: 'Probleme Comune și Soluții',
    faqHeading: 'Întrebări Frecvente (FAQ)',
    privacyHeading: 'Arhitectură de Confidențialitate Fără Încărcare',
    relatedTools: 'Instrumente PDF Similare',
    authorBy: 'Scris de',
    verified: 'Verificat pe motor local în browser (Zero încărcări)',
  },
  ru: {
    home: 'Главная',
    guides: 'Руководства',
    back: 'Назад ко всем руководствам',
    quickAnswer: 'Краткий ответ (Прямая сводка для поиска и ИИ)',
    keyTakeaways: 'Ключевые выводы',
    readyToTry: 'Готовы обработать этот PDF в браузере?',
    noUploadsTag: '100% приватный инструмент в браузере: без загрузки на сервер и без водяных знаков.',
    launchTool: 'Запустить инструмент',
    stepsHeading: 'Пошаговая инструкция',
    problemsHeading: 'Частые проблемы и решения',
    faqHeading: 'Часто задаваемые вопросы (FAQ)',
    privacyHeading: 'Архитектура приватности без отправки на сервер',
    relatedTools: 'Похожие инструменты PDF',
    authorBy: 'Автор:',
    verified: 'Проверено на локальном движке в браузере (Без загрузки)',
  },
  hu: {
    home: 'Kezdőlap',
    guides: 'Útmutatók',
    back: 'Vissza az összes útmutatóhoz',
    quickAnswer: 'Gyors Válasz (Közvetlen összefoglaló keresőmotoroknak és MI-nek)',
    keyTakeaways: 'Főbb Tudnivalók',
    readyToTry: 'Készen áll a PDF feldolgozására a böngészőjében?',
    noUploadsTag: '100% privát böngészős eszköz feltöltés és vízjelek nélkül.',
    launchTool: 'Eszköz indítása',
    stepsHeading: 'Lépésről lépésre útmutató',
    problemsHeading: 'Gyakori problémák és megoldások',
    faqHeading: 'Gyakran Ismételt Kérdések (GYIK)',
    privacyHeading: 'Feltöltésmentes adatvédelmi architektúra',
    relatedTools: 'Kapcsolódó PDF eszközök',
    authorBy: 'Szerző:',
    verified: 'Helyi böngészős motorral ellenőrizve (Zero Upload)',
  },
};

export function GuideDetailPageContent({ guide }: GuideDetailPageContentProps) {
  const loc = guide.locale || 'en';
  const t = UI_TEXT[loc] || UI_TEXT.en;

  const basePath = loc === 'en' ? '' : `/${loc}`;
  const homePath = loc === 'en' ? '/' : `/${loc}`;
  const guidesIndexPath = `${basePath}/guides`;
  const canonicalUrl = `${SITE_URL}${basePath}/guides/${guide.slug}`;

  // 1. Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.home,
        item: `${SITE_URL}${homePath}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t.guides,
        item: `${SITE_URL}${guidesIndexPath}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.h1,
        item: canonicalUrl,
      },
    ],
  };

  // 2. HowTo Schema
  const howToSchema = guide.steps && guide.steps.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: guide.h1,
        description: guide.metaDescription,
        step: guide.steps.map((step, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: step.title,
          text: step.text,
        })),
      }
    : null;

  // 3. FAQPage Schema
  const faqSchema = guide.faqs && guide.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  // 4. Article / BlogPosting Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: guide.h1,
    description: guide.metaDescription,
    image: `${SITE_URL}/og-images/og-image-${loc}.png`,
    datePublished: `${guide.datePublished}T08:00:00+00:00`,
    dateModified: `${guide.dateModified}T12:00:00+00:00`,
    author: {
      '@type': 'Person',
      name: guide.author,
      url: guide.authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ihatelovepdf',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
      },
    },
  };

  return (
    <article className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link href={homePath} className="hover:text-[var(--brand)] transition-colors">
            {t.home}
          </Link>
          <span>/</span>
          <Link href={guidesIndexPath} className="hover:text-[var(--brand)] transition-colors">
            {t.guides}
          </Link>
          <span>/</span>
          <span className="truncate max-w-[200px] sm:max-w-xs text-[var(--text-main)] font-medium">
            {guide.title.split('|')[0].trim()}
          </span>
        </nav>

        {/* Back Link */}
        <div>
          <Link
            href={guidesIndexPath}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{t.back}</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-[var(--text-muted)]">
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-semibold border border-[var(--brand)]/20">
              {guide.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {guide.readTime}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {guide.dateModified}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-[var(--text-muted)]">
              <User className="h-3.5 w-3.5 text-[var(--brand)]" />
              {t.authorBy}{' '}
              <a
                href={guide.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[var(--brand)] font-medium"
              >
                {guide.author}
              </a>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-[var(--text-main)]">
            {guide.h1}
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            {guide.metaDescription}
          </p>

          <div className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span>{t.verified}</span>
          </div>
        </header>

        {/* Quick Direct Answer Box (40-60 words above the fold for AI snippets) */}
        <section
          aria-labelledby="quick-answer-title"
          className="p-5 sm:p-6 rounded-xl border-2 border-[var(--brand)]/30 bg-[var(--brand-soft)]/20 shadow-sm space-y-2.5"
        >
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-[var(--brand)] text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <h2 id="quick-answer-title" className="text-sm font-bold text-[var(--text-main)] tracking-wide">
              {t.quickAnswer}
            </h2>
          </div>
          <p className="text-sm text-[var(--text-main)] font-medium leading-relaxed">
            {guide.directAnswer}
          </p>
        </section>

        {/* Key Takeaways Box */}
        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3">
            <h2 className="text-xs sm:text-sm font-bold text-[var(--text-main)] flex items-center gap-2 uppercase tracking-wider">
              <BookOpen className="h-4 w-4 text-[var(--brand)]" />
              {t.keyTakeaways}
            </h2>
            <ul className="space-y-2">
              {guide.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--brand)] shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-[var(--text-main)]">{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Interactive Tool Launch Banner */}
        {guide.toolPath && (
          <section className="p-4 sm:p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-sm font-bold text-[var(--text-main)] flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                {t.readyToTry}
              </span>
              <p className="text-xs text-[var(--text-muted)]">
                {t.noUploadsTag}
              </p>
            </div>
            <Link
              href={guide.toolPath}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[var(--brand)] text-white text-xs font-semibold hover:opacity-95 transition-opacity shrink-0 shadow-sm"
            >
              <span>{t.launchTool} ({guide.toolName})</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </section>
        )}

        {/* Step-by-Step Walkthrough with HowTo Schema Support */}
        {guide.steps && guide.steps.length > 0 && (
          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-5">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-[var(--text-main)]">
              <HelpCircle className="h-5 w-5 text-[var(--brand)]" />
              {t.stepsHeading}
            </h2>
            <ol className="space-y-4">
              {guide.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-white text-xs font-bold shadow-sm">
                    {idx + 1}
                  </span>
                  <div className="space-y-0.5 pt-0.5">
                    <h3 className="font-bold text-[var(--text-main)] text-sm">
                      {step.title}
                    </h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Zero-Upload Privacy Architecture Note */}
        <section className="p-5 rounded-xl border border-[var(--border)] bg-[var(--subtle)] space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">
              {t.privacyHeading}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {guide.privacyNote}
          </p>
        </section>

        {/* Common Problems & Solutions */}
        {guide.commonProblems && guide.commonProblems.length > 0 && (
          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-[var(--text-main)]">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              {t.problemsHeading}
            </h2>
            <div className="space-y-3">
              {guide.commonProblems.map((prob, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[var(--subtle)] border border-[var(--border)] space-y-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)]">
                    Q: {prob.problem}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    <strong className="text-emerald-700 dark:text-emerald-400">Solution: </strong>
                    {prob.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Visible Semantic <details> FAQ Section */}
        {guide.faqs && guide.faqs.length > 0 && (
          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-[var(--text-main)]">
              <HelpCircle className="h-5 w-5 text-[var(--brand)]" />
              {t.faqHeading}
            </h2>
            <div className="space-y-3">
              {guide.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-lg border border-[var(--border)] bg-[var(--bg-main)] p-4 open:bg-[var(--subtle)] transition-colors"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-xs sm:text-sm font-semibold text-[var(--text-main)] focus:outline-none">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2" />
                  </summary>
                  <p className="mt-2.5 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed pt-2 border-t border-[var(--border)]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Tools Cards Grid */}
        {guide.relatedTools && guide.relatedTools.length > 0 && (
          <section className="space-y-3.5 pt-4">
            <h2 className="text-sm font-bold text-[var(--text-main)] uppercase tracking-wider flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[var(--brand)]" />
              {t.relatedTools}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {guide.relatedTools.map((tool, idx) => (
                <Link
                  key={idx}
                  href={tool.path || `/${tool.slug}`}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--brand)] transition-colors group space-y-1 block"
                >
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--brand)] transition-colors flex items-center justify-between">
                    <span>{tool.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Author Bio & E-E-A-T Attribution Card */}
        <section className="p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[var(--brand-soft)] border border-[var(--brand)]/30 flex items-center justify-center text-[var(--brand)] font-bold text-sm shrink-0">
              SS
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[var(--text-main)] flex items-center gap-1.5">
                <a
                  href="https://github.com/shreyashsng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--brand)] transition-colors"
                >
                  Shreyash Srivastava
                </a>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                  Lead Software Engineer
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
                Software engineer advocating for in-browser client-side WebAssembly execution, zero server uploads, and independent document privacy.
              </p>
            </div>
          </div>
          <div className="text-[11px] text-[var(--text-muted)] shrink-0 self-end sm:self-center font-medium bg-[var(--bg-subtle)] px-2.5 py-1 rounded-md border border-[var(--border)]">
            Last updated: November 2026
          </div>
        </section>

        {/* Structured Data JSON-LD Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {howToSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
          />
        )}
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </div>
    </article>
  );
}

