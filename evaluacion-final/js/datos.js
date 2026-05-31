// =============================================
// Cafe Aurora - Simulador de Pedidos (Entrega Final)
// datos.js -> constantes, acceso a datos (fetch) y persistencia
// =============================================

// --- Constantes de negocio (heredadas de las pre-entregas) ---

const NOMBRE_CAFETERIA = "Cafe Aurora";
const RECARGO_PARA_LLEVAR = 200;
const DESCUENTO_PORCENTAJE = 10;
const MONTO_MINIMO_DESCUENTO = 5000;

// Ruta de la "base de datos" simulada en formato JSON.
const RUTA_PRODUCTOS = "data/productos.json";

// --- Claves de almacenamiento en localStorage ---

const STORAGE_CLIENTE = "cafeAurora_cliente";
const STORAGE_CARRITO = "cafeAurora_carrito";
const STORAGE_HISTORIAL = "cafeAurora_historial";

// Datos de ejemplo para pre-cargar el formulario (evita escritura manual).
const CLIENTE_EJEMPLO = { nombre: "Camila Rojas", email: "camila@correo.cl", modalidad: "local" };


// --- Formato de moneda y fecha en variante chilena ---

const formatoMoneda = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
});

const formatoFecha = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "short",
    timeStyle: "short"
});

function formatearPrecio(monto) {
    return formatoMoneda.format(monto);
}

function formatearFecha(fechaISO) {
    return formatoFecha.format(new Date(fechaISO));
}


// --- Acceso a datos: carga del catalogo desde el JSON via fetch ---

async function obtenerCatalogo() {
    const respuesta = await fetch(RUTA_PRODUCTOS);

    if (!respuesta.ok) {
        throw new Error(`No se pudo leer el catalogo (codigo ${respuesta.status}).`);
    }

    const data = await respuesta.json();

    if (!data || !Array.isArray(data.productos) || data.productos.length === 0) {
        throw new Error("El catalogo esta vacio o tiene un formato invalido.");
    }

    return {
        productos: data.productos,
        categorias: Array.isArray(data.categorias) ? data.categorias : []
    };
}


// --- Persistencia del cliente ---

function guardarCliente(cliente) {
    localStorage.setItem(STORAGE_CLIENTE, JSON.stringify(cliente));
}

function leerCliente() {
    const guardado = localStorage.getItem(STORAGE_CLIENTE);
    if (!guardado) {
        return { nombre: "", email: "", modalidad: "local" };
    }
    try {
        const parsed = JSON.parse(guardado);
        return {
            nombre: typeof parsed.nombre === "string" ? parsed.nombre : "",
            email: typeof parsed.email === "string" ? parsed.email : "",
            modalidad: parsed.modalidad === "llevar" ? "llevar" : "local"
        };
    } catch (error) {
        return { nombre: "", email: "", modalidad: "local" };
    }
}


// --- Persistencia del carrito ---

function guardarCarrito(carrito) {
    localStorage.setItem(STORAGE_CARRITO, JSON.stringify(carrito));
}

function leerCarrito() {
    const guardado = localStorage.getItem(STORAGE_CARRITO);
    if (!guardado) {
        return [];
    }
    try {
        const parsed = JSON.parse(guardado);
        if (!Array.isArray(parsed)) {
            return [];
        }
        // Conserva solo los items con la forma esperada.
        return parsed.filter(item =>
            item &&
            typeof item.id === "string" &&
            typeof item.precio === "number" &&
            typeof item.cantidad === "number" &&
            item.cantidad > 0
        );
    } catch (error) {
        return [];
    }
}


// --- Persistencia del historial de compras ---

function guardarHistorial(historial) {
    localStorage.setItem(STORAGE_HISTORIAL, JSON.stringify(historial));
}

function leerHistorial() {
    const guardado = localStorage.getItem(STORAGE_HISTORIAL);
    if (!guardado) {
        return [];
    }
    try {
        const parsed = JSON.parse(guardado);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}


// --- Limpieza de almacenamiento ---

function limpiarCarritoStorage() {
    localStorage.removeItem(STORAGE_CARRITO);
}

function limpiarHistorialStorage() {
    localStorage.removeItem(STORAGE_HISTORIAL);
}
