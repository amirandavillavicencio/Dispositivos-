# Dirección pública: Dispositivos CIAC

- URL conservada: https://dispositivos-ciac.pages.dev/
- Proyecto Pages existente: `dispositivos-ciac`, conectado al repositorio `amirandavillavicencio/Dispositivos-`.
- Fuente única de la **aplicación actualmente aprobada**: `amirandavillavicencio/ciac-vitacura`, desplegada en https://ciachorarios.pages.dev/.

## Publicación sin cambiar URL

La función Pages `functions/[[path]].js` sirve las respuestas de la aplicación vigente desde el origen anterior y conserva `dispositivos-ciac.pages.dev` en la barra de direcciones, incluidas rutas, parámetros y recursos estáticos. No devuelve redirecciones hacia el origen, no muestra un iframe, no copia horarios ni código académico y no altera el proyecto ciac-vitacura. Solo permite GET y HEAD y no transmite cookies de usuario.

Como hay dos repositorios y dos proyectos Pages diferentes, editar la aplicación de Dispositivos- no actualiza la aplicación real. Toda modificación de la UI y de los horarios debe realizarse en ciac-vitacura. El proyecto Dispositivos- únicamente mantiene este acceso público.

**Dependencia:** el origen `ciachorarios.pages.dev` debe permanecer accesible y funcional. Si está temporalmente inactivo, el sitio oficial devolverá 502 en vez de mostrar una aplicación anterior.

## Comprobación

- `npm test` comprueba rutas, recursos, parámetros, seguridad de encabezados, redirecciones internas y el error de origen.
- Antes de fusionar y después de desplegar, abrir ambos dominios y confirmar visualmente el mismo inicio y las mismas pantallas, sin cambio de URL.
