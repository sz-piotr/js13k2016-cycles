function Logic() {
    this.update = function (data) {
        updateGlitchHue(data);
        if (data.boardChanged) {
            BoardAnalizer.findCycles(data);
            data.ignoreInput = false;
        }
    }

    function updateGlitchHue(data) {
        data.board.forEach(function (tile) {
            if (tile.glitch) {
                if (!tile.hasOwnProperty('nextChange') || tile.nextChange <= 0) {
                    tile.hue = Math.random() * 360;
                    tile.nextChange = Math.random() * 1500;
                }
                tile.nextChange -= data.time.delta;
            }
        });
    }
}
