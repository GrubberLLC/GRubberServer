const connection = require('../bin/utils/AwsDbConnect');

const LikesController = {
  createLike: (req, res) => {
    const { post_id, user_id } = req.body; 
    const query = `
      INSERT INTO PostLikes 
        ( post_id, user_id, created_at)
      VALUES (?, ?, NOW())`; 
    connection.query(query, [post_id, user_id], (err, results) => {
        if(err){
          console.error('Error creating Like: ' + err.message);
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results);
    });
  },
  getListByPostId: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM PostLikes WHERE post_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  deleteLikeById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM PostLikes WHERE like_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`List successfully delete`)
    });
  },
}

module.exports = {LikesController}