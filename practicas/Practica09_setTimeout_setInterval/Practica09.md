# Práctica 09 - Ejecución diferida y periódica: setTimeout y setInterval

Curso: JavaScript - CoderHouse  |  Unidad: Temporizadores  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se trabaja con los temporizadores de JavaScript para programar código que se ejecuta de forma diferida y de forma periódica. Se usa `setTimeout` para ejecutar una tarea una sola vez después de un retardo, `setInterval` para repetir una tarea cada cierto intervalo, y `clearInterval` para detener esa repetición. El propósito es comprender cómo el motor de JavaScript coordina estas tareas asíncronas a través del event loop, sin bloquear la ejecución del código síncrono.

## Conceptos aplicados

- `setTimeout(callback, ms)`: ejecución diferida de una función una única vez.
- `setInterval(callback, ms)`: ejecución periódica de una función cada cierto intervalo.
- `clearInterval(id)`: cancelación de un intervalo activo usando el identificador que devuelve `setInterval`.
- Funciones de callback como argumento de los temporizadores.
- Objeto `Date` y su método `toLocaleTimeString` para obtener la hora actual con formato local (`es-CL`).
- Ejecución síncrona versus asíncrona y el rol del event loop.

## Código

### temporizadores.js

```js
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
```

## Salida en consola

> Nota: la salida es ilustrativa. Las horas provienen del objeto `Date`, por lo que cambian en cada ejecución; el resto del texto es fijo.

```
Inicio del programa (código síncrono).
Fin del código síncrono (los temporizadores siguen pendientes).
Hora actual: 7:17:59 p. m.
¡Hola después de 3 segundos!
Hora actual: 7:18:01 p. m.
Hora actual: 7:18:03 p. m.
Hora actual: 7:18:05 p. m.
Intervalo cancelado con clearInterval. Fin del programa.
```

## Explicación paso a paso

1. Las dos líneas con `console.log` que enmarcan el archivo ("Inicio del programa" y "Fin del código síncrono") son código síncrono: se ejecutan de inmediato, una tras otra, antes que cualquier temporizador. Por eso aparecen primero en la salida.
2. El primer `setTimeout` agenda una tarea para dentro de 3000 ms. No detiene el programa: solo registra el callback y sigue adelante. A los 3 segundos imprime "¡Hola después de 3 segundos!".
3. El `setInterval` registra una tarea que se repite cada 2000 ms y devuelve un identificador, que guardo en `idIntervalo` para poder cancelarlo después. En cada repetición crea un objeto `Date` con la hora del momento y la formatea con `toLocaleTimeString("es-CL")`.
4. El segundo `setTimeout`, programado para los 10000 ms, llama a `clearInterval(idIntervalo)`. Esto detiene la repetición del intervalo e imprime el mensaje final. Sin esta cancelación, el `setInterval` seguiría ejecutándose de manera indefinida y el script nunca terminaría por sí solo.
5. En la salida se observa el orden real: primero los dos mensajes síncronos, luego las horas cada 2 segundos intercaladas con el saludo a los 3 segundos, y finalmente la cancelación a los 10 segundos.

## Reflexión

Lo que más me ayudó a entender esta práctica fue ver con claridad la diferencia entre el código síncrono y el asíncrono. Aunque escribo los `setTimeout` y el `setInterval` antes de la última línea, esa última línea se imprime primero, porque los temporizadores quedan en cola y el event loop solo los ejecuta cuando la pila de llamadas está libre y se cumple el retardo. Comprender ese flujo me dio una base concreta para razonar sobre la asincronía en JavaScript en lugar de tratarla como algo mágico.

En el desarrollo web real esto se aplica todo el tiempo: un `setInterval` sirve para refrescar datos en pantalla o actualizar un reloj, y un `setTimeout` es útil para mostrar notificaciones que desaparecen solas o para diferir tareas que no deben bloquear la interfaz. Igual de importante es recordar siempre guardar el identificador del intervalo y cancelarlo con `clearInterval` cuando ya no se necesita, para no dejar procesos corriendo en segundo plano que consuman recursos o generen comportamientos inesperados.
