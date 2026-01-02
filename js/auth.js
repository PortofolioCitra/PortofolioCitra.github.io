const ACCESS_CODES = {
  "trial": 0,
  "tier1": 1,
  "tier2": 2,
  "tier3": 3
};

function submitCode() {
  const input = document.getElementById("accessCode").value.trim();
  const errorText = document.getElementById("error");

  if (!ACCESS_CODES.hasOwnProperty(input)) {
    errorText.textContent = "Kode tidak valid.";
    return;
  }

  const tier = ACCESS_CODES[input];
  const now = Date.now();

  const savedAccess = localStorage.getItem("accessData");

  if (!savedAccess) {
    localStorage.setItem("accessData", JSON.stringify({
      tier: tier,
      startDate: now
    }));
  }

  window.location.href = "dashboard.html";
}

// proteksi trial (dipakai nanti di page lain)
function checkTrialAccess() {
  const data = JSON.parse(localStorage.getItem("accessData"));
  if (!data) return false;

  if (data.tier === 0) {
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    if (Date.now() - data.startDate > threeDays) {
      localStorage.clear();
      alert("Trial habis. Silakan masukkan kode baru.");
      window.location.href = "index.html";
      return false;
    }
  }
  return true;
}
