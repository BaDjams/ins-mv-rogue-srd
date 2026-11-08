import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {renderHostCard,traitDescription,escapeCardHtml} from '../public/scripts/host-card-render.mjs';
import {createHostGallery} from '../public/scripts/host-gallery-controller.mjs';
import {createBoosterOverlay} from '../public/scripts/host-booster-overlay.mjs';
import {createOrdinaryHostProfile,renderHostFace} from '../public/scripts/host-booster-ui.mjs';
import {OCCUPATIONS,TRAITS,EQUIPMENT,occupationSkill,compatibleTraits,equipmentForProfile}
  from '../public/scripts/host-profile-tables.mjs';
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

test('les tables de métier, loisirs et équipement du générateur original sont disponibles', () => {
  assert.ok(OCCUPATIONS.length >= 20);
  assert.ok(TRAITS.length >= 20);
  assert.ok(EQUIPMENT.length >= 20);
  assert.equal(occupationSkill('Médecin'), 'Médecine');
  assert.equal(compatibleTraits(['Pauvre'], 'Fortuné'), false);
});

test('chaque hôte ordinaire possède les objets associés à son métier et à ses traits', () => {
  for (const quality of ['mundane','better','superior','elite','legendary']) {
    for(let i=0;i<40;i++){
      const host=createOrdinaryHostProfile({type:'ordinary',quality},i);
      const occupation=OCCUPATIONS.find(o=>o.name===host.occupation);
      assert.ok(occupation, 'Profession reconnue : '+host.occupation);
      for(const item of occupation.equipment)
        assert.ok(host.equipment.includes(item), host.occupation+' sans '+item);
      for(const traitName of host.traits){
        const trait=TRAITS.find(t=>t.name===traitName);
        assert.ok(trait,'Trait reconnu : '+traitName);
        for(const item of trait.equipment||[])
          assert.ok(host.equipment.includes(item),traitName+' sans '+item);
      }
      assert.equal(new Set(host.equipment).size,host.equipment.length);
      assert.ok(host.equipment.length>=occupation.equipment.length+2);
      assert.equal(Object.values(host.attributes).reduce((a,b)=>a+b),{
        mundane:5,better:6,superior:7,elite:8,legendary:10
      }[quality]);
      assert.match(renderHostFace(host),/Objets/);
      assert.match(renderHostFace(host),/Traits/);
    }
  }
});

test('les Soldats de Dieu générés conservent une compétence métier à +2', () => {
  for (const quality of ['superior','elite','legendary']) {
    for(let i=0;i<30;i++){
      const host=createOrdinaryHostProfile({type:'ordinary',quality,trained:true},i);
      assert.ok(host.skills[occupationSkill(host.occupation)]>=2);
      assert.equal(host.trained,true);
      assert.ok(host.equipment.length>=4);
    }
  }
  assert.throws(()=>createOrdinaryHostProfile({
    type:'ordinary',quality:'mundane',trained:true
  },0),/Soldat de Dieu/);
});

test('les noms des cinq niveaux servent à l’affichage, sans modifier leur codage', () => {
  const names={
    mundane:'Personnage commun',better:'Expérimenté',superior:'Professionnel',
    elite:'Vétéran',legendary:'Élite'
  };
  for(const [quality,label] of Object.entries(names)){
    const p=createOrdinaryHostProfile({type:'ordinary',quality},1);
    assert.ok(renderHostFace(p).includes(label));
    assert.equal(p.quality,quality);
  }
});

test('les teintes de booster sont configurables, strictement validées et sans effet sur les tirages',()=>{
  const valid=pack({themeColor:'#b873e2'});
  assert.equal(validateBoosterCatalog({boosters:[valid]}).length,1);
  assert.equal(drawBooster(valid,sources,{date,random:()=>0.5}).length,3);
  for(const themeColor of ['red','bad()', '#fff','#zz0000']){
    assert.throws(()=>validateBoosterCatalog({
      boosters:[pack({themeColor})]
    }),/Couleur de booster invalide/);
  }
});

