const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Configuración de almacenamiento de archivos subidos
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, 'subido-' + Date.now() + '.txt');
  }
});
const upload = multer({ storage });

app.use(express.static('public')); // Para servir index.html, styles.css, etc.
app.use('/resultados', express.static(path.join(__dirname, 'resultados'))); // Para servir los archivos .txt generados
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta POST para procesar el archivo subido
app.post('/subir', upload.single('archivo'), (req, res) => {
  const archivoPath = req.file.path;

  fs.readFile(archivoPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error al leer archivo');

    const lineas = data.split(/\r?\n/).filter(Boolean);
    const numerosTotales = lineas.map(n => n.trim()).filter(n => /^\d+$/.test(n));
    const utiles = numerosTotales.filter(n => n[0] === n[n.length - 1]).sort((a, b) => a - b);
    const noUtiles = numerosTotales.length - utiles.length;
    const porcentaje = ((utiles.length / numerosTotales.length) * 100).toFixed(2);

    // Guardar archivo .txt con los números útiles
    const nombreArchivo = `filtrado-${Date.now()}.txt`;
    const rutaFinal = path.join(__dirname, 'resultados', nombreArchivo);
    fs.writeFileSync(rutaFinal, utiles.join('\n'));

    // Enviar respuesta al frontend con ruta de descarga
    res.json({
      utiles,
      noUtiles,
      total: numerosTotales.length,
      porcentaje,
      rutaArchivo: `/resultados/${nombreArchivo}` // esta ruta será usada en el href del <a>
    });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
