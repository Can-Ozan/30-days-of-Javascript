document.addEventListener('DOMContentLoaded', () => {
    // Oyun değişkenleri
    const gameBoard = document.getElementById('game-board');
    const movesCount = document.getElementById('moves-count');
    const timerElement = document.getElementById('time');
    const restartButton = document.getElementById('restart');
    const message = document.getElementById('message');
    const finalMoves = document.getElementById('final-moves');
    const finalTime = document.getElementById('final-time');
    const playAgainButton = document.getElementById('play-again');
    
    let cards = [];
    let flippedCards = [];
    let moves = 0;
    let matchedPairs = 0;
    let timer = 0;
    let timerInterval;
    let gameStarted = false;
    
    // Kart sembolleri
    const symbols = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🍑', '🥝'];
    
    // Oyunu başlat
    function initGame() {
        // Önceki durumu temizle
        clearInterval(timerInterval);
        gameBoard.innerHTML = '';
        cards = [];
        flippedCards = [];
        moves = 0;
        matchedPairs = 0;
        timer = 0;
        gameStarted = false;
        
        // Skor ve zamanı güncelle
        movesCount.textContent = moves;
        timerElement.textContent = timer;
        
        // Kartları oluştur
        const gameSymbols = [...symbols, ...symbols];
        shuffleArray(gameSymbols);
        
        gameSymbols.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = index;
            
            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.textContent = symbol;
            
            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            
            card.appendChild(cardFront);
            card.appendChild(cardBack);
            
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
            
            cards.push({
                element: card,
                symbol: symbol,
                flipped: false,
                matched: false
            });
        });
        
        // Mesajı gizle
        message.style.display = 'none';
    }
    
    // Diziyi karıştır
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Kart çevirme
    function flipCard() {
        // Oyun başlamadıysa zamanlayıcıyı başlat
        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }
        
        const cardIndex = parseInt(this.dataset.index);
        const card = cards[cardIndex];
        
        // Eğer kart zaten çevrildiyse veya eşleştiyse veya iki kart zaten çevrildiyse işlem yapma
        if (card.flipped || card.matched || flippedCards.length === 2) {
            return;
        }
        
        // Kartı çevir
        card.flipped = true;
        card.element.classList.add('flipped');
        flippedCards.push(card);
        
        // İki kart çevrildi mi kontrol et
        if (flippedCards.length === 2) {
            moves++;
            movesCount.textContent = moves;
            
            // Kartları karşılaştır
            checkForMatch();
        }
    }
    
    // Eşleşme kontrolü
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.symbol === card2.symbol) {
            // Eşleşme bulundu
            card1.matched = true;
            card2.matched = true;
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            
            matchedPairs++;
            
            // Tüm çiftler eşleşti mi kontrol et
            if (matchedPairs === symbols.length) {
                endGame();
            }
            
            flippedCards = [];
        } else {
            // Eşleşme yok, kartları geri çevir
            setTimeout(() => {
                card1.flipped = false;
                card2.flipped = false;
                card1.element.classList.remove('flipped');
                card2.element.classList.remove('flipped');
                
                flippedCards = [];
            }, 1000);
        }
    }
    
    // Zamanlayıcıyı başlat
    function startTimer() {
        timerInterval = setInterval(() => {
            timer++;
            timerElement.textContent = timer;
        }, 1000);
    }
    
    // Oyunu bitir
    function endGame() {
        clearInterval(timerInterval);
        
        // Sonuçları göster
        finalMoves.textContent = moves;
        finalTime.textContent = timer;
        message.style.display = 'flex';
    }
    
    // Yeniden başlat butonu
    restartButton.addEventListener('click', initGame);
    
    // Tekrar oyna butonu
    playAgainButton.addEventListener('click', initGame);
    
    // Oyunu başlat
    initGame();
});