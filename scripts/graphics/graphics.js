function Graphics(view) {
    let ctx = {
        top: view.top.getContext('2d'),
        mid: view.mid.getContext('2d'),
        bot: view.bot.getContext('2d')
    }

    let boardPainter = new BoardPainter(ctx.mid, view.mid);
    let scorePainter = new ScorePainter(ctx.top, view.top);
    let infoPainter = new InfoPainter(ctx.bot, view.bot);

    this.update = function (data) {
        clearAll();
        boardPainter.paint(data);
        scorePainter.paint(data);
        infoPainter.paint(data);
    };

    function clearAll() {
        clear('mid');
        clear('bot');
        clear('top');
    }

    function clear(location) {
        ctx[location].fillStyle = '#333';
        ctx[location].fillRect(0, 0, view[location].width, view[location].height);
    };
}
