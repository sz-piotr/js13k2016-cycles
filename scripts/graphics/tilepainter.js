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

    this.paintTile = function (ctx, position, tile) {
        position = position.mul(size);
        if (isVisible(position)) {
            paintOutline(ctx, position);
            position = position.add(new Vector2(outline, outline));
            paintBase(ctx, position, tile);
            paintPattern(ctx, position, tile);
        }
    };

    function isVisible(position) {
        let min = -size,
            max = size * 7;
        return (position.x >= min) && (position.x <= max) && (position.y >= min) && (position.y <= max);
    }

    function paintOutline(ctx, position) {
        ctx.fillStyle = '#181818';
        Graphics.roundRect(ctx, position.x, position.y, size, size, radius);
    }

    function paintBase(ctx, position, tile) {
        ctx.fillStyle = getSecondaryColor(tile);
        Graphics.roundRect(ctx, position.x, position.y + shadow, width, height, radius);
        ctx.fillStyle = getPrimaryColor(tile);
        Graphics.roundRect(ctx, position.x, position.y, width, height, radius);
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

    function paintPattern(ctx, position, tile) {
        if (tile.isEmpty())
            return;

        let verticalLineDimensions = new Vector2(line.vertical.width, line.vertical.height),
            horizontalLineDimensions = new Vector2(line.horizontal.width, line.horizontal.height);

        ctx.fillStyle = 'black';
        if (tile.has('n'))
            rect(ctx, position.add(new Vector2(line.horizontal.width, 0)), verticalLineDimensions);
        if (tile.has('w'))
            rect(ctx, position.add(new Vector2(0, line.vertical.height)), horizontalLineDimensions);
        if (tile.has('s'))
            rect(ctx, position.add(new Vector2(line.horizontal.width, line.vertical.height + line.horizontal.height)), verticalLineDimensions);
        if (tile.has('e'))
            rect(ctx, position.add(new Vector2(line.horizontal.width + line.vertical.width, line.vertical.height)), horizontalLineDimensions);
        drawCenterPin(ctx, position.x + width / 2, position.y + height / 2, line.vertical.width, line.horizontal.height);
    }

    function rect(ctx, a, b) {
        ctx.fillRect(a.x, a.y, b.x, b.y);
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
