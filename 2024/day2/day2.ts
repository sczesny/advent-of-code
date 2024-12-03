const text = await Deno.readTextFile('input.txt');

const isSafe = (entries: number[]) => {
    const levels = entries.slice(1).map((e, i) => e - entries[i]);
    return !levels.includes(0) && !(levels.some((i) => i < 0) && levels.some((i) => i > 0)) && Math.max(...levels) < 4 && Math.min(...levels) > -4;
};

function part1() {
    return text.split('\r\n').filter((i) => isSafe(i.split(' ').map(Number))).length;
}

function part2() {
    const tryCombinations = (entries: number[]) => isSafe(entries) || entries.some((_, i) => isSafe(entries.filter((_, j) => i !== j)));
    return text.split('\r\n').filter((i) => tryCombinations(i.split(' ').map(Number))).length;
}

console.log(Deno.args[0] === '2' ? part2() : part1());
