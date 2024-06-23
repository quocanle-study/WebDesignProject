const menuItem = document.querySelector('.menu-item');
const menuOpenBtn = document.querySelector('.menu-open-btn');
const menuCloseBtn = document.querySelector('.menu-close-btn');
const offCanvasMenu = document.querySelector('.offcanvas-menu');

menuItem.style.opacity = '1';
menuItem.style.visibility = 'visible';

function toggleMenu() {
    offCanvasMenu.classList.toggle('translate-x-full');
    offCanvasMenu.classList.toggle('translate-x-0');
}

menuCloseBtn.addEventListener('click', toggleMenu);
menuOpenBtn.addEventListener('click', toggleMenu);