const axios = require("axios");

exports.getGeolocationData = async (city) => {
  const apiKey = process.env.OPENCAGE_API_KEY;
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}`;
  try {
    const response = await axios.get(apiUrl);
    const { lat, lng } = response.data.results[0].geometry;
    return { latitude: lat, longitude: lng };
  } catch (error) {
    throw new Error("Error fetching geolocation data");
  }
};
exports.getGoogleApiKey = async () => {
  return { key: process.env.GOOGLE_MAPS_API_KEY };
};
