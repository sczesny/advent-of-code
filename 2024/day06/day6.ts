const text = await Deno.readTextFile('input.txt');

const grid = text.split('\n').map((line) => line.split(''));
const sy = grid.findIndex((line) => line.includes('^'));
const sx = grid[sy].indexOf('^');

function trace(x: number = sx, y: number = sy, d = [-1, 0]): Set<unknown> | false {
    const path = new Set();
    while (true) {
        const state = `${y},${x},${d[0]},${d[1]}`;
        if (path.has(state)) return false;
        path.add(state);
        const [nx, ny] = [y + d[0], x + d[1]];
        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length) break;
        grid[nx][ny] === '#' ? (d = [d[1], -d[0]]) : ([y, x] = [nx, ny]);
    }
    return path;
}

function part1() {
    return Array.from(trace() as Set<string>)
        .map((s) => s.split(',').slice(0, 2).join(','))
        .filter((s, i, a) => a.indexOf(s) === i).length;
}

function part2() {
    const path = Array.from(trace() as Set<string>)
        .map((i) => i.split(',').map(Number))
        .filter((i, j, a) => a.findIndex((k) => k[0] == i[0] && k[1] == i[1]) == j);
    let count = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const [a, b] = [path[i], path[i + 1]];
        grid[b[0]][b[1]] = '#';
        if (trace(a[1], a[0], a.slice(2)) == false) count++;
        grid[b[0]][b[1]] = '.';
    }
    return count;
}

const stamp = performance.now();
console.log(Deno.args[0] === '2' ? part2() : part1());
console.log(`Time: ${performance.now() - stamp}ms`);
