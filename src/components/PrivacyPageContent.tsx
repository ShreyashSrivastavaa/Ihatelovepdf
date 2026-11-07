'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, HardDrive, EyeOff, CheckCircle2, Mail } from 'lucide-react';
import { useDictionary } from '../i18n/LocaleProvider';

const LOCALIZED_PRIVACY_DISCLOSURES: Record<string, { lang: string; title: string; logs: string; support: string }> = {
  en: {
    lang: "English",
    title: "Server Infrastructure & Donations",
    logs: "Hosting Infrastructure & Standard Server Logs: Our hosting infrastructure provider may temporarily generate and store standard HTTP server access logs (including your IP address, browser user agent, and requested URL) for DDoS mitigation, routing, and network security. These logs are maintained by the infrastructure host and are not used by us for user profiling, behavioral tracking, or personal identification.",
    support: "Support & External Donation Links: Optional support and donation links on this website direct you externally to Buy Me a Coffee (buymeacoffee.com) or Buy Me a Chai (buymeachai.in). When you visit either provider, their respective privacy policy and terms govern your transaction. We never receive, process, or store your payment card numbers, UPI IDs, billing addresses, or financial data."
  },
  es: {
    lang: "Español",
    title: "Infraestructura del Servidor y Donaciones",
    logs: "Infraestructura de Alojamiento y Registros del Servidor: Nuestro proveedor de infraestructura de alojamiento puede recopilar y conservar temporalmente registros estándar de acceso al servidor HTTP (incluyendo su dirección IP, agente de usuario del navegador y URL solicitada) para prevención de ataques DDoS, enrutamiento y seguridad. Estos registros se generan automáticamente y nunca los utilizamos para elaboración de perfiles, seguimiento o identificación personal.",
    support: "Enlaces de Apoyo y Donación: Los enlaces opcionales de apoyo y donación en nuestro sitio web te dirigen externamente a Buy Me a Coffee (buymeacoffee.com) o Buy Me a Chai (buymeachai.in). Al visitar cualquiera de estas plataformas, se aplican su política de privacidad y términos. ihatelovepdf no recopila, procesa ni almacena números de tarjetas de pago, datos de facturación ni cuentas financieras."
  },
  de: {
    lang: "Deutsch",
    title: "Server-Infrastruktur & Spenden",
    logs: "Hosting-Infrastruktur & Server-Protokolle: Unser Hosting-Infrastrukturanbieter kann standardmäßige HTTP-Server-Zugriffsprotokolle (einschließlich Ihrer IP-Adresse, Ihres Browser-User-Agents und der angeforderten URL) zur DDoS-Abwehr, Lastverteilung und Netzwerksicherheit vorübergehend erfassen und speichern. Diese Protokolle werden automatisch auf Infrastrukturebene erstellt und von uns niemals für Profiling, Verhaltens-Tracking oder persönliche Identifizierung verwendet.",
    support: "Unterstützungs- & Spendenlinks: Optionale Unterstützungs- und Spendenlinks auf unserer Website leiten Sie extern zu Buy Me a Coffee (buymeacoffee.com) oder Buy Me a Chai (buymeachai.in) weiter. Bei einem Besuch dieser Plattformen gelten deren jeweilige Datenschutzbestimmungen und Nutzungsbedingungen. ihatelovepdf erfasst, verarbeitet oder speichert zu keinem Zeitpunkt Zahlungskartendaten, Rechnungsdaten oder Bankkonten."
  },
  fr: {
    lang: "Français",
    title: "Infrastructure Serveur et Dons",
    logs: "Infrastructure d'Hébergement et Journaux Serveur: Notre hébergeur peut collecter et conserver temporairement des journaux d'accès serveur HTTP standard (y compris votre adresse IP, agent utilisateur du navigateur et URL demandée) pour la prévention des attaques DDoS, le routage et la sécurité du réseau. Ces journaux sont générés automatiquement et ne sont jamais utilisés à des fins de profilage, de suivi ou d'identification personnelle.",
    support: "Liens de Soutien et Dons: Les liens de soutien facultatifs dirigent vers Buy Me a Coffee (buymeacoffee.com) ou Buy Me a Chai (buymeachai.in). Lorsque vous visitez l'une de ces plateformes, leur politique de confidentialité et conditions s'appliquent. ihatelovepdf ne collecte, ne traite ni ne stocke jamais vos coordonnées bancaires ou de paiement."
  },
  it: {
    lang: "Italiano",
    title: "Infrastruttura del Server e Donazioni",
    logs: "Infrastruttura di Hosting e Log del Server: Il nostro provider di hosting può raccogliere e conservare temporaneamente i log standard di accesso al server HTTP (inclusi indirizzo IP, user agent del browser e URL richiesta) per prevenzione DDoS, instradamento e sicurezza della rete. Questi log vengono generati automaticamente a livello di infrastruttura e non vengono mai utilizzati da noi per profilazione, tracciamento o identificazione personale.",
    support: "Link di Supporto e Donazioni: I link opzionali di supporto indirizzano esternamente a Buy Me a Coffee (buymeacoffee.com) o Buy Me a Chai (buymeachai.in). Quando visiti queste piattaforme, si applicano la loro informativa sulla privacy e i loro termini. ihatelovepdf non raccoglie né memorizza numeri di carte o dati finanziari."
  },
  pt: {
    lang: "Português",
    title: "Infraestrutura do Servidor e Doações",
    logs: "Infraestrutura de Hospedagem e Logs do Servidor: Nosso provedor de infraestrutura de hospedagem pode coletar e reter temporariamente logs padrão de acesso ao servidor HTTP (incluindo seu endereço IP, user agent do navegador e URL solicitada) para mitigação de ataques DDoS, roteamento e segurança de rede. Esses logs são gerados automaticamente e nunca são usados por nós para criação de perfis, rastreamento ou identificação pessoal.",
    support: "Links de Apoio e Doações: Links opcionais de apoio e doações direcionam externamente para o Buy Me a Coffee (buymeacoffee.com) ou Buy Me a Chai (buymeachai.in). Ao visitar essas plataformas, aplicam-se suas respectivas políticas de privacidade e termos. O ihatelovepdf não coleta, processa nem armazena dados de pagamento."
  },
  hu: {
    lang: "Magyar",
    title: "Szerver Infrastruktúra és Adományok",
    logs: "Tárhely-Infrastruktúra és Szervernaplók: Tárhelyszolgáltatónk ideiglenesen szabványos HTTP szervernaplókat (beleértve az Ön IP-címét, böngészőjének felhasználói ügynökét és a kért URL-t) gyűjthet és tárolhat DDoS-megelőzés, forgalomirányítás és hálózati biztonság céljából. Ezek a naplók automatikusan keletkeznek, és soha nem használjuk őket profilalkotásra, nyomon követésre vagy személyes azonosításra.",
    support: "Támogatási és Adományozási Linkek: Az opcionális támogatási linkek a Buy Me a Coffee (buymeacoffee.com) vagy a Buy Me a Chai (buymeachai.in) webhelyre irányítanak. A platformok meglátogatásakor az ő adatvédelmi irányelveik érvényesek. Az ihatelovepdf soha nem gyűjt vagy tárol fizetési kártyaadatokat vagy számlázási adatokat."
  },
  ro: {
    lang: "Română",
    title: "Infrastructură de Server și Donații",
    logs: "Infrastructură de Găzduire și Jurnale de Server: Furnizorul nostru de găzduire poate colecta și reține temporar jurnale standard de acces la serverul HTTP (inclusiv adresa IP, agentul utilizator al browserului și URL-ul solicitat) pentru prevenirea atacurilor DDoS, rutare și securitatea rețelei. Aceste jurnale sunt generate automat și nu sunt utilizate niciodată pentru profilare, urmărire comportamentală sau identificare personală.",
    support: "Linkuri de Susținere și Donații: Linkurile opționale de susținere redirecționează către Buy Me a Coffee (buymeacoffee.com) sau Buy Me a Chai (buymeachai.in). La accesarea acestor platforme, se aplică politicile și termenii acestora. ihatelovepdf nu colectează, procesează sau stochează date de plată sau bancare."
  },
  ru: {
    lang: "Русский",
    title: "Серверная Инфраструктура и Донаты",
    logs: "Хостинг-Инфраструктура и Журналы Сервера: Наш хостинг-провайдер может собирать и временно сохранять стандартные журналы доступа к HTTP-серверу (включая ваш IP-адрес, user-agent браузера и запрошенный URL-адрес) для защиты от DDoS-атак, маршрутизации и сетевой безопасности. Эти журналы создаются автоматически на уровне инфраструктуры и никогда не используются нами для профилирования, отслеживания или личной идентификации.",
    support: "Ссылки на Поддержку и Донаты: Дополнительные ссылки для поддержки направляют вас на сторонние сервисы Buy Me a Coffee (buymeacoffee.com) или Buy Me a Chai (buymeachai.in). При переходе действуют их политика конфиденциальности и условия. ihatelovepdf не собирает, не обрабатывает и не хранит данные банковских карт или платёжные реквизиты."
  }
};

