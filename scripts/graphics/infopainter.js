function InfoPainter(ctx, view) {

    this.paint = function (data) {
        drawFps(data.time.fps);
        drawTime(data.level.timeleft);
    }

    function drawFps(fps) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(fps, 20, 40);
    };

    function drawTime(time) {
        ctx.fillStyle = Graphics.BLUE;
        let fontHeight = view.height / 3;
        ctx.save();
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.font = 'bold ' + fontHeight + 'px sans-serif';
        ctx.fillText(time, view.width / 2, view.height / 2);
        ctx.restore();
    }
}
