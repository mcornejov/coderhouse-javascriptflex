// Práctica 10 - Cancelar temporizadores: clearTimeout y clearInterval
// Demuestra cómo programar y luego cancelar timers con clearTimeout y clearInterval.

console.log("Inicio del programa.");

// 1) setTimeout programado a 3 segundos. Guardamos su identificador para poder cancelarlo.
const idTimeout = setTimeout(function () {
    // Este mensaje NO debe aparecer porque cancelamos el timeout antes de los 3 segundos.
    console.log("Este mensaje del setTimeout no debería mostrarse.");
}, 3000);
console.log("setTimeout creado (3 s). Identificador guardado en idTimeout.");

// 2) Cancelamos el setTimeout antes de que alcance a ejecutarse.
clearTimeout(idTimeout);
console.log("setTimeout cancelado con clearTimeout. Su mensaje no aparecerá.");

// 3) setInterval que imprime un mensaje cada 1 segundo. Guardamos su identificador.
let contadorEjecuciones = 0;
const idInterval = setInterval(function () {
    contadorEjecuciones++;
    console.log("setInterval ejecutado. Repetición número:", contadorEjecuciones);
}, 1000);
console.log("setInterval creado (cada 1 s). Identificador guardado en idInterval.");

// 4) Después de 5 segundos cancelamos el intervalo con clearInterval.
setTimeout(function () {
    clearInterval(idInterval);
    console.log("setInterval cancelado con clearInterval tras 5 segundos.");
    console.log("Fin del programa.");
}, 5000);
