// =========================================================
// HOME — 4 cards com fotos misturadas dos artistas + foto de destaque
// Pega as 4 primeiras fotos de cada artista (de artists-data.js),
// embaralha tudo e revezam nos 4 cards, trocando a cada 3,5s.
// Se alguma foto não existir, o site pula pra próxima do revezamento.
// =========================================================

const CARD_COUNT = 4;
const PHOTOS_PER_ARTIST = 4;
const HOME_INTERVAL = 3500; // 3,5 segundos

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildPool() {
  const pool = [];
  ARTISTS.forEach((artist) => {
    const limit = Math.min(PHOTOS_PER_ARTIST, artist.photoCount);
    for (let n = 1; n <= limit; n++) pool.push({ id: artist.id, n });
  });
  const mixed = shuffle(pool);
  // múltiplo de 4 pra os 4 cards nunca mostrarem a mesma foto ao mesmo tempo
  return mixed.slice(0, mixed.length - (mixed.length % CARD_COUNT));
}

// Avança no revezamento (de 4 em 4) até achar uma foto que exista.
function loadNextEntry(state, pool, attemptsLeft, isFirst) {
  if (attemptsLeft <= 0) return;

  state.index = (state.index + CARD_COUNT) % pool.length;
  const entry = pool[state.index];
  const src = photoUrl(entry.id, entry.n);

  const probe = new Image();
  probe.onload = () => {
    if (isFirst) state.img.src = src;
    else crossfadeTo(state.card, state.img, src);
  };
  probe.onerror = () => loadNextEntry(state, pool, attemptsLeft - 1, isFirst);
  probe.src = src;
}

function renderHome() {
  const container = document.getElementById('homeCards');
  const pool = buildPool();
  if (pool.length < CARD_COUNT) return;

  const attempts = Math.ceil(pool.length / CARD_COUNT);

  for (let k = 0; k < CARD_COUNT; k++) {
    const card = document.createElement('div');
    card.className = 'artist-card';

    const img = document.createElement('img');
    img.alt = '';
    card.appendChild(img);
    container.appendChild(card);

    // começa uma posição "antes" do card k, pra a primeira avançada cair nele
    const state = { index: (k - CARD_COUNT + pool.length) % pool.length, card, img };
    loadNextEntry(state, pool, attempts, true);

    // cada card troca em um momento levemente diferente
    setTimeout(() => {
      setInterval(() => loadNextEntry(state, pool, attempts, false), HOME_INTERVAL);
    }, k * 900);
  }
}

// Foto de destaque: imagens/home/destaque.(jpg|jpeg|png|webp).
// Se nenhuma existir, a seção simplesmente não aparece.
function loadFeatured() {
  const section = document.querySelector('.home-featured');
  if (!section) return;
  const img = section.querySelector('img');
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  let i = 0;

  function tryNext() {
    if (i >= exts.length) return; // nenhuma encontrada: continua escondida
    const src = `imagens/home/destaque.${exts[i++]}`;
    const probe = new Image();
    probe.onload = () => {
      img.src = src;
      section.hidden = false;
    };
    probe.onerror = tryNext;
    probe.src = src;
  }
  tryNext();
}

renderHome();
loadFeatured();
