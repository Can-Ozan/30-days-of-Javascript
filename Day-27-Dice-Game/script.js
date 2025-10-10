// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const rollBtn = document.getElementById('rollBtn');
    const resetBtn = document.getElementById('resetBtn');
    const message = document.getElementById('message');
    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const player1 = document.querySelector('.player1');
    const player2 = document.querySelector('.player2');
    
    // Game state
    let scores = [0, 0];
    let currentPlayer = 0;
    let gameOver = false;
    
    // Dice faces mapping
    const diceFaces = {
        1: 'rotateX(0deg) rotateY(0deg)',
        2: 'rotateX(0deg) rotateY(-90deg)',
        3: 'rotateX(-90deg) rotateY(0deg)',
        4: 'rotateX(90deg) rotateY(0deg)',
        5: 'rotateX(0deg) rotateY(90deg)',
        6: 'rotateX(180deg) rotateY(0deg)'
    };
    
    // Roll dice function
    function rollDice() {
        if (gameOver) return;
        
        // Disable roll button during animation
        rollBtn.disabled = true;
        
        // Generate random dice values
        const diceValue1 = Math.floor(Math.random() * 6) + 1;
        const diceValue2 = Math.floor(Math.random() * 6) + 1;
        
        // Animate dice
        animateDice(dice1, diceValue1);
        animateDice(dice2, diceValue2);
        
        // Update scores after animation
        setTimeout(() => {
            scores[currentPlayer] += diceValue1 + diceValue2;
            updateScores();
            
            // Check for winner
            if (scores[currentPlayer] >= 30) {
                gameOver = true;
                message.textContent = `Player ${currentPlayer + 1} wins!`;
                rollBtn.disabled = true;
            } else {
                // Switch player
                currentPlayer = currentPlayer === 0 ? 1 : 0;
                updateActivePlayer();
                message.textContent = `Player ${currentPlayer + 1}'s turn`;
                rollBtn.disabled = false;
            }
        }, 1500);
    }
    
    // Animate dice
    function animateDice(diceElement, value) {
        // Add rolling animation
        diceElement.style.animation = 'rolling 1.5s ease';
        
        // Set final position after animation
        setTimeout(() => {
            diceElement.style.transform = diceFaces[value];
            diceElement.style.animation = '';
        }, 1500);
    }
    
    // Update scores display
    function updateScores() {
        score1.textContent = scores[0];
        score2.textContent = scores[1];
    }
    
    // Update active player
    function updateActivePlayer() {
        if (currentPlayer === 0) {
            player1.classList.add('active');
            player2.classList.remove('active');
        } else {
            player2.classList.add('active');
            player1.classList.remove('active');
        }
    }
    
    // Reset game
    function resetGame() {
        scores = [0, 0];
        currentPlayer = 0;
        gameOver = false;
        
        updateScores();
        updateActivePlayer();
        
        // Reset dice position
        dice1.style.transform = diceFaces[1];
        dice2.style.transform = diceFaces[1];
        
        message.textContent = "Player 1's turn";
        rollBtn.disabled = false;
    }
    
    // Event listeners
    rollBtn.addEventListener('click', rollDice);
    resetBtn.addEventListener('click', resetGame);
    
    // Add rolling animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rolling {
            0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
            25% { transform: rotateX(90deg) rotateY(180deg) rotateZ(45deg); }
            50% { transform: rotateX(180deg) rotateY(360deg) rotateZ(90deg); }
            75% { transform: rotateX(270deg) rotateY(540deg) rotateZ(135deg); }
            100% { transform: rotateX(360deg) rotateY(720deg) rotateZ(180deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize game
    resetGame();
});