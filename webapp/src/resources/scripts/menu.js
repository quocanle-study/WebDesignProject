

const menuOpenBtn = document.querySelector('.menu-open-btn');
const menuCloseBtn = document.querySelector('.menu-close-btn');
const offCanvasMenu = document.querySelector('.offcanvas-menu');

menuOpenBtn.style.opacity = '1';
menuOpenBtn.style.visibility = 'visible';
menuCloseBtn.style.opacity = '1';
menuCloseBtn.style.visibility = 'visible';

function toggleMenu() {
    offCanvasMenu.classList.toggle('translate-x-full');
    offCanvasMenu.classList.toggle('translate-x-0');
}

menuCloseBtn.addEventListener('click', toggleMenu);
menuOpenBtn.addEventListener('click', toggleMenu);
