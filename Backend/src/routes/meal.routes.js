const express = require("express");
const router = express.Router();
const ensureAuth = require("../middlewares/auth.middleware");
const {
  saveMealController,
  fetchMealsController,
  getDailyMacrosController,
  deleteMealController
} = require("../controllers/meal.controller");

router.post("/save", ensureAuth, saveMealController);
router.get("/fetch", ensureAuth, fetchMealsController);
router.get("/daily", ensureAuth, getDailyMacrosController);
router.delete("/:mealId", ensureAuth, deleteMealController);

module.exports = router;
