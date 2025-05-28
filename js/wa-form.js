function kirimWA() {
  const nama = document.getElementById('nama').value;
  const alamat = document.getElementById('alamat').value;
  const pesan = document.getElementById('pesan').value;

  localStorage.setItem('wa_nama', nama);
  localStorage.setItem('wa_alamat', alamat);
  localStorage.setItem('wa_pesan', pesan);

  const teks = `Halo, saya *${nama}*.\nAlamat: ${alamat}.\nSaya ingin memesan jasa tukang:\n${pesan}`;
  const url = `https://wa.me/6289660171013?text=${encodeURIComponent(teks)}`;

  window.open(url, '_blank');
  return false;
}

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('wa_nama')) {
    document.getElementById('nama').value = localStorage.getItem('wa_nama');
  }
  if (localStorage.getItem('wa_alamat')) {
    document.getElementById('alamat').value = localStorage.getItem('wa_alamat');
  }
  if (localStorage.getItem('wa_pesan')) {
    document.getElementById('pesan').value = localStorage.getItem('wa_pesan');
  }
});
