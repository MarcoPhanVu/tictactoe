const allCells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
const message = document.querySelector('#announcement');
const mainModal = document.querySelector('#mainModal');
const restartButton = document.querySelector('[restartButton]');

const count = allCells.length;//9
const winning_sets = [[0, 1, 2], [3, 4, 5], [6, 7, 8],//Horizontal
                      [0, 3, 6], [1, 4, 7], [2, 5, 8],//Vertical
                      [0, 4, 8], [2, 4, 6]] //Diagonal


let xTurn = true;
var turnCount = 0;

startTheGame();
restartButton.addEventListener('click', restartGame);

function startTheGame(){
    turnCount = 0;
    Hover();
    allCells.forEach(cell => {
        cell.addEventListener('click', handleUserClick, {once: true}/*User can't reselect this cell again*/);
    })
}

function handleUserClick(ev){
    //Check Turn
    const cell = ev.target;
    var Turn = xTurn? 'x' : 'o';

    cell.classList.add(Turn);//Plot Marker
    turnCount ++;
    checkGameStat(Turn);
    xTurn = xTurn? false : true;//Switch Turn
    Hover();
}

function Hover(){
    board.classList.remove('x', 'o');
    if (xTurn){
        board.classList.add('x');
    }
    else {
        board.classList.add('o');
    }
}

function checkGameStat(Turn){
    
    
    
    let win = false;
    //STILL NEED TO TRY TO UNDER STAND THIS MORE
    win = winning_sets.some(set => {//If wining_set included a set of cells 
        return set.every(index => {
            return allCells[index].classList.contains(Turn);//That contains a same class
        });
    });

    if (win){
        let Player = Turn;
        message.innerText = Player.toUpperCase() + " Won";
        mainModal.classList.add('active');
    }

    else if (turnCount == count){
        message.innerText = 'TIE';
        mainModal.classList.add('active');
    }
}

function restartGame(){
    mainModal.classList.remove('active');
    startTheGame();
    allCells.forEach(cell => {
        cell.classList.remove('x', 'o');
    })
}