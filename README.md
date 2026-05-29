# Image Slider / Carousel

A responsive, interactive image slideshow built with vanilla HTML, CSS, and JavaScript.

## Features

- Smooth slide transitions with cubic-bezier easing
- Auto-play with a live progress bar indicator
- Previous / next navigation buttons
- Clickable dot indicators
- Pause on hover, resume on mouse leave
- Play / Pause toggle button
- Swipe support for touch / mobile devices
- Keyboard arrow key navigation
- Fully responsive with fluid font sizing

## Getting Started

1. Clone or download the repository.
2. Open `index.html` in any modern browser — no build step required.

## Customisation

| What                                              | Where                                                          |
| ------------------------------------------------- | -------------------------------------------------------------- |
| Slide content (title, subtitle, label)            | `.slide` blocks in `index.html`                                |
| Slide background (swap gradients for real images) | `.slide-bg` style per slide                                    |
| Auto-play interval                                | `INTERVAL` constant in the script (`default: 4000ms`)          |
| Number of slides                                  | Add or remove `.slide` blocks; the script auto-detects `total` |
| Transition speed                                  | `transition` property on `.slides-track`                       |

## Project Structure

```
image-slider/
├── index.html        ← Markup & entry point
├── slider.css        ← All styles (layout, transitions, responsive)
├── slider.js         ← Navigation, autoplay, progress, touch & keyboard
├── README.md
├── LICENSE
└── .gitignore
```

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No external dependencies.
