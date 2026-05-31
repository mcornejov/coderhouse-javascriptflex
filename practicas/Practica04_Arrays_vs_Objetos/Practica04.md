# Práctica 04: Arrays vs Objetos

Curso: JavaScript - CoderHouse  |  Unidad: Arrays vs Objetos  |  Alumno: Miguel Cornejo

## Objetivo

Comparar el uso de **arrays** y **objetos** en JavaScript para entender cómo se
accede y se modifica la información en cada estructura, y reconocer cuándo
conviene usar una u otra. Además, combinar ambas ideas en un **array de objetos**,
que es la forma habitual de representar colecciones de datos en aplicaciones
reales y la base del modelo de datos que ocupo más adelante en el simulador de
la cafetería.

## Conceptos aplicados

- Arrays: declaración, acceso por índice numérico y modificación con `push` y `shift`.
- Objetos: pares clave-valor y acceso con notación de punto mediante una clave descriptiva.
- Diferencia entre acceder por posición (índice) y acceder por nombre (clave).
- Array de objetos: cada elemento es un objeto con propiedades nombradas.
- Acceso combinado: notación de corchetes para la posición y de punto para la propiedad.
- Iteración y transformación de arrays con `forEach`, `map` y `filter`.

## Código

```javascript
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
```

## Salida en consola

```
Usuario en el índice 1 del array: Luis
Valor de la clave usuario2 del objeto: Luis
Array luego de agregar 'Carlos' con push: [ 'Ana', 'Luis', 'María', 'Carlos' ]
Array luego de eliminar el primero con shift: [ 'Luis', 'María', 'Carlos' ]
Nombre del primer usuario: Ana
Ciudad del segundo usuario: Valparaíso
Listado completo de usuarios:
  1. Ana (28 años) - Santiago
  2. Luis (34 años) - Valparaíso
  3. María (25 años) - Concepción
Nombres extraídos con map: [ 'Ana', 'Luis', 'María' ]
Usuarios menores de 30 (filter): [
  { nombre: 'Ana', edad: 28, ciudad: 'Santiago' },
  { nombre: 'María', edad: 25, ciudad: 'Concepción' }
]
```

## Explicación paso a paso

1. Se declara `usuariosArray`, un array con tres nombres. Como es una colección
   ordenada, cada elemento queda asociado a una posición que parte en cero.
2. Se accede a `usuariosArray[1]`, es decir, al segundo elemento, que es `"Luis"`.
3. Se declara `usuariosObjeto`, donde cada nombre queda asociado a una clave
   descriptiva (`usuario1`, `usuario2`, `usuario3`) en lugar de a una posición.
4. Se accede a `usuariosObjeto.usuario2` con notación de punto y se obtiene `"Luis"`.
5. Con `push("Carlos")` se agrega un elemento al final del array y con `shift()`
   se elimina el primero, por lo que `"Ana"` queda fuera.
6. Se declara `usuarios`, un **array de objetos**: cada elemento es un objeto con
   las propiedades `nombre`, `edad` y `ciudad`. Esta estructura combina lo mejor
   de ambos mundos: el orden y los índices del array con las propiedades
   descriptivas del objeto.
7. Se accede a un dato puntual combinando notaciones: `usuarios[0].nombre` usa el
   índice para llegar al objeto y el punto para leer la propiedad; `usuarios[1]["ciudad"]`
   hace lo mismo, pero con notación de corchetes para la propiedad.
8. Con `forEach` se recorre todo el array de objetos y se imprime cada usuario con
   sus datos formateados.
9. Con `map` se crea un nuevo array que contiene solo los nombres.
10. Con `filter` se obtiene un nuevo array con los usuarios cuya edad es menor de 30.

## Reflexión

Trabajar esta práctica me dejó clara la diferencia entre las dos estructuras: el
**array** sirve para listas ordenadas donde la posición importa y se accede por
índice numérico, mientras que el **objeto** sirve para describir una entidad
mediante propiedades con nombre, a las que se accede por clave. También entendí
por qué no es cómodo recorrer un objeto como si fuera una lista: sus claves no son
posiciones consecutivas, así que para colecciones que crecen o se recorren, el
array es la mejor opción.

La parte más útil fue combinar ambas ideas en un **array de objetos**, que es como
realmente se representan los datos en una aplicación: una lista (el array) de
entidades con propiedades nombradas (los objetos). Acceder con `usuarios[0].nombre`
e iterar con `forEach`, `map` y `filter` es exactamente lo que ocupo en el
simulador de la cafetería para recorrer el menú, transformar la lista de productos
y filtrar por categoría. Por eso reescribí el ejercicio para que el código
demuestre de verdad lo que describo en esta reflexión.
