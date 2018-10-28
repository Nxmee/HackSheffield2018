function Player(b,d,dir) {
    this.score = 0;
    this.buildBoard = b;
    this.destroyBoard = d;
    this.direction = dir;
    this.pieces = [new Piece(this,b)];

    this.newPiece = function () {
        this.pieces.push(new Piece(this, this.buildBoard));
    };

    this.rotate = function () {
        if (this.pieces.length > 0) {
            this.pieces[this.pieces.length - 1].rotate();
        }
    };

    this.moveLeft = function () {
        if (this.pieces.length > 0) {
            this.pieces[this.pieces.length - 1].moveLeft();
        }
    };

    this.moveRight = function () {
        if (this.pieces.length > 0) {
            this.pieces[this.pieces.length - 1].moveRight();
        }
    };

    this.release = function () {
      if (this.pieces[this.pieces.length - 1].onBoard()) {
        this.newPiece();
      }
    };

    this.swap = function() {
        this.pieces[this.pieces.length-1].swap();
    }

    this.gravity = function () {
        if (this.pieces.length > 0) {
            this.pieces.forEach(function (piece) {
                piece.gravity();
            })
        }
    };

    this.updateScore = function () {
        document.getElementById("score").innerText = this.score;
    };

    this.render = function (TILE_SIZE) {
        if (this.pieces.length > 0) {
            this.pieces.forEach(function (piece) {
                piece.render(TILE_SIZE);
            });
        }
    }
}
