# Práctica 01 - Crear y mutar arrays: push, pop, unshift, splice

Curso: JavaScript - CoderHouse  |  Unidad: Arrays - mutación  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se trabaja con la creación y la mutación de arrays en JavaScript utilizando los métodos que modifican el array original: `push`, `pop`, `unshift` y `splice`. La idea es entender de manera concreta cómo cada operación cambia el contenido y la longitud del array, observando el estado del mismo después de cada paso. Dominar estos métodos es fundamental porque las listas de datos (tareas, productos, usuarios, etc.) son una de las estructuras más usadas en cualquier aplicación, y saber agregar, quitar y reemplazar elementos es la base para construir funcionalidades dinámicas.

## Conceptos aplicados

- Declaración de un array mediante literal de array (`[ ]`).
- Uso de `console.log` para inspeccionar el estado del array en cada paso.
- `push`: agrega uno o más elementos al final del array.
- `pop`: elimina el último elemento y devuelve el valor eliminado.
- `unshift`: agrega uno o más elementos al inicio del array.
- `splice`: elimina e inserta elementos en una posición específica.
- Métodos mutadores (modifican el array original) frente a la idea de inmutabilidad.
- Guardado del valor retornado por un método en una variable.

## Código

### manipularArrays.js

```js
// Práctica 01 - Crear y mutar arrays: push, pop, unshift, splice
// El objetivo es observar cómo cada método modifica el array original.

// 1. Declaración del array con tres tareas iniciales (literal de array).
const tareas = ["Comprar café", "Limpiar la máquina", "Reponer vasos"];
console.log("Array inicial:", tareas);

// 2. push: agrega una nueva tarea al final del array.
tareas.push("Revisar el inventario");
console.log("Después de push:", tareas);

// 3. pop: elimina la última tarea y guarda el valor eliminado.
const tareaEliminada = tareas.pop();
console.log("Tarea eliminada con pop:", tareaEliminada);
console.log("Después de pop:", tareas);

// 4. unshift: agrega una nueva tarea al inicio del array.
tareas.unshift("Abrir el local");
console.log("Después de unshift:", tareas);

// 5. splice: elimina la segunda tarea (índice 1) e inserta una nueva en esa posición.
tareas.splice(1, 1, "Preparar la caja");
console.log("Después de splice:", tareas);
```

## Salida en consola

```
Array inicial: [ 'Comprar café', 'Limpiar la máquina', 'Reponer vasos' ]
Después de push: [
  'Comprar café',
  'Limpiar la máquina',
  'Reponer vasos',
  'Revisar el inventario'
]
Tarea eliminada con pop: Revisar el inventario
Después de pop: [ 'Comprar café', 'Limpiar la máquina', 'Reponer vasos' ]
Después de unshift: [
  'Abrir el local',
  'Comprar café',
  'Limpiar la máquina',
  'Reponer vasos'
]
Después de splice: [
  'Abrir el local',
  'Preparar la caja',
  'Limpiar la máquina',
  'Reponer vasos'
]
```

Nota: cuando un array tiene cuatro o más elementos, Node.js lo imprime con cada elemento en una línea para facilitar la lectura; esa es la razón del formato vertical en algunos pasos.

## Explicación paso a paso

1. **Declaración del array:** se crea `tareas` con un literal de array que contiene tres tareas iniciales. Se usa `const` porque la referencia no cambia; el contenido del array sí puede mutar.
2. **`push("Revisar el inventario")`:** agrega la nueva tarea al final, dejando el array con cuatro elementos.
3. **`pop()`:** elimina el último elemento ("Revisar el inventario") y lo retorna. Ese valor se guarda en la variable `tareaEliminada`, lo que permite reutilizarlo o mostrarlo. El array vuelve a tener tres elementos.
4. **`unshift("Abrir el local")`:** agrega una tarea al inicio del array, desplazando el resto de los elementos hacia la derecha.
5. **`splice(1, 1, "Preparar la caja")`:** comienza en el índice 1, elimina 1 elemento ("Comprar café") y, en su lugar, inserta "Preparar la caja". Así se logra reemplazar la segunda tarea en una sola operación.

Cada `console.log` se ejecuta inmediatamente después de su operación, lo que permite seguir el cambio del array en orden y confirmar que estos métodos modifican el array original en vez de crear copias.

## Reflexión

Al hacer esta práctica me quedó mucho más claro que existen métodos que modifican directamente el array original, algo que es muy cómodo cuando trabajo con listas que van cambiando, como un carrito de compras o una lista de tareas pendientes. Me pareció especialmente útil que `pop` devuelva el valor eliminado, porque en una aplicación real eso me permite, por ejemplo, recuperar el último elemento quitado para confirmarlo o registrarlo antes de descartarlo.

También entendí que `splice` es el más potente de los cuatro, ya que con una sola llamada puedo eliminar e insertar al mismo tiempo en cualquier posición. Llevándolo a desarrollo web real, estas operaciones son la base para actualizar la interfaz cuando el usuario agrega o quita elementos: cada vez que cambio el array de datos, después puedo volver a dibujar la lista en pantalla. Esa relación entre el estado (el array) y lo que se muestra es justamente lo que voy a necesitar más adelante para el simulador del curso.
