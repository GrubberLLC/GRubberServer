const express = require('express');
const { ProfileController } = require('../Controllers/ProfileController');
const ProfileRouter = express.Router();

ProfileRouter.route('')
  .post(ProfileController.createProfile)
  .get(ProfileController.grabAllProfile)

ProfileRouter.route('/:id')
  .get(ProfileController.grabProfile)
  .put(ProfileController.updateUserProfile)
  .delete(ProfileController.deleteUserProfile)

ProfileRouter.route('/search/:term')
  .get(ProfileController.searchProfiles)

module.exports = ProfileRouter;