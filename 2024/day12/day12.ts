const text = await Deno.readTextFile('input.txt');

function part1() {
    const data = text.split('\n');

    const plants = new Set<string>();
    const regions: { name: string; path: number[][] }[] = [];
    const width = data[0].length;
    const height = data.length;
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            plants.add(`${x},${y}`);
        }
    }

    while (plants.size > 0) {
        const start = [...plants][0].split(',').map((e) => +e);
        const region = { name: data[start[1]][start[0]], path: [[start[0], start[1]]] };
        const queue: number[][] = [[start[0], start[1]]];
        plants.delete(`${start[0]},${start[1]}`);
        while (queue.length > 0) {
            const currentPos = queue.shift()!;
            for (const dir of dirs) {
                const nextPos = { x: currentPos[0] + dir[0], y: currentPos[1] + dir[1] };
                if (nextPos.x >= 0 && nextPos.x < width && nextPos.y >= 0 && nextPos.y < height && data[nextPos.y][nextPos.x] === region.name && plants.has(`${nextPos.x},${nextPos.y}`)) {
                    plants.delete(`${nextPos.x},${nextPos.y}`);
                    region.path.push([nextPos.x, nextPos.y]);
                    queue.push([nextPos.x, nextPos.y]);
                }
            }
        }
        regions.push(region);
    }

    let result = 0;
    for (const region of regions) {
        const area = region.path.length;
        let totalPerimeter = 0;
        for (const pos of region.path) {
            let plantPerimeter = 0;
            for (const dir of dirs) {
                const nextPos = { x: pos[0] + dir[0], y: pos[1] + dir[1] };
                if (nextPos.x < 0 || nextPos.x >= width || nextPos.y < 0 || nextPos.y >= height || data[nextPos.y][nextPos.x] !== region.name) {
                    plantPerimeter++;
                }
            }
            totalPerimeter += plantPerimeter;
        }
        result += area * totalPerimeter;
    }
    return result;
}

function part2() {
    const data = text.split('\n');

    const plants = new Set<string>();
    const regions: { name: string; path: number[][] }[] = [];
    const width = data[0].length;
    const height = data.length;
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            plants.add(`${x},${y}`);
        }
    }

    while (plants.size > 0) {
        const start = [...plants][0].split(',').map((e) => +e);
        const region = { name: data[start[1]][start[0]], path: [[start[0], start[1]]] };
        const queue: number[][] = [[start[0], start[1]]];
        plants.delete(`${start[0]},${start[1]}`);
        while (queue.length > 0) {
            const currentPos = queue.shift()!;
            for (const dir of dirs) {
                const nextPos = { x: currentPos[0] + dir[0], y: currentPos[1] + dir[1] };
                if (nextPos.x >= 0 && nextPos.x < width && nextPos.y >= 0 && nextPos.y < height && data[nextPos.y][nextPos.x] === region.name && plants.has(`${nextPos.x},${nextPos.y}`)) {
                    plants.delete(`${nextPos.x},${nextPos.y}`);
                    region.path.push([nextPos.x, nextPos.y]);
                    queue.push([nextPos.x, nextPos.y]);
                }
            }
        }
        regions.push(region);
    }

    let result = 0;
    for (const region of regions) {
        const area = region.path.length;
        let totalPerimeter = 0;
        const [pathX, pathY] = [region.path.map((p) => p[0]), region.path.map((p) => p[1])];
        const [minX, maxX] = [Math.min(...pathX), Math.max(...pathX)];
        const [minY, maxY] = [Math.min(...pathY), Math.max(...pathY)];
        for (let i = minY; i <= maxY; i++) {
            const getHorizontalPlantsX = region.path
                .filter((p) => p[1] === i)
                .map((p) => p[0])
                .sort((a, b) => a - b);
            const [abovePos, belowPos] = [i - 1, i + 1];
            let [topSides, bottomSides] = [0, 0];
            const hasSamePlantAbove = [];
            const hasSamePlantBelow = [];
            for (let j = 0; j < getHorizontalPlantsX.length; j++) {
                const [posX, prevPosX] = [getHorizontalPlantsX[j], getHorizontalPlantsX[j - 1]];
                hasSamePlantAbove.push(abovePos >= 0 && data[abovePos][posX] === region.name);
                hasSamePlantBelow.push(belowPos < height && data[belowPos][posX] === region.name);
                if ((abovePos < 0 || data[abovePos][posX] !== region.name) && (j === 0 || posX - prevPosX > 1 || hasSamePlantAbove[j - 1])) {
                    topSides++;
                }
                if ((belowPos === height || data[belowPos][posX] !== region.name) && (j === 0 || posX - prevPosX > 1 || hasSamePlantBelow[j - 1])) {
                    bottomSides++;
                }
            }
            totalPerimeter += topSides + bottomSides;
        }
        for (let i = minX; i <= maxX; i++) {
            const getHorizontalPlantsY = region.path
                .filter((p) => p[0] === i)
                .map((p) => p[1])
                .sort((a, b) => a - b);
            const [leftPos, rightPos] = [i - 1, i + 1];
            let [leftSides, rightSides] = [0, 0];
            const hasSamePlantLeft = [];
            const hasSamePlantRight = [];
            for (let j = 0; j < getHorizontalPlantsY.length; j++) {
                const [posY, prevPosY] = [getHorizontalPlantsY[j], getHorizontalPlantsY[j - 1]];
                hasSamePlantLeft.push(leftPos >= 0 && data[posY][leftPos] === region.name);
                hasSamePlantRight.push(rightPos < height && data[posY][rightPos] === region.name);
                if ((leftPos < 0 || data[posY][leftPos] !== region.name) && (j === 0 || posY - prevPosY > 1 || hasSamePlantLeft[j - 1])) {
                    leftSides++;
                }
                if ((rightPos === width || data[posY][rightPos] !== region.name) && (j === 0 || posY - prevPosY > 1 || hasSamePlantRight[j - 1])) {
                    rightSides++;
                }
            }
            totalPerimeter += leftSides + rightSides;
        }
        result += area * totalPerimeter;
    }

    return result;
}

console.log(Deno.args[0] === '2' ? part2() : part1());
