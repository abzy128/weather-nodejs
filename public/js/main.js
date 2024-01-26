window.initMap = function () {
  console.log("Google Maps API loaded.");
};
$(document).ready(async function () {
  var apiKey = await fetch("/google").then((res) => res.json());
  var script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey.key}&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  const weatherForm = $("#weatherForm");
  const weatherDataDiv = $("#weatherData");
  const mapDataDiv = $("#mapData");
  const backgroundImageContainer = $("body");

  let mapDiv = document.getElementById("map");
  let map;

  weatherForm.on("submit", async (event) => {
    event.preventDefault();

    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();

    if (city !== "") {
      try {
        const weatherData = await (await fetch(`/weather/${city}`)).json();

        const mapData = await (await fetch(`/map/${city}`)).json();

        const populationData = await (
          await fetch(`/population/${city}`)
        ).json();

        const backgroundImageURL = weatherData.background;
        backgroundImageContainer[0].style.backgroundImage = `url(${backgroundImageURL})`;
        backgroundImageContainer[0].style.backgroundSize = "cover";
        if (weatherData && !weatherData.error && mapData && !mapData.error) {
          weatherDataDiv.html(`
          <img src="${weatherData.weather.icon}"alt="Weather Icon" id="icon">
          <p class="d-flex"><strong>Temperature: </strong> ${weatherData.weather.temperature}°C</p>
            <p class="d-flex"><strong>Description: </strong> ${weatherData.weather.description}</p>
            
            <p class="d-flex"><strong>Feels Like: </strong> ${weatherData.weather.feels_like} °C</p>
            <p class="d-flex"><strong>Humidity: </strong> ${weatherData.weather.humidity}%</p>
            <p class="d-flex"><strong>Pressure: </strong> ${weatherData.weather.pressure} hPa</p>
            <p class="d-flex"><strong>Wind Speed: </strong> ${weatherData.weather.wind_speed} m/s</p>
            <p class="d-flex"><strong>Country Code: </strong> ${weatherData.weather.country_code}</p>
            <p class="d-flex"><strong>Rain: </strong> ${weatherData.weather.rain} mm</p>
          `);

          mapDataDiv.html(`
            <p class="d-flex"><strong>Latitude: </strong> ${mapData.latitude}</p>
            <p class="d-flex"><strong>Longitude: </strong> ${mapData.longitude}</p>
            <p class="d-flex"><strong>Population in ${populationData.data.populationCounts[0].year}: </strong> ${populationData.data.populationCounts[0].value}</p>          
            `);
          console.log(populationData);
          if (!map) {
            map = new google.maps.Map(document.getElementById("map"), {
              center: {
                lat: parseFloat(mapData.latitude),
                lng: parseFloat(mapData.longitude),
              },
              zoom: 10,
            });
          } else {
            map.setCenter({
              lat: parseFloat(mapData.latitude),
              lng: parseFloat(mapData.longitude),
            });
          }
        } else {
          console.error(
            "Error fetching weather data:",
            weatherData && weatherData.error
          );
          console.error("Error fetching map data:", mapData && mapData.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      alert("Please enter a city.");
    }
  });
});
