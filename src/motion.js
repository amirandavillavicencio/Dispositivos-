import {animate, stagger} from 'motion';
const preference=matchMedia('(prefers-reduced-motion: reduce)');
export const reduced=()=>preference.matches;
const active=new Set();
function run(target,frames,options={}){
  const control=animate(target,frames,{ease:[.22,1,.36,1],...options,duration:reduced()?0:(options.duration??.24)});
  active.add(control);control.then(()=>active.delete(control));return control;
}
preference.addEventListener('change',()=>{active.forEach(c=>c.complete());active.clear()});
export function enter(container,startDelay=0){
  if(reduced())return;
  const elements=[...container.querySelectorAll('.campus-btn,.subject-btn,.device')].slice(0,9);
  if(elements.length)run(elements,{opacity:[0,1],y:[12,0]},{duration:.22,delay:stagger(.025,{startDelay})});
}
export async function transition(stage,render,color,event){
  const flood=document.getElementById('flood');
  if(reduced()){render();stage.querySelector('h1,h2')?.focus({preventScroll:true});return}
  const bounds=stage.getBoundingClientRect();
  const target=event?.target?.closest('button,a')?.getBoundingClientRect();
  const x=event?.detail?event.clientX-bounds.left:(target?target.left+target.width/2-bounds.left:bounds.width/2);
  const y=event?.detail?event.clientY-bounds.top:(target?target.top+target.height/2-bounds.top:0);
  const radius=Math.hypot(Math.max(Math.abs(x),Math.abs(bounds.width-x)),Math.max(Math.abs(y),Math.abs(bounds.height-y)))+10;
  flood.style.background=color;flood.hidden=false;flood.style.opacity='1';
  stage.setAttribute('aria-busy','true');
  try{
    await run(flood,{clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]},{duration:.34});
    const fadeDuration=.16;
    render();enter(stage,fadeDuration);
    stage.querySelector('h1,h2')?.focus({preventScroll:true});
    await run(flood,{opacity:[1,0]},{duration:fadeDuration});
  }finally{flood.hidden=true;stage.removeAttribute('aria-busy')}
}
const panelControls=new WeakMap();
export async function togglePanel(button,panel){
  if(panelControls.has(panel))return;
  const open=button.getAttribute('aria-expanded')!=='true';
  button.setAttribute('aria-expanded',String(open));
  panel.inert=!open;
  panel.hidden=false;
  const height=panel.scrollHeight;
  panel.style.overflow='hidden';
  const control=run(panel,{height:open?[0,height]:[height,0],opacity:open?[0,1]:[1,0]},{duration:.25});
  panelControls.set(panel,control);
  await control;
  panel.hidden=!open;panel.style.height='';panel.style.opacity='';panel.style.overflow='';panelControls.delete(panel);
}
let menuSerial=0;
export async function menuMotion(menu,open){
  const serial=++menuSerial;
  menu.getAnimations().forEach(a=>a.cancel());
  menu.inert=!open;menu.hidden=false;
  await run(menu,{clipPath:open?['circle(0% at 100% 0%)','circle(150% at 100% 0%)']:['circle(150% at 100% 0%)','circle(0% at 100% 0%)']},{duration:.28});
  if(serial===menuSerial)menu.hidden=!open;
}
export function setupMotion(){
  document.addEventListener('pointerdown',event=>{const button=event.target.closest('button');if(button&&!reduced())run(button,{scale:[1,.985,1]},{duration:.16})});
}
