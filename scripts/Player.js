function Player() {
    this.score = 0;
    this.pieces = [];

    this.rotate = function () {
        this.pieces[pieces.length-1].rotate;
    }

    this.moveLeft = function () {
        this.pieces[pieces.length-1].moveLeft;
    }

    this.moveRight = function () {
        this.pieces[pieces.length-1].moveRight;
    }

    this.release = function () {
        this.pieces[pieces.length-1].release;
    }

    this.updateScore = function () {
        document.getElementById("score").innerText = this.score;
    }
}
