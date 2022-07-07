//game values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener("mousedown", (e) => {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});
//Guess button event listener
guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);

  // validation
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  //win condition
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct! You win!`);
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //Game over
      gameOver(
        false,
        `Game over, you lose. The correct number was ${winningNum}`
      );
    } else {
      //game continues
      setMessage(
        `${guess} is not correct. ${guessesLeft} guesses remaining`,
        "red"
      );

      guessInput.value = "";
    }
  }
});

//Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // Disable input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  // set message
  setMessage(msg, color);

  //Play again?

  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Get winning num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set message func
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
