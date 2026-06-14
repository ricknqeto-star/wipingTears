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

// Image Slider
const slider = document.querySelector('#impact-slider .slider');
const slides = document.querySelectorAll('#impact-slider .slider img');
const prevBtn = document.querySelector('#impact-slider .prev');
const nextBtn = document.querySelector('#impact-slider .next');
let index = 0;

// Dynamically set slider width
slider.style.width = `${slides.length * 100}vw`;

function showSlide(i) {
  if (i < 0) {
    index = slides.length - 1;
  } else if (i >= slides.length) {
    index = 0;
  } else {
    index = i;
  }
  slider.style.transform = `translateX(-${index * 100}%)`;
}


prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

// Auto-slide every 5 seconds
setInterval(() => showSlide(index + 1), 5000);


