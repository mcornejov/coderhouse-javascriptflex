# Práctica 07 - Ordenar arrays de objetos con sort y localeCompare

Curso: JavaScript - CoderHouse  |  Unidad: Ordenamiento de arrays (sort)  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se ejercita el ordenamiento de arrays de objetos en JavaScript usando el método `sort` junto con una función de comparación. Se ordena un catálogo de productos por precio (numérico, de menor a mayor) y por nombre (alfabético, con `localeCompare` para respetar las reglas del idioma español). Además se practica una idea clave: `sort` modifica el array sobre el que se aplica, por lo que se crea una copia con el operador spread `[...]` antes de ordenar, para conservar intacto el array original. Esto es útil en cualquier interfaz donde el usuario puede reordenar una lista sin perder el orden de carga inicial.

## Conceptos aplicados

- Array de objetos con propiedades `nombre` (string) y `precio` (number).
- Método `Array.prototype.sort` con función de comparación `(a, b) => ...`.
- Comparación numérica restando los precios (`a.precio - b.precio`).
- Comparación de strings con `localeCompare` y la configuración regional `"es"`.
- Operador spread `[...]` para clonar el array y evitar mutar el original.
- Inmutabilidad: verificar que el array original no cambió tras ordenar las copias.
- Función auxiliar reutilizable e impresión en consola con `forEach`.

## Código

### ordenar.js

```js
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
```

## Salida en consola

```
Productos ordenados de menor a mayor precio:
  - Agua mineral: $1500
  - Brownie: $1800
  - Espresso: $2500
  - Capuchino: $3000
  - Café latte: $3200

Productos ordenados alfabéticamente por nombre:
  - Agua mineral: $1500
  - Brownie: $1800
  - Café latte: $3200
  - Capuchino: $3000
  - Espresso: $2500

Array original sin modificar (orden de carga):
  - Café latte: $3200
  - Espresso: $2500
  - Brownie: $1800
  - Capuchino: $3000
  - Agua mineral: $1500

```

## Explicación paso a paso

1. Se define el array `productos`, donde cada elemento es un objeto con `nombre` (texto) y `precio` (número). Este es el catálogo base en su orden de carga.
2. Se crea `productosPorPrecio` con `[...productos]`. El spread copia los elementos a un array nuevo, de modo que ordenar esta copia no afecta a `productos`.
3. Sobre esa copia se aplica `sort((a, b) => a.precio - b.precio)`. Cuando el resultado de la resta es negativo, `a` queda antes que `b`; si es positivo, después; si es cero, mantienen su posición relativa. Así se logra el orden de menor a mayor precio.
4. Se crea otra copia independiente, `productosPorNombre`, también con spread, para no interferir con el orden por precio ni con el original.
5. Esa copia se ordena con `localeCompare`: `a.nombre.localeCompare(b.nombre, "es")` compara dos textos según las reglas del español y devuelve un número negativo, cero o positivo, justo el valor que `sort` necesita. Usar la configuración regional ayuda con acentos y caracteres propios del idioma.
6. La función `imprimirProductos` recibe un título y una lista, y recorre la lista con `forEach` mostrando cada producto. Centraliza el formato de impresión para no repetir código.
7. Finalmente se imprimen las dos listas ordenadas y el array `productos`. La última impresión confirma que el original conserva su orden de carga, demostrando que las copias evitaron la mutación.

## Reflexión

Lo que más me sirvió de esta práctica fue entender que `sort` ordena en el lugar y modifica el array original, algo que es fácil pasar por alto y que puede provocar errores silenciosos. Hacer la copia con spread antes de ordenar me dio una forma limpia de mantener separados los datos originales de las distintas vistas ordenadas, que es exactamente lo que se necesita en una interfaz real cuando el usuario puede ordenar una tabla por precio o por nombre sin perder el orden con que llegaron los datos.

También valoro haber usado `localeCompare` en lugar de comparar strings con operadores simples, porque respeta las reglas del idioma y entrega un orden alfabético correcto para textos en español. En desarrollo web esto se aplica directamente a catálogos de productos, listados de usuarios o resultados de búsqueda, donde ordenar bien la información mejora mucho la experiencia de quien usa la aplicación.
