function Input(view, data) {
    var eventInProgress = false;
    var lastDown = {};

    this.listen = function() {
        console.log('listening');

        data.offset = {};

        document.body.addEventListener('mousedown', onPointerDown);
        document.body.addEventListener('mousemove', onPointerMove);
        document.body.addEventListener('mouseup', onPointerUp);
    };

    function onPointerDown(e) {
        if(eventInProgress)
            return;
        eventInProgress = true;

        let board = view.mid.getBoundingClientRect();
        if (contained(e, board)) {
            let size = view.mid.width / data.board.length;
            lastDown.x = (e.clientX - board.left) / size;
            lastDown.y = (e.clientY - board.top) / size;
        }
    }

    function onPointerMove(e) {
        if(!eventInProgress)
            return;

        let board = view.mid.getBoundingClientRect();
        let size = view.mid.width / data.board.length;
        let x = (e.clientX - board.left) / size;
        let y = (e.clientY - board.top) / size;

        let offset = {
            x: x - lastDown.x,
            y: y - lastDown.y
        };

        if ((Math.abs(offset.x) > 0.3 || Math.abs(offset.y) > 0.3) && data.offset.value === undefined) {
            if (Math.abs(offset.x) > Math.abs(offset.y)) {
                data.offset.row = Math.floor(lastDown.y);
                data.offset.value = clamp(offset.x, -6, 6);
            } else {
                data.offset.column = Math.floor(lastDown.x);
                data.offset.value = clamp(offset.y, -6, 6);
            }
        }
        if (data.offset.value !== undefined) {
            if (data.offset.row) {
                data.offset.value = clamp(offset.x, -6, 6);
            } else {
                data.offset.value = clamp(offset.y, -6, 6);
            }
        }
    }

    function onPointerUp(e) {
        eventInProgress = false;
        data.offset = {};
    }

    function contained(event, rectangle) {
        return event.clientX >= rectangle.left && event.clientX < rectangle.right && event.clientY >= rectangle.top && event.clientY < rectangle.bottom;
    }

    function clamp(number, min, max) {
        return Math.min(Math.max(number, min), max);
    }
}
