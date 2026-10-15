# Dispositivos CIAC

Primera alfa de la aplicación de apoyos DATA-E / CIAC USM. Sitio estático para Cloudflare Pages, sin servidor, Workers independientes ni base de datos.

## Desarrollo

Node.js 22.12 o posterior. Ejecutar `npm ci`, luego `npm run dev`. Para revisar la compilación: `npm run build` y `npm run preview`. Las comprobaciones de catálogo se ejecutan con `npm test`.

## Archivos

- `src/data.js`: horarios, especialidades, contactos y enlaces del semestre 2026-2.
- `src/catalog.js`: selección de asignaturas y dispositivos, orden por especialidad.
- `src/main.js`: navegación y presentación.
- `src/motion.js`: transiciones, stagger, pulsaciones y movimiento reducido.
- `src/style.css`: diseño adaptable a móvil y escritorio.
- `MOTION.md`: tiempos y reglas de movimiento.
- `DOCUMENTACION_DATOS.md`: fuentes e inconsistencias pendientes.

## Revisión y Cloudflare Pages

Proyecto: `dispositivos-ciac`. Comando de compilación: `npm ci && npm run build`. Directorio de salida: `dist`.

La rama `feat/dispositivos-ciac-alpha` genera una vista previa. Los despliegues automáticos de producción están desactivados. El PR se revisa sin merge; la publicación definitiva requiere aprobación.

Campus → asignatura → dispositivo muestra todos los detalles sin abrir tarjetas adicionales. La cuarta interacción permite solicitar inscripción mediante el cliente de correo. Volver conserva la selección y la búsqueda; al cambiar de campus se conserva la asignatura si existe en el nuevo campus.
