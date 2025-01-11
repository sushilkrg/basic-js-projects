function toggleAccordion(event) {
  const content = event.target.nextElementSibling;

  if (content.style.display == "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

function createAccordionItem(title, content) {
  const item = document.createElement("div");
  item.classList.add("accordion-item");

  const header = document.createElement("div");
  header.classList.add("accordion-header");
  header.textContent = title;
  header.addEventListener("click", toggleAccordion);

  const body = document.createElement("div");
  body.classList.add("accordion-content");
  body.textContent = content;

  item.appendChild(header);
  item.appendChild(body);

  return item;
}

async function loadAccordianData() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    const container = document.getElementById("accordion-container");
    data.forEach((entry) => {
      const item = createAccordionItem(entry.title, entry.content);
      container.appendChild(item);
    });
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

// call function to load data on page load
document.addEventListener("DOMContentLoaded", loadAccordianData);
