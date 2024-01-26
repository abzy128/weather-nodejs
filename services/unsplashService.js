const axios = require("axios");

exports.getRandomBackgroundImage = async (cityName) => {
  const unsplashApiKey = process.env.UNSPLASH_API_KEY;
  const apiUrl = `https://api.unsplash.com/search/photos?query=${cityName} city&client_id=${unsplashApiKey}&orientation=landscape`;
  try {
    const response = await axios.get(apiUrl);
    const imageNumber =  Math.floor(Math.random() * 10);
    return response.data.results[imageNumber].urls.regular;
  } catch (error) {
    throw new Error("Error fetching background image");
  }
};
