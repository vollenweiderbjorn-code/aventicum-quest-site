/* ═══════════════════════════════════════════════════════════════
   AVENTICUM QUEST : textes FR / EN / DE de la page d'accueil

   Format : window.AQ_I18N = { fr: {...}, en: {...}, de: {...} }
   Clés pointées (hero.t1). Attributs HTML lus par main.js :
     data-i18n="clé"        texte brut
     data-i18n-html="clé"   texte avec balises (liens)
     data-i18n-alt="clé"    attribut alt
     data-i18n-aria="clé"   attribut aria-label
   Le HTML statique contient déjà le français (indexation, sans JS).
   Allemand : « ihr » (pages marketing), « Sie » réservé aux pages légales.
   Les noms de stations sont dans stations.json (une seule source).
   ═══════════════════════════════════════════════════════════════ */
window.AQ_I18N = {

  /* ───────────────────────────── FRANÇAIS ───────────────────────────── */
  fr: {
    meta: {
      title: "Aventicum Quest : jeu de piste outdoor à Avenches",
      desc: "Chasse au trésor grandeur nature dans les vestiges romains d'Avenches : 8 énigmes, environ 1h30 à 2h en famille. Prêt à percer le secret d'Aventicum ?",
      og: "L'aigle de la Legio XXI a été volée. Résolvez 8 énigmes à travers les lieux emblématiques d'Avenches en environ 1h30 à 2h."
    },
    a11y: { skip: "Aller au contenu" },
    nav: {
      aria: "Navigation principale",
      mission: "La mission",
      stations: "Les stations",
      enigmes: "Les énigmes",
      tarifs: "Tarifs",
      faq: "FAQ",
      buy: "Acheter",
      menu: "Menu",
      close: "Fermer",
      lang: "Langue"
    },
    hero: {
      kicker: "OPERATIO AQUILA · AVENCHES",
      t1: "L'aigle a",
      t2: "disparu.",
      lead: "Huit stations dans l'ancienne Aventicum, une énigme à chacune. Votre équipe a deux heures pour la retrouver.",
      cta: "Découvrir la mission",
      timer: "TEMPS RESTANT",
      alt: "Ruines romaines d'Avenches"
    },
    facts: {
      aria: "L'essentiel en un coup d'œil",
      dur: { k: "DURÉE", v: "Environ 1h30 à 2h" },
      route: { k: "PARCOURS", v: "8 stations à Avenches" },
      players: { k: "JOUEURS", v: "En famille ou entre amis" },
      gear: { k: "MATÉRIEL", v: "Un téléphone" }
    },
    mission: {
      kicker: "LE DOSSIER",
      t1: "Trois temps,",
      t2: "une piste.",
      p1: "<em>117 après J.-C. Aventicum est au sommet de sa gloire : 20 000 habitants, un sanctuaire dédié à Jupiter, des thermes dignes de Rome.</em> Mais cette nuit, l'aquila sacrée de la Legio XXI Rapax a disparu. L'Empereur Hadrien fait route vers la ville.",
      p2: "Le Sénat vous mandate pour mener l'enquête. À pied, armés de votre smartphone, vous parcourez 8 lieux emblématiques d'Avenches et répondez aux énigmes qu'ils recèlent.",
      s1: {
        t: "Formez votre équipe",
        d: "Achetez votre code, puis ouvrez <a href=\"https://jeu.aventicumquest.ch\">jeu.aventicumquest.ch</a> sur un téléphone, à la Place de l'Église. Entrez le code et baptisez votre équipe. Aucune application à installer.",
        alt: "L'Hôtel de Ville d'Avenches, point de départ"
      },
      s2: {
        t: "Suivez les huit stations",
        d: "À chaque lieu, une énigme à résoudre sur place. Résolvez-la pour passer à la station suivante.",
        alt: "Les Arènes d'Avenches"
      },
      s3: {
        t: "Retrouvez l'aigle",
        d: "Retrouvez l'aigle avant l'arrivée de l'Empereur, et Aventicum vous devra la paix.",
        alt: "La Porte de l'Est, dernière station"
      }
    },
    map: {
      kicker: "LE PARCOURS",
      t1: "Huit lieux,",
      t2: "un seul fil.",
      lead: "À pied, de l'Hôtel de Ville à la Porte de l'Est. Touchez une station pour la voir.",
      note: "Parcours d'environ 2,8 km",
      station: "STATION",
      prev: "Station précédente",
      next: "Station suivante",
      mapLabel: "Carte des 8 stations du parcours",
      listLabel: "Liste des stations",
      loading: "Chargement de la carte",
      types: { obs: "Énigme d'observation", qcm: "Question à choix", steps: "Énigme à étapes" },
      short: { obs: "OBS", qcm: "QCM", steps: "ÉTAPES" }
    },
    enig: {
      kicker: "LES ÉNIGMES",
      t1: "Trois façons",
      t2: "de chercher.",
      lead: "Chaque station demande un regard différent, et des indices sont là pour vous aider en route.",
      obs: {
        tag: "OBSERVATION",
        t: "Ouvrez l'œil",
        d: "Un détail se cache dans la pierre, sur une façade ou un panneau. Il faut le trouver sur place.",
        hint: "Trouvez ce détail",
        alt: "Vestiges des thermes romains sous leur abri"
      },
      qcm: {
        tag: "QCM",
        t: "Choisissez juste",
        d: "Plusieurs propositions s'offrent à vous. L'équipe en discute avant de valider.",
        example: "EXEMPLE",
        q: "Quel symbole voyez-vous gravé ici ?",
        o1: "Une feuille",
        o2: "Une couronne",
        o3: "Un aigle"
      },
      steps: {
        tag: "ÉNIGME À ÉTAPES",
        t: "Étape après étape",
        d: "Plusieurs étapes à franchir l'une après l'autre. L'énigme est résolue quand toutes sont réussies.",
        step: "ÉTAPE 2 / 3",
        alt: "La colonne du Sanctuaire du Cigognier"
      }
    },
    before: {
      kicker: "AVANT DE PARTIR",
      t: "Ce qu'il faut savoir",
      who: {
        k: "POUR QUI",
        t: "Familles, amis, couples",
        d: "Les énigmes se résolvent en équipe. Pas d'âge minimum, gratuit pour les moins de 5 ans. Les mineurs jouent accompagnés d'un adulte."
      },
      time: {
        k: "DURÉE",
        t: "Environ 1h30 à 2h",
        d: "À votre rythme, avec des pauses quand vous le voulez. Parcours d'environ 2,8 km."
      },
      bring: {
        k: "À PRENDRE",
        t: "Le nécessaire",
        i1: "Un smartphone chargé, avec connexion internet",
        i2: "Des chaussures confortables",
        i3: "De l'eau",
        i4: "Des vêtements adaptés à la météo"
      },
      start: {
        k: "POINT DE DÉPART",
        d: "Place de l'Église à Avenches, station 1 : Hôtel de Ville. Environ 10 minutes à pied de la gare d'Avenches.",
        link: "Itinéraire"
      },
      lang: { k: "LANGUES", d: "Jouable en français, anglais ou allemand." }
    },
    price: {
      kicker: "TARIFS",
      t: "Un prix simple",
      adult: "Adulte",
      adultNote: "Par personne, dès 18 ans",
      child: "Enfant",
      childNote: "Par personne, de 5 à 17 ans",
      free: "Gratuit pour les moins de 5 ans",
      team: "Forfait équipe",
      teamNote: "Jusqu'à 5 personnes, tous âges, un seul prix",
      teamTag: "LE PLUS SIMPLE",
      help: "À partir de 4 personnes, le forfait est souvent plus avantageux.",
      note: "Un seul code par commande, valable pour toute votre équipe. Valable 12 mois à partir de l'achat.",
      cta: "Acheter mes billets",
      groups: "Écoles et grands groupes : nous contacter",
      gift: {
        k: "BON CADEAU",
        t: "Offrez la mission",
        d: "Un bon pour une équipe, à imprimer ou à envoyer par e-mail. Valable 12 mois à partir de l'achat.",
        cta: "Offrir un bon cadeau",
        alt: "Les Arènes d'Avenches"
      }
    },
    faq: {
      kicker: "QUESTIONS",
      t: "Questions fréquentes",
      i1: {
        q: "Faut-il réserver un créneau ?",
        a: "Non, aucun créneau à réserver. Votre code est valable 12 mois à partir de l'achat : vous jouez quand vous voulez."
      },
      i2: {
        q: "Faut-il installer une application ?",
        a: "Non. Le jeu se lance dans le navigateur du téléphone, sur jeu.aventicumquest.ch. Un smartphone avec connexion internet suffit."
      },
      i3: {
        q: "Combien de temps faut-il prévoir ?",
        a: "Prévoyez environ 1h30 à 2h, à votre rythme. Il n'y a pas de compte à rebours qui vous arrête : vous terminez l'enquête quand vous le souhaitez."
      },
      i4: {
        q: "Peut-on faire une pause en route ?",
        a: "Oui. Votre progression est enregistrée sur le téléphone : vous pouvez fermer le jeu et reprendre plus tard, sur le même téléphone."
      },
      i5: {
        q: "Que se passe-t-il s'il pleut ?",
        a: "Le jeu se pratique en extérieur. Sous une pluie légère il reste jouable, prévoyez une tenue adaptée. En cas d'orage, mieux vaut reporter : votre code est valable 12 mois, vous pouvez revenir un autre jour."
      },
      i6: {
        q: "Le parcours est-il accessible en poussette ou en fauteuil roulant ?",
        a: "Le parcours traverse la vieille ville et le site romain d'Avenches, en partie sur des chemins pavés ou en herbe. La plus grande partie se fait en poussette. Pour un fauteuil roulant, certains passages peuvent être délicats : écrivez-nous à <a href=\"mailto:info@aventicumquest.ch\">info@aventicumquest.ch</a> et nous vous renseignons."
      },
      i7: {
        q: "Faut-il bien comprendre le français pour jouer ?",
        a: "Non. Le jeu est entièrement disponible en français, en anglais et en allemand. Vous choisissez votre langue au lancement de la partie."
      },
      i8: {
        q: "Peut-on jouer à plusieurs équipes en même temps ?",
        a: "Oui. Chaque équipe achète son propre code et joue de son côté. C'est idéal pour une sortie de groupe ou une petite compétition amicale entre équipes."
      },
      i9: {
        q: "Le code d'accès a-t-il une date d'expiration ?",
        a: "Votre code est valable 12 mois à partir de l'achat. Pendant cette période, vous partez quand vous voulez."
      },
      i10: {
        q: "Quelle formule choisir ?",
        a: "Le tarif par joueur coûte 12 CHF par adulte et 8 CHF par enfant de 5 à 17 ans, gratuit pour les moins de 5 ans. Le Forfait Équipe coûte 39 CHF pour une équipe jusqu'à 5 personnes, quel que soit leur âge. À partir de 4 personnes, le forfait est souvent plus avantageux. Dans les deux cas, vous recevez un seul code pour toute l'équipe."
      }
    },
    trust: { kicker: "ILS EN PARLENT", t: "Avis et partenaires" },
    xmas: { text: "Offrez l'aventure pour Noël", close: "Fermer" },
    footer: {
      tagline: "Jeu de piste à Avenches, Suisse",
      explore: "EXPLORER",
      mission: "La mission",
      gift: "Bons cadeaux",
      groups: "Groupes et écoles",
      guide: "Que faire à Avenches",
      family: "Jeu de piste en famille",
      info: "INFORMATIONS",
      legal: "Mentions légales",
      privacy: "Confidentialité",
      terms: "Conditions générales",
      contact: "Contact",
      copy: "© 2026 Aventicum Quest",
      place: "Avenches · Suisse"
    },
    "cookie-text": "Ce site utilise des cookies essentiels au fonctionnement. <a href=\"confidentialite.html\">En savoir plus</a>.",
    "cookie-accept": "Accepter",
    "cookie-refuse": "Refuser"
  },

  /* ───────────────────────────── ENGLISH ───────────────────────────── */
  en: {
    meta: {
      title: "Aventicum Quest: outdoor treasure hunt in Avenches",
      desc: "A life-size treasure hunt through the Roman ruins of Avenches: 8 puzzles, about 1.5 to 2 hours with family or friends. Uncover Aventicum's secret.",
      og: "The eagle of Legio XXI has been stolen. Solve 8 puzzles across the landmarks of Avenches in about 1.5 to 2 hours."
    },
    a11y: { skip: "Skip to content" },
    nav: {
      aria: "Main navigation",
      mission: "The mission",
      stations: "Stations",
      enigmes: "Puzzles",
      tarifs: "Prices",
      faq: "FAQ",
      buy: "Buy tickets",
      menu: "Menu",
      close: "Close",
      lang: "Language"
    },
    hero: {
      kicker: "OPERATIO AQUILA · AVENCHES",
      t1: "The eagle",
      t2: "is gone.",
      lead: "Eight stations across ancient Aventicum, one puzzle at each. Your team has two hours to find it.",
      cta: "Discover the mission",
      timer: "TIME LEFT",
      alt: "Roman ruins in Avenches"
    },
    facts: {
      aria: "The essentials at a glance",
      dur: { k: "DURATION", v: "About 1.5 to 2 hours" },
      route: { k: "ROUTE", v: "8 stations in Avenches" },
      players: { k: "PLAYERS", v: "Families and friends" },
      gear: { k: "YOU NEED", v: "One phone" }
    },
    mission: {
      kicker: "THE FILE",
      t1: "Three steps,",
      t2: "one trail.",
      p1: "<em>117 AD. Aventicum is at the height of its glory: 20,000 inhabitants, a sanctuary dedicated to Jupiter, baths worthy of Rome itself.</em> But tonight, the sacred aquila of Legio XXI Rapax has vanished. Emperor Hadrian is on his way.",
      p2: "The Senate tasks you with the investigation. On foot, armed with your smartphone, you explore 8 landmarks of Avenches and solve the riddles they conceal.",
      s1: {
        t: "Form your team",
        d: "Buy your code, then open <a href=\"https://jeu.aventicumquest.ch\">jeu.aventicumquest.ch</a> on a phone at Place de l'Église. Enter the code and name your team. No app to install.",
        alt: "Avenches Town Hall, the starting point"
      },
      s2: {
        t: "Follow the eight stations",
        d: "At each place, a puzzle to solve on the spot. Solve it to move on to the next station.",
        alt: "The Roman arena of Avenches"
      },
      s3: {
        t: "Find the eagle",
        d: "Find the eagle before the Emperor arrives, and Aventicum will owe you its peace.",
        alt: "The East Gate, the last station"
      }
    },
    map: {
      kicker: "THE ROUTE",
      t1: "Eight places,",
      t2: "one thread.",
      lead: "On foot, from the Town Hall to the East Gate. Tap a station to see it.",
      note: "Route of about 2.8 km",
      station: "STATION",
      prev: "Previous station",
      next: "Next station",
      mapLabel: "Map of the 8 stations on the route",
      listLabel: "List of stations",
      loading: "Loading the map",
      types: { obs: "Observation puzzle", qcm: "Multiple-choice question", steps: "Multi-step puzzle" },
      short: { obs: "OBS", qcm: "MCQ", steps: "STEPS" }
    },
    enig: {
      kicker: "THE PUZZLES",
      t1: "Three ways",
      t2: "to search.",
      lead: "Every station asks for a different eye, and hints are there to help you along the way.",
      obs: {
        tag: "OBSERVATION",
        t: "Keep your eyes open",
        d: "A detail hides in the stone, on a façade or on a sign. You have to find it on the spot.",
        hint: "Find this detail",
        alt: "Ruins of the Roman baths under their shelter"
      },
      qcm: {
        tag: "MULTIPLE CHOICE",
        t: "Choose wisely",
        d: "Several options to pick from. The team talks it over before confirming.",
        example: "EXAMPLE",
        q: "Which symbol do you see carved here?",
        o1: "A leaf",
        o2: "A crown",
        o3: "An eagle"
      },
      steps: {
        tag: "MULTI-STEP PUZZLE",
        t: "Step by step",
        d: "Several steps to complete one after the other. The puzzle is solved when all of them are done.",
        step: "STEP 2 / 3",
        alt: "The column of the Cigognier Sanctuary"
      }
    },
    before: {
      kicker: "BEFORE YOU GO",
      t: "Good to know",
      who: {
        k: "WHO IT IS FOR",
        t: "Families, friends, couples",
        d: "Puzzles are solved as a team. No minimum age, free for children under 5. Minors play with an accompanying adult."
      },
      time: {
        k: "DURATION",
        t: "About 1.5 to 2 hours",
        d: "At your own pace, with breaks whenever you like. Route of about 2.8 km."
      },
      bring: {
        k: "BRING",
        t: "The essentials",
        i1: "A charged smartphone with an internet connection",
        i2: "Comfortable shoes",
        i3: "Water",
        i4: "Clothes suited to the weather"
      },
      start: {
        k: "STARTING POINT",
        d: "Place de l'Église in Avenches, station 1: Town Hall. About 10 minutes' walk from Avenches railway station.",
        link: "Directions"
      },
      lang: { k: "LANGUAGES", d: "Playable in French, English or German." }
    },
    price: {
      kicker: "PRICES",
      t: "One simple price",
      adult: "Adult",
      adultNote: "Per person, 18 and over",
      child: "Child",
      childNote: "Per person, 5 to 17",
      free: "Free for children under 5",
      team: "Team pass",
      teamNote: "Up to 5 people, any age, one price",
      teamTag: "SIMPLEST",
      help: "From 4 people, the Team Pass is often the better deal.",
      note: "One code per order, valid for your whole team. Valid 12 months from purchase.",
      cta: "Buy my tickets",
      groups: "Schools and large groups: contact us",
      gift: {
        k: "GIFT VOUCHER",
        t: "Give the mission",
        d: "A voucher for one team, to print or send by email. Valid 12 months from purchase.",
        cta: "Give a gift voucher",
        alt: "The Roman arena of Avenches"
      }
    },
    faq: {
      kicker: "QUESTIONS",
      t: "Frequently asked questions",
      i1: {
        q: "Do we need to book a time slot?",
        a: "No, there is no slot to book. Your code is valid for 12 months from purchase: you play whenever you like."
      },
      i2: {
        q: "Do we need to install an app?",
        a: "No. The game runs in your phone's browser, at jeu.aventicumquest.ch. A smartphone with an internet connection is all you need."
      },
      i3: {
        q: "How long should we allow?",
        a: "Allow about 1.5 to 2 hours, at your own pace. There is no countdown that stops you: you finish the investigation whenever you like."
      },
      i4: {
        q: "Can we take a break along the way?",
        a: "Yes. Your progress is saved on the phone: you can close the game and pick it up later, on the same phone."
      },
      i5: {
        q: "What happens if it rains?",
        a: "The game is played outdoors. In light rain it stays playable, just bring suitable clothing. In a thunderstorm it is better to postpone: your code is valid for 12 months, so you can come back another day."
      },
      i6: {
        q: "Is the route accessible with a stroller or wheelchair?",
        a: "The route runs through the old town and the Roman site of Avenches, partly on cobbled or grassy paths. Most of it is doable with a stroller. For a wheelchair, some sections may be tricky: write to us at <a href=\"mailto:info@aventicumquest.ch\">info@aventicumquest.ch</a> and we will advise you."
      },
      i7: {
        q: "Do you need to understand French to play?",
        a: "No. The game is fully available in French, English and German. You choose your language when you start."
      },
      i8: {
        q: "Can several teams play at the same time?",
        a: "Yes. Each team buys its own code and plays separately. It is ideal for a group outing or a friendly contest between teams."
      },
      i9: {
        q: "Does the access code have an expiry date?",
        a: "Your code is valid for 12 months from purchase. Within that period, you set off whenever you want."
      },
      i10: {
        q: "Which option should we choose?",
        a: "The per-player price is CHF 12 per adult and CHF 8 per child aged 5 to 17, free for children under 5. The Team Pass costs CHF 39 for one team of up to 5 people, whatever their age. From 4 people, the Team Pass is often the better deal. Either way, you receive a single code for the whole team."
      }
    },
    trust: { kicker: "WHAT PLAYERS SAY", t: "Reviews and partners" },
    xmas: { text: "Give the adventure for Christmas", close: "Close" },
    footer: {
      tagline: "Treasure hunt in Avenches, Switzerland",
      explore: "EXPLORE",
      mission: "The mission",
      gift: "Gift vouchers",
      groups: "Groups and schools",
      guide: "Things to do in Avenches",
      family: "Family treasure hunt",
      info: "INFORMATION",
      legal: "Legal notice",
      privacy: "Privacy",
      terms: "Terms and conditions",
      contact: "Contact",
      copy: "© 2026 Aventicum Quest",
      place: "Avenches · Switzerland"
    },
    "cookie-text": "This site uses essential cookies. <a href=\"confidentialite.html\">Learn more</a>.",
    "cookie-accept": "Accept",
    "cookie-refuse": "Decline"
  },

  /* ───────────────────────────── DEUTSCH ───────────────────────────── */
  de: {
    meta: {
      title: "Aventicum Quest: Outdoor-Schnitzeljagd in Avenches",
      desc: "Schatzsuche in Originalgrösse in den römischen Ruinen von Avenches: 8 Rätsel, rund 1,5 bis 2 Stunden. Lüftet das Geheimnis von Aventicum.",
      og: "Der Adler der Legio XXI wurde gestohlen. Löst 8 Rätsel an den Wahrzeichen von Avenches in rund 1,5 bis 2 Stunden."
    },
    a11y: { skip: "Zum Inhalt springen" },
    nav: {
      aria: "Hauptnavigation",
      mission: "Die Mission",
      stations: "Stationen",
      enigmes: "Rätsel",
      tarifs: "Preise",
      faq: "FAQ",
      buy: "Tickets kaufen",
      menu: "Menü",
      close: "Schliessen",
      lang: "Sprache"
    },
    hero: {
      kicker: "OPERATIO AQUILA · AVENCHES",
      t1: "Der Adler",
      t2: "ist fort.",
      lead: "Acht Stationen im antiken Aventicum, an jeder ein Rätsel. Euer Team hat zwei Stunden, um ihn zu finden.",
      cta: "Mission entdecken",
      timer: "VERBLEIBENDE ZEIT",
      alt: "Römische Ruinen in Avenches"
    },
    facts: {
      aria: "Das Wichtigste auf einen Blick",
      dur: { k: "DAUER", v: "Rund 1,5 bis 2 Std." },
      route: { k: "STRECKE", v: "8 Stationen in Avenches" },
      players: { k: "SPIELER", v: "Familien und Freunde" },
      gear: { k: "DABEI", v: "Ein Smartphone" }
    },
    mission: {
      kicker: "DAS DOSSIER",
      t1: "Drei Schritte,",
      t2: "eine Spur.",
      p1: "<em>117 n. Chr. Aventicum ist auf dem Höhepunkt seines Ruhms: 20 000 Einwohner, ein Jupiter geweihtes Heiligtum, Thermen würdig Roms.</em> Doch in dieser Nacht ist der heilige Aquila der Legio XXI Rapax verschwunden. Kaiser Hadrian ist auf dem Weg in die Stadt.",
      p2: "Der Senat beauftragt euch mit der Untersuchung. Zu Fuss, mit dem Smartphone bewaffnet, erkundet ihr 8 Wahrzeichen von Avenches und löst die Rätsel, die sie verbergen.",
      s1: {
        t: "Bildet euer Team",
        d: "Kauft euren Code und öffnet dann <a href=\"https://jeu.aventicumquest.ch\">jeu.aventicumquest.ch</a> auf einem Smartphone an der Place de l'Église. Gebt den Code ein und tauft euer Team. Keine App nötig.",
        alt: "Das Rathaus von Avenches, der Startpunkt"
      },
      s2: {
        t: "Folgt den acht Stationen",
        d: "An jedem Ort wartet ein Rätsel, das ihr vor Ort löst. Löst es, um zur nächsten Station zu gelangen.",
        alt: "Die römische Arena von Avenches"
      },
      s3: {
        t: "Findet den Adler",
        d: "Findet den Adler vor der Ankunft des Kaisers, und Aventicum wird euch seinen Frieden schulden.",
        alt: "Das Osttor, die letzte Station"
      }
    },
    map: {
      kicker: "DER WEG",
      t1: "Acht Orte,",
      t2: "ein roter Faden.",
      lead: "Zu Fuss vom Rathaus zum Osttor. Tippt auf eine Station, um sie zu sehen.",
      note: "Strecke von rund 2,8 km",
      station: "STATION",
      prev: "Vorherige Station",
      next: "Nächste Station",
      mapLabel: "Karte der 8 Stationen der Strecke",
      listLabel: "Liste der Stationen",
      loading: "Karte wird geladen",
      types: { obs: "Beobachtungsrätsel", qcm: "Auswahlfrage", steps: "Rätsel in Etappen" },
      short: { obs: "BEOB.", qcm: "QUIZ", steps: "ETAPPEN" }
    },
    enig: {
      kicker: "DIE RÄTSEL",
      t1: "Drei Arten,",
      t2: "zu suchen.",
      lead: "Jede Station verlangt einen anderen Blick, und unterwegs helfen euch Hinweise.",
      obs: {
        tag: "BEOBACHTUNG",
        t: "Augen auf",
        d: "Ein Detail versteckt sich im Stein, an einer Fassade oder auf einer Tafel. Ihr müsst es vor Ort finden.",
        hint: "Findet dieses Detail",
        alt: "Überreste der römischen Thermen unter ihrem Schutzdach"
      },
      qcm: {
        tag: "AUSWAHLFRAGE",
        t: "Wählt klug",
        d: "Mehrere Antworten stehen zur Wahl. Das Team bespricht sich, bevor es bestätigt.",
        example: "BEISPIEL",
        q: "Welches Symbol seht ihr hier eingraviert?",
        o1: "Ein Blatt",
        o2: "Eine Krone",
        o3: "Ein Adler"
      },
      steps: {
        tag: "RÄTSEL IN ETAPPEN",
        t: "Etappe für Etappe",
        d: "Mehrere Etappen, eine nach der anderen. Das Rätsel ist gelöst, wenn alle geschafft sind.",
        step: "ETAPPE 2 / 3",
        alt: "Die Säule des Cigognier-Heiligtums"
      }
    },
    before: {
      kicker: "BEVOR IHR LOSGEHT",
      t: "Gut zu wissen",
      who: {
        k: "FÜR WEN",
        t: "Familien, Freunde, Paare",
        d: "Die Rätsel löst ihr im Team. Kein Mindestalter, gratis für Kinder unter 5 Jahren. Minderjährige spielen in Begleitung eines Erwachsenen."
      },
      time: {
        k: "DAUER",
        t: "Rund 1,5 bis 2 Stunden",
        d: "In eurem Tempo, mit Pausen, wann ihr wollt. Strecke von rund 2,8 km."
      },
      bring: {
        k: "MITNEHMEN",
        t: "Das Nötigste",
        i1: "Ein geladenes Smartphone mit Internetverbindung",
        i2: "Bequeme Schuhe",
        i3: "Wasser",
        i4: "Dem Wetter angepasste Kleidung"
      },
      start: {
        k: "STARTPUNKT",
        d: "Place de l'Église in Avenches, Station 1: Rathaus. Etwa 10 Minuten zu Fuss vom Bahnhof Avenches.",
        link: "Route planen"
      },
      lang: { k: "SPRACHEN", d: "Spielbar auf Französisch, Englisch oder Deutsch." }
    },
    price: {
      kicker: "PREISE",
      t: "Ein einfacher Preis",
      adult: "Erwachsene",
      adultNote: "Pro Person, ab 18 Jahren",
      child: "Kinder",
      childNote: "Pro Person, 5 bis 17 Jahre",
      free: "Gratis für Kinder unter 5 Jahren",
      team: "Team-Pauschale",
      teamNote: "Bis 5 Personen, jedes Alter, ein Preis",
      teamTag: "AM EINFACHSTEN",
      help: "Ab 4 Personen lohnt sich die Pauschale oft mehr.",
      note: "Ein Code pro Bestellung, gültig für euer ganzes Team. 12 Monate ab Kauf gültig.",
      cta: "Tickets kaufen",
      groups: "Schulen und grosse Gruppen: Kontakt",
      gift: {
        k: "GUTSCHEIN",
        t: "Die Mission verschenken",
        d: "Ein Gutschein für ein Team, zum Ausdrucken oder per E-Mail. 12 Monate ab Kauf gültig.",
        cta: "Gutschein verschenken",
        alt: "Die römische Arena von Avenches"
      }
    },
    faq: {
      kicker: "FRAGEN",
      t: "Häufige Fragen",
      i1: {
        q: "Muss man ein Zeitfenster reservieren?",
        a: "Nein, es gibt kein Zeitfenster zu reservieren. Euer Code ist 12 Monate ab Kauf gültig: Ihr spielt, wann ihr wollt."
      },
      i2: {
        q: "Muss man eine App installieren?",
        a: "Nein. Das Spiel läuft im Browser des Smartphones, auf jeu.aventicumquest.ch. Ein Smartphone mit Internetverbindung genügt."
      },
      i3: {
        q: "Wie viel Zeit sollte man einplanen?",
        a: "Plant etwa 1,5 bis 2 Stunden ein, in eurem Tempo. Es gibt keinen Countdown, der euch stoppt: Ihr beendet die Ermittlung, wann ihr möchtet."
      },
      i4: {
        q: "Kann man unterwegs eine Pause machen?",
        a: "Ja. Euer Fortschritt wird auf dem Smartphone gespeichert: Ihr könnt das Spiel schliessen und später auf demselben Smartphone weiterspielen."
      },
      i5: {
        q: "Was passiert, wenn es regnet?",
        a: "Das Spiel wird im Freien gespielt. Bei leichtem Regen bleibt es spielbar, nehmt einfach passende Kleidung mit. Bei Gewitter verschiebt ihr es besser: Euer Code ist 12 Monate gültig, ihr könnt an einem anderen Tag wiederkommen."
      },
      i6: {
        q: "Ist die Strecke mit Kinderwagen oder Rollstuhl zugänglich?",
        a: "Die Strecke führt durch die Altstadt und über das römische Gelände von Avenches, teils auf gepflasterten oder grasbewachsenen Wegen. Der grösste Teil ist mit Kinderwagen machbar. Für den Rollstuhl können einige Abschnitte heikel sein: Schreibt uns an <a href=\"mailto:info@aventicumquest.ch\">info@aventicumquest.ch</a>, wir beraten euch."
      },
      i7: {
        q: "Muss man gut Französisch verstehen, um zu spielen?",
        a: "Nein. Das Spiel ist vollständig auf Französisch, Englisch und Deutsch verfügbar. Ihr wählt eure Sprache zu Beginn."
      },
      i8: {
        q: "Können mehrere Teams gleichzeitig spielen?",
        a: "Ja. Jedes Team kauft seinen eigenen Code und spielt für sich. Ideal für einen Gruppenausflug oder einen kleinen freundschaftlichen Wettkampf zwischen Teams."
      },
      i9: {
        q: "Hat der Zugangscode ein Ablaufdatum?",
        a: "Euer Code ist 12 Monate ab Kauf gültig. In diesem Zeitraum brecht ihr auf, wann ihr wollt."
      },
      i10: {
        q: "Welche Variante sollen wir wählen?",
        a: "Pro Person kostet es 12 CHF für Erwachsene und 8 CHF für Kinder von 5 bis 17 Jahren, unter 5 Jahren gratis. Die Team-Pauschale kostet 39 CHF für ein Team mit bis zu 5 Personen, egal welchen Alters. Ab 4 Personen lohnt sich die Pauschale oft mehr. In beiden Fällen erhaltet ihr einen einzigen Code für das ganze Team."
      }
    },
    trust: { kicker: "STIMMEN", t: "Bewertungen und Partner" },
    xmas: { text: "Schenkt das Abenteuer zu Weihnachten", close: "Schliessen" },
    footer: {
      tagline: "Schnitzeljagd in Avenches, Schweiz",
      explore: "ENTDECKEN",
      mission: "Die Mission",
      gift: "Geschenkgutscheine",
      groups: "Gruppen und Schulen",
      guide: "Was in Avenches unternehmen",
      family: "Schnitzeljagd für Familien",
      info: "INFORMATIONEN",
      legal: "Impressum",
      privacy: "Datenschutz",
      terms: "AGB",
      contact: "Kontakt",
      copy: "© 2026 Aventicum Quest",
      place: "Avenches · Schweiz"
    },
    "cookie-text": "Diese Website verwendet notwendige Cookies. <a href=\"confidentialite.html\">Mehr erfahren</a>.",
    "cookie-accept": "Akzeptieren",
    "cookie-refuse": "Ablehnen"
  }
};
