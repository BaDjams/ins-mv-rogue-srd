# Armes à distance

Arcs, arbalètes, armes de jet et armes de siège. Le modificateur de dégâts s'ajoute à FOR pour les armes basées sur la force physique. Les armes de siège nécessitent plusieurs opérateurs et une installation fixe.

<div id="table-dist">
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1rem;">
    <input id="search-dist" type="text" placeholder="Rechercher..." style="flex:1;min-width:160px;padding:6px 10px;background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);border-radius:6px;color:var(--color-text-primary);font-size:13px;">
    <select id="filter-comp-dist" style="padding:6px 10px;background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);border-radius:6px;color:var(--color-text-primary);font-size:13px;">
      <option value="">Toutes compétences</option>
      <option>Tir à l'arc</option>
      <option>Arbalète</option>
      <option>Armes de jet</option>
      <option>Armes de siège</option>
    </select>
  </div>
  <div style="overflow-x:auto;">
  <table id="tbl-dist" class="rogue-equip-table" style="width:100%;font-size:13px;border-collapse:collapse;">
    <thead>
      <tr style="background:var(--color-background-secondary);text-align:left;">
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);">Nom</th>
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);">Compétence</th>
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);" title="FOR + modificateur (ou valeur fixe pour arbalètes/armes de siège)">Dégâts</th>
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);" title="Type de dégâts infligés">Type</th>
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);">Maniement</th>
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);" title="Distance efficace en mètres">Portée</th>
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);">Notes</th>
      </tr>
    </thead>
    <tbody id="tbody-dist"></tbody>
  </table>
  </div>
  <div id="count-dist" style="font-size:12px;color:var(--color-text-secondary);margin-top:8px;"></div>
</div>

