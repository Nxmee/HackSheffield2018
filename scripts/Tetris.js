window.TILES_HIGH = 20;
window.TILES_WIDE = 10;
function Tetris() {
    this.leftBoard = new Board(color(255));
    this.rightBoard = new Board(color(0));
    this.p1 = new Player(this.leftBoard);
    this.p2 = new Player(this.rightBoard);
    this.TILE_SIZE;
    let lastDrop = millis();

    this.render = function() {
        background(180);
        noStroke();
        //render each side

        //render Boards
        this.leftBoard.render();
        this.rightBoard.render();

        //render Players
        this.p1.render(this.TILE_SIZE);
        this.p2.render(this.TILE_SIZE);
    };

    this.process = function() {
        let now = millis();
        if (now-lastDrop>500){
            lastDrop = now;
            this.p1.gravity();
            this.p2.gravity();
        }
    };

    this.updateSize = function(){
        let TILE_SIZE = Math.min((width/2)/TILES_WIDE, height/TILES_HIGH);
        let boardWidth = TILE_SIZE*TILES_WIDE;
        let boardHeight = TILE_SIZE*TILES_HIGH;
        let boardHeightOffset = height/2-boardHeight/2;
        this.leftBoard.updateSize(width/2-boardWidth,boardHeightOffset,boardWidth,boardHeight);
        this.rightBoard.updateSize(width/2,boardHeightOffset,boardWidth,boardHeight);
        this.TILE_SIZE = TILE_SIZE;
    };
    this.updateSize();
}
