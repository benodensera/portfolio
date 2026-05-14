// video modal

const playBtn = document.getElementById('playBtn');
const overlay = document.getElementById('videoOverlay');
const video = document.getElementById('videoPlayer');
const closeBtn = document.getElementById('closeVideo');
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (
  playBtn &&
  overlay &&
  video &&
  closeBtn
) {
  playBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    if (scrollTopBtn) {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.visibility = 'hidden';
      scrollTopBtn.style.pointerEvents = 'none';
    }

    video.currentTime = 0;
    video.play();
  });

  function closeVideoOverlay() {
    overlay.style.display = 'none';

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    if (scrollTopBtn) {
      scrollTopBtn.style.opacity = '';
      scrollTopBtn.style.visibility = '';
      scrollTopBtn.style.pointerEvents = '';
    }

    video.pause();
  }

  closeBtn.addEventListener('click', closeVideoOverlay);

  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      closeVideoOverlay();
    }
  });
}