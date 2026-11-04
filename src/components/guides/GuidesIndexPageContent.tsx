import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, BookOpen, ShieldCheck } from 'lucide-react';
import {
  LOCALIZED_GUIDES_DATA,
} from '../../app/_data/localized-guides-data';
import { SITE_URL } from '../../lib/site';

interface GuidesIndexPageContentProps {
  locale: string;
}

const INDEX_I18N: Record<string, {
  badge: string;
  h1: string;
  sub: string;
  quickSteps: string;
  readGuide: string;
  privacyBadge: string;
  home: string;
  guides: string;
}> = {
  en: {
    badge: 'Step-by-Step PDF Tutorials',
    h1: 'PDF How-To Guides & Walkthroughs',
    sub: 'Practical, step-by-step tutorials on how to merge, compress, split, edit, and convert PDF files directly in your browser with zero server uploads.',
    quickSteps: 'Quick Steps',
    readGuide: 'Read Full Guide',
    privacyBadge: '100% In-Browser · Zero Server Uploads · No Watermarks',
    home: 'Home',
    guides: 'Guides',
  },
  es: {
    badge: 'Tutoriales Prácticos de PDF Paso a Paso',
    h1: 'Guías y Tutoriales Paso a Paso de PDF',
    sub: 'Aprende a unir, comprimir, dividir, editar y convertir archivos PDF directamente en tu navegador sin subir documentos a ningún servidor.',
    quickSteps: 'Pasos Rápidos',
    readGuide: 'Leer Guía Completa',
    privacyBadge: '100% en tu Navegador · Sin Subir Archivos · Sin Marcas de Agua',
    home: 'Inicio',
    guides: 'Guías',
  },
  pt: {
    badge: 'Tutoriais Práticos de PDF Passo a Passo',
    h1: 'Guias e Tutoriais Completos de PDF',
    sub: 'Tutoriais práticos sobre como juntar, comprimir, dividir, editar e converter arquivos PDF diretamente no seu navegador com total privacidade.',
    quickSteps: 'Passos Rápidos',
    readGuide: 'Ler Guia Completo',
    privacyBadge: '100% no Navegador · Sem Upload para Nuvem · Sem Marcas d\'Água',
    home: 'Início',
    guides: 'Guias',
  },
  de: {
    badge: 'Schritt-für-Schritt PDF-Anleitungen',
    h1: 'PDF-Anleitungen & Schritt-für-Schritt-Tutorials',
    sub: 'Praktische Anleitungen zum Zusammenfügen, Komprimieren, Teilen, Bearbeiten und Konvertieren von PDFs direkt im Browser ohne Server-Upload.',
    quickSteps: 'Kurzübersicht der Schritte',
    readGuide: 'Vollständige Anleitung lesen',
    privacyBadge: '100% im Browser · Kein Server-Upload · Keine Wasserzeichen',
    home: 'Startseite',
    guides: 'Anleitungen',
  },
  fr: {
    badge: 'Tutoriels PDF Pas à Pas',
    h1: 'Guides Pratiques et Tutoriels PDF',
    sub: 'Tutoriels détaillés pour fusionner, compresser, diviser, modifier et convertir vos fichiers PDF directement dans votre navigateur sans téléversement.',
    quickSteps: 'Étapes Rapides',
    readGuide: 'Lire le Guide Complet',
    privacyBadge: '100% dans votre Navigateur · Zéro Téléversement · Sans Filigrane',
    home: 'Accueil',
    guides: 'Guides',
  },
  it: {
    badge: 'Tutorial PDF Passo dopo Passo',
    h1: 'Guide Pratiche e Tutorial per PDF',
    sub: 'Guide dettagliate su come unire, comprimere, dividere, modificare e convertire file PDF direttamente nel tuo browser senza inviare dati a server esterni.',
    quickSteps: 'Passaggi Rapidi',
    readGuide: 'Leggi la Guida Completa',
    privacyBadge: '100% nel Browser · Zero Upload · Senza Watermark',
    home: 'Home',
    guides: 'Guide',
  },
  ro: {
    badge: 'Tutoriale PDF Pas cu Pas',
    h1: 'Ghiduri Practice și Tutoriale PDF',
    sub: 'Tutoriale complete despre cum să unești, comprimi, împarți, editezi și convertești fișiere PDF direct în browser fără încărcare pe server.',
    quickSteps: 'Pași Rapizi',
    readGuide: 'Citește Ghidul Complet',
    privacyBadge: '100% în Browser · Zero Încărcare pe Server · Fără Filigran',
    home: 'Acasă',
    guides: 'Ghiduri',
  },
  ru: {
    badge: 'Пошаговые инструкции по работе с PDF',
    h1: 'Пошаговые руководства и инструкции по PDF',
    sub: 'Практические уроки о том, как объединять, сжимать, разделять, редактировать и конвертировать PDF прямо в браузере без отправки файлов на сервер.',
    quickSteps: 'Быстрые шаги',
    readGuide: 'Читать руководство',
    privacyBadge: '100% в браузере · Без отправки на сервер · Без водяных знаков',
    home: 'Главная',
    guides: 'Руководства',
  },
  hu: {
    badge: 'Lépésről lépésre PDF útmutatók',
    h1: 'Gyakorlati PDF útmutatók és leírások',
    sub: 'Gyakorlati útmutatók PDF fájlok egyesítéséhez, tömörítéséhez, szétbontásához, szerkesztéséhez és konvertálásához a böngészőjében, feltöltés nélkül.',
    quickSteps: 'Gyors lépések',
    readGuide: 'Teljes útmutató elolvasása',
    privacyBadge: '100% böngészőben · Feltöltésmentes · Vízjelek nélkül',
    home: 'Kezdőlap',
    guides: 'Útmutatók',
  },
};

