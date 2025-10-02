const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/guardar', (req, res) => {
  const numeros = req.body.numeros;
  if (!Array.isArray(numeros) || numeros.length < 10 || numeros.length > 20) {
    return res.status(400).json({ error: 'Debe ingresar entre 10 y 20 números.' });
  }

  const contenido = numeros.join(', ');
  const fileName = `numeros_${Date.now()}.txt`;
  const filePath = path.join(__dirname, 'uploads', fileName);

  fs.writeFile(filePath, contenido, (err) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo guardar el archivo.' });
    }
    res.json({ mensaje: 'Archivo guardado correctamente', archivo: fileName });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
