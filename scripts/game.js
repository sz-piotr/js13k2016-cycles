function Game(view) {
    let graphics = new Graphics(view);
    let data = {};
    let logic = new Logic();
    let input = new Input(view, data);

    this.start = function () {
        data.currentLevel = localStorage.getItem('level') || 0;
        localStorage.setItem('level', data.currentLevel);

        initData();
        input.listen();
        gameLoop();
    }

    function initData() {
        data.time = {
            last: Date.now(),
            history: []
        };
        let level = Levels[data.currentLevel];
        data.board = BoardCreator.create(level);
        console.log(level);
        data.level = {
            startTime: Date.now() / 1000,
            timeTotal: level.time,
            timeleft: level.time
        }
    }

    function gameLoop() {
        window.requestAnimationFrame(gameLoop);
        updateTime();
        logic.update(data);
        graphics.update(data);
    };

    function updateTime() {
        let now = Date.now();

        data.level.timeleft = data.level.timeTotal + Math.ceil(data.level.startTime - now / 1000);

        data.time.delta = (now - data.time.last) / 1000;
        data.time.last = now;

        data.time.history.push(data.time.delta);
        if (data.time.history.length > 20)
            data.time.history.shift();
        data.time.fps = 0;
        data.time.history.forEach(function (element) {
            data.time.fps += element;
        });
        data.time.fps = Math.round(data.time.history.length / data.time.fps);
    }
}

Game.BOARD_SIZE = 7;
