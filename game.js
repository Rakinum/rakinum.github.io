
var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).on("keypress",function(){
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}


$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(colour){
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){

        if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
        else{
        console.log("Wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(() => {
            $("body").removeClass("game-over"); 
        }, 200);
        startOver();
        }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    
    $(document).on("keypress",function(){
        if (!started) {
    
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
          }
    });
}