export default function PrivacyPageContent() {
  const dictionary = useDictionary();
  const routes = dictionary.routes;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-150 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <header className="text-center space-y-3 pb-8 border-b border-[var(--border)]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Local Processing in Your Browser</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)]">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Your privacy comes first. ihatelovepdf runs completely inside your browser, so your documents never touch a remote server.
          </p>
          <div className="text-xs text-[var(--text-muted)] pt-1">
            Last Updated: July 31, 2026
          </div>
        </header>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 flex items-center justify-center">
              <Lock className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-main)]">Zero Server Uploads</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Files uploaded to ihatelovepdf stay in your browser RAM and local disk storage. We operate zero cloud processing pipelines.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 flex items-center justify-center">
              <EyeOff className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-main)]">No Advertising Cookies</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              We do not use advertising identifiers or invasive profiling cookies. Only essential user settings (like theme) are stored locally.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 flex items-center justify-center">
              <HardDrive className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-main)]">Instant Destruction</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Closing your browser tab immediately releases all file buffers from system memory. No data residual copies are maintained.
            </p>
          </div>
        </div>

        {/* Detailed Content Sections */}
        <div className="space-y-6 text-sm leading-relaxed text-[var(--text-muted)]">
          
          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">1.</span> Introduction
            </h2>
            <p>
              ihatelovepdf (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) provides a browser-based document utility toolkit designed to compress, merge, split, crop, rotate, reorder, and convert PDF files. This Privacy Policy governs your access to and use of our web application.
            </p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">2.</span> Information We Do NOT Collect
            </h2>
            <p>Because processing takes place strictly inside your client web browser, we do NOT collect, access, or inspect:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[var(--text-muted)] font-normal text-xs sm:text-sm">
              <li>Your uploaded PDF files or image assets</li>
              <li>Text, graphics, metadata, or form content inside your documents</li>
              <li>Personal identification details (names, identity numbers, financial records)</li>
              <li>Browsing logs, search histories, or document activity histories</li>
            </ul>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">3.</span> Local Browser Processing Architecture
            </h2>
            <p>
              Traditional PDF tools send files over HTTP requests to cloud servers to be processed and returned. ihatelovepdf is built differently:
            </p>
            <p>
              All file processing runs locally in your web browser using open source libraries like PDF-lib and PDF.js. Your document data never travels across the internet.
            </p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">4.</span> Cookies &amp; Local Storage
            </h2>
            <p>
              We prioritize data minimization:
            </p>
            <div className="space-y-2 pt-1 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text-main)]">Theme Preference (`ihatelovepdf-theme`):</strong> Stores your choice of Light or Dark mode in your browser&apos;s <code>localStorage</code>.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text-main)]">No Analytics or Advertising Trackers:</strong> We do not use Google Analytics, advertising trackers, session recording tools, or third-party telemetry scripts. There are zero third-party tracking scripts loaded on this website. No personal usage profiles, advertising identifiers, or browsing histories are created or collected.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text-main)]">Hosting Provider &amp; Standard Server Logs:</strong> Our infrastructure hosting provider may temporarily generate and store standard HTTP server access logs (including your IP address, browser user agent, and requested URL) for DDoS mitigation, routing, and network security. These logs are maintained by the infrastructure host and are not used by us for user profiling, behavioral tracking, or personal identification.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text-main)]">Support &amp; Donation Links:</strong> Optional support and donation links on this website direct you externally to Buy Me a Coffee (<code>buymeacoffee.com</code>) or Buy Me a Chai (<code>buymeachai.in</code>). When you visit either provider, their respective privacy policy and terms govern your transaction. We never receive, process, or store your payment card numbers, UPI IDs, billing addresses, or financial data.
                </div>
              </div>
            </div>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">5.</span> Third-Party Libraries &amp; Licenses
            </h2>
            <p>ihatelovepdf relies on trusted open source libraries:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs">
              <li>PDF-lib: MIT License (PDF manipulation and compilation)</li>
              <li>PDF.js: Apache License 2.0 (In-browser rendering and page previews)</li>
              <li>Lucide Icons: ISC License (UI icons)</li>
              <li>Next.js / React: MIT License (Frontend framework)</li>
            </ul>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">6.</span> Document Privacy Architecture
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Your documents are processed on your device and are never sent to our servers. Because all file operations run locally in your web browser via client-side WebAssembly, your documents and files remain strictly under your control at all times.
            </p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">8.</span> Multilingual Disclosures (All 9 Languages)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              For complete transparency across all supported regions, here are the server log and donation notices in all 9 languages:
            </p>
            <div className="space-y-3 pt-1">
              {Object.entries(LOCALIZED_PRIVACY_DISCLOSURES).map(([code, item]) => (
                <details
                  key={code}
                  className="group border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--bg-main)]"
                >
                  <summary className="px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold text-[var(--text-main)] hover:bg-[var(--subtle)] cursor-pointer list-none select-none">
                    <span>{item.lang} ({code.toUpperCase()}) – {item.title}</span>
                    <span className="text-xs text-[var(--text-muted)] group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-3.5 text-xs text-[var(--text-muted)] space-y-2 border-t border-[var(--border)] leading-relaxed">
                    <p><strong>{code === 'en' ? 'Server Logs:' : 'Logs:'}</strong> {item.logs}</p>
                    <p><strong>{code === 'en' ? 'Donations:' : 'Donations / Support:'}</strong> {item.support}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <span className="text-[var(--brand)] font-mono text-sm font-semibold">9.</span> Privacy Concerns &amp; Contact
            </h2>
            <p>
              If you have any questions or concerns regarding our privacy practices, please contact us:
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="mailto:shreyashsr2004@gmail.com"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--brand)] text-white text-xs font-medium hover:opacity-95 transition-opacity"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Contact shreyashsr2004@gmail.com</span>
              </a>
              {routes.contact && (
                <Link href={routes.contact} className="px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-xs font-medium text-[var(--text-main)] hover:border-[var(--brand)] transition-colors">
                  Open Contact Form
                </Link>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
