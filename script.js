const API_KEY = "f2aba9b8a55741b8258b3a5b70d21df5"; 
const cities = ["London", "New York", "Tokyo", "Lagos", "Johannesburg"];
const carousel = document.getElementById("carousel");
const spinner = document.getElementById("loadingSpinner");
const addedCities = new Set();

// Fetch weather data for a city
async function getWeather(city) {
  const res = await fetch(`http://localhost:5000/weather?city=${city}`);

  
  if (!res.ok) throw new Error("City not found");
  const data = await res.json();
  return data;
}
 
// Create weather card element
function createCard(weather) {
  const card = document.createElement("div");
  card.className = "weather-card";
  card.innerHTML = `
    <h2>${weather.name}</h2>
    <p>🌡 Temp: ${weather.main.temp}°C</p>
    <p>🌥 Weather: ${weather.weather[0].description}</p>
    <p>💨 Wind: ${weather.wind.speed} m/s</p>
  `;
  return card;
}

// Load weather for initial cities
async function loadWeather() {
  spinner.style.display = "block"; // Show spinner
  for (let city of cities) {
    try {
      const data = await getWeather(city);
      if (!addedCities.has(data.name.toLowerCase())) {
        const card = createCard(data);
        carousel.appendChild(card);
        addedCities.add(data.name.toLowerCase());
      }
    } catch (err) {
      console.error("Error loading:", err.message);
    }
  }
  spinner.style.display = "none"; // Hide spinner
}

// Scroll carousel left and right buttons
document.getElementById("scrollLeft").addEventListener("click", () => {
  carousel.scrollBy({ left: -300, behavior: "smooth" });
});
document.getElementById("scrollRight").addEventListener("click", () => {
  carousel.scrollBy({ left: 300, behavior: "smooth" });
});

// Search city and add weather card
document.getElementById("searchBtn").addEventListener("click", async () => {
  const input = document.getElementById("searchInput");
  const city = input.value.trim();
  if (!city) return;

  if (addedCities.has(city.toLowerCase())) {
    alert("City already added.");
    input.value = "";
    return;
  }

  spinner.style.display = "block";

  try {
    const weather = await getWeather(city);
    const card = createCard(weather);
    carousel.insertBefore(card, carousel.firstChild);
    addedCities.add(weather.name.toLowerCase());
    input.value = "";
  } catch (err) {
    alert("City not found. Please try another.");
    console.error(err);
  }

  spinner.style.display = "none";
});

// Auto slide carousel every 3 seconds
setInterval(() => {
  carousel.scrollBy({ left: 300, behavior: "smooth" });
  if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
    carousel.scrollTo({ left: 0, behavior: "smooth" });
  }
}, 3000);

// Initial load
loadWeather();
