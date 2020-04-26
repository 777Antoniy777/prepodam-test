import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider';

const slider = tns({
  container: '.programme___slider',
  items: 1,
  slideBy: 1,
  edgePadding: 15,
  gutter: 16,
  center: true,
  controls: false,
  nav: false,
  mouseDrag: true,
});

if (slider.isOn) {
  const sliderOptions = slider.getInfo();
  const outerWrapper = document.querySelector('.tns-ovh');
  const slideItems = sliderOptions.slideItems;
  const slideItemsArr = Array.from(slideItems);
  const activeSlideIndex = sliderOptions.index;
  const activeSlide = slideItemsArr[activeSlideIndex];
  const activeSlideImage = activeSlide.querySelector('img');

  outerWrapper.style.overflow = 'visible';
  activeSlide.classList.add('active-height');
  activeSlideImage.classList.add('active-height');
}

slider.events.on('indexChanged', (evt) => {
  const slideItems = evt.slideItems;
  const slideItemsArr = Array.from(slideItems);

  slideItemsArr.forEach(elem => {
    const slideImage = elem.querySelector('img');

    elem.classList.remove('active-height');
    slideImage.classList.remove('active-height');

    const prevElem = elem.previousElementSibling;
    const nextElem = elem.nextElementSibling;

    if (prevElem && nextElem) {
      if (prevElem.classList.contains('tns-slide-active') && nextElem.classList.contains('tns-slide-active')) {
        elem.classList.add('active-height');
        slideImage.classList.add('active-height');
      }
    }
  });
});
