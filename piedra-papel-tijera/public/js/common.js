// Función para seleccionar modo de juego
function selectGameMode(game) {
    // Crear estilos para evitar el autocompletado de Chrome y inputs expandidos
    const style = document.createElement('style');
    style.textContent = `
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #2c2c2c inset !important;
        -webkit-text-fill-color: #f0f0f0 !important;
        transition: background-color 5000s ease-in-out 0s;
      }
      input {
        height: 38px;
        line-height: 1.2;
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);

    // Crear modal
    const modal = document.createElement('div');
    modal.id = 'game-mode-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    // Contenido del modal con estilo oscuro
    modal.innerHTML = `
      <div style="background: #1e1e1e; padding: 20px; border-radius: 12px; width: 300px; box-shadow: 0 0 10px rgba(0,0,0,0.6); color: #f0f0f0; font-family: sans-serif;">
        <h3 style="margin-bottom: 15px; text-align: center; color: #ffffff;">Configuración del juego</h3>
        
        <label for="game-mode" style="display: block; margin-bottom: 5px; font-weight: bold;">Modo de juego:</label>
        <select id="game-mode" style="width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #555; border-radius: 4px; background-color: #2c2c2c; color: #f0f0f0;">
          <option value="single">Contra la computadora</option>
          <option value="multi">Multijugador (LAN)</option>
        </select>

        <div id="single-player-form">
          <label for="player1-name" style="display: block; margin-bottom: 5px; font-weight: bold;">Tu nombre:</label>
          <input type="text" id="player1-name" placeholder="Ej: Juan"
                style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #555; border-radius: 4px; background-color: #2c2c2c; color: #f0f0f0;" required>
        </div>

        <div id="multi-player-form" style="display: none;">
          <label for="player1-name-multi" style="display: block; margin-bottom: 5px; font-weight: bold;">Jugador 1:</label>
          <input type="text" id="player1-name-multi" placeholder="Ej: Juan"
                style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #555; border-radius: 4px; background-color: #2c2c2c; color: #f0f0f0;" required>

          <label for="player2-name-multi" style="display: block; margin-bottom: 5px; font-weight: bold;">Jugador 2:</label>
          <input type="text" id="player2-name-multi" placeholder="Ej: María"
                style="width: 100%; padding: 8px; border: 1px solid #555; border-radius: 4px; background-color: #2c2c2c; color: #f0f0f0;" required>
        </div>

        <button id="start-game-btn" 
                style="width: 100%; padding: 10px; margin-top: 15px; 
                       background: #3498db; color: white; border: none; 
                       border-radius: 5px; cursor: pointer; font-weight: bold;
                       transition: background 0.3s;">
          Comenzar
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    const modeSelect = document.getElementById('game-mode');
    const singleForm = document.getElementById('single-player-form');
    const multiForm = document.getElementById('multi-player-form');
    const startBtn = document.getElementById('start-game-btn');

    // Alternar formularios
    modeSelect.addEventListener('change', () => {
        singleForm.style.display = modeSelect.value === 'single' ? 'block' : 'none';
        multiForm.style.display = modeSelect.value === 'multi' ? 'block' : 'none';
    });

    // Manejar clic en "Comenzar"
    startBtn.addEventListener('click', () => {
        const mode = modeSelect.value;
        let player1, player2;

        if (mode === 'single') {
            player1 = document.getElementById('player1-name').value.trim();
            if (!player1) {
                alert('Por favor ingresa tu nombre');
                return;
            }
            player2 = 'Computadora';
        } else {
            player1 = document.getElementById('player1-name-multi').value.trim();
            player2 = document.getElementById('player2-name-multi').value.trim();

            if (!player1 || !player2) {
                alert('Por favor ingresa los nombres de ambos jugadores');
                return;
            }

            if (player1 === player2) {
                alert('Los nombres de jugadores deben ser diferentes');
                return;
            }
        }

        localStorage.setItem('gameMode', mode);
        localStorage.setItem('player1', player1);
        localStorage.setItem('player2', player2);

        document.body.removeChild(modal);
        window.location.href = `/${game}.html`;
    });

    // Cerrar modal si se hace clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Función para mostrar info de los jugadores
function displayPlayerInfo() {
    const gameMode = localStorage.getItem('gameMode') || 'single';
    const player1 = localStorage.getItem('player1') || 'Jugador 1';
    const player2 = localStorage.getItem('player2') || (gameMode === 'single' ? 'Computadora' : 'Jugador 2');

    const playerInfo = document.getElementById('player-info');
    if (playerInfo) {
        playerInfo.innerHTML = `
            <div style="background: #2c2c2c; padding: 10px; border-radius: 5px; margin-bottom: 15px; color: #f0f0f0;">
                <p style="margin: 5px 0;"><strong>Modo:</strong> ${gameMode === 'single' ? 'Individual' : 'Multijugador'}</p>
                <p style="margin: 5px 0;"><strong>Jugador 1:</strong> ${player1}</p>
                ${gameMode === 'multi' ? `<p style="margin: 5px 0;"><strong>Jugador 2:</strong> ${player2}</p>` : ''}
            </div>
        `;
    }
}

// Función para conectar con Socket.io
function connectToSocket() {
    if (typeof io !== 'undefined') {
        const socket = io();

        socket.on('connect', () => {
            console.log('Conectado al servidor Socket.io');
        });

        socket.on('disconnect', () => {
            console.log('Desconectado del servidor Socket.io');
        });

        return socket;
    }
    return null;
}
