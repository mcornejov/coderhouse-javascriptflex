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
