# Práctica 03 - Objetos: modificar, eliminar propiedades y métodos con this

Curso: JavaScript - CoderHouse  |  Unidad: Objetos - métodos  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se trabaja con objetos en JavaScript: cómo crearlos, leer sus propiedades con las dos notaciones disponibles (punto y corchetes), agregar nuevas propiedades, modificar valores existentes y eliminar propiedades con el operador `delete`. Además se incorpora un método dentro del objeto que utiliza la palabra clave `this` para acceder a las propiedades del propio objeto. Dominar estas operaciones es la base para representar entidades del mundo real (un libro, un cliente, un producto) y manipular su estado de forma ordenada, algo que se usa constantemente en cualquier aplicación web.

## Conceptos aplicados

- Creación de un objeto literal con propiedades de distintos tipos (string y number).
- Acceso a propiedades con notación de punto (`libro.titulo`).
- Acceso a propiedades con notación de corchetes (`libro["autor"]`).
- Agregar una propiedad nueva a un objeto ya creado.
- Modificar el valor de una propiedad existente.
- Eliminar una propiedad con el operador `delete`.
- Definir un método dentro de un objeto.
- Uso de `this` para referirse a las propiedades del propio objeto.
- Invocación de un método del objeto.

## Código

### libro.js

```js
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
```

## Salida en consola

```
Título (notación de punto): Cien años de soledad
Autor (notación de corchetes): Gabriel García Márquez
Género agregado: Realismo mágico
Año modificado: 1982
Género luego de eliminar: undefined
El libro Cien años de soledad fue escrito por Gabriel García Márquez.
```

## Explicación paso a paso

1. Se declara el objeto `libro` con tres propiedades: `titulo` y `autor` como cadenas de texto, y `anio` como número.
2. Se imprime el título usando notación de punto (`libro.titulo`), que es la forma más directa y legible de acceder a una propiedad cuyo nombre se conoce de antemano.
3. Se imprime el autor usando notación de corchetes (`libro["autor"]`). Esta notación entrega el mismo resultado, pero es útil cuando el nombre de la propiedad llega como texto o como variable.
4. Se agrega la propiedad `genero` asignándole un valor; al no existir previamente, JavaScript la crea dentro del objeto.
5. Se reasigna `libro.anio` con un nuevo valor. Como la propiedad ya existía, su valor anterior se reemplaza.
6. Se elimina la propiedad `genero` con `delete`. Al intentar leerla después, el objeto ya no la contiene y devuelve `undefined`.
7. Se agrega un método `descripcion`: una función guardada como propiedad del objeto. Dentro de ella, `this` apunta al propio `libro`, lo que permite leer `this.titulo` y `this.autor`.
8. Finalmente se invoca el método con `libro.descripcion()`, que arma e imprime la frase con los datos actuales del objeto.

## Reflexión

Trabajar con objetos me ayudó a entender que la mayoría de la información en una aplicación no son datos sueltos, sino entidades que agrupan propiedades relacionadas entre sí. Poder agregar, modificar y eliminar propiedades de forma dinámica es justo lo que pasa cuando un usuario edita su perfil, cuando se actualiza el stock de un producto o cuando se limpia un dato que ya no se necesita.

Lo que más me sirvió fue ver `this` en acción dentro de un método, porque conecta directamente con cómo se modela el comportamiento de un objeto en proyectos reales: el objeto no solo guarda datos, sino que también sabe hacer cosas con ellos. En desarrollo web esto se traduce en componentes y módulos que mantienen su propio estado y exponen métodos para operar sobre él, una idea que voy a seguir aplicando en las siguientes entregas del simulador.
