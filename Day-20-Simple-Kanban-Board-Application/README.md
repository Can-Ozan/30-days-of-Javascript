# Simple Kanban Board

A modern, drag-and-drop Kanban board with data persistence built using HTML, CSS, and JavaScript.

## 🚀 Features

- **Drag & Drop Interface**: Easily move task cards between columns
- **Data Persistence**: All tasks are automatically saved to browser's localStorage
- **Task Management**: Add, edit, and delete tasks with a user-friendly modal
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean and intuitive interface with smooth animations

## 📋 Column Statuses

- **Todo**: Tasks that need to be started
- **In Progress**: Tasks currently being worked on
- **Done**: Completed tasks

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and drag-drop API
- **CSS3**: Modern styling with Flexbox and animations
- **JavaScript ES6**: Modular class-based architecture
- **LocalStorage**: Client-side data persistence

## 📦 Installation

1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start managing your tasks!

No additional dependencies or build process required.

## 🎯 How to Use

### Adding a Task
1. Click the "Add New Task" button
2. Enter task title and description
3. Click "Save" to add the task to the Todo column

### Moving Tasks
1. Drag and drop task cards between columns
2. Task status automatically updates
3. Changes are saved instantly

### Editing Tasks
1. Click the edit icon (✏️) on any task card
2. Modify the title or description
3. Save changes

### Deleting Tasks
1. Click the delete icon (🗑️) on any task card
2. Confirm deletion in the dialog

## 🏗️ Project Structure

```
kanban-board/
│
├── index.html          # Main HTML file
├── # CSS styles embedded in HTML
├── # JavaScript code embedded in HTML
└── README.md          # Project documentation
```

## 💻 Code Architecture

### Main Classes

#### `KanbanBoard` Class
- Manages the entire application state
- Handles task CRUD operations
- Coordinates between UI and data layer

#### Key Methods
- `initializeEventListeners()` - Sets up all event handlers
- `setupDragAndDrop()` - Configures drag and drop functionality
- `saveToLocalStorage()` - Persists data to browser storage
- `renderTasks()` - Updates the UI based on current state

### Data Structure

```javascript
{
  id: "unique-timestamp-id",
  title: "Task title",
  description: "Task description",
  status: "todo|in-progress|done",
  createdAt: "ISO-date-string"
}
```

## 🎨 UI Components

- **Header**: Title and add task button
- **Columns**: Three status columns with drop zones
- **Task Cards**: Draggable cards with title, description, and actions
- **Modal**: Form for adding/editing tasks

## 🔧 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires a modern browser with support for:
- HTML5 Drag and Drop API
- ES6 Classes
- CSS Flexbox
- LocalStorage

## 📝 Learning Concepts

This project demonstrates intermediate web development concepts:

1. **HTML5 Drag & Drop API**: Complex event handling for dragover, dragleave, and drop
2. **Data Persistence & Synchronization**: Maintaining sync between JavaScript arrays and localStorage
3. **Dynamic DOM Updates**: Updating both DOM and data model when tasks move between columns
4. **Modular Design**: Separate classes/functions for managing cards and columns to avoid code repetition
5. **Event Delegation**: Efficient event handling for dynamic elements

## 🔮 Future Enhancements

- Due dates and priorities
- Task categories or tags
- Multiple boards
- Data export/import
- Collaboration features
- Dark mode theme

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

Built as a learning project for intermediate JavaScript concepts.

---

**Happy Task Managing!** 🎯