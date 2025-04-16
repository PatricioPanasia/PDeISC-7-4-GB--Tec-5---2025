const http = require('http');
const fs = require('fs');
const path = require('path');

// Creamos un servidor HTTP
const servidor = http.createServer((req, res) => {
    // Ruta al archivo HTML
    const archivoHtml = path.join (__dirname, 'index.html');
    // Usamos fs.readFile para leer el archivo HTML
    fs.readFile(archivoHtml, 'utf8', (err,data) => {
        if (err){
            // Si hay un error, respondemos con un mensaje de error
            res.statusCode = 500;
            res.end('Hubo un error al cargar el archivo.');
            return;
        }
        // Si todo está bien, respondemos con el archivo HTML
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);

    });

});
// Definimos el puerto donde el servidor estará escuchando
const puerto=3000;
// El servidor comienza a escuchar en el puerto
servidor.listen(puerto, () => {
    console.log('Servidor corriendo en http://localhost:${puerto}');
});