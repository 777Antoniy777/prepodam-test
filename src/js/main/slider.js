import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider';

const slider = tns({
  container: '.programme___slider',
  // items: 2,
  // slideBy: 1,
  // center: true,
  // fixedWidth: 260,
  // gutter: 10,
  controls: false,
  nav: false,

  items: 1,
  slideBy: 1,
  center: true,
  // autoWidth: true,
  edgePadding: 15,
  gutter: 16,
});

if (slider.isOn) {
  const outerWrapper = document.querySelector('.tns-ovh');
  outerWrapper.style.overflow = 'visible';
}

slider.events.on('touchEnd', (evt) => {
  const slideItems = evt.slideItems;
  const slideItemsArr = Array.from(slideItems);

  console.log(evt);

  const activeSlideItems = slideItemsArr.filter(elem => {
    return elem.classList.contains('tns-slide-active');
  });

  const activeSlide = activeSlideItems[1];
  const activeSlideImage = activeSlide.querySelector('img');

  activeSlideItems.forEach((elem, i) => {
    if (i === 1) {
      activeSlide.classList.add('active-height');
      activeSlideImage.classList.add('active-height');
    }

    activeSlide.classList.remove('active-height');
    activeSlideImage.classList.remove('active-height');
  });

  console.log(activeSlideItems);
});

console.log(slider);
