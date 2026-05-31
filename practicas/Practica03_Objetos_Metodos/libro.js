// Práctica 03 - Objetos: modificar, eliminar propiedades y métodos con this
// Alumno: Miguel Cornejo

// Creamos un objeto libro con sus propiedades iniciales
const libro = {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    anio: 1967
};

// Notación de punto para imprimir el título
console.log("Título (notación de punto):", libro.titulo);

// Notación de corchetes para imprimir el autor
console.log("Autor (notación de corchetes):", libro["autor"]);

// Agregamos una nueva propiedad al objeto
libro.genero = "Realismo mágico";
console.log("Género agregado:", libro.genero);

// Cambiamos el valor de una propiedad existente
libro.anio = 1982;
console.log("Año modificado:", libro.anio);

// Eliminamos la propiedad genero
delete libro.genero;
console.log("Género luego de eliminar:", libro.genero);

// Agregamos un método que usa this para acceder a las propiedades del objeto
libro.descripcion = function () {
    console.log("El libro " + this.titulo + " fue escrito por " + this.autor + ".");
};

// Llamamos al método descripcion
libro.descripcion();
