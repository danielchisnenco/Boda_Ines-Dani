function initCountdown() {
  const weddingDate = new Date('2027-09-04T13:00:00').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('countdown').innerHTML = '<span class="countdown-message">¡Hoy es el día!</span>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = days;
    document.getElementById('cd-hours').textContent = hours;
    document.getElementById('cd-minutes').textContent = minutes;
    document.getElementById('cd-seconds').textContent = seconds;
  }

  update();
  setInterval(update, 1000);
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initScrollAnimations();
});
