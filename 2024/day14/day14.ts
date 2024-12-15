const text = await Deno.readTextFile('input.txt');

function part1() {
    const lines = text
        .trim()
        .split('\n')
        .filter((line) => line.trim() !== '');
    let width = 0,
        height = 0;
    const robots = lines.map((line) => {
        const splitLine = line.split(' '),
            [xStr, yStr] = splitLine[0].split('=')[1].split(','),
            [vxStr, vyStr] = splitLine[1].split('=')[1].split(','),
            x = parseInt(xStr),
            y = parseInt(yStr),
            vx = parseInt(vxStr),
            vy = parseInt(vyStr);
        width = Math.max(width, x + 1);
        height = Math.max(height, y + 1);
        return { x, y, vx, vy };
    });
    const midX = Math.floor(width / 2),
        midY = Math.floor(height / 2),
        steps = 100,
        quadrants = [0, 0, 0, 0];
    robots.forEach((robot) => {
        robot.x = (((robot.x + robot.vx * steps) % width) + width) % width;
        robot.y = (((robot.y + robot.vy * steps) % height) + height) % height;
        if (robot.x === midX || robot.y === midY) return;
        if (robot.x < midX && robot.y < midY) quadrants[0]++;
        else if (robot.x > midX && robot.y < midY) quadrants[1]++;
        else if (robot.x < midX && robot.y > midY) quadrants[2]++;
        else if (robot.x > midX && robot.y > midY) quadrants[3]++;
    });
    return quadrants.reduce((product, count) => product * count, 1);
}

function part2() {
    const lines = text
        .trim()
        .split('\n')
        .filter((line) => line.trim() !== '');
    let width = 0,
        height = 0;
    const robots = lines.map((line) => {
        const splitLine = line.split(' '),
            [xStr, yStr] = splitLine[0].split('=')[1].split(','),
            [vxStr, vyStr] = splitLine[1].split('=')[1].split(','),
            x = parseInt(xStr),
            y = parseInt(yStr),
            vx = parseInt(vxStr),
            vy = parseInt(vyStr);
        width = Math.max(width, x + 1);
        height = Math.max(height, y + 1);
        return { x, y, vx, vy };
    });
    const widthLimit = 101,
        heightLimit = 103;
    let seconds = 0,
        treeSize = 0;
    const minTreeSize = Math.floor(robots.length / 10),
        directions = [
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 }
        ];
    while (treeSize < minTreeSize) {
        seconds++;
        const robotsPos = new Set();
        robots.forEach((robot) => {
            robot.x = (((robot.x + robot.vx) % widthLimit) + widthLimit) % widthLimit;
            robot.y = (((robot.y + robot.vy) % heightLimit) + heightLimit) % heightLimit;
            robotsPos.add(`${robot.x},${robot.y}`);
        });
        treeSize = 0;
        const visited = new Set();
        for (const robot of robots) {
            const key = `${robot.x},${robot.y}`;
            if (visited.has(key)) continue;
            let countRobots = 0;
            const queue = [{ x: robot.x, y: robot.y }];
            while (queue.length > 0) {
                const current = queue.pop();
                if (!current) continue;
                const { x, y } = current,
                    posKey = `${x},${y}`;
                if (visited.has(posKey)) continue;
                visited.add(posKey);
                countRobots++;
                directions.forEach((dir) => {
                    const newX = (x + dir.dx + widthLimit) % widthLimit,
                        newY = (y + dir.dy + heightLimit) % heightLimit,
                        neighborKey = `${newX},${newY}`;
                    if (!visited.has(neighborKey) && robotsPos.has(neighborKey)) queue.push({ x: newX, y: newY });
                });
            }
            treeSize = Math.max(treeSize, countRobots);
        }
    }
    return seconds;
}

console.log(Deno.args[0] === '2' ? part2() : part1());
