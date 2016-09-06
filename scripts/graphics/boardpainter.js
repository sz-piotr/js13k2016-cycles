function BoardPainter(ctx, view) {
    let tilePainter = new TilePainter();

    this.paint = function (data) {
        tilePainter.recalculate(view.width);
        drawBoard(data.board, data.offset);
    }

    function drawBoard(board, offset) {
        board.forEach(function (element, pos) {
            if (pos.y === offset.row) {
                tilePainter.paintTile(ctx, pos.x + offset.value, pos.y, element);
                tilePainter.paintTile(ctx, pos.x + offset.value - board.size, pos.y, element);
                tilePainter.paintTile(ctx, pos.x + offset.value + board.size, pos.y, element);
            } else if (pos.x === offset.column) {
                tilePainter.paintTile(ctx, pos.x, pos.y + offset.value, element);
                tilePainter.paintTile(ctx, pos.x, pos.y + offset.value - board.size, element);
                tilePainter.paintTile(ctx, pos.x, pos.y + offset.value + board.size, element);
            } else {
                tilePainter.paintTile(ctx, pos.x, pos.y - element.offset, element);
            }
        });
    };
}
