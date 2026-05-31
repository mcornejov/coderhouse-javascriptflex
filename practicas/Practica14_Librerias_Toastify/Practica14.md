# Práctica 14 - Integrar librerías externas: Toastify (notificaciones por CDN)

Curso: JavaScript - CoderHouse  |  Unidad: Librerías externas  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se integra la librería externa **Toastify-js** mediante CDN para mostrar notificaciones tipo *toast*: avisos flotantes, breves y no bloqueantes que aparecen en una esquina de la pantalla y desaparecen solos. El propósito es aprender a incorporar código de terceros sin instalar nada localmente, separando por completo la lógica (en `app.js`) del marcado (en `index.html`). Además se practica la **carga dinámica de una librería en tiempo de ejecución**, insertando un tag `<script>` desde JavaScript y usando la librería recién cuando termina de descargarse (evento `onload`). Estas técnicas son habituales en desarrollo web real, donde rara vez se reinventa lo que ya existe en una librería probada.

## Conceptos aplicados

- Inclusión de una librería externa por **CDN** (Toastify-js desde jsDelivr), tanto el JavaScript como su hoja de estilos CSS.
- Uso del archivo **minificado** (`.min`) para reducir el peso de la descarga.
- **Control de versiones** fijando la versión exacta en la URL (`@1.12.0`) para builds reproducibles.
- **Fallback ante fallo del CDN**: el atributo `onerror` del tag `<script>` carga una copia de respaldo desde otro CDN (unpkg).
- Notificaciones tipo toast de **éxito** y de **error** con estilos diferenciados.
- **Carga dinámica** de un tag `<script>` con `document.createElement("script")` y ejecución diferida en el callback `onload`.
- Separación de responsabilidades: **sin JavaScript inline**, toda la lógica en un archivo externo.
- Manejo del DOM: `addEventListener`, `DOMContentLoaded` y verificación defensiva de que la librería exista antes de usarla.

## Código

### index.html

```html
<!DOCTYPE html>
<html lang="es-CL">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Práctica 14 - Librerías externas: Toastify</title>

    <!--
        Toastify-js cargada por CDN (jsDelivr).
        Primero el CSS de la librería, luego nuestros estilos para poder ajustar.
        Se fija la versión (1.12.0) para evitar cambios inesperados al actualizar el paquete.
    -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.css">

    <style>
        :root {
            --cafe-oscuro: #3e2723;
            --cafe-medio: #6f4e37;
            --crema: #f3e9dc;
            --verde-exito: #2e7d32;
            --rojo-error: #c62828;
            --azul-info: #1565c0;
        }

        * {
            box-sizing: border-box;
        }

        body {
            font-family: "Segoe UI", Arial, sans-serif;
            margin: 0;
            padding: 2rem 1rem;
            background-color: var(--crema);
            color: var(--cafe-oscuro);
            display: flex;
            justify-content: center;
        }

        main {
            width: 100%;
            max-width: 640px;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 6px 18px rgba(62, 39, 35, 0.15);
        }

        h1 {
            margin-top: 0;
            font-size: 1.6rem;
            color: var(--cafe-medio);
        }

        p.intro {
            line-height: 1.5;
        }

        section {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e0d5c7;
        }

        h2 {
            font-size: 1.1rem;
            color: var(--cafe-medio);
        }

        .grupo-botones {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-top: 1rem;
        }

        button {
            font-size: 1rem;
            font-weight: 600;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            padding: 0.7rem 1.2rem;
            cursor: pointer;
            transition: transform 0.1s ease, opacity 0.2s ease;
        }

        button:hover {
            transform: translateY(-2px);
        }

        button:active {
            transform: translateY(0);
        }

        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        #boton-exito {
            background-color: var(--verde-exito);
        }

        #boton-error {
            background-color: var(--rojo-error);
        }

        #boton-cargar-libreria {
            background-color: var(--azul-info);
        }

        .nota {
            font-size: 0.85rem;
            color: #5d4037;
            margin-top: 1rem;
            line-height: 1.4;
        }

        code {
            background-color: #f3e9dc;
            padding: 0.1rem 0.35rem;
            border-radius: 4px;
            font-size: 0.85rem;
        }
    </style>
</head>
<body>
    <main>
        <h1>Café Aurora - Notificaciones con Toastify</h1>

        <p class="intro">
            Esta práctica integra la librería externa <strong>Toastify-js</strong>
            cargada por CDN. Los botones disparan notificaciones tipo "toast"
            (mensajes flotantes no bloqueantes) de éxito y de error, sin escribir
            JavaScript dentro del HTML.
        </p>

        <section>
            <h2>Notificaciones tipo toast</h2>
            <p>
                Cada botón llama a Toastify para mostrar un aviso breve que aparece
                en la esquina de la pantalla y desaparece solo.
            </p>
            <div class="grupo-botones">
                <button id="boton-exito" type="button">Mostrar éxito</button>
                <button id="boton-error" type="button">Mostrar error</button>
            </div>
        </section>

        <section>
            <h2>Carga dinámica de una librería</h2>
            <p>
                Este botón inserta un tag <code>&lt;script&gt;</code> en tiempo de
                ejecución para cargar una librería adicional (Day.js) y, recién
                cuando termina de descargarse (evento <code>onload</code>), la usa
                para mostrar la fecha y hora actual en un toast.
            </p>
            <div class="grupo-botones">
                <button id="boton-cargar-libreria" type="button">
                    Cargar librería y mostrar fecha
                </button>
            </div>
            <p class="nota">
                Si el CDN principal de Toastify no responde, la página carga una
                copia de respaldo (fallback) automáticamente. La lógica completa
                vive en <code>app.js</code>.
            </p>
        </section>
    </main>

    <!--
        Carga de la librería Toastify por CDN.
        El atributo onerror activa un fallback: si jsDelivr no responde,
        se intenta descargar la misma versión desde unpkg.
    -->
    <script
        src="https://cdn.jsdelivr.net/npm/toastify-js@1.12.0"
        onerror="cargarToastifyFallback()"></script>

    <!-- Nuestra lógica, siempre como archivo externo (sin JS inline). -->
    <script src="app.js"></script>
</body>
</html>
```

