// elements
const elWrapper = document.querySelector("[data-wrapper]");
const elWordInput = document.querySelector("[data-word-input]");
const elWordText = document.querySelector("[data-word]");
const elScoreText = document.querySelector("[data-score-text]");
const elTimeText = document.querySelector("[data-time-text]");
const elGameOver = document.querySelector("[data-game-over]");

const words = [
  "afzal",
  "olma",
  "yer",
  "vatan",
  "qo'shiq",
  "fikr",
  "kitob",
  "yuz",
  "kiyim",
  "gilam",
  "yelka",
  "stol",
  "koinot",
  "tun",
  "havo",
  "internet",
  "dastur",
  "frontend",
  "navo",
  "yomg'ir",
  "qish",
  "boy",
  "bulut",
  "halokat",
  "mustaqil",
  "ma'naviyat",
  "prezident",
  "o'yin",
  "qora",
  "xalq",
  "ufq",
  "qush",
  "qizil",
  "shafaq",
  "mato",
  "erkak",
  "yurt",
  "o'zbek",
  "video",
  "kontent",
  "telegram",
  "odob",
  "oliy ta'lim",
  "sinf",
  "til",
];

let randomWord;
let timeInterval;
let score = 0;
let time = 60;

function getRandomWord() {
  return words[Math.trunc(Math.random() * words.length)];
}

function fillWord() {
  randomWord = getRandomWord();
  elWordText.textContent = randomWord;
}
fillWord();

function updateScore() {
  score++;
  elScoreText.textContent = score;
}

function updateTime() {
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  } else {
    time--;
    elTimeText.textContent = `${time}s`;
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
  const word = e.target.value;

  if (randomWord === word) {
    updateScore();
    getRandomWord();
    fillWord();
    e.target.value = "";
  }
});

document.addEventListener("click", (evt) => startClick(evt));

function startClick(evt) {
  const el = evt.target.closest("[data-start-btn]");

  if (!el) return;

  time = 60;
  score = 0;

  elGameOver.classList.add("hidden");
  el.nextElementSibling.classList.remove("hidden");
  el.classList.add("hidden");
  startSetInterval();
}
