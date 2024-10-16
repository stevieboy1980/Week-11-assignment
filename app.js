/*Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
Create a Tic-Tac-Toe game grid using your HTML element of choice.
When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
A heading should say whether it is X's or O's turn and change with each move made.
A button should be available to clear the grid and restart the game.
When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.*/
// these variables represents the grid box
let box0 = $("#box0");
let box1 = $("#box1");
let box2 = $("#box2");
let box3 = $("#box3");
let box4 = $("#box4");
let box5 = $("#box5");
let box6 = $("#box6");
let box7 = $("#box7");
let box8 = $("#box8");

// this variable represents the players x and o
let player1 = "X";
let player2 = "O";

// Winner at 5 turns or more and can't have more than 9 turns
let turn = 0;
// need to know if a player has won to move on the the next round.
let winner = false;

$("#alertStart").hide();
$("#alertWinner").hide();
$("#alertDraw").hide();

// keep track of current player
let currentPlayer = "";

const winningOutcomes = [
  [box0, box1, box2],
  [box3, box4, box5],
  [box6, box7, box8],
  [box0, box3, box6],
  [box1, box4, box7],
  [box2, box5, box8],
  [box0, box4, box8],
  [box2, box4, box6],
];
// End the game by disabling further clicks
const endGame = () => {
  console.log("GAME OVER");
  // Disables all boxes
  $(".box").css("pointer-events", "none");
  $('#p1').removeClass ("bg-dark border border-danger");
  $('#p2').removeClass ("bg-dark border border-warning");
};
const checkWinner = (currentPlayer, a, b, c) => {
  if (
    a.text() === currentPlayer &&
    b.text() === currentPlayer &&
    c.text() === currentPlayer
  ) {
    winner = true;
    console.log(`You are the winner ${currentPlayer}!`);

    a.removeClass("text-dark bg-success").addClass("text-success bg-light");
    b.removeClass("text-dark bg-success").addClass("text-success bg-light");
    c.removeClass("text-dark bg-success").addClass("text-success bg-light");

    

    if (currentPlayer === "X") {
      currentPlayer = "Player1";
    } else {
      currentPlayer = "Player 2";
    }

    $("#alertWinner").text(`GAME OVER...${currentPlayer} WINS!`);
    $("#alertWinner").show();

    endGame();
  }
};
// Checks all possible winning outcomes
const checkOutcomes = () => {
    winningOutcomes.forEach(outcome => {
      checkWinner(currentPlayer, ...outcome);
    });
// This checks for draw if no winning outcome
  if(turn === 9 && winner === false){
    endGame();
    $("#alertDraw").show();
  }
};

const startGame = () => {
    console.log("Start Game!");
    turn = 0; // Reset turn at the start
    currentPlayer = player1; // Set starting player
    console.log(currentPlayer);
  
    $("#p1").addClass("bg-dark border border-danger");
    $("#alertStart").show();
  
    // Disable the start button after the game starts
    $("#startBtn").prop("disabled", true);
  
    $(".box").on("click", function () {
      $("#alertStart").hide();
  
      // Check if the clicked box is empty and the game is still ongoing
      if ($(this).text() === "" && !winner) {
        $(this).text(currentPlayer);
        turn++;
  
        if (turn > 4) {
          console.log("Checking for a winner...");
          checkOutcomes();
        }
        //ternary operator to toggle between players using jquery
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        $("#p1").toggleClass("bg-dark border border-danger");
        $("#p2").toggleClass("bg-dark border border-warning");
      } else if (winner) {
        console.log("Game is over!");
      } else {
        console.log("Box already occupied!");
      }
    });
  };
  
  // Reset button logic
  document.getElementById("resetBtn").addEventListener("click", () => {
    document.location.reload(true);
    $("#startBtn").prop("disabled", false); // Re-enable the start button after reset
  });
  
  // Event listener for start button
  document.getElementById("startBtn").addEventListener("click", () => startGame());
  
  
