// =======================
// Navigation Toggle
// =======================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Toggle menu open/close
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Close menu when a link is clicked
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});



// Modal logic
const thumbs = document.querySelectorAll('.thumb');
const modal = document.getElementById('imageModal');
const closeBtn = document.querySelector('#imageModal .close');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    modal.style.display = 'block'; // show modal
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none'; // hide modal
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});


