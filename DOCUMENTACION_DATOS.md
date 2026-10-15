# Fuentes y puntos para revisión

Semestre 2026-2. Fuentes: HORARIOS CIAC VITACURA (2026-2), HORARIOS CIAC SAN JOAQUÍN (2026-2), HORARIO MENTORÍAS VITACURA (2026-2), HORARIO MENTORÍAS SAN JOAQUÍN (2026-2), y captura adicional de TPI entregada por el usuario. Descripciones institucionales: las dos imágenes «Nuestros apoyos» y «Nuestro propósito». Diseño: referencia editorial y concepto HTML aprobado.

## Inconsistencias y campos ausentes

- La captura TPI indica 10:05–17:15 para Sofía Flores Villalobos y Xavier Oleas Jaén, con bloques 11–12. Se conserva literalmente la hora y se muestra una nota de confirmación; no se sustituye por 16:05.
- TPI San Joaquín incluye a Karla de la Maza en algunas filas; el contacto de inscripción es Katherine Velásquez, conforme a la instrucción explícita de esta implementación.
- El nombre de Francisco Guichapani está recortado en la captura TPI después de «GONZ». Se muestra el nombre legible que también aparece en el documento de reforzamientos, sin completar el apellido recortado.
- La captura TPI escribe DARIO CURIEL GAONA. Se conserva esa escritura; no se reemplaza por Curilén.
- Los documentos no indican sala ni modalidad de TPI. No se completan estos campos por inferencia.
- Las filas de MAT070 del miércoles y MAT022 del jueves, en reforzamientos de San Joaquín, tienen celdas de bloque y hora vacías. Se conservan el día, tutor y sala; la interfaz pide confirmar el horario. No se hereda la hora de la fila anterior.
- La tabla original ubica MAT061 de San Joaquín el miércoles 11:05–12:15 y FIS110/FIS111 el miércoles 12:30–13:40. Se corrigió la transcripción del concepto HTML según las celdas del DOCX.
- El PDF de Vitacura ubica a Francisca Obando el jueves 12:30–13:40 y a Alonso López 13:40–14:40. Se siguen esas posiciones del documento.
- Karla González tiene especialidad «TODAS LAS FISICAS». Se conserva esa regla, sin convertirla en asignaturas inventadas. El selector reúne solo códigos presentes en las fuentes del campus.
- No se proporcionan nombres completos de las asignaturas. Se muestran los códigos originales, incluidos MAT011, MAT00225, MAT00325, MAT73625 y MAT73825, sin equivalencias inferidas.

Los horarios están en `src/data.js`. Los enlaces de Teams se transcriben del DOCX de San Joaquín y se comparten en las sesiones online presentes en ambos documentos. No se ha comprobado acceso a las reuniones privadas. Los correos de inscripción provienen del encargo. No hay formularios propios ni envíos de correo desde la aplicación.
