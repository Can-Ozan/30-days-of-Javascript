// Oyun değişkenleri
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// Mobil kontroller
const upBtn = document.getElementById('up-btn');
const downBtn = document.getElementById('down-btn');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');

// Oyun ayarları
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    {x: 10, y: 10}
];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameSpeed = 150;
let gameRunning = false;
let gameLoop;

// En yüksek skoru göster
highScoreElement.textContent = highScore;

// Yem oluştur
function createFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    // Yemin yılanın üzerinde oluşmamasını sağla
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            return createFood();
        }
    }
}

// Oyunu çiz
function drawGame() {
    // Arka planı temizle
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Yılanı çiz
    ctx.fillStyle = '#4CAF50';
    for (let segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    }
    
    // Yılanın başını farklı renkte çiz
    ctx.fillStyle = '#2E7D32';
    ctx.fillRect(snake[0].x * gridSize, snake[0].y * gridSize, gridSize - 2, gridSize - 2);
    
    // Yemi çiz
    ctx.fillStyle = '#f44336';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// Yılanı hareket ettir
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    // Duvara çarpma kontrolü
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    
    // Kendine çarpma kontrolü
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    // Yeni başı ekle
    snake.unshift(head);
    
    // Yem yendi mi?
    if (head.x === food.x && head.y === food.y) {
        // Skoru artır
        score += 10;
        scoreElement.textContent = score;
        
        // En yüksek skoru güncelle
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        // Yeni yem oluştur
        createFood();
        
        // Hızı artır (isteğe bağlı)
        if (gameSpeed > 50) {
            gameSpeed -= 2;
        }
    } else {
        // Yem yenmediyse kuyruğu kısalt
        snake.pop();
    }
}

// Oyun döngüsü
function gameUpdate() {
    moveSnake();
    drawGame();
}

// Oyunu başlat
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        
        // Yön tuşlarını sıfırla
        dx = 1;
        dy = 0;
        
        // Yem oluştur
        createFood();
        
        // Oyun döngüsünü başlat
        gameLoop = setInterval(gameUpdate, gameSpeed);
    }
}

// Oyunu duraklat
function pauseGame() {
    if (gameRunning) {
        gameRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        clearInterval(gameLoop);
    }
}

// Oyunu sıfırla
function resetGame() {
    pauseGame();
    
    // Oyun durumunu sıfırla
    snake = [{x: 10, y: 10}];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    gameSpeed = 150;
    
    // Ekranı temizle
    drawGame();
}

// Oyun bitti
function gameOver() {
    pauseGame();
    alert(`Oyun Bitti! Skorunuz: ${score}`);
    resetGame();
}

// Klavye kontrolleri
document.addEventListener('keydown', (e) => {
    // Yön tuşları
    if (e.key === 'ArrowUp' && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (e.key === 'ArrowDown' && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if (e.key === 'ArrowLeft' && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (e.key === 'ArrowRight' && dx !== -1) {
        dx = 1;
        dy = 0;
    }
    
    // Boşluk tuşu ile başlat/durdur
    if (e.key === ' ') {
        if (gameRunning) {
            pauseGame();
        } else {
            startGame();
        }
    }
});

// Buton event listener'ları
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
resetBtn.addEventListener('click', resetGame);

// Mobil kontroller
upBtn.addEventListener('click', () => {
    if (dy !== 1) {
        dx = 0;
        dy = -1;
    }
});

downBtn.addEventListener('click', () => {
    if (dy !== -1) {
        dx = 0;
        dy = 1;
    }
});

leftBtn.addEventListener('click', () => {
    if (dx !== 1) {
        dx = -1;
        dy = 0;
    }
});

rightBtn.addEventListener('click', () => {
    if (dx !== -1) {
        dx = 1;
        dy = 0;
    }
});

// Oyunu başlat
drawGame();