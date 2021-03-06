//Board of tetris with board functionality and instances of Piece.
//This resembles assembling/ setting up new pieces onto the board
class Board {

    constructor(ctx,ctxNext){
        this.ctx = ctx;
        this.ctxNext = ctxNext;
                    
        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    
        //multiplies the board reference values - *BLOCK_SIZE
        this.ctx.scale(BLOCK_SIZE,BLOCK_SIZE);

        //to see changs in console
        this.board=this.createBoard();
        //to keep a track of colors
        this.colorBoard = Array.from({length:ROWS},() => Array(COLS).fill(VACANT["0"]));

        this.nextPiece;
    }

    //square used to make the pieces and the empty board
    drawSquare(x,y,color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y,1,1);//(xcoord,ycoord,sizex,sizey)
    }
    

    //setting up pieces on the board

    setStartPos(){
        //initialising the piece position in the board
        this.x=3;
        this.y=-2;

    }

    getNewPiece(){
        let r = randomNum = Math.floor(Math.random() * PIECES.length)
        this.nextPiece = new Piece(PIECES[r][0],PIECES[r][1],ctxNext)

        this.nextPiece.uncreatePiece();
        this.undrawPiece();
        this.drawPiece();

    }

    drawPiece(){
        for(let r = 0;r < this.activeShape.length;r++){
            for(let c = 0; c < this.activeShape.length;c++){
                this.board[this.x + c][this.y + r]=this.activeShape[r][c];

                //draw one square of the piece on canvas
                //the 2 for loops draw the whole piece
                if( this.activeShape[r][c]){
                    this.drawSquare(this.x + c, this.y + r, this.color);
                }
            }
        }

    }

    undrawPiece(){

    }

    //draws the white board
    createBoard(){
        let board = Array.from({length:ROWS},() => Array(COLS).fill(0));
        console.log(board)
        //draw on canvas
    
        for(let r = 0; r < ROWS; r++){
            for(let c = 0; c < COLS; c++){
                this.drawSquare(c,r,VACANT["0"]) // VACANT_COLOR=white
            }
        }

        return board;
    }

    
    //Collision function-sees if the next position made by user is valid
    //return True if collision; false if no collision
    checkCollision(x,y,piece){
        for(let r = 0; r < piece.length; r++){
            for(let c = 0; c < piece.length; c++){
                //if the move is valid
                if(!piece[r][c]){
                    continue;
                } //??

                //coordinates of piece after movement
                let newX = this.x + c + x;
                let newY = this.y + r + y;
                
                //conditions for collision
                //wall boundaries 
                if(newX < 0 || newX >= COLS || newY >= ROWS){
                    return true;
                }
                //to account for new move outside board
                if(newY < 0){
                    return true;
                }
                //if there is a piece there already
                if(this.board[newX][newY] == 1){
                    return true;
                }

            }
        }
        return false;

    }

    //remove full rows
    removeRows(){
        let lines = 0;
        for(let r = 0; r < ROWS; r++){
            //if every value is 1
            if(this.board[r].every(value => value===1)){
                lines++;
                //remove that row
                this.board.splice(r,1);
                //delete color of that row
                this.colorBoard.splice(r,1);

                //add zero filled row at top
                this.board.unshift(Array(COLS).fill(0));
                this.colorBoard.unshift(Array(COLS).fill(VACANT["0"]));
                
                for(let c = 0; c < COLS;c++){
                    //bring above row down
                    //color board is already spliced
                    //redrawing the whole board after splicing
                    let prevColor = this.colorBoard[r,c];
                    this.drawSquare[r,c,prevColor];
                }
                
            }

        }
        return lines;
        //lines will be useful to calc score + level
    }

}