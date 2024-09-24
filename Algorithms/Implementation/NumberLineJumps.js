'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'kangaroo' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER x1
 *  2. INTEGER v1
 *  3. INTEGER x2
 *  4. INTEGER v2
 */

// Solve for R.
// Inefficient as its limited to iterable tests of N
function kangaroo_old_solution(x1, v1, x2, v2) {
    const solutions = [];

    for (let N = 0; N <= 5000; N++) {
        const R = (v1 * N + (x1 - x2)) / v2;

        if (Number.isInteger(R) && N === R) {
            return 'YES'
        }
    }

    return 'NO';
}

// If N === R then solve by substituting N for R and then solve for N
function kangaroo(x1, v1, x2, v2) {
    if (v1 === v2 && x1 !== x2) {
        return 'NO';
    }

    const N = (x1 - x2) / (v2 - v1);

    if (Number.isInteger(N) && N > 0) {
        return 'YES';
    }

    return 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const x1 = parseInt(firstMultipleInput[0], 10);

    const v1 = parseInt(firstMultipleInput[1], 10);

    const x2 = parseInt(firstMultipleInput[2], 10);

    const v2 = parseInt(firstMultipleInput[3], 10);

    const result = kangaroo(x1, v1, x2, v2);

    ws.write(result + '\n');

    ws.end();
}
