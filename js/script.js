let gridSize;
let selectedSquare;
let selectedSquareId;
const maxLives = 3;
let livesLeft = 0;
let currentGrid = '';
const gridNames = ["Demo", "Stairs", "Pidgeon", "Ninja"]
let gridName = '';
let index = '';
let winningKeys;
let wonKeys = 0;
let playerChoice = true;


let docSquare;
let pageGrid = document.getElementById('grid');
const fillButton = document.getElementById('fill');
const blankButton = document.getElementById('blank');
const win = document.getElementById('win');
const nextLevelButton = document.getElementById('nextLevel');
let hor = document.getElementById('horizontalHints');
let vert = document.getElementById('verticalHints');
const winText = document.getElementById('text');
const lives = document.getElementById('lives');



const demoGrid = [];
const demoSquares = [0, 2, 4, 6, 7, 8];
// const demoSquares = [0];
const demoHints = {
    column0: "1 1",
    column1: "2",
    column2: "1 1",
    row0: "1 1",
    row1: "1",
    row2: "3"
};

const stairsGrid = [];
const stairsSquares = [3, 6, 7, 9, 10, 11, 12, 13, 14, 15];
// const stairsSquares = [0];
const stairsHints = {
    column0: "1",
    column1: "2",
    column2: "3",
    column3: "4",
    row0: "1",
    row1: "2",
    row2: "3",
    row3: "4"
};

const pidgeonGrid = [];
const pidgeonSquares = [1, 2, 3, 7, 8, 10, 15, 16, 17, 19, 20, 23, 24, 25, 26, 27, 30, 31, 32, 33, 39, 45, 46];
// const pidgeonSquares = [0];
const pidgeonHints = {
    column0: "1",
    column1: "3",
    column2: "1 3",
    column3: "5 1",
    column4: "4",
    column5: "3",
    column6: "2",
    row0: "3",
    row1: "2 1",
    row2: "3 2",
    row3: "5",
    row4: "4",
    row5: "1",
    row6: "2"
};

const ninjaGrid = [];
const ninjaSquares = [
    3, 4, 5, 6, 8, 12, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 34, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 59, 60, 69, 71, 74, 75, 78, 82, 87, 93, 94, 95, 96
];
// const ninjaSquares = [0];
const ninjaHints = {
    column0: "4",
    column1: "3 1",
    column2: "4 1 1",
    column3: "1 1 1 1",
    column4: "1 3 1 1",
    column5: "1 3 1 1",
    column6: "1 1 1 1",
    column7: "4 1",
    column8: "1 3 1",
    column9: "1 4",
    row0: "4 1",
    row1: "1 1 1",
    row2: "8",
    row3: "3 2 3",
    row4: "10",
    row5: "1 1",
    row6: "1 1",
    row7: "1 2 1",
    row8: "1 1",
    row9: "4"
};

function createGrid(gridArray) {
    for (let i = 0; i < (gridSize * gridSize); i++) {
        let object = {
            space: i,
            filled: false,
            isFilled: false
        }
        gridArray.push(object);
        let id = object.space;
        let newSquare = document.createElement('button');
        newSquare.setAttribute("id", id);
        newSquare.setAttribute("class", "square");
        pageGrid.append(newSquare);
        document.getElementById(id).style.width = (99 / gridSize) + "%";
        document.getElementById(id).style.height = (99 / gridSize) + "%";
    }
}

function createGridImage(size, imageSquares, imageHints) {
    gridSize = size;
    createGrid(currentGrid);
    for (position of imageSquares) {
        currentGrid[position].filled = true;
    }
    winningKeys = imageSquares.length;
    for (let i = 0; i < gridSize; i++) {
        let newHint = document.createElement('div');
        let rowCol = "row" + i;
        newHint.innerHTML = imageHints[rowCol];
        hor.append(newHint);
        hor.style.visibility = 'visible';
    }
    for (let i = 0; i < gridSize; i++) {
        let newHint = document.createElement('div');
        let rowCol = "column" + i;
        newHint.innerHTML = imageHints[rowCol];
        vert.append(newHint);
        vert.style.visibility = 'visible';
    }
}

