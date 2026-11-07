// scratch/guides-defs/guides-1-to-5.cjs
// Guides 1 to 5: merge, compress, split, pdfToWord, wordToPdf

module.exports = [
  {
    slug: 'how-to-merge-pdf-files',
    opKey: 'merge',
    category: 'Organization',
    readTime: '3 min read',
    en: {
      h1: 'How to Merge PDF Files for Free Without Uploading?',
      title: 'How to Merge PDF Files for Free Online (Zero Uploads) | ihatelovepdf',
      metaDescription: 'Combine multiple PDF files into one document in your browser for free. No file size limits, no server uploads, no watermarks, and no registration required.',
      directAnswer: 'To merge PDF files for free without uploading, open the ihatelovepdf Merge tool, drag and drop two or more PDF documents into your browser, reorder the page thumbnails as desired, and click "Merge PDF". The combined file compiles locally in your browser memory via WebAssembly and downloads instantly.',
      toolName: 'Merge PDF Online',
      keyTakeaways: [
        '100% in-browser processing via WebAssembly keeps your documents completely private.',
        'No file size caps, page count restrictions, or daily merge quotas.',
        'Preserves original vector typography, bookmarks, internal links, and embedded images.',
        'Drag-and-drop thumbnail organizer lets you arrange documents in any sequence.'
      ],
      steps: [
        { title: 'Open the Merge PDF Tool', text: 'Navigate to the ihatelovepdf Merge PDF tool in any modern desktop or mobile web browser.' },
        { title: 'Add Your PDF Files', text: 'Drag and drop multiple PDF documents into the drop zone, or click to select files from your local storage.' },
        { title: 'Arrange Document Order', text: 'Drag document cards horizontally to adjust the order in which pages will be combined.' },
        { title: 'Merge & Download Instantly', text: 'Click "Merge PDF". The tool compiles the files locally and triggers your download with zero watermarks.' }
      ],
      commonProblems: [
        { problem: 'One of my PDF files is password-protected and will not merge.', solution: 'Encrypted or password-locked PDFs cannot be read until unlocked. Remove the password using your PDF viewer or our Unlock tool before merging.' },
        { problem: 'The merged PDF has inconsistent page orientations.', solution: 'Use our Rotate tool to align landscape and portrait pages before or after merging to ensure uniform reading.' }
      ],
      faqs: [
        { question: 'Is merging PDF files on ihatelovepdf safe for sensitive files?', answer: 'Yes. Unlike traditional cloud converters, ihatelovepdf processes your files entirely inside your web browser via WebAssembly. Your documents are never uploaded to any remote server or cloud database.' },
        { question: 'Is there a limit on how many PDF files I can merge at once?', answer: 'There is no artificial limit. You can merge as many documents as your device memory (RAM) can comfortably hold, completely free.' },
        { question: 'Will the merged PDF lose bookmarks or vector quality?', answer: 'No. Vector fonts, high-resolution illustrations, and embedded metadata structures are preserved without re-compression or rasterization.' }
      ],
      privacyNote: 'ihatelovepdf executes all PDF merging logic locally inside your browser runtime. Inspect the Network tab in your browser developer tools to verify that zero file bytes leave your computer.',
      relatedTools: [
        { slug: 'split', name: 'Split PDF', description: 'Extract specific pages or break a PDF into individual files.' },
        { slug: 'compress', name: 'Compress PDF', description: 'Reduce the file size of your newly merged PDF for email.' },
        { slug: 'reorder', name: 'Organize Pages', description: 'Rearrange, duplicate, or delete individual pages.' }
      ]
    },
    es: {
      h1: '¿Cómo unir archivos PDF gratis sin subirlos a un servidor?',
      title: 'Cómo Unir Archivos PDF Gratis Online (Sin Subir Archivos) | ihatelovepdf',
      metaDescription: 'Combina varios archivos PDF en uno solo directamente en tu navegador. Gratis, sin límites de tamaño, sin subir documentos, sin marcas de agua y sin registro.',
      directAnswer: 'Para unir archivos PDF gratis sin subirlos a un servidor, abre la herramienta Unir PDF de ihatelovepdf, arrastra dos o más documentos a la ventana, organiza el orden de las páginas según tus necesidades y pulsa "Unir PDF". La combinación se realiza en la memoria de tu navegador y se descarga al instante.',
      toolName: 'Unir PDF Online',
      keyTakeaways: [
        'Procesamiento 100% en tu navegador con WebAssembly: tus documentos nunca salen de tu equipo.',
        'Sin límite de tamaño de archivo, sin límite de páginas y sin cuotas diarias.',
        'Mantiene intactas las fuentes vectoriales, marcadores, enlaces e imágenes en alta resolución.',
        'Organizador visual para ordenar documentos antes de unirlos.'
      ],
      steps: [
        { title: 'Abre la herramienta Unir PDF', text: 'Entra en la herramienta Unir PDF de ihatelovepdf desde cualquier navegador de ordenador o móvil.' },
        { title: 'Añade tus documentos PDF', text: 'Arrastra y suelta dos o más archivos PDF en el recuadro, o haz clic para elegirlos de tu disco local.' },
        { title: 'Organiza el orden de los archivos', text: 'Arrastra las tarjetas de los documentos para colocarlos en el orden exacto en que deben unirse.' },
        { title: 'Une y descarga al instante', text: 'Haz clic en "Unir PDF". El archivo consolidado se genera en tu dispositivo y se descarga sin marcas de agua.' }
      ],
      commonProblems: [
        { problem: 'Uno de los archivos PDF está protegido con contraseña.', solution: 'Los archivos protegidos no pueden combinarse directamente. Desbloquea el archivo previamente antes de añadirlo a la herramienta.' },
        { problem: 'Las páginas combinadas tienen diferente orientación.', solution: 'Utiliza nuestra herramienta Rotar PDF para alinear páginas horizontales y verticales antes o después de la unión.' }
      ],
      faqs: [
        { question: '¿Es seguro unir documentos confidenciales en ihatelovepdf?', answer: 'Completamente seguro. A diferencia de otros conversores online, tus archivos nunca se suben a ningún servidor. Todo el procesamiento ocurre en la memoria RAM de tu navegador.' },
        { question: '¿Existe algún límite en la cantidad de PDFs que puedo unir?', answer: 'No hay restricciones arbitrarias. Puedes combinar tantos documentos como la memoria de tu dispositivo permita, sin registros ni pagos.' },
        { question: '¿Añade marcas de agua al documento final?', answer: 'No. El documento generado está 100% libre de marcas de agua o firmas publicitarias.' }
      ],
      privacyNote: 'ihatelovepdf ejecuta la unión de archivos PDF directamente en el cliente. Puedes comprobar en la pestaña Red (Network) de las herramientas de desarrollo que no se envía ningún byte a servidores externos.',
      relatedTools: [
        { slug: 'dividir', name: 'Dividir PDF', description: 'Separa páginas o extrae intervalos de un archivo PDF.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Reduce el peso del PDF combinado para enviarlo por correo.' },
        { slug: 'reorder', name: 'Organizar Páginas', description: 'Reordena, duplica o elimina páginas individuales.' }
      ]
    },
    pt: {
      h1: 'Como juntar arquivos PDF grátis sem fazer upload no servidor?',
      title: 'Como Juntar Arquivos PDF Grátis Online (Sem Upload) | ihatelovepdf',
      metaDescription: 'Combine vários documentos PDF em um único arquivo no seu navegador. Grátis, sem limites de tamanho, sem enviar arquivos para a nuvem e sem marca d\'água.',
      directAnswer: 'Para juntar arquivos PDF grátis sem fazer upload, acerte a ferramenta Juntar PDF do ihatelovepdf, arraste dois ou mais arquivos para o navegador, organize a sequência das páginas e clique em "Juntar PDF". A fusão ocorre na memória local do seu computador ou celular e o download inicia na hora.',
      toolName: 'Juntar PDF Online',
      keyTakeaways: [
        'Processamento 100% no navegador: seus arquivos confidenciais nunca saem do seu aparelho.',
        'Sem limites de tamanho de arquivo, sem cadastro e sem taxas.',
        'Preserva fontes vetoriais nítidas, sumários e imagens de alta qualidade.',
        'Organização visual intuitiva para reordenar páginas antes de juntar.'
      ],
      steps: [
        { title: 'Acesse a ferramenta Juntar PDF', text: 'Abra a ferramenta no ihatelovepdf pelo navegador no computador ou smartphone.' },
        { title: 'Selecione seus arquivos PDF', text: 'Arraste e solte múltiplos arquivos PDF na área indicada ou selecione do seu armazenamento local.' },
        { title: 'Ordene a sequência dos documentos', text: 'Arraste os cartões dos arquivos para definir a ordem final das páginas.' },
        { title: 'Junte e baixe imediatamente', text: 'Clique em "Juntar PDF". O arquivo único é gerado localmente e baixado sem marcas d\'água.' }
      ],
      commonProblems: [
        { problem: 'Um dos arquivos PDF tem senha.', solution: 'PDFs criptografados precisam ter a senha removida antes da junção com nossa ferramenta de desbloqueio.' },
        { problem: 'Páginas em orientações mistas (retrato e paisagem).', solution: 'Ajuste a rotação das páginas antes ou depois de mesclar com a ferramenta Girar PDF.' }
      ],
      faqs: [
        { question: 'É seguro juntar PDFs com dados bancários ou contratos?', answer: 'Sim. Todo o processamento é feito no seu próprio dispositivo através de WebAssembly. Nenhum documento é enviado para a internet.' },
        { question: 'Existe limite de arquivos ou páginas?', answer: 'Não impomos limites artificiais. Você pode unir quantos arquivos desejar de forma totalmente gratuita.' },
        { question: 'O documento final tem marca d\'água?', answer: 'Não. Os PDFs gerados são totalmente limpos, sem qualquer marca d\'água.' }
      ],
      privacyNote: 'No ihatelovepdf seus dados nunca saem da sua máquina. Você pode inspecionar a aba Network das ferramentas de desenvolvedor e constatar zero uploads.',
      relatedTools: [
        { slug: 'dividir', name: 'Dividir PDF', description: 'Extraia páginas ou separe um PDF em vários documentos.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Diminua o tamanho do arquivo PDF para facilitar o envio.' },
        { slug: 'reorder', name: 'Organizar Páginas', description: 'Mude a ordem das páginas do seu documento livremente.' }
      ]
    },
    de: {
      h1: 'Wie kann man PDF-Dateien kostenlos ohne Server-Upload zusammenfügen?',
      title: 'PDF zusammenfügen kostenlos ohne Server-Upload | ihatelovepdf',
      metaDescription: 'Kombinieren Sie mehrere PDF-Dateien direkt im Browser zu einem Dokument. Kostenlos, ohne Dateigrößenbeschränkung, ohne Upload und ohne Wasserzeichen.',
      directAnswer: 'Um PDF-Dateien ohne Server-Upload kostenlos zusammenzufügen, öffnen Sie das Tool "PDF zusammenfügen" auf ihatelovepdf, ziehen Sie zwei oder mehr Dokumente in den Browser, ordnen Sie die Seiten wie gewünscht an und klicken Sie auf "PDF zusammenfügen". Die Datei wird lokal im Arbeitsspeicher erstellt und sofort heruntergeladen.',
      toolName: 'PDF zusammenfügen',
      keyTakeaways: [
        '100% lokale Verarbeitung im Browser via WebAssembly schützt vertrauliche Dokumente.',
        'Keine Dateigrößenlimits, keine Seitenbeschränkungen und keine Registrierungspflicht.',
        'Erhält Vektorschriften, Lesezeichen, interne Links und Grafiken in Originalqualität.',
        'Visuelle Vorschau zur einfachen Sortierung der Dokumente vor dem Zusammenführen.'
      ],
      steps: [
        { title: 'Tool aufrufen', text: 'Öffnen Sie das ihatelovepdf-Tool "PDF zusammenfügen" in Ihrem Webbrowser.' },
        { title: 'PDF-Dateien hinzufügen', text: 'Ziehen Sie mehrere PDF-Dateien per Drag-and-Drop in den Arbeitsbereich oder wählen Sie diese aus.' },
        { title: 'Reihenfolge festlegen', text: 'Verschieben Sie die Vorschaublöcke mit der Maus in die gewünschte Seitenabfolge.' },
        { title: 'Zusammenfügen & Herunterladen', text: 'Klicken Sie auf "PDF zusammenfügen". Das fertige Dokument wird ohne Wasserzeichen sofort gespeichert.' }
      ],
      commonProblems: [
        { problem: 'Eine PDF-Datei ist passwortgeschützt.', solution: 'Gesperrte PDF-Dateien müssen vor dem Zusammenführen mit dem entsprechenden Passwort entsperrt werden.' },
        { problem: 'Unterschiedliche Seitenausrichtungen (Hoch- und Querformat).', solution: 'Nutzen Sie unser Tool "PDF drehen", um Seiten vorab einheitlich auszurichten.' }
      ],
      faqs: [
        { question: 'Werden meine Daten auf fremde Server übertragen?', answer: 'Nein. Im Gegensatz zu herkömmlichen Cloud-Diensten verarbeitet ihatelovepdf alle Daten direkt lokal in Ihrem Webbrowser.' },
        { question: 'Gibt es eine Beschränkung der Dateianzahl?', answer: 'Nein. Sie können so viele Dokumente zusammenfügen, wie Ihr lokaler Arbeitsspeicher verarbeiten kann.' },
        { question: 'Werden Wasserzeichen hinzugefügt?', answer: 'Nein. Ihre Dokumente bleiben vollkommen sauber und unberührt.' }
      ],
      privacyNote: 'DSGVO-konforme Datensicherheit: Überprüfen Sie im Netzwerk-Tab der Entwicklertools, dass kein einziges Byte Ihrer Dokumente Ihren Computer verlässt.',
      relatedTools: [
        { slug: 'teilen', name: 'PDF teilen', description: 'Trennen Sie einzelne Seiten oder Seitenbereiche heraus.' },
        { slug: 'komprimieren', name: 'PDF komprimieren', description: 'Reduzieren Sie die Dateigröße für den E-Mail-Versand.' },
        { slug: 'reorder', name: 'Seiten sortieren', description: 'Bringen Sie Seiten eines PDFs in die richtige Reihenfolge.' }
      ]
    },
    fr: {
      h1: 'Comment fusionner des fichiers PDF gratuitement sans téléversement ?',
      title: 'Fusionner des PDF Gratuitement en Ligne (Sans Envoi Serveur) | ihatelovepdf',
      metaDescription: 'Assemblez plusieurs documents PDF en un seul fichier directement dans votre navigateur. Gratuit, sans limite de taille, sans téléversement et sans filigrane.',
      directAnswer: 'Pour fusionner des fichiers PDF gratuitement sans les envoyer sur un serveur, ouvrez l\'outil Fusionner PDF d\'ihatelovepdf, glissez-déposez plusieurs fichiers dans la fenêtre, réorganisez les pages et cliquez sur "Fusionner les PDF". Le document final est assemblé localement dans la mémoire de votre navigateur.',
      toolName: 'Fusionner PDF en ligne',
      keyTakeaways: [
        'Traitement 100% local dans votre navigateur : vos fichiers confidentiels restent chez vous.',
        'Aucune restriction de taille de fichier, aucun compte requis et aucun filigrane.',
        'Conserve la typographie vectorielle, les signets et la netteté des illustrations.',
        'Interface visuelle simple pour réorganiser les documents avant l\'assemblage.'
      ],
      steps: [
        { title: 'Ouvrir l\'outil Fusionner PDF', text: 'Accédez à l\'outil Fusionner PDF sur ihatelovepdf depuis votre navigateur habituel.' },
        { title: 'Ajouter les fichiers PDF', text: 'Glissez-déposez vos fichiers PDF dans la zone dédiée ou sélectionnez-les sur votre disque.' },
        { title: 'Organiser l\'ordre des documents', text: 'Faites glisser les vignettes pour déterminer l\'ordre exact d\'apparition des pages.' },
        { title: 'Fusionner et télécharger', text: 'Cliquez sur "Fusionner les PDF" pour générer votre fichier assemblé sans aucun filigrane.' }
      ],
      commonProblems: [
        { problem: 'Un des fichiers PDF est protégé par mot de passe.', solution: 'Les documents protégés doivent être déverrouillés avant de pouvoir être assemblés.' },
        { problem: 'Orientation des pages mixte (portrait et paysage).', solution: 'Utilisez l\'outil Faire pivoter pour aligner vos pages avant la fusion.' }
      ],
      faqs: [
        { question: 'Est-il sécurisé de fusionner des documents professionnels ici ?', answer: 'Absolument. Vos documents ne sont jamais transférés sur des serveurs distants. Tout s\'exécute localement dans votre navigateur via WebAssembly.' },
        { question: 'Y a-t-il une limite sur le nombre de pages ?', answer: 'Non. Vous pouvez assembler autant de fichiers que la mémoire vive de votre appareil le permet.' },
        { question: 'Le service ajoute-t-il un logo ou filigrane ?', answer: 'Non. Vos documents restent 100% propres et fidèles aux originaux.' }
      ],
      privacyNote: 'Conformité totale avec la vie privée : inspectez l\'onglet Réseau des outils de développement de votre navigateur pour constater qu\'aucun fichier n\'est téléversé.',
      relatedTools: [
        { slug: 'diviser', name: 'Diviser PDF', description: 'Extrayez des pages ou scindez un PDF en plusieurs documents.' },
        { slug: 'compresser', name: 'Compresser PDF', description: 'Réduisez la taille de votre PDF assemblé pour l\'envoyer par e-mail.' },
        { slug: 'reorder', name: 'Organiser les pages', description: 'Changez l\'ordre des pages de votre fichier PDF.' }
      ]
    },
    it: {
      h1: 'Come unire file PDF gratis senza caricare documenti sul server?',
      title: 'Unire PDF Gratis Online Senza Caricare File | ihatelovepdf',
      metaDescription: 'Combina più file PDF in un unico documento direttamente nel tuo browser. Gratis, senza limiti di dimensione, senza caricamento sui server e senza filigrane.',
      directAnswer: 'Per unire file PDF gratis senza inviare documenti a un server esterno, apri lo strumento Unisci PDF di ihatelovepdf, trascina due o più documenti nella finestra, riordina le miniature secondo le tue esigenze e fai clic su "Unisci PDF". L\'elaborazione avviene nella memoria RAM locale.',
      toolName: 'Unisci PDF Online',
      keyTakeaways: [
        'Elaborazione 100% in-browser tramite WebAssembly: privacy totale garantita.',
        'Nessun limite di dimensione, nessuna registrazione obbligatoria e nessuna filigrana.',
        'Mantiene font vettoriali nitidi, segnalibri e immagini ad alta risoluzione.',
        'Organizzazione visiva intuitiva per disporre i file nell\'ordine desiderato.'
      ],
      steps: [
        { title: 'Apri lo strumento Unisci PDF', text: 'Accedi allo strumento Unisci PDF su ihatelovepdf dal tuo browser preferito.' },
        { title: 'Aggiungi i tuoi documenti', text: 'Trascina i file PDF nell\'area di caricamento o cercali sul tuo dispositivo.' },
        { title: 'Ordina i documenti', text: 'Sposta le schede dei file per definire l\'ordine in cui saranno uniti.' },
        { title: 'Unisci e scarica subito', text: 'Fai clic su "Unisci PDF" e salva il documento combinato privo di qualsiasi filigrana.' }
      ],
      commonProblems: [
        { problem: 'Un file PDF richiede una password di sblocco.', solution: 'I file protetti da password devono essere sbloccati prima di procedere con l\'unione.' },
        { problem: 'Pagine orientate sia in verticale che in orizzontale.', solution: 'Ruota le pagine non allineate con il nostro strumento Ruota PDF prima di procedere.' }
      ],
      faqs: [
        { question: 'I miei documenti personali vengono caricati su internet?', answer: 'No. Nessun dato lascia il tuo dispositivo. La conversione avviene interamente nel tuo browser.' },
        { question: 'Ci sono limiti al numero di PDF unibili?', answer: 'Non ci sono limiti di pagina o di dimensione imposti dalla piattaforma.' },
        { question: 'Vengono aggiunte filigrane promozionali?', answer: 'No, i documenti rimangono identici all\'originale senza alcun watermark.' }
      ],
      privacyNote: 'Massima conformità alla privacy e al GDPR: controlla la scheda Rete degli strumenti per sviluppatori per verificare zero byte inviati al server.',
      relatedTools: [
        { slug: 'dividi', name: 'Dividi PDF', description: 'Estrai pagine specifiche o separa un documento in più parti.' },
        { slug: 'comprimi', name: 'Comprimi PDF', description: 'Riduci le dimensioni del file unito per inviarlo via email.' },
        { slug: 'reorder', name: 'Organizza Pagine', description: 'Modifica liberamente l\'ordine delle pagine del tuo PDF.' }
      ]
    },
    ro: {
      h1: 'Cum să unești fișiere PDF gratuit fără încărcare pe server?',
      title: 'Unește PDF Gratuit Online Fără Încărcare pe Server | ihatelovepdf',
      metaDescription: 'Combină mai multe documente PDF într-un singur fișier direct în browserul tău. Gratuit, fără limite de dimensiune, fără încărcare pe server și fără filigran.',
      directAnswer: 'Pentru a uni fișiere PDF gratuit fără a le încărca pe un server, deschide instrumentul Unește PDF de pe ihatelovepdf, trage două sau mai multe documente în pagină, aranjează ordinea paginilor și apasă pe "Unește PDF". Fișierul este generat local în memoria browserului și se descarcă imediat.',
      toolName: 'Unește PDF Online',
      keyTakeaways: [
        'Procesare 100% în browser prin WebAssembly: documentele tale rămân strict private.',
        'Fără limite de dimensiune, fără cont obligatoriu și fără costuri ascunse.',
        'Păstrează claritatea fonturilor vectoriale, semnele de carte și imaginile originale.',
        'Aranjare vizuală simplă pentru a stabili ordinea documentelor înainte de unire.'
      ],
      steps: [
        { title: 'Deschide instrumentul Unește PDF', text: 'Accesează instrumentul Unește PDF din ihatelovepdf în orice browser modern.' },
        { title: 'Adaugă fișierele PDF', text: 'Trage și plasează fișierele PDF în zona de lucru sau alege-le din memoria dispozitivului.' },
        { title: 'Aranjează ordinea paginilor', text: 'Trage cardurile documentelor pentru a stabili succesiunea dorită a paginilor.' },
        { title: 'Unește și descarcă', text: 'Apasă pe "Unește PDF". Documentul final se descarcă instantaneu fără filigrane.' }
      ],
      commonProblems: [
        { problem: 'Unul dintre fișiere este protejat cu parolă.', solution: 'Documentele protejate trebuie deblocate înainte de a putea fi îmbinate.' },
        { problem: 'Paginile au orientări diferite (portret și peisaj).', solution: 'Folosește instrumentul Rotește PDF pentru a alinia corect paginile înainte de unire.' }
      ],
      faqs: [
        { question: 'Este sigur să unesc documente confidențiale pe ihatelovepdf?', answer: 'Da, absolut. Spre deosebire de alte site-uri, ihatelovepdf nu încarcă niciun document pe servere externe. Totul rulează local în browserul tău.' },
        { question: 'Există o limită privind numărul de fișiere combinate?', answer: 'Nu există nicio limită impusă. Poți combina oricâte fișiere permite memoria dispozitivului tău.' },
        { question: 'Se adaugă filigrane pe fișierul descărcat?', answer: 'Nu. Fișierele rezultate sunt 100% curate, fără niciun fel de filigran.' }
      ],
      privacyNote: 'Securitate conformă cu confidențialitatea strictă: poți verifica în fila Rețea a consolei de dezvoltator că nu se transmit date către servere.',
      relatedTools: [
        { slug: 'divide', name: 'Divide PDF', description: 'Extrage pagini individuale sau împarte documentul în mai multe părți.' },
        { slug: 'comprima', name: 'Comprimă PDF', description: 'Micșorează dimensiunea fișierului rezultat pentru trimitere pe email.' },
        { slug: 'reorder', name: 'Organizează Paginile', description: 'Schimbă ordinea paginilor din document după bunul plac.' }
      ]
    },
    ru: {
      h1: 'Как объединить файлы PDF бесплатно без загрузки на сервер?',
      title: 'Объединить PDF онлайн бесплатно без загрузки на сервер | ihatelovepdf',
      metaDescription: 'Соединяйте несколько документов PDF в один файл прямо в браузере. Бесплатно, без ограничений по размеру, без передачи файлов на сервер и без водяных знаков.',
      directAnswer: 'Чтобы бесплатно объединить файлы PDF без отправки на сервер, откройте инструмент «Объединить PDF» на ihatelovepdf, перетащите два или более документа в окно браузера, настройте порядок страниц и нажмите кнопку «Объединить PDF». Файл собирается локально в памяти вашего устройства и мгновенно скачивается.',
      toolName: 'Объединить PDF онлайн',
      keyTakeaways: [
        '100% обработка в браузере с помощью WebAssembly гарантирует полную конфиденциальность.',
        'Без ограничений по размеру файлов, количеству страниц и без регистрации.',
        'Сохраняет векторный текст, закладки, гиперссылки и четкость графики.',
        'Удобная визуальная сортировка документов перед финальным объединением.'
      ],
      steps: [
        { title: 'Откройте инструмент «Объединить PDF»', text: 'Перейдите на страницу инструмента в любом современном браузере на ПК или смартфоне.' },
        { title: 'Добавьте нужные файлы PDF', text: 'Перетащите несколько файлов PDF в окно или выберите их с локального диска.' },
        { title: 'Настройте порядок страниц', text: 'Перемещайте карточки документов мышью, чтобы расположить их в нужной последовательности.' },
        { title: 'Объедините и скачайте', text: 'Нажмите «Объединить PDF». Готовый файл загрузится на ваше устройство без водяных знаков.' }
      ],
      commonProblems: [
        { problem: 'Один из файлов защищен паролем.', solution: 'Зашифрованные PDF-документы необходимо предварительно разблокировать перед объединением.' },
        { problem: 'Разная ориентация страниц (книжная и альбомная).', solution: 'Используйте инструмент «Повернуть PDF», чтобы выровнять ориентацию страниц.' }
      ],
      faqs: [
        { question: 'Безопасно ли объединять конфиденциальные документы?', answer: 'Полностью безопасно. Ваши файлы никуда не отправляются и обрабатываются исключительно в оперативной памяти вашего браузера.' },
        { question: 'Есть ли ограничения по размеру или числу файлов?', answer: 'Никаких искусственных ограничений нет. Вы можете соединять столько файлов, сколько позволяет память вашего устройства.' },
        { question: 'Добавляются ли водяные знаки?', answer: 'Нет. Созданный документ остается чистым и не содержит водяных знаков или рекламы.' }
      ],
      privacyNote: 'Полная гарантия приватности: откройте вкладку Network в панели разработчика браузера и убедитесь, что передача файлов на сторонние серверы отсутствует.',
      relatedTools: [
        { slug: 'razdelit', name: 'Разделить PDF', description: 'Извлеките нужные страницы или разбейте документ на отдельные файлы.' },
        { slug: 'szhat', name: 'Сжать PDF', description: 'Уменьшите размер итогового PDF для удобной отправки по почте.' },
        { slug: 'reorder', name: 'Упорядочить страницы', description: 'Изменяйте порядок страниц, удаляйте или добавляйте новые.' }
      ]
    },
    hu: {
      h1: 'Hogyan egyesíthet PDF fájlokat ingyen, szerverre feltöltés nélkül?',
      title: 'PDF egyesítése ingyen online (Feltöltés nélkül) | ihatelovepdf',
      metaDescription: 'Egyesítsen több PDF dokumentumot egyetlen fájlba közvetlenül a böngészőjében. Ingyenes, méretkorlátok, szerverre feltöltés és vízjelek nélkül.',
      directAnswer: 'A PDF fájlok ingyenes és feltöltés nélküli egyesítéséhez nyissa meg az ihatelovepdf PDF összefűzés eszközét, húzzon be két vagy több dokumentumot, állítsa be az oldalak kívánt sorrendjét, majd kattintson a "PDF egyesítése" gombra. A fájl helyben a böngésző memóriájában készül el.',
      toolName: 'PDF összefűzése online',
      keyTakeaways: [
        '100% helyi böngészős feldolgozás WebAssembly segítségével: a fájlok az Ön gépén maradnak.',
        'Nincsenek méretkorlátok, napi korlátok vagy kötelező regisztráció.',
        'Megőrzi a vektorgrafikát, a könyvjelzőket és az éles betűtípusokat.',
        'Vizuális előnézet a dokumentumok tetszőleges sorrendbe állításához.'
      ],
      steps: [
        { title: 'Nyissa meg a PDF egyesítése eszközt', text: 'Keresse fel az eszközt az ihatelovepdf felületén bármely modern böngészőben.' },
        { title: 'Húzza be a kívánt PDF fájlokat', text: 'Húzzon be több PDF dokumentumot a kijelölt területre vagy válassza ki őket a meghajtóról.' },
        { title: 'Rendezze el a dokumentumok sorrendjét', text: 'Húzza át a kártyákat az oldalak kívánt végső sorrendjének beállításához.' },
        { title: 'Egyesítés és azonnali letöltés', text: 'Kattintson a "PDF egyesítése" gombra, és a vízjelmentes dokumentum azonnal letöltődik.' }
      ],
      commonProblems: [
        { problem: 'Az egyik PDF jelszóval védett.', solution: 'A titkosított fájlok egyesítése előtt el kell távolítani a jelszavas védelmet.' },
        { problem: 'Vegyes álló és fekvő tájolású oldalak.', solution: 'A forgatás eszközzel állítsa egységesre az oldalakat az összefűzés előtt.' }
      ],
      faqs: [
        { question: 'Biztonságos a bizalmas PDF-ek egyesítése?', answer: 'Igen, maximálisan. A fájlok nem kerülnek feltöltésre semmilyen külső szerverre; minden művelet a saját böngészőjében zajlik.' },
        { question: 'Van-e korlátozás az összefűzhető fájlok számára?', answer: 'Nincs mesterséges korlát. Annyi dokumentumot fűzhet össze, amennyit az eszköze memóriája elbír.' },
        { question: 'Kerül-e vízjel az elkészült PDF-re?', answer: 'Nem. A letöltött dokumentum teljesen tiszta, vízjelek nélküli marad.' }
      ],
      privacyNote: 'Garantált adatvédelem: a böngésző fejlesztői eszközeinek Network fülén ellenőrizheti, hogy egyetlen bájt sem kerül továbbításra külső szerverek felé.',
      relatedTools: [
        { slug: 'szetbontas', name: 'PDF szétbontása', description: 'Válasszon szét oldalakat vagy hozzon létre különálló dokumentumokat.' },
        { slug: 'tomoriteni', name: 'PDF tömörítése', description: 'Csökkentse a fájlméretet a könnyebb e-mailes továbbításhoz.' },
        { slug: 'reorder', name: 'Oldalak rendezése', description: 'Változtassa meg az oldalak sorrendjét tetszés szerint.' }
      ]
    }
  },

  // 2. Compress PDF
  {
    slug: 'how-to-compress-pdf-without-losing-quality',
    opKey: 'compress',
    category: 'Optimization',
    readTime: '4 min read',
    en: {
      h1: 'How to Compress PDF Without Losing Quality for Free?',
      title: 'Compress PDF Online Free Without Losing Quality (Zero Uploads) | ihatelovepdf',
      metaDescription: 'Reduce PDF file size for email or web forms while preserving crisp text and sharp images. 100% private in-browser compression without uploading files.',
      directAnswer: 'To compress a PDF without losing quality, upload your file into the ihatelovepdf Compress PDF tool, select the Medium or Recommended compression preset, and click "Compress PDF". Our client-side engine strips unneeded metadata and re-packs streams in your browser RAM, giving you a lightweight file without blurry text.',
      toolName: 'Compress PDF Online',
      keyTakeaways: [
        'Intelligent stream optimization preserves vector typography and sharp line art.',
        'Choose from Low, Medium, or Strong presets tailored for email limits.',
        'Calculates real-time byte savings before you download.',
        '100% private: large files never travel across the internet.'
      ],
      steps: [
        { title: 'Access the Compress Tool', text: 'Open the Compress PDF tool in ihatelovepdf from any device.' },
        { title: 'Upload Your Document', text: 'Drag and drop your large PDF into the designated area.' },
        { title: 'Choose Compression Level', text: 'Select "Medium" for the best balance between small file size and crisp image quality.' },
        { title: 'Download the Compressed File', text: 'Click "Compress PDF" and download your reduced file in seconds.' }
      ],
      commonProblems: [
        { problem: 'The file size barely changed after compression.', solution: 'If your PDF contains already highly compressed JPEG images or raw vector paths, further reduction may be minimal. Try the Strong compression preset.' },
        { problem: 'Text looks slightly blurry on high-zoom monitors.', solution: 'Switch to the "Low Compression / High Quality" preset to preserve maximum raster resolution.' }
      ],
      faqs: [
        { question: 'Will compressing my PDF make text blurry?', answer: 'No. Our engine optimizes internal PDF object streams and embedded raster photos while leaving vector typography untouched.' },
        { question: 'Is there a file size upload limit?', answer: 'Because files are processed directly in your device memory rather than on a remote server, you can compress files of 100MB, 500MB, or more without upload timeouts.' },
        { question: 'Can I compress scanned invoices and receipts?', answer: 'Yes. The compressor intelligently downsamples high-DPI scanned imagery to fit standard 150 DPI or 96 DPI screen and email limits.' }
      ],
      privacyNote: 'Your PDF stays entirely inside your browser sandbox. No file data is sent to external cloud storage or third-party servers.',
      relatedTools: [
        { slug: 'merge', name: 'Merge PDF', description: 'Combine documents before optimizing size.' },
        { slug: 'split', name: 'Split PDF', description: 'Extract oversized sections into smaller individual files.' },
        { slug: 'pdf-to-images', name: 'PDF to Images', description: 'Convert PDF pages to optimized JPEG or PNG images.' }
      ]
    },
    es: {
      h1: '¿Cómo comprimir un PDF sin perder calidad y gratis?',
      title: 'Comprimir PDF Gratis Sin Perder Calidad (Sin Subir Archivos) | ihatelovepdf',
      metaDescription: 'Reduce el peso de tus archivos PDF para enviar por correo o formularios web manteniendo el texto nítido. Compresión privada en tu navegador.',
      directAnswer: 'Para comprimir un PDF sin perder calidad, entra en la herramienta Comprimir PDF de ihatelovepdf, selecciona el nivel de compresión Medio o Recomendado y haz clic en "Comprimir PDF". El motor cliente optimiza flujos de datos y metadatos en tu memoria RAM sin pixelar el texto.',
      toolName: 'Comprimir PDF Online',
      keyTakeaways: [
        'Optimización inteligente que conserva la nitidez de fuentes vectoriales.',
        'Niveles de compresión personalizables (Baja, Media y Fuerte).',
        'Muestra el porcentaje exacto de espacio ahorrado antes de guardar.',
        'Privacidad absoluta: los archivos grandes nunca viajan por internet.'
      ],
      steps: [
        { title: 'Abre la herramienta Comprimir PDF', text: 'Accede a la herramienta en ihatelovepdf desde cualquier navegador.' },
        { title: 'Sube tu documento', text: 'Arrastra el archivo PDF pesado al recuadro principal.' },
        { title: 'Elige el nivel de compresión', text: 'Selecciona "Media" para obtener el equilibrio perfecto entre peso reducido y calidad visual.' },
        { title: 'Descarga tu PDF optimizado', text: 'Pulsa "Comprimir PDF" y guarda tu archivo ligero al instante.' }
      ],
      commonProblems: [
        { problem: 'El archivo redujo muy poco su tamaño.', solution: 'Si el PDF ya contiene imágenes muy comprimidas, prueba con el modo de compresión Fuerte.' },
        { problem: 'Las imágenes pierden definición al imprimir.', solution: 'Utiliza el perfil de compresión Baja para mantener una resolución fotográfica más alta.' }
      ],
      faqs: [
        { question: '¿El texto del PDF perderá nitidez?', answer: 'No. Las fuentes tipográficas y vectores no se rasterizan, por lo que se mantienen 100% nítidos a cualquier nivel de zoom.' },
        { question: '¿Existe límite de megabytes para comprimir?', answer: 'No. Al ejecutarse directamente en la memoria de tu dispositivo, puedes procesar documentos pesados sin errores de tiempo de espera.' },
        { question: '¿Es seguro para nóminas o declaraciones de impuestos?', answer: 'Totalmente. Tus datos confidenciales nunca se transmiten a servidores externos.' }
      ],
      privacyNote: 'Todo el cálculo de compresión se ejecuta localmente. Tus documentos financieros y personales nunca abandonan tu ordenador o teléfono.',
      relatedTools: [
        { slug: 'unir', name: 'Unir PDF', description: 'Combina varios documentos antes de reducir su tamaño.' },
        { slug: 'dividir', name: 'Dividir PDF', description: 'Separa páginas pesadas en archivos independientes.' },
        { slug: 'convertir-pdf-a-imagenes', name: 'PDF a Imágenes', description: 'Convierte páginas a JPG o PNG optimizados.' }
      ]
    },
    pt: {
      h1: 'Como comprimir PDF sem perder qualidade e de graça?',
      title: 'Comprimir PDF Grátis Sem Perder Qualidade (Sem Upload) | ihatelovepdf',
      metaDescription: 'Diminua o tamanho do seu arquivo PDF para e-mail sem perder nitidez. Processamento 100% privado no navegador sem envio para servidores.',
      directAnswer: 'Para comprimir PDF sem perder qualidade, acesse o Comprimir PDF do ihatelovepdf, selecione o nível de compressão Médio e clique em "Comprimir PDF". Nosso algoritmo local remove metadados desnecessários e reempacota fluxos de dados diretamente na memória do seu dispositivo.',
      toolName: 'Comprimir PDF Online',
      keyTakeaways: [
        'Preserva fontes vetoriais e gráficos com total nitidez.',
        'Escolha entre compressão Baixa, Média ou Forte conforme sua necessidade.',
        'Cálculo visual da economia de espaço em megabytes.',
        '100% confidencial: arquivos pesados nunca viajam pela internet.'
      ],
      steps: [
        { title: 'Acesse a ferramenta', text: 'Abra o Comprimir PDF no ihatelovepdf em qualquer navegador.' },
        { title: 'Envie o documento PDF', text: 'Arraste seu arquivo para a área de transferência.' },
        { title: 'Escolha a compressão', text: 'Recomendamos a opção Média para manter ótimo equilíbrio visual.' },
        { title: 'Baixe o PDF reduzido', text: 'Clique em "Comprimir PDF" e faça o download imediato.' }
      ],
      commonProblems: [
        { problem: 'O tamanho do arquivo mudou muito pouco.', solution: 'Arquivos que já contêm fotos muito comprimidas podem exigir o nível de compressão Forte.' },
        { problem: 'Imagens perderam definição na impressão.', solution: 'Opte pela compressão Baixa para preservar resoluções mais altas em impressões físicas.' }
      ],
      faqs: [
        { question: 'O texto do PDF fica embaçado?', answer: 'Não. O texto em formato vetorial permanece perfeitamente nítido independentemente do nível de zoom.' },
        { question: 'Existe limite de tamanho de arquivo?', answer: 'Não há limites impostos por servidor, pois todo o trabalho ocorre na memória local do seu aparelho.' },
        { question: 'Adiciona marcas d\'água?', answer: 'Não. Seus documentos permanecem totalmente limpos.' }
      ],
      privacyNote: 'Seus arquivos nunca saem do seu navegador. Segurança total para relatórios contábeis e contratos sigilosos.',
      relatedTools: [
        { slug: 'juntar', name: 'Juntar PDF', description: 'Mescle arquivos antes de reduzir o tamanho final.' },
        { slug: 'dividir', name: 'Dividir PDF', description: 'Separe capítulos pesados em documentos menores.' },
        { slug: 'pdf-para-imagens', name: 'PDF para Imagens', description: 'Transforme páginas em imagens JPG leves.' }
      ]
    },
    de: {
      h1: 'Wie kann man PDF ohne Qualitätsverlust kostenlos komprimieren?',
      title: 'PDF verkleinern ohne Qualitätsverlust kostenlos | ihatelovepdf',
      metaDescription: 'Reduzieren Sie die PDF-Dateigröße für E-Mail und Webformulare. 100% private Komprimierung direkt im Browser ohne Server-Upload.',
      directAnswer: 'Um eine PDF-Datei ohne Qualitätsverlust kostenlos zu komprimieren, öffnen Sie das Tool "PDF komprimieren" auf ihatelovepdf, wählen Sie die empfohlene mittlere Komprimierungsstufe und klicken Sie auf "PDF komprimieren". Die Optimierung findet ohne Upload lokal in Ihrem Browser statt.',
      toolName: 'PDF komprimieren',
      keyTakeaways: [
        'Behält gestochen scharfe Vektorschriften und Vektordiagramme bei.',
        'Drei flexible Stufen: Gering, Mittel und Stark.',
        'Echtzeit-Anzeige der Dateigrößen-Ersparnis in Prozent und Megabyte.',
        'Kein Server-Upload: strenger Datenschutz für sensible Geschäftsunterlagen.'
      ],
      steps: [
        { title: 'Tool aufrufen', text: 'Öffnen Sie "PDF komprimieren" auf ihatelovepdf in Ihrem Browser.' },
        { title: 'PDF-Datei einfügen', text: 'Ziehen Sie Ihre große PDF-Datei in den Arbeitsbereich.' },
        { title: 'Kompressionsstufe wählen', text: 'Wählen Sie "Mittel" für die perfekte Balance aus geringer Dateigröße und hoher Schärfe.' },
        { title: 'Komprimierte Datei speichern', text: 'Klicken Sie auf "PDF komprimieren" und laden Sie das Ergebnis herunter.' }
      ],
      commonProblems: [
        { problem: 'Die Dateigröße hat sich kaum verringert.', solution: 'Wenn bereits stark komprimierte JPEGs im Dokument vorliegen, wählen Sie die Stufe "Stark".' },
        { problem: 'Grafiken wirken beim Ausdruck unscharf.', solution: 'Nutzen Sie die Stufe "Gering", um höhere Bildauflösungen beizubehalten.' }
      ],
      faqs: [
        { question: 'Wird der Text durch das Verkleinern unscharf?', answer: 'Nein. Vektorschriften werden nicht verändert und bleiben bei jeder Vergrößerung messerscharf.' },
        { question: 'Gibt es eine Upload-Begrenzung für große Dateien?', answer: 'Nein, da keine Übertragung über das Internet stattfindet, können auch hunderte Megabyte große PDFs problemlos verarbeitet werden.' },
        { question: 'Werden Wasserzeichen eingefügt?', answer: 'Nein, das generierte Dokument bleibt absolut frei von Werbung und Wasserzeichen.' }
      ],
      privacyNote: 'Kein Transfer über das Internet: Alle Komprimierungsschritte laufen lokal auf Ihrem Endgerät ab.',
      relatedTools: [
        { slug: 'zusammenfuehren', name: 'PDF zusammenfügen', description: 'Dokumente vor der Komprimierung zusammenfassen.' },
        { slug: 'teilen', name: 'PDF teilen', description: 'Große Dokumente in handliche Einzelteile zerlegen.' },
        { slug: 'pdf-zu-bildern', name: 'PDF in Bilder', description: 'Seiten in schlanke Bildformate umwandeln.' }
      ]
    },
    fr: {
      h1: 'Comment compresser un PDF sans perte de qualité gratuitement ?',
      title: 'Compresser un PDF Gratuit Sans Perte de Qualité | ihatelovepdf',
      metaDescription: 'Réduisez la taille de vos fichiers PDF pour l\'envoi par e-mail sans altérer la netteté du texte. Compression 100% privée dans votre navigateur.',
      directAnswer: 'Pour compresser un PDF sans perte de qualité, déposez votre document dans l\'outil Compresser PDF d\'ihatelovepdf, choisissez le réglage Moyen recommandé et cliquez sur "Compresser le PDF". Vos flux d\'objets et images sont réoptimisés localement dans la mémoire de votre navigateur sans aucun envoi serveur.',
      toolName: 'Compresser PDF en ligne',
      keyTakeaways: [
        'Conserve la netteté absolue des textes et polices vectorielles.',
        'Trois modes de compression adaptés à tous les besoins (Légère, Moyenne, Forte).',
        'Calcul immédiat de l\'espace disque économisé.',
        'Confidentialité totale : aucun fichier volumineux ne transite sur internet.'
      ],
      steps: [
        { title: 'Ouvrir l\'outil', text: 'Accédez à Compresser PDF sur ihatelovepdf depuis n\'importe quel terminal.' },
        { title: 'Déposer le PDF', text: 'Glissez votre document volumineux dans la zone de traitement.' },
        { title: 'Sélectionner le mode', text: 'Choisissez le niveau Moyen pour un ratio optimal entre légèreté et qualité.' },
        { title: 'Télécharger', text: 'Cliquez sur "Compresser le PDF" et récupérez votre fichier sans filigrane.' }
      ],
      commonProblems: [
        { problem: 'Le fichier ne diminue presque pas de volume.', solution: 'Si votre document contient déjà des photos très compressées, optez pour la compression Forte.' },
        { problem: 'Les images semblent moins nettes à l\'impression.', solution: 'Préférez la compression Légère pour garantir une haute résolution papier.' }
      ],
      faqs: [
        { question: 'Le texte risque-t-il d\'être pixelisé ?', answer: 'Non. Le texte vectoriel reste intact et parfaitement lisible quel que soit le niveau de zoom.' },
        { question: 'Y a-t-il une limite de taille en mégaoctets ?', answer: 'Non. Tout se passe dans la mémoire de votre appareil, ce qui élimine les blocages de téléversement.' },
        { question: 'Mes données personnelles sont-elles conservées ?', answer: 'Aucun serveur ne reçoit vos données. Vos documents restent sur votre machine.' }
      ],
      privacyNote: 'Sécurité et vie privée garanties : aucun octet n\'est transféré vers le cloud.',
      relatedTools: [
        { slug: 'fusionner', name: 'Fusionner PDF', description: 'Assemblez vos documents avant de les optimiser.' },
        { slug: 'diviser', name: 'Diviser PDF', description: 'Extrayez les pages les plus volumineuses.' },
        { slug: 'pdf-en-images', name: 'PDF en Images', description: 'Exportez vos pages en images légères.' }
      ]
    },
    it: {
      h1: 'Come comprimere un PDF senza perdere qualità gratis?',
      title: 'Comprimere PDF Gratis Senza Perdere Qualità | ihatelovepdf',
      metaDescription: 'Riduci il peso dei tuoi PDF per inviarli via email o caricarli su portali online. Compressione sicura ed eseguita al 100% nel tuo browser.',
      directAnswer: 'Per comprimere un PDF senza perdere qualità, carica il tuo documento nello strumento Comprimi PDF di ihatelovepdf, scegli il livello Medio consigliato e clicca su "Comprimi PDF". I flussi interni vengono ottimizzati direttamente nella RAM del tuo browser senza alcun invio su server remoti.',
      toolName: 'Comprimi PDF Online',
      keyTakeaways: [
        'Mantiene nitidi i testi vettoriali e le linee grafiche originali.',
        'Profili personalizzati: compressione Bassa, Media ed Elevata.',
        'Visualizzazione in tempo reale della percentuale di spazio risparmiata.',
        'Privacy assoluta: nessun file viene caricato sulla rete.'
      ],
      steps: [
        { title: 'Apri lo strumento', text: 'Vai su Comprimi PDF su ihatelovepdf da PC o smartphone.' },
        { title: 'Carica il file', text: 'Trascina il PDF pesante nell\'apposito riquadro.' },
        { title: 'Scegli la compressione', text: 'Seleziona "Media" per bilanciare qualità e leggerezza.' },
        { title: 'Scarica il risultato', text: 'Clicca su "Comprimi PDF" e salva il file leggero senza watermark.' }
      ],
      commonProblems: [
        { problem: 'La dimensione del file è cambiata poco.', solution: 'Se il file contiene immagini già ottimizzate, seleziona la compressione Elevata.' },
        { problem: 'Le immagini appaiono sgranate.', solution: 'Scegli la compressione Bassa per conservare una risoluzione grafica superiore.' }
      ],
      faqs: [
        { question: 'Il testo risulterà sfocato?', answer: 'No. I caratteri tipografici vettoriali rimangono perfettamente definiti anche ingrandendo la pagina.' },
        { question: 'Posso comprimere file molto grandi?', answer: 'Sì. L\'elaborazione locale permette di gestire documenti di centinaia di megabyte senza limiti di connessione.' },
        { question: 'Ci sono costi o registrazioni nascoste?', answer: 'No, il servizio è gratuito, illimitato e non richiede alcun account.' }
      ],
      privacyNote: 'Conformità GDPR garantita: i tuoi contratti e dati bancari non lasciano mai il tuo browser.',
      relatedTools: [
        { slug: 'unisci', name: 'Unisci PDF', description: 'Unisci documenti prima di ridurne le dimensioni.' },
        { slug: 'dividi', name: 'Dividi PDF', description: 'Estrai sezioni pesanti in file indipendenti.' },
        { slug: 'da-pdf-a-immagini', name: 'PDF in Immagini', description: 'Trasforma le pagine in immagini JPEG compatte.' }
      ]
    },
    ro: {
      h1: 'Cum să comprimi un PDF fără a pierde din calitate gratuit?',
      title: 'Comprimă PDF Gratuit Fără Pierdere de Calitate | ihatelovepdf',
      metaDescription: 'Micșorează dimensiunea fișierelor PDF pentru trimitere prin email. Compresie 100% privată în browserul tău, fără încărcare pe server.',
      directAnswer: 'Pentru a comprima un PDF fără pierderi vizibile de calitate, deschide instrumentul Comprimă PDF din ihatelovepdf, selectează nivelul Mediu recomandat și apasă pe "Comprimă PDF". Documentul este optimizat direct în memoria dispozitivului tău, fără a fi încărcat pe internet.',
      toolName: 'Comprimă PDF Online',
      keyTakeaways: [
        'Păstrează claritatea textului vectorial și a graficii.',
        'Trei profiluri de compresie: Redusă, Medie și Puternică.',
        'Afișează procentul exact de spațiu economisit.',
        'Confidențialitate deplină: fișierele voluminoase nu sunt trimise online.'
      ],
      steps: [
        { title: 'Deschide instrumentul', text: 'Accesează Comprimă PDF pe ihatelovepdf din orice browser.' },
        { title: 'Încarcă documentul', text: 'Trage fișierul PDF voluminos în spațiul marcat.' },
        { title: 'Selectează nivelul', text: 'Alege "Mediu" pentru un echilibru optim între claritate și greutate.' },
        { title: 'Descarcă fișierul', text: 'Apasă pe "Comprimă PDF" și salvează documentul fără filigran.' }
      ],
      commonProblems: [
        { problem: 'Dimensiunea a scăzut foarte puțin.', solution: 'Dacă fișierul conținea deja imagini comprimate, încearcă modul de compresie Puternică.' },
        { problem: 'Imaginile nu sunt suficient de clare la imprimare.', solution: 'Alege opțiunea Redusă pentru a menține o rezoluție mai mare a fotografiilor.' }
      ],
      faqs: [
        { question: 'Textul documentului va deveni neclar?', answer: 'Nu. Textul vectorial își păstrează claritatea maximă indiferent de nivelul de zoom.' },
        { question: 'Există o limită de megabytes?', answer: 'Nu există limite de încărcare, deoarece procesarea are loc local pe dispozitivul tău.' },
        { question: 'Se aplică filigrane publicitare?', answer: 'Nu. Documentele descărcate sunt complet curate.' }
      ],
      privacyNote: 'Securitate strictă: niciun byte din documentele tale nu părăsește memoria dispozitivului.',
      relatedTools: [
        { slug: 'uneste', name: 'Unește PDF', description: 'Îmbină documente înainte de a le optimiza dimensiunea.' },
        { slug: 'divide', name: 'Divide PDF', description: 'Împarte un document greu în fișiere mai mici.' },
        { slug: 'pdf-in-imagini', name: 'PDF în Imagini', description: 'Convertește paginile în imagini JPEG optimizate.' }
      ]
    },
    ru: {
      h1: 'Как сжать PDF без потери качества бесплатно?',
      title: 'Сжать PDF онлайн бесплатно без потери качества | ihatelovepdf',
      metaDescription: 'Уменьшайте размер файлов PDF для отправки по почте с сохранением четкого текста. 100% приватное сжатие в браузере без загрузки на сервер.',
      directAnswer: 'Чтобы сжать PDF без потери качества, откройте инструмент «Сжать PDF» на ihatelovepdf, выберите рекомендуемый средний уровень сжатия и нажмите «Сжать PDF». Оптимизация внутренних потоков происходит локально в памяти вашего браузера без передачи данных в интернет.',
      toolName: 'Сжать PDF онлайн',
      keyTakeaways: [
        'Сохраняет идеальную четкость векторного текста и линий.',
        'Три гибких профиля: Слабое, Среднее и Сильное сжатие.',
        'Наглядный расчет сэкономленных мегабайтов перед скачиванием.',
        'Полная безопасность: тяжелые файлы никогда не отправляются на удаленные серверы.'
      ],
      steps: [
        { title: 'Откройте инструмент', text: 'Перейдите к инструменту «Сжать PDF» на ihatelovepdf.' },
        { title: 'Добавьте документ', text: 'Перетащите большой файл PDF в рабочую область.' },
        { title: 'Выберите уровень сжатия', text: 'Рекомендуется выбрать «Среднее» для оптимального соотношения размера и четкости.' },
        { title: 'Скачайте готовый файл', text: 'Нажмите «Сжать PDF» и сохраните уменьшенный файл без водяных знаков.' }
      ],
      commonProblems: [
        { problem: 'Размер файла почти не уменьшился.', solution: 'Если в документе уже используются сжатые изображения, попробуйте режим «Сильное сжатие».' },
        { problem: 'При печати мелкие детали выглядят размыто.', solution: 'Используйте «Слабое сжатие», чтобы сохранить максимальное разрешение графики.' }
      ],
      faqs: [
        { question: 'Станет ли текст размытым?', answer: 'Нет. Векторные шрифты не растрируются и остаются абсолютно четкими при любом масштабировании.' },
        { question: 'Есть ли ограничения по размеру файла?', answer: 'Ограничений нет, поскольку обработка происходит прямо в памяти вашего устройства.' },
        { question: 'Добавляются ли водяные знаки?', answer: 'Нет, ваши файлы остаются чистыми и не содержат сторонней рекламы.' }
      ],
      privacyNote: 'Безопасность персональных данных: файлы обрабатываются локально и не загружаются в облако.',
      relatedTools: [
        { slug: 'obedinit', name: 'Объединить PDF', description: 'Соберите несколько файлов перед сжатием.' },
        { slug: 'razdelit', name: 'Разделить PDF', description: 'Разделите объемный файл на отдельные части.' },
        { slug: 'pdf-v-izobrazheniya', name: 'PDF в изображения', description: 'Экспортируйте страницы в компактные файлы JPEG.' }
      ]
    },
    hu: {
      h1: 'Hogyan tömöríthet PDF-et minőségromlás nélkül ingyen?',
      title: 'PDF tömörítése ingyen minőségromlás nélkül | ihatelovepdf',
      metaDescription: 'Csökkentse a PDF fájlméretet e-mailhez vagy űrlapokhoz a szöveg élességének megőrzésével. 100% privát tömörítés a böngészőben feltöltés nélkül.',
      directAnswer: 'A PDF minőségromlás nélküli tömörítéséhez nyissa meg az ihatelovepdf PDF tömörítés eszközét, válassza ki a javasolt Közepes szintet, majd kattintson a "PDF tömörítése" gombra. A belső adatfolyamok optimalizálása közvetlenül a böngésző memóriájában történik szerverre küldés nélkül.',
      toolName: 'PDF tömörítése online',
      keyTakeaways: [
        'Megőrzi az éles vektorszövegeket és grafikai elemeket.',
        'Három szint: Enyhe, Közepes és Erős tömörítés.',
        'Valós idejű tárhelymegtakarítás kijelzése megabájtban.',
        'Teljes biztonság: a nagyméretű fájlok nem hagyják el a számítógépet.'
      ],
      steps: [
        { title: 'Nyissa meg az eszközt', text: 'Keresse fel a PDF tömörítés oldalt az ihatelovepdf weboldalon.' },
        { title: 'Húzza be a fájlt', text: 'Húzza a nagyméretű PDF dokumentumot a kijelölt területre.' },
        { title: 'Válassza ki a tömörítési szintet', text: 'A "Közepes" opció optimális egyensúlyt biztosít a kis méret és a kiváló képminőség között.' },
        { title: 'Töltse le a tömörített PDF-et', text: 'Kattintson a "PDF tömörítése" gombra a vízjelmentes fájl letöltéséhez.' }
      ],
      commonProblems: [
        { problem: 'Alig csökkent a dokumentum mérete.', solution: 'Ha a fájl már tömörített képeket tartalmaz, válassza az Erős tömörítési fokozatot.' },
        { problem: 'Nyomtatáskor kevésbé élesek a képek.', solution: 'Használja az Enyhe tömörítést a magasabb felbontás fenntartásához.' }
      ],
      faqs: [
        { question: 'Elmosódottá válik a szöveg?', answer: 'Nem. A vektoros betűtípusok teljesen élesek maradnak bármilyen nagyítási szint mellett.' },
        { question: 'Van méretbeli korlátozás?', answer: 'Nincsenek szerveroldali feltöltési korlátok, mivel a számítások a helyi memóriában zajlanak.' },
        { question: 'Kerül-e vízjel a kész fájlra?', answer: 'Nem, a dokumentumok teljesen tiszták és eredetiek maradnak.' }
      ],
      privacyNote: 'Szigorú adatvédelem: a bizalmas adatok nem kerülnek feltöltésre semmilyen internetes szerverre.',
      relatedTools: [
        { slug: 'osszefuzni', name: 'PDF egyesítése', description: 'Egyesítsen dokumentumokat a tömörítés előtt.' },
        { slug: 'szetbontas', name: 'PDF szétbontása', description: 'Bontson nagyobb dokumentumokat kisebb részekre.' },
        { slug: 'pdf-kepekbe', name: 'PDF képekbe', description: 'Alakítsa át az oldalakat optimalizált JPEG képekké.' }
      ]
    }
  },

  // 3. Split PDF
  {
    slug: 'how-to-split-pdf-pages',
    opKey: 'split',
    category: 'Organization',
    readTime: '3 min read',
    en: {
      h1: 'How to Split a PDF by Pages for Free Without Uploading?',
      title: 'How to Split PDF Pages Online for Free (Zero Uploads) | ihatelovepdf',
      metaDescription: 'Extract specific pages, enter custom ranges, or break a PDF into separate files directly in your browser. Fast, private, and free.',
      directAnswer: 'To split a PDF by pages for free without uploading, open the ihatelovepdf Split PDF tool, upload your multi-page document, select the individual page thumbnails or type custom page ranges (like 1-3, 5), and click "Split PDF". Your new document generates in browser memory and downloads immediately.',
      toolName: 'Split PDF Online',
      keyTakeaways: [
        'Visual thumbnail selector makes choosing individual pages effortless.',
        'Supports custom page range syntax (e.g., 1-5, 8, 11-14).',
        'Extract all pages as separate individual PDF documents in one click.',
        'Zero uploads: confidential financial, medical, or legal documents stay on your device.'
      ],
      steps: [
        { title: 'Open the Split Tool', text: 'Navigate to Split PDF on ihatelovepdf.' },
        { title: 'Upload Your Document', text: 'Drop your multi-page PDF into the browser window.' },
        { title: 'Select Pages or Ranges', text: 'Click thumbnails to select pages, or choose "Custom Ranges" and enter page numbers.' },
        { title: 'Split & Save', text: 'Click "Split PDF" to generate and download your extracted files.' }
      ],
      commonProblems: [
        { problem: 'Entered page ranges are out of bounds.', solution: 'Ensure your highest page number does not exceed the total page count shown above the thumbnails.' },
        { problem: 'Need to extract every page as a single file.', solution: 'Select the "Extract All Pages" toggle to download all individual pages packaged cleanly.' }
      ],
      faqs: [
        { question: 'Will the extracted pages lose formatting?', answer: 'No. Page geometry, fonts, images, and layout elements are cloned with 100% fidelity.' },
        { question: 'Is my data private when splitting documents?', answer: 'Yes. All parsing and extraction happens in your browser runtime via WebAssembly with zero server interaction.' },
        { question: 'Can I split a document of over 500 pages?', answer: 'Yes. Since extraction is client-side, modern browser memory can easily handle large books and catalogs.' }
      ],
      privacyNote: 'Complete client-side execution ensures your confidential contracts and statements never touch cloud servers.',
      relatedTools: [
        { slug: 'merge', name: 'Merge PDF', description: 'Recombine extracted pages in any order.' },
        { slug: 'crop', name: 'Crop PDF', description: 'Trim margins on extracted pages.' },
        { slug: 'rotate', name: 'Rotate PDF', description: 'Fix orientation of extracted pages.' }
      ]
    },
    es: {
      h1: '¿Cómo dividir un PDF en páginas gratis y sin subir archivos?',
      title: 'Dividir PDF en Páginas Gratis Online (Sin Subir Archivos) | ihatelovepdf',
      metaDescription: 'Extrae páginas específicas, define rangos personalizados o divide un PDF en archivos individuales en tu navegador. Gratis y privado.',
      directAnswer: 'Para dividir un PDF en páginas gratis sin subirlo a un servidor, abre la herramienta Dividir PDF de ihatelovepdf, carga tu documento, haz clic en las miniaturas de las páginas deseadas o escribe rangos (ej. 1-3, 5) y pulsa "Dividir PDF". El archivo se crea al instante en tu navegador.',
      toolName: 'Dividir PDF Online',
      keyTakeaways: [
        'Selector visual de miniaturas para elegir páginas con un solo clic.',
        'Compatible con rangos personalizados (ej. 1-5, 8, 12-16).',
        'Opción para extraer todas las páginas en documentos individuales.',
        '100% privado: tus documentos nunca se envían a servidores externos.'
      ],
      steps: [
        { title: 'Abre la herramienta', text: 'Entra en Dividir PDF en ihatelovepdf.' },
        { title: 'Carga tu documento', text: 'Arrastra tu archivo PDF de varias páginas a la pantalla.' },
        { title: 'Selecciona páginas o intervalos', text: 'Haz clic en las miniaturas que deseas extraer o introduce rangos de páginas.' },
        { title: 'Divide y descarga', text: 'Pulsa en "Dividir PDF" para guardar tus páginas extraídas al momento.' }
      ],
      commonProblems: [
        { problem: 'El número de página no existe.', solution: 'Comprueba que el rango no sobrepase el número total de páginas del documento original.' },
        { problem: 'Quiero guardar cada página por separado.', solution: 'Usa la función "Extraer todas las páginas" para generar un archivo por cada hoja.' }
      ],
      faqs: [
        { question: '¿Se altera el formato de las páginas extraídas?', answer: 'No. El diseño, fuentes vectoriales e imágenes se conservan con total exactitud.' },
        { question: '¿Puedo dividir PDFs con datos sensibles?', answer: 'Sí. Todo el proceso ocurre en tu navegador mediante WebAssembly sin enviar datos a internet.' },
        { question: '¿Añade marcas de agua?', answer: 'No. Las páginas extraídas quedan completamente limpias.' }
      ],
      privacyNote: 'Procesamiento en memoria local: máxima seguridad para nóminas, escrituras y contratos.',
      relatedTools: [
        { slug: 'unir', name: 'Unir PDF', description: 'Vuelve a combinar las páginas extraídas.' },
        { slug: 'recortar', name: 'Recortar PDF', description: 'Ajusta los márgenes de las páginas extraídas.' },
        { slug: 'girar', name: 'Girar PDF', description: 'Corrige la orientación de las hojas extraídas.' }
      ]
    },
    pt: {
      h1: 'Como dividir páginas de PDF grátis sem fazer upload?',
      title: 'Como Dividir Páginas de PDF Grátis Online (Sem Upload) | ihatelovepdf',
      metaDescription: 'Extraia páginas específicas, crie intervalos personalizados ou separe um PDF em documentos individuais no navegador. Rápido e privado.',
      directAnswer: 'Para dividir páginas de PDF grátis sem fazer upload, use o Dividir PDF do ihatelovepdf, envie seu arquivo, selecione as miniaturas das páginas ou digite os intervalos (ex: 1-4, 7) e clique em "Dividir PDF". O novo documento é compilado localmente na memória e baixado na hora.',
      toolName: 'Dividir PDF Online',
      keyTakeaways: [
        'Seleção visual por miniaturas para escolher páginas facilmente.',
        'Suporte a intervalos personalizados de páginas.',
        'Extraia todas as páginas em arquivos individuais em um clique.',
        'Sem upload: documentos confidenciais ficam guardados no seu aparelho.'
      ],
      steps: [
        { title: 'Abra a ferramenta', text: 'Acesse Dividir PDF no ihatelovepdf.' },
        { title: 'Envie o documento', text: 'Arraste o arquivo PDF para a área de envio.' },
        { title: 'Escolha as páginas', text: 'Clique nas miniaturas ou informe os intervalos que deseja extrair.' },
        { title: 'Divida e baixe', text: 'Clique em "Dividir PDF" para salvar seus novos arquivos.' }
      ],
      commonProblems: [
        { problem: 'O intervalo inserido é inválido.', solution: 'Verifique se os números digitados não excedem o total de páginas do arquivo.' },
        { problem: 'Preciso separar cada página individualmente.', solution: 'Ative a opção "Extrair todas as páginas" para baixar cada folha separadamente.' }
      ],
      faqs: [
        { question: 'A qualidade das páginas extraídas diminui?', answer: 'Não. Todas as fontes e resoluções são preservadas exatamente como no original.' },
        { question: 'É seguro para documentos com dados pessoais?', answer: 'Sim. A execução é 100% no navegador, impedindo vazamentos na nuvem.' },
        { question: 'Há limite de páginas?', answer: 'Não há limites fixos; documentos com centenas de páginas são processados tranquilamente.' }
      ],
      privacyNote: 'Zero uploads para a nuvem: tranquilidade e conformidade com a LGPD.',
      relatedTools: [
        { slug: 'juntar', name: 'Juntar PDF', description: 'Mescle páginas extraídas em uma nova ordem.' },
        { slug: 'recortar', name: 'Recortar PDF', description: 'Corte as bordas das páginas obtidas.' },
        { slug: 'girar', name: 'Girar PDF', description: 'Ajuste a rotação das páginas geradas.' }
      ]
    },
    de: {
      h1: 'Wie kann man PDF-Seiten kostenlos ohne Server-Upload trennen?',
      title: 'PDF Seiten trennen kostenlos online (Ohne Upload) | ihatelovepdf',
      metaDescription: 'Extrahieren Sie bestimmte Seiten, definieren Sie Bereiche oder teilen Sie ein PDF in Einzelseiten direkt im Browser. Schnell, sicher und kostenlos.',
      directAnswer: 'Um PDF-Seiten ohne Server-Upload kostenlos zu trennen, rufen Sie das Tool "PDF teilen" auf ihatelovepdf auf, laden Sie Ihr Dokument, markieren Sie die gewünschten Seitenvorschauen oder tippen Sie Bereiche (z. B. 1-3, 6) ein und klicken Sie auf "PDF teilen". Das Dokument wird im Browser-Arbeitsspeicher erstellt.',
      toolName: 'PDF teilen',
      keyTakeaways: [
        'Visuelle Vorschau zur intuitiven Auswahl einzelner Seiten.',
        'Unterstützt individuelle Seitenbereiche (z. B. 1-4, 7, 10-12).',
        'Möglichkeit, alle Seiten als einzelne PDF-Dateien zu extrahieren.',
        'Vollständiger Datenschutz ohne Datenübermittlung an Fremdserver.'
      ],
      steps: [
        { title: 'Tool aufrufen', text: 'Öffnen Sie "PDF teilen" auf ihatelovepdf.' },
        { title: 'PDF einfügen', text: 'Ziehen Sie Ihr mehrseitiges Dokument in das Fenster.' },
        { title: 'Seiten wählen', text: 'Klicken Sie auf die Vorschaubilder oder geben Sie Seitenbereiche ein.' },
        { title: 'Trennen & Speichern', text: 'Klicken Sie auf "PDF teilen", um Ihre neuen Dokumente herunterzuladen.' }
      ],
      commonProblems: [
        { problem: 'Eingegebene Seitenzahl existiert nicht.', solution: 'Achten Sie darauf, dass der Seitenbereich die Gesamtseitenzahl nicht überschreitet.' },
        { problem: 'Jede Seite soll einzeln gespeichert werden.', solution: 'Wählen Sie die Funktion "Alle Seiten extrahieren", um separate Dateien zu erhalten.' }
      ],
      faqs: [
        { question: 'Verlieren getrennte Seiten an Qualität?', answer: 'Nein, Vektorschriften und Grafiken bleiben vollkommen identisch erhalten.' },
        { question: 'Ist das Trennen vertraulicher Akten sicher?', answer: 'Ja, da alle Berechnungen per WebAssembly lokal in Ihrem Browser ablaufen.' },
        { question: 'Gibt es Einschränkungen bei der Dateigröße?', answer: 'Nein, Ihr lokaler Arbeitsspeicher bestimmt die Kapazität.' }
      ],
      privacyNote: '100% DSGVO-sicher: Ihre Dokumente verlassen zu keinem Zeitpunkt Ihr Gerät.',
      relatedTools: [
        { slug: 'zusammenfuehren', name: 'PDF zusammenfügen', description: 'Seiten neu und strukturiert zusammenfassen.' },
        { slug: 'zuschneiden', name: 'PDF zuschneiden', description: 'Ränder getrennter Seiten beschneiden.' },
        { slug: 'drehen', name: 'PDF drehen', description: 'Ausrichtung einzelner Seiten korrigieren.' }
      ]
    },
    fr: {
      h1: 'Comment diviser des pages PDF gratuitement sans téléversement ?',
      title: 'Diviser un PDF en Pages Gratuitement (Sans Téléversement) | ihatelovepdf',
      metaDescription: 'Extrayez des pages spécifiques ou découpez un PDF en documents séparés directement dans votre navigateur. Gratuit, rapide et privé.',
      directAnswer: 'Pour diviser un PDF gratuitement sans l\'envoyer sur un serveur, utilisez l\'outil Diviser PDF d\'ihatelovepdf, déposez votre document, sélectionnez les vignettes des pages souhaitées ou saisissez des intervalles (ex. 1-3, 5), puis cliquez sur "Diviser le PDF". Les pages sont extraites immédiatement en mémoire locale.',
      toolName: 'Diviser PDF en ligne',
      keyTakeaways: [
        'Sélection visuelle simple par vignettes de pages.',
        'Prise en charge d\'intervalles personnalisés (ex. 1-4, 8, 11-15).',
        'Extraction possible de toutes les pages en fichiers distincts.',
        'Zéro envoi externe : protection totale des données confidentielles.'
      ],
      steps: [
        { title: 'Accéder à l\'outil', text: 'Ouvrez Diviser PDF sur ihatelovepdf.' },
        { title: 'Déposer le fichier', text: 'Glissez votre document PDF multi-pages dans la fenêtre.' },
        { title: 'Sélectionner les pages', text: 'Cliquez sur les pages à extraire ou indiquez des plages de pages.' },
        { title: 'Télécharger', text: 'Cliquez sur "Diviser le PDF" pour récupérer vos documents extraits.' }
      ],
      commonProblems: [
        { problem: 'La plage de pages demandée est invalide.', solution: 'Assurez-vous que le numéro maximal ne dépasse pas le nombre total de pages du document.' },
        { problem: 'Besoin d\'un fichier par page.', solution: 'Utilisez l\'option "Extraire toutes les pages" pour générer chaque feuille séparément.' }
      ],
      faqs: [
        { question: 'La mise en page est-elle altérée ?', answer: 'Non. Typographie, éléments vectoriels et images sont copiés à l\'identique.' },
        { question: 'Mes documents sont-ils protégés ?', answer: 'Oui. Le traitement s\'effectue localement sans aucun transfert de données vers des serveurs distants.' },
        { question: 'Le résultat comporte-t-il des filigranes ?', answer: 'Non. Tous les fichiers téléchargés sont parfaitement propres.' }
      ],
      privacyNote: 'Exécution locale dans le navigateur : confidentialité absolue pour tous vos documents juridiques et administratifs.',
      relatedTools: [
        { slug: 'fusionner', name: 'Fusionner PDF', description: 'Réassemblez vos pages extraites dans un nouvel ordre.' },
        { slug: 'recadrer', name: 'Recadrer PDF', description: 'Ajustez les marges de vos nouvelles pages.' },
        { slug: 'faire-pivoter', name: 'Faire pivoter', description: 'Corrigez l\'orientation des pages extraites.' }
      ]
    },
    it: {
      h1: 'Come dividere le pagine di un PDF gratis senza caricare file?',
      title: 'Dividere Pagine PDF Gratis Online Senza Caricare File | ihatelovepdf',
      metaDescription: 'Estrai pagine specifiche, imposta intervalli personalizzati o separa un PDF in singoli file direttamente nel browser. Facile e privato.',
      directAnswer: 'Per dividere un PDF senza caricare file su server esterni, apri Dividi PDF su ihatelovepdf, carica il documento, seleziona le miniature delle pagine da estrarre oppure inserisci intervalli (come 1-3, 5) e premi "Dividi PDF". Il nuovo file viene compilato localmente e scaricato subito.',
      toolName: 'Dividi PDF Online',
      keyTakeaways: [
        'Selettore visivo di miniature per scegliere le pagine con facilità.',
        'Supporta intervalli personalizzati di pagine (es. 1-3, 6, 9-12).',
        'Possibilità di estrarre tutte le pagine come singoli documenti PDF.',
        'Elaborazione locale sicura per contratti e documenti riservati.'
      ],
      steps: [
        { title: 'Apri la pagina', text: 'Accedi allo strumento Dividi PDF su ihatelovepdf.' },
        { title: 'Carica il documento', text: 'Trascina il PDF con più pagine nella schermata.' },
        { title: 'Seleziona le pagine', text: 'Fai clic sulle miniature o scrivi gli intervalli numerici desiderati.' },
        { title: 'Dividi e salva', text: 'Premi "Dividi PDF" e salva i file estratti sul tuo dispositivo.' }
      ],
      commonProblems: [
        { problem: 'L\'intervallo numerico supera le pagine totali.', solution: 'Verifica che i numeri inseriti corrispondano all\'effettivo conteggio pagine del documento.' },
        { problem: 'Voglio salvare ogni singola pagina separatamente.', solution: 'Attiva l\'opzione "Estrai tutte le pagine" per ottenere file indipendenti.' }
      ],
      faqs: [
        { question: 'La risoluzione delle pagine estratte cambia?', answer: 'No, i testi vettoriali e le immagini conservano la qualità originaria.' },
        { question: 'I file riservati rimangono privati?', answer: 'Sì, la procedura si svolge interamente nella memoria del browser.' },
        { question: 'Vengono inseriti watermark?', answer: 'No, i documenti rimangono privi di qualsiasi scritta pubblicitaria.' }
      ],
      privacyNote: 'Sicurezza e riservatezza: nessun byte viene inviato a database o cloud esterni.',
      relatedTools: [
        { slug: 'unisci', name: 'Unisci PDF', description: 'Combina nuovamente le pagine nel formato preferito.' },
        { slug: 'ritaglia', name: 'Ritaglia PDF', description: 'Elimina margini superflui dalle pagine estratte.' },
        { slug: 'ruota', name: 'Ruota PDF', description: 'Orientata correttamente le pagine estratte.' }
      ]
    },
    ro: {
      h1: 'Cum să separi paginile dintr-un PDF gratuit fără încărcare pe server?',
      title: 'Separă Pagini PDF Gratuit Online Fără Încărcare | ihatelovepdf',
      metaDescription: 'Extrage pagini specifice, alege intervale numerice sau împarte documentul în pagini individuale direct în browser. Gratuit și sigur.',
      directAnswer: 'Pentru a separa paginile unui PDF gratuit fără încărcare pe server, deschide Divide PDF din ihatelovepdf, încarcă documentul, bifează miniaturile paginilor dorite sau tastează intervale (ex. 1-3, 5) și apasă pe "Divide PDF". Fișierele sunt generate în memoria locală și descărcate instant.',
      toolName: 'Divide PDF Online',
      keyTakeaways: [
        'Previzualizare vizuală a miniaturilor pentru selectare ușoară.',
        'Suportă intervale personalizate de pagini (ex. 1-5, 8, 10-14).',
        'Extrage toate paginile în fișiere PDF individuale printr-un clic.',
        'Zero transfer de date: documentele confidențiale rămân pe dispozitiv.'
      ],
      steps: [
        { title: 'Deschide instrumentul', text: 'Accesează Divide PDF pe ihatelovepdf.' },
        { title: 'Încarcă fișierul', text: 'Plasează documentul cu mai multe pagini în zona de lucru.' },
        { title: 'Alege paginile', text: 'Apasă pe miniaturile dorite sau introdu intervalul de pagini.' },
        { title: 'Separă și descarcă', text: 'Apasă "Divide PDF" pentru a salva documentele rezultate.' }
      ],
      commonProblems: [
        { problem: 'Intervalul de pagini depășește numărul total.', solution: 'Asigură-te că ultima pagină introdusă există în documentul original.' },
        { problem: 'Vreau fiecare pagină într-un fișier separat.', solution: 'Bifează opțiunea "Extrage toate paginile" pentru salvare individuală.' }
      ],
      faqs: [
        { question: 'Paginile extrase își pierd calitatea?', answer: 'Nu. Toate elementele vectoriale, fonturile și imaginile rămân identice.' },
        { question: 'Este sigur pentru documente financiare?', answer: 'Da, deoarece prelucrarea are loc exclusiv în browser fără servere externe.' },
        { question: 'Se adaugă logo sau filigran?', answer: 'Nu. Fișierele sunt curate și nemodificate.' }
      ],
      privacyNote: 'Procesare sigură pe propriul dispozitiv: documentele tale nu sunt transmise nimănui.',
      relatedTools: [
        { slug: 'uneste', name: 'Unește PDF', description: 'Recombină paginile extrase în ordinea dorită.' },
        { slug: 'decupeaza', name: 'Decupează PDF', description: 'Ajustează marginile paginilor selectate.' },
        { slug: 'roteste', name: 'Rotește PDF', description: 'Corectează orientarea paginilor extrase.' }
      ]
    },
    ru: {
      h1: 'Как разделить PDF на страницы бесплатно без загрузки на сервер?',
      title: 'Разделить PDF на страницы онлайн бесплатно (Без загрузки) | ihatelovepdf',
      metaDescription: 'Извлекайте отдельные страницы, задавайте диапазоны или разбивайте PDF на отдельные файлы прямо в браузере. Быстро, бесплатно и безопасно.',
      directAnswer: 'Чтобы разделить PDF на страницы бесплатно без отправки на сервер, откройте инструмент «Разделить PDF» на ihatelovepdf, добавьте документ, выберите нужные миниатюры или введите диапазоны (например, 1-3, 5) и нажмите «Разделить PDF». Файлы генерируются в памяти устройства и скачиваются сразу.',
      toolName: 'Разделить PDF онлайн',
      keyTakeaways: [
        'Удобный выбор страниц по интерактивным миниатюрам.',
        'Поддержка пользовательских интервалов (например, 1-4, 7, 10-12).',
        'Возможность извлечь все страницы в виде отдельных файлов PDF.',
        'Без передачи данных в сеть: секретные документы не покидают ваше устройство.'
      ],
      steps: [
        { title: 'Откройте инструмент', text: 'Зайдите на страницу «Разделить PDF» в ihatelovepdf.' },
        { title: 'Загрузите документ', text: 'Перетащите многостраничный файл в окно браузера.' },
        { title: 'Выберите страницы', text: 'Кликните по миниатюрам или укажите диапазон номеров страниц.' },
        { title: 'Разделите и сохраните', text: 'Нажмите «Разделить PDF» для немедленной загрузки файлов.' }
      ],
      commonProblems: [
        { problem: 'Указанный номер страницы превышает объем файла.', solution: 'Проверьте общее количество страниц в документе перед вводом диапазона.' },
        { problem: 'Требуется сохранить каждую страницу в отдельный файл.', solution: 'Используйте переключатель «Извлечь все страницы».' }
      ],
      faqs: [
        { question: 'Ухудшается ли форматирование извлеченных страниц?', answer: 'Нет. Векторные шрифты, разметка и графика переносятся с 100% точностью.' },
        { question: 'Безопасно ли это для договоров с персональными данными?', answer: 'Да, потому что документ обрабатывается локально через WebAssembly.' },
        { question: 'Будут ли водяные знаки?', answer: 'Нет. Документы скачиваются чистыми и готовыми к использованию.' }
      ],
      privacyNote: 'Гарантия безопасности: ни один файл не загружается на внешние серверы.',
      relatedTools: [
        { slug: 'obedinit', name: 'Объединить PDF', description: 'Соберите страницы в новом порядке.' },
        { slug: 'obrezat', name: 'Обрезать PDF', description: 'Обрежьте поля на извлеченных страницах.' },
        { slug: 'povernut', name: 'Повернуть PDF', description: 'Исправьте ориентацию страниц.' }
      ]
    },
    hu: {
      h1: 'Hogyan választhat szét PDF oldalakat ingyen, feltöltés nélkül?',
      title: 'PDF oldalak szétválasztása ingyen online (Feltöltés nélkül) | ihatelovepdf',
      metaDescription: 'Kivonatoljon oldalakat, adjon meg egyéni tartományokat vagy bontsa a PDF-et külön fájlokra a böngészőjében. Gyors, biztonságos és ingyenes.',
      directAnswer: 'A PDF oldalak feltöltés nélküli szétválasztásához nyissa meg az ihatelovepdf PDF szétbontás eszközét, töltse be a dokumentumot, kattintson a kívánt oldalbélyegképekre vagy adjon meg tartományokat (pl. 1-3, 5), majd kattintson a "PDF szétbontása" gombra. A fájl azonnal letölthető.',
      toolName: 'PDF szétbontása online',
      keyTakeaways: [
        'Vizuális bélyegkép-választó az oldalak kényelmes kijelöléséhez.',
        'Egyéni oldaltartományok támogatása (pl. 1-4, 7, 10-15).',
        'Az összes oldal egyenkénti külön PDF-be mentése egyetlen kattintással.',
        'Feltöltésmentes: a bizalmas szerződések és iratok az Ön gépén maradnak.'
      ],
      steps: [
        { title: 'Nyissa meg az eszközt', text: 'Keresse fel a PDF szétbontása lapot az ihatelovepdf felületén.' },
        { title: 'Húzza be a dokumentumot', text: 'Helyezze a többoldalas PDF-et a böngészőablakba.' },
        { title: 'Válassza ki az oldalakat', text: 'Kattintson az oldalakra vagy adjon meg oldalszám-tartományokat.' },
        { title: 'Bontás és mentés', text: 'Kattintson a "PDF szétbontása" gombra az új fájlok letöltéséhez.' }
      ],
      commonProblems: [
        { problem: 'Nem létező oldalszámot adott meg.', solution: 'Ügyeljen arra, hogy a megadott szám ne haladja meg az eredeti dokumentum oldalszámát.' },
        { problem: 'Minden egyes oldalt külön szeretne lementeni.', solution: 'Használja az "Összes oldal kinyerése" lehetőséget.' }
      ],
      faqs: [
        { question: 'Változik a kinyert oldalak formázása?', answer: 'Nem. A vektoros betűk, képek és elrendezések tökéletesen megmaradnak.' },
        { question: 'Biztonságos a bizalmas adatok szétválasztása?', answer: 'Igen, mert a WebAssembly feldolgozás helyben a böngészőben történik.' },
        { question: 'Tartalmaz a kimenet vízjelet?', answer: 'Nem, a dokumentumok teljesen tiszták és eredetiek.' }
      ],
      privacyNote: 'Szigorú adatvédelem: a dokumentumok nem jutnak ki az internetre.',
      relatedTools: [
        { slug: 'osszefuzni', name: 'PDF egyesítése', description: 'Illessze újra össze a kinyert oldalakat.' },
        { slug: 'korulvagas', name: 'PDF körülvágása', description: 'Vágja le a felesleges margókat.' },
        { slug: 'forgatas', name: 'PDF forgatása', description: 'Állítsa be a kinyert oldalak helyes tájolását.' }
      ]
    }
  },

  // 4. Convert PDF to Word
  {
    slug: 'how-to-convert-pdf-to-word-free',
    opKey: 'pdfToWord',
    category: 'How-To',
    readTime: '4 min read',
    en: {
      h1: 'How to Convert PDF to Word for Free Without Uploading?',
      title: 'Convert PDF to Word Free Online (.docx) - Zero Uploads | ihatelovepdf',
      metaDescription: 'Convert PDF files into fully editable Microsoft Word (.docx) documents in your browser. Preserves headings, lists, tables, and images without server uploads.',
      directAnswer: 'To convert PDF to Word for free without uploading, open the ihatelovepdf PDF to Word tool, drag and drop your PDF document, and click "Convert to Word". Our client-side parser reconstructs text blocks, font sizes, headings, and images directly into an editable .docx file in browser memory.',
      toolName: 'PDF to Word Online',
      keyTakeaways: [
        'Reconstructs structured Word documents (.docx) with editable text.',
        'Preserves paragraphs, bullet lists, formatting, and inline images.',
        '100% private in-browser conversion: resumes, contracts, and proposals never leave your device.',
        'Compatible with Microsoft Word, Google Docs, LibreOffice, and Apple Pages.'
      ],
      steps: [
        { title: 'Open PDF to Word', text: 'Visit the PDF to Word tool on ihatelovepdf.' },
        { title: 'Select Your PDF', text: 'Drop your PDF document into the conversion area.' },
        { title: 'Convert Client-Side', text: 'Click "Convert to Word". The engine reconstructs the document structure locally.' },
        { title: 'Download .DOCX', text: 'Download your editable Word document ready for editing.' }
      ],
      commonProblems: [
        { problem: 'My PDF is a scanned photo and text cannot be selected in Word.', solution: 'Scanned image PDFs contain bitmap graphics rather than digital text. Use an OCR tool or our Extract Text tool to extract characters first.' },
        { problem: 'Complex multi-column layouts look shifted.', solution: 'Some complex layered graphics may flow differently in Word. Inspect headings and table borders in your word processor.' }
      ],
      faqs: [
        { question: 'Will my generated Word document be editable?', answer: 'Yes. All recognized text characters, paragraphs, headers, and bullet points can be modified directly in Microsoft Word or Google Docs.' },
        { question: 'Are my private business contracts safe?', answer: 'Completely safe. Unlike cloud converters that upload your files to remote servers, our conversion runs locally in your browser.' },
        { question: 'Is there a page limit or paywall?', answer: 'No. The converter is 100% free without page caps or hidden subscriptions.' }
      ],
      privacyNote: 'All document matrix decoding and DOCX compilation occurs in browser memory. No data is transmitted to cloud APIs.',
      relatedTools: [
        { slug: 'word-to-pdf', name: 'Word to PDF', description: 'Convert edited Word files back into fixed PDFs.' },
        { slug: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract spreadsheet tables from PDF to .xlsx.' },
        { slug: 'edit-pdf', name: 'Edit PDF', description: 'Add quick annotations and text directly inside PDF.' }
      ]
    },
    es: {
      h1: '¿Cómo convertir PDF a Word gratis sin subir documentos a un servidor?',
      title: 'Convertir PDF a Word Gratis Online (.docx) - Sin Subir Archivos | ihatelovepdf',
      metaDescription: 'Convierte archivos PDF a documentos editables de Microsoft Word (.docx) directamente en tu navegador. Mantiene fuentes, listas e imágenes.',
      directAnswer: 'Para convertir PDF a Word gratis sin subir archivos, abre la herramienta PDF a Word de ihatelovepdf, arrastra tu documento PDF a la pantalla y pulsa "Convertir a Word". El conversor analiza párrafos, estilos tipográficos e imágenes en tu navegador y genera un archivo .docx editable al instante.',
      toolName: 'PDF a Word Online',
      keyTakeaways: [
        'Crea documentos Word (.docx) totalmente editables.',
        'Mantiene párrafos, listas con viñetas, tablas e imágenes alineadas.',
        '100% privado: currículums y contratos nunca salen de tu ordenador.',
        'Compatible con Microsoft Word, Google Docs y LibreOffice.'
      ],
      steps: [
        { title: 'Entra en la herramienta', text: 'Abre PDF a Word en ihatelovepdf.' },
        { title: 'Añade tu PDF', text: 'Arrastra el documento PDF que deseas transformar.' },
        { title: 'Convierte en tu equipo', text: 'Haz clic en "Convertir a Word" para iniciar el análisis local.' },
        { title: 'Descarga tu archivo .docx', text: 'Guarda tu archivo Word editable y empieza a modificarlo.' }
      ],
      commonProblems: [
        { problem: 'El PDF es un documento escaneado y no permite editar texto.', solution: 'Los documentos escaneados son imágenes fijas. Necesitas extraer el texto previamente con una herramienta de OCR.' },
        { problem: 'Algunos cuadros de texto cambiaron de posición.', solution: 'Ajusta los saltos de sección en Word para que el diseño coincida exactamente.' }
      ],
      faqs: [
        { question: '¿Podré editar todo el texto en Word?', answer: 'Sí. Todos los textos, titulares y listas se convierten en texto editable en Word o Google Docs.' },
        { question: '¿Es seguro para currículums o datos bancarios?', answer: 'Totalmente. La conversión se hace en tu navegador sin enviar datos a la nube.' },
        { question: '¿Cobran por convertir más de 5 páginas?', answer: 'No. El servicio es completamente gratuito y sin limitaciones.' }
      ],
      privacyNote: 'Tus documentos confidenciales se procesan en tu memoria RAM. Cero transmisiones a servidores externos.',
      relatedTools: [
        { slug: 'word-a-pdf', name: 'Word a PDF', description: 'Convierte tu Word editado de vuelta a PDF.' },
        { slug: 'pdf-a-excel', name: 'PDF a Excel', description: 'Extrae tablas numéricas a formato Excel.' },
        { slug: 'editar-pdf', name: 'Editar PDF', description: 'Modifica textos y firmas directamente sobre el PDF.' }
      ]
    },
    pt: {
      h1: 'Como converter PDF para Word grátis sem fazer upload?',
      title: 'Converter PDF para Word Grátis Online (.docx) - Sem Upload | ihatelovepdf',
      metaDescription: 'Transforme PDFs em arquivos editáveis do Microsoft Word (.docx) no navegador. Mantém parágrafos, listas e imagens com privacidade total.',
      directAnswer: 'Para converter PDF para Word grátis sem enviar arquivos para a nuvem, abra a ferramenta PDF para Word do ihatelovepdf, arraste o documento PDF e clique em "Converter para Word". Nosso algoritmo local analisa o texto e monta um documento .docx editável na memória do seu dispositivo.',
      toolName: 'PDF para Word Online',
      keyTakeaways: [
        'Gera arquivos .docx perfeitamente editáveis.',
        'Preserva parágrafos, tópicos, títulos e imagens embutidas.',
        '100% privado: currículos e contratos permanecem seguros no seu aparelho.',
        'Funciona perfeitamente no Word, Google Docs e LibreOffice.'
      ],
      steps: [
        { title: 'Acesse o conversor', text: 'Abra PDF para Word no ihatelovepdf.' },
        { title: 'Selecione o arquivo', text: 'Arraste seu PDF para a área de conversão.' },
        { title: 'Processe localmente', text: 'Clique em "Converter para Word" para reconstruir o layout.' },
        { title: 'Baixe o .docx', text: 'Faça o download do seu documento Word pronto para editar.' }
      ],
      commonProblems: [
        { problem: 'O PDF é digitalizado e não seleciona texto.', solution: 'Documentos escaneados contêm imagens de texto. Extraia os caracteres com OCR antes de editar.' },
        { problem: 'Tabelas complexas desalinharam no Word.', solution: 'Ajuste as margens das células diretamente no seu editor de texto.' }
      ],
      faqs: [
        { question: 'O arquivo Word gerado é editável?', answer: 'Sim. Você pode alterar textos, cores, fontes e parágrafos livremente.' },
        { question: 'É seguro para documentos de trabalho?', answer: 'Sim. Todo o processamento ocorre no próprio navegador sem upload.' },
        { question: 'Tem marca d\'água?', answer: 'Não. Os arquivos gerados são 100% limpos.' }
      ],
      privacyNote: 'Privacidade rigorosa: nenhum byte sai do seu computador ou smartphone.',
      relatedTools: [
        { slug: 'word-para-pdf', name: 'Word para PDF', description: 'Reconverta seu arquivo Word em PDF fixo.' },
        { slug: 'pdf-para-excel', name: 'PDF para Excel', description: 'Exporte tabelas para planilhas eletrônicas.' },
        { slug: 'editar-pdf', name: 'Editar PDF', description: 'Adicione anotações e textos direto no PDF.' }
      ]
    },
    de: {
      h1: 'Wie kann man PDF kostenlos ohne Server-Upload in Word umwandeln?',
      title: 'PDF in Word umwandeln kostenlos (.docx) - Ohne Upload | ihatelovepdf',
      metaDescription: 'Konvertieren Sie PDF-Dateien direkt im Browser in bearbeitbare Word-Dokumente (.docx). Erhält Überschriften, Listen und Tabellen privat.',
      directAnswer: 'Um eine PDF-Datei ohne Server-Upload kostenlos in Word umzuwandeln, öffnen Sie "PDF in Word" auf ihatelovepdf, ziehen Sie Ihr PDF hinein und klicken Sie auf "In Word umwandeln". Die Erkennung von Textabsätzen und Bildern erfolgt lokal im Browser und erzeugt eine bearbeitbare .docx-Datei.',
      toolName: 'PDF in Word online',
      keyTakeaways: [
        'Erstellt vollkommen bearbeitbare Word-Dokumente (.docx).',
        'Übernimmt Absätze, Aufzählungszeichen, Überschriften und Bilder.',
        '100% Datenschutz: Lebensläufe und Verträge bleiben auf Ihrem PC.',
        'Kompatibel mit Microsoft Word, Google Docs und LibreOffice.'
      ],
      steps: [
        { title: 'Tool aufrufen', text: 'Öffnen Sie "PDF in Word" auf ihatelovepdf.' },
        { title: 'PDF einfügen', text: 'Legen Sie Ihr Dokument im Arbeitsfenster ab.' },
        { title: 'Lokal konvertieren', text: 'Klicken Sie auf "In Word umwandeln".' },
        { title: 'DOCX speichern', text: 'Laden Sie Ihre bearbeitbare Word-Datei herunter.' }
      ],
      commonProblems: [
        { problem: 'Gescannte Dokumente lassen sich nicht bearbeiten.', solution: 'Gescannte PDFs bestehen aus Bilddaten. Extrahieren Sie die Zeichen zuvor per OCR.' },
        { problem: 'Verschobene Spalteninhalte in Word.', solution: 'Passen Sie die Absatzbreiten in Word manuell an das Layout an.' }
      ],
      faqs: [
        { question: 'Kann ich den Text in Microsoft Word anpassen?', answer: 'Ja. Absätze, Überschriften und Formatierungen sind vollständig editierbar.' },
        { question: 'Werden geschäftliche Daten ins Internet übertragen?', answer: 'Nein. Alles wird lokal im Arbeitsspeicher Ihres Webbrowsers verarbeitet.' },
        { question: 'Kostet das Tool nach einigen Seiten Geld?', answer: 'Nein, die Nutzung ist unbegrenzt und kostenlos.' }
      ],
      privacyNote: 'Datenschutz nach DSGVO: Keine Datenweitergabe an Drittanbieter oder Server.',
      relatedTools: [
        { slug: 'word-in-pdf', name: 'Word in PDF', description: 'Gewandelte Word-Dateien zurück in PDF überführen.' },
        { slug: 'pdf-in-excel', name: 'PDF in Excel', description: 'Tabellendaten sauber in Excel exportieren.' },
        { slug: 'pdf-bearbeiten', name: 'PDF bearbeiten', description: 'Schnelle Änderungen direkt im PDF vornehmen.' }
      ]
    },
    fr: {
      h1: 'Comment convertir un PDF en Word gratuitement sans téléversement ?',
      title: 'Convertir PDF en Word Gratuitement (.docx) - Sans Envoi | ihatelovepdf',
      metaDescription: 'Convertissez vos fichiers PDF en documents Word (.docx) modifiables directement dans votre navigateur. Gratuit, fiable et sans envoi serveur.',
      directAnswer: 'Pour convertir un PDF en Word gratuitement sans l\'envoyer sur un serveur, rendez-vous sur l\'outil PDF en Word d\'ihatelovepdf, déposez votre document et cliquez sur "Convertir en Word". La structure textuelle et les images sont compilées localement dans un fichier .docx modifiable.',
      toolName: 'PDF en Word en ligne',
      keyTakeaways: [
        'Génère des documents Word (.docx) entièrement modifiables.',
        'Préserve les paragraphes, puces, en-têtes et images intégrées.',
        'Confidentialité absolue : CV et contrats ne quittent jamais votre appareil.',
        'Compatible Microsoft Word, Google Docs, Pages et LibreOffice.'
      ],
      steps: [
        { title: 'Ouvrir l\'outil', text: 'Rendez-vous sur PDF en Word sur ihatelovepdf.' },
        { title: 'Ajouter votre PDF', text: 'Déposez le document dans la zone centrale.' },
        { title: 'Lancer la conversion', text: 'Cliquez sur "Convertir en Word" pour un calcul local.' },
        { title: 'Enregistrer le .docx', text: 'Téléchargez votre document Word prêt à être édité.' }
      ],
      commonProblems: [
        { problem: 'Le texte ne peut pas être modifié dans Word.', solution: 'Si votre PDF est une numérisation d\'un document papier, utilisez un outil d\'OCR au préalable.' },
        { problem: 'Colonnes décalées dans le rendu final.', solution: 'Réajustez les marges dans Word pour harmoniser la mise en page.' }
      ],
      faqs: [
        { question: 'Puis-je modifier le texte du document Word ?', answer: 'Oui. Le document .docx produit est entièrement modifiable dans votre traitement de texte.' },
        { question: 'Est-il risqué de traiter un contrat juridique ?', answer: 'Non. Vos documents ne sont jamais transmis à des serveurs distants.' },
        { question: 'Y a-t-il des frais après quelques pages ?', answer: 'Non, l\'outil est totalement gratuit et sans limitation.' }
      ],
      privacyNote: 'Sécurité totale : l\'intégralité du traitement a lieu dans votre navigateur.',
      relatedTools: [
        { slug: 'word-en-pdf', name: 'Word en PDF', description: 'Reconvertissez votre fichier Word en document PDF.' },
        { slug: 'pdf-en-excel', name: 'PDF en Excel', description: 'Extrayez des tableaux vers des feuilles de calcul.' },
        { slug: 'editer-pdf', name: 'Modifier PDF', description: 'Ajoutez du texte et des annotations sur vos PDF.' }
      ]
    },
    it: {
      h1: 'Come convertire un PDF in Word gratis senza caricare file?',
      title: 'Convertire PDF in Word Gratis Online (.docx) - Senza Upload | ihatelovepdf',
      metaDescription: 'Converti file PDF in documenti Word (.docx) modificabili direttamente nel tuo browser. Mantieni titoli, elenchi e immagini con privacy totale.',
      directAnswer: 'Per convertire un PDF in Word gratis senza inviare documenti a server esterni, apri da PDF a Word su ihatelovepdf, trascina il file e clicca su "Converti in Word". L\'algoritmo locale estrae paragrafi e immagini ricostruendo un documento .docx pronto per essere modificato.',
      toolName: 'PDF in Word Online',
      keyTakeaways: [
        'Crea documenti Word (.docx) completamente modificabili.',
        'Mantiene paragrafi, elenchi puntati, stili e immagini.',
        'Elaborazione privata: contratti e curriculum restano sul tuo computer.',
        'Compatibile con Microsoft Word, Google Docs e LibreOffice.'
      ],
      steps: [
        { title: 'Apri il convertitore', text: 'Accedi a PDF in Word su ihatelovepdf.' },
        { title: 'Trascina il PDF', text: 'Inserisci il documento da trasformare nell\'area indicata.' },
        { title: 'Converti localmente', text: 'Fai clic su "Converti in Word".' },
        { title: 'Salva il file .docx', text: 'Scarica il documento pronto per essere aperto e modificato.' }
      ],
      commonProblems: [
        { problem: 'Il documento convertito non contiene testo selezionabile.', solution: 'I PDF scansionati sono immagini. Utilizza un software OCR per riconoscere i caratteri.' },
        { problem: 'Tabelle con bordi leggermente spostati.', solution: 'Correggi la spaziatura direttamente nell\'interfaccia di Word.' }
      ],
      faqs: [
        { question: 'Il file Word sarà davvero modificabile?', answer: 'Sì. Tutti i testi e i caratteri possono essere modificati in Microsoft Word.' },
        { question: 'I miei documenti personali vengono salvati online?', answer: 'No. Nessun file viene inviato ai server.' },
        { question: 'Ci sono limiti di pagine?', answer: 'Nessun limite artificiale, puoi convertire documenti di qualsiasi lunghezza.' }
      ],
      privacyNote: 'Privacy conforme alle normative europee: zero byte inviati al di fuori del browser.',
      relatedTools: [
        { slug: 'da-word-a-pdf', name: 'Word in PDF', description: 'Riconverti il file Word revisionato in PDF.' },
        { slug: 'da-pdf-a-excel', name: 'PDF in Excel', description: 'Esporta tabelle in formato foglio di calcolo.' },
        { slug: 'modifica-pdf', name: 'Modifica PDF', description: 'Aggiungi note e modifiche veloci al PDF.' }
      ]
    },
    ro: {
      h1: 'Cum să convertești PDF în Word gratuit fără încărcare pe server?',
      title: 'Convertește PDF în Word Gratuit Online (.docx) - Fără Upload | ihatelovepdf',
      metaDescription: 'Transformă fișiere PDF în documente Microsoft Word (.docx) editabile direct în browser. Păstrează titluri, liste și imagini în siguranță.',
      directAnswer: 'Pentru a converti un PDF în Word gratuit fără încărcare pe server, deschide PDF în Word pe ihatelovepdf, trage fișierul în pagină și apasă pe "Convertește în Word". Motorul nostru reconstruiește structura documentului și generează un fișier .docx complet editabil în memoria browserului.',
      toolName: 'PDF în Word Online',
      keyTakeaways: [
        'Creează documente Word (.docx) complet editabile.',
        'Păstrează paragrafele, listele cu puncte și imaginile încorporate.',
        '100% confidențial: contractele și CV-urile rămân pe dispozitivul tău.',
        'Compatibil cu Word, Google Docs și LibreOffice.'
      ],
      steps: [
        { title: 'Deschide instrumentul', text: 'Intră pe pagina PDF în Word din ihatelovepdf.' },
        { title: 'Adaugă fișierul PDF', text: 'Trage documentul în spațiul de conversie.' },
        { title: 'Convertește pe loc', text: 'Apasă pe "Convertește în Word" pentru procesare locală.' },
        { title: 'Descarcă documentul', text: 'Salvează fișierul .docx obținut și editează-l după dorință.' }
      ],
      commonProblems: [
        { problem: 'Textul din Word nu poate fi editat.', solution: 'Dacă fișierul este o scanare a unei foi tipărite, folosește întâi o soluție OCR.' },
        { problem: 'Alinierea unor tabele pare decalată.', solution: 'Reglează marginile celulelor direct în programul Word.' }
      ],
      faqs: [
        { question: 'Pot edita textul în Microsoft Word?', answer: 'Da, textul și structura sunt pregătite pentru modificare facilă.' },
        { question: 'Sunt datele mele confidențiale în siguranță?', answer: 'Da, deoarece conversia are loc exclusiv în browser fără servere externe.' },
        { question: 'Există costuri ascunse?', answer: 'Nu, serviciul este complet gratuit și nelimitat.' }
      ],
      privacyNote: 'Securitate deplină: niciun document nu este încărcat pe internet.',
      relatedTools: [
        { slug: 'word-in-pdf', name: 'Word în PDF', description: 'Transformă fișierul Word editat înapoi în PDF.' },
        { slug: 'pdf-in-excel', name: 'PDF în Excel', description: 'Extrage tabele numerice în fișiere Excel.' },
        { slug: 'editeaza-pdf', name: 'Editează PDF', description: 'Adaugă texte și adnotări direct pe pagini.' }
      ]
    },
    ru: {
      h1: 'Как конвертировать PDF в Word бесплатно без загрузки на сервер?',
      title: 'Конвертировать PDF в Word бесплатно онлайн (.docx) | ihatelovepdf',
      metaDescription: 'Преобразуйте файлы PDF в редактируемые документы Microsoft Word (.docx) прямо в браузере. Без ограничений, водяных знаков и передачи на сервер.',
      directAnswer: 'Чтобы конвертировать PDF в Word бесплатно без передачи на сервер, откройте инструмент «PDF в Word» на ihatelovepdf, перетащите файл в окно и нажмите «Конвертировать в Word». Программа проанализирует структуру текста и создаст редактируемый файл .docx локально в вашем браузере.',
      toolName: 'PDF в Word онлайн',
      keyTakeaways: [
        'Создает полноценно редактируемые документы Word (.docx).',
        'Сохраняет абзацы, маркированные списки, заголовки и иллюстрации.',
        '100% приватность: резюме и договоры обрабатываются на вашем ПК.',
        'Совместимость с Word, Google Docs, LibreOffice и МойОфис.'
      ],
      steps: [
        { title: 'Откройте инструмент', text: 'Перейдите на страницу «PDF в Word» в ihatelovepdf.' },
        { title: 'Загрузите PDF', text: 'Перетащите документ в окно конвертера.' },
        { title: 'Запустите конвертацию', text: 'Нажмите «Конвертировать в Word» для локальной сборки документа.' },
        { title: 'Скачайте .docx', text: 'Сохраните готовый файл Word для дальнейшего редактирования.' }
      ],
      commonProblems: [
        { problem: 'В Word отображается картинка вместо текста.', solution: 'Если PDF был отсканирован, используйте инструменты OCR для распознавания символов.' },
        { problem: 'Сдвинулись колонки в сложном макете.', solution: 'Скорректируйте ширину колонок в текстовом редакторе.' }
      ],
      faqs: [
        { question: 'Будет ли полученный текст доступен для редактирования?', answer: 'Да, вы сможете изменять, копировать и форматировать весь распознанный текст.' },
        { question: 'Безопасно ли конвертировать финансовые отчеты?', answer: 'Полностью безопасно, так как файлы не отправляются на удаленные сервера.' },
        { question: 'Нужно ли платить за конвертацию большого документа?', answer: 'Нет, инструмент полностью бесплатен и не требует регистрации.' }
      ],
      privacyNote: 'Надежная защита: ваши документы не передаются сторонним сервисам.',
      relatedTools: [
        { slug: 'word-v-pdf', name: 'Word в PDF', description: 'Конвертируйте отредактированный Word обратно в PDF.' },
        { slug: 'pdf-v-excel', name: 'PDF в Excel', description: 'Экспортируйте таблицы в формат Excel.' },
        { slug: 'redaktirovat-pdf', name: 'Редактировать PDF', description: 'Добавляйте заметки и текст прямо в PDF.' }
      ]
    },
    hu: {
      h1: 'Hogyan alakíthat át PDF-et Worddé ingyen, szerverre feltöltés nélkül?',
      title: 'PDF konvertálása Wordbe ingyen (.docx) - Feltöltés nélkül | ihatelovepdf',
      metaDescription: 'Alakítson át PDF dokumentumokat szerkeszthető Microsoft Word (.docx) fájlokká a böngészőjében. Megőrzi a címeket, listákat és képeket.',
      directAnswer: 'A PDF ingyenes és feltöltés nélküli Worddé alakításához nyissa meg az ihatelovepdf PDF-ből Word eszközét, húzza be a dokumentumot, majd kattintson a "Konvertálás Wordbe" gombra. A feldolgozó motor közvetlenül a memóriában állítja össze a szerkeszthető .docx fájlt.',
      toolName: 'PDF-ből Word online',
      keyTakeaways: [
        'Teljesen szerkeszthető Word (.docx) dokumentumokat hoz létre.',
        'Megőrzi a bekezdéseket, felsorolásokat és beágyazott képeket.',
        '100% privát: az önéletrajzok és szerződések nem hagyják el gépét.',
        'Kompatibilis a Microsoft Word, Google Docs és LibreOffice programokkal.'
      ],
      steps: [
        { title: 'Nyissa meg az eszközt', text: 'Keresse fel a PDF-ből Word lapot az ihatelovepdf oldalon.' },
        { title: 'Töltse be a PDF-et', text: 'Helyezze a dokumentumot az átalakító felületre.' },
        { title: 'Konvertálás helyben', text: 'Kattintson a "Konvertálás Wordbe" gombra.' },
        { title: 'Töltse le a .docx fájlt', text: 'Mentse el a szerkeszthető Word dokumentumot.' }
      ],
      commonProblems: [
        { problem: 'A Wordben nem szerkeszthető a szöveg.', solution: 'Ha a PDF szkennelt képet tartalmaz, először OCR szövegfelismerővel kell beolvasni.' },
        { problem: 'Eltolódtak az összetett táblázatok.', solution: 'Finomhangolja a cellák szélességét a szövegszerkesztőben.' }
      ],
      faqs: [
        { question: 'Szerkeszthető lesz a letöltött Word fájl?', answer: 'Igen, a felismert szövegrészek szabadon módosíthatók a Wordben.' },
        { question: 'Biztonságos a személyes dokumentumok konvertálása?', answer: 'Teljesen biztonságos, mivel a fájlok nem kerülnek feltöltésre semmilyen szerverre.' },
        { question: 'Vannak oldalkorlátok?', answer: 'Nincsenek korlátozások, a szolgáltatás korlátlanul ingyenes.' }
      ],
      privacyNote: 'Biztonság és adatvédelem: a fájlok feldolgozása kizárólag az Ön számítógépén történik.',
      relatedTools: [
        { slug: 'word-pdf', name: 'Wordből PDF', description: 'Alakítsa vissza a módosított Word fájlt PDF-be.' },
        { slug: 'pdf-bol-excel', name: 'PDF-ből Excel', description: 'Hozzon létre táblázatokat PDF adatokból.' },
        { slug: 'pdf-szerkesztese', name: 'PDF szerkesztése', description: 'Írjon bejegyzéseket közvetlenül a PDF-re.' }
      ]
    }
  },

  // 5. Convert Word to PDF
  {
    slug: 'how-to-convert-word-to-pdf',
    opKey: 'wordToPdf',
    category: 'How-To',
    readTime: '3 min read',
    en: {
      h1: 'How to Convert Word to PDF for Free Without Uploading?',
      title: 'Convert Word to PDF Free Online (.docx to .pdf) | ihatelovepdf',
      metaDescription: 'Convert Microsoft Word (.docx, .doc) files into clean, fixed-layout PDF documents directly in your web browser. 100% private with no server uploads.',
      directAnswer: 'To convert Word to PDF for free without uploading, open the ihatelovepdf Word to PDF tool, upload your .docx or .doc file, and click "Convert to PDF". The client-side converter compiles text, styles, tables, and images into a universal PDF file in browser memory without sending data to any external server.',
      toolName: 'Word to PDF Online',
      keyTakeaways: [
        'Locks in exact document typography, margins, and page layouts across all devices.',
        'Converts .docx and .doc files quickly without software installations.',
        'Prevents unwanted accidental editing when sending contracts or invoices.',
        '100% private in-browser compilation ensures data stays on your machine.'
      ],
      steps: [
        { title: 'Open Word to PDF', text: 'Navigate to the Word to PDF converter on ihatelovepdf.' },
        { title: 'Upload Word Document', text: 'Drag your .docx or .doc document into the browser drop zone.' },
        { title: 'Compile to PDF', text: 'Click "Convert to PDF" to generate the document locally.' },
        { title: 'Download Your PDF', text: 'Download your finalized, read-only PDF file instantly.' }
      ],
      commonProblems: [
        { problem: 'Special custom system fonts appear substituted.', solution: 'Standard web and system fonts (Arial, Times New Roman, Calibri) render identically. Ensure proprietary fonts are embedded or use common typography.' },
        { problem: 'Old binary .doc files from Word 97-2003 fail to parse.', solution: 'Save your file as modern .docx format in your office suite for optimal in-browser rendering.' }
      ],
      faqs: [
        { question: 'Will the PDF look identical on smartphones and Macs?', answer: 'Yes. Converting Word to PDF embeds layouts permanently, ensuring recipients see the exact same layout regardless of their device or installed software.' },
        { question: 'Can anyone modify the text in the generated PDF?', answer: 'Unlike Word documents, PDF files preserve a fixed visual layout that cannot be easily edited accidentally.' },
        { question: 'Is it safe to convert employee agreements or financials?', answer: 'Yes. Our converter runs client-side in your browser, guaranteeing zero file uploads.' }
      ],
      privacyNote: 'Your document never leaves your device. Verify via browser DevTools that zero bytes are transmitted to remote cloud storage.',
      relatedTools: [
        { slug: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF files back into editable .docx format.' },
        { slug: 'compress', name: 'Compress PDF', description: 'Shrink your newly created PDF for easy email delivery.' },
        { slug: 'sign-pdf', name: 'Sign PDF', description: 'Draw or place a legal signature on your converted PDF.' }
      ]
    },
    es: {
      h1: '¿Cómo convertir Word a PDF gratis sin subir archivos a un servidor?',
      title: 'Convertir Word a PDF Gratis Online (.docx a PDF) | ihatelovepdf',
      metaDescription: 'Transforma documentos de Microsoft Word (.docx, .doc) en archivos PDF limpios y de diseño fijo directamente en tu navegador. 100% privado y seguro.',
      directAnswer: 'Para convertir Word a PDF gratis sin subir archivos, entra en la herramienta Word a PDF de ihatelovepdf, arrastra tu documento .docx o .doc y pulsa "Convertir a PDF". El conversor cliente procesa el contenido directamente en tu navegador y descarga el archivo PDF terminado en segundos.',
      toolName: 'Word a PDF Online',
      keyTakeaways: [
        'Fija el diseño exacto, tipografías y márgenes para cualquier dispositivo.',
        'Convierte archivos .docx de forma rápida sin programas pesados.',
        'Evita modificaciones accidentales al enviar presupuestos o contratos.',
        '100% privado: el procesamiento se realiza en la memoria de tu equipo.'
      ],
      steps: [
        { title: 'Abre la herramienta', text: 'Accede a Word a PDF en ihatelovepdf.' },
        { title: 'Añade tu documento Word', text: 'Arrastra el archivo .docx al área de conversión.' },
        { title: 'Genera el PDF', text: 'Haz clic en "Convertir a PDF" para procesar el documento en tu equipo.' },
        { title: 'Descarga tu PDF', text: 'Guarda tu archivo PDF finalizado sin marcas de agua.' }
      ],
      commonProblems: [
        { problem: 'Fuentes muy específicas se ven diferentes.', solution: 'Usa fuentes estándar de oficina (Calibri, Arial, Times New Roman) para asegurar total fidelidad visual.' },
        { problem: 'Archivos muy antiguos (.doc).', solution: 'Guarda el archivo en formato moderno .docx desde tu procesador de textos para máxima compatibilidad.' }
      ],
      faqs: [
        { question: '¿El documento se verá igual en cualquier pantalla?', answer: 'Sí. El formato PDF garantiza que la presentación visual sea idéntica en cualquier móvil o PC.' },
        { question: '¿Alguien podrá cambiar accidentalmente el contenido?', answer: 'El archivo PDF fija la composición y evita ediciones accidentales comunes en Word.' },
        { question: '¿Mis documentos privados se suben a internet?', answer: 'No. Todo el proceso ocurre en tu navegador sin transferir archivos a ningún servidor.' }
      ],
      privacyNote: 'Tus contratos y propuestas comerciales nunca salen de tu ordenador. Máxima seguridad para tu empresa.',
      relatedTools: [
        { slug: 'pdf-a-word', name: 'PDF a Word', description: 'Convierte archivos PDF de nuevo a documentos Word editables.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Reduce el peso del PDF para enviarlo por correo.' },
        { slug: 'firmar-pdf', name: 'Firmar PDF', description: 'Añade tu firma manuscrita al documento PDF.' }
      ]
    },
    pt: {
      h1: 'Como converter Word para PDF grátis sem fazer upload?',
      title: 'Converter Word para PDF Grátis Online (.docx para PDF) | ihatelovepdf',
      metaDescription: 'Transforme arquivos do Microsoft Word (.docx, .doc) em documentos PDF com layout fixo diretamente no navegador. 100% privado e gratuito.',
      directAnswer: 'Para converter Word para PDF grátis sem fazer upload, acerte o Word para PDF do ihatelovepdf, arraste seu arquivo .docx ou .doc e clique em "Converter para PDF". O motor local compila o documento na memória do seu dispositivo e o PDF resultante é baixado instantaneamente.',
      toolName: 'Word para PDF Online',
      keyTakeaways: [
        'Fixa fontes, margens e tabelas com precisão para qualquer tela.',
        'Converte arquivos .docx rapidamente sem instalar programas pesados.',
        'Impede alterações acidentais ao enviar propostas ou contratos.',
        '100% privado: dados confidenciais nunca saem do seu aparelho.'
      ],
      steps: [
        { title: 'Abra o conversor', text: 'Acesse Word para PDF no ihatelovepdf.' },
        { title: 'Envie o arquivo Word', text: 'Arraste seu arquivo .docx para o conversor.' },
        { title: 'Converta localmente', text: 'Clique em "Converter para PDF" para processar no próprio navegador.' },
        { title: 'Baixe o PDF', text: 'Faça o download do seu documento limpo e sem marcas d\'água.' }
      ],
      commonProblems: [
        { problem: 'Fontes personalizadas raras sofreram substituição.', solution: 'Utilize fontes universais de escritório (Arial, Calibri) para garantir fidelidade visual idêntica.' },
        { problem: 'Formatos antigos (.doc).', solution: 'Salve o arquivo como .docx antes da conversão para compatibilidade perfeita.' }
      ],
      faqs: [
        { question: 'O layout permanecerá idêntico em outros celulares?', answer: 'Sim. O formato PDF mantém o visual exatamente igual em qualquer sistema operacional.' },
        { question: 'O destinatário poderá alterar o texto facilmente?', answer: 'Ao contrário de arquivos Word abertos, o PDF bloqueia alterações acidentais.' },
        { question: 'Meus dados são enviados para a nuvem?', answer: 'Não. Todo o processo roda localmente no seu navegador via WebAssembly.' }
      ],
      privacyNote: 'Conformidade total de privacidade: seus documentos confidenciais nunca chegam a servidores remotos.',
      relatedTools: [
        { slug: 'pdf-para-word', name: 'PDF para Word', description: 'Transforme PDFs em arquivos editáveis do Word.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Otimize o tamanho do documento para envio rápido.' },
        { slug: 'assinar-pdf', name: 'Assinar PDF', description: 'Assine digitalmente o PDF criado.' }
      ]
    },
    de: {
      h1: 'Wie kann man Word kostenlos ohne Server-Upload in PDF umwandeln?',
      title: 'Word in PDF umwandeln kostenlos (.docx zu PDF) | ihatelovepdf',
      metaDescription: 'Konvertieren Sie Microsoft Word-Dateien (.docx, .doc) direkt im Browser in feste PDF-Dokumente. 100% privat ohne Datenupload.',
      directAnswer: 'Um Word ohne Server-Upload kostenlos in PDF umzuwandeln, öffnen Sie "Word in PDF" auf ihatelovepdf, ziehen Sie Ihre .docx-Datei in den Arbeitsbereich und klicken Sie auf "In PDF umwandeln". Die Datei wird lokal im Browser gerendert und steht sofort als PDF zum Download bereit.',
      toolName: 'Word in PDF online',
      keyTakeaways: [
        'Fixiert Schriften, Abstände und Grafiken unveränderlich für alle Endgeräte.',
        'Konvertiert moderne .docx-Dateien schnell ohne Zusatzsoftware.',
        'Verhindert versehentliche Änderungen beim Versand von Angeboten.',
        '100% Datenschutz: Ihre Geschäftsdokumente bleiben auf Ihrem Rechner.'
      ],
      steps: [
        { title: 'Tool öffnen', text: 'Rufen Sie "Word in PDF" auf ihatelovepdf auf.' },
        { title: 'Word-Dokument einfügen', text: 'Ziehen Sie Ihre .docx-Datei in das Browserfenster.' },
        { title: 'In PDF umwandeln', text: 'Klicken Sie auf die Schaltfläche zur lokalen Generierung.' },
        { title: 'PDF herunterladen', text: 'Speichern Sie das fertige PDF ohne Wasserzeichen.' }
      ],
      commonProblems: [
        { problem: 'Spezielle Schriftarten werden ersetzt.', solution: 'Nutzen Sie Standard-Schriftarten wie Arial oder Calibri für perfekte Übereinstimmung.' },
        { problem: 'Alte .doc-Dateien aus Word 2003.', solution: 'Speichern Sie die Datei vorab als modernes .docx ab.' }
      ],
      faqs: [
        { question: 'Sieht das Dokument auf allen Geräten gleich aus?', answer: 'Ja. Das PDF-Format stellt sicher, dass Empfänger auf Mac, Windows oder Smartphone exakt dasselbe Layout sehen.' },
        { question: 'Werden sensible Verträge an fremde Server gesendet?', answer: 'Nein. Die Verarbeitung findet vollständig lokal in Ihrem Browser statt.' },
        { question: 'Fallen für den Download Kosten an?', answer: 'Nein, das Tool ist vollkommen kostenfrei und ohne Einschränkungen nutzbar.' }
      ],
      privacyNote: 'Strikte Einhaltung des Datenschutzes: Keine Weitergabe Ihrer Daten an Cloud-Dienste.',
      relatedTools: [
        { slug: 'pdf-zu-word', name: 'PDF in Word', description: 'PDFs bei Bedarf wieder in Word-Dateien zurückverwandeln.' },
        { slug: 'komprimieren', name: 'PDF komprimieren', description: 'Dateigröße für den E-Mail-Versand verringern.' },
        { slug: 'pdf-unterschreiben', name: 'PDF unterschreiben', description: 'Das erzeugte PDF handschriftlich signieren.' }
      ]
    },
    fr: {
      h1: 'Comment convertir un document Word en PDF gratuitement sans téléversement ?',
      title: 'Convertir Word en PDF Gratuitement (.docx en PDF) | ihatelovepdf',
      metaDescription: 'Transformez vos fichiers Microsoft Word (.docx, .doc) en PDF au format figé directement dans votre navigateur. 100% confidentiel et sans serveur.',
      directAnswer: 'Pour convertir un fichier Word en PDF sans l\'envoyer sur un serveur, accédez à l\'outil Word en PDF d\'ihatelovepdf, glissez votre fichier .docx et cliquez sur "Convertir en PDF". Votre document est généré localement dans la mémoire du navigateur sans fuite de données vers l\'extérieur.',
      toolName: 'Word en PDF en ligne',
      keyTakeaways: [
        'Fige la mise en page, les polices et les marges pour tous les appareils.',
        'Convertit rapidement les fichiers .docx sans logiciel lourd.',
        'Évite toute modification intempestive lors de l\'envoi de devis ou contrats.',
        '100% privé : les données restent strictement sur votre machine.'
      ],
      steps: [
        { title: 'Ouvrir l\'outil', text: 'Accédez à Word en PDF sur ihatelovepdf.' },
        { title: 'Déposer le fichier', text: 'Glissez votre document .docx dans l\'espace dédié.' },
        { title: 'Générer le PDF', text: 'Cliquez sur "Convertir en PDF" pour un rendu local.' },
        { title: 'Télécharger', text: 'Récupérez votre document PDF sans aucun filigrane.' }
      ],
      commonProblems: [
        { problem: 'Certaines polices rares sont modifiées.', solution: 'Préférez des polices universelles (Calibri, Arial, Times) pour un rendu identique.' },
        { problem: 'Fichiers anciens .doc.', solution: 'Enregistrez votre fichier au format moderne .docx avant la conversion.' }
      ],
      faqs: [
        { question: 'Le document sera-t-il identique sur smartphone ?', answer: 'Oui. Le format PDF garantit une fidélité d\'affichage parfaite sur tout écran.' },
        { question: 'Les destinataires peuvent-ils modifier mon texte par erreur ?', answer: 'Non, le format PDF protège votre mise en page contre les modifications accidentelles.' },
        { question: 'Mes données personnelles sont-elles transmises ?', answer: 'Non. Le traitement s\'opère exclusivement dans votre navigateur.' }
      ],
      privacyNote: 'Sécurité totale pour vos documents administratifs : aucun fichier n\'est téléversé.',
      relatedTools: [
        { slug: 'pdf-en-word', name: 'PDF en Word', description: 'Reconvertissez un PDF en document Word éditable.' },
        { slug: 'compresser', name: 'Compresser PDF', description: 'Allégez le PDF pour un envoi par courriel.' },
        { slug: 'signer-pdf', name: 'Signer PDF', description: 'Apposez votre signature manuscrite sur le PDF créé.' }
      ]
    },
    it: {
      h1: 'Come convertire un file Word in PDF gratis senza caricare documenti?',
      title: 'Convertire Word in PDF Gratis Online (.docx in PDF) | ihatelovepdf',
      metaDescription: 'Trasforma documenti Microsoft Word (.docx, .doc) in file PDF con layout fisso direttamente nel browser. Privato, veloce e senza caricamento su server.',
      directAnswer: 'Per convertire un documento Word in PDF gratis senza inviarlo a server esterni, apri da Word a PDF su ihatelovepdf, trascina il file .docx e clicca su "Converti in PDF". Il documento viene renderizzato in memoria locale e scaricato come PDF universale senza watermark.',
      toolName: 'Word in PDF Online',
      keyTakeaways: [
        'Blocca caratteri, margini e formattazione in modo immutabile su qualsiasi schermo.',
        'Conversione immediata di file .docx senza installare programmi.',
        'Evita modifiche accidentali durante l\'invio di fatture o preventivi.',
        'Privacy assoluta: i tuoi file rimangono sul tuo computer.'
      ],
      steps: [
        { title: 'Apri la pagina', text: 'Vai su Word in PDF su ihatelovepdf.' },
        { title: 'Inserisci il file', text: 'Trascina il documento .docx nell\'area apposita.' },
        { title: 'Converti in PDF', text: 'Clicca su "Converti in PDF" per avviare il processo locale.' },
        { title: 'Scarica il file', text: 'Salva il PDF finale pulito e non modificabile.' }
      ],
      commonProblems: [
        { problem: 'Font particolari appaiono sostituiti.', solution: 'Utilizza font standard come Arial o Calibri per garantire la massima corrispondenza grafica.' },
        { problem: 'Formati vecchi .doc di Word 2003.', solution: 'Salva il file come .docx moderno prima della conversione.' }
      ],
      faqs: [
        { question: 'Il documento apparirà identico su smartphone e tablet?', answer: 'Sì. Il formato PDF assicura che il layout sia identico su qualsiasi dispositivo.' },
        { question: 'I miei contratti commerciali sono al sicuro?', answer: 'Sì. Nessun dato lascia la memoria del tuo computer.' },
        { question: 'Ci sono limiti o costi nascosti?', answer: 'Nessun costo, il convertitore è gratuito e senza limiti di utilizzo.' }
      ],
      privacyNote: 'Riservatezza assoluta: elaborazione locale al 100% senza trasmissioni via rete.',
      relatedTools: [
        { slug: 'da-pdf-a-word', name: 'PDF in Word', description: 'Riconverti PDF in documenti Word modificabili.' },
        { slug: 'comprimi', name: 'Comprimi PDF', description: 'Riduci il peso del PDF per allegarlo via email.' },
        { slug: 'firma-pdf', name: 'Firma PDF', description: 'Apponi la tua firma sul PDF appena creato.' }
      ]
    },
    ro: {
      h1: 'Cum să convertești Word în PDF gratuit fără încărcare pe server?',
      title: 'Convertește Word în PDF Gratuit Online (.docx în PDF) | ihatelovepdf',
      metaDescription: 'Transformă documente Microsoft Word (.docx, .doc) în fișiere PDF cu aspect fix direct în browser. 100% confidențial și fără server.',
      directAnswer: 'Pentru a converti Word în PDF gratuit fără a încărca fișiere pe un server, deschide instrumentul Word în PDF de pe ihatelovepdf, adaugă documentul .docx și apasă pe "Convertește în PDF". Fișierul PDF este compilat local în memoria dispozitivului și descărcat imediat.',
      toolName: 'Word în PDF Online',
      keyTakeaways: [
        'Păstrează fix aspectul textului, marginile și tabelele pe orice ecran.',
        'Convertește rapid fișiere .docx fără programe suplimentare instalate.',
        'Previne modificările accidentale la trimiterea contractelor sau ofertelor.',
        '100% privat: datele confidențiale rămân pe computerul tău.'
      ],
      steps: [
        { title: 'Deschide instrumentul', text: 'Accesează Word în PDF pe ihatelovepdf.' },
        { title: 'Încarcă documentul', text: 'Trage fișierul .docx în zona de lucru.' },
        { title: 'Convertește local', text: 'Apasă pe "Convertește în PDF" pentru procesare pe loc.' },
        { title: 'Descarcă fișierul PDF', text: 'Salvează documentul PDF curat și fără filigrane.' }
      ],
      commonProblems: [
        { problem: 'Fonturi speciale sunt înlocuite.', solution: 'Folosește fonturi uzuale de birou (Calibri, Arial) pentru redare identică.' },
        { problem: 'Fișiere vechi în format .doc.', solution: 'Salvează fișierul ca .docx din editorul tău de text înainte de conversie.' }
      ],
      faqs: [
        { question: 'Aspectul va fi identic pe telefoane mobile?', answer: 'Da. Formatul PDF garantează că toți destinatarii văd exact același design.' },
        { question: 'Pot terții să modifice textul cu ușurință?', answer: 'Nu, fișierele PDF blochează modificările accidentale specifice documentelor Word.' },
        { question: 'Sunt documentele mele trimise pe servere străine?', answer: 'Nu. Totul rulează local în browserul tău.' }
      ],
      privacyNote: 'Confidențialitate garantată: fișierele tale nu părăsesc niciodată memoria dispozitivului.',
      relatedTools: [
        { slug: 'pdf-in-word', name: 'PDF în Word', description: 'Reconvertește fișiere PDF înapoi în documente Word editabile.' },
        { slug: 'comprima', name: 'Comprimă PDF', description: 'Micșorează fișierul pentru trimitere facilă pe email.' },
        { slug: 'semneaza-pdf', name: 'Semnează PDF', description: 'Adaugă o semnătură olografă pe documentul creat.' }
      ]
    },
    ru: {
      h1: 'Как конвертировать Word в PDF бесплатно без загрузки на сервер?',
      title: 'Конвертировать Word в PDF бесплатно онлайн (.docx в PDF) | ihatelovepdf',
      metaDescription: 'Преобразуйте документы Microsoft Word (.docx, .doc) в неизменяемые PDF-файлы прямо в браузере. 100% приватно и без загрузки на сторонние серверы.',
      directAnswer: 'Чтобы конвертировать Word в PDF бесплатно без отправки на сервер, откройте инструмент «Word в PDF» на ihatelovepdf, добавьте файл .docx и нажмите «Конвертировать в PDF». Процесс преобразования выполняется локально в оперативной памяти вашего браузера, и PDF скачивается моментально.',
      toolName: 'Word в PDF онлайн',
      keyTakeaways: [
        'Фиксирует точный макет, шрифты и поля для корректного отображения на любых устройствах.',
        'Быстрая конвертация файлов .docx без установки сторонних программ.',
        'Исключает случайные изменения текста при отправке коммерческих предложений.',
        '100% конфиденциальность: ваши файлы не передаются через интернет.'
      ],
      steps: [
        { title: 'Откройте инструмент', text: 'Перейдите на страницу «Word в PDF» на ihatelovepdf.' },
        { title: 'Добавьте документ Word', text: 'Перетащите файл .docx в рабочую область.' },
        { title: 'Конвертируйте локально', text: 'Нажмите «Конвертировать в PDF» для компиляции документа.' },
        { title: 'Скачайте PDF', text: 'Сохраните готовый PDF-файл без водяных знаков.' }
      ],
      commonProblems: [
        { problem: 'Редкие системные шрифты отображаются по-другому.', solution: 'Используйте общепринятые офисные шрифты (Calibri, Arial, Times New Roman).' },
        { problem: 'Старый бинарный формат .doc из Word 97-2003.', solution: 'Сохраните документ в формате .docx в вашей офисной программе перед конвертацией.' }
      ],
      faqs: [
        { question: 'Будет ли PDF одинаково открываться на iPhone и Android?', answer: 'Да. Формат PDF обеспечивает строго фиксированную верстку на любых платформах.' },
        { question: 'Может ли получатель случайно изменить текст договора?', answer: 'Нет, формат PDF защищает документ от случайного редактирования.' },
        { question: 'Безопасно ли это для конфиденциальных договоров?', answer: 'Да, файлы не передаются в облако и обрабатываются на вашем компьютере.' }
      ],
      privacyNote: 'Надежная защита: ваши персональные данные и договоры не покидают ваше устройство.',
      relatedTools: [
        { slug: 'pdf-v-word', name: 'PDF в Word', description: 'Конвертируйте PDF обратно в редактируемый формат Word.' },
        { slug: 'szhat', name: 'Сжать PDF', description: 'Уменьшите размер итогового PDF для пересылки по почте.' },
        { slug: 'podpisat-pdf', name: 'Подписать PDF', description: 'Поставьте электронную или рукописную подпись.' }
      ]
    },
    hu: {
      h1: 'Hogyan alakíthat át Wordöt PDF-be ingyen, szerverre feltöltés nélkül?',
      title: 'Word átalakítása PDF-be ingyen (.docx-ből PDF) | ihatelovepdf',
      metaDescription: 'Alakítson át Microsoft Word (.docx, .doc) fájlokat kötött elrendezésű PDF-fé közvetlenül a böngészőjében. 100% privát, feltöltés nélkül.',
      directAnswer: 'A Word dokumentumok feltöltés nélküli PDF-fé alakításához nyissa meg a Wordből PDF eszközt az ihatelovepdf felületén, húzza be a .docx fájlt, és kattintson a "Konvertálás PDF-be" gombra. A fájl helyben a böngésző memóriájában jön létre és azonnal letölthető.',
      toolName: 'Wordből PDF online',
      keyTakeaways: [
        'Rögzíti az elrendezést, a betűtípusokat és a margókat minden eszközön.',
        'Gyors .docx átalakítás külső szoftverek telepítése nélkül.',
        'Megelőzi a véletlen módosításokat ajánlatok és számlák küldésekor.',
        '100% privát: az üzleti adatok az Ön számítógépén maradnak.'
      ],
      steps: [
        { title: 'Nyissa meg az eszközt', text: 'Keresse fel a Wordből PDF lapot az ihatelovepdf oldalon.' },
        { title: 'Húzza be a Word fájlt', text: 'Helyezze a .docx dokumentumot a kijelölt felületre.' },
        { title: 'Alakítsa át helyben', text: 'Kattintson a "Konvertálás PDF-be" gombra a helyi feldolgozáshoz.' },
        { title: 'Töltse le a PDF-et', text: 'Mentse el az elkészült, vízjelektől mentes PDF-et.' }
      ],
      commonProblems: [
        { problem: 'Különleges betűtípusok másképp jelennek meg.', solution: 'Használjon általános irodai betűket (Arial, Calibri) az azonosság érdekében.' },
        { problem: 'Régi .doc formátumú fájlok.', solution: 'Mentse el a fájlt modern .docx formátumban az átalakítás előtt.' }
      ],
      faqs: [
        { question: 'Ugyanúgy fog kinézni a PDF telefonon és tableten?', answer: 'Igen. A PDF formátum minden operációs rendszeren azonos látványt biztosít.' },
        { question: 'Módosíthatja a címzett a szöveget véletlenül?', answer: 'Nem, a PDF kötött formátuma védi a dokumentumot a véletlen átírástól.' },
        { question: 'Kikerülnek az adatok a szerverekre?', answer: 'Nem, minden művelet helyben fut a böngészőjében.' }
      ],
      privacyNote: 'Szigorú adatvédelem: üzleti szerződései nem jutnak ki külső felhőszolgáltatókhoz.',
      relatedTools: [
        { slug: 'pdf-bol-word', name: 'PDF-ből Word', description: 'Alakítson vissza PDF fájlokat szerkeszthető Worddé.' },
        { slug: 'tomoriteni', name: 'PDF tömörítése', description: 'Csökkentse a kész PDF méretét e-mail küldéshez.' },
        { slug: 'pdf-alairasa', name: 'PDF aláírása', description: 'Helyezzen el kézi aláírást a friss PDF dokumentumon.' }
      ]
    }
  }
];

