import { TRAITS } from './host-profile-tables.mjs';

export const QUALITY_LABELS = Object.freeze({
  mundane:'Personnage commun',better:'Expérimenté',superior:'Professionnel',
  elite:'Vétéran',legendary:'Élite'
});
const ATTRIBUTE_LABELS={FOR:'Force',AGI:'Agilité',VIG:'Vigueur',PER:'Perception'};
const ORIGIN_LABELS={
  sympathizer:'Réseau de sympathisants',
  cultist:'Milieu sectaire',
  recentDead:'Corps récemment décédé'
};
const BASE='/ins-mv-rogue-srd';
export function escapeCardHtml(value){
  return String(value??'').replace(/[&<>"']/g,
    char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function validPortrait(url){
  return typeof url==='string'&&
    (/^https:\/\//i.test(url)||url.startsWith(BASE+'/images/'));
}
export function traitDescription(trait){
  const name=typeof trait==='string'?trait:trait?.name;
  const specified=typeof trait==='object'&&typeof trait?.description==='string'
    ?trait.description.trim():'';
  if(specified)return specified;
  const original=TRAITS.find(entry=>entry.name===name);
  if(typeof original?.description==='string'&&original.description.trim())
    return original.description.trim();
  const equipment=(original?.equipment||[]).filter(Boolean);
  const known=equipment.length?' Objet associé : '+equipment.join(', ')+'.':'';
  return 'Résumé du trait à compléter dans le SRD.'+known;
}
function nameOf(trait){
  return typeof trait==='string'?trait:trait?.name??'Trait';
}
function pairRows(entries){
  let rows='';
  for(let i=0;i<entries.length;i+=2){
    const cells=entries.slice(i,i+2).map(([name,value])=>
      '<th scope="row">'+escapeCardHtml(name)+'</th>'+
      '<td>'+escapeCardHtml(value)+'</td>').join('');
    rows+='<tr>'+cells+(i+1>=entries.length?'<td colspan="2" class="rb-empty-cell"></td>':'')+'</tr>';
  }
  return rows;
}
function equipmentRows(items){
  let rows='';
  for(let i=0;i<items.length;i+=2){
    rows+='<tr><td>'+escapeCardHtml(items[i])+'</td>'+
      '<td>'+escapeCardHtml(items[i+1]??'')+'</td></tr>';
  }
  return rows;
}
function section(title,body,className=''){
  return '<section class="rb-card-section '+className+'">'+
    '<h3>'+escapeCardHtml(title)+'</h3>'+body+'</section>';
}
export function renderHostCard(host){
  const quality=QUALITY_LABELS[host.quality]||'Hôte spécial';
  const attrs=Object.entries(host.attributes||{}).map(([key,value])=>
    [ATTRIBUTE_LABELS[key]||key,value]);
  const skills=Object.entries(host.skills||{}).sort((a,b)=>b[1]-a[1])
    .map(([name,value])=>[name,value===-1?'Incompétent':'+'+value]);
  const traits=Array.isArray(host.traits)?host.traits:[];
  const gear=Array.isArray(host.equipment)?host.equipment:[];
  const source=host.trained?'Soldat de Dieu':ORIGIN_LABELS[host.originType]||'';
  const picture=validPortrait(host.picture)
    ? '<img alt="" loading="lazy" src="'+escapeCardHtml(host.picture)+'">'
    : '<span class="rb-avatar" aria-hidden="true">'+
      escapeCardHtml((host.name||'?').charAt(0).toUpperCase())+'</span>';
  const traitButtons=traits.map(trait=>{
    const name=nameOf(trait),description=traitDescription(trait);
    return '<button type="button" class="rb-trait-chip" data-trait-help="'+
      escapeCardHtml(description)+'" aria-label="'+
      escapeCardHtml('Trait '+name+'. '+description)+'">'+
      escapeCardHtml(name)+'</button>';
  }).join('');
  const traitSection=section('Traits',traitButtons
    ?'<div class="rb-trait-list">'+traitButtons+'</div>'
    :'<p class="rb-empty">Aucun trait renseigné</p>','rb-traits-section');
  const gearSection=section('Objets et équipement',gear.length
    ?'<table class="rb-info-table rb-equipment-table"><tbody>'+
      equipmentRows(gear)+'</tbody></table>'
    :'<p class="rb-empty">Aucun équipement renseigné</p>','rb-equipment-section');
  const attributeSection=section('Caractéristiques',
    '<table class="rb-info-table rb-attributes-table"><tbody>'+
    pairRows(attrs)+'</tbody></table>','rb-attributes-section');
  const skillSection=section('Compétences',skills.length
    ?'<table class="rb-info-table rb-skills-table"><tbody>'+
      pairRows(skills)+'</tbody></table>'
    :'<p class="rb-empty">Aucune compétence renseignée</p>','rb-skills-section');
  return '<div class="rb-card-inner">'+
    '<div class="rb-card-back" aria-hidden="true">'+
      '<span class="rb-back-symbol">✦</span><span>INS·MV ROGUE</span>'+
    '</div>'+
    '<div class="rb-card-front">'+
      '<div class="rb-card-topline"><span class="rb-card-rarity">'+
        escapeCardHtml(quality)+'</span>'+
        (Number.isInteger(host.age)?'<span class="rb-card-age">'+
          escapeCardHtml(host.age)+' ans</span>':'')+'</div>'+
      '<div class="rb-portrait">'+picture+'</div>'+
      '<div class="rb-card-identity">'+
        '<h2 class="rb-card-name">'+escapeCardHtml(host.name)+'</h2>'+
        '<p class="rb-card-job">'+escapeCardHtml(host.occupation)+'</p>'+
        (source?'<p class="rb-card-source">'+escapeCardHtml(source)+'</p>':'')+
      '</div>'+
      traitSection+gearSection+attributeSection+skillSection+

    '</div>'+
  '</div>';
}
