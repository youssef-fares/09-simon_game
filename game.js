let gamePattern = [];
let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let start = false;

$(document).keydown(function () {
  if (start === false) {
    nextSequence();
    $("h1").text("Level " + level);
    start = true;
  }
});

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  setTimeout("", 2000);
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function () {
      $("#" + gamePattern[i])
        .fadeOut(100)
        .fadeIn(100);
      playSound(gamePattern[i]);
    }, i * 600);
  }

  level++;
  $("h1").text("Level " + level);

  console.log(randomChosenColour);
}

function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1500);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  start = false;
  level = 0;
  gamePattern = [];
}
