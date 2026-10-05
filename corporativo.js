// =========================================================
// TRABALHOS CORPORATIVOS — monta os cards a partir da lista
// =========================================================

// Tenta a capa em alta resolução; se o YouTube não tiver, ele devolve
// uma imagem cinza pequena (120px). Nesse caso caímos pra capa menor,
// que existe pra todos os vídeos.
const THUMB_SIZES = ['maxresdefault', 'mqdefault'];

function setThumb(img, videoId) {
  let i = 0;
  function tryNext() {
    if (i >= THUMB_SIZES.length) return;
    img.src = `https://img.youtube.com/vi/${videoId}/${THUMB_SIZES[i++]}.jpg`;
  }
  img.onload = () => {
    if (img.naturalWidth <= 200) tryNext(); // é o cinza genérico
  };
  img.onerror = tryNext;
  tryNext();
}

function buildVideoCard(video) {
  const a = document.createElement('a');
  a.className = 'video-card';
  a.href = `https://www.youtube.com/watch?v=${video.videoId}`;
  a.target = '_blank';
  a.rel = 'noopener';

  const img = document.createElement('img');
  img.alt = '';
  setThumb(img, video.videoId);

  const play = document.createElement('span');
  play.className = 'video-card-play';
  play.textContent = '▶';

  a.appendChild(img);
  a.appendChild(play);
  return a;
}

function render() {
  const grid = document.getElementById('videoGrid');
  VIDEOS.forEach((video) => {
    grid.appendChild(buildVideoCard(video));
  });
}

render();
