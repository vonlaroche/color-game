let NUM_SQUARES = 3;
let gameSection = document.querySelector(".game");
let colorPar = document.querySelector(".colorParagraph");
let newGameBtn = document.querySelector(".newGame");
let head = document.querySelector(".head");


let randomRGB = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    // var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
    let rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
}

let init = () => {
    let color = randomRGB();
    colorPar.textContent = color;
    let squares = createSquares();
    chooseCorrectSquare(squares, color);
    let removeListeners = setColorGuessListeners(squares, color);

    newGameBtn.addEventListener("click", () => {
        color = randomRGB();
        colorPar.textContent = color;
        head.style.backgroundColor = "rgb(10, 189, 202)";
        chooseCorrectSquare(squares, color);
        removeListeners();
        removeListeners = setColorGuessListeners(squares, color);
    });
}


let createSquares = () => {
    let squaresArray = [];
    for (let i = 0; i < NUM_SQUARES; i++) {
        let x = document.createElement("div");
        x.classList.add("square");
        gameSection.appendChild(x);
        squaresArray.push(x);
    }
    return squaresArray;
}

let chooseCorrectSquare = (squares, color) => {
    squares.forEach(square => {
        square.style.backgroundColor = randomRGB();
    });
    let correctSquareIndex = Math.floor(Math.random() * squares.length);
    squares[correctSquareIndex].style.backgroundColor = color;
}

let changeColor = (squares, color) => {
    squares.forEach(square => {
        square.style.backgroundColor = color;
    });
    head.style.backgroundColor = color;
}

let setColorGuessListeners = (squares, color) => {
    let onClickArr = [];

    squares.forEach(square => {
        let onClick = () => {
            if (square.style.backgroundColor === color) {
                alert("You guessed!");
                changeColor(squares, color);
            }
            else{
                alert("Try again");
            }
        };

        square.addEventListener("click", onClick);
        onClickArr.push(onClick);
    });

    let removeListeners = () => {
        squares.forEach((square, index) => {
            square.removeEventListener("click", onClickArr[index]);
        });
    }

    return removeListeners;
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});
