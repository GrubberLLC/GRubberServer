const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const PostsControllet = {
  createPost: (req, res) => {
    const { user_id, media_url, place_id, list_id, caption, likes, 
      location, boosted, visible } = req.body; 
    const query = `
      INSERT INTO Posts 
        (user_id, media_url, place_id, list_id, caption, likes, 
         location, visible, boosted, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`
    connection.query(query, [user_id, media_url, place_id, list_id, caption, likes, 
      location, visible, boosted], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Post created!`)
    });
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
    connection.query(query, [offset], (err, results) => {
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
      SELECT p.*, pr.* 
      FROM Posts p
      JOIN Places pr
      ON p.place_id = pr.place_id
      WHERE p.user_id = ? 
    `
    connection.query(query, [id], (err, results) => {
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
      SELECT p.*, pr.*, u.* 
      FROM Posts p
      JOIN Places pr
      ON p.place_id = pr.place_id
      JOIN Profiles u
      ON p.user_id = u.user_id
      WHERE p.place_id = ? 
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          console.log(err)
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
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
    connection.query(query, [id, id], (err, results) => {
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
    DELETE FROM Posts WHERE post_id = ?
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