const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const FavoriteController = {
  createFavorite: (req, res) => {
    const {user_id, place_id, list_id} = req.body; 
    const query = `
      INSERT INTO Favorites 
        (user_id, place_id, list_id, created_at)
      VALUES (?, ?, ?, NOW())`
    connection.query(query, [user_id, place_id, list_id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Favorites created with ID: ${results.insertId}`)
    });
  },
  getFavoriteById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Favorites WHERE favorites_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(results)
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
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Favorites successfully updated - ID: ${id}`)
    });
  },
  deleteFavoriteById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Favorites WHERE favorites_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Favorite successfully delete`)
    });
  },
}

module.exports = {FavoriteController}