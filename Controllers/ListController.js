const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary


const ListController = {
  createList: async (req, res) => {
    const { user_id, name, description, picture, public, last_activity, created_by } = req.body; 
    const query = `
      INSERT INTO Lists 
        (user_id, name, description, picture, public, last_activity, created_by, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *`; 
    try {
      const result = await pool.query(query, [user_id, name, description, picture, public, last_activity, created_by]);
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
    const { id } = req.params; 
    console.log('user id: ', id)
    const query = `
      SELECT m.*, l.*
        FROM members m
        INNER JOIN lists l ON m.list_id = l.list_id
        WHERE m.user_id = $1 AND m.status = 'active'`
    try {
      const result = await pool.query(query, [id]);
      console.log(result.rows)
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getPublicListByUserId: async (req, res) => {
    const { id } = req.params; 
    console.log('user id: ', id)
    const query = `
      SELECT m.*, l.*
        FROM members m
        INNER JOIN lists l ON m.list_id = l.list_id
        WHERE m.user_id = $1 AND m.status = 'active' AND l.public = true` 
    try {
      const result = await pool.query(query, [id]);
      console.log(result.rows)
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  updateListById: async (req, res) => {
    const { id } = req.params; 
    const { name, description, picture, public } = req.body;
    const query = `
      UPDATE Lists
      SET name = $1, description = $2, picture = $3, public = $4
      WHERE list_id = $5
      RETURNING *;
    `;
    try {
      const result = await pool.query(query, [name, description, picture, public, id]);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'List not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
}

module.exports = {ListController}