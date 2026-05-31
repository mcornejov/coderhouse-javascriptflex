// Práctica 09 - Ejecución diferida y periódica con setTimeout y setInterval
// Demuestra cómo la ejecución asíncrona se coordina con el event loop.

console.log("Inicio del programa (código síncrono).");

// 1) Ejecución diferida: una sola vez, después de 3000 ms.
setTimeout(function () {
    console.log("¡Hola después de 3 segundos!");
}, 3000);

// 2) Ejecución periódica: imprime la hora actual cada 2000 ms.
const idIntervalo = setInterval(function () {
    const ahora = new Date();
    console.log("Hora actual: " + ahora.toLocaleTimeString("es-CL"));
}, 2000);

// 3) Cancelación: detiene el intervalo a los 10 segundos.
setTimeout(function () {
    clearInterval(idIntervalo);
    console.log("Intervalo cancelado con clearInterval. Fin del programa.");
}, 10000);

console.log("Fin del código síncrono (los temporizadores siguen pendientes).");
