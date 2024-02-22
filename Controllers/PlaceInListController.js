const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const PlaceInListController = {
  createPlaceInList: (req, res) => {
    const {place_id, list_id} = req.body; 
    const query = `
      INSERT INTO PlaceInList 
        (place_id, list_id, created_at)
      VALUES (?, ?, NOW())`
    connection.query(query, [place_id, list_id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`PlaceInList created with ID: ${results.insertId}`)
    });
  },
  getPlaceInListById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM PlaceInList WHERE pl_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getPlaceInListByListId: (req, res) => {
    const {id} = req.params; 
    console.log(id)
    const query = `
      SELECT pl.*, p.*
      FROM PlaceInList pl
      JOIN Places p
      ON pl.place_id = p.place_id
      WHERE list_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  updatePlaceInListById: (req, res) => {
    const {id} = req.params; 
    const {place_id, list_id} = req.body
    const query = `
    UPDATE PlaceInList
    SET place_id = ?, list_id = ?
    WHERE pl_id = ?
    `
    connection.query(query, [place_id, list_id, id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`PlaceInList successfully updated - ID: ${id}`)
    });
  },
  deletePlaceInListById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM PlaceInList WHERE pl_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`PlaceInList successfully delete`)
    });
  },
}

module.exports = {PlaceInListController}