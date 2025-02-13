const infinitescroll = document.querySelectorAll('.infinitescroll');

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    infinitescroll.forEach(infinitescroll => {
        infinitescroll.setAttribute('data-animated', true);
    });
}

let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  setTimeout(showSlides, 3000);
}

document.addEventListener("DOMContentLoaded", showSlides);

function plusSlides(n) {
  slideIndex += n - 1; 
  showSlides();
}

function currentSlide(n) {
  slideIndex = n - 1; 
  showSlides();
}
