let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rstBtn");
let newBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = false;
let gameOver=false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "X";
            turnO = false;
        } else {
            box.innerText = "O";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val, pos2Val, pos3Val;

        if (boxes[pattern[0]] && boxes[pattern[1]] && boxes[pattern[2]]) {
            pos1Val = boxes[pattern[0]].innerText;
            pos2Val = boxes[pattern[1]].innerText;
            pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    console.log("Winner", pos1Val);
                    showMessage(`Congratulations, Winner is ${pos1Val}`);
                    gameOver = true;
                    return;
                    animateWinLine(pattern);
                    return;
                }
            }
        }
    }

   
    let isTie = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            isTie = false;
            break;
        }
    }

    if (isTie) {
        console.log("Tie");
        showTie();
    }
};

const showMessage = (message) => {
    msg.innerText = message;
    msgContainer.classList.remove("hide");
};

const showTie = () => {
    msg.innerText = "It's a tie!";
    msgContainer.classList.remove("hide");
};

resetBtn.addEventListener("click", () => {
    
    turnO = false;
    gameOver = false;
    msgContainer.classList.add("hide");
    msg.innerText = "";

    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
});

newBtn.addEventListener("click", () => {
   
    resetBtn.click();
});

