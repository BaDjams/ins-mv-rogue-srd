# Armes de mélée

Le Code de dégâts des armes de mélée est **FOR + Modificateur** (ou AGI pour les armes finesse : rapière, fleuret, wakizashi, nunchaku). Les armes d'artisanat et de survie utilisent la compétence indiquée plutôt que Mélée.

<div id="table-melee">
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1rem;">
    <input id="search-melee" type="text" placeholder="Rechercher..." style="flex:1;min-width:160px;padding:6px 10px;background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);border-radius:6px;color:var(--color-text-primary);font-size:13px;">
    <select id="filter-comp" style="padding:6px 10px;background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);border-radius:6px;color:var(--color-text-primary);font-size:13px;">
      <option value="">Toutes compétences</option>
      <option>Mélée</option>
      <option>Artisanat</option>
      <option>Survie</option>
      <option>Artisanat ou survie</option>
    </select>
    <select id="filter-maniement" style="padding:6px 10px;background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);border-radius:6px;color:var(--color-text-primary);font-size:13px;">
      <option value="">1 et 2 mains</option>
      <option>1 main</option>
      <option>2 mains</option>
      <option>1-2 mains</option>
    </select>
  </div>
  <div style="overflow-x:auto;">
  <table id="tbl-melee" class="rogue-equip-table" style="width:100%;font-size:13px;border-collapse:collapse;">
    <thead>
      <tr style="background:var(--color-background-secondary);text-align:left;">
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);">Nom</th>
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);">Compétence</th>
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);" title="Code de dégâts = FOR + modificateur (ou AGI pour armes finesse)">Dégâts</th>
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);" title="Type de dégâts : contondant, tranchant ou perforant">Type</th>
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);">Maniement</th>
        <th style="padding:8px 10px;border-bottom:1px solid var(--color-border-tertiary);">Notes</th>
      </tr>
    </thead>
    <tbody id="tbody-melee"></tbody>
  </table>
  </div>
  <div id="count-melee" style="font-size:12px;color:var(--color-text-secondary);margin-top:8px;"></div>
</div>

