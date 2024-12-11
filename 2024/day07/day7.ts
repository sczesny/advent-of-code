const text = await Deno.readTextFile('input.txt');

const lines = text.split('\n').map((l) => l.split(/\D+/g).map(Number));

function part1() {
    const calculate = (l: number[]) => l.slice(1).reduce((vl, e) => vl.flatMap((v) => [v + e, v * e]), [l[0]]);
    return lines.reduce((sum, line) => (calculate(line.slice(1)).includes(line[0]) ? sum + line[0] : sum), 0);
}

function part2() {
    const calculate = (l: number[]) => l.slice(1).reduce((vl, e) => vl.flatMap((v) => [v + e, v * e, v * 10 ** Math.floor(Math.log10(e) + 1) + e]), [l[0]]);
    return lines.reduce((sum, line) => (calculate(line.slice(1)).includes(line[0]) ? sum + line[0] : sum), 0);
}

console.log(Deno.args[0] === '2' ? part2() : part1());
