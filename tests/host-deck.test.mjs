import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { drawOfficialHost, validateOfficialDeck } from '../public/scripts/host-deck-engine.mjs';

function configuration(patches = {}) {
  return {
    enabled: true,
    ordinaryWeights: { mundane: 24, better: 12, superior: 12, elite: 4, legendary: 2 },
    specialHosts: [{
      id: 'test-saison', name: 'Carte de test', quality: 'legendary', active: true,
      dropRate: 5, startDate: '2026-10-01', endDate: '2026-10-31',
      attributes: { FOR: 3, AGI: 3, VIG: 2, PER: 2 },
      skills: [{ name: 'Conduite', bonus: 3 }], traits: ['Test unique'], equipment: ['Objet test']
    }],
    ...patches
  };
}
const during = new Date('2026-10-15T12:00:00Z');
const before = new Date('2026-09-30T12:00:00Z');
const after = new Date('2026-11-01T00:00:00Z');

test('un spécial actif possède exactement son intervalle de taux (5 %)', () => {
  const cfg = configuration();
  assert.equal(drawOfficialHost(cfg, () => 0, during).type, 'special');
  assert.equal(drawOfficialHost(cfg, () => 0.049999, during).type, 'special');
  const rolls = [0.05, 0.2];
  const ordinary = drawOfficialHost(cfg, () => rolls.shift(), during);
  assert.equal(ordinary.type, 'ordinary');
  assert.ok(ordinary.quality);
});
test('les fiches fixes ne sont ni régénérées ni modifiées', () => {
  const cfg = configuration();
  const drawn = drawOfficialHost(cfg, () => 0.03, during);
  assert.equal(drawn.host.name, 'Carte de test');
  assert.deepEqual(drawn.host.attributes, { FOR: 3, AGI: 3, VIG: 2, PER: 2 });
  assert.deepEqual(drawn.host.skills, [{ name: 'Conduite', bonus: 3 }]);
  drawn.host.name = 'Changé';
  assert.equal(cfg.specialHosts[0].name, 'Carte de test');
});
test('les bornes calendaires sont inclusives et UTC', () => {
  assert.equal(validateOfficialDeck(configuration(), before).specialRate, 0);
  assert.equal(validateOfficialDeck(configuration(), new Date('2026-10-01T00:00:00Z')).specialRate, 5);
  assert.equal(validateOfficialDeck(configuration(), new Date('2026-10-31T23:59:59Z')).specialRate, 5);
  assert.equal(validateOfficialDeck(configuration(), after).specialRate, 0);
});
test('plusieurs cartes conservent chacune un taux fixe indépendant des poids ordinaires', () => {
  const cfg = configuration();
  cfg.specialHosts[0].startDate = '';
  cfg.specialHosts[0].endDate = '';
  cfg.specialHosts.push({ ...structuredClone(cfg.specialHosts[0]), id:'test-2', name:'Autre', dropRate: 12 });
  assert.equal(validateOfficialDeck(cfg, during).specialRate, 17);
  assert.equal(validateOfficialDeck(cfg, during).ordinaryRate, 83);
  assert.equal(drawOfficialHost(cfg, () => 0.04, during).host.id, 'test-saison');
  assert.equal(drawOfficialHost(cfg, () => 0.09, during).host.id, 'test-2');
});
test('un cumul dépassant 100 % est refusé plutôt que renormalisé', () => {
  const cfg = configuration();
  cfg.specialHosts[0].dropRate = 60;
  cfg.specialHosts.push({ ...structuredClone(cfg.specialHosts[0]), id:'test-2', dropRate: 41 });
  assert.throws(() => validateOfficialDeck(cfg, during), /dépasse 100/);
});
test('un deck désactivé ne sert pas au tirage', () => {
  const cfg = configuration({ enabled:false });
  assert.equal(validateOfficialDeck(cfg, during).enabled, false);
  assert.throws(() => drawOfficialHost(cfg, () => 0, during), /désactivé/);
});
test('une probabilité ordinaire résiduelle impose des poids positifs', () => {
  const cfg = configuration({ ordinaryWeights: { mundane:0,better:0,superior:0,elite:0,legendary:0 } });
  assert.throws(() => validateOfficialDeck(cfg, during), /poids ordinaires/);
  cfg.specialHosts[0].dropRate = 100;
  assert.equal(drawOfficialHost(cfg, () => 0.5, during).type, 'special');
});
test('les identifiants, dates et caractéristiques invalides sont rejetés', () => {
  const cfg = configuration();
  cfg.specialHosts[0].startDate = '2026-02-30';
  assert.throws(() => validateOfficialDeck(cfg, during), /Dates/);
  cfg.specialHosts[0].startDate = '';
  cfg.specialHosts[0].attributes.FOR = 0;
  assert.throws(() => validateOfficialDeck(cfg, during), /Caractéristiques/);
  cfg.specialHosts[0].attributes.FOR = 3;
  cfg.specialHosts.push(structuredClone(cfg.specialHosts[0]));
  assert.throws(() => validateOfficialDeck(cfg, during), /dupliqué/);
});
test('les poids ordinaires ne changent pas le taux des cartes spéciales', () => {
  const cfg = configuration();
  cfg.specialHosts[0].startDate = '';
  cfg.specialHosts[0].endDate = '';
  cfg.ordinaryWeights = { mundane: 0, better: 0, superior: 0, elite: 0, legendary: 1 };
  const sampled = drawOfficialHost(cfg, () => 0.01, during);
  assert.equal(sampled.type, 'special');
  const rolls = [0.9, 0.5];
  const ordinary = drawOfficialHost(cfg, () => rolls.shift(), during);
  assert.deepEqual(ordinary, { type: 'ordinary', quality: 'legendary' });
});

test('la configuration officielle publiée est un JSON conforme', () => {
  const raw = fs.readFileSync(new URL('../public/data/hotes-officiels.json', import.meta.url), 'utf8');
  const config = JSON.parse(raw);
  const result = validateOfficialDeck(config, new Date('2026-11-08T12:00:00Z'));
  assert.equal(typeof result.enabled, 'boolean');
  assert.ok(Array.isArray(config.specialHosts));
});
