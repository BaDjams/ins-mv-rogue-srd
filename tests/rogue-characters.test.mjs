import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  createCharacter,updateSoul,validateCharacter,validateCreationAttributes,
  progressSoul,advancements,attachHost,changeArchive,
  importCharacter,exportCharacter
} from '../public/scripts/rogue-character-model.mjs';
import {characterPrintHTML} from '../public/scripts/rogue-character-print.mjs';

const HOST={
  id:'test-hote-1',name:'Alain Durand',quality:'superior',
  occupation:'Enseignant',age:37,picture:'',isSpecial:false,
  originType:'',trained:true,
  attributes:{FOR:2,AGI:2,VIG:1,PER:2},
  skills:{Enseignement:2,Investigation:1,'Premiers soins':0},
  traits:['Intellectuel','Bricoleur'],
  equipment:['Livre','Badge de service','Téléphone']
};
const SOUL='Sariel';
function advanceOf(type,value){
  const soul=createCharacter({name:SOUL,nature:'angel',startingAdvancements:5});
  return type==='power'?{soul,action:{type,name:value}}:
    type==='attribute'?{soul,action:{type,attribute:value}}:
    {soul,action:{type,name:value}};
}

test('le MJ crée trois personnages distincts avec cinq progressions chacun',()=>{
  const group=['Sariel','Myriel','Baraquiel'].map(name=>
    createCharacter({name,nature:'angel',startingAdvancements:5}));
  assert.equal(new Set(group.map(x=>x.id)).size,3);
  for(const c of group){
    assert.deepEqual(advancements(c),{granted:5,used:0,available:5});
    assert.equal(c.soul.rank,3);
    assert.equal(c.soul.powers.intrinsic,'Présence Surnaturelle');
    assert.equal(Object.values(c.soul.attributes).reduce((a,b)=>a+b),8);
  }
});
test('un débutant n’a pas de progression ; le MJ peut en accorder ensuite',()=>{
  const c=createCharacter({name:SOUL});
  assert.deepEqual(advancements(c),{granted:0,used:0,available:0});
  assert.throws(()=>progressSoul(c,{type:'trait',name:'Sang-froid'}),/Aucune progression/);
  const next=progressSoul(c,{type:'grant'});
  assert.deepEqual(advancements(next),{granted:1,used:0,available:1});
});
test('chaque amélioration consomme exactement une progression sans XP',()=>{
  let c=createCharacter({name:SOUL,startingAdvancements:4});
  c=progressSoul(c,{type:'attribute',attribute:'PUI'});
  assert.equal(c.soul.attributes.PUI,4);
  c=progressSoul(c,{type:'power',name:'Téléportation'});
  assert.deepEqual(c.soul.powers.additional,['Téléportation']);
  c=progressSoul(c,{type:'trait',name:'Volonté de fer'});
  assert.ok(c.soul.traits.includes('Volonté de fer'));
  assert.equal(c.soul.initialTraits.length,0);
  assert.deepEqual(advancements(c),{granted:4,used:3,available:1});
  c=progressSoul(c,{type:'attribute',attribute:'CLA'});
  assert.equal(c.soul.attributes.CLA,2);
  assert.deepEqual(advancements(c),{granted:4,used:4,available:0});
  assert.throws(()=>progressSoul(c,{type:'power',name:'Autre'}),/Aucune progression/);
  assert.equal(exportCharacter(c).includes('"xp"'),false);
});
test('plafonds et doublons d’améliorations sont contrôlés',()=>{
  let c=createCharacter({name:SOUL,startingAdvancements:15});
  c=progressSoul(c,{type:'attribute',attribute:'PUI'});
  c=progressSoul(c,{type:'attribute',attribute:'PUI'});
  assert.equal(c.soul.attributes.PUI,5);
  assert.throws(()=>progressSoul(c,{type:'attribute',attribute:'PUI'}),/Plafond/);
  c=progressSoul(c,{type:'power',name:'Téléportation'});
  assert.throws(()=>progressSoul(c,{type:'power',name:'téléportation'}),/déjà possédé/);
  c=progressSoul(c,{type:'trait',name:'Mystique'});
  assert.throws(()=>progressSoul(c,{type:'trait',name:'mystique'}),/déjà possédé/);
});
test('répartition initiale : huit points, de 1 à 3, verrouillage après augmentation',()=>{
  assert.deepEqual(validateCreationAttributes({PUI:3,INF:2,RES:2,CLA:1}),
    {PUI:3,INF:2,RES:2,CLA:1});
  assert.throws(()=>validateCreationAttributes({PUI:4,INF:1,RES:2,CLA:1}),/Attribut invalide/);
  assert.throws(()=>validateCreationAttributes({PUI:1,INF:1,RES:2,CLA:1}),/exactement 8/);
  let c=createCharacter({name:SOUL,startingAdvancements:1});
  c=updateSoul(c,{attributes:{PUI:2,INF:2,RES:2,CLA:2},
    traits:['Patient','Visionnaire']});
  c=progressSoul(c,{type:'attribute',attribute:'RES'});
  assert.throws(()=>updateSoul(c,{attributes:{PUI:3,INF:2,RES:2,CLA:1}}),/verrouillée|bloquée/i);
});
test('nouveau trait d’âme au-delà des deux initiaux et persistant après incarnation',()=>{
  let c=createCharacter({name:SOUL,startingAdvancements:1});
  c=updateSoul(c,{traits:['Loyal','Observateur']});
  c=progressSoul(c,{type:'trait',name:'Mystique'});
  assert.deepEqual(c.soul.traits,['Loyal','Observateur','Mystique']);
  c=attachHost(c,HOST);
  assert.equal(c.soul.traits.length,3);
  assert.deepEqual(c.host.equipment,HOST.equipment);
  const replacement={...HOST,id:'autre',name:'Nouvel hôte'};
  c=attachHost(c,replacement);
  assert.equal(c.host.name,'Nouvel hôte');
  assert.equal(c.hostHistory.length,1);
  assert.equal(c.hostHistory[0].host.name,'Alain Durand');
  assert.deepEqual(c.soul.traits,['Loyal','Observateur','Mystique']);
});
test('compétence résiduelle : récompense d’ange sans réincarnation, puis niveau via progression',()=>{
  let c=createCharacter({name:SOUL,startingAdvancements:2});
  c=attachHost(c,HOST);
  assert.throws(()=>progressSoul(c,{type:'residual',name:'Enseignement'}),/non acquise/);
  assert.throws(()=>progressSoul(c,{type:'unlockResidual',name:'Enseignement',
    completedScenarioWithoutReincarnation:false}),/récompense conditionnelle/);
  assert.throws(()=>progressSoul(c,{type:'unlockResidual',name:'Premiers soins',
    completedScenarioWithoutReincarnation:true}),/plus haut niveau/);
  c=progressSoul(c,{type:'unlockResidual',name:'Enseignement',
    completedScenarioWithoutReincarnation:true});
  assert.equal(c.soul.residualSkills.Enseignement,1);
  assert.deepEqual(advancements(c),{granted:2,used:0,available:2});
  c=progressSoul(c,{type:'residual',name:'Enseignement'});
  c=progressSoul(c,{type:'residual',name:'Enseignement'});
  assert.equal(c.soul.residualSkills.Enseignement,3);
  assert.throws(()=>progressSoul(progressSoul(c,{type:'grant'}),
    {type:'residual',name:'Enseignement'}),/Expert/);
  assert.deepEqual(advancements(c),{granted:2,used:2,available:0});
});
test('compétence résiduelle conditionnelle refusée aux démons',()=>{
  let c=createCharacter({name:'Vassago',nature:'demon'});
  c=attachHost(c,HOST);
  assert.throws(()=>progressSoul(c,{type:'unlockResidual',name:'Enseignement',
    completedScenarioWithoutReincarnation:true}),/réservée aux anges/);
});
test('archivage réversible et conservation intégrale des caractéristiques',()=>{
  let c=createCharacter({name:SOUL,startingAdvancements:5});
  c=attachHost(c,HOST);
  const a=changeArchive(c,true);
  assert.equal(a.archived,true);
  assert.equal(a.host.name,'Alain Durand');
  assert.throws(()=>progressSoul(a,{type:'power',name:'Prière'}),/Désarchivez/);
  const b=changeArchive(a,false);
  assert.equal(b.archived,false);
  assert.deepEqual(b.soul.attributes,c.soul.attributes);
  assert.deepEqual(b.host.equipment,c.host.equipment);
});
test('JSON : export complet, réimportation avec nouveau nom d’identifiant et intégrité',()=>{
  let c=createCharacter({name:SOUL,startingAdvancements:5});
  c=attachHost(c,HOST);
  c=progressSoul(c,{type:'power',name:'Souffle divin'});
  const json=exportCharacter(c);
  const round=importCharacter(json);
  assert.notEqual(round.id,c.id);
  assert.equal(round.soul.name,c.soul.name);
  assert.deepEqual(round.host.skills,c.host.skills);
  assert.deepEqual(advancements(round),advancements(c));
  assert.throws(()=>importCharacter('{invalid'),/JSON valide/);
  assert.throws(()=>importCharacter(JSON.stringify({...c,schemaVersion:99})),/incompatible/);
  assert.throws(()=>importCharacter('a'.repeat(2*1024*1024+1)),/volumineux/);
});
test('fiche A4 imprime âme, hôte, matériel et bilan de progressions, pas d’XP',()=>{
  let c=createCharacter({name:SOUL,startingAdvancements:5});
  c=attachHost(c,HOST);
  c=progressSoul(c,{type:'power',name:'Lumière'});
  const html=characterPrintHTML(c);
  for(const expression of ['Sariel','RANG CÉLESTE','Attributs de l’âme',
    'Progressions du MJ','Accordées','Disponibles','Lumière','Alain Durand',
    'Badge de service','Enseignement','Compétences humaines'])
    assert.ok(html.includes(expression),'Manquant : '+expression);
  assert.doesNotMatch(html,/Expérience|<th>XP<\/th>/);
  assert.match(html,/<article class="rc-print-document">/);
});
test('la page et le script d’interface sont présents et configurent le personnage actif',()=>{
  const path=new URL('../src/content/docs/personnage/bibliotheque.md',import.meta.url);
  const doc=fs.readFileSync(path,'utf8');
  const ui=fs.readFileSync(new URL('../public/scripts/rogue-character-ui.mjs',import.meta.url),'utf8');
  const booster=fs.readFileSync(new URL('../public/scripts/host-booster-ui.mjs',import.meta.url),'utf8');
  const css=fs.readFileSync(new URL('../src/styles/rogue-characters.css',import.meta.url),'utf8');
  assert.match(doc,/<div class="rogue-character-library"><\/div>/);
  assert.match(ui,/startingAdvancements/);
  assert.match(ui,/data-action/);
  assert.match(ui,/archiveCharacter/);
  assert.match(ui,/Désarchiver/);
  assert.match(ui,/JSON/);
  assert.match(ui,/printCharacter/);
  assert.match(booster,/attachHostToActive/);
  assert.match(css,/@media print/);
  assert.match(css,/@page/);
});
