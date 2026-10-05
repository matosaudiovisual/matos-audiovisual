// =========================================================
// TRABALHOS ARTÍSTICOS — monta os cards a partir de uma lista
// =========================================================
//
// COMO ADICIONAR UM ARTISTA NOVO:
// 1. Crie a pasta /imagens/artistico/artista-XX/ com suas fotos
//    numeradas 01, 02, 03... (extensão: veja artists-data.js)
// 2. Adicione uma linha em artists-data.js com o id da pasta e
//    quantas fotos tem. A ordem no grid (mais novo primeiro) é
//    automática.
//
// Se alguma foto não existir na pasta, o site pula pra próxima
// que existir. Se a pasta não tiver nenhuma foto, o card some.

// ARTISTS, photoUrl e findAvailablePhoto vêm de outros arquivos
// (artists-data.js e slideshow.js), carregados antes deste.

const SLIDESHOW_INTERVAL = 3500; // 3,5 segundos

function buildCard(artist) {
  const a = document.createElement('a');
  a.className = 'artist-card';
  a.href = `artista.html?id=${artist.id}`;
  a.dataset.id = artist.id;

  const img = document.createElement('img');
  img.alt = ''; // proposital: sem nome/identificação do artista

  a.appendChild(img);
  return { el: a, img, artist };
}

function startCard(card) {
  const { artist } = card;

  // primeira foto: a primeira que existir na pasta
  findAvailablePhoto(artist.id, 1, artist.photoCount, (n, src) => {
    if (n === null) { card.el.remove(); return; }

    card.img.src = src;
    let current = n;

    // pequeno atraso aleatório pra os cards não trocarem todos juntos
    const startDelay = Math.random() * SLIDESHOW_INTERVAL;

    setTimeout(() => {
      setInterval(() => {
        // próxima foto que existir depois da atual
        findAvailablePhoto(artist.id, current + 1, artist.photoCount, (next, nextSrc) => {
          if (next === null || next === current) return;
          current = next;
          crossfadeTo(card.el, card.img, nextSrc);
        });
      }, SLIDESHOW_INTERVAL);
    }, startDelay);
  });
}

function render() {
  const grid = document.getElementById('artistGrid');

  // mais recente primeiro: ordena pelo número da pasta, decrescente
  const ordered = [...ARTISTS].sort((a, b) => {
    const numA = parseInt(a.id.split('-')[1], 10);
    const numB = parseInt(b.id.split('-')[1], 10);
    return numB - numA;
  });

  ordered.forEach((artist) => {
    const card = buildCard(artist);
    grid.appendChild(card.el);
    startCard(card);
  });
}

render();
