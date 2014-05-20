
function Player(sprite_sheet, name, number, x, y) {
    this.sprite_sheet = sprite_sheet;
    this.name = name;
    this.number = number;
    this.x = x;
    this.y = y;

    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.direction = "down";
    this.frame = new Array(4);
    this.frame["left"] = 0;
    this.frame["up"] = 0;
    this.frame["right"] = 0;
    this.frame["down"] = 0;

    this.sprite_width = 12;
    this.sprite_height = 18;

    // Bomb information
    this.release_bomb = false;
    this.bomb_radius = 1;
    this.bomb_limit = 1;

    // Power-ups
    this.invincible = false;

    this.alive = true;

    // Released bombs
    this.bombs = [];
}

Player.prototype.draw = function() {
    var sprite = [];

    switch (this.direction) {
        case "left": 
            if (this.frame["left"] == 0)
                sprite = fetch_sprite("horizontal_walk_1");
            else if (this.frame["left"] == 1)
                sprite = fetch_sprite("horizontal_walk_2");
            else if (this.frame["left"] == 2)
                sprite = fetch_sprite("horizontal_walk_3");
            break;

        case "up":
            if (this.frame["up"] == 0)
                sprite = fetch_sprite("vertical_walk_3");
            else if (this.frame["up"] == 1)
                sprite = fetch_sprite("vertical_walk_4");
            break;

        case "right":
            if (this.frame["right"] == 0)
                sprite = fetch_sprite("horizontal_walk_4");
            else if (this.frame["right"] == 1)
                sprite = fetch_sprite("horizontal_walk_5");
            else if (this.frame["right"] == 2)
                sprite = fetch_sprite("horizontal_walk_6");
            break;

        case "down":
            if (this.frame["down"] == 0)
                sprite = fetch_sprite("vertical_walk_1");
            else if (this.frame["down"] == 1)
                sprite = fetch_sprite("vertical_walk_2");
            break;
    }

    context.drawImage(this.sprite_sheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x+7, this.y, sprite[2]*(block_size/sprite[3]), block_size);
}

Player.prototype.move = function() {

    // Update position
    if (this.left) {
        this.x -= block_size;
        if (board.level[this.y/block_size][this.x/block_size] >= 1)
            this.x += block_size;
        this.direction = "left";
        this.frame["left"] = (++this.frame["left"])%3;
    }

    else if (this.up) {
        this.y -= block_size;
        if (board.level[this.y/block_size][this.x/block_size] >= 1)
            this.y += block_size;
        this.direction = "up";
        this.frame["up"] = (++this.frame["up"])%2;
    }

    else if (this.right) {
        this.x += block_size;
        if (board.level[this.y/block_size][this.x/block_size] >= 1)
            this.x -= block_size;
        this.direction = "right";
        this.frame["right"] = (++this.frame["right"])%3;
    }

    else if (this.down) {
        this.y += block_size;
        if (board.level[this.y/block_size][this.x/block_size] >= 1)
            this.y -= block_size;
        this.direction = "down";
        this.frame["down"] = (++this.frame["down"])%2;
    }
}

Player.prototype.kill = function() {
    if (this.invincible == false)
        this.alive = false;
}

Player.prototype.add_power_up = function(power_up) {
    switch(power_up) {
        case 1:
            // It gives the player the ability to pick up, carry, and then throw bombs (not yet implemented)
            console.log("power_glove");
            break;
        case 2:
            // Allows player to punch bombs in order to knock them away (not yet implemented)
            console.log("boxing_glove");
            break;
        case 3:
            // Increases fire range by 1
            console.log("fire");
            this.bomb_radius++;
            break;
        case 4:
            // Increases player's speed by 1
            console.log("skate");
            break;
        case 5:
            // Releases a line of bomb
            console.log("line_bomb");
            break;
        case 6:
            // Player is immune to all dangers for a fixed period of time
            this.invincible = true;
            break;
        case 7:
            // Gets one of the following "bad" effects for a fixed period of time:
            // Dizzy: controls are switched, left becomes right and up becomes down
            // Constipation: player unable to set bombs
            // Diarrhea: player continuously sets bombs when possible
            console.log("skull");
            break;
        case 8:
            // Decreases the player's speed by 1
            console.log("geta");
            break;
        case 9:
            // Gives the ability to "kick" bombs by walking into them, which sends the bomb sliding across the stage until it collides with a wall, player, or another bomb
            console.log("kick");
            break;
        case 10:
            // Increases the player's number of bombs by 1
            console.log("bomb");
            this.bomb_limit++;
            break;
    }
}
