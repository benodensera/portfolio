// mouse animation

const mouse = document.querySelector('.mouse');

if (mouse) {
  mouse.addEventListener('click', () => {
    window.scrollBy({
      top: 600,
      behavior: 'smooth'
    });
  });
}