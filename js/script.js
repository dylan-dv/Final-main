const boxes = document.querySelectorAll('.box'); // Collects all 'box' class elements
const players = ['X', 'O']; // An array of two characters, acting as the two players
let currentPlayer = players[0]; // Apply index 0 of the array to start off with as a player variable

const turnMessage = document.querySelector('.turns'); // Collects the 'turns' class element
turnMessage.textContent = "X's turn"; // Apply text to appear below the title and above the layout grid

const winningCombinations = [
    [0, 1, 2], // Horizontal
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6], // Vertical
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8], // Diagonal
    [2, 4, 6]
]; // All possible winning combinations to win the game

function checkWin(player) { // Check if a win has occured by iterating through the 'winningCombinations' list
    return winningCombinations.some(([a, b, c]) => 
        boxes[a].textContent === player &&
        boxes[b].textContent === player &&
        boxes[c].textContent === player
    ); // Return if boxes a, b, and c all contain the player's symbol
}

function checkTie() { // Check if a tie has occured in the game
    return Array.from(boxes).every(box => box.textContent !== ''); // Return a tie if all boxes are filled and no win has taken place
}

function restart() { // Restarts the entire layout grid/board upon click
    boxes.forEach(box => (box.textContent = "")); // Change all box text to be blank (or just set to "")
    turnMessage.textContent = "X's turn"; // Force change the turnMessage element text to say it's the first player (player X)'s turn
    currentPlayer = players[0]; // Force change the player variable back to index 0 of the players array
}

boxes.forEach((box, index) => { 
    // Add a click event listener
    box.addEventListener('click', () => { // Listens for a click in a 'box' class element
        if (box.textContent !== '') return; // If the box is filled, return

        box.textContent = currentPlayer; // Change the text of the 'box' class element to the current player's symbol

        if (checkWin(currentPlayer)) { // Check if a win has occured after a player makes a play
            turnMessage.textContent = `game over: ${currentPlayer} wins`;
            return; // If a player won, return and announce the winner 
        }

        if (checkTie()) { // Check if a tie has occured after a player makes a play
            turnMessage.textContent = "game is tied";
            return; // If the game is all tied, return and announce it's a tie
        }

        currentPlayer = currentPlayer === players[0] ? players[1] : players[0]; // Takes turns between the two indexes in the players array, switching them after every click
        turnMessage.textContent = `${currentPlayer}'s turn`; // Update turnMessage to the current players turn
    });
});