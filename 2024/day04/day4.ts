const text = await Deno.readTextFile('input.txt');

function part1(text: string) {
    const lines = text.split('\n');
    const width = lines[0].length, height = lines.length;
    const word = 'XMAS';
    let sum = 0;
    const directions = [[1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, -1], [1, -1], [-1, 1]];
    lines.forEach((line, y) => {
        Array.from(line).forEach((char, x) => {
            if (char !== word[0]) return;
            directions.forEach(([dx, dy]) => {
                if (Array.from({ length: word.length - 1 }).every((_, i) => {
                    const nx = x + (i + 1) * dx;
                    const ny = y + (i + 1) * dy;
                    return nx >= 0 && nx < width && ny >= 0 && ny < height && lines[ny][nx] === word[i + 1];
                })) sum++;
            });
        });
    });
    return sum;
}

function part2(text: string) {
    const lines = text.split('\n');
    return lines.slice(1, -1).reduce((sum, line, y) => {
        return sum + Array.from(line.slice(1, -1)).reduce((sum, char, x) => {
            if (char === 'A') {
                if (
                    ((lines[y][x] === 'M' && lines[y + 2][x + 2] === 'S') || 
                    (lines[y][x] === 'S' && lines[y + 2][x + 2] === 'M')) &&
                    ((lines[y][x + 2] === 'M' && lines[y + 2][x] === 'S') || 
                    (lines[y][x + 2] === 'S' && lines[y + 2][x] === 'M'))
                ) return ++sum;
            }
            return sum;
        }, 0);
    }, 0);
}

console.log(Deno.args[0] === '2' ? part2(text) : part1(text));
