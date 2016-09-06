function Game(view) {
    let graphics = new Graphics(view);
    let data = {};
    _data = data;
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
        data.board = BoardCreator.create(Levels[data.currentLevel]);
    }

    function gameLoop() {
        window.requestAnimationFrame(gameLoop);
        updateTime();
        logic.update(data);
        graphics.update(data);
    };

    function updateTime() {
        let now = Date.now();
        data.time.delta = now - data.time.last;
        data.time.last = now;

        data.time.history.push(data.time.delta);
        if (data.time.history.length > 20)
            data.time.history.shift();
        data.time.fps = 0;
        data.time.history.forEach(function (element) {
            data.time.fps += element;
        });
        data.time.fps = Math.round(1000 / (data.time.fps / data.time.history.length));
    }
}

Game.BOARD_SIZE = 7;
