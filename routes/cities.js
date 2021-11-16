const express = require("express");
const router = express.Router();
const citiesController = require("../controllers/cities_controller");

router.get("/", citiesController.getCities);
router.post("/", citiesController.postNewCity);
module.exports = router;
