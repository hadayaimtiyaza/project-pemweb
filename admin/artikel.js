const API_URL = 'http://localhost:5000/api/articles';
const container = document.getElementById("daftar-data");
const loadingText = document.getElementById("loading");
let semuaArtikel = [];

// TAMPILKAN ARTIKEL
function tampilkanDaftarArtikel() {
    loadingText.style.display = 'block';
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            semuaArtikel = data;
            container.innerHTML = "";
            data.forEach(artikel => {
                const artikelDiv = document.createElement("div");
                artikelDiv.classList.add("admin-card");
                artikelDiv.innerHTML = `
                    <img src="http://localhost:5000/uploads/artikel/${artikel.gambar}" alt="${artikel.judul}" style="width: 200px;"><br>
                    <strong>${artikel.judul}</strong><br>
                    <em>${artikel.konten}</em><br>
                    Tanggal: ${artikel.tanggal}<br>
                    Penulis: ${artikel.penulis}<br>
                    Tag: ${artikel.tag}<br>
                    <button onclick="editArtikel('${artikel._id}')">Edit</button>
                    <button onclick="hapusArtikel('${artikel._id}')">Hapus</button>
                `;
                container.appendChild(artikelDiv);
            });
        })
        .catch(err => {
            console.error("Gagal mengambil data:", err);
        })
        .finally(() => loadingText.style.display = 'none');
}

// TAMBAH ARTIKEL
function defaultSubmit(event) {
    event.preventDefault();
  
    const form = document.getElementById('form-artikel');
    const formData = new FormData(form);
  
    fetch(API_URL, {
      method: 'POST',
      body: formData 
    })
      .then(res => res.json())
      .then(() => {
        tampilkanDaftarArtikel();
        form.reset(); 
      })
      .catch(err => {
        console.error("Gagal menambah artikel:", err);
      });
  }

// HAPUS ARTIKEL
function hapusArtikel(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        tampilkanDaftarArtikel();
    })
    .catch(err => {
        console.error("Gagal menghapus:", err);
    });
}

// EDIT FILM
function editArtikel(id) {
    const artikel = semuaArtikel.find(f => f._id === id);
    if (!artikel) return alert("Artikel tidak ditemukan!");
  
    document.getElementById("submit-artikel").textContent = "Edit Artikel";
    document.getElementById("judul").value = artikel.judul;
    document.getElementById("konten").value = artikel.konten;
    document.getElementById("penulis").value = artikel.penulis;
    document.getElementById("tanggal").value = artikel.tanggal?.substring(0, 10);
    document.getElementById("tag").value = artikel.tag;
    
  
    const formArtikel = document.getElementById("form-artikel");
  
    formArtikel.onsubmit = function (event) {
      event.preventDefault();
      const formData = new FormData(formArtikel);
  
      fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: formData
      })
        .then(res => res.json())
        .then(() => {
          tampilkanDaftarArtikel();
          formArtikel.reset();
          formArtikel.onsubmit = defaultSubmit;
        })
        .catch(err => {
          console.error("Gagal mengedit artikel:", err);
        });
    };
  }

// INISIALISASI SAAT HALAMAN DIBUKA
document.addEventListener('DOMContentLoaded', () => {
    tampilkanDaftarArtikel();
    const formArtikel = document.getElementById('form-artikel');
    formArtikel.onsubmit = defaultSubmit;
});
