const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary
const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary


const MemberController = {
  createMembers: async (req, res) => {
    const {user_id, list_id, status, type, sent_request} = req.body; 
    const query = `
    INSERT INTO Members 
      (user_id, list_id, status, type, sent_request, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())`
    try {
      const result = await pool.query(query, [user_id, list_id, status, type, sent_request]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
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
  getMemberByListId: async (req, res) => {
    const { id } = req.params; 
    const query = `
      SELECT Profiles.*, Members.* 
      FROM Members
      JOIN Profiles ON Members.user_id = Profiles.user_id
      WHERE Members.list_id = $1
    `;
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
      } else {
        res.status(404).send('No members found for this list');
      }
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).send(err.message);
    }
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
  deleteMemberById: async (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Members WHERE member_id = $1
    `
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
}

module.exports = {MemberController}