const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const FriendController = {
  createFriend: async (req, res) => {
    console.log('create friends')
    const {follower_id, following_id, status, type} = req.body; 
    const query = `
      INSERT INTO Friends 
        (follower_id, following_id, status, type, created_at)
      VALUES ($1, $2, $3, $4, NOW())`
      try {
        const result = await pool.query(query, [follower_id, following_id, status, type]);
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
      }
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
  getFollowersByUserIs: async (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT f.*, p.* 
      FROM Friends f
      JOIN Profiles p
      ON f.follower_id = p.user_id
      WHERE f.following_id = $1
    `
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getFriendRequestsById: async (req, res) => {
    const { id } = req.params; 
    const query = `
      SELECT pr.*
      FROM Friends f
      JOIN Profiles pr ON pr.user_id = f.following_id
      WHERE f.follower_id = $1 AND f.status = 'pending'
    `;
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getFollowingByUserIs: async (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT f.*, p.* 
      FROM Friends f
      JOIN Profiles p
      ON f.following_id = p.user_id
      WHERE f.follower_id = $1
    `
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getAllFollowersByUserIs: async (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT f.*, p.*
      FROM Friends f
      JOIN Profiles p
      ON f.follower_id = p.user_id
      WHERE f.following_id = $1
    `
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
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
  deleteFriendById: async (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Friends WHERE friends_id = $1
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

// '4', 'f7211b46-607c-490a-9317-dd062b4d9ee6', '2cf075d8-21f5-46d5-967d-e95bc1577691', 'active', '2024-02-15 20:27:23'

module.exports = {FriendController}