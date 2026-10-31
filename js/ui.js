// Everything that touches the page (DOM) lives here.

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const statusTextEl = document.getElementById('status-text');
let cellEls = [];

const MARKS = {
  X: '<svg class="mark" viewBox="0 0 100 100"><path pathLength="100" d="M26 26L74 74"/><path pathLength="100" d="M74 26L26 74"/></svg>',
  O: '<svg class="mark" viewBox="0 0 100 100"><circle pathLength="100" cx="50" cy="50" r="26"/></svg>',
};

function buildBoard(onCellClick) {
  boardEl.innerHTML = '';
  cellEls = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    
    /* ---------- ISSUE #19 FIX START: Accessibility attributes & Keyboard Nav ---------- */
    cell.setAttribute('role', 'button');
    cell.setAttribute('tabindex', '0');
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    cell.setAttribute('aria-label', `Row ${row}, column ${col}, empty`);

    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onCellClick(i);
      } else {
        handleBoardKeyboardNav(e, i);
      }
    });
    /* ---------- ISSUE #19 FIX END ---------- */

    cell.addEventListener('click', () => onCellClick(i));
    boardEl.appendChild(cell);
    cellEls.push(cell);
  }
}

function renderBoard(board) {
  board.forEach((value, i) => {
    const cell = cellEls[i];
    if ((cell.dataset.mark || '') === (value || '')) return;
    cell.dataset.mark = value || '';
    cell.className = 'cell' + (value ? ' filled ' + value.toLowerCase() : '');
    cell.innerHTML = value ? MARKS[value] : '';

    /* ---------- ISSUE #19 FIX START: Accessible label updates ---------- */
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    if (value === 'X') {
      cell.setAttribute('aria-label', `Row ${row}, column ${col}, X`);
    } else if (value === 'O') {
      cell.setAttribute('aria-label', `Row ${row}, column ${col}, O`);
    } else {
      cell.setAttribute('aria-label', `Row ${row}, column ${col}, empty`);
    }
    /* ---------- ISSUE #19 FIX END ---------- */
  });
}

/* ---------- ISSUE #19 FIX START: Arrow key navigation handler ---------- */
function handleBoardKeyboardNav(e, currentIndex) {
  let targetIndex = null;
  if (e.key === 'ArrowRight') targetIndex = (currentIndex + 1) % 9;
  if (e.key === 'ArrowLeft') targetIndex = (currentIndex - 1 + 9) % 9;
  if (e.key === 'ArrowDown') targetIndex = (currentIndex + 3) % 9;
  if (e.key === 'ArrowUp') targetIndex = (currentIndex - 3 + 9) % 9;

  if (targetIndex !== null) {
    e.preventDefault();
    if (cellEls[targetIndex]) cellEls[targetIndex].focus();
  }
}
/* ---------- ISSUE #19 FIX END ---------- */

/* ---------- ISSUE #5 FIX START ---------- */
function highlightWinningCells(line) {
  if (!line || !Array.isArray(line)) return;

  // Select all cell elements on the board
  const cells = document.querySelectorAll('.cell');

  // Loop through all indices in the winning line array to apply the highlight
  line.forEach(index => {
    if (cells[index]) {
      cells[index].classList.add('win');
    }
  });
}
/* ---------- ISSUE #5 FIX END ---------- */

function setStatus(text, player) {
  statusTextEl.textContent = text;
  statusEl.dataset.player = player || '';
  boardEl.dataset.turn = player || '';
  
  /* ---------- ISSUE #19 FIX START: Screen reader live announcement ---------- */
  statusEl.setAttribute('aria-live', 'polite');
  /* ---------- ISSUE #19 FIX END ---------- */
}

function setBoardLocked(locked) {
  boardEl.classList.toggle('is-over', locked);
}

function renderScores(scores) {
  document.getElementById('score-x').textContent = scores.X;
  document.getElementById('score-o').textContent = scores.O;
  document.getElementById('score-draws').textContent = scores.draws;
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.getElementById('theme-toggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

function launchConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#ff5f6d', '#ffc371', '#36d1dc', '#5b86e5', '#a78bfa'];
  for (let i = 0; i < 36; i++) {
    const piece = document.createElement('i');
    piece.className = 'confetti';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = Math.random() * 0.4 + 's';
    piece.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2400);
  }
}
// Automatically update the copyright year in the footer
document.getElementById('year').textContent = new Date().getFullYear();