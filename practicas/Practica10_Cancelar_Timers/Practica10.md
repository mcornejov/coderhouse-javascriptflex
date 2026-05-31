# Práctica 10 - Cancelar temporizadores: clearTimeout y clearInterval

Curso: JavaScript - CoderHouse  |  Unidad: Cancelar timers  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se ejercita el control del ciclo de vida de los temporizadores de JavaScript: no solo crearlos con `setTimeout` y `setInterval`, sino también cancelarlos a tiempo con `clearTimeout` y `clearInterval`. La idea es entender que cada llamada a un temporizador devuelve un identificador que se debe guardar en una variable, ya que ese identificador es la única forma de detener la tarea programada antes (o después) de que se ejecute. Dominar esta cancelación es clave para evitar tareas fantasma, fugas de memoria y comportamientos solapados en aplicaciones reales.

## Conceptos aplicados

- `setTimeout` para programar una acción única diferida en el tiempo.
- Guardar el identificador devuelto por `setTimeout` en una variable (`idTimeout`).
- `clearTimeout` para cancelar un timeout antes de que llegue a ejecutarse.
- `setInterval` para repetir una acción de forma periódica (cada 1 segundo).
- Guardar el identificador devuelto por `setInterval` en una variable (`idInterval`).
- `clearInterval` para detener un intervalo en marcha.
- Uso de un segundo `setTimeout` como mecanismo para programar la cancelación del intervalo tras 5 segundos.
- Trazas con `console.log` para registrar la creación, ejecución y cancelación de cada timer.
- Modelo de ejecución asíncrona: el bloque síncrono termina primero y luego el event loop dispara los temporizadores.

## Código

### cancelarTimers.js

```js
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
```

## Salida en consola

```
Inicio del programa.
setTimeout creado (3 s). Identificador guardado en idTimeout.
setTimeout cancelado con clearTimeout. Su mensaje no aparecerá.
setInterval creado (cada 1 s). Identificador guardado en idInterval.
setInterval ejecutado. Repetición número: 1
setInterval ejecutado. Repetición número: 2
setInterval ejecutado. Repetición número: 3
setInterval ejecutado. Repetición número: 4
setInterval cancelado con clearInterval tras 5 segundos.
Fin del programa.
```

Se confirma que el mensaje del primer `setTimeout` nunca aparece, porque fue cancelado con `clearTimeout` apenas un instante después de crearse, mucho antes de cumplirse los 3 segundos. El intervalo alcanza a imprimir cuatro repeticiones (en los segundos 1, 2, 3 y 4) y luego, al llegar a los 5 segundos, el segundo `setTimeout` lo cancela con `clearInterval`, lo que permite que el script termine por sí solo.

## Explicación paso a paso

1. El programa parte imprimiendo `Inicio del programa.` de forma síncrona.
2. Se crea un `setTimeout` con retardo de 3 segundos y su identificador se guarda en la constante `idTimeout`. Aún no se ejecuta la función interna; solo queda programada.
3. De inmediato se invoca `clearTimeout(idTimeout)`. Como se cancela antes de que pasen los 3 segundos, la función interna nunca corre y su mensaje no se imprime.
4. Se crea un `setInterval` con período de 1 segundo y su identificador se guarda en `idInterval`. En cada disparo aumenta el contador `contadorEjecuciones` e imprime el número de repetición.
5. Se programa un segundo `setTimeout` a 5 segundos. Cuando se cumple, llama a `clearInterval(idInterval)` para detener el intervalo, registra la cancelación e imprime `Fin del programa.`.
6. Como ya no quedan temporizadores activos, el event loop se vacía y el proceso de Node termina solo, sin necesidad de cortarlo manualmente.

## Reflexión

Lo que más me quedó claro con esta práctica es que un temporizador no termina cuando uno deja de mirarlo: sigue vivo en segundo plano hasta que se ejecuta o hasta que lo cancelo explícitamente. Guardar el identificador que devuelven `setTimeout` y `setInterval` deja de parecer un detalle y se vuelve una obligación, porque sin ese identificador no tengo forma de llamar a `clearTimeout` o `clearInterval`. Ver que el primer mensaje simplemente no aparece me ayudó a entender que la cancelación realmente impide la ejecución, no solo la oculta.

En desarrollo web real esto evita un problema muy común: los timers solapados. Si, por ejemplo, un usuario hace clic varias veces en un botón que lanza un `setInterval` para refrescar datos, sin cancelar el anterior terminaría con muchos intervalos corriendo a la vez, consumiendo recursos y provocando parpadeos o llamadas duplicadas. La regla que me llevo es siempre guardar el identificador y limpiar el timer anterior antes de crear uno nuevo (o al desmontar un componente y al salir de una vista), de modo que en todo momento exista a lo sumo un temporizador activo por tarea. Así la aplicación se mantiene predecible, liviana y sin tareas fantasma.
