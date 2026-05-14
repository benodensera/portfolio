// stats counter

const counters = document.querySelectorAll('.counter');

if (counters.length) {
  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const hasPlus = counter.dataset.plus === 'true';

    let count = 0;

    function updateCounter() {
      const increment = target / 100;

      if (count < target) {
        count += increment;

        counter.innerText = Math.ceil(count);

        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = hasPlus
          ? `${target}+`
          : target;
      }
    }

    updateCounter();
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 1
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
}