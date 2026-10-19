(function(){
if(!window.gsap||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
gsap.registerPlugin(ScrollTrigger);
const $=(q,c=document)=>[...c.querySelectorAll(q)],root=document.documentElement,fine=matchMedia('(pointer: fine)').matches;

/* 1 · Lenis smooth scroll, driven by GSAP's ticker */
let lenis=null;
if(window.Lenis){
  lenis=new Lenis({lerp:.085,wheelMultiplier:.95});
  lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
  let intro=root.classList.contains('is-intro');if(intro)lenis.stop();
  new MutationObserver(()=>{if(intro&&!root.classList.contains('is-intro')){intro=false;lenis.start();ScrollTrigger.refresh()}}).observe(root,{attributes:true,attributeFilter:['class']});
  $('dialog').forEach(d=>{d.setAttribute('data-lenis-prevent','');new MutationObserver(()=>{if(intro)return;d.open?lenis.stop():lenis.start()}).observe(d,{attributes:true,attributeFilter:['open']})});
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href');if(id.length<2)return;
    const t=id==='#top'?0:document.querySelector(id);if(t===null)return;e.preventDefault();
    lenis.scrollTo(t,{offset:t===0?0:-72,duration:1.6,easing:x=>1-Math.pow(1-x,4)});
  },true);
}

/* 2 · Scramble-in text (React Bits: DecryptedText style) */
const GL='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function scramble(el){
  const txt=el.textContent,o={p:0};
  gsap.to(o,{p:1,duration:1.1,ease:'none',onUpdate(){const n=Math.floor(o.p*txt.length);let s='';
    for(let i=0;i<txt.length;i++){const c=txt[i];s+=(i<n||/[\s\/·—.,&]/.test(c))?c:GL[(Math.random()*GL.length)|0]}el.textContent=s},onComplete(){el.textContent=txt}});
}
$('.section-kicker,.contact-pretitle').forEach(el=>ScrollTrigger.create({trigger:el,start:'top 92%',once:true,onEnter:()=>scramble(el)}));

/* 3 · Section number badges spin and pop in */
$('.section-number').forEach(el=>gsap.from(el,{scale:0,rotate:-200,duration:1.1,ease:'back.out(1.7)',scrollTrigger:{trigger:el,start:'top 92%'}}));

/* 4 · Closing statement fills in word by word with scroll (React Bits: ScrollReveal) */
const cp=document.querySelector('.work-closer p');
if(cp){const spans=[];(function walk(n){[...n.childNodes].forEach(c=>{
  if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){f.append(t);return}const s=document.createElement('span');s.className='gw';s.textContent=t;spans.push(s);f.append(s)});c.replaceWith(f)}
  else if(c.nodeType===1&&c.tagName!=='BR')walk(c)})})(cp);
  gsap.fromTo(spans,{opacity:.14,yPercent:30},{opacity:1,yPercent:0,stagger:.12,ease:'none',scrollTrigger:{trigger:cp,start:'top 88%',end:'bottom 52%',scrub:.6}});}

/* 5 · Project visuals: scroll parallax + 3D tilt on the artwork */
$('.project-visual').forEach(v=>{
  const s=v.querySelector('.agri-links,.market-lanes,.isl-svg,.model-chart');if(!s)return;
  gsap.set(s,{transformPerspective:900});
  gsap.fromTo(s,{y:-10},{y:10,ease:'none',scrollTrigger:{trigger:v,start:'top bottom',end:'bottom top',scrub:true}});
  if(!fine)return;
  const rx=gsap.quickTo(s,'rotationX',{duration:.7,ease:'power3'}),ry=gsap.quickTo(s,'rotationY',{duration:.7,ease:'power3'});
  v.addEventListener('pointermove',e=>{const r=v.getBoundingClientRect();ry(((e.clientX-r.left)/r.width-.5)*10);rx(-((e.clientY-r.top)/r.height-.5)*10)});
  v.addEventListener('pointerleave',()=>{rx(0);ry(0)});
});

/* 6 · Spotlight that follows the pointer (React Bits: SpotlightCard) */
$('.capability-row,.rec-card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--sx',e.clientX-r.left+'px');c.style.setProperty('--sy',e.clientY-r.top+'px')}));

/* 7 · The contact orbit turns as you reach the end */
const orb=document.querySelector('.contact-orbit');
if(orb)gsap.to(orb,{rotation:140,ease:'none',scrollTrigger:{trigger:'.contact-section',start:'top bottom',end:'bottom bottom',scrub:true}});

/* 8 · Cursor ring with context labels */
if(fine){
  const ring=document.createElement('div'),lab=document.createElement('span');ring.className='cur-ring';ring.setAttribute('aria-hidden','true');ring.append(lab);document.body.append(ring);
  const qx=gsap.quickTo(ring,'x',{duration:.45,ease:'power3'}),qy=gsap.quickTo(ring,'y',{duration:.45,ease:'power3'});
  addEventListener('pointermove',e=>{qx(e.clientX);qy(e.clientY);ring.classList.add('on')},{passive:true});
  document.addEventListener('pointerleave',()=>ring.classList.remove('on'));
  const HOV='a,button,.cert,.capability-row,.rec-card,.project-visual',LBL=[['.cert','View'],['.project-link','Open'],['.project-visual','Look']];
  document.addEventListener('pointerover',e=>{const t=e.target.closest(HOV);if(!t)return;let l='';
    for(const [s,x] of LBL)if(t.matches(s)||t.closest(s)){l=x;break}
    lab.textContent=l;ring.classList.add('hov');gsap.to(ring,{scale:l?1.9:1.45,duration:.35,ease:'power3.out'});gsap.to(lab,{scale:l?.53:1,duration:.35})});
  document.addEventListener('pointerout',e=>{if(!e.target.closest(HOV))return;const n=e.relatedTarget;if(n&&n.closest&&n.closest(HOV))return;
    ring.classList.remove('hov');lab.textContent='';gsap.to(ring,{scale:1,duration:.3});gsap.to(lab,{scale:1,duration:.3})});
}
addEventListener('load',()=>setTimeout(()=>ScrollTrigger.refresh(),400));
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>ScrollTrigger.refresh());
})();
