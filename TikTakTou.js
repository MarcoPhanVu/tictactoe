var Query = document.querySelector.bind(document);//Shorten QuerySelector

const allCells = document.querySelectorAll('[data-cell]');
const board = Query('#board');
const message = Query('#announcement');
const mainModal = Query('#mainModal');
const restartButton = Query('[restartButton]');

const count = allCells.length;//9
const winning_sets = [[0, 1, 2], [3, 4, 5], [6, 7, 8],//Horizontal
                      [0, 3, 6], [1, 4, 7], [2, 5, 8],//Vertical
                      [0, 4, 8], [2, 4, 6]] //Diagonal
var aim = null;

const turnIndicator = Query('#turnIndicator');

const xScoreCounter = Query('#PXScore');
const tieCounter = Query('#Tie');
const oScoreCounter = Query('#POScore');


let xTurn = true;
var WIN = false;
var TIE = false;

var turnCount = 0;
var xScore = 0;
var oScore = 0;
var tieCount = 0;



startTheGame();
restartButton.addEventListener('click', restartGame);

function startTheGame() {
    turnCount = 0;
    Hover();
    allCells.forEach(cell => {
        cell.addEventListener('click', handleUserClick, {once: true}/*User can't reselect this cell again*/);
    })
}

function handleUserClick(ev) {
    //Check Turn
    const cell = ev.target;
    var Turn = xTurn? 'x' : 'o';
    cell.classList.add(Turn);//Plot Marker
    turnCount ++;
    checkGameStat(Turn);
    xTurn = xTurn? false : true;//Switch Turn
    Hover();
    let currentTurn = xTurn? 'X' : 'O';
    turnIndicator.innerText = currentTurn.toUpperCase() + "'s turn";
}

function Hover() {
    board.classList.remove('x', 'o');
    if (xTurn) {
        board.classList.add('x');
    }
    else {
        board.classList.add('o');
    }
}

function checkGameStat(Turn) {
    let win = false;
    //STILL NEED TO TRY TO UNDER STAND THIS MORE
    win = winning_sets.some(set => {//If wining_set included a set of cells 
        return set.every(index => {
            return allCells[index].classList.contains(Turn);//That contains a same class
        });
    });

    if (win) {
        let Player = Turn;
        message.innerText = Player.toUpperCase() + " Won";
        mainModal.classList.add('active');
        WIN = true;
        updateScore();
    }

    else if (turnCount == count) {
        message.innerText = 'TIE';
        mainModal.classList.add('active');
        TIE = true;
        updateScore();
    }
}

function restartGame() {
    mainModal.classList.remove('active');
    startTheGame();
    allCells.forEach(cell => {
        cell.classList.remove('x', 'o');
    })
    let currentTurn = xTurn? 'X' : 'O';
    turnIndicator.innerText = currentTurn.toUpperCase() +"'s turn";
}

function updateScore() {
    if(WIN) {
        if(xTurn) {
            xScore ++;
            xScoreCounter.innerText = 'X: ' + xScore;
            WIN = false;
        }
        else if(!xTurn) {
            oScore ++;
            oScoreCounter.innerText = 'O: ' + oScore;
            WIN = false;
        }
    }
    else if(TIE) {
        tieCount ++;
        tieCounter.innerText = 'Tie: ' + tieCount;
        TIE = false;
    }
}