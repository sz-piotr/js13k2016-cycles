window.onload = function () {
    var size = {
        top: 2,
        mid: 7,
        bot: 2
    }
    size.sum = size.top + size.mid + size.bot;
    var ratio = size.mid / size.sum;
    var canvas = {
        top: document.getElementById('top'),
        mid: document.getElementById('mid'),
        bot: document.getElementById('bot')
    }

    updateOnResize();
    window.addEventListener('resize', updateOnResize);

    function updateOnResize() {
        var unit;
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        if (height * ratio <= width) {
            unit = height / size.sum;
        } else {
            unit = width / size.mid;
        }

        canvas.top.width = size.mid * unit;
        canvas.mid.width = size.mid * unit;
        canvas.bot.width = size.mid * unit;

        canvas.top.height = size.top * unit;
        canvas.mid.height = size.mid * unit;
        canvas.bot.height = size.bot * unit;
    }
}
