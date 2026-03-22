const express = require('express');
const router = express.Router();
const { saveProfileController } = require('../controllers/user.controller');
const ensureAuth = require('../middlewares/auth.middleware');

router.post("/profile", ensureAuth, saveProfileController);

module.exports = router;