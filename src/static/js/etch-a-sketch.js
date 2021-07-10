function paintElement() {
    this.style.backgroundColor = grid.dataset.color;
}

function changeColor() {
    grid.dataset.color = this.value;
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
randomColorButton.addEventListener("click", () => {
    grid.dataset.color = "random";
})

insertSquareGridElements(grid, squareGridSize);
