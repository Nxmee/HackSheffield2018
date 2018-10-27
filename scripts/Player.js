function Player() {
    this.x = 0;
    this.y = 0
    this.matrix = null;
    this.score = 0;

    this.reset = function () {
        this.x = (width / edge) / 2 - 1;
        this.y = 0;
        this.matrix = createPiece(Math.floor(Math.random() * 7));
        if (collide(arena, player)) {
            for (let i = 0; i < arena.length; i++) {
                arena[i].fill(0);
            }
        }
        this.updateScore();
    }

    this.drop = function () {
        this.y++;
        if (collide(arena, this)) {
            this.y--; // recovery
            mergeMatrices(arena, this);
            arenaSweep()
            this.reset();
        }
        time = millis();
    }

    this.rotate = function () {
        this.matrix.reverse();
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = y + 1; x < this.matrix[y].length; x++) {
                [this.matrix[y][x], this.matrix[x][y]] = [this.matrix[x][y], this.matrix[y][x]];
            }
        }
    }

    this.updateScore = function () {
        document.getElementById("score").innerText = this.score;
    }
}