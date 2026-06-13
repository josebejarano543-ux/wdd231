const weatherCard = document.querySelector("#weather-card");

async function getWeather() {
  if (!weatherCard) return;

  const latitude = 40.1633;
  const longitude = -110.4029;

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather data unavailable.");
    }

    const data = await response.json();

    weatherCard.innerHTML = `
      <p><strong>Temperature:</strong> ${Math.round(data.current.temperature_2m)}°F</p>
      <p><strong>Wind Speed:</strong> ${Math.round(data.current.wind_speed_10m)} mph</p>
    `;
  } catch (error) {
    weatherCard.innerHTML =
      "<p>Weather information is not available right now.</p>";
  }
}

getWeather();