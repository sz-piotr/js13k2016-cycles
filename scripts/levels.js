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
        return (position.x === position.y) && (position.x === 2 || position.x === 4);
    },
    text: 'The glitch is spreading, stop it!',
    time: 240,
    objectiveMet: noGlitch
}, {
    isGlitch: function(position) {
        return (position.x === 2 || position.x === 4) && (position.y === 2 || position.y === 4);
    },
    turns: 200,
    text: 'Let no glitch survive!',
    objectiveMet: noGlitch
}, {
    isGlitch: function(position) {
        return position.x + 1 === position.y + 1;
    },
    turns: 150,
    text: 'Don\'t let the glitch overwhelm you',
    objectiveMet: noGlitch
}, {
    isGlitch: function(position) {
        return position.y === 3 || position.x === 3;
    },
    time: 200,
    text: 'Score 5,000 points',
    objectiveMet: function(data) {
        return data.score >= 5000;
    }
}, {
    isGlitch: function(position) {
        switch (position.x) {
            case 1:
            case 5:
                return position.y === 3;
            case 2:
            case 4:
                return position.y === 2 || position.y === 4;
            case 3:
                return position.y === 1 || position.y === 5;
            default:
                return false;
        }
    },
    turns: 40,
    text: 'Get a x5 combo',
    objectiveMet: function(data) {
        return data.combo.current >= 5;
    }
}, {
    isGlitch: function(position) {
        switch (position.y) {
            case 0:
            case 5:
                return position.x === 0 || position.x === 6;
            case 2:
            case 3:
                return position.x % 3 !== 0;
            case 4:
                return position.x === 3;
            case 6:
                return position.x % 2 === 0;
            default:
                return false;
        }
    },
    turns: 160,
    text: 'Stop the evil glitch!!!',
    objectiveMet: noGlitch
}, {
    isGlitch: function(position) {
        return position.x % 3 === position.y % 3;
    },
    turns: 20,
    text: 'Score 1,500 points',
    objectiveMet: function (data) {
        return data.score >= 1500;
    }
}, {
    isGlitch: function(position) {
        return position.x % 3 === 0;
    },
    time: 360,
    text: 'Score 1,000 points in one turn',
    objectiveMet: function (data) {
        this.lastScore = this.lastScore || 0;
        return data.score - this.lastScore >= 1000;
    }
}, {
    isGlitch: function(position) {
        return position.x % 2 === position.y % 2;
    },
    isBlocker: function(position) {
        return (position.x - 1) % 4 === 0 && (position.y - 1) % 4 === 0;
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
