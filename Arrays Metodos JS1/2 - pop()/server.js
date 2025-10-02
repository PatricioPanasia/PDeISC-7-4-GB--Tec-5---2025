const express = require ('express');
const app = express();
const path = require('path');

// Servir archivos estáticos desde 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta extra opcional para otra página
app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'formulario.html'));
});
// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
