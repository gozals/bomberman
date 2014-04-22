
function Player(name, x, y) {
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
Player.sprite = new Image(); 
Player.sprite.src = 'resources/sprites/bomberman.gif';
Player.sprite_width = 12;
Player.sprite_height = 18;

