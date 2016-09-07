function Logic() {
    let FALL_SPEED = 6;

    this.update = function (data) {
        updateIfBoardChanged(data);
        removeTilesIfNeeded(data);
        updateTiles(data);
    }

    function updateIfBoardChanged(data) {
        if (data.boardChanged) {
            data.boardChanged = false;
            if (BoardAnalizer.findCycles(data)) {
                data.timeUntilTileRemove = 0.7;
            } else {
                data.ignoreInput = false;
            }
        }
    }

    function removeTilesIfNeeded(data) {
        if (data.timeUntilTileRemove > 0) {
            data.timeUntilTileRemove -= data.time.delta;
            if (data.timeUntilTileRemove <= 0) {
                removeTiles(data);
            }
        }
    }

    function removeTiles(data) {
        let shouldDelete = BoardAnalizer.shouldDeleteArray(data.board);
        for (let i = 0; i < data.board.size; i++) {
            let ceiling = 1;
            for (let j = data.board.size - 1; j >= 0; j--) {
                if (shouldDelete[i][j]) {
                    for (var k = j - 1; k >= 0; k--) {
                        if (!shouldDelete[i][k])
                            break;
                    }
                    if (k >= 0) {
                        shouldDelete[i][k] = true;
                        let tile = data.board.getXY(i, k);
                        tile.offset = j - k;
                        data.board.setXY(i, j, tile);
                    } else {
                        let tile = Tile.tileset[Math.floor(Math.random() * Tile.tileset.length)].clone();
                        tile.offset = j + ceiling;
                        data.board.setXY(i, j, tile);
                        ceiling++;
                    }
                }
            }
        }
    }

    function updateTiles(data) {
        let positionChanged = false;
        data.board.forEach(function (tile) {
            updateHue(tile, data.time.delta);
            if (updatePosition(tile, data.time.delta)) {
                positionChanged = true;
            }
        });
        if (data.timeUntilTileRemove <= 0 && !positionChanged) {
            data.boardChanged = true;
        }
    }

    function updateHue(tile, delta) {
        if (tile.isGlitch()) {
            if (!tile.hasOwnProperty('nextChange') || tile.nextChange <= 0) {
                tile.hue = Math.random() * 360;
                tile.nextChange = Math.random() * 1.5;
            }
            tile.nextChange -= delta;
        }
    }

    function updatePosition(tile, delta) {
        if (tile.offset === 0)
            return false;

        tile.offset -= delta * FALL_SPEED;
        if (tile.offset <= 0) {
            tile.offset = 0;
        }

        return true;
    }
}
