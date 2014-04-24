
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

    this.sprite_width = 12;
    this.sprite_height = 18;

}

Player.LENGTH = 40;

// All instances of Person create reference methods to it's prototype.
// These references are not deletable (but they can be overwritten).
Player.prototype = {
    draw: function() {
        if (this.stand)
            context.drawImage(sprite, 8, 2, 15, 22, this.x+7, this.y, 15+this.sprite_width, 22+this.sprite_height);
        else
            context.drawImage(sprite, 8+15, 2, 15, 22, this.x+7, this.y, 15+this.sprite_width, 22+this.sprite_height);
    }
};
