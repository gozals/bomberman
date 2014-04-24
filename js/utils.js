
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

