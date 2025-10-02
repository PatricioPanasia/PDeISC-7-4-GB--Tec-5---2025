const socket = io();

const form = document.getElementById('form-inicio');
const inputNombre = document.getElementById('input-nombre');
const modoSelect = document.getElementById('modo-juego');
const grupoSala = document.getElementById('grupo-sala');
const inputSala = document.getElementById('input-sala');

const info = document.getElementById('info-jugadores');
const turno = document.getElementById('turno');
const opciones = document.getElementById('opciones-juego');
const controles = document.getElementById('controles-online');
const btnRendirse = document.getElementById('btn-rendirse');
const resultado = document.getElementById('resultado');
const score = document.getElementById('score');

let nombre, modo, sala;
let puntuacion = { self: 0, op: 0, rondas: 0 };

const botonesJugada = document.querySelectorAll('.btn-jugada');

// Ocultar botones al inicio
botonesJugada.forEach(btn => btn.classList.add('oculto'));

modoSelect.addEventListener('change', () => {
  grupoSala.classList.toggle('oculto', modoSelect.value === 'cpu');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  nombre = inputNombre.value.trim();
  modo = modoSelect.value;
  if (!nombre) return;
  sala = modo === 'online' ? (inputSala.value.trim() || Math.random().toString(36).slice(2,8).toUpperCase()) : null;

  form.classList.add('oculto');
  opciones.classList.remove('oculto');
  if (modo === 'cpu') {
    info.textContent = `${nombre} vs CPU`;
    turno.textContent = 'Elige tu jugada';
    botonesJugada.forEach(btn => btn.classList.remove('oculto')); // mostrar botones para CPU
  } else {
    socket.emit('joinRoom', { nombre, sala });
    controles.classList.remove('oculto');
    info.textContent = `Sala: ${sala}`;
    turno.textContent = 'Esperando jugador...';
  }
});

botonesJugada.forEach(btn => {
  btn.addEventListener('click', () => {
    const elec = btn.dataset.eleccion;
    if (modo === 'cpu') {
      jugadaCPU(elec);
    } else {
      socket.emit('playerChoice', elec);
      turno.textContent = 'Esperando al otro jugador...';
    }
  });
});

btnRendirse.addEventListener('click', () => socket.emit('surrender'));

function jugadaCPU(elec) {
  const opts = ['piedra','papel','tijera'];
  const cpu = opts[Math.floor(Math.random()*3)];
  let msg = elec === cpu ? '¡Empate!' :
    (elec==='piedra'&&cpu==='tijera')||(elec==='papel'&&cpu==='piedra')||(elec==='tijera'&&cpu==='papel')
    ? '¡Ganaste!' : '¡Perdiste!';
  puntuacion.rondas++;
  if (msg==='¡Ganaste!') puntuacion.self++;
  if (msg==='¡Perdiste!') puntuacion.op++;
  resultado.textContent = `${msg}\nElegiste ${elec} | CPU eligió ${cpu}`;
  score.textContent = `Rondas: ${puntuacion.rondas}\n${nombre}: ${puntuacion.self} — CPU: ${puntuacion.op}`;
}

socket.on('readyConfirmation', () => {
  turno.textContent = 'Preparados. Esperando iniciar...';
});

socket.on('startGame', () => {
  turno.textContent = 'Juego iniciado. Elige tu jugada...';
  botonesJugada.forEach(btn => btn.classList.remove('oculto'));
});

socket.on('waiting', name => {
  turno.textContent = `${name} está eligiendo...`;
});

socket.on('roundResult', ({ mensaje, youScore, opScore }) => {
  puntuacion.rondas++;
  puntuacion.self = youScore;
  puntuacion.op = opScore;
  resultado.textContent = mensaje;
  score.textContent = `Rondas: ${puntuacion.rondas}\nTú: ${youScore} — Rival: ${opScore}`;
});

socket.on('playerSurrendered', winner => {
  resultado.textContent = `${winner} ganó por rendición`;
});

socket.on('roomError', msg => {
  resultado.textContent = msg;
  opciones.classList.add('oculto');
});

socket.on('emojiSupport', supported => {
  if (!supported) {
    document.querySelector('.btn-jugada[data-eleccion="piedra"]').textContent = 'Piedra';
  }
});
