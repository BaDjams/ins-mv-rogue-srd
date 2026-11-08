import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {installHostTraitTooltips, closeHostTraitTooltip} from '../public/scripts/host-gallery-controller.mjs';

test('les traits tactiles ne restent pas tous sélectionnés et le second tap ferme le tooltip',()=>{
  const oldDocument=globalThis.document;
  const oldWindow=globalThis.window;
  const listeners={};
  const tooltip={
    hidden:true,
    id:'',className:'',style:{},textContent:'',
    setAttribute(){},
    getBoundingClientRect(){return {height:65};}
  };
  const document={
    activeElement:null,
    createElement(){return tooltip;},
    body:{appendChild(){}},
    addEventListener(kind,listener){listeners[kind]=listener;}
  };
  const window={
    innerWidth:390,innerHeight:780,
    addEventListener(){}
  };
  globalThis.document=document;
  globalThis.window=window;
  const chip=name=>{
    const attrs=new Map();
    return {
      dataset:{traitHelp:'Résumé de '+name},
      closest(selector){return selector==='.rb-trait-chip'?this:null;},
      getBoundingClientRect(){return {left:24,top:260,bottom:292};},
      contains(){return false;},
      setAttribute(k,v){attrs.set(k,String(v));},
      removeAttribute(k){attrs.delete(k);},
      getAttribute(k){return attrs.get(k)??null;},
      blur(){if(document.activeElement===this)document.activeElement=null;}
    };
  };
  function dispatch(type,target,other={}){
    const listener=listeners[type];
    assert.equal(typeof listener,'function');
    listener({target,...other});
  }
  try {
    installHostTraitTooltips();
    const first=chip('Gamer'),second=chip('Allergique');
    document.activeElement=first;
    dispatch('focusin',first);
    dispatch('click',first);
    assert.equal(first.getAttribute('aria-expanded'),'true');
    assert.equal(tooltip.hidden,false);

    // Changer de trait réinitialise explicitement l'ancien bouton.
    document.activeElement=second;
    dispatch('click',second);
    assert.equal(first.getAttribute('aria-expanded'),'false');
    assert.equal(first.getAttribute('aria-describedby'),null);
    assert.equal(second.getAttribute('aria-expanded'),'true');
    assert.equal(tooltip.textContent,'Résumé de Allergique');

    // Toucher de nouveau le même trait : désélection complète.
    dispatch('click',second);
    assert.equal(second.getAttribute('aria-expanded'),'false');
    assert.equal(second.getAttribute('aria-describedby'),null);
    assert.equal(tooltip.hidden,true);
    assert.equal(document.activeElement,null);

    // :hover tactile ne doit pas réouvrir ce qui vient d'être fermé.
    dispatch('pointerover',second,{pointerType:'touch'});
    assert.equal(tooltip.hidden,true);

    // Une pression hors d'un trait referme également l'aide affichée.
    dispatch('click',first);
    dispatch('click',{closest(){return null;}});
    assert.equal(first.getAttribute('aria-expanded'),'false');
    assert.equal(tooltip.hidden,true);

    // Le changement de carte et de dialogue utilisent la même fermeture.
    dispatch('click',first);
    closeHostTraitTooltip();
    assert.equal(first.getAttribute('aria-expanded'),'false');
    assert.equal(tooltip.hidden,true);
  } finally {
    globalThis.document=oldDocument;
    globalThis.window=oldWindow;
  }
});

test('les explications figurent après les deux outils et sont repliées par défaut',()=>{
  const page=fs.readFileSync(new URL('../src/content/docs/generateur.md',import.meta.url),'utf8');
  const booster=page.indexOf('<div class="rogue-booster"></div>');
  const pnj=page.indexOf('<div class="rogue-gen"></div>');
  const details=page.indexOf('<details>');
  assert.ok(booster>0,'Le booster doit être présent');
  assert.ok(pnj>booster,'Le générateur PNJ doit suivre le booster');
  assert.ok(details>pnj,'La documentation doit suivre les générateurs');
  assert.equal((page.match(/<details>/g)||[]).length,3);
  assert.equal((page.match(/<\/details>/g)||[]).length,3);
  assert.doesNotMatch(page,/<details\s+open(?:\s|>)/);
  assert.ok(booster<500,'Le booster doit rester proche du début de page');
});

test('Brave Android ne conserve pas la couleur de :hover sur les traits fermés',()=>{
  const css=fs.readFileSync(new URL('../src/styles/rogue-srd.css',import.meta.url),'utf8');
  assert.match(css,/@media \(hover: none\), \(pointer: coarse\)/);
  assert.match(css,/\.rb-trait-chip:hover:not\(\[aria-expanded="true"\]\):not\(:focus-visible\)/);
});
