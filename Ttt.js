let currentPlayer = 'X';  // Player X starts
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const gameBoard = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const resetBtn = document.getElementById('resetBtn');
const turnIndicator = document.getElementById('turnIndicator');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');

// Initialize game
gameBoard.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.setAttribute('data-value', currentPlayer);  // Set the value to indicate if it's X or O
    clickSound.play();

    checkForWinner();
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            highlightWinningCells([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        statusMessage.textContent = `Player ${currentPlayer} (${currentPlayer === "X" ? "Cross" : "Circle"}) has won!`;
        winSound.play();
        gameActive = false;
        updateScore();
        return;
    }

    if (!gameState.includes("")) {
        statusMessage.textContent = `It's a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnIndicator.textContent = `Player ${currentPlayer}'s (${currentPlayer === "X" ? "Cross" : "Circle"}) turn`;
    turnIndicator.style.color = currentPlayer === 'X' ? '#007bff' : '#ff7b00';
}

function highlightWinningCells(indices) {
    indices.forEach(index => {
        gameBoard[index].classList.add('winning-cell');
    });
}

function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        scoreXDisplay.textContent = scoreX;
    } else {
        scoreO++;
        scoreODisplay.textContent = scoreO;
    }
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameBoard.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('winning-cell');
        cell.removeAttribute('data-value');
    });
    statusMessage.textContent = "";
    turnIndicator.textContent = `Player X's (Cross) turn`;
    turnIndicator.style.color = '#007bff';
}