test('le CSS du booster neutralise les marges Starlight et réserve une hauteur uniforme',()=>{
  const css=fs.readFileSync(new URL('../src/styles/rogue-srd.css',import.meta.url),'utf8');
  assert.match(css,/\.rogue-booster \.rb-widget \* \{ margin-top:0!important; \}/);
  assert.match(css,/\.rogue-booster \.rb-card-rack \{\s*grid-auto-rows: 425px/);
  assert.match(css,/\.rogue-booster \.rb-card-rack > \.rb-card \{/);
  assert.match(css,/rb-flash/);
  assert.match(css,/rb-halo/);
});

test('la fiche du booster présente tous les attributs, compétences et objets dans des tableaux',()=>{
  const host={
    name:'Hôte de test',quality:'superior',age:32,occupation:'Enseignant',
    attributes:{FOR:2,AGI:1,VIG:3,PER:2},
    skills:{Enseignement:2,'Premiers soins':0,'Armes à distance':-1},
    traits:['Bricoleur','Autre trait à décrire'],
    equipment:['Livre','Boîte à outils','Téléphone','Badge'],
    picture:''
  };
  const html=renderHostCard(host);
  assert.match(html,/Personnage professionnel|Professionnel/);
  assert.match(html,/rb-attributes-table/);
  assert.match(html,/rb-skills-table/);
  assert.match(html,/rb-equipment-table/);
  for(const value of ['Force','Agilité','Vigueur','Perception','Enseignement',
    'Incompétent','Livre','Boîte à outils','Téléphone','Badge'])
    assert.ok(html.includes(value),value+' absent de la carte');
  assert.match(html,/data-trait-help/);
  assert.match(html,/Résumé du trait à compléter/);
});
test('les informations des cartes sont échappées pour empêcher toute injection',()=>{
  const host={
    name:'<script>alert(1)</script>',occupation:'<b>Artisan</b>',quality:'mundane',
    attributes:{FOR:1},skills:{'<img src=x onerror=alert(1)>':2},
    equipment:['<iframe>'],traits:['<svg onload=alert(1)>']
  };
  const html=renderHostCard(host);
  assert.doesNotMatch(html,/<script|<iframe|<svg|<img src=x/);
  assert.match(html,/&lt;script&gt;/);
  assert.match(html,/&lt;iframe&gt;/);
  assert.equal(escapeCardHtml('<b>A</b>'),'&lt;b&gt;A&lt;/b&gt;');
});
test('une infobulle de trait inconnu affiche un placeholder explicite',()=>{
  const description=traitDescription('Trait inexistant de test');
  assert.match(description,/Résumé du trait à compléter/);
  assert.equal(typeof description,'string');
});
test('les commandes de galerie et surimpression s’importent sans dépendance au DOM',()=>{
  assert.equal(typeof createHostGallery,'function');
  assert.equal(typeof createBoosterOverlay,'function');
});
test('la surimpression et le deuxième niveau plein écran sont présents et accessibles',()=>{
  const css=fs.readFileSync(new URL('../src/styles/rogue-srd.css',import.meta.url),'utf8');
  const ui=fs.readFileSync(new URL('../public/scripts/host-booster-ui.mjs',import.meta.url),'utf8');
  const overlay=fs.readFileSync(new URL('../public/scripts/host-booster-overlay.mjs',import.meta.url),'utf8');
  const gallery=fs.readFileSync(new URL('../public/scripts/host-gallery-controller.mjs',import.meta.url),'utf8');
  for(const className of ['rb-reveal-overlay','rb-overlay-backdrop','rb-gallery',
    'rb-card-select','rb-overlay-counter','rb-floating-tooltip'])
    assert.ok(css.includes(className),'Style absent : '+className);
  assert.match(overlay,/aria-modal="true"/);
  assert.doesNotMatch(gallery,/aria-modal="true"/); // Plus de seconde modale.
  assert.match(ui,/activeOverlay\.show\(\)/);
  assert.match(ui,/Revoir les/);
  assert.match(gallery,/scrollToCard/); // Swipe natif via CSS Scroll Snap.
  assert.match(gallery,/rb-card-select/);
  assert.doesNotMatch(gallery,/rb-card-open|openModal|closeModal/);
});

test('le booster dispose d’un seul plein écran, sans bandeau inférieur ni bouton redondant',()=>{
  const overlay=fs.readFileSync(new URL('../public/scripts/host-booster-overlay.mjs',import.meta.url),'utf8');
  const gallery=fs.readFileSync(new URL('../public/scripts/host-gallery-controller.mjs',import.meta.url),'utf8');
  const card=fs.readFileSync(new URL('../public/scripts/host-card-render.mjs',import.meta.url),'utf8');
  assert.match(overlay,/data-rb-overlay="counter"/);
  assert.doesNotMatch(overlay,/rb-overlay-footer|rb-overlay-return|Revenir au SRD/);
  assert.doesNotMatch(gallery,/rb-fullscreen|openModal|Agrandir/);
  assert.match(gallery,/Choisir cet hôte/);
  assert.doesNotMatch(card,/Voir la carte en plein écran/);
});

test('la galerie occupe l’espace libre et la navigation a une transition fluide',()=>{
  const css=fs.readFileSync(new URL('../src/styles/rogue-srd.css',import.meta.url),'utf8');
  const gallery=fs.readFileSync(new URL('../public/scripts/host-gallery-controller.mjs',import.meta.url),'utf8');
  assert.match(css,/Galerie immersive : une seule fiche complète/);
  assert.match(css,/\.rb-reveal-overlay \.rb-card-rack\.rb-gallery\.rb-gallery-full/);
  assert.match(css,/height:100%!important/);
  assert.match(css,/scroll-snap-type:x mandatory/);
  assert.match(css,/rotateY\(var\(--rb-angle,0deg\)\)/);
  assert.match(css,/@media \(hover:hover\) and \(pointer:fine\)/);
  assert.match(css,/\.rb-gallery-controls\.rb-gallery-floating \{display:none!important;\}/);
  assert.match(gallery,/--rb-angle/);
  assert.match(gallery,/--rb-scale/);
  assert.match(gallery,/--rb-opacity/);
  assert.match(gallery,/behavior:prefersReduced\(\)\?'auto':'smooth'/);
});
