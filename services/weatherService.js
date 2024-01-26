const axios = require("axios");

exports.getWeatherData = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&exclude=hourly&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data && response.data.cod === "200") {
      return response.data;
    } else {
      console.error("OpenWeatherMap API Error:", response.data.message);
      throw new Error("Error fetching weather data");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw new Error("Error fetching weather data");
  }
};
