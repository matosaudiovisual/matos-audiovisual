// =========================================================
// LISTA DE ARTISTAS — fonte única de verdade
// Usada tanto pelo grid (artistico.js) quanto pela página
// individual (artista.js). Pra adicionar um artista novo,
// mexa só aqui.
//
// id         -> precisa bater com o nome da pasta em
//               /imagens/artistico/
// photoCount -> quantas fotos tem dentro dessa pasta
//               (numeradas 01, 02, 03...)
// ext        -> (opcional) extensão das fotos da pasta. Se não
//               colocar, o site usa 'jpg'.
// extOverrides -> (opcional) exceções por foto, no formato
//               { número_da_foto: 'extensão' }. Ex.: { 2: 'jpg' }
//               significa que a foto 02 é .jpg mesmo que o resto
//               da pasta use outra extensão.
//               Use sempre extensão em minúsculas (jpg, png).
// =========================================================

const ARTISTS = [
  { id: 'artista-01', photoCount: 18 },
  { id: 'artista-02', photoCount: 15 },
  { id: 'artista-03', photoCount: 16 },
  { id: 'artista-04', photoCount: 6 },
  { id: 'artista-05', photoCount: 51 },
  { id: 'artista-06', photoCount: 10, ext: 'png', extOverrides: { 2: 'jpg' } },
  { id: 'artista-07', photoCount: 19 },
  { id: 'artista-08', photoCount: 10 },
  { id: 'artista-09', photoCount: 10 },
  { id: 'artista-10', photoCount: 13 },
  { id: 'artista-11', photoCount: 10 },
  { id: 'artista-12', photoCount: 16 },
  { id: 'artista-13', photoCount: 17 },
  { id: 'artista-14', photoCount: 18 },
  { id: 'artista-15', photoCount: 20 },
  { id: 'artista-16', photoCount: 18 },
];

// Monta o caminho real de uma foto, respeitando a extensão de cada
// artista. Usado pela Home, pelo grid e pela página individual.
function photoUrl(artistId, n) {
  const artist = ARTISTS.find((a) => a.id === artistId) || {};
  const ext = (artist.extOverrides && artist.extOverrides[n]) || artist.ext || 'jpg';
  const num = String(n).padStart(2, '0');
  return `imagens/artistico/${artistId}/${num}.${ext}`;
}
