# Architecture
# TicTime Architecture

This document explains the technical structure and data flow of TicTime.

## File Roles

- **`index.html`**: Defines the layout of the page, containing structural containers for the header, scorecards, status pill, game board, controls, and footer.
- **`css/styles.css`**: Handles all visual styling, layouts (using CSS Grid and Flexbox), responsive design, and CSS variables for light/dark themes.
- **`js/game.js`**: Contains pure game rules and logic (such as checking winning lines and draw conditions) with zero DOM manipulation.
- **`js/ui.js`**: Responsible for DOM rendering, drawing the board cells, updating scores, showing status messages, handling theme toggling, and triggering confetti animations.
- **`js/main.js`**: Acts as the controller/coordinator. It manages global state and event listeners, connecting user interactions from `ui.js` to rule checks in `game.js`.

---

## Data Flow: Clicking a Square

1. **User Interaction**: The user clicks a cell element on the board (`index.html`).
2. **Event Listener (`main.js`)**: The click event triggers `handleCellClick(index)`, which checks if the game is over or if the cell is already occupied.
3. **State Update (`main.js`)**: If valid, the move is recorded in the central `state.board` array using the current player's mark (`'X'` or `'O'`).
4. **UI Render (`ui.js`)**: `renderBoard()` is called to update the visual board state on the screen.
5. **Rule Validation (`game.js`)**: `getGameResult()` evaluates the updated board state to check for a win or draw.
6. **State Reaction (`main.js` & `ui.js`)**:
   - If there is a **win**, game-over state is locked, winning cells are highlighted, scores are updated, and confetti is launched.
   - If there is a **draw**, the game-over state is locked and a draw message is displayed.
   - Otherwise, the turn switches to the next player via `nextPlayer()` and the status pill updates.

---

## Data Flow Diagram

```text
       +-----------------------+
       |      index.html       |
       +-----------+-----------+
                   | User Click
                   v
       +-----------------------+
       |       main.js         | <---+ Coordinates State & Events
       +---+---------------+---+
           |               |
           | Check Rules   | Render UI
           v               v
   +-------+-------+   +---+-------+
   |    game.js    |   |   ui.js   |
   | (Pure Logic)  |   |  (DOM)    |
   +---------------+   +-----------+

_Coming soon._
