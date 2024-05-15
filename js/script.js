let gridSize;
let selectedSquare;
let selectedSquareId;
let previousLevel;
let maxLives = 3;
let livesLeft = 0;
let currentGrid = '';
const gridNames = ["Demo", "Heart", "Jiji the Cat", "Soot Sprite", "No Face", "Totoro", "Bonus Soot Sprite"]
let gridName = '';
let index = -1;
let winningKeys;
let wonKeys = 0;
let demoStep = 0;
let playerChoice = true;
let spaceClicked = false;


let docSquare;
let pageGrid = document.getElementById('grid');
const win = document.getElementById('win');
let hor = document.getElementById('horizontalHints');
let vert = document.getElementById('verticalHints');
const winText = document.getElementById('text');
const lives = document.getElementById('lives');
const backgrounds = document.querySelectorAll('.backgrounds');


const fillButton = document.getElementById('fill');
const blankButton = document.getElementById('blank');
const nextLevelButton = document.getElementById('nextLevel');
const skipDemoButton = document.getElementById('demoButton');
const nextDemoButton = document.getElementById('tutorial');


let tutorial = [
    {
        text: 'Each number represents the number of sequential squares in that row or column that need to be filled in - or blocks. A space between the numbers indicates at least one square between blocks that must be left blank.'
    },
    {
        text: 'The easiest way to start is to find blocks that occupy the whole line. Lets start with rows.',
    },
    {
        text: 'The top row has a total of two squares to be filled in, with at least one space between them. Since there are only three spaces, you can determine the first square will be filled, the second square will be blank, and the third square will be filled.',
        arrowtop: '38%',
        arrowleft: '22%'
    },
    {
        text: 'Select your "fill" tool and color in the first and third squares.',
        arrowtop: '85%',
        arrowleft: '10%'
    },
    {
        text: 'You can use your "blank" tool to fill in the middle square so you dont lose track.',
        arrowtop: '85%',
        arrowleft: '20%'
    },
    {
        text: 'Notice the bottom row has a block of three squares to be filled in. Select your "fill" tool and fill in each square on the bottom row. (You can hold down the space key to hover over multiple squares to fill them!).',
        arrowtop: '72%',
        arrowleft: '22%'
    },
    {
        text: 'Lets move on to columns. The first and third columns already meet the requirements with one square filled, one square blank, and one square empty.',
        arrowtop: '25%',
        arrowleft: '32%'
    },

    {
        text: 'Notice the second column requires two squares to be filled. We already filled in one square! Choose your "fill" tool and color in the middle square to complete the block.',
        arrowtop: '25%',
        arrowleft: '48%'
    },
]

let demoGrid = [];
const demoSquares = [0, 2, 4, 6, 7, 8];
const demoHints = {
    column0: "1 1",
    column1: "2",
    column2: "1 1",
    row0: "1 1",
    row1: "1",
    row2: "3"
};

let heartGrid = [];
const heartSquares = [6, 8, 10, 12, 14, 16, 18, 22];
const heartHints = {
    column0: "1",
    column1: "1 1",
    column2: "1 1",
    column3: "1 1",
    column4: "1",
    row0: "0",
    row1: "1 1",
    row2: "1 1 1",
    row3: "1 1",
    row4: "1"
};

let jijiGrid = [];
const jijiSquares = [1, 4, 8, 9, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 26, 27, 28, 29, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47];
const jijiHints = {
    column0: "4",
    column1: "7",
    column2: "2 2",
    column3: "5",
    column4: "3 2",
    column5: "6",
    column6: "4",
    row0: "1 1",
    row1: "2 2",
    row2: "7",
    row3: "2 1 2",
    row4: "2 1 2",
    row5: "7",
    row6: "5"
};

let sootSpriteGrid = [];
const sootSpriteSquares = [
    2, 5, 7, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 28, 29, 31, 33, 34, 35, 36, 37, 38, 40, 42, 43, 44, 46, 47, 48, 49, 50, 51, 52, 54, 55, 56, 57, 58, 59, 60, 61, 62, 65, 66, 67, 68, 69, 70, 71, 73, 76, 79
];
const sootSpriteHints = {
    column0: "1 1 1",
    column1: "5 1",
    column2: "8",
    column3: "2 3",
    column4: "8",
    column5: "3 3",
    column6: "7",
    column7: "9",
    column8: "1 2 2",
    row0: "1 1 1",
    row1: "7",
    row2: "8",
    row3: "2 1 3",
    row4: "3 1 3",
    row5: "7",
    row6: "9",
    row7: "7",
    row8: "1 1 1",
};

