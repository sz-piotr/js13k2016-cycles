let BoardAnalizer = {
    isTree: function (board) {
        let visited = new Matrix(board.width, board.height, false);
        let result = true;
        board.forEach(function (element, position) {
            if (result === false || visited.get(position))
                return;
            if (visit(board, visited, position))
                result = false;
        });
        if(result === false)
            console.log('redo!');
        return result;

        function visit(board, visited, position, previous) {
            if (visited.get(position))
                return true;
            visited.set(position, true);

            for (let i = 0; i < Vector2.directions.length; i++) {
                let next = position.add(Vector2.directions[i]);
                if (!next.equals(previous) && board.has(next) && areNeighbours(board, position, next)) {
                    if (visit(board, visited, next, position))
                        return true;
                }
            }

            return false;
        }

        function areNeighbours(board, a, b) {
            let dir = b.sub(a);
            a = board.get(a);
            b = board.get(b);
            let east = (dir.x === 1 && a.e && b.w);
            let west = (dir.x === -1 && a.w && b.e);
            let north = (dir.y === -1 && a.n && b.s);
            let south = (dir.y === 1 && a.s && b.n);
            return east || west || north || south;
        }
    }
}
