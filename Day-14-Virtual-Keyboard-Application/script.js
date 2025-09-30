document.addEventListener('DOMContentLoaded', function() {
    const textArea = document.getElementById('textArea');
    const keys = document.querySelectorAll('.key');
    const clearBtn = document.getElementById('clearBtn');
    const toggleKeyboardBtn = document.getElementById('toggleKeyboard');
    const keyboard = document.querySelector('.keyboard');
    
    let isCapsLock = false;
    let isShift = false;
    
    // Klavye tuşlarına tıklama olayını dinle
    keys.forEach(key => {
        key.addEventListener('click', function() {
            const keyValue = this.getAttribute('data-key');
            
            // Özel tuşları kontrol et
            switch(keyValue) {
                case 'Backspace':
                    textArea.value = textArea.value.slice(0, -1);
                    break;
                case 'Tab':
                    textArea.value += '\t';
                    break;
                case 'Enter':
                    textArea.value += '\n';
                    break;
                case 'CapsLock':
                    toggleCapsLock();
                    break;
                case 'Shift':
                    toggleShift();
                    break;
                case ' ':
                    textArea.value += ' ';
                    break;
                default:
                    // Normal tuşlar için
                    if (isShift || isCapsLock) {
                        textArea.value += keyValue.toUpperCase();
                    } else {
                        textArea.value += keyValue.toLowerCase();
                    }
                    
                    // Shift tuşu geçici olduğu için bir kere kullanıldıktan sonra kapat
                    if (isShift) {
                        toggleShift();
                    }
            }
            
            // Textarea'ya odaklan
            textArea.focus();
        });
    });
    
    // Caps Lock işlevi
    function toggleCapsLock() {
        isCapsLock = !isCapsLock;
        const capsKey = document.querySelector('.caps');
        
        if (isCapsLock) {
            capsKey.classList.add('active');
            updateKeyLabels(true);
        } else {
            capsKey.classList.remove('active');
            updateKeyLabels(false);
        }
    }
    
    // Shift işlevi
    function toggleShift() {
        isShift = !isShift;
        const shiftKeys = document.querySelectorAll('.shift');
        
        if (isShift) {
            shiftKeys.forEach(key => key.classList.add('active'));
            updateKeyLabels(true);
        } else {
            shiftKeys.forEach(key => key.classList.remove('active'));
            updateKeyLabels(false);
        }
    }
    
    // Tuş etiketlerini güncelle
    function updateKeyLabels(isUpperCase) {
        const letterKeys = document.querySelectorAll('.key:not(.backspace):not(.tab):not(.caps):not(.enter):not(.shift):not(.space)');
        
        letterKeys.forEach(key => {
            const keyValue = key.getAttribute('data-key');
            if (keyValue.length === 1 && /[a-zA-Z]/.test(keyValue)) {
                key.textContent = isUpperCase ? keyValue.toUpperCase() : keyValue.toLowerCase();
            }
        });
    }
    
    // Temizle butonu
    clearBtn.addEventListener('click', function() {
        textArea.value = '';
        textArea.focus();
    });
    
    // Klavyeyi gizle/göster butonu
    toggleKeyboardBtn.addEventListener('click', function() {
        if (keyboard.style.display === 'none') {
            keyboard.style.display = 'block';
            toggleKeyboardBtn.textContent = 'Klavyeyi Gizle';
        } else {
            keyboard.style.display = 'none';
            toggleKeyboardBtn.textContent = 'Klavyeyi Göster';
        }
    });
    
    // Gerçek klavye kullanımını dinle
    document.addEventListener('keydown', function(e) {
        // Gerçek klavye kullanıldığında sanal klavyedeki tuşları vurgula
        const virtualKey = document.querySelector(`.key[data-key="${e.key}"]`);
        if (virtualKey) {
            virtualKey.classList.add('active');
        }
        
        // Caps Lock durumunu takip et
        if (e.key === 'CapsLock') {
            isCapsLock = !isCapsLock;
            const capsKey = document.querySelector('.caps');
            
            if (isCapsLock) {
                capsKey.classList.add('active');
                updateKeyLabels(true);
            } else {
                capsKey.classList.remove('active');
                updateKeyLabels(false);
            }
        }
        
        // Shift tuşunu takip et
        if (e.key === 'Shift') {
            isShift = true;
            const shiftKeys = document.querySelectorAll('.shift');
            shiftKeys.forEach(key => key.classList.add('active'));
            updateKeyLabels(true);
        }
    });
    
    document.addEventListener('keyup', function(e) {
        // Tuş bırakıldığında vurgulamayı kaldır
        const virtualKey = document.querySelector(`.key[data-key="${e.key}"]`);
        if (virtualKey) {
            virtualKey.classList.remove('active');
        }
        
        // Shift tuşunu takip et
        if (e.key === 'Shift') {
            isShift = false;
            const shiftKeys = document.querySelectorAll('.shift');
            shiftKeys.forEach(key => key.classList.remove('active'));
            
            // Caps Lock aktif değilse küçük harfe dön
            if (!isCapsLock) {
                updateKeyLabels(false);
            }
        }
    });
});