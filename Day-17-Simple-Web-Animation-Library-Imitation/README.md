# Simple Web Animation Library Mock

A simplified version of a web animation library that allows users to select HTML elements and animate their position, opacity, and size over specified durations.

## Features

- **Smooth Animations**: Uses `requestAnimationFrame` for browser-refresh-rate synchronized animations
- **Easing Functions**: Multiple easing options for natural movement transitions
- **Method Chaining**: Fluent API design for creating animation sequences
- **Performance Optimized**: Uses CSS transforms instead of top/left positioning
- **Simple API**: Easy-to-use syntax for creating complex animations

## Getting Started

### Installation

Simply include the HTML, CSS, and JavaScript files in your project. No external dependencies required.

### Basic Usage

```javascript
// Move an element 100px to the right over 1 second
animator('#myElement').to({ x: 100 }, 1000, 'easeOutQuad');

// Chain multiple animations
animator('#myElement')
    .to({ x: 200 }, 1000, 'easeInOutQuad')
    .then()
    .to({ y: 150, opacity: 0.5 }, 800, 'easeOutCubic')
    .then()
    .to({ scale: 1.5 }, 600, 'easeInBack');
```

## API Reference

### `animator(selector)`
Creates a new animation instance for the selected element.

- `selector` (String): CSS selector for the target element

### `.to(properties, duration, easing)`
Animates the element to the specified properties.

- `properties` (Object): Animation target properties
  - `x` (Number): Horizontal position in pixels
  - `y` (Number): Vertical position in pixels
  - `opacity` (Number): Opacity value between 0 and 1
  - `scale` (Number): Scale factor (1 = original size)
  - `scaleX` (Number): Horizontal scale factor
  - `scaleY` (Number): Vertical scale factor

- `duration` (Number): Animation duration in milliseconds (default: 1000)
- `easing` (String): Easing function name (default: 'linear')

### `.then()`
Creates a pause between chained animations.

### `.reset()`
Resets the element to its original state and clears any pending animations.

## Available Easing Functions

- `linear` - Constant speed
- `easeInQuad` - Slow start, accelerating
- `easeOutQuad` - Fast start, decelerating
- `easeInOutQuad` - Slow start and end
- `easeInCubic` - Stronger slow start
- `easeOutCubic` - Stronger fast start
- `easeInBack` - Overshooting start

## Examples

### Basic Movement
```javascript
// Move element right
animator('#box').to({ x: 100 }, 1000, 'easeOutQuad');

// Move element down
animator('#box').to({ y: 100 }, 1000, 'easeOutQuad');
```

### Fade Effects
```javascript
// Fade out
animator('#box').to({ opacity: 0.3 }, 800, 'easeInOutQuad');
```

### Scaling
```javascript
// Scale up
animator('#box').to({ scale: 1.5 }, 600, 'easeOutCubic');
```

### Complex Sequence
```javascript
// Combined animation sequence
animator('#box')
    .to({ x: 200, y: 100 }, 1200, 'easeInOutQuad')
    .then()
    .to({ opacity: 0.7, scale: 1.2 }, 800, 'easeOutCubic')
    .then()
    .to({ x: 50, y: 200, opacity: 1 }, 1000, 'easeInBack');
```

## Browser Support

This library works in all modern browsers that support:
- `requestAnimationFrame`
- CSS Transforms
- ES6 Classes

## Technical Details

### Animation Engine
The library uses a custom animation engine built with:
- `requestAnimationFrame` for smooth, performance-optimized animations
- CSS transforms for hardware-accelerated movement
- Mathematical easing functions for natural motion
- Queue system for handling animation sequences

### Performance Considerations
- Uses transform instead of top/left for better performance
- Batched DOM updates within animation frames
- Minimal memory footprint during animations
- Automatic cleanup of completed animations

## Contributing

Feel free to extend this library with additional features:
- More easing functions
- Rotation animations
- Color transitions
- SVG element support
- Animation events (start, complete, etc.)

## License

This project is open source and available under the MIT License.