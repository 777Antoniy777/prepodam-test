import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider';

const slider = tns({
  container: '.programme___slider',
  items: 2,
  slideBy: 1,
  center: true,
  fixedWidth: 260,
  gutter: 10,
  controls: false,
  nav: false,
});

const nav = document.querySelector('.tns-liveregion');
nav.style.display = 'none';

console.log(slider.getInfo(), nav);
