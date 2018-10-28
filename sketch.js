let p1, p2, game

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
            break;
        case RIGHT_ARROW:
            game.p2.moveRight();
            break;
        case UP_ARROW:
            game.p2.rotate();
            break;
        case DOWN_ARROW:
            game.p2.release();
            break;
        case 65: //A
            game.p1.moveLeft();
            break;
        case 68: //D
            game.p1.moveRight();
            break;
        case 87: //W
            game.p1.rotate();
            break;
        case 83: //S
            game.p1.release();
            break;
    }
}