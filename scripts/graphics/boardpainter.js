function BoardPainter(ctx, view) {
    let tilePainter = new TilePainter();

    this.paint = function (data) {
        tilePainter.recalculate(view.width);
        drawBoard(data.board, data.offset);
    }

    function drawBoard(board, offset) {
        board.forEach(function (element, pos) {
            if (pos.y === offset.row) {
                tilePainter.paintTile(ctx, pos.add(new Vector2(offset.value, 0)), element);
                tilePainter.paintTile(ctx, pos.add(new Vector2(offset.value - board.size, 0)), element);
                tilePainter.paintTile(ctx, pos.add(new Vector2(offset.value + board.size, 0)), element);
            } else if (pos.x === offset.column) {
                tilePainter.paintTile(ctx, pos.add(new Vector2(0, offset.value)), element);
                tilePainter.paintTile(ctx, pos.add(new Vector2(0, offset.value - board.size)), element);
                tilePainter.paintTile(ctx, pos.add(new Vector2(0, offset.value + board.size)), element);
            } else {
                tilePainter.paintTile(ctx, pos, element);
            }
        });
    };
}
