const statusDisplay = document.querySelector('#status');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('#reset-btn');
const winLine = document.querySelector('#winning-line');

let gameActive = true;
let startingPlayer = "X"; 
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const wins = [
    { combo: [0, 1, 2], style: "width: 100%; height: 8px; top: 15%; left: 0;" }, 
    { combo: [3, 4, 5], style: "width: 100%; height: 8px; top: 48.5%; left: 0;" }, 
    { combo: [6, 7, 8], style: "width: 100%; height: 8px; top: 82%; left: 0;" }, 
    { combo: [0, 3, 6], style: "width: 8px; height: 100%; left: 15%; top: 0;" }, 
    { combo: [1, 4, 7], style: "width: 8px; height: 100%; left: 49%; top: 0;" }, 
    { combo: [2, 5, 8], style: "width: 8px; height: 100%; left: 83%; top: 0;" }, 
    { combo: [0, 4, 8], style: "width: 8px; height: 135%; left: 50%; top: -17%; transform: rotate(-45deg);" }, 
    { combo: [2, 4, 6], style: "width: 8px; height: 135%; left: 50%; top: -17%; transform: rotate(45deg);" }
];

function handleCellClick(e) {
    const i = e.target.getAttribute('data-index');
    if (gameState[i] !== "" || !gameActive) return;

    gameState[i] = currentPlayer;
    e.target.innerText = currentPlayer;
    e.target.classList.add(currentPlayer === "X" ? "x-color" : "o-color");

    checkResult();
}

function checkResult() {
    let roundWon = false;
    let winStyle = "";

    for (let condition of wins) {
        let a = gameState[condition.combo[0]];
        let b = gameState[condition.combo[1]];
        let c = gameState[condition.combo[2]];
        if (a !== "" && a === b && b === c) {
            roundWon = true;
            winStyle = condition.style;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = "WOW! Player " + currentPlayer + " Wins!";
        winLine.style.cssText = "display: block; " + winStyle;
        gameActive = false;
        
        // Trigger Glittering Papers (Confetti)
        confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
        
        
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerText = "It's a Tie!";
        gameActive = false;
        return;
    }

    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusDisplay.innerText = "Player " + currentPlayer + "'s Turn";
}

function restartGame() {
    gameActive = true;
    startingPlayer = (startingPlayer === "X") ? "O" : "X";
    currentPlayer = startingPlayer;
    gameState.fill("");
    statusDisplay.innerText = "Player " + currentPlayer + " starts!";
    winLine.style.display = "none";
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("x-color", "o-color");
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

resetBtn.addEventListener('click', restartGame);
