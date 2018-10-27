function Board(color) {
    const COLOR = color;

    //store the initial board dimensions
    this.x;
    this.y;
    this.boardWidth;
    this.boardHeight;

    let board = new Array(TILES_WIDE);
    for (let i = 0; i < TILES_WIDE; i++) {
        board[i] = new Array(TILES_HIGH);
    }

    this.render = function () {
        fill(COLOR);
        rect(this.x, this.y, this.boardWidth, this.boardHeight);
    }

    this.updateSize = function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.boardWidth = width;
        this.boardHeight = height;
    }

    this.getCell = function(x,y){
        return board[x][y];
    }
}