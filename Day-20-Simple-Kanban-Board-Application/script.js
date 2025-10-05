// JavaScript Kodları
class KanbanBoard {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('kanbanTasks')) || [];
        this.currentTaskId = null;
        
        this.initializeEventListeners();
        this.renderTasks();
    }
    
    initializeEventListeners() {
        // Yeni görev butonu
        document.getElementById('add-task-btn').addEventListener('click', () => {
            this.openModal();
        });
        
        // Modal kapatma
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });
        
        // Modal dışına tıklama
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('task-modal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // Görev formu
        document.getElementById('task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });
        
        // Sütunlara sürükle-bırak olayları
        this.setupDragAndDrop();
    }
    
    setupDragAndDrop() {
        const columns = document.querySelectorAll('.column');
        
        columns.forEach(column => {
            // Kart sürüklenirken sütun üzerine geldiğinde
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                column.classList.add('active');
            });
            
            // Kart sütundan çıktığında
            column.addEventListener('dragleave', () => {
                column.classList.remove('active');
            });
            
            // Kart sütuna bırakıldığında
            column.addEventListener('drop', (e) => {
                e.preventDefault();
                column.classList.remove('active');
                
                const taskId = e.dataTransfer.getData('text/plain');
                const newStatus = column.dataset.status;
                
                this.moveTask(taskId, newStatus);
            });
        });
    }
    
    openModal(taskId = null) {
        this.currentTaskId = taskId;
        const modal = document.getElementById('task-modal');
        const modalTitle = document.getElementById('modal-title');
        const taskForm = document.getElementById('task-form');
        
        if (taskId) {
            // Görev düzenleme modu
            modalTitle.textContent = 'Görevi Düzenle';
            const task = this.tasks.find(t => t.id === taskId);
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-description').value = task.description || '';
        } else {
            // Yeni görev modu
            modalTitle.textContent = 'Yeni Görev Ekle';
            taskForm.reset();
        }
        
        modal.style.display = 'block';
    }
    
    closeModal() {
        document.getElementById('task-modal').style.display = 'none';
        this.currentTaskId = null;
    }
    
    saveTask() {
        const title = document.getElementById('task-title').value.trim();
        const description = document.getElementById('task-description').value.trim();
        
        if (!title) return;
        
        if (this.currentTaskId) {
            // Mevcut görevi güncelle
            const taskIndex = this.tasks.findIndex(t => t.id === this.currentTaskId);
            if (taskIndex !== -1) {
                this.tasks[taskIndex].title = title;
                this.tasks[taskIndex].description = description;
            }
        } else {
            // Yeni görev oluştur
            const newTask = {
                id: Date.now().toString(),
                title,
                description,
                status: 'todo',
                createdAt: new Date().toISOString()
            };
            
            this.tasks.push(newTask);
        }
        
        this.saveToLocalStorage();
        this.renderTasks();
        this.closeModal();
    }
    
    moveTask(taskId, newStatus) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].status = newStatus;
            this.saveToLocalStorage();
            this.renderTasks();
        }
    }
    
    deleteTask(taskId) {
        if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveToLocalStorage();
            this.renderTasks();
        }
    }
    
    renderTasks() {
        // Tüm sütunları temizle
        document.querySelectorAll('.tasks-container').forEach(container => {
            container.innerHTML = '';
        });
        
        // Görevleri sütunlara yerleştir
        this.tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            const container = document.getElementById(`${task.status}-tasks`);
            container.appendChild(taskElement);
        });
    }
    
    createTaskElement(task) {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.draggable = true;
        taskCard.dataset.taskId = task.id;
        
        // Sürükleme olayları
        taskCard.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', task.id);
            taskCard.classList.add('dragging');
        });
        
        taskCard.addEventListener('dragend', () => {
            taskCard.classList.remove('dragging');
        });
        
        // Görev içeriği
        taskCard.innerHTML = `
            <div class="task-title">${this.escapeHtml(task.title)}</div>
            ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
            <div class="task-actions">
                <button class="edit-btn" title="Düzenle">✏️</button>
                <button class="delete-btn" title="Sil">🗑️</button>
            </div>
        `;
        
        // Düzenle butonu
        taskCard.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.openModal(task.id);
        });
        
        // Sil butonu
        taskCard.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteTask(task.id);
        });
        
        return taskCard;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    saveToLocalStorage() {
        localStorage.setItem('kanbanTasks', JSON.stringify(this.tasks));
    }
}

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    new KanbanBoard();
});