let nofaceGrid = [];
const nofaceSquares = [
    4, 5, 6, 7, 8, 14, 15, 21, 22, 25, 26, 34, 35, 37, 47, 49, 51, 52, 56, 57, 59, 61, 71, 73, 75, 76, 80, 81, 83, 85, 87, 93, 95, 97, 107, 109, 110, 113, 114, 115, 118, 119, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143
];
const nofaceHints = {
    column0: "1",
    column1: "10",
    column2: "2 3",
    column3: "1 1 2 1",
    column4: "1 1 1 1",
    column5: "1 1 1",
    column6: "1 1 1",
    column7: "1 1 1",
    column8: "1 1 1 1",
    column9: "1 1 2 1",
    column10: "2 3",
    column11: "10",
    row0: "5",
    row1: "2 2",
    row2: "2 2",
    row3: "1 1",
    row4: "1 2 2 1",
    row5: "1 1",
    row6: "1 2 2 1",
    row7: "1 1 1 1",
    row8: "1 1",
    row9: "2 3 2",
    row10: "2 2",
    row11: "12",
};

let totoroGrid = [];
const totoroSquares = [
    4, 9, 15, 16, 20, 21, 26, 28, 31, 33, 37, 40, 41, 42, 43, 45, 49, 58, 60, 64, 67, 70, 72, 75, 76, 78, 79, 82, 84, 87, 88, 90, 91, 94, 96, 105, 106, 108, 116, 117, 118, 119, 121, 127, 128, 131, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143
];
const totoroHints = {
    column0: "5",
    column1: "2 1",
    column2: "1 1",
    column3: "1 2 1",
    column4: "4 3 1",
    column5: "1 1",
    column6: "1 2 1",
    column7: "2 3 2",
    column8: "1 3",
    column9: "4 2 1",
    column10: "6 1",
    column11: "3",
    row0: "1 1",
    row1: "2 2",
    row2: "1 1 1 1",
    row3: "1 4 1",
    row4: "1 1",
    row5: "1 1 1 1",
    row6: "1 2 2 1",
    row7: "1 2 2 1",
    row8: "1 2",
    row9: "1 4",
    row10: "1 2 1",
    row11: "10",
};

let ghibliGrid = [];
const ghibliSquares = [
    6, 8, 17, 20, 21, 22, 23, 24, 27, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 76, 77, 78, 81, 82, 83, 86, 87, 88, 90, 91, 92, 95, 97, 99, 102, 103, 104, 106, 107, 110, 112, 114, 117, 118, 121, 122, 123, 126, 127, 128, 131, 132, 133, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 180, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 198, 200, 201, 202, 203, 204, 207, 215, 218, 219
];
const ghibliHints = {
    column0: "1 1 1 1",
    column1: "9",
    column2: "12",
    column3: "4 6",
    column4: "3 4",
    column5: "4 2 6",
    column6: "6 6",
    column7: "13",
    column8: "6 7",
    column9: "4 2 6",
    column10: "3 4",
    column11: "4 5",
    column12: "13",
    column13: "9",
    column14: "1 1 1 1",
    row0: "1 1",
    row1: "1 5 1",
    row2: "11 1",
    row3: "13",
    row4: "15",
    row5: "3 3 3",
    row6: "3 1 1 1 3",
    row7: "2 1 1 1 2",
    row8: "3 3 3",
    row9: "15",
    row10: "13",
    row11: "13",
    row12: "1 11",
    row13: "1 5 1",
    row14: "1 2",
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
        document.getElementById(id).style.width = (100 / gridSize) + "%";
        document.getElementById(id).style.height = (100 / gridSize) + "%";
        document.getElementById(id).style.animation = "fadeSquare " + ((i + 1) * 30) + "ms";
    }
}

function createGridImage(size, imageSquares, imageHints) {
    gridSize = size;
    currentGrid = [];
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
    const title = document.querySelector('#title');
    title.innerHTML = `${gridNames[index + 1]} Level`;
    if (gridName === '') {
        title.innerHTML = "Tutorial";
        currentGrid = gridNames[0];
        index = 0;
        createGridImage(3, demoSquares, demoHints);
        demoMode();
    }
    else if (gridName === gridNames[0]) {
        currentGrid = gridNames[1];
        index = 1;
        createGridImage(5, heartSquares, heartHints);
    } else if (gridName === gridNames[1]) {
        currentGrid = gridNames[2];
        index = 2;
        createGridImage(7, jijiSquares, jijiHints);
    } else if (gridName === gridNames[2]) {
        currentGrid = gridNames[3];
        index = 3;
        createGridImage(9, sootSpriteSquares, sootSpriteHints);
    } else if (gridName === gridNames[3]) {
        currentGrid = gridNames[4];
        index = 4;
        createGridImage(12, nofaceSquares, nofaceHints);
    } else if (gridName === gridNames[4]) {
        currentGrid = gridNames[5];
        index = 5;
        createGridImage(12, totoroSquares, totoroHints);
    } else if (gridName === gridNames[5]) {
        currentGrid = gridNames[6];
        index = 6;
        createGridImage(15, ghibliSquares, ghibliHints);
    }
    gridName = gridNames[index];
    docSquare = document.querySelectorAll('.square');
    docSquare.forEach(function (e) {
        let selection = e.getAttribute("id", [0]);
        e.addEventListener("click", function () {
            selectedSquare = currentGrid[selection];
            selectedSquareId = selection;
            fillSquare();
        })
        e.addEventListener("mouseover", function () {
            if (spaceClicked === true) {
                selectedSquare = currentGrid[selection];
                selectedSquareId = selection;
                fillSquare();
            }
        })
    })
}

