// =============================================
// Cafe Aurora - Simulador de Pedidos (Entrega Final)
// ui.js -> referencias al DOM, render con template strings y notificaciones
// =============================================

// --- Referencias al DOM ---

const dom = {
    // Formulario del cliente
    formCliente: document.getElementById("form-cliente"),
    inputNombre: document.getElementById("input-nombre"),
    inputEmail: document.getElementById("input-email"),
    avisoCliente: document.getElementById("aviso-cliente"),
    botonEjemplo: document.getElementById("boton-ejemplo"),

    // Catalogo
    inputBusqueda: document.getElementById("input-busqueda"),
    filtros: document.getElementById("filtros"),
    grillaMenu: document.getElementById("grilla-menu"),

    // Carrito
    listaCarrito: document.getElementById("lista-carrito"),
    carritoVacio: document.getElementById("carrito-vacio"),
    resumenCarrito: document.getElementById("resumen-carrito"),
    textoSubtotal: document.getElementById("texto-subtotal"),
    textoRecargo: document.getElementById("texto-recargo"),
    textoDescuento: document.getElementById("texto-descuento"),
    textoTotal: document.getElementById("texto-total"),
    lineaRecargo: document.getElementById("linea-recargo"),
    lineaDescuento: document.getElementById("linea-descuento"),
    botonVaciar: document.getElementById("boton-vaciar"),
    botonConfirmar: document.getElementById("boton-confirmar"),

    // Confirmacion
    seccionConfirmacion: document.getElementById("seccion-confirmacion"),
    contenidoConfirmacion: document.getElementById("contenido-confirmacion"),
    botonNuevoPedido: document.getElementById("boton-nuevo-pedido"),

    // Historial
    contenidoHistorial: document.getElementById("contenido-historial"),
    botonLimpiarHistorial: document.getElementById("boton-limpiar-historial")
};


// --- Helper de seguridad: escapa texto antes de inyectarlo como HTML ---

function escaparHtml(texto) {
    return String(texto)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}


// --- Notificaciones con SweetAlert2 (libreria externa) ---

const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2400,
    timerProgressBar: true,
    didOpen: (elemento) => {
        elemento.addEventListener("mouseenter", Swal.stopTimer);
        elemento.addEventListener("mouseleave", Swal.resumeTimer);
    }
});

function notificar(mensaje, icono = "success") {
    Toast.fire({ icon: icono, title: mensaje });
}

function confirmarAccion(opciones) {
    return Swal.fire({
        title: opciones.titulo,
        html: opciones.html || opciones.texto || "",
        icon: opciones.icono || "question",
        showCancelButton: true,
        confirmButtonText: opciones.confirmar || "Confirmar",
        cancelButtonText: opciones.cancelar || "Cancelar",
        confirmButtonColor: "#6b4226",
        cancelButtonColor: "#b54b3a",
        reverseButtons: true
    });
}

function modalAgradecimiento(opciones) {
    return Swal.fire({
        title: opciones.titulo,
        html: opciones.html || "",
        icon: "success",
        confirmButtonText: opciones.confirmar || "Genial",
        confirmButtonColor: "#6b4226"
    });
}

function modalError(mensaje) {
    return Swal.fire({
        title: "Algo salio mal",
        text: mensaje,
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#6b4226"
    });
}


// --- Render del formulario del cliente ---

function pintarFormularioCliente(cliente) {
    dom.inputNombre.value = cliente.nombre || "";
    dom.inputEmail.value = cliente.email || "";

    const radios = document.querySelectorAll('input[name="modalidad"]');
    radios.forEach(radio => {
        radio.checked = radio.value === cliente.modalidad;
    });

    if (cliente.nombre) {
        dom.avisoCliente.textContent = `Hola ${cliente.nombre}! Tus datos estan guardados.`;
        dom.avisoCliente.classList.remove("error");
    } else {
        dom.avisoCliente.textContent = "";
        dom.avisoCliente.classList.remove("error");
    }
}

