
// Window information
var context;
var WIDTH;
var HEIGHT;
var interval_id;

// Array of players (4 players)
var player = new Array(4);

// Board
var board;

// Frame
var frame = 0;

// Grid
var grid_height = 10;
var grid_width = 10;

// Maximum and minimum canvas coordinates on the x-axis
var canvas_min_x;
var canvas_max_x;

// Sprite
var sprite_sheet;

// Initialize everything
function init() {
    // Get a reference to the canvas
    context = $("#canvas")[0].getContext("2d");

    // Get canvas dimensions
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();

    // Game loop iteration every 17 milliseconds
    interval_id = setInterval(main, 1000/60);

    // Initialize mouse
    canvas_min_x = $("#canvas").offset().left;
    canvas_max_x = canvas_min_x + WIDTH;

    // Disable smoothness for pixelated effect
    context.webkitImageSmoothingEnabled = false;

    // Load level map
    board = level1;

    // Load sprite
    sprite_sheet = new Image();
    sprite_sheet.src = 'resources/sprites/bomberman.gif';

    // Initialize players
    player[0] = new Player(sprite_sheet, board, "Chafic", Player.LENGTH, Player.LENGTH);
    player[1] = new Player(sprite_sheet, board, "Rachel", WIDTH-2*Player.LENGTH, Player.LENGTH);
    player[2] = new Player(sprite_sheet, board, "Richard", Player.LENGTH, HEIGHT-2*Player.LENGTH);
    player[3] = new Player(sprite_sheet, board, "Zouzou", WIDTH-2*Player.LENGTH, HEIGHT-2*Player.LENGTH);
}

// JQuery
$(document).keydown(onKeyDown);

function onKeyDown(evt) {
    switch(evt.keyCode) {
        case 37:    // left arrow
            player[0].left = true;
            break;
        case 38:    // up arrow
            player[0].up = true;
            break;
        case 39:    // right arrow
            player[0].right = true;
            break;
        case 40:    // down arrow
            player[0].down = true;
            break;
        case 32:    // space
            player[0].release_bomb = true;
            break;
        case 65:    // a
            player[1].left = true;
            break;
        case 87:    // w
            player[1].up = true;
            break;
        case 68:    // d
            player[1].right = true;
            break;
        case 83:    // s
            player[1].down = true;
            break;
        case 16:    // left shift
            player[1].release_bomb = true;
        default:
            break;
    }
}

function main() {
    update();
    draw();
}

function update() {

    for (var i = 0; i < 4; i++) {
        player[i].move();

        // Animation
        if (player[i].toggle) {
            player[i].stand = !player[i].stand;
            player[i].toggle = false;
        }

        // Bomb
        if (player[i].release_bomb) {

            if (board[player[i].y/Player.LENGTH-1][player[i].x/Player.LENGTH] != 2)
                board[player[i].y/Player.LENGTH-1][player[i].x/Player.LENGTH] = 0;

            if (board[player[i].y/Player.LENGTH][player[i].x/Player.LENGTH-1] != 2)
                board[player[i].y/Player.LENGTH][player[i].x/Player.LENGTH-1] = 0;

            if (board[player[i].y/Player.LENGTH+1][player[i].x/Player.LENGTH] != 2)
                board[player[i].y/Player.LENGTH+1][player[i].x/Player.LENGTH] = 0;

            if (board[player[i].y/Player.LENGTH][player[i].x/Player.LENGTH+1] != 2)
                board[player[i].y/Player.LENGTH][player[i].x/Player.LENGTH+1] = 0;

            player[i].release_bomb = false;
        }

        // Frame
        frame++;
    }
}

function draw() {
    // Clear screen (erase everything)
    clear();

    // Fill background
    context.fillStyle = "rgba(0, 0, 0, 1)";
    rect(0, 0, WIDTH, HEIGHT);

    // Draw blocks
    for (var i = 0; i < 15; i++)
        for (var j = 0; j < 15; j++)
            if (board[j][i] == 1) {
                context.fillStyle = "rgba(255, 255, 255, 1)";
                rect(i*Player.LENGTH, j*Player.LENGTH, Player.LENGTH, Player.LENGTH);
            } 
            else if (board[j][i] == 2) {
                context.fillStyle = "rgba(0, 255, 255, 1)";
                rect(i*Player.LENGTH, j*Player.LENGTH, Player.LENGTH, Player.LENGTH);
            }

    // Draw players
    player[0].draw();
    player[1].draw();
    player[2].draw();
    player[3].draw();
}

function clear() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
}

init();
