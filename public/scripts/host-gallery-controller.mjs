/* Galerie d'incarnation : navigation mobile, fiche plein écran et
   infobulles de traits accessibles au survol, au clavier et au toucher. */
let tooltipInstalled=false;
export function installHostTraitTooltips(){
  if(tooltipInstalled||typeof document==='undefined')return;
  tooltipInstalled=true;
  const tip=document.createElement('div');
  tip.className='rb-floating-tooltip';tip.id='rb-floating-tooltip';
  tip.setAttribute('role','tooltip');tip.hidden=true;
  document.body.appendChild(tip);
  let anchor=null,pinned=false;
  function move(){
    if(!anchor||tip.hidden)return;
    const box=anchor.getBoundingClientRect();
    const maxWidth=Math.min(320,window.innerWidth-24);
    tip.style.maxWidth=maxWidth+'px';
    let left=Math.max(12,Math.min(window.innerWidth-maxWidth-12,box.left));
    tip.style.left=left+'px';
    tip.style.top='0px';
    const height=tip.getBoundingClientRect().height;
    const below=box.bottom+10;
    const top=below+height<window.innerHeight-8
      ?below:Math.max(8,box.top-height-10);
    tip.style.top=top+'px';
  }
  function hide(){
    if(anchor){
      anchor.removeAttribute('aria-describedby');
      anchor.setAttribute('aria-expanded','false');
    }
    anchor=null;pinned=false;tip.hidden=true;
  }
  function show(button,pin=false){
    if(!button||!button.dataset.traitHelp)return;
    if(anchor&&anchor!==button)anchor.removeAttribute('aria-describedby');
    anchor=button;pinned=pin;tip.textContent=button.dataset.traitHelp;
    tip.hidden=false;button.setAttribute('aria-describedby',tip.id);
    button.setAttribute('aria-expanded',String(pin));move();
  }
  document.addEventListener('pointerover',e=>{
    const chip=e.target.closest?.('.rb-trait-chip');
    if(chip&&!pinned&&e.pointerType!=='touch')show(chip);
  });
  document.addEventListener('pointerout',e=>{
    const chip=e.target.closest?.('.rb-trait-chip');
    if(chip===anchor&&!pinned&&e.pointerType!=='touch'&&!chip.contains(e.relatedTarget))
      hide();
  });
  document.addEventListener('focusin',e=>{
    const chip=e.target.closest?.('.rb-trait-chip');
    if(chip&&!pinned)show(chip);
  });
  document.addEventListener('focusout',e=>{
    if(e.target===anchor&&!pinned)hide();
  });
  document.addEventListener('click',e=>{
    const chip=e.target.closest?.('.rb-trait-chip');
    if(chip){
      if(anchor===chip&&pinned)hide();
      else show(chip,true);
    }else if(anchor){
      hide();
    }
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')hide();});
  window.addEventListener('resize',move);
  document.addEventListener('scroll',move,true);
}
export function createHostGallery({
  hosts,best=[],renderCard,onChoose,accent='#d0b17c'
}){
  installHostTraitTooltips();
  const row=document.createElement('div');
  row.className='rb-card-rack rb-gallery';row.setAttribute('role','region');
  row.setAttribute('aria-label','Galerie des hôtes obtenus');
  row.tabIndex=0;
  const modal=document.createElement('div');
  modal.className='rb-fullscreen';modal.hidden=true;
  modal.style.setProperty('--rb-booster-color',accent);
  modal.innerHTML=[
    '<div class="rb-fullscreen-backdrop" data-rb-modal="backdrop"></div>',
    '<section class="rb-fullscreen-panel" role="dialog" aria-modal="true"',
    ' aria-label="Fiche de personnage en plein écran" tabindex="-1">',
      '<header class="rb-fullscreen-header">',
        '<button type="button" class="rb-fullscreen-close" data-rb-modal="close" aria-label="Fermer la fiche">×</button>',
        '<strong data-rb-modal="name"></strong>',
        '<span data-rb-modal="position" aria-live="polite"></span>',
      '</header>',
      '<div class="rb-fullscreen-scroll" data-rb-modal="scroll">',
        '<article class="rb-card rb-full-card rb-revealed" data-rb-modal="card"></article>',
      '</div>',
      '<footer class="rb-fullscreen-footer">',
        '<button type="button" data-rb-modal="prev" aria-label="Carte précédente">‹</button>',
        '<button type="button" data-rb-modal="choose" class="rb-fullscreen-choose">Choisir cet hôte</button>',
        '<button type="button" data-rb-modal="next" aria-label="Carte suivante">›</button>',
      '</footer>',
    '</section>'
  ].join('');
  const $=name=>modal.querySelector('[data-rb-modal="'+name+'"]');
  let modalIndex=0,active=0,restoreFocus=null,previousBodyOverflow='';
  const cards=hosts.map((host,i)=>{
    const card=document.createElement('article');
    card.className='rb-card rb-quality-'+host.quality;
    card.style.setProperty('--rb-index',String(i));
    card.setAttribute('aria-label','Hôte '+(i+1)+' : '+host.name);
    card.innerHTML=renderCard(host);
    const open=document.createElement('button');
    open.type='button';open.className='rb-card-open';
    open.textContent='Agrandir';open.setAttribute('aria-label',
      'Voir la fiche de '+host.name+' en plein écran');
    open.addEventListener('click',()=>openModal(i));
    card.appendChild(open);
    card.addEventListener('click',e=>{
      if(e.target.closest('.rb-trait-chip, .rb-card-open'))return;
      openModal(i);
    });
    row.appendChild(card);
    return card;
  });
  const controls=document.createElement('nav');
  controls.className='rb-gallery-controls';
  controls.setAttribute('aria-label','Navigation dans la galerie');
  controls.innerHTML=[
    '<button type="button" data-rb-gallery="prev" aria-label="Carte précédente">‹</button>',
    '<span class="rb-gallery-position" data-rb-gallery="position" aria-live="polite"></span>',
    '<button type="button" data-rb-gallery="next" aria-label="Carte suivante">›</button>'
  ].join('');
  const ga=name=>controls.querySelector('[data-rb-gallery="'+name+'"]');
  function position(){
    ga('position').textContent=(active+1)+' / '+hosts.length;
    ga('prev').disabled=active===0;
    ga('next').disabled=active===hosts.length-1;
  }
  function scrollToCard(i){
    active=Math.min(hosts.length-1,Math.max(0,i));position();
    const card=cards[active];
    const x=card.offsetLeft-cards[0].offsetLeft-
      (row.clientWidth-card.clientWidth)/2;
    if(typeof row.scrollTo==='function')
      row.scrollTo({left:Math.max(0,x),behavior:'smooth'});
  }
  ga('prev').addEventListener('click',()=>scrollToCard(active-1));
  ga('next').addEventListener('click',()=>scrollToCard(active+1));
  row.addEventListener('scroll',()=>{
    const frame=row.getBoundingClientRect();
    const center=frame.left+frame.width/2;
    let nearest=0,distance=Infinity;
    cards.forEach((card,i)=>{
      const box=card.getBoundingClientRect();
      const delta=Math.abs(box.left+box.width/2-center);
      if(delta<distance){nearest=i;distance=delta;}
    });
    if(active!==nearest){active=nearest;position();}
  },{passive:true});
  position();
  function setModalCard(i){
    modalIndex=Math.min(hosts.length-1,Math.max(0,i));
    const host=hosts[modalIndex],card=$('card');
    card.className='rb-card rb-full-card rb-revealed rb-quality-'+host.quality+
      (best.includes(modalIndex)?' rb-card-best':'');
    card.innerHTML=renderCard(host);
    $('name').textContent=host.name;
    $('position').textContent=(modalIndex+1)+' / '+hosts.length;
    $('prev').disabled=modalIndex===0;
    $('next').disabled=modalIndex===hosts.length-1;
    $('scroll').scrollTop=0;
  }
  function openModal(i){
    if(!cards[i].classList.contains('rb-revealed'))return;
    restoreFocus=document.activeElement;
    previousBodyOverflow=document.body.style.overflow;
    setModalCard(i);
    modal.hidden=false;
    document.body.style.overflow='hidden';
    $('close').focus();
  }
  function closeModal(){
    if(modal.hidden)return;
    modal.hidden=true;
    document.body.style.overflow=previousBodyOverflow;
    if(restoreFocus?.isConnected)restoreFocus.focus();
    scrollToCard(modalIndex);
  }
  $('close').addEventListener('click',closeModal);
  $('backdrop').addEventListener('click',closeModal);
  $('prev').addEventListener('click',()=>setModalCard(modalIndex-1));
  $('next').addEventListener('click',()=>setModalCard(modalIndex+1));
  $('choose').addEventListener('click',()=>{
    onChoose(modalIndex,cards);
    closeModal();
  });
  modal.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeModal();}
    if(e.key==='ArrowLeft'){e.preventDefault();setModalCard(modalIndex-1);}
    if(e.key==='ArrowRight'){e.preventDefault();setModalCard(modalIndex+1);}
    if(e.key==='Tab'){
      const focusables=Array.from(modal.querySelectorAll('button:not(:disabled), .rb-trait-chip'))
        .filter(el=>el.getClientRects().length);
      const first=focusables[0],last=focusables.at(-1);
      if(e.shiftKey&&document.activeElement===first){
        e.preventDefault();last?.focus();
      }else if(!e.shiftKey&&document.activeElement===last){
        e.preventDefault();first?.focus();
      }
    }
  });
  let startX=null,startY=null;
  $('scroll').addEventListener('touchstart',e=>{
    if(e.touches.length!==1)return;
    startX=e.touches[0].clientX;startY=e.touches[0].clientY;
  },{passive:true});
  $('scroll').addEventListener('touchend',e=>{
    if(startX===null||!e.changedTouches.length)return;
    const dx=e.changedTouches[0].clientX-startX;
    const dy=e.changedTouches[0].clientY-startY;
    startX=null;startY=null;
    if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.35)
      setModalCard(modalIndex+(dx<0?1:-1));
  },{passive:true});
  const onPageSwap=()=>{closeModal();modal.remove();};
  document.addEventListener('astro:before-swap',onPageSwap,{once:true});
  document.body.appendChild(modal);
  function destroy(){
    closeModal();
    modal.remove();
    document.removeEventListener('astro:before-swap',onPageSwap);
  }
  return {cards,row,controls,openModal,closeModal,destroy};
}
