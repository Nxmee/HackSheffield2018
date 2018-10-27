let p1,p2,game

function setup() {
    createCanvas(windowWidth, windowHeight);
    game = new Tetris();
}

function draw() {
    game.process();
    game.render();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    game.updateSize();
    game.render();
}

function keyPressed() {
    switch (keyCode) {
        case LEFT_ARROW:
            game.p2.moveLeft();
        case RIGHT_ARROW:
            game.p2.moveRight();
        case UP_ARROW:
            game.p2.rotate();
        case DOWN_ARROW:
            game.p2.release();
        case 65: //A
            game.p1.moveLeft();
        case 68: //D
            game.p1.moveRight();
        case 87: //W
            game.p1.rotate();
        case 83: //S
            game.p1.release();
    }
}