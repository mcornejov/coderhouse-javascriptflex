# Práctica 05 - Arrays que contienen objetos y console.table

Curso: JavaScript - CoderHouse  |  Unidad: Arrays de objetos  |  Alumno: Miguel Cornejo

## Objetivo

Practicar el uso de arrays cuyos elementos son objetos, una estructura muy común en JavaScript para representar colecciones de registros (por ejemplo, una lista de usuarios). Se busca aprender a acceder a las propiedades de un objeto dentro de un array, a modificar valores existentes, a agregar nuevas propiedades y a inspeccionar la colección completa de forma ordenada con `console.table`.

## Conceptos aplicados

- Declaración de un array con la palabra clave `const`
- Objetos literales con propiedades de distinto tipo (string, number)
- Acceso a un elemento por índice y a sus propiedades con notación de punto
- Modificación de una propiedad existente
- Agregado dinámico de una nueva propiedad a un objeto
- Visualización ordenada de datos con `console.table`

## Código

### usuarios.js

```js
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
```

## Salida en consola

```
Nombre del segundo usuario: Matías Fuentes
Primer usuario actualizado: {
  nombre: 'Valentina Rojas',
  edad: 30,
  email: 'valentina.rojas@correo.cl',
  activo: true
}
┌─────────┬───────────────────┬──────┬─────────────────────────────┬────────┐
│ (index) │ nombre            │ edad │ email                       │ activo │
├─────────┼───────────────────┼──────┼─────────────────────────────┼────────┤
│ 0       │ 'Valentina Rojas' │ 30   │ 'valentina.rojas@correo.cl' │ true   │
│ 1       │ 'Matías Fuentes'  │ 34   │ 'matias.fuentes@correo.cl'  │        │
│ 2       │ 'Camila Soto'     │ 22   │ 'camila.soto@correo.cl'     │        │
└─────────┴───────────────────┴──────┴─────────────────────────────┴────────┘
```

## Explicación paso a paso

1. Se define el array `usuarios` con tres objetos. Cada objeto comparte la misma forma: las propiedades `nombre` (string), `edad` (number) y `email` (string). Mantener la misma estructura en todos los elementos es lo que hace útil a esta colección.
2. Con `usuarios[1].nombre` se accede al segundo usuario (los índices comienzan en 0, por lo que el índice 1 es el segundo) y luego a su propiedad `nombre`. El resultado se imprime en consola.
3. La línea `usuarios[0].edad = 30;` reemplaza el valor de la edad del primer usuario, que pasa de 28 a 30.
4. La línea `usuarios[0].activo = true;` agrega una propiedad nueva llamada `activo` solo al primer objeto. Como los objetos en JavaScript son dinámicos, es posible sumar propiedades después de su creación.
5. `console.table(usuarios)` muestra todo el array en una tabla. En la primera fila se ve la propiedad `activo` con valor `true`, mientras que en las otras filas esa columna queda vacía porque esos objetos no tienen dicha propiedad.

## Reflexión

Trabajar con un array de objetos me dejó claro lo ordenada que queda la información cuando cada registro agrupa sus propios datos bajo nombres significativos como `nombre`, `edad` o `email`. Con un array simple tendría que recordar a qué posición corresponde cada dato y separar valores en listas paralelas, lo que se vuelve frágil y difícil de mantener apenas crecen los registros. En cambio, aquí cada usuario es una unidad coherente y completa, y acceder a un dato es tan directo como pedir la propiedad por su nombre.

Veo que esta estructura es exactamente la que usaría en desarrollo web real: cuando una página recibe datos desde una API normalmente llegan como un array de objetos, y luego recorro ese array para pintar tarjetas, filas de una tabla o resultados de búsqueda. Herramientas como `console.table` además me ayudan a inspeccionar rápidamente esos datos durante la depuración, antes de mostrarlos en la interfaz. Es un patrón que voy a reutilizar constantemente en proyectos más grandes.
