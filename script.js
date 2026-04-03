// hero slider

const slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

setInterval(nextSlide, 9000);



// mouse icon to next section

document.querySelector(".mouse").addEventListener("click", () => {
  window.scrollBy({
    top: 600,
    behavior: "smooth"
  });
});



// projects grid 

const filters = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".item");

filters.forEach(btn => {
  btn.addEventListener("click", () => {

    // active button
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    items.forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

  });
});



// counter animation function

function animateCounter(counter) {
  const target = +counter.getAttribute("data-target");
  const hasPlus = counter.dataset.plus === "true";
  let count = 0;

  const updateCounter = () => {
    const increment = target / 100;

    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count);
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = hasPlus ? target + "+" : target;
    }
  };

  updateCounter();
}

const counters = document.querySelectorAll(".counter");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target); // run once
    }
  });
}, { threshold: 1 });

counters.forEach(counter => {
  observer.observe(counter);
});



// carousel control arrows

const prevArrow = document.querySelector(".carousel-arrows svg:first-child");
const nextArrow = document.querySelector(".carousel-arrows svg:last-child");

prevArrow.addEventListener("click", () => {
  stopAutoSlide();          // pause autoplay
  carouselIndex--;          // move left
  slideToIndex();           // update position
  startAutoSlide();         // resume autoplay
});

nextArrow.addEventListener("click", () => {
  stopAutoSlide();          // pause autoplay
  carouselIndex++;          // move right
  slideToIndex();           // update position
  startAutoSlide();         // resume autoplay
});



// clients carousel

const carouselTrack = document.querySelector(".carousel-track");
const carouselWrapper = document.querySelector(".carousel");

let carouselItems = document.querySelectorAll(".carousel-item");

let carouselIndex = 4;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let autoSlide;

// prevent image drag  

document.querySelectorAll(".carousel-item img").forEach(img => {
  img.setAttribute("draggable", "false");
});

// carousel item clones

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

  carouselItems = document.querySelectorAll(".carousel-item");

  currentTranslate = -carouselIndex * getItemWidth();
  prevTranslate = currentTranslate;
  setPosition();
}

function getItemWidth() {
  return carouselItems[0].getBoundingClientRect().width + 30;
}

// carousel auto slide

function startAutoSlide() {
  autoSlide = setInterval(() => moveNext(), 3500);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

function moveNext() {
  carouselIndex++;
  slideToIndex();
}

function slideToIndex() {
  carouselTrack.style.transition = "transform 0.5s ease";

  currentTranslate = -carouselIndex * getItemWidth();
  prevTranslate = currentTranslate;

  setPosition();
}

// loop fix

carouselTrack.addEventListener("transitionend", () => {
  const total = carouselItems.length;

  if (carouselIndex >= total - 4) {
    carouselTrack.style.transition = "none";
    carouselIndex = 4;
  }

  if (carouselIndex < 4) {
    carouselTrack.style.transition = "none";
    carouselIndex = total - 8;
  }

  currentTranslate = -carouselIndex * getItemWidth();
  prevTranslate = currentTranslate;

  setPosition();
});

// drag horizontally only

carouselWrapper.addEventListener("mousedown", startDrag);
carouselWrapper.addEventListener("mouseup", endDrag);
carouselWrapper.addEventListener("mouseleave", endDrag);
carouselWrapper.addEventListener("mousemove", drag);

carouselWrapper.addEventListener("touchstart", startDrag);
carouselWrapper.addEventListener("touchend", endDrag);
carouselWrapper.addEventListener("touchmove", drag);

function startDrag(e) {
  isDragging = true;
  carouselWrapper.classList.add("active");

  startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;

  stopAutoSlide();
}

function drag(e) {
  if (!isDragging) return;

  const currentX = e.type.includes("mouse")
    ? e.pageX
    : e.touches[0].clientX;

  const moveX = currentX - startX;

  // only horizontal movement

  currentTranslate = prevTranslate + moveX;

  setPosition();
}

function endDrag() {
  if (!isDragging) return;

  isDragging = false;
  carouselWrapper.classList.remove("active");

  const movedBy = currentTranslate - prevTranslate;

  // snap one item at a time 

  if (movedBy < -50) {
    carouselIndex++;
  } else if (movedBy > 50) {
    carouselIndex--;
  }

  slideToIndex();
  startAutoSlide();
}

function setPosition() {
  carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
}

// init 

setupCarousel();
startAutoSlide();



// video control

const playBtn = document.getElementById("playBtn");
const overlay = document.getElementById("videoOverlay");
const video = document.getElementById("videoPlayer");
const closeBtn = document.getElementById("closeVideo");

// OPEN
playBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
  video.currentTime = 0;
  video.play();
});

// CLOSE
closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  video.pause();
});

// OPTIONAL: close clicking outside
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
    video.pause();
  }
});



// testimonial slider

const slider = document.getElementById("slider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let testimonialIndex = 0;
const totalSlides = document.querySelectorAll(".testimonial-card").length;

function updateSlider() {
  slider.style.transform = `translateX(-${testimonialIndex * 100}%)`;
}

// next button
nextBtn.addEventListener("click", () => {
  testimonialIndex++;
  if (testimonialIndex >= totalSlides) testimonialIndex = 0;
  updateSlider();
});

// previous button
prevBtn.addEventListener("click", () => {
  testimonialIndex--;
  if (testimonialIndex < 0) testimonialIndex = totalSlides - 1;
  updateSlider();
});