const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const PostsControllet = {
  createPost: (req, res) => {
    const { user_id, content_url, place_id, caption, likes, 
      location, boosted, visible } = req.body; 
    const query = `
      INSERT INTO Posts 
        (user_id, content_url, place_id, caption, likes, 
         location, visible, boosted, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`
    connection.query(query, [user_id, content_url, place_id, caption, likes, 
      location, visible, boosted ], (err, results) => {
        if(err){
          console.log(err)
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Post created!`)
    });
  },
  getPostById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Posts WHERE user_id = ? LIMIT 1
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getPostByUserId: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Posts WHERE user_id = ? 
    `
    connection.query(query, [username], (err, results) => {
        if(err){
          console.log(err)
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getPostByPlaceId: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Profiles WHERE place_id = ? 
    `
    connection.query(query, [id], (err, results) => {
        if(err){
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
    UPDATE Profiles
    SET user_id = ?, content_url = ?, place_id = ?, caption = ?, likes = ?,
    location = ?, boosted = ?, visible = ? 
    WHERE profile_id = ?
    `
    connection.query(query, [user_id, content_url, place_id, caption, likes, 
      location, boosted, visible, id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Profile successfully updated - ID: ${username} / ${id}`)
    });
  },
  deletePostById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Profiles WHERE profile_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Post successfully delete`)
    });
  },
}

module.exports = {PostsControllet}