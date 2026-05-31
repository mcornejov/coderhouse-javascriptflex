# Práctica 13 - Integrar librerías externas: SweetAlert2 (CDN y carga dinámica)

Curso: JavaScript - CoderHouse  |  Unidad: Librerías externas  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se aprende a integrar una librería externa de JavaScript en un proyecto web usando SweetAlert2 como ejemplo. Se practican dos formas de uso real: cargar la librería por enlace CDN dentro del HTML para tenerla disponible de inmediato, y cargarla de forma dinámica con `import()` desde el código, de manera que la descarga ocurra recién cuando el usuario la necesita. Dominar estos métodos sirve para reutilizar código probado por la comunidad, reducir el peso inicial de la página y entender el control de versiones y los planes de respaldo (fallback) cuando una dependencia externa no está disponible.

## Conceptos aplicados

- Integración de librerías externas mediante enlace CDN (`<script src="...">`).
- Uso del objeto global de una librería (`Swal.fire`) para mostrar alertas personalizadas.
- Carga dinámica de módulos con `import()` y resolución con `async`/`await`.
- Separación de responsabilidades: HTML para la estructura y `app.js` para toda la lógica, sin JavaScript en línea.
- Manejo de eventos con `addEventListener`.
- Control de versiones de dependencias (fijar `@11` en el CDN).
- Manejo de errores y fallback con `try`/`catch`/`finally`.
- Módulos ES en el navegador (`<script type="module">`).

## Código

### index.html

```html
<!DOCTYPE html>
<html lang="es-CL">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Práctica 13 - Librerías externas: SweetAlert2</title>

    <!-- Método CDN: la librería SweetAlert2 se carga por enlace externo.
         Se fija la versión 11 para mantener control de versiones. -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <style>
        body {
            font-family: system-ui, sans-serif;
            max-width: 640px;
            margin: 40px auto;
            padding: 0 16px;
            background-color: #f7f1e8;
            color: #3a2c1a;
        }

        h1 {
            color: #6f4e37;
        }

        p {
            line-height: 1.5;
        }

        .grupo-botones {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 24px;
        }

        button {
            padding: 12px 16px;
            font-size: 1rem;
            border: none;
            border-radius: 8px;
            background-color: #6f4e37;
            color: #fff;
            cursor: pointer;
        }

        button:hover {
            background-color: #553a29;
        }

        button:disabled {
            background-color: #b3a392;
            cursor: progress;
        }
    </style>
</head>
<body>
    <h1>Integración de SweetAlert2</h1>
    <p>
        Esta práctica demuestra dos formas de usar una librería externa:
        cargada por CDN en el HTML y cargada de forma dinámica con
        <code>import()</code> desde JavaScript.
    </p>

    <div class="grupo-botones">
        <button id="boton-alerta-cdn" type="button">
            Mostrar alerta (CDN ya cargado)
        </button>

        <button id="boton-alerta-dinamica" type="button">
            Cargar librería y mostrar alerta (import dinámico)
        </button>
    </div>

    <!-- Toda la lógica está en app.js, sin JavaScript en línea.
         Se carga como módulo para poder usar import() dinámico. -->
    <script type="module" src="app.js"></script>
</body>
</html>
```

### app.js

