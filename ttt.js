let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.querySelector(".theme-switch");

function enableDarkmode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
}

function disableDarkmode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
}

if (darkmode === "active") {
  enableDarkmode();
}

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");

  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

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
    { name: "player1", value: "X" },
    { name: "player2", value: "O" },
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

    arrayTie = flatGb.every((element) => element == "O" || element == "X");

    if (arrayTie == true) {
      return "Game tied!";
    }

    //row
    let gameArray = game.board;

    for (const row of gameArray) {
      let check = row.every((i) => i == "X");
      if (check == true) {
        return "X wins!";
      }
    }

    for (const row of gameArray) {
      let check2 = row.every((i) => i == "O");
      if (check2 == true) {
        return "O wins!";
      }
    }

    //col
    for (let i = 0; i < 3; i++) {
      const column = gameArray.map((row) => row[i]); //

      columnWinner = column.every((c) => c == "X");

      if (columnWinner == true) {
        return "X wins!";
      }
    }

    for (let i = 0; i < 3; i++) {
      const column = gameArray.map((row) => row[i]); //

      columnWinner2 = column.every((c) => c == "O");

      if (columnWinner2 == true) {
        return "O wins!";
      }
    }
    //diagonal winner for 2

    if (
      (gameArray[0][0] == "O" && gameArray[1][1] == "O" && gameArray[2][2]) ==
        "O" ||
      (gameArray[0][2] == "O" &&
        gameArray[1][1] == "O" &&
        gameArray[2][0] == "O")
    ) {
      return "O wins!";
    }

    if (
      (gameArray[0][0] == "X" && gameArray[1][1] == "X" && gameArray[2][2]) ==
        "X" ||
      (gameArray[0][2] == "X" &&
        gameArray[1][1] == "X" &&
        gameArray[2][0] == "X")
    ) {
      return "X wins!";
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
    playerTurnDiv.innerText = "Make your Move";

    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    gameC.playRound(selectedColumn, selectedRow);
    e.target.innerText = game.getActivePlayer().value;

    game.updateTurn();

    playerTurnDiv.innerText =
      "Playerz (" + game.getActivePlayer().value + ") Make your move!";
    playerTurnDiv.innerText = gameC.checkWinner() + "Wins";
    if (playerTurnDiv.innerText === "undefinedWins") {
      playerTurnDiv.innerText =
        "Player " + game.getActivePlayer().value + "'s Turn";
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
