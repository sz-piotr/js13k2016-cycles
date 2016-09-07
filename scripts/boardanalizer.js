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
        let cycles = data.board.clone(),
            hasCycles = false;
        cycles.forEach(function (element, position) {
            smoothMultiple(cycles, position);
        });
        cycles.forEach(function (element, position) {
            let partOfCycle = !element.isEmpty();
            if (partOfCycle)
                hasCycles = true;
            data.board.get(position).setCycle(element);
        });
        return hasCycles;

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
    shouldDeleteArray: function(board) {
        let shouldDelete = [],
            fill;

        initArray();
        board.forEachXY(function (element, x, y) {
            if (!shouldDelete[x][y].hasOwnProperty('delete')) {
                fill = {
                    delete: true
                };
                if (element.isPartOfCycle()) {
                    shouldDelete[x][y] = fill;
                } else {
                    floodFillDelete(x, y, fill)
                }
            }
        });
        fixArray();
        return shouldDelete;

        function initArray() {
            let fill = {};
            for (let i = 0; i < board.size; i++) {
                let column = [];
                for (let j = 0; j < board.size; j++) {
                    column.push(fill);
                }
                shouldDelete.push(column);
            };
        }

        function floodFillDelete(x, y, fill) {
            if (!board.hasXY(x, y)) {
                fill.delete = false;
                return;
            } else if (shouldDelete[x][y].hasOwnProperty('delete') || board.getXY(x, y).isPartOfCycle()) {
                return;
            } else {
                shouldDelete[x][y] = fill;
                floodFillDelete(x + 1, y, fill);
                floodFillDelete(x - 1, y, fill);
                floodFillDelete(x, y + 1, fill);
                floodFillDelete(x, y - 1, fill);
            }
        }

        function fixArray() {
            for (let i = 0; i < board.size; i++) {
                for (let j = 0; j < board.size; j++) {
                    shouldDelete[i][j] = shouldDelete[i][j].delete;
                };
            };
        }
    },
    areNeighbours: function (board, a, b) {
        return board.get(a).has(b.sub(a)) && board.get(b).has(a.sub(b));
    }
}
