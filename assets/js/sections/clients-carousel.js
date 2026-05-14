// clients carousel

const carouselTrack = document.querySelector('.carousel-track');
const carouselWrapper = document.querySelector('.carousel');

const prevArrow = document.querySelector('.carousel-arrows svg:first-child');
const nextArrow = document.querySelector('.carousel-arrows svg:last-child');

if (
  carouselTrack &&
  carouselWrapper &&
  prevArrow &&
  nextArrow
) {

  let carouselItems = document.querySelectorAll('.carousel-item');

  let carouselIndex = 4;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let autoSlide;

  document.querySelectorAll('.carousel-item img').forEach(img => {
    img.setAttribute('draggable', 'false');
  });

  function getItemWidth() {
    return carouselItems[0].getBoundingClientRect().width + 30;
  }

  function setPosition() {
    carouselTrack.style.transform =
      `translateX(${currentTranslate}px)`;
  }

  function slideToIndex() {

    carouselTrack.style.transition =
      'transform 0.5s ease';

    currentTranslate =
      -carouselIndex * getItemWidth();

    prevTranslate = currentTranslate;

    setPosition();
  }

  function moveNext() {
    carouselIndex++;
    slideToIndex();
  }

  function startAutoSlide() {
    autoSlide = setInterval(moveNext, 3500);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  function setupCarousel() {

    const itemsArray = Array.from(carouselItems);

    const firstClones = itemsArray.slice(0, 4);
    const lastClones = itemsArray.slice(-4);

    lastClones.forEach(item => {
      const clone = item.cloneNode(true);
      carouselTrack.prepend(clone);
    });

    firstClones.forEach(item => {
      const clone = item.cloneNode(true);
      carouselTrack.append(clone);
    });

    carouselItems =
      document.querySelectorAll('.carousel-item');

    currentTranslate =
      -carouselIndex * getItemWidth();

    prevTranslate = currentTranslate;

    setPosition();
  }

  function startDrag(e) {

    isDragging = true;

    carouselWrapper.classList.add('active');

    startX = e.type.includes('mouse')
      ? e.pageX
      : e.touches[0].clientX;

    stopAutoSlide();
  }

  function drag(e) {

    if (!isDragging) return;

    const currentX = e.type.includes('mouse')
      ? e.pageX
      : e.touches[0].clientX;

    const moveX = currentX - startX;

    currentTranslate = prevTranslate + moveX;

    setPosition();
  }

  function endDrag() {

    if (!isDragging) return;

    isDragging = false;

    carouselWrapper.classList.remove('active');

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50) {
      carouselIndex++;
    } else if (movedBy > 50) {
      carouselIndex--;
    }

    slideToIndex();

    startAutoSlide();
  }

  prevArrow.addEventListener('click', () => {

    stopAutoSlide();

    carouselIndex--;

    slideToIndex();

    startAutoSlide();
  });

  nextArrow.addEventListener('click', () => {

    stopAutoSlide();

    carouselIndex++;

    slideToIndex();

    startAutoSlide();
  });

  carouselTrack.addEventListener('transitionend', () => {

    const total = carouselItems.length;

    if (carouselIndex >= total - 4) {

      carouselTrack.style.transition = 'none';

      carouselIndex = 4;
    }

    if (carouselIndex < 4) {

      carouselTrack.style.transition = 'none';

      carouselIndex = total - 8;
    }

    currentTranslate =
      -carouselIndex * getItemWidth();

    prevTranslate = currentTranslate;

    setPosition();
  });

  carouselWrapper.addEventListener('mousedown', startDrag);
  carouselWrapper.addEventListener('mouseup', endDrag);
  carouselWrapper.addEventListener('mouseleave', endDrag);
  carouselWrapper.addEventListener('mousemove', drag);

  carouselWrapper.addEventListener('touchstart', startDrag);
  carouselWrapper.addEventListener('touchend', endDrag);
  carouselWrapper.addEventListener('touchmove', drag);

  setupCarousel();

  startAutoSlide();
}