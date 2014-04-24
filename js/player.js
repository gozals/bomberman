
function Player(sprite, board, name, x, y) {
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

    this.sprite_width = 12;
    this.sprite_height = 18;

}

Player.LENGTH = 40;

// All instances of Person create reference methods to it's prototype.
// These references are not deletable (but they can be overwritten).
Player.prototype.draw = function() {
    if (this.stand)
        context.drawImage(sprite, 8, 2, 15, 22, this.x+7, this.y, 15+this.sprite_width, 22+this.sprite_height);
    else
        context.drawImage(sprite, 8+15, 2, 15, 22, this.x+7, this.y, 15+this.sprite_width, 22+this.sprite_height);
}

Player.prototype.move = function() {
    if (this.left | this.up | this.right | this.down)
        this.toggle = true;

    if (this.left) {
        this.x -= Player.LENGTH;
        if (board[this.y/Player.LENGTH][this.x/Player.LENGTH] >= 1)
            this.x += Player.LENGTH;
        this.left = false;
    }

    if (this.up) {
        this.y -= Player.LENGTH;
        if (board[this.y/Player.LENGTH][this.x/Player.LENGTH] >= 1)
            this.y += Player.LENGTH;
        this.up = false;
    }

    if (this.right) {
        this.x += Player.LENGTH;
        if (board[this.y/Player.LENGTH][this.x/Player.LENGTH] >= 1)
            this.x -= Player.LENGTH;
        this.right = false;
    }

    if (this.down) {
        this.y += Player.LENGTH;
        if (board[this.y/Player.LENGTH][this.x/Player.LENGTH] >= 1)
            this.y -= Player.LENGTH;
        this.down = false;
    }
}
