const connection = require('../bin/utils/AwsDbConnect');

const ListController = {
  createList: (req, res) => {
    const { name, description, picture, last_activity, public, created_by } = req.body; 
    const query = `
      INSERT INTO Lists 
        (name, description, picture, last_activity, public, created_by, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`; 
    connection.query(query, [name, description, picture, last_activity, public, created_by], (err, results) => {
        if(err){
          console.error('Error creating list: ' + err.message);
          res.status(500).send(err.message);
        } 
        res.status(201).send(`List created with ID: ${results.insertId}`);
    });
  },
  getListById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Lists WHERE list_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(results)
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
          res.status(500).send(err.message);
        } 
        res.status(201).send(`List successfully updated - ID: ${name} / ${id}`)
    });
  },
  deleteListById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Lists WHERE list_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`List successfully delete`)
    });
  },
  getListByUserId: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Lists WHERE created_by = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(results)
    });
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
          res.status(500).send(err.message);
        } 
        res.status(201).send(`List Visibilty was successfully updated - ID: ${id}`)
    });
  },
}

module.exports = {ListController}