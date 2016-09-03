function Input(view, data) {
    let inputProcessor = new InputProcessor(data);
    let ignoreMousePress = false;
    let handledTouch = false;

    this.listen = function() {
        data.offset = {};

        document.body.addEventListener('mousedown', onMouseDown, false);
        document.body.addEventListener('mousemove', onMouseMove, false);
        document.body.addEventListener('mouseup', onMouseUp, false);
        document.body.addEventListener('mouseleave', onMouseLeave, false);

        document.body.addEventListener("touchstart", onTouchStart, false);
        document.body.addEventListener("touchmove", onTouchMove, false);
        document.body.addEventListener("touchend", onTouchEnd, false);
        document.body.addEventListener("touchcancel", onTouchCancel, false);
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

    function onMouseLeave(e) {
        ignoreMousePress = false;
        inputProcessor.oncancel();
    }

    function eventBoardLocation(event) {
        let board = view.mid.getBoundingClientRect();
        let size = view.mid.width / data.board.size;
        return {
            x: (event.clientX - board.left) / size,
            y: (event.clientY - board.top) / size
        }
    }

    function contained(event, rectangle) {
        return event.clientX >= rectangle.left && event.clientX < rectangle.right && event.clientY >= rectangle.top && event.clientY < rectangle.bottom;
    }

    function onTouchStart(event) {
        event.preventDefault();
        if (handledTouch !== false)
            return;
        let touch = event.changedTouches[0];
        if (contained(touch, view.mid.getBoundingClientRect())) {
            inputProcessor.onpress(eventBoardLocation(touch));
            handledTouch = touch.identifier;
        }
    };

    function onTouchMove() {
        event.preventDefault();
        if (handledTouch === false)
            return;
        for (let i = 0; i < event.changedTouches.length; i++) {
            if (event.changedTouches[i].identifier === handledTouch) {
                inputProcessor.onmove(eventBoardLocation(event.changedTouches[i]));
            }
        };
    };

    function onTouchEnd(event) {
        if (handledTouch === false)
            return;
        for (let i = 0; i < event.changedTouches.length; i++) {
            if (event.changedTouches[i].identifier === handledTouch) {
                handledTouch = false;
                inputProcessor.onrelease();
            }
        };
    };

    function onTouchCancel() {
        if (handledTouch === false)
            return;
        for (let i = 0; i < event.changedTouches.length; i++) {
            if (event.changedTouches[i].identifier === handledTouch) {
                handledTouch = false;
                inputProcessor.oncancel();
            }
        };
    };
}
