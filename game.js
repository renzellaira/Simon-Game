var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamesPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentKey) {

    var activeButton = $("#" + currentKey);

    activeButton.addClass("pressed");

    setTimeout(function() {
        activeButton.removeClass("pressed");
    }, 100);
}



function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamesPattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();


}

function playSound(identifier) {
    var audio = new Audio("sounds/" + identifier + ".mp3");
    audio.play();
}

function checkAnswer(index) {

    if (userClickedPattern[index] === gamesPattern[index]) {

        if (userClickedPattern.length == gamesPattern.length) {

            setTimeout(function() {
                nextSequence();
            }, 1000);

        }

    } else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press any key to Restart");

        startOver();

    }

}

function startOver() {
    level = 0;
    gamesPattern = [];
    started = false;
}