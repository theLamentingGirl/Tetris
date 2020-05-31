
//Pieces of tetris with their functionality
class Piece{
    //
    constructor(shape,color,ctx){
        this.shape = shape;
        this.color = color;
        this.ctx = ctx;

        this.board = new Board(this.ctx,this.ctxNext);

        this.shapeConfigNum=0;//can have values 0,1,2,3
        this.activeShape=this.shape[this.shapeConfigNum];

        this.x=3;
        this.y=-2;

    }

    createPiece(){
        for(let r = 0;r < this.activeShape.length;r++){
            for(let c = 0; c < this.activeShape.length;c++){
                this.board[this.x + c][this.y + r]=this.activeShape[r][c];

                //draw one square of the piece on canvas
                if( this.activeShape[r][c]){
                    this.board.drawSquare(this.x + c, this.y + r, this.color);
                }
            }
        }
    }

    
    uncreatePiece(){
        for(let r = 0;r < this.activeShape.length;r++){
            for(let c = 0; c < this.activeShape.length;c++){
                this.board[this.x + c][this.y + r]=0;
            }

            //whiten one square of the piece on canvas
            if( this.activeShape[r][c]){
                this.board.drawSquare(this.x + c, this.y + r, VACANT["0"]);
            }

        }
    }
    //undraw a piece. useful when we want to move a piece
    //to move we undraw from current location and redraw in new

    //Move piece
    movePieceLeft(){
        if(this.board.checkCollision(-1,0,this.activeShape) == false){
            this.uncreatePiece();
            this.x--;

            this.createPiece();
        }
    }

    movePieceRight(){
        if(this.board.checkCollision(1,0,this.activeShape) == false){
            this.uncreatePiece();
            this.x++;
            this.createPiece();
        }
    }

    movePieceDown(){
        //returns true when the piece is locked
        if(this.board.checkCollision(0,1,this.activeShape) == false){
            this.uncreatePiece();
            this.y++;
            this.createPiece();
        }else{
            this.lockPiece();
            return true;
        }
        
    }

    //rotate piece
    // there are 4 configs to change. after 4th config we need to come back to 1
    //we use modulus to get the config num
    rotatePiece(){

        let configNum = (this.shapeConfigNum + 1) % this.shape.length; // (0+1)%4
        //this.shape.length gives the number of configs of the shape
        let nextConfig = this.shape[configNum]; 
        // we need to kick the piece into board if it goes outside the board after rotation
        let kick = 0;

        //refocusing the rotated piece
        if(this.board.checkCollision(0,0,nextConfig) == true){
            if(this.x > COLS/2){
                kick = -1; // right wall kick to left to bring it in board again
            }
            else{
                kick = 1; // left wall kick to right to bring it in board again
            }
        }

        //rotation
        if(this.board.checkCollision(kick,0,nextConfig) == false){
            this.uncreatePiece();
            this.x += kick;//change the x coord wrt to kicks
            //change config ie rotate
            this.shapeConfigNum = configNum;
            this.activeShape = this.shape[this.shapeConfigNum];
            //draw the rotated piece
            this.createPiece();
            
        }

    }

    //lock->we need to permanently color the piece
    lockPiece(){
        for(let r = 0; r < this.activeShape.length; r++){
            for(let c = 0; c < this.activeShape.length; c++){
                //ignore vacant space
                if(this.activeShape[r][c]){
                    continue;
                }

                //lock the game
                if(this.board.checkCollision(0,1,this.activeShape)==true){
                    this.board[this.x + c][this.y + r] = 1;
                    this.board.colorBoard[this.x + c][this.y + r] = this.color;
                    return true;
                }
            }
        }
        return false;
    }


}