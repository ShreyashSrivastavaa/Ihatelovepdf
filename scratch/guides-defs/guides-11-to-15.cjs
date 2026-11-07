// scratch/guides-defs/guides-11-to-15.cjs
// Guides 11 to 15: crop, rotate, watermark, pageNumbers, pdfToExcel

module.exports = [
  // 11. Crop PDF Pages
  {
    slug: 'how-to-crop-pdf-pages',
    opKey: 'crop',
    category: 'Optimization',
    readTime: '3 min read',
    en: {
      h1: 'How to Crop PDF Pages for Free Without Uploading?',
      title: 'Crop PDF Pages Free Online (Trim Margins & Canvas) | ihatelovepdf',
      metaDescription: 'Crop PDF pages and trim unwanted white borders directly in your browser. Apply crop boxes to single pages or the entire document without server uploads.',
      directAnswer: 'To crop PDF pages for free without uploading, open the ihatelovepdf Crop PDF tool, upload your document, adjust the visual crop bounding box over the content area, select whether to apply changes to all pages or specific pages, and click "Crop PDF". The cropped file compiles locally in your browser memory and downloads instantly.',
      toolName: 'Crop PDF Online',
      keyTakeaways: [
        'Visual marquee handles let you drag crop borders with pixel precision.',
        'Apply uniform crop margins across all pages or custom selected pages.',
        'Eliminates wide scanner margins, header noise, and printer bleed areas.',
        '100% private: your files never leave your computer.'
      ],
      steps: [
        { title: 'Open the Crop Tool', text: 'Navigate to Crop PDF on ihatelovepdf.' },
        { title: 'Upload Document', text: 'Drag your PDF into the crop canvas.' },
        { title: 'Adjust Crop Box', text: 'Drag the visual crop boundary handles over your desired content.' },
        { title: 'Crop & Save', text: 'Choose page scope and click "Crop PDF" to download your trimmed document.' }
      ],
      commonProblems: [
        { problem: 'Crop cuts off headers on certain alternating pages.', solution: 'Book layouts often have alternating gutter margins. Check multiple page previews before applying crop to all pages.' },
        { problem: 'Need to undo a crop.', solution: 'Adjust the handles outward or reload the original file before downloading.' }
      ],
      faqs: [
        { question: 'Does cropping reduce PDF file size?', answer: 'Cropping updates the MediaBox and CropBox bounding dimensions. To also reduce data size, combine with our Compress PDF tool.' },
        { question: 'Is my document private when cropping?', answer: 'Yes. All coordinate recalculations run locally in browser memory via WebAssembly without server uploads.' },
        { question: 'Can I crop pages individually?', answer: 'Yes. You can customize crop margins per individual page or apply a single crop box globally.' }
      ],
      privacyNote: 'Complete client-side processing guarantees your confidential reports and scans stay entirely on your device.',
      relatedTools: [
        { slug: 'rotate', name: 'Rotate PDF', description: 'Orient pages correctly after cropping.' },
        { slug: 'compress', name: 'Compress PDF', description: 'Optimize file size of cropped documents.' },
        { slug: 'split', name: 'Split PDF', description: 'Extract pages before or after cropping.' }
      ]
    },
    es: {
      h1: '¿Cómo recortar páginas de un PDF gratis sin subir archivos a un servidor?',
      title: 'Recortar PDF Gratis Online (Ajustar Márgenes y Páginas) | ihatelovepdf',
      metaDescription: 'Recorta páginas de archivos PDF y elimina márgenes sobrantes directamente en tu navegador. 100% privado, gratis y sin subir documentos.',
      directAnswer: 'Para recortar páginas de un PDF gratis sin subirlas a un servidor, entra en la herramienta Recortar PDF de ihatelovepdf, carga tu documento, ajusta el marco de recorte visual sobre el contenido, elige si aplicarlo a todas las páginas o a una selección y pulsa "Recortar PDF". El archivo recortado se genera en tu navegador al instante.',
      toolName: 'Recortar PDF Online',
      keyTakeaways: [
        'Controles visuales intuitivos para ajustar el área de recorte con precisión.',
        'Aplica el recorte a una página específica o a todo el documento.',
        'Elimina márgenes blancos excesivos de escaneos y bordes de impresión.',
        '100% confidencial: tus documentos nunca se transfieren a internet.'
      ],
      steps: [
        { title: 'Abre la herramienta', text: 'Accede a Recortar PDF en ihatelovepdf.' },
        { title: 'Sube tu archivo', text: 'Arrastra el documento PDF a la pantalla.' },
        { title: 'Ajusta el recuadro', text: 'Mueve los tiradores del marco sobre el contenido que deseas conservar.' },
        { title: 'Recorta y descarga', text: 'Pulsa "Recortar PDF" y guarda tu archivo ajustado.' }
      ],
      commonProblems: [
        { problem: 'El recorte corta texto en páginas pares.', solution: 'Los libros suelen tener márgenes alternos. Revisa varias páginas antes de aplicar el recorte general.' },
        { problem: 'El marco quedó demasiado ajustado.', solution: 'Amplía los bordes del recuadro antes de pulsar el botón de guardar.' }
      ],
      faqs: [
        { question: '¿Recortar reduce el peso del archivo?', answer: 'Modifica las dimensiones visibles de la página. Para reducir megabytes, pásalo por Comprimir PDF.' },
        { question: '¿Es seguro para documentos oficiales?', answer: 'Completamente. Todo el cálculo geométrico se realiza en la memoria de tu dispositivo.' },
        { question: '¿Añade marcas de agua?', answer: 'No. El archivo resultante queda totalmente limpio.' }
      ],
      privacyNote: 'Procesamiento en memoria local: máxima seguridad para contratos y planos.',
      relatedTools: [
        { slug: 'girar', name: 'Girar PDF', description: 'Corrige la orientación de tus páginas.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Reduce el peso del archivo recortado.' },
        { slug: 'dividir', name: 'Dividir PDF', description: 'Extrae páginas seleccionadas.' }
      ]
    },
    pt: {
      h1: 'Como cortar páginas de PDF grátis sem fazer upload?',
      title: 'Cortar Páginas de PDF Grátis Online (Ajustar Bordas) | ihatelovepdf',
      metaDescription: 'Corte as margens em branco de páginas de PDF diretamente no seu navegador. Rápido, seguro e 100% privado sem envio para servidores.',
      directAnswer: 'Para cortar páginas de PDF grátis sem fazer upload, acerte o Recortar PDF do ihatelovepdf, insira seu documento, posicione a caixa de seleção sobre a área desejada e clique em "Recortar PDF". A nova geometria é calculada na memória local do seu aparelho e o download é imediato.',
      toolName: 'Recortar PDF Online',
      keyTakeaways: [
        'Ajuste visual por marcadores de arrastar e soltar.',
        'Aplique o corte na página atual ou em todas as folhas.',
        'Remove margens brancas gigantes e marcas de corte de impressora.',
        '100% privado: seus arquivos confidenciais nunca saem da sua máquina.'
      ],
      steps: [
        { title: 'Acesse a ferramenta', text: 'Abra Recortar PDF no ihatelovepdf.' },
        { title: 'Envie o arquivo', text: 'Arraste seu documento PDF para o visualizador.' },
        { title: 'Defina a área', text: 'Ajuste os cantos da caixa de corte sobre o conteúdo.' },
        { title: 'Corte e baixe', text: 'Clique em "Recortar PDF" para baixar o arquivo ajustado.' }
      ],
      commonProblems: [
        { problem: 'O corte cortou o cabeçalho em algumas páginas.', solution: 'Verifique várias páginas antes de aplicar o corte global a todo o documento.' },
        { problem: 'Cortei demais por engano.', solution: 'Basta expandir os cantos do seletor antes de baixar o documento.' }
      ],
      faqs: [
        { question: 'Diminui o tamanho do arquivo?', answer: 'O corte altera a caixa de visualização. Para diminuir megabytes, utilize o Comprimir PDF.' },
        { question: 'É seguro para extratos e contratos?', answer: 'Sim. A execução ocorre 100% no seu navegador sem tráfego na rede.' },
        { question: 'Tem marca d\'água?', answer: 'Não. O PDF gerado é totalmente limpo.' }
      ],
      privacyNote: 'Total respeito à sua privacidade: nenhum dado viaja para servidores externos.',
      relatedTools: [
        { slug: 'girar', name: 'Girar PDF', description: 'Ajuste a orientação das folhas.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Reduza o peso do documento final.' },
        { slug: 'dividir', name: 'Dividir PDF', description: 'Separe páginas antes de cortar.' }
      ]
    },
    de: {
      h1: 'Wie kann man PDF-Seiten kostenlos ohne Server-Upload zuschneiden?',
      title: 'PDF zuschneiden kostenlos online (Ränder anpassen) | ihatelovepdf',
      metaDescription: 'Schneiden Sie weiße Ränder von PDF-Seiten direkt im Browser ab. 100% privat ohne Datenupload, ohne Wasserzeichen und kostenlos.',
      directAnswer: 'Um PDF-Seiten ohne Server-Upload kostenlos zuzuschneiden, öffnen Sie "PDF zuschneiden" auf ihatelovepdf, fügen Sie Ihr Dokument ein, passen Sie den sichtbaren Schnittrahmen an und klicken Sie auf "PDF zuschneiden". Das Dokument wird im Browser-Arbeitsspeicher ohne Datenübertragung angepasst.',
      toolName: 'PDF zuschneiden',
      keyTakeaways: [
        'Präzise visuelle Anpassung des Schnittbereichs per Mausklick.',
        'Wahlweise auf Einzelseiten oder das gesamte Dokument anwendbar.',
        'Entfernt störende Scannerränder und überflüssigen Weißraum.',
        '100% Datenschutz: Ihre Akten bleiben zu jedem Zeitpunkt auf Ihrem Rechner.'
      ],
      steps: [
        { title: 'Tool öffnen', text: 'Rufen Sie "PDF zuschneiden" auf ihatelovepdf auf.' },
        { title: 'PDF einfügen', text: 'Ziehen Sie das Dokument in den Bearbeitungsbereich.' },
        { title: 'Rahmen anpassen', text: 'Verschieben Sie die Schnittmarken um den gewünschten Inhalt.' },
        { title: 'Zuschneiden & Speichern', text: 'Klicken Sie auf "PDF zuschneiden" und laden Sie das Ergebnis herunter.' }
      ],
      commonProblems: [
        { problem: 'Seitenzahlen am Rand wurden versehentlich abgeschnitten.', solution: 'Ziehen Sie den Rahmen etwas weiter auf, bevor Sie den Schnitt bestätigen.' },
        { problem: 'Unterschiedliche Ränder auf geraden und ungeraden Seiten.', solution: 'Prüfen Sie mehrere Seiten in der Vorschau, um nichts abzuschneiden.' }
      ],
      faqs: [
        { question: 'Wird die Dateigröße durch das Zuschneiden kleiner?', answer: 'Das Zuschneiden passt den sichtbaren Bereich an. Um Megabyte zu sparen, nutzen Sie unser Tool PDF komprimieren.' },
        { question: 'Werden sensible Pläne an Dritte übertragen?', answer: 'Nein. Alle Berechnungen laufen lokal in Ihrem Browser ab.' },
        { question: 'Gibt es Einschränkungen?', answer: 'Nein, das Tool ist vollkommen kostenfrei und ohne Einschränkungen nutzbar.' }
      ],
      privacyNote: 'DSGVO-konforme Verarbeitung: Keine Übermittlung Ihrer Dateien an externe Server.',
      relatedTools: [
        { slug: 'drehen', name: 'PDF drehen', description: 'Seitenausrichtung nach dem Schnitt korrigieren.' },
        { slug: 'komprimieren', name: 'PDF komprimieren', description: 'Dateigröße des beschnittenen PDFs minimieren.' },
        { slug: 'teilen', name: 'PDF teilen', description: 'Seiten vorab gezielt auswählen.' }
      ]
    },
    fr: {
      h1: 'Comment recadrer les pages d\'un PDF gratuitement sans téléversement ?',
      title: 'Recadrer un PDF Gratuitement en Ligne (Ajuster les Marges) | ihatelovepdf',
      metaDescription: 'Ajustez les marges blanches et recadrez les pages de vos fichiers PDF directement dans votre navigateur. 100% confidentiel, gratuit et sans serveur.',
      directAnswer: 'Pour recadrer un PDF gratuitement sans l\'envoyer sur un serveur, utilisez l\'outil Recadrer PDF d\'ihatelovepdf, déposez votre document, ajustez la zone de recadrage avec la souris et cliquez sur "Recadrer le PDF". La nouvelle mise en page est générée localement dans votre navigateur.',
      toolName: 'Recadrer PDF en ligne',
      keyTakeaways: [
        'Cadre visuel précis pour rogner les bordures superflues.',
        'Application à une page unique ou à l\'ensemble du document.',
        'Supprime les traces de numérisation et les marges excessives.',
        'Confidentialité absolue : vos documents restent sur votre machine.'
      ],
      steps: [
        { title: 'Ouvrir l\'outil', text: 'Accédez à Recadrer PDF sur ihatelovepdf.' },
        { title: 'Ajouter votre PDF', text: 'Déposez votre document dans la zone de visualisation.' },
        { title: 'Ajuster le cadre', text: 'Déplacez les poignées autour du contenu à conserver.' },
        { title: 'Télécharger', text: 'Cliquez sur "Recadrer le PDF" pour récupérer votre fichier rogné.' }
      ],
      commonProblems: [
        { problem: 'Les en-têtes sont coupés sur certaines pages.', solution: 'Vérifiez la mise en page sur plusieurs feuilles avant de valider le recadrage général.' },
        { problem: 'Recadrage trop serré.', solution: 'Élargissez les bords du cadre avant de cliquer sur le bouton de téléchargement.' }
      ],
      faqs: [
        { question: 'Le recadrage allège-t-il le fichier ?', answer: 'Le recadrage modifie la zone visible. Pour réduire le poids, utilisez Compresser PDF.' },
        { question: 'Mes documents sont-ils protégés ?', answer: 'Absolument. Aucune donnée n\'est envoyée sur des serveurs distants.' },
        { question: 'Y a-t-il un filigrane ajouté ?', answer: 'Non. Vos documents restent entièrement vierges de toute publicité.' }
      ],
      privacyNote: 'Sécurité totale pour vos documents confidentiels : aucun transfert vers des tiers.',
      relatedTools: [
        { slug: 'faire-pivoter', name: 'Faire pivoter', description: 'Ajustez l\'orientation des pages rognées.' },
        { slug: 'compresser', name: 'Compresser PDF', description: 'Réduisez le poids du PDF recadré.' },
        { slug: 'diviser', name: 'Diviser PDF', description: 'Extrayez des pages avant recadrage.' }
      ]
    },
    it: {
      h1: 'Come ritagliare pagine di un PDF gratis senza caricare file?',
      title: 'Ritagliare PDF Gratis Online (Rimuovere Margini Bianchi) | ihatelovepdf',
      metaDescription: 'Elimina i margini bianchi e ritaglia le pagine dei tuoi PDF direttamente nel browser. Facile, gratis e 100% privato senza invio a server.',
      directAnswer: 'Per ritagliare pagine di un PDF gratis senza inviare documenti a server esterni, apri Ritaglia PDF su ihatelovepdf, inserisci il file, trascina i bordi dell\'area di ritaglio sul contenuto e clicca su "Ritaglia PDF". La modifica viene applicata nella memoria locale del tuo browser.',
      toolName: 'Ritaglia PDF Online',
      keyTakeaways: [
        'Maniglie visive per impostare il ritaglio con precisione al millimetro.',
        'Applica il ritaglio a una pagina o a tutte le pagine del documento.',
        'Elimina margini vuoti, difetti di scansione e bordi di stampa.',
        '100% privato: nessun documento lascia il tuo computer.'
      ],
      steps: [
        { title: 'Apri lo strumento', text: 'Vai su Ritaglia PDF su ihatelovepdf.' },
        { title: 'Carica il PDF', text: 'Trascina il documento nell\'area visiva.' },
        { title: 'Regola l\'area', text: 'Sposta gli angoli della selezione intorno al testo.' },
        { title: 'Ritaglia e salva', text: 'Clicca su "Ritaglia PDF" e scarica il file modificato.' }
      ],
      commonProblems: [
        { problem: 'I numeri di pagina sono rimasti esclusi.', solution: 'Allarga leggermente il rettangolo prima di confermare il ritaglio.' },
        { problem: 'Margini alternati tra pagine pari e dispari.', solution: 'Controlla l\'anteprima su più pagine prima di applicare a tutto il file.' }
      ],
      faqs: [
        { question: 'Il file diventa più leggero dopo il ritaglio?', answer: 'Il ritaglio modifica la visualizzazione geometrica. Per alleggerire i megabyte usa Comprimi PDF.' },
        { question: 'I miei contratti sono al sicuro?', answer: 'Sì. Tutti i calcoli avvengono nella memoria del tuo browser.' },
        { question: 'Ci sono costi o watermark?', answer: 'No, il servizio è completamente gratuito e senza watermark.' }
      ],
      privacyNote: 'Privacy conforme alle norme europee: nessun byte viene inviato in rete.',
      relatedTools: [
        { slug: 'ruota', name: 'Ruota PDF', description: 'Allinea le pagine dopo il ritaglio.' },
        { slug: 'comprimi', name: 'Comprimi PDF', description: 'Riduci il peso del file ritagliato.' },
        { slug: 'dividi', name: 'Dividi PDF', description: 'Estrai pagine mirate prima del ritaglio.' }
      ]
    },
    ro: {
      h1: 'Cum să decupezi paginile unui PDF gratuit fără încărcare pe server?',
      title: 'Decupează PDF Gratuit Online (Elimină Marginile Albe) | ihatelovepdf',
      metaDescription: 'Elimină marginile inutile și decupează paginile PDF direct în browserul tău. 100% privat, fără încărcare pe server și fără filigran.',
      directAnswer: 'Pentru a decupa pagini dintr-un PDF gratuit fără încărcare pe server, deschide Decupează PDF din ihatelovepdf, încarcă documentul, potrivește chenarul vizual peste conținut și apasă pe "Decupează PDF". Documentul ajustat se generează în memoria browserului și se descarcă imediat.',
      toolName: 'Decupează PDF Online',
      keyTakeaways: [
        'Cadru vizual intuitiv pentru setarea precisă a ariei de decupare.',
        'Se poate aplica pe o singură pagină sau pe întregul document.',
        'Șterge marginile albe exagerate și imperfecțiunile de scanare.',
        '100% confidențial: fișierele tale nu părăsesc dispozitivul.'
      ],
      steps: [
        { title: 'Deschide instrumentul', text: 'Accesează Decupează PDF pe ihatelovepdf.' },
        { title: 'Încarcă documentul', text: 'Plasează fișierul PDF în zona de lucru.' },
        { title: 'Ajustează chenarul', text: 'Trage de margini pentru a încadra textul dorit.' },
        { title: 'Decupează și descarcă', text: 'Apasă pe "Decupează PDF" pentru a descărca documentul.' }
      ],
      commonProblems: [
        { problem: 'S-au tăiat numerele de pagină din subsol.', solution: 'Mărește ușor chenarul de selecție înainte de a confirma decuparea.' },
        { problem: 'Paginile au margini diferite.', solution: 'Verifică previzualizarea pe mai multe foi înainte de aplicarea pe tot fișierul.' }
      ],
      faqs: [
        { question: 'Se micșorează fișierul după decupare?', answer: 'Decuparea ajustează dimensiunile afișate. Pentru a reduce megabytes, folosește Comprimă PDF.' },
        { question: 'Sunt documentele mele în siguranță?', answer: 'Da, absolut. Prelucrarea are loc doar în browserul tău.' },
        { question: 'Se adaugă filigran?', answer: 'Nu. Fișierele sunt curate și nemodificate.' }
      ],
      privacyNote: 'Confidențialitate absolută: fișierele tale nu sunt trimise către servere externe.',
      relatedTools: [
        { slug: 'roteste', name: 'Rotește PDF', description: 'Corectează orientarea paginilor.' },
        { slug: 'comprima', name: 'Comprimă PDF', description: 'Micșorează fișierul decupat.' },
        { slug: 'divide', name: 'Divide PDF', description: 'Extrage paginile dorite.' }
      ]
    },
    ru: {
      h1: 'Как обрезать страницы PDF бесплатно без загрузки на сервер?',
      title: 'Обрезать PDF онлайн бесплатно (Удалить поля и отступы) | ihatelovepdf',
      metaDescription: 'Обрезайте лишние белые поля страниц PDF прямо в браузере. Быстро, бесплатно, без водяных знаков и без передачи файлов на сервер.',
      directAnswer: 'Чтобы обрезать страницы PDF бесплатно без отправки на сервер, откройте инструмент «Обрезать PDF» на ihatelovepdf, загрузите документ, настройте рамку выделения вокруг текста и нажмите «Обрезать PDF». Файл компилируется локально в памяти вашего браузера и скачивается моментально.',
      toolName: 'Обрезать PDF онлайн',
      keyTakeaways: [
        'Удобная интерактивная рамка для точной подгонки области обрезки.',
        'Применение параметров к одной странице или ко всему документу.',
        'Удаление широких белых полей, дефектов сканирования и меток обреза.',
        '100% приватность: документы обрабатываются на вашем компьютере.'
      ],
      steps: [
        { title: 'Откройте инструмент', text: 'Зайдите в раздел «Обрезать PDF» на ihatelovepdf.' },
        { title: 'Загрузите документ', text: 'Перетащите PDF-файл в область просмотра.' },
        { title: 'Настройте границы', text: 'Потяните за маркеры рамки, чтобы оставить только нужный контент.' },
        { title: 'Обрежьте и скачайте', text: 'Нажмите «Обрезать PDF» для немедленного сохранения файла.' }
      ],
      commonProblems: [
        { problem: 'Случайно обрезались колонтитулы.', solution: 'Расширьте рамку перед сохранением документа.' },
        { problem: 'Разная верстка четных и нечетных страниц.', solution: 'Проверьте несколько страниц перед применением ко всему файлу.' }
      ],
      faqs: [
        { question: 'Уменьшает ли обрезка размер файла?', answer: 'Обрезка меняет видимые границы страниц. Для уменьшения веса используйте «Сжать PDF».' },
        { question: 'Безопасно ли это для важных чертежей?', answer: 'Полностью безопасно, так как расчеты ведутся в вашем браузере.' },
        { question: 'Добавляются ли водяные знаки?', answer: 'Нет. Все файлы скачиваются чистыми.' }
      ],
      privacyNote: 'Защита конфиденциальности: ваши документы не передаются в интернет.',
      relatedTools: [
        { slug: 'povernut', name: 'Повернуть PDF', description: 'Поверните страницы при необходимости.' },
        { slug: 'szhat', name: 'Сжать PDF', description: 'Уменьшите размер файла после обрезки.' },
        { slug: 'razdelit', name: 'Разделить PDF', description: 'Извлеките нужные страницы.' }
      ]
    },
    hu: {
      h1: 'Hogyan vághat körül PDF oldalakat ingyen, feltöltés nélkül?',
      title: 'PDF körülvágása ingyen online (Felesleges margók levágása) | ihatelovepdf',
      metaDescription: 'Vágja le a felesleges fehér margókat PDF oldalakról közvetlenül a böngészőjében. 100% privát, ingyenes, szerverre küldés nélkül.',
      directAnswer: 'A PDF oldalak feltöltés nélküli körülvágásához nyissa meg az ihatelovepdf PDF körülvágása eszközét, töltse be a dokumentumot, állítsa be a kijelölőkeretet a megőrizni kívánt tartalom köré, majd kattintson a "PDF körülvágása" gombra. A módosított fájl helyben a memóriában készül el.',
      toolName: 'PDF körülvágása online',
      keyTakeaways: [
        'Vizuális segédkeret a vágási margók képpontpontos beállításához.',
        'Alkalmazható egyetlen oldalra vagy a teljes dokumentumra.',
        'Eltávolítja a túl széles margókat és a szkennelési nyomokat.',
        '100% biztonság: az iratok az Ön számítógépén maradnak.'
      ],
      steps: [
        { title: 'Nyissa meg az eszközt', text: 'Keresse fel a PDF körülvágása lapot az ihatelovepdf oldalon.' },
        { title: 'Húzza be a dokumentumot', text: 'Helyezze a fájlt a vizuális szerkesztőfelületre.' },
        { title: 'Állítsa be a keretet', text: 'Húzza a sarokpontokat a megőrizendő tartalom köré.' },
        { title: 'Vágja körül és mentse', text: 'Kattintson a "PDF körülvágása" gombra a letöltéshez.' }
      ],
      commonProblems: [
        { problem: 'Véletlenül levágta a láblécet.', solution: 'Húzza kijjebb a vágókeret alsó szélét a megerősítés előtt.' },
        { problem: 'Eltérő margók a páros és páratlan oldalakon.', solution: 'Ellenőrizzen több oldalt is az előnézetben a véglegesítés előtt.' }
      ],
      faqs: [
        { question: 'Csökken a fájlméret a körülvágással?', answer: 'A körülvágás a látható méretet módosítja. A megabájtok csökkentéséhez használja a PDF tömörítés eszközt.' },
        { question: 'Biztonságos a bizalmas PDF-ek vágása?', answer: 'Igen, mert minden művelet helyben a böngészőben fut külső szerverek nélkül.' },
        { question: 'Kerül vízjel a kész fájlra?', answer: 'Nem, a dokumentumok teljesen tiszták maradnak.' }
      ],
      privacyNote: 'Szigorú adatvédelem: a fájlok nem kerülnek feltöltésre semmilyen szerverre.',
      relatedTools: [
        { slug: 'forgatas', name: 'PDF forgatása', description: 'Állítsa be az oldalak helyes tájolását.' },
        { slug: 'tomoriteni', name: 'PDF tömörítése', description: 'Csökkentse a kész dokumentum méretét.' },
        { slug: 'szetbontas', name: 'PDF szétbontása', description: 'Bontsa részeire a dokumentumot.' }
      ]
    }
  },

  // 12. Rotate PDF Pages
  {
    slug: 'how-to-rotate-pdf-pages',
    opKey: 'rotate',
    category: 'Organization',
    readTime: '2 min read',
    en: {
      h1: 'How to Rotate PDF Pages for Free Without Uploading?',
      title: 'Rotate PDF Pages Online Free (Permanent Rotation) | ihatelovepdf',
      metaDescription: 'Rotate upside-down or sideways PDF pages by 90, 180, or 270 degrees in your browser. 100% private, permanent rotation without server uploads.',
      directAnswer: 'To rotate PDF pages for free without uploading, open the ihatelovepdf Rotate PDF tool, upload your document, click the rotate buttons on individual sideways pages (or click "Rotate All"), and click "Save & Download". The page transformation matrices update directly inside your browser memory in milliseconds.',
      toolName: 'Rotate PDF Online',
      keyTakeaways: [
        'Rotate individual pages or apply bulk 90-degree rotations across the entire document.',
        'Permanent rotation: saves into the PDF binary metadata permanently.',
        'Fixes landscape spreadsheets, upside-down scans, and inverted smartphone photos.',
        '100% private in-browser execution with zero uploads.'
      ],
      steps: [
        { title: 'Open Rotate Tool', text: 'Visit Rotate PDF on ihatelovepdf from any device.' },
        { title: 'Upload Document', text: 'Drag your PDF into the visual page organizer.' },
        { title: 'Rotate Pages', text: 'Click rotate arrows on individual thumbnails, or use "Rotate All".' },
        { title: 'Save & Download', text: 'Click "Save & Download" to get your permanently oriented PDF.' }
      ],
      commonProblems: [
        { problem: 'Rotated pages revert to sideways orientation in other PDF readers.', solution: 'Some simple viewers only change temporary session views. Our tool burns rotation permanently into the PDF /Rotate dictionary attribute.' },
        { problem: 'Only every second page is sideways.', solution: 'Hover over individual page thumbnails and click the rotate icon on only those pages.' }
      ],
      faqs: [
        { question: 'Is the rotation permanent or just a preview?', answer: 'It is permanent. The /Rotate attribute in the PDF document object tree is modified permanently, ensuring it opens correctly in Adobe Reader, Chrome, and Preview.' },
        { question: 'Will rotating reduce text clarity?', answer: 'No. Page vectors and fonts remain 100% crisp without any rasterization or degradation.' },
        { question: 'Is it free with no watermark?', answer: 'Yes. All our tools are free forever with no watermarks.' }
      ],
      privacyNote: 'Zero uploads. Your confidential files are processed strictly inside your browser memory runtime.',
      relatedTools: [
        { slug: 'merge', name: 'Merge PDF', description: 'Combine correctly oriented documents.' },
        { slug: 'crop', name: 'Crop PDF', description: 'Trim page margins after rotating.' },
        { slug: 'page-numbers', name: 'Page Numbers', description: 'Add page numbers to oriented pages.' }
      ]
    },
    es: {
      h1: '¿Cómo rotar o girar páginas de un PDF gratis sin subir archivos a un servidor?',
      title: 'Girar PDF Gratis Online (Rotación Permanente 90° y 180°) | ihatelovepdf',
      metaDescription: 'Gira páginas invertidas o apaisadas de archivos PDF en 90, 180 o 270 grados directamente en tu navegador. 100% privado, permanente y sin subir archivos.',
      directAnswer: 'Para girar páginas de un PDF gratis sin subirlas a un servidor, abre la herramienta Girar PDF de ihatelovepdf, carga tu documento, pulsa el icono de rotación en las páginas deseadas (o usa "Girar Todas") y haz clic en "Guardar y Descargar". La rotación se aplica permanentemente en la memoria de tu navegador.',
      toolName: 'Girar PDF Online',
      keyTakeaways: [
        'Gira páginas individuales o aplica rotaciones de 90° a todo el archivo.',
        'Rotación permanente: se guarda directamente en la estructura del PDF.',
        'Corrige documentos escaneados al revés o tablas apaisadas.',
        '100% privado: tus documentos nunca salen de tu dispositivo.'
      ],
      steps: [
        { title: 'Abre la herramienta', text: 'Accede a Girar PDF en ihatelovepdf.' },
        { title: 'Sube tu archivo', text: 'Arrastra el documento PDF a la pantalla.' },
        { title: 'Gira las páginas', text: 'Haz clic en las flechas de giro de las páginas que desees corregir.' },
        { title: 'Guarda y descarga', text: 'Haz clic en "Guardar y Descargar" para obtener tu archivo corregido.' }
      ],
      commonProblems: [
        { problem: 'El documento vuelve a abrirse de lado en otros programas.', solution: 'Nuestra herramienta escribe la rotación definitiva en el atributo /Rotate del PDF, garantizando que se vea igual en cualquier visor.' },
        { problem: 'Solo algunas hojas están invertidas.', solution: 'Usa el botón de giro únicamente en las miniaturas de esas páginas.' }
      ],
      faqs: [
        { question: '¿La rotación es definitiva?', answer: 'Sí. Queda guardada permanentemente en el archivo para que abra bien en cualquier dispositivo.' },
        { question: '¿Pierde calidad el texto?', answer: 'No. Las fuentes y vectores se mantienen 100% nítidos sin ninguna pérdida.' },
        { question: '¿Añade marcas de agua?', answer: 'No. El documento queda limpio y original.' }
      ],
      privacyNote: 'Procesamiento en memoria local: tus contratos y planos no se envían a ningún servidor.',
      relatedTools: [
        { slug: 'unir', name: 'Unir PDF', description: 'Une documentos una vez orientados correctamente.' },
        { slug: 'recortar', name: 'Recortar PDF', description: 'Ajusta los márgenes tras el giro.' },
        { slug: 'numeros-de-pagina', name: 'Números de Página', description: 'Numera las páginas orientadas.' }
      ]
    },
    pt: {
      h1: 'Como girar páginas de PDF grátis sem fazer upload?',
      title: 'Girar PDF Grátis Online (Rotacionar 90° e 180° Permanente) | ihatelovepdf',
      metaDescription: 'Gire páginas de cabeça para baixo ou deitadas em 90°, 180° ou 270° diretamente no navegador. 100% privado, permanente e sem envio para servidores.',
      directAnswer: 'Para girar páginas de PDF grátis sem fazer upload, acerte o Girar PDF do ihatelovepdf, insira seu documento, clique nos botões de rotação das páginas deitadas e clique em "Salvar e Baixar". A rotação é salva permanentemente na memória local do seu aparelho.',
      toolName: 'Girar PDF Online',
      keyTakeaways: [
        'Gire páginas individuais ou o documento inteiro em 90° e 180°.',
        'Rotação permanente gravada diretamente na estrutura do PDF.',
        'Corrige folhas digitalizadas invertidas e tabelas em paisagem.',
        '100% privado: seus arquivos confidenciais nunca saem da sua máquina.'
      ],
      steps: [
        { title: 'Abra a ferramenta', text: 'Acesse Girar PDF no ihatelovepdf.' },
        { title: 'Envie o documento', text: 'Arraste o arquivo PDF para a tela.' },
        { title: 'Gire as páginas', text: 'Clique nas setas de rotação sobre as folhas desejadas.' },
        { title: 'Salve e baixe', text: 'Clique em "Salvar e Baixar" para obter o PDF corrigido.' }
      ],
      commonProblems: [
        { problem: 'O arquivo voltou a abrir de lado em outros leitores.', solution: 'Nossa ferramenta altera o atributo nativo /Rotate do PDF, tornando o ajuste definitivo.' },
        { problem: 'Apenas algumas páginas estão deitadas.', solution: 'Gire apenas as miniaturas que estiverem invertidas.' }
      ],
      faqs: [
        { question: 'A rotação fica salva para sempre?', answer: 'Sim. A rotação é gravada no arquivo para abrir perfeitamente em qualquer leitor.' },
        { question: 'O texto perde definição?', answer: 'Não. O texto vetorial permanece perfeitamente nítido.' },
        { question: 'Tem marca d\'água?', answer: 'Não. Os arquivos gerados são 100% limpos.' }
      ],
      privacyNote: 'Total privacidade: nenhum documento sai do seu computador ou celular.',
      relatedTools: [
        { slug: 'juntar', name: 'Juntar PDF', description: 'Mescle arquivos com a orientação certa.' },
        { slug: 'recortar', name: 'Recortar PDF', description: 'Corte as bordas após girar.' },
        { slug: 'numeros-de-pagina', name: 'Números de Página', description: 'Adicione numeração às folhas.' }
      ]
    },
    de: {
      h1: 'Wie kann man PDF-Seiten kostenlos ohne Server-Upload drehen?',
      title: 'PDF drehen kostenlos online (Dauerhafte 90°/180° Drehung) | ihatelovepdf',
      metaDescription: 'Drehen Sie falsch ausgerichtete PDF-Seiten um 90, 180 oder 270 Grad direkt im Browser. 100% privat ohne Datenupload und dauerhaft gespeichert.',
      directAnswer: 'Um PDF-Seiten ohne Server-Upload kostenlos zu drehen, öffnen Sie "PDF drehen" auf ihatelovepdf, fügen Sie Ihr Dokument ein, klicken Sie auf das Drehsymbol der gewünschten Seiten und klicken Sie auf "Speichern & Herunterladen". Die Ausrichtung wird lokal im Browser-Arbeitsspeicher dauerhaft gespeichert.',
      toolName: 'PDF drehen',
      keyTakeaways: [
        'Einzelseiten gezielt drehen oder alle Seiten auf einmal ausrichten.',
        'Dauerhafte Speicherung direkt im PDF-Metadatenbaum.',
        'Behebt falsch herum eingescannte Seiten und Tabellen im Querformat.',
        '100% Datenschutz: Ihre Akten bleiben zu jedem Zeitpunkt auf Ihrem Rechner.'
      ],
      steps: [
        { title: 'Tool öffnen', text: 'Rufen Sie "PDF drehen" auf ihatelovepdf auf.' },
        { title: 'PDF einfügen', text: 'Ziehen Sie das Dokument in das Vorschaufenster.' },
        { title: 'Seiten drehen', text: 'Klicken Sie auf die Drehschaltflächen der betroffenen Seiten.' },
        { title: 'Speichern & Herunterladen', text: 'Klicken Sie auf den Button zum Speichern des korrekt ausgerichteten PDFs.' }
      ],
      commonProblems: [
        { problem: 'Seiten öffnen sich in anderen Programmen wieder quer.', solution: 'Unser Tool schreibt den Befehl direkt in das /Rotate-Attribut der Datei, sodass es überall fixiert bleibt.' },
        { problem: 'Nur einzelne Seiten sind verdreht.', solution: 'Klicken Sie gezielt nur auf die entsprechenden Seitenvorschauen.' }
      ],
      faqs: [
        { question: 'Ist die Drehung dauerhaft?', answer: 'Ja. Das PDF wird so modifiziert, dass es in allen PDF-Viewern korrekt angezeigt wird.' },
        { question: 'Verschlechtert sich die Textqualität?', answer: 'Nein, Vektorschriften bleiben vollkommen unberührt und scharf.' },
        { question: 'Werden Wasserzeichen hinzugefügt?', answer: 'Nein, das Dokument bleibt vollkommen frei von Werbung.' }
      ],
      privacyNote: 'DSGVO-konforme Verarbeitung: Keine Übermittlung Ihrer Dateien an externe Server.',
      relatedTools: [
        { slug: 'zusammenfuehren', name: 'PDF zusammenfügen', description: 'Richtig ausgerichtete Seiten zusammenführen.' },
        { slug: 'zuschneiden', name: 'PDF zuschneiden', description: 'Ränder nach dem Drehen anpassen.' },
        { slug: 'seitenzahlen', name: 'Seitenzahlen', description: 'Seitennummerierung ergänzen.' }
      ]
    },
    fr: {
      h1: 'Comment faire pivoter des pages PDF gratuitement sans téléversement ?',
      title: 'Faire Pivoter un PDF Gratuitement en Ligne (Rotation Définitive) | ihatelovepdf',
      metaDescription: 'Tournez les pages inversées ou au format paysage de vos PDF à 90°, 180° ou 270° directement dans votre navigateur. 100% privé et sans serveur.',
      directAnswer: 'Pour faire pivoter des pages PDF gratuitement sans les envoyer sur un serveur, utilisez l\'outil Faire pivoter d\'ihatelovepdf, déposez votre document, cliquez sur l\'icône de rotation des pages concernées et cliquez sur "Enregistrer et télécharger". La rotation est inscrite définitivement en mémoire locale.',
      toolName: 'Faire pivoter PDF en ligne',
      keyTakeaways: [
        'Faites pivoter des pages précises ou l\'ensemble du document.',
        'Rotation définitive enregistrée dans les métadonnées officielles du PDF.',
        'Corrige les scans à l\'envers et les tableaux horizontaux.',
        'Confidentialité absolue : vos documents restent sur votre machine.'
      ],
      steps: [
        { title: 'Ouvrir l\'outil', text: 'Accédez à Faire pivoter sur ihatelovepdf.' },
        { title: 'Déposer le PDF', text: 'Glissez votre document dans l\'espace de travail.' },
        { title: 'Pivoter les pages', text: 'Cliquez sur les flèches de rotation sur les vignettes voulues.' },
        { title: 'Télécharger', text: 'Cliquez sur "Enregistrer et télécharger" pour récupérer votre fichier.' }
      ],
      commonProblems: [
        { problem: 'Les pages redeviennent de travers dans d\'autres lecteurs.', solution: 'Notre outil applique la rotation dans le dictionnaire natif /Rotate, garantissant une compatibilité universelle.' },
        { problem: 'Seules certaines pages sont mal orientées.', solution: 'Pivotez uniquement les vignettes individuelles concernées.' }
      ],
      faqs: [
        { question: 'La rotation est-elle permanente ?', answer: 'Oui. Le fichier PDF est enregistré de façon permanente dans le bon sens de lecture.' },
        { question: 'La qualité du texte est-elle altérée ?', answer: 'Non. Typographie et images vectorielles conservent leur netteté maximale.' },
        { question: 'Y a-t-il un filigrane ?', answer: 'Non. Vos documents restent entièrement vierges de tout filigrane.' }
      ],
      privacyNote: 'Sécurité totale : vos fichiers restent strictement sur votre appareil.',
      relatedTools: [
        { slug: 'fusionner', name: 'Fusionner PDF', description: 'Assemblez vos documents bien orientés.' },
        { slug: 'recadrer', name: 'Recadrer PDF', description: 'Ajustez les marges après rotation.' },
        { slug: 'numerotation-pages', name: 'Numéroter les pages', description: 'Ajoutez des numéros de pages.' }
      ]
    },
    it: {
      h1: 'Come ruotare pagine di un PDF gratis senza caricare file?',
      title: 'Ruotare PDF Gratis Online (Rotazione Permanente 90° e 180°) | ihatelovepdf',
      metaDescription: 'Ruota pagine capovolte o in orizzontale di 90, 180 o 270 gradi direttamente nel tuo browser. Permanente, privato e senza caricamento su server.',
      directAnswer: 'Per ruotare pagine di un PDF gratis senza inviare documenti a server esterni, apri Ruota PDF su ihatelovepdf, inserisci il file, premi i pulsanti di rotazione sulle pagine da sistemare e clicca su "Salva e Scarica". La modifica dell\'orientamento viene registrata in modo permanente.',
      toolName: 'Ruota PDF Online',
      keyTakeaways: [
        'Ruota singole pagine o applica rotazioni a 90° a tutto il PDF.',
        'Salvataggio permanente nella struttura nativa del file.',
        'Sistema documenti scansionati al contrario o tabelle orizzontali.',
        '100% privato: nessun file lascia il tuo computer.'
      ],
      steps: [
        { title: 'Apri la pagina', text: 'Vai su Ruota PDF su ihatelovepdf.' },
        { title: 'Carica il documento', text: 'Trascina il PDF nell\'area di visualizzazione.' },
        { title: 'Ruota le pagine', text: 'Clicca sull\'icona di rotazione sopra le miniature desiderate.' },
        { title: 'Salva e scarica', text: 'Clicca su "Salva e Scarica" per ottenere il PDF corretto.' }
      ],
      commonProblems: [
        { problem: 'Le pagine tornano storte su altri programmi.', solution: 'Il nostro strumento scrive direttamente nell\'attributo /Rotate del file per renderlo permanente ovunque.' },
        { problem: 'Solo una pagina su dieci è capovolta.', solution: 'Ruota solo quella singola miniatura senza toccare le altre.' }
      ],
      faqs: [
        { question: 'La rotazione è permanente?', answer: 'Sì. Il documento si aprirà sempre nel verso corretto su qualsiasi programma o stampante.' },
        { question: 'Si perde nitidezza nei testi?', answer: 'No. La qualità dei font e delle immagini rimane invariata.' },
        { question: 'Ci sono watermark pubblicitari?', answer: 'No, i file esportati non contengono alcun watermark.' }
      ],
      privacyNote: 'Massima riservatezza: nessun byte viene inviato su internet.',
      relatedTools: [
        { slug: 'unisci', name: 'Unisci PDF', description: 'Unisci i fogli una volta allineati.' },
        { slug: 'ritaglia', name: 'Ritaglia PDF', description: 'Rimuovi margini dopo la rotazione.' },
        { slug: 'numeri-di-pagina', name: 'Numeri di Pagina', description: 'Inserisci la numerazione delle pagine.' }
      ]
    },
    ro: {
      h1: 'Cum să rotești paginile unui PDF gratuit fără încărcare pe server?',
      title: 'Rotește PDF Gratuit Online (Rotire Permanentă 90° și 180°) | ihatelovepdf',
      metaDescription: 'Rotește paginile orientate greșit sau inversate la 90, 180 sau 270 de grade direct în browser. 100% privat, permanent și fără server.',
      directAnswer: 'Pentru a roti paginile unui PDF gratuit fără încărcare pe server, deschide Rotește PDF din ihatelovepdf, încarcă documentul, apasă pe pictogramele de rotire ale paginilor dorite și apasă pe "Salvează și Descarcă". Orientarea corectă este aplicată permanent în memoria locală.',
      toolName: 'Rotește PDF Online',
      keyTakeaways: [
        'Rotește pagini individuale sau tot documentul printr-un singur clic.',
        'Rotire permanentă salvată în structura PDF-ului.',
        'Corectează scanările inversate sau tabelele în mod peisaj.',
        '100% confidențial: documentele tale nu părăsesc dispozitivul.'
      ],
      steps: [
        { title: 'Deschide instrumentul', text: 'Accesează Rotește PDF pe ihatelovepdf.' },
        { title: 'Încarcă documentul', text: 'Plasează fișierul PDF în ecranul de lucru.' },
        { title: 'Rotește paginile', text: 'Apasă pe săgețile de rotire de pe miniaturile dorite.' },
        { title: 'Salvează și descarcă', text: 'Apasă pe "Salvează și Descarcă" pentru fișierul final.' }
      ],
      commonProblems: [
        { problem: 'Documentul apare din nou răsturnat în alte programe.', solution: 'Instrumentul nostru actualizează atributul /Rotate din fișier, făcând orientarea permanentă pe orice cititor.' },
        { problem: 'Doar câteva pagini sunt orientate greșit.', solution: 'Rotește punctual doar miniaturile respective.' }
      ],
      faqs: [
        { question: 'Rotirea rămâne permanentă?', answer: 'Da. Fișierul va fi deschis întotdeauna în orientarea corectă.' },
        { question: 'Se pierde din calitatea textului?', answer: 'Nu. Fonturile și imaginile își păstrează claritatea maximă.' },
        { question: 'Se adaugă filigran?', answer: 'Nu. Fișierele sunt curate și fidele originalului.' }
      ],
      privacyNote: 'Confidențialitate absolută: datele tale nu părăsesc dispozitivul.',
      relatedTools: [
        { slug: 'uneste', name: 'Unește PDF', description: 'Combină documentele după ce le-ai rotit.' },
        { slug: 'decupeaza', name: 'Decupează PDF', description: 'Ajustează marginile paginilor.' },
        { slug: 'numerotare-pagini', name: 'Numerotare Pagini', description: 'Adaugă numere pe pagini.' }
      ]
    },
    ru: {
      h1: 'Как повернуть страницы PDF бесплатно без загрузки на сервер?',
      title: 'Повернуть PDF онлайн бесплатно (Поворот страниц на 90° и 180°) | ihatelovepdf',
      metaDescription: 'Поворачивайте перевернутые или альбомные страницы PDF на 90, 180 или 270 градусов прямо в браузере. Быстро, навсегда и без передачи на сервер.',
      directAnswer: 'Чтобы повернуть страницы PDF бесплатно без отправки на сервер, откройте инструмент «Повернуть PDF» на ihatelovepdf, добавьте документ, нажмите значки поворота на нужных страницах и нажмите «Сохранить и скачать». Поворот фиксируется навсегда локально в памяти вашего браузера.',
      toolName: 'Повернуть PDF онлайн',
      keyTakeaways: [
        'Поворот отдельных страниц или всего документа сразу.',
        'Постоянное сохранение в структуре PDF-файла.',
        'Исправление перевернутых сканов и альбомных таблиц.',
        '100% приватность: документы обрабатываются на вашем компьютере.'
      ],
      steps: [
        { title: 'Откройте инструмент', text: 'Зайдите в раздел «Повернуть PDF» на ihatelovepdf.' },
        { title: 'Загрузите документ', text: 'Перетащите PDF-файл в область просмотра.' },
        { title: 'Поверните страницы', text: 'Нажмите стрелки поворота на миниатюрах нужных страниц.' },
        { title: 'Сохраните результат', text: 'Нажмите «Сохранить и скачать» для получения файла.' }
      ],
      commonProblems: [
        { problem: 'В других программах страницы снова отображаются боком.', solution: 'Наш инструмент обновляет системный атрибут /Rotate в файле, что фиксирует правильный угол везде.' },
        { problem: 'Перевернута только одна страница из десяти.', solution: 'Поверните только эту конкретную миниатюру.' }
      ],
      faqs: [
        { question: 'Поворот сохраняется навсегда?', answer: 'Да. Файл будет открываться правильно во всех просмотрщиках и на смартфонах.' },
        { question: 'Ухудшится ли качество текста?', answer: 'Нет. Векторный текст и картинки сохраняют исходное качество.' },
        { question: 'Добавляются ли водяные знаки?', answer: 'Нет. Документы скачиваются чистыми.' }
      ],
      privacyNote: 'Защита конфиденциальности: ваши документы не передаются в интернет.',
      relatedTools: [
        { slug: 'obedinit', name: 'Объединить PDF', description: 'Соберите файлы после исправления ориентации.' },
        { slug: 'obrezat', name: 'Обрезать PDF', description: 'Обрежьте поля после поворота.' },
        { slug: 'nomera-stranic', name: 'Номера страниц', description: 'Пронумеруйте страницы.' }
      ]
    },
    hu: {
      h1: 'Hogyan forgathat el PDF oldalakat ingyen, feltöltés nélkül?',
      title: 'PDF forgatása ingyen online (Végleges 90° és 180° elforgatás) | ihatelovepdf',
      metaDescription: 'Forgassa el a fordítva szkennelt vagy fekvő PDF oldalakat 90, 180 vagy 270 fokkal közvetlenül a böngészőjében. 100% privát és végleges.',
      directAnswer: 'A PDF oldalak feltöltés nélküli elforgatásához nyissa meg az ihatelovepdf PDF forgatása eszközét, töltse be a dokumentumot, kattintson az elforgatás gombra a kívánt oldalakon, majd kattintson a "Mentés és letöltés" gombra. Az új tájolás véglegesen rögzül a memóriában.',
      toolName: 'PDF forgatása online',
      keyTakeaways: [
        'Egyes oldalak vagy az összes oldal egyidejű elforgatása.',
        'Végleges rögzítés a PDF fájl belső szerkezetében.',
        'Fejjel lefelé szkennelt iratok és fekvő táblázatok korrigálása.',
        '100% biztonság: az iratok nem kerülnek fel külső szerverekre.'
      ],
      steps: [
        { title: 'Nyissa meg az eszközt', text: 'Keresse fel a PDF forgatása lapot az ihatelovepdf oldalon.' },
        { title: 'Húzza be a dokumentumot', text: 'Helyezze a fájlt a felületre.' },
        { title: 'Forgassa el az oldalakat', text: 'Kattintson az elforgatás nyilakra a módosítani kívánt lapokon.' },
        { title: 'Mentés és letöltés', text: 'Kattintson a "Mentés és letöltés" gombra a kész fájl mentéséhez.' }
      ],
      commonProblems: [
        { problem: 'Más programokban ismét elfordítva nyílik meg a fájl.', solution: 'Eszközünk a szabványos /Rotate paramétert módosítja, így minden programban helyesen nyílik meg.' },
        { problem: 'Csak egyetlen oldal áll rosszul.', solution: 'Forgassa el csak az érintett oldal bélyegképét.' }
      ],
      faqs: [
        { question: 'Végleges marad az elforgatás?', answer: 'Igen. A dokumentum minden eszközön a beállított tájolásban fog megjelenni.' },
        { question: 'Változik a szöveg minősége?', answer: 'Nem, a vektoros elemek élessége tökéletes marad.' },
        { question: 'Kerül vízjel a kész fájlra?', answer: 'Nem, a dokumentumok teljesen tiszták maradnak.' }
      ],
      privacyNote: 'Szigorú adatvédelem: a fájlok nem kerülnek feltöltésre semmilyen szerverre.',
      relatedTools: [
        { slug: 'osszefuzni', name: 'PDF egyesítése', description: 'Illessze össze a helyes tájolású fájlokat.' },
        { slug: 'korulvagas', name: 'PDF körülvágása', description: 'Vágja le a margókat forgatás után.' },
        { slug: 'oldalszamozas', name: 'Oldalszámozás', description: 'Lássa el oldalszámmal a dokumentumot.' }
      ]
    }
  },

  // 13. Add Watermark to PDF
  {
    slug: 'how-to-add-watermark-to-pdf',
    opKey: 'watermark',
    category: 'Security',
    readTime: '3 min read',
    en: {
      h1: 'How to Add a Watermark to a PDF for Free Without Uploading?',
      title: 'Add Watermark to PDF Free Online (Text & Image Watermark) | ihatelovepdf',
      metaDescription: 'Stamp customized text or logo watermarks (CONFIDENTIAL, DRAFT, SAMPLE) across PDF pages directly in your browser. 100% private with no server uploads.',
      directAnswer: 'To add a watermark to a PDF for free without uploading, open the ihatelovepdf Watermark tool, upload your document, type your watermark text (such as "CONFIDENTIAL" or "DRAFT") or upload a logo image, adjust rotation, opacity, and position, and click "Apply Watermark". The watermark burns directly into the pages in your browser memory.',
      toolName: 'Watermark PDF Online',
      keyTakeaways: [
        'Add custom repeating text stamps (e.g., CONFIDENTIAL, DO NOT COPY, DRAFT).',
        'Upload transparent PNG company logos and crests as image watermarks.',
        'Customize opacity transparency, font size, angle, and grid placement.',
        '100% private in-browser watermarking: intellectual property never leaves your machine.'
      ],
      steps: [
        { title: 'Open Watermark Tool', text: 'Visit Watermark PDF on ihatelovepdf.' },
        { title: 'Upload Document', text: 'Drag your PDF into the watermarking interface.' },
        { title: 'Configure Watermark', text: 'Enter text or upload a logo; adjust opacity, angle, and size.' },
        { title: 'Apply & Download', text: 'Click "Apply Watermark" to download your protected document.' }
      ],
      commonProblems: [
        { problem: 'Watermark blocks text completely and makes it unreadable.', solution: 'Lower the opacity slider to 15% - 25% so that the text underneath remains easily readable.' },
        { problem: 'Need watermark applied diagonally across every page.', solution: 'Select the 45-degree angle preset and choose "All Pages".' }
      ],
      faqs: [
        { question: 'Can someone easily remove the watermark?', answer: 'The watermark is burned permanently into the PDF vector layer, making it very difficult to scrub without specialized editing software.' },
        { question: 'Is my proprietary document safe from cloud harvesting?', answer: 'Yes. Processing runs entirely in your browser via WebAssembly without external server uploads.' },
        { question: 'Can I add image watermarks like company crests?', answer: 'Yes. You can upload transparent PNG files and position them anywhere.' }
      ],
      privacyNote: 'Your intellectual property and proprietary documents never leave your computer.',
      relatedTools: [
        { slug: 'page-numbers', name: 'Page Numbers', description: 'Add sequential page numbering.' },
        { slug: 'edit-pdf', name: 'Edit PDF', description: 'Add notes and signatures.' },
        { slug: 'compress', name: 'Compress PDF', description: 'Optimize document size for distribution.' }
      ]
    },
    es: {
      h1: '¿Cómo poner marca de agua a un PDF gratis sin subir archivos a un servidor?',
      title: 'Poner Marca de Agua a PDF Gratis Online (Texto o Logo) | ihatelovepdf',
      metaDescription: 'Añade sellos de agua personalizados (CONFIDENCIAL, COPIA, BORRADOR) o logotipos a tus PDFs en tu navegador. 100% privado y sin subir documentos.',
      directAnswer: 'Para poner marca de agua a un PDF gratis sin subir archivos, abre la herramienta Marca de Agua de ihatelovepdf, carga tu documento, escribe el texto deseado (ej. "CONFIDENCIAL") o sube una imagen, ajusta opacidad y rotación, y pulsa "Aplicar Marca de Agua". El documento protegido se descarga al instante.',
      toolName: 'Marca de Agua PDF Online',
      keyTakeaways: [
        'Añade textos de advertencia (CONFIDENCIAL, BORRADOR, NO COPIAR).',
        'Inserta logotipos transparentes PNG de tu empresa o marca.',
        'Ajusta opacidad, tamaño, color y ángulo de inclinación a 45°.',
        '100% confidencial: tus documentos protegidos nunca salen de tu ordenador.'
      ],
      steps: [
        { title: 'Abre la herramienta', text: 'Accede a Marca de Agua en ihatelovepdf.' },
        { title: 'Añade tu PDF', text: 'Arrastra el documento a proteger a la pantalla.' },
        { title: 'Configura la marca', text: 'Escribe el texto o sube un logo; define ángulo y transparencia.' },
        { title: 'Aplica y descarga', text: 'Haz clic en "Aplicar Marca de Agua" para guardar el archivo.' }
      ],
      commonProblems: [
        { problem: 'La marca de agua tapa el contenido y no se puede leer bien.', solution: 'Reduce la opacidad al 15% o 20% para que el texto de fondo sea perfectamente visible.' },
        { problem: 'Quiero que aparezca en diagonal en todas las páginas.', solution: 'Selecciona la inclinación de 45 grados y la opción "Todas las páginas".' }
      ],
      faqs: [
        { question: '¿Alguien puede borrar fácilmente la marca de agua?', answer: 'La marca se incrusta en las capas vectoriales del PDF, impidiendo su eliminación accidental.' },
        { question: '¿Es seguro para informes confidenciales?', answer: 'Totalmente seguro. Todo el proceso ocurre en tu navegador sin enviar datos a la nube.' },
        { question: '¿Cobran por marcar muchas páginas?', answer: 'No. El servicio es 100% gratuito y sin límites.' }
      ],
      privacyNote: 'Tus documentos comerciales nunca salen de tu equipo. Seguridad total para tu propiedad intelectual.',
      relatedTools: [
        { slug: 'numeros-de-pagina', name: 'Números de Página', description: 'Añade paginación correlativa.' },
        { slug: 'editar-pdf', name: 'Editar PDF', description: 'Inserta notas y firmas.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Reduce el peso antes de distribuir.' }
      ]
    },
    pt: {
      h1: 'Como colocar marca d\'água em PDF grátis sem fazer upload?',
      title: 'Colocar Marca d\'Água em PDF Grátis Online (Texto ou Imagem) | ihatelovepdf',
      metaDescription: 'Insira marcas d\'água de texto (CONFIDENCIAL, RASCUNHO, CÓPIA) ou logotipo em arquivos PDF diretamente no navegador. 100% privado e gratuito.',
      directAnswer: 'Para colocar marca d\'água em PDF grátis sem fazer upload, acerte a ferramenta Marca d\'Água do ihatelovepdf, carregue seu arquivo, digite o texto desejado (como "CONFIDENCIAL") ou suba seu logo, ajuste a transparência e clique em "Aplicar Marca d\'Água". O documento final é gerado no seu dispositivo.',
      toolName: 'Marca d\'Água PDF Online',
      keyTakeaways: [
        'Adicione avisos de texto (ex: CONFIDENCIAL, RASCUNHO, NÃO COPIAR).',
        'Insira logotipos de empresas em formato PNG transparente.',
        'Controle completo de opacidade, tamanho da fonte e inclinação.',
        '100% privado: sua propriedade intelectual nunca sai do seu aparelho.'
      ],
      steps: [
        { title: 'Abra a ferramenta', text: 'Acesse Marca d\'Água no ihatelovepdf.' },
        { title: 'Envie o arquivo', text: 'Arraste o documento PDF para o painel.' },
        { title: 'Personalize a marca', text: 'Escreva o texto ou escolha a imagem; ajuste a transparência.' },
        { title: 'Aplique e baixe', text: 'Clique em "Aplicar Marca d\'Água" para baixar o arquivo protegido.' }
      ],
      commonProblems: [
        { problem: 'A marca d\'água cobriu o texto e atrapalha a leitura.', solution: 'Diminua a opacidade para cerca de 20% para que o conteúdo original fique nítido.' },
        { problem: 'Quero aplicar em diagonal em todas as folhas.', solution: 'Escolha o ângulo de 45 graus e marque a opção de aplicar em todas as páginas.' }
      ],
      faqs: [
        { question: 'A marca d\'água pode ser removida facilmente?', answer: 'A marca é integrada permanentemente na estrutura do arquivo, dificultando remoções não autorizadas.' },
        { question: 'É seguro para propostas comerciais?', answer: 'Sim. Todo o processamento ocorre no próprio navegador sem upload.' },
        { question: 'Tem custo?', answer: 'Não. O serviço é totalmente gratuito.' }
      ],
      privacyNote: 'Conformidade de privacidade absoluta: seus documentos nunca viajam para servidores externos.',
      relatedTools: [
        { slug: 'numeros-de-pagina', name: 'Números de Página', description: 'Numere as páginas do documento.' },
        { slug: 'editar-pdf', name: 'Editar PDF', description: 'Faça revisões e anotações.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Reduza o tamanho do PDF final.' }
      ]
    },
    de: {
      h1: 'Wie kann man PDF-Dateien kostenlos ohne Server-Upload mit Wasserzeichen versehen?',
      title: 'Wasserzeichen in PDF einfügen kostenlos online (Text oder Logo) | ihatelovepdf',
      metaDescription: 'Fügen Sie Wasserzeichen (VERTRAULICH, ENTWURF, KOPIE) oder Firmenlogos direkt im Browser in PDF-Dateien ein. 100% privat ohne Datenupload.',
      directAnswer: 'Um ein PDF ohne Server-Upload kostenlos mit einem Wasserzeichen zu versehen, öffnen Sie "Wasserzeichen" auf ihatelovepdf, fügen Sie Ihr Dokument ein, geben Sie den gewünschten Text ein (z. B. "VERTRAULICH") oder laden Sie ein Logo hoch, passen Sie Deckkraft und Winkel an und klicken Sie auf "Wasserzeichen anwenden". Das Dokument wird im Browser erstellt.',
      toolName: 'Wasserzeichen online',
      keyTakeaways: [
        'Individuelle Textstempel (z. B. VERTRAULICH, ENTWURF, MUSTER).',
        'Einfügen transparenter Firmenlogos im PNG-Format.',
        'Feineinstellung von Transparenz, Schriftgröße, Farbe und 45°-Winkel.',
        '100% Datenschutz: Ihr geistiges Eigentum verlässt Ihren Rechner nicht.'
      ],
      steps: [
        { title: 'Tool aufrufen', text: 'Öffnen Sie "Wasserzeichen" auf ihatelovepdf.' },
        { title: 'PDF einfügen', text: 'Ziehen Sie das Dokument in das Fenster.' },
        { title: 'Wasserzeichen anpassen', text: 'Text eingeben oder Logo wählen; Transparenz und Winkel wählen.' },
        { title: 'Anwenden & Speichern', text: 'Klicken Sie auf "Wasserzeichen anwenden" und laden Sie das PDF herunter.' }
      ],
      commonProblems: [
        { problem: 'Wasserzeichen überdeckt den Text zu stark.', solution: 'Stellen Sie die Deckkraft auf ca. 20% ein, damit der Text gut lesbar bleibt.' },
        { problem: 'Diagonale Platzierung auf allen Seiten gewünscht.', solution: 'Wählen Sie den 45-Grad-Winkel und die Option "Alle Seiten".' }
      ],
      faqs: [
        { question: 'Kann das Wasserzeichen leicht gelöscht werden?', answer: 'Das Wasserzeichen wird fest in den Vektorkorpus des PDFs eingebrannt.' },
        { question: 'Bleiben meine Geschäftsgeheimnisse geschützt?', answer: 'Ja, da alle Berechnungen ausschließlich lokal im Webbrowser ablaufen.' },
        { question: 'Gibt es Einschränkungen?', answer: 'Nein, das Tool ist vollkommen kostenfrei und ohne Begrenzung nutzbar.' }
      ],
      privacyNote: 'Sicherer Datenschutz: Ihre Dokumente werden nicht über das Netzwerk übertragen.',
      relatedTools: [
        { slug: 'seitenzahlen', name: 'Seitenzahlen', description: 'Seitennummerierung hinzufügen.' },
        { slug: 'pdf-bearbeiten', name: 'PDF bearbeiten', description: 'Texte und Anmerkungen ergänzen.' },
        { slug: 'komprimieren', name: 'PDF komprimieren', description: 'Dateigröße vor dem Versenden verringern.' }
      ]
    },
    fr: {
      h1: 'Comment ajouter un filigrane à un PDF gratuitement sans téléversement ?',
      title: 'Ajouter un Filigrane sur PDF Gratuitement (Texte ou Logo) | ihatelovepdf',
      metaDescription: 'Apposez des mentions (CONFIDENTIEL, COPIE, BROUILLON) ou votre logo d\'entreprise directement dans votre navigateur. 100% privé et sans serveur.',
      directAnswer: 'Pour ajouter un filigrane à un PDF gratuitement sans l\'envoyer sur un serveur, accédez à l\'outil Filigrane d\'ihatelovepdf, déposez votre fichier, saisissez votre texte (ex. "CONFIDENTIEL") ou importez un logo, réglez l\'opacité et l\'angle, puis cliquez sur "Appliquer le filigrane". Le document est sécurisé localement dans votre navigateur.',
      toolName: 'Filigrane PDF en ligne',
      keyTakeaways: [
        'Ajoutez des mentions personnalisées (CONFIDENTIEL, SPÉCIMEN, BROUILLON).',
        'Intégrez des logos transparents PNG d\'entreprise.',
        'Réglage précis de l\'opacité, de la couleur et de l\'inclinaison à 45°.',
        'Confidentialité absolue : vos documents ne quittent jamais votre machine.'
      ],
      steps: [
        { title: 'Ouvrir l\'outil', text: 'Accédez à Filigrane sur ihatelovepdf.' },
        { title: 'Déposer le PDF', text: 'Glissez votre document dans le panneau de travail.' },
        { title: 'Configurer le filigrane', text: 'Saisissez le texte ou choisissez une image; ajustez l\'opacité.' },
        { title: 'Appliquer et télécharger', text: 'Cliquez sur "Appliquer le filigrane" pour récupérer votre document protégé.' }
      ],
      commonProblems: [
        { problem: 'Le filigrane gène la lecture du texte.', solution: 'Diminuez l\'opacité autour de 15% à 20% pour une transparence optimale.' },
        { problem: 'Application en diagonale sur toutes les pages.', solution: 'Choisissez l\'angle à 45° et cochez l\'option "Toutes les pages".' }
      ],
      faqs: [
        { question: 'Le filigrane peut-il être supprimé facilement ?', answer: 'Le filigrane est gravé dans la couche vectorielle du fichier PDF, ce qui rend son effacement difficile.' },
        { question: 'Mes documents sont-ils protégés ?', answer: 'Absolument. Aucune information n\'est transférée vers des serveurs distants.' },
        { question: 'Y a-t-il des limitations de pages ?', answer: 'Non, le service est totalement gratuit et illimité.' }
      ],
      privacyNote: 'Sécurité totale pour votre propriété intellectuelle : aucun fichier n\'est téléversé.',
      relatedTools: [
        { slug: 'numerotation-pages', name: 'Numéroter les pages', description: 'Ajoutez une numérotation des pages.' },
        { slug: 'editer-pdf', name: 'Modifier PDF', description: 'Ajoutez du texte et des annotations.' },
        { slug: 'compresser', name: 'Compresser PDF', description: 'Réduisez la taille du fichier avant diffusion.' }
      ]
    },
    it: {
      h1: 'Come inserire una filigrana in un PDF gratis senza caricare file?',
      title: 'Aggiungere Filigrana a PDF Gratis Online (Testo o Logo) | ihatelovepdf',
      metaDescription: 'Applica timbri e scritte (RISERVATO, BOZZA, COPIA) o il tuo logo aziendale sui PDF direttamente nel browser. Privato, rapido e senza invio a server.',
      directAnswer: 'Per inserire una filigrana in un PDF gratis senza inviare documenti a server esterni, apri Filigrana su ihatelovepdf, carica il documento, digita il testo desiderato (come "RISERVATO" o "COPIA") oppure carica un logo, regola opacità e angolazione e clicca su "Applica Filigrana". Il file protetto viene generato nella memoria locale.',
      toolName: 'Filigrana PDF Online',
      keyTakeaways: [
        'Inserisci timbri di testo personalizzati (es. RISERVATO, BOZZA, NON COPIARE).',
        'Aggiungi loghi aziendali trasparenti in formato PNG.',
        'Controllo accurato di trasparenza, dimensione, colore e angolo a 45°.',
        '100% privato: i tuoi documenti personali restano sul tuo dispositivo.'
      ],
      steps: [
        { title: 'Apri lo strumento', text: 'Accedi a Filigrana su ihatelovepdf.' },
        { title: 'Carica il documento', text: 'Trascina il PDF nell\'area di configurazione.' },
        { title: 'Imposta la filigrana', text: 'Scrivi il testo o carica un\'immagine; regola la trasparenza.' },
        { title: 'Applica e salva', text: 'Clicca su "Applica Filigrana" e scarica il file protetto.' }
      ],
      commonProblems: [
        { problem: 'La filigrana copre il testo rendendolo poco leggibile.', solution: 'Riduci l\'opacità al 20% per consentire una lettura agevole delle scritte.' },
        { problem: 'Voglio il timbro diagonale su tutte le pagine.', solution: 'Imposta l\'inclinazione a 45 gradi e seleziona "Tutte le pagine".' }
      ],
      faqs: [
        { question: 'La filigrana può essere rimossa facilmente da altri?', answer: 'La filigrana viene fusa nei livelli del PDF per contrastare utilizzi non autorizzati.' },
        { question: 'I miei contratti sono al sicuro?', answer: 'Sì. Tutti i calcoli avvengono nella memoria del tuo browser.' },
        { question: 'Ci sono costi nascosti?', answer: 'No, l\'applicazione è gratuita e senza limiti.' }
      ],
      privacyNote: 'Privacy totale per la tua proprietà intellettuale: nessun dato abbandona il tuo computer.',
      relatedTools: [
        { slug: 'numeri-di-pagina', name: 'Numeri di Pagina', description: 'Inserisci la numerazione delle pagine.' },
        { slug: 'modifica-pdf', name: 'Modifica PDF', description: 'Aggiungi note e modifiche.' },
        { slug: 'comprimi', name: 'Comprimi PDF', description: 'Riduci le dimensioni prima dell\'invio.' }
      ]
    },
    ro: {
      h1: 'Cum să adaugi un filigran pe un PDF gratuit fără încărcare pe server?',
      title: 'Adaugă Filigran pe PDF Gratuit Online (Text sau Siglă) | ihatelovepdf',
      metaDescription: 'Aplică marcaje personalizate (CONFIDENȚIAL, COPIE, DRAFT) sau sigla companiei direct în browserul tău. 100% confidențial, gratuit și fără server.',
      directAnswer: 'Pentru a adăuga un filigran pe un PDF gratuit fără încărcare pe server, deschide instrumentul Filigran din ihatelovepdf, încarcă documentul, tastează textul dorit (ex. "CONFIDENȚIAL") sau adaugă o siglă, setează transparența și unghiul dorit și apasă pe "Aplică Filigran". Documentul securizat este descărcat imediat.',
      toolName: 'Filigran PDF Online',
      keyTakeaways: [
        'Adaugă marcaje text de protecție (ex: CONFIDENȚIAL, COPIE, PROIECT).',
        'Inserează sigle transparente PNG ale firmei tale.',
        'Control precis asupra opacității, dimensiunii fontului și unghiului la 45°.',
        '100% confidențial: proprietatea ta intelectuală rămâne pe dispozitiv.'
      ],
      steps: [
        { title: 'Deschide instrumentul', text: 'Accesează Filigran pe ihatelovepdf.' },
        { title: 'Încarcă documentul', text: 'Plasează fișierul PDF în ecranul de lucru.' },
        { title: 'Configurează filigranul', text: 'Scrie textul sau alege o poză; reglează transparența.' },
        { title: 'Aplică și descarcă', text: 'Apasă pe "Aplică Filigran" pentru a salva documentul protejat.' }
      ],
      commonProblems: [
        { problem: 'Filigranul este prea opac și acoperă textul.', solution: 'Redu opacitatea la 15%-20% pentru ca textul din fundal să rămână clar.' },
        { problem: 'Vreau afișare diagonală pe toate paginile.', solution: 'Selectează unghiul de 45 de grade și bifează "Toate paginile".' }
      ],
      faqs: [
        { question: 'Poate fi șters ușor filigranul?', answer: 'Filigranul este integrat direct în stratul vectorial al PDF-ului, îngreunând eliminarea neautorizată.' },
        { question: 'Sunt documentele mele în siguranță?', answer: 'Da, prelucrarea are loc exclusiv local în memoria browserului tău.' },
        { question: 'Se adaugă reclame?', answer: 'Nu. Fișierele sunt curate și fidele cerințelor tale.' }
      ],
      privacyNote: 'Confidențialitate garantată: documentele tale protejate nu ajung pe servere externe.',
      relatedTools: [
        { slug: 'numerotare-pagini', name: 'Numerotare Pagini', description: 'Numerotează paginile documentului.' },
        { slug: 'editeaza-pdf', name: 'Editează PDF', description: 'Adaugă adnotări și text.' },
        { slug: 'comprima', name: 'Comprimă PDF', description: 'Micșorează fișierul înainte de expediere.' }
      ]
    },
    ru: {
      h1: 'Как добавить водяной знак в PDF бесплатно без загрузки на сервер?',
      title: 'Добавить водяной знак в PDF онлайн бесплатно (Текст или логотип) | ihatelovepdf',
      metaDescription: 'Накладывайте защитные надписи (КОНФИДЕНЦИАЛЬНО, КОПИЯ, ОБРАЗЕЦ) или логотипы прямо в браузере. Бесплатно, без водяных знаков и передачи на сервер.',
      directAnswer: 'Чтобы добавить водяной знак в PDF бесплатно без отправки на сервер, откройте инструмент «Водяной знак» на ihatelovepdf, загрузите файл, введите нужный текст (например, «КОНФИДЕНЦИАЛЬНО») или выберите логотип, настройте прозрачность и угол и нажмите «Применить водяной знак». Документ сохраняется локально.',
      toolName: 'Водяной знак PDF онлайн',
      keyTakeaways: [
        'Наложение любых текстовых штампов (КОНФИДЕНЦИАЛЬНО, ОБРАЗЕЦ, КОПИЯ).',
        'Вставка корпоративных логотипов в формате PNG с прозрачным фоном.',
        'Точная настройка прозрачности, цвета, размера и наклона под углом 45°.',
        '100% приватность: документы с коммерческой тайной остаются на вашем ПК.'
      ],
      steps: [
        { title: 'Откройте инструмент', text: 'Зайдите в раздел «Водяной знак» на ihatelovepdf.' },
        { title: 'Загрузите документ', text: 'Перетащите PDF-файл в рабочую область.' },
        { title: 'Настройте параметры', text: 'Введите текст или выберите логотип; задайте прозрачность.' },
        { title: 'Примените и скачайте', text: 'Нажмите «Применить водяной знак» для сохранения файла.' }
      ],
      commonProblems: [
        { problem: 'Водяной знак мешает читать текст под ним.', solution: 'Установите прозрачность на уровень 15–20%, чтобы основной текст оставался читаемым.' },
        { problem: 'Нужно разместить знак по диагонали на всех листах.', solution: 'Выберите угол наклона 45 градусов и пункт «Все страницы».' }
      ],
      faqs: [
        { question: 'Сможет ли кто-то легко удалить водяной знак?', answer: 'Водяной знак встраивается в векторный слой документа, что существенно затрудняет его удаление.' },
        { question: 'Безопасно ли это для коммерческих договоров?', answer: 'Полностью безопасно: обработка файлов идет локально без передачи в облако.' },
        { question: 'Добавляются ли сторонние водяные знаки?', answer: 'Нет. Создаются только те знаки, которые вы настроили.' }
      ],
      privacyNote: 'Защита конфиденциальности: ваша интеллектуальная собственность остается на вашем компьютере.',
      relatedTools: [
        { slug: 'nomera-stranic', name: 'Номера страниц', description: 'Добавьте нумерацию страниц.' },
        { slug: 'redaktirovat-pdf', name: 'Редактировать PDF', description: 'Внесите правки и заметки.' },
        { slug: 'szhat', name: 'Сжать PDF', description: 'Уменьшите размер документа перед отправкой.' }
      ]
    },
    hu: {
      h1: 'Hogyan helyezhet el vízjelet PDF-en ingyen, feltöltés nélkül?',
      title: 'Vízjel hozzáadása PDF-hez ingyen online (Szöveg vagy logó) | ihatelovepdf',
      metaDescription: 'Helyezzen el egyedi vízjeleket (BIZALMAS, MÁSOLAT, TERVEZET) vagy céges logót közvetlenül a böngészőjében. 100% privát, feltöltés nélkül.',
      directAnswer: 'A vízjel PDF-re helyezéséhez nyissa meg az ihatelovepdf Vízjel eszközét, töltse be a dokumentumot, írja be a kívánt szöveget (pl. "BIZALMAS") vagy töltsön fel egy logót, állítsa be az átlátszóságot és dőlésszöget, majd kattintson a "Vízjel alkalmazása" gombra. A védett fájl helyben jön létre a memóriában.',
      toolName: 'Vízjel hozzáadása online',
      keyTakeaways: [
        'Egyedi szöveges bélyegzők (pl. BIZALMAS, MÁSOLAT, MINTA).',
        'Átlátszó hátterű PNG céges logók beillesztése.',
        'Átlátszóság, betűméret, szín és 45 fokos dőlésszög finomhangolása.',
        '100% biztonság: szellemi tulajdona nem jut ki a felhőbe.'
      ],
      steps: [
        { title: 'Nyissa meg az eszközt', text: 'Keresse fel a Vízjel lapot az ihatelovepdf oldalon.' },
        { title: 'Húzza be a dokumentumot', text: 'Helyezze a fájlt a kijelölt felületre.' },
        { title: 'Állítsa be a vízjelet', text: 'Adja meg a szöveget vagy a képet; állítsa be az áttetszőséget.' },
        { title: 'Alkalmazza és mentse', text: 'Kattintson a "Vízjel alkalmazása" gombra a letöltéshez.' }
      ],
      commonProblems: [
        { problem: 'A vízjel eltakarja az eredeti szöveget.', solution: 'Csökkentse az átlátszatlanságot 15-20%-ra a könnyű olvashatóság érdekében.' },
        { problem: 'Átlós elhelyezés szükséges minden oldalon.', solution: 'Válassza a 45 fokos szöget és az "Összes oldal" beállítást.' }
      ],
      faqs: [
        { question: 'Könnyen eltávolítható a vízjel utólag?', answer: 'A vízjel beépül a PDF vektorkészletébe, így nehezen távolítható el engedély nélkül.' },
        { question: 'Biztonságos a belső dokumentumok vízjelezése?', answer: 'Igen, mert a műveletek helyben a böngészőjében futnak külső szerverek nélkül.' },
        { question: 'Kerül rá reklám vagy egyéb jelzés?', answer: 'Nem, csak az Ön által megadott vízjel jelenik meg a dokumentumon.' }
      ],
      privacyNote: 'Szigorú adatvédelem: a fájlok nem kerülnek feltöltésre semmilyen szerverre.',
      relatedTools: [
        { slug: 'oldalszamozas', name: 'Oldalszámozás', description: 'Lássa el oldalszámozással az iratot.' },
        { slug: 'pdf-szerkesztese', name: 'PDF szerkesztése', description: 'Fűzzön kiegészítéseket a dokumentumhoz.' },
        { slug: 'tomoriteni', name: 'PDF tömörítése', description: 'Csökkentse a kész dokumentum méretét.' }
      ]
    }
  },

  // 14. Add Page Numbers to PDF
  {
    slug: 'how-to-add-page-numbers-to-pdf',
    opKey: 'pageNumbers',
    category: 'Organization',
    readTime: '3 min read',
    en: {
      h1: 'How to Add Page Numbers to a PDF for Free Without Uploading?',
      title: 'Add Page Numbers to PDF Free Online (Header & Footer) | ihatelovepdf',
      metaDescription: 'Insert sequential page numbers, headers, and footers into your PDF documents directly in your browser. Choose position, font, and format without server uploads.',
      directAnswer: 'To add page numbers to a PDF for free without uploading, open the ihatelovepdf Page Numbers tool, upload your document, select your preferred numbering format (e.g., "Page 1 of N" or simple numbers), choose header or footer placement, and click "Add Page Numbers". The numbers stamp cleanly into the PDF in browser memory and download immediately.',
      toolName: 'Page Numbers Online',
      keyTakeaways: [
        'Choose multiple numbering formats: "1, 2, 3", "Page 1 of N", or roman numerals.',
        'Place numbers at top-left, top-center, top-right, bottom-left, bottom-center, or bottom-right.',
        'Customize starting page number and exclude cover or title pages.',
        '100% private in-browser numbering: files never touch a remote server.'
      ],
      steps: [
        { title: 'Open Page Numbers Tool', text: 'Visit Page Numbers on ihatelovepdf.' },
        { title: 'Upload Document', text: 'Drag your PDF into the document window.' },
        { title: 'Configure Placement & Style', text: 'Pick position (e.g., Bottom Right), format, and starting number.' },
        { title: 'Apply & Download', text: 'Click "Add Page Numbers" to generate and download your numbered PDF.' }
      ],
      commonProblems: [
        { problem: 'Cover page should not display page number 1.', solution: 'Set the "Start numbering on page" option to page 2 to leave your cover page unnumbered.' },
        { problem: 'Numbers overlap with footer text in the original document.', solution: 'Adjust the vertical margin slider to push numbers lower towards the bottom edge.' }
      ],
      faqs: [
        { question: 'Can I format numbers as "Page X of Y"?', answer: 'Yes. Our tool supports dynamic total page calculation formats cleanly.' },
        { question: 'Will adding page numbers affect existing text or links?', answer: 'No. Page numbers are stamped onto a separate overlay layer, leaving your original vector content untouched.' },
        { question: 'Is it free and without watermarks?', answer: 'Yes. The tool is completely free with zero watermarks.' }
      ],
      privacyNote: 'Your document never leaves your machine. Verified zero server uploads via client-side WebAssembly execution.',
      relatedTools: [
        { slug: 'merge', name: 'Merge PDF', description: 'Combine documents before adding unified page numbers.' },
        { slug: 'watermark', name: 'Watermark PDF', description: 'Add security watermarks to pages.' },
        { slug: 'compress', name: 'Compress PDF', description: 'Optimize document size for email delivery.' }
      ]
    },
    es: {
      h1: '¿Cómo poner números de página a un PDF gratis sin subir archivos a un servidor?',
      title: 'Poner Números de Página a PDF Gratis Online (Pie de Página) | ihatelovepdf',
      metaDescription: 'Inserta números de página correlativos, encabezados y pies de página en tus documentos PDF directamente en tu navegador. 100% privado y sin subir archivos.',
      directAnswer: 'Para poner números de página a un PDF gratis sin subir archivos a un servidor, entra en la herramienta Números de Página de ihatelovepdf, carga tu documento, selecciona el formato (ej. "Página 1 de N" o números simples), elige la posición y pulsa "Añadir Números de Página". La numeración se aplica al instante en tu equipo.',
      toolName: 'Números de Página Online',
      keyTakeaways: [
        'Varios formatos de numeración: "1, 2, 3", "Página 1 de N" o números romanos.',
        'Colocación en cualquier esquina o centrado superior/inferior.',
        'Opción para omitir la portada y comenzar a numerar en la página 2.',
        '100% privado: tus documentos nunca se envían a servidores externos.'
      ],
      steps: [
        { title: 'Abre la herramienta', text: 'Entra en Números de Página en ihatelovepdf.' },
        { title: 'Sube tu PDF', text: 'Arrastra el documento a numerar a la pantalla.' },
        { title: 'Configura la posición', text: 'Elige la ubicación (ej. Abajo a la derecha), estilo y margen.' },
        { title: 'Aplica y descarga', text: 'Haz clic en "Añadir Números de Página" para guardar el archivo listo.' }
      ],
      commonProblems: [
        { problem: 'No quiero que la portada tenga número.', solution: 'Indica que la numeración empiece en la página 2 para dejar la portada limpia.' },
        { problem: 'El número se superpone con el texto del documento.', solution: 'Ajusta el margen inferior para separar los números del contenido principal.' }
      ],
      faqs: [
        { question: '¿Puedo usar el formato "Página X de Y"?', answer: 'Sí. El calculador calcula automáticamente el total de páginas del documento.' },
        { question: '¿Daña los enlaces o el texto previo?', answer: 'No. Los números se añaden como una capa limpia sin alterar el contenido original.' },
        { question: '¿Añade marcas de agua?', answer: 'No. El documento queda completamente limpio.' }
      ],
      privacyNote: 'Tus informes y tesis académicas se procesan en tu navegador. Máxima confidencialidad.',
      relatedTools: [
        { slug: 'unir', name: 'Unir PDF', description: 'Une documentos antes de numerarlos uniformemente.' },
        { slug: 'marca-de-agua', name: 'Marca de Agua', description: 'Añade sellos de seguridad.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Reduce el peso del archivo numerado.' }
      ]
    },
    pt: {
      h1: 'Como numerar páginas de PDF grátis sem fazer upload no servidor?',
      title: 'Numerar Páginas de PDF Grátis Online (Cabeçalho e Rodapé) | ihatelovepdf',
      metaDescription: 'Adicione numeração de páginas sequencial, cabeçalhos e rodapés em documentos PDF diretamente no navegador. 100% privado, rápido e sem upload.',
      directAnswer: 'Para numerar páginas de PDF grátis sem fazer upload, acerte a ferramenta Números de Página do ihatelovepdf, carregue seu arquivo, escolha o formato (ex: "Página 1 de N" ou números simples), defina a posição e clique em "Adicionar Números de Página". A numeração é estampada localmente no seu dispositivo.',
      toolName: 'Números de Página Online',
      keyTakeaways: [
        'Diversos formatos: "1, 2, 3", "Página 1 de N" ou algarismos romanos.',
        'Posicionamento no rodapé ou cabeçalho (esquerda, centro ou direita).',
        'Opção para ignorar a capa e começar a contagem na folha 2.',
        '100% privado: seus documentos acadêmicos e legais ficam no seu aparelho.'
      ],
      steps: [
        { title: 'Abra a ferramenta', text: 'Acesse Números de Página no ihatelovepdf.' },
        { title: 'Envie o arquivo', text: 'Arraste seu PDF para a área de edição.' },
        { title: 'Escolha a posição', text: 'Selecione onde os números devem aparecer (ex: Rodapé à direita).' },
        { title: 'Aplique e baixe', text: 'Clique em "Adicionar Números de Página" para baixar o PDF numerado.' }
      ],
      commonProblems: [
        { problem: 'A primeira folha de capa não deve ser numerada.', solution: 'Defina a opção de iniciar a numeração a partir da página 2.' },
        { problem: 'O número ficou em cima do texto existente.', solution: 'Ajuste a margem do rodapé para afastar o número do corpo do texto.' }
      ],
      faqs: [
        { question: 'Suporta o formato "Página X de Y"?', answer: 'Sim. A contagem total de páginas é gerada de forma automática.' },
        { question: 'Altera o texto já existente?', answer: 'Não. Os números entram como uma camada adicional sem modificar o texto original.' },
        { question: 'Tem marca d\'água?', answer: 'Não. O arquivo gerado é 100% limpo.' }
      ],
      privacyNote: 'Total respeito à sua privacidade: nenhum dado viaja para servidores externos.',
      relatedTools: [
        { slug: 'juntar', name: 'Juntar PDF', description: 'Junte relatórios antes de numerar.' },
        { slug: 'marca-dagua', name: 'Marca d\'Água', description: 'Insira marcas de identificação.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Otimize o tamanho para envio.' }
      ]
    },
    de: {
      h1: 'Wie kann man PDF-Dateien kostenlos ohne Server-Upload durchnummerieren?',
      title: 'Seitenzahlen in PDF einfügen kostenlos online (Kopf- & Fußzeile) | ihatelovepdf',
      metaDescription: 'Fügen Sie fortlaufende Seitenzahlen, Kopfzeilen und Fußzeilen direkt im Browser in PDF-Dateien ein. 100% privat ohne Datenupload und flexibel anpassbar.',
      directAnswer: 'Um eine PDF-Datei ohne Server-Upload kostenlos durchzunummerieren, öffnen Sie "Seitenzahlen" auf ihatelovepdf, fügen Sie Ihr Dokument ein, wählen Sie das Format (z. B. "Seite 1 von N" oder einfache Ziffern), bestimmen Sie die Position und klicken Sie auf "Seitenzahlen hinzufügen". Die Nummern werden lokal im Browser gestempelt.',
      toolName: 'Seitenzahlen online',
      keyTakeaways: [
        'Verschiedene Zählformate: "1, 2, 3", "Seite 1 von N" oder römische Ziffern.',
        'Flexible Platzierung in Kopf- oder Fußzeile (links, mittig oder rechts).',
        'Deckblatt einfach von der Zählung ausschließen (Start bei Seite 2).',
        '100% Datenschutz: Ihre Dokumente verlassen Ihren PC nicht.'
      ],
      steps: [
        { title: 'Tool aufrufen', text: 'Öffnen Sie "Seitenzahlen" auf ihatelovepdf.' },
        { title: 'PDF einfügen', text: 'Ziehen Sie das Dokument in den Arbeitsbereich.' },
        { title: 'Format & Position wählen', text: 'Wählen Sie die Position (z. B. Fußzeile rechts) und das Zahlenformat.' },
        { title: 'Nummerieren & Speichern', text: 'Klicken Sie auf "Seitenzahlen hinzufügen" und laden Sie das PDF herunter.' }
      ],
      commonProblems: [
        { problem: 'Deckblatt soll keine Seitenzahl erhalten.', solution: 'Stellen Sie "Nummerierung beginnen ab Seite" auf Seite 2 ein.' },
        { problem: 'Seitenzahlen überlagern bestehenden Text.', solution: 'Passen Sie den Abstand zum Seitenrand mit dem Schieberegler an.' }
      ],
      faqs: [
        { question: 'Ist das Format "Seite X von Y" möglich?', answer: 'Ja. Die Gesamtzahl der Seiten wird automatisch berechnet und eingefügt.' },
        { question: 'Werden vorhandene Links oder Texte beeinträchtigt?', answer: 'Nein, die Nummern werden auf einer separaten Ebene platziert.' },
        { question: 'Werden Wasserzeichen hinzugefügt?', answer: 'Nein, das Dokument bleibt vollkommen sauber.' }
      ],
      privacyNote: 'DSGVO-konforme Verarbeitung: Keine Übermittlung Ihrer Dateien an externe Server.',
      relatedTools: [
        { slug: 'zusammenfuehren', name: 'PDF zusammenfügen', description: 'Dokumente vor der Nummerierung vereinen.' },
        { slug: 'wasserzeichen', name: 'Wasserzeichen', description: 'Schutzvermerke hinzufügen.' },
        { slug: 'komprimieren', name: 'PDF komprimieren', description: 'Dateigröße verringern.' }
      ]
    },
    fr: {
      h1: 'Comment numéroter les pages d\'un PDF gratuitement sans téléversement ?',
      title: 'Numéroter les Pages d\'un PDF Gratuitement en Ligne | ihatelovepdf',
      metaDescription: 'Insérez une numérotation séquentielle, des en-têtes et des pieds de page dans vos PDF directement dans votre navigateur. 100% privé et sans serveur.',
      directAnswer: 'Pour numéroter les pages d\'un PDF gratuitement sans l\'envoyer sur un serveur, accédez à l\'outil Numérotation des pages d\'ihatelovepdf, déposez votre document, sélectionnez le format (ex. "Page 1 sur N" ou chiffres simples), définissez la position et cliquez sur "Ajouter les numéros". La numérotation est intégrée en mémoire locale.',
      toolName: 'Numérotation pages en ligne',
      keyTakeaways: [
        'Multiples formats de numérotation : "1, 2, 3", "Page 1 sur N" ou chiffres romains.',
        'Emplacement au choix en haut ou en bas (gauche, centre, droite).',
        'Possibilité d\'ignorer la page de garde et de démarrer à la page 2.',
        'Confidentialité absolue : vos mémoires et contrats restent sur votre machine.'
      ],
      steps: [
        { title: 'Ouvrir l\'outil', text: 'Accédez à Numérotation des pages sur ihatelovepdf.' },
        { title: 'Ajouter votre PDF', text: 'Glissez votre document dans la zone de traitement.' },
        { title: 'Choisir la disposition', text: 'Définissez la position (ex. Bas à droite) et le style de numérotation.' },
        { title: 'Appliquer et télécharger', text: 'Cliquez sur "Ajouter les numéros" pour récupérer le fichier final.' }
      ],
      commonProblems: [
        { problem: 'La page de garde ne doit pas porter de numéro.', solution: 'Indiquez de commencer la numérotation à partir de la page 2.' },
        { problem: 'Le numéro chevauche le texte en bas de page.', solution: 'Ajustez la marge inférieure pour décaler le numéro vers le bord.' }
      ],
      faqs: [
        { question: 'Peut-on afficher "Page X sur Y" ?', answer: 'Oui. Le calcul du total des pages s\'effectue de manière dynamique et automatique.' },
        { question: 'Le texte existant est-il modifié ?', answer: 'Non. La numérotation s\'ajoute comme une couche supérieure sans altérer le texte d\'origine.' },
        { question: 'Le service ajoute-t-il des filigranes ?', answer: 'Non. Vos documents restent entièrement vierges de toute publicité.' }
      ],
      privacyNote: 'Sécurité totale : vos fichiers restent strictement sur votre appareil.',
      relatedTools: [
        { slug: 'fusionner', name: 'Fusionner PDF', description: 'Assemblez vos documents avant numérotation.' },
        { slug: 'filigrane', name: 'Filigrane PDF', description: 'Ajoutez une mention de sécurité.' },
        { slug: 'compresser', name: 'Compresser PDF', description: 'Réduisez la taille du fichier final.' }
      ]
    },
    it: {
      h1: 'Come numerare le pagine di un PDF gratis senza caricare file?',
      title: 'Numerare Pagine PDF Gratis Online (Intestazione e Piè di Pagina) | ihatelovepdf',
      metaDescription: 'Aggiungi numeri di pagina sequenziali, intestazioni e note a piè di pagina sui tuoi PDF direttamente nel browser. Privato, rapido e senza invio a server.',
      directAnswer: 'Per numerare le pagine di un PDF gratis senza inviare documenti a server esterni, apri Numeri di Pagina su ihatelovepdf, inserisci il file, scegli il formato (es. "Pagina 1 di N" o numeri semplici), seleziona la posizione e clicca su "Aggiungi Numeri di Pagina". La numerazione viene impressa localmente nella memoria del browser.',
      toolName: 'Numeri di Pagina Online',
      keyTakeaways: [
        'Formati flessibili: "1, 2, 3", "Pagina 1 di N" o numeri romani.',
        'Posizionamento in alto o in basso (a sinistra, al centro o a destra).',
        'Possibilità di escludere la copertina iniziando dalla pagina 2.',
        '100% privato: tesi e documenti riservati restano sul tuo computer.'
      ],
      steps: [
        { title: 'Apri la pagina', text: 'Accedi a Numeri di Pagina su ihatelovepdf.' },
        { title: 'Carica il documento', text: 'Trascina il PDF nell\'area di configurazione.' },
        { title: 'Configura la posizione', text: 'Seleziona dove mostrare i numeri (es. In basso a destra) e lo stile.' },
        { title: 'Applica e scarica', text: 'Clicca su "Aggiungi Numeri di Pagina" e salva il documento pronto.' }
      ],
      commonProblems: [
        { problem: 'La prima pagina di copertina non deve avere il numero.', solution: 'Imposta l\'inizio della numerazione a partire dalla pagina 2.' },
        { problem: 'I numeri si sovrappongono al testo del piè di pagina.', solution: 'Modifica il margine inferiore per distanziare i numeri dal testo.' }
      ],
      faqs: [
        { question: 'È supportato il formato "Pagina X di Y"?', answer: 'Sì. Il calcolo delle pagine totali viene eseguito in automatico.' },
        { question: 'I collegamenti e i testi esistenti vengono modificati?', answer: 'No. I numeri vengono posizionati su un livello pulito sopra il documento.' },
        { question: 'Ci sono watermark pubblicitari?', answer: 'No, il risultato è pulito e senza watermark.' }
      ],
      privacyNote: 'Massima tutela della privacy: nessun byte viene inviato in rete.',
      relatedTools: [
        { slug: 'unisci', name: 'Unisci PDF', description: 'Unisci documenti prima di numerarli in modo uniforme.' },
        { slug: 'filigrana', name: 'Filigrana PDF', description: 'Aggiungi marchi protettivi.' },
        { slug: 'comprimi', name: 'Comprimi PDF', description: 'Riduci il peso del file numerato.' }
      ]
    },
    ro: {
      h1: 'Cum să adaugi numere de pagină pe un PDF gratuit fără încărcare pe server?',
      title: 'Numerotează Pagini PDF Gratuit Online (Antet și Subsol) | ihatelovepdf',
      metaDescription: 'Inserează numere secvențiale, anteturi și subsoluri în documentele PDF direct în browser. 100% confidențial, gratuit și fără încărcare pe server.',
      directAnswer: 'Pentru a adăuga numere de pagină pe un PDF gratuit fără încărcare pe server, deschide Numerotare Pagini din ihatelovepdf, adaugă documentul, selectează formatul dorit (ex. "Pagina 1 din N" sau cifre simple), alege poziția și apasă pe "Adaugă Numere de Pagină". Numerele sunt aplicate în memoria locală și fișierul se descarcă imediat.',
      toolName: 'Numerotare Pagini Online',
      keyTakeaways: [
        'Formate variate de numerotare: "1, 2, 3", "Pagina 1 din N" sau cifre romane.',
        'Amplasare flexibilă în subsol sau antet (stânga, centru sau dreapta).',
        'Opțiune de a omite coperta și de a începe numerotarea de la pagina 2.',
        '100% confidențial: documentele tale rămân strict pe dispozitiv.'
      ],
      steps: [
        { title: 'Deschide instrumentul', text: 'Accesează Numerotare Pagini pe ihatelovepdf.' },
        { title: 'Încarcă documentul', text: 'Plasează fișierul PDF în ecranul de lucru.' },
        { title: 'Configurează poziția', text: 'Alege poziția dorită (ex. Jos în dreapta) și formatul numerotării.' },
        { title: 'Aplică și descarcă', text: 'Apasă pe "Adaugă Numere de Pagină" pentru descărcare.' }
      ],
      commonProblems: [
        { problem: 'Coperta nu trebuie să fie numerotată.', solution: 'Setează începerea numerotării de la pagina 2 pentru a lăsa coperta intactă.' },
        { problem: 'Numărul se suprapune peste textul existent.', solution: 'Mărește marginea de jos pentru a coborî numărul spre marginea colii.' }
      ],
      faqs: [
        { question: 'Pot numerota sub forma "Pagina X din Y"?', answer: 'Da. Numărul total de pagini este calculat automat.' },
        { question: 'Afectează textul sau linkurile din document?', answer: 'Nu. Numerotarea se adaugă ca un strat curat deasupra paginii.' },
        { question: 'Se adaugă filigrane?', answer: 'Nu. Fișierele sunt complet curate.' }
      ],
      privacyNote: 'Confidențialitate absolută: documentele tale nu părăsesc dispozitivul.',
      relatedTools: [
        { slug: 'uneste', name: 'Unește PDF', description: 'Îmbină documente înainte de numerotare.' },
        { slug: 'filigran', name: 'Filigran PDF', description: 'Adaugă marcaje de siguranță.' },
        { slug: 'comprima', name: 'Comprimă PDF', description: 'Micșorează fișierul numerotat.' }
      ]
    },
    ru: {
      h1: 'Как добавить номера страниц в PDF бесплатно без загрузки на сервер?',
      title: 'Номера страниц в PDF онлайн бесплатно (Колонтитулы и нумерация) | ihatelovepdf',
      metaDescription: 'Вставляйте последовательную нумерацию, верхние и нижние колонтитулы в PDF прямо в браузере. Быстро, бесплатно, без водяных знаков и передачи на сервер.',
      directAnswer: 'Чтобы добавить номера страниц в PDF бесплатно без отправки на сервер, откройте инструмент «Номера страниц» на ihatelovepdf, добавьте документ, выберите формат (например, «Страница 1 из N» или простые числа), настройте расположение и нажмите «Добавить номера страниц». Номера наносятся локально в памяти вашего браузера.',
      toolName: 'Номера страниц в PDF онлайн',
      keyTakeaways: [
        'Различные форматы: «1, 2, 3», «Страница 1 из N» или римские цифры.',
        'Размещение внизу или вверху страницы (слева, по центру или справа).',
        'Возможность исключить титульный лист и начать нумерацию со 2-й страницы.',
        '100% приватность: научные работы и договоры остаются на вашем ПК.'
      ],
      steps: [
        { title: 'Откройте инструмент', text: 'Зайдите в раздел «Номера страниц» на ihatelovepdf.' },
        { title: 'Загрузите документ', text: 'Перетащите PDF-файл в рабочую область.' },
        { title: 'Настройте стиль', text: 'Выберите расположение (например, внизу справа) и начальный номер.' },
        { title: 'Примените и скачайте', text: 'Нажмите «Добавить номера страниц» для сохранения документа.' }
      ],
      commonProblems: [
        { problem: 'На обложке не должно быть номера.', solution: 'Укажите в настройках начало нумерации со 2-й страницы.' },
        { problem: 'Номера перекрывают нижний текст страницы.', solution: 'Отрегулируйте ползунок отступа, чтобы сдвинуть номер ближе к краю листа.' }
      ],
      faqs: [
        { question: 'Можно ли сделать формат «Страница X из Y»?', answer: 'Да. Программа автоматически подсчитывает общее количество страниц.' },
        { question: 'Повредит ли это существующий текст или ссылки?', answer: 'Нет. Номера добавляются отдельным слоем, не затрагивая исходный контент.' },
        { question: 'Добавляются ли водяные знаки?', answer: 'Нет. Документы скачиваются абсолютно чистыми.' }
      ],
      privacyNote: 'Защита конфиденциальности: ваши файлы не передаются сторонним серверам.',
      relatedTools: [
        { slug: 'obedinit', name: 'Объединить PDF', description: 'Соберите файлы перед единой нумерацией.' },
        { slug: 'vodyanoj-znak', name: 'Водяной знак', description: 'Нанесите защитный водяной знак.' },
        { slug: 'szhat', name: 'Сжать PDF', description: 'Уменьшите размер пронумерованного документа.' }
      ]
    },
    hu: {
      h1: 'Hogyan számozhat be PDF oldalakat ingyen, feltöltés nélkül?',
      title: 'Oldalszámozás PDF-ben ingyen online (Élőfej és élőláb) | ihatelovepdf',
      metaDescription: 'Helyezzen el sorszámozást, élőfejeket és élőlábakat a PDF dokumentumokban közvetlenül a böngészőjében. 100% privát, feltöltés és vízjelek nélkül.',
      directAnswer: 'A PDF oldalszámozásához nyissa meg az ihatelovepdf Oldalszámozás eszközét, töltse be a dokumentumot, válassza ki a kívánt formátumot (pl. "1. oldal / N" vagy egyszerű sorszámok), határozza meg a pozíciót, majd kattintson az "Oldalszámok hozzáadása" gombra. A számozás helyben a böngésző memóriájában kerül beillesztésre.',
      toolName: 'Oldalszámozás online',
      keyTakeaways: [
        'Változatos formátumok: "1, 2, 3", "1. oldal / N" vagy római számok.',
        'Elhelyezés a fejlécben vagy láblécben (balra, középre vagy jobbra).',
        'A borítólap kihagyható: a számozás indulhat a 2. oldaltól.',
        '100% biztonság: diplomamunkái és hivatalos iratai nem jutnak ki a felhőbe.'
      ],
      steps: [
        { title: 'Nyissa meg az eszközt', text: 'Keresse fel az Oldalszámozás lapot az ihatelovepdf oldalon.' },
        { title: 'Húzza be a dokumentumot', text: 'Helyezze a PDF-et a kijelölt felületre.' },
        { title: 'Állítsa be a pozíciót', text: 'Válassza ki a helyet (pl. jobb alsó sarok) és a számozás stílusát.' },
        { title: 'Alkalmazza és mentse', text: 'Kattintson az "Oldalszámok hozzáadása" gombra a letöltéshez.' }
      ],
      commonProblems: [
        { problem: 'A címlapon nem szerepelhet oldalszám.', solution: 'Állítsa a kezdőoldalt a 2. oldalra, így a borító üresen marad.' },
        { problem: 'A szám rákerült a lábléc meglévő szövegére.', solution: 'Módosítsa a margót a szám lejjebb tolásához.' }
      ],
      faqs: [
        { question: 'Lehetséges "X. oldal az Y-ból" formátumot választani?', answer: 'Igen. A teljes oldalszám dinamikusan kiszámításra kerül.' },
        { question: 'Változik az eredeti tartalom vagy a linkek?', answer: 'Nem. A számozás tiszta felületi rétegként kerül rá, az eredeti szöveg érintetlen marad.' },
        { question: 'Kerül vízjel a kész fájlra?', answer: 'Nem, a dokumentumok teljesen tiszták maradnak.' }
      ],
      privacyNote: 'Szigorú adatvédelem: a fájlok nem kerülnek feltöltésre semmilyen szerverre.',
      relatedTools: [
        { slug: 'osszefuzni', name: 'PDF egyesítése', description: 'Egyesítsen dokumentumokat a számozás előtt.' },
        { slug: 'vizjel', name: 'Vízjel készítése', description: 'Helyezzen el biztonsági vízjelet.' },
        { slug: 'tomoriteni', name: 'PDF tömörítése', description: 'Csökkentse a kész dokumentum méretét.' }
      ]
    }
  },

  // 15. Convert PDF to Excel
  {
    slug: 'how-to-convert-pdf-to-excel',
    opKey: 'pdfToExcel',
    category: 'How-To',
    readTime: '4 min read',
    en: {
      h1: 'How to Convert PDF to Excel Spreadsheet for Free Without Uploading?',
      title: 'Convert PDF to Excel Free Online (.xlsx) - Zero Uploads | ihatelovepdf',
      metaDescription: 'Extract tables, numerical figures, and financial data from PDF documents into editable Microsoft Excel spreadsheets (.xlsx) in your browser. 100% private.',
      directAnswer: 'To convert PDF to Excel for free without uploading, open the ihatelovepdf PDF to Excel tool, upload your PDF document, and click "Convert to Excel". The client-side table parsing engine identifies rows, columns, numbers, and headers, compiling them directly into an editable .xlsx workbook in browser memory.',
      toolName: 'PDF to Excel Online',
      keyTakeaways: [
        'Extracts structured data tables directly into formatted Excel spreadsheets (.xlsx).',
        'Separates numbers, currencies, dates, and column headers into clean individual cells.',
        '100% private in-browser conversion: financial statements and audit data never leave your PC.',
        'Compatible with Microsoft Excel, Google Sheets, and LibreOffice Calc.'
      ],
      steps: [
        { title: 'Open PDF to Excel', text: 'Visit PDF to Excel on ihatelovepdf.' },
        { title: 'Upload Document', text: 'Drag your PDF invoice, financial statement, or tabular report into the tool.' },
        { title: 'Convert Tables Locally', text: 'Click "Convert to Excel" to parse matrix coordinates and reconstruct cells.' },
        { title: 'Download .XLSX', text: 'Download your clean, fully calculation-ready Excel spreadsheet.' }
      ],
      commonProblems: [
        { problem: 'Tables in scanned receipts do not contain selectable text.', solution: 'Scanned image files contain pixel graphics. Use our Extract Text tool to capture raw numbers first.' },
        { problem: 'Merged cells or headers spanning multiple columns appear split.', solution: 'Inspect merged cells in Excel and format column alignments to match your custom formula needs.' }
      ],
      faqs: [
        { question: 'Are numbers in cells recognized as real numerical values for formulas?', answer: 'Yes. Our converter detects numerical figures so formulas like SUM and AVERAGE work immediately.' },
        { question: 'Is it safe to convert quarterly company balance sheets?', answer: 'Completely safe. Unlike cloud converters that process documents on remote servers, our conversion runs locally in your browser memory.' },
        { question: 'Is there any page limit or paywall?', answer: 'No. The converter is 100% free with no page caps.' }
      ],
      privacyNote: 'Financial statements and confidential balance sheets are processed client-side. Zero server transmissions.',
      relatedTools: [
        { slug: 'pdf-to-word', name: 'PDF to Word', description: 'Convert text-heavy PDFs into .docx files.' },
        { slug: 'compress', name: 'Compress PDF', description: 'Shrink large financial reports for email.' },
        { slug: 'edit-pdf', name: 'Edit PDF', description: 'Add notes and markings directly to PDF.' }
      ]
    },
    es: {
      h1: '¿Cómo convertir PDF a Excel gratis sin subir archivos a un servidor?',
      title: 'Convertir PDF a Excel Gratis Online (.xlsx) - Sin Subir Archivos | ihatelovepdf',
      metaDescription: 'Extrae tablas, balances y datos numéricos de archivos PDF en hojas de cálculo editables de Microsoft Excel (.xlsx) directamente en tu navegador. 100% privado.',
      directAnswer: 'Para convertir PDF a Excel gratis sin subir archivos, abre la herramienta PDF a Excel de ihatelovepdf, carga tu documento PDF y pulsa "Convertir a Excel". El motor cliente detecta filas, columnas y cifras, y genera un libro .xlsx editable en la memoria de tu dispositivo.',
      toolName: 'PDF a Excel Online',
      keyTakeaways: [
        'Convierte tablas de datos en hojas de cálculo Excel (.xlsx) perfectamente formateadas.',
        'Separa cifras numéricas, importes y fechas en celdas individuales editables.',
        '100% privado: extractos bancarios y balances contables nunca salen de tu ordenador.',
        'Totalmente compatible con Microsoft Excel, Google Sheets y LibreOffice Calc.'
      ],
      steps: [
        { title: 'Entra en la herramienta', text: 'Accede a PDF a Excel en ihatelovepdf.' },
        { title: 'Sube tu documento', text: 'Arrastra el informe con tablas o facturas al conversor.' },
        { title: 'Convierte en tu equipo', text: 'Haz clic en "Convertir a Excel" para que analice las columnas.' },
        { title: 'Descarga tu archivo .xlsx', text: 'Guarda tu hoja de cálculo lista para aplicar fórmulas matemáticas.' }
      ],
      commonProblems: [
        { problem: 'El documento es una foto escaneada y no se reconocen las celdas.', solution: 'Los escaneos son imágenes fijas. Extrae primero los datos con una herramienta de OCR.' },
        { problem: 'Celdas combinadas aparecen separadas.', solution: 'Ajusta el ancho de las columnas directamente en Excel según tus fórmulas.' }
      ],
      faqs: [
        { question: '¿Las cifras permiten usar fórmulas como SUMA?', answer: 'Sí. El conversor formatea las celdas como números para que las fórmulas funcionen de inmediato.' },
        { question: '¿Es seguro para balances y declaraciones fiscales?', answer: 'Totalmente seguro. Todo el cálculo se ejecuta en tu navegador sin enviar datos a servidores externos.' },
        { question: '¿Cobran por convertir muchas páginas de tablas?', answer: 'No. El conversor es 100% gratuito y sin límites.' }
      ],
      privacyNote: 'Tus informes financieros nunca se transmiten por internet. Máxima confidencialidad.',
      relatedTools: [
        { slug: 'pdf-a-word', name: 'PDF a Word', description: 'Convierte informes a documentos Word.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Reduce el peso de informes pesados.' },
        { slug: 'editar-pdf', name: 'Editar PDF', description: 'Añade anotaciones y marcas.' }
      ]
    },
    pt: {
      h1: 'Como converter PDF para Excel grátis sem fazer upload?',
      title: 'Converter PDF para Excel Grátis Online (.xlsx) - Sem Upload | ihatelovepdf',
      metaDescription: 'Extraia tabelas, números e demonstrativos de PDF para planilhas editáveis do Microsoft Excel (.xlsx) no navegador. 100% privado e gratuito.',
      directAnswer: 'Para converter PDF para Excel grátis sem fazer upload, acerte o PDF para Excel do ihatelovepdf, arraste o documento PDF e clique em "Converter para Excel". Nosso motor local reconhece colunas, linhas e números, criando uma planilha .xlsx editável diretamente na memória do seu dispositivo.',
      toolName: 'PDF para Excel Online',
      keyTakeaways: [
        'Converte tabelas em planilhas Excel (.xlsx) estruturadas.',
        'Reconhece números, datas e cabeçalhos em células individuais.',
        '100% privado: dados financeiros e extratos bancários permanecem seguros.',
        'Compatível com Excel, Google Planilhas e LibreOffice Calc.'
      ],
      steps: [
        { title: 'Acesse o conversor', text: 'Abra PDF para Excel no ihatelovepdf.' },
        { title: 'Envie o arquivo', text: 'Arraste a fatura ou tabela em PDF para a ferramenta.' },
        { title: 'Processe localmente', text: 'Clique em "Converter para Excel" para mapear as células.' },
        { title: 'Baixe o .xlsx', text: 'Faça o download da planilha pronta para usar fórmulas.' }
      ],
      commonProblems: [
        { problem: 'O PDF é uma folha digitalizada em foto.', solution: 'Imagens precisam de reconhecimento de caracteres via OCR antes da extração.' },
        { problem: 'Células mescladas desalinharam.', solution: 'Formate o alinhamento das colunas diretamente no Excel.' }
      ],
      faqs: [
        { question: 'Os números funcionam com fórmulas como SOMA?', answer: 'Sim. Os valores são convertidos como números reais para facilitar cálculos.' },
        { question: 'É seguro para folhas de pagamento e contabilidade?', answer: 'Sim. Todo o processamento ocorre no próprio navegador sem upload.' },
        { question: 'Tem marca d\'água?', answer: 'Não. Os arquivos gerados são 100% limpos.' }
      ],
      privacyNote: 'Privacidade rigorosa: seus dados contábeis nunca saem do seu computador.',
      relatedTools: [
        { slug: 'pdf-para-word', name: 'PDF para Word', description: 'Converta relatórios para o formato Word.' },
        { slug: 'comprimir', name: 'Comprimir PDF', description: 'Diminua o tamanho de relatórios.' },
        { slug: 'editar-pdf', name: 'Editar PDF', description: 'Adicione notas e observações.' }
      ]
    },
    de: {
      h1: 'Wie kann man PDF kostenlos ohne Server-Upload in Excel umwandeln?',
      title: 'PDF in Excel umwandeln kostenlos (.xlsx) - Ohne Upload | ihatelovepdf',
      metaDescription: 'Extrahieren Sie Tabellen, Bilanzen und Zahlen aus PDF-Dateien direkt im Browser in bearbeitbare Excel-Tabellen (.xlsx). 100% privat ohne Datenupload.',
      directAnswer: 'Um eine PDF-Datei ohne Server-Upload kostenlos in Excel umzuwandeln, öffnen Sie "PDF in Excel" auf ihatelovepdf, ziehen Sie Ihr Dokument hinein und klicken Sie auf "In Excel umwandeln". Die Tabellenerkennung rekonstruiert Zeilen und Spalten lokal im Browser in einer .xlsx-Arbeitsmappe.',
      toolName: 'PDF in Excel online',
      keyTakeaways: [
        'Überführt Datentabellen in formatierte Excel-Dateien (.xlsx).',
        'Zahlen, Datumsangaben und Währungen in echten Einzelzellen.',
        '100% Datenschutz: Finanzberichte und Bilanzen bleiben auf Ihrem PC.',
        'Kompatibel mit Microsoft Excel, Google Sheets und LibreOffice Calc.'
      ],
      steps: [
        { title: 'Tool aufrufen', text: 'Öffnen Sie "PDF in Excel" auf ihatelovepdf.' },
        { title: 'PDF einfügen', text: 'Legen Sie Ihren Tabellenbericht im Arbeitsfenster ab.' },
        { title: 'Lokal konvertieren', text: 'Klicken Sie auf "In Excel umwandeln".' },
        { title: 'XLSX speichern', text: 'Laden Sie Ihre fertige Excel-Tabelle herunter.' }
      ],
      commonProblems: [
        { problem: 'Gescannte Rechnungen enthalten keinen Text.', solution: 'Bei Bilddateien muss zunächst eine Zeichenerkennung per OCR durchgeführt werden.' },
        { problem: 'Verbundene Zellen müssen nachjustiert werden.', solution: 'Passen Sie Spaltenbreiten in Excel nach Ihren Formeln an.' }
      ],
      faqs: [
        { question: 'Funktionieren Rechenformeln wie SUMME sofort?', answer: 'Ja. Zahlen werden als echte numerische Werte interpretiert.' },
        { question: 'Ist die Konvertierung von Bilanzen sicher?', answer: 'Ja, da alle Berechnungen ausschließlich lokal im Webbrowser ablaufen.' },
        { question: 'Gibt es Begrenzungen der Tabellengröße?', answer: 'Nein, das Tool ist vollkommen kostenfrei und ohne Einschränkungen nutzbar.' }
      ],
      privacyNote: 'DSGVO-konforme Verarbeitung: Keine Übermittlung Ihrer Geschäftsdaten an externe Server.',
      relatedTools: [
        { slug: 'pdf-zu-word', name: 'PDF in Word', description: 'Textberichte in Word umwandeln.' },
        { slug: 'komprimieren', name: 'PDF komprimieren', description: 'Dateigröße vor dem Versenden verringern.' },
        { slug: 'pdf-bearbeiten', name: 'PDF bearbeiten', description: 'Änderungen direkt vornehmen.' }
      ]
    },
    fr: {
      h1: 'Comment convertir un PDF en feuille Excel gratuitement sans téléversement ?',
      title: 'Convertir PDF en Excel Gratuitement (.xlsx) - Sans Envoi | ihatelovepdf',
      metaDescription: 'Extrayez des tableaux, bilans comptables et données chiffrées de vos PDF en feuilles de calcul Excel (.xlsx) directement dans votre navigateur. 100% privé.',
      directAnswer: 'Pour convertir un PDF en Excel gratuitement sans l\'envoyer sur un serveur, accédez à l\'outil PDF en Excel d\'ihatelovepdf, déposez votre document et cliquez sur "Convertir en Excel". Le moteur extrait les lignes, colonnes et nombres directement dans un classeur .xlsx modifiable en mémoire locale.',
      toolName: 'PDF en Excel en ligne',
      keyTakeaways: [
        'Extrait les tableaux structurés en classeurs Excel (.xlsx) exploitables.',
        'Sépare nombres, montants et dates dans des cellules individuelles.',
        'Confidentialité absolue : vos bilans et relevés bancaires ne quittent jamais votre appareil.',
        'Totalement compatible avec Microsoft Excel, Google Sheets et Calc.'
      ],
      steps: [
        { title: 'Ouvrir l\'outil', text: 'Accédez à PDF en Excel sur ihatelovepdf.' },
        { title: 'Ajouter votre PDF', text: 'Glissez votre facture ou rapport financier dans l\'espace dédié.' },
        { title: 'Lancer la conversion', text: 'Cliquez sur "Convertir en Excel" pour analyser les cellules.' },
        { title: 'Enregistrer le .xlsx', text: 'Téléchargez votre fichier Excel prêt pour vos formules de calcul.' }
      ],
      commonProblems: [
        { problem: 'Le document est une numérisation papier.', solution: 'Les fichiers numérisés nécessitent un outil d\'OCR préalable pour reconnaître les chiffres.' },
        { problem: 'Cellules fusionnées décalées.', solution: 'Ajustez les alignements dans Excel selon vos besoins de calcul.' }
      ],
      faqs: [
        { question: 'Les nombres sont-ils utilisables avec des formules (SOMME) ?', answer: 'Oui. Les valeurs sont converties au format numérique pour un calcul immédiat.' },
        { question: 'Mes données comptables sont-elles protégées ?', answer: 'Absolument. Aucune information n\'est transmise à l\'extérieur ; tout s\'exécute dans votre navigateur.' },
        { question: 'Y a-t-il des limitations de pages ?', answer: 'Non, le service est totalement gratuit et illimité.' }
      ],
      privacyNote: 'Sécurité totale : vos données financières restent sur votre ordinateur.',
      relatedTools: [
        { slug: 'pdf-en-word', name: 'PDF en Word', description: 'Convertissez des rapports textuels en Word.' },
        { slug: 'compresser', name: 'Compresser PDF', description: 'Réduisez la taille des gros rapports.' },
        { slug: 'editer-pdf', name: 'Modifier PDF', description: 'Ajoutez du texte et des annotations.' }
      ]
    },
    it: {
      h1: 'Come convertire un PDF in Excel gratis senza caricare file sul server?',
      title: 'Convertire PDF in Excel Gratis Online (.xlsx) - Senza Upload | ihatelovepdf',
      metaDescription: 'Estrai tabelle, bilanci e numeri da documenti PDF in fogli di calcolo Microsoft Excel (.xlsx) direttamente nel tuo browser. 100% privato e gratuito.',
      directAnswer: 'Per convertire un PDF in Excel gratis senza inviare documenti a server esterni, apri da PDF a Excel su ihatelovepdf, trascina il documento con tabelle e clicca su "Converti in Excel". Il motore locale estrae righe e colonne compilando un foglio .xlsx pronto per essere modificato.',
      toolName: 'PDF in Excel Online',
      keyTakeaways: [
        'Estrae tabelle strutturate in comodi fogli di calcolo Excel (.xlsx).',
        'Riconosce cifre numeriche, valute e date in celle indipendenti.',
        'Privacy totale: estratti conto e bilanci aziendali rimangono sul tuo computer.',
        'Compatibile con Microsoft Excel, Google Fogli e LibreOffice Calc.'
      ],
      steps: [
        { title: 'Apri il convertitore', text: 'Accedi a da PDF a Excel su ihatelovepdf.' },
        { title: 'Trascina il PDF', text: 'Inserisci il documento contenente tabelle numeriche.' },
        { title: 'Converti localmente', text: 'Fai clic su "Converti in Excel" per la scansione delle colonne.' },
        { title: 'Salva il file .xlsx', text: 'Scarica il foglio di calcolo pronto per formule e calcoli.' }
      ],
      commonProblems: [
        { problem: 'Il PDF è una scansione fotografica.', solution: 'I documenti scansionati richiedono un software OCR prima dell\'estrazione tabellare.' },
        { problem: 'Celle unite con bordi irregolari.', solution: 'Formatta la larghezza delle colonne direttamente in Excel.' }
      ],
      faqs: [
        { question: 'Le cifre funzionano con formule come SOMMA?', answer: 'Sì. Le celle numeriche sono formattate per eseguire calcoli matematici.' },
        { question: 'È sicuro per dati fiscali e bilanci?', answer: 'Sì. Tutto si svolge interamente nella memoria del tuo browser.' },
        { question: 'Ci sono watermark pubblicitari?', answer: 'No, i file esportati non contengono alcun watermark.' }
      ],
      privacyNote: 'Massima tutela della privacy: i tuoi dati aziendali non abbandonano mai il tuo browser.',
      relatedTools: [
        { slug: 'da-pdf-a-word', name: 'PDF in Word', description: 'Converti documenti di testo in Word.' },
        { slug: 'comprimi', name: 'Comprimi PDF', description: 'Riduci il peso di file voluminosi.' },
        { slug: 'modifica-pdf', name: 'Modifica PDF', description: 'Inserisci note e modifiche veloci.' }
      ]
    },
    ro: {
      h1: 'Cum să convertești PDF în tabel Excel gratuit fără încărcare pe server?',
      title: 'Convertește PDF în Excel Gratuit Online (.xlsx) - Fără Upload | ihatelovepdf',
      metaDescription: 'Extrage tabele, rapoarte financiare și cifre din PDF în foi de calcul Microsoft Excel (.xlsx) direct în browserul tău. 100% privat și sigur.',
      directAnswer: 'Pentru a converti un PDF în Excel gratuit fără încărcare pe server, deschide PDF în Excel pe ihatelovepdf, adaugă documentul cu tabele și apasă pe "Convertește în Excel". Algoritmul nostru detectează rândurile și coloanele, generând un fișier .xlsx editabil în memoria browserului.',
      toolName: 'PDF în Excel Online',
      keyTakeaways: [
        'Transformă tabelele în registre de calcul Excel (.xlsx) complet editabile.',
        'Plasează numerele, sumele și datele calendaristice în celule individuale.',
        '100% confidențial: extrasele bancare și datele contabile rămân pe dispozitiv.',
        'Compatibil cu Excel, Google Sheets și LibreOffice Calc.'
      ],
      steps: [
        { title: 'Deschide instrumentul', text: 'Accesează PDF în Excel pe ihatelovepdf.' },
        { title: 'Adaugă fișierul PDF', text: 'Trage documentul cu tabele în zona de lucru.' },
        { title: 'Convertește pe loc', text: 'Apasă pe "Convertește în Excel" pentru analiza celulelor.' },
        { title: 'Descarcă fișierul .xlsx', text: 'Salvează registrul Excel și aplică formulele dorite.' }
      ],
      commonProblems: [
        { problem: 'Fișierul este o scanare a unei foi tipărite.', solution: 'Documentele scanate necesită întâi recunoaștere optică a caracterelor (OCR).' },
        { problem: 'Celule îmbinate cu aliniere decalată.', solution: 'Ajustează lățimea coloanelor direct în programul Excel.' }
      ],
      faqs: [
        { question: 'Pot folosi formule precum SUM pe numerele extrase?', answer: 'Da. Numerele sunt convertite în format numeric direct utilizabil în formule.' },
        { question: 'Sunt datele mele financiare în siguranță?', answer: 'Da, deoarece conversia are loc exclusiv în browser fără servere externe.' },
        { question: 'Există costuri ascunse?', answer: 'Nu, serviciul este complet gratuit și nelimitat.' }
      ],
      privacyNote: 'Securitate deplină: datele tale contabile nu părăsesc dispozitivul.',
      relatedTools: [
        { slug: 'pdf-in-word', name: 'PDF în Word', description: 'Transformă rapoarte de text în Word.' },
        { slug: 'comprima', name: 'Comprimă PDF', description: 'Micșorează fișierele voluminoase.' },
        { slug: 'editeaza-pdf', name: 'Editează PDF', description: 'Adaugă adnotări pe pagină.' }
      ]
    },
    ru: {
      h1: 'Как конвертировать PDF в таблицу Excel бесплатно без загрузки на сервер?',
      title: 'Конвертировать PDF в Excel бесплатно онлайн (.xlsx) | ihatelovepdf',
      metaDescription: 'Извлекайте таблицы, финансовые отчеты и числа из PDF в редактируемые таблицы Microsoft Excel (.xlsx) прямо в браузере. 100% приватно и бесплатно.',
      directAnswer: 'Чтобы конвертировать PDF в Excel бесплатно без отправки на сервер, откройте инструмент «PDF в Excel» на ihatelovepdf, добавьте документ с таблицами и нажмите «Конвертировать в Excel». Алгоритм распознает строки, колонки и числа, собирая файл .xlsx прямо в оперативной памяти вашего браузера.',
      toolName: 'PDF в Excel онлайн',
      keyTakeaways: [
        'Преобразует таблицы в структурированные книги Excel (.xlsx).',
        'Разносит числа, валюты и даты по отдельным ячейкам.',
        '100% приватность: банковские выписки и балансы не покидают ваше устройство.',
        'Совместимость с Microsoft Excel, Google Таблицами и LibreOffice Calc.'
      ],
      steps: [
        { title: 'Откройте инструмент', text: 'Перейдите на страницу «PDF в Excel» на ihatelovepdf.' },
        { title: 'Загрузите документ', text: 'Перетащите PDF с таблицами в область конвертера.' },
        { title: 'Конвертируйте локально', text: 'Нажмите «Конвертировать в Excel» для извлечения ячеек.' },
        { title: 'Скачайте .xlsx', text: 'Сохраните готовую таблицу Excel для расчетов.' }
      ],
      commonProblems: [
        { problem: 'Таблица в документе представляет собой фотоскан.', solution: 'Для отсканированных страниц необходимо предварительное распознавание через OCR.' },
        { problem: 'Объединенные ячейки отображаются раздельно.', solution: 'Скорректируйте объединение ячеек в Excel при настройке формул.' }
      ],
      faqs: [
        { question: 'Работают ли формулы (например, СУММ) с полученными числами?', answer: 'Да. Числа распознаются как числовые значения, готовые к математическим операциям.' },
        { question: 'Безопасно ли конвертировать отчетность компании?', answer: 'Полностью безопасно, так как файлы не отправляются на удаленные сервера.' },
        { question: 'Добавляются ли водяные знаки?', answer: 'Нет. Созданные файлы остаются абсолютно чистыми.' }
      ],
      privacyNote: 'Надежная защита: ваши финансовые данные не передаются сторонним сервисам.',
      relatedTools: [
        { slug: 'pdf-v-word', name: 'PDF в Word', description: 'Конвертируйте текстовые отчеты в Word.' },
        { slug: 'szhat', name: 'Сжать PDF', description: 'Уменьшите размер документов.' },
        { slug: 'redaktirovat-pdf', name: 'Редактировать PDF', description: 'Вносите правки прямо в PDF.' }
      ]
    },
    hu: {
      h1: 'Hogyan alakíthat át PDF-et Excel táblázattá ingyen, feltöltés nélkül?',
      title: 'PDF konvertálása Excelbe ingyen online (.xlsx) - Feltöltés nélkül | ihatelovepdf',
      metaDescription: 'Kivonatoljon táblázatokat, mérlegeket és számadatokat PDF fájlokból szerkeszthető Microsoft Excel (.xlsx) táblázatokba a böngészőjében. 100% privát.',
      directAnswer: 'A PDF táblázatok feltöltés nélküli Excelbe alakításához nyissa meg az ihatelovepdf PDF-ből Excel eszközét, húzza be a dokumentumot, majd kattintson a "Konvertálás Excelbe" gombra. A feldolgozó motor a memóriában állítja össze a szerkeszthető .xlsx munkafüzetet.',
      toolName: 'PDF-ből Excel online',
      keyTakeaways: [
        'Táblázatok átalakítása formázott Excel munkafüzetekké (.xlsx).',
        'Számok, összegek és dátumok elhelyezése önálló szerkeszthető cellákban.',
        '100% privát: a banki kivonatok és könyvelési adatok az Ön gépén maradnak.',
        'Teljesen kompatibilis az Excel, Google Táblázatok és LibreOffice Calc programokkal.'
      ],
      steps: [
        { title: 'Nyissa meg az eszközt', text: 'Keresse fel a PDF-ből Excel lapot az ihatelovepdf oldalon.' },
        { title: 'Töltse be a PDF-et', text: 'Helyezze a táblázatot tartalmazó fájlt a felületre.' },
        { title: 'Konvertálás helyben', text: 'Kattintson a "Konvertálás Excelbe" gombra.' },
        { title: 'Töltse le a .xlsx fájlt', text: 'Mentse el a képletezésre kész Excel munkafüzetet.' }
      ],
      commonProblems: [
        { problem: 'A PDF szkennelt fotó és nem tartalmaz kijelölhető szöveget.', solution: 'Képi dokumentumoknál először OCR szövegfelismerést kell végezni.' },
        { problem: 'Egyesített cellák eltolódása.', solution: 'Finomhangolja az oszlopok szélességét a táblázatkezelőben.' }
      ],
      faqs: [
        { question: 'Működnek a képletek (pl. SZUM) a kinyert számokkal?', answer: 'Igen. A számadatok valódi numerikus értékként kerülnek mentésre.' },
        { question: 'Biztonságos a pénzügyi kimutatások átalakítása?', answer: 'Teljesen biztonságos, mivel a fájlok nem kerülnek feltöltésre semmilyen szerverre.' },
        { question: 'Vannak oldalkorlátok?', answer: 'Nincsenek korlátozások, a szolgáltatás korlátlanul ingyenes.' }
      ],
      privacyNote: 'Szigorú adatvédelem: üzleti adatai nem jutnak ki külső felhőszolgáltatókhoz.',
      relatedTools: [
        { slug: 'pdf-bol-word', name: 'PDF-ből Word', description: 'Szöveges dokumentumok átalakítása Worddé.' },
        { slug: 'tomoriteni', name: 'PDF tömörítése', description: 'Csökkentse a kész dokumentum méretét.' },
        { slug: 'pdf-szerkesztese', name: 'PDF szerkesztése', description: 'Végezzen módosításokat a PDF-en.' }
      ]
    }
  }
];