export function GuidesIndexPageContent({ locale }: GuidesIndexPageContentProps) {
  const loc = locale || 'en';
  const i18n = INDEX_I18N[loc] || INDEX_I18N.en;

  const guidesMap = LOCALIZED_GUIDES_DATA[loc] || LOCALIZED_GUIDES_DATA.en;
  const guides = Object.values(guidesMap);

  const basePath = loc === 'en' ? '' : `/${loc}`;
  const homePath = loc === 'en' ? '/' : `/${loc}`;
  const currentUrl = `${SITE_URL}${basePath}/guides`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: i18n.home,
        item: `${SITE_URL}${homePath}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: i18n.guides,
        item: currentUrl,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: i18n.h1,
    description: i18n.sub,
    url: currentUrl,
    hasPart: guides.map((guide) => ({
      '@type': 'HowTo',
      name: guide.h1,
      url: `${SITE_URL}${basePath}/guides/${guide.slug}`,
      description: guide.metaDescription,
    })),
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* Header */}
        <section className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--brand)]/20 bg-[var(--brand-soft)] text-xs font-semibold text-[var(--brand)]">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{i18n.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {i18n.h1}
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
            {i18n.sub}
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-medium">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{i18n.privacyBadge}</span>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {guides.map((guide) => {
            const guideDetailHref = `${basePath}/guides/${guide.slug}`;

            return (
              <article
                key={guide.slug}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-[var(--brand)] transition-all duration-150 group shadow-sm"
              >
                <div className="space-y-3">
                  {/* Meta Badge Bar */}
                  <div className="flex items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-semibold border border-[var(--brand)]/20">
                      {guide.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {guide.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {guide.dateModified}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--brand)] transition-colors leading-snug">
                    <Link href={guideDetailHref}>{guide.h1}</Link>
                  </h2>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
                    {guide.metaDescription}
                  </p>

                  {/* Quick Step Preview Panel */}
                  {guide.steps && guide.steps.length > 0 && (
                    <div className="p-3 rounded-lg bg-[var(--subtle)] border border-[var(--border)] space-y-1.5">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                        {i18n.quickSteps}
                      </span>
                      <ol className="space-y-1 text-xs text-[var(--text-muted)]">
                        {guide.steps.slice(0, 3).map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[10px] font-bold text-white mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="line-clamp-1 text-[var(--text-main)] font-medium">
                              {step.title}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--brand)]">
                  <span>{guide.toolName}</span>
                  <Link
                    href={guideDetailHref}
                    className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{i18n.readGuide}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
      </div>
    </div>
  );
}

