function Board(color) {
    this.COLOR = color;

    //store the initial buildBoard dimensions
    this.x;
    this.y;
    this.boardWidth;
    this.boardHeight;

    this.board = new Array(TILES_HIGH);
    for (let i = 0; i < TILES_HIGH; i++) {
        this.board[i] = new Array(TILES_WIDE);
    }
    if (this.COLOR == 0) {
        for (let y = TILES_HIGH/2;y<TILES_HIGH/2+3;y++){
            this.board[y] = this.board[y].fill(1,0,TILES_WIDE);
        }
    } else {
        for (let y = TILES_HIGH/2-3;y<TILES_HIGH/2;y++){
            this.board[y] = this.board[y].fill(1,0,TILES_WIDE);
        }
    }

    this.render = function (TILE_SIZE) {
        fill(this.COLOR);
        rect(this.x, this.y, this.boardWidth, this.boardHeight/2);
        fill(255 - this.COLOR);
        rect(this.x, this.y+this.boardHeight/2,this.boardWidth,this.boardHeight/2);
        fill(0);
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                if (this.board[y][x] != null) {
                    rect(this.x + (x * TILE_SIZE), this.y + (y * TILE_SIZE), TILE_SIZE, TILE_SIZE);
                }
            }
        }
        for (let y = 0;y<4;y++){
            fill(80-y*20);
            if (this.COLOR == 0) {
                rect(this.x, this.y + this.boardHeight / 2 - TILE_SIZE - TILE_SIZE*y, this.boardWidth, TILE_SIZE);
            } else {
                rect(this.x,this.y+this.boardHeight/2 + TILE_SIZE*y,this.boardWidth,TILE_SIZE);
            }
        }
    }

    this.updateSize = function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.boardWidth = width;
        this.boardHeight = height;
    }

    this.getCell = function (x, y) {
        let col = this.board[y];
        if (col == undefined) {
            return null;
        } else {
            let cell = col[x];
            if (cell != undefined) {
                return cell;
            } else {
                return 0;
            }
        }
    }

    this.fixPiece = function (piece) {
      if (piece.onBoard()) {
        for (let y = 0; y < piece.matrix().length; y++) {
            let row = piece.matrix()[y];
            for (let x = 0; x < row.length; x++) {
                let cell = row[x];
                let cellX = piece.x + x;
                let cellY = piece.y + y;
                if (cell && (cellX >= 0 && cellX < TILES_WIDE && cellY >= 0 && cellY < TILES_HIGH)) {
                    this.board[cellY][cellX] = piece.buildMode ? 1 : null;
                }
            }
        }
        piece.owner.pieces.splice(piece.owner.pieces.indexOf(piece),1);
        if (piece.owner.pieces.length == 0) {
            piece.owner.newPiece();
        }
      }else {
        console.log("Game Over");
        window.reset();
      }



    }

    this.removeFilledLines = function(owner) {
        if (owner.direction > 0) {
            for (let y = 0; y < TILES_HIGH; y++) {
                let isComplete = true;
                for (let x = 0;x< TILES_WIDE;x++) {
                    if (this.board[y][x] == null) {
                        isComplete = false;
                        break;
                    }
                }
                if (isComplete) {
                    for (let yy = y - 1; yy >= 0; yy--) {
                        this.board[yy + 1] = this.board[yy];
                    }
                    this.board[0] = new Array(TILES_WIDE);
                }
            }
        } else {
            for (let y = TILES_HIGH-1; y >= 0; y--) {
                let isComplete = true;
                for (let x = 0;x< TILES_WIDE;x++) {
                    if (this.board[y][x] == null) {
                        isComplete = false;
                        break;
                    }
                }
                if (isComplete) {
                    for (let yy = y + 1; yy < TILES_HIGH; yy++) {
                        this.board[yy - 1] = this.board[yy];
                    }
                    this.board[TILES_HIGH-1] = new Array(TILES_WIDE);
                }
            }
        }
    }
}
