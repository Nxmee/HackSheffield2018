function Piece(owner) {
    this.x = TILES_WIDE / 2;
    this.y = -4;
    this.matrix = createMatrix(Math.floor(Math.random() * 7));
    this.owner = owner;

    this.collide = function (newX, newY, matrix) {
        matrix = matrix ? matrix : this.matrix;
        let board = this.owner.board;
        for (let y = 0; y < matrix.length; y++) {
            let row = matrix[y];
            for (let x = 0; x < row.length; x++) {
                if (row[x] != 0) {
                    let tempX = newX + x;
                    let tempY = newY + y;
                    let cell = board.getCell(tempX, tempY);
                    if (cell == 1) {
                        return 1; //Collision with cell
                    } else if (tempX < 0 || tempX >= TILES_WIDE) {
                        return 2; //Collision with wall
                    } else if (tempY >= TILES_HIGH) {
                        return 3; //hit the bottom/top -game over
                    }
                }
            }
        }
        return 0; //no collision
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
        let newMatrix = Object.assign([], this.matrix);
        newMatrix.reverse();
        for (let y = 0; y < newMatrix.length; y++) {
            for (let x = y + 1; x < newMatrix[y].length; x++) {
                [newMatrix[y][x], newMatrix[x][y]] = [newMatrix[x][y], newMatrix[y][x]];
            }
        }
        if (this.collide(newMatrix) == 0) {
            this.matrix = newMatrix;
        }
    }

    this.moveRight = function () {
        if (this.collide(this.x + 1, this.y) == 0) {
            console.log("right");
            this.x++;
        }
    }

    this.moveLeft = function () {
        if (this.collide(this.x - 1, this.y) == 0) {
            console.log("left");
            this.x--;
        }
    }

    this.gravity = function () {
        let collisionState = this.collide(this.x, this.y + 1);
        if (collisionState == 0) {
            this.y++;
        } else if (collisionState == 1) {
            console.log("cell");
            this.owner.board.fixPiece(this);
        } else if (collisionState == 3) {
            console.log("Game Over");
            this.owner.board.fixPiece(this);
        }
    }

    this.render = function (TILE_SIZE) {
      let COLOR = this.owner.board.COLOR
      console.log(COLOR);
      console.log(255-COLOR);
        fill(255-COLOR);
        let pieceX = this.owner.board.x + this.x * TILE_SIZE;
        let pieceY = this.owner.board.y + this.y * TILE_SIZE;
        for (let y = 0; y < this.matrix.length; y++) {
            let row = this.matrix[y];
            for (let x = 0; x < row.length; x++) {
                if (row[x]) {
                    rect(pieceX + TILE_SIZE * x, pieceY + TILE_SIZE * y, TILE_SIZE, TILE_SIZE);
                }
            }
        }
    }
}
