const express = require("express");
const router = express.Router();
const mapController = require("../controllers/mapController");

router.get("/:city", mapController.getMap);
router.get("/google", mapController.getGoogleApiKey);

module.exports = router;
