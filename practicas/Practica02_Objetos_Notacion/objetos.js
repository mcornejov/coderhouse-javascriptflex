// Práctica 02 - Objetos literales: notación de punto y de corchetes
// Curso JavaScript - CoderHouse | Alumno: Miguel Cornejo

// Se crea un objeto literal con dos propiedades iniciales.
const usuario = {
    nombre: "Miguel",
    edad: 30
};

// Acceso con notación de punto: ideal cuando se conoce el nombre exacto de la propiedad.
console.log("Nombre (notación de punto):", usuario.nombre);

// Acceso con notación de corchetes: la propiedad va como texto entre comillas.
console.log("Edad (notación de corchetes):", usuario["edad"]);

// Se agrega una nueva propiedad usando notación de punto.
usuario.email = "miguel.cornejo@correo.cl";
console.log("Email agregado:", usuario.email);

// Se modifica el valor de una propiedad existente.
usuario.edad = 31;
console.log("Edad modificada:", usuario.edad);

// Acceso a una propiedad que no existe: JavaScript devuelve undefined sin lanzar error.
console.log("Dirección (no existe):", usuario.direccion);

// La notación de corchetes permite usar una variable cuyo valor es el nombre de la propiedad.
const propiedad = "email";
console.log("Acceso dinámico con variable:", usuario[propiedad]);

// Estado final del objeto después de todos los cambios.
console.log("Objeto final:", usuario);
