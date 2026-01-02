// ===== DATA DUMMY (NANTI DIGANTI JSON / EXCEL) =====
const questions = Array.from({ length: 10 }, (_, i) => ({
  question: `Soal nomor ${i + 1}`,
  options: ["A", "B", "C", "D"],
  answer: 0,
  explanation: "Pembahasan soal ini."
}));

let current = 0;
let answers = JSON.parse(localStorage.getItem("answers")) || {};
let flags = JSON.parse(localStorage.getItem("flags")) || {};
let submitted = localStorage.getItem("submitted") === "true";

// ===== INIT =====
const sidebar = document.getElementById("sidebar");

questions.forEach((_, i) => {
  const div = document.createElement("div");
  div.textContent = i + 1;
  div.className = "q-number";
  div.onclick = () => goTo(i);
  sidebar.appendChild(div);
});

render();

// ===== FUNCTIONS =====
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
      localStorage.setItem("answers", JSON.stringify(answers));
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
  localStorage.setItem("flags", JSON.stringify(flags));
  updateSidebar();
}

function submitQuiz() {
  if (!confirm("Yakin submit quiz?")) return;

  submitted = true;
  localStorage.setItem("submitted", "true");

  let benar = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) benar++;
  });

  const stats = JSON.parse(localStorage.getItem("quizStats")) || {
    total: 0,
    benar: 0,
    salah: 0
  };

  stats.total += questions.length;
  stats.benar += benar;
  stats.salah += questions.length - benar;

  localStorage.setItem("quizStats", JSON.stringify(stats));

  updateSidebar();
  alert(`Quiz selesai. Benar: ${benar}/${questions.length}`);
}
