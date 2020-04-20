// const html = document.querySelector('html');
const body = document.querySelector('body');
const header = body.querySelector('.main-header');
const button = header.querySelector('.nav__button');
const main = body.querySelector('.main');

const onButtonClick = (evt) => {
  evt.preventDefault();
  body.classList.toggle('menu-open');
};

button.addEventListener('click', onButtonClick);
