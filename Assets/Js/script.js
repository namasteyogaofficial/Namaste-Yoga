let currentPlaying = null;
let touchMoved = false;

const videoSection = document.querySelector(".video-learning-grid");

function stopPreview(card) {
  if (!card) return;

  const video = card.querySelector(".preview-video");
  if (!video) return;

  video.pause();
  video.currentTime = 0;
  card.classList.remove("playing");

  if (currentPlaying === card) {
    currentPlaying = null;
  }
}

/* desktop hover delegation */
videoSection.addEventListener("mouseover", (e) => {
  if (window.innerWidth <= 768) return;

  const card = e.target.closest(".video-card");
  if (!card) return;

  if (currentPlaying === card) return;

  if (currentPlaying) {
    stopPreview(currentPlaying);
  }

  const video = card.querySelector(".preview-video");
  if (!video) return;

  card.classList.add("playing");
  video.play().catch(() => {});
  currentPlaying = card;
});

videoSection.addEventListener("mouseout", (e) => {
  if (window.innerWidth <= 768) return;

  const card = e.target.closest(".video-card");
  if (!card) return;

  if (card.contains(e.relatedTarget)) return;

  stopPreview(card);
});

/* mobile touch */
videoSection.addEventListener("touchstart", (e) => {
  if (window.innerWidth > 768) return;

  const card = e.target.closest(".video-card");
  if (!card) return;

  touchMoved = false;

  if (currentPlaying && currentPlaying !== card) {
    stopPreview(currentPlaying);
  }

  const video = card.querySelector(".preview-video");
  if (!video) return;

  card.classList.add("playing");
  video.play().catch(() => {});
  currentPlaying = card;

}, { passive: true });

videoSection.addEventListener("touchmove", () => {
  if (window.innerWidth > 768) return;
  touchMoved = true;
}, { passive: true });

videoSection.addEventListener("click", (e) => {
  if (window.innerWidth > 768) return;

  const card = e.target.closest(".video-card");
  if (!card) return;

  if (touchMoved) {
    e.preventDefault();
  }
});

/* stop when offscreen */
window.addEventListener("scroll", () => {
  if (window.innerWidth > 768) return;

  const rect = videoSection.getBoundingClientRect();

  const visible =
    rect.top < window.innerHeight &&
    rect.bottom > 0;

  if (!visible && currentPlaying) {
    stopPreview(currentPlaying);
  }
});