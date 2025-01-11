let currentIndex = 0;
let slides;
let autoNextInterval;

function createSlide(content) {
  const slide = document.createElement("div");
  slide.classList.add("carousel-slide");
  slide.textContent = content;
  return slide;
}

function updateCarouselPosition() {
  const container = document.getElementById("carousel-container");
  container.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarouselPosition();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarouselPosition();
}

function loadCarouselData() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("carousel-container");
      slides = data.map((entry) => createSlide(entry.content));
      slides.forEach((slide) => container.appendChild(slide));
      startAutoNext();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

function startAutoNext() {
  autoNextInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}
document.getElementById("next").addEventListener("click", () => {
  clearInterval(autoNextInterval); // Stop auto-next temporarily
  nextSlide();
  startAutoNext(); // Restart auto-next
});

document.getElementById("prev").addEventListener("click", () => {
  clearInterval(autoNextInterval); // Stop auto-next temporarily
  prevSlide();
  startAutoNext(); // Restart auto-next
});

document.addEventListener("DOMContentLoaded", loadCarouselData);
