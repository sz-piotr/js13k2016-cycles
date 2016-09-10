let Levels = [{
    isGlitch: function(position) {
        return false;
    },
    text: 'Drag the tiles to create cycles',
    objectiveMet: function(data) {
        return data.score > 0;
    }
}, {
    isGlitch: function(position) {
        return false;
    },
    text: 'Create cycles in a row to combo',
    objectiveMet: function(data) {
        return data.combo.current > 1;
    }
}, {
    isGlitch: function(position) {
        return position.x === 3 && position.y === 3;
    },
    text: 'Destroy the glitch tile!',
    objectiveMet: noGlitch
}, {
    isGlitch: function(position) {
        return (position.x === 2 || position.x === 4) && (position.y === 2 || position.y === 4);
    },
    time: 10,
    text: 'Let no glitch survive!',
    objectiveMet: noGlitch
}, {
    isGlitch: function(position) {
        return position.x + 1 === position.y + 1;
    },
    turns: 100,
    text: 'Put an end to this corruption',
    objectiveMet: noGlitch
}, {
    isGlitch: function(position) {
        return position.y === 3 || position.x === 3;
    },
    time: 240,
    text: 'Score 10,000 points',
    objectiveMet: function(data) {
        return data.score >= 10000;
    }
}, {
    isGlitch: function(position) {
        return position.x % 2 === position.y % 2;
    },
    text: 'Free Play',
    objectiveMet: function(data) {
        return false;
    }
}]

function noGlitch(data) {
    let result = true;
    data.board.forEach(function(element) {
        if (element.isGlitch())
            result = false;
    });
    return result;
}
