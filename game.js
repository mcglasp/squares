let initArray = [];
let i = 0;
let j = 0;
let score = 0;
let userClicks = [];
let k;
let l;
let flashArray = [500, 600, 700, 800, 900, 1000];
let x = 0;
let colors = ['blue', 'pink', 'green'];



let timesUp = false

let level = {
    dots: 2,
    round: 0,
}


function speed() {
    let k = Math.floor(Math.random() * 6)
    console.log(flashArray[k])
    return flashArray[k];
}

function instructions() {
    document.getElementById("instr-overlay").style.display = "block";
}





function endGame() {
    alert(`You lost :( Never mind, at least you scored ${score}`)
}

function showScore() {
    let scorebox = document.getElementById("score");
    scorebox.innerHTML = score;
}

function showRound() {
    let roundbox = document.getElementById("round");
    roundbox.innerHTML = level.round;
}

// function first() {
//     level.dots = 2;
//     level.speed = 1000;
//     // return level.dots + level.speed
// }

function levelUp() {
    score = score += 5
    level.round++
    if (level.round % 3 === 0) {
        level.dots++;
    }
    resetGameArray();
    resetUserClicks(nextRound);

    return level.dots + level.round + score
}

function resetGameArray() {
    initArray = [];
    return initArray;
}

function resetUserClicks(callback) {
    userClicks = [];
    // nextRound()
    callback();
    return userClicks;
}



// let initArray = [];

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
    console.log(`${initArray}`);
    return initArray;
}







function showCircle(num, j) {
    let k;
    let y = x
    x++;
    setTimeout(function () {
        let color = colors[y % colors.length];
        let num = initArray[j];
        let element = document.getElementById(num)
        element.classList.add(`cell-glow-${color}`)
        window.setTimeout(function () {
            element.classList.remove(`cell-glow-${color}`)
        }, 300);
        j++;
    }, speed() * j);

};

function showEachCircle(captureUserClicks) {
    initArray.forEach(showCircle);
}


function captureUserClicks(clicked_id, callback) {
    userClicks.push(`game-${clicked_id}`);

    if (userClicks.length === initArray.length) {
        compareArraysClicks();
    }
}

function compareArraysClicks() {
    console.log(userClicks)
    let userArray = userClicks.toString();
    let gameArray = initArray.toString();
    if (gameArray === userArray) {
        // updateScore(level.dots, level.round, score);
        levelUp()
    } else if (timesUp == true) {
        endGame()
    } else {
        //   updateScore(level.dots, level.round, score);
        endGame();
    }
}



// (userClicks.length === initArray.length && gameArray !== userArray) 

function startGame() {
    const firstLevel = makeCircleArray(level)
    showEachCircle(firstLevel, captureUserClicks)
}

function nextRound() {
    // changeColor(dots);
    setTimeout(function () {
        const whichLevel = makeCircleArray(level);
        showEachCircle(whichLevel, captureUserClicks)
    }
        , 1000)
        showScore();
        showRound();
};

let p = 10;
let q = 2;

function specTest() {
 return p + q
}

// credit W3

var txt = ["match the sequence","...","on the keypad below"];
var letter = 0;
var inst = 0;
var lspeed = 150;
function typeWriter() { 
    if (inst < txt.length) {
  if (letter < txt[inst].length) {
    document.getElementById("instr-text").innerHTML += txt[inst].charAt(letter);
    letter++;
    setTimeout(typeWriter, lspeed);
    }  
} inst++;
}

function lines() {
    txt.forEach(typeWriter);
    inst++;
}


typeWriter()
// lines()