<script>
var DATA_DIST = [{"Nom": "Arc court", "Compétence utilisée": "Tir à l'arc", "Type de dégâts": "Perforant", "Maniement": "2 mains", "Modificateur de dégâts": "FOR + 1", "Munitions": "Flèches", "Portée utile (m)": "20-30", "Notes": ""}, {"Nom": "Arc long", "Compétence utilisée": "Tir à l'arc", "Type de dégâts": "Perforant", "Maniement": "2 mains", "Modificateur de dégâts": "FOR + 2", "Munitions": "Flèches", "Portée utile (m)": "40-60", "Notes": ""}, {"Nom": "Arc de chasse", "Compétence utilisée": "Tir à l'arc", "Type de dégâts": "Perforant", "Maniement": "2 mains", "Modificateur de dégâts": "FOR + 2", "Munitions": "Flèches", "Portée utile (m)": "40-60", "Notes": ""}, {"Nom": "Arc composite", "Compétence utilisée": "Tir à l'arc", "Type de dégâts": "Perforant", "Maniement": "2 mains", "Modificateur de dégâts": "FOR + 3", "Munitions": "Flèches", "Portée utile (m)": "60-80", "Notes": ""}, {"Nom": "Arbalète légère", "Compétence utilisée": "Arbalète", "Type de dégâts": "Perforant", "Maniement": "2 mains", "Modificateur de dégâts": 4, "Munitions": "Carreaux d'arbalète", "Portée utile (m)": "30-50", "Notes": ""}, {"Nom": "Arbalète lourde", "Compétence utilisée": "Arbalète", "Type de dégâts": "Perforant", "Maniement": "2 mains", "Modificateur de dégâts": 5, "Munitions": "Carreaux d'arbalète", "Portée utile (m)": "60-80", "Notes": ""}, {"Nom": "Arbalète de poing", "Compétence utilisée": "Arbalète", "Type de dégâts": "Perforant", "Maniement": "1 main", "Modificateur de dégâts": 3, "Munitions": "Carreaux d'arbalète", "Portée utile (m)": "10-20", "Notes": ""}, {"Nom": "Fronde", "Compétence utilisée": "Armes de jet", "Type de dégâts": "Contondant", "Maniement": "1 main", "Modificateur de dégâts": "FOR + 0", "Munitions": "Pierres/billes", "Portée utile (m)": "10-20", "Notes": ""}, {"Nom": "Javelot", "Compétence utilisée": "Armes de jet", "Type de dégâts": "Perforant", "Maniement": "1 main", "Modificateur de dégâts": "FOR + 1", "Munitions": "Javelots", "Portée utile (m)": "15-25", "Notes": ""}, {"Nom": "Boomerang", "Compétence utilisée": "Armes de jet", "Type de dégâts": "Contondant", "Maniement": "1 main", "Modificateur de dégâts": "FOR + 0", "Munitions": "Boomerang", "Portée utile (m)": "10-20", "Notes": "Revient au lanceur si la cible n'est pas touchée ou si une compétence est réussie."}, {"Nom": "Etoile de lancer (Shuriken)", "Compétence utilisée": "Armes de jet", "Type de dégâts": "Tranchant", "Maniement": "1 main", "Modificateur de dégâts": "FOR + 0", "Munitions": "Etoiles de lancer", "Portée utile (m)": "5-10", "Notes": "Peut être lancé en rafale."}, {"Nom": "Couteau de lancer", "Compétence utilisée": "Armes de jet", "Type de dégâts": "Perforant", "Maniement": "1 main", "Modificateur de dégâts": "FOR + 1", "Munitions": "Couteaux de lancer", "Portée utile (m)": "10-15", "Notes": ""}, {"Nom": "Hachette de lancer", "Compétence utilisée": "Armes de jet", "Type de dégâts": "Tranchant", "Maniement": "1 main", "Modificateur de dégâts": "FOR + 1", "Munitions": "Hachettes de lancer", "Portée utile (m)": "10-15", "Notes": ""}, {"Nom": "Sarbacane", "Compétence utilisée": "Armes de jet", "Type de dégâts": "Perforant", "Maniement": "1 main", "Modificateur de dégâts": 0, "Munitions": "Fléchettes", "Portée utile (m)": "5-10", "Notes": "Les fléchettes peuvent être empoisonnées."}, {"Nom": "Lance-pierres (moderne)", "Compétence utilisée": "Armes de jet", "Type de dégâts": "Contondant", "Maniement": "1 main", "Modificateur de dégâts": "FOR + 1", "Munitions": "Billes d'acier/pierres", "Portée utile (m)": "15-30", "Notes": ""}, {"Nom": "Filet de capture", "Compétence utilisée": "Armes de jet", "Type de dégâts": "Aucun", "Maniement": "1-2 mains", "Modificateur de dégâts": 0, "Munitions": "Filet", "Portée utile (m)": "5-10", "Notes": "Immobilise la cible sur une réussite, ne cause pas de dégâts."}, {"Nom": "Harpon", "Compétence utilisée": "Armes de jet", "Type de dégâts": "Perforant", "Maniement": "2 mains", "Modificateur de dégâts": "FOR + 3", "Munitions": "Harpons", "Portée utile (m)": "10-20", "Notes": "Peut être utilisé pour attirer une cible."}, {"Nom": "Bolas", "Compétence utilisée": "Armes de jet", "Type de dégâts": "Contondant", "Maniement": "1 main", "Modificateur de dégâts": "FOR + 0", "Munitions": "Bolas", "Portée utile (m)": "5-10", "Notes": "Immobilise la cible sur une réussite, ne cause pas de dégâts."}, {"Nom": "Baliste", "Compétence utilisée": "Armes de siège", "Type de dégâts": "Perforant", "Maniement": "2 mains", "Modificateur de dégâts": 5, "Munitions": "Carreaux de baliste", "Portée utile (m)": "100-300", "Notes": "Arme de siège lourde, nécessite une installation et plusieurs opérateurs. (Portée de siège, pas de chasse)"}, {"Nom": "Catapulte", "Compétence utilisée": "Armes de siège", "Type de dégâts": "Contondant", "Maniement": "2 mains", "Modificateur de dégâts": 6, "Munitions": "Pierres/projectiles lourds", "Portée utile (m)": "150-400", "Notes": "Arme de siège lourde, nécessite une installation et plusieurs opérateurs. Idéale pour détruire des structures. (Portée de siège, pas de chasse)"}, {"Nom": "Trébuchet", "Compétence utilisée": "Armes de siège", "Type de dégâts": "Contondant", "Maniement": "2 mains", "Modificateur de dégâts": 7, "Munitions": "Pierres/projectiles très lourds", "Portée utile (m)": "200-500", "Notes": "Arme de siège très lourde, nécessite une installation complexe et une grande équipe. Portée et puissance supérieures à la catapulte. (Portée de siège, pas de chasse)"}];
function renderDist() {
  var search = document.getElementById('search-dist').value.toLowerCase();
  var comp = document.getElementById('filter-comp-dist').value;
  var filtered = DATA_DIST.filter(function(r) {
    return (!search || r["Nom"].toLowerCase().includes(search))
      && (!comp || r["Compétence utilisée"] === comp);
  });
  var tbody = document.getElementById('tbody-dist');
  tbody.innerHTML = filtered.map(function(r) {
    return '<tr style="border-bottom:0.5px solid var(--color-border-tertiary);">'
      + '<td style="padding:7px 10px;font-weight:500;color:var(--color-text-primary);">' + r["Nom"] + '</td>'
      + '<td style="padding:7px 10px;color:var(--color-text-secondary);">' + r["Compétence utilisée"] + '</td>'
      + '<td style="padding:7px 10px;font-weight:500;color:#ff8c42;">' + r["Modificateur de dégâts"] + '</td>'
      + '<td style="padding:7px 10px;color:var(--color-text-secondary);font-size:12px;">' + r["Type de dégâts"] + '</td>'
      + '<td style="padding:7px 10px;color:var(--color-text-secondary);">' + r["Maniement"] + '</td>'
      + '<td style="padding:7px 10px;color:var(--color-text-secondary);">' + r["Portée utile (m)"] + '</td>'
      + '<td style="padding:7px 10px;color:var(--color-text-secondary);font-size:12px;font-style:italic;">' + r["Notes"] + '</td>'
      + '</tr>';
  }).join('');
  document.getElementById('count-dist').textContent = filtered.length + ' arme(s) affichée(s)';
}
document.getElementById('search-dist').addEventListener('input', renderDist);
document.getElementById('filter-comp-dist').addEventListener('change', renderDist);
renderDist();
</script>
