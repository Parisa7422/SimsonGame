var buttonColors = ["green", "red", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameHasStarted = false;
var level = 1;
var userCount = 0;

$(document).on("keydown", function () {
  if (gameHasStarted == true) return;
  gameHasStarted = true;
  nextSequence();
});

//deceted any btn clicked before the game or not!

function nextSequence() {
  $("h1").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  buttonSound(randomChosenColor);
  level++;
}

$(".btn").on("click", function (event) {
  userSequance(event);
});

//User click
function userSequance(event) {
  if (gameHasStarted == false) {
    gameOver();
  }
  var userChosenColor = event.target.id;
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);

  buttonSound(userChosenColor);
  checkAnswer();
}

//Button Sound
function buttonSound(name) {
  var randombutton = new Audio("sounds/" + name + ".mp3");
  randombutton.play();
}

//Animate the button by user click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Check answer

function checkAnswer() {
  if (userClickedPattern[userCount] !== gamePattern[userCount]) {
    gameOver();
    return false;
  }

  if (userCount == gamePattern.length - 1) {
    nextLevel();
  } else {
    userCount++;
  }

  return true;
}

function nextLevel() {
  setTimeout(function () {
    nextSequence();
  }, 1000);
  userCount = 0;
  userClickedPattern = [];
}

// Game over
function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("h1").text("Game over! for restart the game press any key!");
  level = 1;
  gameHasStarted = false;
  userClickedPattern = [];
  gamePattern = [];
}
