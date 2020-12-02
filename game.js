let initArray = [];
let i = 0;
let j = 0;
let score = 0;
let userClicks = [];

function initTimer(seconds){
	const milliseconds = seconds * 1000;
	setTimeout(updateTimer, milliseconds);
}



function updateTimer() {
  let timesUp = true
  console.log(`now ${timesUp}`)
}

function makeCircleArray(level, cb) {
  do {
    let val = Math.floor(Math.random() * 9)
    initArray.push(val)
    i++
  }
  while (i < 5)
  console.log(initArray)
}


function showCircle(item, index) {
  setTimeout(function () {
    let num = initArray[j];
    document.getElementById(num).style.backgroundColor = "red";
    window.setTimeout(function () {
      document.getElementById(num).style.backgroundColor = "white";
    }, 500);
    console.log(initArray[j])
    j++;
  }, 1000 * index);
};

function showEachCircle(level,captureUserClicks) {
  initArray.forEach(showCircle);

}

function captureUserClicks(clicked_id, callback) {
  userClicks.push(clicked_id);
  if (userClicks.length === 5) {
  compareArraysClicks();
}
}

function compareArraysClicks() {
 let timesUp = false;
  initTimer(5)
  let userArray = userClicks.toString();
  let gameArray = initArray.toString();
  if (gameArray === userArray) {
    alert("hooray");
    console.log("yay", userClicks);
    // return nextRound;
  } if (timesUp === true) {
  alert("time's up!");
  console.log("boo", userClicks);
  } else {
    alert("boo");
  console.log("boo", userClicks);}
  // return endGame;
}


function newgame(){
  const circlesFirstLevel = makeCircleArray(1);
 showEachCircle(circlesFirstLevel, captureUserClicks);
}