# TicTime ⏱️❌⭕

A colourful, animated Tic-Tac-Toe game built with plain **HTML, CSS and JavaScript**. No frameworks, no build step, no installs.

> 🎯 **Hack Day project.** TicTime is *deliberately incomplete*: a few things are broken and a few features are missing. Each one is an issue waiting for you. See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

## Screenshots

_Coming soon._

## Run it

You only need a browser.

```bash
git clone <your-fork-url>
cd TicTime
```

Then either double-click `index.html`, or serve the folder (handy if you work on offline/PWA features):

```bash
python3 -m http.server 8000     # then open http://localhost:8000
# or: npx serve
```

## How to play

1. Player **X** goes first, then players take turns clicking an empty square.
2. Get three of your marks in a row (across, down or diagonally) to win.
3. If all nine squares fill up with no winner, it's a draw.
4. **New Game** clears the board; the scoreboard keeps counting.

## Project structure

```
TicTime/
├── index.html        # page layout
├── css/styles.css    # all styling and animations
└── js/
    ├── game.js       # rules: win/draw detection (no DOM code)
    ├── ui.js         # drawing the board, scores, theme, confetti
    └── main.js       # game state + event handlers
```

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Pick an issue labelled `documentation`, `beginner` or `hard`, fix it, and open a pull request.

## License

[MIT](LICENSE)
## Troubleshooting

### 1. Changes not reflecting after modifying files
If your CSS or JS changes are not appearing on the page, the browser might be caching old assets. Perform a hard refresh:
- **Windows / Linux:** `Ctrl` + `F5` or `Ctrl` + `Shift` + `R`
- **Mac:** `Cmd` + `Shift` + `R`

### 2. Fonts or assets look different or fail to load when opening `file://` directly
Opening `index.html` directly using the `file://` protocol can cause CORS or Google Fonts loading issues in some browsers. Use a local development server (e.g., Live Server extension in VS Code, or `npx serve`) to open the app via `http://localhost`.

### 3. Game functionality not responding / blank page on click
Check the browser developer console for any uncaught errors:
- Press `F12` or `Ctrl` + `Shift` + `I` (or `Cmd` + `Option` + `I` on Mac) and select the **Console** tab to identify potential script errors or missing file imports.

### 4. Custom theme resets on page refresh
Ensure `localStorage` is enabled in your browser privacy settings. The game uses browser storage to persist your preferred light/dark theme state.

---

## FAQ

### Q1: Who plays first in a new game?
Player **X** always makes the first move at the start of a new match.

### Q2: How are draws counted?
If all 9 cells are filled without either player aligning 3 matching marks horizontally, vertically, or diagonally, the game registers a draw and increments the draw counter.

### Q3: Does the game save my score if I refresh the page?
Scores reset to 0 when the page is reloaded. Only your chosen color theme (light or dark mode) is saved across browser sessions.