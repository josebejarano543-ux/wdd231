const roomsContainer = document.querySelector("#rooms-container");
const filterSelect = document.querySelector("#room-filter");
const modal = document.querySelector("#room-modal");
const modalContent = document.querySelector("#modal-content");
const closeModalButton = document.querySelector("#close-modal");

let rooms = [];

async function getRooms() {
  try {
    const response = await fetch("data/rooms.json");

    if (!response.ok) {
      throw new Error("Room data could not be loaded.");
    }

    rooms = await response.json();
    displayRooms(rooms);
  } catch (error) {
    roomsContainer.innerHTML = `<p>Sorry, room information is not available right now.</p>`;
    console.error(error);
  }
}

function displayRooms(roomList) {
  roomsContainer.innerHTML = roomList.map(room => `
    <article class="room-card">
      <img src="${room.image}" alt="${room.name}" loading="lazy" width="400" height="260">
      <div class="room-card-content">
        <p class="room-type">${room.type}</p>
        <h2>${room.name}</h2>
        <p>${room.description}</p>
        <ul>
          <li><strong>Price:</strong> $${room.price} per night</li>
          <li><strong>Beds:</strong> ${room.beds}</li>
          <li><strong>Capacity:</strong> ${room.capacity}</li>
          <li><strong>Amenities:</strong> ${room.amenities.slice(0, 2).join(", ")}</li>
        </ul>
        <div class="room-actions">
          <button class="button details-button" data-id="${room.id}">View Details</button>
          <button class="save-button" data-id="${room.id}">Save Favorite</button>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".details-button").forEach(button => {
    button.addEventListener("click", () => {
      showRoomDetails(Number(button.dataset.id));
    });
  });

  document.querySelectorAll(".save-button").forEach(button => {
    button.addEventListener("click", () => {
      saveFavoriteRoom(Number(button.dataset.id));
    });
  });
}

function showRoomDetails(roomId) {
  const room = rooms.find(item => item.id === roomId);

  if (!room) return;

  localStorage.setItem("lastViewedRoom", room.name);

  modalContent.innerHTML = `
    <h2>${room.name}</h2>
    <img src="${room.image}" alt="${room.name}" loading="lazy" width="600" height="360">
    <p>${room.description}</p>
    <p><strong>Price:</strong> $${room.price} per night</p>
    <p><strong>Beds:</strong> ${room.beds}</p>
    <p><strong>Capacity:</strong> ${room.capacity}</p>
    <p><strong>Amenities:</strong> ${room.amenities.join(", ")}</p>
  `;

  modal.showModal();
}

function saveFavoriteRoom(roomId) {
  const room = rooms.find(item => item.id === roomId);

  if (!room) return;

  localStorage.setItem("favoriteRoom", room.name);
  alert(`${room.name} was saved as your favorite room.`);
}

filterSelect.addEventListener("change", () => {
  const selectedType = filterSelect.value;

  const filteredRooms = selectedType === "all"
    ? rooms
    : rooms.filter(room => room.type === selectedType);

  displayRooms(filteredRooms);
});

closeModalButton.addEventListener("click", () => {
  modal.close();
});

getRooms();