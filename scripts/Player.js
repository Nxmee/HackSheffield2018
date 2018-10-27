function Player() {
    this.score = 0;
    this.pieceControlled = null;

    this.newPiece = function () {
        this.pieceControlled = new Piece(this);
        this.pieceControlled.reset();
    }

    this.rotate = function () {
        this.pieceControlled.rotate;
    }

    this.moveLeft = function () {
        this.pieceControlled.moveLeft;
    }

    this.moveRight = function () {
        this.pieceControlled.moveRight;
    }

    this.release = function () {
        //this.pieceControlled.release;
        this.newPiece();
    }

    this.updateScore = function () {
        document.getElementById("score").innerText = this.score;
    }
}
