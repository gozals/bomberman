
function Bomb(sprite_sheet, x, y, radius) {
    this.sprite_sheet = sprite_sheet;
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.start_time = new Date();
    this.time_diff = 0;

    setTimeout(this.explode.bind(this), 2000);
    this.exploded = false;
}

Bomb.prototype.draw = function() {
    this.end_time = new Date();
    this.time_diff = this.end_time - this.start_time;

    if (this.time_diff <= 1000) {
        var sprite = fetch_sprite("bomb_small");
        context.drawImage(this.sprite_sheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2]*(block_size/sprite[3]), block_size);
    }

    else if (this.time_diff <= 2000){
        var sprite = fetch_sprite("bomb_large");
        context.drawImage(this.sprite_sheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2]*(block_size/sprite[3]), block_size);
    }
}

Bomb.prototype.explode = function() {
    // Destroy surrounding blocks
    var bomb_y = this.y/block_size;
    var bomb_x = this.x/block_size;

    // Destroy above block
    for (var i = 1; i <= this.radius; i++)
        if (board[(bomb_y-1*i)][bomb_x] != 2) {
            board[(bomb_y-1*i)][bomb_x] = 0;
        }
        else
            break;

    // Destroy left blocks
    for (var i = 1; i <= this.radius; i++) 
        if (board[bomb_y][(bomb_x-1*i)] != 2)
            board[bomb_y][(bomb_x-1*i)] = 0;
        else
            break;

    // Destroy below blocks
    for (var i = 1; i <= this.radius; i++)
        if (board[(bomb_y+1*i)][bomb_x] != 2)
            board[(bomb_y+1*i)][bomb_x] = 0;
        else
            break;

    // Destroy right blocks
    for (var i = 1; i <= this.radius; i++)
        if (board[bomb_y][(bomb_x+1*i)] != 2)
            board[bomb_y][(bomb_x+1*i)] = 0;
        else
            break;

    // Kill players
    for (var i = 0; i < player.length; i++) {
        var player_x = player[i].x/block_size;
        var player_y = player[i].y/block_size;
        var radius = player[i].bomb_radius;

        if (player_x == bomb_x || player_y == bomb_y)     // player on the same x-axis or y-axis as the bomb
            if ( (player_x >= bomb_x-1*radius && player_x <= bomb_x+1*radius) && (player_y >= bomb_y-1*radius && player_y <= bomb_y+1*radius))      // player inside the radius of the explosion
                player[i].kill();        
    }

    this.exploded = true;
}
