    const specs={
      vitacura:{
        'Iovanni Fuentes':['MAT021','MAT070','MATE10','MATE11','FIS109'],
        'María Cruz':['FIS109','FIS119','MAT060','MAT070','MAT061'],
        'Balthazar Tschulnigg':['MAT060','MAT070','MAT061','MAT071','MAT021','MAT022','MATE10','MATE11','MATE20','MAT001-A','MAT002-A','FIS109'],
        'Francisca Obando':['MAT060','MAT070','MAT061'],
        'Alonso López':['MAT060','MAT070','MAT061','MAT071','MAT021','MAT022','MATE10','MATE11','MATE20','MAT001-A','MAT002-A','FIS109','FIS119']},
      sanjoaquin:{
        'Benjamín Mundaca':['MAT061','MAT070','MAT071','FIS100','FIS110'],
        'Felipe Espinoza':['MAT061','MAT071','MAT022','FIS100','FIS110'],
        'Javier Toro':['MAT061','MAT022','MAT023','FIS100','FIS110'],
        'Karla González':['MAT060','MAT070','MAT071','MAT022','TODAS LAS FISICAS'],
        'Miguel Espinosa':['MAT060','MAT070','MAT071','MAT021','MAT022','FIS100','FIS110'],
        'David Aro':['MAT060','MAT071','MAT021','MAT022','FIS100','FIS110']}
    };
    // Los horarios se obtienen de las planillas 2026-2 aportadas. Un registro describe una sesión.
    const c=(day,time,tutor)=>({day,time,tutor});
    const consultation={
      vitacura:[c('Lunes','09:40–10:50','Iovanni Fuentes'),c('Lunes','13:40–14:40','Balthazar Tschulnigg'),c('Lunes','14:40–15:50','Iovanni Fuentes'),c('Martes','11:05–12:15','María Cruz'),c('Martes','13:40–14:40','Iovanni Fuentes'),c('Miércoles','09:40–10:50','María Cruz'),c('Miércoles','14:40–15:50','Francisca Obando'),c('Jueves','12:30–13:40','Francisca Obando'),c('Jueves','13:40–14:40','Alonso López'),c('Viernes','09:40–10:50','María Cruz')],
      sanjoaquin:[c('Lunes','11:05–12:15','Karla González'),c('Lunes','12:30–13:40','Benjamín Mundaca'),c('Lunes','14:40–15:50','Javier Toro'),c('Martes','12:30–13:40','Felipe Espinoza'),c('Martes','14:40–15:50','Miguel Espinosa'),c('Miércoles','12:30–13:40','Benjamín Mundaca'),c('Miércoles','14:40–15:50','Javier Toro'),c('Jueves','12:30–13:40','Javier Toro'),c('Jueves','14:40–15:50','Felipe Espinoza'),c('Viernes','11:05–12:15','David Aro'),c('Viernes','12:30–13:40','Karla González'),c('Viernes','14:40–15:50','David Aro')]
    };
    const r=(subject,day,time,tutor,room,mode='Presencial')=>({subject,day,time,tutor,room,mode});
    const onlineShared=[r('MAT060','Miércoles','21:00–22:10','Alonso López',null,'Online'),r('MAT061','Jueves','21:00–22:10','Alonso López',null,'Online'),r('FIS120','Martes','17:30–18:40','Martín Ampuero',null,'Online'),r('FIS110','Jueves','17:30–18:40','Martín Ampuero',null,'Online'),r('FIS111','Jueves','17:30–18:40','Martín Ampuero',null,'Online')];
    const reinforcement={
      vitacura:[...onlineShared,r('MAT070','Jueves','09:40–10:50','Agustín Salazar','CIAC Vitacura'),r('MAT071','Jueves','13:40–14:40','Agustín Salazar','CIAC Vitacura')],
      sanjoaquin:[...onlineShared,r('MAT060','Lunes','09:40–10:50','Benjamín Leal','Sala 6'),r('MAT061','Miércoles','11:05–12:15','Benjamín Leal','Sala 6'),r('FIS100','Miércoles','11:05–12:15','Cristóbal Cerda','Sala 3'),r('FIS100','Miércoles','12:30–13:40','Matías Pajarito','Sala 6'),r('MAT070','Miércoles',null,'Marco Pezoa','Sala 2'),r('FIS110','Miércoles','12:30–13:40','Cristóbal Cerda','Sala 3'),r('FIS111','Miércoles','12:30–13:40','Cristóbal Cerda','Sala 3'),r('MAT73825','Martes','12:30–13:40','Maira Olavarría','Sala 6'),r('MAT021','Viernes','12:30–13:40','Francisco Guichapani','Sala 1'),r('MAT73625','Miércoles','14:40–15:50','Joaquín Roblero','Sala 1'),r('MAT071','Jueves','14:40–15:50','Joaquín Roblero','Sala 6'),r('MAT022','Jueves',null,'Javier Toro','Sala 1')]
    };
    const m=(subject,day,time,tutor,room)=>({subject,day,time,tutor,room,mode:'Presencial'});
    const mentorship={
      vitacura:[m('MAT071','Martes','11:05–12:15','Alexis Mayobre','CIAC'),m('MAT060','Martes','12:30–13:40','Alexis Mayobre','Sala A111'),m('MATE20','Martes','12:30–13:40','Gonzalo Arias','CIAC'),m('MAT061','Martes','14:40–15:50','Alexis Mayobre','Sala C201'),m('MATE11','Jueves','12:30–13:40','Gonzalo Arias','Sala A111'),m('MAT070','Viernes','11:05–12:15','Alexis Mayobre','CIAC'),m('MATE10','Viernes','12:30–13:40','Alexis Mayobre','CIAC')],
      sanjoaquin:[m('MAT061','Lunes','14:40–15:50','Javier Díaz','Sala 4 CIAC'),m('MAT071','Martes','14:40–15:50','Javier Díaz','Sala 4 CIAC'),m('MAT070','Martes','16:05–17:15','Javier Díaz','Sala 4 CIAC'),m('MAT060','Miércoles','14:40–15:50','Alexis Mayobre','Sala 4 CIAC'),m('MAT00325','Miércoles','16:05–17:15','Alexis Mayobre','Sala 4 CIAC'),m('MAT00225','Jueves','12:30–13:40','Alexis Mayobre','Sala 4 CIAC'),m('MAT070','Jueves','14:40–15:50','Alexis Mayobre','Sala 4 CIAC'),m('MAT061','Jueves','16:05–17:15','Alexis Mayobre','Sala 4 CIAC'),m('MAT071','Jueves','17:30–18:40','Alexis Mayobre','Sala 4 CIAC')]
    };
    const t=(subjects,day,time,tutor,block)=>({subjects,day,time,tutor,block});
    const tpi={
      vitacura:[t(['MATE10'],'Martes','12:30–13:40','Sebastián Osorio León','7–8'),t(['MAT060','MAT070'],'Miércoles','12:30–13:40','DARIO CURIEL GAONA','7–8'),t(['MAT060','MAT070'],'Jueves','12:30–13:40','Daniela López García','7–8'),t(['FIS100'],'Jueves','11:05–12:15','Carolina Tavil','5–6')],
      sanjoaquin:[t(['FIS100'],'Miércoles','12:30–13:40','Sebastián Reyes Vaquero','7–8'),t(['MAT061','MAT071'],'Martes','12:30–13:40','Sebastián Reyes Vaquero','7–8'),t(['FIS111'],'Lunes','10:05–17:15','Sofía Flores Villalobos','11–12'),t(['MAT060','MAT070'],'Martes','12:30–13:40','Alejandro Ortiz Tapia','7–8'),t(['MAT060','MAT070'],'Jueves','09:40–10:50','Sebastián Díaz Segovia','3–4'),t(['MAT061','MAT070'],'Jueves','12:30–13:40','Francisco Guichapani','7–8'),t(['FIS111'],'Miércoles','14:40–15:50','Vicente Arancibia Orrego','9–10'),t(['MAT060','MAT070'],'Lunes','10:05–17:15','Xavier Oleas Jaén','11–12'),t(['MAT011'],'Martes','12:30–13:40','Nicolás Pérez Lantadilla','7–8')]
    };
    // La hora 10:05–17:15 para dos TPI de San Joaquín corresponde literalmente a la captura de la planilla; pendiente confirmar frente a los bloques 11–12.
    const labels={consultation:'Consultorías',reinforcement:'Reforzamientos',mentorship:'Mentorías',tpi:'Tutorías Pares Integrales (TPI)'};
    const desc={consultation:'Tutorías de consulta para dudas de Matemática y Física.',reinforcement:'Apoyo centrado en una asignatura y guía de ejercicios.',mentorship:'Grupos pequeños a cargo de un docente. Inscripción previa.',tpi:'Acompañamiento entre estudiantes. Inscripción previa.'};
    const contacts={tpi:{vitacura:{name:'Karla de la Maza',email:'karla.delamaza@usm.cl'},sanjoaquin:{name:'Katherine Velásquez',email:'Katherine.Velasquez@usm.cl'}},mentorship:{vitacura:{name:'Gleudys Martínez',email:'gleudys.martinez@usm.cl'},sanjoaquin:{name:'Gleudys Martínez',email:'gleudys.martinez@usm.cl'}}};

