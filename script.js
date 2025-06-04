const API_KEY = "f2aba9b8a55741b8258b3a5b70d21df5"; 
const cities = ["London", "New York", "Tokyo", "Lagos", "Johannesburg"];

const carousel = document.getElementById("carousel");

// Function to fetch weather data for a city
async function getWeather(city) {
  const res = await fetch(
   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1853b1fc6321872e9be7634aced1b1f7&units=metric`
  );
  const data = await res.json();
  return data;
}   

// Function to create a weather card
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

// Main function to load all cities
async function loadWeather() {
  for (let city of cities) {
    try {
      const weather = await getWeather(city);
      const card = createCard(weather);
      carousel.appendChild(card);
    } catch (err) {
      console.error("Error loading weather for", city, err);
    }
  }
}
// Add this below your existing loadWeather() function
document.getElementById("scrollLeft").addEventListener("click", () => {
    carousel.scrollBy({
      left: -300,
      behavior: "smooth"
    });
  });
  
  document.getElementById("scrollRight").addEventListener("click", () => {
    carousel.scrollBy({
      left: 300,
      behavior: "smooth"
    });
  });
  

loadWeather();
