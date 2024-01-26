const validateCityInput = (req, res, next) => {
  const city = req.params.city || req.body.city;

  if (!city || city.trim() === "") {
    return res.status(400).json({ error: "City is required" });
  }

  next();
};

module.exports = validateCityInput;
