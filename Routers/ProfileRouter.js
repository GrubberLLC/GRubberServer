const express = require('express');
const { ProfileController } = require('../Controllers/ProfileRouter');
const ProfileRouter = express.Router();

ProfileRouter.route('')
  .post(ProfileController.createProfile)

ProfileRouter.route('/:id')
  .get(ProfileController.getProfileById)
  .put(ProfileController.updateProfileById)
  .delete(ProfileController.deleteProfileById)

ProfileRouter.route('/user/:username')
  .get(ProfileController.getProfileByUsername)

ProfileRouter.route('/search/:search')
  .get(ProfileController.searchProfilesByUsername)

ProfileRouter.route('/email/:email')
  .get(ProfileController.getProfileByEmail)

ProfileRouter.route('/loggedIn/:id')
  .get(ProfileController.updateLoginStatusById)

module.exports = ProfileRouter;