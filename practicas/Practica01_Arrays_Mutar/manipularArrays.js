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
