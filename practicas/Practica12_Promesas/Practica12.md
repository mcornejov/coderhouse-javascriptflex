# Práctica 12 - Promesas: then, catch y finally

Curso: JavaScript - CoderHouse  |  Unidad: Promesas  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se trabaja el manejo de operaciones asíncronas mediante el objeto `Promise` de JavaScript. La idea es construir una función que devuelva una promesa que se resuelve o se rechaza al azar después de 2 segundos, y luego consumir esa promesa con los métodos `then`, `catch` y `finally` para reaccionar al éxito, al error y al cierre de la operación. Además se encadenan dos operaciones asíncronas donde la segunda depende del resultado de la primera, manejando cualquier falla de la cadena con un solo `catch`. Esto sirve para entender cómo JavaScript coordina tareas que toman tiempo (peticiones de red, lecturas de disco, temporizadores) sin bloquear el resto del programa, manteniendo el código ordenado y legible.

## Conceptos aplicados

- Creación de promesas con `new Promise((resolver, rechazar) => { ... })`.
- Resolución y rechazo de una promesa mediante las funciones del ejecutor (aquí nombradas `resolver` y `rechazar`).
- Simulación de demora con `setTimeout` (2 segundos).
- Aleatoriedad del resultado con `Math.random()`.
- Consumo de promesas con `then` para el caso de éxito.
- Manejo de errores con `catch`.
- Bloque `finally` que se ejecuta siempre, sin importar el resultado.
- Encadenamiento de promesas (`then` que retorna otra promesa).
- Dependencia entre operaciones asíncronas: la segunda usa el resultado de la primera.
- Manejo centralizado de errores de una cadena con un único `catch`.
- Código compatible con Node y navegador (verificación de `typeof document`).

## Código

### index.html

```html
<!DOCTYPE html>
<html lang="es-CL">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Práctica 12 - Promesas: then, catch y finally</title>
    <style>
        body {
            font-family: "Segoe UI", Arial, sans-serif;
            background-color: #f3ece2;
            color: #3b2f2f;
            margin: 0;
            padding: 2rem;
        }

        main {
            max-width: 680px;
            margin: 0 auto;
            background-color: #fffaf3;
            border: 1px solid #d8c7b0;
            border-radius: 12px;
            padding: 1.5rem 2rem;
        }

        h1 {
            color: #6f4e37;
            margin-top: 0;
        }

        #mensajes {
            margin-top: 1.5rem;
            border-top: 1px dashed #d8c7b0;
            padding-top: 1rem;
        }

        .mensaje {
            margin: 0.4rem 0;
            padding: 0.6rem 0.9rem;
            border-radius: 8px;
            font-size: 0.95rem;
        }

        .mensaje--info {
            background-color: #eef3f7;
            color: #2f4858;
        }

        .mensaje--exito {
            background-color: #e6f4ea;
            color: #1e6b3a;
        }

        .mensaje--error {
            background-color: #fbe9e7;
            color: #a23b2c;
        }
    </style>
</head>
<body>
    <main>
        <h1>Café Aurora - Envío de pedidos</h1>
        <p>
            Esta página simula el envío de pedidos a la cocina mediante promesas.
            Cada pedido se resuelve o se rechaza de forma aleatoria luego de 2 segundos.
            Los resultados aparecen más abajo y también en la consola del navegador.
        </p>

        <section id="mensajes" aria-live="polite"></section>
    </main>

    <script src="promesas.js"></script>
</body>
</html>
```

### promesas.js

```js
"use strict";

// Práctica 12 - Promesas: then, catch y finally
// Café Aurora: simulamos el envío de un pedido al sistema de cocina.
// La promesa se resuelve o se rechaza de forma aleatoria luego de 2 segundos.

// Si existe document (navegador), guardamos el contenedor de mensajes.
// En Node este acceso queda en null y solo usamos console.log.
const contenedorMensajes =
    typeof document !== "undefined"
        ? document.getElementById("mensajes")
        : null;

// Muestra un mensaje en la consola y, si hay página, también en pantalla.
function mostrarMensaje(texto, tipo = "info") {
    console.log(texto);

    if (contenedorMensajes) {
        const parrafo = document.createElement("p");
        parrafo.textContent = texto;
        parrafo.className = "mensaje mensaje--" + tipo;
        contenedorMensajes.appendChild(parrafo);
    }
}

// Devuelve una promesa que se resuelve o rechaza al azar tras 2 segundos.
function enviarPedidoACocina(nombrePedido) {
    return new Promise((resolver, rechazar) => {
        setTimeout(() => {
            const cocinaDisponible = Math.random() < 0.5;

            if (cocinaDisponible) {
                resolver("Cocina recibió el pedido: " + nombrePedido);
            } else {
                rechazar(new Error("La cocina está saturada y no aceptó: " + nombrePedido));
            }
        }, 2000);
    });
}

// Segunda operación asincrónica: depende del resultado de la primera.
// Solo se ejecuta si el pedido fue aceptado, y prepara la bebida.
function prepararBebida(confirmacionPedido) {
    return new Promise((resolver, rechazar) => {
        setTimeout(() => {
            const insumosSuficientes = Math.random() < 0.5;

            if (insumosSuficientes) {
                resolver("Bebida lista. Base: " + confirmacionPedido);
            } else {
                rechazar(new Error("Sin insumos para completar: " + confirmacionPedido));
            }
        }, 2000);
    });
}

// Ejemplo 1: una sola promesa con then, catch y finally.
mostrarMensaje("Enviando pedido a la cocina...", "info");

enviarPedidoACocina("Café Aurora especial")
    .then((mensajeExito) => {
        mostrarMensaje("Éxito: " + mensajeExito, "exito");
    })
    .catch((error) => {
        mostrarMensaje("Error: " + error.message, "error");
    })
    .finally(() => {
        mostrarMensaje("La operación del primer pedido terminó.", "info");
    });

// Ejemplo 2: dos operaciones encadenadas donde la segunda depende
// del resultado de la primera, con un solo catch para ambas.
mostrarMensaje("Iniciando pedido encadenado...", "info");

enviarPedidoACocina("Latte grande")
    .then((confirmacion) => {
        mostrarMensaje("Paso 1 listo: " + confirmacion, "exito");
        return prepararBebida(confirmacion);
    })
    .then((bebidaLista) => {
        mostrarMensaje("Paso 2 listo: " + bebidaLista, "exito");
    })
    .catch((error) => {
        mostrarMensaje("Error en la cadena: " + error.message, "error");
    })
    .finally(() => {
        mostrarMensaje("La operación encadenada terminó.", "info");
    });
```

