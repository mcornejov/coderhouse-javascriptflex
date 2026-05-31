# Práctica 02 - Objetos literales: notación de punto y de corchetes

Curso: JavaScript - CoderHouse  |  Unidad: Objetos - acceso  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se trabaja el acceso a las propiedades de un objeto literal en JavaScript mediante las dos notaciones disponibles: la notación de punto y la notación de corchetes. La idea es comprender cómo leer, agregar y modificar propiedades, qué ocurre al consultar una propiedad que no existe y cómo la notación de corchetes permite usar una variable para definir dinámicamente a qué propiedad se desea acceder. Dominar estas dos formas de acceso es fundamental porque los objetos son la estructura central para representar entidades del mundo real (un usuario, un producto, un pedido) en cualquier aplicación web.

## Conceptos aplicados

- Creación de un objeto literal con pares clave-valor.
- Tipos de dato en las propiedades: cadena de texto (string) y número (number).
- Acceso de lectura con notación de punto (`objeto.propiedad`).
- Acceso de lectura con notación de corchetes (`objeto["propiedad"]`).
- Agregar una propiedad nueva a un objeto existente.
- Modificar el valor de una propiedad ya definida.
- Comportamiento de JavaScript al consultar una propiedad inexistente (`undefined`).
- Acceso dinámico usando una variable como nombre de propiedad dentro de corchetes.
- Uso de `console.log` para inspeccionar valores y el estado del objeto.

## Código

### objetos.js

```js
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
```

## Salida en consola

```
Nombre (notación de punto): Miguel
Edad (notación de corchetes): 30
Email agregado: miguel.cornejo@correo.cl
Edad modificada: 31
Dirección (no existe): undefined
Acceso dinámico con variable: miguel.cornejo@correo.cl
Objeto final: { nombre: 'Miguel', edad: 31, email: 'miguel.cornejo@correo.cl' }
```

## Explicación paso a paso

1. Se define el objeto literal `usuario` con dos propiedades iniciales: `nombre` (un string) y `edad` (un number).
2. Con `usuario.nombre` se usa la notación de punto para leer la propiedad `nombre`, que devuelve `"Miguel"`.
3. Con `usuario["edad"]` se usa la notación de corchetes para leer la propiedad `edad`. El nombre de la propiedad va como texto entre comillas y el resultado es `30`.
4. La instrucción `usuario.email = "..."` agrega una propiedad nueva al objeto. Como la propiedad no existía, JavaScript la crea en ese momento.
5. La instrucción `usuario.edad = 31` reemplaza el valor previo de `edad` (que era `30`) por `31`. Aquí la sintaxis es idéntica a la de agregar, pero como la clave ya existía, el efecto es una modificación.
6. Al consultar `usuario.direccion`, que nunca fue definida, JavaScript no lanza un error sino que devuelve `undefined`. Esto es útil para verificar si una propiedad está presente antes de usarla.
7. Se declara la variable `propiedad` con el valor `"email"` y luego se accede con `usuario[propiedad]`. La notación de corchetes evalúa el contenido de la variable, por lo que termina leyendo `usuario["email"]`. Esto no se puede lograr con la notación de punto, ya que `usuario.propiedad` buscaría una clave llamada literalmente `propiedad`.
8. Finalmente, `console.log("Objeto final:", usuario)` muestra el estado del objeto con todos los cambios aplicados: la edad modificada y la nueva propiedad `email`.

## Reflexión

Al hacer esta práctica entendí que la notación de punto y la de corchetes no son simplemente dos formas de escribir lo mismo, sino que cada una resuelve un problema distinto. La notación de punto es la que más uso cuando ya sé cuál es el nombre de la propiedad mientras escribo el código, porque es más corta y legible. La notación de corchetes se vuelve indispensable cuando el nombre de la propiedad está guardado en una variable, viene de la respuesta de un servidor o tiene caracteres que no son válidos como identificador, como espacios o guiones.

Pienso que esto es muy relevante para el desarrollo web real, porque cuando trabaje con datos que llegan desde un formulario o desde una API en formato JSON, muchas veces el nombre del campo a leer se decide en tiempo de ejecución. En esos casos, poder usar una variable dentro de los corchetes me permite escribir código flexible y reutilizable. También me quedó claro que consultar una propiedad inexistente devuelve `undefined` en lugar de romper el programa, lo que me obliga a validar los datos antes de confiar en ellos. Estos detalles, que parecen pequeños, son justamente los que evitan errores en aplicaciones reales.
