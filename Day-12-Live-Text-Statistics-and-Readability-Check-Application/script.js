// script.js
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const wordCountElement = document.getElementById('word-count');
    const charCountElement = document.getElementById('char-count');
    const sentenceCountElement = document.getElementById('sentence-count');
    const paragraphCountElement = document.getElementById('paragraph-count');
    const avgWordLengthElement = document.getElementById('avg-word-length');
    const readingTimeElement = document.getElementById('reading-time');
    const readabilityScoreElement = document.getElementById('readability-score');
    const readabilityDescriptionElement = document.getElementById('readability-description');

    // Metin değiştiğinde analiz yap
    textInput.addEventListener('input', analyzeText);

    function analyzeText() {
        const text = textInput.value.trim();
        
        // Temel istatistikleri hesapla
        const wordCount = countWords(text);
        const charCount = countCharacters(text);
        const sentenceCount = countSentences(text);
        const paragraphCount = countParagraphs(text);
        const avgWordLength = calculateAverageWordLength(text);
        const readingTime = calculateReadingTime(wordCount);
        const readabilityScore = calculateFleschKincaid(text);
        
        // İstatistikleri göster
        wordCountElement.textContent = wordCount;
        charCountElement.textContent = charCount;
        sentenceCountElement.textContent = sentenceCount;
        paragraphCountElement.textContent = paragraphCount;
        avgWordLengthElement.textContent = avgWordLength.toFixed(1);
        readingTimeElement.textContent = readingTime;
        readabilityScoreElement.textContent = readabilityScore.toFixed(1);
        
        // Okunabilirlik açıklamasını güncelle
        updateReadabilityDescription(readabilityScore);
        
        // Skor çemberini güncelle
        updateScoreCircle(readabilityScore);
    }
    
    function countWords(text) {
        if (text.length === 0) return 0;
        // Kelimeleri boşluklara göre ayır ve boş olmayanları say
        return text.split(/\s+/).filter(word => word.length > 0).length;
    }
    
    function countCharacters(text) {
        return text.length;
    }
    
    function countSentences(text) {
        if (text.length === 0) return 0;
        // Cümleleri nokta, soru işareti, ünlem işaretine göre ayır
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        return sentences.length;
    }
    
    function countParagraphs(text) {
        if (text.length === 0) return 0;
        // Paragrafları yeni satırlara göre ayır
        const paragraphs = text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0);
        return paragraphs.length;
    }
    
    function calculateAverageWordLength(text) {
        const words = text.split(/\s+/).filter(word => word.length > 0);
        if (words.length === 0) return 0;
        
        const totalLength = words.reduce((total, word) => total + word.length, 0);
        return totalLength / words.length;
    }
    
    function calculateReadingTime(wordCount) {
        // Ortalama okuma hızı: 200 kelime/dakika
        const wordsPerMinute = 200;
        const minutes = wordCount / wordsPerMinute;
        
        if (minutes < 1) {
            return "< 1 dk";
        } else if (minutes < 60) {
            return `${Math.ceil(minutes)} dk`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = Math.ceil(minutes % 60);
            return `${hours} sa ${remainingMinutes} dk`;
        }
    }
    
    function calculateFleschKincaid(text) {
        if (text.length === 0) return 0;
        
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        
        if (words.length === 0 || sentences.length === 0) return 0;
        
        // Hece sayısını tahmin etmek için basit bir yöntem
        let syllableCount = 0;
        words.forEach(word => {
            syllableCount += estimateSyllables(word);
        });
        
        // Flesch-Kincaid formülü
        const score = 206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllableCount / words.length));
        
        // Skoru 0-100 arasında sınırla
        return Math.max(0, Math.min(100, score));
    }
    
    function estimateSyllables(word) {
        // Basit bir hece tahmin yöntemi
        word = word.toLowerCase().replace(/[^a-z]/g, '');
        if (word.length <= 3) return 1;
        
        // Sesli harfleri say (bazı istisnalar dışında)
        const vowels = word.match(/[aeiouyğüşıöç]/g);
        if (!vowels) return 1;
        
        let count = vowels.length;
        
        // Son 'e' harfi genellikle hece oluşturmaz
        if (word.endsWith('e')) count--;
        
        // Ardışık sesli harfler tek hece sayılır
        for (let i = 1; i < word.length; i++) {
            if (isVowel(word[i]) && isVowel(word[i-1])) count--;
        }
        
        return Math.max(1, count);
    }
    
    function isVowel(char) {
        return /[aeiouyğüşıöç]/i.test(char);
    }
    
    function updateReadabilityDescription(score) {
        let description = "";
        
        if (score >= 90) {
            description = "Çok kolay: 5. sınıf öğrencisi tarafından anlaşılabilir.";
        } else if (score >= 80) {
            description = "Kolay: 6. sınıf öğrencisi tarafından anlaşılabilir.";
        } else if (score >= 70) {
            description = "Oldukça kolay: 7. sınıf öğrencisi tarafından anlaşılabilir.";
        } else if (score >= 60) {
            description = "Standart: 8-9. sınıf öğrencisi tarafından anlaşılabilir.";
        } else if (score >= 50) {
            description = "Biraz zor: 10-12. sınıf öğrencisi tarafından anlaşılabilir.";
        } else if (score >= 30) {
            description = "Zor: Üniversite öğrencisi tarafından anlaşılabilir.";
        } else {
            description = "Çok zor: Üniversite mezunu tarafından anlaşılabilir.";
        }
        
        readabilityDescriptionElement.textContent = description;
    }
    
    function updateScoreCircle(score) {
        const scoreCircle = document.querySelector('.score-circle');
        // Skora göre gradient pozisyonunu ayarla (0-100 arası)
        const percentage = score;
        scoreCircle.style.background = `conic-gradient(#e74c3c 0%, #f39c12 30%, #f1c40f 60%, #2ecc71 100%)`;
    }
});