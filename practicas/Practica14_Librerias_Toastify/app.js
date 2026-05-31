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
