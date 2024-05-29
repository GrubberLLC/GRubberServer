const express = require('express');
const { MemberController } = require('../Controllers/MemberController');
const MemberRouter = express.Router();

MemberRouter.route('')
  .post(MemberController.createMembers)

MemberRouter.route('/:id')
  .get(MemberController.getMemberById)
  .put(MemberController.updateMemberById)
  .delete(MemberController.deleteMemberById)

MemberRouter.route('/list/:id')
  .get(MemberController.getMemberByListId)

MemberRouter.route('/list/pending/:id')
  .get(MemberController.getPendingMemberByMemberId)

MemberRouter.route('/request/:id')
  .put(MemberController.acceptMemberRequestById)

module.exports = MemberRouter;