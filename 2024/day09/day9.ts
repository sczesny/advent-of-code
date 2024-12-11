const text = await Deno.readTextFile('input.txt');

interface FileInfo {
    start: number;
    length: number;
}

function parseDiskMap(diskMap: string): (number | string)[] {
    const lengths = diskMap.split('').map(Number),
        disk: (number | string)[] = [];
    let fileId = 0;
    lengths.forEach((length, i) => disk.push(...Array(length).fill(i % 2 === 0 ? fileId++ : '.')));
    return disk;
}
const disk = parseDiskMap(text);

function part1(): number {
    const compactBlocks = (disk: (number | string)[]): (number | string)[] => {
        const list = [...disk];
        while (list.includes('.')) {
            const gapIndex = list.indexOf('.');
            let rightBlock = list.pop();
            while (rightBlock === '.') rightBlock = list.pop();
            list[gapIndex] = rightBlock!;
        }
        return list;
    };

    const calculateChecksum = (disk: (number | string)[]): number => {
        let checksum = 0;
        disk.forEach((block, i) => {
            if (typeof block === 'number') checksum += i * block;
        });
        return checksum;
    };

    return calculateChecksum(compactBlocks([...disk]));
}

function part2(): number {
    const getFileInfo = (disk: (number | string)[]): Map<number, FileInfo> => {
        const files = new Map<number, FileInfo>();
        disk.forEach((block, i) => {
            if (typeof block === 'number') {
                const fileId = block;
                if (!files.has(fileId)) files.set(fileId, { start: i, length: 0 });
                files.get(fileId)!.length++;
            }
        });
        return files;
    };

    const compactFiles = (disk: (number | string)[], files: Map<number, FileInfo>): (number | string)[] => {
        const findFreeSegment = (disk: (number | string)[], fileLength: number, maxIndex: number): number => {
            let count = 0,
                segmentStart = -1;
            for (let i = 0; i < maxIndex; i++) {
                if (disk[i] === '.') {
                    if (segmentStart === -1) segmentStart = i;
                    if (++count === fileLength) return segmentStart;
                } else {
                    count = 0;
                    segmentStart = -1;
                }
            }
            return -1;
        };

        Array.from(files.keys())
            .sort((a, b) => b - a)
            .forEach((fId) => {
                const file = files.get(fId)!,
                    fileLength = file.length,
                    segmentStart = findFreeSegment(disk, fileLength, file.start);
                if (segmentStart !== -1) {
                    for (let pos = file.start; pos < file.start + fileLength; pos++) disk[pos] = '.';
                    for (let pos = segmentStart; pos < segmentStart + fileLength; pos++) disk[pos] = fId;
                }
            });
        return disk;
    };

    const calculateChecksum = (disk: (number | string)[]): number => {
        let checksum = 0;
        disk.forEach((block, i) => {
            if (typeof block === 'number') checksum += i * block;
        });
        return checksum;
    };

    const files = getFileInfo(disk);
    return calculateChecksum(compactFiles([...disk], files));
}

console.log(Deno.args[0] === '2' ? part2() : part1());
