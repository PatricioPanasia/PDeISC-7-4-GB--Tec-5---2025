const express = require('express');
const app = express();
const path = require('path');

// Servir archivos estáticos desde 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta extra opcional para otra página
app.get('/pagina1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pagina1.html'));
});
app.get('/pagina2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pagina2.html'));
});
// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
