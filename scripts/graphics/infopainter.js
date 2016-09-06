function InfoPainter(ctx, view) {

    this.paint = function (data) {
        drawFps(data.time.fps)
    }

    function drawFps(fps) {
        ctx.fillStyle = '#f00';
        let fontHeight = view.height / 3;
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.font = 'bold ' + fontHeight + 'px sans-serif';
        ctx.fillText(fps, view.width / 2, view.height / 2);
    };
}
