/* Ouverture immersive : superposition plein écran de l'application.
   Le tirage reste dans le DOM tant que le joueur ne relance pas de booster. */
export function createBoosterOverlay({title,accent='#c4a572',onClose=()=>{}}){
  if(typeof document==='undefined')throw new Error('Le navigateur est requis pour ouvrir un booster.');
  const root=document.createElement('div');
  root.className='rb-reveal-overlay';
  root.hidden=true;
  root.style.setProperty('--rb-booster-color',accent);
  root.innerHTML=[
    '<div class="rb-overlay-backdrop" data-rb-overlay="backdrop"></div>',
    '<section class="rb-overlay-panel" role="dialog" aria-modal="true" ',
      'aria-label="Ouverture du booster '+escapeAttribute(title)+'" tabindex="-1">',
      '<header class="rb-overlay-header">',
        '<div class="rb-overlay-heading">',
          '<span class="rb-eyebrow">INS/MV ROGUE · TIRAGE D’INCARNATION</span>',
          '<strong data-rb-overlay="title"></strong>',
        '</div>',
        '<button type="button" class="rb-overlay-close" data-rb-overlay="close"',
          ' aria-label="Fermer l’ouverture du booster">×</button>',
      '</header>',
      '<div class="rb-overlay-content" data-rb-overlay="content">',
        '<div class="rb-stage rb-overlay-stage" data-rb-overlay="stage" aria-label="Cartes tirées"></div>',
      '</div>',
      '<footer class="rb-overlay-footer">',
        '<p data-rb-overlay="status" role="status" aria-live="polite"></p>',
        '<button type="button" class="rb-overlay-return" data-rb-overlay="return">Revenir au SRD</button>',
      '</footer>',
    '</section>'
  ].join('');
  const $=name=>root.querySelector('[data-rb-overlay="'+name+'"]');
  $('title').textContent=title;
  const stage=$('stage'),status=$('status');
  let priorFocus=null,priorOverflow='',shown=false;
  function close(){
    if(!shown)return;
    shown=false;root.hidden=true;
    document.body.style.overflow=priorOverflow;
    if(priorFocus?.isConnected)priorFocus.focus({preventScroll:true});
    onClose();
  }
  function show(){
    if(shown)return;
    priorFocus=document.activeElement;
    priorOverflow=document.body.style.overflow;
    root.hidden=false;shown=true;
    document.body.style.overflow='hidden';
    $('close').focus({preventScroll:true});
  }
  function destroy(){
    close();
    document.removeEventListener('astro:before-swap',destroy);
    root.remove();
  }
  $('close').addEventListener('click',close);
  $('return').addEventListener('click',close);
  $('backdrop').addEventListener('click',close);
  root.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      event.stopPropagation();event.preventDefault();close();
    }
    if(event.key==='Tab'){
      const focus=Array.from(root.querySelectorAll('button:not(:disabled),select:not(:disabled),[tabindex="0"]'))
        .filter(el=>el.getClientRects().length && !el.closest('[inert]'));
      if(!focus.length)return;
      const first=focus[0],last=focus.at(-1);
      if(event.shiftKey&&document.activeElement===first){
        event.preventDefault();last.focus();
      }else if(!event.shiftKey&&document.activeElement===last){
        event.preventDefault();first.focus();
      }
    }
  });
  document.addEventListener('astro:before-swap',destroy,{once:true});
  document.body.appendChild(root);
  return {root,stage,status,show,close,destroy,
    setStatus(message){status.textContent=message;}};
}
function escapeAttribute(value){
  return String(value??'').replace(/[&<>"']/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}
