let cell = document.querySelectorAll(".cells")
let statusDisplay = document.querySelector(".status")
let player1Score = document.querySelector("#score1")
let computerScore = document.querySelector("#score2")
let tieScore = document.querySelector("#scoretie")
let resetbtn = document.querySelector("#restart")
let newgamebtn = document.querySelector("#new")
let turn0 = true
let playerscore1 = 0
let computerscore = 0
let tieScorevalue = 0
let gameActive = true
let combinationWinning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
newgamebtn.addEventListener("click", () => {
    turn0 = true;
    enablebox();
    gameActive = true;
    statusDisplay.classList.add("hide");
})
resetbtn.addEventListener("click", () => {
    turn0 = true
    gameActive = true
    enablebox();
    playerscore1 = 0
    computerscore = 0
    tieScorevalue = 0
    player1Score.textContent = playerscore1;
    computerScore.textContent = computerscore;
    tieScore.textContent = tieScorevalue;
    statusDisplay.classList.add("hide");
})
function checkDraw() {
    return Array.from(cell).every(cell => cell.innerText !== "") && !checkwinner();
}
const disablebox = () => {
    for (let cel of cell) {
        cel.classList.add("disabled");
    }
}
const enablebox = () => {
    for (let en of cell) {
        en.classList.remove("disabled");
        en.innerText = "";
    }
}
const showMessage = (message) => {
    statusDisplay.innerHTML = "";
    let val = document.createElement("p");
    val.textContent = message;
    statusDisplay.appendChild(val);
    statusDisplay.classList.remove("hide");
};
let player1 = true;
cell.forEach((cells) => {
    cells.addEventListener("click", () => {
        if (!gameActive || cells.innerText !== "") return;
        cells.innerText = "X";
        cells.classList.add("disabled");
        if (checkwinner()) {
            return; 
        }
        if (checkDraw()) {
            tieScorevalue++;
            tieScore.textContent = tieScorevalue;
            showMessage("It's a draw!");
            gameActive = false;
        } else {
            setTimeout(computerChance, 500);
        }
    });
});
function computerChance() {
    if (!gameActive)return ;
    let availableCells = Array.from(cell).filter(cell => cell.innerText === "");
    if (availableCells === 0) {
        return;
    }
    let randomCells = availableCells[Math.floor(Math.random() * availableCells.length)]
    randomCells.innerText = "O";
    randomCells.classList.add("disabled");
    if (checkwinner()){
        return ;
    }
}
const showWinner = (winner) => {
    let message;
    if (winner === "X") {
        playerscore1++;
        player1Score.textContent = playerscore1;
        message = "Player 1 is the winner";
    } else if (winner === "O") {
        computerscore++;
        computerScore.textContent = computerscore;
        message = "Computer is the winner";
    }
    showMessage(message);
    disablebox();
    gameActive = false;
};
const checkwinner = () => {
    for (let winning of combinationWinning) {
        let pos1Val = cell[winning[0]].innerText;
        let pos2Val = cell[winning[1]].innerText;
        let pos3Val = cell[winning[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
}
newgamebtn.addEventListener("click",()=>{
    newgamebtn.classList.add("active");
    setTimeout(()=>{
        newgamebtn.classList.remove("active")},1000);
    
});
resetbtn.addEventListener("click",()=>{
    resetbtn.classList.add("active");
    setTimeout(()=>{
        resetbtn.classList.remove("active")},1000);   
});
