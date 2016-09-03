let BoardCreator = {
    create: function () {
        let board = new Matrix(7, 7);
        this.checkerFill(board);
        this.spiralFill(board);
        return board;
    },
    checkerFill: function (board) {
        board.forEach(function (element, pos) {
            if (pos.x % 2 === pos.y % 2)
                board.set(pos, BoardCreator.randomTile());
            else {
                board.set(pos, {});
            }
        });
    },
    spiralFill: function (board) {
        let position = new Vector2(3, 3);
        let steps = 1;
        let times = 2;
        let direction = 0;
        while (board.has(position)) {
            for (let i = 0; i < steps; i++) {
                fill(board, position);
                position = position.add(Vector2.directions[direction]);
            }
            direction = (direction + 1) % 4;
            if (--times === 0) {
                steps++;
                times = 2;
            }
        }

        function fill(board, position) {
            if (board.get(position) !== undefined) {
                let tiles = shuffle(tileset.slice());
                while (true) {
                    board.set(position, tiles.pop());
                    if (BoardAnalizer.isTree(board))
                        break;
                }
            }
        }
    },
    randomTile: function () {
        return tileset[Math.floor(Math.random() * tileset.length)];
    }
}
