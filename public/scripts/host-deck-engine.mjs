/**
 * Tirage du deck officiel d'hôtes INS/MV Rogue.
 * Les taux de tirage spéciaux sont des probabilités par tirage indépendant.
 * Le paquet de 54 cartes est une méthode de remplacement distincte.
 */
export const QUALITIES = Object.freeze(['mundane', 'better', 'superior', 'elite', 'legendary']);
const ATTRIBUTES = Object.freeze(['FOR', 'AGI', 'VIG', 'PER']);
const POOLS = Object.freeze(['citizens', 'soldiers', 'infernal']);
export const INFERNAL_ORIGINS = Object.freeze(['sympathizer', 'cultist', 'recentDead']);

function weightedOrigin(config, random, allowRecentlyDead) {
  const raw = config.originWeights;
  if (!raw) throw new Error('La répartition des origines infernales est absente.');
  const weights = INFERNAL_ORIGINS.map(k => (k === 'recentDead' && !allowRecentlyDead ? 0 : raw[k]));
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum <= 0) throw new Error('Aucune origine infernale disponible dans ce scénario.');
  const u = random();
  if (!Number.isFinite(u) || u < 0 || u >= 1) throw new Error('Source aléatoire invalide.');
  let roll = u * sum;
  for (let i = 0; i < weights.length; i++) {
    roll -= weights[i];
    if (roll < 0) return INFERNAL_ORIGINS[i];
  }
  return INFERNAL_ORIGINS[weights.findIndex(w => w > 0)];
}


