let displayValue = '';

function appendToDisplay(value) {
    // Operatör girilmişse ve ekranda değer yoksa işlemi iptal et
    if (['+', '-', '*', '/'].includes(value) && displayValue === '') {
        return;
    }
    
    // Ardışık operatör girişini engelle
    const lastChar = displayValue.slice(-1);
    if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastChar)) {
        displayValue = displayValue.slice(0, -1) + value;
    } else {
        displayValue += value;
    }
    
    document.getElementById('result').value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('result').value = displayValue;
}

function calculate() {
    try {
        // Operatör önceliğini sağlamak için eval kullanıyoruz
        // Güvenlik açısından, gerçek uygulamalarda eval yerine daha güvenli yöntemler tercih edilmelidir
        const result = eval(displayValue);
        displayValue = result.toString();
        document.getElementById('result').value = displayValue;
    } catch (error) {
        document.getElementById('result').value = 'Hata';
        setTimeout(() => {
            clearDisplay();
        }, 1000);
    }
}

// Klavye desteği ekleme
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        displayValue = displayValue.slice(0, -1);
        document.getElementById('result').value = displayValue;
    }
});