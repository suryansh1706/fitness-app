const router = require("express").Router();
const ensureAuth = require("../Middlewares/authMiddleware");
const { saveMeal } = require("../Controllers/mealsController");

router.post("/save", ensureAuth, saveMeal);

module.exports = router;