## Salida en consola

El programa se ejecuta con `node promesas.js`. Las dos líneas informativas se imprimen de inmediato (código síncrono) y, pasados unos 2 segundos, aparecen los resultados de cada promesa. Como el resultado depende de `Math.random()`, las líneas de éxito o de error cambian en cada corrida. A continuación se muestra una corrida real en la que ambos pedidos resultaron exitosos:

```
Enviando pedido a la cocina...
Iniciando pedido encadenado...
Éxito: Cocina recibió el pedido: Café Aurora especial
La operación del primer pedido terminó.
Paso 1 listo: Cocina recibió el pedido: Latte grande
Paso 2 listo: Bebida lista. Base: Cocina recibió el pedido: Latte grande
La operación encadenada terminó.
```

Si la primera promesa se rechaza, la salida del segundo bloque toma el camino del `catch` y se ve así:

```
Enviando pedido a la cocina...
Iniciando pedido encadenado...
Error: La cocina está saturada y no aceptó: Café Aurora especial
La operación del primer pedido terminó.
Error en la cadena: La cocina está saturada y no aceptó: Latte grande
La operación encadenada terminó.
```

### Comportamiento esperado en el navegador

1. Al abrir `index.html`, se ve el encabezado "Café Aurora - Envío de pedidos" y dos mensajes informativos inmediatos: "Enviando pedido a la cocina..." e "Iniciando pedido encadenado...".
2. Tras unos 2 segundos, aparece el resultado del primer pedido (mensaje verde de éxito o rojo de error) seguido de "La operación del primer pedido terminó.".
3. El pedido encadenado muestra primero "Paso 1 listo: ..." y, unos 2 segundos después, "Paso 2 listo: ..." si todo sale bien; si falla cualquiera de los dos pasos, aparece un único mensaje "Error en la cadena: ...".
4. Siempre se imprime al final "La operación encadenada terminó.", confirmando que el bloque `finally` se ejecuta pase lo que pase.
5. Capturas sugeridas: una captura del estado inicial con los dos mensajes informativos, una captura del resultado exitoso (mensajes verdes) y una captura de un resultado con error (mensaje rojo del `catch`).

## Explicación paso a paso

- `contenedorMensajes` guarda el elemento `#mensajes` solo cuando existe `document`. Así el mismo archivo funciona en Node (donde `document` no existe) y en el navegador, sin lanzar errores.
- `mostrarMensaje` centraliza la salida: siempre escribe en consola con `console.log` y, si hay página, agrega un párrafo con una clase de estilo según el tipo (info, éxito o error).
- `enviarPedidoACocina` retorna una `new Promise`. Dentro, un `setTimeout` de 2000 ms simula la demora; al cumplirse, `Math.random() < 0.5` decide si se llama a `resolver` (éxito) o a `rechazar` (error con `new Error`).
- El primer bloque consume la promesa: `then` recibe el mensaje de éxito, `catch` captura el error y `finally` se ejecuta siempre, anunciando que la operación terminó.
- El segundo bloque encadena dos operaciones. El primer `then` retorna `prepararBebida(confirmacion)`, por lo que el siguiente `then` espera esa nueva promesa. Como la segunda operación depende del resultado de la primera, recibe la confirmación como base.
- Un único `catch` cubre toda la cadena: si falla el envío o falla la preparación, el error cae en el mismo manejador, evitando repetir lógica. El `finally` cierra el flujo.

## Reflexión

Trabajar con promesas me ayudó a entender cómo JavaScript maneja tareas que no terminan de inmediato sin congelar el resto del programa. Me pareció muy claro el rol de cada método: `then` para el caso exitoso, `catch` para los errores y `finally` para todo aquello que debo ejecutar pase lo que pase, como cerrar un indicador de carga. El hecho de poder concentrar todos los errores de una cadena en un solo `catch` hace que el código quede mucho más ordenado que si tuviera que validar cada paso por separado.

Veo la utilidad directa en desarrollo web real: cuando consumimos una API con `fetch`, pedimos datos a una base de datos o esperamos la respuesta de un pago, estamos justamente trabajando con promesas. Encadenar operaciones dependientes, como confirmar un pedido y recién después procesar el cobro, es exactamente lo que se hace en una aplicación de verdad. Esta práctica me deja una base sólida para entender luego `async`/`await`, que no es más que una forma más legible de escribir esta misma lógica de promesas.
