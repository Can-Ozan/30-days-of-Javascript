// Durum makinesi sınıfı
class StateMachine {
    constructor() {
        this.states = {
            OFF: 'Kapalı',
            TURNING_ON: 'Açılıyor',
            ON: 'Açık',
            TURNING_OFF: 'Kapanıyor'
        };
        
        this.transitions = {
            [this.states.OFF]: {
                toggle: this.states.TURNING_ON
            },
            [this.states.TURNING_ON]: {
                complete: this.states.ON
            },
            [this.states.ON]: {
                toggle: this.states.TURNING_OFF
            },
            [this.states.TURNING_OFF]: {
                complete: this.states.OFF
            }
        };
        
        this.currentState = this.states.OFF;
        this.transitionHistory = [];
        
        // DOM elementleri
        this.lightElement = document.getElementById('light');
        this.currentStateElement = document.getElementById('currentState');
        this.stateDescriptionElement = document.getElementById('stateDescription');
        this.toggleButton = document.getElementById('toggleBtn');
        this.resetButton = document.getElementById('resetBtn');
        this.logListElement = document.getElementById('logList');
        
        // Olay dinleyicileri
        this.toggleButton.addEventListener('click', () => this.handleToggle());
        this.resetButton.addEventListener('click', () => this.reset());
        
        // Başlangıç durumunu ayarla
        this.updateUI();
    }
    
    // Geçiş işlemi
    transition(event) {
        const nextState = this.transitions[this.currentState][event];
        
        if (nextState) {
            const previousState = this.currentState;
            this.currentState = nextState;
            
            // Geçiş geçmişine ekle
            this.addToHistory(previousState, this.currentState, event);
            
            // UI'ı güncelle
            this.updateUI();
            
            // Animasyonlu durumlar için zamanlayıcı
            if (this.currentState === this.states.TURNING_ON) {
                setTimeout(() => {
                    this.transition('complete');
                }, 2000);
            } else if (this.currentState === this.states.TURNING_OFF) {
                setTimeout(() => {
                    this.transition('complete');
                }, 2000);
            }
            
            return true;
        }
        
        console.warn(`Geçersiz geçiş: ${this.currentState} -> ${event}`);
        return false;
    }
    
    // Anahtar işleme
    handleToggle() {
        if (this.currentState === this.states.OFF || this.currentState === this.states.ON) {
            this.transition('toggle');
        }
    }
    
    // UI güncelleme
    updateUI() {
        // Işık görünümünü güncelle
        this.lightElement.className = 'light';
        switch (this.currentState) {
            case this.states.OFF:
                this.lightElement.classList.add('off');
                this.toggleButton.textContent = 'Işığı Aç';
                this.stateDescriptionElement.textContent = 'Işık kapalı durumunda. Açmak için butona tıklayın.';
                break;
            case this.states.TURNING_ON:
                this.lightElement.classList.add('turning-on');
                this.toggleButton.textContent = 'Açılıyor...';
                this.toggleButton.disabled = true;
                this.stateDescriptionElement.textContent = 'Işık açılıyor. Lütfen bekleyin...';
                break;
            case this.states.ON:
                this.lightElement.classList.add('on');
                this.toggleButton.textContent = 'Işığı Kapat';
                this.toggleButton.disabled = false;
                this.stateDescriptionElement.textContent = 'Işık açık durumunda. Kapatmak için butona tıklayın.';
                break;
            case this.states.TURNING_OFF:
                this.lightElement.classList.add('turning-off');
                this.toggleButton.textContent = 'Kapanıyor...';
                this.toggleButton.disabled = true;
                this.stateDescriptionElement.textContent = 'Işık kapanıyor. Lütfen bekleyin...';
                break;
        }
        
        // Mevcut durumu güncelle
        this.currentStateElement.textContent = this.currentState;
    }
    
    // Geçiş geçmişine ekle
    addToHistory(fromState, toState, event) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = {
            timestamp,
            fromState,
            toState,
            event
        };
        
        this.transitionHistory.unshift(logEntry);
        
        // Geçmişi UI'da göster (son 5 kayıt)
        this.updateLog();
    }
    
    // Geçmiş günlüğünü güncelle
    updateLog() {
        this.logListElement.innerHTML = '';
        
        const recentLogs = this.transitionHistory.slice(0, 5);
        
        recentLogs.forEach(log => {
            const listItem = document.createElement('li');
            listItem.textContent = `${log.timestamp}: ${log.fromState} -> ${log.toState} (${log.event})`;
            this.logListElement.appendChild(listItem);
        });
    }
    
    // Durum makinesini sıfırla
    reset() {
        this.currentState = this.states.OFF;
        this.transitionHistory = [];
        this.updateUI();
        this.updateLog();
    }
    
    // Mevcut durumu döndür
    getCurrentState() {
        return this.currentState;
    }
    
    // Geçiş geçmişini döndür
    getTransitionHistory() {
        return this.transitionHistory;
    }
}

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    const stateMachine = new StateMachine();
    
    // Hata ayıklama için global erişim
    window.stateMachine = stateMachine;
});