const text = await Deno.readTextFile('input.txt');

const grid = text.split('\n').map((line) => line.split(''));
const height = grid.length;
const width = grid[0].length;

const points = Object.values(grid.reduce((m: { [c: string]: number[][] }, line, y) => (line.forEach((v, x) => v != '.' && (m[v] = m[v] || []).push([x, y])), m), {}));

function part1() {
    const pos: string[] = [];
    points.forEach(v => pos.push(...v.reduce((m: number[][], [x, y], i) => (v.forEach(([x2, y2], j) => i != j && m.push([x + x - x2, y + y - y2])), m), [])
        .filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height).map(a => a.join())));
    return pos.filter((v, i, a) => a.indexOf(v) === i).length;
}

function part2() {
    const pos: string[] = [];
    points.forEach(v => {
        pos.push(...v.reduce((m: number[][], [x, y], i) => (v.forEach(([x2, y2], j) => {
            if (i == j) return;
            let [nx, ny] = [x, y];
            while ((nx += x2 - x) >= 0 && (ny += y2 - y) >= 0 && nx < width && ny < height) m.push([nx, ny]);
        }), m), []).filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height).map(a => a.join()));
    });
    return pos.filter((v, i, a) => a.indexOf(v) === i).length;
}

console.log(Deno.args[0] === '2' ? part2() : part1());
