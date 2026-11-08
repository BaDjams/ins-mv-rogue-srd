/* Fiche A4 dédiée à l'impression et à « Enregistrer en PDF » du navigateur.
 * Même rendu sur papier et dans le dialogue d'impression Android / desktop.
 */
import {advancements,HOST_ATTRIBUTES,SOUL_ATTRIBUTES,validateCharacter} from './rogue-character-model.mjs';
const A_LABEL={PUI:'Puissance',INF:'Influence',RES:'Résolution',CLA:'Clairvoyance'};
const H_LABEL={FOR:'Force',AGI:'Agilité',VIG:'Vigueur',PER:'Perception'};
const QUALITY={mundane:'Commun',better:'Expérimenté',superior:'Professionnel',
  elite:'Vétéran',legendary:'Élite'};
function esc(v){
  return String(v??'').replace(/[&<>"']/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}
function section(title,body){return '<section class="rc-print-section"><h2>'+esc(title)+'</h2>'+body+'</section>';}
function empty(value){return value?esc(value):'<span class="rc-print-muted">Non renseigné</span>';}
function grid(attrs,labels){
  return '<table class="rc-print-attributes"><tbody>'+Object.entries(labels)
    .map(([k,name],i,rows)=>i%2===0?'<tr>'+
      [k,rows[i+1]?.[0]].filter(Boolean).map(key=>
        '<th scope="row">'+esc(labels[key])+'</th><td>'+esc(attrs?.[key]??'—')+'</td>').join('')+
      '</tr>':'').join('')+'</tbody></table>';
}
function list(values,emptyText='—'){
  const names=(values||[]).filter(Boolean);
  return names.length?'<ul class="rc-print-list">'+names.map(s=>'<li>'+esc(s)+'</li>').join('')+
    '</ul>':'<p class="rc-print-muted">'+emptyText+'</p>';
}
function powerRows(soul){
  const p=soul.powers||{};
  const rows=[['Intrinsèque','Présence Surnaturelle'],['Supérieur',p.hierarchy],
    ['Rôle',p.role],['Assigné',p.assigned],...(p.additional||[]).map((v,i)=>['Acquis n°'+(i+1),v])];
  return '<table class="rc-print-powers"><tbody>'+rows.map(([name,value])=>
    '<tr><th scope="row">'+esc(name)+'</th><td>'+empty(value)+'</td></tr>').join('')+
    '</tbody></table>';
}
function progressRows(items){
  if(!items.length)return '<p class="rc-print-muted">Aucune progression enregistrée</p>';
  return '<table class="rc-print-powers"><thead><tr><th>Date</th><th>Évolution</th><th>Nature</th></tr></thead><tbody>'+
    items.map(p=>'<tr><td>'+esc((p.date||'').slice(0,10))+'</td><td>'+
      esc(p.detail||p.type)+'</td><td>'+esc(p.type==='grant'?'Accordée':p.type==='unlockResidual'?'Exception':'Utilisée')+'</td></tr>').join('')+
      '</tbody></table>';
}
function hostSection(host){
  if(!host)return section('Hôte humain',
    '<p class="rc-print-muted">Aucun hôte incarné. Sélectionnez-en un dans un booster.</p>');
  const skills=Object.entries(host.skills||{}).sort((a,b)=>a[0].localeCompare(b[0],'fr'));
  const skillsHtml=skills.length
    ?'<table class="rc-print-powers"><tbody>'+skills.map(([name,bonus])=>
      '<tr><th scope="row">'+esc(name)+'</th><td class="rc-print-value">'+
      esc(bonus===-1?'Incompétent':('+'+bonus))+'</td></tr>').join('')+'</tbody></table>'
    :'<p class="rc-print-muted">Aucune compétence renseignée</p>';
  const picture=typeof host.picture==='string'&&(
    /^https:\/\//i.test(host.picture)||host.picture.startsWith('/ins-mv-rogue-srd/images/'))
    ?'<img class="rc-print-host-portrait" alt="" src="'+esc(host.picture)+'">':'';
  return section('Hôte actuel — '+host.name,
    picture+
    '<div class="rc-print-subtitle">'+esc(host.occupation||'')+
      (Number.isInteger(host.age)?' · '+esc(host.age)+' ans':'')+
      (host.quality?' · '+esc(QUALITY[host.quality]||host.quality):'')+'</div>'+
    '<h3>Caractéristiques physiques</h3>'+grid(host.attributes,H_LABEL)+
    '<div class="rc-print-two-col"><div><h3>Compétences humaines</h3>'+skillsHtml+'</div>'+
    '<div><h3>Traits de l’hôte</h3>'+list(host.traits)+
    '<h3>Matériel et équipement</h3>'+list(host.equipment)+'</div></div>'
  );
}
export function characterPrintHTML(character){
  const c=validateCharacter(character),s=c.soul,progress=advancements(c);
  const nature=s.nature==='angel'?'ANGE':'DÉMON';
  return '<article class="rc-print-document">'+
    '<header class="rc-print-header"><div class="rc-print-brand">INS/MV · ROGUE</div>'+
      '<div class="rc-print-heading"><div><span class="rc-print-kicker">DOSSIER D’INCARNATION · '+nature+'</span>'+
      '<h1>'+esc(s.name)+'</h1><p>'+esc(s.superior||'Supérieur non renseigné')+
      (s.role?' · '+esc(s.role):'')+'</p></div>'+
      '<div class="rc-print-rank"><b>RANG CÉLESTE</b><strong>'+esc(s.rank)+'</strong></div></div>'+
    '</header>'+
    '<div class="rc-print-body">'+
      '<div class="rc-print-two-col">'+
        '<div>'+section('Attributs de l’âme',grid(s.attributes,A_LABEL))+'</div>'+
        '<div>'+section('Dossier de l’âme',
          '<dl class="rc-print-definitions"><dt>Nature</dt><dd>'+nature+'</dd>'+
          '<dt>Position</dt><dd>'+empty(s.hierarchyStatus)+'</dd>'+
          '<dt>Concept</dt><dd>'+empty(s.concept)+'</dd>'+
          '<dt>Incarnations utilisées</dt><dd>'+esc(c.incarnationsUsed||0)+
          ' / '+esc(s.rank)+'</dd></dl>')+'</div>'+
      '</div>'+
      section('Pouvoirs surnaturels',powerRows(s))+
      section('Traits d’âme',list(s.traits,'Traits d’âme non renseignés'))+
      section('Compétences résiduelles',list(
        Object.entries(s.residualSkills||{}).map(([name,n])=>name+' +'+n),
        'Aucune compétence résiduelle'
      ))+
      '<div class="rc-print-two-col"><div>'+section('Objectifs et motivations',
        '<dl class="rc-print-definitions"><dt>Objectif</dt><dd>'+empty(s.objective)+
        '</dd><dt>Motivation</dt><dd>'+empty(s.motivation)+'</dd>'+
        '<dt>Liens</dt><dd>'+empty(s.links)+'</dd></dl>')+'</div>'+
      '<div>'+section('Progressions du MJ',
        '<div class="rc-print-xp"><div><span>Accordées</span><strong>'+progress.granted+
        '</strong></div><div><span>Utilisées</span><strong>'+progress.used+
        '</strong></div><div><span>Disponibles</span><strong>'+progress.available+
        '</strong></div></div>')+'</div></div>'+
      hostSection(c.host)+
      (c.hostHistory.length?section('Hôtes précédents',list(
        c.hostHistory.map(x=>x.host?.name).filter(Boolean)
      )):'')+
      section('Historique des progrès',progressRows(c.progression))+
      (s.notes?section('Notes', '<p class="rc-print-notes">'+esc(s.notes)+'</p>'):'')+
    '</div>'+
    '<footer class="rc-print-page-foot">ROGUE · Fiche de personnage · Âme et hôte · '+
       esc(new Date().toLocaleDateString('fr-FR'))+'</footer>'+
  '</article>';
}
export function printCharacter(character){
  if(typeof document==='undefined'||typeof window==='undefined')
    throw Error('L’impression nécessite un navigateur.');
  const old=document.querySelector('.rc-print-root');
  if(old)old.remove();
  const root=document.createElement('div');
  root.className='rc-print-root';
  root.innerHTML=characterPrintHTML(character);
  document.body.appendChild(root);
  // Android : le dialogue d'impression propose « Enregistrer au format PDF ».
  // Aucun envoi externe. Prévisualisation via l'API native du navigateur.
  window.print();
  return root;
}
