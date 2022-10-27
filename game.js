var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

var level = 0;

//detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function () {
  if (!started) {
    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  //store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //Add the contents of the variable userChosenColour to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  //check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    //play this sound if the user got one of the answers wrong.
    playSound("wrong");

    //In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}

function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //select the button with the same id as the randomChosenColour and animate a flash to the button selected.
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

//play the sound for the button colour selected.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  //add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  //to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
