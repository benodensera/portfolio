// testimonial slider

const slider = document.getElementById('slider');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const testimonialCards = document.querySelectorAll('.testimonial-card');

if (
  slider &&
  nextBtn &&
  prevBtn &&
  testimonialCards.length
) {
  let testimonialIndex = 0;

  const totalSlides = testimonialCards.length;

  function updateSlider() {
    slider.style.transform = `translateX(-${testimonialIndex * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    testimonialIndex++;

    if (testimonialIndex >= totalSlides) {
      testimonialIndex = 0;
    }

    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    testimonialIndex--;

    if (testimonialIndex < 0) {
      testimonialIndex = totalSlides - 1;
    }

    updateSlider();
  });
}