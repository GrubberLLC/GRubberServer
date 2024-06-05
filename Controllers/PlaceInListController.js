const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const PlaceInListController = {
  createPlaceInList: async (req, res) => {
    const {place_id, list_id} = req.body; 
    const query = `
      INSERT INTO PlaceInList 
        (place_id, list_id, created_at)
      VALUES ($1, $2, NOW())`
    try {
      const result = await pool.query(query, [place_id, list_id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getPlaceInListById: async (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT Places.name AS name Places.*, Lists.name AS list_name, Lists.*, PlaceInList.*
      FROM PlaceInList
      JOIN Places ON PlaceInList.place_id = Places.place_id
      JOIN Lists ON PlaceInList.list_id = Lists.list_id
      WHERE PlaceInList.list_id = $1
    `;
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getPlaceInListByListId: async (req, res) => {
    const {id} = req.params; 
    console.log(id)
    const query = `
      SELECT Places.*, PlaceInLists.*
      FROM PlaceInLists
      JOIN Places
      ON Places.place_id = PlaceInLists.place_id
      WHERE list_id = $1
    `
    try {
      const result = await pool.query(query, [user_id, name, description, picture, public, last_activity, created_by]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
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