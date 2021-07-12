function resizeGrid() {
    let inputNumber = Number(prompt("Enter number of squares per " + 
                                          "dimension (min: 1 - max: 100):"));
    
    switch (true) {
        case !(Number.isInteger(inputNumber)):
            return alert("Input value must be an integer");
        case (inputNumber < 1 || inputNumber > 100):
            return alert("Input value must be between 1 and 100");
        default:
            grid.innerHTML = "";
            let newSquareGridSize = inputNumber ** 2;
            insertSquareGridElements(grid, newSquareGridSize);
            resetGridEventListeners();
    }
}

function clearGrid() {
    const gridElements = Array.from(grid.children);
    gridElements.forEach(gridElement => {
        gridElement.style.backgroundColor = "white";
    });

    resetGridEventListeners();
}

function resetGridEventListeners() {
    const gridElements = document.querySelectorAll(".grid-element");
    gridElements.forEach(gridElement => {
        gridElement.removeEventListener("mouseenter", paintElement);
        gridElement.addEventListener("mouseenter", paintElement, {once: true});
    });
}



function getRandomRgbString() {
    function getRandomRgb() {
        return Math.floor(Math.random() * 256);
    }

    return `rgb(${getRandomRgb()}, ${getRandomRgb()}, ${getRandomRgb()})`;
}

function paintElement() {
    this.style.backgroundColor = (this.parentNode.dataset.color === "random") ? 
                                getRandomRgbString() : this.parentNode.dataset.color;
}

function changeColor() {
    grid.dataset.color = (this.id === "random-color") ? "random" : this.value;
    resetGridEventListeners();
}

function insertSquareGridElements(grid, squareGridSize) {
    grid.style.gridTemplate = `repeat(${squareGridSize**(1/2)}, 1fr) /
                               repeat(${squareGridSize**(1/2)}, 1fr)`;

    for (let i = 0; i < squareGridSize; i++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add("grid-element");
        gridElement.style.borderBottom = "solid 0.1px rgba(0, 0, 0, 0.9)";
        gridElement.style.borderRight = "solid 0.1px rgba(0, 0, 0, 0.9)";
        grid.appendChild(gridElement);
        
        gridElement.addEventListener("mouseenter", paintElement);
    }
}

let squareGridSize = 16**2;
const grid = document.querySelector("#grid-container");
grid.dataset.color = "black";

const colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("input", changeColor);

const randomColorButton = document.querySelector("#random-color");
randomColorButton.addEventListener("click", changeColor)

const clearGridButton = document.querySelector("#clear-grid");
clearGridButton.addEventListener("click", clearGrid);

const resizeGridButton = document.querySelector("#resize-grid");
resizeGridButton.addEventListener("click", resizeGrid);

insertSquareGridElements(grid, squareGridSize);
