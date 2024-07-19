const express = require('express');
const { NotificationController } = require('../Controllers/NotificationController');
const NotificationRouter = express.Router();

NotificationRouter.route('')
  .post(NotificationController.sendNotification)

module.exports = NotificationRouter;