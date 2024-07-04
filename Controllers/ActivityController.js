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
        a.* AS activity,
        a.activity_id, 
        a.user_id AS activity_user_id, 
        a.created_at AS activity_created_at,
        p.* AS post,
        p.post_id AS post_post_id,
        p.created_at AS post_created_at,
        p.media AS post_media,
        l.* AS list,
        l.list_id AS list_id,
        l.created_at AS list_created_at,
        l.picture AS list_picture,
        pl.* AS place,
        pl.place_id AS place_id,
        pl.created_at AS place_created_at,
        pl.image AS place_image,
        pr.* AS profile,
        pr.user_id AS profile_user_id,
        pr.created_at AS profile_created_at,
        pr.profile_picture AS profile_picture
      FROM 
        Activity a
      LEFT JOIN 
        Posts p ON a.post_id = p.post_id
      LEFT JOIN 
        Lists l ON a.list_id = l.list_id
      LEFT JOIN 
        Places pl ON a.place_id = pl.place_id
      LEFT JOIN 
        Profiles pr ON a.user_id = pr.user_id
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