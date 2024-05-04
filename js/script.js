let gridSize;
let playerChoice = true;
//found by player clicking the fill or blank option
let selectedSquare;
//found by player clicking on the grid square they want to assign their choice to
//equal to ninjaGrid[x]
let selectedSquareId;
const maxLives = 3;
let livesLeft = maxLives;
let currentGrid;
//once an image is selected, reset currentGrid variable to the created gridImage
let winningKeys;
//the number of keys in the grid that are filled in
let wonKeys = 0;
let pageGrid = document.getElementById('grid');


const ninjaGrid = [];
const ninjaSquares = [
    3, 4, 5, 6, 8, 12, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 34, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 59, 60, 69, 71, 74, 75, 78, 82, 87, 93, 94, 95, 96
];
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

const stairsGrid = [];
const stairsSquares = [3, 6, 7, 9, 10, 11, 12, 13, 14, 15];
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

const rowValues = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];


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


function createGridImage(size, imageGrid, imageSquares, imageHints) {
    gridSize = size;
    createGrid(imageGrid);
    for (position of imageSquares) {
        imageGrid[position].filled = true;
    }
    winningKeys = imageSquares.length;
    for(let i = 0; i < gridSize; i++) {
        let newHint = document.createElement('div');
        let rowCol = "row" + i;
        newHint.innerHTML = imageHints[rowCol];
        let hor = document.getElementById('horizontalHints');
        hor.append(newHint);
    }
    for(let i = 0; i < gridSize; i++) {
        let newHint = document.createElement('div');
        let rowCol = "column" + i;
        newHint.innerHTML = imageHints[rowCol];
        let vert = document.getElementById('verticalHints');
        vert.append(newHint);
    }
}

// createGridImage(10, ninjaGrid, ninjaSquares, ninjaHints);


createGridImage(4, stairsGrid, stairsSquares, stairsHints);
//create grid when start button
// currentGrid = ninjaGrid;
currentGrid = stairsGrid;
//set when start button


const fillButton = document.getElementById('fill');
const blankButton = document.getElementById('blank');
const docSquare = document.querySelectorAll('.square');
const startGameButton = document.getElementById('startGame');
const difficulty = document.getElementById('difficulty');

// difficulty.addEventListener("click", function() {
//     level = difficulty.value;
// })

// startGameButton.addEventListener("click", function() {
//     level = difficulty.value;
//     if(level === "Easy") {
//         createGridImage(4, stairsGrid, stairsSquares);
//     } else if(level === "Medium") {
//         createGridImage(10, ninjaGrid, ninjaSquares);
//     }
//     startGameButton.remove();
//     difficulty.remove();
// })

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

docSquare.forEach(function (e) {
    let selection = e.getAttribute("id", [0]);
    e.addEventListener("click", function (e) {
        selectedSquare = currentGrid[selection];
        selectedSquareId = selection;
        fillSquare();
    });
})


function fillSquare() {
    if (playerChoice === selectedSquare.filled) {
        console.log("the square matches!");
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
        livesLeft -= 1;
        if (livesLeft === 2) {
            document.getElementById('lifeThree').style.visibility = 'hidden';
        } else if (livesLeft === 1) {
            document.getElementById('lifeTwo').style.visibility = 'hidden';
        } else if (livesLeft === 0) {
            document.getElementById('lifeOne').style.visibility = 'hidden';
        }
        console.log("the square does not match, lose one life");
        document.getElementById(selectedSquareId).style.backgroundColor = 'rgb(254, 156, 156)';
        //change the grid square to red
    }
    winOrLose();
}


function winOrLose() {
    if (livesLeft < 1) {
        alert("you lost!");
    } else if (wonKeys === winningKeys) {
        for(key of currentGrid) {
            if(key.filled === false) {
                let selectedSquareId = key.space;
                document.getElementById(selectedSquareId).style.backgroundColor = 'transparent';
            }
        }
        console.log("you win!");
    } 
}

function resetGame() {
    document.getElementById('lifeOne').style.visibility = 'visible';
    document.getElementById('lifeTwo').style.visibility = 'visible';
    document.getElementById('lifeThree').style.visibility = 'visible';
}

//SANDBOX
//select difficulty - will create different boards
//"start game" button
//html add for winning game
//html add for losing game
//reset game function