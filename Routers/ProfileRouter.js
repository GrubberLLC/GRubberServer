const express = require('express');
const { ProfileController } = require('../Controllers/ProfileController');
const ProfileRouter = express.Router();

ProfileRouter.route('')
  .post(ProfileController.createProfile)

module.exports = ProfileRouter;