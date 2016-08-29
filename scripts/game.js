 function Game(view) {
    let graphics = new Graphics(view);

    let currentLevel;
    let board;

    this.start = function() {
        currentLevel = localStorage.getItem('level') || 0;
        localStorage.setItem('level', currentLevel);

        board = BoardCreator.create();

        gameLoop();
    }

    function gameLoop() {
        window.requestAnimationFrame(gameLoop);
        graphics.clear();
        graphics.drawBoard(board);
    };
}
