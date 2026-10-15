# Movimiento de Dispositivos CIAC

Motor: Motion, importado como dependencia local y empaquetado por Vite. Sin CDN ni animaciones CSS que compitan con la navegación.

| Interacción | Duración | Movimiento |
| --- | --- | --- |
| Cambio de pantalla | 280 ms | Entrada de 20 px y fundido; salida de 12 px en 140 ms |
| Tarjetas | 260 ms | Entrada de 12 px; stagger de hasta 45 ms, espera total máxima de 180 ms |
| Pulsación | 90 ms | Escala 0,97 |
| Soltar | 180 ms | Regreso a escala 1 |
| Progreso y selección | 280 ms | Escala horizontal del indicador; recuperación de escala en selección |
| Aparición al desplazarse | 400 ms | Fundido y desplazamiento de 18 px, una sola vez |
| Título inicial | 480 ms | Entrada de líneas con 80 ms de separación |
| Tarjetas gráficas | 3200 ms | Un ciclo de 6 px; sin bucles permanentes |

Curva principal: cubic-bezier(0.22, 1, 0.36, 1). La salida y la entrada se superponen. El nuevo paso es interactivo inmediatamente; no se espera a terminar una animación. La pantalla anterior se vuelve inerte, pierde sus identificadores y se retira al terminar. Las pulsaciones sucesivas eliminan las salidas pendientes.

El contenedor y el progreso permanecen para conservar continuidad visual. El título recibe foco sin desplazamiento; si el buscador quedó fuera del área visible, vuelve al inicio del buscador. Al regresar, el movimiento cambia de dirección y la asignatura anterior conserva su estado seleccionado.

`prefers-reduced-motion` elimina desplazamientos, stagger y escalas animadas. Un cambio de preferencia durante la sesión completa las animaciones activas. Los contenidos son visibles sin animación y la navegación mantiene la misma lógica. Se priorizan transform y opacity; sin filtros, desenfoques ni animación continua durante la lectura.
