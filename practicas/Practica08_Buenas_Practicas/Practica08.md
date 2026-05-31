# Práctica 08 - Buenas prácticas en el manejo de objetos

Curso: JavaScript - CoderHouse  |  Unidad: Buenas prácticas  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se ejercitan buenas prácticas para trabajar con objetos en JavaScript, poniendo el foco en la inmutabilidad superficial, el nombrado claro de propiedades, la validación de la existencia de propiedades y la prevención de efectos secundarios. La idea central es que las funciones no muten los datos que reciben, sino que devuelvan nuevos objetos a partir de ellos. Esto hace que el código sea más predecible y fácil de depurar, porque un objeto que se pasa a una función conserva su estado original después de la llamada.

## Conceptos aplicados

- Inmutabilidad superficial usando el operador spread (`...`) para copiar objetos.
- Devolución de nuevos objetos en lugar de mutar los parámetros recibidos.
- Nombrado claro y consistente de propiedades en camelCase.
- Validación de propiedades con el operador `in` antes de usarlas.
- Manejo de un valor por defecto ("Precio no disponible") cuando falta una propiedad.
- Comprobación en consola de que el objeto original no se altera.

## Código

### buenasPracticas.js

```js
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
```

## Salida en consola

```
=== Inmutabilidad superficial ===
Original: { nombre: 'Ana', edad: 30 }
Copia con edad+1: { nombre: 'Ana', edad: 31 }
El original se mantuvo intacto: true

=== Nombrado claro (camelCase) ===
{
  nombreCompleto: 'Miguel Cornejo',
  correoElectronico: 'miguel.cornejo@correo.cl',
  fechaNacimiento: '1990-05-30',
  estaActivo: true
}

=== Validación de propiedades ===
Café latte: $3200
Promoción sorpresa: Precio no disponible

=== Evitar efectos secundarios ===
Producto original tras la validación: { nombre: 'Café latte', precio: 3200 }
La función no agregó ni cambió propiedades del producto.
```

## Explicación paso a paso

- `cumplirAnios(usuario)` arma un objeto nuevo con el operador spread `...usuario`, que copia todas las propiedades del usuario recibido, y luego sobrescribe `edad` con `usuario.edad + 1`. Como el resultado es un objeto distinto, el original nunca cambia.
- En la demostración se crea `usuarioOriginal` con edad 30 y se obtiene `usuarioActualizado` con edad 31. La comparación `usuarioOriginal.edad === 30` devuelve `true`, lo que confirma que el objeto de entrada se mantuvo intacto.
- `mostrarPerfil()` retorna un objeto con propiedades en camelCase (`nombreCompleto`, `correoElectronico`, `fechaNacimiento`, `estaActivo`). Los nombres describen con claridad lo que guardan y siguen una misma convención.
- `describirPrecio(producto)` usa `"precio" in producto` para preguntar si la propiedad existe antes de mostrarla. Con `productoConPrecio` muestra el valor; con `productoSinPrecio` devuelve "Precio no disponible", evitando mostrar `undefined`.
- El último bloque imprime nuevamente `productoConPrecio` para evidenciar que la función de validación solo leyó datos y no produjo efectos secundarios sobre el objeto.

## Reflexión

Al hacer esta práctica me quedó claro por qué conviene tratar a los objetos como datos que no se deben mutar a la ligera. Cuando una función devuelve una copia en vez de modificar lo que recibe, el resto del programa puede confiar en que sus datos siguen igual, y eso evita errores difíciles de rastrear donde un valor cambia "solo" porque otra parte del código lo tocó. El operador spread me pareció una herramienta simple y muy útil para lograr esa copia rápida.

También valoro la validación con `in` y el nombrado consistente en camelCase, porque son detalles que en proyectos reales hacen la diferencia entre un código que cualquiera entiende y uno que hay que adivinar. En desarrollo web, donde manejo objetos que vienen de formularios, de localStorage o de una API, aplicar estas buenas prácticas me va a ayudar a escribir funciones más confiables y a que el estado de mi aplicación sea más fácil de seguir.
