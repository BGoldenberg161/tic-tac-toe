// global variables
let turnCounter = 0;
let winCounter = [0, 0, 0];
let isGameActive = true;
const answerBox = document.querySelector('.answerBox');
const whosTurn = document.querySelector('.playerTurn');
// is there already a winnner?
let winCondition = '';
// find game board
const allCells = document.querySelector('.board');
// find reset button
const reset = document.querySelector('.reset');
// find results panel
const resultsPlayerOne = document.querySelector('.playerOne');
const resultsPlayerTwo = document.querySelector('.playerTwo');
const resultsTie = document.querySelector('.tie');

// winner function
function someoneWon () {
    answerBox.textContent = 'Player ' + playerTurn + ' wins!';
    winCondition = 'Winner';
    isGameActive = false;
    winCounter[playerTurn - 1]++;
    updateWins();
    console.log(winCounter);
};
// reset function
function clearBoard() {
    // window.location.reload(false); ----- roload whole page
    isGameActive = true;
    turnCounter = 0;
    winCondition = '';
    answerBox.textContent = 'Have you been wearing your mask?';
    whosTurn.textContent = 'Your turn Player 1';
    let resetCellsOne = document.querySelectorAll('.clickedCellOne');
    let resetCellsTwo = document.querySelectorAll('.clickedCellTwo');
    resetCellsOne.forEach(element => {
        element.setAttribute('class', 'cell');
    })
    resetCellsTwo.forEach(element => {
        element.setAttribute('class', 'cell');
    })
};
//update win counter function
function updateWins() {
    resultsPlayerOne.textContent = 'Player One: ' + winCounter[0];
    resultsPlayerTwo.textContent = 'Player Two: ' + winCounter[1];
    resultsTie.textContent = 'Tie: ' + winCounter[2];
};
        
// wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // When cell is clicked, change background img url
    // Then check for win
    allCells.addEventListener('click', event => {
        if (isGameActive === true){
        let currentClick = event.target;
        playerTurn = (turnCounter % 2) + 1;
        // update who's turn
        whosTurn.textContent = 'Your turn Player ' + playerTurn;
        
        // if cell has not been clicked
        if (currentClick.className === 'cell') {
            turnCounter += 1;
            
            // change x/o every other click
            if (playerTurn === 1) {
                currentClick.setAttribute('class', 'clickedCellOne');
            };
            if (playerTurn === 2) {
                currentClick.setAttribute('class', 'clickedCellTwo');
            };
            
            // after updating for current click
            // check for win via class's
            let topLeft = document.querySelector('#tl').className;
            let topCenter = document.querySelector('#tc').className;
            let topRight = document.querySelector('#tr').className;
            let middleLeft = document.querySelector('#ml').className;
            let middleCenter = document.querySelector('#mc').className;
            let middleRight = document.querySelector('#mr').className;
            let bottomLeft = document.querySelector('#bl').className;
            let bottomCenter = document.querySelector('#bc').className;
            let bottomRight = document.querySelector('#br').className;
            
            if (winCondition !== 'Winner'){
                if (topLeft === topCenter && topCenter === topRight && topCenter !== 'cell') {
                    someoneWon();
                };
                if (middleLeft === middleCenter && middleCenter === middleRight && middleCenter !== 'cell') {
                    someoneWon();
                };
                if (bottomLeft === bottomCenter && bottomCenter === bottomRight && bottomCenter !== 'cell') {
                    someoneWon();
                };
                if (topLeft === middleLeft && middleLeft === bottomLeft && bottomLeft !== 'cell') {
                    someoneWon();
                };
                if (topCenter === middleCenter && middleCenter === bottomCenter && middleCenter !== 'cell') {
                    someoneWon();
                };
                if (topRight === middleRight && middleRight === bottomRight && middleRight !== 'cell') {
                    someoneWon();
                };
                if (topLeft === middleCenter && middleCenter === bottomRight && middleCenter !== 'cell') {
                    someoneWon();
                };
                if (topRight === middleCenter && middleCenter === bottomLeft && middleCenter !== 'cell') {
                    someoneWon();
                };
            }if (turnCounter === 9 && winCondition !== 'Winner') {
                answerBox.textContent = 'Tie Game';
                winCounter[2] = winCounter[2] + 1;
                updateWins();
                };
            };
        };
    });
// reset button function on click
reset.addEventListener('click', clearBoard);
    
});
