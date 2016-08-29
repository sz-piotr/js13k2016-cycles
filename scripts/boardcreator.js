let BoardCreator = {
    create: function() {
        let board = this.init();
        return board;
    },
    init: function() {
        let board = [];
        for (let i = 0; i < 7; i++) {
            let row = [];
            for (let j = 0; j < 7; j++) {
                if (i % 2 === j % 2) {
                    row.push(this.randomTile());
                } else {
                    row.push({});
                }
            }
            board.push(row);
        }
        return board;
    },
    randomTile: function() {
        return tileset[Math.floor(Math.random() * tileset.length)];
    }
}
