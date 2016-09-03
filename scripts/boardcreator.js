let BoardCreator = {
    create: function() {
        let board = this.init();
        this.spiralFill(board);
        return board;
    },
    init: function() {
        let board = [];
        for (let i = 0; i < 7; i++) {
            let row = [];
            for (let j = 0; j < 7; j++) {
                if (i % 2 === j % 2) {
                    row.push({});
                } else {
                    row.push(this.randomTile());
                }
            }
            board.push(row);
        }
        return board;
    },
    spiralFill: function(board) {
        let position = {
            x: 3,
            y: 3
        };
        let step = 1;
        let steps = 2;
        let direction = 0;
        while (inBounds(position)) {
            for (let i = 0; i < step; i++) {
                fill(board, position);
                position.x += this.directions[direction].x;
                position.y += this.directions[direction].y;
            }
            direction = (direction + 1) % 4;
            steps--;
            if (steps === 0) {
                step++;
                steps = 2;
            }
        }

        function fill(board, position) {
            if (isEmpty(board[position.x][position.y])) {
                let tiles = tileset.slice();
                Utils.shuffle(tiles);
                while (true) {
                    board[position.x][position.y] = tiles.pop();
                    if (BoardAnalizer.isTree(board))
                        break;
                }
            }
        }

        function inBounds(position) {
            return position.x >= 0 && position.x < 7 && position.y >= 0 && position.y < 7;
        }

        function isEmpty(tile) {
            return !(tile.hasOwnProperty('n') || tile.hasOwnProperty('e') || tile.hasOwnProperty('s') || tile.hasOwnProperty('w'));
        }
    },
    randomTile: function() {
        return tileset[Math.floor(Math.random() * tileset.length)];
    },
    directions: [{
        x: 0,
        y: 1
    }, {
        x: 1,
        y: 0
    }, {
        x: 0,
        y: -1
    }, {
        x: -1,
        y: 0
    }]
}
