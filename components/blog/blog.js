const carousel = document.querySelector('.blog__carousel');
const carouselContainer = carousel.querySelector('.blog__carousel-container');
const carouselItems = carousel.querySelectorAll('.blog__carousel-item');
const carouselPrevButton = carousel.querySelector('.blog__carousel-button-prev');
const carouselNextButton = carousel.querySelector('.blog__carousel-button-next');

const itemsPerPage = 2;
let currentIndex = 0;
let itemWidth = 0;

function initCarousel() {
  itemWidth = carouselItems[0].offsetWidth;
  carouselContainer.style.width = `${itemWidth * carouselItems.length}px`;
  carouselItems.forEach(item => {
    item.style.width = `${itemWidth}px`;
  });
}

function showItem(index) {
  carouselContainer.style.transform = `translateX(-${index * itemWidth * itemsPerPage}px)`;
  currentIndex = index;
}

function nextItem() {
  if (currentIndex === Math.ceil(carouselItems.length / itemsPerPage) - 1) {
    showItem(0);
  } else {
    showItem(currentIndex + 1);
  }
}

function prevItem() {
  if (currentIndex === 0) {
    showItem(Math.ceil(carouselItems.length / itemsPerPage) - 1);
  } else {
    showItem(currentIndex - 1);
  }
}

initCarousel();

carouselNextButton.addEventListener('click', nextItem);
carouselPrevButton.addEventListener('click', prevItem);
