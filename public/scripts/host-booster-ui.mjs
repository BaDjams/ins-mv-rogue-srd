import { availableBoosters, validateBooster, drawBooster, topQualityIndices } from './host-booster-engine.mjs';
import { OCCUPATIONS, TRAITS, TRAIT_GROUPS, compatibleTraits, occupationSkill, equipmentForProfile } from './host-profile-tables.mjs';

const BASE='/ins-mv-rogue-srd';
// Intitulés éditoriaux affichés ; les qualités et leurs couleurs restent inchangées dans les règles.
const LABELS={mundane:'Personnage commun',better:'Expérimenté',superior:'Professionnel',elite:'Vétéran',legendary:'Élite'};
const MAX_DIFFICULTY={mundane:1,better:2,superior:3,elite:4,legendary:4};
const TRAIT_COUNTS={mundane:[1,2],better:[1,2],superior:[2,3],elite:[2,4],legendary:[2,4]};
const DEFAULT_GLOW={soldiers:'#e3c17b',infernal:'#d36a80',citizens:'#77a6d5',fallback:'#ab96dc',custom:'#b7a6e3'};
const validGlow=value=>typeof value==='string'&&/^#[0-9a-f]{6}$/i.test(value);
const SKILLS=['Armes à distance','Lancer','Armes de mêlée','Conduite','Corps à corps',
  'Intrusion','Discrétion','Informatique','Influence','Larcins','Pilotage',
  'Premiers soins','Sport','Survie','Électronique','Explosifs','Investigation',
  'Vigilance','Occultisme','Empathie','Étiquette','Histoire','Médecine',
  'Psychologie','Artisanat','Mécanique','Commandement','Performance artistique',
  'Tactique','Renseignements','Recherche','Langues étrangères','Sciences','Enseignement'];
const EXTRA={mundane:0,better:1,superior:2,elite:4,legendary:6};
const CAP={mundane:1,better:1,superior:2,elite:3,legendary:3};
const SUM={mundane:5,better:6,superior:7,elite:8,legendary:10};
const FIRST=['Camille','Alex','Sarah','Julien','Léa','Noah','Marie','Lucas','Eva',
  'Louis','Nora','Simon','Clara','Hugo','Louise','Mathis','Inès','Arthur','Maya','Thomas'];
const LAST=['Martin','Bernard','Dubois','Petit','Robert','Richard','Laurent','Roux',
  'Moreau','Girard','Durand','Simon','Legrand','Faure','Lefebvre','Noël'];
