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

// UX & UI - colours, sounds, text & feedback control
let colors = ['blue', 'pink', 'green'];
let sounds = ['assets/audio/beep1.mp3', 'assets/audio/beep2.mp3', 'assets/audio/beep3.mp3'];
let flashAudio = new Audio();
let userAudio = new Audio();
let scorebox = document.getElementById('score');
let roundbox = document.getElementById('round');
let information = document.querySelectorAll('.info-text');
let endCalled = false;
let startBtn = document.getElementById('newgame');
let soundsOn = false;
let topScore = localStorage.getItem('topScoreName');
let topScoreEl = document.getElementById('top-score');

window.onload = function () {
    topScoreEl = document.getElementById('top-score');
    topScoreEl.innerHTML = topScore;
    // The default sound state is disabled. If iOS or Safari are not detected, 
    // then the sound toggle is enabled, allowing users to then enable the playback 
    // of sounds if they wish to. Please refer to the readme for a fuller explanation 
    // of why this operating system inference was necessary.
    disableSounds();
};

// Game order controls

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
    setTimeout(function () {
        makeFlashArray(showEachFlash, timeControl);
    }, 1500);
    // light up cells ready for game.
    jQuery(function ($) {
        $('.cell').removeClass('grey-cells');
    });
}

function nextRound() {
    // Uses setTimeout to differentiate between rounds.
    setTimeout(function () {
        makeFlashArray(showEachFlash, timeControl);
    }, 1000);
    showScore();
    showRound();
    infoText(saySomething);
}

// Core gameplay functions (generally speaking, shown in order they are called)

function makeFlashArray(showEachFlash, timeControlCallback) {
    let iterI = 0;
    let last_val = null;
    do {
        // CREDIT Alan Wind, Stack Overflow user for generation of random, non-repeating, value.
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

function showFlash(num, iterJ) { // Creates a single 'flash on-off' instance.
    // CREDIT Stack Overflow user tghw for solution to cycling through colours array.
    // saving current value of x as a different variable prevented x's value being overwritten, which would incorrectly return the same colour as previously shown.
    let y = iterX;
    iterX++;
    setTimeout(function () {
        // color variable cycles through colours to give better player experience.
        let color = colors[y % colors.length];
        let num = initArray[iterJ];
        let element = document.getElementById(num);
        element.classList.add(`cell-glow-${color}`);
        flashSound();
        window.setTimeout(function () {
            element.classList.remove(`cell-glow-${color}`);
        }, 300);
        iterJ++;
    }, level.gap * iterJ);
}

function showEachFlash() { // Creates the full array of flashes for the player to copy.
    initArray.forEach(showFlash);
}

function timeControl() { // If time runs out, the game ends.
    let counter = 5;
    timer = setInterval(function () {
        if (counter > 0) {
            counter--;
        } else {
            endGame();
            clearTimer();
        }
    }, 1000);
}

function clearTimer() { // Reset timer when user has input correct sequence, or when the game has ended.
    clearInterval(timer);
}

function captureUserClicks(clicked_id) { // Capture player input and send it to an array.
    // Re-enable newgame/startGame() event listener on first user click.
    userClicks.push(`game-${clicked_id}`)
    // CREDIT Stack Overflow user technophyle helped me with the solution to capturing user clicks and pushing to array.
    arrayLengthCompare();
}

window.onkeyup = function keyCommands(pressed_id) {
    userPadSound();
    let press = pressed_id.which || pressed_id.keyCode
    switch (press) {
        case 81:
            pressed_id = 0;
            break;
        case 87:
            pressed_id = 1;
            break;
        case 69:
            pressed_id = 2;
            break;
        case 65:
            pressed_id = 3;
            break;
        case 83:
            pressed_id = 4;
            break;
        case 68:
            pressed_id = 5;
            break;
        case 192:
            pressed_id = 6;
            break;
        case 90:
            pressed_id = 7;
            break;
        case 88:
            pressed_id = 8;
            break;
        default:
            pressed_id = null;
    }
    if (pressed_id !== null) {
        userClicks.push(`game-${pressed_id}`);
        simulateClick(pressed_id);
    }
    arrayLengthCompare();
}

function arrayLengthCompare() { // Once the user has clicked the same number of times as there are items in the game-generated array, the two arrays will be compared.
    if (userClicks.length === initArray.length) {
        compareArraysClicks();
        clearTimer();
    }
}

function compareArraysClicks() { // Compare the randomly generated array with the player's inputted array.
    let userArray = userClicks.toString();
    let gameArray = initArray.toString();
    if (gameArray === userArray) {
        levelUp();
    } else {
        endGame();
    }
}

function endGame() { // Game over.
    endCalled = true;
    startBtn.disabled = false;
    updateTopScore();
    // Greys out cells when player loses the game to give immediate game-over indication
    jQuery(function ($) {
        $('.cell').addClass('grey-cells');
    });
    infoText(saySomething);
}

// Level control & reset functions

function levelUp() { // Go to next round.
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

function reduceFlashGap() { // Make space between flashes shorter.
    level.gap -= 50;
    return level.gap;
}

function resetGameArray() { // Clear randomly generated array between rounds.
    initArray = [];
    return initArray;
}

function resetUserClicks(nextRoundCallback) { // Clear player's inputted array between rounds.
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

function userPadSound() {
    userAudio.src = 'assets/audio/user-beep.mp3';
    if (soundsOn == true) {
        userAudio.play();
    }
}

function flashSound() {
    let b = iterA;
    iterA++;
    let sound = sounds[b % sounds.length];
    flashAudio.src = sound;
    if (soundsOn == true) {
        flashAudio.play();
    }
}

function infoText(saySomething) { // Retain <br> in each to maintain the same space between pads on landscape view.
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
    // Loop required to ensure this information is displayed on all viewports.
    for (let k = 0; k < information.length; k++) {
        information[k].innerHTML = saySomething;
    }
}

function simulateClick(pressed_id) { // when player uses key commands, pad 2 is not used, so clicks are simulated on pad 2 with a flash to show which cell has been clicked, for a better player experience.
    let showClick = document.getElementById(pressed_id).classList;
    if (showClick.contains('hard-mode') == true) {
        showClick.add('cell-hard-mode');
        window.setTimeout(function () {
            showClick.remove('cell-hard-mode');
        }, 200);
    } else {
        showClick.add('cell-black');
        window.setTimeout(function () {
            showClick.remove('cell-black');
        }, 200);
    }
}

// Toggle control functions

function soundsToggle() {
    soundsOn = !soundsOn;
}

$('.slider-2').click(function () { // Light theme toggle
    $('body, .container, .container-info, #logo, #newgame, #user-game-container, #game-container, .center-text, .display-box, .instr, .instr-lower, sup, .info-round, .info-score, #ts-text, .footer-links').toggleClass('light-theme');
    $('.number').toggleClass('number-light');
});

$('.slider-3').click(function () { // Hard mode toggle
    $('.cell').toggleClass('hard-mode');
    $('.number').toggleClass('number-hard');
});

// Operating system inference functions

// CREDIT Pierre, Fregante & Paul Rumkin from Stack Overflow website
function iOS() { // Infers whether the player's operating system is iOS or whether they are using desktop safari
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

function disableSounds() { // Disables or enables sound toggle according to boolean result of iOS()
    if (iOS() === true) {
        $('#toDisable').addClass('disableToggle');
    }
}