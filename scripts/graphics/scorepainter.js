function ScorePainter(ctx, view) {

    this.paint = function (data) {
        let fontHeight = view.height / 3;
        ctx.fillStyle = 'red';
        ctx.font = 'bold ' + fontHeight + 'px sans-serif';
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.fillText(data.score, view.width / 2, view.height / 3);
        ctx.fillText(data.combo.current, view.width / 2, view.height * 2 / 3);
    }

}