function isFiniteRate(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100;
}
function isValidDay(value) {
  if (value == null || value === '') return true;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T00:00:00.000Z');
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function isActive(host, dateIso) {
  if (host.active === false) return false;
  return (!host.startDate || dateIso >= host.startDate) &&
    (!host.endDate || dateIso <= host.endDate);
}
export function validateOfficialDeck(config, now = new Date(), options = {}) {
  if (!config || typeof config !== 'object' || Array.isArray(config)) throw new Error('Configuration de deck absente ou invalide.');
  if (config.enabled !== true) return { enabled: false, activeSpecials: [], specialRate: 0, ordinaryRate: 100, weights: {} };
  const dateIso = now.toISOString().slice(0, 10); // Bornes inclusives en dates UTC.
  const poolType = config.poolType ?? 'citizens';
  if (!POOLS.includes(poolType)) throw new Error('Type de deck inconnu : ' + poolType);
  const weights = config.ordinaryWeights;
  if (!weights || typeof weights !== 'object') throw new Error('Répartition des hôtes ordinaires absente.');
  for (const k of QUALITIES) {
    if (typeof weights[k] !== 'number' || !Number.isFinite(weights[k]) || weights[k] < 0)
      throw new Error('Poids ordinaire invalide pour : ' + k);
  }
  if (poolType === 'soldiers' && (weights.mundane !== 0 || weights.better !== 0))
    throw new Error('Les Soldats de Dieu ne peuvent pas être Gris ou Vert.');
  if (poolType === 'infernal') {
    if (!config.originWeights || INFERNAL_ORIGINS.some(k =>
      typeof config.originWeights[k] !== 'number' ||
      !Number.isFinite(config.originWeights[k]) || config.originWeights[k] < 0
    )) throw new Error('Poids des origines infernales invalides.');
  }
  const hosts = config.specialHosts ?? [];
  if (!Array.isArray(hosts)) throw new Error('Les hôtes spéciaux doivent former une liste.');
  const ids = new Set();
  for (const host of hosts) {
    if (!host || typeof host !== 'object' || typeof host.id !== 'string' || !host.id.trim() ||
        typeof host.name !== 'string' || !host.name.trim()) throw new Error('Chaque hôte spécial doit avoir un identifiant et un nom.');
    if (ids.has(host.id)) throw new Error('Identifiant d’hôte spécial dupliqué : ' + host.id);
    ids.add(host.id);
    if (!QUALITIES.includes(host.quality)) throw new Error('Qualité inconnue pour : ' + host.id);
    if (!isFiniteRate(host.dropRate)) throw new Error('Taux de tirage invalide pour : ' + host.id);
    if (poolType === 'soldiers' && (
      ['mundane', 'better'].includes(host.quality) ||
      !Array.isArray(host.skills) || typeof host.professionalSkill !== 'string' ||
      !host.professionalSkill.trim() || !host.skills.some(skill =>
        skill && skill.name === host.professionalSkill && skill.bonus >= 2)
    )) throw new Error('Un Soldat de Dieu doit être Bleu au minimum et être Professionnel (+2) ou Expert (+3) dans sa compétence métier indiquée : ' + host.id);
    if (poolType === 'infernal' && host.originType != null &&
        !INFERNAL_ORIGINS.includes(host.originType))
      throw new Error('Origine infernale spéciale inconnue : ' + host.id);
    if (!isValidDay(host.startDate) || !isValidDay(host.endDate) ||
        (host.startDate && host.endDate && host.startDate > host.endDate))
      throw new Error('Dates de validité incorrectes pour : ' + host.id);
    if (!host.attributes || ATTRIBUTES.some(k =>
      !Number.isInteger(host.attributes[k]) || host.attributes[k] < 1 || host.attributes[k] > 5
    )) throw new Error('Caractéristiques fixes incorrectes pour : ' + host.id);
    if (host.skills != null && (!Array.isArray(host.skills) || host.skills.some(k =>
      !k || typeof k.name !== 'string' || !k.name.trim() ||
      !Number.isInteger(k.bonus) || k.bonus < -1 || k.bonus > 3
    ))) throw new Error('Compétences fixes incorrectes pour : ' + host.id);
    if (host.traits != null && (!Array.isArray(host.traits) || host.traits.some(x => typeof x !== 'string')))
      throw new Error('Traits fixes incorrects pour : ' + host.id);
    if (host.equipment != null && (!Array.isArray(host.equipment) || host.equipment.some(x => typeof x !== 'string')))
      throw new Error('Équipement incorrect pour : ' + host.id);
  }
  const allowRecentlyDead = options.allowRecentlyDead === true;
  const activeSpecials = hosts.filter(h =>
    isActive(h, dateIso) && !(poolType === 'infernal' &&
      h.originType === 'recentDead' && !allowRecentlyDead)
  );
  const specialRate = activeSpecials.reduce((sum, h) => sum + h.dropRate, 0);
  if (specialRate > 100 + 1e-9) throw new Error('La somme des taux des hôtes spéciaux actifs dépasse 100 %.');
  const ordinaryRate = Math.max(0, 100 - specialRate);
  if (ordinaryRate > 1e-9 && QUALITIES.reduce((sum, k) => sum + weights[k], 0) <= 0)
    throw new Error('Le deck doit prévoir des poids ordinaires si la probabilité restante est positive.');
  if (poolType === 'infernal' && ordinaryRate > 1e-9) {
    const availableSources = INFERNAL_ORIGINS.reduce((sum, k) =>
      sum + (k === 'recentDead' && !allowRecentlyDead ? 0 : config.originWeights[k]), 0);
    if (availableSources <= 0)
      throw new Error('Aucune origine infernale disponible pour les hôtes ordinaires.');
  }
  return { enabled: true, poolType, activeSpecials, specialRate, ordinaryRate, weights,
    originWeights: poolType === 'infernal' ? config.originWeights : null };
}
export function drawOfficialHost(config, random = Math.random, now = new Date(), options = {}) {
  const deck = validateOfficialDeck(config, now, options);
  if (!deck.enabled) throw new Error('Le deck officiel est désactivé.');
  const u = random();
  if (!Number.isFinite(u) || u < 0 || u >= 1) throw new Error('Source aléatoire invalide.');
  const roll = u * 100;
  let cumulative = 0;
  for (const host of deck.activeSpecials) {
    cumulative += host.dropRate;
    if (roll < cumulative) {
      const selected = { type: 'special', host: structuredClone(host), rate: host.dropRate };
      if (deck.poolType === 'infernal')
        selected.originType = host.originType ||
          weightedOrigin(config, random, options.allowRecentlyDead === true);
      return selected;
    }
  }
  const totalWeight = QUALITIES.reduce((sum, k) => sum + deck.weights[k], 0);
  if (totalWeight <= 0) throw new Error('Aucune qualité ordinaire disponible.');
  const u2 = random();
  if (!Number.isFinite(u2) || u2 < 0 || u2 >= 1) throw new Error('Source aléatoire invalide.');
  let remaining = u2 * totalWeight;
  for (const quality of QUALITIES) {
    remaining -= deck.weights[quality];
    if (remaining < 0) {
      const picked = { type: 'ordinary', quality };
      if (deck.poolType === 'soldiers') picked.trained = true;
      if (deck.poolType === 'infernal')
        picked.originType = weightedOrigin(config, random, options.allowRecentlyDead === true);
      return picked;
    }
  }
  // Arrondi de sécurité : les probabilités sont indépendantes du tableau de 54 cartes.
  const picked = { type: 'ordinary', quality: QUALITIES.find(k => deck.weights[k] > 0) };
  if (deck.poolType === 'soldiers') picked.trained = true;
  if (deck.poolType === 'infernal')
    picked.originType = weightedOrigin(config, random, options.allowRecentlyDead === true);
  return picked;
}
