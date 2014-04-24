
// Draws a rectangle with (x, y) being the top left corner coordinates and 'w' and 'h' being the width and height respectively
function rect(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fill();
    context.rect(x, y, w, h);

    // Draw borders
    context.strokeStyle = "black";
    context.lineWidth   = 3;
    context.stroke();
}

function fetch_sprite (sprite_name) {
    var test;
    switch(sprite_name) {
        case "vertical_walk_1":
            return [8, 2, 15, 22];
        case "vertical_walk_2":
            return [23, 2, 15, 22];
        case "vertical_walk_3":
            return [195, 2, 15, 22];
        case "vertical_walk_4":
            return [212, 2, 15, 22];
        case "horizontal_walk_1":
            return [93, 2, 15, 22];
        case "horizontal_walk_2":
            return [108, 2, 15, 22];
        case "horizontal_walk_3":
            return [123, 2, 15, 22];
        case "horizontal_walk_4":
            return [228, 28, 15, 22];
        case "horizontal_walk_5":
            return [213, 28, 15, 22];
        case "horizontal_walk_6":
            return [198, 28, 15, 22];
    }
}
