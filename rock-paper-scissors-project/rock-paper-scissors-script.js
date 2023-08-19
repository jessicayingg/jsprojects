// EVENT LISTENERS FOR BUTTONS
document.querySelector('.js-rock')
    .addEventListener('click', () => {
        findGameResult('rock');
    });

document.querySelector('.js-paper')
    .addEventListener('click', () => {
        findGameResult('paper');
    });

document.querySelector('.js-scissors')
    .addEventListener('click', () => {
        findGameResult('scissors');
    });

document.querySelector('.js-reset')
    .addEventListener('click', () => {
        resetScore();
    });

document.querySelector('.js-autoplay')
    .addEventListener('click', () => {
        autoPlay();
    });

// EVENT LISTENER FOR THE BODY (FOR TYPING)
// adding a parameter to the function, the parameter being 'event',
// will allow the keyEvent to be passed into there
document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') {
        findGameResult('rock');
    }
    else if(event.key === 'p') {
        findGameResult('paper');
    }
    else if(event.key === 's') {
        findGameResult('scissors');
    }
    else if(event.key === 'a') {
        autoPlay();
    }
    else if(event.key === 'Escape' || event.key === 'Backspace') {
        resetScore();
    }
});


// AT THE BEGINNING OF THE GAME WHEN IT IS OPENED
// const score and document.querySelector

// Getting saved score
// Making score object, grabbing it from local storage
const score = JSON.parse(localStorage.getItem('score'));

// Setting the paragraph elements on the page to show score
updateScore();

// This method finds the CPU's random move
function calCPUMove() {
    let cpuNum = 0;

    cpuNum = Math.random();

    if(cpuNum > 0.33 && cpuNum <= 0.66) {
        return 'paper';
    }
    else if(cpuNum < 0.33) {
        return 'rock';
    }
    else {
        return 'scissors';
    }
}

// This method finds if the player wins/loses/ties the game
// Parameters: the player's move as a string
function findGameResult(playerMove) {
    const cpuMove = calCPUMove();
    let result = '';
    
    if(playerMove === 'rock') {
        if(cpuMove === 'rock') {
            result = 'tie';
        }
        else if(cpuMove === 'paper') {
            result = 'lose';
        }
        else {
            result = 'win';
        }
    }
    else if(playerMove === 'paper')
    {
        if(cpuMove === 'rock') {
            result = 'win';
        }
        else if(cpuMove === 'paper') {
            result = 'tie';
        }
        else {
            result = 'lose';
        }
    }
    else {
        if(cpuMove === 'rock') {
            result = 'lose';
        }
        else if(cpuMove === 'paper') {
            result = 'win';
        }
        else {
            result = 'tie';
        }
    }

    // Adding score counter
    if(result === 'win') {
        score.wins += 1;
    }
    else if(result === 'lose') {
        score.losses += 1;
    }
    else {
        score.ties += 1;
    }

    // Saving score into  local storage
    localStorage.setItem('score', JSON.stringify(score));

    // Updating the score on the page
    updateScore();

    document.querySelector('.js-result')
        .innerHTML = `You ${result}!`;

    // Doing the moves
    document.querySelector('.js-moves')
        .innerHTML = `You 
            <img src="images/${playerMove}-emoji.png" class="move-icon"> 
            <img src="images/${cpuMove}-emoji.png" class="move-icon"> 
            Computer`;

}


// Updating score
function updateScore() {
    
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

}

// Resetting score
function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.setItem('score', JSON.stringify(score));
    updateScore();
}

// boolean for autoplay
let isAutoPlay = false;

let intervalID;

// This is for the autoplay button
function autoPlay() {
    
    if(!isAutoPlay) {
        // Wait 1 second between each play
        // setInterval returns an interval ID, you can use that to stop the setInterval
        intervalID = setInterval(() => {

            // Need this for the playerMove variable up there
            const playerMove = calCPUMove();

            findGameResult(playerMove);
        }, 1000);

        isAutoPlay = true;

        document.querySelector('.js-autoplay').innerHTML = 'AutoPlaying';
    }
    else {
        // Using this, interval is stopped
        clearInterval(intervalID);

        isAutoPlay = false;

        document.querySelector('.js-autoplay').innerHTML = 'AutoPlay';
    }
}