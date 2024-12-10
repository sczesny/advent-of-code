const text = await Deno.readTextFile('input.txt');
const map = text.trim().split('\n').map((line) => line.split('').map(Number));
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const trailheads = map.flatMap((row, i) => row.map((cell, j) => (cell === 0 ? [i, j] : null))).filter((trailhead): trailhead is [number, number] => trailhead !== null);

function part1() {
    function bfs([x, y]: [number, number]): number {
        const queue: [number, number, number][] = [[x, y, 0]],
            visited = new Set([`${x},${y}`]);
        let score = 0;
        while (queue.length) {
            const [x, y, height] = queue.shift()!;
            if (height === 9) {
                score++;
                continue;
            }
            for (const [dx, dy] of directions) {
                const nx = x + dx,
                    ny = y + dy;
                if (nx >= 0 && nx < map.length && ny >= 0 && ny < map[0].length && map[nx][ny] === height + 1 && !visited.has(`${nx},${ny}`)) {
                    queue.push([nx, ny, height + 1]);
                    visited.add(`${nx},${ny}`);
                }
            }
        }
        return score;
    }
    return trailheads.reduce((total, trailhead) => total + bfs(trailhead), 0);
}

function part2() {
    function dfs(x: number, y: number, height: number, visited: Set<string>): number {
        if (height === 9) return 1;
        return directions.reduce((paths, [dx, dy]) => {
            const nx = x + dx,
                ny = y + dy;
            if (nx >= 0 && nx < map.length && ny >= 0 && ny < map[0].length && map[nx][ny] === height + 1 && !visited.has(`${nx},${ny}`)) {
                visited.add(`${nx},${ny}`);
                paths += dfs(nx, ny, height + 1, visited);
                visited.delete(`${nx},${ny}`);
            }
            return paths;
        }, 0);
    }
    return trailheads.reduce((total, [x, y]) => total + dfs(x, y, 0, new Set([`${x},${y}`])), 0);
}

console.log(Deno.args[0] === '2' ? part2() : part1());
