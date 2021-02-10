// Empty arrays
let initArray = [];
let userClicks = [];

// Loop iteration ('iter') variables. Required within global scope so that they can be accessed by startGame() and reset functions.
let iterA = 0;
let iterI = 0;
let iterJ = 0;
let iterX = 0;


// Empty variables. Required in global scope to be updated by several functions.
let timer;
let saySomething;
let last;

// Level control
let score = 0;
let level = {
    flashes: 2,
    round: 0,
    gap: 800,
};

// UX & UI
let colors = ['blue', 'pink', 'green'];
let sounds = ['assets/audio/beep1.mp3', 'assets/audio/beep2.mp3', 'assets/audio/beep3.mp3'];
let flashAudio = new Audio();
let padAudio = new Audio();
let scorebox = document.getElementById('score');
let roundbox = document.getElementById('round');
let information = document.querySelectorAll('.info-text');
let endCalled = false;
let startBtn = document.getElementById('newgame');
let soundsOn = false;
let topScore = localStorage.getItem('topScoreName');
let topScoreEl = document.getElementById('top-score');


window.onload = function() {
    topScoreEl = document.getElementById('top-score');
    topScoreEl.innerHTML = topScore;
    disableSounds();
};


// Game order control
function startGame() {
// reset all initial values so that user can reset their own game without refreshing the page.
    iterX = 0;
    initArray = [];
    userClicks = [];
    score = 0;
    level.flashes = 2;
    level.round = 0;
    level.gap = 800;
    scorebox.innerHTML = score;
    roundbox.innerHTML = level.round;
    endCalled = false;
    startBtn.disabled = true;
    infoText();
    clearTimer();
// Uses setTimeout to give slight pause before starting.
    setTimeout(function() {
        makeFlashArray(showEachFlash,timeControl);
    }, 1500);
// light up cells ready for game.
    jQuery(function($) {
        $('.cell').removeClass('grey-cells');
});
}

function nextRound() {
// Uses setTimeout to differentiate between rounds.
    setTimeout(function () {
        makeFlashArray(showEachFlash,timeControl);
    }, 1000);
    showScore();
    showRound();
    infoText(saySomething);
}

function makeFlashArray(showEachFlash, timeControlCallback) {
    let iterI = 0;
    let last_val = null;
    do {
// CREDIT Alan Wind, Stack Overflow user for generation of random non-repeating, value
        let val = Math.floor(Math.random() * 9);
        if (val == last_val) continue; {
            initArray.push(`game-${val}`);
            iterI++;
            last_val = val;
        }
    } while (iterI < level.flashes);
// End credit
    showEachFlash();
    timeControlCallback();
    return initArray;
}

// Core gameplay functions (generally speaking, shown in order they are called)
    
function showFlash(num,iterJ) {
// CREDIT Stack Overflow user tghw for solution to cycling through colours array.
//  saving current value of x as a different variable prevented x's value being overwritten, which would incorrectly return the same colour as previously shown.
    let y = iterX;
    iterX++;
    setTimeout(function () {
// color variable cycles through colours to give better player experience
        let color = colors[y % colors.length];
        let num = initArray[iterJ];
        let element = document.getElementById(num);
        element.classList.add(`cell-glow-${color}`);
        padSound();
        window.setTimeout(function() {
            element.classList.remove(`cell-glow-${color}`);
        }, 300);
        iterJ++;
    }, level.gap * iterJ);
}

function showEachFlash() {
    initArray.forEach(showFlash);
}

function timeControl() {
    let counter = 5;
    timer = setInterval(function() {
        if (counter > 0) {
            counter--;
        } else {
            endGame();
            clearTimer();
        }
    }, 1000);
}

function clearTimer() {
    clearInterval(timer);
}
    