```js
"use strict";

// Práctica 13 - Integración de librerías externas con SweetAlert2.
// Toda la lógica vive aquí: no hay JavaScript en línea dentro del HTML.

// URL del módulo de SweetAlert2 para la carga dinámica con import().
const URL_MODULO_SWEETALERT = "https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm";

// Referencias a los botones definidos en el HTML.
const botonCDN = document.getElementById("boton-alerta-cdn");
const botonDinamico = document.getElementById("boton-alerta-dinamica");

// Bandera para recordar si el módulo ya se importó al menos una vez.
// Sirve para ajustar el texto del botón; el navegador, además, cachea
// el módulo, por lo que las importaciones siguientes no vuelven a descargarlo.
let moduloDinamicoCargado = false;

// Método 1: la librería ya llegó por CDN en el HTML, por lo que el objeto
// global Swal está disponible de inmediato al hacer clic.
function mostrarAlertaDesdeCDN() {
    if (typeof Swal === "undefined") {
        alert("SweetAlert2 no se cargó desde el CDN. Revisa tu conexión.");
        return;
    }

    Swal.fire({
        icon: "success",
        title: "Café Aurora",
        text: "Esta alerta usa SweetAlert2 cargado por CDN en el HTML.",
        confirmButtonText: "Entendido"
    });
}

// Método 2: carga dinámica con import(). El módulo se descarga recién al
// presionar el botón; la alerta se muestra solo cuando termina de cargar.
async function mostrarAlertaConCargaDinamica() {
    botonDinamico.disabled = true;
    botonDinamico.textContent = "Cargando librería...";

    try {
        const modulo = await import(URL_MODULO_SWEETALERT);
        const SwalDinamico = modulo.default;
        moduloDinamicoCargado = true;

        SwalDinamico.fire({
            icon: "info",
            title: "Carga dinámica lista",
            text: "El módulo se importó con import() y la alerta aparece después.",
            confirmButtonText: "Perfecto"
        });
    } catch (error) {
        // Fallback: si falla la importación, avisamos sin romper la página.
        alert("No se pudo cargar la librería de forma dinámica: " + error.message);
    } finally {
        botonDinamico.disabled = false;
        botonDinamico.textContent = moduloDinamicoCargado
            ? "Mostrar alerta (ya cargada dinámicamente)"
            : "Cargar librería y mostrar alerta (import dinámico)";
    }
}

// Conexión de los eventos. Al cargarse como módulo, el script se ejecuta
// con el DOM ya disponible, por lo que los botones existen al registrar.
botonCDN.addEventListener("click", mostrarAlertaDesdeCDN);
botonDinamico.addEventListener("click", mostrarAlertaConCargaDinamica);
```

## Salida y comportamiento esperado

Este ejercicio corre en el navegador y usa una librería externa, por lo que no produce salida de consola ejecutable desde la terminal. La sintaxis de `app.js` se validó con `node --check` y no arroja errores.

### Comportamiento esperado en el navegador

1. Al abrir `index.html` en el navegador se ve el título "Integración de SweetAlert2", un párrafo explicativo y dos botones de color café.
2. Al hacer clic en el primer botón ("Mostrar alerta (CDN ya cargado)") aparece de inmediato un cuadro modal de SweetAlert2 con ícono verde de éxito, título "Café Aurora" y el botón "Entendido". Esto funciona porque la librería ya venía cargada por el CDN en el HTML.
3. Al hacer clic en el segundo botón ("Cargar librería y mostrar alerta (import dinámico)") el botón se deshabilita y cambia su texto a "Cargando librería..." mientras se descarga el módulo. Una vez que `import()` termina, aparece un modal de SweetAlert2 con ícono azul de información, título "Carga dinámica lista" y el botón "Perfecto". Luego el botón vuelve a habilitarse con el texto "Mostrar alerta (ya cargada dinámicamente)".
4. Si la descarga dinámica falla (por ejemplo, sin conexión), aparece un `alert` nativo indicando el error y la página sigue funcionando.

Capturas de pantalla sugeridas para la entrega:

- La página inicial con los dos botones.
- El modal verde de éxito tras el primer botón (método CDN).
- El segundo botón en estado "Cargando librería...".
- El modal azul de información tras la carga dinámica (método `import()`).

## Explicación paso a paso

