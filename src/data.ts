import { Vehicle, CommercialAdvisor } from "./types";

export const ADVISORS: CommercialAdvisor[] = [
  {
    name: "Jean-Luc Koffi",
    role: "Responsable Commercial Vente Privée",
    phone: "+225 07 08 45 12 12",
    whatsapp: "2250708451212",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    availability: "8h00 - 19h00, Lun au Sam"
  },
  {
    name: "Alima Coulibaly",
    role: "Spécialiste Location & Événements",
    phone: "+225 05 44 89 90 90",
    whatsapp: "2250544899090",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    availability: "7h30 - 20h00, 7j/7"
  }
];

export const VEHICLES: Vehicle[] = [
  {
    id: "v1",
    brand: "Porsche",
    model: "Taycan 4S",
    category: "Sportive",
    offerType: "Vente",
    price: 85000000, // 85 Millions FCFA
    year: 2024,
    fuel: "Électrique",
    transmission: "Automatique",
    mileage: 8500,
    power: 530,
    acceleration: "4.0s",
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1611245801311-536f981ff30d?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000"
    ],
    color: "Gris Volcan Métallisé",
    seats: 4,
    doors: 4,
    description: "La Porsche Taycan 4S incarne l'alliance de l'âme d'une sportive de luxe et d'une technologie électrique révolutionnaire. Parfaite pour Abidjan, garantie constructeur Porsche Approved incluse. Recharge ultra-rapide disponible dans nos agences de Marcory et Cocody.",
    features: [
      "Projecteurs de roues arrière directrices (Pratique pour Abidjan)",
      "Toit panoramique fixe en verre",
      "Pack Sport Chrono avec bouton de mode",
      "Système de son haut de gamme BOSE®",
      "Régulateur de vitesse adaptatif",
      "Caméras panoramiques 360° pour le stationnement"
    ],
    isFeatured: true,
    status: "Disponible"
  },
  {
    id: "v2",
    brand: "Audi",
    model: "RS e-tron GT",
    category: "Premium",
    offerType: "Location",
    price: 350000, // 350,000 FCFA per day
    year: 2024,
    fuel: "Électrique",
    transmission: "Automatique",
    mileage: 4200,
    power: 646,
    acceleration: "3.3s",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1614026480209-cd9ec437e544?auto=format&fit=crop&q=80&w=1000"
    ],
    color: "Noir Mythic Métallisé",
    seats: 5,
    doors: 4,
    description: "Une œuvre d'art aérodynamique. L'Audi RS e-tron GT redéfinit la grande routière moderne. Louez l'exception pour vos mariages prestigieux à Abidjan, vos tournages de clips, vos événements VIP ou vos rendez-vous d'affaires du Plateau.",
    features: [
      "Suspension pneumatique adaptative haute sécurité",
      "Projecteurs Matrix LED avec éclairage laser Audi",
      "Affichage tête haute (HUD)",
      "Sièges sport climatisés (idéal température tropicale)",
      "Système audio Bang & Olufsen Premium 3D",
      "Chauffage et climatisation stationnaire commandée par app"
    ],
    isFeatured: true,
    status: "Disponible"
  },
  {
    id: "v3",
    brand: "Tesla",
    model: "Model Y Long Range",
    category: "SUV",
    offerType: "Vente",
    price: 35000000, // 35 Millions FCFA
    year: 2023,
    fuel: "Électrique",
    transmission: "Automatique",
    mileage: 24000,
    power: 351,
    acceleration: "5.0s",
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1000"
    ],
    color: "Blanc Nacré Multicouches",
    seats: 5,
    doors: 5,
    description: "Le SUV électrique par excellence maintenant disponible en Côte d'Ivoire. Confort exceptionnel, habitabilité incroyable et autonomie de plus de 500 km, idéal pour vos navettes Abidjan-Yamoussoukro sans aucun stress de carburant.",
    features: [
      "Autopilote Tesla dernière génération",
      "Toit vitré teinté avec filtre de protection UV extrême",
      "Console centrale avec chargeurs sans fil intégrés",
      "Intérieur cuir vegan blanc haute qualité",
      "Installation de votre borne de recharge à domicile incluse"
    ],
    isFeatured: false,
    status: "Disponible"
  },
  {
    id: "v4",
    brand: "BMW",
    model: "M4 Competition xDrive",
    category: "Sportive",
    offerType: "Vente",
    price: 68000000, // 68 Millions FCFA
    year: 2023,
    fuel: "Essence",
    transmission: "Automatique",
    mileage: 18900,
    power: 510,
    acceleration: "3.5s",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=1000"
    ],
    color: "Bleu Portimao Métallisé",
    seats: 4,
    doors: 2,
    description: "La pureté des performances BMW M alliée à la précision de la transmission intégrale xDrive. Cette M4 Competition offre une tenue de route et des accélérations d'une précision diabolique sur l'Autoroute du Nord.",
    features: [
      "Sièges baquets M Carbon exclusifs",
      "Jantes forgées sport noires ultra-légères",
      "Système d'échappement actif sport M à sonorité modulable",
      "Affichage tête haute M spécifique Côte d'Ivoire",
      "Rapports de boîte réglables sur le volant en cuir M"
    ],
    isFeatured: true,
    status: "Disponible"
  },
  {
    id: "v5",
    brand: "Mercedes-Benz",
    model: "Classe G 63 AMG",
    category: "Premium",
    offerType: "Location",
    price: 450000, // 450,000 FCFA/day
    year: 2023,
    fuel: "Essence",
    transmission: "Automatique",
    mileage: 15300,
    power: 585,
    acceleration: "4.5s",
    images: [
      "https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1562141982-c13410b3adbe?auto=format&fit=crop&q=80&w=1000"
    ],
    color: "Noir Obsidienne de Designo",
    seats: 5,
    doors: 5,
    description: "L'icône absolue de la route réinventée par AMG. Un moteur V8 bi-turbo légendaire, une présence royale dans les rues de Zone 4 ou Cocody, et un habitacle cousu main en cuir Nappa. Créez des souvenirs inoubliables pour vos cortèges et vos virées à Assinie.",
    features: [
      "Échappements latéraux double AMG chromés (son mythique)",
      "Combiné d'instruments digital Widescreen HD",
      "Système de sonorisation 3D Burmester®",
      "Toit ouvrant vitré relevable électriquement",
      "Sièges dynamiques massants avec maintien actif"
    ],
    isFeatured: false,
    status: "Disponible"
  },
  {
    id: "v6",
    brand: "Land Rover",
    model: "Range Rover Sport P440e",
    category: "SUV",
    offerType: "Vente",
    price: 89000000, // 89 Millions FCFA
    year: 2023,
    fuel: "Hybride",
    transmission: "Automatique",
    mileage: 19500,
    power: 440,
    acceleration: "5.8s",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=1000"
    ],
    color: "Gris Eiger Satin",
    seats: 5,
    doors: 5,
    description: "Le SUV de sport et de luxe par excellence. Doté d'une motorisation hybride rechargeable d'une douceur exceptionnelle, il propose plus de 80 km d'autonomie en mode 100% électrique, idéal pour naviguer dans les embouteillages d'Abidjan en silence.",
    features: [
      "Toit panoramique ouvrant",
      "Système de purification d'air habitacle premium",
      "Suspension pneumatique dynamique réglable en hauteur",
      "Sièges massants et ventilés en cuir étendu",
      "Phares Pixel LED adaptatifs intelligents"
    ],
    isFeatured: false,
    status: "Disponible"
  },
  {
    id: "v7",
    brand: "Mini",
    model: "Cooper SE Countryman",
    category: "Citadine",
    offerType: "Location",
    price: 85000, // 85,000 FCFA/day
    year: 2023,
    fuel: "Hybride",
    transmission: "Automatique",
    mileage: 12000,
    power: 220,
    acceleration: "6.8s",
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1511919110735-4aeafe085e41?auto=format&fit=crop&q=80&w=1000"
    ],
    color: "British Racing Green",
    seats: 5,
    doors: 5,
    description: "Le style chic britannique combiné aux capacités d'un petit SUV hybride. Très agile pour se faufiler entre Marcory, Plateau et Cocody. Consommation de carburant extrêmement faible de 2.0L / 100km.",
    features: [
      "Écran central rond tactile interactif iconique",
      "Apple CarPlay sans fil et navigation Côte d'Ivoire intégrée",
      "Intérieur semi-cuir de haute qualité",
      "Coffre spacieux avec hayon automatique",
      "Projecteurs LED au design Union Jack"
    ],
    isFeatured: false,
    status: "Disponible"
  },
  {
    id: "v8",
    brand: "Peugeot",
    model: "3008 GT Pack Hybrid",
    category: "SUV",
    offerType: "Vente",
    price: 24500000, // 24.5 Millions FCFA
    year: 2022,
    fuel: "Hybride",
    transmission: "Automatique",
    mileage: 38000,
    power: 300,
    acceleration: "5.9s",
    images: [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1000"
    ],
    color: "Bleu Vertigo Tri-Couches",
    seats: 5,
    doors: 5,
    description: "Le SUV familial par excellence, extrêmement prisé à Abidjan. Économe en carburant, puissant avec 300ch cumulés et doté d'un confort légendaire pour vos longs week-ends de détente du côté de Jacqueville.",
    features: [
      "Peugeot i-Cockpit® digital 3D haute définition",
      "Toit ouvrant panoramique vitré électrique",
      "Rétroviseurs électriques avec indicateur d'angle mort",
      "Climatisation automatique bi-zone puissante spéciale pays chauds",
      "Feux de jour LED iconiques 'griffes de lion'"
    ],
    isFeatured: false,
    status: "Disponible"
  }
];
