const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const PostsControllet = {
  createPost: async (req, res) => {
    const { media, media_type, user_id, caption, place_id } = req.body; 
    const query = `
      INSERT INTO Posts
      (media, media_type, user_id, caption, place_id, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *;`;
    try {
      const result = await pool.query(query, [media, media_type, user_id, caption, place_id]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getAllPosts: async (req, res) => {
    const query = `
      SELECT Posts.*, Places.*, Profiles.*
      FROM Posts
      JOIN Places ON Posts.place_id = Places.place_id
      JOIN Profiles ON Posts.user_id = Profiles.user_id
      LIMIT 120
    `
    try {
      const result = await pool.query(query);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getAllPostsInBatch: (req, res) => {
    const {batch} = req.params; 
    if (!batch || batch < 1) {
      return res.status(400).send('Invalid batch number');
    }
    const offset = (batch - 1) * 100;
    // const batch = parseInt(req.query.batch, 10);
    const query = `
      SELECT p.*, pl.*, pr.*
      FROM Posts p
      JOIN Places pl
      ON p.place_id = pl.place_id
      JOIN Profiles pr
      ON p.user_id = pr.user_id
      ORDER BY p.created_at DESC LIMIT 100 OFFSET ?
    `;
    pool.query(query, [offset], (err, results) => {
      if (err) {
        console.log(JSON.stringify(err))
        return res.status(500).send(err.message);
      }
      return res.status(200).send(results);
    });
  },
  getPostById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Posts WHERE user_id = ?
    `
    pool.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getPostByUserId: async (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT Posts.*, Places.*, Profiles.*
      FROM Posts
      JOIN Places ON Posts.place_id = Places.place_id
      JOIN Profiles ON Posts.user_id = Profiles.user_id
      WHERE Posts.user_id = $1
    `;
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getPostByPlaceId: async (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT Posts.*, Places.*, Profiles.*
      FROM Posts
      JOIN Places ON Posts.place_id = Places.place_id
      JOIN Profiles ON Posts.user_id = Profiles.user_id
      WHERE Posts.place_id = $1
    `
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getPostByFriendId: (req, res) => {
    const { id } = req.params; 
    const query = `
      SELECT p.*, f.*, pl.*, pr.*
      FROM Posts p
      JOIN Friends f
      ON p.user_id = f.following_id
      JOIN Places pl
      ON p.place_id = pl.place_id
      JOIN Profiles pr
      ON p.user_id = pr.user_id
      WHERE f.follower_id = ? 

      UNION
      
      SELECT 
        p.*, 
        NULL as friend_id, 
        NULL as follower_id, 
        NULL as following_id, 
        NULL as status,
        NULL as created_at,
        pl.*, 
        pr.*
      FROM 
        Posts p
      JOIN Places pl 
      ON p.place_id = pl.place_id
      JOIN Profiles pr 
      ON p.user_id = pr.user_id
      WHERE 
        p.user_id = ?;
    `;
    pool.query(query, [id, id], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },  
  updatePostById: (req, res) => {
    const {id} = req.params; 
    const { user_id, content_url, place_id, caption, likes, 
      location, boosted, visible } = req.body; 
    const query = `
    UPDATE Posts
    SET user_id = ?, content_url = ?, place_id = ?, caption = ?, likes = ?,
    location = ?, boosted = ?, visible = ? 
    WHERE post_id = ?
    `
    pool.query(query, [user_id, content_url, place_id, caption, likes, 
      location, boosted, visible, id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Profile successfully updated - ID: ${username} / ${id}`)
    });
  },
  deletePostById: async (req, res) => {
    const {id} = req.params; 
    const query = `
      DELETE FROM Posts WHERE post_id = $1
    `
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
}

module.exports = {PostsControllet}