const express = require("express");
const router = express.Router();
const ensureAuth = require("../middlewares/auth.middleware");
const {
    saveWorkoutController,
    fetchWorkoutsController,
    deleteWorkoutController,
    clearWorkoutsController
} = require("../controllers/workout.controller");

router.post("/save", ensureAuth, saveWorkoutController);
router.get("/fetch", ensureAuth, fetchWorkoutsController);
router.delete("/clear", ensureAuth, clearWorkoutsController);
router.delete("/:id", ensureAuth, deleteWorkoutController);

module.exports = router;
