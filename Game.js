const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");    
const canvasNext = document.getElementById("next")
const ctxNext = canvasNext.getContext("2d")

function randomPiece(){
    let r = randomNum = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0],PIECES[r][1],ctx); // (shape,color)
}

var newPiece = randomPiece();
var newBoard = new Board();


function isLocked(){
    //if it's locked
    let r = randomNum = Math.floor(Math.random() * PIECES.length)
    if(newPiece.movePieceDown()===true){
        newPiece = new Piece(PIECES[r][0],PIECES[r][1],ctxNext);
    }
}

//Necessary functions-----------------------------------------------------
function gameOver(){
    let y = -2;
    for(let r = 0; r < newPiece.length; r++){
        for(let c = 0; c < newPiece.length; c++){
            if((y + r)<0){
                return true;
            }
        }
    }
    return false
}

function getPoints(){
    let level = 0;
    let score = 0;
    let rows = newBoard.removeRows();

    if(rows > 0){
        let prevScore = score;
        score = level + rows;
        var scoreAdded = score - prevScore;
    }

    while(gameOver() === false){
        if(scoreAdded === 10){
            level++;

            if(dropTime > 100){
                dropTime -= scoreAdded;
            }
        }

    }

    scoreElement.innerHTML = score;
    levelElement.innerHTML = level;

}

function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > dropTime){
        newPiece.movePieceDown();
        isLocked();
        dropStart = Date.now();
        //can include hard drop if necessary
    }

    if(gameOver() === false){
        requestAnimationFrame(drop);
    }
}

function controlKeys(event){
    if(event.keyCode == 37){
        newPiece.movePieceLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        newPiece.rotatePiece();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        newPiece.movePieceRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        newPiece.movePieceDown();
    }
}

function reset(){

}

function play(){

    //date.now returns time elapsed in ms since jan 1,1970.
    let dropStart = Date.now();
    let dropTime = 1000;
    let gameOver = false;

    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');

    document.addEventListener("keydown",controlKeys);
    drop();
    getPoints();


}

play();