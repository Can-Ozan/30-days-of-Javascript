# State Machine Application

A simple and interactive state machine implementation that simulates a light switch with visual feedback and transition history.

## Overview

This project demonstrates a Finite State Machine (FSM) implementation that manages the states of a light switch (Off, Turning On, On, Turning Off). It serves as an educational example for understanding state management in web applications.

## Features

- **Visual State Representation**: Animated light bulb that changes appearance based on current state
- **State Transitions**: Smooth transitions between states with timing delays
- **Transition History**: Log of all state changes with timestamps
- **Interactive Controls**: Toggle button and reset functionality
- **Responsive Design**: Clean, modern UI that works on different screen sizes

## States

The state machine has four distinct states:

- **Off**: Light is turned off
- **Turning On**: Transition state with animation (2-second delay)
- **On**: Light is fully on
- **Turning Off**: Transition state with animation (2-second delay)

## State Transitions

| Current State | Event | Next State |
|---------------|-------|------------|
| Off | toggle | Turning On |
| Turning On | complete | On |
| On | toggle | Turning Off |
| Turning Off | complete | Off |

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations and transitions
- **JavaScript ES6**: State machine logic with class-based implementation

## Project Structure

```
state-machine/
├── index.html      # Main HTML file
├── style.css       # Styles and animations
└── script.js       # State machine logic
```

## Installation

1. Clone or download the project files
2. Open `index.html` in a web browser
3. No additional dependencies or build process required

## Usage

1. **Toggle the Light**: Click the "Işığı Aç" (Turn On Light) button to start the state transition
2. **Observe Transitions**: Watch the light bulb animate through different states
3. **View History**: Check the transition log to see the complete history of state changes
4. **Reset**: Use the "Sıfırla" (Reset) button to return to the initial state

## Code Architecture

### State Machine Class

The core logic is implemented in the `StateMachine` class:

```javascript
class StateMachine {
    constructor() {
        // State definitions and transitions
        // DOM element references
        // Event listeners
    }
    
    transition(event) {
        // Handle state transitions
    }
    
    handleToggle() {
        // Process toggle actions
    }
    
    updateUI() {
        // Update visual elements based on current state
    }
}
```

### Key Concepts Demonstrated

- **Finite State Machine**: Application can only be in predefined states
- **Transition Logic**: Strict rules for state changes based on events
- **Event-Driven Architecture**: User actions trigger state changes
- **Clean Code Architecture**: Separation of state logic from UI code

## Browser Compatibility

Works in all modern browsers that support:
- ES6 Classes
- CSS Animations
- Flexbox Layout

## Learning Outcomes

This project helps understand:

- State machine design patterns
- Event-driven programming
- CSS animations and transitions
- Clean separation of concerns
- DOM manipulation techniques
- JavaScript class implementation

## Customization

You can extend this state machine by:

1. Adding new states to the `states` object
2. Defining new transitions in the `transitions` object
3. Modifying the CSS animations for different visual effects
4. Adding new event types and handlers

## License

This project is open source and available under the MIT License.