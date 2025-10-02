document.addEventListener('DOMContentLoaded', () => {
    console.log('Piedra, Papel o Tijeras - Script cargado correctamente');
    
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
            <p><strong>${gameMode === 'single' ? 'Computadora' : 'Jugador 2'}:</strong> ${player2}</p>
            <p id="turn-info"><strong>Turno:</strong> ${player1} elige</p>
        </div>
    `;

    // Elementos del juego
    const choiceBtns = document.querySelectorAll('.choice-btn');
    const resultDisplay = document.getElementById('result');
    const roundHistory = document.getElementById('round-history');
    const player1ScoreDisplay = document.getElementById('player1-score');
    const player2ScoreDisplay = document.getElementById('player2-score');
    const resetBtn = document.getElementById('reset-game');
    const turnInfo = document.getElementById('turn-info');
    
    // Variables de estado
    let scores = { player1: 0, player2: 0 };
    let rounds = [];
    let player1Choice = null;
    let player2Choice = null;
    let currentPlayer = player1;

    // Actualizar marcadores iniciales
    updateScoreDisplays();

    // Event Listeners
    choiceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const choice = this.id;
            makeChoice(choice);
        });
    });
    
    resetBtn.addEventListener('click', resetGame);

    // Función para realizar una elección
    function makeChoice(choice) {
        if (currentPlayer === player1 && player1Choice !== null) {
            console.log('Jugador 1 ya eligió');
            return;
        }
        
        if (currentPlayer === player2 && player2Choice !== null) {
            console.log('Jugador 2 ya eligió');
            return;
        }
        
        if (currentPlayer === player1) {
            player1Choice = choice;
            console.log(`${player1} eligió: ${translateChoice(choice)}`);
            currentPlayer = player2;
            
            if (gameMode === 'single') {
                // Modo individual: elección aleatoria de la computadora
                const choices = ['rock', 'paper', 'scissors'];
                player2Choice = choices[Math.floor(Math.random() * choices.length)];
                console.log(`${player2} eligió: ${translateChoice(player2Choice)}`);
                determineWinner();
            } else {
                // Modo multijugador: esperar elección del jugador 2
                turnInfo.innerHTML = `<strong>Turno:</strong> ${player2} elige`;
                resultDisplay.textContent = `${player1} ya eligió. ${player2}, es tu turno.`;
            }
        } else {
            player2Choice = choice;
            console.log(`${player2} eligió: ${translateChoice(choice)}`);
            determineWinner();
        }
    }
    
    // Función para determinar el ganador
    function determineWinner() {
        const p1 = player1Choice;
        const p2 = player2Choice;
        let result;
        
        if (p1 === p2) {
            result = 'Empate';
        } else if (
            (p1 === 'rock' && p2 === 'scissors') ||
            (p1 === 'paper' && p2 === 'rock') ||
            (p1 === 'scissors' && p2 === 'paper')
        ) {
            result = 'player1';
            scores.player1++;
        } else {
            result = 'player2';
            scores.player2++;
        }
        
        updateDisplay(result);
        prepareNextRound();
    }
    
    // Función para preparar la siguiente ronda
    function prepareNextRound() {
        player1Choice = null;
        player2Choice = null;
        currentPlayer = player1;
        turnInfo.innerHTML = `<strong>Turno:</strong> ${player1} elige`;
    }
    
    // Función para actualizar la pantalla
    function updateDisplay(result) {
        updateScoreDisplays();
        
        let resultText;
        if (result === 'Empate') {
            resultText = '¡Empate!';
        } else if (result === 'player1') {
            resultText = `¡${player1} gana esta ronda!`;
        } else {
            resultText = `¡${player2} gana esta ronda!`;
        }
        
        resultDisplay.textContent = resultText;
        
        // Añadir al historial
        const roundText = `Ronda ${rounds.length + 1}: ${resultText}`;
        rounds.push(roundText);
        
        const historyItem = document.createElement('div');
        historyItem.textContent = roundText;
        roundHistory.prepend(historyItem);
    }
    
    // Función para actualizar los marcadores
    function updateScoreDisplays() {
        player1ScoreDisplay.textContent = `${player1}: ${scores.player1}`;
        player2ScoreDisplay.textContent = `${player2}: ${scores.player2}`;
    }
    
    // Función para traducir elección
    function translateChoice(choice) {
        const translations = {
            'rock': 'Piedra',
            'paper': 'Papel',
            'scissors': 'Tijeras'
        };
        return translations[choice] || choice;
    }
    
    // Función para reiniciar el juego
    function resetGame() {
        scores = { player1: 0, player2: 0 };
        rounds = [];
        player1Choice = null;
        player2Choice = null;
        currentPlayer = player1;
        
        updateScoreDisplays();
        resultDisplay.textContent = '';
        roundHistory.innerHTML = '';
        turnInfo.innerHTML = `<strong>Turno:</strong> ${player1} elige`;
    }
});