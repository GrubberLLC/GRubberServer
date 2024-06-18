const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const FavoriteController = {
  createFavorite: async (req, res) => {
    const {user_id, place_id, post_id, list_id} = req.body; 
    const query = `
      INSERT INTO Favorites 
        (user_id, place_id, post_id, list_id, created_at)
      VALUES ($1, $2, $3, $4, NOW())`
      try {
        const result = await pool.query(query, [user_id, place_id, post_id, list_id]);
        res.status(201).json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
      }
  },
  getFavoriteById: async (req, res) => {
    const { id } = req.params; 
    const query = `
      SELECT
        f.*,
        p.*,
        l.*,
        pl.*
      FROM
        Favorites f
      LEFT JOIN Posts p ON f.post_id = p.post_id
      LEFT JOIN Lists l ON f.list_id = l.list_id
      LEFT JOIN Places pl ON f.place_id = pl.place_id
      WHERE
        f.user_id = $1
    `;
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  
  getFavoriteByUserId: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT f.*, p.*
      FROM Favorites f
      JOIN Places p
      ON f.place_id = p.place_id
      WHERE f.user_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  updateFavoriteById: (req, res) => {
    const {id} = req.params; 
    const {user_id, place_id, list_id} = req.body
    const query = `
    UPDATE Favorites
    SET user_id = ?, place_id = ?, list_id = ?
    WHERE favorites_id = ?
    `
    connection.query(query, [user_id, place_id, list_id, id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Favorites successfully updated - ID: ${id}`)
    });
  },
  deleteFavoriteById: async (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Favorites WHERE favorites_id = $1
    `
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
}

module.exports = {FavoriteController}