// Quiz sorularını içeren dizi
const questions = [
    {
        question: "Türkiye'nin başkenti neresidir?",
        options: ["İstanbul", "Ankara", "İzmir", "Bursa"],
        correct: 1
    },
    {
        question: "Aşağıdakilerden hangisi bir programlama dili değildir?",
        options: ["Python", "Java", "HTML", "C++"],
        correct: 2
    },
    {
        question: "Dünyanın en büyük okyanusu hangisidir?",
        options: ["Atlas Okyanusu", "Hint Okyanusu", "Kuzey Buz Denizi", "Büyük Okyanus"],
        correct: 3
    },
    {
        question: "Hangi elementin sembolü 'Au'dur?",
        options: ["Gümüş", "Altın", "Alüminyum", "Argon"],
        correct: 1
    },
    {
        question: "Mona Lisa tablosu kime aittir?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    }
];

// Değişkenler
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let answered = false;

// DOM elementleri
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const progressElement = document.getElementById('progress');
const feedbackElement = document.getElementById('feedback');
const finalScoreElement = document.getElementById('final-score');
const correctAnswersElement = document.getElementById('correct-answers');
const totalQuestionsElement = document.getElementById('total-questions');

// Olay dinleyicileri
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

// Quiz'i başlatma fonksiyonu
function startQuiz() {
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    currentQuestion = 0;
    score = 0;
    
    loadQuestion();
    updateScore();
    startTimer();
}

// Soruyu yükleme fonksiyonu
function loadQuestion() {
    answered = false;
    timeLeft = 30;
    timeElement.textContent = timeLeft;
    
    // İlerleme çubuğunu güncelle
    const progressPercentage = (currentQuestion / questions.length) * 100;
    progressElement.style.width = `${progressPercentage}%`;
    
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    
    // Önceki seçenekleri temizle
    optionsElement.innerHTML = '';
    
    // Yeni seçenekleri ekle
    question.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        optionsElement.appendChild(button);
    });
    
    // Geri bildirim alanını temizle
    feedbackElement.textContent = '';
}

// Cevap kontrol fonksiyonu
function checkAnswer(selectedIndex) {
    if (answered) return;
    
    answered = true;
    clearInterval(timer);
    
    const question = questions[currentQuestion];
    const options = optionsElement.querySelectorAll('.option');
    
    // Doğru ve yanlış cevapları işaretle
    options[question.correct].classList.add('correct');
    
    if (selectedIndex !== question.correct) {
        options[selectedIndex].classList.add('wrong');
        feedbackElement.textContent = "Yanlış cevap!";
        feedbackElement.style.color = "#e74c3c";
    } else {
        score += 10;
        feedbackElement.textContent = "Doğru cevap! +10 puan";
        feedbackElement.style.color = "#2ecc71";
        updateScore();
    }
    
    // Sonraki soruya geç
    setTimeout(nextQuestion, 2000);
}

// Sonraki soruya geçme fonksiyonu
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
        startTimer();
    } else {
        showResults();
    }
}

// Zamanlayıcıyı başlatma fonksiyonu
function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timeElement.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answered) {
                feedbackElement.textContent = "Süre doldu!";
                feedbackElement.style.color = "#e74c3c";
                setTimeout(nextQuestion, 1500);
            }
        }
    }, 1000);
}

// Skoru güncelleme fonksiyonu
function updateScore() {
    scoreElement.textContent = score;
}

// Sonuçları gösterme fonksiyonu
function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    finalScoreElement.textContent = score;
    correctAnswersElement.textContent = score / 10;
    totalQuestionsElement.textContent = questions.length;
}

// Quiz'i yeniden başlatma fonksiyonu
function restartQuiz() {
    resultScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
}