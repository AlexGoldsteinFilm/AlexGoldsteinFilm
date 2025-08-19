// Lightbox for album pages
(function () {
  function initLightbox() {
    const gallery = document.querySelector('.album-gallery');
    if (!gallery) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'lb-backdrop';
    const img = document.createElement('img');
    const close = document.createElement('button');
    close.className = 'lb-close';
    close.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    backdrop.appendChild(img);
    document.body.appendChild(backdrop);
    document.body.appendChild(close);
    gallery.addEventListener('click', (e) => {
      const target = e.target.closest('img'); if (!target) return;
      img.src = target.getAttribute('data-large') || target.src;
      backdrop.classList.add('open');
    });
    function hide(){ backdrop.classList.remove('open'); img.src = ''; }
    backdrop.addEventListener('click', hide);
    close.addEventListener('click', hide);
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') hide(); });
  }
  document.addEventListener('DOMContentLoaded', initLightbox);
})();