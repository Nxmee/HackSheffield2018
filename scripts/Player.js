function Player(b) {
    this.score = 0;
    this.pieces = [];
    this.board = b;

    this.newPiece = function () {
        this.pieces.push(new Piece(this));
    }
    this.newPiece();

    this.rotate = function () {
        this.pieces.lastChild.rotate();
    }

    this.moveLeft = function () {
        this.pieces.lastChild.moveLeft();
    }

    this.moveRight = function () {
        this.pieces.lastChild.moveRight();
    }

    this.release = function () {
        this.pieces.lastChild.release();
        this.newPiece();
    }

    this.gravity = function(){
        this.pieces.forEach(function(piece){
            piece.gravity();
        })
    }

    this.updateScore = function () {
        document.getElementById("score").innerText = this.score;
    }

    this.render = function (TILE_SIZE) {
        blendMode(DIFFERENCE);
        this.pieces.forEach(function(piece){
           piece.render(TILE_SIZE);
        });
    }
}