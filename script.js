const gameBoard = (() => {
    const board = ["","","","","","","","",""]

    const getGameBoard = () => board;
    
    const boardGrid = document.querySelector(".grid-container")


    const createBoard = () =>{
        let boardText = "";
        board.forEach((square, index) => {
        boardText += `<div class = "grid-square" id = "${index}">${square}</div>`
        })
        boardGrid.innerHTML = boardText;
        handleClick();
    }

    const restart = () =>{
        board.forEach((index) =>{
            boardGrid.innerHTML = "";
        })
    }

    const handleClick = () => {
        const squares = document.querySelectorAll(".grid-square")
        squares.forEach((e) =>{
            e.addEventListener("click", () => {
                if (e.innerText == ""){
                    square = e.id;
                    game.playerMove(square);
                }
            })
        })
    }

    return {
        createBoard,
        restart,
        getGameBoard,
        handleClick,
    }
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const game = (() =>{

    let players = [];
    let playerTurn = 0;
 

    const start = () =>{
        players = [
        createPlayer("player 1", "X"),
        createPlayer("player 2", "O")
        ]
        playerTurn = 0;
        gameBoard.createBoard();
    }

    const playerMove = (squareID) =>{
        const square = document.getElementById(`${squareID}`)
        if (playerTurn == 0){
            square.innerText = players[0].mark
            playerTurn = 1
        } else {
            square.innerText = players[1].mark
            playerTurn = 0;
         }
    }

    return {
        start,
        playerMove,
        
    }
})();


const startButton = document.querySelector(".start-game")
startButton.addEventListener("click", () => {
    game.start();
})

const restartButton = document.querySelector(".restart-game")
restartButton.addEventListener("click", () => {
    gameBoard.restart();
})


