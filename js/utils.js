
// Draws a rectangle with (x, y) being the top left corner coordinates and 'w' and 'h' being the width and height respectively
function draw_block(x, y, w, h, color) {
    // Fill block 
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = color;
    context.fill();

    // Draw borders
    context.stroke();
}

function fetch_sprite (sprite_name) {
    switch(sprite_name) {
        case "vertical_walk_1":
            return [0, 0, 15, 22];
            break;
        case "vertical_walk_2":
            return [15, 0, 15, 22];
            break;
        case "vertical_walk_3":
            return [30, 0, 15, 22];
            break;
        case "vertical_walk_4":
            return [45, 0, 15, 22];
            break;
        case "horizontal_walk_1":
            return [60, 0, 15, 22];
            break;
        case "horizontal_walk_2":
            return [74, 0, 15, 22];
            break;
        case "horizontal_walk_3":
            return [88, 0, 15, 22];
            break;
        case "horizontal_walk_4":
            return [102, 0, 15, 22];
            break;
        case "horizontal_walk_5":
            return [116, 0, 15, 22];
            break;
        case "horizontal_walk_6":
            return [130, 0, 15, 22];
            break;
        case "bomb_small":
            return [0, 1, 14, 16];
            break;
        case "bomb_medium":
            return [18, 0, 16, 16];
            break;
        case "bomb_large":
            return [37, 0, 16, 17];
            break;
        case "explosion_middle":
            return [36, 36, 16, 16];
            break;
        case "explosion_middle_left":
            return [18, 36, 16, 16];
            break;
        case "explosion_extreme_left":
            return [0, 36, 16, 16];
            break;
        case "explosion_middle_right":
            return [54, 36, 16, 16];
            break;
        case "explosion_extreme_right":
            return [72, 36, 16, 16];
            break;
        case "explosion_middle_up":
            return [36, 18, 16, 16];
            break;
        case "explosion_extreme_up":
            return [36, 0, 16, 16];
            break;
        case "explosion_middle_down":
            return [36, 54, 16, 16];
            break;
        case "explosion_extreme_down":
            return [36, 72, 16, 16];
            break;
    }
}
