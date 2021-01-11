// Empty arrays
let initArray = [];
let userClicks = [];

// Loop variables
let i = 0;
let j = 0;
let x = 0;

// Empty variables
let k;
let l;
let timer;

// Level control
let score = 0;
let level = {
    dots: 2,
    round: 0,
    speed: 800,
};

// UX & UI
let colors = ['blue', 'pink', 'green'];
let flashAudio = new Audio('sound.mp3');
let padAudio = new Audio('sound.mp3');
let scorebox = document.getElementById("score");
let roundbox = document.getElementById("round");
let typingText = document.getElementById("start-text");

// Game order control
function startGame() {
// reset all initial values so that user can reset their own game without refreshing the page.
    x = 0;
    initArray = [];
    userClicks = [];
    score = 0;
    level.dots = 2;
    level.round = 0;
    level.speed = 800;
    scorebox.innerHTML = score;
    roundbox.innerHTML = level.round;
    clearTimer();
    startText()
    setTimeout(function() {
    const firstLevel = makeCircleArray(level);
    showEachCircle(firstLevel,timeControl);
    }, 1500);
}

function nextRound() {
    console.log(`${level.dots} dots`);
    console.log(`score is ${score}`);
    setTimeout(function () {
        const whichLevel = makeCircleArray(level);
        showEachCircle(whichLevel,timeControl);
    }, 1000);
    showScore();
    showRound();
}

function makeCircleArray(level) {
    let i = 0;
    var last_val = null;
    do {
        let val = Math.floor(Math.random() * 9);
        if (val == last_val) continue; {
            initArray.push(`game-${val}`);
            i++;
            last_val = val;
        }
    } while (i < level.dots);
    return initArray;
}

// Core gameplay functions (generally speaking, shown in order they are called)
    
function showCircle(num, j) {
    let k;
    let y = x;
    x++;
    setTimeout(function () {
        let color = colors[y % colors.length];
        let num = initArray[j];
        let element = document.getElementById(num);
        element.classList.add(`cell-glow-${color}`);
        padSound();
        window.setTimeout(function () {
            element.classList.remove(`cell-glow-${color}`);
        }, 300);
        j++;
    }, level.speed * j);
}

function showEachCircle(cb1, cb2) {
    initArray.forEach(showCircle);
    cb2()
}

function timeControl(){
let counter = 5;
    timer = setInterval(function() {
        if (counter > 0) {
            counter--;
            // console.log("counting down"+counter)          
        } else {
            endGame();
            clearTimer();
        }
    }, 1000);
}

function clearTimer() {
clearInterval(timer)
    }
    
function captureUserClicks(clicked_id) {
    userClicks.push(`game-${clicked_id}`);
    if (userClicks.length === initArray.length) {
        compareArraysClicks()
        clearTimer()
    }
}

function compareArraysClicks() {
    let userArray = userClicks.toString();
    let gameArray = initArray.toString();
    if (gameArray === userArray) {
        levelUp();
    } else {
        endGame();
    }
}

function endGame() {
    alert(`You lost :( Never mind, at least you scored ${score}`);
}

// Level control & reset functions

function levelUp() {
    score = score += 5;
    level.round++;
    if (level.round % 3 === 0) {
        level.dots++;
        speedUp();
    }
    resetGameArray();
    resetUserClicks(nextRound);
    return level.dots + level.round + score;
}

function speedUp() {
    level.speed -= 50
    return level.speed;
}

function resetGameArray() {
    initArray = [];
    return initArray;
}

function resetUserClicks(callback) {
    userClicks = [];
    callback();
    return userClicks;
}

// UX & UI functions

function showScore() {
    // let scorebox = document.getElementById("score");
    scorebox.innerHTML = score;
}

function showRound() {
    roundbox.innerHTML = level.round;
}

function padSound() {
    setTimeout(function () {
        padAudio.play(), 8
    })
};

function startText() {
    typingText.innerHTML = "ok, let's go";

}




