import test from 'node:test';
import assert from 'node:assert/strict';
import {createCharacter} from '../public/scripts/rogue-character-model.mjs';
import {
  saveCharacter,listCharacters,getCharacter,getActiveCharacter,setActiveCharacter,
  getActiveCharacterId,archiveCharacter,deleteCharacter,attachHostToActive,
  clearActiveCharacter
} from '../public/scripts/rogue-character-store.mjs';

/* Simulateur minimal des transactions IndexedDB avec les événements asynchrones
 * standard, suffisant pour tester les opérations exercées par la bibliothèque. */
function fakeIndexedDB(){
  const data=new Map();
  const stores=new Map();
  function makeDB(){
    return {
      objectStoreNames:{contains(name){return stores.has(name);}},
      createObjectStore(name,options){
        const store={keyPath:options.keyPath,items:new Map()};
        stores.set(name,store);
        return {createIndex(){}};
      },
      transaction(names,mode){
        let waiting=0,finished=false,scheduled=false;
        const tx={oncomplete:null,onerror:null,onabort:null,error:null};
        function scheduleEnd(){
          if(waiting||scheduled||finished)return;
          scheduled=true;
          setTimeout(()=>{
            scheduled=false;
            if(waiting||finished){scheduleEnd();return;}
            finished=true;
            tx.oncomplete?.();
          },0);
        }
        tx.objectStore=name=>{
          const store=stores.get(name);
          assert.ok(store,'Magasin IndexedDB inconnu : '+name);
          function operation(action){
            const req={onsuccess:null,onerror:null,result:undefined,error:null};
            waiting++;
            queueMicrotask(()=>{
              try{
                req.result=action();
                req.onsuccess?.();
              }catch(e){
                req.error=e;
                req.onerror?.();
                tx.error=e;tx.onerror?.();
              }finally{waiting--;scheduleEnd();}
            });
            return req;
          }
          return {
            get:key=>operation(()=>structuredClone(store.items.get(key))),
            getAll:()=>operation(()=>Array.from(store.items.values()).map(item=>structuredClone(item))),
            put:record=>operation(()=>{
              store.items.set(record[store.keyPath],structuredClone(record));
              return record[store.keyPath];
            }),
            delete:key=>operation(()=>store.items.delete(key))
          };
        };
        return tx;
      }
    };
  }
  const db=makeDB();
  return {
    open(name,version){
      const req={result:db,error:null,onupgradeneeded:null,onsuccess:null,onerror:null,onblocked:null};
      queueMicrotask(()=>{
        req.onupgradeneeded?.();
        req.onsuccess?.();
      });
      return req;
    }
  };
}
const host={
  id:'host-test',name:'Hôte de test',quality:'superior',
  occupation:'Enseignant',age:34,attributes:{FOR:2,AGI:1,VIG:2,PER:2},
  skills:{Enseignement:2},traits:['Cultivé'],equipment:['Sac','Stylo']
};
test('IndexedDB : création, sélection active, attachement, archive, restauration et suppression',async()=>{
  const original=globalThis.indexedDB;
  globalThis.indexedDB=fakeIndexedDB();
  try{
    const a=createCharacter({name:'Sariel',startingAdvancements:5});
    const b=createCharacter({name:'Myriel',startingAdvancements:0});
    await saveCharacter(a);
    await saveCharacter(b);
    assert.equal((await listCharacters()).length,2);
    assert.equal(await getActiveCharacterId(),null);

    await setActiveCharacter(a.id);
    assert.equal((await getActiveCharacter()).soul.name,'Sariel');
    const linked=await attachHostToActive(host);
    assert.equal(linked.host.name,'Hôte de test');
    assert.equal((await getCharacter(a.id)).host.name,'Hôte de test');

    await archiveCharacter(a.id,true);
    assert.equal((await getCharacter(a.id)).archived,true);
    assert.equal(await getActiveCharacterId(),null);
    await assert.rejects(()=>setActiveCharacter(a.id),/Désarchivez/);

    await archiveCharacter(a.id,false);
    assert.equal((await getCharacter(a.id)).archived,false);
    await setActiveCharacter(a.id);
    assert.equal((await getActiveCharacter()).host.name,'Hôte de test');
    await deleteCharacter(a.id);
    assert.equal(await getCharacter(a.id),null);
    assert.equal(await getActiveCharacterId(),null);

    await setActiveCharacter(b.id);
    assert.equal((await getActiveCharacter()).soul.name,'Myriel');
    await clearActiveCharacter();
    assert.equal(await getActiveCharacterId(),null);
  }finally{globalThis.indexedDB=original;}
});
