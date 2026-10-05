// =========================================================
// PÁGINA INDIVIDUAL DO ARTISTA
// Lê o id da URL (?id=artista-06), monta a galeria masonry
// e controla o lightbox com navegação por setas.
// =========================================================

function getArtistFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return ARTISTS.find((a) => a.id === id) || null;
}

const artist = getArtistFromURL();
const masonry = document.getElementById('artistMasonry');
let photos = [];      // fotos que estão na galeria (as que existem)
let currentIndex = 0;
let lastDirection = 1; // 1 = avançando, -1 = voltando

function buildGallery() {
  if (!artist) {
    masonry.innerHTML = '<p class="not-found">Trabalho não encontrado.</p>';
    return;
  }

  for (let i = 1; i <= artist.photoCount; i++) {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = '';
    img.src = photoUrl(artist.id, i);
    // foto que não existe na pasta: some da galeria (pula pra próxima)
    img.onerror = function () {
      console.warn('Foto não encontrada, pulando:', this.getAttribute('src'));
      this.remove();
    };
    img.addEventListener('click', () => openLightbox(img));
    masonry.appendChild(img);
  }
}

// ---------- Lightbox com navegação ----------

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const counter = document.getElementById('lightboxCounter');

function renderLightboxImage() {
  lightboxContent.innerHTML = '';
  const img = document.createElement('img');
  img.alt = '';
  // se essa foto não carregar, tira da lista e vai pra próxima
  img.onerror = function () {
    photos.splice(currentIndex, 1);
    if (photos.length === 0) { closeLightbox(); return; }
    currentIndex = lastDirection > 0
      ? currentIndex % photos.length
      : (currentIndex - 1 + photos.length) % photos.length;
    renderLightboxImage();
  };
  img.src = photos[currentIndex].src;
  lightboxContent.appendChild(img);
  counter.textContent = `${currentIndex + 1} / ${photos.length}`;
}

function openLightbox(clickedImg) {
  photos = [...masonry.querySelectorAll('img')];
  currentIndex = Math.max(0, photos.indexOf(clickedImg));
  lastDirection = 1;
  renderLightboxImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxContent.innerHTML = '';
}

function nextPhoto() {
  lastDirection = 1;
  currentIndex = (currentIndex + 1) % photos.length;
  renderLightboxImage();
}

function prevPhoto() {
  lastDirection = -1;
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  renderLightboxImage();
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxNext').addEventListener('click', nextPhoto);
document.getElementById('lightboxPrev').addEventListener('click', prevPhoto);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextPhoto();
  if (e.key === 'ArrowLeft') prevPhoto();
});

buildGallery();
