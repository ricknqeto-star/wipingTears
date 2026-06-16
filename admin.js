// =======================
// Login System
// =======================

// Grab login elements
const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('login');
const dashboard = document.getElementById('dashboard');
const logoutBtn = document.getElementById('logoutBtn');

// Handle login form submission
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  // Demo credentials (replace with secure backend later)
  if(user === "admin" && pass === "1234"){
    loginSection.style.display = "none";   // hide login
    dashboard.style.display = "block";     // show dashboard
  } else {
    alert("Invalid credentials");
  }
});

// Handle logout
logoutBtn.addEventListener('click', () => {
  dashboard.style.display = "none";
  loginSection.style.display = "block";
});

// =======================
// About Section CRUD
// =======================

// Grab About form
const aboutForm = document.getElementById('aboutForm');
const aboutText = document.getElementById('aboutText');

// Save About content to localStorage
aboutForm.addEventListener('submit', e => {
  e.preventDefault();
  localStorage.setItem('aboutContent', aboutText.value);
  alert("About section updated!");
});

// =======================
// Thumbnails CRUD (Main Page with Captions)
// =======================

// Grab thumbnail form elements
const thumbForm = document.getElementById('thumbForm');
const thumbUpload = document.getElementById('thumbUpload');
const thumbList = document.getElementById('thumbList');

// Handle thumbnail uploads
thumbForm.addEventListener('submit', e => {
  e.preventDefault();
  let files = Array.from(thumbUpload.files);
  let thumbs = JSON.parse(localStorage.getItem('mainThumbs')) || [];

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      // Save image + empty caption
      thumbs.push({ src: reader.result, caption: "" });

      // Keep only the latest 2 thumbnails
      if (thumbs.length > 2) thumbs = thumbs.slice(-2);

      localStorage.setItem('mainThumbs', JSON.stringify(thumbs));
      renderThumbs();
    };
    reader.readAsDataURL(file);
  });
});

// Render thumbnails list with caption editor + delete button
function renderThumbs(){
  thumbList.innerHTML = "";
  let thumbs = JSON.parse(localStorage.getItem('mainThumbs')) || [];

  thumbs.forEach((item, index) => {
    const wrapper = document.createElement('div');

    // Thumbnail preview
    const img = document.createElement('img');
    img.src = item.src;
    img.style.width = "100px";

    // Caption editor
    const captionInput = document.createElement('input');
    captionInput.type = "text";
    captionInput.placeholder = "Enter caption";
    captionInput.value = item.caption || "";
    captionInput.onchange = () => {
      thumbs[index].caption = captionInput.value;
      localStorage.setItem('mainThumbs', JSON.stringify(thumbs));
    };

    // Delete button
    const btn = document.createElement('button');
    btn.textContent = "Delete";
    btn.onclick = () => {
      thumbs.splice(index,1);
      localStorage.setItem('mainThumbs', JSON.stringify(thumbs));
      renderThumbs();
    };

    // Append elements
    wrapper.appendChild(img);
    wrapper.appendChild(captionInput);
    wrapper.appendChild(btn);
    thumbList.appendChild(wrapper);
  });
}
renderThumbs();

// =======================
// Gallery CRUD (Modal with Captions)
// =======================

// Grab gallery form elements
const galleryForm = document.getElementById('galleryForm');
const galleryUpload = document.getElementById('galleryUpload');
const galleryList = document.getElementById('galleryList');

// Handle gallery uploads
galleryForm.addEventListener('submit', e => {
  e.preventDefault();
  const file = galleryUpload.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = () => {
      let images = JSON.parse(localStorage.getItem('galleryImages')) || [];

      // Save image + empty caption
      images.push({ src: reader.result, caption: "" });

      localStorage.setItem('galleryImages', JSON.stringify(images));
      renderGallery();
    };
    reader.readAsDataURL(file);
  }
});

// Render gallery list with caption editor + delete button
function renderGallery(){
  galleryList.innerHTML = "";
  let images = JSON.parse(localStorage.getItem('galleryImages')) || [];

  images.forEach((item, index) => {
    const wrapper = document.createElement('div');

    // Image preview
    const img = document.createElement('img');
    img.src = item.src;
    img.style.width = "100px";

    // Caption editor
    const captionInput = document.createElement('input');
    captionInput.type = "text";
    captionInput.placeholder = "Enter caption";
    captionInput.value = item.caption || "";
    captionInput.onchange = () => {
      images[index].caption = captionInput.value;
      localStorage.setItem('galleryImages', JSON.stringify(images));
    };

    // Delete button
    const btn = document.createElement('button');
    btn.textContent = "Delete";
    btn.onclick = () => {
      images.splice(index,1);
      localStorage.setItem('galleryImages', JSON.stringify(images));
      renderGallery();
    };

    // Append elements
    wrapper.appendChild(img);
    wrapper.appendChild(captionInput);
    wrapper.appendChild(btn);
    galleryList.appendChild(wrapper);
  });
}
renderGallery();

// =======================
// Footer CRUD
// =======================

// Grab footer form
const footerForm = document.getElementById('footerForm');
const footerText = document.getElementById('footerText');

// Save footer content to localStorage
footerForm.addEventListener('submit', e => {
  e.preventDefault();
  localStorage.setItem('footerContent', footerText.value);
  alert("Footer updated!");
});
