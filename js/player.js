
function Player(sprite, name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.alive = true;
    this.stand = true;
    this.toggle = false;
    this.release_bomb = false;
}

Player.LENGTH = 40;

// Load bombeman sprite

Player.sprite_src_x;
Player.sprite_src_y;
Player.sprite_src_width;
Player.sprite_src_height;

Player.sprite_dest_x;
Player.sprite_dest_y;
Player.sprite_dest_width;
Player.sprite_dest_height;

Player.sprite_width = 12;
Player.sprite_height = 18;

