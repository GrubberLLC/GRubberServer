const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const MemberController = {
  createMember: (req, res) => {
    const {user_id, list_id, status} = req.body; 
    const query = `
      INSERT INTO Members 
        (user_id, list_id, status, created_at)
      VALUES (?, ?, ?, NOW())`
    connection.query(query, [user_id, list_id, status], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Member created with ID: ${results.insertId}`)
    });
  },
  getMemberById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Members WHERE member_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(results)
    });
  },
  updateMemberById: (req, res) => {
    const {id} = req.params; 
    const {user_id, list_id, status} = req.body
    const query = `
    UPDATE Members
    SET user_id = ?, list_id = ?, status = ?
    WHERE member_id = ?
    `
    connection.query(query, [user_id, list_id, status, id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Member successfully updated - ID: ${id}`)
    });
  },
  deleteMemberById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Members WHERE member_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Member successfully delete`)
    });
  },
}

module.exports = {MemberController}