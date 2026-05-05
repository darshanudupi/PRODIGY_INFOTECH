let ms = 0, sec = 0, min = 0, hr = 0;
let timer = null;
let laps = [];

// Format time
function format() {
  return `${String(hr).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}:${String(ms).padStart(3,'0')}`;
}

// Update display
function updateDisplay() {
  document.getElementById("display").innerText = format();
}

// Start
function start() {
  if (timer) return;

  timer = setInterval(() => {
    ms += 10;

    if (ms === 1000) {
      ms = 0;
      sec++;
    }

    if (sec === 60) {
      sec = 0;
      min++;
    }

    if (min === 60) {
      min = 0;
      hr++;
    }

    updateDisplay();
  }, 10);
}

// Pause
function pause() {
  clearInterval(timer);
  timer = null;
}

// Reset
function reset() {
  pause();
  ms = sec = min = hr = 0;
  laps = [];
  updateDisplay();
  document.getElementById("laps").innerHTML = "";
}

// Lap
function lap() {
  let time = format();
  laps.push(time);

  let li = document.createElement("li");
  li.innerText = time;
  document.getElementById("laps").appendChild(li);

  highlightLaps();
}

// Highlight fastest & slowest
function highlightLaps() {
  let lapElements = document.querySelectorAll("#laps li");

  lapElements.forEach(li => li.classList.remove("fastest", "slowest"));

  if (laps.length < 2) return;

  let times = laps.map(t => {
    let [h,m,s,ms] = t.split(":").map(Number);
    return h*3600000 + m*60000 + s*1000 + ms;
  });

  let minIndex = times.indexOf(Math.min(...times));
  let maxIndex = times.indexOf(Math.max(...times));

  lapElements[minIndex].classList.add("fastest");
  lapElements[maxIndex].classList.add("slowest");
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "s") start();
  if (e.key === "p") pause();
  if (e.key === "r") reset();
  if (e.key === "l") lap();
});