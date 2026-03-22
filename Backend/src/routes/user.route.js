const express = require('express');
const router = express.Router();
const { saveProfileController } = require('../controllers/user.controller');

router.post("/profile", saveProfileController);