// Things to be fixed:
//2. animate not working to make the piece move automatically
//3. score and level not updated probably due to rows not removed

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");    
const canvasNext = document.getElementById("next")
const ctxNext = canvasNext.getContext("2d")

let dropStart;
let dropTime;


document.addEventListener("keydown",controlKeys);

// ctx.canvas.width = COLS * BLOCK_SIZE;
// ctx.canvas.height = ROWS * BLOCK_SIZE;
// ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let newBoard = new Board(ctx,ctxNext);

scoreElement = document.getElementById("score");
levelElement = document.getElementById("level");
let requstAnimationId;

//Necessary functions-----------------------------------------------------
function gameOver(){
    if(newBoard.movePieceDown()=== false){
        cancelAnimationFrame(requstAnimationId);
    }
}

function getPoints(){
    let level = 0;
    let score = 0;
    let rows = newBoard.removeRows();//gives num of lines removed
    let dropTime = 100;

    if(rows > 0){
        let prevScore = score;
        score = level + rows;
        var scoreAdded = score - prevScore;
    }

    while(gameOver() === false){
        if(scoreAdded === 1){
            level++;

            if(dropTime > 100){
                dropTime -= scoreAdded;
            }
        }

    }

    scoreElement.innerHTML = score;
    levelElement.innerHTML = level;

}

function animate(){
    //date.now returns time elapsed in ms since jan 1,1970.
    dropStart = Date.now() ;
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000){
        newBoard.movePieceDown();
        dropStart = Date.now();

        // if(!newBoard.movePieceDown){
        //     gameOver();
        // }
        //can include hard drop if necessary
    }

    if(!gameOver){
        requestAnimationFrame(animate);
    }

    // ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

    // newBoard.drawBoard();
    // newBoard.drawPiece();

    //requstAnimationId = requestAnimationFrame(animate);
    
}

function controlKeys(event){
    if(event.keyCode == 37){
        newBoard.movePieceLeft();
        console.log("left key pressed");
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        newBoard.rotatePiece();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        newBoard.movePieceRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        newBoard.movePieceDown();
    }else if(event.keyCode ==13){
        console.log("enter pressed")
        //play();
    }
}


function play(){
    resetGame();

    //if old game running cancel it

    if(requstAnimationId){
         cancelAnimationFrame(requstAnimationId);
     }

    //start new animation
    animate();
    getPoints();

}

function resetGame(){
    newBoard = new Board(ctx,ctxNext);
}



