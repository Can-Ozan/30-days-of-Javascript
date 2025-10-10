document.addEventListener('DOMContentLoaded', function() {
    // Oyun değişkenleri
    let playerScore = 0;
    let computerScore = 0;
    const maxScore = 5;
    let gameOver = false;
    
    // DOM elementleri
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    const resultMessageElement = document.getElementById('result-message');
    const roundResultElement = document.getElementById('round-result');
    const playerSelectionElement = document.getElementById('player-selection');
    const computerSelectionElement = document.getElementById('computer-selection');
    const resetButton = document.getElementById('reset-btn');
    
    // Seçim butonları
    const choices = document.querySelectorAll('.choice');
    
    // Oyun seçenekleri
    const options = ['rock', 'paper', 'scissors'];
    
    // Seçim ikonları
    const icons = {
        rock: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xOC41LDEyQzE4LjUsMTUuNTksMTUuNTksMTguNSwxMiwxOC41QzguNDEsMTguNSw1LjUsMTUuNTksNS41LDEyQzUuNSw4LjQxLDguNDEsNS41LDEyLDUuNUMxNS41OSw1LjUsMTguNSw4LjQxLDE4LjUsMTJaIi8+PHBhdGggZD0iTTEyLDIyQzE3LjUyLDIyLDIyLDE3LjUyLDIyLDEyQzIyLDYuNDgsMTcuNTIsMiwxMiwyQzYuNDgsMiwyLDYuNDgsMiwxMkMyLDE3LjUyLDYuNDgsMjIsMTIsMjJaIi8+PC9zdmc+',
        paper: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xOSw5SDVWN0gxOVY5TTE5LDEzSDVWMTFIMTlWMTNNMTksMTdINVYxNUgxOVYxN00yMSw1SDNDMS44OSw1LDEsNS44OSwxLDdWMTdDMSwxOC4xLDEuOSwxOSwzLDE5SDIxQzIyLjEsMTksMjMsMTguMSwyMywxN1Y3QzIzLDUuODksMjIuMSw1LDIxLDVaIi8+PC9zdmc+',
        scissors: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0yMC41LDE2LjMxTDE1LjM2LDE0Ljk3TDE2LjY5LDEwLjM5TDIxLjgyLDExLjczTDIwLjUsMTYuMzFNNy4zMSw5LjVMMTIuMDMsMTIuNUw5LjUsMTcuNjlMNC43NywxNC42OUw3LjMxLDkuNU0xNC42OSw0Ljc3TDE3LjIzLDkuNUwxMi41LDEyLjVMMTAsNy4zMUwxNC42OSw0Ljc3TTYsMTRDNC4zNCwxNCwzLDE1LjM0LDMsMTdDMywxOC42Niw0LjM0LDIwLDYsMjBDNy42NiwyMCw5LDE4LjY2LDksMTdDOSwxNS4zNCw3LjY2LDE0LDYsMTRaIi8+PC9zdmc+',
        default: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiwyQTEwLDEwIDAgMCwwIDIsMTJBMTAsMTAgMCAwLDAgMTIsMjJBMTAsMTAgMCAwLDAgMjIsMTJBMTAsMTAgMCAwLDAgMTIsMk0xMiwyMEE4LDggMCAwLDEgNCwxMkE4LDggMCAwLDEgMTIsNEE4LDggMCAwLDEgMjAsMTJBOCw4IDAgMCwxIDEyLDIwWiIvPjwvc3ZnPg=='
    };
    
    // Oyun seçimlerini dinle
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            if (gameOver) return;
            
            const playerChoice = choice.id;
            playRound(playerChoice);
        });
    });
    
    // Yeniden başlat butonunu dinle
    resetButton.addEventListener('click', resetGame);
    
    // Oyun turu işlevi
    function playRound(playerChoice) {
        // Bilgisayarın seçimini rastgele yap
        const computerChoice = options[Math.floor(Math.random() * options.length)];
        
        // Seçimleri göster
        playerSelectionElement.src = icons[playerChoice];
        computerSelectionElement.src = icons[computerChoice];
        
        // Kazananı belirle
        let result;
        
        if (playerChoice === computerChoice) {
            result = 'Berabere!';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            result = 'Kazandın!';
            playerScore++;
        } else {
            result = 'Bilgisayar kazandı!';
            computerScore++;
        }
        
        // Sonuçları güncelle
        updateScore();
        roundResultElement.textContent = `${playerChoice} vs ${computerChoice}`;
        resultMessageElement.textContent = result;
        
        // Oyun bitti mi kontrol et
        checkGameOver();
    }
    
    // Skoru güncelle
    function updateScore() {
        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = computerScore;
    }
    
    // Oyun bitti mi kontrol et
    function checkGameOver() {
        if (playerScore >= maxScore || computerScore >= maxScore) {
            gameOver = true;
            
            if (playerScore > computerScore) {
                resultMessageElement.textContent = 'Tebrikler! Oyunu kazandın!';
            } else {
                resultMessageElement.textContent = 'Maalesef! Bilgisayar oyunu kazandı.';
            }
            
            roundResultElement.textContent = 'Yeniden başlatmak için butona tıklayın.';
        }
    }
    
    // Oyunu sıfırla
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        gameOver = false;
        
        updateScore();
        
        resultMessageElement.textContent = 'Bir seçim yapın!';
        roundResultElement.textContent = '';
        
        playerSelectionElement.src = icons.default;
        computerSelectionElement.src = icons.default;
    }
});