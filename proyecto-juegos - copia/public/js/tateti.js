document.addEventListener('DOMContentLoaded', () => {
    console.log('TaTeTi - Script cargado correctamente');
    
    // Cargar datos del jugador
    const gameMode = localStorage.getItem('gameMode') || 'single';
    const player1 = localStorage.getItem('player1') || 'Jugador 1';
    const player2 = gameMode === 'multi' ? localStorage.getItem('player2') : 'Computadora';
    
    // Mostrar información del jugador
    const playerInfo = document.getElementById('player-info');
    playerInfo.innerHTML = `
        <div class="player-info-container">
            <p><strong>Modo:</strong> ${gameMode === 'single' ? 'Individual' : 'Multijugador'}</p>
            <p><strong>Jugador 1 (X):</strong> ${player1}</p>
            <p><strong>${gameMode === 'single' ? 'Computadora (O)' : `Jugador 2 (O): ${player2}`}</strong></p>
            <p id="turn-info"><strong>Turno de:</strong> ${player1} (X)</p>
        </div>
    `;

    // Elementos del juego
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset-btn');
    const turnInfo = document.getElementById('turn-info');
    
    // Variables de estado
    let gameActive = true;
    let currentPlayer = 'X';
    let currentPlayerName = player1;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    // Combinaciones ganadoras
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    // Event Listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleReset);

    // Función para manejar clic en celda
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        // Validar movimiento
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Actualizar estado del juego
        updateCell(clickedCell, clickedCellIndex);
        checkResult();
    }
    
    // Función para actualizar celda
    function updateCell(cell, index) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
    }
    
    // Función para verificar resultado
    function checkResult() {
        let roundWon = false;
        
        // Verificar combinaciones ganadoras
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }
        
        // Manejar victoria
        if (roundWon) {
            statusDisplay.textContent = `¡${currentPlayerName} (${currentPlayer}) ha ganado!`;
            gameActive = false;
            return;
        }
        
        // Manejar empate
        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.textContent = '¡Empate!';
            gameActive = false;
            return;
        }
        
        // Cambiar turno
        changePlayer();
    }
    
    // Función para cambiar turno
    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerName = currentPlayer === 'X' ? player1 : player2;
        
        // Actualizar información de turno
        updateTurnInfo();
        
        // Turno de la IA en modo individual
        if (gameMode === 'single' && currentPlayer === 'O' && gameActive) {
            statusDisplay.textContent = 'Turno de la computadora...';
            setTimeout(makeAIMove, 1000);
        } else {
            statusDisplay.textContent = `Turno de ${currentPlayerName} (${currentPlayer})`;
        }
    }
    
    // Función para actualizar información de turno
    function updateTurnInfo() {
        if (turnInfo) {
            turnInfo.innerHTML = `<strong>Turno de:</strong> ${currentPlayerName} (${currentPlayer})`;
        }
    }
    
    // Función para movimiento de la IA
    function makeAIMove() {
        // Estrategia simple de IA
        const emptyCells = gameState
            .map((cell, index) => cell === '' ? index : null)
            .filter(cell => cell !== null);
        
        // 1. Verificar si la IA puede ganar
        for (let i = 0; i < emptyCells.length; i++) {
            const testGameState = [...gameState];
            testGameState[emptyCells[i]] = 'O';
            
            for (let j = 0; j < winningConditions.length; j++) {
                const [a, b, c] = winningConditions[j];
                if (testGameState[a] === 'O' && testGameState[b] === 'O' && testGameState[c] === 'O') {
                    const cell = document.querySelector(`.cell[data-index="${emptyCells[i]}"]`);
                    updateCell(cell, emptyCells[i]);
                    checkResult();
                    return;
                }
            }
        }
        
        // 2. Bloquear al jugador si puede ganar
        for (let i = 0; i < emptyCells.length; i++) {
            const testGameState = [...gameState];
            testGameState[emptyCells[i]] = 'X';
            
            for (let j = 0; j < winningConditions.length; j++) {
                const [a, b, c] = winningConditions[j];
                if (testGameState[a] === 'X' && testGameState[b] === 'X' && testGameState[c] === 'X') {
                    const cell = document.querySelector(`.cell[data-index="${emptyCells[i]}"]`);
                    updateCell(cell, emptyCells[i]);
                    checkResult();
                    return;
                }
            }
        }
        
        // 3. Mover aleatoriamente si no hay jugadas críticas
        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
            updateCell(cell, randomIndex);
            checkResult();
        }
    }
    
    // Función para reiniciar el juego
    function handleReset() {
        gameActive = true;
        currentPlayer = 'X';
        currentPlayerName = player1;
        gameState = ['', '', '', '', '', '', '', '', ''];
        updateTurnInfo();
        statusDisplay.textContent = `Turno de ${player1} (X)`;
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    }
});