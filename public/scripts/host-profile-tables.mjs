/* Données de profils reprises du générateur original des PNJ.
   Ces tables sont partagées avec le générateur historique, qui les importe
   lorsqu'elles sont disponibles. Les statistiques SRD restent indépendantes. */
const TABLES = {
      occupations: [
        { name: "Policier",                   difficulty: 2, equipment: ["Arme de service","Badge de police"] },
        { name: "Médecin",                    difficulty: 3, equipment: ["Stéthoscope","Kit médical"] },
        { name: "Enseignant",                 difficulty: 1, equipment: ["Manuel","Stylo rouge"] },
        { name: "Mécanicien",                 difficulty: 1, equipment: ["Clé à molette","Boîte à outils"] },
        { name: "Chauffeur de taxi",          difficulty: 1, equipment: ["Clés de voiture","Plan de la ville"] },
        { name: "Pompier",                    difficulty: 2, equipment: ["Hache","Casque de pompier"] },
        { name: "Chef cuisinier",             difficulty: 2, equipment: ["Couteau de chef","Tablier de cuisine"] },
        { name: "Spécialiste informatique",   difficulty: 2, equipment: ["Ordinateur portable","Clé USB"] },
        { name: "Avocat",                     difficulty: 3, equipment: ["Porte-documents","Bloc-notes juridique"] },
        { name: "Journaliste",                difficulty: 2, equipment: ["Carnet","Enregistreur vocal"] },
        { name: "Barman",                     difficulty: 1, equipment: ["Décapsuleur","Shaker à cocktail"] },
        { name: "Banquier",                   difficulty: 2, equipment: ["Calculatrice","Stylo coûteux"] },
        { name: "Musicien",                   difficulty: 2, equipment: ["Instrument","Métronome"] },
        { name: "Boucher",                    difficulty: 1, equipment: ["Couperet","Tablier de boucher"] },
        { name: "Boulanger",                  difficulty: 1, equipment: ["Rouleau à pâtisserie","Tamis à farine"] },
        { name: "Électricien",                difficulty: 1, equipment: ["Multimètre","Pince coupante"] },
        { name: "Plombier",                   difficulty: 1, equipment: ["Clé à tube","Ventouse"] },
        { name: "Agent immobilier",           difficulty: 2, equipment: ["Clés de propriété","Cartes de visite"] },
        { name: "Vétérinaire",                difficulty: 3, equipment: ["Kit vétérinaire","Friandises pour animaux"] },
        { name: "Photographe",                difficulty: 2, equipment: ["Appareil photo","Trépied"] },
        { name: "Peintre",                    difficulty: 2, equipment: ["Set de pinceaux","Palette"] },
        { name: "Chirurgien",                 difficulty: 4, equipment: ["Outils chirurgicaux","Masque médical"] },
        { name: "Pilote",                     difficulty: 3, equipment: ["Casque d'aviation","Manuel de vol"] },
        { name: "Infirmier",                  difficulty: 2, equipment: ["Kit de soins","Blouse blanche"] },
        { name: "Agent de sécurité",          difficulty: 1, equipment: ["Matraque","Badge de sécurité"] }
      ],
      traits: [
        { name: "Sportif",              equipment: ["Montre de sport"] },
        { name: "Intellectuel",         equipment: ["Lunettes de lecture"] },
        { name: "Fumeur",               equipment: ["Paquet de cigarettes"] },
        { name: "Amateur de café",      equipment: ["Thermos de café"] },
        { name: "Joueur de poker",      equipment: ["Jeu de cartes"] },
        { name: "Cinéphile",            equipment: ["Carte d'abonnement cinéma"] },
        { name: "Photographe amateur",  equipment: ["Appareil photo"] },
        { name: "Voyageur",             equipment: ["Passeport"] },
        { name: "Musicien amateur",     equipment: ["Instrument portable"] },
        { name: "Gamer",                equipment: ["Casque de gaming"] },
        { name: "Écologiste",           equipment: ["Bouteille réutilisable"] },
        { name: "Bricoleur",            equipment: ["Multi-outils"] },
        { name: "Collectionneur",       equipment: ["Objet de collection"] },
        { name: "Artiste",              equipment: ["Carnet de croquis"] },
        { name: "Paranoïaque",          equipment: ["Spray au poivre"] },
        { name: "Ex-militaire",         equipment: ["Carte militaire"] },
        { name: "Allergique",           equipment: ["Médicament contre les allergies"] },
        { name: "Adolescent",           equipment: ["Smartphone"] },
        { name: "Âgé",                  equipment: ["Lunettes de lecture"] },
        { name: "Étudiant",             equipment: ["Manuel"] },
        { name: "Fortuné",              equipment: ["Montre de luxe"] },
        { name: "Pauvre",               equipment: ["Vêtements usés"] },
        { name: "Religieux",            equipment: ["Symbole religieux"] },
        { name: "Militant",             equipment: ["Badge de protestation"] },
        { name: "Geek",                 equipment: ["Montre connectée"] }
      ],
      equipment: [
        "Smartphone","Portefeuille","Clés","Montre","Lunettes de soleil",
        "Sac à dos","Sac à main","Parapluie","Chapeau","Carnet",
        "Stylo","Couteau suisse","Écouteurs","Chargeur portable","Médicament",
        "Bouteille d'eau","Barre énergétique","Carte de crédit","Carte d'identité","Ordinateur portable",
        "Tablette","Appareil photo","GPS","Livre","Magazine",
        "Trousse de premiers secours","Lampe de poche","Multi-outil","Corde","Ruban adhésif",
        "Gants","Masque","Désinfectant","Boussole","Carte routière",
        "Jumelles","Couteau de survie","Sifflet","Allumettes","Briquet"
      ],

      traitGroups: {
        age:     ["Adolescent","Âgé"],
        military:["Ex-militaire"],
        hobby:   ["Gamer","Photographe amateur","Musicien amateur","Bricoleur","Artiste"]
      },
      incompatibleTraits: {
        "Adolescent":  ["Ex-militaire","Fortuné"],
        "Âgé":         ["Gamer","Étudiant"],
        "Pauvre":      ["Fortuné"]
      },

};
export const OCCUPATIONS = TABLES.occupations;
export const TRAITS = TABLES.traits;
export const EQUIPMENT = TABLES.equipment;
export const TRAIT_GROUPS = TABLES.traitGroups;
export const INCOMPATIBLE_TRAITS = TABLES.incompatibleTraits;
export function occupationSkill(name) {
      const map = {
        'Policier':'Investigation', 'Médecin':'Médecine',
        'Enseignant':'Enseignement', 'Mécanicien':'Mécanique',
        'Chauffeur de taxi':'Conduite', 'Pompier':'Premiers soins',
        'Chef cuisinier':'Artisanat', 'Spécialiste informatique':'Informatique',
        'Avocat':'Influence', 'Journaliste':'Investigation',
        'Barman':'Influence', 'Banquier':'Sciences',
        'Musicien':'Performance artistique', 'Boucher':'Artisanat',
        'Boulanger':'Artisanat', 'Électricien':'Électronique',
        'Plombier':'Mécanique', 'Agent immobilier':'Influence',
        'Vétérinaire':'Médecine', 'Photographe':'Performance artistique',
        'Peintre':'Performance artistique', 'Chirurgien':'Médecine',
        'Pilote':'Pilotage', 'Infirmier':'Premiers soins',
        'Agent de sécurité':'Vigilance'
      };
  return map[name] || 'Survie';
}
export function compatibleTraits(existing, name) {
  for (const current of existing) {
    if ((INCOMPATIBLE_TRAITS[current] || []).includes(name) ||
        (INCOMPATIBLE_TRAITS[name] || []).includes(current)) return false;
    for (const group of Object.values(TRAIT_GROUPS)) {
      if (group.includes(current) && group.includes(name) && current !== name) return false;
    }
  }
  return true;
}
export function equipmentForProfile(occupation, traits, random=Math.random) {
  const results = [...(occupation.equipment || [])];
  for (const trait of traits) {
    for (const item of trait.equipment || []) {
      if (!results.includes(item)) results.push(item);
    }
  }
  const ordinary = EQUIPMENT.filter(item=>!results.includes(item));
  // Deux objets usuels en plus des équipements professionnels et des loisirs.
  for(let j=0;j<2&&ordinary.length;j++){
    const index=Math.floor(random()*ordinary.length);
    const [item]=ordinary.splice(index,1);
    results.push(item);
  }
  return results;
}
