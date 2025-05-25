// kalkulator.js

function setupKalkulator(idPrefix, materialList, tbodyId, totalId, waId, phoneNumber) {
  const tbody = document.getElementById(tbodyId);
  const totalDisplay = document.getElementById(totalId);
  const waButton = document.getElementById(waId);

  materialList.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" id="${idPrefix}-check-${index}"></td>
      <td>${item.nama}</td>
      <td>Rp${item.harga.toLocaleString()}</td>
      <td><input type="number" id="${idPrefix}-qty-${index}" value="1" min="1" disabled></td>
      <td id="${idPrefix}-subtotal-${index}">Rp0</td>
    `;
    tbody.appendChild(row);

    const checkbox = document.getElementById(`${idPrefix}-check-${index}`);
    const qtyInput = document.getElementById(`${idPrefix}-qty-${index}`);

    checkbox.addEventListener("change", () => {
      qtyInput.disabled = !checkbox.checked;
      hitung();
    });

    qtyInput.addEventListener("input", hitung);
  });

  function hitung() {
    let total = 0;
    let pesan = `Saya ingin estimasi biaya ${idPrefix}:\n`;

    materialList.forEach((item, index) => {
      const checked = document.getElementById(`${idPrefix}-check-${index}`).checked;
      const qty = parseInt(document.getElementById(`${idPrefix}-qty-${index}`).value) || 0;
      const subtotalCell = document.getElementById(`${idPrefix}-subtotal-${index}`);

      if (checked) {
        const subtotal = item.harga * qty;
        subtotalCell.innerText = `Rp${subtotal.toLocaleString()}`;
        total += subtotal;
        pesan += `- ${item.nama} x${qty} = Rp${subtotal.toLocaleString()}\n`;
      } else {
        subtotalCell.innerText = `Rp0`;
      }
    });

    totalDisplay.innerText = `Estimasi Total: Rp${total.toLocaleString()}`;
    pesan += `Total Estimasi: Rp${total.toLocaleString()}`;
    waButton.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(pesan)}`;
  }
}