### app.js

```js
// Práctica 14 - Integración de librerías externas con Toastify
// Toda la lógica vive en este archivo externo; el HTML no contiene JavaScript inline.

// URL de respaldo (fallback) por si el CDN principal de Toastify no responde.
const URL_TOASTIFY_FALLBACK = "https://unpkg.com/toastify-js@1.12.0/src/toastify.js";
const URL_CSS_TOASTIFY_FALLBACK = "https://unpkg.com/toastify-js@1.12.0/src/toastify.min.css";

// Esta función debe estar disponible de forma global porque el atributo
// onerror del tag <script> en el HTML la invoca si la descarga falla.
function cargarToastifyFallback() {
    // Se carga también el CSS de respaldo para que el toast conserve su estilo.
    const hojaRespaldo = document.createElement("link");
    hojaRespaldo.rel = "stylesheet";
    hojaRespaldo.href = URL_CSS_TOASTIFY_FALLBACK;
    document.head.appendChild(hojaRespaldo);

    const scriptRespaldo = document.createElement("script");
    scriptRespaldo.src = URL_TOASTIFY_FALLBACK;
    document.head.appendChild(scriptRespaldo);
}

// Muestra una notificación toast configurando colores y posición según el tipo.
function mostrarToast(mensaje, tipo) {
    // Si la librería no está disponible, se avisa por consola y se usa un alert simple.
    if (typeof Toastify !== "function") {
        console.warn("Toastify no está disponible. Se usa un aviso de respaldo.");
        alert(mensaje);
        return;
    }

    const colores = {
        exito: "linear-gradient(to right, #2e7d32, #43a047)",
        error: "linear-gradient(to right, #c62828, #e53935)",
        info: "linear-gradient(to right, #1565c0, #1e88e5)"
    };

    Toastify({
        text: mensaje,
        duration: 3500,
        gravity: "top",
        position: "right",
        close: true,
        stopOnFocus: true,
        style: {
            background: colores[tipo] || colores.info,
            borderRadius: "8px",
            fontWeight: "600"
        }
    }).showToast();
}

// Inserta dinámicamente un tag <script> para cargar Day.js en tiempo de ejecución.
// Solo cuando el script termina de descargarse (onload) se usa la librería.
function cargarLibreriaFecha() {
    const boton = document.getElementById("boton-cargar-libreria");

    // Si Day.js ya fue cargada antes, se reutiliza sin volver a descargarla.
    if (typeof dayjs === "function") {
        mostrarFechaActual();
        return;
    }

    boton.disabled = true;
    boton.textContent = "Cargando librería...";

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js";

    // El código que depende de la librería se ejecuta dentro de onload,
    // garantizando que dayjs ya está definido.
    script.onload = function () {
        boton.disabled = false;
        boton.textContent = "Cargar librería y mostrar fecha";
        mostrarFechaActual();
    };

    // Si la descarga de la librería dinámica falla, se informa con un toast de error.
    script.onerror = function () {
        boton.disabled = false;
        boton.textContent = "Cargar librería y mostrar fecha";
        mostrarToast("No se pudo cargar la librería de fecha.", "error");
    };

    document.body.appendChild(script);
}

// Usa Day.js (ya cargada) para formatear y mostrar la fecha y hora actual.
function mostrarFechaActual() {
    const fechaFormateada = dayjs().format("DD/MM/YYYY HH:mm:ss");
    mostrarToast("Librería cargada. Fecha actual: " + fechaFormateada, "info");
}

// Conexión de los botones con sus acciones una vez que el DOM está listo.
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("boton-exito").addEventListener("click", function () {
        mostrarToast("El pedido se registró correctamente.", "exito");
    });

    document.getElementById("boton-error").addEventListener("click", function () {
        mostrarToast("Hubo un problema al procesar el pedido.", "error");
    });

    document.getElementById("boton-cargar-libreria").addEventListener("click", cargarLibreriaFecha);
});
```

