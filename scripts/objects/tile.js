function Tile(n, e, s, w) {
    let tile = {
            n: Boolean(n),
            e: Boolean(e),
            s: Boolean(s),
            w: Boolean(w)
        },
        partOfCycle = false;

    this.has = function (direction) {
        return tile[Tile.resolve(direction)];
    };

    this.set = function (direction, value) {
        tile[Tile.resolve(direction)] = Boolean(value);
    };

    this.clone = function () {
        return new Tile(tile.n, tile.e, tile.s, tile.w);
    };

    this.isEmpty = function () {
        return !(tile.n || tile.e || tile.s || tile.w);
    }

    this.isGlitch = this.isEmpty;

    this.isPartOfCycle = function () {
        return partOfCycle;
    }

    this.setPartOfCycle = function (value) {
        partOfCycle = value;
    }

    this.offset = 0;
}

Tile.resolve = function (direction) {
    if (typeof direction === 'string')
        return direction;
    if (direction.y < 0) {
        return 'n';
    } else if (direction.y > 0) {
        return 's';
    } else if (direction.x < 0) {
        return 'w';
    } else if (direction.x > 0) {
        return 'e';
    }
}

Tile.tileset = [
    new Tile(0, 0, 1, 1),
    new Tile(0, 1, 0, 1),
    new Tile(0, 1, 1, 0),
    new Tile(0, 1, 1, 1),
    new Tile(1, 0, 0, 1),
    new Tile(1, 0, 1, 0),
    new Tile(1, 0, 1, 1),
    new Tile(1, 1, 0, 0),
    new Tile(1, 1, 0, 1),
    new Tile(1, 1, 1, 0),
    new Tile(1, 1, 1, 1)
];
