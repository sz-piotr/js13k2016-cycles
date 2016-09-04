function Graphics(view) {
    let ctx = {
        top: view.top.getContext('2d'),
        mid: view.mid.getContext('2d'),
        bot: view.bot.getContext('2d')
    }

    this.update = function (data) {
        clear('mid');
        clear('bot');
        drawFps(data.time.fps);
        drawBoard(data.board, data.offset);
    };

    function clear(location) {
        ctx[location].fillStyle = '#333';
        ctx[location].fillRect(0, 0, view[location].width, view[location].height);
    };

    function drawFps(fps) {
        ctx.bot.fillStyle = '#f00';
        let fontHeight = view.bot.height / 3;
        ctx.bot.textBaseline = 'middle';
        ctx.bot.textAlign = "center";
        ctx.bot.font = 'bold ' + fontHeight + 'px sans-serif';
        ctx.bot.fillText(fps, view.bot.width / 2, view.bot.height / 2);
    };

    function drawBoard(board, offset) {
        TilePainter.resize(view.mid.width, board.size);
        board.forEach(function (element, pos) {
            if (pos.y === offset.row) {
                TilePainter.paint(ctx.mid, pos.x + offset.value, pos.y, element);
                TilePainter.paint(ctx.mid, pos.x + offset.value - board.size, pos.y, element);
                TilePainter.paint(ctx.mid, pos.x + offset.value + board.size, pos.y, element);
            } else if (pos.x === offset.column) {
                TilePainter.paint(ctx.mid, pos.x, pos.y + offset.value, element);
                TilePainter.paint(ctx.mid, pos.x, pos.y + offset.value - board.size, element);
                TilePainter.paint(ctx.mid, pos.x, pos.y + offset.value + board.size, element);
            } else {
                TilePainter.paint(ctx.mid, pos.x, pos.y, element);
            }
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
        ctx.beginPath();
        this.drawCenterPin(ctx, x + this.width / 2, y + this.height / 2, this.line.vertical.width, this.line.horizontal.height);
        ctx.fill();
    },
    drawCenterPin: function (ctx, x, y, width, height) {
        if (ctx.ellipse) {
            ctx.ellipse(x, y, width / Math.sqrt(2), height / Math.sqrt(2), 0, 0, 2 * Math.PI);
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
