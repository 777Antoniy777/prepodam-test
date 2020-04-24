import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider';

const slider = tns({
  container: '.programme___slider',
  items: 2,
  slideBy: 1,
  center: true,
  fixedWidth: 240,
  gutter: 10,
  arrowKeys: true,
});

console.log(slider)
