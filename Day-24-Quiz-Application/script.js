// Quiz verileri
const quizData = [
    {
        question: "Türkiye'nin başkenti neresidir?",
        options: ["İstanbul", "Ankara", "İzmir", "Bursa"],
        correctAnswer: 1
    },
    {
        question: "Aşağıdakilerden hangisi bir programlama dili değildir?",
        options: ["Python", "Java", "HTML", "C++"],
        correctAnswer: 2
    },
    {
        question: "Dünyanın en büyük okyanusu hangisidir?",
        options: ["Atlas Okyanusu", "Hint Okyanusu", "Arktik Okyanusu", "Pasifik Okyanusu"],
        correctAnswer: 3
    },
    {
        question: "Hangi elementin kimyasal sembolü 'Au'dur?",
        options: ["Gümüş", "Altın", "Alüminyum", "Argon"],
        correctAnswer: 1
    },
    {
        question: "Mona Lisa tablosu kime aittir?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2
    },
    {
        question: "Hangisi bir gezegen değildir?",
        options: ["Mars", "Jüpiter", "Plüton", "Ay"],
        correctAnswer: 3
    },
    {
        question: "İnsan vücudunda kaç kromozom bulunur?",
        options: ["23", "46", "64", "32"],
        correctAnswer: 1
    },
    {
        question: "Hangi ülke Eiffel Kulesi'ne ev sahipliği yapar?",
        options: ["İtalya", "Almanya", "Fransa", "İspanya"],
        correctAnswer: 2
    },
    {
        question: "Hangisi bir yazılım geliştirme metodolojisidir?",
        options: ["Scrum", "Kanban", "Agile", "Hepsi"],
        correctAnswer: 3
    },
    {
        question: "Hangi hayvan dünyanın en hızlı kara hayvanıdır?",
        options: ["Aslan", "Çita", "Leopar", "Antilop"],
        correctAnswer: 1
    }
];

// Değişkenler
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let userAnswers = [];

// DOM Elementleri
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const reviewScreen = document.getElementById('review-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');
const backToResultsBtn = document.getElementById('back-to-results');

const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-btn');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const currentScoreElement = document.getElementById('current-score');
const timeLeftElement = document.getElementById('time-left');
const finalScoreElement = document.getElementById('final-score');
const maxScoreElement = document.getElementById('max-score');
const resultMessageElement = document.getElementById('result-message');
const reviewContainer = document.getElementById('review-container');

// Event Listener'lar
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
reviewBtn.addEventListener('click', showReview);
backToResultsBtn.addEventListener('click', backToResults);

// Quiz'i başlat
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    totalQuestionsElement.textContent = quizData.length;
    currentScoreElement.textContent = score;
    
    loadQuestion();
    startTimer();
}

// Soruyu yükle
function loadQuestion() {
    resetOptions();
    nextBtn.disabled = true;
    
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    optionButtons.forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
    });
    
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    timeLeft = 15;
    timeLeftElement.textContent = timeLeft;
    
    // Seçeneklere tıklama event'leri ekle
    optionButtons.forEach(button => {
        button.addEventListener('click', selectOption);
    });
}

// Seçenek seçme
function selectOption(e) {
    const selectedButton = e.target;
    const selectedIndex = parseInt(selectedButton.dataset.index);
    
    // Tüm seçeneklerin seçili durumunu kaldır
    resetOptions();
    
    // Seçili seçeneği işaretle
    selectedButton.classList.add('selected');
    
    // Kullanıcının cevabını kaydet
    userAnswers[currentQuestionIndex] = selectedIndex;
    
    // Doğru cevabı kontrol et
    const isCorrect = selectedIndex === quizData[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
        score++;
        currentScoreElement.textContent = score;
    }
    
    // Tüm seçenekleri renklendir
    optionButtons.forEach(button => {
        const index = parseInt(button.dataset.index);
        if (index === quizData[currentQuestionIndex].correctAnswer) {
            button.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            button.classList.add('incorrect');
        }
        
        // Seçeneklere tıklamayı devre dışı bırak
        button.removeEventListener('click', selectOption);
    });
    
    // Timer'ı durdur
    clearInterval(timer);
    
    // Sonraki soru butonunu aktif et
    nextBtn.disabled = false;
}

// Seçenekleri sıfırla
function resetOptions() {
    optionButtons.forEach(button => {
        button.classList.remove('selected', 'correct', 'incorrect');
    });
}

// Timer başlat
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timeLeftElement.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Süre dolduğunda otomatik olarak sonraki soruya geç
            if (currentQuestionIndex < quizData.length - 1) {
                nextQuestion();
            } else {
                finishQuiz();
            }
        }
    }, 1000);
}

// Sonraki soru
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        startTimer();
    } else {
        finishQuiz();
    }
}

// Quiz'i bitir
function finishQuiz() {
    clearInterval(timer);
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    finalScoreElement.textContent = score;
    maxScoreElement.textContent = quizData.length;
    
    // Sonuç mesajını belirle
    const percentage = (score / quizData.length) * 100;
    let message = "";
    
    if (percentage >= 90) {
        message = "Mükemmel! Harika bir performans gösterdiniz!";
    } else if (percentage >= 70) {
        message = "Çok iyi! Oldukça başarılısınız!";
    } else if (percentage >= 50) {
        message = "İyi! Daha fazla çalışarak daha iyi olabilirsiniz.";
    } else {
        message = "Daha fazla çalışmanız gerekiyor. Pes etmeyin!";
    }
    
    resultMessageElement.textContent = message;
}

// Quiz'i yeniden başlat
function restartQuiz() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
}

// Cevapları incele
function showReview() {
    resultScreen.classList.remove('active');
    reviewScreen.classList.add('active');
    
    reviewContainer.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        const questionElement = document.createElement('div');
        questionElement.className = 'review-question';
        questionElement.textContent = `${index + 1}. ${question.question}`;
        
        const userAnswerElement = document.createElement('div');
        userAnswerElement.className = 'review-answer';
        
        const userAnswerIndex = userAnswers[index];
        const userAnswerText = userAnswerIndex !== undefined ? 
            question.options[userAnswerIndex] : 'Cevaplanmadı';
        
        const isCorrect = userAnswerIndex === question.correctAnswer;
        
        userAnswerElement.innerHTML = `Sizin Cevabınız: <span class="user-answer ${isCorrect ? 'correct' : 'incorrect'}">${userAnswerText}</span>`;
        
        const correctAnswerElement = document.createElement('div');
        correctAnswerElement.className = 'review-answer correct-answer';
        correctAnswerElement.textContent = `Doğru Cevap: ${question.options[question.correctAnswer]}`;
        
        reviewItem.appendChild(questionElement);
        reviewItem.appendChild(userAnswerElement);
        
        if (!isCorrect) {
            reviewItem.appendChild(correctAnswerElement);
        }
        
        reviewContainer.appendChild(reviewItem);
    });
}

// Sonuçlara dön
function backToResults() {
    reviewScreen.classList.remove('active');
    resultScreen.classList.add('active');
}