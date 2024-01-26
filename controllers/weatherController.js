const Weather = require("../models/weatherModel");
const weatherService = require("../services/weatherService");
const unsplashService = require("../services/unsplashService");

exports.getWeather = async (req, res) => {
  try {
    const city = req.params.city;
    const weatherData = await weatherService.getWeatherData(city);

    if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
      console.error("Unexpected weather data format:", weatherData);
      return res
        .status(500)
        .json({ error: "Invalid weather data received from the API" });
    }

    const latestEntry = weatherData.list[0];

    const rainVolumeLast3Hours = latestEntry.rain
      ? latestEntry.rain["1h"]
      : "N/A";
    const temperatureCelsius = latestEntry.main.temp;
    const feels_likeCelsius = latestEntry.main.feels_like;

    const description = latestEntry.weather[0].description || "N/A";
    const country_code = weatherData.city.country || "N/A";

    const iconImageURL = `https://openweathermap.org/img/wn/${latestEntry.weather[0].icon}.png`;

    const formattedWeatherData = new Weather({
      temperature: temperatureCelsius,
      feels_like: feels_likeCelsius,
      description: description,
      icon: iconImageURL,
      humidity: latestEntry.main.humidity || "N/A",
      pressure: latestEntry.main.pressure || "N/A",
      wind_speed: latestEntry.wind.speed || "N/A",
      country_code: country_code,
      rain: rainVolumeLast3Hours,
    });

    try {
      const backgroundImage = await unsplashService.getRandomBackgroundImage(
        city
      );

      res.json({ weather: formattedWeatherData, background: backgroundImage });
    } catch (backgroundError) {
      console.error("Error fetching background image:", backgroundError);

      res.json({ weather: formattedWeatherData, background: null });
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
