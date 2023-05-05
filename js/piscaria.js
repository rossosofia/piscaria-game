// Create global variable
let lives;
let points;
let gameDuration;
let randomPosition = generateRandomNumber(7);
let mySound = document.querySelector("#welcomesound");

window.addEventListener("load", start);

function start() {
    console.log ("start");
    showTitle();
}

// ---- FUNCTION CHANGING IMAGES FOR LIVES, POINTS and HEAD ---
function scoreWeightCount() {
    document.querySelector("#score_weight").classList.value="";
    document.querySelector("#score_weight").classList.add("weight"+points);
}

function livesLemonsImg() {
    console.log("livesLemonsImg");
    document.querySelector("#life_lemons").classList.value="";
    document.querySelector("#life_lemons").classList.add("lives"+lives);
}

function headWrong() {
    console.log ("headWrong");
    document.querySelector("#head2").classList.add("hidden");
    document.querySelector("#head2").classList.remove("floating");
    document.querySelector("#head_wrong").classList.remove("hidden");
    document.querySelector("#head_wrong").classList.add("floating");
}

function restartHead() {
    document.querySelector("#head_wrong").classList.value="";
    document.querySelector("#head_wrong").classList.add("hidden");
    document.querySelector("#head2").classList.remove("hidden");
    document.querySelector("#head2").classList.add("floating");
}





// ---- FUNCTION HIDE ALL SCREENS ----
function hideAllScreens() {
    document.querySelector("#title_screen").classList.add("hidden");
    document.querySelector("#instructions_screen").classList.add("hidden");
    document.querySelector("#win_screen").classList.add("hidden");
    document.querySelector("#lose_screen").classList.add("hidden");
}


// GENERATE RANDOM NUMBER FOR NEW POSITION

function generateRandomNumber(num) {
    return Math.floor(Math.random()* num) + 1;
}


// ---- TIME FUNCTIONS ----

function showTimer() {
    gameDuration = gameDuration - 1;
    // then call the countTime function
    countTime();
}

function countTime() {
    // gameDuration--;
    if (gameDuration > 1) {
        // if there is still time left, wait a second and call the showTimer function again
        setTimeout(showTimer, 1000);
    } else {
        stopGame();
    }
}

// --- SOUNDS FUNCTIONS ---
function playMySound() {
    mySound.play();
    mySound.volume = 0.8;
    mySound.loop = true;}

function collectGood() {
        document.querySelector("#collect_good").play();
        document.querySelector("#collect_good").volume = 1;
}

function collectBad() {
    document.querySelector("#collect_bad").play();
    document.querySelector("#collect_bad").volume = 1;
}

function playMySoundGame() {
    mySound.play();
    mySound.volume = 0.2;
    mySound.loop = true;}




// ---- WELCOME SCREEN ----

function showTitle() {
    console.log ("showTitle");
    playMySound();
    hideAllScreens();
    document.querySelector("#title_screen").classList.remove("hidden");
    // Start music
    // Sound control button 
    document.querySelector("#play_button").addEventListener("click", startGame);
    document.querySelector("#instruction_button").addEventListener("click", showInstructions);
} 


// ---- USER CLICKS INSTRUCTION BUTTON----

function showInstructions() {
    playMySound();
    console.log ("showInstructions");
    document.querySelector("#instructions_screen").classList.remove("hidden");
    document.querySelector("#back_button").addEventListener("click", showTitle);
    document.querySelector("#play_button_2").addEventListener("click", startGame);
    //  play music
    // ---> user clicks start button
    // ---> user clicks title button
}


// ---- USER CLICKS PLAY BUTTON- ---

