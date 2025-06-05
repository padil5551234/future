// Animasi bumi imut mengikuti kursor, menghindari area login
(function() {
  const earthAnim = document.createElement('div');
  earthAnim.id = 'earth-anim';
  earthAnim.innerHTML = `
    <div class="earth-emoji">
      <div class="earth-land land1"></div>
      <div class="earth-land land2"></div>
      <div class="earth-land land3"></div>
      <div class="earth-face">
        <div class="earth-eye left"><div class="earth-blush"></div></div>
        <div class="earth-eye right"><div class="earth-blush"></div></div>
        <div class="earth-smile"></div>
      </div>
    </div>
  `;
  document.body.appendChild(earthAnim);

  let lastX = window.innerWidth * 0.1;
  let lastY = window.innerHeight * 0.08;
  window.addEventListener('mousemove', function(e) {
    const login = document.querySelector('.auth-container');
    if (login) {
      const rect = login.getBoundingClientRect();
      // Hindari area login
      if (
        e.clientX > rect.left - 70 && e.clientX < rect.right + 70 &&
        e.clientY > rect.top - 70 && e.clientY < rect.bottom + 70
      ) {
        earthAnim.style.left = '10vw';
        earthAnim.style.top = '8vh';
        lastX = window.innerWidth * 0.1;
        lastY = window.innerHeight * 0.08;
        return;
      }
    }
    // Bumi terbang ke posisi kursor (smooth)
    let x = e.clientX - 30;
    let y = e.clientY - 30;
    x = Math.max(0, Math.min(window.innerWidth - 60, x));
    y = Math.max(0, Math.min(window.innerHeight - 60, y));
    lastX += (x - lastX) * 0.18;
    lastY += (y - lastY) * 0.18;
    earthAnim.style.left = lastX + 'px';
    earthAnim.style.top = lastY + 'px';
  });
})();
