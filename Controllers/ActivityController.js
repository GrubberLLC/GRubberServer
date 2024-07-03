const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const ActivityController = {
  createActivity: async (req, res) => {
    const {user_id, message, post_id, list_id, place_id, friend_id, comment_id} = req.body; 
    const query = `
      INSERT INTO Activity 
        (user_id, message, post_id, list_id, place_id, friend_id, comment_id, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`
    try {
      const result = await pool.query(query, [user_id, message, post_id, list_id, place_id, friend_id, comment_id]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getActivityById: async (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT 
        a.activity_id, 
        a.user_id, 
        a.message, 
        a.created_at,
        p.* AS post,
        l.* AS list,
        pl.* AS place,
        f.* AS friend
      FROM 
        Activity a
      LEFT JOIN 
        Post p ON a.post_id = p.post_id
      LEFT JOIN 
        List l ON a.list_id = l.list_id
      LEFT JOIN 
        Place pl ON a.place_id = pl.place_id
      LEFT JOIN 
        Friend f ON a.friend_id = f.friend_id
      WHERE 
        a.user_id = $1
      ORDER BY 
        a.created_at DESC;
    `;
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getActivityByUserId: (req, res) => {
    const activities = []
    const { id } = req.params;
    const typeQuery = `
      SELECT * FROM Activity WHERE user_id = ? ORDER BY created_at DESC
    `;
    connection.query(typeQuery, [id], (typeErr, typeResults) => {
        if (typeErr) {
            return res.status(500).send(typeErr.message);
        }
        return res.status(201).send(typeResults)
    });
  },
  getActivityByFollowingId: (req, res) => {
    const activities = []
    const { id } = req.params;
    const typeQuery = `
      SELECT f.*, a.*
      FROM Activity a
      JOIN Friends f
      ON f.following_id = a.user_id
      WHERE f.follower_id = ?
      AND f.status = 'active'
      ORDER BY a.created_at DESC
    `;
    connection.query(typeQuery, [id], (typeErr, typeResults) => {
        if (typeErr) {
            return res.status(500).send(typeErr.message);
        }
        return res.status(201).send(typeResults)
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
          return res.status(500).send(err.message);
        }
        return res.status(201).send(`Activity successfully updated - ID: ${id}`);
    });
},

  deleteActivityById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Activity WHERE activity_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Activity successfully delete`)
    });
  },
}

module.exports = {ActivityController}