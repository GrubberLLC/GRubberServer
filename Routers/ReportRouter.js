const express = require('express');
const { ReportController } = require('../Controllers/ReportController');
const ReportRouter = express.Router();

ReportRouter.route('')
  .post(ReportController.createReport)

ReportRouter.route('/post')
  .post(ReportController.createReportPosts)

ReportRouter.route('')
  .get(ReportController.getReports)

module.exports = ReportRouter;