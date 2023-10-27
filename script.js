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
        location.reload()
    }

    const handleClick = () => {
        const squares = document.querySelectorAll(".grid-square")
        squares.forEach((e,index) =>{
            e.addEventListener("click", () => {
                if (e.innerText == ""){
                    square = e.id;
                    game.playerMove(square);
                }
                board[index] = e.innerText 
                game.checkWinner()
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

    const checkWinner = () => {
        board = gameBoard.getGameBoard();
        checkerX = []
        checkerO = []
        const winner = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [6,4,2]
        ]
        board.forEach((e,index) =>{
            if(board[index] == "X"){
                checkerX.push(index)
            }
            if(board[index] == "O"){
                checkerO.push(index)
            }
        })
        console.log(checkerX,checkerO)
        //create array of mark instances for X and O like above
        //compare to each item in winner array
        //if checkerO or checker X .include all 3 num in a particular winner[i] then return winner
    }

    return {
        start,
        playerMove,
        checkWinner
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


