// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Değişkenler
    let formElements = [];
    let selectedElement = null;
    let draggedElement = null;
    
    // DOM Elementleri
    const toolboxItems = document.querySelectorAll('.toolbox-item');
    const formPreview = document.getElementById('form-preview');
    const propertiesContent = document.getElementById('properties-content');
    const previewBtn = document.getElementById('preview-btn');
    const exportBtn = document.getElementById('export-btn');
    const clearBtn = document.getElementById('clear-btn');
    const previewModal = document.getElementById('preview-modal');
    const codeModal = document.getElementById('code-modal');
    const previewForm = document.getElementById('preview-form');
    const htmlCode = document.getElementById('html-code');
    const copyBtn = document.getElementById('copy-btn');
    const closeButtons = document.querySelectorAll('.close');
    
    // Form elemanı tipleri ve şablonları
    const elementTemplates = {
        text: {
            label: 'Metin Alanı',
            type: 'text',
            placeholder: 'Metin giriniz'
        },
        email: {
            label: 'E-posta',
            type: 'email',
            placeholder: 'E-posta adresinizi giriniz'
        },
        number: {
            label: 'Sayı',
            type: 'number',
            placeholder: 'Sayı giriniz'
        },
        textarea: {
            label: 'Metin Kutusu',
            type: 'textarea',
            placeholder: 'Metin giriniz'
        },
        select: {
            label: 'Açılır Liste',
            type: 'select',
            options: ['Seçenek 1', 'Seçenek 2', 'Seçenek 3']
        },
        checkbox: {
            label: 'Onay Kutusu',
            type: 'checkbox',
            text: 'Seçenek'
        },
        radio: {
            label: 'Radyo Düğmesi',
            type: 'radio',
            options: ['Seçenek 1', 'Seçenek 2', 'Seçenek 3']
        },
        date: {
            label: 'Tarih',
            type: 'date'
        },
        file: {
            label: 'Dosya Yükleme',
            type: 'file'
        },
        button: {
            label: 'Buton',
            type: 'button',
            value: 'Gönder'
        }
    };
    
    // Araç kutusu elemanlarına sürükleme olayını ekle
    toolboxItems.forEach(item => {
        item.setAttribute('draggable', 'true');
        
        item.addEventListener('dragstart', function(e) {
            draggedElement = e.target.dataset.type;
            e.dataTransfer.setData('text/plain', e.target.dataset.type);
            e.dataTransfer.effectAllowed = 'copy';
            this.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            draggedElement = null;
        });
    });
    
    // Form önizleme alanına sürükleme olaylarını ekle
    formPreview.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        this.classList.add('drag-over');
        return false;
    });
    
    formPreview.addEventListener('dragenter', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    formPreview.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    formPreview.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const elementType = e.dataTransfer.getData('text/plain');
        if (elementType) {
            addFormElement(elementType);
        }
        return false;
    });
    
    // Alternatif olarak tıklama ile ekleme
    toolboxItems.forEach(item => {
        item.addEventListener('click', function() {
            addFormElement(this.dataset.type);
        });
    });
    
    // Form elemanı ekleme fonksiyonu
    function addFormElement(type) {
        const template = elementTemplates[type];
        const elementId = 'element_' + Date.now();
        
        const element = {
            id: elementId,
            type: type,
            label: template.label,
            required: false,
            placeholder: template.placeholder || '',
            options: template.options ? [...template.options] : [],
            value: template.value || '',
            text: template.text || ''
        };
        
        formElements.push(element);
        renderFormPreview();
        selectElement(elementId);
        
        // Başarı mesajı
        showMessage(`${template.label} form alanına eklendi`, 'success');
    }
    
    // Form önizlemesini oluştur
    function renderFormPreview() {
        formPreview.innerHTML = '';
        
        if (formElements.length === 0) {
            formPreview.innerHTML = '<p class="empty-message">Form elemanlarını buraya sürükleyin veya araç kutusundan tıklayarak ekleyin</p>';
            return;
        }
        
        formElements.forEach(element => {
            const elementDiv = document.createElement('div');
            elementDiv.className = 'form-element';
            elementDiv.dataset.id = element.id;
            
            if (selectedElement && selectedElement.id === element.id) {
                elementDiv.classList.add('selected');
            }
            
            let inputHtml = '';
            
            switch (element.type) {
                case 'text':
                case 'email':
                case 'number':
                case 'date':
                    inputHtml = `<input type="${element.type}" class="element-input" placeholder="${element.placeholder}" ${element.required ? 'required' : ''}>`;
                    break;
                case 'file':
                    inputHtml = `<input type="file" class="element-input" ${element.required ? 'required' : ''}>`;
                    break;
                case 'textarea':
                    inputHtml = `<textarea class="element-input" placeholder="${element.placeholder}" ${element.required ? 'required' : ''}></textarea>`;
                    break;
                case 'select':
                    inputHtml = `<select class="element-input" ${element.required ? 'required' : ''}>`;
                    element.options.forEach(option => {
                        inputHtml += `<option value="${option}">${option}</option>`;
                    });
                    inputHtml += '</select>';
                    break;
                case 'checkbox':
                    inputHtml = `<label class="checkbox-label">
                                <input type="checkbox" class="element-input" ${element.required ? 'required' : ''}>
                                <span>${element.text}</span>
                            </label>`;
                    break;
                case 'radio':
                    inputHtml = `<div class="radio-group">`;
                    element.options.forEach((option, index) => {
                        inputHtml += `<label class="radio-label">
                                    <input type="radio" name="${element.id}" value="${option}" ${index === 0 ? 'checked' : ''}>
                                    <span>${option}</span>
                                </label>`;
                    });
                    inputHtml += '</div>';
                    break;
                case 'button':
                    inputHtml = `<input type="button" class="element-input btn" value="${element.value}">`;
                    break;
            }
            
            elementDiv.innerHTML = `
                <span class="element-label">${element.label} ${element.required ? '*' : ''}</span>
                ${inputHtml}
                <div class="element-actions">
                    <button class="delete-btn" title="Sil">✕</button>
                </div>
            `;
            
            formPreview.appendChild(elementDiv);
            
            // Eleman seçme olayı
            elementDiv.addEventListener('click', function(e) {
                if (!e.target.classList.contains('delete-btn') && !e.target.classList.contains('element-input')) {
                    selectElement(element.id);
                }
            });
            
            // Silme butonu olayı
            const deleteBtn = elementDiv.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                deleteElement(element.id);
            });
        });
    }
    
    // Eleman seçme fonksiyonu
    function selectElement(elementId) {
        selectedElement = formElements.find(el => el.id === elementId);
        renderPropertiesPanel();
        renderFormPreview();
    }
    
    // Eleman silme fonksiyonu
    function deleteElement(elementId) {
        const elementIndex = formElements.findIndex(el => el.id === elementId);
        if (elementIndex !== -1) {
            const elementName = formElements[elementIndex].label;
            formElements.splice(elementIndex, 1);
            
            if (selectedElement && selectedElement.id === elementId) {
                selectedElement = null;
                renderPropertiesPanel();
            }
            
            renderFormPreview();
            showMessage(`${elementName} silindi`, 'info');
        }
    }
    
    // Özellikler panelini oluştur
    function renderPropertiesPanel() {
        propertiesContent.innerHTML = '';
        
        if (!selectedElement) {
            propertiesContent.innerHTML = '<p class="empty-message">Bir form elemanı seçin</p>';
            return;
        }
        
        const element = selectedElement;
        
        // Etiket özelliği
        const labelGroup = document.createElement('div');
        labelGroup.className = 'property-group';
        labelGroup.innerHTML = `
            <label for="prop-label">Etiket:</label>
            <input type="text" id="prop-label" value="${element.label}">
        `;
        propertiesContent.appendChild(labelGroup);
        
        // Zorunlu alan özelliği
        const requiredGroup = document.createElement('div');
        requiredGroup.className = 'property-group';
        requiredGroup.innerHTML = `
            <label for="prop-required">Zorunlu Alan:</label>
            <input type="checkbox" id="prop-required" ${element.required ? 'checked' : ''}>
        `;
        propertiesContent.appendChild(requiredGroup);
        
        // Placeholder özelliği (text, email, number, textarea için)
        if (['text', 'email', 'number', 'textarea'].includes(element.type)) {
            const placeholderGroup = document.createElement('div');
            placeholderGroup.className = 'property-group';
            placeholderGroup.innerHTML = `
                <label for="prop-placeholder">Placeholder:</label>
                <input type="text" id="prop-placeholder" value="${element.placeholder}">
            `;
            propertiesContent.appendChild(placeholderGroup);
        }
        
        // Metin özelliği (checkbox için)
        if (element.type === 'checkbox') {
            const textGroup = document.createElement('div');
            textGroup.className = 'property-group';
            textGroup.innerHTML = `
                <label for="prop-text">Checkbox Metni:</label>
                <input type="text" id="prop-text" value="${element.text}">
            `;
            propertiesContent.appendChild(textGroup);
        }
        
        // Seçenekler özelliği (select, radio için)
        if (['select', 'radio'].includes(element.type)) {
            const optionsGroup = document.createElement('div');
            optionsGroup.className = 'property-group';
            optionsGroup.innerHTML = `
                <label for="prop-options">Seçenekler (her satıra bir seçenek):</label>
                <textarea id="prop-options">${element.options.join('\n')}</textarea>
            `;
            propertiesContent.appendChild(optionsGroup);
        }
        
        // Buton değeri özelliği (button için)
        if (element.type === 'button') {
            const valueGroup = document.createElement('div');
            valueGroup.className = 'property-group';
            valueGroup.innerHTML = `
                <label for="prop-value">Buton Metni:</label>
                <input type="text" id="prop-value" value="${element.value}">
            `;
            propertiesContent.appendChild(valueGroup);
        }
        
        // Özellik değişikliklerini dinle
        document.getElementById('prop-label').addEventListener('input', function() {
            element.label = this.value;
            renderFormPreview();
        });
        
        document.getElementById('prop-required').addEventListener('change', function() {
            element.required = this.checked;
            renderFormPreview();
        });
        
        if (document.getElementById('prop-placeholder')) {
            document.getElementById('prop-placeholder').addEventListener('input', function() {
                element.placeholder = this.value;
                renderFormPreview();
            });
        }
        
        if (document.getElementById('prop-text')) {
            document.getElementById('prop-text').addEventListener('input', function() {
                element.text = this.value;
                renderFormPreview();
            });
        }
        
        if (document.getElementById('prop-options')) {
            document.getElementById('prop-options').addEventListener('input', function() {
                element.options = this.value.split('\n').filter(opt => opt.trim() !== '');
                renderFormPreview();
            });
        }
        
        if (document.getElementById('prop-value')) {
            document.getElementById('prop-value').addEventListener('input', function() {
                element.value = this.value;
                renderFormPreview();
            });
        }
    }
    
    // Mesaj gösterme fonksiyonu
    function showMessage(message, type = 'info') {
        // Basit bir mesaj gösterme mekanizması
        console.log(`${type}: ${message}`);
        // Burada daha gelişmiş bir mesaj gösterme UI ekleyebilirsiniz
    }
    
    // Form önizleme fonksiyonu
    function previewFormFunc() {
        previewForm.innerHTML = '';
        
        if (formElements.length === 0) {
            previewForm.innerHTML = '<p>Henüz form elemanı eklenmemiş.</p>';
        } else {
            const form = document.createElement('form');
            form.id = 'preview-form-content';
            form.className = 'preview-form';
            
            formElements.forEach(element => {
                const formGroup = document.createElement('div');
                formGroup.className = 'form-group';
                
                let inputHtml = '';
                
                switch (element.type) {
                    case 'text':
                    case 'email':
                    case 'number':
                    case 'date':
                        inputHtml = `<input type="${element.type}" name="${element.id}" placeholder="${element.placeholder}" ${element.required ? 'required' : ''} class="form-control">`;
                        break;
                    case 'file':
                        inputHtml = `<input type="file" name="${element.id}" ${element.required ? 'required' : ''} class="form-control">`;
                        break;
                    case 'textarea':
                        inputHtml = `<textarea name="${element.id}" placeholder="${element.placeholder}" ${element.required ? 'required' : ''} class="form-control"></textarea>`;
                        break;
                    case 'select':
                        inputHtml = `<select name="${element.id}" ${element.required ? 'required' : ''} class="form-control">`;
                        element.options.forEach(option => {
                            inputHtml += `<option value="${option}">${option}</option>`;
                        });
                        inputHtml += '</select>';
                        break;
                    case 'checkbox':
                        inputHtml = `<label class="checkbox-label">
                                    <input type="checkbox" name="${element.id}" ${element.required ? 'required' : ''}>
                                    <span>${element.text}</span>
                                </label>`;
                        break;
                    case 'radio':
                        inputHtml = `<div class="radio-group">`;
                        element.options.forEach((option, index) => {
                            inputHtml += `<label class="radio-label">
                                        <input type="radio" name="${element.id}" value="${option}" ${index === 0 ? 'checked' : ''}>
                                        <span>${option}</span>
                                    </label>`;
                        });
                        inputHtml += '</div>';
                        break;
                    case 'button':
                        inputHtml = `<input type="button" value="${element.value}" class="btn">`;
                        break;
                }
                
                formGroup.innerHTML = `
                    <label>${element.label} ${element.required ? '*' : ''}</label>
                    ${inputHtml}
                `;
                
                form.appendChild(formGroup);
            });
            
            // Form için gönder butonu ekle
            const submitGroup = document.createElement('div');
            submitGroup.className = 'form-group';
            submitGroup.innerHTML = '<input type="submit" value="Gönder" class="btn">';
            form.appendChild(submitGroup);
            
            previewForm.appendChild(form);
        }
        
        previewModal.style.display = 'block';
    }
    
    // HTML kodunu oluştur
    function generateHTMLCode() {
        if (formElements.length === 0) {
            htmlCode.value = '<!-- Henüz form elemanı eklenmemiş -->';
        } else {
            let html = '<form id="custom-form" method="post">\n';
            
            formElements.forEach(element => {
                let inputHtml = '';
                
                switch (element.type) {
                    case 'text':
                    case 'email':
                    case 'number':
                    case 'date':
                        inputHtml = `  <input type="${element.type}" name="${element.id}" placeholder="${element.placeholder}" ${element.required ? 'required' : ''}>\n`;
                        break;
                    case 'file':
                        inputHtml = `  <input type="file" name="${element.id}" ${element.required ? 'required' : ''}>\n`;
                        break;
                    case 'textarea':
                        inputHtml = `  <textarea name="${element.id}" placeholder="${element.placeholder}" ${element.required ? 'required' : ''}></textarea>\n`;
                        break;
                    case 'select':
                        inputHtml = `  <select name="${element.id}" ${element.required ? 'required' : ''}>\n`;
                        element.options.forEach(option => {
                            inputHtml += `    <option value="${option}">${option}</option>\n`;
                        });
                        inputHtml += '  </select>\n';
                        break;
                    case 'checkbox':
                        inputHtml = `  <label>\n    <input type="checkbox" name="${element.id}" ${element.required ? 'required' : ''}> ${element.text}\n  </label>\n`;
                        break;
                    case 'radio':
                        inputHtml = '';
                        element.options.forEach((option, index) => {
                            inputHtml += `  <label>\n    <input type="radio" name="${element.id}" value="${option}" ${index === 0 ? 'checked' : ''}> ${option}\n  </label>\n`;
                        });
                        break;
                    case 'button':
                        inputHtml = `  <input type="button" value="${element.value}">\n`;
                        break;
                }
                
                html += `  <div class="form-group">\n`;
                html += `    <label>${element.label} ${element.required ? '*' : ''}</label>\n`;
                html += inputHtml;
                html += `  </div>\n`;
            });
            
            html += '  <input type="submit" value="Gönder">\n';
            html += '</form>';
            
            htmlCode.value = html;
        }
        
        codeModal.style.display = 'block';
    }
    
    // Formu temizle
    function clearForm() {
        if (confirm('Formu temizlemek istediğinizden emin misiniz? Tüm form elemanları silinecek.')) {
            formElements = [];
            selectedElement = null;
            renderFormPreview();
            renderPropertiesPanel();
            showMessage('Form temizlendi', 'info');
        }
    }
    
    // Olay dinleyicileri
    previewBtn.addEventListener('click', previewFormFunc);
    exportBtn.addEventListener('click', generateHTMLCode);
    clearBtn.addEventListener('click', clearForm);
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            previewModal.style.display = 'none';
            codeModal.style.display = 'none';
        });
    });
    
    copyBtn.addEventListener('click', function() {
        htmlCode.select();
        document.execCommand('copy');
        alert('HTML kodu panoya kopyalandı!');
    });
    
    // Modal dışına tıklanırsa kapat
    window.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            previewModal.style.display = 'none';
        }
        if (e.target === codeModal) {
            codeModal.style.display = 'none';
        }
    });
    
    // İlk yüklemede form önizlemesini render et
    renderFormPreview();
});