function nextLevel() {
    resetGame();
    if (gridName === '') {
        currentGrid = demoGrid;
        index = 0;
        createGridImage(3, demoSquares, demoHints);
    }
    else if (gridName === gridNames[0]) {
        currentGrid = stairsGrid;
        index = 1;
        createGridImage(4, stairsSquares, stairsHints);
    } else if (gridName === gridNames[1]) {
        currentGrid = pidgeonGrid;
        index = 2;
        createGridImage(7, pidgeonSquares, pidgeonHints);
    } else if (gridName === gridNames[2]) {
        currentGrid = ninjaGrid;
        index = 3;
        createGridImage(10, ninjaSquares, ninjaHints);
    }
    gridName = gridNames[index];
    docSquare = document.querySelectorAll('.square');
    docSquare.forEach(function (e) {
        let selection = e.getAttribute("id", [0]);
        e.addEventListener("click", () => {
            selectedSquare = currentGrid[selection];
            selectedSquareId = selection;
            fillSquare();
        });
    })
}

function fillSquare() {
    if (playerChoice === selectedSquare.filled) {
        if (playerChoice === true) {
            if (selectedSquare.isFilled === false) {
                wonKeys += 1;
            }
            selectedSquare.isFilled = true;
            document.getElementById(selectedSquareId).style.backgroundColor = 'rgb(58, 58, 58)';
        } else if (playerChoice === false) {
            document.getElementById(selectedSquareId).style.backgroundColor = 'transparent';
        }
    } else {
        document.getElementById(selectedSquareId).style.backgroundColor = 'rgb(254, 156, 156)';
        livesLeft -= 1;
        lives.lastChild.remove();
    }
    winOrLose();
}

function winOrLose() {
    if (livesLeft < 1) {
        if (gridName === "Demo") {
            gridName = "";
        } else {
            gridName = (gridNames[index - 1]);
        }
        winText.innerHTML = `You Lost!`;
        nextLevelButton.innerHTML = "Try Again";
        win.style.visibility = 'visible';
        resetGame();
    } else if (wonKeys === winningKeys) {
        for (key of currentGrid) {
            if (key.filled === false) {
                let selectedSquareId = key.space;
                document.getElementById(selectedSquareId).style.backgroundColor = 'transparent';
                document.getElementById(selectedSquareId).style.border = 'none';
                hor.innerHTML = '';
                vert.innerHTML = '';
            }
        }
        win.style.visibility = 'visible';
        winText.innerHTML = `You completed the ${gridName} level!`;
        if (currentGrid === ninjaGrid) {
            win.innerHTML = `You completed the ${gridName} level! Congratulations you beat all the levels!`;
        }
    }
}

function resetGame() {
    if (livesLeft < maxLives) {
        for (i = 0; i < (maxLives - livesLeft); i++) {
            let newLife = document.createElement('div');
            newLife.innerHTML = "&hearts;";
            lives.append(newLife);
        }
        livesLeft = maxLives;
    }
    wonKeys = 0;
    pageGrid.innerHTML = '';
    hor.innerHTML = '';
    vert.innerHTML = '';
    console.log('reset');
}

nextLevelButton.addEventListener("click", function () {
    nextLevelButton.innerHTML = "Next Level";
    win.style.visibility = 'hidden';
    nextLevel();
})

fillButton.addEventListener("click", function () {
    playerChoice = true;
    fillButton.style.border = "3px solid green";
    blankButton.style.border = '1px solid gray';
})

blankButton.addEventListener("click", function () {
    playerChoice = false;
    blankButton.style.border = '3px solid green';
    fillButton.style.border = '1px solid gray';
})


//SANDBOX
//select difficulty - will create different boards
//"start game" button
//html add for winning game
//html add for losing game
//reset game function