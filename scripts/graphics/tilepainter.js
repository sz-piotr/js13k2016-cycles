function TilePainter() {
    let size,
        outline,
        width,
        height,
        shadow,
        radius,
        line = {
            horizontal: {},
            vertical: {}
        };

    this.recalculate = function (canvasSize) {
        size = canvasSize / Game.BOARD_SIZE;
        outline = size / 20;
        width = size - outline * 2;
        height = width * 6 / 7;
        shadow = width / 7;
        radius = size / 8;

        let xThickness = width / 6,
            yThickness = xThickness * 6 / 7;

        line.horizontal.width = (width - xThickness) / 2;
        line.horizontal.height = yThickness;

        line.vertical.width = xThickness;
        line.vertical.height = (height - yThickness) / 2;
    };

    this.paintTile = function (ctx, x, y, tile) {
        x *= size;
        y *= size;
        if (isVisible(x, y)) {
            paintOutline(ctx, x, y);
            x += outline;
            y += outline;
            paintBase(ctx, x, y, tile);
            paintPattern(ctx, x, y, tile);
        }
    };

    function isVisible(x, y) {
        let min = -size,
            max = size * 7;
        return (x >= min) && (x <= max) && (y >= min) && (y <= max);
    }

    function paintOutline(ctx, x, y) {
        ctx.fillStyle = '#181818';
        Graphics.roundRect(ctx, x, y, size, size, radius);
    }

    function paintBase(ctx, x, y, tile) {
        ctx.fillStyle = getSecondaryColor(tile);
        Graphics.roundRect(ctx, x, y + shadow, width, height, radius);
        ctx.fillStyle = getPrimaryColor(tile);
        Graphics.roundRect(ctx, x, y, width, height, radius);
    }

    function getPrimaryColor(tile) {
        if (tile.isGlitch()) {
            return 'hsl(' + tile.hue + ', 80%, 50%)';
        } else if (tile.isPartOfCycle()) {
            return '#FFFFFF';
        } else {
            return '#F9ECC0';
        }
    }

    function getSecondaryColor(tile) {
        if (tile.isGlitch()) {
            return 'hsl(' + tile.hue + ', 100%, 35%)';
        } else if (tile.isPartOfCycle()) {
            return '#DDDDDD';
        } else {
            return '#B0A274';
        }
    }

    function paintPattern(ctx, x, y, tile) {
        if (tile.isEmpty())
            return;

        let verticalLineDimensions = new Vector2(line.vertical.width, line.vertical.height),
            horizontalLineDimensions = new Vector2();

        ctx.fillStyle = 'black';
        if (tile.has('n'))
            ctx.fillRect(x + line.horizontal.width, y, line.vertical.width, line.vertical.height);
        if (tile.has('w'))
            ctx.fillRect(x, y + line.vertical.height, line.horizontal.width, line.horizontal.height);
        if (tile.has('s'))
            ctx.fillRect(x + line.horizontal.width, y + line.vertical.height + line.horizontal.height, line.vertical.width, line.vertical.height);
        if (tile.has('e'))
            ctx.fillRect(x + line.horizontal.width + line.vertical.width, y + line.vertical.height, line.horizontal.width, line.horizontal.height);
        drawCenterPin(ctx, x + width / 2, y + height / 2, line.vertical.width, line.horizontal.height);
    }

    function drawCenterPin(ctx, x, y, width, height) {
        if (ctx.ellipse) {
            ctx.beginPath();
            ctx.ellipse(x, y, width / Math.sqrt(2), height / Math.sqrt(2), 0, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            width += 2;
            height += 2;
            ctx.fillRect(x - width / 2, y - width / 2, width, height);
        }
    }
}
