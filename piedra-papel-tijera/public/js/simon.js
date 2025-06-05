document.addEventListener('DOMContentLoaded', () => {
    console.log('Simon Dice - Script cargado correctamente');
    
    // Cargar datos del jugador
    const gameMode = localStorage.getItem('gameMode') || 'single';
    const player1 = localStorage.getItem('player1') || 'Jugador 1';
    const player2 = gameMode === 'multi' ? localStorage.getItem('player2') : 'Computadora';
    
    // Mostrar información del jugador
    const playerInfo = document.getElementById('player-info');
    playerInfo.innerHTML = `
        <div class="player-info-container">
            <p><strong>Modo:</strong> ${gameMode === 'single' ? 'Individual' : 'Multijugador'}</p>
            <p><strong>Jugador 1:</strong> ${player1}</p>
            ${gameMode === 'multi' ? `<p><strong>Jugador 2:</strong> ${player2}</p>` : ''}
            <p id="turn-info"><strong>Turno de:</strong> ${player1}</p>
        </div>
    `;

    // Elementos del juego
    const colors = ['green', 'red', 'yellow', 'blue'];
    const colorBtns = document.querySelectorAll('.color-btn');
    const startBtn = document.getElementById('start-btn');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');
    const turnInfo = document.getElementById('turn-info');
    
    // Variables de estado
    let sequence = [];
    let playerSequence = [];
    let level = 1;
    let isPlaying = false;
    let currentPlayer = player1;

    // Evento para iniciar el juego
    startBtn.addEventListener('click', startGame);
    
    // Eventos para los botones de color
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!isPlaying) return;
            
            const color = this.dataset.color;
            playerSequence.push(color);
            highlightColor(color);
            checkSequence();
        });
    });
    
    // Función para iniciar el juego
    function startGame() {
        console.log('Iniciando juego...');
        sequence = [];
        playerSequence = [];
        level = 1;
        isPlaying = true;
        currentPlayer = player1;
        updateTurnInfo();
        startBtn.disabled = true;
        scoreDisplay.textContent = `Puntuación: 0`;
        levelDisplay.textContent = `Nivel: 1`;
        nextLevel();
    }
    
    // Función para avanzar al siguiente nivel
    function nextLevel() {
        playerSequence = [];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
        playSequence();
    }
    
    // Función para reproducir la secuencia
    function playSequence() {
        let i = 0;
        const interval = setInterval(() => {
            if (i >= sequence.length) {
                clearInterval(interval);
                return;
            }
            const color = sequence[i];
            highlightColor(color);
            i++;
        }, 800);
    }
    
    // Función para verificar la secuencia
    function checkSequence() {
        const index = playerSequence.length - 1;
        
        if (playerSequence[index] !== sequence[index]) {
            gameOver();
            return;
        }
        
        if (playerSequence.length === sequence.length) {
            level++;
            scoreDisplay.textContent = `Puntuación: ${level * 10 - 10}`;
            levelDisplay.textContent = `Nivel: ${level}`;
            
            // Cambiar turno en multijugador
            if (gameMode === 'multi') {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                updateTurnInfo();
            }
            
            setTimeout(nextLevel, 1000);
        }
    }
    
    // Función para actualizar la información de turno
    function updateTurnInfo() {
        if (turnInfo) {
            turnInfo.innerHTML = `<strong>Turno de:</strong> ${currentPlayer}`;
        }
    }
    
    // Función para finalizar el juego
    function gameOver() {
        isPlaying = false;
        startBtn.disabled = false;
        
        const loser = currentPlayer;
        const winner = currentPlayer === player1 ? player2 : player1;
        
        alert(`¡${loser} se equivocó! ${winner} gana el juego con nivel ${level}`);
    }
    
    // Función para resaltar un color
    function highlightColor(color) {
        const btn = document.getElementById(color);
        btn.style.opacity = '0.5';
        playSound(color);
        
        setTimeout(() => {
            btn.style.opacity = '1';
        }, 500);
    }
    
    // Función para reproducir sonido
    function playSound(color) {
        const sounds = {
            green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
            red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
            yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
            blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
        };
        
        if (sounds[color]) {
            sounds[color].play().catch(e => console.error(`Error al reproducir sonido: ${e}`));
        }
    }
});
window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('player1') || !localStorage.getItem('player2')) {
        selectGameMode('tateti'); // cambiar según el juego: 'simon', 'ppt', etc.
    } else {
        displayPlayerInfo();
    }
});
