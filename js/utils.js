function parse2D(arr) {
    const rows = [];
    for (let i = 0; i < arr.length; i += 16) {
        rows.push(arr.slice(i, i + 16));
    }
    return rows;
}

function createObjectsFrom2D(arr) {
    const objects = [];
    arr.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 292 || symbol === 250) {
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 64,
                            y: y * 64,
                        },
                    })
                );
            }
        });
    });
    return objects;
}
