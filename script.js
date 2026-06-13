// DOM Elements
const display = document.getElementById("display");
const msDisplay = document.getElementById("ms");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const laps = document.getElementById("laps");
const lapCount = document.getElementById("lapCount");

// Variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapNumber = 0;

// Format Time
function formatTime(time){

  let milliseconds = Math.floor(time % 1000);
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)));

  milliseconds = milliseconds.toString().padStart(3,'0');
  seconds = seconds.toString().padStart(2,'0');
  minutes = minutes.toString().padStart(2,'0');
  hours = hours.toString().padStart(2,'0');

  display.innerText = `${hours}:${minutes}:${seconds}`;
  msDisplay.innerText = `.${milliseconds}`;
}

// Start Stopwatch
function startStopwatch(){

  if(!running){

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {

      elapsedTime = Date.now() - startTime;

      formatTime(elapsedTime);

    },10);

    running = true;
  }
}

// Pause Stopwatch
function pauseStopwatch(){

  clearInterval(timerInterval);

  running = false;
}

// Reset Stopwatch
function resetStopwatch(){

  clearInterval(timerInterval);

  running = false;
  elapsedTime = 0;
  lapNumber = 0;

  formatTime(0);

  laps.innerHTML = `
    <div class="empty">
      No lap records yet.
    </div>
  `;

  lapCount.innerText = "0 RECORDS";
}

// Add Lap
function addLap(){

  if(elapsedTime === 0) return;

  const empty = document.querySelector(".empty");

  if(empty){
    empty.remove();
  }

  lapNumber++;

  const lap = document.createElement("div");

  lap.classList.add("lap-item");

  lap.innerHTML = `
    <span>Lap ${lapNumber}</span>
    <span>${display.innerText}${msDisplay.innerText}</span>
  `;

  laps.prepend(lap);

  lapCount.innerText = `${lapNumber} RECORDS`;
}

// Event Listeners
startBtn.addEventListener("click", startStopwatch);

pauseBtn.addEventListener("click", pauseStopwatch);

resetBtn.addEventListener("click", resetStopwatch);

lapBtn.addEventListener("click", addLap);

// Initial Time
formatTime(0);