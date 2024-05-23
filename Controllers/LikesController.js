const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const LikesController = {
  createLike: async (req, res) => {
    const { post_id, user_id } = req.body; 
    const query = `
      INSERT INTO Likes 
        ( post_id, user_id, created_at)
      VALUES ($1, $2, NOW())`; 
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getListByPostAndUser: async (req, res) => {
    const {post_id, user_id} = req.params; 
    const query = `
      SELECT * FROM Likes WHERE post_id = $1 AND user_id = $2
    `
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
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