function startGame(){
    console.log("startGame");
    hideAllScreens();
    playMySoundGame();
    // initialize points. lives and time
    lives = 3;
    gameDuration = 45;
    points = 0;
    showTimer();

    // start UI elements
    document.querySelector("#time_sprite").classList.add("shrink");
    document.querySelector("#score_weight").classList.add("weight"+points);
    document.querySelector("#life_lemons").classList.add("lives"+lives);

    // good fish +1
    document.querySelector("#fish1_container").classList.add("fade", "pos1");
    document.querySelector("#fish1_container").addEventListener("click", freshHit);
    document.querySelector("#fish1_container").addEventListener("animationiteration", restartFresh);
    // good shrimp +1
    document.querySelector("#shrimp_fresh_container").classList.add("fade", "pos2");
    document.querySelector("#shrimp_fresh_container").addEventListener("click", freshShrimpHit);
    document.querySelector("#shrimp_fresh_container").addEventListener("animationiteration", restartFreshShrimp);
    // frozen fish -1 point
    document.querySelector("#fish_frozen_container").classList.add("fade", "pos3");
    document.querySelector("#fish_frozen_container").addEventListener("click", frozenHit);
    document.querySelector("#fish_frozen_container").addEventListener("animationiteration", restartFrozen);
    // frozen shrimp-1 point
    document.querySelector("#shrimp_frozen_container").classList.add("fade", "pos4");
    document.querySelector("#shrimp_frozen_container").addEventListener("click", frozenShrimpHit);
    document.querySelector("#shrimp_frozen_container").addEventListener("animationiteration", restartFrozenShrimp);
    // old fish -1 live
    document.querySelector("#fish_old_container").classList.add("fade", "pos5");
    document.querySelector("#fish_old_container").addEventListener("click", oldHit);
    document.querySelector("#fish_old_container").addEventListener("animationiteration", restartOld);
    // old shrimp -1 live
    document.querySelector("#shrimp_old_container").classList.add("fade", "pos6");
    document.querySelector("#shrimp_old_container").addEventListener("click", oldShrimpHit);
    document.querySelector("#shrimp_old_container").addEventListener("animationiteration", restartOldShrimp);
}



// ----- FRESH FISH hit & restart ----- 

function freshHit() {
    collectGood();
    // note to myself: THIS is the element that activated the EventListener
    this.classList.add("stop"); 
    // note to myself: THIS is then referred to the CONTAINER and I can't use THIS to refer to the SPRITE. With this.firstElementChild I'm grabbing the first child of the element THIS.
    this.firstElementChild.classList.add("rotate");
    // get 1 point
    points = points + 1;
    console.log(points);
    document.querySelector("#current_score").textContent = points;
    scoreWeightCount();
    if(points==15){
        stopGame();
    }
    // restart when rotation completes
    this.addEventListener("animationend", restartFresh);
}

function restartFresh () {
    document.querySelector("#fish1_container").classList.value="";
    document.querySelector("#fish1_sprite").classList.value="";
    document.querySelector("#fish1_sprite").removeEventListener("animationend", restartFresh)
    document.querySelector("#fish1_container").offsetHeight;
    let randomPosition = generateRandomNumber(6);
    document.querySelector("#fish1_container").classList.add("fade", "pos"+randomPosition);
}



// ----- FROZEN FISH hit & restart ----- 

function frozenHit() {
    headWrong();
    collectBad();
    this.classList.add("stop");
    this.firstElementChild.classList.add("shaking");
    scoreWeightCount();
    // restart frozen when rotation completes
    this.firstElementChild.addEventListener("animationend", restartFrozen)
}

function restartFrozen () {
    document.querySelector("#fish_frozen_container").classList.value="";
    document.querySelector("#fish_frozen_sprite").classList.value="";
    document.querySelector("#fish_frozen_sprite").removeEventListener("animationend", restartFrozen);
    document.querySelector("#fish_frozen_container").offsetHeight;
    restartHead();
    let randomPosition = generateRandomNumber(6);
    document.querySelector("#fish_frozen_container").classList.add("fade", "pos"+randomPosition);
}



// ----- OLD FISH hit & restart ----- 

function oldHit() {
    headWrong();
    collectBad();
    this.classList.add("stop");
    this.firstElementChild.classList.add("shaking");
    // lose 1 life
    lives = lives - 1;
    console.log(lives);
    document.querySelector("#current_lives").textContent = lives;
    livesLemonsImg();
    if(lives==0){
        stopGame();
    }
    // restart old when rotation completes
    this.firstElementChild.addEventListener("animationend", restartOld)
}

function restartOld () {
    document.querySelector("#fish_old_container").classList.value="";
    document.querySelector("#fish_old_sprite").classList.value="";
    document.querySelector("#fish_old_sprite").removeEventListener("animationend", restartOld)
    document.querySelector("#fish_old_container").offsetHeight;
    restartHead();
    let randomPosition = generateRandomNumber(6);
    document.querySelector("#fish_old_container").classList.add("fade", "pos"+randomPosition);
}



// ----- FRESH SHRIMP hit & restart ----- 

function freshShrimpHit() {
    collectGood();
    this.classList.add("stop");
    this.firstElementChild.classList.add("rotate");
    // get 1 point
    points = points + 1;
    console.log(points);
    document.querySelector("#current_score").textContent = points;
    scoreWeightCount();
    if(points==15){
        stopGame();
    }
    // restart fresh when rotation completes
    this.firstElementChild.addEventListener("animationend", restartFreshShrimp)
}