const rnd=n=>Math.floor(Math.random()*n);
const choose=arr=>arr[rnd(arr.length)];
function shuffle(arr){
  const out=arr.slice();
  for(let i=out.length-1;i>0;i--){const j=rnd(i+1);[out[i],out[j]]=[out[j],out[i]];}
  return out;
}
function escape(value){
  return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function safePicture(value){
  return typeof value==='string'&&(/^https:\/\//i.test(value)||value.startsWith(BASE+'/images/'))?value:'';
}
function chooseTraits(quality,age){
  const [min,max]=TRAIT_COUNTS[quality];
  const expected=min+rnd(max-min+1);
  const ageGroup=age<20?'Adolescent':age>=65?'Âgé':null;
  const selected=[];
  if(ageGroup){
    const ageTrait=TRAITS.find(t=>t.name===ageGroup);
    if(ageTrait)selected.push(ageTrait);
  }
  const available=shuffle(TRAITS.filter(t=>
    !TRAIT_GROUPS.age.includes(t.name) && t.name!==ageGroup
  ));
  for(const trait of available){
    if(selected.length>=expected)break;
    if(compatibleTraits(selected.map(t=>t.name),trait.name))selected.push(trait);
  }
  return selected;
}
function ordinary(draw,index){
  const quality=draw.quality;
  const choices=OCCUPATIONS.filter(o=>o.difficulty<=MAX_DIFFICULTY[quality]);
  const occupation=choose(choices.length?choices:OCCUPATIONS);
  const age=18+rnd(63);
  const traits=chooseTraits(quality,age);
  const equipment=equipmentForProfile(occupation,traits);
  const attrs={FOR:1,AGI:1,VIG:1,PER:1};
  for(let left=SUM[quality]-4;left>0;left--){
    const possible=Object.keys(attrs).filter(k=>attrs[k]<3);
    if(possible.length)attrs[choose(possible)]++;
  }
  const mainSkill=occupationSkill(occupation.name);
  const skillNames=[mainSkill,...shuffle(SKILLS.filter(k=>k!==mainSkill)).slice(0,2)];
  const skills={};skillNames.forEach(k=>skills[k]=0);skills[skillNames[0]]=1;
  let extra=EXTRA[quality];
  if(draw.trained){
    if(CAP[quality]<2)throw new Error('Soldat de Dieu : qualité minimale Bleue.');
    skills[skillNames[0]]=2;extra--;
  }
  for(let i=0;i<extra;i++){
    const eligible=SKILLS.filter(k=>skills[k]===undefined||skills[k]<CAP[quality]);
    if(!eligible.length)break;
    const k=choose(eligible);
    skills[k]=skills[k]===undefined?0:skills[k]+1;
  }
  return {id:'tirage-'+index,name:choose(FIRST)+' '+choose(LAST),quality,
    occupation:occupation.name,attributes:attrs,skills,age,
    traits:traits.map(t=>t.name),equipment,picture:'',isSpecial:false,
    trained:draw.trained===true,originType:draw.originType??null};
}
function profile(draw,index){
  if(draw.type==='ordinary')return ordinary(draw,index);
  const h=draw.host;
  return {id:h.id,name:h.name,quality:h.quality,
    occupation:h.occupation??'Hôte spécial',attributes:{...h.attributes},
    skills:Object.fromEntries((h.skills??[]).map(s=>[s.name,s.bonus])),
    traits:[...(h.traits??[])],equipment:[...(h.equipment??[])],
    age:Number.isInteger(h.age)?h.age:null,picture:safePicture(h.image),
    description:h.description??'',isSpecial:true,
    trained:draw.trained===true,originType:draw.originType??null};
}
function face(host){
  const stats=Object.entries(host.attributes).map(([k,v])=>
    '<span><strong>'+escape(k)+'</strong> '+escape(v)+'</span>').join('');
  const skills=Object.entries(host.skills).sort((a,b)=>b[1]-a[1]).slice(0,4)
    .map(([name,v])=>escape(name)+' '+(v===-1?'Incompétent':'+'+v)).join(' · ');
  const source=host.trained?'Soldat de Dieu':({
    sympathizer:'Réseau de sympathisants',cultist:'Milieu sectaire',
    recentDead:'Corps récemment décédé'}[host.originType]||'');
  const portrait=host.picture?'<img alt="" loading="lazy" src="'+escape(host.picture)+'">':
    '<span class="rb-avatar" aria-hidden="true">'+escape(host.name.charAt(0).toUpperCase())+'</span>';
  const traits=Array.isArray(host.traits)?host.traits:[];
  const gear=Array.isArray(host.equipment)?host.equipment:[];
  const visibleItems=items=>items.slice(0,2).map(escape).join(' · ')+
    (items.length>2?' · +'+(items.length-2):'');
  return '<span class="rb-card-inner">'+
    '<span class="rb-card-back" aria-hidden="true"><span class="rb-back-symbol">✦</span><span>INS·MV ROGUE</span></span>'+
    '<span class="rb-card-front">'+
      '<span class="rb-card-rarity">'+escape(LABELS[host.quality])+'</span>'+
      '<span class="rb-portrait">'+portrait+'</span>'+
      '<span class="rb-card-name">'+escape(host.name)+'</span>'+
      '<span class="rb-card-job">'+escape(host.occupation)+'</span>'+
      (source?'<span class="rb-card-source">'+escape(source)+'</span>':'')+
      '<span class="rb-stats">'+stats+'</span>'+
      '<span class="rb-skills">'+skills+'</span>'+
      (traits.length?'<span class="rb-profile-details" title="'+escape(traits.join(' · '))+'"><b>Traits</b> '+visibleItems(traits)+'</span>':'')+
      (gear.length?'<span class="rb-profile-details rb-gear" title="'+escape(gear.join(' · '))+'"><b>Objets</b> '+visibleItems(gear)+'</span>':'')+
      '<span class="rb-card-choose">Choisir cet hôte</span>'+
    '</span></span>';
}
function exportHost(host){
  const blob=new Blob([JSON.stringify(host,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');
  link.href=url;link.download='rogue-hote-'+String(host.id).replace(/[^a-z0-9-]/gi,'-')+'.json';
  document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);
}
async function getConfig(file){
  const response=await fetch(BASE+'/data/'+file);
  if(!response.ok)throw new Error('Catalogue indisponible : '+file);
  return response.json();
}
function setup(container){
  if(container.dataset.rbInitialized==='yes')return;
  container.dataset.rbInitialized='yes';
  const state={catalog:null,sources:{},pack:null,stage:'initial',faction:'angel',
    density:3,allowRecentlyDead:false,busy:false,host:null};
  container.innerHTML=[
    '<section class="rb-widget" aria-label="Booster d’incarnation">',
    '<header class="rb-hero"><span class="rb-eyebrow">INCARNATION · INS/MV ROGUE</span>',
    '<h2>Ouvrir un booster</h2><p>Votre hôte vous attend quelque part. La hiérarchie décline toute responsabilité.</p></header>',
    '<div class="rb-controls">',
      '<label>Camp <select data-rb="faction"><option value="angel">Ange</option><option value="demon">Démon</option></select></label>',
      '<label>Moment <select data-rb="stage"><option value="initial">Première incarnation</option><option value="reincarnation">Réincarnation</option></select></label>',
      '<label class="rb-pack-field">Booster <select data-rb="pack" disabled><option>Chargement…</option></select></label>',
      '<label data-rb="density-label" hidden>Population présente <select data-rb="density">',
        '<option value="3">Zone urbaine dense · 3 cartes</option>',
        '<option value="2">Zone urbaine · 2 cartes</option>',
        '<option value="1">Zone isolée · 1 carte</option>',
        '<option value="0">Aucun hôte humain disponible</option>',
      '</select></label>',
      '<label data-rb="dead-label" hidden><input type="checkbox" data-rb="dead"> Autoriser un corps récemment décédé (magie noire requise)</label>',
      '<p data-rb="description" class="rb-description"></p>',
    '</div>',
    '<div class="rb-actions"><button type="button" class="rb-open-button" data-rb="open" disabled>Ouvrir le booster</button>',
      '<p data-rb="status" class="rb-status" role="status" aria-live="polite">Chargement des boosters…</p></div>',
    '<div class="rb-stage" data-rb="stage-area" aria-label="Cartes obtenues"></div>',
    '<div class="rb-choice" data-rb="choice" aria-live="polite" hidden></div>',
    '</section>'
  ].join('');
  const $=key=>container.querySelector('[data-rb="'+key+'"]');
  const rack=$('stage-area'),choice=$('choice'),status=$('status'),
    select=$('pack'),openBtn=$('open'),description=$('description');
  const reduced=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches===true;
  function updatePacks(){
    select.innerHTML='';
    const candidates=availableBoosters(state.catalog,{stage:state.stage,faction:state.faction});
    const usable=[];
    for(const pack of candidates){
      try {
        validateBooster(pack,state.sources,{allowRecentlyDead:state.allowRecentlyDead});
        usable.push(pack);
      }catch(e){console.info('Booster non disponible : '+pack.id,e.message);}
    }
    for(const pack of usable){
      const option=document.createElement('option');
      option.value=pack.id;option.textContent=pack.name;select.appendChild(option);
    }
    state.pack=usable.find(p=>p.id===state.pack?.id)??usable[0]??null;
    if(state.pack)select.value=state.pack.id;
    select.disabled=!state.pack;
    openBtn.disabled=state.busy||!state.pack;
    description.textContent=state.pack ? [state.pack.description||'',...(state.pack.tags||[])].filter(Boolean).join(' · ') : 'Aucun booster disponible dans ce contexte.';
    status.textContent=state.pack?'Choisissez un paquet puis ouvrez-le.':'Aucun booster actif pour cette situation.';
    $('density-label').hidden=state.stage!=='reincarnation';
    $('dead-label').hidden=state.faction!=='demon';
  }
  function sync(){
    state.stage=$('stage').value;
    state.faction=$('faction').value;
    state.density=Number($('density').value);
    state.allowRecentlyDead=$('dead').checked;
    updatePacks();
  }
  for(const field of ['stage','faction','density','dead'])$(field).addEventListener('change',sync);
  select.addEventListener('change',()=>{
    state.pack=state.catalog.boosters.find(p=>p.id===select.value)??null;
    description.textContent=state.pack ? [state.pack.description||'',...(state.pack.tags||[])].filter(Boolean).join(' · ') : '';
    $('dead-label').hidden=state.faction!=='demon';
  });
  function selectHost(i,hosts,buttons){
    if(state.busy)return;
    const host=hosts[i];state.host=host;
    buttons.forEach((button,j)=>{
      button.classList.toggle('rb-card-selected',i===j);
      button.setAttribute('aria-pressed',String(i===j));
    });
    choice.hidden=false;
    choice.innerHTML='<strong>Incarnation choisie : '+escape(host.name)+'</strong>'+
      '<span> · '+escape(LABELS[host.quality])+'</span>'+
      '<div class="rb-host-info"><strong>Profession :</strong> '+escape(host.occupation)+
      (host.traits?.length?'<span><strong>Traits :</strong> '+host.traits.map(escape).join(', ')+'</span>':'')+
      (host.equipment?.length?'<span><strong>Équipement :</strong> '+host.equipment.map(escape).join(', ')+'</span>':'')+
      '</div>'+
      '<button type="button" class="rb-export-host">Exporter cette fiche (JSON)</button>';
    choice.querySelector('button').addEventListener('click',()=>exportHost(host));
    status.textContent='Hôte choisi. Vous pouvez consulter son équipement et exporter sa fiche.';
  }
  async function open(){
    if(state.busy||!state.pack)return;
    const pack=state.pack;
    if(state.stage==='reincarnation'&&state.density===0){
      status.textContent='Aucun hôte humain : appliquez les règles d’incarnation animale ou les exceptions du MJ.';
      return;
    }
    state.busy=true;openBtn.disabled=true;state.host=null;choice.hidden=true;rack.innerHTML='';
    try{
      const n=state.stage==='reincarnation'?Math.min(pack.cardCount,state.density):pack.cardCount;
      const draws=drawBooster(pack,state.sources,{
        cardCount:n,allowRecentlyDead:state.allowRecentlyDead
      });
      const hosts=draws.map((draw,i)=>profile({ ...draw, trained:draw.trained===true || pack.source==='soldiers' },i));
      const best=topQualityIndices(hosts);
      const sealed=document.createElement('div');
      sealed.className='rb-sealed rb-theme-'+(state.faction==='angel'?'angel':'demon');
      sealed.innerHTML='<span class="rb-seal-symbol">✧</span><strong>'+escape(pack.name)+'</strong>'+
        '<small>INS · MV ROGUE</small>';
      rack.appendChild(sealed);
      status.textContent='Ouverture du booster…';
      if(!reduced())await new Promise(resolve=>setTimeout(resolve,650));
      sealed.classList.add('rb-sealed-open');
      if(!reduced())await new Promise(resolve=>setTimeout(resolve,300));
      sealed.remove();
      const row=document.createElement('div');row.className='rb-card-rack';
      const buttons=hosts.map((host,i)=>{
        const button=document.createElement('button');
        button.type='button';
        button.className='rb-card rb-quality-'+host.quality;
        button.setAttribute('aria-pressed','false');
        button.setAttribute('aria-label','Choisir '+host.name+', qualité '+LABELS[host.quality]);
        button.style.setProperty('--rb-index',String(i));
        button.innerHTML=face(host);
        button.addEventListener('click',()=>selectHost(i,hosts,buttons));
        row.appendChild(button);return button;
      });
      rack.appendChild(row);
      if(!reduced())await new Promise(resolve=>setTimeout(resolve,560+Math.min(12,hosts.length)*100));
      buttons.forEach((button,i)=>{
        button.classList.add('rb-revealed');
        if(best.includes(i)){
          button.classList.add('rb-card-best');
          const label=document.createElement('span');
          label.className='rb-best-label';label.textContent='Qualité la plus élevée';
          button.appendChild(label);
        }
      });
      status.textContent=hosts.length+' carte(s) révélée(s). La meilleure qualité est mise en lumière ; vous choisissez librement votre hôte.';
    }catch(error){
      console.error('Ouverture impossible',error);
      status.textContent='Ouverture impossible : '+error.message;
      rack.innerHTML='';
    }finally{state.busy=false;openBtn.disabled=!state.pack;}
  }
  openBtn.addEventListener('click',open);
  Promise.all([
    getConfig('boosters.json'),
    getConfig('hotes-officiels.json').catch(()=>null),
    getConfig('hotes-soldats-dieu.json').catch(()=>null),
    getConfig('hotes-reseaux-infernaux.json').catch(()=>null)
  ]).then(([catalog,citizens,soldiers,infernal])=>{
    state.catalog=catalog;state.sources={citizens,soldiers,infernal};sync();
  }).catch(error=>{status.textContent='Catalogue indisponible : '+error.message;});
}
function init(){document.querySelectorAll('.rogue-booster').forEach(setup);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
document.addEventListener('astro:page-load',init);
