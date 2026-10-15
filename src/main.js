import {codeList, appointments, specialistFor} from './catalog.js';
import {specs, labels, desc, contacts} from './data.js';
import {info} from './info.js';
import {transition, enter, togglePanel, menuMotion, setupMotion} from './motion.js';
import './style.css';

const app={view:'campus',campus:null,subject:null,query:'',returnView:'campus'};
const stage=document.getElementById('stage');
const back=document.getElementById('back');
const menu=document.getElementById('menu');
const menuButton=document.getElementById('menuButton');
const campusName=k=>k==='vitacura'?'Vitacura':'San Joaquín';
const icon=id=>`<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
const colors={campus:'#FFCB05',subjects:'#00B5D8',results:'#FFCB05',info:'#FFFFFF'};
const classes={consultation:'blue',reinforcement:'orange',mentorship:'cyan',tpi:'pink'};
const crumbs=()=>app.view==='results'?`<div class="crumbs"><button data-nav="subjects">${app.subject} ↶</button></div>`:'';
function details(device){
        const items=appointments(device,app.campus,app.subject);
        const signup=device==='mentorship'||device==='tpi';
        const contact=signup?contacts[device][app.campus]:null;
        const notice=signup?'<p class="notice"><strong>Requiere inscripción previa.</strong> Consulta disponibilidad de cupos antes de asistir.</p>':'';
        const cards=items.map((x,i)=>{
          const specialist=device==='consultation'&&specialistFor(app.campus,x.tutor,app.subject);
          const questionable=device==='tpi'&&x.time==='10:05–17:15';
          const roomText=x.room?`<p><strong>Lugar:</strong> ${x.room}</p>`:'';

          return `<article class="result"><div class="result-heading"><span><span class="result-name">${x.day}${x.time?' · '+x.time:''}</span><span class="result-meta">${x.tutor}</span></span></div><div class="result-body"><div class="label-row">${specialist?'<span class="tag focus">Especialidad en este ramo</span>':''}${x.mode?`<span class="tag">${x.mode}</span>`:''}${signup?'<span class="tag signup">Inscripción previa</span>':''}</div><p><strong>Asignatura:</strong> ${app.subject}</p>${x.block?`<p><strong>Bloques:</strong> ${x.block}</p>`:''}${device==='consultation'?`<p><strong>Especialidad:</strong> ${specs[app.campus][x.tutor].join(', ')}</p>`:''}${!x.time?'<p>Horario pendiente de confirmación en el documento.</p>':''}${roomText}${x.url?`<a class="email-cta" href="${x.url}" target="_blank" rel="noopener noreferrer">Abrir sesión en Teams ↗</a>`:''}${questionable?'<p><strong>Nota:</strong> El horario 10:05–17:15 figura así en la planilla de TPI. Requiere confirmación.</p>':''}</div></article>`;
        }).join('');

const signupAction=contact?`<div class="signup-action"><p><strong>Inscripción:</strong> ${contact.name}</p><a class="email-cta" href="mailto:${contact.email}?subject=${encodeURIComponent('Inscripción '+labels[device]+' - '+app.subject+' - '+campusName(app.campus))}">SOLICITAR INSCRIPCIÓN ↗</a></div>`:'';
return `${notice}<p class="device-description">${desc[device]}</p>${device==='consultation'?'<p class="device-description">Todos los tutores pueden ayudarte con las asignaturas básicas de Matemática y Física.</p>':''}${signupAction}<div class="results">${cards}</div>`;
}
function render(){
  const inner=app.view!=='campus';
  document.querySelector('.app-shell').classList.toggle('inner-view',inner);
  document.querySelector('.brand').hidden=inner;
  const headerCampus=document.getElementById('headerCampus');
  headerCampus.hidden=!inner||!app.campus;
  headerCampus.textContent=app.campus?campusName(app.campus):'';
  back.hidden=app.view==='campus';
  document.getElementById('homeMark').hidden=!back.hidden;
  document.getElementById('menuSubjects').disabled=!app.campus;
  stage.dataset.view=app.view;
  if(app.view==='campus'){
    stage.innerHTML=`<section class="campus-screen"><div class="screen-heading yellow"><span class="eyebrow">DISPOSITIVOS CIAC · USM</span><h1 tabindex="-1">¿Cuál es tu campus?</h1></div>${['vitacura','sanjoaquin'].map((c,i)=>`<button class="campus-btn ${i?'blue':'cyan'}" data-campus="${c}"><span class="campus-art" aria-hidden="true">${i?'SJ':'V'}</span><span class="campus-label"><span><small>CAMPUS</small><strong>${campusName(c)}</strong></span><span class="arrow-round" aria-hidden="true">↗</span></span></button>`).join('')}</section>`;
  }else if(app.view==='subjects'){
    stage.innerHTML=`<section class="screen"><div class="screen-heading cyan">${crumbs()}<h1 tabindex="-1">¿En qué ramo necesitas ayuda?</h1></div><div class="search-wrap"><label class="search-field">${icon('search')}<input id="subjectSearch" type="search" autocomplete="off" placeholder="Busca el código de tu ramo" aria-label="Buscar código de asignatura"></label></div><div class="scroll-area subject-list" id="subjectList">${codeList(app.campus).map(code=>`<button class="subject-btn" data-subject="${code}"><strong>${code}</strong><span aria-hidden="true">↗</span></button>`).join('')}<p id="empty" hidden>No encontramos ese código entre las asignaturas de los documentos.</p></div></section>`;
    document.getElementById('subjectSearch').value=app.query;
    filterSubjects();
  }else if(app.view==='results'){
    const available=Object.keys(labels).filter(key=>appointments(key,app.campus,app.subject).length);
    stage.innerHTML=`<section class="screen"><div class="screen-heading yellow compact">${crumbs()}<h1 tabindex="-1">Estos son tus apoyos.</h1></div><div class="scroll-area device-list">${available.map(key=>`<article class="device ${classes[key]}"><h2><button class="device-btn" data-device="${key}" aria-expanded="false" aria-controls="panel-${key}">${icon(key==='consultation'?'chat':key==='reinforcement'?'book':'users')}<span><strong>${labels[key]}</strong><small>${appointments(key,app.campus,app.subject).length} horario(s) disponibles</small></span><span class="plus" aria-hidden="true">+</span></button></h2><div class="panel" id="panel-${key}" hidden>${details(key)}</div></article>`).join('')}${available.length?'':'<p>No hay dispositivos registrados para esta asignatura en los horarios compartidos.</p>'}</div></section>`;
  }else{
    stage.innerHTML=`<section class="info-screen scroll-area">${info[app.info]}</section>`;
    stage.querySelector('h1,h2')?.setAttribute('tabindex','-1');
  }
}
function filterSubjects(){
  const q=app.query.trim().toLowerCase();let count=0;
  stage.querySelectorAll('[data-subject]').forEach(button=>{button.hidden=!button.dataset.subject.toLowerCase().includes(q);if(!button.hidden)count++});
  document.getElementById('empty').hidden=!!count;
}
let busy=false;
async function go(view,event,change=()=>{}){
  if(busy)return;
  busy=true;
  setMenu(false);
  document.activeElement?.blur();
  try{await transition(stage,()=>{change();app.view=view;render()},colors[view],event)}finally{busy=false}
}
function setMenu(open){
  const previous=menuButton.getAttribute('aria-expanded')==='true';
  if(previous===open)return;
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  stage.inert=open;back.inert=open;
  menuMotion(menu,open).then(()=>{if(open&&menuButton.getAttribute('aria-expanded')==='true')menu.querySelector('button').focus()});
  if(!open)menuButton.focus({preventScroll:true});
}
function goBack(event){
  if(app.view==='info')go(app.returnView,event);
  else go(app.view==='results'?'subjects':'campus',event);
}
document.addEventListener('click',event=>{
  const button=event.target.closest('button,a.brand');if(!button||busy)return;
  if(button===menuButton){setMenu(button.getAttribute('aria-expanded')!=='true');return}
  if(button===back){goBack(event);return}
  if(button.matches('a.brand')){event.preventDefault();go('campus',event);return}
  if(button.dataset.campus){go('subjects',event,()=>{app.campus=button.dataset.campus;app.subject=null;app.query=''});return}
  if(button.dataset.subject){go('results',event,()=>{app.subject=button.dataset.subject});return}
  if(button.dataset.device){togglePanel(button,document.getElementById(button.getAttribute('aria-controls')));return}
  if(button.dataset.nav){go(button.dataset.nav,event);return}
  if(button.dataset.info){go('info',event,()=>{if(app.view!=='info')app.returnView=app.view;app.info=button.dataset.info});}
});
stage.addEventListener('input',event=>{if(event.target.id==='subjectSearch'){app.query=event.target.value;filterSubjects()}});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){setMenu(false);return}
  if(event.key==='Tab'&&menuButton.getAttribute('aria-expanded')==='true'){
    const nodes=[menuButton,...menu.querySelectorAll('button:not(:disabled)')];
    const i=nodes.indexOf(document.activeElement);
    if(event.shiftKey&&i===0){event.preventDefault();nodes.at(-1).focus()}
    else if(!event.shiftKey&&i===nodes.length-1){event.preventDefault();menuButton.focus()}
  }
});
function viewport(){
  const v=window.visualViewport;
  document.documentElement.style.setProperty('--app-height',`${v?v.height:innerHeight}px`);
  document.documentElement.style.setProperty('--app-top',`${v?v.offsetTop:0}px`);
}
window.visualViewport?.addEventListener('resize',viewport);
window.visualViewport?.addEventListener('scroll',viewport);
window.addEventListener('resize',viewport);
viewport();render();setupMotion();enter(stage);
