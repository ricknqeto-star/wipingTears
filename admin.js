// =======================
// Login System
// =======================
const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('login');
const dashboard = document.getElementById('dashboard');
const logoutBtn = document.getElementById('logoutBtn');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if(user === "admin" && pass === "1234"){
    loginSection.style.display = "none";
    dashboard.style.display = "flex";
  } else {
    alert("Invalid credentials");
  }
});

logoutBtn.addEventListener('click', () => {
  dashboard.style.display = "none";
  loginSection.style.display = "block";
});

// =======================
// Sidebar Navigation
// =======================
const links = document.querySelectorAll('.sidebar a');
const sections = document.querySelectorAll('.editor-section');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.dataset.section;
    sections.forEach(sec => sec.style.display = "none");
    document.getElementById(`editor-${target}`).style.display = "block";
  });
});

// =======================
// Header
// =======================
document.getElementById('headerForm').addEventListener('submit', e => {
  e.preventDefault();
  localStorage.setItem('headerText', document.getElementById('headerText').value);
  alert("Header updated!");
});

// =======================
// Hero
// =======================
document.getElementById('heroForm').addEventListener('submit', e => {
  e.preventDefault();
  localStorage.setItem('heroHeading', document.getElementById('heroHeading').value);
  localStorage.setItem('heroSlogan', document.getElementById('heroSlogan').value);
  alert("Hero section updated!");
});

// =======================
// About
// =======================
document.getElementById('aboutForm').addEventListener('submit', e => {
  e.preventDefault();
  localStorage.setItem('aboutDescription', document.getElementById('aboutDescription').value);
  localStorage.setItem('aboutMission', document.getElementById('aboutMission').value);
  alert("About section updated!");
});

// =======================
// Programs CRUD with Preload + Edit/Save
// =======================
const programForm = document.getElementById('programForm');
const programList = document.getElementById('programList');

programForm.addEventListener('submit', e => {
  e.preventDefault();
  let programs = JSON.parse(localStorage.getItem('programs')) || [];
  programs.push({
    title: document.getElementById('programTitle').value,
    desc: document.getElementById('programDesc').value
  });
  localStorage.setItem('programs', JSON.stringify(programs));
  programForm.reset();
  renderPrograms();
});

function renderPrograms(){
  programList.innerHTML = "";
  let programs = JSON.parse(localStorage.getItem('programs')) || [];

  programs.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('program-item');

    const h3 = document.createElement('h3');
    h3.textContent = item.title;
    const p = document.createElement('p');
    p.textContent = item.desc;

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      document.getElementById('programTitle').value = item.title;
      document.getElementById('programDesc').value = item.desc;
      // Remove old entry so saving replaces it
      programs.splice(index,1);
      localStorage.setItem('programs', JSON.stringify(programs));
      renderPrograms();
    };

    // Save button (after editing)
    const saveBtn = document.createElement('button');
    saveBtn.textContent = "Save";
    saveBtn.onclick = () => {
      programs[index] = {
        title: document.getElementById('programTitle').value,
        desc: document.getElementById('programDesc').value
      };
      localStorage.setItem('programs', JSON.stringify(programs));
      renderPrograms();
    };

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      programs.splice(index,1);
      localStorage.setItem('programs', JSON.stringify(programs));
      renderPrograms();
    };

    wrapper.appendChild(h3);
    wrapper.appendChild(p);
    wrapper.appendChild(editBtn);
    wrapper.appendChild(saveBtn);
    wrapper.appendChild(delBtn);
    programList.appendChild(wrapper);
  });
}
renderPrograms(); // preload existing programs



// =======================
// Impact CRUD
// =======================
const impactForm = document.getElementById('impactForm');
const impactList = document.getElementById('impactList');

impactForm.addEventListener('submit', e => {
  e.preventDefault();
  let impacts = JSON.parse(localStorage.getItem('impacts')) || [];
  impacts.push({
    number: document.getElementById('impactNumber').value,
    type: document.getElementById('impactType').value
  });
  localStorage.setItem('impacts', JSON.stringify(impacts));
  renderImpacts();
});

function renderImpacts(){
  impactList.innerHTML = "";
  let impacts = JSON.parse(localStorage.getItem('impacts')) || [];
  impacts.forEach((item, index) => {
    const wrapper = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = item.number;
    const p = document.createElement('p');
    p.textContent = item.type;

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      document.getElementById('impactNumber').value = item.number;
      document.getElementById('impactType').value = item.type;
      impacts.splice(index,1);
      localStorage.setItem('impacts', JSON.stringify(impacts));
      renderImpacts();
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      impacts.splice(index,1);
      localStorage.setItem('impacts', JSON.stringify(impacts));
      renderImpacts();
    };

    wrapper.appendChild(h3);
    wrapper.appendChild(p);
    wrapper.appendChild(editBtn);
    wrapper.appendChild(delBtn);
    impactList.appendChild(wrapper);
  });
}
renderImpacts();

// =======================
// Gallery CRUD
// =======================
const galleryForm = document.getElementById('galleryForm');
const galleryUpload = document.getElementById('galleryUpload');
const galleryList = document.getElementById('galleryList');

