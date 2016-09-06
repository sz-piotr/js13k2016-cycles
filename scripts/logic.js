function Logic() {
    let FALL_SPEED = 8;

    this.update = function (data) {
        updateIfBoardChanged(data);
        removeTilesIfNeeded(data);
        updateTiles(data);
    }

    function updateIfBoardChanged(data) {
        if (data.boardChanged) {
            data.boardChanged = false;
            if (BoardAnalizer.findCycles(data)) {
                data.timeUntileTileRemove = 0.3;
            } else {
                data.ignoreInput = false;
            }
        }
    }

    function removeTilesIfNeeded(data) {
        if (data.timeUntileTileRemove) {
            data.timeUntileTileRemove -= data.time.delta;
            if (data.timeUntileTileRemove <= 0) {
                delete data.timeUntileTileRemove;
                removeTiles(data);
            }
        }
    }

    function removeTiles(data) {
        console.log('removeTiles');
        for (let i = 0; i < data.board.size; i++) {
            for (let j = data.board.size - 1; j >= 0; j--) {
                let tile = data.board.getXY(i, j);
                if (tile.isPartOfCycle()) {
                    tile.offset = 3;
                }
            }
        }
    }

    function updateTiles(data) {
        let positionChanged = false;
        data.board.forEach(function (tile) {
            updateHue(tile, data.time.delta);
            if(updatePosition(tile, data.time.delta))
                positionChanged = true;
        });
        if(!data.timeUntileTileRemove && !positionChanged)
            data.ignoreInput = false;
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
        if(tile.offset === 0)
            return false;

        tile.offset -= delta * FALL_SPEED;
        if(tile.offset <= 0) {
            tile.offset = 0;
            return true;
        }
    }
}
