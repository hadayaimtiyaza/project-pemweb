const API_URL = 'http://localhost:5000/api/galeries';
const container = document.getElementById("daftar-galeri");
const loadingText = document.getElementById("loading");
let semuaGaleri = [];

function tampilkanGaleri() {
    loadingText.style.display = 'block';
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            semuaGaleri = data;
            container.innerHTML = "";
            data.forEach(galeri => {
                const galeriDiv = document.createElement("div");
                galeriDiv.classList.add("admin-card");
                galeriDiv.innerHTML = `
                    Judul : ${galeri.judul}
                    <br>
                    Kolom : ${galeri.kolom}
                    <br>
                    <button onclick="editGaleri('${galeri._id}')">Edit</button>
                    <button onclick="hapusGaleri('${galeri._id}')">Hapus</button>
                `;
                container.appendChild(galeriDiv);
            });
        })
        .catch(err => {
            console.error("Gagal mengambil data:", err);
        })
        .finally(() => loadingText.style.display = 'none');
}

function defaultSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('form-galeri');

    const formData = new FormData(form);
    
  
    fetch(API_URL, {
      method: 'POST',
      body: formData 
    })
      .then(res => res.json())
      .then(() => {
          tampilkanGaleri();
          fotoGaleri();
        form.reset(); 
      })
      .catch(err => {
        console.error("Gagal menambah galeri:", err);
      });
}

function fotoGaleri() {
    const kolom1 = document.getElementById("kolom-1");
    const kolom2 = document.getElementById("kolom-2");
    const kolom3 = document.getElementById("kolom-3");
    const kolom4 = document.getElementById("kolom-4");
    const kolom5 = document.getElementById("kolom-5");
    const kolom6 = document.getElementById("kolom-6");
    const kolom7 = document.getElementById("kolom-7");

    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            semuaGaleri = data;
            data.forEach(galeri => {
                if (galeri.kolom === 1) {   
                    kolom1.innerHTML = '';
                    kolom1.innerHTML = `<img width="768" height="576" src="http://localhost:5000/uploads/galeri/${galeri.gambar}" alt=""
                    title=""/>`;
                    kolom1.removeAttribute('outliner');
                } else if (galeri.kolom === 2) {
                    kolom2.innerHTML = '';
                    kolom2.innerHTML = `<img width="768" height="576" src="http://localhost:5000/uploads/galeri/${galeri.gambar}" alt="" title=""
                    loading="apiunggun" />`;
                    kolom2.removeAttribute('outliner');
                } else if (galeri.kolom === 3) {
                    kolom3.innerHTML = '';
                    kolom3.innerHTML = `<img width="768" height="576" src="http://localhost:5000/uploads/galeri/${galeri.gambar}" alt="" title=""
                    loading="bersih lingkungan" />`;
                    kolom3.removeAttribute('outliner');
                } else if (galeri.kolom === 4) {
                    kolom4.innerHTML = '';
                    kolom4.innerHTML = `<img width="768" height="576" src="http://localhost:5000/uploads/galeri/${galeri.gambar}" alt="" title=""
                    loading="upacara" />`;
                    kolom4.removeAttribute('outliner');
                } else if (galeri.kolom === 5) {
                    kolom5.innerHTML = '';
                    kolom5.innerHTML = `<img width="768" height="576" src="http://localhost:5000/uploads/galeri/${galeri.gambar}" alt="" title=""
                    loading="FLS2N 2023" />`;
                    kolom5.removeAttribute('outliner');
                } else if (galeri.kolom === 6) {
                    kolom6.innerHTML = '';
                    kolom6.innerHTML = `<img width="768" height="432" src="http://localhost:5000/uploads/galeri/${galeri.gambar}" alt="" title=""
                    loading="FLS2N" />`;
                    kolom6.removeAttribute('outliner');
                } else if (galeri.kolom === 7) {
                    kolom7.innerHTML = '';
                    kolom7.innerHTML = `<img width="768" height="576" src="http://localhost:5000/uploads/galeri/${galeri.gambar}" alt="" title=""
                    loading="lomba" />`;
                    kolom7.removeAttribute('outliner');
                }
                else {
                    kolom1.innerHTML = '<h1>1</h1>';
                    kolom2.innerHTML = '<h1>2</h1>';
                    kolom3.innerHTML = '<h1>3</h1>';
                    kolom4.innerHTML = '<h1>4</h1>';
                    kolom5.innerHTML = '<h1>5</h1>';
                    kolom6.innerHTML = '<h1>6</h1>';
                    kolom7.innerHTML = '<h1>7</h1>';
                }
            });
        })
        .catch(err => {
            console.error("Gagal mengambil data:", err);
        })
        .finally(() => loadingText.style.display = 'none');

}

function editGaleri(id) {
    const galeri = semuaGaleri.find(f => f._id === id);
    if (!galeri) return alert("Foto galeri tidak ditemukan!");
  
    document.getElementById("submit-galeri").textContent = "Edit Galeri";
    document.getElementById("judul").value = galeri.judul;
    document.getElementById("kolom").value = String(galeri.kolom);
    
  
    const formGaleri = document.getElementById("form-galeri");
  
    formGaleri.onsubmit = function (event) {
      event.preventDefault();
      const formData = new FormData(formGaleri);
  
      fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: formData
      })
        .then(res => res.json())
        .then(() => {
            tampilkanGaleri();
            fotoGaleri();
            formGaleri.reset();
            formGaleri.onsubmit = defaultSubmit;
            window.location.reload();
        })
        .catch(err => {
          console.error("Gagal mengedit galeri:", err);
        });
    };
}

function hapusGaleri(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        tampilkanGaleri();
        window.location.reload();
    })
    .catch(err => {
        console.error("Gagal menghapus:", err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    tampilkanGaleri();
    fotoGaleri();
    const formGaleri = document.getElementById('form-galeri');
    formGaleri.onsubmit = defaultSubmit;
});