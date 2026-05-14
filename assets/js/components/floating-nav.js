// floating navigation

const floatingNav = document.getElementById('floatingNav');
const floatingExpandBtn = document.getElementById('floatingExpandBtn');

const floatingLinks = document.querySelectorAll('.floating-nav a');
const sections = document.querySelectorAll('section[id], footer[id]');

if (floatingNav && floatingExpandBtn) {
  floatingExpandBtn.addEventListener('mouseenter', () => {
    floatingNav.classList.add('expanded');
  });

  floatingNav.addEventListener('mouseleave', () => {
    floatingNav.classList.remove('expanded');
  });
}

if (floatingLinks.length && sections.length) {
  floatingLinks.forEach(link => {
    link.addEventListener('click', () => {
      floatingLinks.forEach(item => {
        item.classList.remove('active');
      });

      link.classList.add('active');
    });
  });

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;

      if (window.scrollY >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });

    floatingLinks.forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}