window.TILES_HIGH = 20;
window.TILES_WIDE = 10;

function Tetris() {
    this.drawMatrix = function(matrix, offset) {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] != 0) {
                    noStroke();
                    fill(colors[matrix[y][x] - 1]);
                    rect((x + offset[0]) * edge, (y + offset[1]) * edge, edge, edge);
                }
            }
        }
    }

    this.mergeMatrices = function(arena, piece) {
        for (let y = 0; y < piece.matrix.length; y++) {
            for (let x = 0; x < piece.matrix[y].length; x++) {
                if (piece.matrix[y][x] != 0) {
                    arena[y + piece.y][x + piece.x] = piece.matrix[y][x];
                }
            }
        }
    }

    function arenaSweep() {
        let rowCount = 1;
        for (let y = 0; y < arena.length; y++) {
            let full = 1;
            for (let x = 0; x < arena[y].length; x++) {
                if (arena[y][x] == 0) {
                    full = 0;
                    break;
                }
            }
            if (full != 1) continue;
            arena.splice(y, 1);
            arena.unshift(new Array(width / edge).fill(0));

            player.score += 10 * rowCount;
            rowCount *= 2;
        }
    }
}
