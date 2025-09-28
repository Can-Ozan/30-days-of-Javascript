document.addEventListener('DOMContentLoaded', function() {
    // Elementleri seçme
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Mevcut filtre
    let currentFilter = 'all';
    
    // Yerel depolamadan görevleri yükleme
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Sayfa yüklendiğinde görevleri render etme
    renderTasks();
    
    // Görev ekleme butonu dinleyicisi
    addTaskBtn.addEventListener('click', addTask);
    
    // Enter tuşu ile görev ekleme
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Filtre butonlarına tıklama dinleyicisi
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aktif buton sınıfını güncelleme
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtreyi güncelleme
            currentFilter = this.dataset.filter;
            
            // Görevleri yeniden render etme
            renderTasks();
        });
    });
    
    // Görev ekleme fonksiyonu
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Lütfen bir görev girin!');
            return;
        }
        
        // Yeni görev nesnesi oluşturma
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            timestamp: new Date().toLocaleString('tr-TR')
        };
        
        // Görevi diziye ekleme
        tasks.push(task);
        
        // Yerel depolamayı güncelleme
        saveTasks();
        
        // Görev listesini render etme
        renderTasks();
        
        // Input alanını temizleme
        taskInput.value = '';
        taskInput.focus();
    }
    
    // Görevleri render etme fonksiyonu
    function renderTasks() {
        // Filtreleme
        let filteredTasks = tasks;
        
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        // Boş durumunu kontrol etme
        if (filteredTasks.length === 0) {
            emptyState.style.display = 'block';
            taskList.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            taskList.style.display = 'block';
            
            // Görev listesini temizleme
            taskList.innerHTML = '';
            
            // Filtrelenmiş görevleri ekleme
            filteredTasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
                taskItem.dataset.id = task.id;
                
                taskItem.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-text">${task.text}</span>
                    <div class="task-actions">
                        <button class="delete-btn"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                
                // Checkbox değişiklik dinleyicisi
                const checkbox = taskItem.querySelector('.task-checkbox');
                checkbox.addEventListener('change', function() {
                    toggleTaskCompleted(task.id);
                });
                
                // Silme butonu dinleyicisi
                const deleteBtn = taskItem.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', function() {
                    deleteTask(task.id);
                });
                
                taskList.appendChild(taskItem);
            });
        }
    }
    
    // Görev tamamlama durumunu değiştirme
    function toggleTaskCompleted(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        saveTasks();
        renderTasks();
    }
    
    // Görev silme
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
    
    // Yerel depolamaya kaydetme
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});