/* Bibliothèque locale du navigateur. Aucun compte serveur ni transfert réseau :
 * les fiches restent dans IndexedDB pour CE navigateur et CET appareil.
 */
import {validateCharacter,attachHost,changeArchive} from './rogue-character-model.mjs';

const DB_NAME='insmv-rogue-srd-personnages';
const DB_VERSION=1;
const CHARACTERS='characters',META='meta',ACTIVE_KEY='activeId';
let opening=null;
function request(req){
  return new Promise((resolve,reject)=>{
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error||Error('IndexedDB : requête impossible.'));
  });
}
function done(tx){
  return new Promise((resolve,reject)=>{
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(tx.error||Error('IndexedDB : transaction impossible.'));
    tx.onabort=()=>reject(tx.error||Error('IndexedDB : transaction annulée.'));
  });
}
export function openCharacterDB(){
  if(opening)return opening;
  if(typeof indexedDB==='undefined')
    return Promise.reject(Error('Votre navigateur ne permet pas IndexedDB dans ce contexte.'));
  opening=new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,DB_VERSION);
    req.onupgradeneeded=()=>{
      const db=req.result;
      if(!db.objectStoreNames.contains(CHARACTERS)){
        const store=db.createObjectStore(CHARACTERS,{keyPath:'id'});
        store.createIndex('archived','archived');
        store.createIndex('updatedAt','updatedAt');
      }
      if(!db.objectStoreNames.contains(META))
        db.createObjectStore(META,{keyPath:'key'});
    };
    req.onsuccess=()=>{
      const db=req.result;
      db.onversionchange=()=>{db.close();opening=null;};
      resolve(db);
    };
    req.onerror=()=>{
      opening=null;
      reject(req.error||Error('Impossible d’ouvrir la bibliothèque IndexedDB.'));
    };
    req.onblocked=()=>{
      opening=null;
      reject(Error('Fermez les autres onglets du SRD pour mettre à jour la bibliothèque.'));
    };
  });
  return opening;
}
async function read(store,key){
  const db=await openCharacterDB();
  const tx=db.transaction(store,'readonly');
  const result=await request(tx.objectStore(store).get(key));
  await done(tx);
  return result??null;
}
export async function listCharacters(){
  const db=await openCharacterDB();
  const tx=db.transaction(CHARACTERS,'readonly');
  const rows=await request(tx.objectStore(CHARACTERS).getAll());
  await done(tx);
  return rows.sort((a,b)=>
    Number(a.archived)-Number(b.archived)||
    String(b.updatedAt).localeCompare(String(a.updatedAt))||
    String(a.soul.name).localeCompare(String(b.soul.name),'fr')
  );
}
export async function getCharacter(id){
  if(!id)return null;
  return read(CHARACTERS,id);
}
export async function saveCharacter(character){
  const record=structuredClone(validateCharacter(character));
  const db=await openCharacterDB();
  const tx=db.transaction([CHARACTERS,META],'readwrite');
  const wait=done(tx);
  tx.objectStore(CHARACTERS).put(record);
  if(record.archived){
    // On purge la sélection seulement si l'âme archivée était active.
    const req=tx.objectStore(META).get(ACTIVE_KEY);
    req.onsuccess=()=>{
      if(req.result?.value===record.id)
        tx.objectStore(META).delete(ACTIVE_KEY);
    };
  }
  await wait;
  return record;
}
export async function deleteCharacter(id){
  const db=await openCharacterDB();
  const tx=db.transaction([CHARACTERS,META],'readwrite');
  const wait=done(tx);
  tx.objectStore(CHARACTERS).delete(id);
  const req=tx.objectStore(META).get(ACTIVE_KEY);
  req.onsuccess=()=>{
    if(req.result?.value===id)tx.objectStore(META).delete(ACTIVE_KEY);
  };
  await wait;
}
export async function archiveCharacter(id,archived){
  const existing=await getCharacter(id);
  if(!existing)throw Error('Personnage introuvable.');
  return saveCharacter(changeArchive(existing,archived));
}
export async function getActiveCharacterId(){
  const item=await read(META,ACTIVE_KEY);
  return item?.value??null;
}
export async function getActiveCharacter(){
  const id=await getActiveCharacterId();
  if(!id)return null;
  const character=await getCharacter(id);
  return character&&!character.archived?character:null;
}
export async function setActiveCharacter(id){
  const character=await getCharacter(id);
  if(!character)throw Error('Personnage introuvable.');
  if(character.archived)throw Error('Désarchivez ce personnage pour le rendre actif.');
  const db=await openCharacterDB();
  const tx=db.transaction(META,'readwrite');
  const wait=done(tx);
  tx.objectStore(META).put({key:ACTIVE_KEY,value:id});
  await wait;
  notifyLibraryChanged(id);
  return character;
}
export async function clearActiveCharacter(){
  const db=await openCharacterDB();
  const tx=db.transaction(META,'readwrite');
  const wait=done(tx);
  tx.objectStore(META).delete(ACTIVE_KEY);
  await wait;
  notifyLibraryChanged(null);
}
export async function attachHostToActive(rawHost){
  const active=await getActiveCharacter();
  if(!active)return null;
  const next=attachHost(active,rawHost);
  const result=await saveCharacter(next);
  notifyLibraryChanged(result.id);
  return result;
}
export function notifyLibraryChanged(id){
  if(typeof window!=='undefined')
    window.dispatchEvent(new CustomEvent('rogue:character-changed',{detail:{id}}));
}
