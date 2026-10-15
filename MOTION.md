# Movimiento de Dispositivos CIAC

Motor: Motion, dependencia local empaquetada por Vite.

| Interacción | Duración | Movimiento |
| --- | --- | --- |
| Cambio de pantalla | 340 + 160 ms | Expansión circular de color desde el toque, seguida de fundido |
| Entrada de campus, asignaturas y dispositivos | 220 ms | Desplazamiento de 12 px y fundido; entradas separadas por 25 ms, máximo nueve elementos |
| Dispositivo desplegable | 250 ms | Alto y opacidad; permanece en la pantalla de resultados |
| Menú | 280 ms | Apertura y cierre circular desde el control superior |
| Pulsación | 160 ms | Escala 1 → 0,985 → 1 |

Curva principal: cubic-bezier(0.22, 1, 0.36, 1). La expansión cubre la pantalla anterior antes de montar la siguiente. El origen usa las coordenadas del toque; con teclado toma el centro del control. Las transiciones bloquean avances simultáneos y devuelven el foco al título sin desplazar el documento.

La estructura exterior permanece fija. Las listas de asignaturas, dispositivos y vistas informativas tienen desplazamiento interior. Campus y asignatura se conservan al regresar; la búsqueda mantiene su valor hasta cambiar campus. No hay pantalla independiente de detalles.

El menú vuelve inerte el contenido de fondo, contiene el foco y permite cerrar con Escape. Al cerrar devuelve el foco al control. Los paneles cerrados no ofrecen enlaces al teclado ni a lectores de pantalla.

`prefers-reduced-motion` elimina las duraciones, desplazamientos y entradas escalonadas. Cambiar la preferencia completa las animaciones activas. La lógica y la información son las mismas con movimiento reducido.

El alto responde a `visualViewport` y a sus cambios por teclado virtual, con `100dvh` como respaldo. Cabecera y contenedor respetan las áreas seguras de iOS. La comprobación automatizada de WebKit no sustituye una revisión en Safari con un iPhone físico.
