// --- Login e Cadastro ---
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const appSection = document.getElementById('app-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');
const userNameSpan = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}
function addUser(username, password) {
  const users = getUsers();
  if(users.some(u => u.username === username)) return false;
  users.push({username, password});
  saveUsers(users);
  return true;
}
function validateUser(username, password) {
  return getUsers().find(u => u.username === username && u.password === password);
}

showRegisterBtn.onclick = () => {
  loginSection.classList.add('hidden');
  registerSection.classList.remove('hidden');
  loginError.textContent = '';
  registerError.textContent = '';
};

showLoginBtn.onclick = () => {
  registerSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
  loginError.textContent = '';
  registerError.textContent = '';
};

loginForm.onsubmit = e => {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  if (validateUser(username, password)) {
    enterApp(username);
  } else {
    loginError.textContent = 'Usuário ou senha incorretos.';
  }
};

registerForm.onsubmit = e => {
  e.preventDefault();
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value.trim();
  const confirm = document.getElementById('register-password-confirm').value.trim();
  if (password !== confirm) {
    registerError.textContent = 'As senhas não coincidem.';
    return;
  }
  if (addUser(username, password)) {
    registerError.textContent = 'Usuário cadastrado com sucesso! Faça login.';
    registerForm.reset();
  } else {
    registerError.textContent = 'Usuário já existe.';
  }
};

function enterApp(username) {
  loginSection.classList.add('hidden');
  registerSection.classList.add('hidden');
  appSection.classList.remove('hidden');
  userNameSpan.textContent = username;
  loadImages();
  carrossel(); // Inicializa o carrossel
}

logoutBtn.onclick = () => {
  appSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
  loginForm.reset();
  registerForm.reset();
};

// --- CRUD de Imagens e Carrossel ---
const imageForm = document.getElementById('image-form');
const imageList = document.getElementById('image-list');

function getImages() {
  return JSON.parse(localStorage.getItem('carouselImages') || '[]');
}
function saveImages(images) {
  localStorage.setItem('carouselImages', JSON.stringify(images));
}

function isValidImageUrl(url) {
  return (url.match(/\.(jpeg|jpg|gif|png|svg)$/i) != null);
}

function addImage(url) {
  if (!isValidImageUrl(url)) {
    alert('URL da imagem inválida. Por favor, insira uma URL válida (.jpeg, .jpg, .gif, .png, .svg).');
    return;
  }
  const images = getImages();
  images.push(url);
  saveImages(images);
  loadImages();
  carrossel();
}

imageForm.onsubmit = e => {
  e.preventDefault();
  const url = document.getElementById('image-url').value.trim();
  if (!url) return;
  addImage(url);
  imageForm.reset();
};

function loadImages() {
  const images = getImages();
  imageList.innerHTML = '';
  images.forEach((url, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${url}" alt="Imagem ${index + 1}" width="100" onerror="this.onerror=null;this.src='https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e5ebd724-dd94-41cc-bb89-230353f2e679.png'">
      <button onclick="deleteImage(${index})">Excluir</button>
    `;
    imageList.appendChild(li);
  });
}

function deleteImage(index) {
  const images = getImages();
  images.splice(index, 1);
  saveImages(images);
  loadImages();
  carrossel();
}

// --- Função separada do carrossel ---
function carrossel() {
  const carouselTrack = document.getElementById('track');
  const carouselNav = document.getElementById('nav');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  // Limpa o conteúdo do carrossel antes de adicionar novos slides
  carouselTrack.innerHTML = '';

  const images = getImages();

  // Se não tiver imagens no CRUD, adicionar imagens fixas da marcação original para inicializar
  if (images.length === 0) {
    // Imagens fixas iniciais - substitua os caminhos conforme necessário
    const fixedImages = [
      {src: 'Imagens/Marceline.jpg', alt: 'Marceline'},
      {src: 'Imagens/Simon.jpg', alt: 'Simon'},
      {src: 'Imagens/BMO - Adventure Time.jpg', alt: 'BMO'},
      {src: 'Imagens/Jake.jpg', alt: 'Jake'},
      {src: 'Imagens/Finn.jpg', alt: 'Finn'},
      {src: 'Imagens/Jubs.jpg', alt: 'Princesa Jujuba'},
      {src: 'Imagens/bonniemacarrão.jpg', alt: 'Bonnie'},
      {src: 'Imagens/bubbline.jpg', alt: 'bubbline'},
      {src: 'Imagens/Bonnie (3).jpg', alt: 'Bonnie'},
      {src: 'Imagens/Bonnie.jpg', alt: 'Bonnie'},
      {src: 'Imagens/marcejuju.jpg', alt: 'meandbonnie'},
      {src: 'Imagens/marceline-and-princess-bubblegum.jpg', alt: 'meandbonnie'},
      {src: 'Imagens/meandbonnie.jpg', alt: 'meandbonnie'},
      {src: 'Imagens/winter-king.jpg', alt: 'winter king'},
      {src: 'Imagens/Noitedefilmes.jpg', alt: 'Noite de filmes'},
      {src: 'Imagens/selfiebonnie.jpg', alt: 'Bonnie'}
    ];
    fixedImages.forEach(({src, alt}) => {
      const slide = document.createElement('div');
      slide.classList.add('carousel-slide');
      slide.innerHTML = `<img src="${src}" alt="${alt}" onerror="this.onerror=null;this.src='https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e39cbf60-13e8-4c9f-80c1-560beb028ff6.png'">`;
      carouselTrack.appendChild(slide);
    });
  } else { // Adiciona imagens do CRUD ao carrossel
    images.forEach(url => {
      const slide = document.createElement('div');
      slide.classList.add('carousel-slide');
      slide.innerHTML = `<img src="${url}" alt="Slide" onerror="this.onerror=null;this.src='https://placehold.co/1920x1080/ff4d4d/fff?text=Imagem+Inválida'">`;
      carouselTrack.appendChild(slide);
    });
  }

  const allSlides = Array.from(carouselTrack.children);
  let currentIndex = 0;

  function updateCarousel() {
    if (allSlides.length === 0) return;
    const slideWidth = allSlides[0].getBoundingClientRect().width;
    carouselTrack.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    Array.from(carouselNav.children).forEach((dot, i) =>
      dot.classList.toggle('active', i === currentIndex)
    );
  }

  function moveNext() {
    currentIndex = (currentIndex + 1) % allSlides.length;
    updateCarousel();
  }

  function movePrev() {
    currentIndex = (currentIndex - 1 + allSlides.length) % allSlides.length;
    updateCarousel();
  }

  prevButton.onclick = movePrev;
  nextButton.onclick = moveNext;

  // Adiciona bolinhas de navegação para todos os slides
  carouselNav.innerHTML = ''; // Limpa a navegação anterior
  for (let i = 0; i < allSlides.length; i++) {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => {
      currentIndex = i;
      updateCarousel();
    };
    carouselNav.appendChild(dot);
  }

  updateCarousel();
}