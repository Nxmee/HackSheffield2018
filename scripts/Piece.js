function Piece(owner) {
    this.x = 0;
    this.y = 0;
    this.matrix = null;
    this.owner = owner;

    this.reset = function () {
        this.x = TILES_WIDE / 2;
        this.y = 0;
        this.matrix = createMatrix(Math.floor(Math.random() * 7));
        //this.owner.pieceControlled = this;
        if (collide(arena, this)) {
            for (let i = 0; i < arena.length; i++) {
                arena[i].fill(0);
            }
        }
        this.owner.updateScore();
    }

    function collide(arena, piece) {
        for (let y = 0; y < piece.matrix.length; y++) {
            for (let x = 0; x < piece.matrix[0].length; x++) {
                if (piece.matrix[y][x] != 0 && (arena[y + piece.y] && arena[y + piece.y][x + piece.x]) != 0) {
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
                    [2, 2],
                    [2, 2],
                ];
            case 2:
                return [
                    [0, 3, 0],
                    [0, 3, 0],
                    [0, 3, 3],
                ];
            case 3:
                return [
                    [0, 4, 0],
                    [0, 4, 0],
                    [4, 4, 0],
                ];
            case 4:
                return [
                    [0, 5, 0, 0],
                    [0, 5, 0, 0],
                    [0, 5, 0, 0],
                    [0, 5, 0, 0],
                ];
            case 5:
                return [
                    [0, 6, 6],
                    [6, 6, 0],
                    [0, 0, 0],
                ];
            case 6:
                return [
                    [7, 7, 0],
                    [0, 7, 7],
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
}
