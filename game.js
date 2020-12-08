var initArray = [];
var i = 0;
var j = 0;
var score = 0;
var userClicks = [];
var speed = 1000;
var dots = 2;
// var level = 0

// function initTimer(seconds){
//  const milliseconds = seconds * 1000;
//  setTimeout(updateTimer, milliseconds);
// }

function updateScore() {
    var score = score + dots
console.log(score)
return score
}

function endGame() {
    var dots = 0;
    var speed = 1000;
    alert(`Soz, you lost :( Never mind, at least you scored ${score}`)
}


// function updateTimer() {
//   var timesUp = true
//   console.log(`now ${timesUp}`)
// }


function first() {
    var dots = 2
    var speed = 1000
    return dots
    // return speed
    // var initArray = [];
}

function levelUp() {
    dots++
    // return speed-50
    console.log("levelling up!")
    console.log(`this many dots ${dots}`)
    resetArray()
    updateScore()
    return dots
}

function resetArray() {
    initArray = [];
    console.log(`reset`)
    console.log(initArray)
    resetClicks();
    return initArray;
}

function resetClicks() {
    userClicks = [];
    console.log(`reset clicks`)
    console.log(userClicks)
    newgame()
    return userClicks;
}



function makeCircleArray(level) {
    var i = 0;
  do {
    var val = Math.floor(Math.random() * 9)
    initArray.push(`game-${val}`)
    i++
  }
  while (i < dots)
  console.log(`${dots} ${initArray}`)
  return initArray;
}


function showCircle(item, j) {
  setTimeout(function () {
      console.log(initArray)
    var num = initArray[j];
    // console.log(num)
    var element = document.getElementById(num)
    element.style.backgroundColor = "red";
    window.setTimeout(function () {
      element.style.backgroundColor = "white";
    }, 500);
    // console.log(initArray[j])
    j++;
  }, speed * j);
};

function showEachCircle(captureUserClicks) {
  initArray.forEach(showCircle);
  }


function captureUserClicks(clicked_id, callback) {
    // console.log(userClicks)
  userClicks.push(`game-${clicked_id}`);
  if (userClicks.length === initArray.length) {
  compareArraysClicks();
}
console.log(userClicks)
}

function compareArraysClicks() {
 var userArray = userClicks.toString();
  var gameArray = initArray.toString();
  if (gameArray === userArray) {
    alert("hooray");
    console.log("go to level up and reset");
    levelUp() 
  } else {
    alert("boo");
  console.log("boo", userClicks);}
  endGame();
}

function startGame() {
    // let initArray = [];
    const firstLevel = makeCircleArray(first)
    showEachCircle(firstLevel, captureUserClicks)
}

function newgame(){
    console.log("newgame here we are")
  const whichLevel = makeCircleArray();
 showEachCircle(whichLevel, captureUserClicks);
}