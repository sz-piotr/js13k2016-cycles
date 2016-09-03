let BoardAnalizer = {
    isTree: function (board) {
        console.log('asdasdsada');
        let visited = this.createVisitedArray(board.length);
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (visited[i][j] === false) {
                    var partOfCycle = visitAll(board, visited, {
                        x: i,
                        y: j
                    }, {});
                }
            }
        }
        return true;

        function visitAll(board, visited, position, lastPosition) {
            let next;

            console.log(position, lastPosition);

            next = {
                x: position.x + 1,
                y: position.y
            }
            console.log(next, equalPositions(lastPosition, next), areNeighbours(board, position, next));
            next = {
                x: position.x - 1,
                y: position.y
            }
            console.log(next, equalPositions(lastPosition, next), areNeighbours(board, position, next));
            next = {
                x: position.x,
                y: position.y + 1
            }
            console.log(next, equalPositions(lastPosition, next), areNeighbours(board, position, next));
            next = {
                x: position.x,
                y: position.y - 1
            }
            console.log(next, equalPositions(lastPosition, next), areNeighbours(board, position, next));

            return false;

            function areNeighbours(board, a, b) {
                if (!inBounds(b, 0, board.length))
                    return false;

                let dir = {
                    x: b.x - a.x,
                    y: b.y - a.y
                }

                if (dir.x === 1 && board[a.x][a.y].e && board[b.x][b.y].w)
                    return true;
                if (dir.x === -1 && board[a.x][a.y].w && board[b.x][b.y].e)
                    return true;
                if (dir.y === 1 && board[a.x][a.y].s && board[b.x][b.y].n)
                    return true;
                if (dir.y === -1 && board[a.x][a.y].n && board[b.x][b.y].s)
                    return true;

                return false;
            }

            function inBounds(position, min, max) {
                return position.x >= min && position.x < max && position.y >= min && position.y < max;
            }

            function equalPositions(a, b) {
                return a.x === b.x && a.y === b.y;
            }
        }
    },
    createVisitedArray: function (size) {
        let visited = [];
        for (let i = 0; i < size; i++) {
            let column = [];
            for (let i = 0; i < size; i++) {
                column.push(false);
            }
            visited.push(column);
        }
        return visited;
    }
}
