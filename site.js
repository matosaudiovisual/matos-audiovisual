// =========================================================
// MENU FIXO + RODAPÉ — injetados automaticamente em todas as
// páginas. Pra mudar algo no menu/rodapé, mexa só aqui.
// =========================================================

// ---- CONFIGURAÇÃO (edite aqui) ----
const WHATSAPP_DISPLAY = '(11) 92757-2626';
const WHATSAPP_NUMBER  = '5511927572626'; // 55 (Brasil) + DDD + número
const WHATSAPP_MESSAGE = 'Olá! Vim pelo seu portfólio e gostaria de conversar sobre um projeto.';

(function () {
  // ---------- MENU ----------
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <a class="motion-tag" href="index.html">Home</a>
    <div class="wa">
      <span class="wa-number">${WHATSAPP_DISPLAY}</span>
      <a class="wa-btn" href="${waLink}" target="_blank" rel="noopener">
        <span class="wa-label">Falar no WhatsApp</span> <span class="wa-arrow">&#8599;</span>
      </a>
    </div>
  `;
  document.body.prepend(header);

  // ---------- RODAPÉ ----------
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <p>&copy; ${new Date().getFullYear()} Matos Audiovisual. Todos os direitos reservados.</p>
    <p class="credit">São Paulo, Brasil &middot; Site desenvolvido por Matos Audiovisual</p>
  `;
  document.body.appendChild(footer);
})();
