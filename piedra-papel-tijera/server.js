const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const rooms = {};

io.on('connection', sock => {
  sock.on('joinRoom', ({ nombre, sala }) => {
    sock.join(sala);
    sock.sala = sala;
    if (!rooms[sala]) rooms[sala] = {};
    rooms[sala][sock.id] = { name: nombre, choice: null, score: 0, socketId: sock.id };

    io.to(sala).emit('readyConfirmation');

    if (Object.keys(rooms[sala]).length === 2) {
      io.to(sala).emit('startGame');
    }
  });

  sock.on('playerChoice', elec => {
    const sala = sock.sala;
    if (!sala || !rooms[sala] || !rooms[sala][sock.id]) return;

    const player = rooms[sala][sock.id];
    player.choice = elec;

    const players = Object.values(rooms[sala]);
    if (players.length < 2) return;

    const [p1, p2] = players;

    if (p1.choice && p2.choice) {
      const beats = { piedra: 'tijera', papel: 'piedra', tijera: 'papel' };

      let resultadoP1 = '';
      let resultadoP2 = '';

      if (p1.choice === p2.choice) {
        resultadoP1 = `Empate. Ambos eligieron ${p1.choice}.`;
        resultadoP2 = resultadoP1;
      } else if (beats[p1.choice] === p2.choice) {
        p1.score++;
        resultadoP1 = `Ganaste. Elegiste ${p1.choice} y tu oponente eligió ${p2.choice}.`;
        resultadoP2 = `Perdiste. Elegiste ${p2.choice} y tu oponente eligió ${p1.choice}.`;
      } else {
        p2.score++;
        resultadoP1 = `Perdiste. Elegiste ${p1.choice} y tu oponente eligió ${p2.choice}.`;
        resultadoP2 = `Ganaste. Elegiste ${p2.choice} y tu oponente eligió ${p1.choice}.`;
      }

      // Emitir resultados personalizados a cada jugador
      io.to(p1.socketId).emit('roundResult', {
        mensaje: resultadoP1,
        you: p1.name,
        op: p2.name,
        youScore: p1.score,
        opScore: p2.score,
        choices: [p1.choice, p2.choice]
      });

      io.to(p2.socketId).emit('roundResult', {
        mensaje: resultadoP2,
        you: p2.name,
        op: p1.name,
        youScore: p2.score,
        opScore: p1.score,
        choices: [p2.choice, p1.choice]
      });

      // Resetear elecciones para la siguiente ronda
      p1.choice = null;
      p2.choice = null;
    } else {
      io.to(sala).emit('waiting', player.name);
    }
  });

  sock.on('surrender', () => {
    const sala = sock.sala;
    if (!sala || !rooms[sala] || !rooms[sala][sock.id]) return;

    const players = Object.values(rooms[sala]);
    const loser = rooms[sala][sock.id].name;
    const winner = players.find(p => p.name !== loser)?.name;

    if (winner) {
      io.to(sala).emit('playerSurrendered', winner);
    }
  });

  sock.on('disconnect', () => {
    const sala = sock.sala;
    if (sala && rooms[sala] && rooms[sala][sock.id]) {
      delete rooms[sala][sock.id];
      io.to(sala).emit('roomError', 'El otro jugador se desconectó');
    }
  });
});

server.listen(3000, () => {
  console.log('En http://localhost:3000/game.html');
});
