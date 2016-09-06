function BoardPainter(ctx, view) {
    this.paint = function (data) {
        TilePainter.resize(view.width, data.board.size);
        drawBoard(data.board, data.offset);
        drawCycles(data.cycles);
    }

    function drawBoard(board, offset) {
        board.forEach(function (element, pos) {
            if (pos.y === offset.row) {
                TilePainter.paint(ctx, pos.x + offset.value, pos.y, element);
                TilePainter.paint(ctx, pos.x + offset.value - board.size, pos.y, element);
                TilePainter.paint(ctx, pos.x + offset.value + board.size, pos.y, element);
            } else if (pos.x === offset.column) {
                TilePainter.paint(ctx, pos.x, pos.y + offset.value, element);
                TilePainter.paint(ctx, pos.x, pos.y + offset.value - board.size, element);
                TilePainter.paint(ctx, pos.x, pos.y + offset.value + board.size, element);
            } else {
                TilePainter.paint(ctx, pos.x, pos.y, element);
            }
        });
    };

    function drawCycles(board) {
        if (!board)
            return;
        board.forEach(function (element, pos) {
            TilePainter.paintCycleDark(ctx, pos.x, pos.y, element);
        });
        board.forEach(function (element, pos) {
            TilePainter.paintCycleLight(ctx, pos.x, pos.y, element);
        });
    };
}


let TilePainter = {
    resize: function (canvasSize, boardSize) {
        this.size = canvasSize / boardSize;
        this.outline = this.size / 20;
        this.width = this.size - this.outline * 2;
        this.height = this.width * 6 / 7;
        this.shadow = this.width / 7;
        this.radius = this.size / 8;
        let xThickness = this.width / 6;
        let yThickness = xThickness * 6 / 7;
        this.line = {
            horizontal: {
                width: (this.width - xThickness) / 2,
                height: yThickness
            },
            vertical: {
                width: xThickness,
                height: (this.height - yThickness) / 2
            }
        };
    },
    paintCycleDark: function (ctx, x, y, tile) {
        if (tile.empty)
            return;
        let center = new Vector2(x * this.size + this.size / 2, y * this.size + this.outline + this.height / 2);
        ctx.fillStyle = '#181818';
        this.paintCycle(ctx, center, tile, this.line.vertical.width * 2, this.line.horizontal.height * 2);
    },
    paintCycleLight: function (ctx, x, y, tile) {
        if (tile.empty)
            return;
        let center = new Vector2(x * this.size + this.size / 2, y * this.size + this.outline + this.height / 2);
        ctx.fillStyle = '#fff';
        this.paintCycle(ctx, center, tile, this.line.vertical.width * 1.3, this.line.horizontal.height * 1.3);
    },
    paintCycle: function (ctx, center, tile, width, height) {
        this.drawCenterPin(ctx, center.x, center.y, width, height);
        if (tile.has('s'))
            ctx.fillRect(center.x - width / 2, center.y, width, this.size);
        if (tile.has('e'))
            ctx.fillRect(center.x, center.y - height / 2, this.size, height);
    },
    paint: function (ctx, x, y, tile) {
        x = x * this.size + this.outline;
        y = y * this.size + this.outline;

        if (!this.visible(x - this.outline, y - this.outline))
            return;

        this.drawOutline(ctx, x - this.outline, y - this.outline);

        if (tile.glitch) {
            this.drawGlitch(ctx, x, y, tile);
            return;
        }

        ctx.fillStyle = '#B0A274';
        roundRect(ctx, x, y + this.shadow, this.width, this.height, this.radius);
        ctx.fillStyle = '#F9ECC0';
        roundRect(ctx, x, y, this.width, this.height, this.radius);
        ctx.fillStyle = 'black';
        this.drawPattern(ctx, x, y, tile);
    },
    visible: function (x, y) {
        let min = -this.size;
        let max = this.size * 7;
        return (x >= min) && (x <= max) && (y >= min) && (y <= max);
    },
    drawOutline: function (ctx, x, y) {
        ctx.fillStyle = '#181818';
        roundRect(ctx, x, y, this.size, this.size, this.radius);
    },
    drawPattern(ctx, x, y, tile) {
        if (tile.has('n'))
            ctx.fillRect(x + this.line.horizontal.width, y, this.line.vertical.width, this.line.vertical.height);
        if (tile.has('w'))
            ctx.fillRect(x, y + this.line.vertical.height, this.line.horizontal.width, this.line.horizontal.height);
        if (tile.has('s'))
            ctx.fillRect(x + this.line.horizontal.width, y + this.line.vertical.height + this.line.horizontal.height, this.line.vertical.width, this.line.vertical.height);
        if (tile.has('e'))
            ctx.fillRect(x + this.line.horizontal.width + this.line.vertical.width, y + this.line.vertical.height, this.line.horizontal.width, this.line.horizontal.height);
        this.drawCenterPin(ctx, x + this.width / 2, y + this.height / 2, this.line.vertical.width, this.line.horizontal.height);
    },
    drawCenterPin: function (ctx, x, y, width, height) {
        if (ctx.ellipse) {
            ctx.beginPath();
            ctx.ellipse(x, y, width / Math.sqrt(2), height / Math.sqrt(2), 0, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            width += 2;
            height += 2;
            ctx.fillRect(x - width / 2, y - width / 2, width, height);
        }
    },
    drawGlitch: function (ctx, x, y, tile) {
        ctx.fillStyle = 'hsl(' + tile.hue + ', 100%, 35%)';
        roundRect(ctx, x, y + this.shadow, this.width, this.height, this.radius);
        ctx.fillStyle = 'hsl(' + tile.hue + ', 80%, 50%)';
        roundRect(ctx, x, y, this.width, this.height, this.radius);
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
