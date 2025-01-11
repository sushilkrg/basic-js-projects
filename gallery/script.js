function createGalleryItem(imageSrc, captionText) {
  const item = document.createElement("div");
  item.classList.add("gallery-item");

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = captionText;

  const caption = document.createElement("div");
  caption.classList.add("caption");
  caption.textContent = captionText;

  item.appendChild(img);
  item.appendChild(caption);

  return item;
}

function loadGalleryData() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("gallery-container");
      data.forEach((entry) => {
        const item = createGalleryItem(entry.imageSrc, entry.caption);
        container.appendChild(item);
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

document.addEventListener("DOMContentLoaded", loadGalleryData);
