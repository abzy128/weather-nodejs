const express = require("express");
const router = express.Router();
const populationController = require("../controllers/populationController");

router.get("/:city", populationController.getPopulation);

module.exports = router;