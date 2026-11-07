const fs = require('fs');
const path = require('path');

const SEARCH_INTENT_DATA_CONTENT = `export type SearchIntentSlug =
  | 'merge-pdf-without-uploading'
  | 'pdf-tools-no-watermark'
  | 'edit-pdf-for-resume'
  | 'is-it-safe-to-merge-pdf-online';

export interface SearchIntentSection {
  title: string;
  description: string;
  points?: string[];
}

export interface SearchIntentFAQ {
  question: string;
  answer: string;
}

export interface SearchIntentPageData {
  slug: SearchIntentSlug;
  title: string;
  description: string;
  h1: string;
  directAnswer: string;
  badge: string;
  primaryToolKey: string;
  primaryToolName: string;
  sections: SearchIntentSection[];
  faqs: SearchIntentFAQ[];
}

export const SEARCH_INTENT_DATA: Record<SearchIntentSlug, Record<string, SearchIntentPageData>> = {
  'merge-pdf-without-uploading': {
    en: {
      slug: 'merge-pdf-without-uploading',
      title: 'Merge PDF Without Uploading: 100% Private, Client-Side | ihatelovepdf',
      description: 'Combine PDF files without uploading them to remote cloud servers. Fast in-browser WebAssembly merging with no sign-up, no watermarks, and zero data leaks.',
      h1: 'How to Merge PDF Files Without Uploading to Cloud Servers',
      directAnswer: 'To merge PDF files without uploading them to any remote server, use ihatelovepdf. Your files are combined directly inside your browser RAM using WebAssembly and client-side JavaScript. Because 0 bytes leave your device, your confidential financial statements, medical records, and legal contracts remain 100% private.',
      badge: 'Zero Cloud Uploads · 100% Local',
      primaryToolKey: 'merge',
      primaryToolName: 'Merge PDF Tool',
      sections: [
        {
          title: 'The Hidden Risk of Server-Side PDF Merging',
          description: 'Most online PDF mergers upload your documents to third-party Amazon AWS or Google Cloud servers. Even if services promise "files deleted after 1 hour," your confidential data is exposed to server-side logging, transient data breaches, and unauthorized retention.',
          points: [
            'Documents can be intercepted during HTTP upload and download transit',
            'Unencrypted temporary file caches on cloud servers are vulnerable to security exploits',
            'Corporate compliance violations under GDPR Article 28 and HIPAA data controller mandates',
          ],
        },
        {
          title: 'How Client-Side WebAssembly Merging Works',
          description: 'When you select files in ihatelovepdf, our local WebAssembly engine parses the PDF cross-reference tables and vector objects directly in your device\\'s local RAM. Pages are interleaved in memory and saved directly to your Downloads folder—completely independent of an internet connection.',
        },
        {
          title: 'How to Verify Zero Network Activity Yourself',
          description: 'You do not have to take our word for it. You can inspect the network behavior in 3 seconds:',
          points: [
            'Open your web browser Developer Tools by pressing F12 (or Right Click -> Inspect).',
            'Click on the "Network" tab at the top of the DevTools panel.',
            'Select and merge two PDF files on ihatelovepdf.',
            'Observe that exactly 0 outbound file payloads or POST requests are sent.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Can I merge PDFs while my computer is completely offline?',
          answer: 'Yes! Once you have loaded the ihatelovepdf page, you can turn off your Wi-Fi or unplug your Ethernet cable. The merger will continue combining your documents seamlessly inside your browser memory.',
        },
        {
          question: 'Is there any file size limit when merging without uploading?',
          answer: 'Because processing occurs in your local browser RAM rather than a shared cloud server, there are no artificial file size caps. You can merge large documents with hundreds of pages smoothly based on your device memory.',
        },
        {
          question: 'Does ihatelovepdf add any watermark to the merged PDF?',
          answer: 'Never. Output files are clean, original, and 100% watermark-free.',
        },
      ],
    },
    es: {
      slug: 'merge-pdf-without-uploading',
      title: 'Unir PDF Sin Subir Archivos: 100% Privado y Local | ihatelovepdf',
      description: 'Combina archivos PDF sin subirlos a servidores externos. Fusión instantánea en el navegador con WebAssembly: sin registros, sin marcas de agua y 100% privado.',
      h1: 'Cómo Unir Archivos PDF Sin Subirlos a Servidores en la Nube',
      directAnswer: 'Para unir archivos PDF sin subirlos a servidores externos, utiliza ihatelovepdf. Tus documentos se combinan directamente en la memoria RAM de tu navegador con WebAssembly. Como no sale ni un solo byte de tu ordenador o móvil, tus nóminas, contratos y datos personales permanecen 100% protegidos.',
      badge: 'Cero Cargas a Servidores · 100% Local',
      primaryToolKey: 'merge',
      primaryToolName: 'Herramienta Unir PDF',
      sections: [
        {
          title: 'El Peligro de Subir Documentos Confidenciales a la Nube',
          description: 'La mayoría de herramientas web suben tus documentos a servidores remotos para procesarlos. Aunque afirmen que los borran en una hora, durante ese tiempo tus archivos son vulnerables a filtraciones y registros no autorizados.',
        },
        {
          title: 'Cómo Funciona la Fusión en Memoria Local',
          description: 'ihatelovepdf ejecuta el motor PDF en tu propio dispositivo. La unión de páginas ocurre en tu memoria RAM sin depender de velocidades de subida ni de colas de espera.',
        },
      ],
      faqs: [
        {
          question: '¿Puedo unir archivos PDF sin conexión a internet?',
          answer: 'Sí. Una vez cargada la página, puedes desconectar el Wi-Fi y seguir uniendo documentos con total normalidad.',
        },
      ],
    },
    de: {
      slug: 'merge-pdf-without-uploading',
      title: 'PDF Zusammenfügen Ohne Upload: 100% Privat & Kostenlos | ihatelovepdf',
      description: 'PDF-Dateien kombinieren ohne Upload auf externe Server. Schnelle WebAssembly-Verarbeitung direkt im Browser: ohne Registrierung und ohne Datenverlust.',
      h1: 'PDF-Dateien Zusammenfügen Ohne Upload auf Externe Server',
      directAnswer: 'Um PDF-Dateien ohne Server-Upload zusammenzufügen, nutzen Sie ihatelovepdf. Ihre Dokumente werden direkt im Arbeitsspeicher Ihres Browsers mit WebAssembly verarbeitet. Da 0 Bytes Ihr Gerät verlassen, bleiben vertrauliche Steuerdokumente und Verträge zu 100% sicher und privat.',
      badge: 'Null Server-Uploads · 100% Lokal',
      primaryToolKey: 'merge',
      primaryToolName: 'PDF Zusammenfügen',
      sections: [
        {
          title: 'Sicherheitsrisiken herkömmlicher Cloud-Dienste',
          description: 'Die meisten Online-PDF-Tools übertragen sensible Firmendokumente auf fremde Server. ihatelovepdf verarbeitet alles lokal auf Ihrem Computer gemäß DSGVO.',
        },
      ],
      faqs: [
        {
          question: 'Funktioniert das Zusammenfügen auch offline?',
          answer: 'Ja, sobald die Webseite geöffnet ist, können Sie die Internetverbindung trennen und beliebig viele PDFs lokal zusammenfügen.',
        },
      ],
    },
    fr: {
      slug: 'merge-pdf-without-uploading',
      title: 'Fusionner PDF Sans Téléversement: 100% Privé | ihatelovepdf',
      description: 'Fusionnez des fichiers PDF sans les envoyer sur un serveur distant. Traitement local WebAssembly dans votre navigateur : sans inscription et sans fuite de données.',
      h1: 'Comment Fusionner des PDF Sans Téléversement sur un Serveur',
      directAnswer: 'Pour fusionner des fichiers PDF sans envoyer vos documents sur un serveur distant, utilisez ihatelovepdf. Vos fichiers sont combinés directement dans la mémoire vive de votre navigateur via WebAssembly. Zéro octet ne quitte votre ordinateur ou smartphone.',
      badge: 'Zéro Téléversement · 100% Local',
      primaryToolKey: 'merge',
      primaryToolName: 'Outil Fusionner PDF',
      sections: [
        {
          title: 'Pourquoi éviter d\\'envoyer ses PDF sur des serveurs distants',
          description: 'Envoyer des pièces d\\'identité ou des contrats sur des serveurs tiers comporte des risques de fuite de données. Le traitement local supprime tout intermédiaire.',
        },
      ],
      faqs: [
        {
          question: 'Puis-je fusionner mes PDF hors ligne ?',
          answer: 'Absolument. Dès que la page est chargée, vous pouvez couper votre connexion internet et fusionner vos fichiers en toute sécurité.',
        },
      ],
    },
    it: {
      slug: 'merge-pdf-without-uploading',
      title: 'Unisci PDF Senza Caricare File: 100% Privato | ihatelovepdf',
      description: 'Unisci file PDF senza inviarli a server cloud esterni. Elaborazione locale WebAssembly nel tuo browser: senza registrazione e senza rischi per la privacy.',
      h1: 'Come Unire File PDF Senza Caricarli su Server Esterni',
      directAnswer: 'Per unire file PDF senza caricarli su server remoti, affidati a ihatelovepdf. Tutti i documenti vengono uniti direttamente nella memoria RAM del tuo browser tramite WebAssembly. Zero byte lasciano il tuo dispositivo, garantendo la massima riservatezza.',
      badge: 'Zero Upload · 100% Locale',
      primaryToolKey: 'merge',
      primaryToolName: 'Strumento Unisci PDF',
      sections: [
        {
          title: 'Protezione dei dati aziendali e personali',
          description: 'Evita di trasmettere fatture, contratti e dati bancari su server terzi. ihatelovepdf garantisce che i file rimangano solo sul tuo computer.',
        },
      ],
      faqs: [
        {
          question: 'Funziona anche senza connessione internet?',
          answer: 'Sì. Una volta aperta la pagina nel browser, puoi scollegare la rete e continuare a unire documenti liberamente.',
        },
      ],
    },
    pt: {
      slug: 'merge-pdf-without-uploading',
      title: 'Juntar PDF Sem Fazer Upload: 100% Privado e Local | ihatelovepdf',
      description: 'Combine arquivos PDF sem enviar nada para a nuvem. Processamento direto no navegador com WebAssembly: sem cadastro, sem marca d’água e com sigilo total.',
      h1: 'Como Juntar Arquivos PDF Sem Fazer Upload para a Nuvem',
      directAnswer: 'Para juntar arquivos PDF sem enviar seus documentos para servidores externos, utilize o ihatelovepdf. Os arquivos são combinados diretamente na memória do seu navegador com WebAssembly. Nenhum dado sai do seu computador ou celular.',
      badge: 'Zero Uploads · 100% Local',
      primaryToolKey: 'merge',
      primaryToolName: 'Juntar PDF',
      sections: [
        {
          title: 'Privacidade Total Para Seus Documentos',
          description: 'A maioria dos sites envia seus PDFs para servidores remotos. Com a tecnologia WebAssembly do ihatelovepdf, o processamento ocorre no seu próprio processador.',
        },
      ],
      faqs: [
        {
          question: 'Posso juntar PDFs sem internet?',
          answer: 'Sim, a aplicação funciona perfeitamente sem conexão após a primeira abertura da página.',
        },
      ],
    },
    ro: {
      slug: 'merge-pdf-without-uploading',
      title: 'Unește PDF Fără Încărcare pe Server: 100% Privat | ihatelovepdf',
      description: 'Combină fișiere PDF fără a le încărca pe servere externe. Procesare locală în browser prin WebAssembly: fără înregistrare și fără riscuri de securitate.',
      h1: 'Cum să Unești Fișiere PDF Fără Încărcare pe Servicii Cloud',
      directAnswer: 'Pentru a îmbina documente PDF fără a le trimite pe servere externe, folosește ihatelovepdf. Fișierele sunt procesate direct în memoria browserului tău prin WebAssembly, asigurând confidențialitate absolută.',
      badge: 'Fără Server · 100% Local',
      primaryToolKey: 'merge',
      primaryToolName: 'Unește PDF',
      sections: [
        {
          title: 'Siguranță deplină pentru acte oficiale și contracte',
          description: 'Documentele tale nu părăsesc niciodată calculatorul. Acest lucru elimină orice posibilitate de interceptare sau stocare neautorizată.',
        },
      ],
      faqs: [
        {
          question: 'Funcționează și dacă opresc conexiunea la internet?',
          answer: 'Da! Poți deconecta internetul și unirea fișierelor va rula impecabil direct în memoria browserului.',
        },
      ],
    },
    ru: {
      slug: 'merge-pdf-without-uploading',
      title: 'Объединить PDF без загрузки на сервер: 100% приватно | ihatelovepdf',
      description: 'Объединяйте PDF файлы без отправки на удаленные серверы. Локальная обработка WebAssembly в браузере: без регистрации, без водяных знаков и утечек.',
      h1: 'Как объединить PDF файлы без отправки в облачные сервисы',
      directAnswer: 'Чтобы объединить PDF файлы без отправки в облако, используйте ihatelovepdf. Документы склеиваются прямо в оперативной памяти вашего браузера с помощью WebAssembly. Ни один байт информации не покидает ваш компьютер или смартфон.',
      badge: 'Ноль загрузок в облако · 100% локально',
      primaryToolKey: 'merge',
      primaryToolName: 'Объединить PDF',
      sections: [
        {
          title: 'Риски облачной обработки конфиденциальных файлов',
          description: 'Многие онлайн-сервисы сохраняют документы на промежуточных серверах. ihatelovepdf выполняет все операции исключительно на вашем процессоре.',
        },
      ],
      faqs: [
        {
          question: 'Можно ли объединять PDF оффлайн без интернета?',
          answer: 'Да. После открытия страницы вы можете отключить Wi-Fi — сервис продолжит работать прямо в оперативной памяти браузера.',
        },
      ],
    },
    hu: {
      slug: 'merge-pdf-without-uploading',
      title: 'PDF Egyesítés Feltöltés Nélkül: 100% Privát és Ingyenes | ihatelovepdf',
      description: 'Egyesíts PDF-eket anélkül, hogy feltöltenéd őket külső szerverekre. Gyors böngészős WebAssembly feldolgozás regisztráció és adatvesztés nélkül.',
      h1: 'Hogyan Egyesíts PDF Fájlokat Külső Szerverre Feltöltés Nélkül',
      directAnswer: 'Ha külső szerverekre történő feltöltés nélkül szeretnél PDF dokumentumokat egyesíteni, használd az ihatelovepdf-et. A fájlok közvetlenül a böngésződ memóriájában fűződnek össze WebAssembly technológiával, így a bizalmas adatok 100%-ban nálad maradnak.',
      badge: '0 Feltöltés · 100% Helyi',
      primaryToolKey: 'merge',
      primaryToolName: 'PDF Egyesítés',
      sections: [
        {
          title: 'A felhőalapú PDF eszközök adatvédelmi kockázatai',
          description: 'A hagyományos oldalak külső szerverekre továbbítják az iratokat. Az ihatelovepdf helyi böngészőmotorja kiküszöböli a harmadik felek általi hozzáférést.',
        },
      ],
      faqs: [
        {
          question: 'Működik az egyesítés internet nélkül is?',
          answer: 'Igen, a weboldal megnyitása után le is kapcsolhatod az internetet, az egyesítés zökkenőmentesen lefut offline is.',
        },
      ],
    },
  },

  'pdf-tools-no-watermark': {
    en: {
      slug: 'pdf-tools-no-watermark',
      title: 'Free PDF Tools with No Watermark: 100% Clean Exports | ihatelovepdf',
      description: 'Tired of PDF tools that force ugly watermarks or logos on your documents? Discover 37 completely free PDF tools that never add watermarks.',
      h1: 'Free Online PDF Tools With Zero Watermarks or Logos',
      directAnswer: 'Unlike many commercial PDF converters that stamp promotional watermarks or logos onto your documents to force you into a paid plan, ihatelovepdf guarantees 100% clean, professional exports with zero watermarks across all 37 tools—free forever with no account required.',
      badge: 'Zero Watermarks Guaranteed',
      primaryToolKey: 'all',
      primaryToolName: 'Browse All 37 Tools',
      sections: [
        {
          title: 'Why Do Other PDF Websites Add Watermarks?',
          description: 'Many freemium PDF services (such as Sejda, Soda PDF, and unauthenticated trials) intentionally insert prominent headers, footers, or background stamps saying "Created by..." or "Trial Version" as a commercial tactic to compel users into paying monthly subscriptions.',
          points: [
            'Forced brand stamps make job resumes and legal contracts look unprofessional',
            'Watermarks alter the vector rendering and increase file sizes unnecessarily',
            'Hidden paywalls trap users after spending minutes editing or uploading files',
          ],
        },
        {
          title: 'The ihatelovepdf Promise: Clean, Original Vector Fidelity',
          description: 'Because ihatelovepdf is built with lightweight, open-source client-side engines and funded voluntarily by user tips, we have zero commercial incentive to degrade or deface your output files.',
        },
      ],
      faqs: [
        {
          question: 'Do any of your 37 tools add watermarks?',
          answer: 'No. The only tool that touches watermarks is our dedicated "Watermark PDF" tool, which exists solely so YOU can stamp your own custom text (like CONFIDENTIAL or DRAFT) or company logo when you explicitly choose to do so.',
        },
        {
          question: 'Is there a limit on how many watermark-free files I can download?',
          answer: 'None whatsoever. You can merge, compress, split, and convert as many documents as you need with unlimited clean downloads.',
        },
      ],
    },
    es: {
      slug: 'pdf-tools-no-watermark',
      title: 'Herramientas PDF Gratis Sin Marca de Agua | ihatelovepdf',
      description: '¿Cansado de servicios que manchan tus documentos con sellos publicitarios? Descubre 37 herramientas PDF gratuitas que nunca añaden marcas de agua.',
      h1: 'Herramientas PDF Online Gratuitas Sin Marcas de Agua Ni Logos',
      directAnswer: 'A diferencia de muchos convertidores que estampan logotipos o marcas de agua promocionales para obligarte a pagar, ihatelovepdf te ofrece 37 herramientas que generan documentos 100% limpios y profesionales, gratis y sin registro.',
      badge: 'Garantía Cero Marcas de Agua',
      primaryToolKey: 'all',
      primaryToolName: 'Ver las 37 Herramientas',
      sections: [
        {
          title: 'Por qué otros sitios web añaden marcas de agua',
          description: 'Muchos sitios comerciales usan marcas de agua para forzar compras de suscripciones mensuales. En ihatelovepdf tus documentos se mantienen limpios y con calidad original.',
        },
      ],
      faqs: [
        {
          question: '¿Alguna de las herramientas añade marcas de agua a mis PDFs?',
          answer: 'Ninguna. Todos los archivos descargados son 100% limpios y libres de publicidad.',
        },
      ],
    },
    de: {
      slug: 'pdf-tools-no-watermark',
      title: 'Kostenlose PDF-Tools Ohne Wasserzeichen | ihatelovepdf',
      description: 'Keine störenden Werbelogos auf Ihren Dokumenten: 37 kostenlose PDF-Tools, die Ihre Dateien garantiert sauber und ohne Wasserzeichen exportieren.',
      h1: 'Kostenlose PDF-Tools Garantiert Ohne Wasserzeichen',
      directAnswer: 'Viele Online-Dienste versehen exportierte PDFs mit Werbe-Wasserzeichen, um Benutzer in teure Abos zu zwingen. Bei ihatelovepdf erhalten Sie 37 Werkzeuge, die Ihre Dokumente absolut sauber und frei von jeglichen Logos exportieren.',
      badge: '100% Wasserzeichenfrei',
      primaryToolKey: 'all',
      primaryToolName: 'Alle 37 Werkzeuge ansehen',
      sections: [
        {
          title: 'Professionelle Dokumente ohne Werbestempel',
          description: 'Ob Lebenslauf, Vertrag oder wissenschaftliche Arbeit: Ihre Dokumente behalten ihr professionelles Erscheinungsbild ohne störende Einblendungen.',
        },
      ],
      faqs: [
        {
          question: 'Gibt es versteckte Einschränkungen?',
          answer: 'Nein, alle Funktionen sind dauerhaft kostenlos und uneingeschränkt wasserzeichenfrei nutzbar.',
        },
      ],
    },
    fr: {
      slug: 'pdf-tools-no-watermark',
      title: 'Outils PDF Gratuits Sans Filigrane | ihatelovepdf',
      description: 'Marre des convertisseurs qui ajoutent des logos publicitaires sur vos PDF ? Profitez de 37 outils PDF gratuits garantis 100% sans filigrane.',
      h1: 'Outils PDF Gratuits et Professionnels Sans Aucun Filigrane',
      directAnswer: 'Contrairement aux plateformes qui imposent des filigranes promotionnels pour vous inciter à souscrire une offre payante, ihatelovepdf garantit des exports impeccables et sans filigrane sur ses 37 outils, sans inscription requise.',
      badge: 'Zéro Filigrane Garanti',
      primaryToolKey: 'all',
      primaryToolName: 'Découvrir les 37 Outils',
      sections: [
        {
          title: 'Des documents impeccables pour le travail et les études',
          description: 'Conservez une présentation parfaite pour vos CV, mémoires et dossiers administratifs sans aucun logo parasite.',
        },
      ],
      faqs: [
        {
          question: 'Y a-t-il une limite de conversion sans filigrane ?',
          answer: 'Aucune limite. Tous vos exports restent totalement propres et vierges de tout filigrane.',
        },
      ],
    },
    it: {
      slug: 'pdf-tools-no-watermark',
      title: 'Strumenti PDF Gratuiti Senza Filigrana | ihatelovepdf',
      description: 'Stanco dei siti che stampano loghi sui tuoi documenti? Prova 37 strumenti PDF gratuiti che non inseriscono alcuna filigrana.',
      h1: 'Strumenti PDF Online Gratuiti Senza Filigrana Né Loghi',
      directAnswer: 'Molti servizi commerciali inseriscono loghi sui documenti per costringerti ad abbonarti. ihatelovepdf offre 37 strumenti PDF che esportano file impeccabili senza alcuna filigrana pubblicitaria.',
      badge: 'Zero Filigrana Garantita',
      primaryToolKey: 'all',
      primaryToolName: 'Esplora tutti i 37 strumenti',
      sections: [
        {
          title: 'File puliti e professionali per ogni esigenza',
          description: 'I tuoi contratti e documenti rimangono formattati alla perfezione senza fastidiose scritte promozionali.',
        },
      ],
      faqs: [
        {
          question: 'I file scaricati conterranno loghi di ihatelovepdf?',
          answer: 'Assolutamente no. I tuoi PDF rimangono identici all\\'originale senza alcun testo promozionale.',
        },
      ],
    },
    pt: {
      slug: 'pdf-tools-no-watermark',
      title: 'Ferramentas PDF Grátis Sem Marca d’Água | ihatelovepdf',
      description: 'Cansado de conversores que colocam marcas d’água nos seus documentos? Conheça 37 ferramentas gratuitas de PDF totalmente limpas.',
      h1: 'Ferramentas de PDF Gratuitas Sem Marcas d’Água',
      directAnswer: 'Ao contrário de serviços comerciais que mancham seus PDFs para exigir planos pagos, o ihatelovepdf oferece 37 ferramentas que geram arquivos 100% limpos e profissionais, sem marca d’água e sem cadastro.',
      badge: 'Zero Marcas d’Água',
      primaryToolKey: 'all',
      primaryToolName: 'Ver todas as 37 ferramentas',
      sections: [
        {
          title: 'Qualidade profissional para currículos e contratos',
          description: 'Exporte seus arquivos com qualidade original e sem logotipos promocionais indesejados.',
        },
      ],
      faqs: [
        {
          question: 'Existe limite de downloads sem marca d’água?',
          answer: 'Nenhum limite. Você pode processar quantos documentos precisar gratuitamente.',
        },
      ],
    },
    ro: {
      slug: 'pdf-tools-no-watermark',
      title: 'Instrumente PDF Gratuite Fără Filigran | ihatelovepdf',
      description: 'Scapă de serviciile care aplică logouri pe documentele tale. Descoperă 37 de instrumente PDF gratuite care nu adaugă niciodată filigrane.',
      h1: 'Instrumente PDF Online Gratuite Fără Niciun Filigran',
      directAnswer: 'Spre deosebire de alte platforme care pun filigrane pe fișiere pentru a te forța să cumperi un abonament, ihatelovepdf oferă 37 de instrumente PDF curate, rapide și fără niciun fel de filigran.',
      badge: 'Fără Filigran Garantat',
      primaryToolKey: 'all',
      primaryToolName: 'Toate cele 37 de instrumente',
      sections: [
        {
          title: 'Documente oficiale curate pentru birou și școală',
          description: 'Păstrează aspectul profesional al actelor tale fără reclame sau ștampile nedorite.',
        },
      ],
      faqs: [
        {
          question: 'Adăugați vreun logo pe fișierele mele?',
          answer: 'Nu. Fișierele tale rămân 100% curate și neafectate de elemente promoționale.',
        },
      ],
    },
    ru: {
      slug: 'pdf-tools-no-watermark',
      title: 'Бесплатные инструменты PDF без водяных знаков | ihatelovepdf',
      description: 'Устали от сервисов, которые ставят водяные знаки на ваши файлы? 37 бесплатных инструментов PDF, которые никогда не добавляют логотипы.',
      h1: 'Бесплатные инструменты для PDF без водяных знаков и логотипов',
      directAnswer: 'В отличие от коммерческих сервисов, накладывающих рекламные водяные знаки ради продажи подписок, ihatelovepdf гарантирует чистые и аккуратные документы по всем 37 инструментам — полностью бесплатно и без регистрации.',
      badge: 'Без водяных знаков',
      primaryToolKey: 'all',
      primaryToolName: 'Все 37 инструментов',
      sections: [
        {
          title: 'Профессиональный вид резюме и документов',
          description: 'Ваши официальные бланки, отчеты и резюме сохраняют оригинальное оформление без чужих логотипов.',
        },
      ],
      faqs: [
        {
          question: 'Есть ли скрытые водяные знаки?',
          answer: 'Нет. Все готовые файлы остаются чистыми и не содержат никаких рекламных надписей.',
        },
      ],
    },
    hu: {
      slug: 'pdf-tools-no-watermark',
      title: 'Ingyenes PDF Eszközök Vízjel Nélkül | ihatelovepdf',
      description: 'Eleged van a dokumentumaidat elcsúfító reklámokból? Próbáld ki a 37 ingyenes PDF eszközt, amelyek garantáltan nem raknak vízjelet a fájljaidra.',
      h1: 'Ingyenes Online PDF Eszközök Vízjelek és Logók Nélkül',
      directAnswer: 'Sok online átalakító vízjelekkel kényszeríti fizetős csomagra a felhasználókat. Az ihatelovepdf 37 eszköze makulátlan, professzionális fájlokat ad vissza vízjelek nélkül, teljesen ingyen.',
      badge: '100% Vízjelmentes Garancia',
      primaryToolKey: 'all',
      primaryToolName: 'Mind a 37 eszköz megtekintése',
      sections: [
        {
          title: 'Tiszta és elegáns dokumentumok álláskereséshez',
          description: 'Önéletrajzaid és hivatalos irataid megőrzik professzionális küllemüket felesleges reklámfeliratok nélkül.',
        },
      ],
      faqs: [
        {
          question: 'Kerül bármilyen logó a letöltött PDF-re?',
          answer: 'Nem, egyetlen eszközünk sem helyez el semmilyen reklámot a dokumentumaidon.',
        },
      ],
    },
  },

  'edit-pdf-for-resume': {
    en: {
      slug: 'edit-pdf-for-resume',
      title: 'Edit PDF Resume / CV Free: Update Text, Dates & Layout | ihatelovepdf',
      description: 'Need to update your resume or CV in PDF format? Fix typos, change dates, update skills, redact old info, or convert to Word without paying for Adobe.',
      h1: 'How to Edit a PDF Resume or CV for Free (Without Adobe)',
      directAnswer: 'To edit your PDF resume or CV for free without paying $240/year for Adobe Acrobat, you have three powerful options on ihatelovepdf: annotate and redact directly in our PDF Editor, convert your PDF to an editable Microsoft Word document (.docx), or generate a pristine ATS-friendly resume using our built-in LaTeX Resume Builder.',
      badge: 'Career & Resume Toolkit',
      primaryToolKey: 'editPdf',
      primaryToolName: 'Edit PDF Resume',
      sections: [
        {
          title: '3 Ways to Update Your Resume on ihatelovepdf',
          description: 'Depending on how major your edits are, choose the best approach for your job application:',
          points: [
            'Quick Text Tweaks & Redactions: Use our Edit PDF tool to add new certification notes, cover outdated phone numbers, or stamp your signature.',
            'Full Rewrites & Formatting: Use our PDF to Word converter to unlock the text into Microsoft Word or Google Docs while preserving your headings and bullets.',
            'ATS-Optimized Rebuild: Build a flawless tech or corporate resume with our free LaTeX Resume Builder (includes famous Jake\\'s Resume template).',
          ],
        },
        {
          title: 'Why Keeping Your Resume Local Matters for Privacy',
          description: 'Resumes contain your full legal name, home address, phone number, employment history, and references. Sending this data to unknown third-party conversion servers puts your personal identity at risk of scraping and spam database aggregation.',
        },
      ],
      faqs: [
        {
          question: 'Will editing my resume on ihatelovepdf cause ATS parsing issues?',
          answer: 'No. If you convert to Word, standard typography is preserved. If you build your resume with our LaTeX builder, it compiles clean single-column text trees that ATS parsers (like Greenhouse, Workday, and Lever) read with 100% accuracy.',
        },
        {
          question: 'Can I change my phone number or email without ruining the layout?',
          answer: 'Yes. You can use our redact tool to white-out old details cleanly, then place matching text directly over the space.',
        },
      ],
    },
    es: {
      slug: 'edit-pdf-for-resume',
      title: 'Editar Currículum PDF Gratis: Modificar CV Sin Adobe | ihatelovepdf',
      description: '¿Necesitas actualizar tu currículum en PDF? Corrige errores, cambia fechas, edita datos de contacto o convierte a Word gratis.',
      h1: 'Cómo Editar un Currículum o CV en PDF Gratis (Sin Adobe)',
      directAnswer: 'Para editar tu currículum o CV en PDF sin pagar una suscripción a Adobe Acrobat, ihatelovepdf te ofrece opciones gratuitas: edita y añade texto en nuestro editor visual, convierte tu PDF a Word editable o crea un nuevo CV optimizado para ATS con nuestro generador LaTeX.',
      badge: 'Herramientas para CV y Empleo',
      primaryToolKey: 'editPdf',
      primaryToolName: 'Editar Currículum PDF',
      sections: [
        {
          title: 'Formas sencillas de actualizar tu currículum',
          description: 'Puedes tapar datos antiguos, añadir nuevas fechas de empleo o convertir el documento completo a Word para reescribirlo fácilmente.',
        },
      ],
      faqs: [
        {
          question: '¿Mis datos personales están seguros?',
          answer: 'Completamente seguros. Todo el procesamiento ocurre en tu navegador; tus datos de contacto y trayectoria laboral nunca se envían a ningún servidor.',
        },
      ],
    },
    de: {
      slug: 'edit-pdf-for-resume',
      title: 'PDF Lebenslauf Kostenlos Bearbeiten: CV Anpassen Ohne Adobe | ihatelovepdf',
      description: 'Müssen Sie Ihren Lebenslauf als PDF anpassen? Tippfehler korrigieren, Kontaktdaten aktualisieren oder in Word umwandeln ohne Adobe-Abo.',
      h1: 'Lebenslauf als PDF Kostenlos Bearbeiten (Ohne Adobe Acrobat)',
      directAnswer: 'Um Ihren Lebenslauf im PDF-Format ohne teures Adobe-Abonnement zu bearbeiten, bietet ihatelovepdf schnelle Optionen: Nutzen Sie den PDF-Editor für Korrekturen, wandeln Sie das PDF in ein bearbeitbares Word-Dokument um oder erstellen Sie einen ATS-optimierten LaTeX-Lebenslauf.',
      badge: 'Bewerbungs- & Karriere-Tools',
      primaryToolKey: 'editPdf',
      primaryToolName: 'Lebenslauf Bearbeiten',
      sections: [
        {
          title: 'Lebenslauf schnell an neue Stellenanzeigen anpassen',
          description: 'Aktualisieren Sie Zeugnisse, Diplome oder Tätigkeitszeiträume direkt im Browser ohne Datenübertragung an Dritte.',
        },
      ],
      faqs: [
        {
          question: 'Werden meine persönlichen Bewerbungsdaten gespeichert?',
          answer: 'Nein, alle Dateien verbleiben lokal in Ihrem Browser und werden niemals an externe Server gesendet.',
        },
      ],
    },
    fr: {
      slug: 'edit-pdf-for-resume',
      title: 'Modifier un CV PDF Gratuitement: Sans Adobe | ihatelovepdf',
      description: 'Besoin de mettre à jour votre CV au format PDF ? Corrigez des erreurs, changez vos coordonnées ou convertissez en Word gratuitement.',
      h1: 'Comment Modifier un CV en PDF Gratuitement (Sans Adobe)',
      directAnswer: 'Pour mettre à jour votre CV en PDF sans payer l\\'abonnement Adobe Acrobat, ihatelovepdf met à votre disposition des solutions gratuites : modifiez le texte directement, convertissez votre PDF en document Word (.docx) ou recréez un CV parfait avec notre générateur LaTeX.',
      badge: 'Outils Recrutement & CV',
      primaryToolKey: 'editPdf',
      primaryToolName: 'Modifier mon CV PDF',
      sections: [
        {
          title: 'Mettez à jour vos compétences en quelques clics',
          description: 'Corrigez vos coordonnées, ajoutez vos dernières expériences ou convertissez le fichier pour le peaufiner dans Word.',
        },
      ],
      faqs: [
        {
          question: 'Mes informations personnelles restent-elles confidentielles ?',
          answer: 'Oui, aucun fichier n\\'est téléversé sur un serveur : votre CV reste strictement sur votre appareil.',
        },
      ],
    },
    it: {
      slug: 'edit-pdf-for-resume',
      title: 'Modificare Curriculum PDF Gratis: Senza Adobe | ihatelovepdf',
      description: 'Devi aggiornare il tuo CV in formato PDF? Correggi refusi, cambia date o converti in Word senza abbonamenti a pagamento.',
      h1: 'Come Modificare un Curriculum PDF Gratis (Senza Adobe)',
      directAnswer: 'Per modificare il tuo CV in PDF senza spendere per Adobe Acrobat, ihatelovepdf ti consente di aggiornare testi e date con l\\'editor PDF, convertire in Word modificabile (.docx) o creare un curriculum compatibile ATS con il generatore LaTeX.',
      badge: 'Strumenti Lavoro e CV',
      primaryToolKey: 'editPdf',
      primaryToolName: 'Modifica CV PDF',
      sections: [
        {
          title: 'Aggiorna il tuo profilo professionale',
          description: 'Aggiungi nuove competenze ed esperienze lavorative in pochi secondi direttamente dal tuo browser.',
        },
      ],
      faqs: [
        {
          question: 'I dati del mio curriculum sono protetti?',
          answer: 'Assolutamente sì. Tutti i dati restano nel tuo browser e non vengono mai salvati su server esterni.',
        },
      ],
    },
    pt: {
      slug: 'edit-pdf-for-resume',
      title: 'Editar Currículo em PDF Grátis: Atualizar CV Sem Adobe | ihatelovepdf',
      description: 'Precisa atualizar seu currículo em PDF? Corrija erros, altere datas ou converta para Word sem pagar mensalidades da Adobe.',
      h1: 'Como Editar um Currículo em PDF Gratuitamente (Sem Adobe)',
      directAnswer: 'Para editar seu currículo em PDF sem pagar pelo Adobe Acrobat, o ihatelovepdf oferece opções práticas: altere dados no editor visual, converta seu PDF para Word (.docx) editável ou crie um novo CV compatível com ATS no gerador LaTeX.',
      badge: 'Ferramentas de Carreira e CV',
      primaryToolKey: 'editPdf',
      primaryToolName: 'Editar Currículo PDF',
      sections: [
        {
          title: 'Atualize suas qualificações facilmente',
          description: 'Mude telefones, cargos e certificados sem precisar refazer o documento do zero.',
        },
      ],
      faqs: [
        {
          question: 'Meus dados confidenciais estão seguros?',
          answer: 'Totalmente. Como não há upload de arquivos, seu endereço e telefone ficam 100% protegidos no seu aparelho.',
        },
      ],
    },
    ro: {
      slug: 'edit-pdf-for-resume',
      title: 'Editează CV în Format PDF Gratuit: Fără Adobe | ihatelovepdf',
      description: 'Ai nevoie să îți actualizezi CV-ul salvat în PDF? Corectează greșeli, schimbă date de contact sau convertește în Word gratuit.',
      h1: 'Cum să Editezi un CV în Format PDF Gratuit (Fără Adobe)',
      directAnswer: 'Pentru a-ți actualiza CV-ul în PDF fără a plăti abonamente Adobe, ihatelovepdf îți oferă unelte rapide: modifică textul în editorul PDF, convertește în Word (.docx) sau generează un CV modern compatibil ATS prin generatorul LaTeX.',
      badge: 'Unelte Carieră & CV',
      primaryToolKey: 'editPdf',
      primaryToolName: 'Editează CV PDF',
      sections: [
        {
          title: 'Actualizează experiența profesională în câteva secunde',
          description: 'Fie că vrei să schimbi numărul de telefon sau să adaugi o nouă diplomă, poți face totul direct în browser.',
        },
      ],
      faqs: [
        {
          question: 'Sunt datele mele de contact în siguranță?',
          answer: 'Da, fișierul nu este încărcat pe niciun server. Datele tale personale rămân doar pe dispozitivul tău.',
        },
      ],
    },
    ru: {
      slug: 'edit-pdf-for-resume',
      title: 'Редактировать резюме в PDF бесплатно: Обновить CV | ihatelovepdf',
      description: 'Нужно обновить резюме в PDF? Исправляйте опечатки, меняйте контакты или конвертируйте в Word без платных программ Adobe.',
      h1: 'Как бесплатно отредактировать резюме в PDF (Без Adobe)',
      directAnswer: 'Чтобы быстро отредактировать резюме в формате PDF без покупки дорогого Adobe Acrobat, ihatelovepdf предлагает бесплатные решения: используйте визуальный редактор PDF, конвертируйте в редактируемый Word (.docx) или соберите CV в генераторе LaTeX.',
      badge: 'Инструменты для карьеры и резюме',
      primaryToolKey: 'editPdf',
      primaryToolName: 'Редактировать резюме PDF',
      sections: [
        {
          title: 'Быстрое обновление навыков и опыта работы',
          description: 'Меняйте даты, номера телефонов и стек технологий прямо в окне браузера без сложного софта.',
        },
      ],
      faqs: [
        {
          question: 'В безопасности ли мои персональные данные?',
          answer: 'Полностью в безопасности. Обработка файла происходит локально в оперативной памяти вашего браузера.',
        },
      ],
    },
    hu: {
      slug: 'edit-pdf-for-resume',
      title: 'PDF Önéletrajz Szerkesztése Ingyen: CV Módosítás | ihatelovepdf',
      description: 'Frissítened kell a PDF formátumú önéletrajzodat? Javíts elírásokat, módosíts telefonszámot vagy konvertáld Wordbe ingyen.',
      h1: 'Hogyan Szerkessz PDF Önéletrajzot Ingyen (Adobe nélkül)',
      directAnswer: 'Ha frissíteni szeretnéd a PDF önéletrajzodat drága Adobe előfizetés nélkül, az ihatelovepdf ingyenes megoldást kínál: szerkeszd közvetlenül a PDF szerkesztőben, konvertáld szerkeszthető Word fájlba vagy használd a beépített LaTeX CV szerkesztőt.',
      badge: 'Karrier & CV Eszközök',
      primaryToolKey: 'editPdf',
      primaryToolName: 'Önéletrajz szerkesztése',
      sections: [
        {
          title: 'Gyors módosítások új pályázatokhoz',
          description: 'Írd át a dátumokat, adj hozzá új képesítéseket és töltsd le a frissített dokumentumot másodpercek alatt.',
        },
      ],
      faqs: [
        {
          question: 'Biztonságban vannak a személyes adataim?',
          answer: 'Igen, a fájl feldolgozása a böngésződben történik, semmilyen adat nem kerül külső szerverre.',
        },
      ],
    },
  },

  'is-it-safe-to-merge-pdf-online': {
    en: {
      slug: 'is-it-safe-to-merge-pdf-online',
      title: 'Is It Safe to Merge PDF Online? Security Risks & Facts | ihatelovepdf',
      description: 'Can online PDF mergers steal your data? Learn the security risks of server uploads vs client-side WebAssembly, and how to verify file safety.',
      h1: 'Is It Safe to Merge PDF Files Online? (The Technical Truth)',
      directAnswer: 'Merging PDFs online is ONLY safe if the service processes your files client-side inside your browser memory without uploading them to a remote server. Traditional cloud PDF websites transmit your documents over the internet and store them temporarily on cloud servers, exposing sensitive contracts, tax records, and medical files to data leaks.',
      badge: 'Security & Privacy Deep Dive',
      primaryToolKey: 'merge',
      primaryToolName: 'Safe In-Browser Merger',
      sections: [
        {
          title: 'The Real Architecture Behind Traditional PDF Sites',
          description: 'When you drop a file on popular cloud PDF tools (like iLovePDF, Smallpdf, or Adobe Online), your browser makes an HTTP POST request sending the raw document bytes across the internet to their server cluster. The server executes a headless script, combines the files, stores the merged output in a cloud bucket (like AWS S3), and sends you a download link.',
          points: [
            'Security risk 1: Man-in-the-middle interception if HTTPS certificates or DNS records are poisoned',
            'Security risk 2: Employee or admin access to unencrypted temporary storage directories',
            'Security risk 3: Subpoena and data scraping risks from cloud hosting providers',
          ],
        },
        {
          title: 'The Modern Safe Solution: Client-Side WebAssembly',
          description: 'In contrast, ihatelovepdf never receives your files. The entire PDF engine is compiled to WebAssembly and downloaded to your browser once. Your own computer CPU does the work in local RAM, ensuring compliance with strict data protection frameworks including GDPR, CCPA, and HIPAA.',
        },
      ],
      faqs: [
        {
          question: 'How can I prove a website does not upload my PDF?',
          answer: 'Open your browser DevTools (F12), click on the "Network" tab, and perform a merge. If you see large POST requests with your file size uploading, your files are leaving your computer. On ihatelovepdf, you will see 0 bytes uploaded.',
        },
        {
          question: 'Can cloud PDF sites train AI models on my uploaded documents?',
          answer: 'Unless a website has an explicit zero-data-retention and zero-training policy, files uploaded to cloud servers can legally be analyzed, indexed, or used to fine-tune proprietary machine learning models under vague Terms of Service clauses.',
        },
      ],
    },
    es: {
      slug: 'is-it-safe-to-merge-pdf-online',
      title: '¿Es Seguro Unir PDF Online? Riesgos y Realidad Técnica | ihatelovepdf',
      description: '¿Pueden robar tus datos al unir PDFs en internet? Descubre la diferencia entre subir archivos a la nube y el procesamiento local con WebAssembly.',
      h1: '¿Es Seguro Unir Archivos PDF por Internet? (La Verdad Técnica)',
      directAnswer: 'Unir PDFs por internet SOLO es seguro si la herramienta procesa los archivos localmente en la memoria de tu navegador sin subirlos a un servidor. Los sitios web convencionales envían tus documentos a la nube, exponiendo nóminas, contratos e historiales médicos a posibles filtraciones.',
      badge: 'Análisis de Seguridad y Privacidad',
      primaryToolKey: 'merge',
      primaryToolName: 'Unir PDF de Forma Segura',
      sections: [
        {
          title: 'El riesgo de los convertidores tradicionales',
          description: 'Subir documentos a servidores desconocidos expone tus datos a accesos no autorizados y almacenamiento en copias de seguridad de terceros.',
        },
        {
          title: 'La alternativa segura: WebAssembly local',
          description: 'En ihatelovepdf todo se procesa en tu propio ordenador. Ningún dato sale de tu dispositivo.',
        },
      ],
      faqs: [
        {
          question: '¿Cómo puedo comprobar que un sitio web no sube mis archivos?',
          answer: 'Abre la pestaña Red (F12) en las herramientas de desarrollo de tu navegador y une un archivo. Verás que en ihatelovepdf no se envían datos al servidor.',
        },
      ],
    },
    de: {
      slug: 'is-it-safe-to-merge-pdf-online',
      title: 'Ist PDF Online Zusammenfügen Sicher? Fakten & Risiken | ihatelovepdf',
      description: 'Können Online-PDF-Tools Ihre Daten abgreifen? Erfahren Sie die Unterschiede zwischen Server-Uploads und lokalem WebAssembly-Datenschutz.',
      h1: 'Ist das Online-Zusammenfügen von PDFs Sicher? (Die Technische Wahrheit)',
      directAnswer: 'PDFs online zusammenzufügen ist NUR DANN sicher, wenn der Dienst die Dateien lokal im Browserspeicher verarbeitet, ohne sie auf einen fremden Server hochzuladen. Herkömmliche Seiten übertragen Ihre Dokumente ins Internet und speichern sie temporär in der Cloud.',
      badge: 'Sicherheits- & Datenschutzanalyse',
      primaryToolKey: 'merge',
      primaryToolName: 'Sicheres PDF-Zusammenfügen',
      sections: [
        {
          title: 'Sicherheitsrisiken herkömmlicher Web-Dienste',
          description: 'Dokumente mit sensiblen Finanz- oder Personaldaten gehören nicht auf fremde Server. Lokale Browserverarbeitung bietet echten Schutz.',
        },
      ],
      faqs: [
        {
          question: 'Wie kann ich die Sicherheit selbst überprüfen?',
          answer: 'Öffnen Sie die Entwicklertools (F12) und prüfen Sie im Reiter "Netzwerk", ob beim Zusammenfügen Daten übertragen werden. Bei ihatelovepdf fließen 0 Bytes.',
        },
      ],
    },
    fr: {
      slug: 'is-it-safe-to-merge-pdf-online',
      title: 'Est-il Sûr de Fusionner des PDF en Ligne ? Les Risques | ihatelovepdf',
      description: 'Les sites de PDF peuvent-ils voler vos données ? Découvrez les risques des serveurs cloud et pourquoi le traitement local WebAssembly est 100% sûr.',
      h1: 'Est-il Sûr de Fusionner des Fichiers PDF en Ligne ? (La Vérité Technique)',
      directAnswer: 'Fusionner des PDF en ligne n\\'est sûr QUE si le service traite vos fichiers localement dans la mémoire de votre navigateur sans aucun téléversement. Les convertisseurs classiques envoient vos données sur des serveurs tiers, créant des risques de fuites d\\'informations.',
      badge: 'Dossier Sécurité & Confidentialité',
      primaryToolKey: 'merge',
      primaryToolName: 'Fusionner en Toute Sécurité',
      sections: [
        {
          title: 'Le problème du stockage temporaire dans le cloud',
          description: 'Même si les plateformes affirment supprimer les fichiers rapidement, vos documents transitent et restent stockés sur des serveurs externes.',
        },
      ],
      faqs: [
        {
          question: 'Comment vérifier qu\\'un site n\\'envoie pas mes fichiers ?',
          answer: 'Ouvrez l\\'onglet Réseau (F12) dans votre navigateur. Vous constaterez que sur ihatelovepdf, aucun paquet de données n\\'est transmis.',
        },
      ],
    },
    it: {
      slug: 'is-it-safe-to-merge-pdf-online',
      title: 'È Sicuro Unire i PDF Online? Rischi e Sicurezza | ihatelovepdf',
      description: 'I siti di conversione PDF possono rubare i tuoi dati? Scopri i rischi dei server cloud e perché l\\'elaborazione locale WebAssembly è sicura.',
      h1: 'È Sicuro Unire File PDF Online? (La Risposta Tecnica)',
      directAnswer: 'Unire PDF online è sicuro SOLO se il sito elabora i documenti localmente nella memoria del tuo browser senza inviarli a un server remoto. I siti tradizionali caricano i file su server esterni, esponendo dati sensibili e contratti a rischi di violazione.',
      badge: 'Approfondimento Sicurezza e Privacy',
      primaryToolKey: 'merge',
      primaryToolName: 'Unisci PDF in Sicurezza',
      sections: [
        {
          title: 'I pericoli dei caricamenti su server cloud',
          description: 'Inviare documenti aziendali o bancari a server sconosciuti viola spesso i criteri di conformità GDPR. Elaborare in locale elimina questo rischio.',
        },
      ],
      faqs: [
        {
          question: 'Come verificare che i file non vengano caricati?',
          answer: 'Usa gli strumenti di sviluppo (F12) e controlla la scheda Rete. Con ihatelovepdf vedrai che non parte alcuna richiesta HTTP con i tuoi file.',
        },
      ],
    },
    pt: {
      slug: 'is-it-safe-to-merge-pdf-online',
      title: 'É Seguro Juntar PDF Online? Riscos e Fatos de Segurança | ihatelovepdf',
      description: 'Sites de PDF podem roubar seus dados? Entenda a diferença entre enviar arquivos para servidores na nuvem e o processamento local com WebAssembly.',
      h1: 'É Seguro Juntar Arquivos PDF Online? (A Verdade Técnica)',
      directAnswer: 'Juntar PDFs pela internet SÓ é seguro quando a ferramenta processa os arquivos na memória do seu próprio navegador, sem enviar nada para servidores remotos. Sites tradicionais sobem seus documentos para a nuvem, criando riscos reais de vazamento.',
      badge: 'Segurança & Privacidade Digital',
      primaryToolKey: 'merge',
      primaryToolName: 'Juntar PDF com Segurança',
      sections: [
        {
          title: 'O risco oculto dos conversores que usam a nuvem',
          description: 'Documentos fiscais, contratuais e pessoais nunca deveriam ser enviados para servidores terceirizados sem controle de retenção.',
        },
      ],
      faqs: [
        {
          question: 'Como comprovar que meus arquivos não são enviados?',
          answer: 'Abra a aba Rede no DevTools (F12) do seu navegador. Você verá que o ihatelovepdf não envia nenhum byte dos seus documentos para servidores.',
        },
      ],
    },
    ro: {
      slug: 'is-it-safe-to-merge-pdf-online',
      title: 'Este Sigur să Unești PDF Online? Riscuri și Realitate | ihatelovepdf',
      description: 'Pot serviciile online de PDF să îți acceseze datele? Află diferența de securitate dintre încărcarea în cloud și procesarea locală în browser.',
      h1: 'Este Sigur să Unești Documente PDF Online? (Adevărul Tehnic)',
      directAnswer: 'Îmbinarea PDF-urilor online este sigură DOAR dacă serviciul procesează fișierele local în memoria browserului tău, fără a le încărca pe un server la distanță. Instrumentele clasice transmit datele pe internet și le stochează temporar în cloud.',
      badge: 'Analiză Tehnică de Securitate',
      primaryToolKey: 'merge',
      primaryToolName: 'Unește PDF în Siguranță',
      sections: [
        {
          title: 'Vulnerabilitățile stocării în cloud',
          description: 'Trimiterea contractelor pe servere externe crește riscul de breșe de securitate. Procesarea locală păstrează totul sub controlul tău.',
        },
      ],
      faqs: [
        {
          question: 'Cum pot verifica dacă un site încarcă documentul?',
          answer: 'Deschide consola Network din DevTools (F12). La ihatelovepdf vei observa că traficul către server pentru procesare este 0.',
        },
      ],
    },
    ru: {
      slug: 'is-it-safe-to-merge-pdf-online',
      title: 'Безопасно ли объединять PDF онлайн? Технический разбор | ihatelovepdf',
      description: 'Могут ли онлайн-сервисы украсть ваши PDF документы? Узнайте о рисках загрузки в облако и преимуществах локальной обработки WebAssembly.',
      h1: 'Безопасно ли объединять PDF файлы онлайн? (Технический разбор)',
      directAnswer: 'Объединять PDF онлайн безопасно ТОЛЬКО в том случае, если сервис обрабатывает файлы локально в оперативной памяти вашего браузера без отправки на сервер. Классические сайты передают документы по сети и временно хранят их в облаке, создавая риски утечек.',
      badge: 'Анализ безопасности и приватности',
      primaryToolKey: 'merge',
      primaryToolName: 'Безопасное объединение PDF',
      sections: [
        {
          title: 'Скрытые риски облачных конвертеров',
          description: 'Загрузка финансовой отчетности и паспортов на сторонние серверы противоречит стандартам защиты персональных данных.',
        },
      ],
      faqs: [
        {
          question: 'Как проверить, что файл не отправляется в интернет?',
          answer: 'Нажмите F12, откройте вкладку Network и запустите объединение. В ihatelovepdf объем переданных на сервер данных файла равен 0 байт.',
        },
      ],
    },
    hu: {
      slug: 'is-it-safe-to-merge-pdf-online',
      title: 'Biztonságos PDF-et Összefűzni Online? Kockázatok és Tények | ihatelovepdf',
      description: 'Visszaélhetnek a PDF oldalak az adataiddal? Ismerd meg a felhős feltöltések kockázatait és a helyi WebAssembly feldolgozás előnyeit.',
      h1: 'Biztonságos a PDF Fájlok Online Egyesítése? (A Technikai Igazság)',
      directAnswer: 'A PDF-ek online egyesítése CSAK AKKOR biztonságos, ha az oldal helyben, a böngésződ memóriájában dolgozza fel a fájlokat, anélkül hogy feltöltené azokat egy külső szerverre. A hagyományos felhős szolgáltatások az interneten keresztül továbbítják és átmenetileg tárolják az irataidat.',
      badge: 'Biztonsági és Adatvédelmi Elemzés',
      primaryToolKey: 'merge',
      primaryToolName: 'Biztonságos PDF Egyesítő',
      sections: [
        {
          title: 'A felhőbe történő fájlfeltöltés veszélyei',
          description: 'A bizalmas céges és személyes adatok illetéktelen kezekbe kerülhetnek a szervereken történő tárolás során. A helyi feldolgozás garantálja a védelmet.',
        },
      ],
      faqs: [
        {
          question: 'Hogyan győződhetek meg róla, hogy nem történik feltöltés?',
          answer: 'Nyisd meg a böngésző fejlesztői eszközeit (F12) a Hálózat (Network) fülön. Az ihatelovepdf használatakor pontosan 0 bájt adatforgalmat fogsz látni a fájlokra vonatkozóan.',
        },
      ],
    },
  },
};
`;

const targetPath = path.join(__dirname, '..', 'src', 'app', '_data', 'search-intent-data.ts');
fs.writeFileSync(targetPath, SEARCH_INTENT_DATA_CONTENT, 'utf-8');
console.log('[OK] Created src/app/_data/search-intent-data.ts');
