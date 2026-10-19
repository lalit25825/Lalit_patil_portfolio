(function(){
const list=document.querySelector('#skills .stack-list');if(!list)return;
const rows=[...list.querySelectorAll('.stack-row')],still=matchMedia('(prefers-reduced-motion: reduce)').matches,GL='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const top=document.createElement('i');top.className='stack-top';top.setAttribute('aria-hidden','true');list.append(top);
rows.forEach(r=>{const l=document.createElement('i');l.className='stack-line';l.setAttribute('aria-hidden','true');r.append(l);r.querySelectorAll('.chips span').forEach((c,k)=>c.style.setProperty('--k',k));
  r.addEventListener('pointermove',e=>{const b=r.getBoundingClientRect();r.style.setProperty('--sx',e.clientX-b.left+'px');r.style.setProperty('--sy',e.clientY-b.top+'px')})});
list.classList.add('sk-js');
function scramble(el){if(still)return;const t=el.textContent,t0=performance.now();(function f(now){const k=Math.min((now-t0)/800,1),n=Math.floor(k*t.length);let s='';for(let i=0;i<t.length;i++){const c=t[i];s+=(i<n||/[\s&]/.test(c))?c:GL[(Math.random()*GL.length)|0]}el.textContent=k<1?s:t;if(k<1)requestAnimationFrame(f)})(t0)}
function count(el){const end=+el.dataset.n,t0=performance.now();(function f(now){const k=Math.min((now-t0)/1000,1),e=1-Math.pow(1-k,3);el.textContent=String(Math.round(end*e)).padStart(2,'0');if(k<1)requestAnimationFrame(f)})(t0)}
function reveal(r){if(r.classList.contains('in'))return;r.classList.add('in');scramble(r.querySelector('h3'));const n=r.querySelector('.stack-n');if(n&&!still){n.textContent='00';count(n)}}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;if(e.target===list)list.classList.add('in');else reveal(e.target);io.unobserve(e.target)}),{threshold:.2});
io.observe(list);rows.forEach(r=>io.observe(r));
setTimeout(()=>{list.classList.add('in');const vh=innerHeight;rows.forEach(r=>{if(r.getBoundingClientRect().top<vh)reveal(r)})},5000);
// scroll-linked: chips drift in from alternating sides, the row nearest centre becomes active
let raf=0;
function tick(){raf=0;const vh=innerHeight,b=list.getBoundingClientRect();if(b.bottom<0||b.top>vh)return;let best=null,bd=1e9;
  rows.forEach((r,i)=>{const q=r.getBoundingClientRect(),c=q.top+q.height/2,p=Math.min(1,Math.max(0,(vh-q.top)/(vh*.55)));
    if(!still)r.querySelector('.chips').style.setProperty('--dx',((1-p)*(i%2?42:-42)).toFixed(1)+'px');
    const d=Math.abs(c-vh*.5);if(d<bd){bd=d;best=r}});
  if(best&&bd<vh*.4){list.classList.add('live');rows.forEach(r=>r.classList.toggle('is-active',r===best))}else{list.classList.remove('live');rows.forEach(r=>r.classList.remove('is-active'))}}
const req=()=>{if(!raf)raf=requestAnimationFrame(tick)};
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);req();
})();
