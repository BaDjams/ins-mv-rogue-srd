import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const script = fs.readFileSync(new URL('../public/scripts/rogue-srd.js', import.meta.url), 'utf8');
function simulate(dice, { threshold = 3, modifier = 'none', actionType = 'angel' } = {}) {
  const queue = dice.slice();
  const button = value => ({
    dataset: { val: value }, classList: { add(){}, remove(){} },
    addEventListener(kind, callback) { if (kind === 'click') this.click = () => callback.call(this); },
    click() {}
  });
  const result = { innerHTML: '', className: '' };
  const seuil = { textContent: '3' };
  const buttons = {
    '[data-el="dec"]': button('dec'), '[data-el="inc"]': button('inc'),
    '[data-el="roll"]': button('roll'), '[data-el="seuil"]': seuil,
    '[data-el="result"]': result
  };
  const mods = ['dd', 'd', 'none', 'a', 'da'].map(button);
  const types = ['angel', 'host'].map(button);
  const container = {
    innerHTML: '',
    querySelector(k) { if (!buttons[k]) throw new Error('Unexpected selector ' + k); return buttons[k]; },
    querySelectorAll(k) {
      if (k === '[data-group="type"] .sim-tog') return types;
      if (k === '[data-group="mod"] .sim-tog') return mods;
      return [];
    }
  };
  const events = {};
  const doc = {
    readyState: 'loading',
    addEventListener(k, cb) { events[k] = cb; },
    querySelectorAll(selector) { return selector === '.rogue-sim' ? [container] : []; },
    querySelector() { return null; }
  };
  const math = Object.create(Math);
  math.random = function() {
    if (!queue.length) throw new Error('Dice queue exhausted');
    const d = queue.shift();
    assert.ok(d >= 1 && d <= 6);
    return (d - 0.5) / 6;
  };
  vm.runInNewContext(script, { document: doc, Math: math, console });
  events.DOMContentLoaded();
  const n = threshold - 3;
  for (let i = 0; i < Math.abs(n); i++) buttons[n > 0 ? '[data-el="inc"]' : '[data-el="dec"]'].click();
  if (modifier !== 'none') mods.find(x => x.dataset.val === modifier).click();
  if (actionType !== 'angel') types.find(x => x.dataset.val === actionType).click();
  buttons['[data-el="roll"]'].click();
  return result.innerHTML;
}
test('la marge est renseignée pour les rafales mais ne remplace jamais l’intensité', () => {
  const html = simulate([1, 5, 2]);
  assert.match(html, /Réussite/);
  assert.match(html, /Marge \(rafales uniquement\)/);
  assert.match(html, /Intensité : 2/);
  assert.doesNotMatch(html, /max\(marge/);
});
test('deux dés d’action identiques réussis donnent un critique à toutes les valeurs autorisées', () => {
  const html = simulate([2, 2, 1, 4]);
  assert.match(html, /Réussite Critique/);
  assert.match(html, /Intensité : 5/);
});
test('le seuil 6 annule un désavantage mais reste plafonné à 5', () => {
  const html = simulate([4, 6, 3], { threshold:6, modifier:'d' });
  assert.match(html, /Réussite/);
  assert.match(html, /désavantage neutralisée/);
  assert.match(html, /Intensité : 3/);
});
test('le seuil 6 ne supprime qu’un des deux désavantages', () => {
  const html = simulate([4, 6, 3], { threshold:6, modifier:'dd' });
  assert.match(html, /Échec/);
  assert.match(html, /désavantage neutralisée/);
});
test('un avantage seul au seuil 6 ne génère pas d’explosion', () => {
  const html = simulate([1, 5, 2], { threshold:6, modifier:'a' });
  assert.match(html, /Intensité : 2/);
});
test('le double avantage génère un dé d’explosion immédiat', () => {
  const html = simulate([1, 5, 1, 4], { modifier:'da' });
  assert.match(html, /Intensité : 5/);
  assert.match(html, /1 \+ 4/);
});
