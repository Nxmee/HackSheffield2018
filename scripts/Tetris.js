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

    this.mergeMatrices = function(arena, player) {
        for (let y = 0; y < player.matrix.length; y++) {
            for (let x = 0; x < player.matrix[y].length; x++) {
                if (player.matrix[y][x] != 0) {
                    arena[y + player.y][x + player.x] = player.matrix[y][x];
                }
            }
        }
    }

    function collide(arena, player) {
        for (let y = 0; y < player.matrix.length; y++) {
            for (let x = 0; x < player.matrix[0].length; x++) {
                if (player.matrix[y][x] != 0 && (arena[y + player.y] && arena[y + player.y][x + player.x]) != 0) {
                    return true;
                }
            }
        }
        return false;
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

    function createPiece(type) {
        switch (type) {
            case 0:
                return [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 1, 0],
                ];
            case 1:
                return [
                    [2, 2],
                    [2, 2],
                ];
            case 2:
                return [
                    [0, 3, 0],
                    [0, 3, 0],
                    [0, 3, 3],
                ];
            case 3:
                return [
                    [0, 4, 0],
                    [0, 4, 0],
                    [4, 4, 0],
                ];
            case 4:
                return [
                    [0, 5, 0, 0],
                    [0, 5, 0, 0],
                    [0, 5, 0, 0],
                    [0, 5, 0, 0],
                ];
            case 5:
                return [
                    [0, 6, 6],
                    [6, 6, 0],
                    [0, 0, 0],
                ];
            case 6:
                return [
                    [7, 7, 0],
                    [0, 7, 7],
                    [0, 0, 0],
                ];
        }
    }
}