function fillSquare() {
    if (playerChoice === selectedSquare.filled) {
        document.getElementById(selectedSquareId).disabled = true;
        if (playerChoice === true) {
            if (selectedSquare.isFilled === false) {
                wonKeys += 1;
            }
            selectedSquare.isFilled = true;
            document.getElementById(selectedSquareId).style.backgroundColor = 'rgb(58, 58, 58)';
        } else if (playerChoice === false) {
            document.getElementById(selectedSquareId).innerText = "X";
            document.getElementById(selectedSquareId).style.backgroundColor = "rgb(222, 222, 222)";
        }
    } else {
        document.getElementById(selectedSquareId).style.backgroundColor = 'rgb(254, 156, 156)';
        if (gridName !== gridNames[0]) {
            livesLeft -= 1;
            lives.lastChild.remove();
        }
    }
    winOrLose();
}

function winOrLose() {
    if (livesLeft < 1) {
        if (gridName === "Demo") {
            gridName = "";
        } else {
            index--;
            gridName = (gridNames[index]);
            win.style.visibility = 'visible';
            winText.innerHTML = `You Lost!`;
            nextLevelButton.innerHTML = "Try Again";
            resetGame();
            docSquare.forEach(function (e) {
                e.disabled = true;
            });
        }
    } else if (wonKeys === winningKeys) {
        for (key of currentGrid) {
            let id = key.space;
            if (key.filled === true) {
            } else if (key.filled === false) {
                document.getElementById(id).style.backgroundColor = "transparent";
                document.getElementById(id).style.border = "none";
                document.getElementById(id).innerText = '';
            }
        }
        title.innerHTML = '';
        hor.innerHTML = '';
        vert.innerHTML = '';
        win.style.visibility = 'visible';
        winStyling();
        docSquare.forEach(function (e) {
            e.disabled = true;
        });
        if (gridName === gridNames[0]) {
            document.querySelector('aside').remove();
            document.querySelector('#arrow').remove();
        }
    }
}

function winStyling() {
    if (gridName === "Bonus Soot Sprite") {
        win.innerHTML = `You completed the ${gridName} level! Congratulations you beat all the levels!`;
        pageGrid.style.animation = "fadeOut 4s";
        nextLevelButton.remove();
        setTimeout(() => {
            pageGrid.style =
                "background-image: url('https://gifdb.com/images/high/studio-ghibli-makuro-kuroski-cheering-0d48z8rdy14awbb8.gif'); opacity: 90%; bottom: 25%;";
            for (key of currentGrid) {
                let id = key.space;
                document.getElementById(id).innerText = '';
                document.getElementById(id).style =
                    "background-color: transparent; border: none;";
            }
        }, 3800);
    } else {
        winText.innerHTML = `You completed the ${gridName} level!`;
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
    currentGrid = '';
    pageGrid.innerHTML = '';
    hor.innerHTML = '';
    vert.innerHTML = '';
}

function demoMode() {
    document.querySelector('aside').style.visibility = 'visible';
    win.style.visibility = 'hidden';
}

nextLevelButton.addEventListener("click", function () {
    nextLevelButton.innerHTML = "Next Level";
    win.style.visibility = 'hidden';
    resetGame();
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

backgrounds.forEach(function (e) {
    e.addEventListener("click", function () {
        let source = e.getAttribute("src");
        document.querySelector("body").style.backgroundImage = `url("${source}")`;
    })
})

skipDemoButton.addEventListener("click", function () {
    win.style.visibility = 'hidden';
    gridName = gridNames[0];
    resetGame();
    nextLevel();
    document.querySelector('aside').remove();
    document.querySelector('#arrow').remove();
})

nextDemoButton.addEventListener("click", function () {
    const demoText = document.querySelector('p');
    const demoArrow = document.querySelector('#arrow');
    demoText.innerHTML = tutorial[demoStep].text;
    demoArrow.style.top = tutorial[demoStep].arrowtop;
    demoArrow.style.left = tutorial[demoStep].arrowleft;
    demoStep++;
})

document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        spaceClicked = true;
    }
})

document.addEventListener("keyup", function (e) {
    if (e.code === "Space") {
        spaceClicked = false;
    }
})