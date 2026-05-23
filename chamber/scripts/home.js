const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastContainer = document.querySelector("#forecast");
const spotlightContainer = document.querySelector("#spotlights");

const apiKey = "47efc9b273ab5d6f00572a7e17310cd0";
const lat = 40.2969;
const lon = -111.6946;

async function getWeather() {

  try {

    const currentURL =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    const forecastURL =
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    const currentResponse = await fetch(currentURL);
    const currentData = await currentResponse.json();

    currentTemp.textContent =
      `${Math.round(currentData.main.temp)}°F`;

    weatherDesc.textContent =
      currentData.weather[0].description;

    const forecastResponse = await fetch(forecastURL);
    const forecastData = await forecastResponse.json();

    const filteredForecast =
      forecastData.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      ).slice(0, 3);

    forecastContainer.innerHTML = "";

    filteredForecast.forEach(day => {

      const date = new Date(day.dt_txt);

      const forecastItem = document.createElement("p");

      forecastItem.innerHTML = `
        <strong>
          ${date.toLocaleDateString("en-US", { weekday: "long" })}
        </strong>:
        ${Math.round(day.main.temp)}°F
      `;

      forecastContainer.appendChild(forecastItem);
    });

  } catch (error) {
    console.error(error);
  }
}

async function getSpotlights() {

  const response =
    await fetch("data/members.json");

  const members =
    await response.json();

  const filteredMembers =
    members.filter(member =>
      member.membership === 2 ||
      member.membership === 3
    );

  const randomMembers =
    filteredMembers.sort(() => 0.5 - Math.random());

  const selectedMembers =
    randomMembers.slice(0, 3);

  selectedMembers.forEach(member => {

    const card = document.createElement("section");

    card.classList.add("spotlight-card");

    const level =
      member.membership === 3
        ? "Gold"
        : "Silver";

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>

      <a href="${member.website}" target="_blank">
        Visit Website
      </a>

      <p class="membership">
        ${level} Member
      </p>
    `;

    spotlightContainer.appendChild(card);
  });
}

getWeather();
getSpotlights();