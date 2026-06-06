import { places } from "../data/discover.mjs";

const cardsContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");

function displayVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const difference = currentVisit - Number(lastVisit);
    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}

function displayPlaces() {
  places.forEach((place, index) => {
    const card = document.createElement("section");
    card.classList.add("discover-card");
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="images/${place.image}" alt="${place.name}" loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button class="learn-more">Learn More</button>
    `;

    card.querySelector(".learn-more").addEventListener("click", () => {
      alert(place.description);
    });

    cardsContainer.appendChild(card);
  });
}

displayVisitMessage();
displayPlaces();