const apiKey = '8a5133121fb398421050207dc7a01eec'; // Reemplaza con tu API Key
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');

searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    alert('Por favor, ingresa una ciudad.');
  }
});

async function getWeatherData(city) {
  weatherInfo.innerHTML = `<p>Cargando...</p>`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // Muestra la respuesta de la API en la consola

    if (data.cod === 200) {
      displayWeather(data);
    } else {
      weatherInfo.innerHTML = `<p>Ciudad no encontrada. Intenta de nuevo.</p>`;
    }
  } catch (error) {
    console.error('Error al obtener los datos del clima:', error);
    weatherInfo.innerHTML = `<p>Error al cargar los datos. Intenta de nuevo.</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const pressure = main.pressure;

  // Cambiar el fondo según el clima
  const body = document.body;
  body.className = ''; // Limpiar clases anteriores
  if (description.includes('sol') || description.includes('clear')) {
    body.classList.add('sunny');
  } else if (description.includes('lluvia') || description.includes('rain')) {
    body.classList.add('rainy');
  } else if (description.includes('nube') || description.includes('cloud')) {
    body.classList.add('cloudy');
  } else {
    body.classList.add('clear');
  }

  weatherInfo.innerHTML = `
    <div class="weather-card">
      <h2>${name}</h2>
      <img src="${iconUrl}" alt="${description}">
      <p><i class="fas fa-thermometer-half"></i> Temperatura: ${temperature}°C</p>
      <p><i class="fas fa-tint"></i> Humedad: ${humidity}%</p>
      <p><i class="fas fa-wind"></i> Viento: ${windSpeed} m/s</p>
      <p><i class="fas fa-tachometer-alt"></i> Presión: ${pressure} hPa</p>
    </div>
  `;
}