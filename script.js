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
                    board[index] = e.innerText 
                }
                computerMove()
                game.checkWinner()
            })
        })
    }

    const computerMove = () =>{
        for (i = 0; i < 9; i++){
            randomNum = Math.floor((Math.random() * 9))
            if (board[randomNum] == ""){
                const checkSquare = document.getElementById(`${randomNum}`)
                checkSquare.innerText = "O";
                board[randomNum] = "O"
                break;
            }
        }  
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
    const winnerModal = document.querySelector(".modal")
    const winnerModalText = document.querySelector(".winner-modal")
    const closeModal = document.querySelector(".close-modal")

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
        square.innerText = players[0].mark

    }

    const computerMove = () =>{
        board = gameBoard.getGameBoard();
        for (i = 0; i < 9; i++){
            if (board[i] == ""){
                const checkSquare = document.getElementById(`${i}`)
                checkSquare.innerText = "O";
                board[i] = "O"
                break;
            }
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
            let num = 0;
            //check for tie
            board.forEach((e,index) =>{
                if(board[index] != ""){
                    num++;
                }
                if (num == 9){
                    winnerModalText.innerText = "It's a Tie!"
                        winnerModal.showModal();
                }
            })
            if(board[index] == "X"){
                checkerX.push(index)
                winner.forEach((e) =>{
                   if (checkerX.includes(e[0]) && checkerX.includes(e[1]) && checkerX.includes(e[2])){
                        winnerModalText.innerText = "X Wins!"
                        winnerModal.showModal();
                   }
                })
            }
            if(board[index] == "O"){
                checkerO.push(index)
                winner.forEach((e) =>{
                    if (checkerO.includes(e[0]) && checkerO.includes(e[1]) && checkerO.includes(e[2])){
                        winnerModalText.innerText = "O Wins!"
                        winnerModal.showModal();
                    }
                 })
            }
        })
    }

    closeModal.addEventListener("click", () => {
        location.reload();
    })

    return {
        start,
        playerMove,
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




