'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, WifiOff, Cpu, Lock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SITE_URL } from '../../lib/site';

interface OfflineToolsPageContentProps {
  locale: string;
}

const OFFLINE_DATA: Record<string, {
  title: string;
  description: string;
  h1: string;
  noticeTitle: string;
  noticeText: string;
  badge: string;
  p1: string;
  p2: string;
  buttonTest: string;
  buttonBrowse: string;
  mergeUrl: string;
  toolsUrl: string;
  faqs: Array<{ q: string; a: string }>;
}> = {
  en: {
    title: 'Offline PDF Tools: Run in Browser | ihatelovepdf',
    description: 'Process PDFs locally in your browser without an active connection once loaded. Client-side tools that keep files on your device.',
    h1: 'PDF Tools That Run in Your Browser Without an Active Connection',
    noticeTitle: 'How Offline Use Works (Important Reality Check)',
    noticeText: 'These tools keep working without an internet connection once the page has fully loaded in your browser. However, reloading the page or opening a new browser tab while offline will not open them. Keep your browser tab open to continue working uninterrupted.',
    badge: 'Runs Locally After Initial Load',
    p1: 'Traditional PDF websites act as file relays: your files are uploaded to cloud servers. ihatelovepdf runs client-side JavaScript and WebAssembly compiled directly into your browser tab.',
    p2: 'You can verify this in DevTools: disconnect your Wi-Fi after opening the tool, drop a file, and process it. Zero bytes travel across the internet.',
    buttonTest: 'Test Merge PDF Locally',
    buttonBrowse: 'Browse All Browser Tools',
    mergeUrl: '/merge',
    toolsUrl: '/tools',
    faqs: [
      {
        q: 'Can I use I Hate Love PDF without an active internet connection?',
        a: 'Yes. Once the tool page is loaded in your browser tab, the core processing engine runs locally on your device. You can disconnect Wi-Fi and still merge, compress, or edit documents. However, reloading the page offline will fail because the site is not currently cached by a service worker.'
      },
      {
        q: 'Why does reloading fail when offline?',
        a: 'We currently do not register an offline background service worker. This means your browser tab retains the loaded code in memory, but requesting a fresh page load requires an initial network connection.'
      },
      {
        q: 'Are any file uploads sent to servers while processing?',
        a: 'Never. All document processing happens strictly in your device memory via client-side WebAssembly and JavaScript libraries.'
      }
    ]
  },
  de: {
    title: 'Offline PDF-Tools: Im Browser nutzen | ihatelovepdf',
    description: 'PDFs lokal im Browser bearbeiten, sobald die Seite geladen ist. Clientseitige Werkzeuge ohne Uploads.',
    h1: 'PDF-Werkzeuge, die ohne aktive Verbindung im Browser laufen',
    noticeTitle: 'Wichtiger Hinweis zur Offline-Nutzung',
    noticeText: 'Diese Tools funktionieren nach dem vollständigen Laden der Seite im Browser auch ohne Internetverbindung weiter. Ein Neuladen der Seite oder das Öffnen eines neuen Tabs im Offline-Modus öffnet die Tools jedoch nicht. Lassen Sie Ihren Browser-Tab geöffnet, um ohne Unterbrechung weiterzuarbeiten.',
    badge: 'Lokale Ausführung nach dem Laden',
    p1: 'Traditionelle PDF-Dienste laden Ihre Dokumente auf fremde Server. ihatelovepdf führt WebAssembly und JavaScript direkt in Ihrem Browser-Tab aus.',
    p2: 'Prüfen Sie es selbst: Trennen Sie nach dem Laden das WLAN und bearbeiten Sie ein Dokument. Es fließen null Bytes über das Internet.',
    buttonTest: 'PDF lokal zusammenfügen',
    buttonBrowse: 'Alle Werkzeuge anzeigen',
    mergeUrl: '/de/zusammenfuehren',
    toolsUrl: '/de/tools',
    faqs: [
      {
        q: 'Kann ich ihatelovepdf offline nutzen?',
        a: 'Ja. Sobald die Werkzeugseite in Ihrem Browser geladen ist, läuft die Verarbeitung lokal auf Ihrem Rechner. Ein Neuladen erfordert jedoch eine Netzwerkverbindung.'
      },
      {
        q: 'Warum funktioniert das Neuladen offline nicht?',
        a: 'Wir registrieren derzeit keinen Service Worker. Der geladene Tab behält den Code im Arbeitsspeicher, ein erneuter Abruf benötigt jedoch das Netz.'
      },
      {
        q: 'Werden Dateien auf Server hochgeladen?',
        a: 'Nein. Dokumente verbleiben zu 100 % auf Ihrem Endgerät.'
      }
    ]
  },
  es: {
    title: 'Herramientas PDF Offline en Navegador | ihatelovepdf',
    description: 'Procesa PDFs localmente en tu navegador sin conexión activa una vez cargada la página. Cero subidas.',
    h1: 'Herramientas PDF que funcionan en tu navegador sin conexión activa',
    noticeTitle: 'Nota importante sobre el uso sin conexión',
    noticeText: 'Estas herramientas siguen funcionando sin conexión a internet una vez que la página se ha cargado por completo en tu navegador. Sin embargo, recargar la página o abrir una nueva pestaña sin conexión no las abrirá. Mantén tu pestaña abierta para seguir trabajando sin interrupciones.',
    badge: 'Ejecución local tras la carga inicial',
    p1: 'Las herramientas tradicionales envían tus archivos a servidores en la nube. ihatelovepdf ejecuta WebAssembly y JavaScript directamente en tu pestaña.',
    p2: 'Compruébalo tú mismo: desconecta el Wi-Fi tras abrir la herramienta y procesa tu archivo. Cero bytes transmitidos.',
    buttonTest: 'Probar Unir PDF localmente',
    buttonBrowse: 'Ver todas las herramientas',
    mergeUrl: '/es/unir',
    toolsUrl: '/es/tools',
    faqs: [
      {
        q: '¿Puedo usar ihatelovepdf sin internet?',
        a: 'Sí. Una vez abierta la página, el motor corre en tu dispositivo. Puedes desconectar la red y seguir trabajando, pero recargar la página requerirá conexión.'
      },
      {
        q: '¿Por qué no puedo recargar sin internet?',
        a: 'No utilizamos service worker para caché en disco en esta versión. El código se mantiene en la memoria de la pestaña abierta.'
      },
      {
        q: '¿Mis archivos se suben a algún servidor?',
        a: 'Nunca. El procesamiento se ejecuta exclusivamente en la memoria de tu dispositivo.'
      }
    ]
  },
  fr: {
    title: 'Outils PDF Hors Ligne dans Navigateur | ihatelovepdf',
    description: 'Traitez vos PDF localement dans votre navigateur sans connexion active une fois la page chargée. Zéro upload.',
    h1: 'Outils PDF fonctionnant dans votre navigateur sans connexion active',
    noticeTitle: 'Remarque importante sur le fonctionnement hors ligne',
    noticeText: 'Ces outils continuent de fonctionner sans connexion Internet une fois la page entièrement chargée dans votre navigateur. Cependant, recharger la page ou ouvrir un nouvel onglet hors ligne ne les ouvrira pas. Gardez votre onglet ouvert pour continuer à travailler sans interruption.',
    badge: 'Exécution locale après chargement initial',
    p1: 'Les services classiques transfèrent vos documents vers des serveurs distants. ihatelovepdf exécute le code directement dans votre navigateur.',
    p2: 'Vérifiez par vous-même : coupez votre connexion une fois l’outil ouvert et traitez votre fichier. Zéro octet transféré.',
    buttonTest: 'Tester Fusionner PDF localement',
    buttonBrowse: 'Tous les outils',
    mergeUrl: '/fr/fusionner',
    toolsUrl: '/fr/tools',
    faqs: [
      {
        q: 'Puis-je utiliser ihatelovepdf sans connexion ?',
        a: 'Oui. Une fois la page chargée, le traitement se fait sur votre appareil. Déconnectez le réseau et continuez, mais ne rechargez pas la page.'
      },
      {
        q: 'Pourquoi le rechargement échoue-t-il hors ligne ?',
        a: 'Aucun service worker persistant n’est utilisé. Le code réside dans la mémoire vive de l’onglet ouvert.'
      },
      {
        q: 'Mes fichiers sont-ils envoyés sur un serveur ?',
        a: 'Absolument pas. Tout le traitement reste confiné à votre terminal.'
      }
    ]
  },
  it: {
    title: 'Strumenti PDF Offline nel Browser | ihatelovepdf',
    description: 'Elabora PDF localmente nel tuo browser senza connessione attiva una volta caricata la pagina. Zero upload.',
    h1: 'Strumenti PDF che funzionano nel browser senza connessione attiva',
    noticeTitle: 'Nota importante sull’utilizzo offline',
    noticeText: 'Questi strumenti continuano a funzionare senza connessione Internet una volta caricata completamente la pagina nel browser. Tuttavia, ricaricare la pagina o aprire una nuova scheda offline non consentirà di aprirli. Tieni aperta la scheda del browser per continuare a lavorare senza interruzioni.',
    badge: 'Elaborazione locale dopo il caricamento',
    p1: 'I tradizionali strumenti PDF inviano i tuoi file a server esterni. ihatelovepdf esegue WebAssembly e JavaScript nella memoria della scheda.',
    p2: 'Verificalo nei DevTools: disconnetti il Wi-Fi dopo aver aperto lo strumento ed elabora un PDF. Zero byte trasmessi.',
    buttonTest: 'Prova Unisci PDF localmente',
    buttonBrowse: 'Tutti gli strumenti',
    mergeUrl: '/it/unisci',
    toolsUrl: '/it/tools',
    faqs: [
      {
        q: 'Posso usare ihatelovepdf senza internet?',
        a: 'Sì. Una volta caricata la pagina, l’elaborazione avviene sul tuo dispositivo. Ricaricare la pagina offline richiederà invece la connessione.'
      },
      {
        q: 'Perché ricaricare la pagina fallisce offline?',
        a: 'Non è presente un service worker per il caching offline persistente. Il codice rimane attivo nella RAM della scheda aperta.'
      },
      {
        q: 'I miei documenti vengono caricati su server?',
        a: 'No. I documenti sono elaborati sul tuo dispositivo e non lasciano mai la memoria locale.'
      }
    ]
  },
  pt: {
    title: 'Ferramentas PDF Offline no Navegador | ihatelovepdf',
    description: 'Processe PDFs localmente no navegador sem conexão ativa após o carregamento inicial. Zero uploads.',
    h1: 'Ferramentas PDF que funcionam no navegador sem conexão ativa',
    noticeTitle: 'Nota importante sobre o uso offline',
    noticeText: 'Estas ferramentas continuam funcionando sem conexão com a internet assim que a página é totalmente carregada no navegador. No entanto, recarregar a página ou abrir uma nova aba desconectado não as abrirá. Mantenha sua aba aberta para continuar trabalhando sem interrupção.',
    badge: 'Processamento local após carregamento',
    p1: 'Os serviços convencionais enviam arquivos para servidores em nuvem. O ihatelovepdf executa tudo diretamente na aba do seu navegador.',
    p2: 'Comprove no DevTools: desconecte o Wi-Fi após carregar a ferramenta e processe seu PDF. Zero bytes trafegados.',
    buttonTest: 'Testar Juntar PDF localmente',
    buttonBrowse: 'Ver todas as ferramentas',
    mergeUrl: '/pt/juntar',
    toolsUrl: '/pt/tools',
    faqs: [
      {
        q: 'Posso usar o ihatelovepdf offline?',
        a: 'Sim. Assim que a página carrega, o motor funciona localmente. Recarregar a página offline, porém, exige reconexão à internet.'
      },
      {
        q: 'Por que não abre ao recarregar sem internet?',
        a: 'Não utilizamos service workers para cache em disco nesta versão. O código permanece na memória da aba aberta.'
      },
      {
        q: 'Meus arquivos são enviados para algum servidor?',
        a: 'Não. Os documentos são processados no seu dispositivo e nunca saem da sua máquina.'
      }
    ]
  },
  ro: {
    title: 'Instrumente PDF Offline în Browser | ihatelovepdf',
    description: 'Procesează fișiere PDF local în browser fără conexiune activă odată încărcată pagina. Zero încărcări.',
    h1: 'Instrumente PDF care rulează în browser fără conexiune activă',
    noticeTitle: 'Notă importantă despre utilizarea offline',
    noticeText: 'Aceste instrumente continuă să funcționeze fără conexiune la internet odată ce pagina s-a încărcat complet în browser. Totuși, reîncărcarea paginii sau deschiderea unei noi file offline nu le va deschide. Păstrează fila deschisă pentru a continua să lucrezi fără întreruperi.',
    badge: 'Execuție locală după încărcare',
    p1: 'Serviciile clasice trimit fișierele tale către servere din cloud. ihatelovepdf rulează direct în memoria filei browserului tău.',
    p2: 'Verifică în DevTools: deconectează internetul după deschiderea paginii și procesează fișierul. Zero octeți transferați.',
    buttonTest: 'Testează Unește PDF local',
    buttonBrowse: 'Toate instrumentele',
    mergeUrl: '/ro/uneste',
    toolsUrl: '/ro/tools',
    faqs: [
      {
        q: 'Pot folosi ihatelovepdf fără internet?',
        a: 'Da. Odată încărcată pagina, procesarea se face pe dispozitivul tău. Reîncărcarea paginii offline va necesita însă conexiune.'
      },
      {
        q: 'De ce reîncărcarea eșuează offline?',
        a: 'Nu înregistrăm un service worker de stocare în cache. Codul rămâne stocat doar în memoria RAM a filei deschise.'
      },
      {
        q: 'Sunt fișierele trimise către servere?',
        a: 'Nu. Fișierele sunt prelucrate local și nu părăsesc dispozitivul.'
      }
    ]
  },
  ru: {
    title: 'Офлайн PDF Инструменты в Браузере | ihatelovepdf',
    description: 'Обрабатывайте PDF локально в браузере без активного интернета после загрузки страницы. Без загрузки на сервер.',
    h1: 'PDF инструменты, работающие в браузере без активного интернета',
    noticeTitle: 'Важное примечание о работе офлайн',
    noticeText: 'Эти инструменты продолжают работать без подключения к интернету, как только страница полностью загружена в браузере. Однако перезагрузка страницы или открытие новой вкладки в автономном режиме не откроет их. Держите вкладку браузера открытой, чтобы продолжить работу без перебоев.',
    badge: 'Локальная обработка после загрузки',
    p1: 'Обычные сайты отправляют документы на удаленные серверы. ihatelovepdf выполняет WebAssembly и JavaScript прямо во вкладке браузера.',
    p2: 'Проверьте сами: отключите Wi-Fi после открытия инструмента и обработайте файл. Ноль байт отправлено по сети.',
    buttonTest: 'Проверить Объединение PDF локально',
    buttonBrowse: 'Все инструменты',
    mergeUrl: '/ru/obedinit',
    toolsUrl: '/ru/tools',
    faqs: [
      {
        q: 'Могу ли я использовать ihatelovepdf без интернета?',
        a: 'Да. После загрузки страницы движок работает локально на вашем устройстве. Однако для перезагрузки страницы потребуется интернет.'
      },
      {
        q: 'Почему перезагрузка не работает без интернета?',
        a: 'Мы не используем service worker для кэширования страниц на диск. Код хранится только в оперативной памяти открытой вкладки.'
      },
      {
        q: 'Передаются ли файлы на сервер?',
        a: 'Нет. Документы обрабатываются исключительно на вашем компьютере или телефоне.'
      }
    ]
  },
  hu: {
    title: 'Offline PDF Eszközök a Böngészőben | ihatelovepdf',
    description: 'PDF fájlok helyi kezelése a böngészőben aktív internet nélkül a betöltést követően. Nulla feltöltés.',
    h1: 'PDF eszközök, amelyek aktív kapcsolat nélkül futnak a böngészőben',
    noticeTitle: 'Fontos megjegyzés az offline használatról',
    noticeText: 'Ezek az eszközök internetkapcsolat nélkül is működnek, miután az oldal teljesen betöltődött a böngészőben. Az oldal újratöltése vagy új lap megnyitása offline állapotban azonban nem nyitja meg őket. Tartsa nyitva a böngészőfülét a zavartalan munkavégzéshez.',
    badge: 'Helyi végrehajtás betöltés után',
    p1: 'A hagyományos PDF oldalak a felhőbe küldik a dokumentumokat. Az ihatelovepdf közvetlenül a böngésző memóriájában futtatja a kódot.',
    p2: 'Ellenőrizze Ön is: kapcsolja ki az internetet az oldal megnyitása után, és dolgozza fel a fájlt. Nulla bájt távozik a hálózaton.',
    buttonTest: 'PDF egyesítés tesztelése helyben',
    buttonBrowse: 'Összes eszköz böngészése',
    mergeUrl: '/hu/osszefuzni',
    toolsUrl: '/hu/tools',
    faqs: [
      {
        q: 'Használhatom az ihatelovepdf-et internet nélkül?',
        a: 'Igen. Amint az oldal betöltődött, a feldolgozás a gépén történik. Az oldal újratöltéséhez azonban hálózati kapcsolat szükséges.'
      },
      {
        q: 'Miért nem sikerül az újratöltés offline?',
        a: 'Nem használunk háttérben futó service workert az offline tároláshoz. A kód a megnyitott lap memóriájában marad.'
      },
      {
        q: 'Feltöltődnek a dokumentumok a szerverekre?',
        a: 'Nem. A dokumentumok feldolgozása kizárólag a helyi eszközön történik.'
      }
    ]
  }
};

