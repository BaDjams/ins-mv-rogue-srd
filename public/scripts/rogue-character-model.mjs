/* INS/MV Rogue — modèle de personnage local.
 * Les champs âme et hôte ne fusionnent jamais : ils restent indépendants.
 * Règles : /personnage/creation, /personnage/progression, /personnage/rang.
 */
export const CHARACTER_VERSION=2;
export const CHARACTER_KIND='insmv-rogue-character';
export const SOUL_ATTRIBUTES=Object.freeze(['PUI','INF','RES','CLA']);
export const HOST_ATTRIBUTES=Object.freeze(['FOR','AGI','VIG','PER']);
export const SOUL_NATURES=Object.freeze(['angel','demon']);
const MAX_IMPORT_BYTES=2*1024*1024;

function uuid(){
  if(typeof crypto!=='undefined'&&typeof crypto.randomUUID==='function')return crypto.randomUUID();
  return 'rogue-'+Date.now()+'-'+Math.random().toString(36).slice(2,13);
}
function plain(value){return value!=null&&typeof value==='object'&&!Array.isArray(value);}
function text(value,max=600){
  return typeof value==='string'?value.slice(0,max).trim():'';
}
function attr(value,key,limit=5){
  const n=value?.[key];
  if(!Number.isInteger(n)||n<1||n>limit)throw Error('Attribut invalide : '+key);
  return n;
}
function cleanName(value,label){
  const result=text(value,90);
  if(!result)throw Error(label+' est obligatoire.');
  return result;
}
export function initialSoulAttributes(){
  return {PUI:3,INF:2,RES:2,CLA:1};
}
export function validateCreationAttributes(attrs){
  if(!plain(attrs))throw Error('Répartition des attributs manquante.');
  let sum=0;
  for(const key of SOUL_ATTRIBUTES)sum+=attr(attrs,key,3);
  if(sum!==8)throw Error('À la création, répartissez exactement 8 points (1 à 3 par attribut).');
  return Object.fromEntries(SOUL_ATTRIBUTES.map(k=>[k,attrs[k]]));
}
function validateCharacterCore(item,{allowDraft=true}={}){
  if(!plain(item)||item.kind!==CHARACTER_KIND||item.schemaVersion!==CHARACTER_VERSION)
    throw Error('Format de fiche Rogue non reconnu ou version incompatible.');
  if(typeof item.id!=='string'||item.id.length<4||item.id.length>120)
    throw Error('Identifiant du personnage incorrect.');
  if(!plain(item.soul))throw Error('Âme surnaturelle absente.');
  if(!SOUL_NATURES.includes(item.soul.nature))throw Error('Nature invalide : ange ou démon attendu.');
  cleanName(item.soul.name,'Le nom de l’âme');
  const attrs=item.soul.attributes;
  if(!plain(attrs))throw Error('Attributs de l’âme absents.');
  for(const k of SOUL_ATTRIBUTES)attr(attrs,k,5);
  if(SOUL_ATTRIBUTES.reduce((sum,k)=>sum+attrs[k],0)<8)
    throw Error('Les attributs de l’âme totalisent moins de huit points.');
  if(!Number.isInteger(item.soul.rank)||item.soul.rank<3||item.soul.rank>6)
    throw Error('Rang céleste invalide pour un ange ou un démon.');
  if(!plain(item.soul.powers))throw Error('Pouvoirs de l’âme absents.');
  if(!Array.isArray(item.soul.powers.additional)||item.soul.powers.additional.length>100)
    throw Error('Liste des pouvoirs additionnels incorrecte.');
  if(!Array.isArray(item.soul.initialTraits)||item.soul.initialTraits.length>2 ||
    !Array.isArray(item.soul.traits)||item.soul.traits.length>100)
    throw Error('Traits d’âme invalides.');
  if(!plain(item.soul.residualSkills) || Object.keys(item.soul.residualSkills).length>60)
    throw Error('Compétences résiduelles invalides.');
  for(const [skill,level] of Object.entries(item.soul.residualSkills)){
    if(!skill.trim() || skill.length>120 || !Number.isInteger(level)||level<1||level>3)
      throw Error('Niveau de compétence résiduelle invalide.');
  }
  if(!Array.isArray(item.progression)||item.progression.length>2000)
    throw Error('Historique de progression invalide.');
  if(!Array.isArray(item.hostHistory)||item.hostHistory.length>100)
    throw Error('Historique d’hôtes incorrect.');
  if(typeof item.archived!=='boolean')throw Error('État d’archivage invalide.');
  if(item.host!==null&&item.host!==undefined)validateHost(item.host);
  if(!allowDraft){
    validateCreationAttributes(item.soul.initialAttributes);
    for(const key of ['hierarchy','role','assigned'])
      if(!text(item.soul.powers[key],120))throw Error('Pouvoir de départ manquant : '+key);
    if(item.soul.initialTraits.filter(Boolean).length!==2)
      throw Error('La création exige deux traits d’âme.');
  }
  const balance=advancements(item);
  if(balance.available<0)
    throw Error('Plus d’améliorations dépensées que de progressions accordées.');
  return item;
}
export function validateCharacter(item,options={}){return validateCharacterCore(item,options);}
export function createCharacter({name,nature='angel',superior='',role='',hierarchyStatus='',concept='',startingAdvancements=0}={}){
  if(!Number.isInteger(startingAdvancements)||startingAdvancements<0||startingAdvancements>50)
    throw Error('Progressions de départ : entier entre 0 et 50, selon le MJ.');
  if(!SOUL_NATURES.includes(nature))throw Error('Nature d’âme non reconnue.');
  const now=new Date().toISOString();
  return {
    kind:CHARACTER_KIND,schemaVersion:CHARACTER_VERSION,id:uuid(),
    createdAt:now,updatedAt:now,archived:false,
    soul:{
      name:cleanName(name,'Le nom de l’âme'),nature,superior:text(superior,120),
      role:text(role,100),hierarchyStatus:text(hierarchyStatus,120),
      concept:text(concept,1200),rank:3,
      attributes:initialSoulAttributes(),initialAttributes:initialSoulAttributes(),
      powers:{intrinsic:'Présence Surnaturelle',hierarchy:'',role:'',assigned:'',additional:[]},
      initialTraits:[],traits:[],residualSkills:{},
      objective:'',motivation:'',links:'',notes:''
    },
    progression:Array.from({length:startingAdvancements},(_,i)=>({
      type:'grant',detail:'Dotation initiale du MJ',date:now,serial:uuid()
    })),host:null,hostHistory:[],incarnationsUsed:0
  };
}
function validateHost(host){
  if(!plain(host))throw Error('Fiche d’hôte invalide.');
  cleanName(host.name,'Le nom de l’hôte');
  if(!plain(host.attributes)||HOST_ATTRIBUTES.some(k=>!Number.isInteger(host.attributes[k])||
    host.attributes[k]<1||host.attributes[k]>5))
    throw Error('Caractéristiques physiques de l’hôte invalides.');
  if(!plain(host.skills)||Object.keys(host.skills).length>200)
    throw Error('Compétences de l’hôte invalides.');
  for(const value of Object.values(host.skills)){
    if(!Number.isInteger(value)||value<-1||value>3)
      throw Error('Niveau de compétence invalide.');
  }
  if(!Array.isArray(host.traits)||!Array.isArray(host.equipment)||
    host.traits.length>100||host.equipment.length>200)
    throw Error('Traits ou objets d’hôte invalides.');
  return true;
}
export function cleanHost(raw){
  if(!plain(raw))throw Error('Hôte invalide.');
  const host={
    id:text(raw.id,120),name:cleanName(raw.name,'Le nom de l’hôte'),
    quality:text(raw.quality,30),occupation:text(raw.occupation,160),
    age:Number.isInteger(raw.age)&&raw.age>=0&&raw.age<=200?raw.age:null,
    attributes:Object.fromEntries(HOST_ATTRIBUTES.map(k=>[k,attr(raw.attributes,k)])),
    skills:{},traits:[],equipment:[],
    picture:typeof raw.picture==='string'&&raw.picture.length<3000?raw.picture:'',
    isSpecial:raw.isSpecial===true,
    originType:text(raw.originType,60),trained:raw.trained===true,
    description:text(raw.description,1000)
  };
  if(!plain(raw.skills))throw Error('Compétences de l’hôte manquantes.');
  for(const [k,v] of Object.entries(raw.skills).slice(0,200)){
    if(!Number.isInteger(v)||v<-1||v>3)throw Error('Compétence invalide : '+k);
    host.skills[text(k,120)]=v;
  }
  for(const [src,dst,max] of [[raw.traits,host.traits,100],[raw.equipment,host.equipment,200]]){
    if(!Array.isArray(src))throw Error('Traits ou équipement de l’hôte absents.');
    for(const val of src.slice(0,max)) {
      const name=text(typeof val==='string'?val:val?.name,180);
      if(name)dst.push(name);
    }
  }
  validateHost(host);
  return host;
}
export function attachHost(character,rawHost){
  validateCharacterCore(character);
  const host=cleanHost(rawHost);
  const next=structuredClone(character);
  if(next.host){
    next.hostHistory.push({host:next.host,replacedAt:new Date().toISOString()});
    if(next.hostHistory.length>100)next.hostHistory=next.hostHistory.slice(-100);
  }
  next.host=host;
  next.updatedAt=new Date().toISOString();
  // Une consultation/remplacement de booster ne consomme PAS à elle seule
  // une incarnation. Celle-ci est comptée au moment décidé par le MJ.
  return validateCharacterCore(next);
}
export function advancements(character){
  let granted=0,used=0;
  for(const event of character.progression||[]){
    if(!plain(event)||typeof event.type!=='string')
      throw Error('Événement de progression invalide.');
    if(event.type==='grant')granted++;
    else if(['power','attribute','residual','trait'].includes(event.type))used++;
    else if(event.type!=='unlockResidual')
      throw Error('Événement de progression inconnu : '+event.type);
  }
  return {granted,used,available:granted-used};
}
export function progressSoul(character,action){
  validateCharacterCore(character);
  if(character.archived)throw Error('Désarchivez cette âme avant de la faire progresser.');
  if(!plain(action))throw Error('Choix de progression invalide.');
  const next=structuredClone(character),now=new Date().toISOString();
  let event;
  if(action.type==='grant'){
    event={type:'grant',detail:text(action.detail||'Progression accordée par le MJ',150)};
  } else if(action.type==='unlockResidual'){
    // Règle spéciale : terme de scénario sans réincarnation (anges).
    if(next.soul.nature!=='angel' || action.completedScenarioWithoutReincarnation!==true)
      throw Error('Compétence résiduelle : récompense conditionnelle réservée aux anges.');
    const host=next.host;
    if(!host)throw Error('Un hôte actuel est requis pour acquérir sa compétence résiduelle.');
    const best=Math.max(...Object.values(host.skills||{}).filter(Number.isInteger),-1);
    const name=cleanName(action.name,'La compétence résiduelle');
    if(best<0 || host.skills[name]!==best)
      throw Error('Seule une compétence de plus haut niveau de l’hôte peut être mémorisée.');
    if(next.soul.residualSkills[name])
      throw Error('Cette compétence résiduelle a déjà été acquise.');
    next.soul.residualSkills[name]=1;
    event={type:'unlockResidual',detail:name};
  } else {
    if(advancements(next).available<1)
      throw Error('Aucune progression disponible : le MJ doit d’abord en accorder une.');
    if(action.type==='power'){
      const name=cleanName(action.name,'Le nouveau pouvoir');
      const existing=[next.soul.powers.intrinsic,next.soul.powers.hierarchy,
        next.soul.powers.role,next.soul.powers.assigned,...next.soul.powers.additional];
      if(existing.some(p=>String(p).toLocaleLowerCase('fr')===name.toLocaleLowerCase('fr')))
        throw Error('Ce pouvoir est déjà possédé.');
      next.soul.powers.additional.push(name);
      event={type:'power',detail:name};
    }else if(action.type==='attribute'){
      const key=action.attribute;
      if(!SOUL_ATTRIBUTES.includes(key))throw Error('Attribut de l’âme inconnu.');
      const value=next.soul.attributes[key];
      if(value>=5)throw Error('Plafond d’attribut de l’âme atteint (5).');
      next.soul.attributes[key]=value+1;
      event={type:'attribute',attribute:key,detail:key+' '+value+' → '+(value+1)};
    }else if(action.type==='residual'){
      const name=cleanName(action.name,'La compétence résiduelle');
      const level=next.soul.residualSkills[name];
      if(!level)throw Error('Compétence résiduelle non acquise : '+name);
      if(level>=3)throw Error('Compétence résiduelle déjà Expert (+3).');
      next.soul.residualSkills[name]=level+1;
      event={type:'residual',detail:name+' +'+level+' → +'+(level+1),skill:name};
    }else if(action.type==='trait'){
      const name=cleanName(action.name,'Le nouveau trait d’âme');
      if(next.soul.traits.some(t=>t.toLocaleLowerCase('fr')===name.toLocaleLowerCase('fr')))
        throw Error('Ce trait d’âme est déjà possédé.');
      next.soul.traits.push(name);
      event={type:'trait',detail:name};
    }else throw Error('Type de progression inconnu.');
  }
  next.progression.push({...event,date:now,serial:uuid()});
  next.updatedAt=now;
  return validateCharacterCore(next);
}
export function changeArchive(character,archived){
  const next=structuredClone(validateCharacterCore(character));
  next.archived=archived===true;next.updatedAt=new Date().toISOString();
  return next;
}
export function updateSoul(character,patch){
  const next=structuredClone(validateCharacterCore(character));
  const soul=next.soul;
  for(const key of ['name','superior','role','hierarchyStatus','concept',
    'objective','motivation','links','notes']){
    if(Object.hasOwn(patch,key))soul[key]=text(patch[key],key==='notes'?10000:1500);
  }
  cleanName(soul.name,'Le nom de l’âme');
  if(Object.hasOwn(patch,'nature')){
    if(!SOUL_NATURES.includes(patch.nature))throw Error('Nature invalide.');
    soul.nature=patch.nature;
  }
  if(Object.hasOwn(patch,'attributes')){
    // Une amélioration déjà acquise ne doit pas être effacée
    // par une nouvelle répartition initiale.
    if(next.progression.some(e=>e.type==='attribute'))
      throw Error('Répartition initiale bloquée après une progression d’attribut.');
    const attrs=validateCreationAttributes(patch.attributes);
    soul.attributes=attrs;soul.initialAttributes={...attrs};
  }
  if(Object.hasOwn(patch,'powers')){
    for(const key of ['hierarchy','role','assigned'])
      if(Object.hasOwn(patch.powers,key))soul.powers[key]=text(patch.powers[key],120);
  }
  if(Object.hasOwn(patch,'traits')){
    if(!Array.isArray(patch.traits)||patch.traits.length>2)
      throw Error('La création autorise deux traits d’âme.');
    const initial=patch.traits.map(t=>text(t,120)).filter(Boolean);
    const advanced=next.progression.filter(e=>e.type==='trait').map(e=>e.detail);
    const all=[...initial,...advanced];
    if(new Set(all.map(t=>t.toLocaleLowerCase('fr'))).size!==all.length)
      throw Error('Un trait d’âme ne peut pas être acquis deux fois.');
    soul.initialTraits=initial;
    soul.traits=all;
  }
  if(Object.hasOwn(patch,'incarnationsUsed')){
    if(!Number.isInteger(patch.incarnationsUsed)||patch.incarnationsUsed<0||
      patch.incarnationsUsed>100)throw Error('Nombre d’incarnations invalide.');
    next.incarnationsUsed=patch.incarnationsUsed;
  }
  next.updatedAt=new Date().toISOString();
  return validateCharacterCore(next);
}
export function exportCharacter(character){
  validateCharacterCore(character);
  return JSON.stringify(character,null,2);
}
export function importCharacter(json,{newId=true}={}){
  if(typeof json!=='string'||json.length>MAX_IMPORT_BYTES)
    throw Error('Le fichier JSON est trop volumineux ou invalide.');
  let parsed;try{parsed=JSON.parse(json);}catch{throw Error('Le fichier n’est pas un JSON valide.');}
  validateCharacterCore(parsed);
  const item=structuredClone(parsed);
  if(newId)item.id=uuid();
  item.updatedAt=new Date().toISOString();
  return validateCharacterCore(item);
}
