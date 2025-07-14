const API_URL = 'http://localhost:5000/api/teachers';
const container = document.getElementById("daftar-data");
const loadingText = document.getElementById("loading");
let semuaGuru = [];

// TAMPILKAN guru
function tampilkanDaftarGuru() {
    loadingText.style.display = 'block';
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            semuaGuru = data;
            container.innerHTML = "";
            data.forEach(Guru => {
                const guruDiv = document.createElement("div");
                guruDiv.classList.add("admin-card");
                guruDiv.innerHTML = `
                    <img src="http://localhost:5000/uploads/guru/${Guru.gambar}" alt="${Guru.nama}" style="width: 200px;"><br>
                    <strong>${Guru.nama}</strong><br>
                    <em>${Guru.jabatan}</em><br>
                    NIP: ${Guru.nip}<br>
                    <button onclick="editGuru('${Guru._id}')">Edit</button>
                    <button onclick="hapusGuru('${Guru._id}')">Hapus</button>
                `;
                container.appendChild(guruDiv);
            });
        })
        .catch(err => {
            console.error("Gagal mengambil data:", err);
        })
        .finally(() => loadingText.style.display = 'none');
}

// TAMBAH guru
function defaultSubmit(event) {
    event.preventDefault();
  
    const form = document.getElementById('form-guru');
    const formData = new FormData(form);
  
    fetch(API_URL, {
      method: 'POST',
      body: formData 
    })
      .then(res => res.json())
      .then(() => {
        tampilkanDaftarGuru();
        form.reset(); 
      })
      .catch(err => {
        console.error("Gagal menambah guru:", err);
      });
}

// HAPUS guru
function hapusGuru(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        tampilkanDaftarGuru();
    })
    .catch(err => {
        console.error("Gagal menghapus:", err);
    });
}

// EDIT FILM
function editGuru(id) {
    const guru = semuaGuru.find(f => f._id === id);
    if (!guru) return alert("guru tidak ditemukan!");

    document.getElementById("submit-guru").textContent = "Edit Guru";
    document.getElementById("jabatan").value = guru.jabatan;
    document.getElementById("nama").value = guru.nama;
    document.getElementById("nip").value = guru.nip;

    const formGuru = document.getElementById("form-guru");
    formGuru.onsubmit = function (event) {
        event.preventDefault();
        const formData = new FormData(formGuru);
    
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: formData
        })
        .then(res => res.json())
        .then(() => {
          tampilkanDaftarGuru();
          formGuru.reset();
          formGuru.onsubmit = defaultSubmit;
        })
        .catch(err => {
          console.error("Gagal mengedit guru:", err);
        });
    };
}

// INISIALISASI SAAT HALAMAN DIBUKA
document.addEventListener('DOMContentLoaded', () => {
    tampilkanDaftarGuru();
    const formGuru = document.getElementById('form-guru');
    formGuru.onsubmit = defaultSubmit;
});
