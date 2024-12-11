function cellObj() {
  let value = 0;

  function addToken(player) {
    return (value = player);
  }

  function getValue() {
    return value;
  }

  return { addToken, getValue };
}

//Game board
function gameBoard() {
  const rows = 3;
  const col = 3;
  const board = [];

  const players = [
    { name: "player1", value: "x" },
    { name: "player2", value: "o" },
  ];
  let activePlayer = players[0];
  for (let i = 0; i < rows; i++) {
    board[i] = [];

    for (let j = 0; j < col; j++) {
      board[i].push(cellObj());
    }
  }

  function displayBoard() {
    //1. creating game board
    console.table(board);
    // return board;
  }

  function updateTurn() {
    if (activePlayer == players[0]) {
      return (activePlayer = players[1]);
    } else {
      return (activePlayer = players[0]);
    }
  }

  function getActivePlayer() {
    return activePlayer;
  }

  function makePlayerMove(row, col) {
    //1.1 players move logic
    console.log(`${getActivePlayer().value}'s Move!`);

    board[row][col] = activePlayer.value;
    updateTurn();
  }

  return { displayBoard, makePlayerMove, updateTurn, board, getActivePlayer };
}

//game controller

function gameController() {
  const game = gameBoard(); //creating a new game board //when you create an instance using const game = gameBoard();, you gain access to all the properties and methods that the gameBoard function explicitly returns in its return statement.

  function playRound(col, row) {
    game.makePlayerMove(col, row);
    game.displayBoard();
    checkWinner();
  }

  function checkWinner() {
    //row
    let gameArray = game.board;

    for (const row of gameArray) {
      let check = row.every((i) => i == 1);
      if (check == true) {
        return console.log("Row winner1");
      }
    }

    for (const row of gameArray) {
      let check2 = row.every((i) => i == 2);
      if (check2 == true) {
        return console.log("Row winner2");
      }
    }

    //col
    for (let i = 0; i < 3; i++) {
      const column = gameArray.map((row) => row[i]); //

      columnWinner = column.every((c) => c == 1);

      if (columnWinner == true) {
        return console.log("Col Winner!");
      }
    }

    for (let i = 0; i < 3; i++) {
      const column = gameArray.map((row) => row[i]); //

      columnWinner2 = column.every((c) => c == 2);

      if (columnWinner2 == true) {
        return console.log("Col Winner2!");
      }
    }
    //diagonal winner for 2

    if (
      (gameArray[0][0] == 2 && gameArray[1][1] == 2 && gameArray[2][2]) == 2 ||
      (gameArray[0][2] == 2 && gameArray[1][1] == 2 && gameArray[2][0] == 2)
    ) {
      return console.log("Diagonal Winner!");
    }

    if (
      (gameArray[0][0] == 1 && gameArray[1][1] == 1 && gameArray[2][2]) == 1 ||
      (gameArray[0][2] == 1 && gameArray[1][1] == 1 && gameArray[2][0] == 1)
    ) {
      return console.log("Diagonal Winner!");
    }

    const flat = gameArray.flat();

    if (flat.includes(0) == false) {
      return console.log("Its a tie!");
    }
  }

  return { playRound, checkWinner };
}

const g = gameBoard();
console.table(g.board);
const g1 = gameController();
g1.playRound(1, 0);
g1.playRound(1, 1);

function handleDisplay() {
  const game = gameBoard(); //
  const gameC = gameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {};
}
