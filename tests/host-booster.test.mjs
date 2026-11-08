import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  availableBoosters,validateBoosterCatalog,validateBooster,
  resolveBoosterDeck,drawBooster,topQualityIndices
} from '../public/scripts/host-booster-engine.mjs';

const weights=(mundane,better,superior,elite,legendary)=>
  ({mundane,better,superior,elite,legendary});
const sources={
  citizens:{poolType:'citizens',enabled:true,ordinaryWeights:weights(24,12,12,4,2),specialHosts:[]},
  soldiers:{poolType:'soldiers',enabled:true,ordinaryWeights:weights(0,0,8,2,0),specialHosts:[]},
  infernal:{poolType:'infernal',enabled:true,ordinaryWeights:weights(4,3,2,1,0),
    originWeights:{sympathizer:1,cultist:1,recentDead:1},specialHosts:[]}
};
const pack=(patch={})=>({
  id:'pack-test',name:'Pack de test',source:'soldiers',faction:'angel',stage:'initial',
  cardCount:3,active:true,tags:[],extraSpecialHosts:[],...patch
});
const date=new Date('2026-11-08T12:00:00Z');

test('catalogue versionné du site valide',()=>{
  const catalog=JSON.parse(fs.readFileSync(new URL('../public/data/boosters.json',import.meta.url),'utf8'));
  assert.equal(validateBoosterCatalog(catalog).length,4);
  assert.deepEqual(availableBoosters(catalog,{stage:'initial',faction:'angel',date}).map(p=>p.id),
    ['soldats-de-dieu','remplacement-54']);
  assert.deepEqual(availableBoosters(catalog,{stage:'initial',faction:'demon',date}).map(p=>p.id),
    ['reseaux-infernaux','remplacement-54']);
});
test('le booster Soldats de Dieu ouvre trois cartes, uniquement Bleu ou mieux',()=>{
  const result=drawBooster(pack(),sources,{date,random:()=>0.5});
  assert.equal(result.length,3);
  assert.ok(result.every(d=>d.trained===true));
  assert.ok(result.every(d=>['superior','elite','legendary'].includes(d.quality)));
});
test('une carte spéciale Soldat de Dieu doit correspondre à un métier maîtrisé',()=>{
  const special={id:'artisan-test',name:'Artisan de test',quality:'superior',dropRate:5,
    attributes:{FOR:2,AGI:2,VIG:2,PER:1},
    professionalSkill:'Artisanat',skills:[{name:'Artisanat',bonus:2}]};
  const p=pack({extraSpecialHosts:[special]});
  assert.equal(validateBooster(p,sources,{date}).specialRate,5);
  assert.equal(drawBooster(p,sources,{date,random:()=>0}).at(0).host.name,special.name);
  special.skills[0].bonus=1;
  assert.throws(()=>validateBooster(p,sources,{date}),/Professionnel/);
});
test('booster autonome : distribution et carte spéciale individuelle préservées',()=>{
  const p=pack({source:'custom',faction:'any',stage:'any',ordinaryWeights:weights(0,0,0,1,0),
    extraSpecialHosts:[{id:'unique',name:'Profil spécial',quality:'legendary',dropRate:5,
      attributes:{FOR:3,AGI:3,VIG:2,PER:2},skills:[]}]});
  assert.equal(validateBooster(p,sources,{date}).specialRate,5);
  assert.equal(drawBooster(p,sources,{date,random:()=>0.03,cardCount:1})[0].type,'special');
  assert.equal(drawBooster(p,sources,{date,random:()=>0.5,cardCount:1})[0].quality,'elite');
});
test('les pondérations du pack n’altèrent pas celles de la source',()=>{
  const p=pack({ordinaryWeights:weights(0,0,0,0,2)});
  assert.equal(validateBooster(p,sources,{date}).ordinaryRate,100);
  assert.equal(drawBooster(p,sources,{date,random:()=>0.5,cardCount:1})[0].quality,'legendary');
  assert.equal(sources.soldiers.ordinaryWeights.superior,8);
});
test('période, camp et incarnation filtrent l’offre sans l’effacer',()=>{
  const catalog={boosters:[
    pack({id:'saisonnier',startDate:'2026-12-01',endDate:'2026-12-15'}),
    pack({id:'commun',faction:'any',stage:'any'}),
    pack({id:'demon',faction:'demon'})
  ]};
  assert.deepEqual(availableBoosters(catalog,{faction:'angel',stage:'initial',date}).map(p=>p.id),
    ['commun']);
  assert.deepEqual(availableBoosters(catalog,{faction:'demon',stage:'initial',date}).map(p=>p.id),
    ['commun','demon']);
  assert.deepEqual(availableBoosters(catalog,{faction:'angel',stage:'reincarnation',date}).map(p=>p.id),
    ['commun']);
});
test('les corps récemment décédés ne sortent jamais sans autorisation',()=>{
  const p=pack({source:'infernal',faction:'demon'});
  const now=drawBooster(p,sources,{date,random:()=>0.5,cardCount:1,allowRecentlyDead:false});
  assert.ok(['sympathizer','cultist'].includes(now[0].originType));
  const deadSource={...sources,infernal:{...sources.infernal,
    originWeights:{sympathizer:0,cultist:0,recentDead:1}}};
  assert.throws(()=>validateBooster(p,deadSource,{date,allowRecentlyDead:false}),/origine infernale/);
  const one=drawBooster(p,deadSource,{date,random:()=>0.5,cardCount:1,allowRecentlyDead:true});
  assert.equal(one[0].originType,'recentDead');
});
test('le paquet à 54 cartes est tiré sans remise et sans carte spéciale',()=>{
  const p=pack({source:'fallback',faction:'any',stage:'any',cardCount:12});
  const cards=drawBooster(p,sources,{date,random:()=>0.4});
  assert.equal(cards.length,12);
  assert.ok(cards.filter(c=>c.quality==='legendary').length<=2);
  const adulterated=pack({source:'fallback',extraSpecialHosts:[{id:'x'}]});
  assert.throws(()=>validateBooster(adulterated,sources,{date}),/54 cartes/);
});
test('les boosters sont libres, mais les identifiants et taux restent contrôlés',()=>{
  assert.throws(()=>validateBoosterCatalog({boosters:[pack(),pack()]}),/dupliqué/);
  assert.throws(()=>validateBoosterCatalog({boosters:[pack({cardCount:0})]}),/Nombre de cartes/);
  assert.throws(()=>validateBoosterCatalog({boosters:[pack({source:'custom'})]}),/autonome/);
  const specials=[1,2].map(i=>({id:'s'+i,name:'Carte '+i,quality:'superior',
    professionalSkill:'Artisanat',skills:[{name:'Artisanat',bonus:2}],
    attributes:{FOR:2,AGI:2,VIG:2,PER:1},dropRate:60}));
  assert.throws(()=>validateBooster(pack({extraSpecialHosts:specials}),sources,{date}),/dépasse 100/);
});
test('les ex aequo de meilleure qualité sont tous signalés',()=>{
  assert.deepEqual(topQualityIndices([{quality:'superior'},{quality:'legendary'},{quality:'elite'},
    {quality:'legendary'}]),[1,3]);
  assert.deepEqual(topQualityIndices([]),[]);
});
