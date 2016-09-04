function Logic() {
    this.update = function (data) {
        updateGlitchHue(data);
    }

    function updateGlitchHue(data) {
        data.board.forEach(function (tile) {
            if (isGlitch(tile)) {
                if (!tile.hasOwnProperty('nextChange') || tile.nextChange <= 0) {
                    tile.hue = Math.random() * 360;
                    tile.nextChange = Math.random() * 1500;
                }
                tile.nextChange -= data.time.delta;
            }
        });
    }

    function isGlitch(tile) {
        return !(tile.n || tile.e || tile.s || tile.w);
    }
}
