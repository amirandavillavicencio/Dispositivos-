import {codeList, appointments, specialistFor} from './catalog.js';

import {specs, consultation, reinforcement, mentorship, tpi, labels, desc, contacts} from './data.js';
import {transition, enter, setupMotion, animateProgress, reduced} from './motion.js';
import './style.css';

    const app={step:1,campus:null,subject:null,device:null,query:''};
    const campusName=k=>k==='vitacura'?'Vitacura':'San Joaquín';
    const stage=document.getElementById('stage');
    const icon=(id)=>`<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
    const footer=()=>`<div class="stage-foot"><button class="text-btn" data-action="back">← VOLVER</button><span>${app.step===1?'SELECCIONA UN CAMPUS':'PUEDES CAMBIAR TU ELECCIÓN'}</span></div>`;
    const pills=()=>`<div class="selection-pills"><button data-jump="1" title="Cambiar campus">${campusName(app.campus)} ↶</button>${app.subject&&app.step>2?`<button data-jump="2" title="Cambiar asignatura">${app.subject} ↶</button>`:''}${app.device&&app.step>3?`<button data-jump="3" title="Cambiar dispositivo">${labels[app.device]} ↶</button>`:''}</div>`;
    const frame=(color,title,body,subheading='')=>`<div class="stage-inner"><div class="stage-banner ${color}"><div class="step-num"><span>PASO ${String(app.step).padStart(2,'0')} / 04</span><span>DATA-E · USM</span></div><h2 class="stage-title" tabindex="-1">${title}</h2></div><div class="stage-main">${subheading?`<p class="helper">${subheading}</p>`:''}${body}${footer()}</div></div>`;
    function render(){
      animateProgress(app.step);
      document.getElementById('stepDisplay').textContent=`${String(app.step).padStart(2,'0')} / 04`;
      document.querySelectorAll('#topSignals span').forEach((el,i)=>el.classList.toggle('active',i<app.step));
      document.querySelectorAll('#bottomIndicators i').forEach((el,i)=>el.classList.toggle('current',i===app.step-1));
      if(app.step===1){
        stage.innerHTML=frame('yellow','¿Cuál es tu campus?',`<button class="campus-btn" data-campus="vitacura"><span><strong>Vitacura</strong><small>CIAC / DATA-E</small></span><span class="arrow-round" aria-hidden="true">↗</span></button><button class="campus-btn" data-campus="sanjoaquin"><span><strong>San Joaquín</strong><small>CIAC / DATA-E</small></span><span class="arrow-round" aria-hidden="true">↗</span></button>`,'Elige dónde estudias. Puedes cambiarlo después.');
        const back=stage.querySelector('[data-action="back"]');back.textContent='¿QUÉ APOYOS EXISTEN? ↓';back.dataset.action='about';
      }else if(app.step===2){
        const buttons=codeList(app.campus).map(x=>`<button class="subject-btn" data-subject="${x}" aria-pressed="${app.subject===x}">${x}</button>`).join('');
        stage.innerHTML=frame('cyan','¿En qué ramo necesitas ayuda?',`${pills()}<label class="search-field">${icon('search')}<input id="subjectSearch" type="search" inputmode="search" autocomplete="off" placeholder="Busca el código de tu ramo" aria-label="Buscar código de asignatura" value="${app.query.replaceAll('"','&quot;')}"></label><div class="subject-list" id="subjectList">${buttons}</div>`,'Selecciona una asignatura de '+campusName(app.campus)+'.');
        filterSubjects();
      }else if(app.step===3){
        const colors={consultation:'yellow',reinforcement:'orange',mentorship:'cyan',tpi:'pink'};
        const icons={consultation:'chat',reinforcement:'book',mentorship:'users',tpi:'users'};
        const available=Object.keys(labels).filter(x=>appointments(x,app.campus,app.subject).length);
        stage.innerHTML=frame('orange','Estos son tus apoyos.',`${pills()}<div class="device-list">${available.map(key=>`<button data-device="${key}" class="device-btn ${colors[key]}">${icon(icons[key])}<div><strong>${labels[key]}</strong><small>${appointments(key,app.campus,app.subject).length} horario(s) disponibles</small></div></button>`).join('')}</div>${available.length?'':'<p class="helper">No hay dispositivos registrados para esta asignatura en los horarios compartidos.</p>'}`,'Disponibles para '+app.subject+' en '+campusName(app.campus)+'.');
      }else{
        const items=appointments(app.device,app.campus,app.subject);
        const signup=app.device==='mentorship'||app.device==='tpi';
        const contact=signup?contacts[app.device][app.campus]:null;
        const notice=signup?'<p class="notice"><strong>Requiere inscripción previa.</strong> Consulta disponibilidad de cupos antes de asistir.</p>':'';
        const cards=items.map((x,i)=>{
          const specialist=app.device==='consultation'&&specialistFor(app.campus,x.tutor,app.subject);
          const questionable=app.device==='tpi'&&x.time==='10:05–17:15';
          const roomText=x.room?`<p><strong>Lugar:</strong> ${x.room}</p>`:'';
          const emailText=contact?`<p><strong>Inscripción:</strong> ${contact.name}</p><a class="email-cta" href="mailto:${contact.email}?subject=${encodeURIComponent('Inscripción '+labels[app.device]+' - '+app.subject+' - '+campusName(app.campus))}">SOLICITAR INSCRIPCIÓN ↗</a>`:'';
          return `<article class="result"><div class="result-heading"><span><span class="result-name">${x.day}${x.time?' · '+x.time:''}</span><span class="result-meta">${x.tutor}</span></span></div><div class="result-body"><div class="label-row">${specialist?'<span class="tag focus">Especialidad en este ramo</span>':''}${x.mode?`<span class="tag">${x.mode}</span>`:''}${signup?'<span class="tag signup">Inscripción previa</span>':''}</div><p><strong>Asignatura:</strong> ${app.subject}</p>${x.block?`<p><strong>Bloques:</strong> ${x.block}</p>`:''}${app.device==='consultation'?`<p><strong>Especialidad:</strong> ${specs[app.campus][x.tutor].join(', ')}</p><p>Todos los tutores pueden ayudarte con las asignaturas básicas de Matemática y Física.</p>`:''}${!x.time?'<p>Horario pendiente de confirmación en el documento.</p>':''}${roomText}${x.url?`<a class="email-cta" href="${x.url}" target="_blank" rel="noopener noreferrer">Abrir sesión en Teams ↗</a>`:''}${questionable?'<p><strong>Nota:</strong> El horario 10:05–17:15 figura así en la planilla de TPI. Requiere confirmación.</p>':''}${emailText}</div></article>`;
        }).join('');
        stage.innerHTML=frame('pink',app.subject+'<br><span class="device-title">'+labels[app.device]+'</span>',`${pills()}${notice}<p class="helper">${desc[app.device]}</p><div class="results">${cards}</div>`,'Horarios y tutores según la programación 2026-2.');
      }
    }
    function filterSubjects(){const list=document.querySelector('#subjectList');if(!list)return;const input=document.querySelector('#subjectSearch');const q=(input?.value||'').trim().toLowerCase();const buttons=[...list.querySelectorAll('[data-subject]')];let found=0;buttons.forEach(b=>{const show=b.dataset.subject.toLowerCase().includes(q);b.hidden=!show;b.style.display=show?'':'none';found+=show?1:0});list.querySelector('.subject-empty')?.remove();if(!found)list.insertAdjacentHTML('beforeend','<div class="subject-empty">No encontramos ese código entre las asignaturas de los documentos.</div>')}
    stage.addEventListener('input',e=>{if(e.target.id==='subjectSearch'){app.query=e.target.value;filterSubjects()}});
    stage.addEventListener('click',e=>{
      const btn=e.target.closest('button');if(!btn)return;
      if(btn.dataset.campus){app.campus=btn.dataset.campus;if(!codeList(app.campus).includes(app.subject))app.subject=null;app.device=null;app.query='';app.step=2;update();return}
      if(btn.dataset.subject){app.subject=btn.dataset.subject;app.device=null;app.step=3;update();return}
      if(btn.dataset.device){app.device=btn.dataset.device;app.step=4;update();return}
      if(btn.dataset.jump){app.step=Number(btn.dataset.jump);update();return}
      if(btn.dataset.action==='about'){document.getElementById('apoyos').scrollIntoView({behavior:reduced()?'instant':'smooth'});return}
      if(btn.dataset.action==='back'){app.step=Math.max(1,app.step-1);update();}
    });
    function update(){transition(stage,render,app.step);}
    render();
    setupMotion();
    enter(stage);
