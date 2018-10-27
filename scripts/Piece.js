function Piece(owner) {
    this.x = TILES_WIDE/2;
    this.y = -4;
    this.matrix = createMatrix(Math.floor(Math.random() * 7));
    this.owner = owner;

    this.collide = function(matrix) {
        matrix = matrix ? matrix : this.matrix;
        let board = this.owner.board;
        for (let y = 0; y < matrix.length; y++) {
            let row = matrix[y];
            for (let x = 0; x < row.length; x++) {
                if (row[x] && board.getCell(x,y)) {
                    return true;
                }
            }
        }
        return false;
    }

    function createMatrix(type) {
        switch (type) {
            case 0:
                return [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 1, 0],
                ];
            case 1:
                return [
                    [1, 1],
                    [1, 1],
                ];
            case 2:
                return [
                    [0, 1, 0],
                    [0, 1, 0],
                    [0, 1, 1],
                ];
            case 3:
                return [
                    [0, 1, 0],
                    [0, 1, 0],
                    [1, 1, 0],
                ];
            case 4:
                return [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                ];
            case 5:
                return [
                    [0, 1, 1],
                    [1, 1, 0],
                    [0, 0, 0],
                ];
            case 6:
                return [
                    [1, 1, 0],
                    [0, 1, 1],
                    [0, 0, 0],
                ];
        }
    }

    this.rotate = function () {
        this.matrix.reverse();
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = y + 1; x < this.matrix[y].length; x++) {
                [this.matrix[y][x], this.matrix[x][y]] = [this.matrix[x][y], this.matrix[y][x]];
            }
        }
    }

    this.moveRight = function () {
        this.x++;
        if (collide(arena, this)) {
            this.x--; // recovery
        }
        time = millis();
    }

    this.moveLeft = function () {
        this.x--;
        if (collide(arena, this)) {
            this.x++; // recovery
        }
        time = millis();
    }

    this.release = function () {
        owner.newPiece();
    }

    this.gravity = function(){
        this.y++;
        if (this.collide()){
            console.log("owwwy");
        }
    }

    this.render = function(TILE_SIZE) {
        fill(255);
        let pieceX = this.owner.board.x+this.x*TILE_SIZE;
        let pieceY = this.owner.board.y+this.y*TILE_SIZE;
        for (let y = 0;y<this.matrix.length;y++) {
            let row = this.matrix[y];
            for (let x = 0;x<row.length;x++) {
                if (row[x]) {
                    rect(pieceX+TILE_SIZE*x,pieceY+TILE_SIZE*y,TILE_SIZE,TILE_SIZE);
                }
            }
        }
    }
}
