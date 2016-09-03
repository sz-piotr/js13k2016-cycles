let BoardCreator = {
    create: function () {
        let board = new Matrix(7, 7, {});
        this.checkerFill(board);
        //this.spiralFill(board);
        return board;
    },
    checkerFill: function (board) {
        board.forEach(function (element, pos) {
            if (pos.x % 2 === pos.y % 2)
                board.set(pos, BoardCreator.randomTile());
        });
    },
    spiralFill: function (board) {
        let position = new Vector2(3, 3);
        let step = 1;
        let steps = 2;
        let direction = 0;
        while (inBounds(position)) {
            for (let i = 0; i < step; i++) {
                fill(board, position);
                position = position.add(Vector2.directions[direction]);
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
                shuffle(tiles);
                while (true) {
                    if (tiles.length === 0) console.error('ate all tiles!');
                    board[position.x][position.y] = tiles.pop();
                    console.log(position, BoardAnalizer.isTree(board));
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
    randomTile: function () {
        return tileset[Math.floor(Math.random() * tileset.length)];
    }
}
