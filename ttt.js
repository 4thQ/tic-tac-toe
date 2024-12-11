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

  return {
    displayBoard,
    makePlayerMove,
    updateTurn,
    board,
    getActivePlayer,
    players,
  };
}

//game controller

function gameController() {
  const game = gameBoard(); //creating a new game board //when you create an instance using const game = gameBoard();, you gain access to all the properties and methods that the gameBoard function explicitly returns in its return statement.
  const player1 = game.players[0].name;
  const player2 = game.players[1].name;
  function playRound(col, row) {
    game.makePlayerMove(col, row);
    game.displayBoard();
    checkWinner();
  }

  function checkWinner() {
    const gb = game.board;
    const flatGb = gb.flat();

    arrayTie = flatGb.every((element) => element == "o" || element == "x");

    if (arrayTie == true) {
      return "Game tied!";
    }

    //row
    let gameArray = game.board;

    for (const row of gameArray) {
      let check = row.every((i) => i == "x");
      if (check == true) {
        return "Player 1 wins";
      }
    }

    for (const row of gameArray) {
      let check2 = row.every((i) => i == "o");
      if (check2 == true) {
        return "Player 2 wins";
      }
    }

    //col
    for (let i = 0; i < 3; i++) {
      const column = gameArray.map((row) => row[i]); //

      columnWinner = column.every((c) => c == "x");

      if (columnWinner == true) {
        return "Player 1 wins";
      }
    }

    for (let i = 0; i < 3; i++) {
      const column = gameArray.map((row) => row[i]); //

      columnWinner2 = column.every((c) => c == "o");

      if (columnWinner2 == true) {
        return "Player 2 wins";
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
      return "Player 2 wins";
    }

    if (
      (gameArray[0][0] == "x" && gameArray[1][1] == "x" && gameArray[2][2]) ==
        "x" ||
      (gameArray[0][2] == "x" &&
        gameArray[1][1] == "x" &&
        gameArray[2][0] == "x")
    ) {
      return "Player 1 wins";
    }
  }

  return { playRound, checkWinner };
}

function handleDisplay() {
  const cellO = cellObj();
  const game = gameBoard(); //
  const gameC = gameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const resetbtn = document.querySelector(".resetBtn");
  let gb = game.board;
  playerTurnDiv.innerText = "Make you Move";

  //creates the board
  gb.forEach((row, colIndex) => {
    row.forEach((col, rowIndex) => {
      const cellBtn = document.createElement("button");
      cellBtn.classList.add("cellBtn");
      cellBtn.innerText = "";
      cellBtn.dataset.column = colIndex;
      cellBtn.dataset.row = rowIndex;
      boardDiv.appendChild(cellBtn);
    });
  });

  function updateScreen() {}

  function clickHandlerBoard(e) {
    console.log(e);
    playerTurnDiv.innerText = "Make your Move";

    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    console.log(selectedColumn);
    console.log(selectedRow);

    gameC.playRound(selectedColumn, selectedRow);
    e.target.innerText = game.getActivePlayer().value;

    game.updateTurn();

    playerTurnDiv.innerText =
      "Player: (" + game.getActivePlayer().value + ") Make your move!";
    playerTurnDiv.innerText = gameC.checkWinner() + "Wins";
    if (playerTurnDiv.innerText === "undefinedWins") {
      playerTurnDiv.innerText =
        "Player: (" + game.getActivePlayer().value + ") Make your move!";
    } else {
      playerTurnDiv.innerText = gameC.checkWinner();
      boardDiv.removeEventListener("click", clickHandlerBoard);
    }
    e.target.disabled = true;
  }

  function clickReset() {
    document.location.reload();
  }

  resetbtn.addEventListener("click", clickReset);
  boardDiv.addEventListener("click", clickHandlerBoard);

  clickHandlerBoard();
}

handleDisplay();
//  let gb = game.board;
//     console.log(gb);
//     gb.forEach((row, rowIndex) => {
//       row.forEach((col, colIndex) => {
//         const cellBtn = document.createElement("button");
//         cellBtn.classList.add("cellBtn");

//         // Optionally, you can set attributes or text content for the button if necessary
//         // For example, to set a data attribute:
//         cellBtn.setAttribute("data-row", rowIndex);
//         cellBtn.setAttribute("data-col", colIndex);

//         // Append the button to boardDiv
//         boardDiv.appendChild(cellBtn);
//       });
//     });
//   }
