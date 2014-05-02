
// HTML5 data 
var context;
var WIDTH;
var HEIGHT;

// Board
var board;
var block_size = 40;

// Array of players
var player = new Array(4);

// Sprites
var white_bomberman;
var black_bomberman;
var red_bomberman;
var blue_bomberman;
var bomb_sprite;

init();
main();

// Initialize everything
function init() {
    // Get a reference to the canvas
    context = $("#canvas")[0].getContext("2d");

    // Block borders style
    context.strokeStyle = "black";
    //context.lineWidth = 3;

    // Get canvas dimensions
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();

    // Disable smoothness for pixelated effect
    context.webkitImageSmoothingEnabled = false;

    // Load level map
    board = level1;

    // Load sprites
    white_bomberman = new Image();
    black_bomberman = new Image();
    red_bomberman = new Image();
    blue_bomberman = new Image();
    bomb_sprite = new Image();

    white_bomberman.src = 'resources/sprites/white_bomberman.gif';
    black_bomberman.src = 'resources/sprites/black_bomberman.gif';
    red_bomberman.src = 'resources/sprites/red_bomberman.gif';
    blue_bomberman.src = 'resources/sprites/blue_bomberman.gif';
    bomb_sprite.src = 'resources/sprites/bombs.gif'

    // Initialize players
    player[0] = new Player(white_bomberman, board, "Chafic", 0, block_size, block_size);
    player[1] = new Player(black_bomberman, board, "Rachel", 1, WIDTH-2*block_size, block_size);
    player[2] = new Player(red_bomberman, board, "Richard", 2, block_size, HEIGHT-2*block_size);
    player[3] = new Player(blue_bomberman, board, "Zouzou", 3, WIDTH-2*block_size, HEIGHT-2*block_size);
}

// Game loop
function main() {
    requestAnimationFrame(main);
    $(document).keydown(onKeyDown);
    update();
    draw();
}

// Handle input (JQuery)
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

// Update game state
function update() {
    for (var i = 0; i < 4; i++) {
        // Update player position and animation 
        player[i].move();

        // Update bombs state 
        if (player[i].release_bomb) {
            player[i].bombs.push(new Bomb(bomb_sprite, player[i].x, player[i].y, 1));
            player[i].release_bomb = false;
        }

        // Remove exploded bombs 
        if (typeof(player[i].bombs[0]) != "undefined" && player[i].bombs[0].exploded)
            player[i].bombs.shift();
    }
}

function draw() {
    // Clear screen (erase everything)
    context.clearRect(0, 0, WIDTH, HEIGHT);

    // Fill background
    draw_block(0, 0, WIDTH, HEIGHT, "rgba(0, 0, 0, 1)");

    // Draw blocks
    for (var i = 0; i < 15; i++)
        for (var j = 0; j < 15; j++)
            if (board[j][i] == 1)
                draw_block(i*block_size, j*block_size, block_size, block_size, "rgba(255, 255, 255, 1)");
            else if (board[j][i] == 2)
                draw_block(i*block_size, j*block_size, block_size, block_size, "rgba(0, 255, 255, 1)");

    // Draw bombs
    for (var i = 0; i < player.length; i++)
        for (var j = 0; j < player[i].bombs.length; j++)
            player[i].bombs[j].draw();

    // Draw players
    player[0].draw();
    player[1].draw();
    player[2].draw();
    player[3].draw();
}
