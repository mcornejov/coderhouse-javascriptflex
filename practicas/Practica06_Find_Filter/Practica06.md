# Práctica 06 - Buscar y filtrar con find y filter

Curso: JavaScript - CoderHouse  |  Unidad: find / filter  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se ejercita el uso de los métodos de arrays `find` y `filter` para buscar y seleccionar elementos a partir de una condición. Trabajando sobre un listado de estudiantes, se busca el primer estudiante aprobado con `find` y se obtiene la lista completa de estudiantes no aprobados con `filter`. El propósito es entender la diferencia clave entre ambos métodos: `find` devuelve un único elemento (el primero que cumple), mientras que `filter` devuelve un nuevo array con todos los que cumplen. Estas herramientas son fundamentales para consultar colecciones de datos sin recurrir a ciclos manuales.

## Conceptos aplicados

- Declaración de un array de objetos con `const`.
- Estructura de objetos con propiedades `id`, `nombre` y `aprobado` (boolean).
- Método `find` para localizar el primer elemento que cumple una condición.
- Método `filter` para obtener todos los elementos que cumplen una condición.
- Funciones callback como argumento de los métodos de array.
- Comparación estricta con `===`.
- Impresión de resultados en consola con `console.log`.

## Código

### buscarFiltrar.js

```js
// Práctica 06 - Buscar y filtrar con find y filter
// Listado de estudiantes con su estado de aprobación.

const estudiantes = [
    { id: 1, nombre: "Camila Rojas", aprobado: false },
    { id: 2, nombre: "Benjamín Soto", aprobado: true },
    { id: 3, nombre: "Valentina Díaz", aprobado: false },
    { id: 4, nombre: "Matías Fuentes", aprobado: true },
    { id: 5, nombre: "Antonia Vega", aprobado: false }
];

// find devuelve el primer elemento que cumple la condición (o undefined si no hay).
const primerAprobado = estudiantes.find(function (estudiante) {
    return estudiante.aprobado === true;
});

// filter devuelve un nuevo array con todos los elementos que cumplen la condición.
const noAprobados = estudiantes.filter(function (estudiante) {
    return estudiante.aprobado === false;
});

console.log("Primer estudiante aprobado:");
console.log(primerAprobado);

console.log("\nEstudiantes no aprobados:");
console.log(noAprobados);
```

## Salida en consola

```
Primer estudiante aprobado:
{ id: 2, nombre: 'Benjamín Soto', aprobado: true }

Estudiantes no aprobados:
[
  { id: 1, nombre: 'Camila Rojas', aprobado: false },
  { id: 3, nombre: 'Valentina Díaz', aprobado: false },
  { id: 5, nombre: 'Antonia Vega', aprobado: false }
]
```

## Explicación paso a paso

1. Se declara el array `estudiantes` con cinco objetos, cada uno con las propiedades `id` (número), `nombre` (texto) y `aprobado` (valor booleano).
2. Con `estudiantes.find(...)` se recorre el array y se devuelve el primer objeto cuya propiedad `aprobado` es `true`. En este caso, el recorrido pasa por "Camila Rojas" pero su valor es `false`, y se detiene en "Benjamín Soto", que es el primer aprobado.
3. Con `estudiantes.filter(...)` se recorre todo el array y se construye un nuevo array que incluye únicamente los objetos cuya propiedad `aprobado` es `false`. El resultado son tres estudiantes no aprobados.
4. Finalmente, los `console.log` imprimen primero el único objeto encontrado por `find` y luego el array completo devuelto por `filter`. El carácter `\n` agrega una línea en blanco para separar visualmente ambos bloques.

## Reflexión

Al resolver esta práctica me quedó clara la diferencia práctica entre `find` y `filter`, que al principio suelen confundirse porque ambos reciben una función con una condición. Entendí que cuando solo necesito un dato puntual conviene `find`, ya que detiene el recorrido apenas encuentra una coincidencia y entrega el objeto directo; en cambio, cuando necesito un subconjunto completo uso `filter`, que siempre devuelve un array nuevo sin alterar el original.

Pienso que esto es muy útil en desarrollo web real, donde constantemente trabajo con listas de datos que vienen de un formulario o de una API: por ejemplo, buscar el usuario que coincide con un id para mostrar su perfil, o filtrar todos los productos disponibles para armar un catálogo. Resolver estas consultas con métodos declarativos hace el código más legible y corto que escribir ciclos manuales, y reduce la posibilidad de errores al manejar los índices.
