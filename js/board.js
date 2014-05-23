
function Board(width, height, level_number) {

    // Board dimensions
    this.width = width;
    this.height = height;

    this.level = level[level_number];

    //this.powerups = {
        //1: "power_glove",
        //2: "boxing_glove",
        //3: "fire",
        //4: "skate",
        //5: "line_bomb",
        //6: "vest",
        //7: "skull",
        //8: "geta",
        //9: "kick",
        //10: "bomb"
    //};
    this.powerups = {
        1: "fire",
        2: "skate", 
        3: "geta",
        4: "bomb"
    }

    this.board_powerups = create_2D_array(height, width);

    this.load_power_ups();
}

Board.prototype.load_power_ups = function() {
    for (var i = 0; i < this.height; i++)
        for (var j = 0; j < this.width; j++) {
            if (Math.floor(Math.random()*5) == 0 && this.level[i][j] == 1)
                this.board_powerups[i][j] = Math.floor(Math.random()*4)+1;
            else
                this.board_powerups[i][j] = 0;
        }
}
