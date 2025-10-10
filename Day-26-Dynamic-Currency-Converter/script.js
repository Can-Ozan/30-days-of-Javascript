// script.js
document.addEventListener('DOMContentLoaded', function() {
    // API anahtarı (ücretsiz ExchangeRate-API kullanıyoruz)
    const API_KEY = 'dfb9be38a59af71292a751e8'; 
    const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;
    
    // DOM elementleri
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const swapButton = document.getElementById('swapCurrencies');
    const convertButton = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');
    const exchangeRateDiv = document.getElementById('exchangeRate');
    const lastUpdateSpan = document.getElementById('lastUpdate');
    
    // Döviz kurlarını saklamak için cache
    let exchangeRates = {};
    let baseCurrency = '';
    
    // Sayfa yüklendiğinde varsayılan döviz kurunu çek
    fetchExchangeRates('TRY');
    
    // Çevir butonuna tıklama olayı
    convertButton.addEventListener('click', convertCurrency);
    
    // Para birimlerini değiştirme butonu
    swapButton.addEventListener('click', swapCurrencies);
    
    // Kaynak para birimi değiştiğinde
    fromCurrencySelect.addEventListener('change', function() {
        const fromCurrency = this.value;
        fetchExchangeRates(fromCurrency);
    });
    
    // Miktar değiştiğinde otomatik çeviri
    amountInput.addEventListener('input', convertCurrency);
    
    // Hedef para birimi değiştiğinde çeviri
    toCurrencySelect.addEventListener('change', convertCurrency);
    
    // Döviz kurlarını API'den çekme fonksiyonu
    function fetchExchangeRates(base) {
        // API anahtarı kontrolü
        if (API_KEY === 'YOUR_API_KEY') {
            showError('Lütün geçerli bir API anahtarı ekleyin. ExchangeRate-API sitesinden ücretsiz alabilirsiniz.');
            return;
        }
        
        fetch(`${BASE_URL}${base}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('API isteği başarısız oldu');
                }
                return response.json();
            })
            .then(data => {
                if (data.result === 'success') {
                    exchangeRates = data.conversion_rates;
                    baseCurrency = data.base_code;
                    lastUpdateSpan.textContent = new Date(data.time_last_update_utc).toLocaleString('tr-TR');
                    convertCurrency(); // Yeni kurlarla çeviri yap
                } else {
                    throw new Error(data['error-type']);
                }
            })
            .catch(error => {
                console.error('Döviz kuru çekme hatası:', error);
                showError('Döviz kurları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                
                // Fallback: Varsayılan kurlar (API çalışmazsa)
                setFallbackRates();
            });
    }
    
    // Döviz çevirme fonksiyonu
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        
        if (isNaN(amount) || amount < 0) {
            resultDiv.textContent = 'Geçersiz miktar';
            exchangeRateDiv.textContent = '';
            return;
        }
        
        // Aynı para birimleri seçilmişse
        if (fromCurrency === toCurrency) {
            resultDiv.textContent = `${formatCurrency(amount, toCurrency)}`;
            exchangeRateDiv.textContent = `1 ${fromCurrency} = 1 ${toCurrency}`;
            return;
        }
        
        // Base currency farklıysa API'den yeniden çek
        if (baseCurrency !== fromCurrency) {
            fetchExchangeRates(fromCurrency);
            return;
        }
        
        // Çeviri işlemi
        const rate = exchangeRates[toCurrency];
        if (rate) {
            const convertedAmount = amount * rate;
            resultDiv.textContent = `${formatCurrency(convertedAmount, toCurrency)}`;
            exchangeRateDiv.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
        } else {
            resultDiv.textContent = 'Kur bilgisi bulunamadı';
            exchangeRateDiv.textContent = '';
        }
    }
    
    // Para birimlerini değiştirme fonksiyonu
    function swapCurrencies() {
        const fromValue = fromCurrencySelect.value;
        const toValue = toCurrencySelect.value;
        
        fromCurrencySelect.value = toValue;
        toCurrencySelect.value = fromValue;
        
        // Yeni base currency ile kurları çek
        fetchExchangeRates(fromCurrencySelect.value);
    }
    
    // Para birimi formatlama fonksiyonu
    function formatCurrency(amount, currency) {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }
    
    // Hata gösterimi
    function showError(message) {
        resultDiv.textContent = 'Hata';
        exchangeRateDiv.textContent = message;
        resultDiv.style.color = 'red';
    }
    
    // API çalışmazsa kullanılacak varsayılan kurlar
    function setFallbackRates() {
        // Bu kurlar yaklaşık değerlerdir, gerçek zamanlı değildir
        const fallbackRates = {
            'USD': 1,
            'EUR': 0.92,
            'GBP': 0.79,
            'TRY': 32.5,
            'JPY': 150.25,
            'CAD': 1.36,
            'AUD': 1.52,
            'CHF': 0.88
        };
        
        exchangeRates = fallbackRates;
        baseCurrency = 'USD';
        lastUpdateSpan.textContent = 'Varsayılan kullanılıyor - ' + new Date().toLocaleString('tr-TR');
        convertCurrency();
    }
});