'use strict'
window.onload = init;

function init() {
    var canvas = document.getElementById('view');
    var ctx = canvas.getContext('2d');

    Tile.resize(canvas.width, 7);

    for (var i = 0; i < 7; i++)
        for (var j = 0; j < 7; j++) {
            var pattern = {};
            pattern.n = pattern.e = pattern.s = pattern.w = false;
            while (pattern.n + pattern.e + pattern.s + pattern.w < 2)
                pattern = {
                    n: Math.random() > 0.5,
                    e: Math.random() > 0.5,
                    s: Math.random() > 0.5,
                    w: Math.random() > 0.5
                };
            var type = {
                name: Math.random() < 0.95 ? 'basic' : 'special',
                pattern: pattern
            }
            Tile.draw(ctx, i, j, type);
        }
}
