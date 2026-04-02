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