const text = await Deno.readTextFile('input.txt');

const [listL, listR] = text.split('\r\n').reduce(
    (acc, i) => {
        const [l, r] = i.split('   ');
        acc[0].push(Number(l));
        acc[1].push(Number(r));
        return acc;
    },
    [[], []] as [number[], number[]]
);

function part1() {
    listL.sort((a, b) => a - b);
    listR.sort((a, b) => a - b);
    return listL.reduce((sum, l, i) => sum + Math.abs(l - listR[i]), 0);
}

function part2() {
    return listL.reduce((sum, l) => sum + l * listR.filter((r) => r === l).length, 0);
}

console.log(Deno.args[0] === '2' ? part2() : part1());
