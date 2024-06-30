document.addEventListener('DOMContentLoaded', function () {
  const headerSpan = document.querySelector('.header span');
  const slideTexts = [
    '파묘',
    '사바하',
    '검은 사제들',
    '손 the Guest',
    '곡성',
    '악귀',
  ];

  const swiper = new Swiper('.mySwiper', {
    effect: 'cube',
    speed: 2000,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 1000,
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  });

  swiper.on('slideChange', function () {
    const currentIndex = swiper.realIndex;
    headerSpan.textContent = slideTexts[currentIndex];
  });
});
