// scroll to top button

const scrollTopButton = document.getElementById('scrollTopBtn');

if (scrollTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 2000) {
      scrollTopButton.classList.add('show');
    } else {
      scrollTopButton.classList.remove('show');
    }
  });

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}