// Light theme toggle

$('.slider').click(function() {
    $("body, .container, .container-info, #logo, #newgame, #user-game-container, #game-container, .center-text, .display-box, #info-text, sup, .info-round, .info-score").toggleClass("light-theme");
});

// Hard mode toggle - adds and removes the .hard-mode CSS class, which increases game difficulty by removing cell outlines.

$('.slider-2').click(function() {
    $(".cell, .number").toggleClass("hard-mode");
}); 