galleryForm.addEventListener('submit', e => {
  e.preventDefault();
  const file = galleryUpload.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = () => {
      let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
      images.push({ src: reader.result, caption: "" });
      localStorage.setItem('galleryImages', JSON.stringify(images));
      renderGallery();
    };
    reader.readAsDataURL(file);
  }
});

function renderGallery(){
  galleryList.innerHTML = "";
  let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
  images.forEach((item, index) => {
    const wrapper = document.createElement('div');
    const img = document.createElement('img');
    img.src = item.src;
    img.style.width = "100px";

    const captionInput = document.createElement('input');
    captionInput.type = "text";
    captionInput.placeholder = "Enter caption";
    captionInput.value = item.caption || "";
    captionInput.onchange = () => {
      images[index].caption = captionInput.value;
      localStorage.setItem('galleryImages', JSON.stringify(images));
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      images.splice(index,1);
      localStorage.setItem('galleryImages', JSON.stringify(images));
      renderGallery();
    };

    wrapper.appendChild(img);
    wrapper.appendChild(captionInput);
    wrapper.appendChild(delBtn);
    galleryList.appendChild(wrapper);
  });
}
renderGallery();
// =======================
// Thumbnails CRUD (Main Page with Captions + Drag & Drop + Edit)
// =======================
const thumbForm = document.getElementById('thumbForm');
const thumbUpload = document.getElementById('thumbUpload');
const thumbList = document.getElementById('thumbList');

thumbForm.addEventListener('submit', e => {
  e.preventDefault();
  let files = Array.from(thumbUpload.files);
  let thumbs = JSON.parse(localStorage.getItem('mainThumbs')) || [];

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      thumbs.push({ src: reader.result, caption: "" });
      if (thumbs.length > 2) thumbs = thumbs.slice(-2); // enforce max 2
      localStorage.setItem('mainThumbs', JSON.stringify(thumbs));
      renderThumbs();
    };
    reader.readAsDataURL(file);
  });
});

function renderThumbs(){
  thumbList.innerHTML = "";
  let thumbs = JSON.parse(localStorage.getItem('mainThumbs')) || [];

  thumbs.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('thumb-item');
    wrapper.draggable = true;
    wrapper.dataset.index = index;

    // Drag events
    wrapper.addEventListener('dragstart', e => {
      e.dataTransfer.setData('index', index);
    });
    wrapper.addEventListener('dragover', e => e.preventDefault());
    wrapper.addEventListener('drop', e => {
      e.preventDefault();
      let fromIndex = e.dataTransfer.getData('index');
      let toIndex = index;
      let temp = thumbs[fromIndex];
      thumbs.splice(fromIndex,1);
      thumbs.splice(toIndex,0,temp);
      localStorage.setItem('mainThumbs', JSON.stringify(thumbs));
      renderThumbs();
    });

    // Thumbnail preview
    const img = document.createElement('img');
    img.src = item.src;
    img.style.width = "120px";

    // Caption editor
    const captionInput = document.createElement('input');
    captionInput.type = "text";
    captionInput.value = item.caption || "";
    captionInput.placeholder = "Enter caption";
    captionInput.onchange = () => {
      thumbs[index].caption = captionInput.value;
      localStorage.setItem('mainThumbs', JSON.stringify(thumbs));
    };

    // Replace image
    const replaceInput = document.createElement('input');
    replaceInput.type = "file";
    replaceInput.onchange = () => {
      const file = replaceInput.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload = () => {
          thumbs[index].src = reader.result;
          localStorage.setItem('mainThumbs', JSON.stringify(thumbs));
          renderThumbs();
        };
        reader.readAsDataURL(file);
      }
    };

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      thumbs.splice(index,1);
      localStorage.setItem('mainThumbs', JSON.stringify(thumbs));
      renderThumbs();
    };

    wrapper.appendChild(img);
    wrapper.appendChild(captionInput);
    wrapper.appendChild(replaceInput);
    wrapper.appendChild(delBtn);
    thumbList.appendChild(wrapper);
  });
}
renderThumbs();


// =======================
// Get Involved
// =======================
document.getElementById('getInvolvedForm').addEventListener('submit', e => {
  e.preventDefault();
  localStorage.setItem('donationDesc', document.getElementById('donationDesc').value);
  localStorage.setItem('volunteerDesc', document.getElementById('volunteerDesc').value);
  alert("Get Involved section updated!");
});

// =======================
// Footer
// =======================
document.getElementById('footerForm').addEventListener('submit', e => {
  e.preventDefault();
  localStorage.setItem('footerDesc', document.getElementById('footerDesc').value);
  localStorage.setItem('footerEmail', document.getElementById('footerEmail').value);
  localStorage.setItem('footerPhone', document.getElementById('footerPhone').value);
  localStorage.setItem('footerLocation', document.getElementById('footerLocation').value);
  localStorage.setItem('footerFacebook', document.getElementById('footerFacebook').value);
  localStorage.setItem('footerInstagram', document.getElementById('footerInstagram').value);
  localStorage.setItem('footerLinkedin', document.getElementById('footerLinkedin').value);
  alert("Footer updated!");
});
