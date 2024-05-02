let gridSize;
//create the grid 
//start with 10x10

const ninjaGrid = [
];

const rowValues = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];


function createGridRow(rowIndex, picture) {
    for(let i = 0; i < gridSize; i++) {
        let object = {
            space: rowValues[rowIndex] + (i + 1),
            filled: false
        }
        picture.push(object);
    }
}

function createGrid(picture) {
    for(let i = 0; i < gridSize; i++) {
        let row = i;
        createGridRow(row, picture);
    }
}

function createNinjaGridImage() {
    gridSize = 10;
    createGrid(ninjaGrid);
    const fillSquares = [3, 4, 5, 6, 8, 12, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 34, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 59, 60, 69, 71, 74, 75, 78, 82, 87, 93, 94, 95, 96]
    //each number corresponds to the index of the square to be filled
    for(position of fillSquares) {
        ninjaGrid[position].filled = true;
    }
}

createNinjaGridImage();

//SAVE
