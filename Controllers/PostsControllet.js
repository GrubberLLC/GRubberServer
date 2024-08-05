const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const PostsControllet = {
  createPost: async (req, res) => {
    const { media, media_type, user_id, caption, place_id, yelp_id } = req.body; 
    const query = `
      INSERT INTO Posts
      (media, media_type, user_id, caption, place_id, yelp_id, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *;`;
    try {
      const result = await pool.query(query, [media, media_type, user_id, caption, place_id, yelp_id]);
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
      ORDER BY Posts.created_at DESC
      LIMIT 120;
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
    const { id } = req.params;
    const query = `
      SELECT Posts.*, Places.*, Profiles.*
      FROM Posts
      LEFT JOIN Places ON Posts.place_id = Places.place_id
      JOIN Profiles ON Posts.user_id = Profiles.user_id
      WHERE Posts.user_id = $1
    `;
    try {
      const result = await pool.query(query, [id]);
      res.status(200).json(result.rows);
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
  getPostByYelpId: async (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT Posts.*, Places.*, Profiles.*
      FROM Posts
      JOIN Places ON Posts.place_id = Places.place_id
      JOIN Profiles ON Posts.user_id = Profiles.user_id
      WHERE Posts.yelp_id = $1
    `
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getPostByFriendId: async (req, res) => {
    const { id } = req.params; 
    const query = `
      SELECT p.*, pl.*, pr.*
      FROM Friends f
      JOIN Posts p ON p.user_id = f.following_id
      JOIN Places pl ON p.place_id = pl.place_id
      JOIN Profiles pr ON p.user_id = pr.user_id
      WHERE f.follower_id = $1 AND f.status = 'active'
    `;
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  updatePostById: async (req, res) => {
    const {id} = req.params; 
    const {media, media_type, user_id, caption, place_id} = req.body; 
    const query = `
      UPDATE Posts
      SET media = $1, media_type = $2, user_id = $3, caption = $4, place_id = $5
      WHERE post_id = $6
    `
    try {
      const result = await pool.query(query, [media, media_type, user_id, caption, place_id, id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
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