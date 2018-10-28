function Board(color) {
    this.COLOR = color;

    //store the initial board dimensions
    this.x;
    this.y;
    this.boardWidth;
    this.boardHeight;

    this.board = new Array(TILES_HIGH);
    for (let i = 0; i < TILES_HIGH; i++) {
        this.board[i] = new Array(TILES_WIDE);
    }

    this.render = function (TILE_SIZE) {
        fill(this.COLOR);
        rect(this.x, this.y, this.boardWidth, this.boardHeight);
        fill(255 - this.COLOR);
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[x].length; x++) {
                if (this.board[y][x] != null) {
                    rect(this.x + (x * TILE_SIZE), this.y + (y * TILE_SIZE), TILE_SIZE, TILE_SIZE);
                }
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
        for (let y = 0; y < piece.matrix().length; y++) {
            let row = piece.matrix()[y];
            for (let x = 0; x < row.length; x++) {
                let cell = row[x];
                let cellX = piece.x + x;
                let cellY = piece.y + y;
                if (cell && (cellX >= 0 && cellX < TILES_WIDE && cellY >= 0 && cellY < TILES_HIGH)) {
                    this.board[cellY][cellX] = cell;
                }
            }
        }
        piece.owner.pieces.splice(piece.owner.pieces.indexOf(piece),1);

        if (piece.owner.pieces.length == 0) {
            piece.owner.newPiece();
        }
    }
}