- En `index.html`, la etiqueta `<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>` carga SweetAlert2 por CDN y deja disponible el objeto global `Swal`. Se fija la versión `@11` para que el proyecto no se rompa si sale una versión mayor con cambios incompatibles.
- El `app.js` se enlaza con `type="module"`, lo que permite usar `import()` dinámico y mantener el código aislado en su propio ámbito. No hay JavaScript en línea en el HTML.
- `mostrarAlertaDesdeCDN` representa el primer método: como la librería ya está cargada, basta con llamar a `Swal.fire(...)`. Antes se verifica con `typeof Swal === "undefined"` por si el CDN no respondió, mostrando un mensaje de respaldo.
- `mostrarAlertaConCargaDinamica` representa el segundo método: usa `await import(URL_MODULO_SWEETALERT)` para descargar el módulo ES recién al presionar el botón. La alerta se muestra únicamente después de que la promesa de `import()` se resuelve, garantizando que la librería ya está lista. El bloque `try`/`catch`/`finally` maneja el error y siempre restablece el estado del botón.
- Al final, `addEventListener` conecta cada botón con su función, separando la lógica de la estructura HTML.

### Los cuatro métodos de integración de librerías externas

1. **Enlace CDN (`<script src="...">`):** se referencia la librería desde un servidor público como jsDelivr o unpkg. Es la forma más rápida de empezar, no requiere descargar archivos y aprovecha la caché compartida del navegador. La desventaja es que se depende de la disponibilidad del servidor externo y de la conexión del usuario. Es el método usado en el primer botón de esta práctica.

2. **Archivo `.min` local:** se descarga el archivo minificado (por ejemplo `sweetalert2.min.js`) y se guarda dentro del proyecto, enlazándolo con `<script src="js/sweetalert2.min.js"></script>`. Da control total sobre la versión, funciona sin conexión a internet y no depende de terceros, a costa de tener que actualizar el archivo manualmente y versionarlo en el repositorio. La versión `.min` viene comprimida para pesar menos.

3. **Carga dinámica con `import()`:** la librería se importa desde el código solo cuando se necesita, usando `import("...").then(...)` o `await import("...")`. Esto reduce el peso inicial de la página (lazy loading) porque la descarga ocurre bajo demanda. Es el método usado en el segundo botón de esta práctica.

4. **Inserción dinámica de un tag `<script>`:** desde JavaScript se crea un elemento `script`, se le asigna el `src` y se agrega al documento, escuchando su evento `load`. Por ejemplo:

   ```js
   const etiqueta = document.createElement("script");
   etiqueta.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
   etiqueta.onload = () => Swal.fire("Cargado dinámicamente");
   document.head.appendChild(etiqueta);
   ```

   Sirve para cargar librerías clásicas (no modulares) bajo demanda y permite reaccionar cuando terminan de cargar mediante el evento `load`.

### Control de versiones y fallback

Fijar la versión de una librería (por ejemplo `@11` en lugar de `@latest`) es importante porque evita que una actualización mayor con cambios incompatibles rompa el proyecto sin aviso. El control de versiones hace que el comportamiento sea predecible y reproducible. El fallback, por su parte, es el plan de respaldo cuando la dependencia externa no está disponible: en esta práctica se verifica con `typeof Swal === "undefined"` y se maneja el error de `import()` con `try`/`catch`, de modo que la página siga funcionando y el usuario reciba un mensaje claro en lugar de una pantalla rota. Un fallback robusto puede incluso cargar una copia local de la librería si el CDN falla.

## Reflexión

Con esta práctica entendí que usar librerías externas no es solo "copiar un script y listo", sino decidir cómo y cuándo cargarlas según lo que necesita el proyecto. Me pareció muy útil ver la diferencia entre tener la librería lista de inmediato por CDN y cargarla recién cuando el usuario la pide con `import()`, porque en proyectos reales eso impacta directamente en la velocidad de carga inicial de la página. SweetAlert2 además me mostró lo cómodo que es apoyarse en código ya probado por la comunidad en vez de reinventar alertas a mano.

Lo que más me quedó dando vueltas es la importancia del control de versiones y del fallback. En el desarrollo web real depender de un servidor externo es cómodo pero arriesgado, y un buen plan de respaldo marca la diferencia entre una página que sigue funcionando y una que se cae por un detalle fuera de mi control. Fijar la versión y manejar los errores con `try`/`catch` son hábitos que pienso aplicar de aquí en adelante en el simulador de Café Aurora y en cualquier proyecto que dependa de librerías de terceros.