export function OfflineToolsPageContent({ locale }: OfflineToolsPageContentProps) {
  const content = OFFLINE_DATA[locale] || OFFLINE_DATA.en;
  const canonicalPath = locale === 'en' ? '/offline-pdf-tools' : `/${locale}/offline-pdf-tools`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--brand)]/20 bg-[var(--brand-soft)] text-xs font-semibold text-[var(--brand)]">
            <WifiOff className="h-3.5 w-3.5" />
            <span>{content.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] leading-tight">
            {content.h1}
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* PROMINENT PLAIN STATEMENT: Reality Check on Offline Reload */}
        <div className="p-5 sm:p-6 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-amber-800 dark:text-amber-300">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>{content.noticeTitle}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-amber-950 dark:text-amber-100">
            {content.noticeText}
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-[var(--brand)] flex items-center justify-center">
              <Cpu className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">Powered by Your Device</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Calculations are performed by your laptop or phone processor rather than congested remote cloud servers.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Lock className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">Complete Data Isolation</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Ideal for sensitive medical, legal, and financial files where security policies prohibit external file uploads.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-[var(--brand)] flex items-center justify-center">
              <WifiOff className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-main)]">Works in Transit Once Loaded</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Once loaded, you can disconnect your connection or turn on airplane mode and continue organizing files without interruption.
            </p>
          </div>
        </div>

        {/* Deep Dive & CTAs */}
        <section className="p-6 sm:p-7 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4 leading-relaxed text-xs sm:text-sm text-[var(--text-muted)]">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)]">
            How Client-Side PDF Processing Works
          </h2>
          <p>{content.p1}</p>
          <p>{content.p2}</p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href={content.mergeUrl}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[var(--brand)] text-white font-medium text-xs sm:text-sm hover:opacity-95 transition-opacity"
            >
              <span>{content.buttonTest}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={content.toolsUrl}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] font-medium text-xs sm:text-sm text-[var(--text-main)] hover:border-[var(--brand)] transition-colors"
            >
              <span>{content.buttonBrowse}</span>
            </Link>
          </div>
        </section>

        {/* Visible FAQ Section */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-main)] text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2.5 max-w-3xl mx-auto">
            {content.faqs.map((item, idx) => (
              <details
                key={`faq-offline-${idx}`}
                className="group border border-[var(--border)] rounded-xl overflow-hidden transition-colors bg-[var(--card)]"
              >
                <summary className="w-full text-left p-4 flex justify-between items-center gap-4 font-semibold text-xs sm:text-sm text-[var(--text-main)] hover:bg-[var(--subtle)] transition-colors cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="text-base text-secondary font-mono group-open:hidden">+</span>
                  <span className="text-base text-secondary font-mono hidden group-open:inline">−</span>
                </summary>
                <div className="px-4 pb-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)] pt-2.5">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <script
          id={`schema-faq-offline-${locale}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </div>
  );
}
