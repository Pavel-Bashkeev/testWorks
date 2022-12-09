// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export const sliderProdAnother =() => {
  const sliderProd = new Swiper('.another-slider__container',{
    "slidesPerView": 6,
    "spaceBetween": 20,
    "slidesPerGroup": 6,
    "preventInteractionOnTransition": true,
    "loop": true,
    modules: [Navigation, Pagination],
    pagination: {
      el: '.another-slider__pagination',
      "clickable": true,
      type: "bullets",
    },
    navigation: {
      nextEl: '.another-slider__button--next',
      prevEl: '.another-slider__button--prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
        "slidesPerGroup": 1,
        "centeredSlides": true,
        pagination: {
          type: "fraction"
        }
      },
      480:{
        "slidesPerView": 2,
        "slidesPerGroup": 2,
        "centeredSlides": false,
        pagination: {
          type: "fraction"
        }
      },
      700: {
        "slidesPerView": 3,
        "slidesPerGroup": 3,
        pagination: {
          type: "bullets"
        }
      },
      1366: {
        "slidesPerView": 5,
        "slidesPerGroup": 5,
      },
      // when window width is >= 640px
      1500: {
        "slidesPerView": 6,
        "spaceBetween": 20,
        "slidesPerGroup": 6,
      }
    }
  });
}