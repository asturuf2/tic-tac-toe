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
        game.handleClick();
    }

    const restart = () =>{
        board.forEach((index) =>{
            boardGrid.innerHTML = "";
        })
    }

    return {
        createBoard,
        restart,
        getGameBoard,
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

    const handleClick = () =>{
        const gridSquare = document.querySelectorAll(".grid-square")
        gridSquare.forEach((e,index) =>{
            e.addEventListener("click", () =>{
                if (playerTurn == 0){
                    e.innerText = players[0].mark
                    playerTurn = 1
                } else {
                    e.innerText = players[1].mark
                    playerTurn = 0;
                }
            })
        })
    }

    const checkWinner = () =>{

    }


    return {
        start,
        handleClick,
        checkWinner,
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


