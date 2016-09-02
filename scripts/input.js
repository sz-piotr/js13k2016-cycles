function Input(view, data) {
    let inputProcessor = new InputProcessor(data);
    let ignoreMousePress = false;

    this.listen = function() {
        data.offset = {};

        document.body.addEventListener('mousedown', onMouseDown);
        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onMouseUp);
    };

    function onMouseDown(event) {
        if (ignoreMousePress)
            return;
        if (contained(event, view.mid.getBoundingClientRect())) {
            ignoreMousePress = true;
            inputProcessor.onpress(eventBoardLocation(event));
        }
    }

    function onMouseMove(e) {
        if (!ignoreMousePress)
            return;
        inputProcessor.onmove(eventBoardLocation(event));
    }

    function onMouseUp(e) {
        ignoreMousePress = false;
        inputProcessor.onrelease();
    }

    function eventBoardLocation(event) {
        let board = view.mid.getBoundingClientRect();
        let size = view.mid.width / data.board.length;
        return {
            x: (event.clientX - board.left) / size,
            y: (event.clientY - board.top) / size
        }
    }

    function contained(event, rectangle) {
        return event.clientX >= rectangle.left && event.clientX < rectangle.right && event.clientY >= rectangle.top && event.clientY < rectangle.bottom;
    }
}
