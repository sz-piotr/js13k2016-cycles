let BoardAnalizer = {
    isTree: function(board) {
        let visited = this.createVisitedArray(board.length);
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (visited[i][j] === false) {
                    if (this.visit(board, visited, i, j))
                        return false;
                }
            }
        }
        return true;
    },
    visit: function(board, visited, x, y, direction) {
        visited[x][y] = true;
        if (direction !== 'n' && board[x][y].n && board[x][y + 1] && board[x][y + 1].s) {
            if (this.visit(board, visited, x, y + 1, 's'))
                return true;
        }
        if (direction !== 'e' && board[x][y].e && board[x + 1] && board[x + 1][y].w) {
            if (this.visit(board, visited, x + 1, y, 'w'))
                return true;
        }
        if (direction !== 's' && board[x][y].s && board[x][y - 1] && board[x][y - 1].n) {
            if (this.visit(board, visited, x, y - 1, 'n'))
                return true;
        }
        if (direction !== 'w' && board[x][y].w && board[x - 1] && board[x - 1][y].e) {
            if (this.visit(board, visited, x - 1, y, 'e'))
                return true;
        }
        return false;
    },
    createVisitedArray: function(size) {
        let visited = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let i = 0; i < size; i++) {
                row.push(false);
            }
            visited.push(row);
        }
        return visited;
    }
}
