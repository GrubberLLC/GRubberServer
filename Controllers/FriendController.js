const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const FriendController = {
  createFriend: (req, res) => {
    const {follower_id, following_id, status} = req.body; 
    const query = `
      INSERT INTO Friends 
        (follower_id, following_id, status, created_at)
      VALUES (?, ?, ?, NOW())`
    connection.query(query, [follower_id, following_id, status], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Friend created with ID: ${results.insertId}`)
    });
  },
  getFriendById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Friends WHERE friend_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(results)
    });
  },
  updateFriendById: (req, res) => {
    const {id} = req.params; 
    const {follower_id, following_id, status} = req.body
    const query = `
    UPDATE Friends
    SET follower_id = ?, following_id = ?, status = ?
    WHERE friend_id = ?
    `
    connection.query(query, [follower_id, following_id, status, id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Friend successfully updated - ID: ${id}`)
    });
  },
  deleteFriendById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Friends WHERE friend_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Friendds successfully delete`)
    });
  },
}

module.exports = {FriendController}