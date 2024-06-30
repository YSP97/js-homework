const progressBar = document.querySelector('.autoplay-progress svg');
const videoSlideIndex = 9; // 비디오 슬라이드의 인덱스
const video = document.getElementById('bigmac-video');
const volumeBtn = document.querySelector('.volume-btn');
const volumeIcon = document.querySelector('.volume-btn i');
const slideBtn = document.querySelector('.slide-btn');
const slideIcon = document.querySelector('.slide-btn i');
let pause = false;

const obj = {
  loop: true,
  effect: 'fade',
  speed: 2000,
  scale: 2,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    enabled: true, // autoplay 활성화 여부
  },
  pagination: {
    el: '.main-swiper .swiper-pagination',
    clickable: false,
    type: 'custom',
  },
  navigation: {
    nextEl: '.main-swiper .swiper-button-next',
    prevEl: '.main-swiper .swiper-button-prev',
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressBar.style.setProperty('--progress', 1 - progress);
    },
    slideChange() {
      if (!pause) {
        const currentSlide = this.slides[this.activeIndex];
        if (this.realIndex === videoSlideIndex) {
          video.currentTime = 0;
          video.play();
          this.params.autoplay.delay = (video.duration || 30) * 1000;
        } else {
          video.pause();
          this.params.autoplay.delay = 5000;
          this.autoplay.start();
        }
      } else {
        video.pause();
      }
    },
  },
};

const mainSwiper = new Swiper('.main-swiper', obj);

function videoPlayer() {
  if (video.muted) {
    video.muted = false;
    volumeIcon.classList.remove('fa-volume-xmark', 'volume-off');
    volumeIcon.classList.add('fa-volume-high', 'volume-on');
  } else {
    video.muted = true;
    volumeIcon.classList.remove('fa-volume-high', 'volume-on');
    volumeIcon.classList.add('fa-volume-xmark', 'volume-off');
  }
}

function slidePause() {
  if (!pause) {
    video.pause();
    mainSwiper.autoplay.stop();
    slideIcon.classList.add('fa-play');
    slideIcon.classList.remove('fa-pause');
    pause = true;
  } else {
    if (mainSwiper.realIndex === 9) {
      video.currentTime = 0;
      video.play();
      mainSwiper.params.autoplay.delay = 30000;
    }
    mainSwiper.params.autoplay.delay = 5000;
    mainSwiper.autoplay.start();
    slideIcon.classList.add('fa-pause');
    slideIcon.classList.remove('fa-play');
    pause = false;
  }
}

volumeBtn.addEventListener('click', videoPlayer);
slideBtn.addEventListener('click', slidePause);
