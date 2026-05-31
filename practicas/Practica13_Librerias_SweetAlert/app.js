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
