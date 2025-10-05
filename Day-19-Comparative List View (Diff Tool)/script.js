// script.js
document.addEventListener('DOMContentLoaded', function() {
    const oldTextArea = document.getElementById('oldText');
    const newTextArea = document.getElementById('newText');
    const compareBtn = document.getElementById('compareBtn');
    const oldResult = document.getElementById('oldResult');
    const newResult = document.getElementById('newResult');
    
    // Örnek metinler
    oldTextArea.value = "Bu bir örnek metindir.\nİkinci satır.\nÜçüncü satır.\nDördüncü satır.";
    newTextArea.value = "Bu bir örnek metindir.\nİkinci satır değişti.\nYeni satır eklendi.\nDördüncü satır.";
    
    // Karşılaştırma butonuna tıklama olayı
    compareBtn.addEventListener('click', compareTexts);
    
    // Senkronize kaydırma işlevi
    oldResult.addEventListener('scroll', function() {
        newResult.scrollTop = this.scrollTop;
        newResult.scrollLeft = this.scrollLeft;
    });
    
    newResult.addEventListener('scroll', function() {
        oldResult.scrollTop = this.scrollTop;
        oldResult.scrollLeft = this.scrollLeft;
    });
    
    // İlk yüklemede karşılaştırma yap
    compareTexts();
    
    function compareTexts() {
        const oldText = cleanText(oldTextArea.value);
        const newText = cleanText(newTextArea.value);
        
        const oldLines = oldText.split('\n');
        const newLines = newText.split('\n');
        
        // Karşılaştırma sonuçlarını temizle
        oldResult.innerHTML = '';
        newResult.innerHTML = '';
        
        // Basit karşılaştırma algoritması
        let oldIndex = 0;
        let newIndex = 0;
        
        while (oldIndex < oldLines.length || newIndex < newLines.length) {
            const oldLine = oldLines[oldIndex] || '';
            const newLine = newLines[newIndex] || '';
            
            if (oldLine === newLine) {
                // Satırlar aynı
                appendLine(oldResult, oldIndex + 1, oldLine, 'unchanged');
                appendLine(newResult, newIndex + 1, newLine, 'unchanged');
                oldIndex++;
                newIndex++;
            } else {
                // Satırlar farklı
                // Eski metinde silinen satır
                if (oldIndex < oldLines.length && 
                    (newIndex >= newLines.length || 
                     oldLines[oldIndex] !== newLines[newIndex])) {
                    appendLine(oldResult, oldIndex + 1, oldLine, 'removed');
                    appendLine(newResult, newIndex + 1, '', 'empty-line');
                    oldIndex++;
                }
                // Yeni metinde eklenen satır
                else if (newIndex < newLines.length && 
                         (oldIndex >= oldLines.length || 
                          oldLines[oldIndex] !== newLines[newIndex])) {
                    appendLine(oldResult, oldIndex + 1, '', 'empty-line');
                    appendLine(newResult, newIndex + 1, newLine, 'added');
                    newIndex++;
                }
            }
        }
    }
    
    function cleanText(text) {
        // Gereksiz boşlukları ve satır sonlarını temizle
        return text.replace(/\r\n/g, '\n')  // Windows satır sonlarını Unix'e dönüştür
                   .replace(/\r/g, '\n')    // Eski Mac satır sonlarını Unix'e dönüştür
                   .replace(/\n+/g, '\n')   // Ardışık satır sonlarını tekilleştir
                   .replace(/^\s+|\s+$/g, ''); // Baştaki ve sondaki boşlukları kaldır
    }
    
    function appendLine(container, lineNumber, text, className) {
        const lineDiv = document.createElement('div');
        lineDiv.className = `line ${className}`;
        
        const numberSpan = document.createElement('span');
        numberSpan.className = 'line-number';
        numberSpan.textContent = lineNumber;
        
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        
        lineDiv.appendChild(numberSpan);
        lineDiv.appendChild(textSpan);
        container.appendChild(lineDiv);
    }
});