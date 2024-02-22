const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const FriendController = {
  createFriend: (req, res) => {
    console.log('create friends')
    const {follower_id, following_id, status} = req.body; 
    const query = `
      INSERT INTO Friends 
        (follower_id, following_id, status, created_at)
      VALUES (?, ?, ?, NOW())`
    connection.query(query, [follower_id, following_id, status], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        console.log(results)
        return res.status(201).send({id: results.insertId})
    });
  },
  getFriendById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Friends WHERE friend_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getFollowersByUserIs: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT f.*, p.* 
      FROM Friends f
      JOIN Profiles p
      ON f.following_id = p.user_id
      WHERE f.follower_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getFolloweringByUserIs: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT f.*, p.* 
      FROM Friends f
      JOIN Profiles p
      ON f.follower_id = p.user_id
      WHERE f.status = 'pending' AND f.following_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getAllFollowersByUserIs: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT f.*, p.*
      FROM Friends f
      JOIN Profiles p
      ON f.following_id = p.user_id
      WHERE status = 'active' 
      AND follower_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        res.status(201).send(results)
    });
  },
  getAllFollowingByUserIs: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT f.*, p.*
      FROM Friends f
      JOIN Profiles p
      ON f.follower_id = p.user_id
      WHERE status = 'active' 
      AND following_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getFriendByIds: (req, res) => {
    const {userId, friendId} = req.params; 
    const query = `
      SELECT *
      FROM Friends 
      WHERE follower_id = ?
      AND following_id = ?
    `
    connection.query(query, [userId, friendId], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
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
        return res.status(201).send(`Friend successfully updated - ID: ${id}`)
    });
  },
  acceptFriendRequest: (req, res) => {
    const {id} = req.params; 
    const query = `
    UPDATE Friends
    SET status = 'active'
    WHERE friend_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Friend successfully updated - ID: ${id}`)
    });
  },
  deleteFriendById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Friends WHERE friend_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Friendds successfully delete`)
    });
  },
}

// '4', 'f7211b46-607c-490a-9317-dd062b4d9ee6', '2cf075d8-21f5-46d5-967d-e95bc1577691', 'active', '2024-02-15 20:27:23'

module.exports = {FriendController}