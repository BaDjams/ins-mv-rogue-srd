/* Bibliothèque des âmes INS/MV Rogue.
 * Toutes les opérations sont locales : IndexedDB / JSON / impression PDF native.
 */
import {
  createCharacter,updateSoul,validateCharacter,validateCreationAttributes,
  progressSoul,advancements,importCharacter,exportCharacter,SOUL_ATTRIBUTES
} from './rogue-character-model.mjs';
import {
  listCharacters,getCharacter,saveCharacter,deleteCharacter,archiveCharacter,
  getActiveCharacterId,setActiveCharacter,clearActiveCharacter,notifyLibraryChanged
} from './rogue-character-store.mjs';
import {characterPrintHTML,printCharacter} from './rogue-character-print.mjs';

const BASE='/ins-mv-rogue-srd';
const ATTR_LABELS={PUI:'Puissance',INF:'Influence',RES:'Résolution',CLA:'Clairvoyance'};
const ABILITIES={
  attribute:'Augmenter un attribut de l’âme',
  power:'Acquérir un pouvoir',
  residual:'Améliorer une compétence résiduelle',
  trait:'Acquérir un trait d’âme'
};
const natureLabel=n=>n==='angel'?'Ange':'Démon';
function esc(value){
  return String(value??'').replace(/[&<>"']/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}
function textField(label,name,value='',opts={}){
  return '<label class="rc-field"><span>'+esc(label)+'</span>'+
    (opts.multiline?'<textarea name="'+esc(name)+'" rows="'+(opts.rows||3)+'">'+esc(value)+'</textarea>':
      '<input name="'+esc(name)+'" type="'+(opts.type||'text')+'" value="'+esc(value)+
      '"'+(opts.required?' required':'')+(opts.min!=null?' min="'+opts.min+'"':'')+
      (opts.max!=null?' max="'+opts.max+'"':'')+(opts.disabled?' disabled':'')+'>')+
  '</label>';
}
function selectField(label,name,options,selected,disabled=false){
  return '<label class="rc-field"><span>'+esc(label)+'</span><select name="'+esc(name)+
    '"'+(disabled?' disabled':'')+'>'+
    options.map(([value,title])=>'<option value="'+esc(value)+'"'+
      (String(value)===String(selected)?' selected':'')+'>'+esc(title)+'</option>').join('')+
    '</select></label>';
}
function button(label,action,id='',variant=''){
  return '<button type="button" data-action="'+esc(action)+'"'+
    (id?' data-id="'+esc(id)+'"':'')+' class="rc-button '+esc(variant)+'">'+esc(label)+'</button>';
}
function formatDate(date){return date?new Date(date).toLocaleDateString('fr-FR'):'—';}
function download(name,content){
  const blob=new Blob([content],{type:'application/json;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=name.replace(/[^a-z0-9._-]/gi,'-');
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1200);
}
function defaultCreation(){
  return '<form class="rc-creation" data-form="create">'+
    '<h3>Nouvelle âme surnaturelle</h3>'+
    '<p>Le MJ peut demander un personnage débutant ou, par exemple, un personnage avec cinq progressions initiales.</p>'+
    '<div class="rc-fields">'+
      textField('Nom de l’âme','name','',{required:true})+
      selectField('Nature','nature',[['angel','Ange'],['demon','Démon']],'angel')+
      textField('Progressions accordées au départ par le MJ','startingAdvancements',0,
        {type:'number',min:0,max:50})+
    '</div>'+
    '<div class="rc-actions"><button class="rc-button rc-primary" type="submit">Créer et activer</button>'+
      button('Annuler','cancel-create')+'</div>'+
  '</form>';
}
function attrsEditor(character){
  const alreadyProgressed=character.progression.some(e=>e.type==='attribute');
  const values=character.soul.initialAttributes;
  return '<fieldset class="rc-attrs"><legend>Répartition initiale — 8 points, maximum 3</legend>'+
    '<div class="rc-attr-grid">'+SOUL_ATTRIBUTES.map(k=>
      '<label><span>'+ATTR_LABELS[k]+'</span>'+
      '<input type="number" min="1" max="3" step="1" name="attribute-'+k+
      '" value="'+esc(values[k])+'"'+(alreadyProgressed?' disabled':'')+'></label>'
    ).join('')+'</div>'+
    (alreadyProgressed?'<p class="rc-hint">La répartition initiale est verrouillée après une progression d’attribut.</p>':
      '<p class="rc-hint">Les améliorations ultérieures se font exclusivement avec des progressions du MJ.</p>')+
    '<p class="rc-current">Valeurs actuelles : '+SOUL_ATTRIBUTES.map(k=>'<b>'+k+'</b> '+
      character.soul.attributes[k]).join(' · ')+'</p></fieldset>';
}
function identityEditor(character){
  const s=character.soul;
  return '<form data-form="soul" class="rc-soul-form">'+
    '<h3>Identité de l’âme</h3><div class="rc-fields">'+
      textField('Nom surnaturel','name',s.name,{required:true})+
      selectField('Nature','nature',[['angel','Ange'],['demon','Démon']],s.nature)+
      textField('Supérieur hiérarchique','superior',s.superior)+
      textField('Rôle','role',s.role)+
      textField('Position dans la hiérarchie','hierarchyStatus',s.hierarchyStatus)+
      textField('Concept','concept',s.concept)+
    '</div>'+attrsEditor(character)+
    '<h3>Pouvoirs de départ</h3>'+
    '<p class="rc-hint">Présence Surnaturelle est intrinsèque. Renseignez un pouvoir de supérieur, un pouvoir de rôle et le pouvoir assigné par la hiérarchie.</p>'+
    '<div class="rc-fields">'+
      textField('Pouvoir du supérieur','power-hierarchy',s.powers.hierarchy)+
      textField('Pouvoir de rôle','power-role',s.powers.role)+
      textField('Pouvoir assigné','power-assigned',s.powers.assigned)+
    '</div>'+
    '<h3>Deux traits d’âme initiaux</h3>'+
    '<div class="rc-fields">'+
      textField('Premier trait d’âme','trait1',s.initialTraits?.[0]||'')+
      textField('Deuxième trait d’âme','trait2',s.initialTraits?.[1]||'')+
    '</div>'+
    '<h3>Interprétation</h3><div class="rc-fields">'+
      textField('Objectif','objective',s.objective,{multiline:true,rows:2})+
      textField('Motivation','motivation',s.motivation,{multiline:true,rows:2})+
      textField('Relations / liens','links',s.links,{multiline:true,rows:2})+
      textField('Notes','notes',s.notes,{multiline:true,rows:3})+
      textField('Incarnations utilisées','incarnationsUsed',character.incarnationsUsed,{type:'number',min:0,max:100})+
    '</div><div class="rc-actions"><button type="submit" class="rc-button rc-primary">Enregistrer la fiche</button></div></form>';
}
function advancementPanel(character){
  const s=character.soul,balance=advancements(character);
  const residual=Object.entries(s.residualSkills||{});
  const history=character.progression.slice().reverse().slice(0,30).map(e=>
    '<li><time>'+esc(formatDate(e.date))+'</time><span>'+esc(e.detail||e.type)+'</span></li>').join('');
  return '<section class="rc-advancements">'+
    '<h3>Progressions du MJ</h3>'+
    '<div class="rc-counters">'+
      '<div><strong>'+balance.granted+'</strong><span>Accordées</span></div>'+
      '<div><strong>'+balance.used+'</strong><span>Utilisées</span></div>'+
      '<div><strong>'+balance.available+'</strong><span>Disponibles</span></div></div>'+
    '<form data-form="grant" class="rc-inline-form">'+
      '<label>Le MJ accorde <input type="number" name="amount" min="1" max="50" value="1" required> progression(s)</label>'+
      '<button class="rc-button" type="submit">Accorder</button></form>'+
    '<form data-form="advance">'+
      '<h4>Dépenser une progression</h4>'+
      '<div class="rc-fields">'+selectField('Amélioration','kind',
        Object.entries(ABILITIES).map(([key,name])=>[key,name]),'attribute')+
      selectField('Attribut à augmenter','attribute',SOUL_ATTRIBUTES.map(k=>
        [k,ATTR_LABELS[k]+' (actuel '+s.attributes[k]+')']),SOUL_ATTRIBUTES[0])+
      textField('Nouveau pouvoir ou trait d’âme','name','')+
      selectField('Compétence résiduelle existante','residual',
        [['','Sélectionnez une compétence'],...residual.map(([name,level])=>[name,name+' (+'+level+')'])],'')+
      '</div><p class="rc-hint">Chaque progression dépensée procure une seule amélioration, quel que soit le choix.</p>'+
      '<button type="submit" class="rc-button rc-primary"'+(balance.available<1?' disabled':'')+
        '>Utiliser une progression</button></form>'+
    '<details class="rc-special-rule"><summary>Règle spéciale : acquérir une compétence résiduelle</summary>'+
      '<p>Un ange qui termine un scénario sans réincarnation peut mémoriser la meilleure compétence de son hôte. Cette récompense conditionnelle ne consomme pas de progression ordinaire.</p>'+
      '<form data-form="residual-unlock" class="rc-inline-form">'+
      selectField('Compétence la plus élevée de l’hôte','skill',
        [['','Choisissez une compétence'],...bestHostSkills(character).map(k=>[k,k])],'')+
      '<label class="rc-checkbox"><input type="checkbox" name="confirmed" required> Le MJ confirme un scénario terminé sans réincarnation.</label>'+
      '<button type="submit" class="rc-button">Mémoriser (+1)</button></form></details>'+
    (residual.length?'<p class="rc-hint"><strong>Compétences résiduelles :</strong> '+
      residual.map(([name,n])=>esc(name)+' +'+n).join(' · ')+'</p>':'')+
    '<details><summary>Historique des progressions</summary><ol class="rc-history">'+history+'</ol></details>'+
  '</section>';
}
function bestHostSkills(character){
  const skills=character.host?.skills||{};
  const max=Math.max(-1,...Object.values(skills).filter(Number.isInteger));
  return Object.entries(skills).filter(([,level])=>level===max&&level>=0).map(([name])=>name);
}
function hostPanel(character){
  const host=character.host;
  if(!host)return '<section class="rc-host"><h3>Hôte humain</h3><p>Aucun hôte lié.</p>'+
    '<p>Choisissez un hôte depuis le <a href="'+BASE+'/generateur/">générateur de boosters</a> : il sera automatiquement associé au personnage actif.</p></section>';
  return '<section class="rc-host"><h3>Hôte actuel : '+esc(host.name)+'</h3>'+
    '<p>'+esc(host.occupation||'')+(host.quality?' · '+esc(host.quality):'')+'</p>'+
    '<div class="rc-current">FOR '+host.attributes.FOR+' · AGI '+host.attributes.AGI+
      ' · VIG '+host.attributes.VIG+' · PER '+host.attributes.PER+'</div>'+
    '<details><summary>Caractéristiques, compétences et équipement</summary>'+
      '<div class="rc-mini-grid"><div><h4>Compétences</h4><ul>'+
      Object.entries(host.skills).map(([key,v])=>'<li>'+esc(key)+' '+
        esc(v===-1?'Incompétent':'+'+v)+'</li>').join('')+
      '</ul></div><div><h4>Équipement</h4><ul>'+
      host.equipment.map(item=>'<li>'+esc(item)+'</li>').join('')+
      '</ul><h4>Traits</h4><ul>'+host.traits.map(item=>'<li>'+esc(item)+'</li>').join('')+
      '</ul></div></div></details>'+
    '<p class="rc-hint">Changer d’hôte dans le <a href="'+BASE+'/generateur/">générateur de boosters</a> conserve les caractéristiques de l’âme et ajoute l’ancien hôte à son historique.</p>'+
    '</section>';
}
function libraryList(rows,activeId,selectedId,showArchived){
  const list=rows.filter(r=>r.archived===showArchived);
  if(!list.length)return '<p class="rc-empty">'+(showArchived?
    'Aucun personnage archivé.':'Aucun personnage dans la bibliothèque.')+'</p>';
  return '<div class="rc-list">'+list.map(c=>{
    const balance=advancements(c);
    return '<button type="button" class="rc-list-card'+(selectedId===c.id?' rc-selected':'')+
      '" data-action="select" data-id="'+esc(c.id)+'">'+
      '<span class="rc-list-name">'+esc(c.soul.name)+'</span>'+
      '<span class="rc-list-sub">'+natureLabel(c.soul.nature)+
        (c.host?' · '+esc(c.host.name):' · Sans hôte')+'</span>'+
      '<span class="rc-list-meta">'+(activeId===c.id?'<b>PERSONNAGE ACTIF</b> · ':'')+
        balance.used+' progression(s) utilisée(s) · '+balance.available+' en réserve'+
      '</span></button>';
  }).join('')+'</div>';
}
function detail(character,activeId){
  if(!character)return '<div class="rc-placeholder">Sélectionnez un personnage pour consulter sa fiche.</div>';
  const active=character.id===activeId;
  let complete=true;
  try{validateCharacter(character,{allowDraft:false});}
  catch{complete=false;}
  const progress=advancements(character);
  return '<div class="rc-detail"><div class="rc-detail-head"><div><span class="rc-kicker">'+
    (character.archived?'ARCHIVES':'BIBLIOTHÈQUE')+'</span><h2>'+esc(character.soul.name)+'</h2>'+
    '<p>'+natureLabel(character.soul.nature)+' · Rang céleste '+character.soul.rank+
      (character.host?' · Hôte : '+esc(character.host.name):' · Sans hôte')+'</p>'+
    '</div><div class="rc-detail-states"><span class="rc-state">'+
      (character.archived?'Archivé':active?'Actif':'Disponible')+'</span>'+
      (!complete?'<span class="rc-state rc-incomplete">Création à compléter</span>':'')+
    '</div></div>'+
    '<div class="rc-actions">'+
      (!character.archived&&!active?button('Activer ce personnage','activate',character.id,'rc-primary'):'')+
      button('Exporter JSON','export-json',character.id)+
      button('Fiche PDF / imprimer','print',character.id)+
      button(character.archived?'Désarchiver':'Archiver',
        character.archived?'unarchive':'archive',character.id)+
      button('Supprimer définitivement','delete',character.id,'rc-danger')+
    '</div>'+
    '<div class="rc-detail-columns"><div>'+identityEditor(character)+hostPanel(character)+
    '</div><div>'+advancementPanel(character)+'</div></div>'+
  '</div>';
}
function init(container){
  if(container.dataset.rcInitialized==='yes')return;
  container.dataset.rcInitialized='yes';
  const state={
    rows:[],selectedId:null,activeId:null,showArchived:false,creating:false,
    lastStartingAdvancements:0,busy:false
  };
  container.innerHTML='<div class="rc-library">'+
    '<header class="rc-library-top"><h2>Bibliothèque des âmes</h2>'+
      '<p>Vos personnages sont conservés uniquement sur cet appareil, dans ce navigateur.</p></header>'+
    '<div class="rc-toolbar">'+button('Créer une âme','new')+
      '<label class="rc-import-label">Importer une fiche JSON<input type="file" data-rc="import" accept=".json,application/json" hidden></label>'+
      '<label class="rc-archive-toggle"><input type="checkbox" data-rc="archived"> Afficher les archives</label>'+
    '</div>'+
    '<div class="rc-library-status" data-rc="status" role="status" aria-live="polite"></div>'+
    '<div class="rc-library-layout"><aside class="rc-sidebar">'+
      '<div data-rc="active"></div><div data-rc="list"></div>'+
    '</aside><main class="rc-main" data-rc="main"></main></div>'+
    '<p class="rc-storage-warning"><strong>Sauvegarde :</strong> l’effacement des données du site ou du navigateur peut supprimer cette bibliothèque. Pensez à exporter vos fiches en JSON. Il n’y a ni synchronisation cloud ni accès du MJ à vos données locales.</p>'+
  '</div>';
  const $=key=>container.querySelector('[data-rc="'+key+'"]');
  const status=$('status');
  function message(content,error=false){status.textContent=content;status.classList.toggle('rc-error',error);}
  async function reload(select=state.selectedId){
    state.rows=await listCharacters();
    state.activeId=await getActiveCharacterId();
    const visible=state.rows.filter(r=>r.archived===state.showArchived);
    state.selectedId=visible.some(r=>r.id===select)?select:(visible[0]?.id??null);
    display();
  }
  function display(){
    const active=state.rows.find(r=>r.id===state.activeId&&!r.archived);
    $('active').innerHTML='<div class="rc-active-summary"><span>PERSONNAGE ACTIF</span>'+
      (active?'<strong>'+esc(active.soul.name)+'</strong>'+
        '<small>'+(active.host?'Hôte : '+esc(active.host.name):'Aucun hôte sélectionné')+'</small>':
        '<strong>Aucun</strong><small>Sélectionnez un personnage actif avant de tirer un hôte.</small>')+
    '</div>';
    $('archived').checked=state.showArchived;
    $('list').innerHTML=libraryList(state.rows,state.activeId,state.selectedId,state.showArchived);
    const current=state.rows.find(r=>r.id===state.selectedId)||null;
    $('main').innerHTML=state.creating?defaultCreation():detail(current,state.activeId);
    if(state.creating){
      const input=$('main').querySelector('[name="startingAdvancements"]');
      if(input)input.value=state.lastStartingAdvancements;
    }
  }
  async function task(fn,success='Modifications enregistrées.'){
    if(state.busy)return;
    state.busy=true;
    try{
      await fn();
      await reload();
      message(success);
      notifyLibraryChanged(state.activeId);
    }catch(e){
      console.error('Gestion des personnages :',e);
      message(e.message||'Opération impossible.',true);
    }finally{state.busy=false;}
  }
  function selected(){
    const row=state.rows.find(r=>r.id===state.selectedId);
    if(!row)throw Error('Sélectionnez d’abord un personnage.');
    return row;
  }
  container.addEventListener('change',e=>{
    if(e.target.matches('[data-rc="archived"]')){
      state.showArchived=e.target.checked;state.creating=false;display();
      reload(null).catch(e=>message(e.message,true));
    }
  });
  container.addEventListener('click',e=>{
    const btn=e.target.closest('button[data-action]');
    if(!btn||state.busy)return;
    const action=btn.dataset.action,id=btn.dataset.id;
    if(action==='new'){
      state.creating=true;state.showArchived=false;
      display();return;
    }
    if(action==='cancel-create'){state.creating=false;display();return;}
    if(action==='select'){
      state.creating=false;state.selectedId=id;display();return;
    }
    if(action==='export-json'){
      const row=state.rows.find(r=>r.id===id);
      if(row)download('rogue-'+row.soul.name+'.json',exportCharacter(row));
      return;
    }
    if(action==='print'){
      const row=state.rows.find(r=>r.id===id);
      if(row)printCharacter(row);
      return;
    }
    if(action==='delete'){
      const row=state.rows.find(r=>r.id===id);
      if(!row||!confirm('Supprimer définitivement « '+row.soul.name+
        ' » de cet appareil ? Cette opération est irréversible.'))return;
      task(()=>deleteCharacter(id),'Personnage supprimé.');
      return;
    }
    if(action==='activate'){
      task(()=>setActiveCharacter(id),'Personnage actif sélectionné.');return;
    }
    if(action==='archive'){
      if(!confirm('Archiver ce personnage ? Il restera dans la bibliothèque.'))return;
      task(async()=>{
        await archiveCharacter(id,true);
        state.selectedId=null;
      },'Personnage archivé.');return;
    }
    if(action==='unarchive'){
      task(async()=>{
        await archiveCharacter(id,false);
        state.showArchived=false;
        state.selectedId=id;
      },'Personnage désarchivé.');return;
    }
  });
  container.addEventListener('submit',e=>{
    const form=e.target.closest('[data-form]');
    if(!form||state.busy)return;
    e.preventDefault();
    const fields=new FormData(form);
    const get=name=>String(fields.get(name)??'').trim();
    if(form.dataset.form==='create'){
      task(async()=>{
        const amount=Number(get('startingAdvancements'));
        const created=createCharacter({
          name:get('name'),nature:get('nature'),startingAdvancements:amount
        });
        await saveCharacter(created);
        await setActiveCharacter(created.id);
        state.lastStartingAdvancements=amount;
        state.creating=false;state.showArchived=false;state.selectedId=created.id;
      },'Nouvelle âme créée et activée. Répartissez les progressions de départ.');return;
    }
    if(form.dataset.form==='soul'){
      task(async()=>{
        const row=selected(),patch={
          name:get('name'),nature:get('nature'),superior:get('superior'),
          role:get('role'),hierarchyStatus:get('hierarchyStatus'),
          concept:get('concept'),objective:get('objective'),
          motivation:get('motivation'),links:get('links'),notes:get('notes'),
          incarnationsUsed:Number(get('incarnationsUsed')),
          powers:{
            hierarchy:get('power-hierarchy'),role:get('power-role'),
            assigned:get('power-assigned')
          },
          traits:[get('trait1'),get('trait2')].filter(Boolean)
        };
        if(!row.progression.some(v=>v.type==='attribute')){
          patch.attributes=Object.fromEntries(SOUL_ATTRIBUTES.map(k=>
            [k,Number(get('attribute-'+k))]));
        }
        await saveCharacter(updateSoul(row,patch));
      },'Fiche de l’âme enregistrée.');return;
    }
    if(form.dataset.form==='grant'){
      task(async()=>{
        let item=selected();
        const n=Number(get('amount'));
        if(!Number.isInteger(n)||n<1||n>50)throw Error('Indiquez entre 1 et 50 progressions.');
        for(let i=0;i<n;i++)item=progressSoul(item,{type:'grant'});
        await saveCharacter(item);
      },'Le MJ a accordé les progressions.');return;
    }
    if(form.dataset.form==='advance'){
      task(async()=>{
        const kind=get('kind'),choice={
          type:kind,attribute:get('attribute'),
          name:kind==='residual'?get('residual'):get('name')
        };
        await saveCharacter(progressSoul(selected(),choice));
      },'Une progression utilisée et enregistrée.');return;
    }
    if(form.dataset.form==='residual-unlock'){
      task(async()=>{
        const action={type:'unlockResidual',name:get('skill'),
          completedScenarioWithoutReincarnation:fields.get('confirmed')==='on'};
        await saveCharacter(progressSoul(selected(),action));
      },'Compétence résiduelle mémorisée.');return;
    }
  });
  $('import').addEventListener('change',e=>{
    const file=e.target.files?.[0];
    if(!file)return;
    task(async()=>{
      if(file.size>2*1024*1024)throw Error('Le fichier dépasse 2 Mo.');
      const json=await file.text();
      const imported=importCharacter(json,{newId:true});
      await saveCharacter(imported);
      state.showArchived=imported.archived;
      state.selectedId=imported.id;state.creating=false;
    },'Fiche JSON importée dans la bibliothèque.');
    e.target.value='';
  });
  window.addEventListener('rogue:character-changed',()=>{
    if(!state.busy)reload().catch(e=>message(e.message,true));
  });
  reload().catch(e=>message(e.message||'IndexedDB indisponible.',true));
}
function initialize(){
  document.querySelectorAll('.rogue-character-library').forEach(init);
}
if(typeof document!=='undefined'){
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize);
  else initialize();
  document.addEventListener('astro:page-load',initialize);
}
