const userName = localStorage.getItem('loggedInName');
if (userName) {
  document.getElementById('profil-name').textContent = userName;
}
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

// Kalkulator Jejak Karbon
const carbonForm = document.getElementById('carbonForm');
const carbonResult = document.getElementById('carbonResult');
if (carbonForm) {
  carbonForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const transport = parseFloat(document.getElementById('transport').value) || 0;
    const listrik = parseFloat(document.getElementById('listrik').value) || 0;
    const makan = parseFloat(document.getElementById('makan').value) || 0;
    // Estimasi sederhana: transport 0.12 kg/km, listrik 0.85 kg/kWh, daging 2.5 kg/porsi
    const total = (transport * 0.12) + (listrik * 0.85) + (makan * 2.5 / 7);
    carbonResult.innerHTML = `Perkiraan jejak karbon harian Anda: <b>${total.toFixed(2)} kg CO₂</b>`;
  });
}



cards.forEach((card, i) => {
  if (i === 0 || i === 2) {
    card.style.transform = 'translateY(-100px)';
  } else if (i === 1) {
    card.style.transform = 'translateY(60px)';  
  }
});

document.body.addEventListener("mouseover", () => {
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
    }, i * 500); 
  });

  setTimeout(() => {
    }, cards.length * 500 + 300);

}, { once:true});



