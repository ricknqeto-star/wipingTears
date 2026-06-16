// =======================
// Navigation Toggle
// =======================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// =======================
// Modal Logic
// =======================
const modal = document.getElementById('imageModal');
const closeBtn = document.querySelector('#imageModal .close');

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// =======================
// Load About Section
// =======================
const aboutSection = document.querySelector('#about p');
const savedAbout = localStorage.getItem('aboutContent');
if (savedAbout) {
  aboutSection.textContent = savedAbout;
}

// =======================
// Load Footer Section
// =======================
const footerPara = document.querySelector('footer p');
const savedFooter = localStorage.getItem('footerContent');
if (savedFooter) {
  footerPara.textContent = savedFooter;
}

// =======================
// Load Main Page Thumbnails
// =======================
const galleryThumbs = document.querySelector('.gallery-thumbs');

function loadThumbs() {
  galleryThumbs.innerHTML = "";
  let thumbs = JSON.parse(localStorage.getItem('mainThumbs')) || [];

  // Ensure only 2 thumbnails show
  thumbs = thumbs.slice(0, 2);

  thumbs.forEach(item => {
    const wrapper = document.createElement('div');

    // Thumbnail image
    const img = document.createElement('img');
    img.src = item.src;
    img.classList.add('thumb');

    // Caption under thumbnail
    const caption = document.createElement('p');
    caption.textContent = item.caption || "";

    wrapper.appendChild(img);
    wrapper.appendChild(caption);
    galleryThumbs.appendChild(wrapper);

    // Clicking thumbnail opens modal
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      renderModalImages();
    });
  });
}
loadThumbs();

// =======================
// Load Modal Gallery Images
// =======================
function renderModalImages() {
  const modalContent = document.querySelector('#imageModal .modal-content');
  modalContent.innerHTML = "";

  // Include both thumbnails and gallery images
  let thumbs = JSON.parse(localStorage.getItem('mainThumbs')) || [];
  let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
  let allImages = [...thumbs, ...images];

  allImages.forEach(item => {
    const wrapper = document.createElement('div');

    // Modal image
    const img = document.createElement('img');
    img.src = item.src;

    // Caption under modal image
    const caption = document.createElement('p');
    caption.textContent = item.caption || "";

    wrapper.appendChild(img);
    wrapper.appendChild(caption);
    modalContent.appendChild(wrapper);
  });
}
