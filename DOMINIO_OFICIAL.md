# Sitios idénticos: Dispositivos CIAC y CIAC Horarios

Los dos proyectos de Cloudflare Pages publican independientemente el **mismo repositorio y la misma rama**:

- Fuente única: `amirandavillavicencio/Dispositivos-`, rama `main`.
- Original: https://dispositivos-ciac.pages.dev/
- Réplica: https://ciachorarios.pages.dev/
- Compilación en ambos proyectos: `npm ci && npm run build`.
- Archivos compilados: `dist`; Cloudflare Pages Functions locales en `functions/`.

La función `functions/[[path]].js` sirve los archivos **del propio proyecto** mediante `context.next()`. No consulta al otro dominio, no redirige, no usa iframe ni introduce diferencias en los componentes visuales, los horarios o la navegación.

## Verificación y publicación

Cada actualización fusionada en `main` debe activar un despliegue `github:push` en **ambos** proyectos. Verificar que ambos despliegues terminen correctamente y utilicen el mismo SHA de commit. Las rutas profundas y los recursos `/assets/*` deben devolver el contenido del proyecto correspondiente sin saltar al otro dominio.

Si alguno de los dos sitios deja de recibir pushes de GitHub, revisar la integración Git de Cloudflare; **no** implementar un proxy recíproco como solución. La compatibilidad de métodos HTTP se comprueba con `npm test`.

**Invariante:** el código de UI (`index.html`, `src/`) y los datos de horarios son comunes; este cambio de publicación no modifica su contenido.
