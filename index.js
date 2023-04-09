
var buttonColours = ["green", "red", "yellow", "blue"];
var gameSequence = []; 
var userSequence = [];
var gameOn = false;
var level = 0;

$(document).on("keydown", function(){
    if(!gameOn)
    {   
        $("#title-line").text("Level "+level);
        nextSequence();
        gameOn = true;     
    }
});


$(".btn").click(function(){
    var chosenColor = $(this).attr("id");
    userSequence.push(chosenColor);

    toPlay(chosenColor);
    
    checkAnswer(userSequence.length - 1);
});

function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("#title-line").text("GAME OVER, \n Press any key to Restart");
    level = 0;
    gameSequence = [];
    gameOn = false;
}

function nextSequence(){
    userSequence = [];
    level ++;
    console.log(level)
    $("#title-line").text("Level "+level);
    var randomChosen = Math.floor(Math.random() * 4);
    gameSequence.push(buttonColours[randomChosen]);
    toPlay(buttonColours[randomChosen]) ;
}

function toPlay(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
    $("#" + color).removeClass("pressed");
    }, 300);
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function checkAnswer(ind){

    if(gameSequence[ind] === userSequence[ind]){
        if(userSequence.length === gameSequence.length){
            setTimeout(function(){
                console.log("right")
                nextSequence();
            }, 1000);
        }
    }
    else{
        gameOver();
    }
}