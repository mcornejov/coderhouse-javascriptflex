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
