# Práctica 11 - Lanzar y capturar errores: throw y try/catch

Curso: JavaScript - CoderHouse  |  Unidad: Errores - throw  |  Alumno: Miguel Cornejo

## Objetivo

En esta práctica se ejercita el manejo de errores en JavaScript usando la sentencia `throw` para lanzar errores propios y el bloque `try/catch` para capturarlos sin que el programa se detenga abruptamente. El caso aplicado es la validación de una edad: se crea una función que exige que el valor sea un número mayor o igual a 18 y, cuando no lo es, interrumpe el flujo lanzando un error con un mensaje claro. Esto sirve para escribir código robusto que reacciona de forma controlada ante datos incorrectos en lugar de fallar de manera silenciosa o caerse por completo.

## Conceptos aplicados

- Definición de funciones con parámetros.
- Validación de tipos con el operador `typeof`.
- Lanzamiento de errores con `throw` y el constructor `new Error(...)`.
- Captura controlada de errores con el bloque `try/catch`.
- Acceso a la propiedad `error.message` del objeto de error.
- Recorrido de un arreglo con un ciclo `for...of` para probar varios valores.
- Salida por consola con `console.log`.

## Código

### validacion.js

```js
// Práctica 11 - Lanzar y capturar errores: throw y try/catch
// Curso JavaScript - CoderHouse

// Valida que la edad recibida sea un número mayor o igual a 18.
// Si no cumple, interrumpe la ejecución lanzando un error.
function validarEdad(edad) {
    if (typeof edad !== "number" || edad < 18) {
        throw new Error("Edad inválida: debe ser mayor o igual a 18");
    }
    return `Edad válida: ${edad} años. Acceso permitido.`;
}

// Lista de valores de prueba: uno válido y varios inválidos.
const edadesAProbar = [25, 15, "veinte"];

// Recorre cada valor y maneja por separado el éxito o el error.
for (const edad of edadesAProbar) {
    try {
        const resultado = validarEdad(edad);
        console.log(resultado);
    } catch (error) {
        console.log(`Error capturado: ${error.message}`);
    }
}
```

## Salida / Comportamiento

Al ejecutar `node validacion.js` la consola muestra:

```
Edad válida: 25 años. Acceso permitido.
Error capturado: Edad inválida: debe ser mayor o igual a 18
Error capturado: Edad inválida: debe ser mayor o igual a 18
```

## Explicación

1. **Definición de la función `validarEdad(edad)`:** recibe un parámetro `edad` y concentra toda la lógica de validación.
2. **Condición de validación:** se comprueba con `typeof edad !== "number"` que el dato sea efectivamente un número y con `edad < 18` que cumpla el mínimo requerido. Si cualquiera de las dos condiciones falla, el valor no es aceptable.
3. **Lanzamiento del error:** cuando la condición se cumple, `throw new Error("Edad inválida: debe ser mayor o igual a 18")` detiene la ejecución de la función y propaga un objeto de error con ese mensaje.
4. **Retorno en caso válido:** si el dato pasa la validación, la función devuelve un mensaje de confirmación en lugar de lanzar un error.
5. **Valores de prueba:** el arreglo `edadesAProbar` reúne un caso válido (`25`) y dos inválidos (`15`, que no llega al mínimo, y `"veinte"`, que ni siquiera es un número).
6. **Bloque `try/catch` dentro del ciclo:** por cada valor se intenta validar dentro de `try`. Si la función devuelve normalmente, se imprime el resultado; si lanza un error, el control salta al `catch`, donde se muestra `error.message`. Así el programa continúa probando el resto de los valores en vez de detenerse en el primer fallo.

## Reflexión

Esta práctica me ayudó a entender que los errores no siempre son algo que haya que evitar, sino una herramienta para comunicar que algo no está bien y reaccionar a tiempo. Antes tendía a llenar mis funciones de condiciones que devolvían `false` o mensajes sueltos, pero ahora veo que lanzar un error con `throw` deja la intención mucho más explícita y separa la detección del problema (dentro de la función) de su manejo (en el `try/catch` de quien la llama).

Llevado al desarrollo web real, esto es clave cuando trabajo con datos que no controlo, como formularios que llena el usuario o respuestas de una API. Validar la entrada y capturar los errores me permite mostrar mensajes claros en pantalla, evitar que la aplicación se caiga y mantener una experiencia confiable. Es un patrón que pienso reutilizar en el simulador del curso para manejar entradas inválidas sin romper el flujo de la interfaz.
