
function Bomb(sprite_sheet, x, y, radius) {
    this.sprite_sheet = sprite_sheet;
    this.x = x;
    this.y = y;
    this.radius = radius;
    setTimeout(this.explode.bind(this), 3000);
    this.exploded = false;
}

Bomb.prototype.draw = function() {
    //var sprite = fetch_sprite("bomb_small");
    //context.drawImage(this.sprite_sheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x+7, this.y, sprite[2]*(block_size/sprite[3]), block_size);

    //var sprite = fetch_sprite("bomb_medium");
    //context.drawImage(this.sprite_sheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x+7, this.y, sprite[2]*(block_size/sprite[3]), block_size);

    var sprite = fetch_sprite("bomb_large");
    context.drawImage(this.sprite_sheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2]*(block_size/sprite[3]), block_size);
}

Bomb.prototype.explode = function() {
    // Destroy surrounding blocks
    console.log(this.radius);
    var block_y = this.y/block_size;
    var block_x = this.x/block_size;

    // Destroy above block
    for (var i = 1; i <= this.radius; i++)
        if (board[(block_y-1*i)][block_x] != 2) {
            board[(block_y-1*i)][block_x] = 0;
        }
        else
            break;

    // Destroy left blocks
    for (var i = 1; i <= this.radius; i++) 
        if (board[block_y][(block_x-1*i)] != 2)
            board[block_y][(block_x-1*i)] = 0;
        else
            break;

    // Destroy below blocks
    for (var i = 1; i <= this.radius; i++)
        if (board[(block_y+1*i)][block_x] != 2)
            board[(block_y+1*i)][block_x] = 0;
        else
            break;

    // Destroy right blocks
    for (var i = 1; i <= this.radius; i++)
        if (board[block_y][(block_x+1*i)] != 2)
            board[block_y][(block_x+1*i)] = 0;
        else
            break;

    this.exploded = true;
}
