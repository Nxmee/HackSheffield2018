function Piece(owner, board) {
    this.x = TILES_WIDE / 2;
    this.y = (owner.direction < 0) ? TILES_HIGH : -4;
    let shapeIndex = 0;
    let shapes = createMatrices(Math.floor(Math.random() * 7));
    this.owner = owner;
    this.board = board;
    this.buildMode = true;
    this.firstCollision = false;

    this.collide = function (newX, newY, matrix, board) {
        board = board != null ? board : this.board;
        matrix = matrix != null ? matrix : this.matrix();
        for (let y = 0; y < matrix.length; y++) {
            let row = matrix[y];
            for (let x = 0; x < row.length; x++) {
                if (row[x] != 0) {
                    let tempX = newX + x;
                    let tempY = newY + y;
                    let cell = board.getCell(tempX, tempY);
                    if (cell == 1) {
                        if (this.buildMode == false) {
                            if (this.firstCollision) {
                                return 1;
                            } else {
                                this.firstCollision = true;
                                return 0;
                            }
                        } else {
                            return 1;
                        }
                        return 1; //Collision with cell
                    } else if (tempX < 0 || tempX >= TILES_WIDE) {
                        return 2; //Collision with wall
                    } else if ((owner.direction > 0) ? tempY >= TILES_HIGH/2+1 : tempY <=TILES_HIGH/2-3) {
                        return 3; //hit the bottom/top -game over
                    } else if ((owner.direction > 0) ? tempY >= TILES_HIGH/2 : tempY <= TILES_HIGH/2) {
                        return 4; //inside the buffer zone cannot make a swap
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
        let newIndex = (shapeIndex + 1) % shapes.length;

        if (this.collide(this.x, this.y, shapes[newIndex]) == 0) {
            shapeIndex = newIndex;
        }
    };

    this.matrix = function () {
        return shapes[shapeIndex];
    }

    this.moveRight = function () {
        let collisionState = this.collide(this.x + 1, this.y);
        if (collisionState == 0 || collisionState == 4) {
            this.x++;
        }
    };

    this.moveLeft = function () {
        let collisionState = this.collide(this.x - 1, this.y);
        if (collisionState == 0 || collisionState == 4) {
            this.x--;
        }
    }

    this.swap = function() {
        if (this.buildMode || this.collide(this.x,this.y)!=4) {
            let newX = TILES_WIDE - this.x - this.matrix().length;
            let newBoard = this.buildMode ? this.owner.destroyBoard : this.owner.buildBoard;

            if (this.collide(newX,this.y,this.matrix(),newBoard) == 0) {
                this.x = newX;
                this.board = newBoard;
                this.buildMode = !this.buildMode;
            }
        }
    }

    this.gravity = function () {
        let collisionState = this.collide(this.x, this.y + this.owner.direction);
        if (collisionState == 0 || collisionState == 4) {
            this.y+=this.owner.direction;
        } else if (collisionState == 1) {
            this.board.fixPiece(this);
        } else if (collisionState == 3) {
            console.log("Game Over");
            window.reset();
        }
    }

    this.render = function (TILE_SIZE) {
        let COLOR = this.board == this.owner.buildBoard ? 255 : 0;
        fill(255 - COLOR);
        let pieceX = this.board.x + this.x * TILE_SIZE;
        let pieceY = this.board.y + this.y * TILE_SIZE;
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

    this.onBoard = function () {

      for (let itY = 0; itY < shapes.length; itY++) {
        for (let itX = 0; itX < shapes[itY].length; itX++) {
          if (shapes[itY][itX] != 0) {
            if (this.y + itY < 0 || this.y + itY > TILES_HIGH) {
              return false
            }

          }
        }

      }
      return true
    }
}
