function Player(b) {
    this.score = 0;
    this.pieces = [new Piece(this)];
    this.board = b;

    this.newPiece = function () {
        this.pieces.push(new Piece(this));
    };

    this.rotate = function () {
        this.pieces[this.pieces.length-1].rotate();
    };

    this.moveLeft = function () {
        this.pieces[this.pieces.length-1].moveLeft();
    };

    this.moveRight = function () {
        this.pieces[this.pieces.length-1].moveRight();
    };

    this.release = function () {
        this.newPiece();
    };

    this.gravity = function(){
        this.pieces.forEach(function(piece){
            if (piece) {
                piece.gravity();
            }
        })
    };

    this.updateScore = function () {
        document.getElementById("score").innerText = this.score;
    };

    this.render = function (TILE_SIZE) {
        blendMode(DIFFERENCE);
        this.pieces.forEach(function(piece){
            if (piece) {
                piece.render(TILE_SIZE);
            }
        });
    }
}