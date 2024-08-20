
let cells = document.querySelectorAll(".cell");
let turn = "X";
let gameOver = false;

cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.addEventListener("click", () => {
        if (!gameOver && cell.innerHTML === "") {
            cell.innerHTML = turn;
            cell.classList.add(turn.toLowerCase());
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function checkDraw() {
    if (!gameOver) {
        let draw = true;
        cells.forEach((cell) => {
            if (cell.innerHTML === "") draw = false;
        });
        if (draw) {
            gameOver = true;
            document.querySelector("#message").innerHTML = "It's a Tie!";
            document.querySelector("#resetButton").style.display = "inline";
        }
    }
}

function checkWin() {
    let winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6],
        [0, 3, 6], [1, 4, 7], [2, 5, 8]
    ];
    for (let i = 0; i < winCombinations.length; i++) {
        let [a, b, c] = winCombinations[i];
        if (cells[a].innerHTML !== "" && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
            gameOver = true;
            document.querySelector("#message").innerHTML = turn + " Won!";
            document.querySelector("#resetButton").style.display = "inline";
            for (let j of [a, b, c]) {
                cells[j].style.backgroundColor = "#08D9D6";
                cells[j].style.color = "#000";
            }
            break;
        }
    }
}

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
}

document.querySelector("#resetButton").addEventListener("click", () => {
    gameOver = false;
    turn = "X";
    document.querySelector("#message").innerHTML = "";
    document.querySelector("#resetButton").style.display = "none";
    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove("x", "o");
        cell.style.removeProperty("background-color");
        cell.style.color = "#000";
    });
});
