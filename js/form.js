// Mengambil parameter singkat dari URL QR Code
const urlParams = new URLSearchParams(window.location.search);
const matkul = urlParams.get('m');
const waktu = urlParams.get('w');
const pertemuan = urlParams.get('p');

const infoSesi = document.getElementById('info-sesi');
const btnSubmit = document.querySelector('button');

if (matkul && waktu && pertemuan) {
    infoSesi.innerHTML = `Mata Kuliah: <strong>${matkul}</strong><br>Pertemuan ke-${pertemuan} (${waktu})`;
} else {
    infoSesi.innerHTML = "<span style='color: #ff4757; font-weight:bold;'>Sesi tidak valid! Anda bukan di ruang ini.</span>";
    btnSubmit.disabled = true;
}

// === PASTE URL APPS SCRIPT KAMU DI DALAM TANDA KUTIP DI BAWAH INI ===
const scriptURL = 'MAhttps://script.google.com/macros/s/AKfycbycjGaOTzMaQaXjZhllxkViDTCBuoNcMFB5cTxRV0SGP1cFkmw3KHUNOZq1_kTuN90Z/execI';

function kirimData() {
    const npm = document.getElementById('npm').value;
    const nama = document.getElementById('nama').value;

    if (!npm || !nama) {
        alert("Silakan isi NPM dan Nama dengan lengkap!");
        return;
    }

    btnSubmit.innerText = "Mengirim...";
    btnSubmit.disabled = true;

    const formData = new URLSearchParams();
    formData.append('npm', npm);
    formData.append('nama', nama);
    formData.append('matkul', matkul);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("✅ Berhasil! " + data.message);
                document.getElementById('npm').value = '';
                document.getElementById('nama').value = '';
            } else {
                alert("❌ Gagal: " + data.message);
            }
            btnSubmit.innerText = "Kirim Kehadiran";
            btnSubmit.disabled = false;
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert("Terjadi kesalahan koneksi! Pastikan internet lancar.");
            btnSubmit.innerText = "Kirim Kehadiran";
            btnSubmit.disabled = false;
        });
}