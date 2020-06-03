// Things to be fixed:
//3. score and level not updated probably due to rows not removed

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");    
const canvasNext = document.getElementById("next")
const ctxNext = canvasNext.getContext("2d")

document.addEventListener("keydown",controlKeys);

let newBoard = new Board(ctx,ctxNext);

const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");

//document.getElementById("score") = 10;
//scoreElement.innerHTML = newBoard.removedRows;
let requstAnimationId;

//Necessary functions-----------------------------------------------------


//console.log("this is rows:",rows);
let level = 0;
let score = 0;
let prevScore;
let scoreAdded;
let dropTime;

//bug - points and level gets added everytime you press down arrow
//after odd num of rows are are cleared eg - after 1st row clears every press adds a num

//rewrite getPoints
function getPoints(){
    let rows = newBoard.removedRows;
    console.log("rows:",rows,"score:",score)
    
    //let rows = newBoard.removeRows();//gives num of lines removed
    ms = 1000


    if(rows > 0){
        prevScore = score;
        score = level + rows;
        //scoreAdded = score - prevScore;
        console.log("level",level,"score:",score)//,"prevScore:",prevScore);
    }

    //if(newBoard.gameOver === false){
    if(score == 2){
        level++;

        //if(dropTime > 1000){
        //dropTime -= scoreAdded;
        //}
    }

    //}

    scoreElement.innerHTML = score;
    levelElement.innerHTML = level;

}

// let score = 0;
// let i = 0;
// function getPoints(){
//     while(i>=0 && i<10){
//         let lines = newBoard.removedRows;
//         console.log("lines:",lines,"level[i]:",LEVEL[i]);
//         if(score == LEVEL[i]){
            
//             score = LEVEL[i+1] + lines;
//             i++;
//         }else{
//             score = LEVEL[i] + lines;
//         }
//         scoreElement.innerHTML = score;
//         levelElement.innerHTML = LEVEL[i];
//     }

// }

let now;
let start = Date.now();
// let score = 0;
// let i = 0;

// function animate(){
//     console.log("this is animate")
//     if(i>=0 && i<10){
//             let lines = newBoard.removedRows;
//             console.log("lines:",lines,"level[i]:",LEVEL[i]);

//             if(( now - start) > 1000){
//                 newBoard.movePieceDown();

//                 start = Date.now();
//                 console.log("this is the auto move down")
//             }

//             if(newBoard.gameOver == false){
//                 now = Date.now();
//                 let lines = newBoard.removedRows;
//                 if(score == LEVEL[i]){
                    
//                     score = LEVEL[i+1] + lines;
//                     requstAnimationId = requestAnimationFrame(animate);

//                     scoreElement.innerHTML = score;
//                     levelElement.innerHTML = LEVEL[i];
//                     i++;
//                 }else{
//                     score = LEVEL[i] + lines;
//                     requstAnimationId = requestAnimationFrame(animate);
//                     scoreElement.innerHTML = score;
//                     levelElement.innerHTML = LEVEL[i];
//                 }
                
//             }else{
//                 alert("Game Over");
//             }
//         }
// }


function animate(){
    

    if(( now - start) > 1000){
        newBoard.movePieceDown();
        getPoints();
        start = Date.now();
        //console.log("this is the auto move down")
    }

    if(newBoard.gameOver == false){
        now = Date.now();    
        
        requstAnimationId = requestAnimationFrame(animate);
        //console.log("this is the loop conditional")
    }else{
        alert("gameOver");
    }

    
    //console.log("start:",start,"now:",now);
    //console.log("this is the difference",start - now);
    
 }

function controlKeys(event){
    if(event.keyCode == 37){
        newBoard.movePieceLeft();
        // console.log("left key pressed");
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        newBoard.rotatePiece();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        newBoard.movePieceRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        newBoard.movePieceDown();
        // getPoints();
    }else if(event.keyCode ==13){
        console.log("enter pressed")
        play();
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
    
}

function pause(){

}

function resetGame(){
    newBoard = new Board(ctx,ctxNext);
}



