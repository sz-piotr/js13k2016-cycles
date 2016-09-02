function InputProcessor(data) {
    let tileSelected;
    let offset = {};

    this.onpress = function(location) {
        tileSelected = location;
    }

    this.onmove = function(location) {
        offset = {
            x: location.x - tileSelected.x,
            y: location.y - tileSelected.y
        }
        processOffset();
    }

    function processOffset() {
        if ((Math.abs(offset.x) > 0.3 || Math.abs(offset.y) > 0.3) && data.offset.value === undefined) {
            if (Math.abs(offset.x) > Math.abs(offset.y)) {
                data.offset.row = Math.floor(tileSelected.y);
            } else {
                data.offset.column = Math.floor(tileSelected.x);
            }
            updateDataOffsetValue();
        }
        if (data.offset.value !== undefined) {
            updateDataOffsetValue();
        }
    }

    function updateDataOffsetValue() {
        let limit = data.board.length - 1;
        if (data.offset.row !== undefined) {
            data.offset.value = clamp(offset.x, -limit, limit);
        } else {
            data.offset.value = clamp(offset.y, -limit, limit);
        }
    }

    this.onrelease = function() {
        data.offset.value = Math.round(-data.offset.value) || 0;
        if (data.offset.value < 0)
            data.offset.value += data.board.length;
        if (data.offset.value !== 0) {
            updateBoardAfterShift();
        }

        data.offset = {};
    }

    function updateBoardAfterShift() {
        if (data.offset.row !== undefined) {
            let shifted = [];
            for (let i = 0; i < data.board.length; i++) {
                shifted[i] = data.board[(i + data.offset.value) % data.board.length][data.offset.row];
            }
            for (let i = 0; i < data.board.length; i++) {
                data.board[i][data.offset.row] = shifted[i];
            }
        } else {
            let shifted = [];
            for (let i = 0; i < data.board.length; i++) {
                shifted[i] = data.board[data.offset.column][(i + data.offset.value) % data.board.length];
            }
            for (let i = 0; i < data.board.length; i++) {
                data.board[data.offset.column][i] = shifted[i];
            }
        }
    }

    function clamp(number, min, max) {
        return Math.min(Math.max(number, min), max);
    }
}
