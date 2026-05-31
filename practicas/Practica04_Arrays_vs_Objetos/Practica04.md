# Práctica 04: Arrays vs Objetos

## Objetivo

Comparar el uso de **arrays** y **objetos** en JavaScript para entender cómo se
accede y se modifica la información en cada estructura, y reconocer cuándo
conviene usar una u otra. Esta distinción es la base del modelo de datos que
ocupo más adelante en el simulador de la cafetería.

## Conceptos aplicados

- Arrays: declaración, acceso por índice numérico y modificación con `push` y `shift`.
- Objetos: pares clave-valor y acceso con notación de punto mediante una clave descriptiva.
- Diferencia entre acceder por posición (índice) y acceder por nombre (clave).

## Código

```javascript
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
```

## Salida en consola

```
Usuario en el índice 1 del array: Luis
Valor de la clave usuario2 del objeto: Luis
Array luego de agregar 'Carlos' con push: [ 'Ana', 'Luis', 'María', 'Carlos' ]
Array luego de eliminar el primero con shift: [ 'Luis', 'María', 'Carlos' ]
```

## Explicación paso a paso

1. Se declara `usuariosArray`, un array con tres nombres. Como es una colección
   ordenada, cada elemento queda asociado a una posición que parte en cero.
2. Se accede a `usuariosArray[1]`, es decir, al segundo elemento, que es `"Luis"`.
3. Se declara `usuariosObjeto`, donde cada nombre queda asociado a una clave
   descriptiva (`usuario1`, `usuario2`, `usuario3`) en lugar de a una posición.
4. Se accede a `usuariosObjeto.usuario2` con notación de punto y se obtiene `"Luis"`.
5. Con `push("Carlos")` se agrega un elemento al final del array.
6. Con `shift()` se elimina el primer elemento, por lo que `"Ana"` queda fuera.

## Reflexión

Los arrays sirven para listas ordenadas en las que la posición de cada elemento
importa y se accede por índice numérico. Los objetos, en cambio, sirven para
describir una entidad mediante propiedades con nombre, a las que se accede por
clave. Más adelante, al combinar ambas ideas en un array de objetos, obtengo la
estructura que ocupo para representar el menú del simulador de la cafetería.
