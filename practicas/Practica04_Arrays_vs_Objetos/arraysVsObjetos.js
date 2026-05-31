// Práctica 04 - Diferencias entre arrays y objetos
// Demuestra cómo se accede y se modifica la información en cada estructura,
// y cómo se combinan ambas ideas en un array de objetos.

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

// 4. Array de objetos: combina ambas estructuras. Cada elemento es un objeto
//    con propiedades nombradas y, a la vez, queda en una posición del array.
const usuarios = [
    { nombre: "Ana", edad: 28, ciudad: "Santiago" },
    { nombre: "Luis", edad: 34, ciudad: "Valparaíso" },
    { nombre: "María", edad: 25, ciudad: "Concepción" }
];

// Acceso combinando notación de corchetes (posición) y de punto (propiedad).
console.log("Nombre del primer usuario:", usuarios[0].nombre);
console.log("Ciudad del segundo usuario:", usuarios[1]["ciudad"]);

// 5. Recorrer el array de objetos con forEach para mostrarlos a todos.
console.log("Listado completo de usuarios:");
usuarios.forEach((usuario, indice) => {
    console.log(`  ${indice + 1}. ${usuario.nombre} (${usuario.edad} años) - ${usuario.ciudad}`);
});

// 6. Transformar con map: obtener solo los nombres.
const nombres = usuarios.map((usuario) => usuario.nombre);
console.log("Nombres extraídos con map:", nombres);

// 7. Filtrar con filter: usuarios menores de 30 años.
const menoresDe30 = usuarios.filter((usuario) => usuario.edad < 30);
console.log("Usuarios menores de 30 (filter):", menoresDe30);
