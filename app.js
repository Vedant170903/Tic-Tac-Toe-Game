let boxes = document.querySelectorAll(".box");
let Resetbtn = document.querySelector("#Reset-btn");
let NewGamebtn = document.querySelector("#New-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX , playerO
let count = 0;  //to track draw

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const ResetGame = () => {
    turnO = true;
    count = 0 ;
    enableboxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { //playerO
            box.innerText = "O";
            turnO = false;
        } else {   //pleyerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkwinner();

        if (count === 9 && !isWinner) {
            GameDraw();
        }
    });
});

const GameDraw = () => {
    msg.innerText = `It's Draw.`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableboxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "" ; 
    }
};
const showwinner = (winner) => {
     msg.innerText = `Congratulations, Winner is ${winner}`;
     msgcontainer.classList.remove("hide");
     disableboxes();
}
const checkwinner = () => {
    for (let pattern of winpatterns) {   
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;

            if(pos1val != "" && pos2val != "" && pos3val != ""){
             if(pos1val === pos2val && pos2val === pos3val){
            showwinner(pos1val);
            return true;
             }
            }
    }
}

NewGamebtn.addEventListener("click", ResetGame);
Resetbtn.addEventListener("click", ResetGame);

