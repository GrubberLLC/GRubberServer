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
  .get(MemberController.allMemberRequestById)

MemberRouter.route('/request/accept/:id')
  .put(MemberController.acceptMemberRequestById)

MemberRouter.route('/request/reject/:id')
  .delete(MemberController.rejectMemberRequestById)

module.exports = MemberRouter;