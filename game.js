// Empty arrays
let initArray = [];
let userClicks = [];

// Loop variables
let i = 0;
let j = 0;
let x = 0;

// Empty variables
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
let information = document.querySelectorAll(".info-text");
//  document.getElementsByClassName("info-text");
// let infoText = document.querySelectorAll("#info-text, #info-text-l");


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
    infoText(`copy what you see on pad 1...<br>on pad 2`);
    clearTimer();
    setTimeout(function() {
    const firstLevel = makeCircleArray(level);
    showEachCircle(firstLevel,timeControl);
    }, 1500);
//     jQuery(function($) {
//         $(".cell").css("background","#aad9cd");
// })
}

function nextRound() {
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
    jQuery(function($) {
        $(".cell").css("background","#aab9cd");
})
// alert(`You lost :( Never mind, at least you scored ${score}`);
infoText("Too bad, better luck next time!")
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

function infoText(saySomething) {
let k;
for (k = 0; k < information.length; k++) {
  information[k].innerHTML = saySomething;
}
}
 
// Light theme toggle

$('.slider').click(function(){
    $("body, .container, .container-info, #logo, #newgame, #user-game-container, #game-container, .center-text").toggleClass("light-theme");
    // $("")
})

// Hard mode toggle

$('.slider-2').click(function(){
    $(".cell, .number").toggleClass("hard-mode");
})

