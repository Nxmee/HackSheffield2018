function Piece(owner) {
    this.x = TILES_WIDE / 2;
    this.y = -4;
    let shapeIndex = 0;
    let shapes = createMatrices(Math.floor(Math.random() * 7));
    this.owner = owner;

    this.collide = function (newX, newY, matrix) {
        matrix = matrix != null ? matrix : this.matrix();
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

    function createMatrices(type) {
        switch (type) {
            case 0:
                return [
                    [
                        [0, 0, 0],
                        [1, 1, 1],
                        [0, 1, 0]
                    ],
                    [
                        [0, 1, 0],
                        [1, 1, 0],
                        [0, 1, 0]
                    ],
                    [
                        [0, 1, 0],
                        [1, 1, 1],
                        [0, 0, 0]
                    ],
                    [
                        [0, 1, 0],
                        [0, 1, 1],
                        [0, 1, 0]
                    ]
                ];
            case 1:
                return [[
                    [1, 1],
                    [1, 1]
                ]];
            case 2:
                return [
                    [
                        [0, 1, 0],
                        [0, 1, 0],
                        [0, 1, 1]
                    ],
                    [
                        [0, 0, 0],
                        [1, 1, 1],
                        [1, 0, 0]
                    ],
                    [
                        [1, 1, 0],
                        [0, 1, 0],
                        [0, 1, 0]
                    ],
                    [
                        [0, 0, 1],
                        [1, 1, 1],
                        [0, 0, 0]
                    ],
                ];
            case 3:
                return [
                    [
                        [0, 1, 0],
                        [0, 1, 0],
                        [1, 1, 0]
                    ],
                    [
                        [1, 0, 0],
                        [1, 1, 1],
                        [0, 0, 0]
                    ],
                    [
                        [0, 1, 1],
                        [0, 1, 0],
                        [0, 1, 0]
                    ],
                    [
                        [0, 0, 0],
                        [1, 1, 1],
                        [0, 0, 1]
                    ]
                ];
            case 4:
                return [
                    [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 1],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ];
            case 5:
                return [
                    [
                        [0, 1, 1],
                        [1, 1, 0],
                        [0, 0, 0]
                    ],
                    [
                        [0, 1, 0],
                        [0, 1, 1],
                        [0, 0, 1]
                    ],
                    [
                        [0, 0, 0],
                        [0, 1, 1],
                        [1, 1, 0]
                    ],
                    [
                        [1, 0, 0],
                        [1, 1, 0],
                        [0, 1, 0]
                    ]
                ];
            case 6:
                return [
                    [
                        [1, 1, 0],
                        [0, 1, 1],
                        [0, 0, 0]
                    ],
                    [
                        [0, 0, 1],
                        [0, 1, 1],
                        [0, 1, 0]
                    ],
                    [
                        [0, 0, 0],
                        [1, 1, 0],
                        [0, 1, 1]
                    ],
                    [
                        [0, 1, 0],
                        [1, 1, 0],
                        [1, 0, 0]
                    ]
                ];
        }
    }

    this.rotate = function () {
        let newIndex = (shapeIndex+1) % shapes.length;

        if (this.collide(this.x, this.y, shapes[newIndex]) == 0) {
            shapeIndex = newIndex;
        }
    };

    this.matrix = function(){
        return shapes[shapeIndex];
    }

    this.moveRight = function () {
        if (this.collide(this.x + 1, this.y) == 0) {
            console.log("right");
            this.x++;
        }
    };

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
            this.owner.board.fixPiece(this);
            this.owner.newPiece();
        } else if (collisionState == 3) {
            console.log("Game Over");
            this.owner.board.fixPiece(this);
        }
    }

    this.render = function (TILE_SIZE) {
        let COLOR = this.owner.board.COLOR;
        fill(255-COLOR);
        let pieceX = this.owner.board.x + this.x * TILE_SIZE;
        let pieceY = this.owner.board.y + this.y * TILE_SIZE;
        let matrix = this.matrix();
        for (let y = 0; y < matrix.length; y++) {
            let row = matrix[y];
            for (let x = 0; x < row.length; x++) {
                if (row[x]) {
                    rect(pieceX + TILE_SIZE * x, pieceY + TILE_SIZE * y, TILE_SIZE, TILE_SIZE);
                }
            }
        }
    }
}
