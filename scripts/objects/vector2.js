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

    this.mul = function (scalar) {
        return new Vector2(x * scalar, y * scalar);
    }

    this.equals = function (other) {
        if (!(other instanceof Vector2))
            return false;
        return x === other.x && y === other.y;
    }
}

Vector2.directions = [
    new Vector2(0, -1),
    new Vector2(1, 0),
    new Vector2(0, 1),
    new Vector2(-1, 0)
]
