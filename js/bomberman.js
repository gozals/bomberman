// HTML5 data 
var context;
var WIDTH;
var HEIGHT;

// Board
var board;
var block_size = 40;

// Array of players
var player = [];

// Sprites
var white_bomberman;
var black_bomberman;
var red_bomberman;
var blue_bomberman;
var bomb_sprite;
var explosion_sprite;

init();
main();

// Initialize everything
function init() {
    // Get a reference to the canvas
    var canvas = document.getElementById("canvas");

    context = canvas.getContext("2d");

    // Block borders style
    context.strokeStyle = "black";

    // Get canvas dimensions
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    // For some reason, the canvas dimensions differ by one pixel when zooming in or out
    if (WIDTH != 600)
        WIDTH = 600;
    if (HEIGHT != 600)
        HEIGHT = 600;

    // Disab/le smoothness for pixelated effect
    context.webkitImageSmoothingEnabled = false;

    // Load level map
    board = new Board(15, 15, 1);

    // Load sprites
    white_bomberman = new Image();
    black_bomberman = new Image();
    red_bomberman = new Image();
    blue_bomberman = new Image();
    bomb_sprite = new Image();
    explosion_sprite = new Image();
    powerups_sprite = new Image();

    white_bomberman.src = 'resources/sprites/white_bomberman.gif';
    black_bomberman.src = 'resources/sprites/black_bomberman.gif';
    red_bomberman.src = 'resources/sprites/red_bomberman.gif';
    blue_bomberman.src = 'resources/sprites/blue_bomberman.gif';
    bomb_sprite.src = 'resources/sprites/bombs.gif';
    explosion_sprite.src = 'resources/sprites/explosion.gif';
    powerups_sprite.src = 'resources/sprites/power-ups.gif';

    // Initialize players
    player[0] = new Player(white_bomberman, "Chafic", 0, block_size, block_size);
    player[1] = new Player(black_bomberman, "Rachel", 1, WIDTH-2*block_size, block_size);
    player[2] = new Player(red_bomberman, "Richard", 2, block_size, HEIGHT-2*block_size);
    player[3] = new Player(blue_bomberman, "Zouzou", 3, WIDTH-2*block_size, HEIGHT-2*block_size);

    paused = false;
    input();
}

// Game loop
function main() {
    requestAnimationFrame(main);
    update();
    draw();
    if (paused) {
        var pause_width = 140;
        var pause_height = 30;
        draw_block((WIDTH-pause_width)/2, (HEIGHT-pause_height)/2, pause_width, pause_height, "rgba(100, 100, 100, 1)");

        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.font="25px Open Sans";
        context.fillText("PAUSE", (WIDTH-pause_width)/2+30, (HEIGHT-pause_height)/2+25, 500);
    }
}

// Handle input 
function input() {
    document.addEventListener('keydown', function(event) {
        if (!paused)
            switch(event.keyCode) {
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
                    if (player[0].bombs.length < player[0].bomb_limit)
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
                    if (player[1].bombs.length < player[1].bomb_limit)
                        player[1].release_bomb = true;
                    break;
                default:
                    break;
            }
    });

    document.addEventListener('keyup', function(event) {
        switch(event.keyCode) {
            case 37:    // left arrow
                player[0].left = false;
                break;
            case 38:    // up arrow
                player[0].up = false;
                break;
            case 39:    // right arrow
                player[0].right = false;
                break;
            case 40:    // down arrow
                player[0].down = false;
                break;
            case 65:    // a
                player[1].left = false;
                break;
            case 87:    // w
                player[1].up = false;
                break;
            case 68:    // d
                player[1].right = false;
                break;
            case 83:    // s
                player[1].down = false;
                break;
            case 80:    // p
                console.log("Paused!");
                paused = !paused;
                break;
            default:
                break;
        }
    });

}

// Update game state
function update() {
    for (var i = 0; i < player.length; i++) {

        // Remove exploded bombs (which can happen even when the player is dead)
        if (typeof(player[i].bombs[0]) != "undefined" && player[i].bombs[0].exploded)
            player[i].bombs.shift();

        // Update bomb state (which can happen even when the player is dead)
        for (var j = 0; j < player[i].bombs.length; j++)
            player[i].bombs[j].update();

        // Check if player is stepping on a power-up and have him pick it up
        var board_x = convert_to_bitmap_position(player[i].x + player[i].sprite_width/2);
        var board_y = convert_to_bitmap_position(player[i].y + player[i].sprite_height/2);
        var power_up = board.board_powerups[board_y][board_x];
        if (power_up != 0) {
            board.board_powerups[board_y][board_x] = 0;
            player[i].add_power_up(power_up);
        }


        if (player[i].alive) {

            // Update player position and sprite animation 
            player[i].move();

            // Release new bombs
            if (player[i].release_bomb) {
                var x_bomb = convert_to_bitmap_position(player[i].x + player[i].sprite_width/2)*block_size;
                var y_bomb = convert_to_bitmap_position(player[i].y + player[i].sprite_height/2)*block_size;
                player[i].bombs.push(new Bomb(bomb_sprite,
                            explosion_sprite,
                            x_bomb,
                            y_bomb,
                            player[i].bomb_radius));
                player[i].release_bomb = false;
            }
        }
    }
}

function draw() {

    // Clear screen (erase everything)
    context.clearRect(0, 0, WIDTH, HEIGHT);

    // Fill background
    draw_block(0, 0, WIDTH, HEIGHT, "rgba(0, 0, 0, 1)");

    // Draw power_ups
    for (var i = 0; i < board.height; i++)
        for (var j = 0; j < board.width; j++) {
            var powerup = board.board_powerups[i][j];
            if (powerup != 0 && board.level[i][j] == 0) {
                var sprite = fetch_sprite(board.powerups[powerup]);
                context.drawImage(powerups_sprite, sprite[0], sprite[1], sprite[2], sprite[3], j*block_size, i*block_size, sprite[2]*(block_size/sprite[3]), block_size);
            }
        }

    // Draw blocks
    for (var i = 0; i < 15; i++)
        for (var j = 0; j < 15; j++)
            if (board.level[j][i] == 1)
                draw_block(i*block_size, j*block_size, block_size, block_size, "rgba(255, 255, 255, 1)");
            else if (board.level[j][i] == 2)
                draw_block(i*block_size, j*block_size, block_size, block_size, "rgba(0, 255, 255, 1)");

    // Draw bombs
    for (var i = 0; i < player.length; i++)
        for (var j = 0; j < player[i].bombs.length; j++)
            player[i].bombs[j].draw();

            
    // Draw players
    for (var i = 0; i < player.length; i++)
        if (player[i].alive == true)
            player[i].draw();

}
