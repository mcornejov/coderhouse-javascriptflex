// Práctica 07 - Ordenar arrays de objetos con sort y localeCompare
// Catálogo base de productos de la cafetería Café Aurora.
const productos = [
    { nombre: "Café latte", precio: 3200 },
    { nombre: "Espresso", precio: 2500 },
    { nombre: "Brownie", precio: 1800 },
    { nombre: "Capuchino", precio: 3000 },
    { nombre: "Agua mineral", precio: 1500 }
];

// Copia con spread para no mutar el array original al ordenar por precio.
const productosPorPrecio = [...productos];
productosPorPrecio.sort((a, b) => a.precio - b.precio);

// Otra copia independiente para el orden alfabético por nombre.
const productosPorNombre = [...productos];
productosPorNombre.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

// Función auxiliar para imprimir cada lista con un formato legible.
function imprimirProductos(titulo, lista) {
    console.log(titulo);
    lista.forEach((producto) => {
        console.log(`  - ${producto.nombre}: $${producto.precio}`);
    });
    console.log("");
}

imprimirProductos("Productos ordenados de menor a mayor precio:", productosPorPrecio);
imprimirProductos("Productos ordenados alfabéticamente por nombre:", productosPorNombre);
imprimirProductos("Array original sin modificar (orden de carga):", productos);
