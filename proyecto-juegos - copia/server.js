const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Configuración
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/simon.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'simon.html'));
});

app.get('/tateti.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tateti.html'));
});

app.get('/ppt.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ppt.html'));
});

// Socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Eventos para Simón Dice
    socket.on('simon-sequence', (data) => {
        socket.broadcast.emit('simon-sequence', data);
    });

    socket.on('simon-move', (data) => {
        socket.broadcast.emit('simon-move', data);
    });

    // Eventos para TaTeTi
    socket.on('tateti-move', (data) => {
        socket.broadcast.emit('tateti-move', data);
    });

    socket.on('tateti-reset', () => {
        socket.broadcast.emit('tateti-reset');
    });

    // Eventos para Piedra, Papel o Tijeras
    socket.on('ppt-choice', (data) => {
        socket.broadcast.emit('ppt-choice', data);
    });

    socket.on('ppt-reset', () => {
        socket.broadcast.emit('ppt-reset');
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});