let Levels = [{
    isGlitch: function (position) {
        return false;
    },
    time: 60,
    text: 'Shift the board to create cycles',
    objectiveMet: function (data) {
        return data.score > 0;
    }
}, {
    isGlitch: function (position) {
        return position.x === 3 && position.y === 3;
    },
    turns: false,
    time: false,
    text: 'Create a cycle around the glitch block to destroy it',
    objectiveMet: noGlitch
}]

function noGlitch(data) {
    let result = true;
    data.board.forEach(function (element) {
        if (!(element.n || element.w || element.s || element.e))
            result = false;
    });
    return result;
}
