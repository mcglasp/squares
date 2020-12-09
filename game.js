var initArray = [];
var i = 0;
var j = 0;
var score = 0;
var userClicks = [];
var speed = 1000;
var dots = 2;
var timesUp = false

function timer(){
    var timesUp = true
    console.log(timesUp)
}

function zeroTimer(){
    var timesUp = false
    console.log(timesUp)
}

function updateTimer(){
    setTimeout(timer, 1000)
}

$(".cell").click(zeroTimer)




function updateScore(a, b) {
    score = a + b - 2
    document.getElementById("score").innerHTML = `${score}`;
}

function endGame() {
    var dots = 0;
    var speed = 1000;
    alert(`Soz, you lost :( Never mind, at least you scored ${score}`)
}





function first() {
    var dots = 2
    var speed = 1000
    return dots
}

function levelUp() {
    dots++
    resetArray()
    return dots
}

function resetArray() {
    initArray = [];
    resetClicks();
    return initArray;
}

function resetClicks() {
    userClicks = [];
    newgame()
    return userClicks;
}



function makeCircleArray(level) {
    var i = 0;
  do {
    var val = Math.floor(Math.random() * 8)
    initArray.push(`game-${val}`)
    i++
  }
  while (i < dots)
  return initArray;
}


function showCircle(item, j) {
  setTimeout(function () {
    var num = initArray[j];
    var element = document.getElementById(num)
    element.style.backgroundColor = "red";
    window.setTimeout(function () {
      element.style.backgroundColor = "white";
    }, 500);
    j++;
  }, speed * j);
};

function showEachCircle(captureUserClicks) {
  initArray.forEach(showCircle);
  updateTimer();
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
    updateScore(dots,score);
    levelUp()
  } else if (timesUp == true){
      endGame()
  } else {
  updateScore(dots,score);
  endGame();
}
}

// (userClicks.length === initArray.length && gameArray !== userArray) 

function startGame() {

    const firstLevel = makeCircleArray(first)
    showEachCircle(firstLevel, captureUserClicks)
}

function newgame(){
    // changeColor(dots);
    setTimeout(function() {
    const whichLevel = makeCircleArray();
 showEachCircle(whichLevel, captureUserClicks)}
  ,1000)};


//   styling rules




