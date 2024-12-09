// function cell() {
//   let value = 0; //deafualt value for the cell obj (0= empty)
//   function getValue() {
//     return value;
//   }
//   function addValue(player) {
//     value = player;
//   }
//   return { getValue, addValue };
// }

// const array = [
//   [4, 2, 3],
//   [4, 4, 4],
//   [4, 8, 9],
// ];
// //row
// for (const row of array) {
//   console.log(row);
//   let check = row.every((i) => i == 4);
//   console.log(check);
//   if (check == true) {
//     console.log("Row winner");
//   }
// }

// //col
// for (let i = 0; i < 3; i++) {
//   const column = array.map((row) => row[i]); //

//   columnWinner = column.every((c) => c == 4);

//   if (columnWinner == true) {
//     console.log("Col Winner!");
//   }
// }

//Game board
function gameBoard() {
  const rows = 3;
  const col = 3;
  const board = [];

  const players = [
    { name: "player1", value: 1 },
    { name: "player2", value: 2 },
  ];
  let activePlayer = players[1];
  for (let i = 0; i < rows; i++) {
    board[i] = [];

    for (let j = 0; j < col; j++) {
      board[i].push(0);
    }
  }

  function displayBoard() {
    //1. creating game board
    console.table(board);
  }

  function updateTurn() {
    if (activePlayer == players[0]) {
      return (activePlayer = players[1]);
    } else {
      return (activePlayer = players[0]);
    }
  }

  function makePlayerMove(row, col) {
    //1.1 players move logic
    let p = updateTurn();
    board[row][col] = p.value;
  }

  return { displayBoard, makePlayerMove, updateTurn, board };
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
        console.log("Row winner1");
      }
    }

    for (const row of gameArray) {
      let check2 = row.every((i) => i == 2);
      if (check2 == true) {
        console.log("Row winner2");
      }
    }

    //col
    for (let i = 0; i < 3; i++) {
      const column = gameArray.map((row) => row[i]); //

      columnWinner = column.every((c) => c == 1);

      if (columnWinner == true) {
        console.log("Col Winner!");
      }
    }

    for (let i = 0; i < 3; i++) {
      const column = gameArray.map((row) => row[i]); //

      columnWinner2 = column.every((c) => c == 2);

      if (columnWinner2 == true) {
        console.log("Col Winner2!");
      }
    }
  }

  return { playRound, checkWinner };
}

const g1 = gameController();
console.log(g1.playRound(1, 0));
console.log(g1.playRound(0, 0));
console.log(g1.playRound(1, 1));
console.log(g1.playRound(1, 0));
console.log(g1.playRound(1, 2));
console.log(g1.playRound(2, 0));
