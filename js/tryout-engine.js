// ===== CONFIG TRY OUT =====
const TOTAL_TIME = 195 * 60; // 195 menit
let timeLeft = localStorage.getItem("tryoutTime")
  ? parseInt(localStorage.getItem("tryoutTime"))
  : TOTAL_TIME;

// ===== DATA SOAL DUMMY =====
const questions = Array.from({ length: 100 }, (_, i) => ({
  question: `Soal Try Out nomor ${i + 1}`,
  options: ["A", "B", "C", "D"],
  answer: Math.floor(Math.random() * 4)
}));

let current = 0;
let answers = JSON.parse(localStorage.getItem("tryoutAnswers")) || {};
let flags = JSON.parse(localStorage.getItem("tryoutFlags")) || {};
let submitted = localStorage.getItem("tryoutSubmitted") === "true";

// ===== INIT SIDEBAR =====
const sidebar = document.getElementById("sidebar");
questions.forEach((_, i) => {
  const div = document.createElement("div");
  div.textContent = i + 1;
  div.className = "q-number";
  div.onclick = () => goTo(i);
  sidebar.appendChild(div);
});

render();
startTimer();

// ===== TIMER =====
function startTimer() {
  if (submitted) return;

  setInterval(() => {
    if (timeLeft <= 0) {
      submitTryout(true);
      return;
    }
    timeLeft--;
    localStorage.setItem("tryoutTime", timeLeft);
    updateTimer();
  }, 1000);
}

function updateTimer() {
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  document.getElementById("timer").textContent =
    `${min}:${sec.toString().padStart(2, "0")}`;
}

// ===== RENDER =====
function render() {
  document.getElementById("questionTitle").textContent =
    questions[current].question;

  const optDiv = document.getElementById("options");
  optDiv.innerHTML = "";

  questions[current].options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="opt" ${answers[current] === i ? "checked" : ""}>
      ${opt}
    `;
    label.querySelector("input").onclick = () => {
      answers[current] = i;
      localStorage.setItem("tryoutAnswers", JSON.stringify(answers));
    };
    optDiv.appendChild(label);
  });

  updateSidebar();
}

function updateSidebar() {
  document.querySelectorAll(".q-number").forEach((el, i) => {
    el.className = "q-number";
    if (i === current) el.classList.add("active");
    if (flags[i]) el.classList.add("flagged");

    if (submitted) {
      el.classList.add(
        answers[i] === questions[i].answer ? "correct" : "wrong"
      );
    }
  });
}

// ===== NAV =====
function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    render();
  }
}
function prevQuestion() {
  if (current > 0) {
    current--;
    render();
  }
}
function goTo(i) {
  current = i;
  render();
}
function toggleFlag() {
  flags[current] = !flags[current];
  localStorage.setItem("tryoutFlags", JSON.stringify(flags));
  updateSidebar();
}

// ===== SUBMIT =====
function submitTryout(auto = false) {
  if (!auto && !confirm("Yakin submit Try Out?")) return;

  submitted = true;
  localStorage.setItem("tryoutSubmitted", "true");

  let benar = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) benar++;
  });

  alert(
    auto
      ? "Waktu habis! Try Out otomatis disubmit."
      : "Try Out berhasil disubmit."
  );

  alert(`Skor: ${benar}/${questions.length}`);
  updateSidebar();
}
