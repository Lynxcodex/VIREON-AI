document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');

    ctaButton.addEventListener('click', () => {
        ctaButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            ctaButton.style.transform = 'scale(1)';
            window.location.href = 'auth.html';
        }, 100);
    });
});

function showNotification(message, type = 'info') {
  const container = document.getElementById('notification-container');
  const notif = document.createElement('div');
  notif.className = `notification notification--${type}`;
  notif.textContent = message;

  container.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 4000); // disappears after 4 seconds
}
