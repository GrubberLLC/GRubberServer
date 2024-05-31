const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary


const ListController = {
  createList: async (req, res) => {
    const { user_id, description, picture, public, last_activity, created_by } = req.body; 
    const query = `
      INSERT INTO Lists 
        (user_id, description, picture, public, last_activity, created_by, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`; 
    try {
      const result = await pool.query(query, [user_id, description, picture, public, last_activity, created_by]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getListById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Lists WHERE list_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  updateListById: (req, res) => {
    const {id} = req.params; 
    const {name, description, picture, last_activity, public} = req.body
    const query = `
    UPDATE Lists
    SET name = ?, description = ?, picture = ?, last_activity = ?, public = ?
    WHERE list_id = ?
    `
    connection.query(query, [name, description, picture, last_activity, public, id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`List successfully updated - ID: ${name} / ${id}`)
    });
  },
  deleteListById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Lists WHERE list_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`List successfully delete`)
    });
  },
  getListByUserId: async (req, res) => {
    const { id } = req.body; 
    const query = `
        SELECT l.* 
        FROM lists l
        INNER JOIN members m ON l.list_id = m.list_id
        WHERE m.user_id = $1 AND m.status = 'active'
        RETURNING *
    `;
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  updateListPublic: (req, res) => {
    const {id} = req.params; 
    const {public} = req.body
    const query = `
    UPDATE Lists
    SET public = ?
    WHERE list_id = ?
    `
    connection.query(query, [public, id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`List Visibilty was successfully updated - ID: ${id}`)
    });
  },
}

module.exports = {ListController}