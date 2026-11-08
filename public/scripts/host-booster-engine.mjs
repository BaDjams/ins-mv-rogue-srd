import { QUALITIES, validateOfficialDeck, drawOfficialHost } from './host-deck-engine.mjs';

export const BOOSTER_SOURCES = Object.freeze(['fallback', 'citizens', 'soldiers', 'infernal', 'custom']);
export const BOOSTER_FACTIONS = Object.freeze(['any', 'angel', 'demon']);
export const BOOSTER_STAGES = Object.freeze(['any', 'initial', 'reincarnation']);
const FALLBACK_WEIGHTS = Object.freeze({ mundane:24, better:12, superior:12, elite:4, legendary:2 });
const QUALITY_INDEX = Object.freeze(Object.fromEntries(QUALITIES.map((q, i) => [q, i])));

function validDay(value) {
  if (value == null || value === '') return true;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + 'T00:00:00.000Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0,10) === value;
}
function active(pack, date) {
  const day = date.toISOString().slice(0,10);
  return pack.active !== false &&
    (!pack.startDate || pack.startDate <= day) &&
    (!pack.endDate || day <= pack.endDate);
}
export function validateBoosterCatalog(catalog) {
  if (!catalog || !Array.isArray(catalog.boosters)) throw new Error('Catalogue de boosters invalide.');
  const seen = new Set();
  for (const pack of catalog.boosters) {
    if (!pack || typeof pack !== 'object' || typeof pack.id !== 'string' ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(pack.id) ||
      typeof pack.name !== 'string' || !pack.name.trim())
      throw new Error('Un booster doit avoir un identifiant stable et un nom.');
    if (seen.has(pack.id)) throw new Error('Identifiant de booster dupliqué : ' + pack.id);
    seen.add(pack.id);
    if (!BOOSTER_SOURCES.includes(pack.source))
      throw new Error('Source de booster inconnue : ' + pack.id);
    if (!BOOSTER_FACTIONS.includes(pack.faction) || !BOOSTER_STAGES.includes(pack.stage))
      throw new Error('Restriction de camp ou de scénario invalide : ' + pack.id);
    if (!Number.isInteger(pack.cardCount) || pack.cardCount < 1 || pack.cardCount > 12)
      throw new Error('Nombre de cartes invalide (1 à 12) : ' + pack.id);
    if (!validDay(pack.startDate) || !validDay(pack.endDate) ||
       (pack.startDate && pack.endDate && pack.startDate > pack.endDate))
      throw new Error('Période de booster invalide : ' + pack.id);
    if (pack.themeColor != null && pack.themeColor !== '' && (typeof pack.themeColor !== 'string' ||
      !/^#[0-9a-f]{6}$/i.test(pack.themeColor)))
      throw new Error('Couleur de booster invalide (format #RRGGBB) : ' + pack.id);
    if (pack.tags != null && (!Array.isArray(pack.tags) ||
       pack.tags.some(tag => typeof tag !== 'string')))
      throw new Error('Étiquettes de scénario incorrectes : ' + pack.id);
    if (pack.ordinaryWeights != null && (typeof pack.ordinaryWeights !== 'object' ||
      QUALITIES.some(q => !Number.isFinite(pack.ordinaryWeights[q]) || pack.ordinaryWeights[q] < 0)))
      throw new Error('Distribution des qualités invalide : ' + pack.id);
    if (pack.extraSpecialHosts != null && !Array.isArray(pack.extraSpecialHosts))
      throw new Error('Hôtes événementiels invalides : ' + pack.id);
    if (pack.source === 'custom' && !pack.ordinaryWeights)
      throw new Error('Un booster autonome exige ses propres poids de qualités : ' + pack.id);
    if (pack.source === 'fallback' &&
      (pack.ordinaryWeights != null || (pack.extraSpecialHosts ?? []).length > 0))
      throw new Error('Le paquet de 54 cartes de remplacement ne peut recevoir de pondérations ni de cartes spéciales : ' + pack.id);
    if (pack.includeSourceSpecials != null && typeof pack.includeSourceSpecials !== 'boolean')
      throw new Error('Option de cartes spéciales héritées incorrecte : ' + pack.id);
  }
  return catalog.boosters;
}
export function availableBoosters(catalog, { stage='initial', faction='angel', date=new Date() }={}) {
  return validateBoosterCatalog(catalog).filter(pack =>
    active(pack, date) &&
    (pack.stage === 'any' || pack.stage === stage) &&
    (pack.faction === 'any' || pack.faction === faction)
  );
}
export function resolveBoosterDeck(pack, sources) {
  if (!pack || !BOOSTER_SOURCES.includes(pack.source)) throw new Error('Booster inconnu.');
  if (pack.source === 'fallback') {
    return {
      enabled:true, poolType:'citizens',
      ordinaryWeights:{...FALLBACK_WEIGHTS},
      specialHosts:[]
    };
  }
  if (pack.source === 'custom') {
    return {
      enabled:true, poolType:'citizens',
      ordinaryWeights:{...pack.ordinaryWeights},
      specialHosts:[...(pack.extraSpecialHosts ?? [])]
    };
  }
  const base = sources[pack.source];
  if (!base || base.enabled !== true)
    throw new Error('Le vivier du booster est désactivé ou indisponible.');
  return {
    ...base,
    ordinaryWeights: pack.ordinaryWeights ? {...pack.ordinaryWeights} : {...base.ordinaryWeights},
    specialHosts:[
      ...(pack.includeSourceSpecials === false ? [] : (base.specialHosts ?? [])),
      ...(pack.extraSpecialHosts ?? [])
    ]
  };
}
export function validateBooster(pack, sources, {
  date=new Date(), allowRecentlyDead=false
}={}) {
  validateBoosterCatalog({boosters:[pack]});
  const cfg = resolveBoosterDeck(pack, sources);
  const result = validateOfficialDeck(cfg, date, {allowRecentlyDead});
  if (cfg.poolType === 'soldiers' && pack.stage === 'reincarnation') {
    // Un soldat volontaire présent sur place peut être une exception,
    // mais n'est pas un citoyen par défaut.
  }
  return { ...result, config:cfg };
}
export function drawBooster(pack, sources, {
  date=new Date(), allowRecentlyDead=false,
  random=Math.random, cardCount=null
}={}) {
  const {config} = validateBooster(pack, sources, {date, allowRecentlyDead});
  if (!active(pack,date)) throw new Error('Ce booster est hors de sa période de disponibilité.');
  const n = cardCount == null ? pack.cardCount : cardCount;
  if (!Number.isInteger(n) || n < 1 || n > 12) throw new Error('Nombre de cartes invalide.');
  if(pack.source==='fallback') {
    // Tirage physique de cartes sans remise dans le paquet de remplacement.
    const deck=QUALITIES.flatMap(q=>Array.from({length:FALLBACK_WEIGHTS[q]},()=>q));
    for(let i=deck.length-1;i>0;i--){
      const value=random();
      if(!Number.isFinite(value) || value<0 || value>=1)
        throw new Error('Source aléatoire invalide.');
      const j=Math.floor(value*(i+1));
      [deck[i],deck[j]]=[deck[j],deck[i]];
    }
    return deck.slice(0,n).map(quality=>({type:'ordinary',quality}));
  }
  return Array.from({length:n}, () =>
    drawOfficialHost(config, random, date, {allowRecentlyDead})
  );
}
export function topQualityIndices(cards) {
  if (!Array.isArray(cards) || cards.length === 0) return [];
  const top = Math.max(...cards.map(card =>
    QUALITY_INDEX[card.quality ?? card.host?.quality] ?? -1
  ));
  return cards.flatMap((card,i) =>
    (QUALITY_INDEX[card.quality ?? card.host?.quality] ?? -1) === top ? [i] : []
  );
}