function captureUserClicks(clicked_id) {
    // Re-enable newgame/startGame() event listener on first user click.
    startBtn.disabled = false;
    // CREDIT Stack Overflow user technophyle helped me with the solution to capturing user clicks and pushing to array.
    userClicks.push(`game-${clicked_id}`);
    if (userClicks.length === initArray.length) {
        compareArraysClicks();
        clearTimer();
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
    endCalled = true;
    startBtn.disabled = false;
    updateTopScore();
// Greys out cells when player loses the game to give immediate game-over indication
    jQuery(function($) {
        $('.cell').addClass('grey-cells');
    });
    infoText(saySomething);
}

// Level control & reset functions

function levelUp() {
    score += 5;
    level.round++;
    if (level.round % 3 === 0) {
        level.flashes++;
        reduceFlashGap();
    }
    resetGameArray();
    resetUserClicks(nextRound);
    return level.flashes + level.round + score;
}

function reduceFlashGap() {
    level.gap -= 50;
    return level.gap;
}

function resetGameArray() {
    initArray = [];
    return initArray;
}

function resetUserClicks(nextRoundCallback) {
    userClicks = [];
    nextRoundCallback();
    return userClicks;
}

// UX & UI functions

function showScore() {
    scorebox.innerHTML = score;
}

function showRound() {
    roundbox.innerHTML = level.round;
}

function updateTopScore() {
    topScore = Math.max(score, topScore);
    localStorage.setItem('topScoreName', topScore);
    topScoreEl.innerHTML = topScore;
}

function clearTopScore() {
    localStorage.clear();
    topScoreEl.innerHTML = '';  
}

function flashSound() {
    flashAudio.src = 'assets/audio/sound.mp3';
    if (soundsOn == true) {
    setTimeout(function () {
        flashAudio.play();
    });
}
}

function padSound() {
    let b = iterA;
    iterA++;
    let sound = sounds[b % sounds.length];
    padAudio.src = sound;
    if (soundsOn == true) {
    padAudio.play();
}
}



function infoText(saySomething) {
    if (endCalled === true) {
        saySomething = `Too bad!<br>Better luck next time!`;
    } else {
    switch (score) {
    case 0:  
        saySomething = `copy what you see on pad 1...<br>on pad 2`;
        last = saySomething;
        break;
    case 5:
        saySomething = `Levelled up!<br>&nbsp;`;
        last = saySomething;
        break;
    case 20:
        saySomething = `Well done!<br>&nbsp;`;
        last = saySomething;
        break;
    case 40:
        saySomething = `Awesome!<br>&nbsp;`;
        last = saySomething;
        break;
    case 60:
        saySomething = `You got it!<br>&nbsp;`;
        last = saySomething;
        break;
    case 100:
        saySomething = `Wow!<br>&nbsp;`;
        last = saySomething;
        break;
    case 200:
        saySomething = `I can't believe this!<br>&nbsp;`;
        last = saySomething;
        break;
    case 300:
        saySomething = `O... M... G!<br>&nbsp;`;
        last = saySomething;
        break;
    default:
        saySomething = last;
    }
    }
// Loop required to ensure this information is displayed on all viewports
    for (let k = 0; k < information.length; k++) {
    information[k].innerHTML = saySomething;
    }
}

// Toggle game and user input sounds on and off

function soundsToggle() {
    soundsOn =! soundsOn;
}

// Light theme toggle

$('.slider-2').click(function() {
    $('body, .container, .container-info, #logo, #newgame, #user-game-container, #game-container, .center-text, .display-box, #info-text, .instr-lower, sup, .info-round, .info-score, #ts-text, .footer-links').toggleClass('light-theme');
    $('.number').toggleClass('number-light');
});

// Hard mode toggle - adds and removes the .hard-mode CSS class, which increases game difficulty by removing cell outlines.

$('.slider-3').click(function() {
    $('.cell, .number').toggleClass('hard-mode');
    $('.number').toggleClass('number-hard');
}); 

// CREDIT Pierre, Fregante & Paul Rumkin from Stack Overflow website
function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document) || (/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
}
// End credit


function disableSounds() {
    if (iOS() === true) {
        $('#toDisable').addClass('disableToggle');
     }
}