function restartFreshShrimp () {
    document.querySelector("#shrimp_fresh_container").classList.value="";
    document.querySelector("#shrimp_fresh_sprite").classList.value="";
    document.querySelector("#shrimp_fresh_sprite").removeEventListener("animationend", restartFreshShrimp)
    document.querySelector("#shrimp_fresh_container").offsetHeight;
    let randomPosition = generateRandomNumber(6);
    document.querySelector("#shrimp_fresh_container").classList.add("fade", "pos"+randomPosition);
}




// ----- FROZEN SHRIMP hit & restart ----- 

function frozenShrimpHit() {
    headWrong();
    collectBad();
    this.classList.add("stop");
    this.firstElementChild.classList.add("shaking");
    this.firstElementChild.addEventListener("animationend", restartFrozenShrimp)
}

function restartFrozenShrimp () {
    document.querySelector("#shrimp_frozen_container").classList.value="";
    document.querySelector("#shrimp_frozen_sprite").classList.value="";
    document.querySelector("#shrimp_frozen_sprite").removeEventListener("animationend", restartFrozenShrimp)
    document.querySelector("#shrimp_frozen_container").offsetHeight;
    restartHead();
    let randomPosition = generateRandomNumber(6);
    document.querySelector("#shrimp_frozen_container").classList.add("fade", "pos"+randomPosition);
}



// ----- OLD SHRIMP hit & restart ----- 

function oldShrimpHit() {
    headWrong();
    collectBad();
    this.classList.add("stop");
    this.firstElementChild.classList.add("shaking");
    // lose 1 life
    lives = lives - 1;
    livesLemonsImg();
    console.log(lives);
    document.querySelector("#current_lives").textContent = lives;
    if(lives==0){
        stopGame();
    }
    // restart old when rotation completes
    this.firstElementChild.addEventListener("animationend", restartOldShrimp)
}

function restartOldShrimp () {
    document.querySelector("#shrimp_old_container").classList.value="";
    document.querySelector("#shrimp_old_sprite").classList.value="";
    document.querySelector("#shrimp_old_sprite").removeEventListener("animationend", restartOldShrimp)
    document.querySelector("#shrimp_old_container").offsetHeight;
    restartHead();
    let randomPosition = generateRandomNumber(6);
    document.querySelector("#shrimp_old_container").classList.add("fade", "pos"+randomPosition);
}



// ---- STOP GAME, WIN AND LOSE ----

function stopGame() {
    console.log('stopGame');
    // remove all animations
    document.querySelector("#fish1_container").classList.value="";
    document.querySelector("#fish_old_container").classList.value="";
    document.querySelector("#fish_frozen_container").classList.value="";
    document.querySelector("#shrimp_fresh_container").classList.value="";
    document.querySelector("#shrimp_frozen_container").classList.value="";
    document.querySelector("#shrimp_old_container").classList.value="";

    document.querySelector("#fish1_container").removeEventListener("click", freshHit);
    document.querySelector("#fish_old_container").removeEventListener("click", oldHit);
    document.querySelector("#fish_frozen_container").removeEventListener("click", frozenHit);
    document.querySelector("#shrimp_fresh_container").removeEventListener("click", freshShrimpHit);
    document.querySelector("#shrimp_frozen_container").removeEventListener("click", frozenShrimpHit);
    document.querySelector("#shrimp_old_container").removeEventListener("click", oldShrimpHit);

    document.querySelector("#fish1_container").removeEventListener("animationiteration", restartFresh);
    document.querySelector("#fish_old_container").removeEventListener("animationiteration", restartOld);
    document.querySelector("#fish_frozen_container").removeEventListener("animationiteration", restartFrozen);
    document.querySelector("#shrimp_fresh_container").removeEventListener("animationiteration", restartFreshShrimp);
    document.querySelector("#shrimp_frozen_container").removeEventListener("animationiteration", restartFrozenShrimp);
    document.querySelector("#shrimp_old_container").removeEventListener("animationiteration", restartOldShrimp);

    // win or lose
    if(points == 15 && lives > 0) {
    winning();
    } else {
     losing();
    }
}

function winning() {
    console.log(`winning`);
    document.querySelector("#time_sprite").classList.remove("shrink");
    document.querySelector("#win_screen").classList.remove("hidden");
    document.querySelector("#score_weight").classList.value="";
    document.querySelector("#life_lemons").classList.value="";
    document.querySelector("#play_again_button1").addEventListener("click", startGame);
}

function losing() {
    console.log(`losing`);
    document.querySelector("#time_sprite").classList.remove("shrink");
    document.querySelector("#lose_screen").classList.remove("hidden");
    document.querySelector("#score_weight").classList.value="";
    document.querySelector("#life_lemons").classList.value="";
    document.querySelector("#play_again_button2").addEventListener("click", startGame);
}
