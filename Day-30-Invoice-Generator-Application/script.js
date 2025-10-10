document.addEventListener('DOMContentLoaded', function() {
    // DOM elementleri
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const addProductButton = document.getElementById('addProduct');
    const clearAllButton = document.getElementById('clearAll');
    const downloadPdfButton = document.getElementById('downloadPdf');
    const invoicePreview = document.getElementById('invoicePreview');
    
    // Ürün listesi
    let products = [];
    
    // Fatura numarası ve tarih
    let invoiceNumber = generateInvoiceNumber();
    let invoiceDate = new Date().toLocaleDateString('tr-TR');
    
    // Ürün ekleme işlevi
    addProductButton.addEventListener('click', function() {
        const name = productNameInput.value.trim();
        const price = parseFloat(productPriceInput.value);
        
        if (name && !isNaN(price) && price > 0) {
            products.push({ name, price });
            updateInvoicePreview();
            productNameInput.value = '';
            productPriceInput.value = '';
            productNameInput.focus();
        } else {
            alert('Lütfen geçerli bir ürün adı ve fiyat girin.');
        }
    });
    
    // Enter tuşu ile ürün ekleme
    productPriceInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addProductButton.click();
        }
    });
    
    // Tümünü temizleme işlevi
    clearAllButton.addEventListener('click', function() {
        products = [];
        updateInvoicePreview();
    });
    
    // Fatura önizlemesini güncelleme
    function updateInvoicePreview() {
        if (products.length === 0) {
            invoicePreview.innerHTML = '<div class="empty-message">Henüz ürün eklenmedi. Faturanız burada görünecek.</div>';
            downloadPdfButton.disabled = true;
            return;
        }
        
        let total = 0;
        let tableRows = '';
        
        products.forEach((product, index) => {
            total += product.price;
            tableRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.price.toFixed(2)} ₺</td>
                </tr>
            `;
        });
        
        invoicePreview.innerHTML = `
            <div class="invoice-header">
                <div class="invoice-title">FATURA</div>
                <div class="invoice-details">
                    <p><strong>Fatura No:</strong> ${invoiceNumber}</p>
                    <p><strong>Tarih:</strong> ${invoiceDate}</p>
                </div>
            </div>
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ürün Adı</th>
                        <th>Fiyat</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
            <div class="invoice-total">
                Toplam: ${total.toFixed(2)} ₺
            </div>
        `;
        
        downloadPdfButton.disabled = false;
    }
    
    // Fatura numarası oluşturma
    function generateInvoiceNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `FTR-${year}${month}${day}-${random}`;
    }
    
    // PDF indirme işlevi
    downloadPdfButton.addEventListener('click', function() {
        // jsPDF kullanımı
        const { jsPDF } = window.jspdf;
        
        // HTML içeriğini canvas'a dönüştür
        html2canvas(invoicePreview).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190;
            const pageHeight = 295;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 10;
            
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            // Çok sayfalı destek
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // PDF'i indir
            pdf.save(`fatura-${invoiceNumber}.pdf`);
        });
    });
});