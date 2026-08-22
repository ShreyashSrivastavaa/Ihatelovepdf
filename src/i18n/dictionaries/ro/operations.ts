import { OperationContent } from "../operation-types";
import { OperationKey } from "../../../types/operations";
import { getOperationsLocalized } from "../../operations-catalog";

const operationsRoContent: Partial<Record<OperationKey, OperationContent>> = {
  compress: {
    key: "compress",
    slug: "comprima",
    mode: "compress",
    meta: {
      title: "ComprimÄƒ PDF online gratuit | Redu dimensiunea | ihatelovepdf | Compress PDF",
      description:
        "Redu eficient dimensiunea fiÈ™ierului PDF fÄƒrÄƒ pierderi de calitate. Compresie gratuitÄƒ È™i privatÄƒ direct în browserul tÄƒu.",
      keywords: [
        "comprimare pdf",
        "redu dimensiune pdf",
        "optimizare pdf",
        "compresor pdf",
        "pdf mai mic",
        "compress pdf",
      ],
      ogTitle: "ComprimÄƒ PDF-uri fÄƒrÄƒ a pierde din calitate | ihatelovepdf",
      ogDescription:
        "AdaugÄƒ fiÈ™ierul, alege nivelul optim de compresie È™i descarcÄƒ un PDF mult mai mic în câteva secunde — în siguranÈ›Äƒ, fÄƒrÄƒ încÄƒrcare pe vreun server.",
      ogImageAlt: "InterfaÈ›a instrumentului de compresie ihatelovepdf",
    },
    hero: {
      title: "ComprimÄƒ PDF online cu rezultate clare",
      description:
        "Redu dimensiunea documentului pentru a respecta limitele de e-mail, de pe platformele educaÈ›ionale sau procedurile administrative, menÈ›inând în acelaÈ™i timp lizibilitatea fiecÄƒrei pagini.",
      bulletPoints: [
        "Procesare 100% localÄƒ — fiÈ™ierele tale nu pÄƒrÄƒsesc niciodatÄƒ browserul",
        "Alege o compresie de bazÄƒ, medie sau agresivÄƒ în funcÈ›ie de obiectivele tale",
        "PÄƒstreazÄƒ metadatele È™i structura documentului atunci când ai nevoie",
      ],
      imageAlt: "Fluxul de lucru pentru compresia PDF în ihatelovepdf",
    },
    benefitsTitle: "De ce sÄƒ comprimi PDF-uri cu ihatelovepdf",
    benefits: [
      {
        title: "Calitate echilibratÄƒ",
        description:
          "Motorul nostru de compresie evalueazÄƒ fiecare resursÄƒ pentru a oferi cea mai mare reducere fÄƒrÄƒ a estompa textul sau elementele grafice.",
      },
      {
        title: "PregÄƒtit pentru trimiteri",
        description:
          "GenereazÄƒ fiÈ™iere care respectÄƒ limitele stricte de încÄƒrcare de pe portalurile guvernamentale, universitare sau fluxurile de lucru corporative.",
      },
      {
        title: "ConfidenÈ›ialitate prin design",
        description:
          "EvitÄƒ încÄƒrcarea pe servere È™i scurgerile de date pentru a respecta politicile interne de confidenÈ›ialitate fÄƒrÄƒ niciun efort.",
      },
    ],
    howTo: {
      title: "Cum sÄƒ comprimi un PDF cu ihatelovepdf",
      steps: [
        "FÄƒ clic pe „ÎncarcÄƒ fiÈ™ierele tale” È™i selecteazÄƒ PDF-ul pe care doreÈ™ti sÄƒ-l optimizezi.",
        "Alege nivelul de compresie È™i ajusteazÄƒ opÈ›iunile avansate precum pÄƒstrarea metadatelor.",
        "ApasÄƒ pe „ProceseazÄƒ” È™i descarcÄƒ documentul comprimat în câteva secunde.",
      ],
      note:
        "Lucrezi cu mai multe rapoarte? ComprimÄƒ-le unul câte unul, fÄƒrÄƒ limite zilnice È™i fÄƒrÄƒ filigrane.",
    },
    useCasesTitle: "Când este utilÄƒ compresia",
    useCases: [
      "Trimite contracte, facturi sau manuale prin e-mail fÄƒrÄƒ a atinge limita de ataÈ™amente.",
      "ÎncarcÄƒ teme sau proiecte pe Moodle, Canvas sau orice altÄƒ platformÄƒ educaÈ›ionalÄƒ care impune o limitÄƒ strictÄƒ pentru dimensiunea fiÈ™ierelor.",
      "Redu dimensiunea tezelor, cataloagelor sau documentelor de cercetare pentru a îmbunÄƒtÄƒÈ›i viteza de descÄƒrcare.",
      "ArhiveazÄƒ dosare în cloud economisind spaÈ›iu de stocare fÄƒrÄƒ a pierde detalii importante.",
    ],
  },
  imagesToPdf: {
    key: "imagesToPdf",
    slug: "imagini-in-pdf",
    mode: "imagesToPdf",
    meta: {
      title: "CreeazÄƒ PDF din imagini | JPG, PNG în PDF | ihatelovepdf | Images to PDF",
      description:
        "CreeazÄƒ un PDF profesional din imaginile tale. OrganizeazÄƒ fotografiile, personalizeazÄƒ aspectul paginii È™i genereazÄƒ documentul local în browser.",
      keywords: [
        "imagini in pdf",
        "jpg in pdf",
        "png in pdf",
        "webp in pdf",
        "creeaza pdf din imagini",
        "images to pdf",
      ],
      ogTitle: "CreeazÄƒ un PDF clar din imaginile tale | ihatelovepdf",
      ogDescription:
        "Trage imaginile la locul lor, configureazÄƒ setÄƒrile de paginÄƒ È™i exportÄƒ un fiÈ™ier PDF gata de imprimat — fÄƒrÄƒ încÄƒrcÄƒri È™i fÄƒrÄƒ filigrane.",
      ogImageAlt: "Crearea unui PDF din imagini în ihatelovepdf",
    },
    hero: {
      title: "CreeazÄƒ un PDF îngrijit din imagini",
      description:
        "GrupeazÄƒ scanÄƒri, fotografii sau elemente grafice într-un singur PDF gata de partajat cu echipa, studenÈ›ii sau clienÈ›ii.",
      bulletPoints: [
        "Trage È™i plaseazÄƒ pentru a stabili ordinea fiecÄƒrei pagini",
        "Alege dimensiunea paginii, orientarea È™i marginile potrivite pentru imprimare sau vizualizare pe ecran",
        "SeteazÄƒ o culoare de fundal solidÄƒ pentru a evita transparenÈ›a neaÈ™teptatÄƒ",
      ],
      imageAlt: "Fluxul de lucru pentru imagini în PDF",
    },
    benefitsTitle: "De ce sÄƒ asamblezi PDF-uri din imagini cu ihatelovepdf",
    benefits: [
      {
        title: "Aspect consistent",
        description:
          "Aliniezi formate diferite de imagine într-un PDF unificat fÄƒrÄƒ surprize de întindere sau decupare.",
      },
      {
        title: "PregÄƒtit pentru imprimare È™i vizualizare",
        description:
          "AjusteazÄƒ marginile, orientarea È™i culoarea de fundal pentru ca PDF-ul exportat sÄƒ arate impecabil pe hârtie È™i pe ecrane.",
      },
      {
        title: "Procesare securizatÄƒ",
        description:
          "Toate conversiile se fac local în browser, fiind sigure pentru scanÄƒri de buletine, chitanÈ›e sau materiale È™colare.",
      },
    ],
    howTo: {
      title: "Cum sÄƒ converteÈ™ti imagini în PDF",
      steps: [
        "AdaugÄƒ imaginile pe care doreÈ™ti sÄƒ le incluzi. ReorganizeazÄƒ-le astfel încât secvenÈ›a sÄƒ corespundÄƒ documentului final.",
        "AjusteazÄƒ modul de potrivire, dimensiunea paginii, orientarea È™i marginile în funcÈ›ie de nevoile tale.",
        "FÄƒ clic pe „CreeazÄƒ PDF” pentru a descÄƒrca documentul compilat, gata de a fi partajat sau arhivat.",
      ],
      note:
        "Loturi mari de imagini? ComprimÄƒ PDF-ul rezultat sau împarte-l ulterior fÄƒrÄƒ a fi nevoie sÄƒ încarci din nou imaginile.",
    },
    useCasesTitle: "UtilizÄƒri excelente pentru conversia imaginilor în PDF",
    useCases: [
      "CombinÄƒ fiÈ™e de lucru scanate sau lucrÄƒri de examen înainte de a le trimite studenÈ›ilor.",
      "GrupeazÄƒ chitanÈ›ele de cheltuieli într-un singur PDF în loc de zeci de ataÈ™amente individuale.",
      "CreeazÄƒ portofolii sau cataloage din exporturile de design în câteva secunde.",
      "ReuneÈ™te dovezi fotografice sau imagini de la inspecÈ›ii într-un singur document pentru pÄƒrÈ›ile interesate.",
    ],
  },
  merge: {
    key: "merge",
    slug: "uneste",
    mode: "merge",
    meta: {
      title: "UneÈ™te PDF | CombinÄƒ mai multe PDF-uri gratuit | ihatelovepdf | Merge PDF",
      description:
        "CombinÄƒ mai multe fiÈ™iere PDF într-un singur document organizat, fÄƒrÄƒ limitÄƒ de pagini. Trage, reordoneazÄƒ È™i descarcÄƒ fiÈ™ierul unit instant.",
      keywords: [
        "uneste pdf",
        "combina pdf",
        "unire fisiere pdf",
        "combinare pdf",
        "fuziune pdf",
        "merge pdf",
      ],
      ogTitle: "UneÈ™te mai multe PDF-uri în câteva secunde | ihatelovepdf",
      ogDescription:
        "OrganizeazÄƒ documentele în ordinea perfectÄƒ, ajusteazÄƒ setÄƒrile È™i descarcÄƒ un fiÈ™ier PDF unificat fÄƒrÄƒ a încÄƒrca vreodatÄƒ datele tale.",
      ogImageAlt: "Combinarea mai multor PDF-uri în ihatelovepdf",
    },
    hero: {
      title: "UneÈ™te PDF-uri online — rapid È™i sigur",
      description:
        "CreeazÄƒ un singur fiÈ™ier îngrijit cu contracte, note de curs sau politici interne, gata de trimis, semnat sau arhivat.",
      bulletPoints: [
        "Trage È™i plaseazÄƒ pentru a controla ordinea finalÄƒ a paginilor",
        "FÄƒrÄƒ limite ascunse — uneÈ™te documente lungi în mod complet gratuit",
        "PÄƒstreazÄƒ semnele de carte (bookmarks) È™i metadatele atunci când ai nevoie",
      ],
      imageAlt: "Fuziunea documentelor PDF",
    },
    benefitsTitle: "Avantajele unirii cu ihatelovepdf",
    benefits: [
      {
        title: "Livrare consistentÄƒ",
        description:
          "LivreazÄƒ materiale într-un singur fiÈ™ier, cu paginare continuÄƒ È™i formatare unificatÄƒ.",
      },
      {
        title: "EconomiseÈ™te timp",
        description:
          "EvitÄƒ editoarele desktop greoaie. Trage fiÈ™ierele, organizeazÄƒ-le È™i descarcÄƒ un document gata de partajat.",
      },
      {
        title: "Privat È™i anonim",
        description:
          "Nu stocÄƒm nicio copie È™i nu solicitÄƒm date personale, fiind perfect pentru informaÈ›ii confidenÈ›iale.",
      },
    ],
    howTo: {
      title: "Cum sÄƒ uneÈ™ti PDF-uri cu ihatelovepdf",
      steps: [
        "FÄƒ clic pe „ÎncarcÄƒ fiÈ™ierele tale” È™i selecteazÄƒ cel puÈ›in douÄƒ PDF-uri.",
        "FoloseÈ™te sÄƒgeÈ›ile sau trage fiecare fiÈ™ier pentru a stabili secvenÈ›a finalÄƒ.",
        "Alege preferinÈ›ele pentru semnele de carte È™i apasÄƒ pe „ProceseazÄƒ” pentru a descÄƒrca PDF-ul unit.",
      ],
      note:
        "Ai nevoie sÄƒ adaugi mai multe fiÈ™iere mai târziu? AdaugÄƒ-le în listÄƒ în orice moment fÄƒrÄƒ a relua procesul.",
    },
    useCasesTitle: "Când este util sÄƒ uneÈ™ti PDF-uri",
    useCases: [
      "PregÄƒteÈ™te o propunere comercialÄƒ alÄƒturi de anexe, devize È™i termeni contractuali.",
      "Trimite facturile lunare grupate într-un singur fiÈ™ier cÄƒtre departamentul financiar.",
      "ReuneÈ™te notiÈ›ele scanate È™i prezentÄƒrile într-un singur PDF pentru studenÈ›i.",
      "CreeazÄƒ pachete juridice complete pregÄƒtite pentru semnÄƒtura electronicÄƒ.",
    ],
  },
  split: {
    key: "split",
    slug: "divide",
    mode: "split",
    meta: {
      title: "Divide un PDF pe pagini sau capitole | Gratuit | ihatelovepdf | Split PDF",
      description:
        "SeparÄƒ PDF-ul tÄƒu în mai multe fiÈ™iere dupÄƒ intervale de pagini sau capitole specifice. BucurÄƒ-te de control deplin asupra structurii documentului tÄƒu.",
      keywords: [
        "divide pdf",
        "separa pdf",
        "imparte pdf pe pagini",
        "divizor pdf",
        "taie pdf",
        "split pdf",
      ],
      ogTitle: "Divide PDF-urile tale cu precizie | ihatelovepdf",
      ogDescription:
        "Alege exact cum doreÈ™ti sÄƒ împarÈ›i documentul, genereazÄƒ oricâte fiÈ™iere individuale ai nevoie È™i descarcÄƒ-le instantaneu.",
      ogImageAlt: "Divizarea unui PDF în ihatelovepdf",
    },
    hero: {
      title: "Divide PDF-uri pe pagini sau segmente",
      description:
        "Extrage capitole, anexe sau secÈ›iuni specifice în fiÈ™iere de sine stÄƒtÄƒtoare, gata de partajat.",
      bulletPoints: [
        "ConfigureazÄƒ divizarea dupÄƒ un numÄƒr fix de pagini sau intervale precise",
        "GenereazÄƒ mai multe PDF-uri într-o singurÄƒ etapÄƒ de procesare",
        "LucreazÄƒ fÄƒrÄƒ limite de pagini È™i fÄƒrÄƒ filigrane",
      ],
      imageAlt: "Fluxul de lucru pentru divizarea PDF",
    },
    benefitsTitle: "Ce îÈ›i oferÄƒ divizarea cu ihatelovepdf",
    benefits: [
      {
        title: "Control asupra informaÈ›iilor partajate",
        description:
          "LivreazÄƒ doar partea relevantÄƒ a unui document fÄƒrÄƒ a expune secÈ›iuni confidenÈ›iale sau irelevante.",
      },
      {
        title: "Generare eficientÄƒ",
        description:
          "GenereazÄƒ mai multe fiÈ™iere simultan È™i descarcÄƒ-le automat pentru arhivare sau transfer.",
      },
      {
        title: "ConfigurÄƒri avansate",
        description:
          "CreeazÄƒ loturi, insereazÄƒ separatori sau defineÈ™te formate de ieÈ™ire care se potrivesc fluxului tÄƒu de lucru.",
      },
    ],
    howTo: {
      title: "Cum sÄƒ divizezi un PDF cu ihatelovepdf",
      steps: [
        "ÎncarcÄƒ PDF-ul pe care doreÈ™ti sÄƒ-l fragmentezi de pe dispozitivul tÄƒu.",
        "Alege dacÄƒ doreÈ™ti sÄƒ divizezi dupÄƒ un numÄƒr fix de pagini sau prin intervale personalizate.",
        "ApasÄƒ pe „ProceseazÄƒ” È™i descarcÄƒ automat documentele nou generate.",
      ],
      note:
        "ihatelovepdf descarcÄƒ primul fiÈ™ier imediat È™i le salveazÄƒ pe restul pe dispozitivul tÄƒu fÄƒrÄƒ paÈ™i suplimentari.",
    },
    useCasesTitle: "Scenarii tipice pentru divizarea PDF-urilor",
    useCases: [
      "PublicÄƒ fiecare capitol al unei cÄƒrÈ›i electronice ca resursÄƒ separatÄƒ pentru un curs online.",
      "SeparÄƒ anexele care trebuie trimise prin canale de comunicare diferite.",
      "Extrage rapoartele trimestriale din documente financiare anuale voluminoase.",
      "PregÄƒteÈ™te loturi compacte pentru clienÈ›i fÄƒrÄƒ a expune documentaÈ›ia tehnicÄƒ internÄƒ.",
    ],
  },
  extract: {
    key: "extract",
    slug: "extrage",
    mode: "extract",
    meta: {
      title: "Extrage pagini PDF | SalveazÄƒ paginile selectate | ihatelovepdf | Extract PDF pages",
      description:
        "SelecteazÄƒ pagini specifice din orice PDF È™i creeazÄƒ instantaneu un nou document personalizat. Procesare privatÄƒ È™i nelimitatÄƒ.",
      keywords: [
        "extrage pagini pdf",
        "salveaza pagini pdf",
        "selecteaza pagini pdf",
        "extractor pagini pdf",
        "creeaza pdf nou",
        "extract pdf pages",
      ],
      ogTitle: "Extrage doar paginile de care ai nevoie | ihatelovepdf",
      ogDescription:
        "BifeazÄƒ paginile relevante pe care doreÈ™ti sÄƒ le pÄƒstrezi, genereazÄƒ un nou fiÈ™ier PDF în câteva secunde È™i menÈ›ine siguranÈ›a datelor tale.",
      ogImageAlt: "Selectarea paginilor PDF în ihatelovepdf",
    },
    hero: {
      title: "Extrage pagini PDF specifice",
      description:
        "AsambleazÄƒ documente personalizate pÄƒstrând doar paginile pe care trebuie sÄƒ le partajezi sau sÄƒ le arhivezi.",
      bulletPoints: [
        "VizualizeazÄƒ miniaturile È™i bifeazÄƒ paginile individuale",
        "PÄƒstreazÄƒ numerele paginilor originale sau genereazÄƒ o numerotare nouÄƒ",
        "DescarcÄƒ instantaneu PDF-ul rezultat fÄƒrÄƒ timp de aÈ™teptare",
      ],
      imageAlt: "Extragerea paginilor dintr-un PDF",
    },
    benefitsTitle: "Avantajele extragerii paginilor cu ihatelovepdf",
    benefits: [
      {
        title: "Documente mai relevante",
        description:
          "PartajeazÄƒ doar informaÈ›iile utile cu echipa sau clienÈ›ii tÄƒi, eliminând datele redundante.",
      },
      {
        title: "Control total în browser",
        description:
          "SelecteazÄƒ, previzualizeazÄƒ È™i verificÄƒ fiecare paginÄƒ fÄƒrÄƒ software-uri greoaie sau conexiune la internet.",
      },
      {
        title: "Rezultate curate",
        description:
          "Noul PDF îÈ™i pÄƒstreazÄƒ calitatea originalÄƒ È™i metadatele în funcÈ›ie de opÈ›iunile stabilite de tine.",
      },
    ],
    howTo: {
      title: "Cum sÄƒ extragi pagini cu ihatelovepdf",
      steps: [
        "ÎncarcÄƒ PDF-ul È™i alege documentul cu care doreÈ™ti sÄƒ lucrezi.",
        "SelecteazÄƒ paginile de care ai nevoie din grila de miniaturi.",
        "FÄƒ clic pe „ProceseazÄƒ” pentru a descÄƒrca noul PDF cu paginile selectate.",
      ],
      note:
        "PoÈ›i combina extragerea cu alte operaÈ›iuni precum unirea sau compresia în sesiuni separate.",
    },
    useCasesTitle: "Idei pentru extragerea paginilor",
    useCases: [
      "PartajeazÄƒ doar capitolul alocat dintr-un manual cu colegii de proiect.",
      "Trimite doar paginile specifice dintr-un contract de credit pentru o verificare juridicÄƒ.",
      "AsambleazÄƒ dosare personalizate conÈ›inând doar informaÈ›iile relevante pentru fiecare client.",
      "SalveazÄƒ copii ale paginilor de formular sau chitanÈ›elor pe care trebuie sÄƒ le arhivezi.",
    ],
  },
  crop: {
    key: "crop",
    slug: "decupeaza",
    mode: "crop",
    meta: {
      title: "DecupeazÄƒ pagini PDF | AjusteazÄƒ marginile | ihatelovepdf | Crop PDF",
      description:
        "DecupeazÄƒ pagini PDF È™i eliminÄƒ marginile inutile direct în browser. SelecteazÄƒ paginile È™i defineÈ™te zona de decupare.",
      keywords: [
        "decupeaza pdf",
        "decupare pdf online",
        "ajusteaza margini pdf",
        "taie pagini pdf",
        "instrument decupare pdf",
        "elimina spatiu alb pdf",
        "crop pdf",
      ],
      ogTitle: "DecupeazÄƒ pagini PDF local în browserul tÄƒu | ihatelovepdf",
      ogDescription:
        "Redu marginile albe È™i concentreazÄƒ fiecare paginÄƒ doar pe conÈ›inutul esenÈ›ial, cu o procesare complet privatÄƒ pe dispozitivul tÄƒu.",
      ogImageAlt: "Decuparea paginilor PDF în ihatelovepdf",
    },
    hero: {
      title: "DecupeazÄƒ pagini PDF È™i eliminÄƒ marginile",
      description:
        "EliminÄƒ spaÈ›iul alb suplimentar sau restrânge zona vizibilÄƒ a paginilor selectate fÄƒrÄƒ a trimite documentul pe vreun server.",
      bulletPoints: [
        "SelecteazÄƒ doar paginile pe care doreÈ™ti sÄƒ le decupezi",
        "Redu marginile superioarÄƒ, dreaptÄƒ, inferioarÄƒ È™i stângÄƒ cu valori precise în puncte",
        "PÄƒstreazÄƒ fluxul de lucru complet local, cu procesare direct pe dispozitivul tÄƒu",
      ],
      imageAlt: "Fluxul de lucru pentru decuparea PDF",
    },
    benefitsTitle: "De ce sÄƒ decupezi PDF-uri cu ihatelovepdf",
    benefits: [
      {
        title: "Pagini mai curate",
        description:
          "EliminÄƒ marginile albe care distrag atenÈ›ia È™i concentreazÄƒ fiecare paginÄƒ pe conÈ›inutul important.",
      },
      {
        title: "Editare selectivÄƒ",
        description:
          "DecupeazÄƒ doar paginile care necesitÄƒ ajustare, în loc sÄƒ modifici întregul document.",
      },
      {
        title: "Privat prin definiÈ›ie",
        description:
          "Fiecare decupare ruleazÄƒ direct în browserul tÄƒu, fiind sigurÄƒ pentru facturi, scanÄƒri È™i rapoarte interne.",
      },
    ],
    howTo: {
      title: "Cum sÄƒ decupezi pagini PDF cu ihatelovepdf",
      steps: [
        "ÎncarcÄƒ PDF-ul È™i alege fiÈ™ierul ale cÄƒrui pagini doreÈ™ti sÄƒ le decupezi.",
        "SelecteazÄƒ paginile de modificat È™i configureazÄƒ marginile de decupare.",
        "FÄƒ clic pe „ProceseazÄƒ” pentru a descÄƒrca noul PDF cu noile limite ale paginilor.",
      ],
      note:
        "DacÄƒ diferite grupuri de pagini necesitÄƒ decupÄƒri diferite, poÈ›i rula decuparea de mai multe ori.",
    },
    useCasesTitle: "Când este utilÄƒ decuparea unui PDF",
    useCases: [
      "AjusteazÄƒ marginile scanate ale formularelor, chitanÈ›elor sau documentelor semnate.",
      "EliminÄƒ marginile albe suplimentare înainte de a imprima sau de a combina fiÈ™ierele.",
      "StandardizeazÄƒ paginile exportate din instrumente diferite care au borduri neuniforme.",
      "PregÄƒteÈ™te cadre mai strânse înainte de a partaja manuale, rapoarte sau materiale de studiu.",
    ],
  },
  rotate: {
    key: "rotate",
    slug: "roteste",
    mode: "rotate",
    meta: {
      title: "RoteÈ™te pagini PDF | Întoarce paginile online | ihatelovepdf | Rotate PDF",
      description:
        "RoteÈ™te paginile selectate din PDF cu 90 sau 180 de grade direct în browser. Privat, gratuit È™i complet local.",
      keywords: [
        "roteste pdf",
        "intoarce pagini pdf",
        "rotire pdf",
        "corecteaza pdf inclinat",
        "roteste pagina pdf",
        "rotate pdf",
      ],
      ogTitle: "RoteÈ™te pagini PDF în câteva secunde | ihatelovepdf",
      ogDescription:
        "SelecteazÄƒ paginile care au nevoie de o altÄƒ orientare, alege 90 sau 180 de grade È™i descarcÄƒ PDF-ul corectat fÄƒrÄƒ a încÄƒrca nimic.",
      ogImageAlt: "Rotirea paginilor PDF în ihatelovepdf",
    },
    hero: {
      title: "RoteÈ™te paginile PDF fÄƒrÄƒ pierdere de calitate",
      description:
        "CorecteazÄƒ scanÄƒrile înclinate, exporturile inversate sau paginile cu orientÄƒri mixte în doar câteva clicuri.",
      bulletPoints: [
        "RoteÈ™te doar paginile pe care le selectezi manual",
        "Alege 90 de grade la dreapta, 180 de grade sau 90 de grade la stânga",
        "Totul ruleazÄƒ în browserul tÄƒu, fÄƒrÄƒ încÄƒrcÄƒri sau timpi de aÈ™teptare",
      ],
      imageAlt: "Fluxul de lucru pentru rotirea paginilor PDF",
    },
    benefitsTitle: "De ce sÄƒ roteÈ™ti pagini cu ihatelovepdf",
    benefits: [
      {
        title: "CorecÈ›ii precise",
        description:
          "AjusteazÄƒ doar paginile care au orientare greÈ™itÄƒ, excelent pentru loturi de scanare mixte.",
      },
      {
        title: "Corectare rapidÄƒ",
        description:
          "SchimbÄƒ orientarea paginilor în câteva secunde fÄƒrÄƒ a deschide un editor desktop greoi.",
      },
      {
        title: "Privat implicit",
        description:
          "Documentele confidenÈ›iale rÄƒmân pe dispozitivul tÄƒu, deoarece fiecare rotire se executÄƒ local.",
      },
    ],
    howTo: {
      title: "Cum sÄƒ roteÈ™ti pagini PDF",
      steps: [
        "ÎncarcÄƒ PDF-ul È™i alege documentul ale cÄƒrui pagini doreÈ™ti sÄƒ le corectezi.",
        "SelecteazÄƒ paginile de rotit È™i alege 90° dreapta, 180° sau 90° stânga.",
        "FÄƒ clic pe „ProceseazÄƒ” pentru a descÄƒrca noul PDF cu orientarea actualizatÄƒ.",
      ],
      note:
        "Mai ai nevoie de ajustÄƒri? PoÈ›i oricând sÄƒ reordonezi, sÄƒ extragi sau sÄƒ comprimi ulterior PDF-ul rotit.",
    },
    useCasesTitle: "Când ajutÄƒ rotirea paginilor",
    useCases: [
      "CorecteazÄƒ contractele sau formularele scanate care au fost introduse lateral în scanner.",
      "Întoarce paginile inversate din rapoartele asamblate din surse diferite.",
      "CorecteazÄƒ notiÈ›ele de curs sau manualele înainte de a le partaja cu studenÈ›ii.",
      "CurÄƒÈ›Äƒ PDF-urile de arhivÄƒ pentru ca fiecare paginÄƒ sÄƒ fie confortabil de citit pe ecran.",
    ],
  },
  reorder: {
    key: "reorder",
    slug: "reordoneaza",
    mode: "reorder",
    meta: {
      title: "ReordoneazÄƒ paginile PDF | SchimbÄƒ ordinea | ihatelovepdf | Reorder PDF",
      description:
        "ReordoneazÄƒ cu uÈ™urinÈ›Äƒ paginile PDF-ului tÄƒu printr-o interfaÈ›Äƒ simplÄƒ de tip drag-and-drop. CorecteazÄƒ ordinea documentelor È™i salveazÄƒ instant.",
      keywords: [
        "reordoneaza pdf",
        "schimba ordine pagini pdf",
        "organizeaza pdf",
        "sorteaza pagini pdf",
        "reorder pdf",
      ],
      ogTitle: "OrganizeazÄƒ paginile PDF fÄƒrÄƒ a instala programe | ihatelovepdf",
      ogDescription:
        "MutÄƒ paginile la locul lor, corecteazÄƒ erorile de sortare È™i descarcÄƒ documentul PDF perfect organizat.",
      ogImageAlt: "Reorganizarea paginilor PDF",
    },
    hero: {
      title: "ReordoneazÄƒ paginile PDF prin drag-and-drop",
      description:
        "CorecteazÄƒ secvenÈ›a facturilor scanate, prezentÄƒrilor sau rapoartelor lungi în câteva secunde.",
      bulletPoints: [
        "Miniaturile mari te ajutÄƒ sÄƒ eviÈ›i erorile de sortare",
        "Trage paginile È™i confirmÄƒ noua ordine în mod instantaneu",
        "ExportÄƒ PDF-ul reordonat fÄƒrÄƒ a pierde semnele de carte sau legÄƒturile interne",
      ],
      imageAlt: "InterfaÈ›a pentru ordonarea paginilor",
    },
    benefitsTitle: "De ce sÄƒ reordonezi pagini cu ihatelovepdf",
    benefits: [
      {
        title: "Fluxuri de lucru rapide",
        description:
          "CorecteazÄƒ scanÄƒrile dezordonate fÄƒrÄƒ a rescanÄƒ È™i fÄƒrÄƒ a instala editoare complexe.",
      },
      {
        title: "Precizie vizualÄƒ",
        description:
          "Miniaturile îÈ›i permit sÄƒ validezi fiecare paginÄƒ înainte de a exporta noua structurÄƒ.",
      },
      {
        title: "FÄƒrÄƒ urme lÄƒsate",
        description:
          "Totul se întâmplÄƒ pe dispozitivul tÄƒu, fiind soluÈ›ia idealÄƒ pentru documente sensibile.",
      },
    ],
    howTo: {
      title: "Cum sÄƒ reordonezi paginile cu ihatelovepdf",
      steps: [
        "ÎncarcÄƒ PDF-ul È™i alege documentul pe care doreÈ™ti sÄƒ-l modifici.",
        "Trage fiecare miniaturÄƒ pânÄƒ când ordinea paginilor este cea corectÄƒ.",
        "ApasÄƒ pe „ProceseazÄƒ” pentru a descÄƒrca documentul cu noua sa secvenÈ›Äƒ.",
      ],
      note:
        "PoÈ›i continua sÄƒ ajustezi ordinea chiar È™i dupÄƒ un export, fÄƒrÄƒ a reîncÄƒrca fiÈ™ierul.",
    },
    useCasesTitle: "Când este util sÄƒ reordonezi un PDF",
    useCases: [
      "AlinieazÄƒ propunerile financiare, anexele È™i semnÄƒturile în ordinea corectÄƒ înainte de trimitere.",
      "PregÄƒteÈ™te prezentÄƒri tipÄƒrite respectând secvenÈ›a exactÄƒ a diapozitivelor.",
      "CorecteazÄƒ paginile duplicat sau inversate dupÄƒ scanarea unui lot mare de documente.",
      "ActualizeazÄƒ manualele prin reorganizarea conÈ›inutului existent fÄƒrÄƒ a le reproiecta complet.",
    ],
  },
  pdfToImages: {
    key: "pdfToImages",
    slug: "pdf-in-imagini",
    mode: "pdfToImages",
    meta: {
      title: "ConverteÈ™te PDF în imagini | Export PNG sau JPEG | ihatelovepdf | PDF to Images",
      description:
        "ConverteÈ™te fiecare paginÄƒ a PDF-ului tÄƒu în imagini PNG sau JPEG de înaltÄƒ calitate. Alege rezoluÈ›ia È™i descarcÄƒ-le ca arhivÄƒ ZIP.",
      keywords: [
        "pdf in imagini",
        "exporta pagini pdf",
        "pdf in png",
        "pdf in jpeg",
        "descarca pdf ca imagini",
        "pdf to images",
      ],
      ogTitle: "ExportÄƒ paginile PDF ca imagini clare | ihatelovepdf",
      ogDescription:
        "RedÄƒ fiecare paginÄƒ ca o imagine clarÄƒ direct în browserul tÄƒu. AjusteazÄƒ calitatea È™i obÈ›ine instant o arhivÄƒ ZIP.",
      ogImageAlt: "ihatelovepdf exportând pagini PDF în imagini",
    },
    hero: {
      title: "ConverteÈ™te paginile PDF în PNG sau JPEG",
      description:
        "GenereazÄƒ imagini clare din fiecare paginÄƒ pentru prezentÄƒri, revizuiri sau integrare în proiecte de design.",
      bulletPoints: [
        "SelecteazÄƒ PNG sau JPEG È™i controleazÄƒ rezoluÈ›ia de export (DPI)",
        "DescarcÄƒ totul grupate într-un ZIP sau descarcÄƒ paginile individual",
        "Redare exclusiv localÄƒ — fÄƒrÄƒ încÄƒrcÄƒri, fÄƒrÄƒ urme pe servere",
      ],
      imageAlt: "Fluxul de lucru pentru conversia PDF în imagini",
    },
    benefitsTitle: "De ce sÄƒ exporÈ›i PDF-uri ca imagini cu ihatelovepdf",
    benefits: [
      {
        title: "Calitate pregÄƒtitÄƒ de prezentare",
        description:
          "Alege rezoluÈ›ia potrivitÄƒ pentru diapozitivele tale fÄƒrÄƒ a ghici dacÄƒ paginile vor fi suficient de clare.",
      },
      {
        title: "DescÄƒrcÄƒri flexibile",
        description:
          "ObÈ›ine o arhivÄƒ ZIP ordonatÄƒ pentru documente lungi sau descarcÄƒ doar paginile dorite.",
      },
      {
        title: "Privat prin design",
        description:
          "Redarea se face direct în browser, astfel încât documentele confidenÈ›iale nu ajung niciodatÄƒ pe servere terÈ›e.",
      },
    ],
    howTo: {
      title: "Cum sÄƒ converteÈ™ti un PDF în imagini",
      steps: [
        "ÎncarcÄƒ PDF-ul pe care doreÈ™ti sÄƒ-l converteÈ™ti în imagini.",
        "Alege PNG sau JPEG, ajusteazÄƒ DPI-ul È™i decide dacÄƒ doreÈ™ti rezultatele într-o arhivÄƒ ZIP.",
        "FÄƒ clic pe „ExportÄƒ imagini” pentru a descÄƒrca arhiva.",
      ],
      note:
        "Ai nevoie doar de câteva pagini? Divide sau extrage mai întâi, apoi exportÄƒ-le ca imagini.",
    },
    useCasesTitle: "Când ajutÄƒ conversia din PDF în imagine",
    useCases: [
      "PartajeazÄƒ previzualizÄƒri statice ale propunerilor de design aprobate.",
      "IntegreazÄƒ pagini PDF unice în platforme web (CMS) sau prezentÄƒri PowerPoint.",
      "CreeazÄƒ imagini compatibile cu tablete sau e-readere care citesc mai greu PDF-uri mari.",
      "DocumentezÄƒ fluxurile de lucru pentru revizuiri care necesitÄƒ capturi de ecran ale paginilor.",
    ],
  },
};

export const operationsRo: Record<OperationKey, OperationContent> = getOperationsLocalized("ro", operationsRoContent);

