// Práctica 04 - Diferencias entre arrays y objetos
// Demuestra cómo se accede y se modifica la información en cada estructura.

// 1. Array de usuarios: colección ordenada accesible por índice numérico.
const usuariosArray = ["Ana", "Luis", "María"];
console.log("Usuario en el índice 1 del array:", usuariosArray[1]);

// 2. Objeto de usuarios: colección accesible por clave descriptiva.
const usuariosObjeto = {
    usuario1: "Ana",
    usuario2: "Luis",
    usuario3: "María"
};
console.log("Valor de la clave usuario2 del objeto:", usuariosObjeto.usuario2);

// 3. Modificación del array: agregar al final y quitar el primero.
usuariosArray.push("Carlos");
console.log("Array luego de agregar 'Carlos' con push:", usuariosArray);

usuariosArray.shift();
console.log("Array luego de eliminar el primero con shift:", usuariosArray);
