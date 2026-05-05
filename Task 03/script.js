const board = document.getElementById("board");
const statusText = document.getElementById("status");

let cells = [];
let currentPlayer = "X";
let gameActive = true;
let mode = "pvp";

// Winning combinations
const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Create board
function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

createBoard();

// Handle click
function handleClick(index) {
  if (!gameActive || cells[index].innerText !== "") return;

  cells[index].innerText = currentPlayer;

  if (checkWinner()) return;

  if (mode === "ai" && currentPlayer === "X") {
    currentPlayer = "O";
    statusText.innerText = "AI thinking...";
    setTimeout(aiMove, 500);
  } else {
    switchPlayer();
  }
}

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

// Check winner
function checkWinner() {
  for (let pattern of winPatterns) {
    let [a,b,c] = pattern;

    if (
      cells[a].innerText &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      gameActive = false;
      statusText.innerText = `🎉 Player ${cells[a].innerText} Wins!`;

      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      return true;
    }
  }

  // Draw
  if (cells.every(cell => cell.innerText !== "")) {
    statusText.innerText = "It's a Draw!";
    gameActive = false;
    return true;
  }

  return false;
}

// AI Move (simple smart)
function aiMove() {
  let emptyCells = cells
    .map((cell, i) => cell.innerText === "" ? i : null)
    .filter(i => i !== null);

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  cells[randomIndex].innerText = "O";

  if (!checkWinner()) {
    currentPlayer = "X";
    statusText.innerText = "Player X's Turn";
  }
}

// Restart
function restart() {
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = "Player X's Turn";
  createBoard();
}

// Mode selection
function setMode(selectedMode) {
  mode = selectedMode;
  restart();
}