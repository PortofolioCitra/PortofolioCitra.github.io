// Proteksi akses + trial
if (!checkTrialAccess()) {
  window.location.href = "index.html";
}

const stats = JSON.parse(localStorage.getItem("quizStats")) || {
  total: 0,
  benar: 0,
  salah: 0
};

document.getElementById("totalSoal").textContent = stats.total;
document.getElementById("totalBenar").textContent = stats.benar;
document.getElementById("totalSalah").textContent = stats.salah;
document.getElementById("totalPoin").textContent = stats.benar * 3;

// Tampilkan link WA sesuai tier
const accessData = JSON.parse(localStorage.getItem("accessData"));
const waLink = document.getElementById("waLink");

if (accessData.tier === 2) {
  waLink.classList.remove("hidden");
  waLink.href = "https://chat.whatsapp.com/TIER2_LINK";
}

if (accessData.tier === 3) {
  waLink.classList.remove("hidden");
  waLink.href = "https://chat.whatsapp.com/TIER3_LINK";
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
