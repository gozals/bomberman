
function Player(sprite_sheet, board, name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;

    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.direction = "down";

    this.stand = true;
    this.toggle = false;
    this.release_bomb = false;

    this.sprite_width = 12;
    this.sprite_height = 18;

    this.alive = true;

    this.vertical_walk = 0;
}

Player.LENGTH = 40;

Player.prototype.draw = function() {
    var sprite = [];

    // To-do: find an alternative to this.stand (eg: use %)
    // To-do: create a complete sprite sheet using the current one

    switch (this.direction) {
        case "left":    // Note: there's another sprite to add
            if (this.stand)
                sprite = fetch_sprite("horizontal_walk_1");
            else
                sprite = fetch_sprite("horizontal_walk_2");
            break;

        case "up":
            if(this.stand)
                sprite = fetch_sprite("vertical_walk_3");
            else
                sprite = fetch_sprite("vertical_walk_4");
            break;

        case "right":   // Note: there's another sprite to add
            if (this.stand)
                sprite = fetch_sprite("horizontal_walk_3");
            else
                sprite = fetch_sprite("horizontal_walk_4");
            break;

        case "down":
            if (this.stand)
                sprite = fetch_sprite("vertical_walk_1");
                //context.drawImage(sprite_sheet, 8, 2, 15, 22, this.x+7, this.y, 15+this.sprite_width, 22+this.sprite_height);
            else
                sprite = fetch_sprite("vertical_walk_2");
                //context.drawImage(sprite_sheet, 8+15, 2, 15, 22, this.x+7, this.y, 15+this.sprite_width, 22+this.sprite_height);
            break;
    }

    // (sprite_sheet, src_x, src_y, src_width, src_height, dest_x, dest_y, dest_width, dest_height);
    context.drawImage(sprite_sheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x+7, this.y, sprite[2]*(Player.LENGTH/sprite[3]), Player.LENGTH);//sprite[3]+this.sprite_height);
}

Player.prototype.move = function() {
    if (this.left | this.up | this.right | this.down)
        this.toggle = true;

    if (this.left) {
        this.x -= Player.LENGTH;
        if (board[this.y/Player.LENGTH][this.x/Player.LENGTH] >= 1)
            this.x += Player.LENGTH;
        this.left = false;
        this.direction = "left";
    }

    else if (this.up) {
        this.y -= Player.LENGTH;
        if (board[this.y/Player.LENGTH][this.x/Player.LENGTH] >= 1)
            this.y += Player.LENGTH;
        this.up = false;
        this.direction = "up";
    }

    else if (this.right) {
        this.x += Player.LENGTH;
        if (board[this.y/Player.LENGTH][this.x/Player.LENGTH] >= 1)
            this.x -= Player.LENGTH;
        this.right = false;
        this.direction = "right";
    }

    else if (this.down) {
        this.y += Player.LENGTH;
        if (board[this.y/Player.LENGTH][this.x/Player.LENGTH] >= 1)
            this.y -= Player.LENGTH;
        this.down = false;
        this.direction = "down";
    }
}
