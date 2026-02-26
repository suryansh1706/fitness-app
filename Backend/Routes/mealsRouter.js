const router = require("express").Router();
const ensureAuth = require("../Middlewares/authMiddleware");
const saveMeal = require("../Controllers/saveMealController");
const fetchMeals = require("../Controllers/fetchMealsController");
const dailyMacros = require("../Controllers/dailyMacrosController");

router.post("/save", ensureAuth, saveMeal);
router.get("/fetch", ensureAuth, fetchMeals);
router.get("/daily", ensureAuth, dailyMacros);

module.exports = router;
