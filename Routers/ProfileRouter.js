const express = require('express');
const { ProfileController } = require('../Controllers/ProfileController');
const ProfileRouter = express.Router();

ProfileRouter.route('')
  .post(ProfileController.createProfile)
  .get(ProfileController.grabAllProfile)

ProfileRouter.route('/:id')
  .get(ProfileController.grabProfile)

module.exports = ProfileRouter;