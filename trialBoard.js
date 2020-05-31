const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");    
const canvasNext = document.getElementById("next")
const ctxNext = canvasNext.getContext("2d")

const BLOCK_SIZE = 20;

ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 4 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

var board = Array.from({length:600},() => Array(200).fill("blue"));

function drawBoard(){
    for(let r = 0; r <600; r++){
        for(let c = 0; c <300; c++){
            drawSquare(c,r,board[r][c]);
        }
    }
}

function drawSquare(x,y,color){ 
    ctx.fillStyle = color;
    ctx.fillRect(x,y,10,10);//(xcoord,ycoord,sizex,sizey)
}

let piece = [[0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]]


function placePiece(r,c,color){
    drawSquare(30+(r*10),20+(c*10),color)
}

function drawPiece(){
    for(let r = 0; r <piece.length; r++){
        for(let c = 0; c <piece[0].length; c++){
            if(piece[r][c]==1){
                placePiece(r,c,"black");
            }
                // }else{
                //     board[r][c] = "yellow"
            
        }
    }
}


drawBoard();
drawPiece();
console.log(board);