const express = require('express');
const { ActivityController } = require('../Controllers/ActivityController');
const ActivityRouter = express.Router();

ActivityRouter.route('')
  .post(ActivityController.createActivity)

ActivityRouter.route('/:id')
  .get(ActivityController.getActivityById)
  .put(ActivityController.updateAcivityById)
  .delete(ActivityController.deleteActivityById)

ActivityRouter.route('/user/:id')
  .get(ActivityController.getActivityByUserId)

ActivityRouter.route('/following/:id')
  .get(ActivityController.getActivityByFollowingId)

module.exports = ActivityRouter;