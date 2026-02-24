const router = require("express").Router();
const ensureAuth = require("../Middlewares/authMiddleware");
const { saveMeal } = require("../Controllers/saveMealController");
const { fetchMeals } = require("../Controllers/fetchMealsController");

router.post("/save", ensureAuth, saveMeal);
router.get("/fetch", ensureAuth, fetchMeals);
module.exports = router;
