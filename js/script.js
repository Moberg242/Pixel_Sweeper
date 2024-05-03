let gridSize;
let playerChoice;
//found by player clicking the fill or blank option
let selectedSquare;
//found by player clicking on the grid square they want to assign their choice to
//equal to ninjaGrid[x]
const maxLives = 3;
let livesLeft = maxLives;
let currentGrid;
//once an image is selected, reset currentGrid variable to the created gridImage
let winningKeys;
//the number of keys in the grid that are filled in
let wonKeys = 0;


const ninjaGrid = [];
const ninjaSquares = [
    3, 4, 5, 6, 8, 12, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 34, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 59, 60, 69, 71, 74, 75, 78, 82, 87, 93, 94, 95, 96
];
const ninjaHints = {
    rowOne: [4],
    rowTwo: [3, 1],
    rowThree: [4, 1, 1],
    rowFour: [1, 1, 1, 1, 1],
    rowFive: [1, 3, 1, 1],
    rowSix: [1, 3, 1, 1],
    rowSeven: [1, 1, 1, 1, 1],
    rowEight: [4, 1, 1],
    rowNine: [1, 3, 1],
    rowTen: [1, 4],
    columnOne: [4, 1],
    columnTwo: [1, 1, 1],
    columnThree: [8],
    columnFour: [3, 2, 3],
    columnFive: [10],
    columnSix: [1, 1],
    columnSeven: [1, 1, 1, 1],
    columnEight: [1, 4, 1],
    columnNine: [1, 1],
    columnTen: [4]
};

const stairsGrid = [];
const stairsSquares = [3, 6, 7, 9, 10, 11, 12, 13, 14, 15];
const stairsHints = {
    columnOne: [1],
    columnTwo: [2],
    columnThree: [3],
    columnFour: [4],
    rowOne: [1],
    rowTwo: [2],
    rowThree: [3],
    rowFour: [4]
};

const rowValues = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];


function createGridRow(rowIndex, gridArray) {
    for (let i = 0; i < gridSize; i++) {
        let object = {
            space: rowValues[rowIndex] + (i + 1),
            filled: false,
            isFilled: false
        }
        gridArray.push(object);
    }
}

function createGrid(gridArray) {
    for (let i = 0; i < gridSize; i++) {
        let row = i;
        createGridRow(row, gridArray);
    }
}

function createGridImage(size, imageGrid, imageSquares) {
    gridSize = size;
    createGrid(imageGrid);
    for (position of imageSquares) {
        imageGrid[position].filled = true;
    }
    winningKeys = imageSquares.length;
}

createGridImage(10, ninjaGrid, ninjaSquares);
createGridImage(4, stairsGrid, stairsSquares);


function fillSquare() {
    selectedSquare.isFilled = true;
    wonKeys +=1;
    if (playerChoice === selectedSquare.filled) {
        console.log("the square matches!");
        //change the grid square to black
    } else {
        livesLeft -= 1;
        console.log("the square does not match, lose one life");
        //change the grid square to red
    }
    winOrLose();
}

function winOrLose() {
    if (livesLeft < 1) {
        console.log("you lost!");
    } else if(wonKeys === winningKeys) {
        console.log("you win!");
    }
}

// currentGrid = stairsGrid;
// playerChoice = true;
// selectedSquare = stairsGrid[3];
// fillSquare();
// console.log(stairsGrid[0]);
// console.log(livesLeft);
//returns: the square doesn't match; isfilled = true; livesleft = 2


