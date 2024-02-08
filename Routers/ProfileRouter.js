const express = require('express');
const { ProfileController } = require('../Controllers/ProfileRouter');
const ProfileRouter = express.Router();

ProfileRouter.route('')
  .post(ProfileController.createProfile)

ProfileRouter.route('/:id')
  .get(ProfileController.getProfileById)
  .put(ProfileController.updateProfileById)
  .delete(ProfileController.deleteProfileById)


module.exports = ProfileRouter;