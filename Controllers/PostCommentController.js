const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary
const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const PostCommentController = {
  createPost: (req, res) => {
    const { post_id, comment, user_id } = req.body; 
    const query = `
      INSERT INTO comments 
        (post_id, comment, user_id, created_at)
      VALUES ($1, $2, $3, NOW())`
    connection.query(query, [post_id, comment, user_id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Post created!`)
    });
  },
  createPostCOmment: async (req, res) => {
    const {post_id, comment, user_id} = req.body; 
    const query = `
      INSERT INTO comments 
      (post_id, comment, user_id, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;`;
    try {
      const result = await pool.query(query, [post_id, comment, user_id]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getCommentByPostId: async (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT Comments.*, Profiles.*
      FROM Comments
      JOIN Profiles ON Profiles.user_id = Comments.user_id
      WHERE Comments.post_id = $1;
    `
    console.log(query)
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  deletePostById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM PostComments WHERE post_c_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Post successfully delete`)
    });
  },
}

module.exports = {PostCommentController}