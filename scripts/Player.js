function Player(b) {
    this.score = 0;
    this.pieces = [new Piece(this)];
    this.board = b;

    this.newPiece = function () {
        this.pieces.push(new Piece(this));
    };

    this.rotate = function () {
        if (this.pieces.length > 0) {
            this.pieces[this.pieces.length - 1].rotate();
        }
    };

    this.moveLeft = function () {
        if (this.pieces.length > 0) {
            console.log(this.pieces);
            this.pieces[this.pieces.length - 1].moveLeft();
        }
    };

    this.moveRight = function () {
        if (this.pieces.length > 0) {
            this.pieces[this.pieces.length - 1].moveRight();
        }
    };

    this.release = function () {
        if (this.pieces.length > 0) {
            this.newPiece();
        }
    };

    this.gravity = function(){
        if (this.pieces.length > 0) {
            this.pieces.forEach(function (piece) {
                if (piece) {
                    piece.gravity();
                }
            })
        }
    };

    this.updateScore = function () {
        document.getElementById("score").innerText = this.score;
    };

    this.render = function (TILE_SIZE) {
        this.pieces.forEach(function(piece){
            if (piece) {
                piece.render(TILE_SIZE);
            }
        });
    }
}