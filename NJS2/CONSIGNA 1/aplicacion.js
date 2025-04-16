const tiempo = require('./tiempo');
const calculo = require('./calculo'); // Asegurate que el archivo se llame igual: "calculos.js"
const ubicacion = require('./ubicacion');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Mostrar hora actual
console.log('   Hora actual:', tiempo.obtenerHoraActual());

// Pedir dos números al usuario
readline.question('Ingrese un número: ', (inputA) => {
  const a = parseInt(inputA);

  readline.question('Ingrese otro número: ', (inputB) => {
    const b = parseInt(inputB);

    console.log(`   Suma (${a} + ${b}):`, calculo.suma(a, b));
    console.log(`   Resta (${a} - ${b}):`, calculo.resta(a, b));

    // Mostrar ubicación
    const ubicacionActual = ubicacion.obtenerUbicacion();
    console.log('   Ubicación actual:');
    console.log(`   Ciudad: ${ubicacionActual.ciudad}`);
    console.log(`   País: ${ubicacionActual.pais}`);
    console.log(`   Latitud: ${ubicacionActual.latitud}`);
    console.log(`   Longitud: ${ubicacionActual.longitud}`);

    readline.close();
  });
});
