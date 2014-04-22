
/* Bomberman clone */

// Window data
var ctx;
var WIDTH;
var HEIGHT;
var intervalId = 0;

// Bomberman
var length = 40;
var x = length;
var y = length;
var dx = 2;
var dy = 4;

// Board
var board;

// Frame
var frame = 0;

// Bomberman sprite
var bomberman;
var sprite_width = 12;
var sprite_height = 18;
var toggle = false;
var stand = true;

// Bomb
var bomb = false;

// Grid
var grid_height = 10;
var grid_width = 10;

// Keyboard
var left = false;
var up = false;
var right = false;
var down = false;

// Maximum and minimum canvas coordinates on the x-axis
var canvasMinX = 0;
var canvasMaxX = 0;

// Initialize everything
function init() {
    // Get a reference to the canvas
    ctx = $("#canvas")[0].getContext("2d");

    // Get canvas dimensions
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();

    // Game loop iteration every 17 milliseconds
    intervalId = setInterval(main, 1000/60);

    // Initialize mouse
    canvasMinX = $("#canvas").offset().left;
    canvasMaxX = canvasMinX + WIDTH;

    // Load bombeman sprite
    bomberman = new Image();
    bomberman.src = 'resources/sprites/bomberman.gif';

    // Disable smoothness for pixelated effect
    ctx.webkitImageSmoothingEnabled = false;

    // Load level map
    board = level1;
}

// JQuery
$(document).keydown(onKeyDown);
$(document).mousemove(onMouseMove);

function onKeyDown(evt) {
    switch(evt.keyCode) {
        case 37:
            left = true;
            break;
        case 38:
            up = true;
            break;
        case 39:
            right = true;
            break;
        case 40:
            down = true;
            break;
        case 32:
            bomb = true;
            break;
        default:
            break;
    }
}

function onMouseMove(evt) {
    //if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX)
        //x = evt.pageX - canvasMinX - 40/2;
}

function main() {
    update();
    draw();
}

function update() {

    // Update block position
    if (left | up | right | down)
        toggle = true;

    if (left) {
        x -= length;
        if (board[y/length][x/length] == 1)
            x += length;
    }
    if (up) {
        y -= length;
        if (board[y/length][x/length] == 1)
            y += length;
    }
    if (right) {
        x += length;
        if (board[y/length][x/length] == 1)
            x -= length;
    }
    if (down) {
        y += length;
        if (board[y/length][x/length] == 1)
            y -= length;
    }

    left = false;
    up = false;
    right = false;
    down = false;

    // Sprite animation
    if (toggle) {
        stand = !stand;
        toggle = false;
    }

    // Bomb
    if (bomb) {
        board[y/length-1][x/length] = 0;
        board[y/length][x/length-1] = 0;
        board[y/length+1][x/length] = 0;
        board[y/length][x/length+1] = 0;
        bomb = false;
    }

    // Frame
    frame++;
}

function draw() {
    // Clear screen (erase everything)
    clear();

    // Draw background
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    rect(0, 0, WIDTH, HEIGHT);

    // Drawing blocks
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    for (var i = 0; i < 15; i++)
        for (var j = 0; j < 15; j++)
            if (board[j][i])
                rect(i*length, j*length, length, length);

    // Drawing bomberman
    if (stand)
        ctx.drawImage(bomberman, 8, 2, 15, 22, x+7, y, 15+sprite_width, 22+sprite_height);
    else
        ctx.drawImage(bomberman, 8+15, 2, 15, 22, x+7, y, 15+sprite_width, 22+sprite_height);
}

function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
    ctx.rect(x, y, w, h);

    // Draw borders
    ctx.strokeStyle = "black";
    ctx.lineWidth   = 3;
    ctx.stroke();
}


function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

init();
