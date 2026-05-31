// =============================================
// Cafe Aurora - Simulador de Pedidos (Entrega Final)
// app.js -> estado, logica de negocio, eventos e inicializacion
// =============================================

// --- Estado de la aplicacion ---

let catalogo = [];               // productos cargados desde el JSON
let categorias = [];             // [{ clave, etiqueta }]
let etiquetasCategoria = {};     // { clave: etiqueta } para acceso rapido

let cliente = { nombre: "", email: "", modalidad: "local" };
let carrito = [];                // [{ id, nombre, precio, cantidad }]
let historial = [];              // pedidos confirmados

let categoriaActiva = "todas";
let terminoBusqueda = "";


// --- Helpers de logica ---

function obtenerProductosVisibles() {
    const termino = terminoBusqueda.trim().toLowerCase();

    return catalogo.filter(producto => {
        const coincideCategoria = categoriaActiva === "todas" || producto.categoria === categoriaActiva;
        const coincideBusqueda = termino === "" || producto.nombre.toLowerCase().includes(termino);
        return coincideCategoria && coincideBusqueda;
    });
}

function calcularTotales() {
    const subtotal = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    const recargo = cliente.modalidad === "llevar" ? RECARGO_PARA_LLEVAR : 0;
    const descuento = subtotal >= MONTO_MINIMO_DESCUENTO
        ? Math.round(subtotal * (DESCUENTO_PORCENTAJE / 100))
        : 0;
    const total = subtotal + recargo - descuento;

    return { subtotal, recargo, descuento, total };
}

function refrescarCarrito() {
    pintarCarrito(carrito, calcularTotales());
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generarNumeroPedido() {
    const marca = Date.now().toString().slice(-6);
    return `AUR-${marca}`;
}


// --- Logica del carrito ---

function agregarAlCarrito(id) {
    const producto = catalogo.find(p => p.id === id);
    if (!producto) {
        return;
    }

    const enCarrito = carrito.find(item => item.id === id);
    if (enCarrito) {
        enCarrito.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    refrescarCarrito();
    notificar(`Se agrego "${producto.nombre}" al pedido`);
}

function cambiarCantidad(id, delta) {
    const item = carrito.find(it => it.id === id);
    if (!item) {
        return;
    }

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        carrito = carrito.filter(it => it.id !== id);
    }

    guardarCarrito(carrito);
    refrescarCarrito();
}

function eliminarDelCarrito(id) {
    const item = carrito.find(it => it.id === id);
    carrito = carrito.filter(it => it.id !== id);
    guardarCarrito(carrito);
    refrescarCarrito();
    if (item) {
        notificar(`Se elimino "${item.nombre}" del pedido`, "info");
    }
}

async function vaciarCarrito() {
    if (carrito.length === 0) {
        notificar("El carrito ya esta vacio", "info");
        return;
    }

    const resultado = await confirmarAccion({
        titulo: "Vaciar carrito",
        texto: "Se quitaran todos los productos de tu pedido.",
        confirmar: "Si, vaciar",
        icono: "warning"
    });

    if (!resultado.isConfirmed) {
        return;
    }

    carrito = [];
    guardarCarrito(carrito);
    refrescarCarrito();
    notificar("Carrito vaciado", "info");
}


// --- Confirmacion de la compra (cierre del circuito) ---

async function confirmarCompra() {
    if (carrito.length === 0) {
        notificar("Tu pedido esta vacio. Agrega productos primero.", "warning");
        return;
    }

    if (!cliente.nombre || !cliente.email) {
        notificar("Completa y guarda tus datos antes de confirmar.", "warning");
        mostrarErrorCliente("Necesitamos tu nombre y correo para confirmar la compra.");
        dom.inputNombre.focus();
        return;
    }

    const totales = calcularTotales();
    const cantidadItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);

    const resultado = await confirmarAccion({
        titulo: "Confirmar compra",
        html: `Vas a pagar <strong>${formatearPrecio(totales.total)}</strong> por ${cantidadItems} producto(s).`,
        confirmar: "Comprar",
        cancelar: "Seguir comprando",
        icono: "question"
    });

    if (!resultado.isConfirmed) {
        return;
    }

    const pedido = {
        numero: generarNumeroPedido(),
        fecha: new Date().toISOString(),
        nombre: cliente.nombre,
        email: cliente.email,
        modalidad: cliente.modalidad,
        items: carrito.map(item => ({ ...item })),
        subtotal: totales.subtotal,
        recargo: totales.recargo,
        descuento: totales.descuento,
        total: totales.total
    };

    // Registra la compra en el historial (webstorage).
    historial.push(pedido);
    guardarHistorial(historial);

    // Simula el fin del proceso: vacia el carrito y lo elimina del storage.
    carrito = [];
    limpiarCarritoStorage();
    refrescarCarrito();

    pintarHistorial(historial);
    pintarConfirmacion(pedido);

    await modalAgradecimiento({
        titulo: `Gracias ${cliente.nombre}!`,
        html: `Tu pedido <strong>${pedido.numero}</strong> fue registrado.<br>Total pagado: <strong>${formatearPrecio(pedido.total)}</strong>`,
        confirmar: "Listo"
    });
}

function iniciarNuevoPedido() {
    ocultarConfirmacion();
    terminoBusqueda = "";
    dom.inputBusqueda.value = "";
    categoriaActiva = "todas";
    pintarFiltros(categorias, categoriaActiva);
    pintarCatalogo(obtenerProductosVisibles(), etiquetasCategoria);
    document.getElementById("seccion-menu").scrollIntoView({ behavior: "smooth", block: "start" });
    notificar("Listo para un nuevo pedido", "info");
}


