window.Y=()=>new Promise(r=>{const c=new MessageChannel(); c.port1.onmessage=()=>r(); c.port2.postMessage(0)});
window.W=async ms=>{const e=performance.now()+ms; while(performance.now()<e) await Y();};
window.ML={H:'cc8ea95', V:'v5', cache:{},
async file(sku,f){const k=this.H+sku+this.V+'/'+f; if(!this.cache[k]) this.cache[k]=await fetch(`https://raw.githubusercontent.com/wpaginas/shopzone-imagens/${this.H}/${sku}/${this.V}/${f}`).then(r=>{if(!r.ok) throw f; return r.blob()}); return new File([this.cache[k]],sku.toLowerCase()+'-'+f,{type:'image/jpeg'});},
modal(){return document.querySelector('.andes-modal__overlay')},
btns(){const m=this.modal(); return m?[...m.querySelectorAll('button[aria-label^="Excluir foto"]')]:[]},
tiles(){const m=this.modal(); return m?[...m.querySelectorAll('.media-uploader__element--interactive')].map(t=>(t.querySelector('img')?.src||'').match(/(\d{6}-MLB\d+)/)?.[1]||null):[]},
kick(){document.querySelectorAll('.andes-modal__overlay').forEach(o=>[o,...o.querySelectorAll('*')].forEach(e=>{e.dispatchEvent(new Event('animationend',{bubbles:true})); e.dispatchEvent(new Event('transitionend',{bubbles:true}));}));},
alts(){return [...document.querySelectorAll('*')].filter(e=>e.children.length===0 && e.textContent.trim()==='Alterar fotos')},
done(){return this.tiles().filter(Boolean).length},
async delAt(i){const n=this.btns().length; const b=this.btns()[i]; if(!b) return false; b.click(); const t0=performance.now(); while(performance.now()-t0<6000&&this.btns().length>=n) await W(80); await W(250); return this.btns().length<n;},
async addOne(sku,f){const n=this.btns().length; const inp=this.modal().querySelector('input[type=file]'); if(!inp) return 'sem input'; const dt=new DataTransfer(); dt.items.add(await this.file(sku,f)); inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true})); const t0=performance.now(); while(performance.now()-t0<25000&&(this.btns().length<=n||this.done()<=n)) await W(150); await W(300); return this.done()>n;},
async confirm(){const c=[...this.modal().querySelectorAll('button')].find(b=>b.textContent.trim()==='Confirmar'); const t1=performance.now(); while(performance.now()-t1<10000&&c.disabled) await W(200); if(c.disabled) return 'disabled'; await W(1500); c.click(); const t0=performance.now(); while(performance.now()-t0<8000&&!c.disabled) await W(150); await W(800); return c.disabled?'salvo':'nao salvou';},
async close(){ for(let i=0;i<4&&this.modal();i++){ this.modal().querySelector('.andes-modal__close-button')?.click(); await W(300); this.kick(); await W(400);} return !this.modal();},
async openK(k){ if(this.modal()) await this.close(); const a=this.alts(); if(!a[k]) throw 'sem botao '+k; a[k].click(); const t0=performance.now(); while(performance.now()-t0<8000&&!(this.modal()&&this.btns().length&&this.done()===this.btns().length)) await W(150); await W(600); return this.btns().length;},
async run(k,sku,fs){ const n0=await this.openK(k); let g=0; while(this.btns().length>1&&g++<15) await this.delAt(0); const ok=[]; for(const f of fs) ok.push(await this.addOne(sku,f)); if(!(this.btns().length===fs.length+1 && ok.every(x=>x===true))){await this.close(); return k+' FALHA '+JSON.stringify(ok)+' n='+this.btns().length;}
  for(let t=0;t<3&&this.btns().length===fs.length+1;t++) await this.delAt(0);
  if(this.btns().length!==fs.length){await this.close(); return k+' FALHA del n='+this.btns().length;}
  await W(3000); const fin=this.tiles(); let c=await this.confirm(); if(c!=='salvo'){await W(1500); c=await this.confirm();} await this.close(); return {k,c,n:fin.length};},
bg(fn){window.__st=[]; (async()=>{try{await fn(window.__st)}catch(e){window.__st.push('ERR '+e)} window.__st.push('FIM');})();},
batchL(list){this.bg(async st=>{for(const [k,sku,fs] of list){ try{st.push(await ML.run(k,sku,fs));}catch(e){st.push(k+' ERR '+e); try{await ML.close()}catch(_){}}}});},
names(){const A=this.alts(); return A.map(a=>{let e=a,p=a; while(e.parentElement){e=e.parentElement; if(A.filter(x=>e.contains(x)).length>1) break; p=e;} return p.innerText.replace(/\n+/g,' / ').slice(0,90);});},
async section(){const h=[...document.querySelectorAll('h2,h3,[role=heading]')].find(e=>/Variações e fotos/.test(e.textContent)); h?.click(); const t0=performance.now(); while(performance.now()-t0<8000&&!this.alts().length) await W(200); return this.alts().length;}};
