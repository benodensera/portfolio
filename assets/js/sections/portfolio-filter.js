// portfolio filter

const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.item');

if (filters.length && items.length) {
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(filterBtn => {
        filterBtn.classList.remove('active');
      });

      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(item => {
        if (
          filter === 'all' ||
          item.classList.contains(filter)
        ) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}