// =========================================================
// FUNÇÕES COMPARTILHADAS DAS FOTOS (Home e Trabalhos Artísticos)
// =========================================================

const FADE_MS = 500; // duração do cruzamento (meio segundo)

// Procura a primeira foto que EXISTE na pasta do artista, começando
// em "fromN" e seguindo pra próxima (voltando ao início se precisar).
// Se uma foto não existir, pula pra seguinte. Nunca usa imagem de fora.
//   cb(n, src)  -> achou a foto de número n
//   cb(null)    -> não achou nenhuma na pasta
function findAvailablePhoto(artistId, fromN, photoCount, cb) {
  let attempt = 0;
  function tryNext() {
    if (attempt >= photoCount) { cb(null); return; }
    const n = ((fromN - 1 + attempt) % photoCount) + 1;
    attempt++;
    const src = photoUrl(artistId, n);
    const probe = new Image();
    probe.onload = () => cb(n, src);
    probe.onerror = tryNext;
    probe.src = src;
  }
  tryNext();
}

// Troca a foto de um card com cruzamento (sem passar pelo preto).
// "src" já deve ser uma foto que existe.
function crossfadeTo(card, baseImg, src) {
  const top = document.createElement('img');
  top.className = 'fade-in';
  top.alt = '';
  top.src = src;
  card.appendChild(top);

  // dois frames pra garantir que a transição de opacidade rode
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { top.style.opacity = 1; });
  });

  setTimeout(() => {
    baseImg.onload = () => { baseImg.onload = null; top.remove(); };
    baseImg.src = src;
    setTimeout(() => top.remove(), 400); // segurança
  }, FADE_MS + 50);
}