<script>
var DATA_MELEE = [{"Nom": "Coup de poing/pied/coude/genou/tête sans arme", "compétence utilisée": "Mélée", "type de dégats": "Contondant", "maniement": "1 main", "Modificateur de dégats": "+0", "Notes": ""}, {"Nom": "Couteau de poche", "compétence utilisée": "Mélée", "type de dégats": "perforant/tranchant", "maniement": "1 main", "Modificateur de dégats": "+1", "Notes": ""}, {"Nom": "Couteau de chasse", "compétence utilisée": "Mélée", "type de dégats": "perforant/tranchant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Baïonnette montée", "compétence utilisée": "Mélée", "type de dégats": "perforant", "maniement": "2 mains", "Modificateur de dégats": "+3", "Notes": "Quand la baïonnette est montée sur un fusil, le personnage peut utiliser la compétence de son choix entre \"Corps à corps\" et \"Fusils\"."}, {"Nom": "Couteau de tranchée", "compétence utilisée": "Mélée", "type de dégats": "perforant/tranchant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Épée courte", "compétence utilisée": "Mélée", "type de dégats": "tranchant/perforant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Épée longue", "compétence utilisée": "Mélée", "type de dégats": "tranchant/perforant", "maniement": "1-2 mains", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Épée bâtarde", "compétence utilisée": "Mélée", "type de dégats": "tranchant/perforant", "maniement": "1-2 mains", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Épée à deux mains", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "2 mains", "Modificateur de dégats": "+4", "Notes": ""}, {"Nom": "Rapière", "compétence utilisée": "Mélée", "type de dégats": "perforant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Estoc", "compétence utilisée": "Mélée", "type de dégats": "perforant", "maniement": "2 mains", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Fleuret", "compétence utilisée": "Mélée", "type de dégats": "perforant", "maniement": "1 main", "Modificateur de dégats": "+ 2", "Notes": ""}, {"Nom": "Cimeterre", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "1 main", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Claymore écossaise", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "2 mains", "Modificateur de dégats": "+4", "Notes": ""}, {"Nom": "Flamberge", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "2 mains", "Modificateur de dégats": "+4", "Notes": ""}, {"Nom": "Sabre d'abordage", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "1 main", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Coutelas de marine", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Sabre de cavalerie", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "1 main", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Machette", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Hache de guerre", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "2 mains", "Modificateur de dégats": "+4", "Notes": ""}, {"Nom": "Matraque", "compétence utilisée": "Mélée", "type de dégats": "contondant", "maniement": "1 main", "Modificateur de dégats": "+1", "Notes": ""}, {"Nom": "Tonfa", "compétence utilisée": "Mélée", "type de dégats": "contondant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Nunchaku", "compétence utilisée": "Mélée", "type de dégats": "contondant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Wakizashi", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Katana", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "2 mains", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Masse d'armes", "compétence utilisée": "Mélée", "type de dégats": "contondant", "maniement": "1 main", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Hallebarde", "compétence utilisée": "Mélée", "type de dégats": "tranchant/perforant", "maniement": "2 mains", "Modificateur de dégats": "+4", "Notes": ""}, {"Nom": "Lance", "compétence utilisée": "Mélée", "type de dégats": "perforant", "maniement": "2 mains", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Fléau d'armes", "compétence utilisée": "Mélée", "type de dégats": "contondant", "maniement": "2 mains", "Modificateur de dégats": "+4", "Notes": ""}, {"Nom": "Marteau de guerre", "compétence utilisée": "Mélée", "type de dégats": "contondant", "maniement": "2 mains", "Modificateur de dégats": "+4", "Notes": ""}, {"Nom": "Nodachi", "compétence utilisée": "Mélée", "type de dégats": "tranchant", "maniement": "2 mains", "Modificateur de dégats": "+4", "Notes": ""}, {"Nom": "Tronçonneuse", "compétence utilisée": "Artisanat", "type de dégats": "tranchant", "maniement": "2 mains", "Modificateur de dégats": "+5", "Notes": ""}, {"Nom": "Scie circulaire", "compétence utilisée": "Artisanat", "type de dégats": "tranchant", "maniement": "2 mains", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Cloueuse pneumatique", "compétence utilisée": "Artisanat", "type de dégats": "perforant", "maniement": "2 mains", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Perceuse électrique", "compétence utilisée": "Artisanat", "type de dégats": "perforant", "maniement": "1 main", "Modificateur de dégats": "+1", "Notes": ""}, {"Nom": "Meuleuse d'angle", "compétence utilisée": "Artisanat", "type de dégats": "tranchant", "maniement": "1 main", "Modificateur de dégats": "", "Notes": ""}, {"Nom": "Débroussailleuse", "compétence utilisée": "Survie", "type de dégats": "Tranchant", "maniement": "2 mains", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Sécateur hydraulique", "compétence utilisée": "Survie", "type de dégats": "Tranchant", "maniement": "2 mains", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Faux", "compétence utilisée": "Survie", "type de dégats": "Tranchant", "maniement": "2 mains", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Bêche", "compétence utilisée": "Survie", "type de dégats": "contondant/tranchant", "maniement": "2 mains", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Pioche", "compétence utilisée": "Survie", "type de dégats": "perforant", "maniement": "2 mains", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Piolet", "compétence utilisée": "Survie", "type de dégats": "perforant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Fourche", "compétence utilisée": "Survie", "type de dégats": "perforant", "maniement": "2 mains", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Serpe", "compétence utilisée": "Survie", "type de dégats": "Perforant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Sécateur manuel", "compétence utilisée": "Survie", "type de dégats": "Tranchant", "maniement": "1 main", "Modificateur de dégats": "+1", "Notes": ""}, {"Nom": "Marteau de charpentier", "compétence utilisée": "Artisanat", "type de dégats": "contondant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Pied de biche", "compétence utilisée": "Artisanat ou survie", "type de dégats": "contondant/perforant", "maniement": "2 mains", "Modificateur de dégats": "+2", "Notes": ""}, {"Nom": "Masse", "compétence utilisée": "Artisanat ou survie", "type de dégats": "contondant", "maniement": "2 mains", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Hache de bûcheron", "compétence utilisée": "Artisanat ou survie", "type de dégats": "Tranchant", "maniement": "2 mains", "Modificateur de dégats": "+3", "Notes": ""}, {"Nom": "Ciseau à bois", "compétence utilisée": "Artisanat", "type de dégats": "perforant", "maniement": "1 main", "Modificateur de dégats": "+1", "Notes": ""}, {"Nom": "Scie à bois", "compétence utilisée": "Artisanat", "type de dégats": "Tranchant", "maniement": "1 main", "Modificateur de dégats": "+2", "Notes": ""}];
function renderMelee() {
  var search = document.getElementById('search-melee').value.toLowerCase();
  var comp = document.getElementById('filter-comp').value;
  var maniement = document.getElementById('filter-maniement').value;
  var filtered = DATA_MELEE.filter(function(r) {
    return (!search || r["Nom"].toLowerCase().includes(search))
      && (!comp || r["compétence utilisée"] === comp)
      && (!maniement || r["maniement"] === maniement);
  });
  var tbody = document.getElementById('tbody-melee');
  tbody.innerHTML = filtered.map(function(r) {
    return '<tr style="border-bottom:0.5px solid var(--color-border-tertiary);">'
      + '<td style="padding:7px 10px;font-weight:500;color:var(--color-text-primary);">' + r["Nom"] + '</td>'
      + '<td style="padding:7px 10px;color:var(--color-text-secondary);">' + r["compétence utilisée"] + '</td>'
      + '<td style="padding:7px 10px;font-weight:500;color:#ff8c42;">' + r["Modificateur de dégats"] + '</td>'
      + '<td style="padding:7px 10px;color:var(--color-text-secondary);font-size:12px;">' + r["type de dégats"] + '</td>'
      + '<td style="padding:7px 10px;color:var(--color-text-secondary);">' + r["maniement"] + '</td>'
      + '<td style="padding:7px 10px;color:var(--color-text-secondary);font-size:12px;font-style:italic;">' + r["Notes"] + '</td>'
      + '</tr>';
  }).join('');
  document.getElementById('count-melee').textContent = filtered.length + ' arme(s) affichée(s)';
}
document.getElementById('search-melee').addEventListener('input', renderMelee);
document.getElementById('filter-comp').addEventListener('change', renderMelee);
document.getElementById('filter-maniement').addEventListener('change', renderMelee);
renderMelee();
</script>
