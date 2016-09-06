function Vector2(x, y) {
    Object.defineProperties(this, {
        "x": {
            value: x,
            writable: false
        },
        "y": {
            value: y,
            writable: false
        }
    });

    this.add = function (other) {
        return new Vector2(x + other.x, y + other.y);
    }

    this.sub = function (other) {
        return new Vector2(x - other.x, y - other.y);
    }

    this.equals = function (other) {
        if (!(other instanceof Vector2))
            return false;
        return x === other.x && y === other.y;
    }
}

Vector2.ZERO = new Vector2(0, 0);

Vector2.directions = [
    new Vector2(0, -1),
    new Vector2(1, 0),
    new Vector2(0, 1),
    new Vector2(-1, 0)
]

function Matrix(width, height, fill) {
    let matrix = [];
    for (let i = 0; i < width; i++) {
        let column = [];
        for (let j = 0; j < height; j++) {
            column.push(fill);
        }
        matrix.push(column);
    }

    this.getXY = function (x, y) {
        if (inBounds(x, y))
            return matrix[x][y];
    }

    this.get = function (position) {
        return this.getXY(position.x, position.y);
    }

    this.setXY = function (x, y, value) {
        if (inBounds(x, y))
            matrix[x][y] = value;
    }

    this.set = function (position, value) {
        this.setXY(position.x, position.y, value);
    }

    this.hasXY = inBounds;

    this.has = function (position) {
        return this.hasXY(position.x, position.y);
    };

    function inBounds(x, y) {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    this.forEach = function (callback) {
        for (let i = 0; i < width; i++)
            for (let j = 0; j < height; j++)
                callback(matrix[i][j], new Vector2(i, j));
    }

    this.clone = function () {
        let clone = new Matrix(width, height);
        clone.forEach(function (element, position) {
            let original = matrix[position.x][position.y];
            let copy = original.clone ? original.clone() : deepCopy(original);
            clone.set(position, copy);
        });
        return clone;
    }

    Object.defineProperties(this, {
        "width": {
            value: width,
            writable: false
        },
        "height": {
            value: height,
            writable: false
        },
        "size": {
            value: width,
            writable: false
        }
    });
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
