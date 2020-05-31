//Things to be fixed
//1. removeRows 
//2. use ctxNext & create a box to display the upcoming piece --> last if every other thing works

// initialises a piece
class Piece {
    constructor(shape,color,ctx){
        this.shape = shape;
        this.color = color;
        this.ctx = ctx;

        this.shapeConfigNum=0;//can have values 0,1,2,3
        this.activeShape=this.shape[this.shapeConfigNum];
        
    }
}

//contains board with board fucntionality
class Board {

    constructor(ctx,ctxNext){
        this.ctx = ctx;
        this.ctxNext = ctxNext;
                    
        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    
        //multiplies the board reference values - *BLOCK_SIZE
        this.ctx.scale(BLOCK_SIZE,BLOCK_SIZE);

        this.init();
        this.drawBoard();
        this.drawPiece();
    }

    init(){
        //board
        this.board=this.emptyBoard();

        //piece
        let r = Math.floor(Math.random() * PIECES.length)
        //this.piece = new Piece(PIECES[r][0],PIECES[r][1],ctx)
        // this.nextPiece;
        this.piece = this.getNewPiece();

        this.setStartPos();
    }

    //This acts as the primary UI contruction tool
    //square used to make the pieces and the empty board
    drawSquare(x,y,color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y,1,1);//(xcoord,ycoord,sizex,sizey)
    }
    
    //creating the board 
    //draws the empty board
    emptyBoard(){
        let board = Array.from({length:ROWS},() => Array(COLS).fill(VACANT["0"]));
        console.log(board)
        return board;
    }

    drawBoard(){
        for(let r = 0; r <ROWS; r++){
            for(let c = 0; c <COLS; c++){
                this.drawSquare(c,r,this.board[r][c]);
            }
        }
    }

    // draws the piece on the drawn board
    getNewPiece(){
        let r = Math.floor(Math.random() * PIECES.length)
        this.nextPiece = new Piece(PIECES[r][0],PIECES[r][1],ctxNext)

        // this.undrawPiece();
        // this.drawPiece();
        return this.nextPiece;

    }

    drawPiece(){
        
        for(let r = 0;r < this.piece.activeShape.length;r++){
            for(let c = 0; c < this.piece.activeShape.length;c++){
                //draw one square of the piece on canvas
                //the 2 for loops draw the whole piece
                if( this.piece.activeShape[r][c] === 1){
                        
                    this.drawSquare(this.x + c, this.y + r, this.piece.color);
                // console.log(this.piece.activeShape[0].length);
                }
                
            }
        }

    }

    undrawPiece(){
        for(let r = 0;r < this.piece.activeShape.length;r++){
            for(let c = 0; c < this.piece.activeShape.length;c++){
                //draw one square of the piece on canvas
                //the 2 for loops draw the whole piece
                if( this.piece.activeShape[r][c] === 1){
                        
                    this.drawSquare(this.x + c, this.y + r, VACANT[0]);
                // console.log(this.piece.activeShape[0].length);
                }
                
            }
        }

    }

    //setting up pieces on the board
    setStartPos(){
        //initialising the piece position in the board
        // right out of side of the frame on the top
        this.x=3;
        this.y=-2;

    }

    //movePieces on board = functionality of pieces

    movePieceLeft(){
        if(this.checkCollision(-1,0,this.piece.activeShape) == false){
            this.undrawPiece();
            this.x--;

            this.drawPiece();
            //console.log("piece moved left")
        }
    }

    movePieceRight(){
        if(this.checkCollision(1,0,this.piece.activeShape) == false){
            this.undrawPiece();
            this.x++;
            this.drawPiece();
        }
    }

    movePieceDown(){
        //returns true when the piece is locked
        if(this.checkCollision(0,1,this.piece.activeShape) === false){
            this.undrawPiece();
            this.y++;
            this.drawPiece();
        }else{
            this.lockPiece();
            //this.removeRows();

            if(this.y <= -2){
                //game over
                return false
            }

            //generate the next piece after setting the old one to current piece
            // this.piece = this.getNewPiece;
            // this.piece.ctx = this.ctx;
            // this.setStartPos();
            // this.getNewPiece();

            // this.drawBoard();
            this.piece = this.getNewPiece();
            this.setStartPos();

        }
        return true;
        
    }

    //rotate piece
    // there are 4 configs to change. after 4th config we need to come back to 1
    //we use modulus to get the config num
    rotatePiece(){

        let configNum = (this.piece.shapeConfigNum + 1) % this.piece.shape.length; // (0+1)%4
        //this.shape.length gives the number of configs of the shape
        let nextConfig = this.piece.shape[configNum]; 
        // we need to kick the piece into board if it goes outside the board after rotation
        let kick = 0;

        //refocusing the rotated piece
        if(this.checkCollision(0,0,nextConfig) == true){
            if(this.x > COLS/2){
                kick = -1; // right wall kick to left to bring it in board again
            }
            else{
                kick = 1; // left wall kick to right to bring it in board again
            }
        }

        //rotation
        if(this.checkCollision(kick,0,nextConfig) == false){
            this.undrawPiece();
            this.x += kick;//change the x coord wrt to kicks
            //change config ie rotate
            this.piece.shapeConfigNum = configNum;
            this.piece.activeShape = this.piece.shape[this.piece.shapeConfigNum];
            //draw the rotated piece
            this.drawPiece();
            
        }

    }

    //lock->we need to permanently color the piece
    lockPiece(){
        for(let r = 0; r < this.piece.activeShape.length; r++){
            for(let c = 0; c < this.piece.activeShape.length; c++){
                                    //ignore vacant space
                if(this.piece.activeShape[r][c] === 0){
                        continue;
                }
                

                //lock the game
                this.board[this.x + c][this.y + r] = this.piece.color;
                
                
            }
        }

        this.removeRows();
        this.drawPiece();
        // this.drawBoard();
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
                    continue;
                }
                //if there is a piece there already
                if(this.board[newX][newY] !== VACANT["0"]){
                    return true;
                }

            }
        }
        return false;

    }

    //remove full rows
    removeRows(){
        let lines = 0;
        let prevColor;
        for(let r = 0; r < ROWS; r++){
            //if the row is full
            if(this.board[r].every(value => value !== VACANT[0])){
                for(let c = 0; c < COLS;c++){
                    //storing the prev row's color 
                    prevColor = Array.from({length:ROWS},() => Array(COLS).fill(VACANT["0"]))
                    prevColor[r][c] = this.board[r-1][c];
                }

                //remove that row
                this.board.splice(r,1);

                //add zero filled row at top
                this.board.unshift(Array(COLS).fill(VACANT[0]));
                
                //draw board after deleting the row
                for(let c=0;c < COLS; c++){
                    this.drawSquare[r,c,prevColor[r][c]];
                }

                //noting down how many lines got cleared to later update points
                lines++;
                
            }

        }
        return lines;
        //lines will be useful to calc score + level
    }


} 