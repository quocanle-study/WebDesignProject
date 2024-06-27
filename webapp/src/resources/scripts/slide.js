document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".mySlides");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    // Show the first 3 slides
    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < 3; i++) {
            let currentIndex = (slideIndex + i) % slides.length;
            slides[currentIndex].style.display = "block";
        }
    }

    showSlides(); // Initial display of slides

    // Automatic slide change
    function autoSlides() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlides();
    }

    let slideInterval = setInterval(autoSlides, 5000); // Change slide every 3 seconds

    // Next/previous controls
    function plusSlides(n) {
        slideIndex = (slideIndex + n + slides.length) % slides.length;
        showSlides();
    }

    prevButton.addEventListener("click", function() {
        plusSlides(-1);
        clearInterval(slideInterval); // Stop automatic sliding when button is clicked
        slideInterval = setInterval(autoSlides, 5000); // Restart automatic sliding
    });

    nextButton.addEventListener("click", function() {
        plusSlides(1);
        clearInterval(slideInterval); // Stop automatic sliding when button is clicked
        slideInterval = setInterval(autoSlides, 5000); // Restart automatic sliding
    });
});
