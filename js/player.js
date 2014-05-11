
function Player(sprite_sheet, board, name, number, x, y) {
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
    this.bomb_radius = 4;
    this.bomb_limit = 3;

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

    //console.log(this.x);
    
    // Update position
    if (this.left) {
        this.x -= block_size;
        if (board[this.y/block_size][this.x/block_size] >= 1)
            this.x += block_size;
        this.left = false;
        this.direction = "left";
        this.frame["left"] = (++this.frame["left"])%3;
    }

    else if (this.up) {
        this.y -= block_size;
        if (board[this.y/block_size][this.x/block_size] >= 1)
            this.y += block_size;
        this.up = false;
        this.direction = "up";
        this.frame["up"] = (++this.frame["up"])%2;
    }

    else if (this.right) {
        this.x += block_size;
        if (board[this.y/block_size][this.x/block_size] >= 1)
            this.x -= block_size;
        this.right = false;
        this.direction = "right";
        this.frame["right"] = (++this.frame["right"])%3;
    }

    else if (this.down) {
        this.y += block_size;
        if (board[this.y/block_size][this.x/block_size] >= 1)
            this.y -= block_size;
        this.down = false;
        this.direction = "down";
        this.frame["down"] = (++this.frame["down"])%2;
    }
}

Player.prototype.kill = function() {
    this.alive = false;
}
