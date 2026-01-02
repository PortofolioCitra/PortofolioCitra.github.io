if (!checkTrialAccess()) {
  window.location.href = "index.html";
}

const subtests = [
  "TPS Penalaran Umum",
  "TPS PBM",
  "TPS Pengetahuan Umum",
  "Literasi Bahasa Indonesia",
  "Literasi Bahasa Inggris",
  "Penalaran Matematika",
  "Literasi Matematika"
];

const subtestGrid = document.getElementById("subtestGrid");
const dayList = document.getElementById("dayList");
const daysContainer = document.getElementById("daysContainer");
const selectedSubtest = document.getElementById("selectedSubtest");

let quizProgress = JSON.parse(localStorage.getItem("quizProgress")) || {};

subtests.forEach((name, index) => {
  const card = document.createElement("div");
  card.className = "subtest-card";
  card.innerHTML = `<h3>${name}</h3><p>30 Hari Latihan</p>`;
  card.onclick = () => openDays(index);
  subtestGrid.appendChild(card);
});

function openDays(subtestIndex) {
  selectedSubtest.textContent = subtests[subtestIndex];
  dayList.classList.remove("hidden");
  daysContainer.innerHTML = "";

  if (!quizProgress[subtestIndex]) {
    quizProgress[subtestIndex] = {
      unlockedDay: 1,
      completed: {}
    };
  }

  for (let day = 1; day <= 30; day++) {
    const dayBtn = document.createElement("div");
    dayBtn.textContent = "Day " + day;

    if (quizProgress[subtestIndex].completed[day]) {
      dayBtn.className = "day done";
    } else if (day <= quizProgress[subtestIndex].unlockedDay) {
      dayBtn.className = "day open";
      dayBtn.onclick = () => startQuiz(subtestIndex, day);
    } else {
      dayBtn.className = "day locked";
    }

    daysContainer.appendChild(dayBtn);
  }

  localStorage.setItem("quizProgress", JSON.stringify(quizProgress));
}

function startQuiz(subtestIndex, day) {
  const todayKey = `quiz_${subtestIndex}_${day}_date`;
  const today = new Date().toDateString();

  if (localStorage.getItem(todayKey) === today) {
    alert("Quiz hari ini sudah dikerjakan. Tunggu besok.");
    return;
  }

  localStorage.setItem("currentQuiz", JSON.stringify({
    subtestIndex,
    day
  }));

  window.location.href = "quiz-play.html";
}
