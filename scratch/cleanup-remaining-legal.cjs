const fs = require('fs');
const path = require('path');

// 1. public/llms-full.txt
const llmsFullPath = path.resolve(__dirname, '../public/llms-full.txt');
if (fs.existsSync(llmsFullPath)) {
  let c = fs.readFileSync(llmsFullPath, 'utf8');
  c = c.replace(/  - \*\*HIPAA\*\*: Safe for protected health information \(PHI\) because files never leave the local workstation\.\r?\n?/g, '');
  fs.writeFileSync(llmsFullPath, c, 'utf8');
  console.log('Cleaned llms-full.txt');
}

// 2. src/app/_data/search-intent-data.ts
const searchIntentPath = path.resolve(__dirname, '../src/app/_data/search-intent-data.ts');
if (fs.existsSync(searchIntentPath)) {
  let c = fs.readFileSync(searchIntentPath, 'utf8');
  c = c.replace(/'Corporate compliance violations under GDPR Article 28 and HIPAA data controller mandates'/g,
    "'Exposure of confidential contracts, financial sheets, and sensitive personal files'");
  c = c.replace(/Die meisten Online-PDF-Tools übertragen sensible Firmendokumente auf fremde Server\. ihatelovepdf verarbeitet alles lokal auf Ihrem Computer gemäß DSGVO\./g,
    'Die meisten Online-PDF-Tools übertragen sensible Firmendokumente auf fremde Server. Bei ihatelovepdf werden Ihre Dokumente direkt auf Ihrem Gerät verarbeitet und niemals an unsere Server gesendet.');
  c = c.replace(/In contrast, ihatelovepdf never receives your files\. The entire PDF engine is compiled to WebAssembly and downloaded to your browser once\. Your own computer CPU does the work in local RAM, ensuring compliance with strict data protection frameworks including GDPR, CCPA, and HIPAA\./g,
    'In contrast, ihatelovepdf never receives your files. The entire PDF engine is compiled to WebAssembly and downloaded to your browser once. Your own computer CPU does the work in local RAM, ensuring your documents are processed on your device and are never sent to our servers.');
  c = c.replace(/Inviare documenti aziendali o bancari a server sconosciuti viola spesso i criteri di conformità GDPR\. Elaborare in locale elimina questo rischio\./g,
    'Inviare documenti aziendali o bancari a server sconosciuti comporta rischi di riservatezza. I tuoi documenti vengono elaborati sul tuo dispositivo e non vengono mai inviati ai nostri server.');
  fs.writeFileSync(searchIntentPath, c, 'utf8');
  console.log('Cleaned search-intent-data.ts');
}

// 3. src/app/_data/localized-guides-data.ts
const guidesPath = path.resolve(__dirname, '../src/app/_data/localized-guides-data.ts');
if (fs.existsSync(guidesPath)) {
  let c = fs.readFileSync(guidesPath, 'utf8');
  c = c.replace(/Conformità GDPR garantita: i tuoi contratti e dati bancari non lasciano mai il tuo browser\./g,
    'I tuoi documenti vengono elaborati sul tuo dispositivo e non vengono mai inviati ai nostri server.');
  c = c.replace(/Essenziale per atti giudiziari, cartelle cliniche e conformità al GDPR\./g,
    'I tuoi documenti vengono elaborati sul tuo dispositivo e non vengono mai inviati ai nostri server.');
  c = c.replace(/Esențial pentru dosare judiciare, fise medicale și conformitate GDPR\./g,
    'Documentele dumneavoastră sunt procesate pe dispozitivul dumneavoastră și nu sunt trimise niciodată către serverele noastre.');
  c = c.replace(/Nélkülözhetetlen bírósági iratokhoz, orvosi leletekhez és GDPR megfeleléshez\./g,
    'A dokumentumaid feldolgozása a saját eszközödön történik, és soha nem kerülnek elküldésre a szervereinkre.');
  c = c.replace(/Privacy conforme alle normative europee: zero byte inviati al di fuori del browser\./g,
    'I tuoi documenti vengono elaborati sul tuo dispositivo e non vengono mai inviati ai nostri server.');
  c = c.replace(/Privacy conforme alle normative: nessun dato visuale viene trasmesso in rete\./g,
    'I tuoi documenti vengono elaborati sul tuo dispositivo e non vengono mai inviati ai nostri server.');
  c = c.replace(/Privacy conforme alle norme europee: nessun byte viene inviato in rete\./g,
    'I tuoi documenti vengono elaborati sul tuo dispositivo e non vengono mai inviati ai nostri server.');
  fs.writeFileSync(guidesPath, c, 'utf8');
  console.log('Cleaned localized-guides-data.ts');
}

// 4. src/i18n/dictionaries/hu/faqs.ts
const huFaqsPath = path.resolve(__dirname, '../src/i18n/dictionaries/hu/faqs.ts');
if (fs.existsSync(huFaqsPath)) {
  let c = fs.readFileSync(huFaqsPath, 'utf8');
  c = c.replace(/\{\s*question:\s*"Segít a ihatelovepdf megfelelni a GDPR.*?\}\s*\},/s,
    '{\n      question: "Elküldi az oldal a dokumentumaimat külső szerverre?",\n      answer:\n        "Nem. A dokumentumaid feldolgozása a saját eszközödön történik, és soha nem kerülnek elküldésre a szervereinkre."\n    },');
  fs.writeFileSync(huFaqsPath, c, 'utf8');
  console.log('Cleaned hu/faqs.ts');
}

// 5. src/lib/tool-faqs.ts
const toolFaqsPath = path.resolve(__dirname, '../src/lib/tool-faqs.ts');
if (fs.existsSync(toolFaqsPath)) {
  let c = fs.readFileSync(toolFaqsPath, 'utf8');
  c = c.replace(/question: 'Is this redaction tool legally compliant for confidential documents\?',\s*answer: 'Yes\. Unlike online cloud redactors that may send documents to unknown servers, ihatelovepdf permanently burns redactions into pixels directly on your computer\. No sensitive data leaves your device\.'/g,
    "question: 'Are my confidential documents protected during redaction?',\n      answer: 'Yes. Your documents are processed on your device and are never sent to our servers. All redactions permanently burn pixels directly inside your web browser.'");
  fs.writeFileSync(toolFaqsPath, c, 'utf8');
  console.log('Cleaned tool-faqs.ts');
}

// 6. src/i18n/dictionaries/fr/operations.ts
const frOpsPath = path.resolve(__dirname, '../src/i18n/dictionaries/fr/operations.ts');
if (fs.existsSync(frOpsPath)) {
  let c = fs.readFileSync(frOpsPath, 'utf8');
  c = c.replace(/Évitez les téléchargements sur serveur et les fuites de données afin de vous conformer aux politiques de confidentialité internes sans effort\./g,
    'Vos documents sont traités sur votre appareil et ne sont jamais envoyés à nos serveurs.');
  fs.writeFileSync(frOpsPath, c, 'utf8');
  console.log('Cleaned fr/operations.ts');
}

