/**
 * INS-MV ROGUE — SRD Interactive Components
 * Vanilla JS, aucune dépendance.
 * Intégration : ajouter dans mkdocs.yml sous extra_javascript: [javascripts/rogue-srd.js]
 *
 * Composants activés automatiquement au chargement de la page :
 *   - .rogue-roller         → Simulateur de dés D666
 *   - .rogue-roller-adv     → Simulateur avantage/désavantage
 *   - .rogue-result-table   → Table de résolution interactive
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════
     UTILITAIRES
  ══════════════════════════════════════════════════════ */

  function d6() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  /** Résultat D666 selon les vraies règles INS-MV ROGUE */
  function interpretD666(blue, white, red) {
    const code = `${blue}${white}${red}`;

    // Résultats spéciaux
    if (blue === 1 && white === 1 && red === 1) {
      return {
        type: 'divine',
        label: 'Intervention Divine',
        desc: '111 — Le Paradis prend les rênes. Réussite spectaculaire.',
        color: 'var(--rogue-divine)',
      };
    }
    if (blue === 6 && white === 6 && red === 6) {
      return {
        type: 'demonic',
        label: 'Intervention Démoniaque',
        desc: '666 — L\'Enfer s\'invite. Conséquences démoniaques immédiates.',
        color: 'var(--rogue-intensity-light)',
      };
    }
    if (blue === 6 && white === 6) {
      return {
        type: 'critical-fail',
        label: 'Échec Critique',
        desc: 'Double 6 — Échec lamentable + complication narrative.',
        color: 'var(--rogue-intensity)',
      };
    }

    return null; // résultat normal, à interpréter par le MJ selon le seuil
  }

  function intensityLabel(red) {
    if (red === 1) return { label: 'Intensité 1 — Actions faciles', color: 'var(--rogue-text-dim)' };
    if (red <= 2) return { label: 'Intensité 2', color: 'var(--rogue-text-dim)' };
    if (red === 3) return { label: 'Intensité 3 — Actions normales', color: 'var(--rogue-host)' };
    if (red <= 4) return { label: 'Intensité 4', color: 'var(--rogue-host)' };
    if (red === 5) return { label: 'Intensité 5 — Actions difficiles', color: 'var(--rogue-intensity-light)' };
    return { label: 'Intensité 6 — Actions extrêmes', color: 'var(--rogue-intensity-light)' };
  }

  /* ══════════════════════════════════════════════════════
     COMPOSANT : SIMULATEUR D666
     Usage HTML :
       <div class="rogue-roller"></div>
  ══════════════════════════════════════════════════════ */

  function buildRoller(container) {
    container.innerHTML = `
      <div class="rogue-roller__label">Simulateur D666 — cliquez pour lancer</div>

      <div class="rogue-roller__dice">
        <div class="rogue-roller__die-wrap">
          <div class="rogue-roller__die rogue-roller__die--angel" data-die="angel">4</div>
          <div class="rogue-roller__die-label">Dé Angélique</div>
          <div class="rogue-roller__die-sub rogue-roller__die-sub--angel">centaines · âme</div>
        </div>
        <div class="rogue-roller__die-wrap">
          <div class="rogue-roller__die rogue-roller__die--host" data-die="white">3</div>
          <div class="rogue-roller__die-label">Dé Hôte</div>
          <div class="rogue-roller__die-sub rogue-roller__die-sub--host">dizaines · corps</div>
        </div>
        <div class="rogue-roller__die-wrap">
          <div class="rogue-roller__die rogue-roller__die--intensity" data-die="red">2</div>
          <div class="rogue-roller__die-label">Dé Intensité</div>
          <div class="rogue-roller__die-sub rogue-roller__die-sub--intensity">unités · rouge</div>
        </div>
      </div>

      <div class="rogue-roller__code" data-el="code">432</div>

      <div class="rogue-roller__result" data-el="result"></div>

      <button class="rogue-roller__btn" data-el="btn">⟳ &nbsp;Lancer les dés</button>
    `;

    const dieEls = {
      angel: container.querySelector('[data-die="angel"]'),
      white: container.querySelector('[data-die="white"]'),
      red:   container.querySelector('[data-die="red"]'),
    };
    const codeEl   = container.querySelector('[data-el="code"]');
    const resultEl = container.querySelector('[data-el="result"]');
    const btn      = container.querySelector('[data-el="btn"]');

    let rolling = false;
    let interval = null;

    btn.addEventListener('click', function () {
      if (rolling) return;
      rolling = true;
      btn.disabled = true;
      resultEl.innerHTML = '';

      Object.values(dieEls).forEach(el => el.classList.add('rogue-roller__die--rolling'));

      let count = 0;
      interval = setInterval(function () {
        const b = d6(), w = d6(), r = d6();
        dieEls.angel.textContent = b;
        dieEls.white.textContent = w;
        dieEls.red.textContent   = r;
        codeEl.textContent = `${b}${w}${r}`;
        count++;

        if (count >= 14) {
          clearInterval(interval);
          Object.values(dieEls).forEach(el => el.classList.remove('rogue-roller__die--rolling'));

          const finalB = d6(), finalW = d6(), finalR = d6();
          dieEls.angel.textContent = finalB;
          dieEls.white.textContent = finalW;
          dieEls.red.textContent   = finalR;
          codeEl.textContent = `${finalB}${finalW}${finalR}`;

          const special = interpretD666(finalB, finalW, finalR);
          const intens  = intensityLabel(finalR);

          if (special) {
            resultEl.innerHTML = `
              <div class="rogue-fadein">
                <div class="rogue-roller__result-name" style="color:${special.color}">${special.label}</div>
                <div class="rogue-roller__result-desc">${special.desc}</div>
              </div>`;
          } else {
            resultEl.innerHTML = `
              <div class="rogue-fadein">
                <div class="rogue-roller__result-name" style="color:var(--rogue-text-dim)">
                  D666 : <span style="color:var(--rogue-text);font-family:var(--rogue-font-label);font-size:1.3em;letter-spacing:0.1em">${finalB}${finalW}${finalR}</span>
                </div>
                <div class="rogue-roller__result-desc" style="color:${intens.color}">${intens.label}</div>
                <div class="rogue-roller__result-desc" style="margin-top:4px">Comparez le <strong>dé d'action</strong> à votre seuil pour déterminer la réussite.</div>
              </div>`;
          }

          rolling = false;
          btn.disabled = false;
        }
      }, 55);
    });
  }

  /* ══════════════════════════════════════════════════════
     COMPOSANT : SIMULATEUR AVANTAGE / DÉSAVANTAGE
     Usage HTML :
       <div class="rogue-roller-adv"></div>
  ══════════════════════════════════════════════════════ */

  function buildAdvantageRoller(container) {
    let mode = 'avantage';

    container.innerHTML = `
      <div class="rogue-roller__label">Avantage &amp; Désavantage — comparez les dés bleu et blanc</div>

      <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap">
        <button class="rogue-adv-toggle rogue-adv-toggle--active" data-mode="avantage">Avantage</button>
        <button class="rogue-adv-toggle" data-mode="desavantage">Désavantage</button>
        <button class="rogue-adv-toggle" data-mode="double-avantage">Double avantage</button>
        <button class="rogue-adv-toggle" data-mode="double-desavantage">Double désavantage</button>
      </div>

      <div class="rogue-roller__dice" data-el="adv-dice" style="justify-content:flex-start;gap:16px"></div>

      <div class="rogue-roller__result" data-el="adv-result" style="text-align:left;min-height:40px"></div>

      <div style="display:flex;gap:8px">
        <button class="rogue-roller__btn" data-el="adv-btn" style="margin:0">⟳ &nbsp;Lancer</button>
      </div>
    `;

    // Styles inline pour les toggles
    const style = document.createElement('style');
    style.textContent = `
      .rogue-adv-toggle {
        font-family: var(--rogue-font-label);
        font-size: 0.72em;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 6px 14px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s;
        background: transparent;
        border: 1px solid var(--rogue-border-faint);
        color: var(--rogue-text-faint);
      }
      .rogue-adv-toggle--active {
        background: var(--rogue-angel-subtle);
        border-color: var(--rogue-angel-border);
        color: var(--rogue-angel-light);
      }
      .rogue-adv-toggle[data-mode="desavantage"].rogue-adv-toggle--active,
      .rogue-adv-toggle[data-mode="double-desavantage"].rogue-adv-toggle--active {
        background: var(--rogue-intensity-subtle);
        border-color: var(--rogue-intensity-border);
        color: var(--rogue-intensity-light);
      }
    `;
    document.head.appendChild(style);

    const diceArea  = container.querySelector('[data-el="adv-dice"]');
    const resultEl  = container.querySelector('[data-el="adv-result"]');
    const btn       = container.querySelector('[data-el="adv-btn"]');
    const toggles   = container.querySelectorAll('.rogue-adv-toggle');

    toggles.forEach(function (t) {
      t.addEventListener('click', function () {
        toggles.forEach(x => x.classList.remove('rogue-adv-toggle--active'));
        t.classList.add('rogue-adv-toggle--active');
        mode = t.dataset.mode;
      });
    });

    function makeDieEl(value, type, dimmed, kept) {
      const wrap = document.createElement('div');
      wrap.className = 'rogue-roller__die-wrap';
      wrap.style.opacity = dimmed ? '0.25' : '1';
      wrap.style.transition = 'opacity 0.3s';

      const die = document.createElement('div');
      die.className = `rogue-roller__die rogue-roller__die--${type}`;
      die.textContent = value;
      die.style.position = 'relative';

      if (kept) {
        const badge = document.createElement('div');
        badge.textContent = '✓';
        badge.style.cssText = `
          position:absolute;top:-6px;right:-6px;
          width:16px;height:16px;border-radius:50%;
          background:${type === 'angel' ? 'var(--rogue-angel-light)' : 'var(--rogue-intensity-light)'};
          color:var(--rogue-bg);font-size:10px;font-weight:700;
          display:flex;align-items:center;justify-content:center;
        `;
        die.appendChild(badge);
      }

      wrap.appendChild(die);
      return wrap;
    }

    btn.addEventListener('click', function () {
      const b1 = d6(), b2 = d6();
      const w1 = d6(), w2 = d6();
      const r  = d6();

      let chosenBlue, chosenWhite, explanation, explosiveRed = false;

      if (mode === 'avantage') {
        chosenBlue  = Math.min(b1, b2);
        chosenWhite = Math.min(w1, w2);
        explanation = 'Avantage : on retient le <strong>résultat le plus bas</strong> entre les dés bleu et blanc.';
      } else if (mode === 'desavantage') {
        chosenBlue  = Math.max(b1, b2);
        chosenWhite = Math.max(w1, w2);
        explanation = 'Désavantage : on retient le <strong>résultat le plus haut</strong> entre les dés bleu et blanc.';
      } else if (mode === 'double-avantage') {
        chosenBlue  = Math.min(b1, b2);
        chosenWhite = Math.min(w1, w2);
        explosiveRed = true;
        explanation = 'Double avantage : plus bas des deux dés + <strong>dé d\'intensité explosif</strong>.';
      } else {
        chosenBlue  = Math.max(b1, b2);
        chosenWhite = Math.max(w1, w2);
        explanation = 'Double désavantage : plus haut des deux dés + dé d\'intensité relancé (pire résultat).';
      }

      // Dé d'action (MJ choisit bleu ou blanc selon la nature de l'action)
      // Ici on affiche les deux pour illustration
      const keptBlue  = chosenBlue  === b1 ? 0 : 1;
      const keptWhite = chosenWhite === w1 ? 0 : 1;

      diceArea.innerHTML = '';

      // Séparateur bleu
      const blueGroup = document.createElement('div');
      blueGroup.style.cssText = 'display:flex;gap:8px;align-items:flex-end;padding:8px;background:var(--rogue-angel-subtle);border-radius:10px;border:1px solid var(--rogue-angel-border)';
      blueGroup.appendChild(makeDieEl(b1, 'angel', keptBlue !== 0, keptBlue === 0));
      blueGroup.appendChild(makeDieEl(b2, 'angel', keptBlue !== 1, keptBlue === 1));
      const blueLabel = document.createElement('div');
      blueLabel.style.cssText = 'font-family:var(--rogue-font-label);font-size:0.6em;color:var(--rogue-angel);letter-spacing:0.08em;text-align:center;margin-top:4px;text-transform:uppercase';
      blueLabel.textContent = `Angélique → ${chosenBlue}`;
      const blueWrap = document.createElement('div');
      blueWrap.style.display = 'flex';
      blueWrap.style.flexDirection = 'column';
      blueWrap.style.gap = '8px';
      blueWrap.appendChild(blueGroup);
      blueWrap.appendChild(blueLabel);

      // Séparateur blanc
      const whiteGroup = document.createElement('div');
      whiteGroup.style.cssText = 'display:flex;gap:8px;align-items:flex-end;padding:8px;background:var(--rogue-host-subtle);border-radius:10px;border:1px solid var(--rogue-host-border)';
      whiteGroup.appendChild(makeDieEl(w1, 'host', keptWhite !== 0, keptWhite === 0));
      whiteGroup.appendChild(makeDieEl(w2, 'host', keptWhite !== 1, keptWhite === 1));
      const whiteLabel = document.createElement('div');
      whiteLabel.style.cssText = 'font-family:var(--rogue-font-label);font-size:0.6em;color:var(--rogue-host-dim);letter-spacing:0.08em;text-align:center;margin-top:4px;text-transform:uppercase';
      whiteLabel.textContent = `Hôte → ${chosenWhite}`;
      const whiteWrap = document.createElement('div');
      whiteWrap.style.display = 'flex';
      whiteWrap.style.flexDirection = 'column';
      whiteWrap.style.gap = '8px';
      whiteWrap.appendChild(whiteGroup);
      whiteWrap.appendChild(whiteLabel);

      // Rouge
      const redGroup = document.createElement('div');
      redGroup.style.cssText = 'display:flex;gap:8px;align-items:flex-end;padding:8px;background:var(--rogue-intensity-subtle);border-radius:10px;border:1px solid var(--rogue-intensity-border)';
      const redDie = makeDieEl(r, 'intensity', false, false);
      redGroup.appendChild(redDie);
      if (explosiveRed) {
        const badge = document.createElement('div');
        badge.style.cssText = 'font-family:var(--rogue-font-label);font-size:0.65em;color:var(--rogue-intensity-light);padding:2px 6px;background:var(--rogue-intensity-subtle);border:1px solid var(--rogue-intensity-border);border-radius:4px;white-space:nowrap';
        badge.textContent = '💥 explosif';
        redGroup.appendChild(badge);
      }
      const redLabel = document.createElement('div');
      redLabel.style.cssText = 'font-family:var(--rogue-font-label);font-size:0.6em;color:var(--rogue-intensity-dim);letter-spacing:0.08em;text-align:center;margin-top:4px;text-transform:uppercase';
      redLabel.textContent = `Intensité → ${r}${explosiveRed ? '+' : ''}`;
      const redWrap = document.createElement('div');
      redWrap.style.display = 'flex';
      redWrap.style.flexDirection = 'column';
      redWrap.style.gap = '8px';
      redWrap.appendChild(redGroup);
      redWrap.appendChild(redLabel);

      diceArea.appendChild(blueWrap);
      diceArea.appendChild(whiteWrap);
      diceArea.appendChild(redWrap);

      resultEl.innerHTML = `<div class="rogue-fadein" style="font-family:var(--rogue-font-body);font-size:0.9em;color:var(--rogue-text-dim);line-height:1.6;margin-top:12px">${explanation}</div>`;
    });
  }

  /* ══════════════════════════════════════════════════════
     COMPOSANT : TABLE DE RÉSOLUTION INTERACTIVE
     Usage HTML :
       <div class="rogue-result-table"></div>

     Le MJ peut renseigner un seuil pour colorer la table.
  ══════════════════════════════════════════════════════ */

  function buildResultTable(container) {
    container.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap">
        <label style="font-family:var(--rogue-font-label);font-size:0.72em;letter-spacing:0.1em;text-transform:uppercase;color:var(--rogue-text-faint)">
          Seuil de réussite :
        </label>
        <input type="range" min="1" max="6" value="3" step="1" data-el="seuil-range"
          style="accent-color:var(--rogue-angel);width:140px">
        <span data-el="seuil-val"
          style="font-family:var(--rogue-font-label);font-size:1.4em;font-weight:700;color:var(--rogue-angel-light);min-width:1.5em">3</span>
        <span style="font-family:var(--rogue-font-label);font-size:0.65em;color:var(--rogue-text-faint);letter-spacing:0.06em;text-transform:uppercase">
          (1 = faible, 5 = très fort)
        </span>
      </div>

      <table style="width:100%;border-collapse:collapse;border-radius:10px;overflow:hidden;border:1px solid var(--rogue-border)">
        <thead>
          <tr style="background:var(--rogue-bg-4);font-family:var(--rogue-font-label);font-size:0.68em;letter-spacing:0.1em;text-transform:uppercase;color:var(--rogue-text-faint)">
            <th style="padding:10px 16px;text-align:left;border-bottom:1px solid var(--rogue-border)">Dé d'action</th>
            <th style="padding:10px 16px;text-align:left;border-bottom:1px solid var(--rogue-border)">Résultat</th>
            <th style="padding:10px 16px;text-align:left;border-bottom:1px solid var(--rogue-border)">Marge</th>
            <th style="padding:10px 16px;text-align:left;border-bottom:1px solid var(--rogue-border)">Note</th>
          </tr>
        </thead>
        <tbody data-el="tbody"></tbody>
      </table>
    `;

    const range   = container.querySelector('[data-el="seuil-range"]');
    const seuilEl = container.querySelector('[data-el="seuil-val"]');
    const tbody   = container.querySelector('[data-el="tbody"]');

    function renderTable(seuil) {
      seuilEl.textContent = seuil;
      tbody.innerHTML = '';

      for (let i = 1; i <= 6; i++) {
        const tr = document.createElement('tr');
        const isSuccess = i <= seuil && i !== 6;
        const isFailure = i > seuil || i === 6;
        const isCritical6 = i === 6;
        const isAlways1 = i === 1;
        const marge = isSuccess ? seuil - i : '—';

        let bg = 'transparent';
        let color = 'var(--rogue-text-dim)';
        let resultLabel = '';
        let note = '';

        if (isCritical6) {
          bg = 'var(--rogue-intensity-subtle)';
          color = 'var(--rogue-intensity-light)';
          resultLabel = 'Échec';
          note = 'Toujours un échec (règle absolue)';
        } else if (isAlways1) {
          bg = 'var(--rogue-divine-subtle)';
          color = 'var(--rogue-divine)';
          resultLabel = 'Réussite';
          note = 'Toujours une réussite (règle absolue)';
        } else if (isSuccess) {
          const margin = seuil - i;
          bg = margin >= 3 ? 'var(--rogue-angel-subtle)' : 'oklch(58% 0.22 240 / 0.06)';
          color = margin >= 3 ? 'var(--rogue-angel-light)' : 'var(--rogue-text)';
          resultLabel = 'Réussite';
          note = margin >= 3 ? 'Marge forte' : 'Marge faible';
        } else {
          bg = 'transparent';
          color = 'var(--rogue-text-faint)';
          resultLabel = 'Échec';
          note = '';
        }

        tr.style.background = bg;
        tr.style.borderBottom = '1px solid var(--rogue-border-faint)';
        tr.style.transition = 'background 0.2s';
        tr.innerHTML = `
          <td style="padding:11px 16px;font-family:var(--rogue-font-label);font-size:1.4em;font-weight:700;color:${color}">${i}</td>
          <td style="padding:11px 16px;font-family:var(--rogue-font-label);font-size:0.8em;letter-spacing:0.06em;color:${color};text-transform:uppercase">${resultLabel}</td>
          <td style="padding:11px 16px;font-family:var(--rogue-font-label);font-size:0.95em;color:var(--rogue-text-dim)">${marge}</td>
          <td style="padding:11px 16px;font-family:var(--rogue-font-body);font-size:0.88em;color:var(--rogue-text-faint);font-style:italic">${note}</td>
        `;
        tbody.appendChild(tr);
      }
    }

    range.addEventListener('input', function () {
      renderTable(parseInt(this.value));
    });

    renderTable(3);
  }

  /* ══════════════════════════════════════════════════════
     COMPOSANT : SIMULATEUR COMPLET D666
     Usage HTML :
       <div class="rogue-sim"></div>
  ══════════════════════════════════════════════════════ */

  function buildSimulator(container) {

    // ── UI ──────────────────────────────────────────────
    container.innerHTML = `
      <div class="sim-params">

        <div class="sim-row">
          <span class="sim-lbl">Seuil de réussite</span>
          <div class="sim-seuil">
            <button class="sim-seuil-btn" data-el="dec">−</button>
            <span class="sim-seuil-val" data-el="seuil">3</span>
            <button class="sim-seuil-btn" data-el="inc">+</button>
          </div>
          <span class="sim-hint">(1–9, défaut 3)</span>
        </div>

        <div class="sim-row" data-el="type-row">
          <span class="sim-lbl">Type d'action</span>
          <div class="sim-tog-group" data-group="type">
            <button class="sim-tog sim-tog--angel sim-tog--on" data-val="angel">Angélique · dé bleu</button>
            <button class="sim-tog sim-tog--host" data-val="host">Humain · dé blanc</button>
          </div>
        </div>

        <div class="sim-row">
          <span class="sim-lbl">Modificateur</span>
          <div class="sim-tog-group sim-tog-group--mod" data-group="mod">
            <button class="sim-tog sim-tog--dd" data-val="dd">Dbl désavantage</button>
            <button class="sim-tog sim-tog--d"  data-val="d">Désavantage</button>
            <button class="sim-tog sim-tog--none sim-tog--on" data-val="none">Aucun</button>
            <button class="sim-tog sim-tog--a"  data-val="a">Avantage</button>
            <button class="sim-tog sim-tog--da" data-val="da">Dbl avantage</button>
          </div>
        </div>

        <button class="sim-roll-btn" data-el="roll">🎲 &nbsp;Lancer le D666</button>
      </div>

      <div class="sim-result" data-el="result"></div>
    `;

    // ── État ────────────────────────────────────────────
    let seuil = 3;
    let actionType = 'angel';
    let modifier = 'none';

    const seuilEl  = container.querySelector('[data-el="seuil"]');
    const resultEl = container.querySelector('[data-el="result"]');

    // Seuil ±
    container.querySelector('[data-el="dec"]').addEventListener('click', function () {
      if (seuil > 1) seuilEl.textContent = --seuil;
    });
    container.querySelector('[data-el="inc"]').addEventListener('click', function () {
      if (seuil < 9) seuilEl.textContent = ++seuil;
    });

    // Groupes de boutons
    function setupGroup(name, cb) {
      container.querySelectorAll('[data-group="' + name + '"] .sim-tog').forEach(function (btn) {
        btn.addEventListener('click', function () {
          container.querySelectorAll('[data-group="' + name + '"] .sim-tog')
            .forEach(function (b) { b.classList.remove('sim-tog--on'); });
          btn.classList.add('sim-tog--on');
          cb(btn.dataset.val);
        });
      });
    }

    setupGroup('type', function (v) { actionType = v; });
    setupGroup('mod', function (v) {
      modifier = v;
    });

    // ── Dé explosif ─────────────────────────────────────
    // Règle : quel que soit le résultat du 1er dé, on ajoute `sources` dés bonus.
    // Seuls les dés BONUS (pas le 1er) peuvent déclencher de nouvelles explosions sur 6.
    function rollExplosive(init, sources) {
      var dice = [init];
      var total = init;

      // Lancer les dés bonus (toujours, quelle que soit la valeur du 1er)
      var bonus = [];
      for (var i = 0; i < sources; i++) {
        var v = d6();
        bonus.push(v);
        dice.push(v);
        total += v;
      }

      // Seuls les dés bonus explosent sur 6
      var pending = bonus.filter(function (v) { return v === 6; });
      while (pending.length) {
        var next = [];
        pending.forEach(function () {
          var v = d6();
          dice.push(v);
          total += v;
          if (v === 6) next.push(v);
        });
        pending = next;
      }

      var steps = [dice.join(' + ') + ' = <strong>' + total + '</strong>'];
      return { total: total, dice: dice, steps: steps };
    }

    // ── Lancer ──────────────────────────────────────────
    container.querySelector('[data-el="roll"]').addEventListener('click', function () {

      // 1. Dés bruts
      var blue = d6(), white = d6(), red1 = d6();
      var red2 = modifier === 'dd' ? d6() : null;

      // 2. Résultats spéciaux (toujours sur les dés bruts)
      var is111 = blue === 1 && white === 1 && red1 === 1;
      var is666 = blue === 6 && white === 6 && red1 === 6;
      var isCritFail = !is666 && blue === 6 && white === 6;

      // 3. Dé d'action selon modificateur
      var actionDie, actionExplain;
      if (modifier === 'da' || modifier === 'a') {
        actionDie = Math.min(blue, white);
        actionExplain = modifier === 'da'
          ? 'min(' + blue + ', ' + white + ') = <strong>' + actionDie + '</strong> (double avantage)'
          : 'min(' + blue + ', ' + white + ') = <strong>' + actionDie + '</strong> (avantage)';
      } else if (modifier === 'dd' || modifier === 'd') {
        actionDie = Math.max(blue, white);
        actionExplain = modifier === 'dd'
          ? 'max(' + blue + ', ' + white + ') = <strong>' + actionDie + '</strong> (double désavantage)'
          : 'max(' + blue + ', ' + white + ') = <strong>' + actionDie + '</strong> (désavantage)';
      } else {
        actionDie = actionType === 'angel' ? blue : white;
        actionExplain = actionType === 'angel'
          ? 'dé bleu = <strong>' + blue + '</strong> (action angélique)'
          : 'dé blanc = <strong>' + white + '</strong> (action humaine)';
      }

      // 4. Réussite
      var isSuccess = !is666 && actionDie <= seuil && actionDie !== 6;
      var marge = isSuccess ? seuil - actionDie : 0;

      // 5. Critique
      var critThr = seuil >= 6 ? 5 : seuil;
      var isCritSuccess = isSuccess && blue === critThr && white === critThr;

      // 6. Sources explosives
      var expSources = 0;
      if (modifier === 'da') expSources++;
      if (isCritSuccess)     expSources++;

      // 7. Intensité
      var intensitySteps = [], intensityBase, expDice = null;
      if (modifier === 'dd' && red2 !== null) {
        intensityBase = Math.min(red1, red2);
        intensitySteps.push('Dé 1 : ' + red1 + '   Dé 2 : ' + red2);
        intensitySteps.push('On garde le moins bon : min(' + red1 + ', ' + red2 + ') = <strong>' + intensityBase + '</strong>');
      } else if (expSources > 0) {
        var expResult = rollExplosive(red1, expSources);
        intensitySteps = expResult.steps;
        intensityBase = expResult.total;
        expDice = expResult.dice;
      } else {
        intensityBase = red1;
        intensitySteps.push('Dé rouge = ' + red1);
      }

      // 8. Intensité finale
      var intensityFinal, intensityFinalLine;
      if (isSuccess) {
        intensityFinal = Math.max(marge, intensityBase);
        intensityFinalLine = 'max(marge <strong>' + marge + '</strong>, intensité <strong>' + intensityBase + '</strong>) = <strong>' + intensityFinal + '</strong>';
      } else {
        intensityFinal = intensityBase;
        intensityFinalLine = 'Intensité brute = <strong>' + intensityBase + '</strong> (marge non calculée sur un échec)';
      }

      // ── Rendu ─────────────────────────────────────────
      renderResult({
        blue: blue, white: white, red1: red1, red2: red2,
        actionDie: actionDie, actionExplain: actionExplain,
        isSuccess: isSuccess, isCritSuccess: isCritSuccess,
        isCritFail: isCritFail, is111: is111, is666: is666,
        marge: marge, seuil: seuil, critThr: critThr,
        intensitySteps: intensitySteps,
        intensityBase: intensityBase, expDice: expDice,
        intensityFinal: intensityFinal, intensityFinalLine: intensityFinalLine,
        expSources: expSources, modifier: modifier, actionType: actionType
      });
    });

    // ── Rendu du résultat ────────────────────────────────
    function renderResult(r) {

      // Outcome
      var oc, icon, label;
      if (r.is111) {
        oc = 'divine';   icon = '✨'; label = 'Intervention Divine — 111';
      } else if (r.is666) {
        oc = 'demonic';  icon = '🔥'; label = 'Intervention Démoniaque — 666';
      } else if (r.isCritFail) {
        oc = 'critfail'; icon = '💀'; label = 'Échec Critique — double 6';
      } else if (r.isCritSuccess) {
        oc = 'critsuc';  icon = '⚡'; label = 'Réussite Critique !';
      } else if (r.isSuccess) {
        oc = 'success';  icon = '✅'; label = 'Réussite';
      } else {
        oc = 'failure';  icon = '❌'; label = 'Échec';
      }

      // Dés
      var diceHtml = buildDice(r);

      // Étapes de calcul
      var steps = [];
      steps.push('<strong>Dé d\'action :</strong> ' + r.actionExplain);

      if (r.is111 || r.is666) {
        steps.push('Résultat spécial — voir le chapitre Résolution pour les effets.');
      } else if (r.isCritFail) {
        steps.push('Les deux dés d\'action = 6 → Échec critique + complication narrative.');
      } else {
        if (r.isSuccess) {
          steps.push(r.actionDie + ' ≤ seuil ' + r.seuil + ' → Réussite');
          if (r.isCritSuccess) {
            steps.push('Dé bleu (' + r.blue + ') = dé blanc (' + r.white + ') = ' + r.critThr + ' = seuil → <strong>Réussite Critique !</strong> — intensité explosive.');
          }
          steps.push('<strong>Marge :</strong> seuil ' + r.seuil + ' − résultat ' + r.actionDie + ' = <strong>' + r.marge + '</strong>');
        } else {
          steps.push(r.actionDie + (r.actionDie === 6 ? ' = 6 (toujours un échec)' : ' > seuil ' + r.seuil) + ' → Échec');
        }

        steps.push('<strong>Intensité :</strong>');
        r.intensitySteps.forEach(function (s) { steps.push('· ' + s); });
        steps.push('→ ' + r.intensityFinalLine);
      }

      var intensityTag = (!r.is111 && !r.is666 && !r.isCritFail)
        ? '<span class="sim-outcome-intensity">Intensité : ' + r.intensityFinal + '</span>'
        : '';

      resultEl.className = 'sim-result sim-result--visible';
      resultEl.innerHTML =
        diceHtml +
        '<div class="sim-outcome sim-outcome--' + oc + '">' +
          '<span class="sim-outcome-icon">' + icon + '</span>' +
          '<div class="sim-outcome-body">' +
            '<span class="sim-outcome-label">' + label + '</span>' +
            intensityTag +
          '</div>' +
        '</div>' +
        '<div class="sim-steps">' +
          steps.map(function (s) { return '<div class="sim-step">' + s + '</div>'; }).join('') +
        '</div>';
    }

    function buildDice(r) {
      // Détermine quelle(s) die(s) est "retenue"
      var blueKept, whiteKept, red1Kept, red2Kept;
      if (r.modifier === 'none') {
        blueKept  = r.actionType === 'angel';
        whiteKept = r.actionType === 'host';
      } else if (r.modifier === 'a' || r.modifier === 'da') {
        blueKept  = r.blue  <= r.white;
        whiteKept = r.white <= r.blue;
      } else {
        blueKept  = r.blue  >= r.white;
        whiteKept = r.white >= r.blue;
      }
      red1Kept = !(r.modifier === 'dd' && r.red2 !== null && r.red2 < r.red1);
      red2Kept  = r.modifier === 'dd' && r.red2 !== null && r.red2 <= r.red1;

      function die(val, type, lbl, sub, kept, dim, badge) {
        return '<div class="sim-die' + (kept ? ' sim-die--kept' : '') + (dim ? ' sim-die--dim' : '') + '">' +
          '<div class="rogue-roller__die rogue-roller__die--' + type + '">' + val + '</div>' +
          '<div class="sim-die-lbl">' + lbl + '</div>' +
          '<div class="sim-die-sub">' + sub + '</div>' +
          (kept  ? '<div class="sim-die-badge sim-die-badge--kept">retenu</div>' : '') +
          (badge ? '<div class="sim-die-badge sim-die-badge--exp">💥 explosif</div>' : '') +
        '</div>';
      }

      var html = '<div class="sim-dice">';
      html += die(r.blue,  'angel', 'Bleu',  'angélique', blueKept,  !blueKept  && r.modifier === 'none' && r.actionType === 'host',  false);
      html += die(r.white, 'host',  'Blanc', 'hôte',      whiteKept, !whiteKept && r.modifier === 'none' && r.actionType === 'angel', false);

      // Séparateur bleu/blanc → rouge
      html += '<div class="sim-dice-sep">→</div>';

      if (r.expDice && r.expDice.length > 1) {
        // Dés explosifs : afficher chaque dé séparé par "+"
        r.expDice.forEach(function (val, i) {
          if (i > 0) html += '<div class="sim-dice-plus">+</div>';
          var isFirst = i === 0;
          html += die(val, 'intensity',
            isFirst ? 'Rouge' : '↪ relance',
            isFirst ? 'intensité 💥' : (val === 6 ? 'explose encore' : ''),
            true, false, false);
        });
      } else if (r.red2 !== null) {
        // Double désavantage : 2 rouges, garder le pire
        html += die(r.red1, 'intensity', 'Rouge ①', 'intensité', red1Kept, !red1Kept, false);
        html += '<div class="sim-dice-plus">·</div>';
        html += die(r.red2, 'intensity', 'Rouge ②', 'intensité', red2Kept, !red2Kept, false);
      } else {
        html += die(r.red1, 'intensity', 'Rouge', 'intensité', true, false, false);
      }

      html += '</div>';
      return html;
    }
  }

  /* ══════════════════════════════════════════════════════
     COMPOSANT : ENTÊTES COLLANTES (.rogue-equip-table)
     Implémentation JS nécessaire car position:sticky ne
     fonctionne pas dans un parent overflow-x:auto.
  ══════════════════════════════════════════════════════ */

  function initStickyHeaders() {
    // Nettoyer les anciens fantômes lors des navigations SPA
    document.querySelectorAll('.rogue-ghost-thead').forEach(function(el) { el.remove(); });

    function getNavOffset() {
      var h = document.querySelector('.md-header');
      var t = document.querySelector('.md-tabs');
      return (h ? h.getBoundingClientRect().height : 0) +
             (t ? t.getBoundingClientRect().height : 0) || 56;
    }

    document.querySelectorAll('.rogue-equip-table').forEach(function(table) {
      var realThead = table.querySelector('thead');
      if (!realThead) return;

      var ghost = document.createElement('table');
      ghost.className = 'rogue-equip-table rogue-ghost-thead';
      ghost.style.cssText = 'position:fixed;z-index:200;visibility:hidden;pointer-events:none;border-collapse:collapse;margin:0;padding:0;table-layout:fixed;font-size:13px;';
      ghost.appendChild(realThead.cloneNode(true));
      document.body.appendChild(ghost);

      function sync() {
        var nav = getNavOffset();
        var tr = table.getBoundingClientRect();
        var realThs = realThead.querySelectorAll('th');
        var ghostThs = ghost.querySelectorAll('th');
        ghost.style.top  = nav + 'px';
        ghost.style.left = tr.left + 'px';
        ghost.style.width = tr.width + 'px';
        realThs.forEach(function(th, i) {
          if (ghostThs[i]) {
            var w = th.getBoundingClientRect().width;
            ghostThs[i].style.width = w + 'px';
            ghostThs[i].style.minWidth = w + 'px';
            ghostThs[i].style.maxWidth = w + 'px';
          }
        });
      }

      function update() {
        var nav = getNavOffset();
        var theadRect = realThead.getBoundingClientRect();
        var tableRect = table.getBoundingClientRect();
        if (theadRect.bottom < nav && tableRect.bottom > nav + 20) {
          sync();
          ghost.style.visibility = 'visible';
        } else {
          ghost.style.visibility = 'hidden';
        }
      }

      // Synchro horizontale si le parent a overflow-x:auto
      var scrollParent = table.parentElement;
      while (scrollParent && scrollParent !== document.body) {
        var ov = window.getComputedStyle(scrollParent).overflowX;
        if (ov === 'auto' || ov === 'scroll') {
          scrollParent.addEventListener('scroll', function() {
            if (ghost.style.visibility === 'visible') sync();
          }, { passive: true });
          break;
        }
        scrollParent = scrollParent.parentElement;
      }

      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update, { passive: true });
    });
  }

  /* ══════════════════════════════════════════════════════
     COMPOSANT : GÉNÉRATEUR DE PNJ
     Usage HTML :
       <div class="rogue-gen"></div>
  ══════════════════════════════════════════════════════ */

  function buildNPCGenerator(container) {

    // ── Base de données (FR) ─────────────────────────────
    var DB = {
      firstNames: {
        american:     { male: ["John","Michael","David","James","Robert","Thomas","William","Richard","Joseph","Charles","Daniel","Matthew","Anthony","Mark","Paul","Steven","George","Kenneth","Andrew","Edward","Brian","Joshua","Kevin","Ronald","Timothy","Jason","Jeffrey","Frank","Scott","Eric","Stephen","Gregory","Benjamin","Samuel","Patrick","Jack"], female: ["Mary","Jennifer","Lisa","Sarah","Jessica","Karen","Nancy","Barbara","Elizabeth","Susan","Linda","Patricia","Margaret","Ashley","Sandra","Emily","Donna","Michelle","Dorothy","Carol","Amanda","Melissa","Deborah","Stephanie","Rebecca","Sharon","Laura","Cynthia","Kathleen","Amy","Angela","Shirley","Anna","Ruth","Brenda","Emma"] },
        french:       { male: ["Jean","Pierre","Michel","Philippe","Nicolas","François","Laurent","Alain","Jacques","Bernard","Marcel","André","René","Claude","Henri","Louis","Christophe","Gérard","Thierry","Éric","Patrice","Yves","Dominique","Guy","Pascal","Denis","Olivier","Gilbert","Serge","Didier","Frédéric","Julien","Vincent","Roland","Stéphane","Émile"], female: ["Marie","Jeanne","Françoise","Monique","Catherine","Nicole","Nathalie","Isabelle","Jacqueline","Sophie","Sylvie","Anne","Marguerite","Hélène","Christine","Suzanne","Denise","Martine","Simone","Yvonne","Claudine","Geneviève","Madeleine","Louise","Thérèse","Chantal","Josette","Odette","Camille","Claire","Paulette","Renée","Danielle","Céline","Patricia","Valérie"] },
        northAfrican: { male: ["Mohammed","Ahmed","Ali","Hassan","Karim","Omar","Youssef","Rachid","Mustafa","Ibrahim","Samir","Nasser","Khalid","Mahdi","Tarek","Bilal","Jamal","Hamza","Amir","Rashid","Tariq","Ismail","Salim","Aziz","Hakim","Fouad","Faisal","Anwar","Ziyad","Malik","Walid","Adil","Zakaria","Nabil","Yassin","Amine"], female: ["Fatima","Leila","Aisha","Zahra","Amina","Samira","Nadia","Jamila","Karima","Maha","Yasmin","Fatiha","Layla","Khadija","Majda","Naima","Farida","Hanan","Malika","Saida","Salma","Rania","Soraya","Asma","Noor","Sumaya","Zainab","Nabila","Hasna","Houda","Mariam","Latifa","Iman","Rachida","Sanaa","Zohra"] },
        hispanic:     { male: ["José","Carlos","Juan","Miguel","Antonio","Luis","Manuel","Javier","Francisco","Alejandro","Roberto","Fernando","Enrique","Raúl","Sergio","Jorge","Ricardo","Eduardo","Rafael","Guillermo","Mario","Santiago","Héctor","Arturo","Julio","Pedro","Andrés","Gabriel","Óscar","Alfredo","Emilio","Diego","Alberto","Marco","Ernesto","Ramón"], female: ["María","Ana","Carmen","Gloria","Rosa","Luisa","Lucía","Teresa","Dolores","Pilar","Sofia","Mercedes","Claudia","Patricia","Isabel","Margarita","Gabriela","Cecilia","Silvia","Julia","Adriana","Raquel","Catalina","Juana","Conchita","Esperanza","Eva","Rosario","Verónica","Francisca","Carolina","Marina","Beatriz","Rocío","Graciela","Inés"] },
        westAfrican:  { male: ["Kwame","Kofi","Addo","Kwesi","Ade","Olu","Chidi","Emeka","Oluwaseun","Dele","Ola","Tunde","Segun","Femi","Dare","Akeem","Dayo","Idris","Lekan","Nnamdi","Bello","Mamadou","Diallo","Issouf","Amadou","Baba","Modibo","Souleymane","Seydou","Ibrahim","Oumar","Aliou"], female: ["Ama","Abena","Akosua","Efua","Esi","Adwoa","Amara","Nkechi","Chioma","Ngozi","Folami","Ebele","Nneka","Amaka","Adenike","Yewande","Simisola","Temitope","Abiola","Oluchi","Fatou","Aïssatou","Aminata","Kadiatou","Mariam","Fatoumata","Binta","Maimouna","Hawa","Oumou","Aïda","Khady"] },
        indian:       { male: ["Raj","Vikram","Arjun","Rahul","Amit","Sunil","Arun","Vijay","Rajesh","Rakesh","Deepak","Nitin","Sanjay","Ajay","Manish","Ravi","Vinod","Anil","Dinesh","Ramesh","Suresh","Mohan","Pradeep","Krishna","Gopal","Ashok","Mahesh","Narayan","Pankaj","Vivek","Rajendra","Srinivas","Ganesh","Harish","Alok","Manoj"], female: ["Priya","Neha","Anjali","Pooja","Sunita","Kavita","Meena","Shanti","Radha","Lakshmi","Sarita","Anita","Nisha","Geeta","Savita","Asha","Suman","Poonam","Jyoti","Rita","Kiran","Ananya","Deepika","Manisha","Shobha","Usha","Divya","Shilpa","Shalini","Smita","Rekha","Gayatri","Parvati","Ritu","Sita","Maya"] },
        slavic:       { male: ["Ivan","Sergei","Nikolai","Dmitri","Vladimir","Alexei","Pavel","Mikhail","Andrei","Yuri","Boris","Oleg","Anatoly","Leonid","Viktor","Stanislav","Konstantin","Aleksandr","Pyotr","Grigori","Maxim","Valentin","Vasily","Fyodor","Roman","Artem","Bogdan","Lev","Igor","Miroslav","Semyon","Zakhar","Yegor","Ilya","Kirill","Nikita"], female: ["Tatiana","Olga","Natalya","Svetlana","Ekaterina","Marina","Irina","Anna","Elena","Maria","Lyudmila","Galina","Valentina","Oksana","Yelena","Larisa","Alla","Vera","Anastasia","Polina","Kseniya","Veronika","Zoya","Nina","Inna","Margarita","Tamara","Darya","Sofiya","Yulia","Alisa","Vasilisa","Vlada","Alina","Raisa","Dina"] },
        eastAsian:    { male: ["Wei","Jian","Chen","Xiang","Ming","Hao","Feng","Hong","Lin","Yang","Zhang","Cheng","Jun","Liang","Li","Wu","Takashi","Kenji","Hiroshi","Akira","Yuki","Kazuo","Daisuke","Hideo","Jin-Ho","Min-Soo","Seung-Hoon","Jae-Sung","Dong-Hyun","Ji-Hoon","Young-Ho","Sung-Min","Xiu","Jie","Tao","Kang"], female: ["Xiu","Mei","Jing","Ling","Yan","Hui","Fang","Na","Yumiko","Naomi","Yuka","Ayumi","Emi","Sakura","Haruka","Akiko","Jin","Yi","Qing","Zhen","Yun","Min","Xin","Lan","Su-Jin","Ji-Yeon","Min-Ji","Hye-Jin","Yoon-Ah","Eun-Hye","Mi-Sook","Soo-Yeon","Rei","Aiko","Miyu","Asuka"] },
        teen:         { male: ["Jayden","Brayden","Cayden","Kayden","Ayden","Jaxxon","Braxton","Jaxon","Daxton","Treyson","Kaedin","Zayden","Kashtyn","Coltyn","Kannon","Kyngston","Jaxton","Brantley","Zayne","Kyson","Bryson","Kamden","Kamdyn","Kasen","Huxley","Talon"], female: ["Madisyn","Jordyn","Katelynn","Briella","McKenzi","Jocelyn","Addisyn","Kyndal","Skylar","Maddison","Kynlee","Brynlee","Nevaeh","Addyson","Raelynn","Kamryn","Bryleigh","Jaslene","Ryleigh","Kennedi","Emersyn","Emilee","Kylee","Kaydence"] }
      },
      lastNames: {
        american:     ["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Wilson","Anderson","Taylor","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker"],
        french:       ["Martin","Bernard","Dubois","Thomas","Robert","Richard","Petit","Durand","Leroy","Moreau","Simon","Laurent","Lefebvre","Michel","Garcia","David","Bertrand","Roux","Vincent","Fournier","Morel","Girard","André","Lefevre","Mercier","Dupont","Lambert","Bonnet","Francois","Martinez","Legrand","Garnier","Faure","Rousseau","Blanc","Guerin"],
        northAfrican: ["El Amrani","Benali","Bakri","Mansouri","Idrissi","Benmoussa","Najjar","Hassani","Bouazizi","Ben Youssef","Tahiri","Benjelloun","Ziani","Saidi","El Fassi","Khalil","El Khoury","Abbas","Abboud","Haddad","Rahman","Saleh","Hassan","Mustafa","Abadi","Mansour","El Masri","Kaddour","Berrada","Alaoui","Hakimi","Boulaich","Zahir"],
        hispanic:     ["García","Rodríguez","Fernández","López","Martínez","González","Pérez","Sánchez","Ramírez","Torres","Flores","Rivera","Gómez","Díaz","Vargas","Castillo","Mendoza","Cruz","Morales","Reyes","Gutiérrez","Ortiz","Herrera","Castro","Silva","Núñez","Vega","Ruiz","Jiménez","Moreno","Romero","Álvarez","Suárez","Vázquez","Molina","Delgado"],
        westAfrican:  ["Mensah","Osei","Boateng","Owusu","Adjei","Agyeman","Nkrumah","Annan","Amoako","Addo","Okafor","Adebayo","Okonkwo","Chukwu","Abiodun","Diallo","Bah","Touré","Keita","Kamara","Koné","Sylla","Cissé","Traoré","Konaté","Diakité","Diop","Ndiaye","Mendy","Sow","Diouf","Sarr","Thiam","Coulibaly","Sall"],
        indian:       ["Patel","Sharma","Singh","Rao","Kumar","Reddy","Nair","Jain","Choudhury","Chowdhury","Gupta","Verma","Shah","Mehta","Das","Chatterjee","Bose","Sengupta","Mukherjee","Dutta","Desai","Gandhi","Iyer","Kaur","Agarwal","Bhat","Kulkarni","Yadav","Krishnamurthy","Goswami","Malhotra","Venkatesh","Banerjee","Kapoor"],
        slavic:       ["Ivanov","Petrov","Sidorov","Smirnov","Kuznetsov","Popov","Sokolov","Lebedev","Kozlov","Novikov","Morozov","Volkov","Solovyov","Vasiliev","Zaytsev","Pavlov","Semyonov","Golubev","Vinogradov","Bogdanov","Vorobiev","Fedorov","Mikhailov","Belyakov","Kowalski","Nowak","Zielinski","Wojcik","Kowalczyk","Kaminski","Lewandowski","Jablonski"],
        eastAsian:    ["Wang","Li","Zhang","Liu","Chen","Yang","Huang","Zhao","Wu","Zhou","Sun","Ma","Gao","Hu","Luo","Zheng","Tanaka","Suzuki","Sato","Nakamura","Takahashi","Kobayashi","Watanabe","Ito","Kim","Lee","Park","Choi","Jung","Kang","Yoon","Jang","Yamamoto","Hayashi","Saito","Sasaki"],
        teen:         ["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Wilson","Anderson","Taylor","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker"]
      },
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
      attributes: ["Force","Agilité","Intelligence","Charisme"],
      abilities:  ["Artisanat","Survie","Persuasion"],
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
      ethnicityLabels: {
        american:    "Américain",
        french:      "Français",
        northAfrican:"Nord-Africain",
        hispanic:    "Hispanique",
        westAfrican: "Ouest-Africain",
        indian:      "Indien",
        slavic:      "Slave",
        eastAsian:   "Asiatique",
        teen:        "Ado"
      }
    };

    // ── Config génération ────────────────────────────────
    var cfg = {
      traits:     { mundane:{min:1,max:2}, better:{min:1,max:2}, superior:{min:2,max:3}, elite:{min:2,max:4} },
      equipment:  { mundane:{min:0,max:1}, better:{min:0,max:2}, superior:{min:1,max:3}, elite:{min:2,max:4} },
      attributes: { mundane:{base:1,max:1}, better:{base:1,max:2}, superior:{base:1,max:2}, elite:{base:2,max:3} },
      abilities:  { mundane:{points:0,max:0}, better:{points:1,max:1}, superior:{points:3,max:2}, elite:{points:5,max:3} }
    };

    // ── État ─────────────────────────────────────────────
    var count = 4;
    var probs = { mundane:40, better:30, superior:20, elite:10 };
    var filtersGender = { male:true, female:true };
    var filtersAge    = { teenager:true, adult:true, elderly:true };
    var filtersEth    = { american:true, french:true, northAfrican:true, hispanic:true, westAfrican:true, indian:true, slavic:true, eastAsian:true, teen:true };

    // ── UI ───────────────────────────────────────────────
    container.innerHTML =
      '<div class="gen-panel">' +
        '<div class="gen-controls">' +
          '<div class="gen-count-wrap">' +
            '<span class="gen-lbl">Nombre de PNJ</span>' +
            '<div class="gen-seuil">' +
              '<button class="gen-seuil-btn" data-el="dec">−</button>' +
              '<span class="gen-seuil-val" data-el="count">4</span>' +
              '<button class="gen-seuil-btn" data-el="inc">+</button>' +
            '</div>' +
            '<span class="gen-hint">(1–12)</span>' +
          '</div>' +
          '<button class="gen-roll-btn" data-el="generate">⚡ Générer</button>' +
          '<button class="gen-adv-toggle" data-el="adv-toggle">Options ▾</button>' +
        '</div>' +
        '<div class="gen-advanced" data-el="advanced" style="display:none">' +
          '<div class="gen-adv-section">' +
            '<h4>Probabilités de rang</h4>' +
            '<div class="gen-prob-grid">' +
              '<div class="gen-prob-row"><span class="gen-prob-label gen-prob-label--mundane">Ordinaire</span><input type="range" min="0" max="100" step="5" value="40" data-prob="mundane" class="gen-slider"><span class="gen-prob-val" data-prob-val="mundane">40%</span></div>' +
              '<div class="gen-prob-row"><span class="gen-prob-label gen-prob-label--better">Meilleur</span><input type="range" min="0" max="100" step="5" value="30" data-prob="better" class="gen-slider"><span class="gen-prob-val" data-prob-val="better">30%</span></div>' +
              '<div class="gen-prob-row"><span class="gen-prob-label gen-prob-label--superior">Supérieur</span><input type="range" min="0" max="100" step="5" value="20" data-prob="superior" class="gen-slider"><span class="gen-prob-val" data-prob-val="superior">20%</span></div>' +
              '<div class="gen-prob-row"><span class="gen-prob-label gen-prob-label--elite">Élite</span><input type="range" min="0" max="100" step="5" value="10" data-prob="elite" class="gen-slider"><span class="gen-prob-val" data-prob-val="elite">10%</span></div>' +
              '<div class="gen-prob-total" data-el="prob-total">Total : 100%</div>' +
            '</div>' +
          '</div>' +
          '<div class="gen-adv-section">' +
            '<h4>Filtres</h4>' +
            '<div class="gen-filter-grid">' +
              '<div class="gen-filter-group">' +
                '<span class="gen-filter-title">Genre</span>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="gender-male" checked> Homme</label>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="gender-female" checked> Femme</label>' +
              '</div>' +
              '<div class="gen-filter-group">' +
                '<span class="gen-filter-title">Âge</span>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="age-teenager" checked> Adolescent (13-19)</label>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="age-adult" checked> Adulte (20-64)</label>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="age-elderly" checked> Âgé (65+)</label>' +
              '</div>' +
            '</div>' +
            '<div class="gen-filter-group">' +
              '<span class="gen-filter-title">Origines</span>' +
              '<div class="gen-ethnicity-grid">' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="eth-american" checked> Américain</label>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="eth-french" checked> Français</label>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="eth-northAfrican" checked> Nord-Africain</label>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="eth-hispanic" checked> Hispanique</label>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="eth-westAfrican" checked> Ouest-Africain</label>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="eth-indian" checked> Indien</label>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="eth-slavic" checked> Slave</label>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="eth-eastAsian" checked> Asiatique</label>' +
                '<label class="gen-filter-opt"><input type="checkbox" data-filter="eth-teen" checked> Ado</label>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="gen-grid" data-el="grid"></div>';

    // ── Éléments DOM ─────────────────────────────────────
    var countEl  = container.querySelector('[data-el="count"]');
    var gridEl   = container.querySelector('[data-el="grid"]');
    var advEl    = container.querySelector('[data-el="advanced"]');
    var advToggle = container.querySelector('[data-el="adv-toggle"]');

    // Compteur
    container.querySelector('[data-el="dec"]').addEventListener('click', function () {
      if (count > 1) countEl.textContent = --count;
    });
    container.querySelector('[data-el="inc"]').addEventListener('click', function () {
      if (count < 12) countEl.textContent = ++count;
    });

    // Toggle options avancées
    advToggle.addEventListener('click', function () {
      var open = advEl.style.display !== 'none';
      advEl.style.display = open ? 'none' : 'grid';
      advToggle.textContent = open ? 'Options ▾' : 'Options ▴';
    });

    // Sliders de probabilité
    container.querySelectorAll('[data-prob]').forEach(function (slider) {
      slider.addEventListener('input', function () {
        var key = this.dataset.prob;
        probs[key] = parseInt(this.value);
        container.querySelector('[data-prob-val="' + key + '"]').textContent = probs[key] + '%';
        var total = probs.mundane + probs.better + probs.superior + probs.elite;
        var totalEl = container.querySelector('[data-el="prob-total"]');
        totalEl.textContent = 'Total : ' + total + '%';
        totalEl.style.color = total === 100 ? '' : 'var(--rogue-intensity-light)';
      });
    });

    // Filtres
    container.querySelectorAll('[data-filter]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var key = this.dataset.filter;
        if (key === 'gender-male')      filtersGender.male     = this.checked;
        else if (key === 'gender-female') filtersGender.female = this.checked;
        else if (key === 'age-teenager')  filtersAge.teenager  = this.checked;
        else if (key === 'age-adult')     filtersAge.adult     = this.checked;
        else if (key === 'age-elderly')   filtersAge.elderly   = this.checked;
        else if (key.startsWith('eth-'))  filtersEth[key.replace('eth-','')] = this.checked;
      });
    });

    // Bouton générer
    container.querySelector('[data-el="generate"]').addEventListener('click', function () {
      gridEl.innerHTML = '';
      for (var i = 0; i < count; i++) {
        try { gridEl.appendChild(buildCard(createNPC(i + 1))); }
        catch (e) { console.error('Erreur PNJ #' + (i+1), e); }
      }
    });

    // ── Utilitaires ──────────────────────────────────────
    function randItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function shuffle(arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

    // ── Génération ───────────────────────────────────────
    function getRarity() {
      var total = probs.mundane + probs.better + probs.superior + probs.elite;
      if (total === 0) return 'mundane';
      var r = Math.floor(Math.random() * total);
      if (r < probs.mundane) return 'mundane';
      if (r < probs.mundane + probs.better) return 'better';
      if (r < probs.mundane + probs.better + probs.superior) return 'superior';
      return 'elite';
    }

    function getName() {
      var selected = Object.keys(filtersEth).filter(function (k) { return filtersEth[k]; });
      if (!selected.length) selected = Object.keys(filtersEth);
      var ethnicity = randItem(selected);

      var gender;
      if (filtersGender.male && filtersGender.female) gender = Math.random() > 0.5 ? 'male' : 'female';
      else if (filtersGender.male) gender = 'male';
      else gender = 'female';

      var fns = DB.firstNames[ethnicity] && DB.firstNames[ethnicity][gender];
      var lns = DB.lastNames[ethnicity];
      if (!fns || !lns) return { name: 'Inconnu', gender: gender, ethnicity: ethnicity };
      return { name: randItem(fns) + ' ' + randItem(lns), gender: gender, ethnicity: ethnicity };
    }

    function getAge(traits) {
      var ag = DB.traitGroups.age;
      if (traits.indexOf(ag[0]) !== -1) return randInt(13, 19);
      if (traits.indexOf(ag[1]) !== -1) return randInt(65, 89);
      return randInt(20, 64);
    }

    function getOccupation(rarity) {
      var max = { mundane:1, better:2, superior:3, elite:4 }[rarity];
      var eli = DB.occupations.filter(function (o) { return o.difficulty <= max; });
      return randItem(eli);
    }

    function compatible(existing, newT) {
      var ic = DB.incompatibleTraits;
      var gr = DB.traitGroups;
      for (var i = 0; i < existing.length; i++) {
        var e = existing[i];
        if (ic[e] && ic[e].indexOf(newT) !== -1) return false;
        if (ic[newT] && ic[newT].indexOf(e) !== -1) return false;
        for (var g in gr) {
          if (gr[g].indexOf(e) !== -1 && gr[g].indexOf(newT) !== -1 && e !== newT) return false;
        }
      }
      return true;
    }

    function getTraits(rarity) {
      var s = cfg.traits[rarity];
      var n = randInt(s.min, s.max);
      var ag = DB.traitGroups.age;
      var pool = shuffle(DB.traits.slice());
      if (!filtersAge.teenager) pool = pool.filter(function (t) { return t.name !== ag[0]; });
      if (!filtersAge.elderly)  pool = pool.filter(function (t) { return t.name !== ag[1]; });

      var sel = [];
      // Forcer le trait d'âge si une seule catégorie sélectionnée
      if (filtersAge.teenager && !filtersAge.adult && !filtersAge.elderly) {
        var ft = DB.traits.filter(function (t) { return t.name === ag[0]; })[0];
        if (ft) sel.push(ft);
      } else if (!filtersAge.teenager && !filtersAge.adult && filtersAge.elderly) {
        var ft = DB.traits.filter(function (t) { return t.name === ag[1]; })[0];
        if (ft) sel.push(ft);
      }

      for (var i = 0; i < pool.length && sel.length < n; i++) {
        var tr = pool[i];
        if (sel.filter(function (s) { return s.name === tr.name; }).length) continue;
        if (compatible(sel.map(function (s) { return s.name; }), tr.name)) sel.push(tr);
      }
      return sel;
    }

    function getEquipment(occ, traits) {
      var eq = occ.equipment.slice();
      traits.forEach(function (t) {
        if (t.equipment && t.equipment[0] && eq.indexOf(t.equipment[0]) === -1) eq.push(t.equipment[0]);
      });
      var bonus = shuffle(DB.equipment.filter(function (e) { return eq.indexOf(e) === -1; })).slice(0, 2);
      bonus.forEach(function (b) { eq.push(b); });
      return eq;
    }

    function genAttributes(rarity) {
      var s = cfg.attributes[rarity];
      var a = {};
      DB.attributes.forEach(function (k) { a[k] = s.base; });
      var pts = { mundane:0, better:2, superior:4, elite:5 }[rarity];
      var tries = 0;
      while (pts > 0 && tries++ < 100) {
        var k = randItem(DB.attributes);
        if (a[k] < s.max) { a[k]++; pts--; }
      }
      return a;
    }

    function genAbilities(rarity) {
      var s = cfg.abilities[rarity];
      var a = {};
      DB.abilities.forEach(function (k) { a[k] = 0; });
      var pts = s.points;
      var tries = 0;
      while (pts > 0 && tries++ < 100) {
        var k = randItem(DB.abilities);
        if (a[k] < s.max) { a[k]++; pts--; }
      }
      return a;
    }

    function createNPC(id) {
      var rarity = getRarity();
      var nd = getName();
      var traits = getTraits(rarity);
      var occ = getOccupation(rarity);
      return {
        id: id, name: nd.name, gender: nd.gender, ethnicity: nd.ethnicity,
        age: getAge(traits.map(function (t) { return t.name; })),
        occupation: occ.name, rarity: rarity,
        traits: traits.map(function (t) { return t.name; }),
        equipment: getEquipment(occ, traits),
        attributes: genAttributes(rarity),
        abilities: genAbilities(rarity)
      };
    }

    // ── Rendu carte ──────────────────────────────────────
    function buildCard(npc) {
      var labels = { mundane:'Ordinaire', better:'Meilleur', superior:'Supérieur', elite:'Élite' };
      var card = document.createElement('div');
      card.className = 'gen-card gen-card--' + npc.rarity;

      var tagsHtml = npc.traits.map(function (t) {
        return '<span class="gen-tag">' + t + '</span>';
      }).join('');

      var eqVisible = npc.equipment.slice(0, 6);
      var eqHidden  = npc.equipment.length - 6;
      var eqHtml = eqVisible.map(function (e) {
        return '<span class="gen-tag gen-tag--eq">' + e + '</span>';
      }).join('');
      if (eqHidden > 0) eqHtml += '<span class="gen-tag gen-tag--more">+' + eqHidden + '</span>';

      var attHtml = Object.keys(npc.attributes).map(function (k) {
        return '<div class="gen-stat"><span class="gen-stat__key">' + k + '</span><span class="gen-stat__val">' + npc.attributes[k] + '</span></div>';
      }).join('');

      var ablHtml = Object.keys(npc.abilities).map(function (k) {
        var v = npc.abilities[k];
        return '<div class="gen-stat"><span class="gen-stat__key">' + k + '</span><span class="gen-stat__val">' + (v >= 0 ? '+' : '') + v + '</span></div>';
      }).join('');

      var seed = 'npc-' + npc.id + '-' + npc.ethnicity + '-' + npc.gender + '-' + Date.now();
      var ethLabel = DB.ethnicityLabels[npc.ethnicity] || npc.ethnicity;

      card.innerHTML =
        '<div class="gen-card__img">' +
          '<img src="https://picsum.photos/seed/' + seed + '/240/120" alt="" loading="lazy">' +
          '<span class="gen-badge gen-badge--' + npc.rarity + '">' + labels[npc.rarity] + '</span>' +
          '<span class="gen-eth-badge">' + ethLabel + '</span>' +
        '</div>' +
        '<div class="gen-card__body">' +
          '<div class="gen-card__head">' +
            '<strong class="gen-card__name">' + npc.name + '</strong>' +
            '<span class="gen-card__meta">' + (npc.gender === 'male' ? '♂' : '♀') + ' · ' + npc.age + ' ans</span>' +
          '</div>' +
          '<div class="gen-card__occ">' + npc.occupation + '</div>' +
          '<div class="gen-card__section"><span class="gen-card__section-title">Traits</span><div class="gen-tags">' + tagsHtml + '</div></div>' +
          '<div class="gen-card__section"><span class="gen-card__section-title">Équipement</span><div class="gen-tags">' + eqHtml + '</div></div>' +
          '<div class="gen-card__section"><span class="gen-card__section-title">Caractéristiques</span><div class="gen-stats">' + attHtml + '</div></div>' +
          '<div class="gen-card__section"><span class="gen-card__section-title">Compétences</span><div class="gen-stats">' + ablHtml + '</div></div>' +
        '</div>';

      return card;
    }
  }

  /* ══════════════════════════════════════════════════════
     INIT — active les composants au chargement
  ══════════════════════════════════════════════════════ */

  function init() {
    document.querySelectorAll('.rogue-roller').forEach(buildRoller);
    document.querySelectorAll('.rogue-roller-adv').forEach(buildAdvantageRoller);
    document.querySelectorAll('.rogue-result-table').forEach(buildResultTable);
    document.querySelectorAll('.rogue-sim').forEach(buildSimulator);
    document.querySelectorAll('.rogue-gen').forEach(buildNPCGenerator);
    initStickyHeaders();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // MkDocs Material recharge les pages via XHR (navigation SPA)
  // On réactive les composants après chaque navigation
  if (typeof document$ !== 'undefined') {
    document$.subscribe(init);
  }

})();
