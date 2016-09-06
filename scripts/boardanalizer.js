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
        return result;

        function visit(board, visited, position, previous) {
            if (visited.get(position))
                return true;
            visited.set(position, true);

            for (let i = 0; i < Vector2.directions.length; i++) {
                let next = position.add(Vector2.directions[i]);
                if (!next.equals(previous) && board.has(next) && BoardAnalizer.areNeighbours(board, position, next)) {
                    if (visit(board, visited, next, position))
                        return true;
                }
            }
            return false;
        }
    },
    findCycles: function (data) {
        data.cycles = data.board.clone();
        data.cycles.forEach(function (element, position) {
            smoothMultiple(data.cycles, position);
        });

        function smoothMultiple(board, position) {
            let neighbourData = smoothSingle(board, position);
            if (neighbourData.neighbours === 1) {
                board.get(position).set(neighbourData.neighbour, false);
                smoothMultiple(board, position.add(neighbourData.neighbour));
            }
        };

        function smoothSingle(board, position) {
            let neighbours = 0;
            let neighbour;
            for (let i = 0; i < Vector2.directions.length; i++) {
                let next = position.add(Vector2.directions[i]);
                if (board.has(next) && BoardAnalizer.areNeighbours(board, position, next)) {
                    neighbours++;
                    neighbour = Vector2.directions[i];
                } else {
                    board.get(position).set(next.sub(position), false);
                }
            }
            return {
                neighbours: neighbours,
                neighbour: neighbour
            };
        }
    },
    areNeighbours: function (board, a, b) {
        return board.get(a).has(b.sub(a)) && board.get(b).has(a.sub(b));
    }
}
