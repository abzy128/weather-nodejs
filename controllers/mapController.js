const mapService = require("../services/mapService");

exports.getMap = async (req, res) => {
  try {
    const city = req.params.city;
    const locationData = await mapService.getGeolocationData(city);
    res.json(locationData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getGoogleApiKey = async (req, res) => {
  try {
    const apiKey = await mapService.getGoogleApiKey();
    res.json(apiKey);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