## Salida / Comportamiento esperado

Esta práctica corre en el navegador y depende de librerías externas servidas por CDN, por lo que no produce una salida de consola que tenga sentido capturar al ejecutarla con Node. La única verificación que aplica desde la línea de comandos es la de sintaxis del archivo de lógica:

```
$ node --check app.js
```

Si el archivo es sintácticamente válido, `node --check` no imprime nada y termina con código de salida 0; si hubiera un error de sintaxis, lo reportaría con la línea y el detalle.

En la consola del navegador no se espera ningún mensaje en condiciones normales. El único aviso defensivo posible es `Toastify no está disponible. Se usa un aviso de respaldo.`, que se mostraría solo si tanto el CDN principal como el de respaldo fallaran al cargar la librería.

### Comportamiento esperado en el navegador

1. Al abrir `index.html` se ve una tarjeta con el título "Café Aurora - Notificaciones con Toastify" y tres botones: **Mostrar éxito** (verde), **Mostrar error** (rojo) y **Cargar librería y mostrar fecha** (azul).
2. Al hacer clic en **Mostrar éxito** aparece un toast verde en la esquina superior derecha con el texto "El pedido se registró correctamente.", que se desvanece solo a los 3,5 segundos (o antes si se presiona la X).
3. Al hacer clic en **Mostrar error** aparece un toast rojo con "Hubo un problema al procesar el pedido.", con el mismo comportamiento.
4. Al hacer clic en **Cargar librería y mostrar fecha**, el botón se desactiva y muestra "Cargando librería..."; cuando termina la descarga de Day.js (callback `onload`), vuelve a su estado normal y aparece un toast azul con la fecha y hora actual formateada (por ejemplo, con el formato `DD/MM/YYYY HH:mm:ss`).
5. Si se vuelve a pulsar ese botón, el toast con la fecha aparece de inmediato porque la librería ya quedó cargada (no se descarga de nuevo).

Capturas de pantalla sugeridas para la entrega:

- La página recién abierta con los tres botones.
- Un toast verde de éxito visible.
- Un toast rojo de error visible.
- El toast azul con la fecha generada por la librería cargada dinámicamente.
- La pestaña "Network" de las herramientas del desarrollador mostrando la descarga de `toastify-js@1.12.0` y de `dayjs.min.js`.

## Explicación paso a paso

- **Inclusión por CDN:** en el `<head>` se enlaza el CSS minificado de Toastify y, al final del `<body>`, su JavaScript. Ambas URL fijan la versión `@1.12.0` para que la entrega sea reproducible.
- **Fallback ante fallo del CDN:** el tag `<script>` de Toastify lleva `onerror="cargarToastifyFallback()"`. Si jsDelivr no responde, esa función crea un `<link>` y un `<script>` apuntando a unpkg, manteniendo la misma versión. Por eso la función está declarada en el ámbito global de `app.js`.
- **`mostrarToast(mensaje, tipo)`:** centraliza la creación de toasts. Primero comprueba con `typeof Toastify !== "function"` que la librería existe; si no, degrada a un `alert` y deja constancia en consola. Luego elige un degradado de color según el tipo (éxito, error o info) y llama a `Toastify({...}).showToast()`.
- **Conexión de botones:** dentro de `DOMContentLoaded` se asocian los listeners a cada botón, evitando JavaScript inline y asegurando que los elementos ya existen en el DOM.
- **Carga dinámica (`cargarLibreriaFecha`):** crea un `<script>` con `document.createElement`, le asigna el `src` de Day.js y lo agrega al documento. La clave es que la librería solo se usa dentro de `script.onload`, garantizando que `dayjs` ya esté definido. Si la descarga falla, `script.onerror` informa con un toast de error. Una guarda inicial evita volver a descargar la librería si ya estaba cargada.
- **`mostrarFechaActual`:** usa `dayjs().format("DD/MM/YYYY HH:mm:ss")` para construir el texto del toast informativo.

## Reflexión

Al hacer esta práctica entendí por qué las librerías externas son tan comunes en el trabajo real: con muy pocas líneas obtuve notificaciones claras y livianas que, hechas a mano, me habrían costado bastante CSS y manejo de tiempos. Usar el CDN con el archivo minificado y la versión fijada me dio un equilibrio entre comodidad y control, ya que sé exactamente qué código se está sirviendo y no quedo a merced de una actualización que cambie el comportamiento sin aviso.

Lo que más me sirvió fue practicar la carga dinámica de un script y el manejo de fallback. Me quedó claro que depender de un servidor externo tiene un riesgo, y que prever un plan B (otro CDN) y validar que la librería realmente cargó antes de usarla es lo que distingue una integración frágil de una robusta. Esa lógica de cargar código solo cuando se necesita y reaccionar al evento `onload` es la base de técnicas más avanzadas como la carga diferida, que pienso aprovechar en el simulador final del curso para no penalizar el tiempo de carga inicial.
