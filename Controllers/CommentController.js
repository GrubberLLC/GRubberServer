const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const CommentController = {
  createComment: (req, res) => {
    const {user_id, image, comment, rating, place_favorite_id, place_list_id, created_at} = req.body; 
    const query = `
      INSERT INTO Comments 
        (user_id, image, comment, rating, place_favorites_id, place_list_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())`
    connection.query(query, [user_id, image, comment, rating, place_favorite_id, place_list_id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        }
        console.log(results) 
        return res.status(201).send({id: results.insertId, message: `Comment created with ID: ${results.insertId}`})
    });
  },
  getCommentById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Comments WHERE comment_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getCommentByPlId: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT c.*, p.* 
      FROM Comments c
      JOIN Profiles p
      ON c.user_id = p.user_id
      WHERE place_list_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  updateCommentById: (req, res) => {
    const {id} = req.params; 
    const {user_id, image, comment, rating, place_favorite_id, place_list_id} = req.body
    const query = `
    UPDATE Comments
    SET user_id = ?, image = ?, comment = ?, rating = ?, place_favorites_id = ?, place_list_id = ?
    WHERE comment_id = ?
    `
    connection.query(query, [user_id, image, comment, rating, place_favorite_id, place_list_id, id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Comment successfully updated - ID: ${id}`)
    });
  },
  deleteProfileById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Comments WHERE comment_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Comment successfully delete`)
    });
  },
}

module.exports = {CommentController}