// Práctica 05 - Arrays que contienen objetos y console.table
// Unidad: Arrays de objetos

// Array de usuarios: cada elemento es un objeto con nombre, edad y email
const usuarios = [
    { nombre: "Valentina Rojas", edad: 28, email: "valentina.rojas@correo.cl" },
    { nombre: "Matías Fuentes", edad: 34, email: "matias.fuentes@correo.cl" },
    { nombre: "Camila Soto", edad: 22, email: "camila.soto@correo.cl" }
];

// Acceder y mostrar el nombre del segundo usuario (índice 1)
console.log("Nombre del segundo usuario:", usuarios[1].nombre);

// Modificar la edad del primer usuario
usuarios[0].edad = 30;

// Agregar una nueva propiedad "activo" al primer usuario
usuarios[0].activo = true;

console.log("Primer usuario actualizado:", usuarios[0]);

// Mostrar el array completo en formato de tabla
console.table(usuarios);
