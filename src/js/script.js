import Swiper, {
  Navigation,
  Pagination
} from 'swiper';

import '../../node_modules/swiper/swiper.scss';
import '../../node_modules/swiper/modules/navigation/navigation.scss';
import '../../node_modules/swiper/modules/pagination/pagination.scss';
Swiper.use([Navigation,
  Pagination
]);
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: "fraction",
    formatFractionCurrent: function (number) {
      return ('0' + number).slice(-2);
    },
    formatFractionTotal: function (number) {
      return ('0' + number).slice(-2);
    },
    renderFraction: function (currentClass, totalClass) {
      return '<span class="' + currentClass + '"></span>' +
        ' / ' +
        '<span class="' + totalClass + '"></span>';
    }
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },

});