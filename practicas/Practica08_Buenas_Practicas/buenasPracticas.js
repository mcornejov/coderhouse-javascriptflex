// Práctica 08 - Buenas prácticas en el manejo de objetos
// Demuestra inmutabilidad superficial, nombrado claro, validación de
// propiedades y ausencia de efectos secundarios al trabajar con objetos.

// Inmutabilidad superficial: recibe un usuario y devuelve una copia
// con la edad incrementada en 1, sin modificar el objeto original.
function cumplirAnios(usuario) {
    return {
        ...usuario,
        edad: usuario.edad + 1
    };
}

// Validación de propiedades: muestra el precio solo si la propiedad
// existe en el objeto producto; en caso contrario informa la ausencia.
function describirPrecio(producto) {
    if ("precio" in producto) {
        return `${producto.nombre}: $${producto.precio}`;
    }
    return `${producto.nombre}: Precio no disponible`;
}

// Nombrado claro: objeto con propiedades descriptivas y consistentes
// en camelCase. Sirve para evidenciar un estilo de nombrado prolijo.
function mostrarPerfil() {
    const perfilUsuario = {
        nombreCompleto: "Miguel Cornejo",
        correoElectronico: "miguel.cornejo@correo.cl",
        fechaNacimiento: "1990-05-30",
        estaActivo: true
    };
    return perfilUsuario;
}

// --- Demostración en consola ---

console.log("=== Inmutabilidad superficial ===");
const usuarioOriginal = { nombre: "Ana", edad: 30 };
const usuarioActualizado = cumplirAnios(usuarioOriginal);
console.log("Original:", usuarioOriginal);
console.log("Copia con edad+1:", usuarioActualizado);
console.log("El original se mantuvo intacto:", usuarioOriginal.edad === 30);

console.log("\n=== Nombrado claro (camelCase) ===");
console.log(mostrarPerfil());

console.log("\n=== Validación de propiedades ===");
const productoConPrecio = { nombre: "Café latte", precio: 3200 };
const productoSinPrecio = { nombre: "Promoción sorpresa" };
console.log(describirPrecio(productoConPrecio));
console.log(describirPrecio(productoSinPrecio));

console.log("\n=== Evitar efectos secundarios ===");
console.log("Producto original tras la validación:", productoConPrecio);
console.log("La función no agregó ni cambió propiedades del producto.");
