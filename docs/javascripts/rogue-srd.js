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
     INIT — active les composants au chargement
  ══════════════════════════════════════════════════════ */

  function init() {
    document.querySelectorAll('.rogue-roller').forEach(buildRoller);
    document.querySelectorAll('.rogue-roller-adv').forEach(buildAdvantageRoller);
    document.querySelectorAll('.rogue-result-table').forEach(buildResultTable);
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