export {specs, consultation, reinforcement, mentorship, tpi, labels, desc, contacts};

const onlineLinks = {"FIS120": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_YTg4NjdmZTMtMzQ0Mi00M2JjLWJmMzEtMGVhYmNkY2VlNDU5%40thread.v2/0?context=%7b%22Tid%22%3a%2202625676-3227-440a-9c68-bb6d29de4206%22%2c%22Oid%22%3a%2271e980a3-0ee0-4304-888e-4d9af9948826%22%7d", "MAT060": "https://teams.Microsoft.com/l/channel/19:8e1e21ac907944f69d2f0cc5513df3f5@thread.tacv2/MAT060?groupId=440471c9-263f-40fa-8c9c-15276688edf8&tenantId=02625676-3227-440a-9c68-bb6d29de4206", "MAT061": "https://teams.microsoft.com/l/channel/19:2G4oS3cdrYNXDJCviSbmDqqhVFhn5Szazi9Sgfviek41@thread.tacv2/MAT061?groupId=440471c9-263f-40fa-8c9c-15276688edf8&tenantId=02625676-3227-440a-9c68-bb6d29de4206", "FIS110": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_ODNiN2MwYjYtYTljMC00ZWMzLTg1OGQtZmM5MDhlOTBkMTA1%40thread.v2/0?context=%7b%22Tid%22%3a%2202625676-3227-440a-9c68-bb6d29de4206%22%2c%22Oid%22%3a%2271e980a3-0ee0-4304-888e-4d9af9948826%22%7d", "FIS111": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_ODNiN2MwYjYtYTljMC00ZWMzLTg1OGQtZmM5MDhlOTBkMTA1%40thread.v2/0?context=%7b%22Tid%22%3a%2202625676-3227-440a-9c68-bb6d29de4206%22%2c%22Oid%22%3a%2271e980a3-0ee0-4304-888e-4d9af9948826%22%7d"};
Object.values(reinforcement).forEach(rows=>rows.forEach(row=>{if(row.mode==='Online') row.url=onlineLinks[row.subject];}));
