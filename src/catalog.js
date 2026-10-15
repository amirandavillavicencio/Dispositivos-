import {specs, consultation, reinforcement, mentorship, tpi} from './data.js';
    const codeList=campus=>{
      const set=new Set();
      Object.values(specs[campus]).forEach(items=>items.filter(x=>x!=='TODAS LAS FISICAS').forEach(x=>set.add(x)));
      reinforcement[campus].forEach(x=>set.add(x.subject));mentorship[campus].forEach(x=>set.add(x.subject));tpi[campus].forEach(x=>x.subjects.forEach(s=>set.add(s)));
      return [...set].sort((a,b)=>a.localeCompare(b,'es',{numeric:true}));
    };
    const containsSub=(x,s)=>x.subject===s;
    const isKnownInConsultation=(campus,sub)=>codeList(campus).includes(sub) && /^(MAT|FIS)/.test(sub);
    const specialistFor=(campus,tutor,sub)=>specs[campus][tutor]?.includes(sub) || (sub.startsWith('FIS') && specs[campus][tutor]?.includes('TODAS LAS FISICAS')); 
    const appointments=(device,campus,sub)=>{
      if(device==='consultation')return isKnownInConsultation(campus,sub)?[...consultation[campus]].sort((a,b)=>Number(specialistFor(campus,b.tutor,sub))-Number(specialistFor(campus,a.tutor,sub))):[];
      if(device==='reinforcement')return reinforcement[campus].filter(x=>containsSub(x,sub));
      if(device==='mentorship')return mentorship[campus].filter(x=>containsSub(x,sub));
      return tpi[campus].filter(x=>x.subjects.includes(sub));
    };

export {codeList, appointments, specialistFor};
