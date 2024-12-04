const text = await Deno.readTextFile('input.txt');

function part1(text: string) {
    const lines = text.split('\n');
    const width = lines[0].length, height = lines.length;
    const word = 'XMAS';
    let sum = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (lines[y][x] == word[0]) {
                for (const [dx, dy] of [[1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, -1], [1, -1], [-1, 1]]) {
                    let found = true;
                    for (let i = 1; i < word.length; i++) {
                        const nx = x + i * dx;
                        const ny = y + i * dy;
                        if (nx < 0 || nx >= width || ny < 0 || ny >= height || lines[ny][nx] != word[i]) {
                            found = false;
                            break;
                        }
                    }
                    if (found) {
                        sum++;
                    }
                }
            }
        }
    }
    return sum;
}

function part2(text: string) {
    const lines = text.split('\n');
    const width = lines[0].length, height = lines.length;
    let sum = 0;
    for (let y = 1; y < height - 1; y++)
        for (let x = 1; x < width - 1; x++)
            if (lines[y][x] == 'A')
                if ((lines[y - 1][x - 1] == 'M' && lines[y + 1][x + 1] == 'S') || (lines[y - 1][x - 1] == 'S' && lines[y + 1][x + 1] == 'M'))
                    if ((lines[y - 1][x + 1] == 'M' && lines[y + 1][x - 1] == 'S') || (lines[y - 1][x + 1] == 'S' && lines[y + 1][x - 1] == 'M')) sum++;
    return sum;
}

console.log(Deno.args[0] === '2' ? part2(text) : part1(text));