function mostrarErrorCliente(mensaje) {
    dom.avisoCliente.textContent = mensaje;
    dom.avisoCliente.classList.add("error");
}


// --- Render de los filtros de categoria (generados dinamicamente) ---

function pintarFiltros(categorias, categoriaActiva) {
    const opciones = [{ clave: "todas", etiqueta: "Todo" }, ...categorias];

    dom.filtros.innerHTML = opciones
        .map(opcion => `
            <button type="button"
                    class="boton-filtro ${opcion.clave === categoriaActiva ? "activo" : ""}"
                    data-categoria="${opcion.clave}">
                ${escaparHtml(opcion.etiqueta)}
            </button>
        `)
        .join("");
}


// --- Render del catalogo (template strings + literals) ---

function plantillaProducto(producto, etiquetaCategoria) {
    return `
        <article class="producto" data-id="${producto.id}">
            <span class="categoria-tag">${escaparHtml(etiquetaCategoria)}</span>
            <img class="producto-img" src="${producto.imagen}" alt="${escaparHtml(producto.nombre)}" loading="lazy">
            <h3>${escaparHtml(producto.nombre)}</h3>
            <p class="producto-desc">${escaparHtml(producto.descripcion || "")}</p>
            <p class="precio">${formatearPrecio(producto.precio)}</p>
            <button type="button" class="boton-agregar" data-accion="agregar" data-id="${producto.id}">
                Agregar al pedido
            </button>
        </article>
    `;
}

function pintarCatalogo(lista, etiquetas) {
    if (lista.length === 0) {
        dom.grillaMenu.innerHTML = `
            <p class="sin-resultados">No encontramos productos para tu busqueda.</p>
        `;
        return;
    }

    dom.grillaMenu.innerHTML = lista
        .map(producto => plantillaProducto(producto, etiquetas[producto.categoria] || ""))
        .join("");
}


// --- Render del carrito ---

function plantillaItemCarrito(item) {
    return `
        <li class="item-carrito" data-id="${item.id}">
            <span class="nombre">${escaparHtml(item.nombre)}</span>
            <div class="controles">
                <button type="button" data-accion="restar" data-id="${item.id}" aria-label="Quitar uno de ${escaparHtml(item.nombre)}">-</button>
                <span class="cantidad">${item.cantidad}</span>
                <button type="button" data-accion="sumar" data-id="${item.id}" aria-label="Agregar uno de ${escaparHtml(item.nombre)}">+</button>
            </div>
            <span class="subtotal">${formatearPrecio(item.precio * item.cantidad)}</span>
            <button type="button" class="eliminar" data-accion="eliminar" data-id="${item.id}">Eliminar</button>
        </li>
    `;
}

function pintarCarrito(carrito, totales) {
    if (carrito.length === 0) {
        dom.listaCarrito.innerHTML = "";
        dom.carritoVacio.hidden = false;
        dom.resumenCarrito.hidden = true;
        return;
    }

    dom.carritoVacio.hidden = true;
    dom.resumenCarrito.hidden = false;

    dom.listaCarrito.innerHTML = carrito.map(plantillaItemCarrito).join("");

    dom.textoSubtotal.textContent = formatearPrecio(totales.subtotal);

    if (totales.recargo > 0) {
        dom.lineaRecargo.hidden = false;
        dom.textoRecargo.textContent = `+${formatearPrecio(totales.recargo)}`;
    } else {
        dom.lineaRecargo.hidden = true;
    }

    if (totales.descuento > 0) {
        dom.lineaDescuento.hidden = false;
        dom.textoDescuento.textContent = `-${formatearPrecio(totales.descuento)}`;
    } else {
        dom.lineaDescuento.hidden = true;
    }

    dom.textoTotal.textContent = formatearPrecio(totales.total);
}


