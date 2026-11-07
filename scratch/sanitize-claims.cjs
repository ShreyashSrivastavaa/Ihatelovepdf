const fs = require('fs');
const path = require('path');

function sanitizeOperationsCatalog() {
  const filePath = path.resolve(__dirname, '../src/i18n/operations-catalog.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  // Titles
  content = content.replace(/No Watermark, Works Offline/g, 'No Watermark, Runs in Browser');
  content = content.replace(/No Sign-Up, Works Offline/g, 'No Sign-Up, Runs in Browser');

  // Bullet points
  content = content.replace(/Works offline & no sign-up required/g, 'Runs in your browser & no sign-up required');
  content = content.replace(/Works offline & no sign-up/g, 'Runs in your browser & no sign-up');

  // Descriptions
  content = content.replace(/Works offline in browser with unlimited merges\./g, 'Runs directly in your browser with unlimited merges.');
  content = content.replace(/works offline, and offers unlimited compression\./g, 'runs in your browser, and offers unlimited compression.');
  content = content.replace(/works offline with unlimited tasks\./g, 'runs in your browser with unlimited tasks.');
  content = content.replace(/Fast, private, and works offline\./g, 'Fast, private, and runs in your browser.');
  content = content.replace(/Unlimited tasks, works offline\./g, 'Unlimited tasks, runs in your browser.');
  content = content.replace(/Unlimited tasks, works offline in your browser\./g, 'Unlimited tasks, runs in your browser.');
  content = content.replace(/Works offline and unlimited\./g, 'Runs in your browser with unlimited tasks.');
  content = content.replace(/Works offline with unlimited signatures\./g, 'Runs in your browser with unlimited signatures.');
  content = content.replace(/Fast, private, works offline, and unlimited\./g, 'Fast, private, runs in your browser, and unlimited.');
  content = content.replace(/Works offline\./g, 'Runs in your browser.');

  // Legal claims
  content = content.replace(/title: 'GDPR & HIPAA Compliance', description: 'Zero cloud interaction guarantees zero data exposure during redaction\.'/g,
    "title: 'Local Device Isolation', description: 'Your documents are processed on your device and are never sent to our servers.'");

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Sanitized operations-catalog.ts');
}

function sanitizeComparisonsData() {
  const filePath = path.resolve(__dirname, '../src/app/_data/comparisons-data.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  // English
  content = content.replace(
    /ourSite: 'Works offline once cached as a Progressive Web App \(PWA\) with zero internet needed\.'/g,
    "ourSite: 'Runs entirely in your browser; keeps working without an active internet connection once the page has loaded.'"
  );

  // Spanish
  content = content.replace(
    /ourSite: 'Funciona sin conexión una vez cargada la aplicación en el navegador con WebAssembly\.'/g,
    "ourSite: 'Se ejecuta en tu navegador y sigue funcionando sin conexión una vez cargada la página.'"
  );

  // German
  content = content.replace(
    /ourSite: 'Funktioniert offline als Progressive Web App \(PWA\) im Browser-Cache\.'/g,
    "ourSite: 'Läuft vollständig in Ihrem Browser und funktioniert nach dem Laden der Seite auch ohne Internetverbindung.'"
  );

  // French
  content = content.replace(
    /ourSite: 'Fonctionne hors ligne une fois mise en cache comme Progressive Web App \(PWA\)\.'/g,
    "ourSite: 'S’exécute entièrement dans votre navigateur et continue de fonctionner sans connexion une fois la page chargée.'"
  );

  // Italian
  content = content.replace(
    /ourSite: 'Funziona offline se memorizzato nella cache PWA del browser\.'/g,
    "ourSite: 'Viene eseguito interamente nel browser e continua a funzionare senza connessione dopo il caricamento della pagina.'"
  );

  // Portuguese
  content = content.replace(
    /ourSite: 'Funciona offline em cache como Progressive Web App \(PWA\)\.'/g,
    "ourSite: 'Executa diretamente no seu navegador e continua funcionando sem conexão após a página ser carregada.'"
  );

  // Romanian
  content = content.replace(
    /ourSite: 'Funcționează offline salvat în memoria cache ca Progressive Web App \(PWA\)\.'/g,
    "ourSite: 'Rulează direct în browser și continuă să funcționeze fără conexiune odată ce pagina a fost încărcată.'"
  );

  // Russian
  content = content.replace(
    /ourSite: 'Работает офлайн после первой загрузки как Progressive Web App \(PWA\)\.'/g,
    "ourSite: 'Работает прямо в браузере и продолжает функционировать без интернета после загрузки страницы.'"
  );

  // Hungarian
  content = content.replace(
    /ourSite: 'Offline is működik a böngésző gyorsítótárából mint Progressive Web App \(PWA\)\.'/g,
    "ourSite: 'Közvetlenül a böngészőben fut, és az oldal betöltése után internetkapcsolat nélkül is működik.'"
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Sanitized comparisons-data.ts');
}

function sanitizeFaqs() {
  const faqsDir = path.resolve(__dirname, '../src/i18n/dictionaries');
  
  // English
  const enFaqPath = path.join(faqsDir, 'en/faqs.ts');
  if (fs.existsSync(enFaqPath)) {
    let c = fs.readFileSync(enFaqPath, 'utf8');
    c = c.replace(/question:\s*"Does ihatelovepdf comply with privacy regulations \(GDPR, HIPAA, LGPD\)\?",\s*answer:\s*"Yes\. Because no document data is ever collected, stored, or sent to external servers, ihatelovepdf keeps your information private according to GDPR, HIPAA, and LGPD standards\."/g,
      'question: "Are my documents sent to any external server?",\n      answer:\n        "No. Your documents are processed on your device and are never sent to our servers."');
    fs.writeFileSync(enFaqPath, c, 'utf8');
    console.log('Sanitized en/faqs.ts');
  }

  // German
  const deFaqPath = path.join(faqsDir, 'de/faqs.ts');
  if (fs.existsSync(deFaqPath)) {
    let c = fs.readFileSync(deFaqPath, 'utf8');
    c = c.replace(/question:\s*"Erfüllt ihatelovepdf die Anforderungen der DSGVO\?",\s*answer:\s*"Ja\. Da keine Dokumentendaten gesammelt, gespeichert oder an externe Server übertragen werden, entspricht ihatelovepdf von Natur aus den strengen Vorgaben der DSGVO\."/g,
      'question: "Werden meine Dokumente an einen Server gesendet?",\n      answer:\n        "Nein. Ihre Dokumente werden direkt auf Ihrem Gerät verarbeitet und niemals an unsere Server gesendet."');
    fs.writeFileSync(deFaqPath, c, 'utf8');
    console.log('Sanitized de/faqs.ts');
  }

  // Spanish
  const esFaqPath = path.join(faqsDir, 'es/faqs.ts');
  if (fs.existsSync(esFaqPath)) {
    let c = fs.readFileSync(esFaqPath, 'utf8');
    c = c.replace(/question:\s*"¿ihatelovepdf cumple con el RGPD europeo de protección de datos\?",\s*answer:\s*"Sí\. Al procesarse todos los documentos localmente en tu navegador, ihatelovepdf cumple de forma nativa con el RGPD ya que ningún dato sale de tu dispositivo\."/g,
      'question: "¿Mis documentos se envían a algún servidor externo?",\n      answer:\n        "No. Tus documentos se procesan directamente en tu dispositivo y nunca se envían a nuestros servidores."');
    fs.writeFileSync(esFaqPath, c, 'utf8');
    console.log('Sanitized es/faqs.ts');
  }

  // French
  const frFaqPath = path.join(faqsDir, 'fr/faqs.ts');
  if (fs.existsSync(frFaqPath)) {
    let c = fs.readFileSync(frFaqPath, 'utf8');
    c = c.replace(/question:\s*"ihatelovepdf est-il conforme au RGPD et à la protection des données \?",\s*answer:\s*"Oui\. Étant donné qu'aucune donnée de document n'est collectée, stockée ou transmise vers des serveurs distants, ihatelovepdf respecte naturellement le RGPD et les politiques de confidentialité des entreprises\."/g,
      'question: "Mes documents sont-ils envoyés à un serveur externe ?",\n      answer:\n        "Non. Vos documents sont traités sur votre appareil et ne sont jamais envoyés à nos serveurs."');
    fs.writeFileSync(frFaqPath, c, 'utf8');
    console.log('Sanitized fr/faqs.ts');
  }

  // Portuguese
  const ptFaqPath = path.join(faqsDir, 'pt/faqs.ts');
  if (fs.existsSync(ptFaqPath)) {
    let c = fs.readFileSync(ptFaqPath, 'utf8');
    c = c.replace(/question:\s*"O ihatelovepdf cumpre com as normas de privacidade como a LGPD e o GDPR\?",\s*answer:\s*"Sim\. Como nenhum dado de documento é coletado, armazenado ou enviado para servidores remotos, o ihatelovepdf atende nativamente à LGPD, GDPR e políticas corporativas de privacidade\."/g,
      'question: "Os meus documentos são enviados para algum servidor externo?",\n      answer:\n        "Não. Os seus documentos são processados no seu dispositivo e nunca são enviados para os nossos servidores."');
    fs.writeFileSync(ptFaqPath, c, 'utf8');
    console.log('Sanitized pt/faqs.ts');
  }

  // Italian
  const itFaqPath = path.join(faqsDir, 'it/faqs.ts');
  if (fs.existsSync(itFaqPath)) {
    let c = fs.readFileSync(itFaqPath, 'utf8');
    c = c.replace(/question:\s*"ihatelovepdf rispetta il regolamento GDPR sulla protezione dei dati\?",\s*answer:\s*"Sì\. Poiché nessun documento lascia il tuo dispositivo, ihatelovepdf rispetta nativamente il GDPR e le policy di privacy aziendali e della pubblica amministrazione\."/g,
      'question: "I miei documenti vengono inviati a server esterni?",\n      answer:\n        "No. I tuoi documenti vengono elaborati direttamente sul tuo dispositivo e non vengono mai inviati ai nostri server."');
    fs.writeFileSync(itFaqPath, c, 'utf8');
    console.log('Sanitized it/faqs.ts');
  }

  // Romanian
  const roFaqPath = path.join(faqsDir, 'ro/faqs.ts');
  if (fs.existsSync(roFaqPath)) {
    let c = fs.readFileSync(roFaqPath, 'utf8');
    c = c.replace(/Deoarece procesarea are loc local, nicio dată personală nu părăsește organizația ta\. Acest lucru facilitează respectarea GDPR, HIPAA sau a oricărei politici interne de confidențialitate\./g,
      'Documentele dumneavoastră sunt procesate pe dispozitivul dumneavoastră și nu sunt trimise niciodată către serverele noastre.');
    fs.writeFileSync(roFaqPath, c, 'utf8');
    console.log('Sanitized ro/faqs.ts');
  }

  // Russian
  const ruFaqPath = path.join(faqsDir, 'ru/faqs.ts');
  if (fs.existsSync(ruFaqPath)) {
    let c = fs.readFileSync(ruFaqPath, 'utf8');
    c = c.replace(/question:\s*"Соответствует ли ihatelovepdf стандартам GDPR и защите данных\?",\s*answer:\s*"Да\. Поскольку данные документов никогда не передаются на серверы, ihatelovepdf полностью соответствует принципам защиты данных\."/g,
      'question: "Отправляются ли мои документы на какой-либо сервер?",\n      answer:\n        "Нет. Ваши документы обрабатываются на вашем устройстве и никогда не отправляются на наши серверы."');
    fs.writeFileSync(ruFaqPath, c, 'utf8');
    console.log('Sanitized ru/faqs.ts');
  }

  // Hungarian
  const huFaqPath = path.join(faqsDir, 'hu/faqs.ts');
  if (fs.existsSync(huFaqPath)) {
    let c = fs.readFileSync(huFaqPath, 'utf8');
    c = c.replace(/question:\s*"Segít a ihatelovepdf megfelelni a GDPR adatvédelmi előírásoknak\?",\s*answer:\s*"Mivel a feldolgozás helyben történik, egyetlen személyes dokumentum sem hagyja el az eszközödet vagy a szervezetedet\. Ez megkönnyíti a GDPR, az egészségügyi adatvédelmi szabályok, illetve a belső adatbiztonsági irányelveknek való megfelelést\."/g,
      'question: "Elküldi az oldal a dokumentumaimat külső szerverre?",\n      answer:\n        "Nem. A dokumentumaid feldolgozása a saját eszközödön történik, és soha nem kerülnek elküldésre a szervereinkre."');
    fs.writeFileSync(huFaqPath, c, 'utf8');
    console.log('Sanitized hu/faqs.ts');
  }
}

function sanitizeOfflinePageAndBlog() {
  const offlinePath = path.resolve(__dirname, '../src/app/(en)/offline-pdf-tools/page.tsx');
  if (fs.existsSync(offlinePath)) {
    let c = fs.readFileSync(offlinePath, 'utf8');
    c = c.replace(/Because files never travel over the network, offline client-side processing eliminates data-in-transit interception, third-party cloud data leaks, and compliance violations under GDPR and HIPAA\./g,
      'Because files never travel over the network, client-side processing keeps your documents on your device, eliminating data-in-transit interception and third-party cloud exposure.');
    fs.writeFileSync(offlinePath, c, 'utf8');
    console.log('Sanitized offline-pdf-tools/page.tsx');
  }

  const blogPath = path.resolve(__dirname, '../src/app/_data/blog-data.ts');
  if (fs.existsSync(blogPath)) {
    let c = fs.readFileSync(blogPath, 'utf8');
    c = c.replace(/Are client-side tools compliant with GDPR and HIPAA\?/g, 'Are documents ever uploaded to remote servers?');
    c = c.replace(/Uploading confidential discovery materials or medical records to third-party cloud servers violates confidentiality obligations under HIPAA, GDPR, and attorney-client privilege\. Because I Hate Love PDF executes redactions locally on your computer, your privileged materials never touch external networks\./g,
      'Your documents are processed on your device and are never sent to our servers. Because ihatelovepdf executes all redactions locally on your computer, your private files never touch external networks.');
    fs.writeFileSync(blogPath, c, 'utf8');
    console.log('Sanitized blog-data.ts');
  }

  const faqDataPath = path.resolve(__dirname, '../src/app/_data/faq-data.ts');
  if (fs.existsSync(faqDataPath)) {
    let c = fs.readFileSync(faqDataPath, 'utf8');
    c = c.replace(/question:\s*"¿ihatelovepdf cumple con el RGPD europeo\?",\s*answer:\s*"Sí, al procesar todos los documentos localmente en tu navegador, ihatelovepdf garantiza el cumplimiento del RGPD ya que no almacenamos ni tratamos tus PDFs en servidores externos\."/g,
      'question: "¿Mis documentos se envían a algún servidor externo?",\n    answer: "No. Tus documentos se procesan directamente en tu dispositivo y nunca se envían a nuestros servidores."');
    fs.writeFileSync(faqDataPath, c, 'utf8');
    console.log('Sanitized faq-data.ts');
  }
}

function sanitizeLocalizedGuides() {
  const guidesPath = path.resolve(__dirname, '../src/app/_data/localized-guides-data.ts');
  if (fs.existsSync(guidesPath)) {
    let c = fs.readFileSync(guidesPath, 'utf8');
    // Replace GDPR/DSGVO/RGPD/LGPD mentions
    c = c.replace(/Essential for legal disclosures, medical records, financial statements, and GDPR compliance\./g,
      'Your documents are processed on your device and are never sent to our servers.');
    c = c.replace(/Zero uploads para a nuvem: tranquilidade e conformidade com a LGPD\./g,
      'Seus documentos são processados no seu dispositivo e nunca são enviados para nossos servidores.');
    c = c.replace(/Essencial para processos judiciais, exames médicos e conformidade com a LGPD\./g,
      'Seus documentos são processados no seu dispositivo e nunca são enviados para nossos servidores.');
    c = c.replace(/DSGVO-konforme Datensicherheit: Überprüfen Sie im Netzwerk-Tab der Entwicklertools, dass kein einziges Byte Ihrer Dokumente Ihren Computer verlässt\./g,
      'Ihre Dokumente werden auf Ihrem Gerät verarbeitet und niemals an unsere Server gesendet.');
    c = c.replace(/100% DSGVO-sicher: Ihre Dokumente verlassen zu keinem Zeitpunkt Ihr Gerät\./g,
      'Ihre Dokumente werden auf Ihrem Gerät verarbeitet und niemals an unsere Server gesendet.');
    c = c.replace(/Datenschutz nach DSGVO: Keine Datenweitergabe an Drittanbieter oder Server\./g,
      'Ihre Dokumente werden auf Ihrem Gerät verarbeitet und niemals an unsere Server gesendet.');
    c = c.replace(/Wichtig für Gerichtsgutachten, medizinische Berichte und DSGVO-Konformität\./g,
      'Ihre Dokumente werden auf Ihrem Gerät verarbeitet und niemals an unsere Server gesendet.');
    c = c.replace(/Höchster DSGVO-Datenschutz: Keine Übermittlung Ihrer vertraulichen Unterlagen an Server\./g,
      'Ihre Dokumente werden auf Ihrem Gerät verarbeitet und niemals an unsere Server gesendet.');
    c = c.replace(/DSGVO-konforme Verarbeitung: Keine Übermittlung Ihrer Dateien an externe Server\./g,
      'Ihre Dokumente werden auf Ihrem Gerät verarbeitet und niemals an unsere Server gesendet.');
    c = c.replace(/DSGVO-konforme Verarbeitung: Keine Übermittlung Ihrer Geschäftsdaten an externe Server\./g,
      'Ihre Dokumente werden auf Ihrem Gerät verarbeitet und niemals an unsere Server gesendet.');
    c = c.replace(/Indispensable pour les pièces de justice, dossiers médicaux et conformité RGPD\./g,
      'Vos documents sont traités sur votre appareil et ne sont jamais envoyés à nos serveurs.');
    c = c.replace(/Conformité stricte RGPD : vérifiez dans l'onglet Réseau qu'aucun octet ne quitte votre ordinateur\./g,
      'Vos documents sont traités sur votre appareil et ne sont jamais envoyés à nos serveurs.');
    c = c.replace(/Confidentialité totale RGPD : vos fichiers ne quittent jamais votre machine\./g,
      'Vos documents sont traités sur votre appareil et ne sont jamais envoyés à nos serveurs.');
    c = c.replace(/Massima conformità alla privacy e al GDPR: controlla la scheda Rete degli strumenti per sviluppatori per verificare zero byte inviati al server\./g,
      'I tuoi documenti vengono elaborati sul tuo dispositivo e non vengono mai inviati ai nostri server.');
    c = c.replace(/Riservatezza assoluta GDPR: i tuoi file non lasciano mai il tuo dispositivo\./g,
      'I tuoi documenti vengono elaborati sul tuo dispositivo e non vengono mai inviati ai nostri server.');
    c = c.replace(/Indispensabile per atti giudiziari, cartelle cliniche e conformità al GDPR\./g,
      'I tuoi documenti vengono elaborati sul tuo dispositivo e non vengono mai inviati ai nostri server.');
    c = c.replace(/Confidențialitate conformă GDPR: verifică în fila Rețea din DevTools că niciun octet nu părăsește computerul\./g,
      'Documentele dumneavoastră sunt procesate pe dispozitivul dumneavoastră și nu sunt trimise niciodată către serverele noastre.');
    c = c.replace(/Confidențialitate absolută GDPR: fișierele tale nu părăsesc niciodată dispozitivul\./g,
      'Documentele dumneavoastră sunt procesate pe dispozitivul dumneavoastră și nu sunt trimise niciodată către serverele noastre.');
    c = c.replace(/Esențial pentru dosare juridice, fișe medicale și conformitate cu normele GDPR\./g,
      'Documentele dumneavoastră sunt procesate pe dispozitivul dumneavoastră și nu sunt trimise niciodată către serverele noastre.');
    c = c.replace(/100% GDPR-megfelelőség: a dokumentumaid egyetlen pillanatra sem hagyják el az eszközödet\./g,
      'A dokumentumaid feldolgozása a saját eszközödön történik, és soha nem kerülnek elküldésre a szervereinkre.');
    c = c.replace(/Teljes GDPR-adatvédelem: a fájlok soha nem hagyják el a gépedet\./g,
      'A dokumentumaid feldolgozása a saját eszközödön történik, és soha nem kerülnek elküldésre a szervereinkre.');
    c = c.replace(/Nélkülözhetetlen bírósági beadványokhoz, orvosi leletekhez és a GDPR-megfelelőséghez\./g,
      'A dokumentumaid feldolgozása a saját eszközödön történik, és soha nem kerülnek elküldésre a szervereinkre.');
    
    fs.writeFileSync(guidesPath, c, 'utf8');
    console.log('Sanitized localized-guides-data.ts');
  }
}

function sanitizeLlms() {
  const llmsPath = path.resolve(__dirname, '../public/llms.txt');
  if (fs.existsSync(llmsPath)) {
    let c = fs.readFileSync(llmsPath, 'utf8');
    c = c.replace(/- \*\*Privacy by Design\*\*: HIPAA, GDPR, and confidentiality-compliant by physics—no servers receive, store, or process files\./g,
      '- **Document Isolation**: Your documents are processed on your device and are never sent to our servers.');
    c = c.replace(/- \*\*Offline Capable\*\*: Works offline or with unstable internet connections once loaded\./g,
      '- **Runs in Browser**: Keeps working without an internet connection once the page has loaded.');
    c = c.replace(/0 requests/g, 'zero document uploads');
    c = c.replace(/no tracking/g, 'no document uploads');
    c = c.replace(/no personal tracking/g, 'no document uploads');
    fs.writeFileSync(llmsPath, c, 'utf8');
    console.log('Sanitized public/llms.txt');
  }

  const llmsFullPath = path.resolve(__dirname, '../public/llms-full.txt');
  if (fs.existsSync(llmsFullPath)) {
    let c = fs.readFileSync(llmsFullPath, 'utf8');
    c = c.replace(/\|\s*\*\*Offline Functionality\*\*\s*\|\s*\*\*Yes \(PWA & Cached\)\*\*\s*\|/g,
      '| **Connection Dependency** | **Runs in browser (No server needed)** |');
    c = c.replace(/  - \*\*GDPR\*\*: Compliant by architecture\. No personal data controller or processor servers exist for document content\./g,
      '  - **Document Privacy**: Your documents are processed on your device and are never sent to our servers.');
    c = c.replace(/### Q4: Can ihatelovepdf be used offline\?\r?\nYes\. Once the web application assets are cached by the browser, operations that do not require external resources run completely offline without an active internet connection\./g,
      '### Q4: Does ihatelovepdf require an internet connection to process files?\nNo server connection is required to process files. Once the page is loaded in your browser, all document operations execute locally in memory via WebAssembly.');
    c = c.replace(/0 requests/g, 'zero document uploads');
    c = c.replace(/no tracking/g, 'no document uploads');
    c = c.replace(/no personal tracking/g, 'no document uploads');
    fs.writeFileSync(llmsFullPath, c, 'utf8');
    console.log('Sanitized public/llms-full.txt');
  }
}

sanitizeOperationsCatalog();
sanitizeComparisonsData();
sanitizeFaqs();
sanitizeOfflinePageAndBlog();
sanitizeLocalizedGuides();
sanitizeLlms();
console.log('=== ALL CLAIMS SANITIZATION COMPLETED ===');

