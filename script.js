// =======================
// Navigation Toggle
// =======================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('show'));
});
window.addEventListener('click', (e) => {
  if (navLinks.classList.contains('show') && !navLinks.contains(e.target) && e.target !== menuToggle) {
    navLinks.classList.remove('show');
  }
});

// =======================
// Load Header
// =======================
const headerTitle = document.querySelector('header h1');
const savedHeader = localStorage.getItem('headerText');
if (savedHeader) headerTitle.textContent = savedHeader;

// =======================
// Load Hero Section
// =======================
const heroHeading = document.querySelector('#home h2');
const heroSlogan = document.querySelector('#home p');
if (localStorage.getItem('heroHeading')) heroHeading.textContent = localStorage.getItem('heroHeading');
if (localStorage.getItem('heroSlogan')) heroSlogan.textContent = localStorage.getItem('heroSlogan');

// =======================
// Load About Section
// =======================
const aboutParas = document.querySelectorAll('#about p');
if (localStorage.getItem('aboutDescription')) aboutParas[0].textContent = localStorage.getItem('aboutDescription');
if (localStorage.getItem('aboutMission')) aboutParas[1].textContent = localStorage.getItem('aboutMission');


// =======================
// Load Programs on Main Page
const programsContainer = document.querySelector('.programs-container');
function loadPrograms(){
  programsContainer.innerHTML = "";
  let programs = JSON.parse(localStorage.getItem('programs')) || [];
  programs.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('program-card');
    const h3 = document.createElement('h3');
    h3.textContent = item.title;
    const p = document.createElement('p');
    p.textContent = item.desc;
    card.appendChild(h3);
    card.appendChild(p);
    programsContainer.appendChild(card);
  });
}
loadPrograms();


// =======================
// Load Impact
// =======================
const impactContainer = document.querySelector('.impact-container');
function loadImpacts(){
  impactContainer.innerHTML = "";
  let impacts = JSON.parse(localStorage.getItem('impacts')) || [];
  impacts.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('impact-card');
    const h3 = document.createElement('h3');
    h3.textContent = item.number;
    const p = document.createElement('p');
    p.textContent = item.type;
    card.appendChild(h3);
    card.appendChild(p);
    impactContainer.appendChild(card);
  });
}
loadImpacts();

// =======================
// Load Thumbnails (max 2)
// =======================
const galleryThumbs = document.querySelector('.gallery-thumbs');
function loadThumbs(){
  galleryThumbs.innerHTML = "";
  let thumbs = JSON.parse(localStorage.getItem('mainThumbs')) || [];
  thumbs = thumbs.slice(0,2); // max 2
  thumbs.forEach(item => {
    const wrapper = document.createElement('div');
    const img = document.createElement('img');
    img.src = item.src;
    img.classList.add('thumb');
    const caption = document.createElement('p');
    caption.textContent = item.caption || "";
    wrapper.appendChild(img);
    wrapper.appendChild(caption);
    galleryThumbs.appendChild(wrapper);
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      renderModalImages();
    });
  });
}
loadThumbs();

// =======================
// Modal Gallery
// =======================
const modal = document.getElementById('imageModal');
const closeBtn = document.querySelector('.close');

function renderModalImages(){
  const modalContent = document.querySelector('#imageModal .modal-content');
  modalContent.innerHTML = "";
  let thumbs = JSON.parse(localStorage.getItem('mainThumbs')) || [];
  let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
  let allImages = [...thumbs, ...images];
  allImages.forEach(item => {
    const wrapper = document.createElement('div');
    const img = document.createElement('img');
    img.src = item.src;
    const caption = document.createElement('p');
    caption.textContent = item.caption || "";
    wrapper.appendChild(img);
    wrapper.appendChild(caption);
    modalContent.appendChild(wrapper);
  });
}

closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });

// =======================
// Load Get Involved
// =======================
const involvedCards = document.querySelectorAll('#get-involved .involved-card p');
if(localStorage.getItem('donationDesc')) involvedCards[0].textContent = localStorage.getItem('donationDesc');
if(localStorage.getItem('volunteerDesc')) involvedCards[1].textContent = localStorage.getItem('volunteerDesc');

// =======================
// Load Footer
// =======================
const footerDesc = document.querySelector('footer .footer-columns div p');
if(localStorage.getItem('footerDesc')) footerDesc.textContent = localStorage.getItem('footerDesc');

const footerContact = document.querySelectorAll('footer .footer-columns div:nth-child(3) p');
if(localStorage.getItem('footerEmail')) footerContact[0].innerHTML = `<i class="fas fa-envelope"></i> ${localStorage.getItem('footerEmail')}`;
if(localStorage.getItem('footerPhone')) footerContact[1].innerHTML = `<i class="fas fa-phone"></i> ${localStorage.getItem('footerPhone')}`;
if(localStorage.getItem('footerLocation')) footerContact[2].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${localStorage.getItem('footerLocation')}`;

const socialLinks = document.querySelectorAll('footer .social a');
if(localStorage.getItem('footerFacebook')) socialLinks[0].href = localStorage.getItem('footerFacebook');
if(localStorage.getItem('footerInstagram')) socialLinks[1].href = localStorage.getItem('footerInstagram');
if(localStorage.getItem('footerLinkedin')) socialLinks[3].href = localStorage.getItem('footerLinkedin');
