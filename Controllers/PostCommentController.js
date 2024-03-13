const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const PostCommentController = {
  createPost: (req, res) => {
    const { post_id, comment, user_id } = req.body; 
    const query = `
      INSERT INTO PostComments 
        (post_id, comment, user_id, created_at)
      VALUES (?, ?, ?, NOW())`
    connection.query(query, [post_id, comment, user_id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Post created!`)
    });
  },
  getCommentByPostId: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT pc.*, p.*
      FROM PostComments pc
      JOIN Profiles p 
      ON pc.user_id = p.user_id
      WHERE post_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
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