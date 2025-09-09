import { Cube } from "./cube.js";

const eFaces = [
    ['b', 'm'],
    ['c', 'i'],
    ['d', 'e'],
    ['a', 'q'],
    ['v', 'o'],
    ['u', 'k'],
    ['x', 'g'],
    ['w', 's'],
    ['j', 'p'],
    ['l', 'f'],
    ['r', 'h'],
    ['t', 'n']
]

const cFaces = [
    ['c', 'm', 'j'],
    ['d', 'i', 'f'],
    ['a', 'e', 'r'],
    ['b', 'q', 'n'],
    ['v', 'k', 'p'],
    ['w', 'g', 'l'],
    ['x', 's', 'h'],
    ['u', 'o', 't']
]

function blindSolver(scramble) {
    const cube = new Cube;
    cube.alg(scramble);
    return solveCorners(cube);
}

function solveCorners(cube) {
    const remaining = new Set([0, 1, 3, 4, 5, 6, 7]);
    var solution = cFaces [cube.corners[2][0]][cube.corners[2][1]]
    var flip = " ";
    var next = cube.corners[2][0];
    var lastOri = cube.corners[2][1];
    while(remaining.size > 0) {
        if(next == 2) {
            next = remaining.values().next().value;
        } else if(next == cube.corners[next][0]) {
            if(cube.corners[next][1] != 0)
                flip += cFaces[cube.corners[next][0]][cube.corners[next][1]];
            remaining.delete(next);
            next = remaining.values().next().value;
        } else {
            if(cube.corners[next][0] !== 2) {
                lastOri = (cube.corners[next][1] + lastOri) % 3;
                solution += cFaces[cube.corners[next][0]][lastOri];
            }
            remaining.delete(next);
            next = cube.corners[next][0];
        }
    }
    console.log(cube.corners);
    return memoFormat(solution) + flip;
}

function solveEdges(cube) {
    const remaining = new Set([0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11]);
    var solution = eFaces[cube.edges[5][0]][cube.edges[5][1]];
    var flip = " ";
    var next = cube.edges[5][0];
    var lastOri = cube.edges[5][1];
    while(remaining.size > 0) {
        if(next == 5) {
            next = remaining.values().next().value;
        } else if(next == cube.edges[next][0]) {
            if(cube.edges[next][1] != 0)
                flip += eFaces[cube.edges[next][0]][1];
            remaining.delete(next);
            next = remaining.values().next().value;
        } else {
            if(cube.edges[next][0] !== 5) {
                lastOri = (cube.edges[next][1] + lastOri) % 2;
                solution += eFaces[cube.edges[next][0]][lastOri];
            }
            remaining.delete(next);
            next = cube.edges[next][0];
        }
    }
    return memoFormat(solution) + flip;
}

function memoFormat(solution) {
    var formatted = "";
    for(let i=0; i<solution.length; i++) {
        formatted += solution.charAt(i);
        if(i%2 == 1)
            formatted += " ";
    }
    return formatted;
}

const scramble = "U' B2 R' F L2 D B' R2 F' D2 B R2 D2 L2 D2 F D2 F2 R' F2"
console.log(blindSolver(scramble));