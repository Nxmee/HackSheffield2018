function Piece(owner) {
    this.x = 0;
    this.y = 0;
    this.matrix = null;
    this.owner = owner;

    this.reset = function () {
        this.x = (width / edge) / 2 - 1;
        this.y = 0;
        this.matrix = createPiece(Math.floor(Math.random() * 7));
        this.owner.pieceControlled = this;
        if (collide(arena, player)) {
            for (let i = 0; i < arena.length; i++) {
                arena[i].fill(0);
            }
        }
        this.owner.updateScore();
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
