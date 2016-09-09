let Levels = [{
    isGlitch: function (position) {
        return false;
    },
    text: 'Drag the tiles to create cycles',
    objectiveMet: function (data) {
        return data.score > 0;
    }
}, {
    isGlitch: function (position) {
        return position.x === 3 && position.y === 3;
    },
    text: 'Destroy the glitch tile!',
    objectiveMet: noGlitch
}, {
    isGlitch: function (position) {
        return (position.x === 2 || position.x === 4) && (position.y === 2 || position.y === 4);
    },
    time: 120,
    text: 'Let no glitch survive!',
    objectiveMet: noGlitch
}]

function noGlitch(data) {
    let result = true;
    data.board.forEach(function (element) {
        if (element.isGlitch())
            result = false;
    });
    return result;
}
