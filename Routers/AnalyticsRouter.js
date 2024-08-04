const express = require('express');
const { AnalyticsController } = require('../Controllers/AnalyticsController');
const AnalyticsRouter = express.Router();

AnalyticsRouter.route('/users/count')
  .get(AnalyticsController.getUserCount)

AnalyticsRouter.route('/posts/count')
  .get(AnalyticsController.getPostCount)

AnalyticsRouter.route('/likes/count')
  .get(AnalyticsController.getLikeCount)

AnalyticsRouter.route('/comments/count')
  .get(AnalyticsController.getCommentCount)

AnalyticsRouter.route('/lists/count')
  .get(AnalyticsController.getListCount)

AnalyticsRouter.route('/getTopUsers')
  .get(AnalyticsController.getTopUsers)

AnalyticsRouter.route('/newSignups')
  .get(AnalyticsController.getNewUserSignups)

AnalyticsRouter.route('/totals')
  .get(AnalyticsController.getActivitySummary)

module.exports = AnalyticsRouter;