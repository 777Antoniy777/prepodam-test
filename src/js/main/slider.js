import Swiper from 'swiper';

console.log(Swiper)
// const slider = document.querySelector('.programme___slider');

let swiper = new Swiper('.swiper-container', {
  speed: 400,
  grabCursor: true,
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
});

console.log(swiper);

// slider = document.querySelector('.slider').swiper;

// console.log(swiper);
