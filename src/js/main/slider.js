import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider';

let slider = tns({
  container: '.programme___slider',
  items: 1,
  slideBy: 1,
  edgePadding: 22,
  gutter: 16,
  center: true,
  controls: false,
  nav: false,
  mouseDrag: true,
});

const mql = window.matchMedia('(max-width: 767px)');
console.log(mql);

const isMediaTb = (e) => {
  if (slider.isOn) slider.destroy();

  if (e.matches) {
    slider = slider.rebuild();

    if (slider.isOn) {
      const sliderOptions = slider.getInfo();
      const outerWrapper = document.querySelector('.tns-ovh');
      const slideItems = sliderOptions.slideItems;
      const slideItemsArr = Array.from(slideItems);
      const activeSlideIndex = sliderOptions.index;
      const activeSlide = slideItemsArr[activeSlideIndex];
      const activeSlideImage = activeSlide.querySelector('img');

      console.log(outerWrapper);

      outerWrapper.style.overflow = 'visible';
      activeSlide.classList.add('active-slide');
      activeSlideImage.classList.add('active-slide');
    }

    slider.events.on('indexChanged', (evt) => {
      const slideItems = evt.slideItems;
      const slideItemsArr = Array.from(slideItems);

      slideItemsArr.forEach(elem => {
        const slideImage = elem.querySelector('img');

        elem.classList.remove('active-slide');
        slideImage.classList.remove('active-slide');

        const prevElem = elem.previousElementSibling;
        const nextElem = elem.nextElementSibling;

        if (prevElem && nextElem) {
          const isActivePrev = prevElem.classList.contains('tns-slide-active');
          const isActiveNext = nextElem.classList.contains('tns-slide-active');

          if (isActivePrev && isActiveNext) {
            elem.classList.add('active-slide');
            slideImage.classList.add('active-slide');
          }
        }
      });
    });
  }
};

isMediaTb(mql);
mql.addListener(isMediaTb);
