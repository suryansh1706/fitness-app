const express = require("express");
const router = express.Router();
const ensureAuth = require("../middlewares/auth.middleware");
const {
  saveMealController,
  fetchMealsController,
  getDailyMacrosController
} = require("../controllers/meal.controller");

router.post("/save", ensureAuth, saveMealController);
router.get("/fetch", ensureAuth, fetchMealsController);
router.get("/daily", ensureAuth, getDailyMacrosController);

module.exports = router;