// --- Render de la confirmacion del pedido ---

function pintarConfirmacion(pedido) {
    const lineas = pedido.items
        .map(item => `
            <li>${item.cantidad} x ${escaparHtml(item.nombre)}
                <span>${formatearPrecio(item.precio * item.cantidad)}</span>
            </li>
        `)
        .join("");

    const recargoHtml = pedido.recargo > 0
        ? `<p>Recargo para llevar: +${formatearPrecio(pedido.recargo)}</p>`
        : "";

    const descuentoHtml = pedido.descuento > 0
        ? `<p>Descuento ${DESCUENTO_PORCENTAJE}%: -${formatearPrecio(pedido.descuento)}</p>`
        : "";

    dom.contenidoConfirmacion.innerHTML = `
        <h3>Gracias ${escaparHtml(pedido.nombre)}!</h3>
        <p class="dato-pedido">Pedido <strong>${pedido.numero}</strong> &middot; ${formatearFecha(pedido.fecha)}</p>
        <p class="dato-pedido">Modalidad: ${pedido.modalidad === "llevar" ? "Para llevar" : "En el local"}</p>
        <p class="dato-pedido">Enviaremos el comprobante a: ${escaparHtml(pedido.email)}</p>
        <ul class="detalle-pedido">${lineas}</ul>
        <p>Subtotal: ${formatearPrecio(pedido.subtotal)}</p>
        ${recargoHtml}
        ${descuentoHtml}
        <p class="total-final">Total pagado: ${formatearPrecio(pedido.total)}</p>
        <p>Tu pedido esta en preparacion. Que lo disfrutes en ${NOMBRE_CAFETERIA}!</p>
    `;

    dom.seccionConfirmacion.hidden = false;
    dom.seccionConfirmacion.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ocultarConfirmacion() {
    dom.seccionConfirmacion.hidden = true;
    dom.contenidoConfirmacion.innerHTML = "";
}


// --- Render del historial de compras ---

function pintarHistorial(historial) {
    if (historial.length === 0) {
        dom.contenidoHistorial.innerHTML = `
            <p class="historial-vacio">Todavia no registras compras. Cuando confirmes un pedido aparecera aqui.</p>
        `;
        dom.botonLimpiarHistorial.hidden = true;
        return;
    }

    dom.botonLimpiarHistorial.hidden = false;

    // Se muestran las compras mas recientes primero.
    const tarjetas = [...historial]
        .reverse()
        .map(pedido => {
            const cantidadItems = pedido.items.reduce((suma, item) => suma + item.cantidad, 0);
            return `
                <article class="pedido-historial">
                    <div class="pedido-historial-cabecera">
                        <span class="pedido-numero">${pedido.numero}</span>
                        <span class="pedido-fecha">${formatearFecha(pedido.fecha)}</span>
                    </div>
                    <p class="pedido-resumen">
                        ${cantidadItems} producto(s) &middot; ${pedido.modalidad === "llevar" ? "Para llevar" : "En el local"}
                    </p>
                    <p class="pedido-total">${formatearPrecio(pedido.total)}</p>
                </article>
            `;
        })
        .join("");

    dom.contenidoHistorial.innerHTML = `<div class="grilla-historial">${tarjetas}</div>`;
}


// --- Estado de carga del catalogo ---

function mostrarCargandoCatalogo() {
    dom.grillaMenu.innerHTML = `<p class="cargando">Cargando la carta...</p>`;
}

function mostrarErrorCatalogo(mensaje) {
    dom.grillaMenu.innerHTML = `
        <div class="error-catalogo">
            <p><strong>No pudimos cargar la carta.</strong></p>
            <p>${escaparHtml(mensaje)}</p>
            <p class="error-pista">Sugerencia: abre el proyecto con un servidor local (por ejemplo, la extension "Live Server" de VS Code) para que el navegador permita leer el archivo de datos.</p>
        </div>
    `;
}
