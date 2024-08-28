var gameColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userPattern = []
var started = false;
var level = 0;

//code to be executed when a button is pressed
$(".btn").click(function(){
    //get the id of the pressed button
    userColor = $(this).attr("id");
    //update the userpattern array
    userPattern.push(userColor);
    //play the audio
    playAudio(userColor);
    //animate the button press
    animatePress(userColor);
    //check the answer if the pressed button is correct
    checkAnswer(userPattern.length);

});


//function to generate the next sequence in the game

function nextSequence(){
    //increment the level whenever the function is called
    level ++;
    //update the heading with the current level
    $("#level-title").text("Level " + level);
    //generate a random number between 0 & 4 and push the corresponding colour into gamepattern 
    randomNumber = Math.floor(Math.random()*4);
    nextColor = gameColors[randomNumber];
    gamePattern.push(nextColor);
    //animate the generated button and play audio
    $("#" + nextColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(nextColor);
    userPattern = [];

}

//function to play the corresponding audio
function playAudio(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//function to animate the pressed button
function animatePress(name){
    $("#" + name).addClass("pressed");
    //ste a 100ms delay
    setTimeout(function(){
        $("#" + name).removeClass("pressed");
    },100);
}

//function to check if the pressede button and the sequence is correct
function checkAnswer(currentLevel){
    //check if the last pressed button is same as the last generated button
    if (userPattern[currentLevel-1] == gamePattern[currentLevel-1]){
        //check if both patterns are same
        if(userPattern.length == gamePattern.length){
            //call nextsequence function with a 1000ms delay
            setTimeout(function(){
                nextSequence();
            },1000);
            //empty the user generated pattern
        }
    }else{
        gameOver();
    }
}

//gameover function
function gameOver(){
    //reset level, gamepattern, userpattern, startet to false.
    level = 0;
    gamePattern = [];
    userPattern = [];
    started = false;
    //play gameover sound
    playAudio("wrong");
    //flash body red
    $("body").addClass("game-over");
    $("h1").text("Game over, press any key to restart.")
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
}

//start the game on key press 
$("body").keypress(function(){
    //check if the game has already started or not
    if (started == false){
        started = true
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});