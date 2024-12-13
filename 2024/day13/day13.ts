const text = await Deno.readTextFile('input.txt');

function part1() {
    const lines = text.trim().split('\n'), machines = [];
    for (let i = 0; i < lines.length; i += 4) {
        const buttonA = lines[i], buttonB = lines[i + 1], prize = lines[i + 2];
        machines.push({ 
            dxA: parseInt(buttonA.match(/X\+(\d+)/)?.[1] || '0'), 
            dyA: parseInt(buttonA.match(/Y\+(\d+)/)?.[1] || '0'), 
            dxB: parseInt(buttonB.match(/X\+(\d+)/)?.[1] || '0'), 
            dyB: parseInt(buttonB.match(/Y\+(\d+)/)?.[1] || '0'), 
            X_p: parseInt(prize.match(/X=(\d+)/)?.[1] || '0'), 
            Y_p: parseInt(prize.match(/Y=(\d+)/)?.[1] || '0')
        });
    }
    let totalCost = 0, prizesWon = 0;
    for (const m of machines) {
        const { dxA, dyA, dxB, dyB, X_p, Y_p } = m;
        let minCost = Infinity;
        for (let a = 0; a <= 100; a++) {
            const residualX = X_p - dxA * a;
            if (dxB === 0) {
                if (residualX !== 0) continue;
                for (let b = 0; b <= 100; b++) {
                    if (dyA * a + dyB * b === Y_p) {
                        const cost = 3 * a + b;
                        if (cost < minCost) minCost = cost;
                    }
                }
            } else {
                if (residualX % dxB !== 0) continue;
                const b = residualX / dxB;
                if (b < 0 || b > 100 || !Number.isInteger(b)) continue;
                if (dyA * a + dyB * b === Y_p) {
                    const cost = 3 * a + b;
                    if (cost < minCost) minCost = cost;
                }
            }
        }
        if (minCost !== Infinity) {
            totalCost += minCost;
            prizesWon++;
        }
    }
    return totalCost;
}

function part2() {
    const lines = text.trim().split('\n'), machines = [];
    for (let i = 0; i < lines.length; i += 4) {
        const buttonA = lines[i], buttonB = lines[i + 1], prize = lines[i + 2];
        machines.push({ 
            dxA: BigInt(parseInt(buttonA.match(/X\+(\d+)/)?.[1] || '0')), 
            dyA: BigInt(parseInt(buttonA.match(/Y\+(\d+)/)?.[1] || '0')), 
            dxB: BigInt(parseInt(buttonB.match(/X\+(\d+)/)?.[1] || '0')), 
            dyB: BigInt(parseInt(buttonB.match(/Y\+(\d+)/)?.[1] || '0')), 
            X_p: BigInt(parseInt(prize.match(/X=(\d+)/)?.[1] || '0')) + BigInt(1e13), 
            Y_p: BigInt(parseInt(prize.match(/Y=(\d+)/)?.[1] || '0')) + BigInt(1e13)
        });
    }
    let totalCost = BigInt(0);
    for (const m of machines) {
        const { dxA, dyA, dxB, dyB, X_p, Y_p } = m,
            D = dxA * dyB - dxB * dyA;
        if (D === BigInt(0)) continue;
        const N_a = X_p * dyB - dxB * Y_p,
            N_b = dxA * Y_p - X_p * dyA;
        if (N_a % D !== BigInt(0) || N_b % D !== BigInt(0)) continue;
        const a0 = N_a / D,
            b0 = N_b / D,
            deltaA = dxB / D,
            deltaB = -dxA / D;
        let t_start = BigInt(0);
        if (deltaA !== BigInt(0)) {
            let t = -a0 / deltaA;
            if (-a0 % deltaA !== BigInt(0)) t++;
            if (t > t_start) t_start = t;
        }
        if (deltaB !== BigInt(0)) {
            let t = -b0 / deltaB;
            if (-b0 % deltaB !== BigInt(0)) t++;
            if (t > t_start) t_start = t;
        }
        let minCost = null;
        for (let t = t_start; t < t_start + BigInt(1000); t++) {
            const a = a0 + deltaA * t,
                b = b0 + deltaB * t;
            if (a >= BigInt(0) && b >= BigInt(0)) {
                const cost = BigInt(3) * a + b;
                if (minCost === null || cost < minCost) minCost = cost;
            }
        }
        if (minCost !== null) totalCost += minCost;
    }
    return totalCost;
}

console.log(Deno.args[0] === '2' ? part2() : part1());
