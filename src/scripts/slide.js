// Slideshow javascript
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
const menuOpenBtn =   document.querySelector('.menu-open-btn');
const menuCloseBtn = document.querySelector('.menu-close-btn');
const offCanvasMenu = document.querySelector('.offcanvas-menu');

menuCloseBtn.addEventListener('click', function(){
  offCanvasMenu.classList.remove('translate-x-0');
  offCanvasMenu.classList.add('translate-x-full');

});
menuOpenBtn.addEventListener('click', function(){
  offCanvasMenu.classList.remove('translate-x-full');
  offCanvasMenu.classList.add('translate-x-0');
});