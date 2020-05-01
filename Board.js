
export default class Board {
    constructor(){
        //to see changs in console
        this.board=this.createBoard();
        //to keep a track of colors
        this.colorBoard = Array.from({length:COLS},() => Array(ROWS).fill(VACANT["0"]));
        //initialising the piece position in the board
        this.x=3;
        this.y=-2;

    }

    //square used to make the pieces
    drawSquare(x,y,color){
        ctx.fillStyle = color;
        ctx.fillRect(x,y,1,1);//(xcoord,ycoord,sizex,sizey)
    }
    

    //draws the white board
    createBoard(){
        let board = [];

        //0/1 based array
        for(r=0; r<ROWS; r++){
            board[r] = []
            for(c=0; c < COLS; c++){
                board[r][c] = 0;
                
            }
        }
        
        //draw on canvas
        for(r = 0; r<ROWS; r++){
            for(c = 0; c<COLS; c++){
                this.drawSquare(c,r,VACANT["0"]) // VACANT_COLOR=white
            }
        }

        return board;
    }

    
    //Collision function-sees if the next position made by user is valid
    //return True if collision; false if no collision
    checkCollision(x,y,piece){
        for(r = 0; r < piece.length; r++){
            for(c = 0; c < piece.length; c++){
                //if the move is valid
                if(!piece[r][c]){
                    continue;
                } //??

                //coordinates of piece after movement
                let newX = this.x + c + x;
                let newY = this.y + r + y;
                
                //conditions for collision
                //wall boundaries 
                if(newX < 0 || newX >= COLS || newY >= ROW){
                    return true;
                }
                //to account for new move outside board
                if(newY < 0){
                    return true;
                }
                //if there is a piece there already
                if(board[newX][newY] == 1){
                    return true;
                }

            }
        }
        return false;

    }

    //remove full rows
    removeRows(){
        let lines =0;
        for(r =0; r < ROWS;r++){
            //if every value is 1
            if(this.board.r.every(value => value===1)){
                lines++;
                //remove row
                this.board.splice(r,1);
                //delete color
                this.colorBoard.splice(r,1);

                //add zero filled row at top
                this.board.unshift(Array(COLS).fill(0));
                this.colorBoard.unshift(Array(COLS).fill(VACANT["0"]));
                
                for(c = 0; c < COLS;c++){
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

    //game over
    gameOver(piece){
        for(r = 0; r < this.piece.length; r++){
            for(c = 0; c < this.piece.length; c++){
                if((this.y + r)<0){
                    return true;
                }
            }
        }
        return false
    }

}