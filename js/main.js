// elements
const elWrapper = document.querySelector("[data-wrapper]");
const elGameOver = document.querySelector("[data-game-over]");
const elInstruction = document.querySelector("[data-instruction]");

const elWordInput = document.querySelector("[data-word-input]");
const elWordText = document.querySelector("[data-word]");
const elScoreText = document.querySelector("[data-score-text]");
const elTimeText = document.querySelector("[data-time-text]");

let randomWord;
let newWords;
let timeInterval;
let score = 0;
let time = 60;

newWords = [...words];

function getRandomWord() {
  return newWords[Math.trunc(Math.random() * newWords.length)];
}

function fillWord() {
  randomWord = getRandomWord();
  elWordText.textContent = randomWord;
  elWordText.title = randomWord;
}
fillWord();

function updateScore() {
  score++;
  elScoreText.textContent = score;
  elScoreText.title = score;
}

function updateTime() {
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  } else {
    time--;
    elTimeText.textContent = `${time >= 10 ? "" : "0"}${time}s`;
    elTimeText.title = `${time >= 10 ? "" : "0"}${time}s`;
  }
}

function gameOver() {
  elTimeText.textContent = "60s";
  elScoreText.textContent = 0;
  elWordInput.value = "";

  elGameOver.classList.remove("hidden");
  elGameOver.querySelector("[data-final-score-text]").textContent = score;

  document.querySelector("[data-start-btn]").classList.remove("hidden");
  document.querySelector("[data-card]").classList.add("hidden");
  elWrapper.classList.add("wrapper--column");
}

function startSetInterval() {
  return (timeInterval = setInterval(updateTime, 1000));
}

// word evt
elWordInput.addEventListener("input", (e) => {
  let word = e.target.value.toLowerCase().trim();
  let otherVariant;

  if (word.includes("ʻ") || word.includes("ʼ")) {
    otherVariant = word.includes("ʼ") ? word.indexOf("ʼ") : word.indexOf("ʻ");
    word = word.replace(word[otherVariant], "'");
  }

  if (randomWord === word) {
    let index = newWords.findIndex((word) => word === randomWord);
    newWords.splice(index, 1);

    updateScore();
    getRandomWord();
    fillWord();
    e.target.value = "";
  }
});

// Start and restart
function gameStart() {
  time = 60;
  score = 0;
  newWords = [...words];

  elGameOver.classList.add("hidden");
  elInstruction.classList.add("hidden");
  startSetInterval();
  elWordInput.focus();
}

function onRestartClick(evt) {
  const el = evt.target.closest("[data-restart-btn]");
  if (!el) return;

  elTimeText.textContent = "60s";
  elScoreText.textContent = 0;
  elWordInput.value = "";
  clearInterval(timeInterval);
  fillWord();
  gameStart();
}

function onStartClick(evt) {
  const el = evt.target.closest("[data-start-btn]");
  if (!el) return;

  el.classList.add("hidden");
  el.nextElementSibling.classList.remove("hidden");
  gameStart();
}

document.addEventListener("click", (evt) => {
  onRestartClick(evt);
  onStartClick(evt);
});
