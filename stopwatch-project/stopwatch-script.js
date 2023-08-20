// VARIABLES

// For HTML elmeents that will be altered
const startStopButton = document.querySelector('.js-start-stop');
const resetButton = document.querySelector('.js-reset');
const stopwatchDisplay = document.querySelector('.js-display');
// const timesDisplay = document.querySelector('.times-container');

let timerIsStarted = false;

// To allow the stoppage of intervals that will be started
let timerIntervalID = 0;
let displayIntervalID = 0;

// Current exact times that are used to calculate the time on the stopwatch
let timerStartTime;
let curEndTime;

// For space bar press
let startTime;
let endTime;
let elapsedTime = 0;
let spacePressed = false;

// Turning colour from red to green - part of space bar press
let displayReadyCounter = 0;

// For storing times
let timesList = [];
let fastestSingle = Number.MAX_VALUE;

// For averages
let curAo5List = [];
let curAo5;

// EVENT LISTENERS

// For start/stop button - click
startStopButton.addEventListener('click', () => {
    startStopTimer();
});

// For reset button - click
resetButton.addEventListener('click', () => {
    resetTimer();
});

// For general keydowns
document.body.addEventListener('keydown', (event) => {
    // Spacebar
    if(event.key === ' ') {
    
        if(!timerIsStarted) {
            // If this is the first instance of spacebar being pressed
                // If the spacebar is held down, new instances are recorded at set intervals
            if(!spacePressed) {
                // Finding the exact moment spacebar was first pressed down
                startTime = new Date().getTime();

                // Starting the red text display - not ready for timer to start
                stopwatchDisplay.classList.add('not-ready-display');

                // Counting for when the timer becomes ready to start
                readyCounter();

                // Setting space to pressed
                spacePressed = true;
            }
        }
        else {
            // Stop the timer and record the time
            startStopTimer();
            recordTime();
        }
    }
    // Backspace/delete or enter
    else if(event.key === 'Backspace' || event.key === 'Enter') {
        // Reset timer
        resetTimer();
    }
});

// For general key ups
document.body.addEventListener('keyup', (event) => {
    // Spacebar
    if(event.key === ' ') {
        // Finding how long spacebar was held down for
        endTime = new Date().getTime();
        elapsedTime = endTime - startTime;

        // If it is enough, then the timer is allowed to start
        if(elapsedTime >= 500 && spacePressed) {
            startStopTimer();
            stopwatchDisplay.classList.remove('ready-display');

        }
        // If not, don't do anything and put the timer back to its original colour
        else {
            resetReadyness();
        }

        spacePressed = false;

    }
});

// Starting and stopping timer
function startStopTimer() {
    
    // To start the timer
    if(!timerIsStarted) {
        // Changing text in start/stop button
        startStopButton.innerHTML = 'Stop';

        timerIsStarted = true;

        // Recording when the timer was started
        timerStartTime = new Date().getTime();

        // Starting the timer count
        countMillis();
    }
    // To stop the timer
    else {
        // Changing the text in start/stop button
        startStopButton.innerHTML = 'Start';
        timerIsStarted = false;

        // Clearing the timer counting interval to stop it
        clearInterval(timerIntervalID);
    }
}

// Resetting time
function resetTimer() {
    // If the timer is running, stop it
    if(timerIsStarted) {
        startStopTimer();
    }

    // Setting time to 0.000
    curEndTime = timerStartTime;
    displayTime();
}

// Doing the millisecond counting
function countMillis() {
    // Refreshes every 10 ms
    timerIntervalID = setInterval(() => {

        // Finding the current time
        curEndTime = new Date().getTime();

        displayTime();

    }, 10);
}

// Displaying the time
function displayTime() {

    // The elapsed time between current and the starting,
    // converted to seconds and put to 3 decimal places
    let curTime = ((curEndTime - timerStartTime)/1000).toFixed(3);

    // Updating the display's HTML
    stopwatchDisplay.innerHTML = curTime;
}

// Counting for seeing if the timer is ready
function readyCounter() {
    // Counts every 10 ms
    displayIntervalID = setInterval(() => {

        if(displayReadyCounter < 500) {
            displayReadyCounter += 10;
        }
        else {
            // After 500 ms, the display turns from red to green and the interval is stopped
            stopwatchDisplay.classList.remove('not-ready-display');
            stopwatchDisplay.classList.add('ready-display');
            clearInterval(displayIntervalID);
            displayReadyCounter = 0;
        }

    }, 10);
}

function resetReadyness() {
    // Resets the display and any active intervals
    spacePressed = false;
    displayReadyCounter = 0;
    stopwatchDisplay.classList.remove('not-ready-display');
    stopwatchDisplay.classList.remove('ready-display');
    clearInterval(displayIntervalID);
}

// Recording the time into total time list
function recordTime() {
    
    // Adding the current time to total time array
    const curTime = Number(stopwatchDisplay.innerHTML);
    
    timesList.push(curTime);

    // Finding the fastest single
    if(curTime < fastestSingle) {
        fastestSingle = curTime;
    }

    // Adding to ao5
    if(curAo5List.length < 5) {
        // Just adding if less than 5 solves recorded
        curAo5List.push(curTime);
    }
    else {
        // Delete first solve, add on the new one
        curAo5List.splice(0, 1);
        curAo5List.push(curTime);
    }

    console.log(timesList);
    console.log('Best single: ' + fastestSingle);
    console.log(curAo5List);

    findAverage();
    addTimes();
}

// To find average of 5
function findAverage() {
    let total = 0;
    
    if(curAo5List.length >= 5) {
        for(let i = 0; i < 5; i++) {
            total += curAo5List[i];
        }
        curAo5 = (total/5).toFixed(2);
    }
}

function addTimes() {
   let HTMLToAdd = '';

    timesList.forEach((time, index) => {
        if(curAo5List.length < 5) {
            HTMLToAdd = `
            <p class="num">${index+1}</p>
            <p class="time">${time.toFixed(3)}</p>
            <p class="average">-</p>
        ` + HTMLToAdd;
        }
        else {
            HTMLToAdd = `
            <p class="num">${index+1}</p>
            <p class="time">${time.toFixed(3)}</p>
            <p class="average">${curAo5}</p>
        ` + HTMLToAdd;
        }
    });

    //timesDisplay.innerHTML = HTMLToAdd;
}