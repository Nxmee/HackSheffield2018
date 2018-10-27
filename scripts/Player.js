function Player() {
    this.score = 0;
    this.pieces = [];

    this.updateScore = function () {
        document.getElementById("score").innerText = this.score;
    }
}
