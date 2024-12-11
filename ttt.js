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

    board[row][col] = activePlayer.value;
    updateTurn();
    console.log(`${getActivePlayer().value}'s Move next!`);
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
    const gb = game.board;
    const flatGb = gb.flat();
    console.log(flatGb);

    arrayTie = flatGb.every((element) => element == "o" || element == "x");

    if (arrayTie == true) {
      return console.log("Its a tie!");
    }

    //row
    let gameArray = game.board;

    for (const row of gameArray) {
      let check = row.every((i) => i == "x");
      if (check == true) {
        return console.log("Row winner1");
      }
    }

    for (const row of gameArray) {
      let check2 = row.every((i) => i == "o");
      if (check2 == true) {
        return console.log("Row winner2");
      }
    }

    //col
    for (let i = 0; i < 3; i++) {
      const column = gameArray.map((row) => row[i]); //

      columnWinner = column.every((c) => c == "x");

      if (columnWinner == true) {
        return console.log("Col Winner!");
      }
    }

    for (let i = 0; i < 3; i++) {
      const column = gameArray.map((row) => row[i]); //

      columnWinner2 = column.every((c) => c == "o");

      if (columnWinner2 == true) {
        return console.log("Col Winner2!");
      }
    }
    //diagonal winner for 2

    if (
      (gameArray[0][0] == "o" && gameArray[1][1] == "o" && gameArray[2][2]) ==
        "o" ||
      (gameArray[0][2] == "o" &&
        gameArray[1][1] == "o" &&
        gameArray[2][0] == "o")
    ) {
      return console.log("Diagonal Winner!");
    }

    if (
      (gameArray[0][0] == "x" && gameArray[1][1] == "x" && gameArray[2][2]) ==
        "x" ||
      (gameArray[0][2] == "x" &&
        gameArray[1][1] == "x" &&
        gameArray[2][0] == "x")
    ) {
      return console.log("Diagonal Winner!");
    }
  }

  return { playRound, checkWinner };
}

const g = gameBoard();
console.table(g.board);
const g1 = gameController();
g1.playRound(1, 0);
g1.playRound(1, 1);
g1.playRound(2, 0);
g1.playRound(1, 2);
g1.playRound(0, 0);
g1.playRound(0, 1);
g1.playRound(0, 2);
g1.playRound(2, 1);
g1.playRound(2, 2);

function handleDisplay() {
  const game = gameBoard(); //
  const gameC = gameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {};
}
