if (!checkTrialAccess()) {
  window.location.href = "index.html";
}

const ebooks = [
  {
    title: "Penalaran Umum Dasar",
    subtest: "TPS - Penalaran Umum",
    materi: "Logika dasar, pola hubungan, dan penarikan kesimpulan.",
    cover: "https://via.placeholder.com/400x600?text=Penalaran+Umum",
    link: "ebooks/penalaran-umum.pdf"
  },
  {
    title: "Pemahaman Bacaan",
    subtest: "TPS - PBM",
    materi: "Strategi membaca cepat dan memahami ide utama.",
    cover: "https://via.placeholder.com/400x600?text=PBM",
    link: "ebooks/pbm.pdf"
  },
  {
    title: "Literasi Matematika",
    subtest: "Literasi Numerasi",
    materi: "Soal numerasi kontekstual dan analisis data.",
    cover: "https://via.placeholder.com/400x600?text=Numerasi",
    link: "ebooks/numerasi.pdf"
  }
];

const grid = document.getElementById("ebookGrid");

ebooks.forEach((ebook, index) => {
  const card = document.createElement("div");
  card.className = "ebook-card";
  card.innerHTML = `
    <img src="${ebook.cover}">
    <div class="ebook-info">
      <h3>${ebook.title}</h3>
      <p>${ebook.subtest}</p>
    </div>
  `;
  card.onclick = () => openModal(index);
  grid.appendChild(card);
});

function openModal(index) {
  const ebook = ebooks[index];
  document.getElementById("modalCover").src = ebook.cover;
  document.getElementById("modalTitle").textContent = ebook.title;
  document.getElementById("modalSubtest").textContent = ebook.subtest;
  document.getElementById("modalMateri").textContent = ebook.materi;
  document.getElementById("modalDownload").href = ebook.link;

  document.getElementById("ebookModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("ebookModal").classList.add("hidden");
}
