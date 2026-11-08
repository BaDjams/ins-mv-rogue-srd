/* Galerie d'incarnation : navigation mobile, fiche plein écran et
   infobulles de traits accessibles au survol, au clavier et au toucher. */
let tooltipInstalled=false;
let dismissTraitTooltip=null;

// Utilisé lors du changement de carte, de la fermeture des dialogues
// et par le clic en dehors d'un trait.
export function closeHostTraitTooltip(){
  dismissTraitTooltip?.();
}
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
    const left=Math.max(12,Math.min(window.innerWidth-maxWidth-12,box.left));
    tip.style.left=left+'px';
    tip.style.top='0px';
    const height=tip.getBoundingClientRect().height;
    const below=box.bottom+10;
    tip.style.top=(below+height<window.innerHeight-8
      ?below:Math.max(8,box.top-height-10))+'px';
  }
  function resetChip(chip){
    if(!chip)return;
    chip.removeAttribute('aria-describedby');
    chip.setAttribute('aria-expanded','false');
  }
  function hide(blur=false){
    const old=anchor;
    resetChip(old);
    anchor=null;pinned=false;tip.hidden=true;
    // Sur les écrans tactiles, garder le focus après un tap entretient
    // parfois l'état visuel : ne pas conserver ce focus pour un chip fermé.
    if(blur&&old&&document.activeElement===old)old.blur();
  }
  dismissTraitTooltip=()=>hide(true);
  function show(button,pin=false){
    if(!button||!button.dataset.traitHelp)return;
    if(anchor&&anchor!==button)resetChip(anchor);
    anchor=button;pinned=pin;tip.textContent=button.dataset.traitHelp;
    tip.hidden=false;
    button.setAttribute('aria-describedby',tip.id);
    button.setAttribute('aria-expanded',String(pin));
    move();
  }
  document.addEventListener('pointerover',e=>{
    const chip=e.target.closest?.('.rb-trait-chip');
    if(chip&&!pinned&&e.pointerType!=='touch')show(chip);
  });
  document.addEventListener('pointerout',e=>{
    const chip=e.target.closest?.('.rb-trait-chip');
    if(chip===anchor&&!pinned&&e.pointerType!=='touch'&&
      !chip.contains(e.relatedTarget)&&document.activeElement!==chip)hide();
  });
  document.addEventListener('focusin',e=>{
    const chip=e.target.closest?.('.rb-trait-chip');
    if(chip&&!pinned)show(chip);
  });
  document.addEventListener('focusout',e=>{
    if(e.target===anchor)hide();
  });
  document.addEventListener('click',e=>{
    const chip=e.target.closest?.('.rb-trait-chip');
    if(chip){
      if(anchor===chip&&pinned)hide(true);
      else show(chip,true);
    }else if(anchor){
      hide(true);
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape')hide(true);
  });
  window.addEventListener('resize',move);
  document.addEventListener('scroll',move,true);
}
/* Les cartes sont directement complètes dans la galerie immersive :
   pas de deuxième dialogue ni de bouton « Agrandir ». */
