// Game state and event wiring. Connects game.js (rules) to ui.js (screen).

const state = {
  /* ---------- ISSUE #17 CHANGE START ---------- */
  boardSize: 3,
  board: createEmptyBoard(3),
  /* ---------- ISSUE #17 CHANGE END ---------- */
  currentPlayer: 'X',
  gameOver: false,
  scores: { X: 0, O: 0, draws: 0 },
  /* ---------- ISSUE #11 CHANGE START ---------- */
  // Load saved theme from localStorage on page load (defaults to 'light')
  theme: localStorage.getItem('theme') || 'light',
  /* ---------- ISSUE #11 CHANGE END ---------- */
};

/* ---------- ISSUE #11 CHANGE START ---------- */
// Apply initial theme state on page load
setTheme(state.theme);
/* ---------- ISSUE #11 CHANGE END ---------- */

function handleCellClick(index) {
  // ---------- ISSUE #8 FIX START ----------
  // Ignore click if game is over OR if cell is already occupied (not empty/null)
  if (state.gameOver || state.board[index]) return;
  // ---------- ISSUE #8 FIX END ----------

  state.board[index] = state.currentPlayer;
  renderBoard(state.board);

  const result = getGameResult(state.board);

  if (result.status === 'win') {
    state.gameOver = true;
    state.scores[result.winner]++;
    highlightWinningCells(result.line);
    setStatus(`Player ${result.winner} wins!`, result.winner);
    setBoardLocked(true);
    renderScores(state.scores);
    launchConfetti();
  } else if (result.status === 'draw') {
    state.gameOver = true;
    setStatus("It's a draw!", '');
    setBoardLocked(true);
  } else {
    state.currentPlayer = nextPlayer(state.currentPlayer);
    setStatus(`Player ${state.currentPlayer}'s turn`, state.currentPlayer);
  }
}

function startNewGame() {
  /* ---------- ISSUE #17 CHANGE START ---------- */
  state.board = createEmptyBoard(state.boardSize);
  state.currentPlayer = 'X';
  state.gameOver = false;
  buildBoard(handleCellClick, state.boardSize);
  renderBoard(state.board);
  setBoardLocked(false);
  setStatus("Player X's turn", 'X');
  /* ---------- ISSUE #17 CHANGE END ---------- */
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  setTheme(state.theme);
  /* ---------- ISSUE #11 CHANGE START ---------- */
  // Save chosen theme to localStorage so it is remembered after refresh
  localStorage.setItem('theme', state.theme);
  /* ---------- ISSUE #11 CHANGE END ---------- */
}

// TODO: wire up the "Reset Scores" button (#reset-scores-btn)

/* ---------- ISSUE #17 CHANGE START ---------- */
// Wire up board size selector change event
document.getElementById('size-select').addEventListener('change', (e) => {
  state.boardSize = parseInt(e.target.value, 10);
  startNewGame();
});
/* ---------- ISSUE #17 CHANGE END ---------- */

buildBoard(handleCellClick, state.boardSize);
renderBoard(state.board);
renderScores(state.scores);
setStatus("Player X's turn", 'X');

document.getElementById('new-game-btn').addEventListener('click', startNewGame);
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);