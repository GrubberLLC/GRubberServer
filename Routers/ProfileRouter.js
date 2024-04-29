const express = require('express');
const { ProfileController } = require('../Controllers/ProfileController');
const ProfileRouter = express.Router();

ProfileRouter.route('')
  .post(ProfileController.createProfile)

ProfileRouter.route('/:id')
  .get(ProfileController.grabProfile)

module.exports = ProfileRouter;