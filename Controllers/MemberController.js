const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const MemberController = {
  createMember: (req, res) => {
    const {user_id, list_id, status, sent_request, type} = req.body; 
    const query = `
      INSERT INTO Members 
        (user_id, list_id, status, type, sent_request, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())`
    connection.query(query, [user_id, list_id, status, sent_request, type], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Member created`)
    });
  },
  getMemberById: (req, res) => {
    const {id} = req.params; 
    console.log(id)
    const query = `
      SELECT l.*, m.* 
      FROM Members m
      JOIN Lists l
      ON m.list_id = l.list_id
      WHERE m.user_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        console.log(results)
        return res.status(201).send(results)
    });
  },
  getMemberByListId: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT p.*, m.* 
      FROM Members m
      JOIN Profiles p 
      ON m.user_id = p.user_id
      WHERE list_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          console.log(err)
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getPendingMemberByMemberId: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT l.*, m.* 
      FROM Members m
      JOIN Lists l
      ON m.list_id = l.list_id
      WHERE m.user_id = ? 
      AND m.type = 'pending'
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          console.log(err)
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  acceptMemberRequestById: (req, res) => {
    const {id} = req.params; 
    const query = `
    UPDATE Members
    SET type = 'active'
    WHERE member_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          console.log(err)
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Member successfully updated - ID: ${id}`)
    });
  },
  updateMemberById: (req, res) => {
    const {id} = req.params; 
    const {user_id, list_id, status, type} = req.body
    const query = `
    UPDATE Members
    SET user_id = ?, list_id = ?, status = ?, type = ?
    WHERE member_id = ?
    `
    connection.query(query, [user_id, list_id, status, type, id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Member successfully updated - ID: ${id}`)
    });
  },
  deleteMemberById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Members WHERE member_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Member successfully delete`)
    });
  },
}

module.exports = {MemberController}