const menuOpenBtn = document.querySelector(".menu-open-btn");
const menuCloseBtn = document.querySelector(".menu-close-btn");
const offCanvasMenu = document.querySelector(".offcanvas-menu");

function toggleMenu() {
  offCanvasMenu.classList.toggle("translate-x-full");
  offCanvasMenu.classList.toggle("translate-x-0");
}

menuCloseBtn.addEventListener("click", toggleMenu);
menuOpenBtn.addEventListener("click", toggleMenu);
