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
