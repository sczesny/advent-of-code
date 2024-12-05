const text = await Deno.readTextFile('input.txt');

const rules = text.split('\n\n')[0].split('\n').map((line) => line.split('|').map(Number));
const updates = text.split('\n\n')[1].split('\n').map((line) => line.split(',').map(Number));

function part1() {
    return updates
        .filter((u) => !rules.some((r) => u.indexOf(r[0]) != -1 && u.indexOf(r[1]) != -1 && u.indexOf(r[0]) > u.indexOf(r[1])))
        .reduce((acc, val) => acc + val[Math.floor(val.length / 2)], 0);
}

function part2() {
    const invalid = updates.filter((u) => rules.some((r) => u.indexOf(r[0]) != -1 && u.indexOf(r[1]) != -1 && u.indexOf(r[0]) > u.indexOf(r[1])));
    return invalid.map((u) => u.sort((a, b) => (rules.findIndex((r) => r[0] == a && r[1] == b) != -1 ? -1 : 1)))
        .reduce((acc, val) => acc + val[Math.floor(val.length / 2)], 0);
}

console.log(Deno.args[0] === '2' ? part2() : part1());
