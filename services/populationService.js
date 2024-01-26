const axios = require("axios");

exports.getPopulationData = async (cityName) => {
  const apiUrl = `https://countriesnow.space/api/v0.1/countries/population/cities`;
  return await axios({
    method: "POST",
    url: apiUrl,
    data: {
      city: cityName,
    },
  });
};
