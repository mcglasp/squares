let initArray = [];
let i = 0;
let j = 0;
let score = 0;
let userClicks = [];
let speed = 1000;
let dots = 2;

// function initTimer(seconds){
// 	const milliseconds = seconds * 1000;
// 	setTimeout(updateTimer, milliseconds);
// }



// function updateTimer() {
//   let timesUp = true
//   console.log(`now ${timesUp}`)
// }


function nextRound(level) {
    let initArray = [];
    speed - 80;
    dots++
    newgame();
    console.log("next round!")
}



function makeCircleArray(level, cb) {
  do {
    let val = Math.floor(Math.random() * 9)
    initArray.push(`game-${val}`)
    i++
  }
  while (i < dots)
  console.log(initArray)
  
}


function showCircle(item, index) {
  setTimeout(function () {
    let num = initArray[j];
    let element = document.getElementById(num)
    element.style.backgroundColor = "red";
    window.setTimeout(function () {
      element.style.backgroundColor = "white";
    }, 500);
    console.log(initArray[j])
    j++;
  }, speed * index);
};

function showEachCircle(level,captureUserClicks) {
  initArray.forEach(showCircle);

}

function captureUserClicks(clicked_id, callback) {
  userClicks.push(`game-${clicked_id}`);
  if (userClicks.length === 2) {
  compareArraysClicks();
}
}

function compareArraysClicks() {
 let userArray = userClicks.toString();
  let gameArray = initArray.toString();
  if (gameArray === userArray) {
    alert("hooray");
    console.log("yay", userClicks);
    nextRound();
  } else {
    alert("boo");
  console.log("boo", userClicks);}
  // return endGame;
}


function newgame(){
  const circlesFirstLevel = makeCircleArray();
 showEachCircle(circlesFirstLevel, captureUserClicks);
}