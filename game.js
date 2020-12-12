var initArray = [];
var i = 0;
var j = 0;
var score = 0;
var userClicks = [];
// var speed = 1000;
// var dots = 2;
var timesUp = false

var level = {
    dots: 2,
    speed: 1000,
    round: 0,
}

// function timer(){
//     var timesUp = true
//     console.log(timesUp)
// }

// function zeroTimer(){
//     var timesUp = false
//     console.log(timesUp)
// }

// function updateTimer(){
//     setTimeout(timer, 1000)
// }

// $(".cell").click(zeroTimer)




function updateScore(a, b, c) {
    score = a + b - 2
    document.getElementById("score").innerHTML = `${score}`;
}

function endGame() {
    alert(`You lost :( Never mind, at least you scored ${score}`)
}





function first() {
    level.dots = 2;
    level.speed = 1000;
    return dots
}

function levelUp() {
    level.round++
    level.dots++
    resetGameArray()
        console.log(`dots ${level.dots}`)

    return level.dots + level.round
}

function resetGameArray() {
    initArray = [];
    resetUserClicks();
    console.log(`initArray ${initArray}`)
    return initArray;
}

function resetUserClicks() {
    userClicks = [];
    newgame()
        console.log(`userClicks ${userClicks}`)

    return userClicks;
}



function makeCircleArray(level) {
    var i = 0;
  do {
    var val = Math.floor(Math.random() * 8)
    initArray.push(`game-${val}`)
    i++
  }
  while (i < level.dots)
  return initArray;
}


function showCircle(item, j) {
  setTimeout(function () {
    var num = initArray[j];
    var element = document.getElementById(num)
    element.classList.add("glow")
    window.setTimeout(function () {
      element.classList.remove("glow")
    }, 500);
    j++;
  }, level.speed * j);
};

function showEachCircle(captureUserClicks) {
  initArray.forEach(showCircle);
//   updateTimer();
  }


function captureUserClicks(clicked_id, callback) {
    userClicks.push(`game-${clicked_id}`);
  if (userClicks.length === initArray.length) {
  compareArraysClicks();
}
}

function compareArraysClicks() {
 var userArray = userClicks.toString();
  var gameArray = initArray.toString();
  if (gameArray === userArray) {
    updateScore(level.dots, level.round, score);
    levelUp()
  } else if (timesUp == true){
      endGame()
  } else {
  updateScore(level.dots, level.round, score);
  endGame();
}
}

// (userClicks.length === initArray.length && gameArray !== userArray) 

function startGame() {

    const firstLevel = makeCircleArray(level)
    showEachCircle(firstLevel, captureUserClicks)
}

function newgame(){
    // changeColor(dots);
    setTimeout(function() {
    const whichLevel = makeCircleArray(level);
 showEachCircle(whichLevel, captureUserClicks)}
  ,1000)};


//   styling rules




