const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const ActivityController = {
  createActivity: (req, res) => {
    const {user_id, activity, type, favorites_id, list_id, following_id, comment_id} = req.body; 
    const query = `
      INSERT INTO Activity 
        (user_id, activity, type, favorites_id, list_id, following_id, comment_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`
    connection.query(query, [user_id, activity, type, favorites_id, list_id, following_id, comment_id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Activity created with ID: ${results.insertId}`)
    });
  },
  getActivityById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Activity WHERE activity_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(results)
    });
  },
  updateAcivityById: (req, res) => {
    const {id} = req.params; 
    const {user_id, activity, type, favorites_id, list_id, following_id, comment_id} = req.body;
    const query = `
    UPDATE Activity
    SET user_id = ?, activity = ?, type = ?, favorites_id = ?, list_id = ?, following_id = ?, comment_id = ?
    WHERE activity_id = ?
    `;
    connection.query(query, [user_id, activity, type, favorites_id, list_id, following_id, comment_id, id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } else {
          res.status(201).send(`Activity successfully updated - ID: ${id}`);
        }
    });
},

  deleteActivityById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Activity WHERE activity_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Activity successfully delete`)
    });
  },
}

module.exports = {ActivityController}