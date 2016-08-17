var Tile = {
    resize: function (canvasSize, boardSize) {
        Tile.size = canvasSize / (boardSize + 0.5);
        Tile.padding = Tile.size / 4;
        Tile.outline = Tile.size / 20;
        Tile.width = Tile.size - Tile.outline * 2;
        Tile.height = Tile.width * 6 / 7;
        Tile.shadow = Tile.width / 7;
        Tile.radius = Tile.size / 8;
        var xThickness = Tile.width / 6;
        var yThickness = xThickness * 6 / 7;
        Tile.line = {
            horizontal: {
                width: (Tile.width - xThickness) / 2,
                height: yThickness
            },
            vertical: {
                width: xThickness,
                height: (Tile.height - yThickness) / 2
            }
        };
    },
    draw: function (ctx, x, y, type) {
        x = Tile.padding + x * Tile.size + Tile.outline;
        y = Tile.padding + y * Tile.size + Tile.outline;

        Tile.drawOutline(ctx, x - Tile.outline, y - Tile.outline);

        ctx.fillStyle = (type.name === 'basic') ? '#B0A274' : '#A8273C';
        roundRect(ctx, x, y + Tile.shadow, Tile.width, Tile.height, Tile.radius);
        ctx.fillStyle = (type.name === 'basic') ? '#F9ECC0' : '#FE2448';
        roundRect(ctx, x, y, Tile.width, Tile.height, Tile.radius);
        ctx.fillStyle = 'black';
        if (type.pattern.n)
            ctx.fillRect(x + Tile.line.horizontal.width, y, Tile.line.vertical.width, Tile.line.vertical.height);
        if (type.pattern.w)
            ctx.fillRect(x, y + Tile.line.vertical.height, Tile.line.horizontal.width, Tile.line.horizontal.height);
        if (type.pattern.s)
            ctx.fillRect(x + Tile.line.horizontal.width, y + Tile.line.vertical.height + Tile.line.horizontal.height, Tile.line.vertical.width, Tile.line.vertical.height);
        if (type.pattern.e)
            ctx.fillRect(x + Tile.line.horizontal.width + Tile.line.vertical.width, y + Tile.line.vertical.height, Tile.line.horizontal.width, Tile.line.horizontal.height);
        ctx.beginPath();
        ctx.ellipse(x + Tile.width / 2, y + Tile.height / 2, Tile.line.vertical.width / Math.sqrt(2), Tile.line.horizontal.height / Math.sqrt(2), 0, 0, 2 * Math.PI);
        ctx.fill();
    },
    drawOutline: function (ctx, x, y) {
        ctx.fillStyle = '#222';
        roundRect(ctx, x, y, Tile.size, Tile.size, Tile.radius);
    }
}

function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}
