function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

function multiplicacion(a, b) {
    return a * b;
}

function division(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        throw new Error("No se puede dividir por 0");
    }
}

module.exports = { suma, resta, multiplicacion, division };  
