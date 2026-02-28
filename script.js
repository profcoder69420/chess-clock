let leftTime = 300;
let rightTime = 300;
let increment = 0;
let activePlayer = "left";
let isPaused = true;
let interval = null;

function showClock() {
  clockView.classList.add("active");
  settingsView.classList.remove("active");
}

function showSettings() {
  settingsView.classList.add("active");
  clockView.classList.remove("active");
}

function formatTime(sec) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updateDisplays() {
  leftTimer.textContent = formatTime(leftTime);
  rightTimer.textContent = formatTime(rightTime);
}

function updateActive() {
  left.classList.remove("active");
  right.classList.remove("active");
  if (activePlayer)
    document.getElementById(activePlayer).classList.add("active");
}

function setActive(player) {
  if (!isPaused) return;
  activePlayer = player;
  updateActive();
}

function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (!isPaused) {
      if (activePlayer === "left") {
        leftTime = Math.max(0, leftTime - 1);
        if (leftTime === 0) alert("Left time out!");
      } else {
        rightTime = Math.max(0, rightTime - 1);
        if (rightTime === 0) alert("Right time out!");
      }
      updateDisplays();
    }
  }, 1000);
}

function switchTurn() {
  if (isPaused) return;
  if (activePlayer === "left") {
    leftTime += increment;
    activePlayer = "right";
  } else {
    rightTime += increment;
    activePlayer = "left";
  }
  updateDisplays();
  updateActive();
}

function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(interval);
    showSettings();
  } else {
    showClock();
    startTimer();
  }
}

function applySettings() {
  leftTime = (+leftMin.value || 0) * 60 + (+leftSec.value || 0);
  rightTime = (+rightMin.value || 0) * 60 + (+rightSec.value || 0);
  increment = +document.getElementById("increment").value || 0;

  document.getElementById("resumeBtn").disabled = false;

  updateDisplays();
  updateActive();
}

function resumeGame() {
  if (document.getElementById("resumeBtn").disabled) return;

  if (!activePlayer) activePlayer = "left";
  isPaused = false;
  showClock();
  startTimer();
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") switchTurn();
  if (e.key.toLowerCase() === "y") togglePause();
});

updateDisplays();
updateActive();
showSettings();
