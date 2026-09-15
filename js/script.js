// 1. Logika Jam Real-time
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.innerText = timeString + ' WIB';
    }
}
setInterval(updateClock, 1000);
updateClock();

// 2. Generator QR Code yang kompatibel dengan GitHub Pages & Localhost
function buatSesi() {
    const matkulLengkap = document.getElementById('matkul').value;
    const waktu = document.getElementById('waktu').value;
    const pertemuan = document.getElementById('pertemuan').value;

    if(!matkulLengkap || !waktu || !pertemuan) {
        alert("Harap isi semua data sesi!");
        return;
    }

    // Ambil nama matkul saja sebelum tanda kurung agar URL ringkas
    const matkul = matkulLengkap.split(' (')[0];

    // Otomatis mendeteksi folder aktif (mendukung GitHub Pages & Localhost)
    let currentPath = window.location.href;
    let baseURL = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    const sesiURL = `${baseURL}form.html?m=${encodeURIComponent(matkul)}&w=${encodeURIComponent(waktu)}&p=${pertemuan}`;

    const qrContainer = document.getElementById("qrcode-container");
    qrContainer.innerHTML = "";

    // Ukuran 300x300 pixel dengan tingkat koreksi error tinggi agar mudah di-scan
    new QRCode(qrContainer, {
        text: sesiURL,
        width: 300,
        height: 300,
        correctLevel: QRCode.CorrectLevel.H
    });

    qrContainer.style.display = "flex";
}