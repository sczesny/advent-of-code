const text = await Deno.readTextFile('input.txt');

function part1() {
    let stones = text.trim().split(/\s+/).map(Number);

    const blinks = 25;
    for (let blink = 0; blink < blinks; blink++) {
        const newStones: number[] = [];
        for (const stone of stones) {
            if (stone === 0) {
                newStones.push(1);
            } else if (stone.toString().length % 2 === 0) {
                const numStr = stone.toString();
                const mid = numStr.length / 2;
                const left = numStr.substring(0, mid).replace(/^0+/, '');
                const right = numStr.substring(mid).replace(/^0+/, '');
                const leftNum = left === '' ? 0 : parseInt(left, 10);
                const rightNum = right === '' ? 0 : parseInt(right, 10);
                newStones.push(leftNum, rightNum);
            } else {
                newStones.push(stone * 2024);
            }
        }
        stones = newStones;
    }
    return stones.length;
}

function part2() {
    const stones = text.trim().split(/\s+/);

    const blinks = 75;
    const memo = new Map<string, Map<number, number>>();

    function countStones(stone: string, blinksLeft: number): number {
        if (blinksLeft === 0) return 1;

        if (!memo.has(stone)) {
            memo.set(stone, new Map());
        }
        const memoBlinks = memo.get(stone)!;
        if (memoBlinks.has(blinksLeft)) {
            return memoBlinks.get(blinksLeft)!;
        }

        let total = 0;
        if (stone === '0') {
            total = countStones('1', blinksLeft - 1);
        } else if (stone.length % 2 === 0) {
            const mid = stone.length / 2;
            let left = stone.substring(0, mid).replace(/^0+/, '');
            let right = stone.substring(mid).replace(/^0+/, '');
            if (left === '') left = '0';
            if (right === '') right = '0';
            total = countStones(left, blinksLeft - 1) + countStones(right, blinksLeft - 1);
        } else {
            const newStone = (BigInt(stone) * 2024n).toString();
            total = countStones(newStone, blinksLeft - 1);
        }

        memoBlinks.set(blinksLeft, total);
        return total;
    }

    let totalStones = 0;
    for (const stone of stones) {
        totalStones += countStones(stone, blinks);
    }
    return totalStones;
}

console.log(Deno.args[0] === '2' ? part2() : part1());