export function createHostGallery({
  hosts,best=[],renderCard,onChoose,onPositionChange=()=>{}
}){
  installHostTraitTooltips();
  const row=document.createElement('div');
  row.className='rb-card-rack rb-gallery rb-gallery-full';
  row.setAttribute('role','region');
  row.setAttribute('aria-label','Galerie des hôtes obtenus : glisser horizontalement pour changer de carte');
  row.tabIndex=0;
  let active=0,frame=0;
  const prefersReduced=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches===true;

  const cards=hosts.map((host,i)=>{
    const card=document.createElement('article');
    card.className='rb-card rb-quality-'+host.quality;
    card.inert=true; // Pas d'interaction avant le retournement.
    card.style.setProperty('--rb-index',String(i));
    card.setAttribute('aria-label','Carte '+(i+1)+' sur '+hosts.length+' : '+host.name);
    card.innerHTML=renderCard(host);
    const front=card.querySelector('.rb-card-front');
    if(!front)throw new Error('Fiche de personnage invalide.');
    const select=document.createElement('button');
    select.type='button';
    select.className='rb-card-select';
    select.textContent='Choisir cet hôte';
    select.setAttribute('aria-label','Choisir '+host.name+' comme incarnation');
    select.addEventListener('click',()=>{
      closeHostTraitTooltip();
      onChoose(i,cards);
    });
    front.appendChild(select);
    row.appendChild(card);
    return card;
  });

  const controls=document.createElement('nav');
  controls.className='rb-gallery-controls rb-gallery-floating';
  controls.setAttribute('aria-label','Passer à une autre carte');
  controls.innerHTML=[
    '<button type="button" data-rb-gallery="prev" aria-label="Carte précédente">‹</button>',
    '<button type="button" data-rb-gallery="next" aria-label="Carte suivante">›</button>'
  ].join('');
  const ga=name=>controls.querySelector('[data-rb-gallery="'+name+'"]');

  function position(){
    cards.forEach((card,i)=>{
      card.classList.toggle('rb-card-active',i===active);
      if(i===active)card.setAttribute('aria-current','true');
      else card.removeAttribute('aria-current');
    });
    ga('prev').disabled=active===0;
    ga('next').disabled=active===hosts.length-1;
    onPositionChange(active,hosts.length);
  }

  function updateVisual(){
    frame=0;
    if(!row.isConnected)return;
    const viewport=row.getBoundingClientRect();
    const center=viewport.left+viewport.width/2;
    const cardWidth=cards[0]?.getBoundingClientRect().width||1;
    let nearest=0,distance=Infinity;
    cards.forEach((card,i)=>{
      const rect=card.getBoundingClientRect();
      const diff=(rect.left+rect.width/2-center)/Math.max(cardWidth,1);
      const depth=Math.min(1,Math.abs(diff));
      card.style.setProperty('--rb-depth',depth.toFixed(3));
      // Perspective et profondeur évoluent en continu pendant le glissement,
      // plutôt qu'une coupure entre deux fiches statiques.
      card.style.setProperty('--rb-angle',(-Math.sign(diff)*depth*8).toFixed(2)+'deg');
      card.style.setProperty('--rb-scale',(1-depth*.06).toFixed(3));
      card.style.setProperty('--rb-opacity',(1-depth*.33).toFixed(3));
      if(Math.abs(diff)<distance){distance=Math.abs(diff);nearest=i;}
    });
    if(active!==nearest){active=nearest;position();}
  }

  function scheduleVisual(){
    if(!frame)frame=requestAnimationFrame(updateVisual);
  }
  function scrollToCard(index){
    active=Math.max(0,Math.min(hosts.length-1,index));
    closeHostTraitTooltip();position();
    const target=cards[active];
    // La galerie possède déjà un padding latéral égal à la demi-marge :
    // le centre de chaque carte correspond à son décalage depuis la première.
    const x=target.offsetLeft-cards[0].offsetLeft;
    row.scrollTo({left:Math.max(0,x),behavior:prefersReduced()?'auto':'smooth'});
    scheduleVisual();
  }
  ga('prev').addEventListener('click',()=>scrollToCard(active-1));
  ga('next').addEventListener('click',()=>scrollToCard(active+1));

  row.addEventListener('scroll',()=>{
    closeHostTraitTooltip();
    scheduleVisual();
  },{passive:true});
  row.addEventListener('keydown',e=>{
    if(e.target.closest('.rb-trait-chip, .rb-card-select'))return;
    if(e.key==='ArrowLeft'){e.preventDefault();scrollToCard(active-1);}
    if(e.key==='ArrowRight'){e.preventDefault();scrollToCard(active+1);}
  });
  const resize=()=>scheduleVisual();
  window.addEventListener('resize',resize,{passive:true});
  position();

  function destroy(){
    closeHostTraitTooltip();
    if(frame)cancelAnimationFrame(frame);
    window.removeEventListener('resize',resize);
  }
  return {
    cards,row,controls,destroy,
    refresh:scheduleVisual,
    scrollToCard
  };
}
