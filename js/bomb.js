
function Bomb(bomb_sprite, explosion_sprite, block_x, block_y, radius) {

    // Inialize class variables
    this.bomb_sprite = bomb_sprite;
    this.explosion_sprite = explosion_sprite;
    this.x = block_x;
    this.y = block_y;

    this.radius = [];
    this.radius["left"] = radius;
    this.radius["right"] = radius;
    this.radius["up"] = radius;
    this.radius["down"] = radius;

    // Start bomb timer
    this.start_time = new Date();
    this.time_elapsed = 0;

    this.explodes = false;
    this.exploded = false;

    this.updated_bomb = false;
}

Bomb.prototype.update = function() {
    this.time_elapsed = this.get_time();

    if (this.time_elapsed >= 2000 && this.time_elapsed < 2500) {
        if (this.explodes == false) {
            this.destroy_blocks();
            this.explodes = true;
        }
        this.kill_players();
    }
    else if (this.time_elapsed >= 2500)
        this.exploded = true;
}

Bomb.prototype.draw = function() {
    this.time_elapsed = this.get_time();

    var sprite;
    if (this.time_elapsed <= 1000) {
        sprite = fetch_sprite("bomb_small");
        context.drawImage(this.bomb_sprite, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2]*(block_size/sprite[3]), block_size);
    }

    else if (this.time_elapsed <= 2000) {
        sprite = fetch_sprite("bomb_large");
        context.drawImage(this.bomb_sprite, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2]*(block_size/sprite[3]), block_size);
    }

    else if (this.explodes) {
        // Middle explosion
        sprite = fetch_sprite("explosion_middle");
        context.drawImage(this.explosion_sprite, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2]*(block_size/sprite[3]), block_size);

        // Left explosion
        for (var i = 1; i < this.radius["left"]; i++) {
            sprite = fetch_sprite("explosion_middle_left") 
            context.drawImage(this.explosion_sprite, sprite[0], sprite[1], sprite[2], sprite[3], this.x-block_size*i, this.y, sprite[2]*(block_size/sprite[3]), block_size);
        }
        // No indestructible wall on the left
        if (this.radius["left"] != 0) { 
            sprite = fetch_sprite("explosion_extreme_left");
            context.drawImage(this.explosion_sprite, sprite[0], sprite[1], sprite[2], sprite[3], this.x-block_size*this.radius["left"], this.y, sprite[2]*(block_size/sprite[3]), block_size);
        }

        // Right explosion
        for (var i = 1; i < this.radius["right"]; i++) {
            sprite = fetch_sprite("explosion_middle_right") 
            context.drawImage(this.explosion_sprite, sprite[0], sprite[1], sprite[2], sprite[3], this.x+block_size*i, this.y, sprite[2]*(block_size/sprite[3]), block_size);
        }
        // No indestructible wall on the right
        if (this.radius["right"] != 0) {
            sprite = fetch_sprite("explosion_extreme_right");
            context.drawImage(this.explosion_sprite, sprite[0], sprite[1], sprite[2], sprite[3], this.x+block_size*this.radius["right"], this.y, sprite[2]*(block_size/sprite[3]), block_size);
        }

        // Upper explosion
        for (var i = 1; i < this.radius["up"]; i++) {
            sprite = fetch_sprite("explosion_middle_up") 
            context.drawImage(this.explosion_sprite, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y-block_size*i, sprite[2]*(block_size/sprite[3]), block_size);
        }
        // No indestructible wall above 
        if (this.radius["up"] != 0) {
            sprite = fetch_sprite("explosion_extreme_up");
            context.drawImage(this.explosion_sprite, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y-block_size*this.radius["up"], sprite[2]*(block_size/sprite[3]), block_size);
        }

        // Lower explosion
        for (var i = 1; i < this.radius["down"]; i++) {
            sprite = fetch_sprite("explosion_middle_down") 
            context.drawImage(this.explosion_sprite, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y+block_size*i, sprite[2]*(block_size/sprite[3]), block_size);
        }
        // No indestructible wall below 
        if (this.radius["down"] != 0) {
            sprite = fetch_sprite("explosion_extreme_down");
            context.drawImage(this.explosion_sprite, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y+block_size*this.radius["down"], sprite[2]*(block_size/sprite[3]), block_size);
        }
    }
}

Bomb.prototype.destroy_blocks = function() {
    this.time_elapsed = this.get_time();
    this.updated_bomb = true;

    // Destroy surrounding blocks
    var bomb_y = this.y/block_size;
    var bomb_x = this.x/block_size;

    // Destroy above block
    for (var i = 1; i <= this.radius["up"]; i++)
        if (board.level[(bomb_y-1*i)][bomb_x] == 1) {
            board.level[(bomb_y-1*i)][bomb_x] = 0;
            this.radius["up"] = i;
            break;
        } else if (board.level[(bomb_y-1*i)][bomb_x] == 2) {
            this.radius["up"] = i-1;
            break;
        }

    // Destroy left blocks
    for (var i = 1; i <= this.radius["left"]; i++) 
        if (board.level[bomb_y][(bomb_x-1*i)] == 1) {
            board.level[bomb_y][(bomb_x-1*i)] = 0;
            this.radius["left"] = i;
            break;
        } else if (board.level[bomb_y][(bomb_x-1*i)] == 2) {
            this.radius["left"] = i-1;
            break;
        }

    // Destroy below blocks
    for (var i = 1; i <= this.radius["down"]; i++)
        if (board.level[(bomb_y+1*i)][bomb_x] == 1) {
            board.level[(bomb_y+1*i)][bomb_x] = 0;
            this.radius["down"] = i;
            break;
        } else if (board.level[(bomb_y+1*i)][bomb_x] == 2) {
            this.radius["down"] = i-1;
            break;
        }

    // Destroy right blocks
    for (var i = 1; i <= this.radius["right"]; i++)
        if (board.level[bomb_y][(bomb_x+1*i)] == 1) {
            board.level[bomb_y][(bomb_x+1*i)] = 0;
            this.radius["right"] = i;
            break;
        } else if (board.level[bomb_y][(bomb_x+1*i)] == 2) {
            this.radius["right"] = i-1;
            break;
        }
}

Bomb.prototype.kill_players = function() {
    var bomb_x = this.x/block_size;
    var bomb_y = this.y/block_size;

    for (var i = 0; i < 4; i++) {
        var player_x = convert_to_bitmap_position(player[i].x+player[i].sprite_width/2);
        var player_y = convert_to_bitmap_position(player[i].y+player[i].sprite_height/2);

        if (player_y == bomb_y || player_x == bomb_x) {     // player on the same x-axis or y-axis as the bomb
            if ( (player_x >= bomb_x-1*this.radius["left"] && player_x <= bomb_x+1*this.radius["right"]) &&
                 (player_y <= bomb_y+1*this.radius["down"] && player_y >= bomb_y-1*this.radius["up"])) // player inside the radius of the explosion
                player[i].kill(); 
        }
    }
}

Bomb.prototype.get_time = function() {
    return new Date() - this.start_time;
}

