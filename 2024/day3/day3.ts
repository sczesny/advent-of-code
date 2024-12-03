const text = await Deno.readTextFile('input.txt');

function part1(text: string) {
    return text
        .matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)
        .map((m) => Number(m[1]) * Number(m[2]))
        .reduce((a, b) => a + b);
}

function part2(text: string) {
    return part1(text.replace(/don't\(\).*?do\(\)/gs, ''));
}

console.log(Deno.args[0] === '2' ? part2(text) : part1(text));
