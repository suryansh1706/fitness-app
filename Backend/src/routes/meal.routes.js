const express = require("express");
const router = express.Router();
const ensureAuth = require("../middlewares/auth.middleware");
const {
  saveMealController,
  fetchMealsController,
  getDailyMacrosController,
  searchMealController
} = require("../controllers/meal.controller");

router.post("/save", ensureAuth, saveMealController);
router.get("/fetch", ensureAuth, fetchMealsController);
router.get("/daily", ensureAuth, getDailyMacrosController);
router.get("/search", ensureAuth, searchMealController);

module.exports = router;