// --- Historial ---

async function limpiarHistorial() {
    if (historial.length === 0) {
        notificar("Tu historial ya esta vacio", "info");
        return;
    }

    const resultado = await confirmarAccion({
        titulo: "Limpiar historial",
        texto: "Se borraran todos los pedidos registrados.",
        confirmar: "Si, borrar",
        icono: "warning"
    });

    if (!resultado.isConfirmed) {
        return;
    }

    historial = [];
    limpiarHistorialStorage();
    pintarHistorial(historial);
    notificar("Historial borrado", "info");
}


// --- Registro de eventos ---

function registrarEventos() {
    // Formulario del cliente
    dom.formCliente.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = dom.inputNombre.value.trim();
        const email = dom.inputEmail.value.trim();

        if (!nombre) {
            mostrarErrorCliente("Por favor ingresa tu nombre y apellido.");
            dom.inputNombre.focus();
            return;
        }

        if (!emailValido(email)) {
            mostrarErrorCliente("Ingresa un correo electronico valido (ej: nombre@correo.cl).");
            dom.inputEmail.focus();
            return;
        }

        const modalidad = document.querySelector('input[name="modalidad"]:checked').value;
        cliente = { nombre, email, modalidad };
        guardarCliente(cliente);

        pintarFormularioCliente(cliente);
        refrescarCarrito();
        notificar(`Datos guardados. Hola ${nombre}!`);
    });

    // Pre-cargar datos de ejemplo
    dom.botonEjemplo.addEventListener("click", () => {
        dom.inputNombre.value = CLIENTE_EJEMPLO.nombre;
        dom.inputEmail.value = CLIENTE_EJEMPLO.email;
        const radio = document.querySelector(`input[name="modalidad"][value="${CLIENTE_EJEMPLO.modalidad}"]`);
        if (radio) {
            radio.checked = true;
        }
        notificar("Datos de ejemplo cargados. Recuerda guardarlos.", "info");
    });

    // Cambio de modalidad de entrega
    document.querySelectorAll('input[name="modalidad"]').forEach(radio => {
        radio.addEventListener("change", (evento) => {
            cliente.modalidad = evento.target.value;
            guardarCliente(cliente);
            refrescarCarrito();
        });
    });

    // Busqueda por nombre
    dom.inputBusqueda.addEventListener("input", (evento) => {
        terminoBusqueda = evento.target.value;
        pintarCatalogo(obtenerProductosVisibles(), etiquetasCategoria);
    });

    // Filtros de categoria (delegacion de eventos)
    dom.filtros.addEventListener("click", (evento) => {
        const boton = evento.target.closest("[data-categoria]");
        if (!boton) {
            return;
        }
        categoriaActiva = boton.dataset.categoria;
        pintarFiltros(categorias, categoriaActiva);
        pintarCatalogo(obtenerProductosVisibles(), etiquetasCategoria);
    });

    // Agregar productos desde el catalogo (delegacion de eventos)
    dom.grillaMenu.addEventListener("click", (evento) => {
        const boton = evento.target.closest("[data-accion]");
        if (!boton) {
            return;
        }
        if (boton.dataset.accion === "agregar") {
            agregarAlCarrito(boton.dataset.id);
        }
    });

    // Controles del carrito (delegacion de eventos)
    dom.listaCarrito.addEventListener("click", (evento) => {
        const boton = evento.target.closest("[data-accion]");
        if (!boton) {
            return;
        }
        const id = boton.dataset.id;
        const accion = boton.dataset.accion;

        if (accion === "sumar") {
            cambiarCantidad(id, 1);
        } else if (accion === "restar") {
            cambiarCantidad(id, -1);
        } else if (accion === "eliminar") {
            eliminarDelCarrito(id);
        }
    });

    // Botones principales
    dom.botonVaciar.addEventListener("click", vaciarCarrito);
    dom.botonConfirmar.addEventListener("click", confirmarCompra);
    dom.botonNuevoPedido.addEventListener("click", iniciarNuevoPedido);
    dom.botonLimpiarHistorial.addEventListener("click", limpiarHistorial);
}


// --- Inicializacion ---

async function iniciar() {
    registrarEventos();
    mostrarCargandoCatalogo();

    try {
        const data = await obtenerCatalogo();

        catalogo = data.productos;
        categorias = data.categorias;
        etiquetasCategoria = categorias.reduce((mapa, categoria) => {
            mapa[categoria.clave] = categoria.etiqueta;
            return mapa;
        }, {});

        // Recupera el estado guardado en el navegador.
        cliente = leerCliente();
        carrito = leerCarrito();
        historial = leerHistorial();

        // Pinta toda la interfaz a partir de los datos cargados.
        pintarFormularioCliente(cliente);
        pintarFiltros(categorias, categoriaActiva);
        pintarCatalogo(obtenerProductosVisibles(), etiquetasCategoria);
        refrescarCarrito();
        pintarHistorial(historial);

        if (cliente.nombre || carrito.length > 0) {
            notificar("Recuperamos tu pedido anterior", "info");
        }
    } catch (error) {
        // Se muestra un mensaje amable (estilo UX), sin exponer detalles tecnicos.
        mostrarErrorCatalogo(error.message);
        modalError("No pudimos cargar la carta. Si abriste el archivo directamente, prueba con un servidor local (Live Server).");
    } finally {
        // Habilita la accion de confirmar solo cuando la carga termina.
        dom.botonConfirmar.disabled = false;
    }
}

iniciar();
