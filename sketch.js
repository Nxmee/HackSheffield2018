let p1,p2,game,time

function setup() {
    createCanvas(240, 400);
    p1 = new Player();
    p2 = new Player();
    p1.newPiece();
    p2.newPiece();
    game = new Tetris(p1,p2);
}

function draw() {
    background(0);
    game.process();
    game.render();
}

function keyPressed() {
    switch (keyCode) {
        case LEFT_ARROW:
            p2.moveLeft();
        case RIGHT_ARROW:
            p2.moveRight();
        case UP_ARROW:
            p2.rotate();
        case DOWN_ARROW:
            p2.release();
        case 65: //A
            p1.moveLeft();
        case 68: //D
            p1.moveRight();
        case 87: //W
            p1.rotate();
        case 83: //S
            p1.release();
    }
}
